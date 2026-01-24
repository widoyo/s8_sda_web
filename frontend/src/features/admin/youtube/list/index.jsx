import React, { useState } from "react";

import { Button } from "../../../../components/button";
import CustomPagination from "../../../../components/pagination";
import CustomTable from "../../../../components/table";
import { Hash } from "../../../../constants";
import { Input } from "../../../../components/input";
import { deleteYoutube } from "../../../../services/youtube/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useYoutubeData } from "../hooks/useYoutubeData";

const ListPage = () => {
  const navigate = useNavigate();
  const { youtubeData, setParams, params, paginationInfo } = useYoutubeData();
  const [keyword, setKeyword] = useState("");

  // Columns definition
  const columns = [
    {
      header: "Youtube",
      accessor: "url",
      headerClassName: "text-left font-bold",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  // Table Data
  const data = youtubeData.map((item) => {
    return {
      ...item,
      url: (
        <div>
          <iframe
            src={item.url}
            className="w-full h-60"
            allowFullScreen
            loading="lazy"
            onClick={(e) => e.stopPropagation()} // Prevent the iframe click from triggering the modal
          ></iframe>
        </div>
      ),
      action: (
        <div className="flex flex-row gap-3">
          <Button onClick={() => handleDelete(item.id)} variant="destructive">
            Delete
          </Button>
        </div>
      ),
    };
  });

  const handlePageChange = (page) => {
    setParams({
      ...params,
      page: page,
    });
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

  const handleDelete = async (id) => {
    try {
      await deleteYoutube(id);
      setParams({
        ...params,
      });
      toast.success("Youtube has been deleted");
    } catch (error) {
      console.error("Error deleting youtube:", error);
    }
  };

  const handleAdd = () => {
    navigate(Hash.DETAIL);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Data Youtube</h1>
      <br />
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center"></div>
        <Button onClick={handleAdd}>Tambah Youtube</Button>
      </div>

      <CustomTable
        columns={columns}
        data={data}
        className="mt-4 mb-10 border-collapse border border-gray-200 shadow-lg"
        headerClassName="bg-gray-100 text-gray-700"
        bodyClassName="bg-white"
      />
      {paginationInfo.totalPages > 1 && (
        <CustomPagination
          currentPage={paginationInfo.currentPage}
          totalPageCount={paginationInfo.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ListPage;
