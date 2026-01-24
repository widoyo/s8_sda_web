import { CustomFormField, Form } from "../../../components/form";
import { useEffect, useState } from "react";

import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { editPR } from "../../../services/pola-rencana";
import { polaRencanaSchema } from "../../../services/pola-rencana/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { usePRData } from "./hooks/usePRData";
import { zodResolver } from "@hookform/resolvers/zod";

const PolaRencanaAdmin = () => {
  const prData = usePRData();

  const [pdfUrl, setPdfUrl] = useState("");

  const form = useForm({
    resolver: zodResolver(polaRencanaSchema),
    defaultValues: {
      pdf: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("pdf");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Only append the file if it exists
      if (data.pdf && data.pdf.length > 0) {
        formData.append("pdf", data.pdf[0]);
      }
      await editPR(formData); // Pass FormData to post function
      toast.success("Pola dan rencana has been update");
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (prData) {
      setPdfUrl(prData.pdf);
    }
  }, [prData, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setPdfUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Tambah Pola dan Rencana</h1>

      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <CustomFormField control={form.control} name="pdf" label="PDF">
            {() => (
              <>
                {pdfUrl && (
                  <div className="flex w-full justify-center ">
                    <iframe
                      src={pdfUrl}
                      width="100%"
                      height="800"
                      style={{ border: "none" }}
                      title="PDF Viewer"
                    />
                  </div>
                )}

                <Input
                  {...form.register("pdf")}
                  id="pdf"
                  type="file"
                  variant="file"
                  accept="application/pdf"
                />
              </>
            )}
          </CustomFormField>

          <div className="flex flex-row gap-5 mt-4 justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? `Updating` : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PolaRencanaAdmin;
