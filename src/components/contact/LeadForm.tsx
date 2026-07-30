"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { softwareOptions } from "@/content/software-options";
import { submitLead } from "@/services/lead";
import type { LeadFormValues, LeadFormVariant } from "@/types/forms";

interface LeadFormProps {
  readonly variant: LeadFormVariant;
  readonly onSubmitted?: () => void;
}

const labels = {
  name: "আপনার নাম",
  mobile: "আপনার মোবাইল নাম্বার",
  software: "যে সফ্টওয়ারটির ডেমো দেখতে চাচ্ছেন, নির্বাচন করুন",
  businessType: "আপনার ব্যবসার ধরণ কি",
} as const;

export default function LeadForm({
  variant,
  onSubmitted,
}: LeadFormProps) {
  const formId = useId();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    defaultValues: {
      name: "",
      mobile: "",
      software: softwareOptions[0].value,
      businessType: "",
    },
  });

  const isModal = variant === "modal";
  const inputClass = isModal
    ? "rounded px-3 py-1 text-black"
    : "mt-2 h-12 w-full rounded border px-3 text-black";
  const fieldClass = isModal ? "flex flex-col gap-1 py-1" : "";

  const onSubmit = async (values: LeadFormValues) => {
    setSubmissionError(null);
    try {
      await submitLead(values);
      onSubmitted?.();
    } catch {
      setSubmissionError("অনুরোধটি সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <form
      className={isModal ? "" : "flex flex-col gap-5"}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={fieldClass}>
        <label htmlFor={`${formId}-name`}>{labels.name}</label>
        <input
          id={`${formId}-name`}
          className={inputClass}
          placeholder={labels.name}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          {...register("name", { required: "আপনার নাম লিখুন" })}
        />
        {errors.name && (
          <p className="text-sm text-red-700" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className={fieldClass}>
        <label htmlFor={`${formId}-mobile`}>{labels.mobile}</label>
        <input
          id={`${formId}-mobile`}
          type="tel"
          inputMode="tel"
          className={inputClass}
          placeholder={labels.mobile}
          autoComplete="tel"
          aria-invalid={Boolean(errors.mobile)}
          {...register("mobile", { required: "আপনার মোবাইল নাম্বার লিখুন" })}
        />
        {errors.mobile && (
          <p className="text-sm text-red-700" role="alert">
            {errors.mobile.message}
          </p>
        )}
      </div>

      <div className={fieldClass}>
        <label htmlFor={`${formId}-software`}>{labels.software}</label>
        <select
          id={`${formId}-software`}
          className={inputClass}
          {...register("software", { required: true })}
        >
          {softwareOptions.map((option, index) => (
            <option
              key={`${option.value}-${option.label}-${index}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={fieldClass}>
        <label htmlFor={`${formId}-business-type`}>
          {labels.businessType}
        </label>
        <input
          id={`${formId}-business-type`}
          className={inputClass}
          placeholder={labels.businessType}
          aria-invalid={Boolean(errors.businessType)}
          {...register("businessType", {
            required: "আপনার ব্যবসার ধরণ লিখুন",
          })}
        />
        {errors.businessType && (
          <p className="text-sm text-red-700" role="alert">
            {errors.businessType.message}
          </p>
        )}
      </div>

      {submissionError && (
        <p className="mt-2 text-sm text-red-800" role="alert">
          {submissionError}
        </p>
      )}

      <div className={isModal ? "my-5 text-center" : "flex justify-center lg:justify-start"}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isModal
              ? "rounded-full bg-[#FFAA00] px-5 py-2 text-[16px] font-extrabold text-[#001B41] disabled:opacity-60"
              : "my-10 w-40 rounded-full bg-[#FFAA00] p-2 px-5 text-[16px] font-extrabold text-[#001B41] disabled:opacity-60 xl:my-3"
          }
        >
          {isSubmitting ? "অপেক্ষা করুন" : "অনুরোধ করুন"}
        </button>
      </div>
    </form>
  );
}
