import { CustomFormField, Form } from "../../../../components/form";
import {
  editPengumuman,
  postPengumuman,
} from "../../../../services/pengumuman";
import { useEffect, useState } from "react";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { pengumumanSchema } from "../../../../services/pengumuman/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePengumumanDetail } from "../hooks/usePengumumanDetail";
import { useQuery } from "../../../../hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();

  const pengumumanDetail = usePengumumanDetail(id);

  const [fileUrl, setFileUrl] = useState("");

  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(pengumumanSchema(isEdit)),
    defaultValues: {
      title: "",
      pengumuman: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("pengumuman");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);

    if (data.pengumuman && data.pengumuman.length > 0) {
      formData.append("pengumuman", data.pengumuman[0]);
    }

    try {
      if (isEdit) {
        await editPengumuman(id, formData); // Pass FormData to edit function
        toast.success("Pengumuman has been updated");
      } else {
        await postPengumuman(formData); // Pass FormData to post function
        toast.success("Pengumuman has been created");
      }
      console.log("Form submitted successfully");
      navigate("/admin/pengumuman", { replace: true });
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
    if (pengumumanDetail) {
      form.reset({
        ...pengumumanDetail,
        pengumuman: "",
      });
      setFileUrl(pengumumanDetail.url);
    }
  }, [pengumumanDetail, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setFileUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Pengumuman" : "Tambah Pengumuman"}
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
            name="pengumuman"
            label="Pengumuman"
          >
            {() => (
              <>
                {fileUrl && (
                  <div className="flex w-full justify-center ">
                    <iframe
                      src={fileUrl}
                      width="100%"
                      height="400"
                      style={{ border: "none" }}
                      title="File Viewer"
                    />
                  </div>
                )}

                <Input
                  {...form.register("pengumuman")}
                  id="pengumuman"
                  type="file"
                  variant="file"
                  accept="application/pdf, image/jpeg, image/png, image/webp"
                />
              </>
            )}
          </CustomFormField>

          <div className="flex flex-row gap-5 mt-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/pengumuman", { replace: true })}
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
