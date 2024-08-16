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
  loginFormControls,
  loginFormInitialValue,
  loginFormSchema,
} from "@/schemas/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "@/components/shared/SubmitButton";
import { useLoginMutation } from "@/store/apis/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { toast } from "sonner";
const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSchema = loginFormSchema;
  const formControls = loginFormControls;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: loginFormInitialValue,
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const response = await login(value).unwrap();
      dispatch(setUser(response.user));
      if (response.user.role === "student") navigate("/jobs");
      else navigate("/companies");
      toast.success("You have successfully login");
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
        <SubmitButton isLoading={isLoading} buttonText="Login" />
        <div className="font-semibold text-sm">
          <Link to="/signup" className="underline cursor-pointer">
            Don't have an account!!click here to Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default Login;
