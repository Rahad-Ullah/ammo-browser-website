import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";
import { axiosPublic } from "~/lib/axios/axios.config";

import { caliberMatchesSearch, caliberToSlug } from "~/utils";

interface Caliber {
  id: string;
  caliber: string;
}

interface AmmoSearchProps {
  onSelectCaliber?: (caliber: Caliber) => void;
}

const AmmoSearch = ({ onSelectCaliber }: AmmoSearchProps) => {
  const navigate = useNavigate();
  const { register, watch } = useForm();
  const [isShow, setIsShow] = useState(false);

  const searchValue = watch("searchValue", "");

  const { data: caliberData, isLoading } = useQuery<Caliber[]>({
    queryKey: ["caliberData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/calibers");
      return response?.data?.data;
    },
    staleTime: 10 * 1000,
  });

  const filteredCalibers = useMemo(() => {
    if (!caliberData) return [];
    if (!searchValue) return caliberData;
    return caliberData.filter((item) => caliberMatchesSearch(item.caliber, searchValue));
  }, [caliberData, searchValue]);

  const handleCaliberClick = (caliber: Caliber) => {
    if (onSelectCaliber) {
      onSelectCaliber(caliber);
    } else {
      const slug = caliberToSlug(caliber.caliber);
      navigate(`/ammo/${slug}`);
    }
    setIsShow(false);
  };

  return (
    <div className="relative group">
      <div className="relative">
        <input
          type="text"
          placeholder="Search ammo"
          {...register("searchValue")}
          autoComplete="off"
          onFocus={() => setIsShow(true)}
          onBlur={() => setTimeout(() => setIsShow(false), 200)}
          className="py-3 xl:py-4 pl-10 xl:pl-14 border-b-[3px] border-secondaryBg bg-mainBG hover:bg-[#313131] focus:border-orange transition-colors duration-300 w-full font-Poppins text-primaryWhite placeholder:font-Poppins placeholder:text-primaryWhite placeholder:font-light placeholder:text-sm placeholder:xl:text-xl"
        />
        <span className="absolute top-[48%] -translate-y-[50%] left-3 xl:left-6 text-primaryWhite text-lg xl:text-2xl">
          <IoSearchOutline />
        </span>
      </div>
      {isShow && (
        <div className="absolute top-[100%] left-0 px-[20px] sm:px-[30px] max-h-[500px] overflow-auto scrollbar-thin py-[20px] sm:py-[33px] xl:px-[40px] xl:py-[43px] bg-[#202020] w-full grid gap-[12px] sm:gap-[18px] z-50">
          {isLoading ? (
            <p className="font-poppins font-medium text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[20px] text-[#FFFFFF] text-center">
              Loading...
            </p>
          ) : filteredCalibers.length > 0 ? (
            filteredCalibers.map((caliber, index) => (
              <div
                key={`${caliber.caliber}-${index}`}
                onClick={() => handleCaliberClick(caliber)}
                className="py-[8px] px-[9px] sm:py-[11px] sm:px-[13px] border-[1px] border-[#494747] flex items-center justify-start gap-[17px] cursor-pointer hover:bg-[#303030] transition"
              >
                <p className="font-poppins font-medium text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[20px] leading-[18px] sm:leading-[20px] md:leading-[24px] 2xl:leading-[30px] text-[#FFFFFF] tracking-normal">
                  {caliber.caliber}
                </p>
              </div>
            ))
          ) : (
            <p className="font-poppins font-medium text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[20px] text-[#FFFFFF] text-center">
              No results found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AmmoSearch;
