
import { ReactNode } from "react";

const CommonLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
     
       <div className="min-h-screen"> {children}</div>
     
    </div>
  );
};

export default CommonLayout;