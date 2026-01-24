import { CustomFormField, Form } from "../../../components/form";
import { useEffect, useState } from "react";

import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { editSO } from "../../../services/struktur-organisasi";
import { strukturOrganisasiSchema } from "../../../services/struktur-organisasi/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSOData } from "./hooks/useSOData";
import { zodResolver } from "@hookform/resolvers/zod";

const StrukturOrganisasiAdmin = () => {
  const soData = useSOData();

  const [imgUrl, setImgUrl] = useState("");

  const form = useForm({
    resolver: zodResolver(strukturOrganisasiSchema),
    defaultValues: {
      img: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("img");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Only append the file if it exists
      if (data.img && data.img.length > 0) {
        formData.append("img", data.img[0]);
      }
      await editSO(formData); // Pass FormData to post function
      toast.success("Struktur organisasi has been update");
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (soData) {
      setImgUrl(soData.img);
    }
  }, [soData, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setImgUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Tambah Struktur Organisasi</h1>

      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <CustomFormField control={form.control} name="img" label="Image">
            {() => (
              <>
                {imgUrl && (
                  <div className="flex w-full justify-center ">
                    <img src={imgUrl} className=" max-h-72" />
                  </div>
                )}

                <Input
                  {...form.register("img")}
                  id="img"
                  type="file"
                  variant="file"
                  accept="image/jpeg, image/png, image/gif, image/webp"
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

export default StrukturOrganisasiAdmin;
