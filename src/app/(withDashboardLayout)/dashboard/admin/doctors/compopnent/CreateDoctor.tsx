"use client";

import N_Modal from "@/components/modals/N_Modal";
import { useCreateDoctorMutation } from "@/redux/api/doctorsApi";
import { modifyPayload } from "@/utils/modifyPayload";
import tryCatch from "@/utils/tryCatch";
import { FieldValues } from "react-hook-form";
import DoctorForm from "./DoctorForm";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";

const CreateDoctor = () => {
    const [createDoctor] = useCreateDoctorMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: FieldValues) => {
        values.experience = Number(values.experience);
        values.apointmentFee = Number(values.apointmentFee);


        const updateData = modifyPayload(values);
        tryCatch(
            async () => await createDoctor(updateData),
            "Creating Doctor",
            "Doctor created successfully",
            () => dispatch(closeModal())
        );
    };
    return (
        <N_Modal fullScreen title="Create  New Doctor" modalId="createDoctor">
            <DoctorForm handleSubmit={handleSubmit} submitTitle="Create" />
        </N_Modal>
    );
};

export default CreateDoctor;
