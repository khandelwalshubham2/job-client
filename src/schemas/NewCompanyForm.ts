import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const companyFormSchema = z.object({
  name: z.string().min(1, "Company name must have atleast 1 character"),
  description: z.string().optional(),
  website: z.string().optional(),
  location: z.string().min(1, "location must have atleast 1 character"),
  logo: z
    .instanceof(File, { message: "image is required" })
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a PNG, JPG or JPEG")
    .refine((file) => file.size < MAX_UPLOAD_SIZE, {
      message: "Your resume must be less than 5MB.",
    })
    .optional(),
});

const companyFormInitialValue = {
  name: "",
  description: "",
  website: "",
  location: "",
};

type companyFormControl = {
  label: string;
  placeholder: string;
  inputType: string;
  textType?: string;
  name: "name" | "description" | "website" | "location" | "logo";
}[];

const companyFormControls: companyFormControl = [
  {
    label: "Company Name",
    placeholder: "Enter Company Name",
    inputType: "input",
    textType: "text",
    name: "name",
  },
  {
    label: "Description",
    placeholder: "Enter Description",
    inputType: "input",
    textType: "text",
    name: "description",
  },
  {
    label: "Website",
    placeholder: "Enter your Website",
    inputType: "input",
    textType: "text",
    name: "website",
  },
  {
    label: "Location",
    placeholder: "Enter your Location",
    inputType: "input",
    textType: "text",
    name: "location",
  },
  {
    label: "Logo",
    placeholder: "Enter your Logo",
    inputType: "input",
    textType: "file",
    name: "logo",
  },
];

export { companyFormSchema, companyFormInitialValue, companyFormControls };
