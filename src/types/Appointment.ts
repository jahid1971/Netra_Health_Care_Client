import { IDoctor } from "./Doctors";
import { IPatient } from "./Patient";
import { TSchedule } from "./schedules";

export type TAppointment = {
    id: string;
    createdAt: string;
    updatedAt: string;
    doctorId: string;
    doctor?: IDoctor;
    patientId: string;
    patient?: IPatient;
    scheduleId: string;
    schedule: TSchedule;
    paymentStatus: "PAID" | "UNPAID";
    status: "SCHEDULED" | "CANCELLED" | "COMPLETED";
    videoCallingId: string;
};

export type TReview = {
    id: string;
    createdAt: string;
    updatedAt: string;
    appointmentId: string;
    patientId: string;
    doctorId: string;
    rating: number;
    comment?: string;
    patient?: IPatient;
    doctor?: IDoctor;
};
