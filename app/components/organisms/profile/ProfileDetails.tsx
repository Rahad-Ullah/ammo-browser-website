import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { successToast } from "~/utils/toast";
import { handleApiError } from "~/utils/errorHandler";
import Button from "~/components/atoms/Button";
import avatar from "~/assets/avatar.png";
import elips2 from "~/assets/Ellipse15.png";
import elips1 from "~/assets/Ellipse 9.png";

interface ProfileFormData {
  name: string;
}

const ProfileDetails = () => {
  const { profileData, profileUpdate, profileImgUpdate } = useAuth();
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileImg, setProfileImg] = useState<string>(avatar);
  const [profileImgLoading, setProfileImgLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (imgFile) {
      formData.append("image", imgFile);
    }

    try {
      setProfileLoading(true);
      const res = await profileUpdate(formData);
      if (res?.success === true) {
        successToast(res?.message ?? "Profile updated successfully");
        setImgFile(null);
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'isAxiosError' in error) {
        handleApiError(error as any);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await profileData();
      return response?.data;
    },
  });

  useEffect(() => {
    if (data?.image) {
      setProfileImg(data.image);
    } else {
      setProfileImg(avatar);
    }
  }, [data]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImgFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);

      const formData = new FormData();
      formData.append("image", file);

      try {
        setProfileImgLoading(true);
        const res = await profileImgUpdate(formData);
        if (res?.success === true) {
          successToast(res?.message ?? "Profile image updated successfully");
        }
      } catch (error) {
        if (error && typeof error === 'object' && 'isAxiosError' in error) {
          handleApiError(error as any);
        }
      } finally {
        setProfileImgLoading(false);
      }
    }
  };

  return (
    <div className="pt-32 lg:pt-56 pb-20 lg:pb-32 relative">
      <img src={elips2} alt="" className="absolute bottom-0 right-0 -z-10" />
      <img src={elips1} alt="" className="absolute bottom-0 left-0 -z-10" />
      <div className="container">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-secondaryBg mt-6 xl:mt-10 py-10 lg:py-20 px-5 xl:px-52 inline-flex flex-col gap-4 xl:gap-7"
          >
            {/* profile image */}
            <div className="inline-flex">
              <label className="mb-6 lg:mb-10 cursor-pointer">
                <div className="relative inline-block overflow-hidden">
                  <div className="size-20 lg:size-28 xl:size-40 overflow-hidden bg-deep-orange-400 rounded-full border-2 border-primaryWhite">
                    <img
                      src={profileImg}
                      alt="profileImg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = avatar;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!profileImgLoading && (
                    <div className="size-7 lg:size-10 rounded-full bg-primaryWhite text-orange flex items-center justify-center text-sm lg:text-xl absolute right-0 bottom-1 xl:bottom-4">
                      <FaCamera />
                    </div>
                  )}

                  {profileImgLoading && (
                    <div className="bg-[#31313150] backdrop-blur-xl w-full h-full absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] rounded-full flex items-center justify-center">
                      <div aria-label="Loading..." role="status">
                        <svg
                          className="h-12 w-12 animate-spin stroke-gray-500"
                          viewBox="0 0 256 256"
                        >
                          <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
                          <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
                          <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
                          <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
                          <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
                          <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
                          <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
                          <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {/* Name */}
            <div className="relative">
              <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                Username
              </label>
              <input
                placeholder={data?.name || "Name"}
                type="text"
                {...register("name", {
                  required: "Please enter your name!",
                })}
                className={`pl-5 py-2 xl:py-3 bg-additionalColor pr-14 font-Inter border-[1px] border-transparent text-thirdColor -mt-[2px] placeholder:text-xs placeholder:md:text-base placeholder:font-normal placeholder:font-Inter placeholder:text-thirdColor w-full ${
                  errors.name && "!border-errorColor placeholder:!text-errorColor"
                }`}
              />
            </div>
            {/* Email */}
            <div className="relative">
              <label className="font-medium mb-2 xl:mb-4 block text-base xl:text-2xl text-primaryWhite capitalize">
                Email
              </label>
              <input
                readOnly
                placeholder={data?.email || "Email"}
                type="text"
                className="pl-5 py-2 xl:py-3 bg-additionalColor pr-14 font-Inter border-[1px] border-transparent text-thirdColor -mt-[2px] placeholder:font-normal placeholder:font-Inter placeholder:text-xs placeholder:md:text-base placeholder:text-thirdColor w-full"
              />
            </div>

            <div className="flex items-center flex-col gap-5 sm:gap-0 sm:flex-row justify-between">
              <Button
                type="submit"
                btnTitle={profileLoading ? "Please wait.." : "Update"}
                className="mt-5 sm:mt-0 w-full sm:w-auto xl:py-3 py-[10px] px-8 xl:px-12 !text-nowrap bg-orange capitalize active:scale-95 rounded-none transition-all inline-block text-primaryWhite font-Poppins font-medium text-sm xl:text-base hover:bg-[#CC4910] after:!w-0"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
