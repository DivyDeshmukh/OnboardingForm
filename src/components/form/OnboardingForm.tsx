import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OnboardingFormSchema,
  onboardingFormSchema,
} from "@/schemas/onboardingForm";
import Input from "./Input";
import Select from "./Select";
import MultiSelect from "./MultiSelect";

type FormSchema = z.infer<typeof onboardingFormSchema>;

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
    label: "Brand Category",
    name: "brand_category",
    element: "select",
    selectType: "multi-select",
    type: "",
    placeholder: "--Select Brand Category--",
    required: false,
    default: "--Select Brand Category --",
    options: [
      "Automotive",
      "Beauty",
      "Construction",
      "Consultant",
      "Consumer Goods",
      "Consumer Services",
      "Education",
      "Facilities Services",
      "Finance",
    ],
  },
];

function OnboardingForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<OnboardingFormSchema>({
    resolver: zodResolver(onboardingFormSchema),
  });

  const [brandCategory, setBrandCategory] = useState<string[]>([]);

  // Reference to access MultiSelect internal methods, if needed
  const multiSelectRef = useRef<any>(null);

  // Watch the "brand" field and generate slug automatically
  const brandName = watch("brand");

  useEffect(() => {
    if (brandName) {
      const generatedSlug = brandName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", generatedSlug);
    }
  }, [brandName, setValue]);

  // Handle form submission and log form data
  const onSubmit: SubmitHandler<OnboardingFormSchema> = (data) => {
    data.slug = `https://1851dev.com/${data.slug}`;
    console.log("Form Submitted:", data);
    reset();
  };

  const onError = () => {
    const formValues = getValues(); // Get form values even if errors exist
    console.log("Form values with errors:", formValues);
  };

  const getErrorMessage = (error: any): string => {
    if (error?.message) {
      return typeof error.message === "string"
        ? error.message
        : "Invalid input";
    }
    return "Invalid input";
  };

  return (
    <div className="flex items-center justify-center pb-48 pt-6 font-semibold flex-col">
      <h1 className="text-black mb-6 text-2xl md:text-3xl">Onboarding Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit, onError)(); // Handle both submit and error
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4"
      >
        {formFields.map((field, idx) => (
          <div className="flex flex-col space-y-1" key={idx}>
            {field.element === "input" && field.type !== "file" && field.name !== "slug" ? (
              <Input
                type={field.type}
                placeholder={field.placeholder}
                className="border p-2 rounded-lg w-full"
                label={field.label}
                id={field.name}
                {...register(field.name as keyof OnboardingFormSchema)}
              />
            ) : field.name === "slug" && field.element === "input" ? (
              <div className="flex gap-2">
                <span className="text-black translate-y-10 mr-2">
                  https://1851dev.com/
                </span>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="border p-2 rounded-lg w-full"
                  label={field.label}
                  id={field.name}
                  {...register(field.name as keyof OnboardingFormSchema)}
                />
              </div>
            ) : field.element === "select" &&
              field.selectType === "multi-select" ? (
              <Controller
                name="brand_category"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    ref={multiSelectRef}
                    label="Brand Categories"
                    options={field.options}
                    value={value || []}
                    onChange={(selectedOptions) => {
                      onChange(selectedOptions);
                      setBrandCategory(selectedOptions);
                    }}
                    placeholder="Select brand categories"
                    className=""
                  />
                )}
              />
            ) : (
              <Controller
                name={field.name as keyof OnboardingFormSchema}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    label={field.label}
                    options={field.options || []}
                    placeholder={field.placeholder}
                    className="my-4"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            )}

            {errors[field.name as keyof OnboardingFormSchema] && (
              <span className="text-red-500">
                {getErrorMessage(
                  errors[field.name as keyof OnboardingFormSchema]
                )}
              </span>
            )}
          </div>
        ))}

        {/* File input */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="logo" className="text-gray-700 font-semibold">
            Logo
          </label>
          <input
            type="file"
            placeholder="Drag & Drop Files here..."
            id="logo"
            className="text-black bg-white py-2 px-3 border-[0.5px] border-gray-300 rounded-lg"
            onChange={(e) => setValue("logo", e.target.files?.[0] ?? null)} // Correctly handle file input change
          />
          {errors.logo && (
            <span className="text-red-700">Invalid file input</span>
          )}
        </div>

        {/* Submit button */}
        <div className="flex justify-end col-span-1 md:col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded w-full md:w-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OnboardingForm;
