import * as React from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { useState, useEffect, useCallback } from "react";
import { ShopContext } from "./ShopContext";
import ReactImageMagnify from "react-image-magnify";

interface ImagesProps {
  images: string[];
}

export function ProductImages({ images }: ImagesProps) {
  const [imageSelected, setImageSelected] = useState(0);
  const { imgpsition, setimgposition, imgColor, imgName, setImgName } =
    React.useContext(ShopContext);

  const imagesWithColor = images.filter((image) => image.includes(imgColor));
  const otherImages = images.filter((image) => !image.includes(imgColor));
  const orderedImages = [...imagesWithColor, ...otherImages];

  const handleSelect = useCallback(
    (index: number) => {
      setimgposition(index);
      setImgName(images[index]);
    },
    [images, setimgposition, setImgName]
  );

  useEffect(() => {
    handleSelect(imgpsition);
  }, [imgpsition, handleSelect]);

  return (
    <Carousel className="w-full max-w-full rounded-3xl pb-1 bg-primary-color-100 overflow-hidden">
      <CarouselContent>
        {orderedImages.map((image, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex flex-col aspect-square items-center justify-center p-0">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: `Product Image ${index + 1}`,
                      isFluidWidth: true,
                      src: image,
                    },
                    largeImage: {
                      src: image,
                      width: 1200,
                      height: 1200,
                    },
                    enlargedImageContainerStyle: { zIndex: 9 },
                    lensStyle: { backgroundColor: "rgba(0,0,0,.3)" },
                  }}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <ul className="flex w-full justify-center items-center mt-1">
        {orderedImages.map((_, ind) => (
          <li
            key={ind}
            className={`w-2 h-2 mx-0.5 bg-[#d1cfc2] rounded-full ${
              ind === imgpsition ? "h-2.5 w-2.5 bg-grey" : "none"
            }`}
          ></li>
        ))}
      </ul>
    </Carousel>
  );
}
