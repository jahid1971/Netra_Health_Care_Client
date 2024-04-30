"use client";
import N_FileUploader from "@/components/forms/N_FileUploader";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import N_Select from "@/components/forms/N_Select";
import N_Modal from "@/components/modals/N_Modal";
import { Gender } from "@/constants/commmon";
import { useCreateDoctorMutation } from "@/redux/api/doctorsApi";
import { useCreateSpecialityMutation } from "@/redux/api/specialitiesApi";
import { TOpenState } from "@/types/common";
import { modifyPayload } from "@/utils/modifyPayload";
import tryCatch from "@/utils/tryCatch";
import { Button, Grid, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";
import DoctorForm from "./DoctorForm";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";

const CreateDoctor = ({ open, setOpen }: TOpenState) => {
    const [createDoctor] = useCreateDoctorMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: FieldValues) => {
        values.experience = Number(values.experience);
        values.apointmentFee = Number(values.apointmentFee);

        const password = values.password;
        delete values.password;
        const data = { doctor: values, password };
        const updateData = modifyPayload(data);
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
