import { Link } from "react-router";
import Button from "~/components/atoms/Button";

interface CookieConsentModalProps {
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

/**
 * Cookie consent banner — mirrors the design of MyCookieModal.jsx
 * (ammo_react_frontend-main-second). Implemented without @material-tailwind
 * because this project runs React 19 + SSR, where material-tailwind v2 breaks.
 */
export default function CookieConsentModal({
  onAccept,
  onReject,
  onClose,
}: CookieConsentModalProps) {
  return (
    <div
      role="dialog"
      aria-label="Cookie policy"
      className="bg-secondaryBg rounded-lg px-4 py-5 md:py-9 fixed bottom-4 md:bottom-10 right-4 left-4 md:left-auto md:right-6 md:!min-w-[25%] z-[60] flex items-start flex-col justify-start text-start animate-cookie-fade-in"
    >
      {/* header */}
      <div className="mb-2 p-0">
        <h3 className="text-xl md:text-4xl heading-gradient pb-2">
          COOKIE POLICY
        </h3>
      </div>

      {/* body */}
      <div className="p-0 max-w-[888px]">
        <p className="font-Poppins font-light text-sm md:text-lg xl:text-2xl text-thirdColor pb-8 xl:pb-14">
          We use cookies to improve your browsing experience, analyze traffic,
          and personalize content. You can choose to accept all cookies, reject
          non-essential cookies, or learn more about how we use them.
        </p>
      </div>

      {/* footer */}
      <div className="w-full md:w-auto md:ml-auto p-0">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
          <Button
            type="button"
            onClick={onReject}
            btnTitle="Reject Non-Essential Cookies"
            className="w-full md:w-auto text-center whitespace-nowrap !px-4 !py-2.5 md:!px-8 text-xs md:text-sm bg-transparent border-[1.5px] font-light border-orange !text-primaryWhite"
          />
          <Link to="/cookies" onClick={onClose} className="w-full md:w-auto">
            <Button
              type="button"
              btnTitle="Learn More"
              className="!w-full font-light md:!w-auto text-center whitespace-nowrap !px-4 !py-2.5 md:!px-8 text-xs md:text-sm bg-transparent border-[1.5px] border-orange !text-primaryWhite"
            />
          </Link>
          <Button
            type="button"
            onClick={onAccept}
            btnTitle="Accept All"
            className="w-full md:w-auto font-light text-center whitespace-nowrap !px-4 !py-2.5 md:!px-8 text-xs md:text-sm bg-orange !text-primaryWhite hover:!text-primaryWhite"
          />
        </div>
      </div>
    </div>
  );
}
