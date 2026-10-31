import { motion } from "motion/react";
import { Link } from "react-router";

type WishlistModalMode = "success" | "already-exists" | "login-prompt";

interface WishlistSuccessModalProps {
  onToggleModalClose: () => void;
  mode?: WishlistModalMode;
  discountMessage?: string;
}

const WishlistSuccessModal = ({ onToggleModalClose, mode = "success", discountMessage }: WishlistSuccessModalProps) => {
  return (
    <motion.div
      transition={{
        ease: "easeInOut",
        duration: 0.2,
      }}
      initial={{ opacity: 0, visibility: "hidden" }}
      animate={{ opacity: 1, visibility: "visible" }}
      exit={{ opacity: 0, visibility: "hidden" }}
      className={`fixed inset-0 z-[11111111111] flex items-center justify-center transition-all p-[20px]`}
    >
      <motion.div
        transition={{
          duration: 0.04,
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className={`max-w-[572px] z-[102] w-full rounded-[20px] sm:rounded-[30px] pt-[40px] sm:pt-[48px] pb-[44px] sm:pb-[69px] bg-[#140D0B] px-[43px] sm:px-[43px] relative overflow-hidden transition-all `}
      >
        <div className="absolute top-[24px] 2xl:top-[30px] right-[30px] 2xl:right-[43px]">
          <button type="button" onClick={() => {
              onToggleModalClose();
          }} className="h-[28px] lg:h-[30px] 2xl:h-[36px] max-w-[34px] min-w-[34px] lg:max-w-[40px] lg:min-w-[40px] 2xl:max-w-[47px] 2xl:min-w-[47px] rounded-[10px] border-[#ADADAD] border-[1px] flex items-center justify-center">
            <svg className="rotate-45 min-w-[11px] max-w-[11px] h-[11px] lg:min-w-[13px] lg:max-w-[13px] lg:h-[13px] 2xl:min-w-[17px] 2xl:max-w-[17px] 2xl:h-[16px] fill-none" viewBox="0 0 17 16">
              <path d="M15.225 6.66667H9.83333V1.275C9.83333 0.570833 9.2375 0 8.5 0C7.7625 0 7.16667 0.570833 7.16667 1.275V6.66667H1.775C1.07083 6.66667 0.5 7.2625 0.5 8C0.5 8.7375 1.07083 9.33333 1.775 9.33333H7.16667V14.725C7.16667 15.4292 7.7625 16 8.5 16C9.2375 16 9.83333 15.4292 9.83333 14.725V9.33333H15.225C15.9292 9.33333 16.5 8.7375 16.5 8C16.5 7.2625 15.9292 6.66667 15.225 6.66667Z"  className="fill-white"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center">
          {mode === "success" && (
            <svg className="min-w-[50px] max-w-[50px] h-[50px] sm:min-w-[64px] sm:max-w-[64px] sm:h-[64px] 2xl:min-w-[80px] 2xl:max-w-[80px] 2xl:h-[80px] fill-none" viewBox="0 0 80 80">
              <path style={{
                fillRule:'evenodd',
                clipRule:'evenodd',
              }} d="M59.6851 3.38063C58.8907 2.11122 57.7203 1.12108 56.3368 0.548044C54.9534 -0.0249913 53.4257 -0.152415 51.9664 0.183515L41.6096 2.56263C40.5482 2.80659 39.4453 2.80659 38.3839 2.56263L28.0271 0.183515C26.5678 -0.152415 25.0401 -0.0249913 23.6567 0.548044C22.2732 1.12108 21.1028 2.11122 20.3084 3.38063L14.6635 12.3901C14.0874 13.3118 13.3098 14.0895 12.3882 14.6713L3.37925 20.3167C2.11211 21.1104 1.12349 22.279 0.550617 23.6602C-0.0222576 25.0414 -0.15097 26.5666 0.182346 28.0243L2.5613 38.3933C2.80437 39.4529 2.80437 40.5538 2.5613 41.6135L0.182346 51.9767C-0.152265 53.4352 -0.0242008 54.9617 0.548736 56.3441C1.12167 57.7265 2.11102 58.896 3.37925 59.6901L12.3882 65.3354C13.3098 65.9115 14.0874 66.6892 14.6692 67.6109L20.3142 76.6204C21.9386 79.2184 25.0376 80.503 28.0271 79.8175L38.3839 77.4384C39.4453 77.1944 40.5482 77.1944 41.6096 77.4384L51.9722 79.8175C53.4306 80.1521 54.957 80.024 56.3393 79.4511C57.7216 78.8781 58.891 77.8887 59.6851 76.6204L65.3301 67.6109C65.9061 66.6892 66.6837 65.9115 67.6053 65.3354L76.62 59.6901C77.8883 58.8948 78.8772 57.724 79.4492 56.3405C80.0211 54.9571 80.1476 53.4297 79.8112 51.9709L77.438 41.6135C77.194 40.552 77.194 39.449 77.438 38.3875L79.8169 28.0243C80.1521 26.5664 80.0249 25.0403 79.453 23.658C78.8811 22.2757 77.893 21.1058 76.6258 20.3109L67.6111 14.6656C66.6908 14.0884 65.9129 13.3105 65.3358 12.3901L59.6851 3.38063ZM56.7877 27.1545C57.144 26.4993 57.2322 25.7315 57.0339 25.0125C56.8356 24.2936 56.3662 23.6796 55.7245 23.2997C55.0827 22.9199 54.3187 22.8038 53.593 22.9758C52.8674 23.1479 52.2368 23.5947 51.8339 24.2223L36.771 49.7186L27.6757 41.0086C27.4059 40.7315 27.083 40.5116 26.7264 40.362C26.3697 40.2125 25.9866 40.1362 25.5999 40.1379C25.2132 40.1396 24.8307 40.2192 24.4754 40.3719C24.1201 40.5246 23.7991 40.7472 23.5317 41.0267C23.2643 41.3061 23.0559 41.6365 22.919 41.9982C22.782 42.3599 22.7193 42.7455 22.7346 43.1319C22.7499 43.5184 22.8428 43.8978 23.0079 44.2476C23.173 44.5974 23.4068 44.9103 23.6954 45.1677L35.4117 56.3951C35.7252 56.6949 36.1025 56.92 36.5153 57.0536C36.9281 57.1872 37.3657 57.2258 37.7955 57.1666C38.2253 57.1073 38.6361 56.9517 38.9973 56.7114C39.3586 56.471 39.6608 56.1522 39.8815 55.7787L56.7877 27.1545Z" fill="white"/>
            </svg>
          )}
          {mode === "already-exists" && (
            <svg className="min-w-[50px] max-w-[50px] h-[50px] sm:min-w-[64px] sm:max-w-[64px] sm:h-[64px] 2xl:min-w-[80px] 2xl:max-w-[80px] 2xl:h-[80px]" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="white" strokeWidth="4"/>
              <text x="40" y="52" textAnchor="middle" fill="white" fontSize="48" fontFamily="sans-serif" fontWeight="bold">!</text>
            </svg>
          )}
          {mode === "login-prompt" && (
            <svg className="min-w-[50px] max-w-[50px] h-[50px] sm:min-w-[64px] sm:max-w-[64px] sm:h-[64px] 2xl:min-w-[80px] 2xl:max-w-[80px] 2xl:h-[80px]" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="30" r="14" stroke="white" strokeWidth="4"/>
              <path d="M12 68C12 54.745 22.745 44 36 44H44C57.255 44 68 54.745 68 68" stroke="white" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        {mode === "success" && (
          <>
            <p className={`text-center font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal ${discountMessage ? "mb-[7px] sm:mb-[10px] 2xl:mb-[15px]" : ""} mt-[18px] sm:mt-[24px]`}>
              Added to Wishlist Successfully
            </p>
            {discountMessage && (
              <p className="text-center font-poppins font-medium text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal">
                {discountMessage}
              </p>
            )}
          </>
        )}

        {mode === "already-exists" && (
          <p className="text-center font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal mt-[18px] sm:mt-[24px]">
            This product is already in your wishlist
          </p>
        )}

        {mode === "login-prompt" && (
          <div className="mt-[18px] sm:mt-[24px]">
            <p className="text-center font-poppins font-light text-[13px] sm:text-[14px] 2xl:text-[16px] leading-[22px] 2xl:leading-[24px] text-[#FFFFFF] tracking-normal mb-[20px] sm:mb-[30px]">
              Please log in to add items to your wishlist
            </p>
            <div className="flex justify-center">
              <Link
                to="/login"
                onClick={onToggleModalClose}
                className="px-8 xl:px-12 py-2 xl:py-3 bg-orange text-primaryWhite font-Poppins text-sm xl:text-base font-medium hover:bg-[#CC4910] active:scale-95 transition-all capitalize"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </motion.div>

      <div
        onClick={() => {
          onToggleModalClose();
        }}
        className={`absolute inset-0 z-[100] transition-all duration-100 bg-[#0f1010c5] opacity-100 visible`}
      ></div>
    </motion.div>
  );
};

export default WishlistSuccessModal;
