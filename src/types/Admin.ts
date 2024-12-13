export interface IAdmin {
    id: string;
    email: string;
    name: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    isDeleted: boolean;
    adminId?: string;
    role?: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
}
