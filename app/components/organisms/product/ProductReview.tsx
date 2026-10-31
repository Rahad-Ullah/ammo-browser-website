import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "~/lib/axios/axios.config";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { successToast } from "~/utils/toast";
import { handleApiError } from "~/utils/errorHandler";
import ReviewCustomer from "~/components/molecules/ReviewCustomer";
import ReviewBox from "~/components/molecules/ReviewBox";

interface ReviewFormData {
  review: string;
  rating: number;
}

interface ReviewItem {
  user?: {
    name?: string;
    image?: string;
    updated_at?: string;
  };
  rating?: number;
  review?: string;
}

interface ProductReviewProps {
  title?: string;
  placeholder?: string;
  openProductReview: boolean;
  id?: string;
  rating?: number;
}

const ProductReview = ({
  title,
  placeholder,
  openProductReview,
  id,
}: ProductReviewProps) => {
  const { ProductReview: submitProductReview, refetchRating } = useAuth();
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>();

  const { data, refetch } = useQuery<ReviewItem[]>({
    queryKey: ["customerReview", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/product/${id}/reviews`);
      return response?.data?.data;
    },
    enabled: !!id,
  });

  const handleNewReview = () => {
    refetch();
  };

  const onSubmit = async (formData: ReviewFormData) => {
    if (!id) {
      return;
    }

    const payload = {
      product_id: id,
      rating: formData.rating,
      comment: formData.review
    };

    try {
      setLoading(true);
      const res = await submitProductReview(payload);
      if (res?.success) {
        setLoading(false);
        successToast(res?.message ?? "Review submitted successfully");
        reset();
        handleNewReview();
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'isAxiosError' in error) {
        handleApiError(error as any);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetchRating, refetch]);

  return (
    <div
      className={`${
        openProductReview
          ? "opacity-100 translate-x-0 pointer-events-auto duration-500 transform transition-all"
          : "opacity-0 -translate-x-5 pointer-events-none absolute"
      }`}
    >
      <div className="bg-secondaryBg p-4 xl:p-14">
        <div className="flex flex-col gap-2">
          {data?.length ? (
            (more ? data : data.slice(0, 3)).map((item, index) => (
              <ReviewCustomer item={item} key={index} />
            ))
          ) : (
            <div className="text-secondaryColor text-lg lg:text-2xl font-Inter p-4 font-normal">
              No review here
            </div>
          )}
        </div>
        {(data?.length ?? 0) > 3 && (
          <div
            onClick={() => setMore(!more)}
            className="font-Poppins text-xs xl:text-base text-orange font-normal cursor-pointer flex items-center justify-center mt-5 xl:mt-10"
          >
            <span>
              <MdKeyboardArrowDown className="text-xl xl:text-2xl" />
            </span>
            View more
          </div>
        )}
      </div>
      <ReviewBox
        loading={loading}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        title={title}
        placeholder={placeholder}
      />
    </div>
  );
};

export default ProductReview;
