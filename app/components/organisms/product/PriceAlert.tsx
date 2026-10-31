import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogHeader, DialogBody } from "~/components/atoms/CustomDialog";
import Button from "~/components/atoms/Button";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { successToast } from "~/utils/toast";
import type { PriceAlertData } from "~/types";

interface PriceAlertFormData {
  price: string;
}

interface PriceAlertProps {
  open: boolean;
  onClose: () => void;
  productData: {
    url: string;
    caliber: string;
  };
  alertData: PriceAlertData | null;
  onSuccess: () => void;
}

const PriceAlert = ({
  open,
  onClose,
  productData,
  alertData,
  onSuccess,
}: PriceAlertProps) => {
  const { setPriceAlert } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<PriceAlertFormData>({
    defaultValues: {
      price: alertData?.threshold?.toString() || "",
    },
  });

  useEffect(() => {
    if (alertData?.threshold !== undefined) {
      reset({
        price: alertData.threshold.toString(),
      });
    }
  }, [alertData, reset]);

  const onSubmit = async (data: PriceAlertFormData) => {
    const alertInfo = {
      product_url: productData.url,
      caliber: productData.caliber,
      threshold: data.price,
    };

    if (data.price) {
      try {
        setLoading(true);
        const res = await setPriceAlert(alertInfo);
        if (res.success === true) {
          onSuccess();
          onClose();
          setLoading(false);
          successToast(res?.message || "Price alert set successfully!");
        }
      } catch (error) {
        console.error("Error setting price alert:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="bg-additionalColor p-3 xl:p-16 max-w-[724px] w-full m-4 rounded-lg"
    >
      <DialogHeader>
        <h4 className="!text-primaryWhite font-Poppins text-xl xl:text-4xl font-medium text-center pb-0 xl:pb-5">
          Set Up a Price Alert
        </h4>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogBody className="flex flex-col gap-5 mb-6 p-[16px]">
          <div className="font-Poppins text-primaryWhite flex flex-col gap-2">
            <label className="text-base xl:text-xl font-medium">
              Caliber
            </label>
            <input
              type="text"
              readOnly
              placeholder={productData.caliber}
              className="bg-secondaryBg placeholder:text-primaryWhite placeholder:font-Poppins placeholder:font-normal placeholder:text-xs xl:placeholder:text-base xl:py-4 px-4 py-2 xl:px-7"
            />
          </div>
          <div className="font-Poppins text-primaryWhite flex flex-col gap-2">
            <label className="text-base xl:text-xl font-medium">
              Threshold
            </label>
            <input
              type="text"
              {...register("price", { required: "Please enter the price!" })}
              placeholder={
                errors.price
                  ? errors.price.message
                  : "$ Enter a targeted price"
              }
              className={`bg-secondaryBg placeholder:text-primaryWhite border-2 border-transparent placeholder:font-Poppins placeholder:font-normal placeholder:text-xs xl:placeholder:text-base xl:py-4 px-4 py-2 xl:px-7 ${
                errors.price &&
                "!border-errorColor placeholder:text-errorColor"
              }`}
            />
            <p className="font-normal text-xs lg:text-sm font-Poppins text-thirdColor">
              You will receive an alert when the price drops below your set
              threshold
            </p>
          </div>
        </DialogBody>

        <div className="flex items-end justify-end">
          <Button
            type="submit"
            className="!text-xs md:!text-base flex items-center justify-center w-[150px] xl:py-3 py-[10px] px-8 xl:px-12 !text-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all text-primaryWhite font-Poppins font-medium xl:text-base hover:bg-[#CC4910]"
            btnTitle={
              loading ? (
                <div aria-label="Loading..." role="status">
                  <svg
                    className="size-6 animate-spin stroke-primaryWhite"
                    viewBox="0 0 256 256"
                  >
                    <line
                      x1="128"
                      y1="32"
                      x2="128"
                      y2="64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="60.1"
                      x2="173.3"
                      y2="82.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></line>
                    <line
                      x1="224"
                      y1="128"
                      x2="192"
                      y2="128"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="195.9"
                      x2="173.3"
                      y2="173.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></line>
                    <line
                      x1="128"
                      y1="224"
                      x2="128"
                      y2="192"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="195.9"
                      x2="82.7"
                      y2="173.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></line>
                    <line
                      x1="32"
                      y1="128"
                      x2="64"
                      y2="128"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="60.1"
                      x2="82.7"
                      y2="82.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="24"
                    ></line>
                  </svg>
                </div>
              ) : alertData?.threshold ? (
                "Update"
              ) : (
                "Enable"
              )
            }
          />
        </div>
      </form>
    </Dialog>
  );
};

export default PriceAlert;
