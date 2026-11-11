import {
  useEffect,
  useState,
  useRef,
  useMemo,
  type MutableRefObject,
} from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { TbCategoryFilled } from "react-icons/tb";
import { GrFormFilter } from "react-icons/gr";
import { LuChevronDown } from "react-icons/lu";
import { GoSearch } from "react-icons/go";
import { axiosPublic } from "~/lib/axios/axios.config";
import { useAppDispatch, useAppSelector } from "~/redux/store/hooks";
import {
  addProductFilterData,
  setIsProductApiCall,
} from "~/redux/features/productSlice";
import CustomSelect from "~/components/atoms/CustomSelect";
import type { ProductFilterData } from "~/types";
import ZipCode from "../../../assets/zip.svg";
import CaliberSvg from "../../svg/CaliberSvg";
import BrandSvg from "../../svg/BrandSvg";
import CasingSvg from "../../svg/CasingSvg";
import GrainSvg from "../../svg/GrainSvg";
import RoundSvg from "../../svg/RoundSvg";
import ShippingSvg from "../../svg/ShippingSvg";
import PriceSvg from "../../svg/PriceSvg";

import { caliberMatchesSearch, caliberToSlug } from "~/utils";

interface AmmoFilterProps {
  setProductQueryData: React.Dispatch<React.SetStateAction<ProductFilterData>>;
  apiLoad: MutableRefObject<boolean>;
  onSelectCaliber?: (caliber: Caliber | "default") => void;
}

interface Category {
  id: string;
  category_name: string;
}

interface Caliber {
  id: string;
  caliber: string;
}

