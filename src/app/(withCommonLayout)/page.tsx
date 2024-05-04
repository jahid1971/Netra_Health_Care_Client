import HeroSection from "@/components/ui/homepage/heroSection/HeroSection";
import Specialties from "@/components/ui/homepage/specialities/Specialties";

import TopRatedDoctors from "@/components/ui/homepage/topRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/ui/homepage/whyUs/WhyUs";

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
