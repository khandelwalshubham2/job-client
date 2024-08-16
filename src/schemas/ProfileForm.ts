import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const profileFormSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/)
    .optional()
    .or(z.literal("")),
  bio: z.string().optional(),
  skills: z.string(),
  resume: z
    .instanceof(File, { message: "image is required" })
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a pdf")
    .refine((file) => file.size < MAX_UPLOAD_SIZE, {
      message: "Your resume must be less than 5MB.",
    })
    .optional(),
});

// profile: {
//     bio: string;
//     skills: string[];
//     resume: string;
//     resumeName: string;
//     profilePhoto: string;
//   };

const profileFormInitialValue = {
  bio: "",
  skills: "",
  phoneNumber: "",
};

type profileFormControl = {
  label: string;
  placeholder: string;
  inputType: string;
  textType?: string;
  name: "phoneNumber" | "bio" | "skills" | "resume";
}[];

const profileFormControls: profileFormControl = [
  {
    label: "Phone Number",
    placeholder: "Enter your phone number",
    inputType: "input",
    textType: "text",
    name: "phoneNumber",
  },
  {
    label: "Bio",
    placeholder: "Enter your bio",
    inputType: "input",
    textType: "text",
    name: "bio",
  },
  {
    label: "Skills(seperated by comma)",
    placeholder: "Enter your skills",
    inputType: "input",
    textType: "text",
    name: "skills",
  },
];
export { profileFormSchema, profileFormInitialValue, profileFormControls };
