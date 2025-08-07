"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Chip,
    Stack,
    IconButton,
    Tooltip,
    CircularProgress,
    Fade,
    Typography,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import CloseIcon from "@mui/icons-material/Close";
import { useSuggestSpecialistMutation } from "@/redux/api/aiApi";

interface SymptomAiDialogProps {
    open: boolean;
    onClose: () => void;
    initialSymptoms?: string;
}

const SymptomAiDialog = ({ open, onClose, initialSymptoms = "" }: SymptomAiDialogProps) => {
    const [symptoms, setSymptoms] = useState(initialSymptoms);
    const [trigger, { data, isLoading, isError, error, reset }] = useSuggestSpecialistMutation();

    useEffect(() => {
        if (!open) {
            setSymptoms("");
            reset();
        }
    }, [open, reset]);

    const handleAnalyze = useCallback(() => {
        if (!symptoms || symptoms.trim().length < 3) return;
        trigger({ symptoms });
    }, [symptoms, trigger]);

    const suggestedSpecialties: string[] = data?.specialties || [];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PsychologyIcon color="primary" /> AI Symptom Assistant
                <Box flexGrow={1} />
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2}>
                    <TextField
                        label="Describe your symptoms"
                        placeholder="e.g., Persistent cough, mild fever, shortness of breath for last 3 days"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        multiline
                        minRows={4}
                        fullWidth
                    />
                    <Box>
                        <Button
                            onClick={handleAnalyze}
                            variant="contained"
                            disabled={isLoading || !symptoms || symptoms.trim().length < 3}
                            startIcon={isLoading ? <CircularProgress size={18} /> : <PsychologyIcon />}
                        >
                            {isLoading ? "Analyzing..." : "Get Suggestion"}
                        </Button>
                    </Box>
                    {isError && (
                        <Typography variant="body2" color="error">
                            {(error as any)?.data?.message || "Failed to analyze symptoms. Try again."}
                        </Typography>
                    )}
                    {data && (
                        <Fade in>
                            <Stack spacing={1}>
                                <Typography variant="subtitle1" fontWeight={600}>AI Message</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {data?.message}
                                </Typography>
                                {!!suggestedSpecialties.length && (
                                    <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                                        {suggestedSpecialties.map((sp) => (
                                            <Chip key={sp} label={sp} color="primary" variant="outlined" />
                                        ))}
                                    </Stack>
                                )}
                            </Stack>
                        </Fade>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="text">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SymptomAiDialog;
