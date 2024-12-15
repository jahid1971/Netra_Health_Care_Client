"use client";
import N_Modal from "@/components/modals/N_Modal";
import { useCreateRatingMutation } from "@/redux/api/appointmentApi";
import { TAppointment, TReview } from "@/types/Appointment";
import { tryCatch } from "@/utils/tryCatch";
import { Box, Rating } from "@mui/material";
import { useState } from "react";

const RatingModal = ({
    currentAppointment,
}: {
    currentAppointment: TAppointment | null;
}) => {
    const [createRating] = useCreateRatingMutation();

    const giveRating = (value: number) => {
        const payload: Partial<TReview> = {
            rating: value,
            appointmentId: currentAppointment.id,
            doctorId: currentAppointment.doctorId,
            patientId: currentAppointment.patientId,
        };
        tryCatch(async () => createRating(payload));
    };

    return (
        <N_Modal title="Please give your rating" modalId="rating">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    m: 2,
                    mx: 5,
                }}
            >
                <Rating
                    size="large"
                    name="simple-uncontrolled"
                    onChange={(event, newValue) => {
                        if (newValue !== null) {
                            giveRating(newValue);
                        }
                    }}
                    defaultValue={2}
                />
            </Box>
        </N_Modal>
    );
};

export default RatingModal;
