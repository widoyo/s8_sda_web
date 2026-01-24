import "react-quill/dist/quill.snow.css";

import { CustomFormField, Form } from "../../../components/form";
import { useEffect, useState } from "react";

import { Button } from "../../../components/button";
import ReactQuill from "react-quill";
import { editTugasFungsi } from "../../../services/tugas-fungsi";
import { toast } from "sonner";
import { tugasFungsiSchema } from "../../../services/tugas-fungsi/form";
import { useForm } from "react-hook-form";
import { useTugasFungsiData } from "./hooks/useTugasFungsiData";
import { zodResolver } from "@hookform/resolvers/zod";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }], // Headers
    ["bold", "italic", "underline", "strike"], // Text formatting
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ script: "sub" }, { script: "super" }], // Subscript and superscript
    [{ color: [] }, { background: [] }], // Text and background color
    [{ font: [] }], // Font family
    [{ align: [] }], // Text alignment
    ["link"], // Insert link, image, video
    ["clean"], // Remove formatting
    ["blockquote", "code-block"], // Block quotes and code blocks
    [{ direction: "rtl" }], // Right-to-left text direction
    [{ size: ["small", "medium", "large", "huge"] }], // Font sizes
  ],
};

const TugasFungsiAdmin = () => {
  const tugasFungsiData = useTugasFungsiData();

  const [content, setContent] = useState("");

  const form = useForm({
    resolver: zodResolver(tugasFungsiSchema),
    defaultValues: {
      content: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await editTugasFungsi(data);
      toast.success("Tugas dan fungsi has been update");
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = form;

  useEffect(() => {
    if (tugasFungsiData) {
      form.reset(tugasFungsiData);
      setContent(tugasFungsiData.content);
    }
  }, [tugasFungsiData, form]);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Tambah Tugas dan Fungsi</h1>

      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <CustomFormField
            control={form.control}
            name="content"
            label="Content"
          >
            {() => (
              <ReactQuill
                theme="snow"
                modules={modules}
                value={content}
                onChange={(value) => {
                  setContent(value);
                  setValue("content", value); // Update form state
                }}
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
                className="h-64"
              />
            )}
          </CustomFormField>

          <div className="flex flex-row gap-5 mt-24 justify-end">
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

export default TugasFungsiAdmin;
