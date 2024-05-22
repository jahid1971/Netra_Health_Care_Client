import N_Form from "@/components/forms/N_Form";
import N_Modal from "@/components/modals/N_Modal";
import {
    useEditDoctorMutation,
 
} from "@/redux/api/doctorsApi";
import DoctorForm from "../../../admin/doctors/compopnent/DoctorForm";
import { IDoctor } from "@/types/Doctors";
import { tryCatch } from "@/utils/tryCatch";
import { useUpdateMyProfileMutation } from "@/redux/api/myProfileApi";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";

const ProfileUpdate = ({ doctorData }: { doctorData: IDoctor }) => {
   

    const [updateDoctorProfile] = useEditDoctorMutation();
    const dispatch = useAppDispatch();
    const excludedFields = [
        "email",
        "id",
        "role",
        "needPasswordChange",
        "status",
        "createdAt",
        "updatedAt",
        "isDeleted",
        "averageRating",
        "review",
        "profilePhoto",
        "registrationNumber",
        "schedules",
        "doctorSpecialties",
        "doctorId",
    ];

    const handleUpdate = (values: FieldValues) => {
        values.experience && (values.experience = Number(values.experience));
        values.apointmentFee &&
            (values.apointmentFee = Number(values.apointmentFee));

        const updateValues = Object.fromEntries(
            Object.entries(values).filter(([key]) => {
                return !excludedFields.includes(key);
            })
        );

        const payload = modifyPayload(updateValues);

        tryCatch(
            async () =>
                await updateDoctorProfile({
                    data: payload,
                    id: doctorData?.doctorId,
                }),
            "Updating Profile",
            "Profile Updated Successfully",
            () => dispatch(closeModal())
        );
    };

    return (
        <N_Modal
            fullScreen
            modalId="updateDoctorProfile"
            title="Update Profile"
        >
            <DoctorForm
                handleSubmit={handleUpdate}
                defaultValue={doctorData}
                submitTitle="Update"
                passwordField={false}
            />
        </N_Modal>
    );
};

export default ProfileUpdate;
