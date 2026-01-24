import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/carousel";

import Autoplay from "embla-carousel-autoplay";
import { Button } from "../../components/button";
import Card from "../../components/card";
import React from "react";
export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  );
}

const Product = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[400px] object-cover"
        src={
          "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.11.43.jpeg"
        }
        alt="Call center picture"
      />

      <section className="flex flex-col bg-white mx-20 p-10 -mt-28 rounded-t-sm">
        <h1 className="text-2xl text-indigo font-bold mb-6">PRODUK TERBARU</h1>
        <div className="flex flex-row">
          <div className="md:w-1/2 w-full px-4">
            <img
              className="w-full rounded-md shadow-md h-[400px] object-cover"
              src={
                "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/DALL%C2%B7E%202024-06-30%2002.46.40%20-%20A%20photo%20of%20a%20community%20in%20Sumatera%20participating%20in%20a%20local%20event.%20The%20image%20should%20show%20a%20group%20of%20people,%20including%20children%20and%20adults,%20gathered%20in%201.png"
              }
              alt="Community picture"
            />
          </div>
          <div className="md:w-1/2 w-full px-4">
            <h2 className="text-2xl font-bold">Irigasi Pertanian</h2>
            <div className=" border-t w-20 border-white my-4" />
            <p className="mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
            <p>
              Lorem desa ga paradasa galvoluptas sit aspernatur aut odit aut
              fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center bg-indigo p-10">
        <div className="text-2xl text-white">Produk Berjalan</div>
        <div className=" border-t w-20 border-white my-4" />
        <Carousel
          className="w-full px-20 pt-10"
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent className="-ml-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className={`pl-1 md:basis-1/3 lg:basis-1/5 p-2 `}
              >
                <Card shadow={true} rounded={true}>
                  <img
                    src={
                      "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/DALL%C2%B7E%202024-06-29%2000.48.43%20-%20A%20photo%20of%20a%20large%20construction%20site%20for%20a%20river%20project%20in%20Sumatera.%20The%20site%20should%20include%20various%20construction%20machinery%20such%20as%20excavators,%20bulld%201.png"
                    }
                    alt={"photo"}
                    className="w-full h-auto object-cover rounded-t-md"
                  />
                  <div className="p-4 space-y-2 bg-white rounded-b-md">
                    <h1 className="text-xl text-indigo">Produk</h1>
                    <p className="text-sm text-justify">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vel ut expedita quasi cupi...
                    </p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none" />
        </Carousel>
      </section>

      <section className="p-10">
        <h1 className="text-2xl text-indigo font-bold">PRODUK</h1>
      </section>
      <section className="flex flex-col gap-10 px-20 pb-20">
        <Card shadow={true} rounded={true} size="w-full">
          <div className="flex">
            <img
              src={
                "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/DALL%C2%B7E%202024-06-29%2000.48.43%20-%20A%20photo%20of%20a%20large%20construction%20site%20for%20a%20river%20project%20in%20Sumatera.%20The%20site%20should%20include%20various%20construction%20machinery%20such%20as%20excavators,%20bulld%201.png"
              }
              alt={"photo"}
              className="w-full h-auto object-cover rounded-l-md"
            />
            <div className="p-4 space-y-2">
              <h1 className="text-xl text-indigo font-bold">
                LOREM IPSUM DOLOR SIT AMET 2024 KA SA LOR MA
              </h1>
              <div className="flex justify-between font-bold">
                <p>Palembang</p>
              </div>
              <p className="text-sm text-justify">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
              <p className="text-sm text-justify">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
            </div>
          </div>
        </Card>
        <Card shadow={true} rounded={true} size="w-full">
          <div className="flex">
            <img
              src={
                "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/DALL%C2%B7E%202024-06-29%2000.48.43%20-%20A%20photo%20of%20a%20large%20construction%20site%20for%20a%20river%20project%20in%20Sumatera.%20The%20site%20should%20include%20various%20construction%20machinery%20such%20as%20excavators,%20bulld%201.png"
              }
              alt={"photo"}
              className="w-full h-auto object-cover rounded-l-md"
            />
            <div className="p-4 space-y-2">
              <h1 className="text-xl text-indigo font-bold">
                LOREM IPSUM DOLOR SIT AMET 2024 KA SA LOR MA
              </h1>
              <div className="flex justify-between font-bold">
                <p>Palembang</p>
              </div>
              <p className="text-sm text-justify">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
              <p className="text-sm text-justify">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Product;
