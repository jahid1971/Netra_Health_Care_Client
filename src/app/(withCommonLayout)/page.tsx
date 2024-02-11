import HeroSection from "@/components/ui/homepage/heroSection/HeroSection";
import Specialist from "@/components/ui/homepage/specialist/Specialist";
import TopRatedDoctors from "@/components/ui/homepage/topRatedDoctors/TopRatedDoctors";
import WhyUs from "@/components/ui/homepage/whyUs/WhyUs";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Specialist />
            <TopRatedDoctors />
            <WhyUs />
        </>
    );
};

export default HomePage;
