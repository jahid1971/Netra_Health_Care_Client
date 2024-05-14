export interface IPatient {
    id: string;
    email: string;
    name: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
