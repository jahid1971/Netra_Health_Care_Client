import { IDoctor } from "./Doctors";

export type TSchedule = {
    createdAt: string;
    endDateTime: string;
    id: string;
    startDateTime: string;
    updatedAt: string;
};

export type ISchedule = {
    // [x: string]: any;
    appointmentId?: string;
    doctor: IDoctor;
    doctorId: string;
    isBooked: boolean;
    id?: string;
    schedule: TSchedule;
    scheduleId?: string;
    updatedAt: string;
};
