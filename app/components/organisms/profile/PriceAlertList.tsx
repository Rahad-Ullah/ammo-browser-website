import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RxCross2 } from "react-icons/rx";
import { axiosPrivate } from "~/lib/axios/axios.config";
import { successToast, errorToast } from "~/utils/toast";
import { handleApiError } from "~/utils/errorHandler";
import DeletePriceAlertModal from "~/components/molecules/DeletePriceAlertModal";

interface PriceAlert {
  id: string;
  caliber: string;
  current_price: number;
  threshold: number;
  status: "active" | "inactive";
}

export default function PriceAlertList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    data: alertHistoryData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["alertHistory"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/price-alert/get-all");
      return res?.data?.data as PriceAlert[];
    },
  });

  const handleDisable = async (id: string) => {
    try {
      const res = await axiosPrivate.get(`/price-alert/status/${id}`);
      if (res?.status === 200) {
        refetch();
        errorToast(`${res?.data?.data?.caliber} Disabled the alert`);
      }
    } catch (error) {
      handleApiError(error as any);
    }
  };

  const handleEnable = async (id: string) => {
    try {
      const res = await axiosPrivate.get(`/price-alert/status/${id}`);
      if (res?.status === 200) {
        refetch();
        successToast(`${res?.data?.data?.caliber} Enabled the alert`);
      }
    } catch (error) {
      handleApiError(error as any);
    }
  };

  const handleOpenModal = (id: string) => {
    setIsModalOpen(true);
    setDeleteId(id);
  };

  return (
    <div className="pb-16 lg:pb-28">
      <div className="container">
        <div className="bg-secondaryBg p-5 lg:p-16">
          <h5 className="font-Poppins font-semibold text-xl lg:text-4xl text-primaryWhite">
            Price Alert
          </h5>

          <div className="overflow-x-auto mt-4 lg:mt-8">
            <table className="min-w-full w-full">
              <thead className="font-Inter font-normal text-sm lg:text-2xl text-gravelFint capitalize border-b border-b-additionalColor">
                <tr className="text-left">
                  <th className="lg:py-5 py-3 pr-2 lg:pr-4">Caliber</th>
                  <th className="lg:py-5 py-3 pr-2 lg:pr-4">Price</th>
                  <th className="lg:py-5 py-3 pr-2 lg:pr-4">Threshold</th>
                  <th className="lg:py-5 py-3 pr-2 lg:pr-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              {!isLoading && (!alertHistoryData || alertHistoryData.length < 1) && (
                <tbody>
                  <tr>
                    <td colSpan={4}>
                      <h4 className="text-primaryWhite text-base mt-10 py-6 lg:text-xl xl:text-2xl">
                        No alert history!
                      </h4>
                    </td>
                  </tr>
                </tbody>
              )}

              <tbody>
                {isLoading
                  ? new Array(6).fill(0).map((_, index) => (
                      <tr key={index} className="pt-3">
                        <td>
                          <div className="w-6 h-6 bg-gray-700 rounded" />
                        </td>
                        <td className="flex-1">
                          <div className="w-16 h-4 bg-gray-700 rounded" />
                        </td>
                        <td>
                          <div className="w-20 h-4 bg-gray-700 rounded" />
                        </td>
                        <td className="flex items-end justify-end py-3">
                          <div className="w-20 h-8 bg-gray-700 rounded" />
                        </td>
                      </tr>
                    ))
                  : alertHistoryData?.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-b-additionalColor font-Poppins font-normal text-sm lg:text-lg text-gravelFint"
                      >
                        <td className="lg:py-6 py-3 pr-2 lg:pr-4 flex items-center gap-4">
                          <div
                            onClick={() => handleOpenModal(item.id)}
                            className="size-5 lg:size-8 text-base lg:text-xl flex shrink-0 items-center hover:text-red-500 cursor-pointer hover:bg-footerBG transition justify-center text-primaryWhite bg-additionalColor"
                          >
                            <RxCross2 />
                          </div>{" "}
                          {item.caliber}
                        </td>
                        <td className="lg:py-0 py-3 pr-4">
                          ${item.current_price}
                        </td>
                        <td className="lg:py-0 py-3 pr-4">${item.threshold}</td>
                        <td className="lg:py-0 py-3 pr-2 lg:pr-4 text-right">
                          <div className="flex items-end justify-end gap-2 lg:gap-4">
                            {item.status === "active" ? (
                              <button
                                onClick={() => handleDisable(item.id)}
                                className="bg-transparent border-[1.5px] border-orange text-xs lg:text-base px-4 lg:px-7 py-2 lg:py-4 text-primaryWhite hover:bg-orange transition"
                              >
                                Disable
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEnable(item.id)}
                                className="bg-transparent border-[1.5px] border-orange text-xs lg:text-base px-4 lg:px-7 py-2 lg:py-4 text-primaryWhite hover:bg-orange transition"
                              >
                                Enable
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <p className="text-primaryWhite text-xs lg:text-base text-start font-Inter mt-10">
            Note:{" "}
            <span className="opacity-60">
              You can set price alerts for a maximum of 2 products at a time!
            </span>
          </p>

          <DeletePriceAlertModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            deleteId={deleteId}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
}
