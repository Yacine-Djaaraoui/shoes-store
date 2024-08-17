import * as React from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { useState, useEffect, useCallback, useRef } from "react";
import { ShopContext } from "./ShopContext";

interface ImagesProps {
  images: string[];
}

interface Offset {
  left: number;
  top: number;
}

export function ProductImages({ images }: ImagesProps) {
  const [imageSelected, setImageSelected] = useState(0);
  const { imgpsition, setimgposition, imgColor, imgName, setImgName } =
    React.useContext(ShopContext);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState<Offset>({ left: 0, top: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLImageElement>(null);
  const targetRef = useRef<HTMLImageElement>(null);

  const imagesWithcolor = images.filter((image) => image.includes(imgColor));
  const otherImages = images.filter((image) => !image.includes(imgColor));
  const orderedImages = [...imagesWithcolor, ...otherImages];

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

  const handleMouseEnter = () => setOpacity(1);

  const handleMouseLeave = () => setOpacity(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (targetRef.current && sourceRef.current && containerRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const sourceRect = sourceRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const xRatio =
        (targetRect.width - containerRect.width) / sourceRect.width;
      const yRatio =
        (targetRect.height - containerRect.height) / sourceRect.height;

      const left = Math.max(
        Math.min(e.pageX - sourceRect.left, sourceRect.width),
        0
      );
      const top = Math.max(
        Math.min(e.pageY - sourceRect.top, sourceRect.height),
        0
      );

      setOffset({
        left: left * -xRatio,
        top: top * -yRatio,
      });
    }
  };

  return (
    <Carousel className="w-full max-w-full rounded-3xl pb-1 bg-primary-color-100 overflow-hidden ">
      <CarouselContent className="">
        {orderedImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-0 relative">
                  <div
                    ref={containerRef}
                    className="relative w-full h-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                  >
                    <img
                      ref={sourceRef}
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <img
                      ref={targetRef}
                      src={image}
                      alt=""
                      className="absolute top-0 left-0 object-cover opacity-0 pointer-events-none"
                      style={{
                        transform: `translate(${offset.left}px ${offset.top}px) scale(2)`,
                        opacity: opacity,
                        width: "120%",
                        height: "120%",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <ul className="flex w-full justify-center items-center mt-1">
        {orderedImages.map((item, ind) => (
          <li
            key={ind}
            className={`w-2 h-2 mx-0.5 bg-[#d1cfc2] rounded-full ${
              ind === imgpsition ? "h-2.5 w-2.5 bg-grey" : "none"
            }`}
          >
            {" "}
          </li>
        ))}
      </ul>
    </Carousel>
  );
}
