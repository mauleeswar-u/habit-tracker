
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left flex items-center">
          Created with <Heart size={16} className="mx-1 text-red-500 fill-red-500" /> by Mauleeswar U & Nishanthini K
        </p>
      </div>
    </footer>
  );
}
