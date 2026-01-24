import { CustomFormField, Form } from "../../../../components/form";
import React, { useEffect, useState } from "react";
import {
  editLayananTerpadu,
  postLayananTerpadu,
} from "../../../../services/layanan-terpadu";

import { Button } from "../../../../components/button";
import DropdownSelect from "../../../../components/select";
import { Input } from "../../../../components/input";
import { layananTerpaduSchema } from "../../../../services/layanan-terpadu/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useLayananTerpaduDetail } from "../hooks/useLayananTerpaduDetail";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../../hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";

const platformOptions = [
  { value: "website", label: "Website" },
  { value: "mobile", label: "Mobile" },
];

const DetailPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();

  const layananTerpaduDetail = useLayananTerpaduDetail(id);

  const [imgUrl, setImgUrl] = useState("");

  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(layananTerpaduSchema(isEdit)),
    defaultValues: {
      title: "",
      platform: "",
      description: "",
      url: "",
      img: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("img");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("url", data.url);
    formData.append("platform", data.platform);
    formData.append("description", data.description);

    // Only append the file if it exists
    if (data.img && data.img.length > 0) {
      formData.append("img", data.img[0]);
    }

    try {
      if (isEdit) {
        await editLayananTerpadu(id, formData);
        toast.success("Layanan Terpadu has been updated");
      } else {
        await postLayananTerpadu(formData);
        toast.success("Layanan Terpadu has been created");
      }
      navigate("/admin/layanan-terpadu", { replace: true });
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
    if (layananTerpaduDetail) {
      form.reset({ ...layananTerpaduDetail, img: "" });
      setImgUrl(layananTerpaduDetail.img);
    }
  }, [layananTerpaduDetail, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setImgUrl(URL.createObjectURL(fileWatcher[0]));
    }
  }, [fileWatcher]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Layanan Terpadu" : "Tambah Layanan Terpadu"}
      </h1>

      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <CustomFormField control={form.control} name="title" label="Title">
            {(field) => (
              <Input
                {...field}
                placeholder="Input Title"
                type="text"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField control={form.control} name="url" label="Url">
            {(field) => (
              <Input
                {...field}
                placeholder="Input Url"
                type="text"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="description"
            label="Description"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Input description"
                type="text"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="platform"
            label="Platform"
          >
            {(field) => (
              <DropdownSelect
                name="platform"
                placeholder="Select Option"
                emptyState="No options available"
                data={platformOptions}
                value={
                  platformOptions.find((option) => option.value === field.value)
                    ?.value
                }
                onChange={(e) => field.onChange(e?.target.value)}
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField control={form.control} name="img" label="Image">
            {() => (
              <>
                {imgUrl && (
                  <div className="flex w-full justify-center">
                    <img src={imgUrl} className="max-h-72" alt="Preview" />
                  </div>
                )}

                <Input
                  {...form.register("img")}
                  id="img"
                  type="file"
                  accept="image/jpeg, image/png, image/gif, image/webp"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                />
              </>
            )}
          </CustomFormField>

          <div className="flex flex-row gap-5 mt-4 justify-end">
            <Button
              variant="secondary"
              onClick={() =>
                navigate("/admin/layanan-terpadu", { replace: true })
              }
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
