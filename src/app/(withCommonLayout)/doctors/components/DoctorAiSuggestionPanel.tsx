"use client";

import React, { useCallback } from "react";
import { Box, Alert, Fade, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import N_Input from "@/components/forms/N_Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { useSuggestSpecialistMutation } from "@/redux/api/aiApi";
import N_Chips from "@/components/ui/N_Chips";
import DoctorCard from "@/components/ui/doctor/DoctorCard";
import DashedLine from "@/components/ui/DashedLine";
import N_Form from "@/components/forms/N_Form";

interface DoctorAiSuggestionPanelProps {
    aiOpen: boolean;
    setAiOpen: (open: boolean) => void;
}

interface SymptomFormValues {
    symptoms: string;
}

const SpecialtyInfo = ({
    availableSpecialty,
    requiredSpecialty,
    hasDoctors,
}: {
    availableSpecialty: string | null | undefined;
    requiredSpecialty: string | null | undefined;
    hasDoctors: boolean;
}) => {
    if (!availableSpecialty && !requiredSpecialty) return null;
    return (
        <Box mt={2} mb={3}>
            {availableSpecialty ? (
                <Box
                    display="inline-flex"
                    alignItems="center"
                    gap={1.5}
                    mb={2}
                    sx={{ verticalAlign: "middle" }}
                >
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ m: 0, p: 0, lineHeight: 1.7 }}
                    >
                        Based on your symptoms, we recommend
                    </Typography>
                    <N_Chips
                        label={availableSpecialty}
                        type="success"
                    />
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ m: 0, p: 0, lineHeight: 1.7 }}
                    >
                        specialist.
                    </Typography>
                </Box>
            ) : requiredSpecialty ? (
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Typography variant="body1" color="text.secondary">
                        You may need:
                    </Typography>
                    <N_Chips label={requiredSpecialty} type="info" />
                    <Typography variant="body1" color="text.secondary">
                        specialist.
                    </Typography>
                </Box>
            ) : null}
            {!hasDoctors && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No specialists found for the suggested specialty. Please try
                    searching manually or consult your primary care physician.
                </Alert>
            )}
        </Box>
    );
};

const SuggestedDoctorsList = ({
    doctors,
    availableSpecialty,
}: {
    doctors: any[];
    availableSpecialty: string | null | undefined;
}) => {
    if (!doctors?.length) return null;
    return (
        <Box mt={3}>
            <Typography
                variant="h6"
                gutterBottom
                color="primary.main"
                fontWeight={600}
            >
                Here are the {availableSpecialty} specialists below:
            </Typography>
            {doctors.map((doctor, index) => (
                <Box key={doctor.id}>
                    <Box my={2} sx={{ backgroundColor: "secondary.main" }}>
                        <DoctorCard doctor={doctor} />
                    </Box>
                    {index !== doctors.length - 1 && <DashedLine />}
                </Box>
            ))}
        </Box>
    );
};

const DoctorAiSuggestionPanel: React.FC<DoctorAiSuggestionPanelProps> = ({
    aiOpen,
    setAiOpen,
}) => {
    const methods = useForm<SymptomFormValues>({
        defaultValues: { symptoms: "" },
        mode: "onChange",
    });
    const {
        handleSubmit,
        watch,
        reset,
        formState: { isValid },
    } = methods;

    const symptoms = watch("symptoms");

    const [trigger, { data, isLoading, isError, error, reset: resetMutation }] =
        useSuggestSpecialistMutation();

    const onAnalyze = useCallback(
        async (values: SymptomFormValues) => {
            if (!values.symptoms?.trim()) return;
            try {
                await trigger({ symptoms: values.symptoms.trim() }).unwrap();
            } catch (e) {
                // errors handled by RTK Query
            }
        },
        [trigger]
    );

    const handleClear = () => {
        reset();
        resetMutation();
        setAiOpen(false);
    };

    if (!aiOpen) return null;

    const doctors = data?.suggestedDoctores?.data || [];

    return (
        <Box
            mt={2}
            p={3}
            sx={{
                border: 1,
                borderColor: "grey.300",
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: 2,
            }}
        >
            <N_Form defaultValues={{ symptoms: "" }} onSubmit={onAnalyze}>
                <Typography
                    variant="h6"
                    gutterBottom
                    color="primary.main"
                    fontWeight={600}
                >
                    Find Doctor By Symptoms With AI Assistance
                </Typography>
                <N_Input
                    label="Describe your symptoms"
                    name="symptoms"
                    multiline
                    rows={3}
                    sx={{ mb: 2, backgroundColor: "white" }}
                />
                <Stack direction="row" spacing={2} alignItems="center">
                    <SubmitButton
                        label={
                            isLoading ? "Analyzing..." : "Get AI Suggestions"
                        }
                        isLoading={isLoading}
                        fullWidth={false}
                        disabled={
                            isLoading ||
                            !isValid ||
                            !symptoms?.trim() ||
                            symptoms.trim().length < 3
                        }
                    />
                    <SubmitButton
                        label="Clear"
                        variant="outlined"
                        onClick={handleClear}
                        fullWidth={false}
                        isLoading={false}
                    />
                </Stack>
                {isError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {(error as any)?.data?.message ||
                            "Failed to analyze symptoms. Please try again."}
                    </Alert>
                )}
            </N_Form>

            {data && (
                <Fade in>
                    <Box>
                        <SpecialtyInfo
                            availableSpecialty={data?.availableSpecialty}
                            requiredSpecialty={data?.requiredSpecialty}
                            hasDoctors={!!doctors.length}
                        />
                        <SuggestedDoctorsList
                            doctors={doctors}
                            availableSpecialty={data?.availableSpecialty}
                        />
                    </Box>
                </Fade>
            )}
        </Box>
    );
};

export default DoctorAiSuggestionPanel;
