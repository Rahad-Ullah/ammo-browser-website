import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomCheckbox from "~/components/atoms/CustomCheckbox";
import { handleApiError } from "~/utils/errorHandler";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { successToast } from "~/utils/toast";
import Button from "~/components/atoms/Button";
import banner from "~/assets/contactBanner.png";

interface ContactFormData {
  name: string;
  company_name: string;
  phone: string;
  email: string;
  message: string;
  comment: string;
  not_a_robot: boolean;
}

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const { contactList } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      setLoading(true);
      const payload = {
        name: data.company_name,
        company_name: data.company_name,
        email: data.email,
        phone: data.phone,
        message: data.comment,
        not_a_robot: data.not_a_robot,
      };
      const res = await contactList(payload);
      if (res.success === true) {
        successToast(res.message ?? "Message sent successfully");
        reset();
        setLoading(false);
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'isAxiosError' in error) {
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
              className="w-full bg-secondaryBg mt-6 xl:mt-10 py-10 lg:py-20 px-6 xl:px-48 inline-flex flex-col gap-4 xl:gap-7"
            >
              <div className="relative">
                <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                  Company Name
                </label>
                <input
                  placeholder={
                    errors.company_name
                      ? errors.company_name.message
                      : "Company Name"
                  }
                  type="text"
                  {...register("company_name", {
                    required: "Please enter your company name!",
                  })}
                  className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 font-Inter border-[1px] border-transparent hover:border-orange/50 focus:border-orange transition-colors duration-200 text-thirdColor -mt-[2px] placeholder:text-xs placeholder:md:text-base placeholder:font-normal placeholder:font-Inter placeholder:text-thirdColor w-full ${
                    errors.company_name &&
                    "!border-errorColor placeholder:!text-errorColor"
                  }`}
                />
              </div>
              <div className="relative">
                <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                  Phone Number
                </label>
                <input
                  placeholder={errors.phone ? errors.phone.message : "Number"}
                  type="text"
                  {...register("phone", {
                    required: "Please enter your number!",
                    pattern: {
                      value: /^\d+$/,
                      message: "Phone number must contain only digits",
                    },
                  })}
                  className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 font-Inter text-thirdColor border-[1px] border-transparent hover:border-orange/50 focus:border-orange transition-colors duration-200 -mt-[2px] placeholder:font-normal placeholder:font-Inter placeholder:text-xs placeholder:md:text-base placeholder:text-thirdColor w-full ${
                    errors.phone &&
                    "!border-errorColor placeholder:!text-errorColor"
                  }`}
                />
              </div>
              <div className="relative">
                <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                  Email Address
                </label>
                <input
                  placeholder={errors.email ? errors.email.message : "Email"}
                  type="text"
                  {...register("email", {
                    required: "Please enter your email!",
                  })}
                  className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 font-Inter border-[1px] border-transparent text-thirdColor -mt-[2px] placeholder:font-normal placeholder:font-Inter placeholder:text-xs placeholder:md:text-base placeholder:text-thirdColor w-full ${
                    errors.email &&
                    "!border-errorColor placeholder:!text-errorColor"
                  }`}
                />
              </div>
              <div className="relative">
                <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                  Comment/Questions
                </label>
                <textarea
                  placeholder={
                    errors.comment ? errors.comment.message : "Ask anything"
                  }
                  {...register("comment", {
                    required: "Please enter your comment!",
                  })}
                  className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 border-[1px] border-transparent hover:border-orange/50 focus:border-orange transition-colors duration-200 font-Inter text-thirdColor -mt-[2px] placeholder:font-normal placeholder:font-Inter placeholder:text-xs placeholder:md:text-base placeholder:text-thirdColor w-full ${
                    errors.comment &&
                    "placeholder:!text-errorColor !border-errorColor"
                  }`}
                />
              </div>

              <div className="flex items-center flex-col gap-5 sm:gap-0 sm:flex-row justify-between">
                <Button
                  type="submit"
                  btnTitle={loading ? "Sending..." : "Submit"}
                  className="mt-5 sm:mt-0 w-full sm:w-[150px] flex items-center justify-center"
                />
                <div className="flex flex-col items-center sm:items-end sm:justify-end">
                  <div className="flex items-center">
                    <CustomCheckbox
                      {...register("not_a_robot", {
                        required: "please confirm you are not a robot!",
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
                      {errors.not_a_robot
                        ? errors.not_a_robot.message
                        : "I'm not a robot"}
                    </label>
                  </div>
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
