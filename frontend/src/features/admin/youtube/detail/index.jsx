import { CustomFormField, Form } from "../../../../components/form";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { postYoutube } from "../../../../services/youtube/api";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { youtubeSchema } from "../../../../services/youtube/form";
import { zodResolver } from "@hookform/resolvers/zod";

const DetailPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(youtubeSchema),
    defaultValues: {
      url: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await postYoutube(data); // Pass FormData to post function
      toast.success("Youtube has been created");

      navigate("/admin/youtube", { replace: true });
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Tambah Majalah</h1>

      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <CustomFormField
            control={form.control}
            name="url"
            label="Youtube Url"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Input youtube url"
                type="text"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              />
            )}
          </CustomFormField>

          <div className="flex flex-row gap-5 mt-4 justify-end">
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/youtube", { replace: true })}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? `Submitting` : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DetailPage;
