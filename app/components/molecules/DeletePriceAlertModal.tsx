import { useState } from "react";
import { axiosPrivate } from "~/lib/axios/axios.config";
import { successToast } from "~/utils/toast";
import { handleApiError } from "~/utils/errorHandler";
import Modal from "~/components/atoms/Modal";
import Button from "~/components/atoms/Button";
import type { AxiosError } from "axios";

interface DeletePriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteId: string | null;
  refetch: () => void;
}

export default function DeletePriceAlertModal({
  isOpen,
  onClose,
  deleteId,
  refetch,
}: DeletePriceAlertModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);
      const res = await axiosPrivate.get(`/price-alert/destroy/${deleteId}`);

      if (res?.status === 200) {
        refetch();
        onClose();
        successToast(
          `${res?.data?.data?.caliber} Price Alert Deleted Successfully`,
        );
      }
    } catch (error) {
      handleApiError(error as any);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center flex-col justify-center text-center">
        {/* Header */}
        <h3 className="text-3xl md:text-4xl xl:text-[68px] heading-gradient pb-4">
          Confirm Price Alert Removal
        </h3>

        {/* Body */}
        <p className="font-Poppins text-sm md:text-lg xl:text-2xl text-thirdColor pb-8 xl:pb-14">
          Are you sure you want to delete this price alert? You won't receive
          notifications for price changes on this product anymore.
        </p>

        {/* Footer with Button */}
        <Button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-primaryWhite w-[120px] sm:w-[150px] flex items-center justify-center"
        >
          {loading ? (
            <div aria-label="Loading..." role="status">
              <svg
                className="size-6 sm:size-7 animate-spin stroke-primaryWhite"
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
                />
                <line
                  x1="195.9"
                  y1="60.1"
                  x2="173.3"
                  y2="82.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <line
                  x1="224"
                  y1="128"
                  x2="192"
                  y2="128"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <line
                  x1="195.9"
                  y1="195.9"
                  x2="173.3"
                  y2="173.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <line
                  x1="128"
                  y1="224"
                  x2="128"
                  y2="192"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <line
                  x1="60.1"
                  y1="195.9"
                  x2="82.7"
                  y2="173.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <line
                  x1="32"
                  y1="128"
                  x2="64"
                  y2="128"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
                <line
                  x1="60.1"
                  y1="60.1"
                  x2="82.7"
                  y2="82.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
              </svg>
            </div>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </Modal>
  );
}
