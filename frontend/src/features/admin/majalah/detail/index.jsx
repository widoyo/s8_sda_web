import { CustomFormField, Form } from "../../../../components/form";
import React, { useEffect, useState } from "react";
import { editMajalah, postMajalah } from "../../../../services/majalah";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { majalahSchema } from "../../../../services/majalah/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useMajalahDetail } from "../hooks/useMajalahDetail";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../../hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();

  const majalahDetail = useMajalahDetail(id);

  const [imgUrl, setImgUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(majalahSchema(isEdit)),
    defaultValues: {
      title: "",
      thumbnail: "",
      majalah: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("thumbnail");
  const fileWatcherMajalah = form.watch("majalah");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);

    // Only append the file if it exists
    if (data.thumbnail && data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    if (data.majalah && data.majalah.length > 0) {
      formData.append("majalah", data.majalah[0]);
    }

    try {
      if (isEdit) {
        await editMajalah(id, formData); // Pass FormData to edit function
        toast.success("Majalah has been updated");
      } else {
        await postMajalah(formData); // Pass FormData to post function
        toast.success("Majalah has been created");
      }
      navigate("/admin/majalah", { replace: true });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form");
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (majalahDetail) {
      form.reset({
        ...majalahDetail,
        thumbnail: "",
        majalah: "",
      });
      setImgUrl(majalahDetail.thumbnail);
      setPdfUrl(majalahDetail.url);
    }
  }, [majalahDetail, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setImgUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  useEffect(() => {
    if (fileWatcherMajalah?.length > 0) {
      setPdfUrl(URL.createObjectURL(fileWatcherMajalah?.[0]));
    }
  }, [fileWatcherMajalah]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Majalah" : "Tambah Majalah"}
      </h1>

      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <CustomFormField control={form.control} name="title" label="Title">
            {(field) => (
              <Input
                {...field}
                placeholder="Input title"
                type="text"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="thumbnail"
            label="Thumbnail"
          >
            {() => (
              <>
                {imgUrl && (
                  <div className="flex w-full justify-center ">
                    <img src={imgUrl} className=" max-h-72" />
                  </div>
                )}

                <Input
                  {...form.register("thumbnail")}
                  id="thumbnail"
                  type="file"
                  variant="file"
                  accept="image/jpeg, image/png, image/gif, image/webp"
                />
              </>
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="majalah"
            label="Majalah"
          >
            {() => (
              <>
                {pdfUrl && (
                  <div className="flex w-full justify-center ">
                    <iframe
                      src={pdfUrl}
                      width="100%"
                      height="400"
                      style={{ border: "none" }}
                      title="PDF Viewer"
                    />
                  </div>
                )}

                <Input
                  {...form.register("majalah")}
                  id="majalah"
                  type="file"
                  variant="file"
                  accept="application/pdf"
                />
              </>
            )}
          </CustomFormField>

          <div className="flex flex-row gap-5 mt-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/majalah", { replace: true })}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? `Submitting` : isEdit ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailPage;
