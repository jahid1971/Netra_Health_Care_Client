export interface IDoctor {
    id: string;
    email: string;
    name: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: 'MALE' | 'FEMALE' | 'OTHER'; // Adjust if more genders are allowed
    apointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    isDeleted?: boolean;
    createdAt?: string; 
    updatedAt?: string; 
    averageRating: number;
    role: string;
    status: string;
  }
  