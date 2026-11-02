import { useState } from "react";
import { Link } from "react-router";
import { getProductUrl } from "~/utils";
import type { WishlistProduct } from "~/types";

interface WishlistTableRowProps {
  isTrue?: boolean;
  product: WishlistProduct;
  retailerTitle: string;
  onQuantityChange: (productUrl: string, newQuantity: number) => void;
  onRemove: (productUrl: string) => void;
  actionLoading?: { url: string; action: "increase" | "decrease" | "remove" } | null;
}

const ButtonSpinner = ({ className = "size-3" }: { className?: string }) => (
  <svg className={`${className} animate-spin text-white`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

export default function WishlistTableRow({
  isTrue = false,
  product,
  retailerTitle,
  onQuantityChange,
  onRemove,
  actionLoading = null,
}: WishlistTableRowProps) {
  const [tableRes, setTableRes] = useState(isTrue);

  const pricePerBox = (product.cost_per_round * product.num_of_rounds).toFixed(2);
  const isMinQuantity = product.quantity <= 1;
  const isDecreasing = actionLoading?.action === "decrease";
  const isIncreasing = actionLoading?.action === "increase";
  const isRemoving = actionLoading?.action === "remove";
  const isAnyLoading = !!actionLoading;

  return (
    <div className="py-[6.5px] 2xl:py-[9.5px] px-[12px] sm:px-[14px] 2xl:px-[20px] bg-[#E346021A] border-b-[#FFFFFF] border-b-[0.5px]">
      <div className="flex items-center justify-between gap-[14px] relative" aria-label="table-head">
        <div className="min-w-[170px] max-w-[170px] sm:min-w-[196px] sm:max-w-[196px] flex items-center justify-start gap-[4px] pe-[4px] lg:pe-[7px]">
          <button
            onClick={() => setTableRes(!tableRes)}
            className="scale-90 min-w-[15px] max-w-[15px] h-[15px] 2xl:hidden border-white border-[1px] rounded-full flex items-center justify-center"
            type="button"
          >
            <svg
              className={`min-w-[9px] max-w-[9px] h-[9px] fill-none ${!tableRes ? "block" : "hidden"}`}
              viewBox="0 0 17 16"
            >
              <path
                d="M15.225 6.66667H9.83333V1.275C9.83333 0.570833 9.2375 0 8.5 0C7.7625 0 7.16667 0.570833 7.16667 1.275V6.66667H1.775C1.07083 6.66667 0.5 7.2625 0.5 8C0.5 8.7375 1.07083 9.33333 1.775 9.33333H7.16667V14.725C7.16667 15.4292 7.7625 16 8.5 16C9.2375 16 9.83333 15.4292 9.83333 14.725V9.33333H15.225C15.9292 9.33333 16.5 8.7375 16.5 8C16.5 7.2625 15.9292 6.66667 15.225 6.66667Z"
                className="fill-white"
              />
            </svg>

            <svg className={`${tableRes ? "block" : "hidden"} min-w-[7px] max-w-[7px] h-[2px] fill-none`} viewBox="0 0 19 4">
              <path d="M1.5 2H17.5" className="stroke-white" style={{ strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} />
            </svg>
          </button>

          <Link
            to={getProductUrl({
              id: product.product_id,
              title: product.title,
              caliber: product.caliber,
            })}
            className="flex-1 min-w-0"
          >
            <p className="font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal line-clamp-1 hover:underline cursor-pointer">
              {product.title}
            </p>
          </Link>
        </div>
        <div className="hidden md:block min-w-[82px] max-w-[82px] 2xl:min-w-[96px] 2xl:max-w-[96px] px-[4px] lg:px-[7px]">
          <p className="font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">
            {product.caliber}
          </p>
        </div>
        <div className="hidden 2xl:block min-w-[94px] max-w-[94px] lg:min-w-[114px] lg:max-w-[114px] px-[4px] lg:px-[7px]">
          <p className="font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">
            {retailerTitle}
          </p>
        </div>
        <div className="hidden md:block max-w-[152px] min-w-[152px] md:min-w-[180px] md:max-w-[180px] 2xl:min-w-[194px] 2xl:max-w-[194px] px-[4px] lg:px-[7px]">
          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={() => onQuantityChange(product.url, product.quantity - 1)}
              disabled={isMinQuantity || isAnyLoading}
              className={`h-[28px] lg:h-[30px] 2xl:h-[36px] max-w-[34px] min-w-[34px] lg:max-w-[40px] lg:min-w-[40px] 2xl:max-w-[47px] 2xl:min-w-[47px] rounded-[10px] border-[#ADADAD] border-[1px] flex items-center justify-center ${isMinQuantity || isDecreasing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isDecreasing ? (
                <ButtonSpinner />
              ) : (
                <svg className="min-w-[12px] max-w-[12px] lg:min-w-[14px] lg:max-w-[14px] 2xl:min-w-[19px] 2xl:max-w-[19px] h-[2px] lg:h-[3px] 2xl:h-[4px] fill-none" viewBox="0 0 19 4">
                  <path d="M1.5 2H17.5" className="stroke-white" style={{ strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} />
                </svg>
              )}
            </button>
            <p className="max-w-[38px] lg:max-w-[44px] 2xl:max-w-[62px] h-[28px] lg:h-[30px] 2xl:h-[35px] w-full text-center bg-[#0C0B0B] font-poppins py-[5.5px] px-[6px] rounded-[10px] font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[16px] lg:leading-[20px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">
              {product.quantity}
            </p>
            <button
              type="button"
              onClick={() => onQuantityChange(product.url, product.quantity + 1)}
              disabled={isAnyLoading}
              className={`h-[28px] lg:h-[30px] 2xl:h-[36px] max-w-[34px] min-w-[34px] lg:max-w-[40px] lg:min-w-[40px] 2xl:max-w-[47px] 2xl:min-w-[47px] rounded-[10px] border-[#ADADAD] border-[1px] flex items-center justify-center ${isIncreasing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isIncreasing ? (
                <ButtonSpinner />
              ) : (
                <svg className="min-w-[11px] max-w-[11px] h-[11px] lg:min-w-[13px] lg:max-w-[13px] lg:h-[13px] 2xl:min-w-[17px] 2xl:max-w-[17px] 2xl:h-[16px] fill-none" viewBox="0 0 17 16">
                  <path
                    d="M15.225 6.66667H9.83333V1.275C9.83333 0.570833 9.2375 0 8.5 0C7.7625 0 7.16667 0.570833 7.16667 1.275V6.66667H1.775C1.07083 6.66667 0.5 7.2625 0.5 8C0.5 8.7375 1.07083 9.33333 1.775 9.33333H7.16667V14.725C7.16667 15.4292 7.7625 16 8.5 16C9.2375 16 9.83333 15.4292 9.83333 14.725V9.33333H15.225C15.9292 9.33333 16.5 8.7375 16.5 8C16.5 7.2625 15.9292 6.66667 15.225 6.66667Z"
                    className="fill-white"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="hidden 2xl:block min-w-[128px] max-w-[128px] 2xl:min-w-[136px] 2xl:max-w-[136px] px-[4px] lg:px-[7px]">
          <p className="font-poppins font-light text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">{product.num_of_rounds}</p>
        </div>
        <div className="hidden 2xl:block min-w-[110px] max-w-[110px] 2xl:min-w-[124px] 2xl:max-w-[124px] px-[4px] lg:px-[7px]">
          <p className="font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">${pricePerBox}</p>
        </div>
        <div className="min-w-[100px] max-w-[100px] sm:min-w-[110px] sm:max-w-[110px] lg:min-w-[128px] lg:max-w-[128px] 2xl:min-w-[154px] 2xl:max-w-[154px] px-[4px] lg:px-[7px]">
          <p className="font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">${product.cost_per_round.toFixed(3)}</p>
        </div>
        <div className="hidden 2xl:block min-w-[110px] max-w-[110px] 2xl:min-w-[138px] 2xl:max-w-[138px] px-[4px] lg:px-[7px]">
          <p className="font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">${product.product_total.toFixed(2)}</p>
        </div>
        <div className="hidden lg:block sm:max-w-[82px] sm:min-w-[82px] lg:min-w-[102px] lg:max-w-[102px] ps-[4px] lg:ps-[7px]">
          <button
            type="button"
            onClick={() => onRemove(product.url)}
            disabled={isAnyLoading}
            className={`max-w-[20px] min-w-[20px] sm:min-w-auto sm:max-w-[84px] lg:max-w-[88px] 2xl:max-w-[94px] w-full text-center bg-[#0C0B0B] font-poppins py-[3.5px] 2xl:py-[5.5px] px-[10px] lg:px-[14px] 2xl:px-[18px] rounded-full flex items-center justify-center sm:rounded-[10px] font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal ${isRemoving ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isRemoving ? <ButtonSpinner className="size-4 my-[3px] 2xl:my-[4px]" /> : "Remove"}
          </button>
        </div>
        <div className="block lg:hidden top-1/2 right-[-4px] transform translate-y-[-50%] absolute lg:relative max-w-[23px] min-w-[23px] lg:min-w-[102px] lg:max-w-[102px] ps-[4px] lg:ps-[7px]">
          <button
            type="button"
            onClick={() => onRemove(product.url)}
            disabled={isAnyLoading}
            className={`scale-[0.8] sm:scale-[1] h-[20px] max-w-[20px] min-w-[20px] bg-[#0C0B0B] rounded-full flex items-center justify-center ${isRemoving ? "opacity-50" : ""}`}
          >
            {isRemoving ? (
              <ButtonSpinner className="size-[10px]" />
            ) : (
              <span className="rotate-45 transform">
                <svg className="min-w-[10px] max-w-[10px] h-[10px] fill-none" viewBox="0 0 17 16">
                  <path
                    d="M15.225 6.66667H9.83333V1.275C9.83333 0.570833 9.2375 0 8.5 0C7.7625 0 7.16667 0.570833 7.16667 1.275V6.66667H1.775C1.07083 6.66667 0.5 7.2625 0.5 8C0.5 8.7375 1.07083 9.33333 1.775 9.33333H7.16667V14.725C7.16667 15.4292 7.7625 16 8.5 16C9.2375 16 9.83333 15.4292 9.83333 14.725V9.33333H15.225C15.9292 9.33333 16.5 8.7375 16.5 8C16.5 7.2625 15.9292 6.66667 15.225 6.66667Z"
                    className="fill-white"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
      <div className={`grid 2xl:hidden transition-all duration-200 ${tableRes ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} role="table-row-res">
        <div className="overflow-hidden">
          <div className="flex gap-[3px] lg:gap-[2px] flex-col">
            <p className="block md:hidden font-poppins font-light text-[13px] sm:text-[14px] leading-[20px] text-[#FFFFFF] tracking-normal">
              <span className="font-normal">Caliber: </span>
              <span>{product.caliber}</span>
            </p>
            <p className="block xl:hidden font-poppins font-light text-[13px] sm:text-[14px] leading-[20px] text-[#FFFFFF] tracking-normal">
              <span className="font-normal">Retailer: </span>
              <span>{retailerTitle}</span>
            </p>
            <p className="font-poppins font-light text-[13px] sm:text-[14px] leading-[20px] text-[#FFFFFF] tracking-normal">
              <span className="font-normal">Line Total: </span>
              <span>${product.product_total.toFixed(2)}</span>
            </p>
            <p className="font-poppins font-light text-[13px] sm:text-[14px] leading-[20px] text-[#FFFFFF] tracking-normal">
              <span className="font-normal">Price/Box: </span>
              <span>${pricePerBox}</span>
            </p>
            <p className="font-poppins font-light text-[13px] sm:text-[14px] leading-[20px] text-[#FFFFFF] tracking-normal">
              <span className="font-normal">Rounds/Box: </span>
              <span>{product.num_of_rounds}</span>
            </p>
            <div className="flex items-center justify-start gap-[6px] sm:gap-[6px] md:hidden font-poppins font-light text-[13px] sm:text-[14px] leading-[20px] text-[#FFFFFF] tracking-normal">
              <span className="font-normal">Qty: </span>
              <div className="flex items-center gap-[4px] sm:gap-[10px]">
                <button
                  type="button"
                  onClick={() => onQuantityChange(product.url, product.quantity - 1)}
                  disabled={isMinQuantity || isAnyLoading}
                  className={`scale-90 sm:scale-100 h-[28px] lg:h-[30px] 2xl:h-[36px] max-w-[34px] min-w-[34px] lg:max-w-[40px] lg:min-w-[40px] 2xl:max-w-[47px] 2xl:min-w-[47px] rounded-[10px] border-[#ADADAD] border-[1px] flex items-center justify-center ${isMinQuantity || isDecreasing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isDecreasing ? (
                    <ButtonSpinner />
                  ) : (
                    <svg className="min-w-[12px] max-w-[12px] lg:min-w-[14px] lg:max-w-[14px] 2xl:min-w-[19px] 2xl:max-w-[19px] h-[2px] lg:h-[3px] 2xl:h-[4px] fill-none" viewBox="0 0 19 4">
                      <path d="M1.5 2H17.5" className="stroke-white" style={{ strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }} />
                    </svg>
                  )}
                </button>
                <p className="scale-90 sm:scale-100 min-w-[38px] max-w-[38px] lg:max-w-[44px] 2xl:max-w-[62px] h-[28px] lg:h-[30px] 2xl:h-[35px] w-full text-center bg-[#0C0B0B] font-poppins py-[5.5px] px-[6px] rounded-[10px] font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[16px] lg:leading-[20px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">
                  {product.quantity}
                </p>
                <button
                  type="button"
                  onClick={() => onQuantityChange(product.url, product.quantity + 1)}
                  disabled={isAnyLoading}
                  className={`scale-90 sm:scale-100 h-[28px] lg:h-[30px] 2xl:h-[36px] max-w-[34px] min-w-[34px] lg:max-w-[40px] lg:min-w-[40px] 2xl:max-w-[47px] 2xl:min-w-[47px] rounded-[10px] border-[#ADADAD] border-[1px] flex items-center justify-center ${isIncreasing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isIncreasing ? (
                    <ButtonSpinner />
                  ) : (
                    <svg className="min-w-[11px] max-w-[11px] h-[11px] lg:min-w-[13px] lg:max-w-[13px] lg:h-[13px] 2xl:min-w-[17px] 2xl:max-w-[17px] 2xl:h-[16px] fill-none" viewBox="0 0 17 16">
                      <path
                        d="M15.225 6.66667H9.83333V1.275C9.83333 0.570833 9.2375 0 8.5 0C7.7625 0 7.16667 0.570833 7.16667 1.275V6.66667H1.775C1.07083 6.66667 0.5 7.2625 0.5 8C0.5 8.7375 1.07083 9.33333 1.775 9.33333H7.16667V14.725C7.16667 15.4292 7.7625 16 8.5 16C9.2375 16 9.83333 15.4292 9.83333 14.725V9.33333H15.225C15.9292 9.33333 16.5 8.7375 16.5 8C16.5 7.2625 15.9292 6.66667 15.225 6.66667Z"
                        className="fill-white"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
