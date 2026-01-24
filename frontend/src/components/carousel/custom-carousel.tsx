import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from ".";

import Autoplay from "embla-carousel-autoplay";
import React from "react";

interface CustomCarouselProps {
  items: React.ReactNode[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ items }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative" // Ensures the container is positioned relative
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>{item}</CarouselItem>
        ))}
      </CarouselContent>
      {/* Position buttons absolutely within the CarouselContent */}
      <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none" />
      <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none" />
    </Carousel>
  );
};

export default CustomCarousel;
