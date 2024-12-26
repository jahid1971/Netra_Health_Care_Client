import assets from "@/assets";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import N_Modal from "@/components/modals/N_Modal";
import SubmitButton from "@/components/ui/SubmitButton";
import { useUpdatePatientMutation } from "@/redux/api/patientApi";
import { useAppDispatch } from "@/redux/hooks";
import { closeModal } from "@/redux/slices/modalSlice";
import { IPatient } from "@/types/Patient";
import { modifyPayload } from "@/utils/modifyPayload";
import { tryCatch } from "@/utils/tryCatch";
import { updatePatiientSchema } from "@/utils/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const UpdatePatientProfile = ({ patientData }: { patientData: IPatient }) => {
    const dispatch = useAppDispatch();
    const [updatePatient] = useUpdatePatientMutation();

    const handleUpdate = (values: FieldValues) => {
        if (!values) return toast.error("No changes made");
        const payload = modifyPayload(values);

        tryCatch(
            async () =>
                await updatePatient({
                    data: payload,
                    id: patientData?.patientId,
                }),
            "Updating Profile",
            "Profile Updated Successfully",
            () => dispatch(closeModal())
        );
    };
    return (
        <N_Modal modalId="updatePatient" fullScreen>
            <Stack
                sx={{
                    alignItems: "center",
                }}
            >
                <Box
                    boxShadow={2}
                    maxWidth={900}
                    width={"100%"}
                    textAlign={"center"}
                    p={5}
                >
                    <Stack
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            mb: 5,
                        }}
                    >
                        <Image src={assets.svgs.logo} alt="logo" />

                        <Typography variant="h6" fontWeight={600}>
                            Update Profile
                        </Typography>
                    </Stack>

                    <N_Form
                        onSubmit={handleUpdate}
                        resolver={zodResolver(updatePatiientSchema)}
                        defaultValues={patientData}
                        onlyDirtyFields={true}
                        // error={error}
                    >
                        <Stack spacing={2} mt={2}>
                            <N_Input label="Name" name="name" />

                            <N_Input
                                label="Contact Number"
                                name="contactNumber"
                            />
                            <N_Input
                                label="Address"
                                size="small"
                                name="address"
                            />

                            <Stack
                                direction={{ xs: "column", md: "row" }}
                                spacing={{ xs: 2, md: 2 }}
                            ></Stack>
                        </Stack>

                        <SubmitButton sx={{ my: 2 }} label="UPDATE" />
                    </N_Form>
                </Box>
            </Stack>
        </N_Modal>
    );
};

export default UpdatePatientProfile;
