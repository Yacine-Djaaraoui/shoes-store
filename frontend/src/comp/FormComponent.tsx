import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { AxiosRequestConfig } from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import Logo from "../../public/images/Logoo.png";
import { ShopContext } from "./ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Location {
  id: number;
  name: string;
}

const FormComponent = () => {
  const locations: Location[] = [
    { id: 1, name: "Adrar" },
    { id: 2, name: "Chlef" },
    { id: 3, name: "Laghouat" },
    { id: 4, name: "Oum El Bouaghi" },
    { id: 5, name: "Batna" },
    { id: 6, name: "Bejaia" },
    { id: 7, name: "Biskra" },
    { id: 8, name: "Bechar" },
    { id: 9, name: "Blida" },
    { id: 10, name: "Bouira" },
    { id: 11, name: "Tamanrasset" },
    { id: 12, name: "Tebessa" },
    { id: 13, name: "Tlemcen" },
    { id: 14, name: "Tiaret" },
    { id: 15, name: "Tizi Ouzou" },
    { id: 16, name: "Algiers" },
    { id: 17, name: "Djelfa" },
    { id: 18, name: "Jijel" },
    { id: 19, name: "Setif" },
    { id: 20, name: "Saïda" },
    { id: 21, name: "Skikda" },
    { id: 22, name: "Sidi Bel Abbes" },
    { id: 23, name: "Annaba" },
    { id: 24, name: "Guelma" },
    { id: 25, name: "Constantine" },
    { id: 26, name: "Medea" },
    { id: 27, name: "Mostaganem" },
    { id: 28, name: "Msila" },
    { id: 29, name: "Mascara" },
    { id: 30, name: "Ouargla" },
    { id: 31, name: "Oran" },
    { id: 32, name: "El Bayadh" },
    { id: 33, name: "Illizi" },
    { id: 34, name: "Bordj Bou Arreridj" },
    { id: 35, name: "Boumerdes" },
    { id: 36, name: "El Tarf" },
    { id: 37, name: "Tindouf" },
    { id: 38, name: "Tissemsilt" },
    { id: 39, name: "El Oued" },
    { id: 40, name: "Khenchela" },
    { id: 41, name: "Souk Ahras" },
    { id: 42, name: "Tipaza" },
    { id: 43, name: "Mila" },
    { id: 44, name: "Aïn Defla" },
    { id: 45, name: "Naama" },
    { id: 46, name: "Aïn Temouchent" },
    { id: 47, name: "Ghardaia" },
    { id: 48, name: "Relizane" },
    { id: 49, name: "Timimoun" },
    { id: 50, name: "Bordj Badji Mokhtar" },
    { id: 51, name: "Ouled Djellal" },
    { id: 52, name: "Béni Abbès" },
    { id: 53, name: "In Salah" },
    { id: 54, name: "In Guezzam" },
    { id: 55, name: "Touggourt" },
    { id: 56, name: "Djanet" },
    { id: 57, name: "El M'Ghaier" },
    { id: 58, name: "El Meniaa" },
  ];

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryPlace, setDeliveryPlace] = useState("office");
  const [wilaya, setWilaya] = useState({
    id: "",
    name: "",
  });
  const [baladya, setBaladya] = useState([]);
  const [selectedBaladya, setSelectedBaladya] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitSuccessfully, setIsSubmitSuccessfully] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [validnumber, setvalidnumber] = useState(true);
  const [enterwilaya, seenterwilaya] = useState(true);
  const [enterbaladya, seenterbaladya] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!enterwilaya || !enterbaladya) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [enterwilaya, enterbaladya]);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchCities = async () => {
    if (!wilaya.id) return;
    
    setLoadingCities(true);
    const source = axios.CancelToken.source();
    
    try {
      const response = await axios.get(
        `https://shoes-store-api.vercel.app/algerian-cities/${
          wilaya.id - 10 < 0 ? "0" + wilaya.id : wilaya.id
        }`,
        { cancelToken: source.token }
      );
      setBaladya(response.data);
      setError(null);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError("Error fetching cities");
        setBaladya([]);
      }
    } finally {
      setLoadingCities(false);
    }

    return () => source.cancel();
  };

  useEffect(() => {
    if (wilaya.id) {
      const timer = setTimeout(() => {
        fetchCities();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [wilaya.id]);

  const handleValueChange = (value) => {
    const selectedItem = JSON.parse(value);
    setWilaya(selectedItem);
    setSelectedBaladya(""); // Reset baladya when wilaya changes
    seenterwilaya(true);
  };

  const handlechangebaladya = (value) => {
    setSelectedBaladya(value);
    seenterbaladya(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const endpoint =
      "https://sheet.best/api/sheets/59fd68b9-1eba-43b0-8427-2df892786071";
      
    if (
      name === "" ||
      wilaya.name === "" ||
      selectedBaladya === "" ||
      !patterns.some((pattern) => pattern.test(phoneNumber))
    ) {
      handleScroll();
      setTimeout(() => {
        setIsSubmitSuccessfully(false);
      }, 0);
      
      if (!patterns.some((pattern) => pattern.test(phoneNumber))) {
        setvalidnumber(false);
      } else {
        setvalidnumber(true);
      }
      
      if (wilaya.name === "") {
        seenterwilaya(false);
      } else {
        seenterwilaya(true);
      }
      
      if (selectedBaladya === "") {
        seenterbaladya(false);
      } else {
        seenterbaladya(true);
      }
      return;
    }

    try {
      const response = await axios.post(endpoint, {
        name: name,
        phoneNumber: "0" + phoneNumber,
        deliveryPlace: deliveryPlace,
        wilaya: wilaya.name,
        baladya: selectedBaladya,
        notes: notes,
        price: `${totalPrice}
${deliveryPlace === "office" ? totalPrice + 400 : totalPrice + 600}`,

        ...PanierItems.reduce((acc, item, index) => {
          acc[
            `product ${index + 1}`
          ] = `=LIEN_HYPERTEXTE("${item.selectedImg}"; "${item.name} 
${item.selectedColor}
${item.selectedSize}
${item.selectedAmont}")`;
          return acc;
        }, {}),
      });
      
      setTimeout(() => {
        setIsSubmitSuccessfully(true);
      }, 0);
      console.log("Form data submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitSuccessfully(false);
    }
  };

  const patterns = [
    /^0[567]\d{8}$/,
    /^(213[567]\d{8})$/,
    /^\+213[567]\d{8}$/,
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (patterns.some((pattern) => pattern.test(value))) {
      setvalidnumber(true);
    }
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    setIsSubmitSuccessfully(false);
  };

  const { PanierItems } = useContext(ShopContext);
  const { removeFromPanier } = useContext(ShopContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = PanierItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.selectedAmont),
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [PanierItems]);

  return (
    <div>
      {PanierItems.length !== 0 ? (
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col md:flex-row justify-between md:items-start container pt-6`}
        >
          <div className="md:w-[50%]">
            <label className="w-full">
              <h2 className="text-right font-bold mb-2">الاسم و اللقب</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onInvalid={handleInvalid}
                required
                className="w-full bg-[#efefef] text-[#444] py-2 outline-none text-right px-2 font-semibold text-lg"
                placeholder="الاسم و اللقب"
              />
            </label>
            <br />
            <label className="w-full">
              <h2 className="text-right font-bold mb-2">رقم الهاتف</h2>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handleChange}
                onInvalid={handleInvalid}
                required
                className="w-full bg-[#efefef] text-[#444] py-2 outline-none text-right px-2 font-semibold text-lg"
                placeholder="رقم الهاتف"
              />
              {!validnumber && (
                <p className="text-right text-red-700">
                  رقم هاتف غير صحيح
                </p>
              )}
            </label>
            <br />
            <div className="w-full">
              <h2 className="text-right font-bold mb-2">التوصيل</h2>
              <Select
                value={deliveryPlace}
                defaultValue={deliveryPlace}
                onValueChange={setDeliveryPlace}
              >
                <SelectTrigger className="w-full font-semibold bg-[#efefef] h-10 container">
                  <SelectValue placeholder="التوصيل" className="w-full" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup className="w-full">
                    <SelectItem value="office" className="w-full pr-2 text-md">
                      <div className="flex items-center w-full justify-between gap-4 mr-2">
                        <p> </p>
                        <p>التوصيل لمكتب شركة التوصيل</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="house" className="w-full text-md">
                      <p className="flex items-center justify-center gap-4 pr-2 w-full">
                        <p> </p>
                        <p>التوصيل لباب للمنزل</p>
                      </p>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <br />
            <div className="w-full">
              <h2 className="text-right font-bold mb-2">الولاية</h2>
              <Select
                value={JSON.stringify(wilaya)}
                onValueChange={handleValueChange}
              >
                <SelectTrigger className="w-full font-semibold bg-[#efefef] h-10 container">
                  <SelectValue placeholder="اختر الولاية" className="w-full" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup className="w-full">
                    {locations.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={JSON.stringify(item)}
                        className=""
                      >
                        <p className="pr-2">
                          {item.name} - {item.id}
                        </p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!enterwilaya && (
                <p className="text-right text-red-700">
                  اختر الولاية من فضلك
                </p>
              )}
            </div>
            <br />
            <div className="w-full">
              <h2 className="text-right font-bold mb-2">البلدية</h2>
              <Select
                value={selectedBaladya}
                onValueChange={handlechangebaladya}
                disabled={!wilaya.id || loadingCities}
              >
                <SelectTrigger className="w-full font-semibold bg-[#efefef] h-10 container">
                  <SelectValue 
                    placeholder={loadingCities ? "جاري التحميل..." : "اختر البلدية"} 
                    className="w-full" 
                  />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup className="w-full">
                    {baladya.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.commune_name_ascii}
                        className=""
                      >
                        <p className="pr-2">{item.commune_name_ascii}</p>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!enterbaladya && (
                <p className="text-right text-red-700">
                  اختر البلدية من فضلك
                </p>
              )}
            </div>
            <br />
            <div className="w-full">
              <h2 className="text-right font-bold mb-2">ملاحظات</h2>
              <textarea
                className="px-3 text-right border bg-[#efefef] outline-none py-2 w-full"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                name="discription"
                placeholder="ملاحظات"
                rows={4}
              />
            </div>
            <div className="max-md:hidden">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="submit"
                    className="mt-1 w-full h-10 sm:h-10 border-primary-color-100 bg-button-color-100 text-white font-bold text-md hover:bg-primary-color-100 px-6 rounded-xl"
                  >
                    تأكيد الطلب
                  </button>
                </DialogTrigger>
                {isSubmitSuccessfully && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-center w-full">
                        <img src={Logo} alt="" className="h-[120px]" />
                      </DialogTitle>
                      <DialogDescription className="text-center text-black font-semibold">
                        تم ارسال طلب المنتج بنجاح نشكرك على ثقتك بمتجرنا، سيتم
                        التواصل معك في أقل من 24 ساعة لتأكيد الطلبية
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="h-8"></DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </div>
          </div>
          <div className="pb-6 mt-3 md:w-[43%]">
            <div className="flex items-center justify-center pt-4 text-lg flex-row-reverse">
              <h2 className="font-bold text-black text-right text-2xl ml-2">
                طلبك
              </h2>
            </div>
            <ul className="w-[100%] mt-4 flex xl:justify-center items-center flex-col justify-around px-0">
              {PanierItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-[#efefef] p-1 mb-2 rounded-xl flex flex-row-reverse items-center justify-between w-full"
                >
                  <div className="flex flex-row-reverse items-center">
                    <img
                      src={item.selectedImg}
                      alt=""
                      className="h-[120px] w-[120px] ml-2"
                    />
                    <div className="text-[#444] text-sm">
                      <p>{item.name}</p>
                      <p>
                        {Number(item.price) * Number(item.selectedAmont)} DA
                      </p>
                      <p>couleur: {item.selectedColor}</p>
                      <p>pointure: {item.selectedSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center flex-row-reverse gap-3">
                    <p className="bg-grey px-1.5 py-0">
                      {item.selectedAmont}
                    </p>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-[#444] ml-3 cursor-pointer"
                      onClick={() => removeFromPanier(item)}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col justify-center items-center">
              <h2 className="font-bold text-lg mb-2">الدفع عند الاستلام</h2>
              <div>
                <div className="flex items-center flex-row-reverse">
                  <h2 className="font-bold text-md w-[140px] text-[#444] py-2 border text-center border-primary-color-100 border-b-0 rounded-tr-xl">
                    ثمن الطلبية
                  </h2>
                  <h2 className="font-semibold rounded-tl-xl text-md bg-[#efefef] w-[200px] py-2 text-center">
                    {totalPrice} DA
                  </h2>
                </div>
                <div className="flex items-center flex-row-reverse">
                  <h2 className="font-bold text-md w-[140px] text-[#444] py-2 border text-center border-primary-color-100 border-b-0">
                    ثمن التوصيل
                  </h2>
                  <h2 className="font-semibold text-md bg-[#efefef] w-[200px] py-2 text-center">
                    حسب الولاية
                  </h2>
                </div>
                <div className="flex items-center flex-row-reverse">
                  <h2 className="font-bold text-md w-[140px] text-[#444] py-2 border text-center border-primary-color-100 rounded-br-xl">
                    المجموع
                  </h2>
                  <h2 className="font-semibold text-md rounded-bl-xl bg-primary-color-100 text-white w-[200px] py-2 text-center">
                    {deliveryPlace === "office"
                      ? totalPrice + 0
                      : totalPrice + 0} DA
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="submit"
                  className="mt-1 w-full h-10 sm:h-10 border-primary-color-100 bg-button-color-100 text-white font-bold text-md hover:bg-primary-color-100 px-6 rounded-xl"
                >
                  تأكيد الطلب
                </button>
              </DialogTrigger>
              {isSubmitSuccessfully && (
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-center w-full">
                      <img src={Logo} alt="" className="h-[120px]" />
                    </DialogTitle>
                    <DialogDescription className="text-center text-black font-semibold">
                      تم ارسال طلب المنتج بنجاح نشكرك على ثقتك بمتجرنا، سيتم
                      التواصل معك في أقل من 24 ساعة لتأكيد الطلبية
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="h-8"></DialogFooter>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </form>
      ) : (
        <div className="flex justify-center flex-col items-center py-6 container">
          <svg
            className="h-32 rounded-full p-[0px] text-black"
            viewBox="-0.5 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path
              d="M18.5996 21.57C19.7042 21.57 20.5996 20.6746 20.5996 19.57C20.5996 18.4654 19.7042 17.57 18.5996 17.57C17.495 17.57 16.5996 18.4654 16.5996 19.57C16.5996 20.6746 17.495 21.57 18.5996 21.57Z"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.59961 21.57C9.70418 21.57 10.5996 20.6746 10.5996 19.57C10.5996 18.4654 9.70418 17.57 8.59961 17.57C7.49504 17.57 6.59961 18.4654 6.59961 19.57C6.59961 20.6746 7.49504 21.57 8.59961 21.57Z"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 3.55997C2 3.55997 6.64 3.49997 6 7.55997L5.31006 11.62C5.20774 12.1068 5.21778 12.6105 5.33954 13.0929C5.46129 13.5752 5.69152 14.0234 6.01263 14.4034C6.33375 14.7833 6.73733 15.0849 7.19263 15.2854C7.64793 15.4858 8.14294 15.5797 8.64001 15.56H16.64C17.7479 15.5271 18.8119 15.1196 19.6583 14.404C20.5046 13.6884 21.0834 12.7069 21.3 11.62L21.9901 7.50998C22.0993 7.0177 22.0939 6.50689 21.9744 6.017C21.8548 5.52712 21.6242 5.07126 21.3005 4.68467C20.9767 4.29807 20.5684 3.99107 20.1071 3.78739C19.6458 3.58371 19.1438 3.48881 18.64 3.50998H9.94"
              stroke="#666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-[#666] font-bold text-lg">
            سلة التسوق الخاصة بك فارغة
          </h2>
        </div>
      )}
    </div>
  );
};

export default FormComponent;
