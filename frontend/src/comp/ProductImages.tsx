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

interface ImagesProps {
  images: string[];
}

interface ImageMagnifierProps {
  src: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2,
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left } = imgRef.current!.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setMagnifierPosition({ x, y });
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt="Magnified"
        ref={imgRef}
        className="w-full h-full object-cover"
      />
      {showMagnifier && (
        <div
          className="absolute pointer-events-none"
          style={{
            height: magnifierHeight,
            width: magnifierWidth,
            top: magnifierPosition.y - magnifierHeight / 2,
            left: magnifierPosition.x - magnifierWidth / 2,
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "1px solid lightgray",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgRef.current!.width * zoomLevel}px ${
              imgRef.current!.height * zoomLevel
            }px`,
            backgroundPositionX: `${
              -magnifierPosition.x * zoomLevel + magnifierWidth / 2
            }px`,
            backgroundPositionY: `${
              -magnifierPosition.y * zoomLevel + magnifierHeight / 2
            }px`,
          }}
        />
      )}
    </div>
  );
};

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
                <ImageMagnifier src={image} zoomLevel={2} />
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
