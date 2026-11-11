import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "~/hooks/providers/AuthProvider";
import Button from "~/components/atoms/Button";
import Input from "~/components/atoms/Input";
import LoadingSpinner from "~/components/atoms/LoadingSpinner";
import { successToast, errorToast } from "~/utils/toast";
import { getLocalStorage, setLocalStorage } from "~/utils/localStorage";
import { generateMeta } from "~/utils";
import type { Route } from "./+types/login";
import bg from "~/assets/Login-Resource/bg.png";

interface LoginFormData {
  email: string;
}

export function meta(): ReturnType<Route.MetaFunction> {
  return generateMeta({
    title: "Log In | AmmoBrowser",
    description: "Log in to AmmoBrowser to save ammo to your list and track prices.",
    robots: "noindex, nofollow",
  });
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { googleLogin, loginWithOtp, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const res = await loginWithOtp(data);
      if (res.success) {
        successToast("OTP sent to your email!");
        setLocalStorage("berg-user-email", data.email);
        navigate("/otp-verification", { state: { email: data.email } });
      }
    } catch (error) {
      errorToast("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login redirect to last visited page
  useEffect(() => {
    if (user) {
      const visitedRoutes = getLocalStorage<string[]>("visitedRoutes") || [];
      const lastRoute = visitedRoutes[visitedRoutes.length - 1];
      const redirectTo = lastRoute && lastRoute !== "/login" ? lastRoute : "/";
      navigate(redirectTo);
      successToast("Login successfully");
    }
  }, [user, navigate]);

  return (
    <div
      className="!bg-cover w-full min-h-screen bg-no-repeat"
      style={{ background: `url(${bg})` }}
    >
      <div className="container">
        <div className="min-h-screen w-full sm:py-8 md:py-0 flex items-center justify-center flex-col font-Poppins">
          <h4 className="text-4xl xl:text-8xl heading-gradient pb-5 xl:pb-10">
            Log in
          </h4>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-secondaryBg w-full md:w-auto p-4 xl:p-16"
          >
            <div className="flex flex-col gap-2 xl:gap-4">
              <label className="font-medium text-lg xl:text-2xl text-primaryWhite capitalize">
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                register={register as any}
                errors={errors}
                className="!py-2 md:!py-3"
                icon={<MdOutlineMailOutline />}
              />
            </div>

            <div className="lgxl:mt-11 mt-6">
              <Button
                type="submit"
                btnTitle={loading ? <LoadingSpinner size="md" /> : "Log In"}
                disabled={loading}
                className="w-full py-2 xl:py-4 !text-base xl:!text-lg after:!w-0 flex items-center justify-center px-8 xl:px-12 !text-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all text-primaryWhite font-Poppins font-medium hover:bg-[#CC4910] border-[#CC4910] border-[1px]"
              />
            </div>

            <h5 className="font-normal text-sm lg:text-base text-thirdColor text-center py-5 flex items-center justify-center">
              Or log in with
            </h5>

            <div className="flex items-center justify-center gap-5">
              <Button
                onClick={() => googleLogin()}
                btnTitle="Google"
                className="bg-additionalColor text-primaryWhite w-full justify-center flex items-center gap-[6px] flex-row-reverse hover:bg-[#353535] transition font-Urbanist border-0 after:!w-0 xl:py-3 py-[10px] px-8 xl:px-12 !text-nowrap capitalize active:scale-95 rounded-none font-medium !text-sm xl:!text-base"
                img={<FaGoogle className="text-xl" />}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
