// app.mjs

import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import cors from "cors";
import admin from "firebase-admin";
import Admin from "./models/Admin.js"; // Adjust the path based on your project structure
import bcrypt from "bcrypt";
import { config as dotenvConfig } from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
// import setupProxy from "./Proxy.js"; // Adjust path as necessary

// Determine root directory
const __dirname = join(fileURLToPath(import.meta.url), "..");

// Load environment variables from .env file
dotenvConfig({ path: join(__dirname, ".env") });

const port = 4000;
const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
// app.use(cors());
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "shoes-store-fada1.appspot.com", // Replace with your Firebase Storage bucket name
});

const bucket = admin.storage().bucket();

// Database connection with MongoDB
try {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}

// API creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});
// setupProxy(app);

// Multer setup for handling file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

app.post("/admin/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});
//admin
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});
// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    require: true,
  },
  name: { type: String, require: true },
  gender: { type: String, require: true },
  price: { type: Number, require: true },
  oldPrice: { type: Number, require: true },
  images: [{ type: String, required: true }],
  category: { type: String, require: false },
  sizes: [{ type: String, required: true }],
  colors: [{ type: String, required: true }],
  discription: { type: String, require: true },
  specialOffer: { type: String, require: true },
  amount: { type: Number, require: false },
  showingOnTheTop: { type: String, require: false },
});

// Endpoint to upload images
app.post("/upload", upload.array("productImages"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ error: "No files uploaded." });
  }

  try {
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const blob = bucket.file(`images/${Date.now()}_${file.originalname}`);
        const blobStream = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        await new Promise((resolve, reject) => {
          blobStream.on("error", (err) => reject(err));
          blobStream.on("finish", () => resolve());
          blobStream.end(file.buffer);
        });

        await blob.makePublic();
        return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      })
    );

    res.status(200).send({ success: true, image_urls: imageUrls });
  } catch (err) {
    console.error("Error uploading files:", err);
    res.status(500).send({ error: "Failed to upload files" });
  }
});

// Endpoint to add a product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    gender: req.body.gender,
    price: req.body.price,
    oldPrice: req.body.oldPrice,
    images: req.body.images, // Assuming `image_urls` is an array of image URLs sent from the client
    category: req.body.category, // Assuming `image_urls` is an array of image URLs sent from the client
    sizes: req.body.sizes, // Assuming `image_urls` is an array of image URLs sent from the client
    colors: req.body.colors, // Assuming `image_urls` is an array of image URLs sent from the client
    discription: req.body.discription, // Assuming `image_urls` is an array of image URLs sent from the client
    specialOffer: req.body.specialOffer, // Assuming `image_urls` is an array of image URLs sent from the client
    amount: req.body.amount, // Assuming `image_urls` is an array of image URLs sent from the client
    showingOnTheTop: req.body.showingOnTheTop, // Assuming `image_urls` is an array of image URLs sent from the client
  });

  try {
    await product.save();
    console.log("Product saved:", product);
    res.json({ success: true, name: req.body.name });
  } catch (err) {
    console.error("Error saving product:", err.message);
    res.status(500).send({ error: "Failed to save product" });
  }
});
// Endpoint to delete a product
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product removed");
    res.json({ success: true });
  } catch (err) {
    console.error("Error removing product:", err.message);
    res.status(500).send({ error: "Failed to remove product" });
  }
});

// Endpoint to get all products
app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).send({ error: "Failed to fetch products" });
  }
});
// algerian cities
const citySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  commune_name_ascii: { type: String, required: true },
  commune_name: { type: String, required: true },
  daira_name_ascii: { type: String, required: true },
  daira_name: { type: String, required: true },
  wilaya_code: { type: String, required: true },
  wilaya_name_ascii: { type: String, required: true },
  wilaya_name: { type: String, required: true },
});

const City = mongoose.model("algerian-cities", citySchema);
// Endpoint to get cities by ID
app.get("/algerian-cities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cities = await City.find({ wilaya_code: id });
    if (cities.length === 0) {
      return res
        .status(404)
        .json({ message: "No cities found with the given ID" });
    }
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
});
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});
