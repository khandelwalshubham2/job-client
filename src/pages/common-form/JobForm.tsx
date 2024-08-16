import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

import FormContainer from "@/layouts/FormLayout";
import {
  jobFormControls,
  jobFormInitialValue,
  jobFormSchema,
} from "@/schemas/NewJobForm";
import SubmitButton from "@/components/shared/SubmitButton";
import { useEffect } from "react";

type Props = {
  companyDetails: { companyName: string; companyId: string };
  onSave: (formData: z.infer<typeof jobFormSchema>) => void;
  isUpdate: boolean;
  onSaveLoading: boolean;
  jobData?: any;
};

const JobForm = ({
  companyDetails,
  onSave,
  isUpdate,
  onSaveLoading,
  jobData,
}: Props) => {
  const formSchema = jobFormSchema;
  const formControls = jobFormControls;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: jobFormInitialValue,
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    onSave(value);
  };

  useEffect(() => {
    if (!jobData) return;
    form.setValue("title", jobData?.job?.title || "");
    form.setValue("description", jobData?.job?.description || "");
    form.setValue("location", jobData?.job?.location || "");
    form.setValue("requirements", jobData?.job?.requirements.join(",") || "");
    form.setValue("salary", jobData?.job?.salary || 1);
    form.setValue("experienceYears", jobData?.job?.experienceYears || 0);
  }, [jobData]);

  return (
    <>
      <p className="text-center heading-2">
        Create Job in {companyDetails.companyName}
      </p>
      <FormContainer>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {formControls.map((formControl) => (
              <FormField
                key={formControl.name}
                control={form.control}
                name={formControl.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{formControl.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={formControl.placeholder}
                        {...field}
                        type={formControl.textType}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <SubmitButton
              buttonText={isUpdate ? "Update Job" : "Create job"}
              isLoading={onSaveLoading}
            />
          </form>
        </Form>
      </FormContainer>
    </>
  );
};

export default JobForm;