const AmmoFilter = ({
  setProductQueryData,
  apiLoad,
  onSelectCaliber,
}: AmmoFilterProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productFilterData } = useAppSelector((state) => state.productSlice);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const caliberRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [categorySelect, setCategorySelect] = useState("Select category");
  const [selectedCaliber, setSelectedCaliber] = useState<string | Caliber>(
    "Select caliber",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [finalCaliber, setFinalCaliber] = useState<Caliber[]>([]);

  // New filter states
  const [selectedBrand, setSelectedBrand] = useState("default");
  const [selectedCasing, setSelectedCasing] = useState("default");
  const [selectedShellLength, setSelectedShellLength] = useState("default");
  const [selectedGrains, setSelectedGrains] = useState("default");
  const [selectedShotSize, setSelectedShotSize] = useState("default");
  const [selectedNumRounds, setSelectedNumRounds] = useState("default");
  const [selectedShippingReview, setSelectedShippingReview] =
    useState("default");
  const [selectedRetailerReview, setSelectedRetailerReview] =
    useState("default");
  const [selectedPriceSort, setSelectedPriceSort] = useState("default");
  const [zipCode, setZipCode] = useState<string>(
    () =>
      (typeof window !== "undefined"
        ? localStorage.getItem("destination_zip")
        : "") || "",
  );

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
    if (value) {
      localStorage.setItem("destination_zip", value);
    } else {
      localStorage.removeItem("destination_zip");
    }
  };

  // Static filter options
  const NumberOfRounds = ["default", "1-50", "51-250", "251-500", "501+"];
  const ShippingReview = ["default", "4"];
  const RetailerReview = ["default", "4"];
  const PriceOptions = ["default", "High-low", "Low-high"];

  const { data: categoryData, isLoading: categoryLoading } = useQuery<
    Category[]
  >({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await axiosPublic.get("/get-categories");
      return response?.data?.data;
    },
  });

  const { data: caliberData, isLoading: caliberLoading } = useQuery<Caliber[]>({
    queryKey: ["caliberData", categoryId],
    queryFn: async () => {
      const response = await axiosPublic.get(
        categoryId ? `/calibers/${categoryId}` : "/calibers",
      );
      return response?.data?.data;
    },
    staleTime: 10 * 1000,
  });

  // Fetch brand data
  const { data: brandData } = useQuery<string[]>({
    queryKey: ["brandData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/get-brands");
      return response?.data?.data;
    },
  });

  // Fetch casing data
  const { data: casingData } = useQuery<string[]>({
    queryKey: ["casingData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/get-casings");
      return response?.data?.data;
    },
  });

  // Fetch grains data
  const { data: grainsData } = useQuery<string[]>({
    queryKey: ["grainsData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/get-grains");
      return response?.data?.data;
    },
  });

  // Fetch shell length data
  const { data: lengthData } = useQuery<string[]>({
    queryKey: ["lengthData"],
    queryFn: async () => {
      const response = await axiosPublic.get("/get-shell-lengths");
      return response?.data?.data;
    },
  });

  // Fetch shot size data
  const { data: shotSizeData } = useQuery<string[]>({
    queryKey: ["shotSize"],
    queryFn: async () => {
      const response = await axiosPublic.get("/get-shot-sizes");
      return response?.data?.data;
    },
  });

  const updateBrandData = ["default", ...(brandData || [])];
  const updateCasingData = ["default", ...(casingData || [])];
  const updateGrainsData = ["default", ...(grainsData || [])];
  const updateLengthData = ["default", ...(lengthData || [])];
  const updateShotData = ["default", ...(shotSizeData || [])];

  const searchCaliber = useMemo(() => {
    return caliberData?.filter((item) => caliberMatchesSearch(item?.caliber, searchInput));
  }, [caliberData, searchInput]);

  useEffect(() => {
    if (openFilter) {
      document.body.classList.add("overflow-hidden", "sm:overflow-auto");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openFilter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside2 = (event: MouseEvent) => {
      if (
        caliberRef.current &&
        !caliberRef.current.contains(event.target as Node)
      ) {
        setIsOpen2(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside2);
    return () => document.removeEventListener("mousedown", handleClickOutside2);
  }, []);

  useEffect(() => {
    if (searchCaliber && searchCaliber.length > 0) {
      setFinalCaliber(searchCaliber);
    } else if (searchInput && searchCaliber && searchCaliber.length < 1) {
      setFinalCaliber(searchCaliber);
    } else if (caliberData) {
      setFinalCaliber(caliberData);
    }
  }, [caliberData, searchInput]);

  useEffect(() => {
    if (productFilterData?.key_feature_id && caliberData) {
      const kfId =
        typeof productFilterData.key_feature_id === "object" &&
        productFilterData.key_feature_id !== null
          ? productFilterData.key_feature_id.id
          : productFilterData.key_feature_id;
      const found = caliberData.find((c) => c.id === kfId);
      if (found) {
        setSelectedCaliber(found);
      }
    } else if (!productFilterData?.key_feature_id) {
      setSelectedCaliber("Select caliber");
    }
  }, [productFilterData?.key_feature_id, caliberData]);

  const handleCategorySelected = (option: Category | string) => {
    if (typeof option === "object") {
      // Clear caliber when changing category
      if (productFilterData?.key_feature_id) {
        dispatch(
          addProductFilterData({
            ...productFilterData,
            key_feature_id: null,
            category: option,
          } as ProductFilterData),
        );
        setSelectedCaliber("Select caliber");
      } else {
        dispatch(
          addProductFilterData({
            ...productFilterData,
            category: option,
          } as ProductFilterData),
        );
      }

      // If switching TO shotgun, clear bullet-specific filters
      if (option.category_name.toLowerCase() === "shotgun") {
        dispatch(
          addProductFilterData({
            ...productFilterData,
            casing: undefined,
            grains: undefined,
            category: option,
          } as ProductFilterData),
        );
        setSelectedCasing("default");
        setSelectedGrains("default");
      }

      // If switching FROM shotgun, clear shotgun-specific filters
      if (option.category_name.toLowerCase() !== "shotgun") {
        dispatch(
          addProductFilterData({
            ...productFilterData,
            shell_length: undefined,
            shot_size: undefined,
            category: option,
          } as ProductFilterData),
        );
        setSelectedShellLength("default");
        setSelectedShotSize("default");
      }

      setCategorySelect(option.category_name);
      setCategoryId(option.id);
      dispatch(setIsProductApiCall());
    }
    setIsOpen(false);
    apiLoad.current = true;
  };

  const handleCaliberSelect = (option: Caliber | string) => {
    setIsOpen2(false);

    if (typeof option === "object") {
      if (onSelectCaliber) {
        onSelectCaliber(option);
      } else {
        const slug = caliberToSlug(option.caliber);
        navigate(`/ammo/${slug}`);
      }
    } else {
      if (onSelectCaliber) {
        onSelectCaliber("default");
      } else {
        dispatch(setIsProductApiCall());
        setSelectedCaliber("Select caliber");
        dispatch(
          addProductFilterData({
            ...productFilterData,
            key_feature_id: null,
          } as ProductFilterData),
        );
        setProductQueryData((prev) => {
          const { key_feature_id, ...rest } = prev;
          return rest;
        });
        apiLoad.current = true;
      }
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    dispatch(setIsProductApiCall());
    const filterUpdate = {
      ...productFilterData,
      [name]: value !== "default" ? value : undefined,
    };
    dispatch(addProductFilterData(filterUpdate as ProductFilterData));

    setProductQueryData((prev) => {
      if (value !== "default") {
        return { ...prev, [name]: value } as ProductFilterData;
      } else {
        const updated = { ...prev };
        delete (updated as any)[name];
        return updated;
      }
    });
    apiLoad.current = true;
  };

  const renderSelectFilter = (
    label: string,
    value: string,
    setValue: (value: string) => void,
    options: string[],
    name: string,
    editDataKey?: keyof ProductFilterData,
    Icon?: React.ComponentType<{ className?: string }>,
  ) => (
    <div className="w-full font-Inter" key={name}>
      <h5 className="flex items-center gap-2 text-primaryWhite font-medium text-base xl:text-xl pb-2">
        {Icon && <Icon />} {label}
      </h5>
      <CustomSelect
        defaultLabel="Default"
        options={options}
        value={value}
        onChange={(selectedValue) => {
          setValue(selectedValue);
          handleFilterChange(name, selectedValue);
        }}
        isEdit={true}
        isEditData={
          editDataKey ? (productFilterData?.[editDataKey] as string) : undefined
        }
        className="bg-secondaryBg"
      />
    </div>
  );

  return (
    <div className="bg-mainBG p-3 font-Inter h-full w-full relative">
      {openFilter && (
        <div
          onClick={() => setOpenFilter(false)}
          className="bg-[#1b1b1b70] sm:hidden backdrop-blur-md w-full h-full fixed top-0 left-0 z-[1200] sm:z-[666]"
        />
      )}
      <div
        onClick={() => setOpenFilter(true)}
        className="bg-secondaryBg sm:hidden text-primaryWhite items-center font-Roboto text-sm gap-1 py-[7px] px-2 flex cursor-pointer hover:bg-[#313131] transition"
      >
        <GrFormFilter className="text-xl" /> Filter
      </div>

      <div
        className={`bg-secondaryBg sm:bg-transparent z-[1201] sm:z-[667] fixed sm:relative duration-300 w-[70%] sm:w-full py-10 sm:py-0 h-full sm:h-auto overflow-auto px-4 sm:px-0 ${
          openFilter ? "top-0 right-0" : "top-0 right-[-100%] sm:right-0"
        }`}
      >
        <h5 className="font-semibold text-primaryWhite text-lg sm:text-xl xl:text-2xl leading-snug pb-4 xl:pb-5">
          Filter Inventory
        </h5>

        <div
          aria-label="all-filter-features"
          className="flex flex-col gap-3 xl:gap-4"
        >
          <div aria-label="zip-code">
            <h5 className="flex items-center gap-2 text-primaryWhite font-medium text-base xl:text-xl pb-2">
              <img
                src={ZipCode}
                alt="zip-code"
                className="min-w-[16px] max-w-[16px] h-[16px] xl:min-w-[20px] xl:max-w-[20px] xl:h-[20px]"
              />{" "}
              Zip
            </h5>

            <div className=" w-full bg-secondaryBg font-Inter">
              <input
                type="text"
                value={zipCode}
                onChange={handleZipCodeChange}
                className="w-full text-primaryWhite capitalize font-normal text-sm transition flex items-center justify-between px-4 py-2 bg-[#151515] sm:bg-[#202020] placeholder:text-[#817D81] text-white"
                placeholder="Enter Code"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 xl:gap-4">
            {/* Category Filter */}
            <div>
              <h5 className="flex items-center gap-2 text-primaryWhite font-medium text-base xl:text-xl pb-2">
                <TbCategoryFilled /> Category
              </h5>
              <div
                ref={dropdownRef}
                className="w-full bg-secondaryBg font-Inter"
              >
                <button
                  className="w-full text-primaryWhite capitalize font-normal text-sm hover:bg-[#303030] transition flex items-center justify-between px-4 py-2"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="min-w-0 flex-1 text-start text-nowrap overflow-hidden text-ellipsis">
                    {categorySelect || "default"}
                  </span>
                  <LuChevronDown
                    className={`h-5 w-5 text-gray-500 transition ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                <ul
                  className={`w-full bg-secondaryBg duration-300 overflow-auto transition-all text-thirdColor z-10 ${
                    isOpen ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  {categoryLoading ? (
                    <div className="py-4 text-center">Please wait...</div>
                  ) : categoryData && categoryData.length > 0 ? (
                    <>
                      <li
                        className="px-4 py-2 capitalize cursor-pointer text-xs font-normal hover:bg-orange hover:text-primaryWhite transition"
                        onClick={() => handleCategorySelected("default")}
                      >
                        default
                      </li>
                      {categoryData.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 capitalize cursor-pointer text-xs font-normal hover:bg-orange hover:text-primaryWhite transition"
                          onClick={() => handleCategorySelected(option)}
                        >
                          {option.category_name}
                        </li>
                      ))}
                    </>
                  ) : (
                    <div className="py-4 text-center">No data found</div>
                  )}
                </ul>
              </div>
            </div>

            {/* Caliber Filter */}
            <div>
              <h5 className="flex items-center gap-2 text-primaryWhite font-medium text-base xl:text-xl pb-2">
                <CaliberSvg /> Caliber
              </h5>
              <div
                ref={caliberRef}
                className="w-full bg-secondaryBg font-Inter"
              >
                <button
                  className="w-full text-primaryWhite capitalize font-normal text-sm hover:bg-[#303030] transition flex items-center justify-between px-4 py-2"
                  onClick={() => setIsOpen2(!isOpen2)}
                >
                  <span className="min-w-0 flex-1 text-start text-nowrap overflow-hidden text-ellipsis">
                    {typeof selectedCaliber === "object"
                      ? selectedCaliber.caliber
                      : selectedCaliber}
                  </span>
                  <LuChevronDown
                    className={`h-5 w-5 text-gray-500 transition ${isOpen2 ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                <ul
                  className={`w-full bg-secondaryBg duration-300 transition-all text-thirdColor overflow-auto h-[250px] z-10 ${
                    isOpen2 ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <div className="sticky top-0 left-0">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search Caliber"
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-[#222222] pl-8 border-[1px] lowercase border-[#3E3E3E] text-xs py-2 placeholder:font-Poppins placeholder:text-xs placeholder:text-thirdColor placeholder:font-light"
                      />
                      <GoSearch className="absolute top-[50%] -translate-y-[50%] left-3" />
                    </div>
                  </div>
                  {caliberLoading ? (
                    <div className="py-4 text-center text-sm">
                      Please wait...
                    </div>
                  ) : finalCaliber && finalCaliber.length > 0 ? (
                    <>
                      <li
                        className="px-4 py-2 capitalize cursor-pointer text-xs font-normal hover:bg-orange hover:text-primaryWhite transition"
                        onClick={() => handleCaliberSelect("default")}
                      >
                        default
                      </li>
                      {finalCaliber.map((option, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 capitalize cursor-pointer text-xs font-normal hover:bg-orange hover:text-primaryWhite transition"
                          onClick={() => handleCaliberSelect(option)}
                        >
                          {option.caliber}
                        </li>
                      ))}
                    </>
                  ) : (
                    <div className="py-4 text-center text-sm">
                      No data found
                    </div>
                  )}
                </ul>
              </div>
            </div>

            {/* Price Sort Filter */}
            {renderSelectFilter(
              "Price",
              selectedPriceSort,
              setSelectedPriceSort,
              PriceOptions,
              "price_sort",
              "price_sort",
              PriceSvg,
            )}

            {/* Brand Filter */}
            {renderSelectFilter(
              "Brand",
              selectedBrand,
              setSelectedBrand,
              updateBrandData,
              "brand",
              "brand",
              BrandSvg,
            )}

            {/* Conditional Shotgun/Rifle Filters */}
            {categorySelect?.toLowerCase() === "shotgun" ? (
              <>
                {/* Shell Length Filter */}
                {renderSelectFilter(
                  "Shell Length",
                  selectedShellLength,
                  setSelectedShellLength,
                  updateLengthData,
                  "shell_length",
                  "shell_length",
                  CaliberSvg,
                )}

                {/* Shot Size Filter */}
                {renderSelectFilter(
                  "Shot Size",
                  selectedShotSize,
                  setSelectedShotSize,
                  updateShotData,
                  "shot_size",
                  "shot_size",
                  RoundSvg,
                )}
              </>
            ) : (
              <>
                {/* Casing Filter */}
                {renderSelectFilter(
                  "Casing",
                  selectedCasing,
                  setSelectedCasing,
                  updateCasingData,
                  "casing",
                  "casing",
                  CasingSvg,
                )}

                {/* Grain Filter */}
                {renderSelectFilter(
                  "Grain",
                  selectedGrains,
                  setSelectedGrains,
                  updateGrainsData,
                  "grains",
                  "grains",
                  GrainSvg,
                )}
              </>
            )}

            {/* Number of Rounds Filter */}
            {renderSelectFilter(
              "Number of Rounds",
              selectedNumRounds,
              setSelectedNumRounds,
              NumberOfRounds,
              "num_of_rounds",
              "num_of_rounds",
              RoundSvg,
            )}

            {/* Shipping Review Filter */}
            {/* {renderSelectFilter("Shipping Review", selectedShippingReview, setSelectedShippingReview, ShippingReview, "shipping_review", "shipping_review", ShippingSvg)} */}

            {/* Retailer Review Filter */}
            {renderSelectFilter(
              "Retailer Review",
              selectedRetailerReview,
              setSelectedRetailerReview,
              RetailerReview,
              "retailer_review",
              "retailer_review",
              ShippingSvg,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmmoFilter;
