import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingFormSchema } from "@/schemas/onboardingForm";
import Input from "./Input";
import Select from "./Select";
import MultiSelect from "../MultiSelect";

type formSchema = z.infer<typeof onboardingFormSchema>;

const formFields = [
  {
    label: "Brand/Company",
    name: "brand",
    element: "input",
    type: "text",
    placeholder: "Enter Brand/Company Name",
    required: true,
  },
  {
    label: "1851 URL",
    name: "slug",
    element: "input",
    type: "text",
    placeholder: "",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    element: "input",
    type: "text",
    placeholder: "Enter email address",
    required: true,
  },
  {
    label: "Phone",
    name: "phone",
    element: "input",
    type: "text",
    placeholder: "Enter phone number",
    required: true,
  },
  {
    label: "User Name",
    name: "username",
    element: "input",
    type: "text",
    placeholder: "Enter user name",
    required: true,
  },
  {
    label: "Franchise Site",
    name: "franchise_site",
    element: "input",
    type: "text",
    placeholder: "Please enter Franchise site URL",
    required: false,
  },
  {
    label: "Analytics Domains",
    name: "analytics_domain",
    element: "input",
    type: "text",
    placeholder: "Enter analytics domains",
    required: false,
  },
  {
    label: "Facebook Page",
    name: "fb_page",
    element: "input",
    type: "text",
    placeholder: "Please enter Facebook Page",
    required: false,
  },
  {
    label: "FranConnect Email",
    name: "fran_email",
    element: "input",
    type: "text",
    placeholder: "Please enter FranConnect Email",
    required: false,
  },
  {
    label: "Story Approval Alerts Email",
    name: "story_approval_email",
    element: "input",
    type: "text",
    placeholder: "Please enter Story Approval Alerts Email",
    required: false,
  },
  {
    label: "Newsletter List ID",
    name: "newsletter_list_id",
    element: "input",
    type: "text",
    placeholder: "Please enter newsletter list ID",
    required: false,
  },
  {
    label: "Type",
    name: "type",
    element: "select",
    type: "",
    placeholder: "--Select--",
    required: false,
    default: "--Select--",
    options: ["Starter", "Visibility", "Increase", "Enterprise"],
  },
  {
    label: "Brand Category: ",
    name: "brand_category",
    element: "select",
    selectType: "multi-select",
    type: "",
    placeholder: "--Select Brand Category--",
    required: false,
    default: "--Select Brand Category --",
    options: ["Automotive", "Beauty", "Construction", "Consultant", "Consumer Goods", "Consumer Services", "Education", "Facilities Services", "Finance"]
  },  
  {
    label: "Logo",
    name: "logo",
    element: "input",
    type: "file",
    placeholder: "Drag & Drop Files here...",
    required: false,
  },
];

function OnboardingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(onboardingFormSchema),
  });

  const onSubmit = (data: formSchema) => {
    console.log(data);
  };

  type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="flex items-center justify-center pb-8 pt-6 font-semibold flex-col">
      <h1 className="text-black mb-6">Onboarding Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6" // Grid for two columns layout
      >
        {formFields.map((field, idx) => (
          <div className="flex flex-col space-y-1" key={idx}>
            {field.element === "input" ? (
              <Input
                type={field.type}
                placeholder={field.placeholder}
                className="border p-2 rounded-lg w-full" // Ensuring consistent size for all input fields
                label={field.label}
                id={String(idx)}
              />
            ) : (
              (field.element === 'select' && field.selectType === "select") ? <Select
              label={field.label}
              placeholder={field.placeholder}
              className="border p-2 rounded-lg w-full" // Ensuring consistent size for all select fields
              options={field.options || []}
              id={String(idx)}
            /> : (
              <MultiSelect 
              label={field.label}
              options={field.options || []}
              placeholder={field.placeholder}
              className="my-4"
              />
            )
            )}
            {errors[field.name as keyof OnboardingFormValues] && (
              <span className="text-red-500">
                {(errors[field.name as keyof OnboardingFormValues]
                  ?.message as string) || "Invalid input"}
              </span>
            )}
          </div>
        ))}

        {/* Ensure file input is styled consistently */}
        <div className="flex justify-end col-span-2 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OnboardingForm;
