import Footer from "@/components/shared/navbar/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Navbar />
       <div className="min-h-screen"> {children}</div>
        <Footer />
    </div>
  );
};

export default CommonLayout;