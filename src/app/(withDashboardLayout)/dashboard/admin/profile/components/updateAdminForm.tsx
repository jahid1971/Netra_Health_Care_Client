import N_Modal from "@/components/modals/N_Modal";
import AdminForm from "../../admins/components/AdminForm";
import { IAdmin } from "@/types/Admin";
import { useUpdateAdminMutation } from "@/redux/api/adminApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { tryCatch } from "@/utils/tryCatch";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const UpdateAdminForm = ({ adminData }: { adminData: IAdmin }) => {
    const [updateAdmin] = useUpdateAdminMutation();

    const handleUpdateAdmin = async (data: FieldValues) => {
        if (Object.keys(data).length === 0)
            return toast.error("No changes made");

        const modifiedData = modifyPayload(data);

        tryCatch(
            async () =>
                await updateAdmin({
                    data: modifiedData,
                    id: adminData?.adminId,
                }),
            "Updating Admin Profile",
            "Admin Profile Updated Successfully"
        );
    };
    return (
        <N_Modal fullScreen modalId="updateAdmin" title="Update Admin Profile">
            <AdminForm
                defaultValue={adminData}
                onlyDirtyFields={true}
                submitTitle="Update"
                passwordField={false}
                handleSubmit={handleUpdateAdmin}
            />
        </N_Modal>
    );
};

export default UpdateAdminForm;
