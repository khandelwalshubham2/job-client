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
import {
  signupFormControls,
  signupFormInitialValue,
  signupFormSchema,
} from "@/schemas/SignupForm";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/store/apis/authApi";
import { toast } from "sonner";

import SubmitButton from "@/components/shared/SubmitButton";
const Signup = () => {
  const [signup, { isLoading }] = useSignupMutation();

  const formSchema = signupFormSchema;
  const formControls = signupFormControls;
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: signupFormInitialValue,
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value);
    try {
      await signup(value).unwrap();
      toast.success("You have successfully signup");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formControls.map((formControl) => (
          <FormField
            key={formControl.name}
            control={form.control}
            name={formControl.name}
            render={({ field }) => (
              <>
                {formControl.inputType == "input" && (
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
                {formControl.inputType == "radio" && (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recruiter" id="recruiter" />
                      <Label htmlFor="recruiter">recruiter</Label>
                    </div>
                  </RadioGroup>
                )}
              </>
            )}
          />
        ))}
        <SubmitButton isLoading={isLoading} buttonText="Singup" />
        <div className="font-semibold text-sm">
          <Link to="/login" className="underline cursor-pointer">
            Already have an account!!click here to Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default Signup;
