import React, { useState } from "react";

import { Button } from "../../../../components/button";
import CustomPagination from "../../../../components/pagination";
import CustomTable from "../../../../components/table";
import { Hash } from "../../../../constants";
import { deleteBanner } from "../../../../services/banner";
import { deleteYoutube } from "../../../../services/youtube/api";
import { toast } from "sonner";
import { useBannerData } from "../hooks/useBannerData";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const navigate = useNavigate();
  const { bannerData, setParams, params, paginationInfo } = useBannerData();

  // Columns definition
  const columns = [
    {
      header: "Banner",
      accessor: "url",
      headerClassName: "text-left font-bold",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  // Table Data
  const data = bannerData.map((item) => {
    return {
      ...item,
      url: (
        <div>
          <img
            src={item.url}
            alt="Banner"
            className="w-full object-cover h-auto" // Ensure full width
          />
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

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
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
      <h1 className="text-2xl font-bold">Data Banner</h1>
      <br />
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center"></div>
        <Button onClick={handleAdd}>Tambah Banner</Button>
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
