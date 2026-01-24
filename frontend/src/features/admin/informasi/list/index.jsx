import React, { useEffect, useState } from "react";

import { Button } from "../../../../components/button";
import CustomPagination from "../../../../components/pagination";
import CustomTable from "../../../../components/table";
import { Hash } from "../../../../constants";
import { Input } from "../../../../components/input";
import { deleteInformasi } from "../../../../services/informasi";
import { toast } from "sonner";
import { useInformasiData } from "../hooks/useInformasiData";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const navigate = useNavigate();
  const { informasiData, setParams, params, paginationInfo } =
    useInformasiData();
  const [keyword, setKeyword] = useState("");

  // Columns definition
  const columns = [
    {
      header: "Title",
      accessor: "title",
      headerClassName: "text-left font-bold",
    },
    {
      header: "Description",
      accessor: "description",
      headerClassName: "text-left font-bold",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  // Table Data
  const data = informasiData.map((item) => {
    return {
      ...item,
      action: (
        <div className="flex flex-row gap-3">
          <Button onClick={() => handleDetail(item.id)}>Edit</Button>
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
      await deleteInformasi(id);
      setParams({
        ...params,
      });
      toast.success("Informasi has been deleted");
    } catch (error) {
      console.error("Error deleting informasi:", error);
    }
  };

  const handleAdd = () => {
    navigate(Hash.DETAIL);
  };

  const handleDetail = (id) => {
    navigate(`?id=${id}${Hash.DETAIL}`);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">Data Informasi</h1>
      <br />
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <Input
            variant={"default"}
            fieldSize={"default"}
            type={"text"}
            placeholder={"Enter keyword"}
            onChange={handleChangeKeyword}
          />
          <Button onClick={handleSearch}>Cari</Button>
        </div>
        <Button onClick={handleAdd}>Tambah Informasi</Button>
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
