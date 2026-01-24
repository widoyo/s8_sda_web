import { CustomFormField, Form } from "../../../components/form";
import { useEffect, useState } from "react";

import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { editPrediksiCuaca } from "../../../services/prediksi-cuaca";
import { prediksiCuacaSchema } from "../../../services/prediksi-cuaca/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { usePrediksiCuacaData } from "./hooks/usePrediksiCuacaData";
import { zodResolver } from "@hookform/resolvers/zod";

const PrediksiCuacaAdmin = () => {
  const prediksiCuacaData = usePrediksiCuacaData();

  const [imgUrl, setImgUrl] = useState("");

  const form = useForm({
    resolver: zodResolver(prediksiCuacaSchema),
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
      await editPrediksiCuaca(formData); // Pass FormData to post function
      toast.success("Prediksi Cuaca has been update");
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (prediksiCuacaData) {
      setImgUrl(prediksiCuacaData.img);
    }
  }, [prediksiCuacaData, form]);

  useEffect(() => {
    if (fileWatcher?.length > 0) {
      setImgUrl(URL.createObjectURL(fileWatcher?.[0]));
    }
  }, [fileWatcher]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Tambah Prediksi Cuaca</h1>

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

export default PrediksiCuacaAdmin;
