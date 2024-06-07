import N_Modal from "@/components/modals/N_Modal";
import DoctorForm from "./DoctorForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal, selectModalData } from "@/redux/slices/modalSlice";
import { FieldValues } from "react-hook-form";
import { useEditDoctorMutation } from "@/redux/api/doctorsApi";
import { tryCatch } from "@/utils/tryCatch";
import { IDoctor } from "@/types/Doctors";
import { modifyPayload } from "@/utils/modifyPayload";

const EditDoctor = () => {
    const modalData = useAppSelector(selectModalData);
    const doctorInfo: Partial<IDoctor> = modalData?.data;
    const [editDoctor, { isLoading }] = useEditDoctorMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = (data: FieldValues) => {
        data.experience && (data.experience = Number(data.experience));
        data.apointmentFee && (data.apointmentFee = Number(data.apointmentFee));

        if (data?.doctorSpecialties) {
            data.specialties = data.doctorSpecialties.map(
                (item: any) => item.id
            );
        }

        const payload = modifyPayload(data);

        tryCatch(
            async () => await editDoctor({ data: payload, id: doctorInfo?.id }),
            "Updating Doctor",
            "Doctor Updated Successfully",
            () => dispatch(closeModal())
        );
    };
    return (
        <N_Modal fullScreen title="Edit Doctor" modalId="editDoctor">
            <DoctorForm
                handleSubmit={handleSubmit}
                defaultValue={doctorInfo}
                submitTitle="Edit"
                passwordField={false}
                isLoading={isLoading}
                onlyDirtyFields={true}
            />
        </N_Modal>
    );
};

export default EditDoctor;
