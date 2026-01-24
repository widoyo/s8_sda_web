import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/carousel";

import { Button } from "../../../components/button";
import Card from "../../../components/card";
import { Hash } from "../../../constants";
import { truncateText } from "../../../utils/truncate-text";
import { useBeritaData } from "../../home/hooks/useBeritaData";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../../../components/input";

const BeritaTerkini = () => {
  const navigate = useNavigate();
  const { beritaData, setParams, params } = useBeritaData();
  const [keyword, setKeyword] = useState("");

  const highlightedBerita = beritaData?.filter((item) => item.highlighted);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(beritaData.length / itemsPerPage);

  // Get current items to display
  const currentData = beritaData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
    setParams({
      ...params,
      search: keyword,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* <img
        className="w-full h-[400px] object-cover"
        src={callCenter}
        alt="Call center picture"
      /> */}
      <section>
        {highlightedBerita?.length > 0 ? (
          <Carousel autoSlide={true} interval={5000} className="w-full">
            <CarouselContent className="-ml-1">
              {highlightedBerita.map((item, index) => (
                <CarouselItem key={index} className="pl-1 relative">
                  <Card
                    shadow={true}
                    rounded={true}
                    onClick={() =>
                      navigate(`/berita?id=${item.id}${Hash.DETAIL}`)
                    }
                  >
                    <img
                      src={item.img}
                      alt={"photo"}
                      className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end">
                      <h1 className="min-w-96 w-fit text-xl text-white bg-indigo p-5 rounded-tr-md">
                        {truncateText(item.title, 60)}
                      </h1>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none" />
            <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none" />
          </Carousel>
        ) : (
          "No highlighted news available"
        )}
      </section>

      <section className="p-10">
        <h1 className="text-2xl text-indigo font-bold">BERITA TERKINI</h1>
      </section>

      <div className="flex w-full gap-4 items-center px-10 pb-5">
        <Input
          variant={"default"}
          fieldSize={"default"}
          type={"text"}
          placeholder={"Cari Berita"}
          onChange={handleChangeKeyword}
        />
        <Button
          onClick={handleSearch}
          className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950"
        >
          Cari
        </Button>
      </div>

      <section className="flex flex-col lg:flex-row gap-10 px-10">
        <div className="container mx-auto py-8 w-full lg:w-3/4">
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentData?.slice(0, 9).map((item, index) => (
              <Card
                key={index}
                shadow={true}
                rounded={true}
                className="transition-transform transform hover:scale-105 hover:shadow-lg h-full"
              >
                <img
                  src={item.img}
                  alt="photo"
                  className="w-full h-[200px] object-cover rounded-t-md"
                />
                <div className="p-4 space-y-2 flex flex-col justify-between h-full">
                  <div>
                    <h1 className="text-xl text-indigo">
                      {truncateText(item.title, 60)}
                    </h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: truncateText(item.description, 220),
                      }}
                      className="text-sm text-justify"
                    ></p>
                  </div>
                  <div className="flex justify-end mt-auto">
                    <Button
                      className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950 self-end"
                      onClick={() =>
                        navigate(`/berita?id=${item.id}${Hash.DETAIL}`)
                      }
                    >
                      Selengkapnya
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white bg-indigo rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === index + 1
                    ? "bg-indigo text-white"
                    : "bg-white text-indigo-500"
                } hover:bg-indigo hover:text-white`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white bg-indigo rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-5 border border-indigo rounded-sm mx-auto lg:w-1/3 w-full">
          <h1 className="text-2xl border-b border-b-indigo p-2 bg-indigo text-white">
            Berita Terkini
          </h1>
          <div className="flex flex-col ">
            {beritaData.map((item, index) => (
              <Card
                key={index}
                shadow={true}
                rounded={true}
                className="transition-transform transform hover:scale-95 hover:shadow-lg cursor-pointer"
                onClick={() => navigate(`/berita?id=${item.id}${Hash.DETAIL}`)}
              >
                <div className="flex p-2">
                  <img
                    src={item.img}
                    alt={"photo"}
                    className="h-36 w-36 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h1 className="text-md text-indigo">
                      {truncateText(item.title, 100)}
                    </h1>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeritaTerkini;
