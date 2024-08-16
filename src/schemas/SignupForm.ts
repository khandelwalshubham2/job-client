import { z } from "zod";

const role = ["student", "recruiter"] as const;

const signupFormSchema = z.object({
  firstName: z.string().min(1, "First name must have atleast 1 character"),
  lastName: z.string().min(1, "Last name must have atleast 1 character"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should have at least 6 character" }),
  role: z.enum(role),
});

const signupFormInitialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: role[0],
};

type signupFormControl = {
  label: string;
  placeholder: string;
  inputType: string;
  textType?: string;
  name: "firstName" | "lastName" | "email" | "password" | "role";
}[];

const signupFormControls: signupFormControl = [
  {
    label: "First Name",
    placeholder: "Enter your first name",
    inputType: "input",
    textType: "text",
    name: "firstName",
  },
  {
    label: "Last Name",
    placeholder: "Enter your last name",
    inputType: "input",
    textType: "text",
    name: "lastName",
  },
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
  {
    label: "Role",
    placeholder: "Enter your Password",
    inputType: "radio",
    name: "role",
  },
];

export { signupFormSchema, signupFormInitialValue, signupFormControls };
