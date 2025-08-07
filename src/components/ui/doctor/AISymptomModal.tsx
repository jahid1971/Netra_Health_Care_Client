import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Stack, IconButton } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import N_Modal from "@/components/modals/N_Modal";

interface AISymptomModalProps {
    modalId: string;
    onResult: (result: any) => void;
}

const AISymptomModal: React.FC<AISymptomModalProps> = ({ modalId, onResult }) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // You will call the doctorApi from the parent and pass onResult
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setLoading(true);
        setError("");
        try {
            // The parent will handle the API call
            onResult(input);
        } catch (err: any) {
            setError(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <N_Modal modalId={modalId} title="AI Symptom Checker">
            <form onSubmit={handleSubmit}>
                <Typography mb={2} color="text.secondary">
                    Describe your symptoms in detail. Our AI will suggest the most relevant specialist or doctor for you.
                </Typography>
                <TextField
                    autoFocus
                    multiline
                    minRows={3}
                    fullWidth
                    placeholder="e.g. I have a persistent headache and blurry vision..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    variant="outlined"
                    disabled={loading}
                />
                {error && <Typography color="error" mt={1}>{error}</Typography>}
                <Stack direction="row" justifyContent="flex-end" mt={2} gap={1}>
                    <Button onClick={() => setInput("")} disabled={loading} variant="outlined">Clear</Button>
                    <Button type="submit" variant="contained" disabled={loading || !input.trim()} startIcon={loading ? <CircularProgress size={20} /> : <SmartToyIcon />}>
                        {loading ? "Analyzing..." : "Ask AI"}
                    </Button>
                </Stack>
            </form>
        </N_Modal>
    );
};

export default AISymptomModal;
