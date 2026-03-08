import wekitLogo from "@/assets/wekit-logo.jpg";

interface WeKitLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function WeKitLogo({ size = "md", className = "" }: WeKitLogoProps) {
  const sizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  return (
    <img
      src={wekitLogo}
      alt="WeKIT Logo"
      className={`${sizes[size]} rounded-lg object-contain ${className}`}
    />
  );
}
