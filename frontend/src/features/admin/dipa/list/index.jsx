import React, { useState } from "react";

import { Button } from "../../../../components/button";
import CustomPagination from "../../../../components/pagination";
import CustomTable from "../../../../components/table";
import { Hash } from "../../../../constants";
import { Input } from "../../../../components/input";
import { deleteDipa } from "../../../../services/dipa";
import { toast } from "sonner";
import { useDipaData } from "../hooks/useDipaData";
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const navigate = useNavigate();
  const { dipaData, setParams, params, paginationInfo } = useDipaData();
  const [keyword, setKeyword] = useState("");

  // Columns definition
  const columns = [
    {
      header: "Title",
      accessor: "title",
      headerClassName: "text-left font-bold",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];

  // Table Data
  const data = dipaData.map((item) => {
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
      await deleteDipa(id);
      setParams({
        ...params,
      });
      toast.success("Dipa has been deleted");
    } catch (error) {
      console.error("Error deleting dipa:", error);
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
      <h1 className="text-2xl font-bold">Data Dipa</h1>
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
        <Button onClick={handleAdd}>Tambah Dipa</Button>
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
