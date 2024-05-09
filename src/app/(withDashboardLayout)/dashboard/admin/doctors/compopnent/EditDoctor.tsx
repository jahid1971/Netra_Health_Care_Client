import N_Modal from "@/components/modals/N_Modal";
import DoctorForm from "./DoctorForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal, selectModalData } from "@/redux/slices/modalSlice";
import { FieldValues } from "react-hook-form";
import { useEditDoctorMutation } from "@/redux/api/doctorsApi";
import { tryCatch } from "@/utils/tryCatch";
import { IDoctor } from "@/types/Doctors";

const EditDoctor = () => {
    const doctorInfo: Partial<IDoctor> = useAppSelector(selectModalData) || {};
    const [editDoctor, { isLoading }] = useEditDoctorMutation();
    const dispatch = useAppDispatch();

    const defaultValue = {
        name: doctorInfo?.name,
        email: doctorInfo?.email,
        contactNumber: doctorInfo?.contactNumber,
        address: doctorInfo?.address,
        registrationNumber: doctorInfo?.registrationNumber,
        experience: doctorInfo?.experience,
        gender: doctorInfo?.gender,
        apointmentFee: doctorInfo?.apointmentFee,
        qualification: doctorInfo?.qualification,
        currentWorkingPlace: doctorInfo?.currentWorkingPlace,
        designation: doctorInfo?.designation,
    };

    const handleSubmit = (data: FieldValues) => {
        data.experience = Number(data.experience);
        data.apointmentFee = Number(data.apointmentFee);

        let { doctorSpecialties, ...updateData } = data;
        console.log(doctorSpecialties, "doctorSpecialties");
        updateData.specialties = doctorSpecialties?.map((item: any) => item);

        updateData = { id: doctorInfo?.id as string, data: updateData };


        tryCatch(
            async () => await editDoctor(updateData),
            "Updating Doctor",
            "Doctor Updated Successfully",
            () => dispatch(closeModal())
        );
    };
    return (
        <N_Modal fullScreen title="Edit Doctor" modalId="editDoctor">
            <DoctorForm
                handleSubmit={handleSubmit}
                defaultValue={defaultValue}
                submitTitle="Edit"
                passwordField={false}
                isLoading={isLoading}
            />
        </N_Modal>
    );
};

export default EditDoctor;
