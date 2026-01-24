import { CustomFormField, Form } from "../../../../components/form";
import { editRpsda, postRpsda } from "../../../../services/rpsda";
import { useEffect, useState } from "react";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { rpsdaSchema } from "../../../../services/rpsda/form";
import { toast } from "sonner";
import { useRpsdaDetail } from "../hooks/useRpsdaDetail";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../../hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();

  const rpsdaDetail = useRpsdaDetail(id);

  const [pdfUrl, setPdfUrl] = useState("");

  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(rpsdaSchema(isEdit)),
    defaultValues: {
      title: "",
      rpsda: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("rpsda");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);

    if (data.rpsda && data.rpsda.length > 0) {
      formData.append("rpsda", data.rpsda[0]);
    }

    try {
      if (isEdit) {
        await editRpsda(id, formData); // Pass FormData to edit function
        toast.success("RPSDA has been updated");
      } else {
        await postRpsda(formData); // Pass FormData to post function
        toast.success("RPSDA has been created");
      }
      navigate("/admin/rpsda", { replace: true });
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
    if (rpsdaDetail) {
      form.reset({
        ...rpsdaDetail,
        rpsda: "",
      });
      setPdfUrl(rpsdaDetail.url);
    }
  }, [rpsdaDetail, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setPdfUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit RPSDA" : "Tambah RPSDA"}
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

          <CustomFormField control={form.control} name="rpsda" label="RPSDA">
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
                  {...form.register("rpsda")}
                  id="rpsda"
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
              onClick={() => navigate("/admin/rpsda", { replace: true })}
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
