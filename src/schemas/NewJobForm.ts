import { z } from "zod";

const jobFormSchema = z.object({
  title: z.string().min(1, "title must have atleast 1 character"),
  description: z.string().optional(),
  requirements: z.string(),
  salary: z.coerce.number().positive(),
  location: z.string().min(1, "Location is required"),
  experienceYears: z.coerce.number().nonnegative(),
});

const jobFormInitialValue = {
  title: "",
  description: "",
  requirements: "",
  salary: 1,
  location: "",
  experienceYears: 0,
};

type jobFormControl = {
  label: string;
  placeholder: string;
  inputType: string;
  textType?: string;
  name:
    | "title"
    | "description"
    | "requirements"
    | "salary"
    | "location"
    | "experienceYears";
}[];

const jobFormControls: jobFormControl = [
  {
    label: "Title",
    placeholder: "Enter job Title",
    inputType: "input",
    textType: "text",
    name: "title",
  },
  {
    label: "Description",
    placeholder: "Enter Description",
    inputType: "input",
    textType: "text",
    name: "description",
  },
  {
    label: "Requirements(seperated by commas)",
    placeholder: "Enter your Requirements",
    inputType: "input",
    textType: "text",
    name: "requirements",
  },
  {
    label: "Location",
    placeholder: "Enter your Location",
    inputType: "input",
    textType: "text",
    name: "location",
  },
  {
    label: "Salary (in Lakhs)",
    placeholder: "Enter salary(in Lakhs)",
    inputType: "input",
    textType: "number",
    name: "salary",
  },
  {
    label: "Experience",
    placeholder: "Enter Experience in Year",
    inputType: "input",
    textType: "number",
    name: "experienceYears",
  },
];

export { jobFormSchema, jobFormInitialValue, jobFormControls };
