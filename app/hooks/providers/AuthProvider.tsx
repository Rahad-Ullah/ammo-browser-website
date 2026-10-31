import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { handleApiError } from "~/utils/errorHandler";
import { axiosPublic, axiosPrivate } from "~/lib/axios/axios.config";
import { getLocalStorage, setLocalStorage } from "~/utils/localStorage";
import type {
  User,
  AuthContextType,
  SelectValue,
  ApiResponse,
  WishlistStoreData,
  LoginWithOtpInput,
  VerifyOtpInput,
  ContactFormInput,
  SubscribeInput,
  ReviewInput,
  PriceAlertInput,
  ProfileUpdateInput,
} from "~/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refetchRating, setrefetchRating] = useState(false);
  const token = getLocalStorage<string>("berg-user-response");

  const [selectValue, setSelectValue] = useState<SelectValue>({
    key_feature_id: "",
    brand: "",
    casing: "",
    shell_length: "",
    shot_size: "",
    num_of_rounds: "",
    shipping_review: "",
    retailer_review: "",
    price_sort: "",
    grains: "",
    search: "",
  });

  useEffect(() => {
    const storedUser = getLocalStorage<User>("berg-user");
    const storedToken = getLocalStorage<string>("berg-token");

    if (storedUser && storedToken) {
      setUser(storedUser as User);
      setAuthToken(storedToken as string);
    }
  }, []);

  useEffect(() => {
    const handleForceLogout = () => {
      setUser(null);
      setAuthToken(null);
    };
    window.addEventListener("auth:logout", handleForceLogout);
    return () => window.removeEventListener("auth:logout", handleForceLogout);
  }, []);

  useEffect(() => {
    if (token) {
      axiosPrivate.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, [token, user]);

  const axiosHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await axios.get<User>(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const userData = response.data;

      const res = await axiosPublic.post<{ access_token: string }>("/socialLogin", {
        provider: "google",
        token: accessToken,
      });

      const backendToken = res?.data?.access_token;
      setLocalStorage("berg-token", accessToken);
      setLocalStorage("berg-user", userData);
      setLocalStorage("berg-user-response", backendToken);

      setAuthToken(backendToken);
      setUser(userData);
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await fetchUserData(tokenResponse.access_token);
    },
    onError: (err) => {
      handleApiError(err as Parameters<typeof handleApiError>[0]);
    },
  });

  const logout = async (): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>("/logout", {}, {
      headers: {
        ...axiosHeaders,
      },
    });
    return data;
  };

  const loginWithOtp = async (inputData: LoginWithOtpInput): Promise<ApiResponse> => {
    const { data } = await axiosPublic.post<ApiResponse>("/send-otp", inputData);
    return data;
  };

  const verifyOtp = async (inputData: VerifyOtpInput): Promise<ApiResponse> => {
    const { data } = await axiosPublic.post<ApiResponse & { data: User; access_token: string }>("/verify-otp", inputData);
    setUser(data?.data);
    setAuthToken(data?.access_token);
    setLocalStorage("berg-user-response", data?.access_token);
    return data;
  };

  const contactList = async (inputData: ContactFormInput): Promise<ApiResponse> => {
    const { data } = await axiosPublic.post<ApiResponse>("/contact/store", inputData);
    return data;
  };

  const subscribe = async (inputData: SubscribeInput): Promise<ApiResponse> => {
    const { data } = await axiosPublic.post<ApiResponse>("/subscribe/store", inputData);
    return data;
  };

  const ProductReview = async (inputData: ReviewInput): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>("/product/review", inputData, {
      headers: {
        ...axiosHeaders,
      },
    });
    return data;
  };

  const ShipingReview = async (inputData: ReviewInput): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>("/shipping/review", inputData, {
      headers: {
        ...axiosHeaders,
      },
    });
    return data;
  };

  const profileData = async (): Promise<ApiResponse<User>> => {
   try {
      const { data } = await axiosPrivate.get<ApiResponse<User>>("/profile", {
        headers: {
          ...axiosHeaders,
        },
      });
      return data;
    } catch (error) {
      handleApiError(error as Parameters<typeof handleApiError>[0]);
      return { success: false, message: "Failed to fetch profile data", data: null as any };
    }
  };

  const profileUpdate = async (payload: ProfileUpdateInput | FormData): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>("/profile/update", payload, {
      headers: { "Content-Type": "multipart/form-data", ...axiosHeaders },
    });
    return data;
  };

  const profileImgUpdate = async (payload: FormData): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>("/profile/image/update", payload, {
      headers: { "Content-Type": "multipart/form-data", ...axiosHeaders },
    });
    return data;
  };

  const productRating = async (payload: ReviewInput): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>("/product/rating", payload, {
      headers: { ...axiosHeaders },
    });
    return data;
  };

  const shipingRating = async (payload: ReviewInput): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>("/shipping/rating", payload, {
      headers: { ...axiosHeaders },
    });
    return data;
  };

  const setPriceAlert = async (payload: PriceAlertInput): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>("/price-alert/store", payload, {
      headers: { ...axiosHeaders },
    });
    return data;
  };

  const alertStatus = async (id: string): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>(`/price-alert/status/${id}`, {}, {
      headers: { ...axiosHeaders },
    });
    return data;
  };

  const getPriceAlert = async (payload: { product_id: string }): Promise<ApiResponse> => {
    const { data } = await axiosPrivate.post<ApiResponse>(`/product/price-alert`, payload, {
      headers: { ...axiosHeaders },
    });
    return data;
  };

  const addToWishlist = async (product_url: string, quantity?: string): Promise<ApiResponse<WishlistStoreData>> => {
    const formData = new FormData();
    formData.append("product_url", product_url);
    formData.append("quantity", quantity || "1");
    const { data } = await axiosPrivate.post<ApiResponse<WishlistStoreData>>("/wishlist/store", formData, {
      headers: { "Content-Type": "multipart/form-data", ...axiosHeaders },
    });
    return data;
  };

  const removeFromWishlist = async (product_url: string): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("product_url", product_url);
    const { data } = await axiosPrivate.post<ApiResponse>("/wishlist/remove", formData, {
      headers: { ...axiosHeaders, "Content-Type": undefined },
    });
    return data;
  };

  const getWishlistUrls = async (): Promise<string[]> => {
    const { data } = await axiosPrivate.get<ApiResponse<string[]>>("/wishlist/urls", {
      headers: { ...axiosHeaders },
    });
    return data?.data || [];
  };

  return (
    <AuthContext.Provider
      value={{
        googleLogin,
        user,
        profileImgUpdate,
        authToken,
        setAuthToken,
        loginWithOtp,
        verifyOtp,
        contactList,
        subscribe,
        ProductReview,
        ShipingReview,
        profileData,
        profileUpdate,
        logout,
        productRating,
        setrefetchRating,
        refetchRating,
        shipingRating,
        setSelectValue,
        selectValue,
        setPriceAlert,
        alertStatus,
        setUser,
        getPriceAlert,
        addToWishlist,
        removeFromWishlist,
        getWishlistUrls,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
