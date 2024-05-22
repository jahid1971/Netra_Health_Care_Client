export type TPrescription = {
    id: string;
    appointmentId: string;
    doctorId: string;
    patientId: string;
    issuedAt: string | null;
    medications: TMedication[];
    diagnosis?: string;
    followUpDate?: string | null;
    recommendedLabTests?: string | null;
    note?: string | null;
    isDeleted?: boolean | null;
    createdAt: string;
    updatedAt: string;
};

export type TMedication = {
    id: string;
    prescriptionId: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instruction?: string | null;
};
