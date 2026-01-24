import { CustomFormField, Form } from "../../../../components/form";
import {
  editPetaGeospasial,
  postPetaGeospasial,
} from "../../../../services/peta-geospasial";
import { useEffect, useState } from "react";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import SpatialMap from "../../../../components/spatial-map";
import { petaGeolocationSchema } from "../../../../services/peta-geospasial/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePetaGeospasialDetail } from "../hooks/usePetaGeospasialDetail";
import { useQuery } from "../../../../hooks/useQuery";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const navigate = useNavigate();

  const petaGeospasialDetail = usePetaGeospasialDetail(id);

  const [zipData, setZipData] = useState(null);
  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(petaGeolocationSchema(isEdit)),
    defaultValues: {
      title: "",
      location: "",
      file: "",
    },
    mode: "onChange",
  });

  const fileWatcher = form.watch("file");

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("location", data.location);

    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    try {
      if (isEdit) {
        await editPetaGeospasial(id, formData);
        toast.success("Geoportal has been updated");
      } else {
        await postPetaGeospasial(formData);
        toast.success("Geoportal has been created");
      }
      navigate("/admin/geoportal", { replace: true });
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
    if (petaGeospasialDetail) {
      form.reset({
        ...petaGeospasialDetail,
        file: "",
      });
      setZipData(petaGeospasialDetail.url); // Set URL for edit mode
    }
  }, [petaGeospasialDetail, form]);

  useEffect(() => {
    if (!isEdit && fileWatcher?.length > 0) {
      const file = fileWatcher[0];
      const reader = new FileReader();
      reader.onload = (e) => setZipData(e.target.result);
      reader.readAsArrayBuffer(file);
    }
  }, [fileWatcher, isEdit]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Geoportal" : "Tambah Geoportal"}
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
              />
            )}
          </CustomFormField>

          <CustomFormField
            control={form.control}
            name="location"
            label="Location"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Input location"
                type="text"
                disabled={isSubmitting}
              />
            )}
          </CustomFormField>

          <CustomFormField control={form.control} name="file" label="File">
            {() => (
              <>
                {zipData && (
                  <div className="flex w-full justify-center">
                    <SpatialMap zipData={zipData} />
                  </div>
                )}
                <Input
                  {...form.register("file")}
                  id="file"
                  type="file"
                  variant="file"
                  accept="application/zip"
                />
              </>
            )}
          </CustomFormField>

          <div className="flex flex-row gap-5 mt-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/geoportal", { replace: true })}
            >
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? `Submitting` : isEdit ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailPage;
