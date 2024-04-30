import { baseUrl } from "@/constants/commmon";

const doctorPage = async () => {
    const res = await fetch(`${baseUrl}/doctor`);
    const { data: doctors } = await res.json();

    console.log(doctors, "doctorsssssssssssssssssssssssssssssssssssssss");

    return <div></div>;
};

export default doctorPage;
