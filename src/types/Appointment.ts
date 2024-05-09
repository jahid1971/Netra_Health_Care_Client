

import { IDoctor } from "./Doctors";
import { TSchedule } from "./schedules";

export type TAppointment = {
    id: string;
    createdAt: string;     
    updatedAt: string;      
    doctorId: string;
    doctor: IDoctor;
    patientId: string;
    scheduleId: string;
    schedule: TSchedule;
    paymentStatus: "PAID" | "UNPAID";  
    status: "SCHEDULED" | "CANCELLED" | "COMPLETED"; 
 
    videoCallingId: string;
  };