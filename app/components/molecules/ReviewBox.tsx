import { useState, type ReactNode } from "react";
import type { UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { errorToast } from "~/utils/toast";
import Button from "~/components/atoms/Button";

interface ReviewFormData {
  review: string;
  rating: number;
}

interface ReviewBoxProps {
  title?: string;
  placeholder?: string;
  register: UseFormRegister<ReviewFormData>;
  handleSubmit: UseFormHandleSubmit<ReviewFormData>;
  onSubmit: (data: ReviewFormData) => void;
  errors: FieldErrors<ReviewFormData>;
  loading: boolean;
}

const LoadingSpinner = () => (
  <div aria-label="Loading..." role="status">
    <svg
      className="size-6 sm:size-7 animate-spin stroke-primaryWhite"
      viewBox="0 0 256 256"
    >
      <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
      <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
    </svg>
  </div>
);

const ReviewBox = ({
  title,
  placeholder,
  register,
  handleSubmit,
  onSubmit,
  errors,
  loading,
}: ReviewBoxProps) => {
  const [textLength, setTextLength] = useState(0);
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      errorToast("you must be logged in first");
    }
  };

  return (
    <div className="xl:pt-14 pt-7 font-Poppins">
      <h5 className="text-xl xl:text-[40px] font-medium text-primaryWhite pb-4 xl:pb-6">
        {title || "How was your overall experience with this retailer?"}
      </h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-10">
          <textarea
            id="reviewbox-textarea"
            {...register("review", {
              required: "Please enter your review!",
            })}
            onChange={(e) => setTextLength(e.target.value.length)}
            placeholder={
              errors.review?.message || placeholder || "Type your review"
            }
            maxLength={500}
            className={`bg-secondaryBg w-full min-h-[150px] xl:min-h-[300px] border-[1px] border-transparent hover:border-orange/50 focus:border-orange transition-colors duration-200 p-5 xl:p-14 text-sm xl:text-xl placeholder:text-thirdColor placeholder:font-normal placeholder:xl:text-xl placeholder:text-sm text-thirdColor ${
              errors.review &&
              "placeholder:!text-errorColor !border-errorColor"
            } ${textLength > 0 && "!border-transparent"}`}
          />
          <span
            className={`absolute text-thirdColor font-normal text-xs xl:text-lg bottom-5 xl:bottom-14 right-5 xl:right-14 ${
              textLength === 500 && "!text-errorColor"
            }`}
          >
            {textLength === 500
              ? "You have reach the max character length!"
              : `${textLength} / 500`}
          </span>
        </div>
        <div onClick={handleClick}>
          <Button
            className="flex items-center justify-center w-[120px] md:w-[160px]"
            disabled={!user}
            type="submit"
            btnTitle={loading ? "Loading..." : "Submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewBox;
