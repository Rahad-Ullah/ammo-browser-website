import { useState } from "react";
import { useForm, type UseFormSetError } from "react-hook-form";
import CustomCheckbox from "~/components/atoms/CustomCheckbox";
import { handleApiError } from "~/utils/errorHandler";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { successToast } from "~/utils/toast";
import Button from "~/components/atoms/Button";
import banner from "~/assets/contactBanner.png";
import type { ContactFormInput } from "~/types/auth";

interface ContactFormData {
  company_name: string;
  phone: string;
  email: string;
  comment: string;
  not_a_robot: boolean;
}

const CONTACT_FIELDS = [
  "company_name",
  "email",
  "phone",
  "comment",
  "not_a_robot",
] as const;

const messages = {
  companyRequired: "Enter your company name.",
  companyMax: "Company name can't be longer than 255 characters.",
  phoneRequired: "Please enter your phone number.",
  phoneMax: "Phone number can't be longer than 255 characters.",
  phoneLength: "Please enter a phone number between 10 and 15 digits.",
  phoneFormat: "Please enter a valid phone number.",
  emailRequired: "Please enter your email address.",
  emailMax: "Email address can't be longer than 255 characters.",
  emailFormat: "Please enter a valid email address.",
  robot: "Please check the box to confirm you're not a robot.",
};

const friendlyMessage = (field: (typeof CONTACT_FIELDS)[number], message: string) => {
  const text = message.toLowerCase();
  if (field === "company_name") {
    if (text.includes("255")) return messages.companyMax;
    if (text.includes("required")) return messages.companyRequired;
  }
  if (field === "phone") {
    if (text.includes("255")) return messages.phoneMax;
    if (text.includes("required")) return messages.phoneRequired;
    if (text.includes("digit") || text.includes("10") || text.includes("15")) {
      return messages.phoneLength;
    }
    if (text.includes("format") || text.includes("invalid")) return messages.phoneFormat;
  }
  if (field === "email") {
    if (text.includes("255")) return messages.emailMax;
    if (text.includes("required")) return messages.emailRequired;
    if (text.includes("valid") || text.includes("email")) return messages.emailFormat;
  }
  if (field === "not_a_robot") return messages.robot;
  return message;
};

// Mirrors Laravel's `email` rule: one @, no edge or repeated dots, and domain
// labels that start and end with a letter or digit.
const isBackendEmail = (value: string) => {
  if (!/^[^\s@]+@[^\s@]+$/.test(value)) return false;
  const at = value.indexOf("@");
  const local = value.slice(0, at);
  const domain = value.slice(at + 1);
  const hasEdgeDot = (part: string) =>
    part.startsWith(".") || part.endsWith(".") || part.includes("..");
  if (hasEdgeDot(local) || hasEdgeDot(domain)) return false;
  const label = /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/;
  return domain.split(".").every((part) => label.test(part));
};

// Same characters the API allows: optional leading +, then digits, spaces, hyphens, and parentheses.
const BACKEND_PHONE = /^\+?[0-9\s\-()]+$/;
const PHONE_DIGITS = { min: 10, max: 15 };

const phoneDigitCount = (value: string) => value.replace(/\D/g, "").length;

const firstMessage = (value: unknown) => {
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  if (typeof value === "string") return value;
  return undefined;
};

