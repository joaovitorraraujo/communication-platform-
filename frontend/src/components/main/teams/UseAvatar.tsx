import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  classname?: string;
}

export const UseAvatar = ({ src, classname }: AvatarProps) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10  md:w-10")}>
      <AvatarImage src={src} />
      <AvatarFallback className={cn(classname)}>
        <div className="flex items-center justify-center bg-zinc-700 rounded-full h-7 w-7 md:h-10  md:w-10">
          {src}{" "}
        </div>
      </AvatarFallback>
    </Avatar>
  );
};
