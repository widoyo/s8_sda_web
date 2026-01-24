import { CustomFormField, Form } from "../../../../components/form";
import { editDipa, postDipa } from "../../../../services/dipa";
import { useEffect, useState } from "react";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { dipaSchema } from "../../../../services/dipa/form";
import { toast } from "sonner";
import { useDipaDetail } from "../hooks/useDipaDetail";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../../hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();

  const dipaDetail = useDipaDetail(id);

  const [pdfUrl, setPdfUrl] = useState("");

  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(dipaSchema(isEdit)),
    defaultValues: {
      title: "",
      dipa: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("dipa");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);

    if (data.dipa && data.dipa.length > 0) {
      formData.append("dipa", data.dipa[0]);
    }

    try {
      if (isEdit) {
        await editDipa(id, formData); // Pass FormData to edit function
        toast.success("Dipa has been updated");
      } else {
        await postDipa(formData); // Pass FormData to post function
        toast.success("Dipa has been created");
      }
      navigate("/admin/dipa", { replace: true });
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
    if (dipaDetail) {
      form.reset({
        ...dipaDetail,
        dipa: "",
      });
      setPdfUrl(dipaDetail.url);
    }
  }, [dipaDetail, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setPdfUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Dipa" : "Tambah Dipa"}
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

          <CustomFormField control={form.control} name="dipa" label="Dipa">
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
                  {...form.register("dipa")}
                  id="dipa"
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
              onClick={() => navigate("/admin/dipa", { replace: true })}
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
