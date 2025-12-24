"use client";
import N_Form from "@/components/forms/N_Form";
import N_Input from "@/components/forms/N_Input";
import { Box, Button, Stack, Typography } from "@mui/material";

import { useState } from "react";
import { grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useFormContext } from "react-hook-form";
import { TAppointment } from "@/types/Appointment";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import N_Modal from "@/components/modals/N_Modal";
import PrescriptionView from "./PrescriptionView";
import { useGetMyProfileQuery } from "@/redux/api/myProfileApi";
import { useCreatePrescriptionMutation } from "@/redux/api/prescriptionApi";
import { tryCatch } from "@/utils/tryCatch";
import DashedLine from "../../DashedLine";
import SubmitButton from "../../SubmitButton";
import { TPrescription } from "@/types/Prescription";

const MedicineFields = ({
    item,
    onRemove,
}: {
    item: number;
    onRemove: () => void;
}) => {
    const { unregister } = useFormContext();

    const handleRemove = () => {
        if (item === 1) return;
        const medicineKey = `medicine${item}`;
        unregister(`${medicineKey}.name`);
        unregister(`${medicineKey}.dosage`);
        unregister(`${medicineKey}.frequency`);
        unregister(`${medicineKey}.duration`);
        unregister(`${medicineKey}.instruction`);
        onRemove();
    };

    return (
        <Box>
            <Stack spacing={2}>
                <N_Input label="Medicine Name" name={`medicine${item}.name`} />
                <N_Input label="Dosage" name={`medicine${item}.dosage`} />
                <N_Input label="Frequency" name={`medicine${item}.frequency`} />
                <N_Input label="Duration" name={`medicine${item}.duration`} />
                <N_Input
                    label="Instruction"
                    name={`medicine${item}.instruction`}
                />
            </Stack>
            {item > 1 && (
                <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button
                        onClick={handleRemove}
                        size="small"
                        variant="text"
                        startIcon={<RemoveIcon />}
                    >
                        Remove
                    </Button>
                </Box>
            )}
            <DashedLine my={4} />
        </Box>
    );
};

const WritePrescription = ({
    currentAppointment,
}: {
    currentAppointment: TAppointment;
}) => {
    const { data: doctor } = useGetMyProfileQuery(undefined);
    const [createPrescription] = useCreatePrescriptionMutation();
    const [medicineCount, setMedicineCount] = useState([1]);
    const [prescData, setPrescData] = useState<any>(null);

    const dispatch = useAppDispatch();

    const appointmentId = currentAppointment?.id;

    const handleAddMedicine = () => {
        setMedicineCount((prev) => [...prev, prev.length + 1]);
    };

    const handleRemoveMedicine = (index: number) => {
        setMedicineCount((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleSubmit = (data: any, options: any) => {
        const medications = medicineCount.map(
            (item) => data[`medicine${item}`]
        );
        const payload = {
            appointmentId,
            medications,
            recommendedLabTests: data.recommendedLabTests,
            note: data?.note,
            diagnosis: data.diagnosis,
        };

        tryCatch(
            async () => await createPrescription(payload),
            "Submitting Prescription",
            "Prescription Submitted Successfully",
            () => options.reset()
        );
    };

    const handlePreview = (data: any) => {
        const medications = medicineCount.map(
            (item) => data[`medicine${item}`]
        );
        const prescriptionData = {
            appointmentId,
            medications,
            recommendedLabTests: data.recommendedLabTests,
            note: data.note,
            diagnosis: data.diagnosis,
        };

        setPrescData({
            data: prescriptionData,
            patient: currentAppointment?.patient,
            doctor: doctor?.data,
        });

        dispatch(openModal({ modalId: "prescView" }));
    };

    console.log(prescData, "prescData______________");

    return (
        <Box p={2}>
            <Typography
                variant="h5"
                py={1}
                textAlign={"center"}
                fontWeight={600}
                color={grey[600]}
            >
                PRESCRIPTION
            </Typography>
            <N_Form onSubmit={handleSubmit}>
                <N_Input
                    sx={{ mb: 2 }}
                    label="Diagnosis"
                    name="diagnosis"
                    multiline
                    rows={2}
                />
                {medicineCount.map((item, index) => (
                    <MedicineFields
                        key={item}
                        item={item}
                        onRemove={() => handleRemoveMedicine(index)}
                    />
                ))}
                <Button
                    size="small"
                    variant="outlined"
                    onClick={handleAddMedicine}
                    endIcon={<AddIcon />}
                >
                    Add New Medicine
                </Button>
                <N_Input
                    sx={{ mt: 2 }}
                    label="Recommend Tests"
                    placeholder="Recommended lab tests (if needed)"
                    name="recommendedLabTests"
                    multiline
                    rows={2}
                />
                <N_Input
                    sx={{ mt: 2 }}
                    label="General Instructions"
                    placeholder="General instruction (optional)"
                    name="note"
                    multiline
                    rows={2}
                />

                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    mt={2}
                >
                    <SubmitButton fullWidth={false} />
                    <SubmitButton
                        fullWidth={false}
                        label="Preview"
                        customSubmit={handlePreview}
                    />
                    {/* <Button type="submit">Preview</Button> */}
                </Stack>
            </N_Form>

            <N_Modal fullScreen modalId="prescView">
                <PrescriptionView data={prescData} />
            </N_Modal>
        </Box>
    );
};

export default WritePrescription;
