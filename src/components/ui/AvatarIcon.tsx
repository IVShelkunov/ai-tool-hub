import { cn } from "cn";
import Image from "next/image";

interface AvatarIconProps {
  className?: string;
  url: string | null;
}

export const AvatarIcon = ({ className, url }: AvatarIconProps) => {
  return (
    <Image
      className={cn(" rounded-full object-cover", className)}
      width={128}
      height={128}
      alt="avatar"
      src={url || "/placeholder.png"}
      priority
    />
  );
};
