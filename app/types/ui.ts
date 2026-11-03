import type React from "react";

// Component Props Types
export interface ButtonProps {
  btnTitle?: string;
  className?: string;
  img?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface InputProps {
  className?: string;
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  passwordToggle?: boolean;
  parentClass?: string;
  register?: ReturnType<typeof import("react-hook-form").useForm>["register"];
  name: string;
  errors?: Record<string, { message?: string }>;
}

export interface SelectProps {
  className?: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// Route Guard Props
export interface GuardProps {
  children: React.ReactNode;
}
