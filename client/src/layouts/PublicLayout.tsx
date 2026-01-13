import { PropsWithChildren } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";

export const PublicLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Analytics />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
