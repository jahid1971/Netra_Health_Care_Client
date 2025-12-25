import HeroSection from "@/components/ui/homepage/heroSection/HeroSection";
import Specialties from "@/components/ui/homepage/specialities/Specialties";

import TopRatedDoctors from "@/components/ui/homepage/topRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/ui/homepage/whyUs/WhyUs";
import { getUserInfo, TUserInfo } from "@/services/actions/auth.services";

const HomePage = () => {
   
    return (
        <>
            <HeroSection />
            <Specialties />
            <TopRatedDoctors />
            <WhyUs />
        </>
    );
};

export default HomePage;
