"use client";

import N_Modal from "@/components/modals/N_Modal";

import { modifyPayload } from "@/utils/modifyPayload";
import tryCatch from "@/utils/tryCatch";

import { FieldValues } from "react-hook-form";

import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";
import { useCraeteAdminMutation } from "@/redux/api/adminApi";
import AdminForm from "./AdminForm";

const CreateAdmin = () => {
    const [createAdmin] = useCraeteAdminMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: FieldValues) => {
   
        const updateData = modifyPayload(values);
        tryCatch(
            async () => await createAdmin(updateData),
            "Creating Admin",
            "Admin created successfully",
            () => dispatch(closeModal())
        );
    };
    return (
        <N_Modal fullScreen title="Create  New Admin" modalId="createAdmin">
            <AdminForm handleSubmit={handleSubmit} submitTitle="Create" />
        </N_Modal>
    );
};

export default CreateAdmin;
