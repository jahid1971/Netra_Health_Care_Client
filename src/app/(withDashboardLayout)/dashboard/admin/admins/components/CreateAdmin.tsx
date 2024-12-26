"use client";

import N_Modal from "@/components/modals/N_Modal";
import { useCraeteAdminMutation } from "@/redux/api/adminApi";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";
import { tryCatch } from "@/utils/tryCatch";
import AdminForm from "./AdminForm";

const CreateAdmin = () => {
    const [createAdmin] = useCraeteAdminMutation();
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: any) => {
        tryCatch(
            async () => await createAdmin(values),
            "Creating Admin",
            "Admin Created Successfully",
            () => dispatch(closeModal())
        );
    };

    return (
        <N_Modal fullScreen title="Create New Admin" modalId="createAdmin">
            <AdminForm handleSubmit={handleSubmit} submitTitle="Create" />
        </N_Modal>
    );
};

export default CreateAdmin;
