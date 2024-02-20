import N_FileUploader from "@/components/forms/N_FileUploader";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import N_Modal from "@/components/modals/N_Modal";
import { useCreateSpecialityMutation } from "@/redux/api/specialitiesApi";
import { TOpenState } from "@/types/common";
import { modifyPayload } from "@/utils/modifyPayload";
import tryCatch from "@/utils/tryCatch";
import { Button, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";

const CreateSpecialities = ({ open, setOpen }: TOpenState) => {
    const [createSpeciality] = useCreateSpecialityMutation();

    const handleSubmit = async (values: FieldValues) => {
        const data = modifyPayload(values);
        console.log(data, "data in create ")
        console.log(Object.entries(data), "data in create speciality")
        tryCatch(
            async () => await createSpeciality(data),
            "Creating speciality",
            "Speciality created successfully",
            () => setOpen?.(false)
        );
    };
    return (
        <N_Modal open={open} setOpen={setOpen} title="Create A New Specialty">
            <N_Form onSubmit={handleSubmit}>
                <Stack direction={"row"} spacing={2}>
                    <N_Input name="title" label="Title" sx={{ width: "55%" }} />
                    <N_FileUploader name="file" label="Upload icon" sx={{ width: "45%" }} />
                </Stack>
                <Button sx={{ mt: 2 }} type="submit">
                    Create
                </Button>
            </N_Form>
        </N_Modal>
    );
};

export default CreateSpecialities;
