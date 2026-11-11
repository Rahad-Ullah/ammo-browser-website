import { useEffect, useState } from "react";
import { Link } from "react-router";
import { IoMdMail } from "react-icons/io";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { axiosPublic } from "~/lib/axios/axios.config";
import Button from "~/components/atoms/Button";
import { CookieConsentModal } from "~/components/organisms/policy";
import logo from "~/assets/logo.png";

interface SubscribeFormData {
  email: string;
}

interface SettingsData {
  logo?: string;
  footer_logo?: string;
  footer_text?: string;
  copy_right_text?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showCookie, setShowCookie] = useState(false);
  const [loading, setLoading] = useState(false);
  const { subscribe } = useAuth();

  useEffect(() => {
    const hasSeenCookie = localStorage.getItem("cookieConsent");
    if (!hasSeenCookie) {
      setShowCookie(true);
    }
  }, []);

  const handleAcceptCookie = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookie(false);
  };

  const handleRejectCookie = () => {
    localStorage.setItem("cookieConsent", "false");
    setShowCookie(false);
  };

  const menu = [
    { name: "Retailers Directory", path: "/retailers" },
    { name: "For Retailers", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms and condition", path: "/terms-and-condition" },
    { name: "Cookie policy", path: "/cookies" },
  ];

  const { data } = useQuery<SettingsData>({
    queryKey: ["footerData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/settings");
      return res?.data?.data;
    },
  });

  const currentYear = new Date().getFullYear();
  const copyrightText = (
    data?.copy_right_text || `© ${currentYear} AmmoBrowser. All Rights Reserved`
  ).replace(/\b(?:19|20)\d{2}\b/, String(currentYear));

  const socialLinks = [
    { link: data?.facebook, icon: <FaFacebookF /> },
    { link: data?.instagram, icon: <FaInstagram /> },
    { link: data?.twitter, icon: <FaXTwitter /> },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeFormData>();

  const onSubmit = async (formData: SubscribeFormData) => {
    try {
      setLoading(true);
      const res = await subscribe(formData);
      if (res.success === true) {
        setLoading(false);
        setShowPopup(true);
        reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-footerBG pt-10 pb-5 lg:pt-20 lg:pb-10">
      <div className="container">
        <div className="flex flex-col xl:gap-0 gap-5 lg:flex-row justify-between items-start">
          <div className="inline-flex flex-col">
            <Link to="/" className="mb-5">
              <img
                src={data?.footer_logo || logo}
                onError={(e) => ((e.target as HTMLImageElement).src = logo)}
                alt="logo"
                className="xl:w-20 w-11"
              />
            </Link>
            <h4 className="xl:text-[50px] text-2xl heading-gradient">Join Our Newsletter</h4>
            <p className="font-Poppins text-sm xl:text-lg font-normal text-secondaryColor pt-2">
              {data?.footer_text || "Stay updated on the latest ammo deals and new retailers"}
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[547px] mt-7 relative">
              <input
                type="text"
                {...register("email", {
                  required: "Please enter your email address!",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`bg-mainBG py-3 xl:py-5 w-full pl-3 xl:pl-5 pr-28 xl:pr-[170px] border-[1.5px] border-transparent text-secondaryColor placeholder:text-secondaryColor font-Poppins placeholder:text-sm placeholder:lg:ext-base placeholder:font-light ${
                  errors.email && "placeholder:!text-errorColor border-errorColor"
                }`}
                placeholder="Email address"
              />
              <Button
                type="submit"
                btnTitle={loading ? "..." : "Submit"}
                className="!absolute top-[50%] -translate-y-[50%] right-[9px] py-[5px] xl:py-2 px-5 xl:px-10 text-sm xl:text-base"
              />
            </form>
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div className="font-Poppins flex-col sm:flex-row pt-6 lg:pt-10 xl:pt-0 flex gap-6 sm:gap-10">
            <ul className="flex flex-col">
              <li className="font-semibold text-primaryWhite text-lg xl:text-2xl pb-0 xl:pb-3">Let us help you</li>
              {menu?.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="font-normal inline-block text-sm xl:text-xl text-secondaryColor mt-1 xl:mt-2 hover:text-primaryWhite transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col">
              <li className="font-semibold text-primaryWhite text-lg xl:text-2xl pb-0 xl:pb-3">Contact</li>
              <li className="font-normal text-sm xl:text-xl text-secondaryColor mt-2 flex items-center gap-2">
                <span className="mt-1 text-orange">
                  <IoMdMail />
                </span>
                <a href={`mailto:${data?.email}`} className="underline">
                  {data?.email || "demo@gmail.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="flex gap-2 lg:gap-4 items-end justify-start mt-10 lg:mt-0 lg:justify-end">
          {socialLinks?.map((item, index) => (
            <li key={index}>
              <a
                href={item?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="size-9 xl:size-12 rounded-full bg-mainBG flex items-center justify-center hover:bg-orange text-primaryWhite text-base xl:text-xl hover:-translate-y-1 duration-150"
              >
                {item?.icon}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-center w-full font-Poppins text-sm lg:text-base text-primaryWhite mt-10 pt-4 border-t-[1.5px] border-t-borderColor">
          {copyrightText}
        </p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-footerBG p-6 rounded-lg text-center">
            <h3 className="text-primaryWhite text-xl mb-4">Thank you for subscribing!</h3>
            <button onClick={() => setShowPopup(false)} className="bg-orange text-white px-6 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {showCookie && (
        <CookieConsentModal
          onAccept={handleAcceptCookie}
          onReject={handleRejectCookie}
          onClose={() => setShowCookie(false)}
        />
      )}
    </div>
  );
};

export default Footer;
