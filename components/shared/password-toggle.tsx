import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

export type PasswordToggleProps = {
  className: string;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PasswordToggle({
  className,
  setShowPassword,
  showPassword,
}: PasswordToggleProps) {
  function handlePasswordToggle() {
    setShowPassword(!showPassword);
  }
  return (
    <div className={cn(className)} onClick={handlePasswordToggle}>
      {showPassword ? (
        <Eye size={20} className="text-green-700" />
      ) : (
        <EyeOff size={20} className="text-rich-black/60" />
      )}
    </div>
  );
}
