import { CustomFormField, Form } from "../../../../components/form";
import { editPeraturan, postPeraturan } from "../../../../services/peraturan";
import { useEffect, useState } from "react";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { peraturanSchema } from "../../../../services/peraturan/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePeraturanDetail } from "../hooks/usePeraturanDetail";
import { useQuery } from "../../../../hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();

  const peraturanDetail = usePeraturanDetail(id);

  const [fileUrl, setFileUrl] = useState("");

  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(peraturanSchema(isEdit)),
    defaultValues: {
      title: "",
      peraturan: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("peraturan");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);

    if (data.peraturan && data.peraturan.length > 0) {
      formData.append("peraturan", data.peraturan[0]);
    }

    try {
      if (isEdit) {
        await editPeraturan(id, formData); // Pass FormData to edit function
        toast.success("Peraturan has been updated");
      } else {
        await postPeraturan(formData); // Pass FormData to post function
        toast.success("Peraturan has been created");
      }
      console.log("Form submitted successfully");
      navigate("/admin/peraturan", { replace: true });
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
    if (peraturanDetail) {
      form.reset({
        ...peraturanDetail,
        peraturan: "",
      });
      setFileUrl(peraturanDetail.url);
    }
  }, [peraturanDetail, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setFileUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Peraturan" : "Tambah Peraturan"}
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
            name="peraturan"
            label="Peraturan"
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
                  {...form.register("peraturan")}
                  id="peraturan"
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
              onClick={() => navigate("/admin/peraturan", { replace: true })}
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
