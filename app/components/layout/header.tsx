import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { IoIosPower } from "react-icons/io";
import { LuUserRound, LuHeart } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "~/hooks/providers/AuthProvider";
import { successToast } from "~/utils/toast";
import { removeLocalStorage } from "~/utils/localStorage";
import { axiosPublic } from "~/lib/axios/axios.config";
import logo from "~/assets/logo.png";
import elips from "~/assets/Ellipse 13.png";
import BadgeImage from "~/assets/badge-image.svg";
import avatar from "~/assets/user.png";
import Button from "~/components/atoms/Button";

interface NavItem {
  path: string;
  name: string;
}

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [userPopUp, setUserPopUp] = useState(false);
  const { user, logout, profileData, setUser, setAuthToken } = useAuth();

  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const navlist: NavItem[] = [
    { path: "/", name: "home" },
    { path: "/ammo", name: "ammo" },
    { path: "/retailers", name: "retailers" },
    { path: "/blog", name: "blog" },
    { path: "/contact", name: "contact" },
    { path: "/faq", name: "FAQ" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setUserPopUp(false);
      }
    };

    if (userPopUp) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userPopUp]);

  const HandleLogout = async () => {
    try {
      setLogoutLoading(true);
      const res = await logout();
      if (res?.success === true) {
        setLogoutLoading(false);
        setUser(null);
        setAuthToken(null);
        removeLocalStorage("berg-user-response");
        removeLocalStorage("berg-user");
        removeLocalStorage("berg-token");
        navigate("/login");
        successToast("Logged out successfully");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const { data: profile } = useQuery({
    queryKey: ["profiledata"],
    queryFn: async () => {
      const response = await profileData();
      return response?.data;
    },
    enabled: !!user,
  });

  const { data } = useQuery({
    queryKey: ["app_logo"],
    queryFn: async () => {
      const res = await axiosPublic.get("/settings");
      return res?.data?.data || "AmmoBrowser";
    },
  });

  return (
    <>
      {logoutLoading && (
        <div className="bg-[#000000]/70 w-full h-full fixed top-0 left-0 z-[9999] flex items-center justify-center">
          <div className="text-animation lg:text-3xl text-lg xl:text-4xl font-medium text-gray-500">
            Loading...
          </div>
        </div>
      )}

      <div
        className={`fixed w-full z-[1001] top-0 right-0 transition-transform duration-300 ${
          isVisible ? "translate-y-0 pb-3 lg:pb-5" : "-translate-y-full !bg-transparent"
        } ${
          lastScrollY < 100
            ? "bg-[#0c0b0b00] transition-all"
            : "bg-[#0c0b0b83] backdrop-blur-lg border-b-[1.5px] border-b-[#27272a]"
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-5 md:px-4 lg:px-10 xl:px-16 pt-3 md:pt-4 lg:pt-6">
          <div className="flex items-center justify-between gap-2 md:gap-3 lg:gap-4">
            <div className="flex items-center gap-3 md:gap-4 lg:gap-8 xl:gap-14 min-w-0">
              <Link to="/" className="shrink-0">
                <img
                  src={data?.logo || logo}
                  onError={(e) => ((e.target as HTMLImageElement).src = logo)}
                  alt="logo"
                  className="w-12 sm:w-14 md:w-14 lg:w-20 shrink-0 object-contain"
                />
              </Link>
              <ul className="md:flex hidden items-center gap-2 md:gap-3.5 lg:gap-6 xl:gap-9 font-Poppins font-medium text-xs md:text-sm lg:text-base xl:text-lg text-[#d3d3d3] capitalize whitespace-nowrap">
                {navlist.map((list, index) => (
                  <NavLink
                    to={list.path}
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? "relative after:absolute after:w-full after:h-[2px] text-primaryWhite after:bg-orange after:left-0 after:-bottom-1"
                        : `hover:text-primaryWhite transition-all ${list.name === "FAQ" && "uppercase"}`
                    }
                  >
                    {list.name}
                  </NavLink>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 md:gap-2.5 lg:gap-4 shrink-0">
              {user ? (
                <div ref={profileRef} className="relative">
                  <div
                    onClick={() => setUserPopUp(!userPopUp)}
                    className="size-8 md:size-9 lg:size-14 overflow-hidden rounded-full cursor-pointer border-[1.5px] border-primaryWhite"
                  >
                    <img
                      src={profile?.image || avatar}
                      onError={(e) => ((e.target as HTMLImageElement).src = avatar)}
                      alt="picture"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className={`bg-footerBG font-Poppins text-primaryWhite absolute duration-300 transform transition-all bottom-[-170px] right-0 ${
                      userPopUp ? "-translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className="px-10 text-base inline-flex items-center gap-2 border-b-[1.5px] border-b-[#db4200] w-full hover:bg-[#F44A01] transition font-normal py-3"
                    >
                      <LuUserRound className="text-lg" /> Profile
                    </Link>
                    <Link
                      to="/wishlist"
                      className="px-10 text-base inline-flex items-center gap-2 border-b-[1.5px] border-b-[#db4200] w-full hover:bg-[#F44A01] transition font-normal py-3"
                    >
                      <LuHeart className="text-lg" /> Wishlist
                    </Link>
                    <p
                      onClick={HandleLogout}
                      className="px-10 text-base flex items-center gap-2 font-normal py-3 text-nowrap hover:bg-[#F44A01] cursor-pointer"
                    >
                      <TbLogout className="text-lg" /> Log out
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`hidden sm:inline-flex wishlist-button group py-1.5 md:py-2 lg:py-2.5 px-2.5 md:px-3.5 lg:px-6 xl:px-8 font-Poppins font-medium gap-1.5 md:gap-2 lg:gap-2.5 cursor-pointer text-white transition border-[1.5px] border-orange text-xs md:text-sm lg:text-base xl:text-lg relative bg-[#00000066] items-center justify-center hover:text-primaryWhite active:scale-95 whitespace-nowrap shrink-0 ${
                      location.pathname === "/wishlist" ? "wishlist-button-active" : ""
                    }`}
                  >
                    <img src={BadgeImage} alt="badge" className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-6 lg:h-6 shrink-0" />
                    Wishlist
                  </Link>

                  <Link to="/login" className="shrink-0">
                    <Button className="hidden sm:inline-flex items-center justify-center !py-1.5 md:!py-2 lg:!py-2.5 !px-3 md:!px-4 lg:!px-8 xl:!px-10 !text-xs md:!text-sm lg:!text-base xl:!text-lg whitespace-nowrap">
                      Log In
                    </Button>
                  </Link>
                </>
              )}

              <button onClick={() => setOpen(true)} className="text-primaryWhite md:hidden font-Poppins uppercase">
                Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`w-full h-full fixed md:hidden top-0 font-Poppins left-0 bg-footerBG z-[1001] duration-300 transition-all ${
          open ? "-translate-x-[0] opacity-100" : "-translate-x-[100%] opacity-0"
        }`}
      >
        <img src={elips} alt="elips" className="fixed top-0 left-0 z-40" />
        <h5 onClick={() => setOpen(false)} className="text-primaryWhite absolute z-[555] top-8 right-5 cursor-pointer underline uppercase">
          Close
        </h5>
        <ul className="flex relative z-50 h-full flex-col justify-center items-center gap-6 font-Poppins font-normal text-lg text-primaryWhite capitalize">
          {navlist.map((list, index) => (
            <NavLink
              onClick={() => setOpen(false)}
              to={list.path}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "relative after:absolute after:w-full after:h-[2px] text-primaryWhite after:bg-orange after:left-0 after:-bottom-1"
                  : `hover:text-primaryWhite transition-all ${list.name === "FAQ" && "uppercase"}`
              }
            >
              {list.name}
            </NavLink>
          ))}
          {user ? (
            <p onClick={HandleLogout} className="px-10 text-base flex items-center gap-2 font-normal py-3 text-nowrap text-primaryWhite cursor-pointer">
              <TbLogout className="text-lg" /> Log out
            </p>
          ) : (
            <>
              <NavLink onClick={() => setOpen(false)} to="/wishlist" className="hover:text-primaryWhite transition-all">
                Wishlist
              </NavLink>
              <Link to="/login" className="text-orange sm:hidden flex gap-1 items-center justify-center text-center w-full mt-8 text-lg cursor-pointer">
                Log In <IoIosPower className="text-xl mt-[2px]" />
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Header;
