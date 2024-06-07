import { USER_ROLE } from "./../constants/role";


export interface DoctorSpecialty {
    specialtiesId: string;
    doctorId: string;
    specialties: any;
}

export interface IDoctor {
    id: string;
    name: string;
    email?: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number | undefined;
    gender: "MALE" | "FEMALE";
    apointmentFee: number | undefined;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    specialties?: ISpecialties[];
    role?: typeof USER_ROLE.DOCTOR;
    doctorId?: string;
    needPasswordChange?: boolean;
    averageRating?: number;
    createdAt?: string;
}

export interface ISpecialties {
    id: string;
    title: string;
    icon: string;
}

export interface IDoctorFormData {
    doctor: IDoctor;
    password: string;
}
