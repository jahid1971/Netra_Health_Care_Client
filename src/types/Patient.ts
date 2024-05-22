export interface IPatient {
    id: string;
    email: string;
    name: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    isDeleted: boolean;
    patientId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TMedicalHistory = {
    id: string;
    patientId: string;
    dateOfBirth?: Date;
    gender?: "Male" | "Female" ;
    bloodGroup?: string;
    hasAllergies?: boolean;
    hasDiabetes?: boolean;
    height?: string;
    weight?: string;
    smokingStatus?: boolean;
    dietaryPreferences?: string;
    pregnancyStatus?: boolean;
    mentalHealthHistory?: string;
    immunizationStatus?: boolean;
    hasPastSurgeries?: boolean;
    recentAnxiety?: boolean;
    recentDepression?: boolean;
    maritalStatus?: string;
    wantToAdd?: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  