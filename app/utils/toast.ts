import toast from "react-hot-toast";

const toastStyle = {
  border: "1px solid #333333",
  padding: "4px 6px",
  color: "#ffffff",
  borderRadius: "5px",
  background: "#1f0c01",
};

const iconTheme = {
  primary: "#f44a01",
  secondary: "#FFFAEE",
};

export function successToast(message: string, icon?: string): void {
  toast.success(message, {
    style: toastStyle,
    iconTheme,
    position: "top-right",
    duration: 3000,
    icon,
  });
}

export function errorToast(message: string, icon?: string): void {
  toast.error(message, {
    style: toastStyle,
    iconTheme,
    position: "top-right",
    duration: 4000,
    icon,
  });
}
