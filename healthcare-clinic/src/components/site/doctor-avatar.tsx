import Image from "next/image";
import { cn } from "@/lib/utils";

type DoctorAvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

export function DoctorAvatar({ src, alt, className }: DoctorAvatarProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[1.75rem] bg-teal-100", className)}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
    </div>
  );
}
