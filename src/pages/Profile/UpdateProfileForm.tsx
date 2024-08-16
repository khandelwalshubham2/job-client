import { Button } from "@/components/ui/button";
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
  profileFormControls,
  profileFormInitialValue,
  profileFormSchema,
} from "@/schemas/ProfileForm";
import SubmitButton from "@/components/shared/SubmitButton";
import { useUpdateUserMutation } from "@/store/apis/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { toast } from "sonner";

type Props = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateProfileForm = ({ setShowForm }: Props) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const formSchema = profileFormSchema;
  const formControls = profileFormControls;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: profileFormInitialValue,
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("phoneNumber", value.phoneNumber || "");
    formData.append("bio", value.bio || "");
    formData.append("skills", value.skills || "");
    if (value.resume) {
      formData.append("file", value.resume);
    }
    try {
      const response = await updateUser(formData).unwrap();
      dispatch(setUser(response.user));
      toast.success("user is successfully updated");
      setShowForm(false);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Phone Number"
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Enter Bio" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills(seperated by commas)</FormLabel>
              <FormControl>
                <Input placeholder="Enter skills" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".pdf"
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
        <SubmitButton buttonText="Save" isLoading={isLoading}></SubmitButton>
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
