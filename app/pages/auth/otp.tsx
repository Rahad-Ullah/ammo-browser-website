import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import OtpInput from "react-otp-input";
import { useAuth } from "~/hooks/providers/AuthProvider";
import Button from "~/components/atoms/Button";
import { successToast, errorToast } from "~/utils/toast";
import { getLocalStorage, setLocalStorage } from "~/utils/localStorage";
import { generateMeta } from "~/utils";
import type { Route } from "./+types/otp";
import bg from "~/assets/Login-Resource/bg.png";

export function meta(): ReturnType<Route.MetaFunction> {
  return generateMeta({
    title: "OTP Verification | AmmoBrowser",
    description: "Enter the verification code sent to your email to finish logging in.",
    robots: "noindex, nofollow",
  });
}

export default function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const { verifyOtp, loginWithOtp } = useAuth();
  const email = getLocalStorage<string>("berg-user-email");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(180);

  // Format time as MM:SS
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  // Verify OTP
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setOtpError(false);
      const data = { email: email || "", otp: otp };
      try {
        setLoading(true);
        const res = await verifyOtp(data);
        if (res.success === true) {
          setLocalStorage("berg-token", res?.access_token);
          setLocalStorage("berg-user", res?.data);
          navigate("/");
          setLoading(false);
          successToast(res?.message || "Login successful!");
        }
      } catch (error) {
        errorToast("Invalid OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setOtpError(true);
    }
  };

  // Clear error when OTP is valid length
  useEffect(() => {
    if (otp.length === 4) {
      setOtpError(false);
    }
  }, [otp]);

  // Timer countdown
  useEffect(() => {
    if (secondsLeft <= 0) {
      setTimer(false);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  // Resend OTP
  const HandleResend = async () => {
    try {
      const res = await loginWithOtp({ email: email || "" });
      if (res?.success === true) {
        setSecondsLeft(180);
        setTimer(true);
        successToast("OTP sent again.");
      }
    } catch (error) {
      errorToast("Failed to resend OTP. Please try again.");
    }
  };

  // Fallback if no email
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-secondaryColor mb-4">No email provided.</p>
          <a href="/login" className="text-orange hover:underline">
            Go back to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{ background: `url(${bg})` }}
      >
        <div className="container">
          <div className="min-h-[100vh] w-full sm:py-8 md:py-0 flex items-center justify-center flex-col font-Poppins">
            <h4 className="text-4xl xl:text-8xl heading-gradient pb-5 xl:pb-10">
              OTP Verification
            </h4>
            <form
              onSubmit={onSubmit}
              className="bg-secondaryBg w-full sm:max-w-[400px] xl:max-w-[650px] md:w-auto p-4 lg:p-8 xl:p-16"
            >
              <div className="flex flex-col gap-2 xl:gap-4">
                <label className="font-medium text-lg text-center xl:text-2xl text-primaryWhite capitalize">
                  Enter Code
                </label>
                <div className="otp-inputs">
                  <OtpInput
                    containerStyle={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "20px",
                      justifyContent: "space-between",
                    }}
                    value={otp}
                    inputStyle={{
                      background: "var(--additionalColor)",
                      color: "var(--thirdColor)",
                      fontSize: "18px",
                      fontWeight: "500",
                      fontFamily: "var(--Inter)",
                      borderRadius: "5px",
                      border: `${
                        otpError
                          ? "1.5px solid var(--errorColor)"
                          : "1.5px solid transparent"
                      }`,
                    }}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} />}
                  />
                  <p className="font-Poppins font-light text-sm lg:text-base xl:text-lg text-thirdColor text-center pt-5">
                    Enter the OTP sent to {email}
                  </p>
                </div>
              </div>

              <div className="lgxl:mt-11 mt-6">
                <Button
                  type="submit"
                  btnTitle={
                    loading ? (
                      <div aria-label="Loading..." role="status">
                        <svg
                          className="size-8 animate-spin stroke-primaryWhite"
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
                    ) : otpError ? (
                      "Please enter otp"
                    ) : (
                      "Verify"
                    )
                  }
                  className="w-full py-2 xl:py-4 !text-base xl:!text-lg flex items-center justify-center after:!w-0 px-8 xl:px-12 !text-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all text-primaryWhite font-Poppins font-medium hover:bg-[#CC4910]"
                />
              </div>

              <p className="font-Poppins text-sm lg:text-base xl:text-lg text-center mt-6 md:mt-10 text-primaryWhite font-normal">
                Didn't receive the OTP?{" "}
                <button
                  type="button"
                  disabled={timer}
                  className="font-medium text-orange cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={HandleResend}
                >
                  Resend
                </button>
              </p>
              {secondsLeft !== 0 && (
                <p className="text-primaryWhite font-Inter text-center font-light text-[10px] sm:text-xs pt-5 sm:pt-3 md:text-sm">
                  <span className="opacity-70">Please wait</span>{" "}
                  <span className="font-semibold w-[33px] sm:w-[45px] inline-block">
                    {formatTime(secondsLeft)}
                  </span>{" "}
                  <span className="opacity-70">
                    before requesting a new code
                  </span>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
