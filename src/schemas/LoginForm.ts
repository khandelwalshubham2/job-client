import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should have at least 6 character" }),
});

const loginFormInitialValue = {
  email: "",
  password: "",
};

type LoginFormControl = {
  label: string;
  placeholder: string;
  inputType: string;
  textType?: string;
  name: "email" | "password";
}[];

const loginFormControls: LoginFormControl = [
  {
    label: "Email",
    placeholder: "Enter your Email",
    inputType: "input",
    textType: "text",
    name: "email",
  },
  {
    label: "Password",
    placeholder: "Enter your Password",
    inputType: "input",
    textType: "password",
    name: "password",
  },
];

export { loginFormSchema, loginFormInitialValue, loginFormControls };
