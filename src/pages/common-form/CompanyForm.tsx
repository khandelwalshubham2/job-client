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
import {
  companyFormInitialValue,
  companyFormSchema,
} from "@/schemas/NewCompanyForm";
import FormContainer from "@/layouts/FormLayout";
import SubmitButton from "@/components/shared/SubmitButton";
import {
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
} from "@/store/apis/companyApi";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const CompanyForm = () => {
  const { companyId } = useParams();
  console.log(companyId);
  const { data } = useGetCompanyByIdQuery(companyId as string, {
    skip: !companyId,
  });
  const [createCompany, { isLoading: submitLoading }] =
    useCreateCompanyMutation();
  const [updateCompany, { isLoading: updateLoading }] =
    useUpdateCompanyMutation();
  const navigate = useNavigate();
  const formSchema = companyFormSchema;
  //const formControls = companyFormControls;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: companyFormInitialValue,
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    //console.log(value);
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("description", value.description || "");
    formData.append("website", value.website || "");
    formData.append("location", value.location);
    if (value.logo) {
      formData.append("file", value.logo);
    }
    if (!companyId) {
      try {
        await createCompany(formData).unwrap();
        toast.success("Company is successfully created");
        navigate("/companies");
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    } else {
      try {
        formData.append("id", companyId);
        console.log(formData.get("id"));
        await updateCompany(formData).unwrap();
        toast.success("Company is successfully updated");
        navigate("/companies");
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (data) {
      form.setValue("name", data.company.name);
      form.setValue("description", data.company.description);
      form.setValue("website", data.company.website);
      form.setValue("location", data.company.location);
    }
  }, [data]);

  return (
    <FormContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Company Name"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Description"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Website" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Location" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) =>
                      field.onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton
            buttonText={`${companyId ? "Update Company" : "Create Company"}`}
            isLoading={companyId ? updateLoading : submitLoading}
          />
        </form>
      </Form>
    </FormContainer>
  );
};

export default CompanyForm;