const applyContactErrors = (
  data: unknown,
  setError: UseFormSetError<ContactFormData>,
) => {
  if (!data || typeof data !== "object") return false;
  const fieldErrors = data as Record<string, unknown>;
  let applied = false;

  for (const field of CONTACT_FIELDS) {
    const message =
      firstMessage(fieldErrors[field]) ??
      (field === "comment" ? firstMessage(fieldErrors.message) : undefined);
    if (message) {
      setError(field, { type: "server", message: friendlyMessage(field, message) });
      applied = true;
    }
  }

  return applied;
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const { contactList } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: { not_a_robot: false },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setLoading(true);
      const comment = data.comment.trim();
      const payload: ContactFormInput = {
        company_name: data.company_name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        not_a_robot: data.not_a_robot,
        ...(comment ? { comment, message: comment } : {}),
      };
      const res = await contactList(payload);
      if (res.success === true) {
        successToast(res.message ?? "Message sent successfully");
        reset();
      }
    } catch (error) {
      const responseData =
        error &&
        typeof error === "object" &&
        "isAxiosError" in error &&
        "response" in error
          ? (error as { response?: { status?: number; data?: { data?: unknown } } })
              .response
          : undefined;

      const mapped =
        responseData?.status === 422 &&
        applyContactErrors(responseData.data?.data, setError);

      if (!mapped && error && typeof error === "object" && "isAxiosError" in error) {
        handleApiError(error as any);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pb-20 lg:pb-36">
        <img
          src={banner}
          alt="banner"
          className="w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-full absolute top-0 left-0 -z-10 object-cover"
        />
        <div className="container">
          <div className="flex flex-col w-full mt-[152px] md:mt-[228px] lg:mt-[255px] xl:mt-[450px] items-center justify-center">
            <h4 className="text-3xl lg:text-5xl xl:text-8xl heading-gradient flex items-center justify-center">
              Get Listed
            </h4>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-3xl mx-auto bg-secondaryBg mt-6 xl:mt-10 py-10 lg:py-16 px-6 sm:px-10 lg:px-12 inline-flex flex-col gap-4 xl:gap-7 font-Poppins"
            >
              <div className="relative">
                <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                  Company Name
                </label>
                <input
                  placeholder="Company Name"
                  type="text"
                  maxLength={255}
                  {...register("company_name", {
                    setValueAs: (value: string) => value.trim(),
                    required: messages.companyRequired,
                    maxLength: {
                      value: 255,
                      message: messages.companyMax,
                    },
                  })}
                  className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 font-Poppins border-[1px] border-transparent hover:border-orange/50 focus:border-orange transition-colors duration-200 text-thirdColor -mt-[2px] placeholder:text-xs placeholder:md:text-base placeholder:font-normal placeholder:font-Poppins placeholder:text-thirdColor w-full ${
                    errors.company_name && "!border-errorColor"
                  }`}
                />
                {errors.company_name && (
                  <p className="error-text !normal-case !opacity-100">
                    {errors.company_name.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                  Phone Number
                </label>
                <input
                  placeholder="Number"
                  type="text"
                  maxLength={255}
                  {...register("phone", {
                    setValueAs: (value: string) => value.trim(),
                    required: messages.phoneRequired,
                    maxLength: {
                      value: 255,
                      message: messages.phoneMax,
                    },
                    pattern: {
                      value: BACKEND_PHONE,
                      message: messages.phoneFormat,
                    },
                    validate: (value) => {
                      const digits = phoneDigitCount(value);
                      if (digits < PHONE_DIGITS.min || digits > PHONE_DIGITS.max) {
                        return messages.phoneLength;
                      }
                      return true;
                    },
                  })}
                  className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 font-Poppins text-thirdColor border-[1px] border-transparent hover:border-orange/50 focus:border-orange transition-colors duration-200 -mt-[2px] placeholder:font-normal placeholder:font-Poppins placeholder:text-xs placeholder:md:text-base placeholder:text-thirdColor w-full ${
                    errors.phone && "!border-errorColor"
                  }`}
                />
                {errors.phone && (
                  <p className="error-text !normal-case !opacity-100">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                  Email Address
                </label>
                <input
                  placeholder="Email"
                  type="text"
                  maxLength={255}
                  {...register("email", {
                    setValueAs: (value: string) => value.trim(),
                    required: messages.emailRequired,
                    maxLength: {
                      value: 255,
                      message: messages.emailMax,
                    },
                    validate: (value) =>
                      isBackendEmail(value) || messages.emailFormat,
                  })}
                  className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 font-Poppins border-[1px] border-transparent text-thirdColor -mt-[2px] placeholder:font-normal placeholder:font-Poppins placeholder:text-xs placeholder:md:text-base placeholder:text-thirdColor w-full ${
                    errors.email && "!border-errorColor"
                  }`}
                />
                {errors.email && (
                  <p className="error-text !normal-case !opacity-100">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                  Comment/Questions
                </label>
                <textarea
                  placeholder="Ask anything"
                  {...register("comment", {
                    setValueAs: (value: string) => value.trim(),
                  })}
                  className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 border-[1px] border-transparent hover:border-orange/50 focus:border-orange transition-colors duration-200 font-Poppins text-thirdColor -mt-[2px] placeholder:font-normal placeholder:font-Poppins placeholder:text-xs placeholder:md:text-base placeholder:text-thirdColor w-full ${
                    errors.comment && "!border-errorColor"
                  }`}
                />
                {errors.comment && (
                  <p className="error-text !normal-case !opacity-100">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              <div className="flex items-center flex-col gap-5 sm:gap-0 sm:flex-row justify-between">
                <Button
                  type="submit"
                  btnTitle={loading ? "Sending..." : "Submit"}
                  className="mt-5 sm:mt-0 w-full sm:w-[150px] flex items-center justify-center"
                />
                <div className="flex flex-col items-center sm:items-end sm:justify-end">
                  <div className="flex items-center gap-2">
                    <CustomCheckbox
                      {...register("not_a_robot", {
                        required: messages.robot,
                      })}
                      id="not-a-robot"
                      className="bg-additionalColor border-none checked:bg-orange"
                    />
                    <label
                      htmlFor="not-a-robot"
                      className={`text-primaryWhite cursor-pointer font-Poppins text-xs xl:text-sm font-normal ${
                        errors.not_a_robot && "!text-errorColor"
                      }`}
                    >
                      I'm not a robot
                    </label>
                  </div>
                  {errors.not_a_robot && (
                    <p className="error-text !normal-case !opacity-100 sm:text-right">
                      {errors.not_a_robot.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
