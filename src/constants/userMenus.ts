import { USER_ROLE } from "@/constants/role";

//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import TryIcon from "@mui/icons-material/Try";
import PersonIcon from "@mui/icons-material/Person";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import KeyIcon from "@mui/icons-material/Key";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IDrawerItem, TUserRole } from "@/types/common";

export const sidebarMenus = (userRole: TUserRole): IDrawerItem[] => {
    const roleMenus: IDrawerItem[] = [];

    const role = userRole.toLowerCase();

    const defaultMenus = [
        {
            title: "Profile",
            path: `${role}/profile`,
            icon: PersonIcon,
        },
        {
            title: "Change Password",
            path: `change-password`,
            icon: KeyIcon,
        },
    ];


    const superAdminMenus = [
        {
            title: "Dashboard",
            path: `${role}`,
            icon: DashboardIcon,
        },
        {
            title: "Manage Users",
            path: `${role}/manage-users`,
            icon: GroupIcon,
        },
        {
            title: "Specialties",
            path: `${role}/specialities`,
            icon: TryIcon,
        },
        {
            title: "Doctors",
            path: `${role}/doctors`,
            icon: MedicalInformationIcon,
        },
        {
            title: "Schedules",
            path: `${role}/schedules`,
            icon: CalendarMonthIcon,
        },
        {
            title: "Appointments",
            path: `${role}/appointments`,
            icon: BookOnlineIcon,
        },
        {
            title: "Reviews",
            path: `${role}/reviews`,
            icon: ReviewsIcon,
        },
    ];


     const adminMenus = [
        {
            title: "Dashboard",
            path: `${role}`,
            icon: DashboardIcon,
        },
        {
            title: "Specialties",
            path: `${role}/specialities`,
            icon: TryIcon,
        },
        {
            title: "Doctors",
            path: `${role}/doctors`,
            icon: MedicalInformationIcon,
        },
        {
            title: "Schedules",
            path: `${role}/schedules`,
            icon: CalendarMonthIcon,
        },
        {
            title: "Appointments",
            path: `${role}/appointments`,
            icon: BookOnlineIcon,
        },
        {
            title: "Reviews",
            path: `${role}/reviews`,
            icon: ReviewsIcon,
        },
    ];

     const doctorMenus = [
        {
            title: "Dashboard",
            path: `${role}`,
            icon: DashboardIcon,
        },
        {
            title: "Schedules",
            path: `${role}/schedules`,
            icon: CalendarMonthIcon,
        },
        {
            title: "Appointments",
            path: `${role}/appointment`,
            icon: BookOnlineIcon,
        },
    ];

    const patientMenus = [
        {
            title: "Doctors",
            path: `${role}/doctors`,
            icon: MedicalInformationIcon,
        },
        {
            title: "Appointments",
            path: `${role}/appointments`,
            icon: BookOnlineIcon,
        },
        {
            title: "Prescriptions",
            path: `${role}/prescriptions`,
            icon: ReceiptLongIcon,
        },
        {
            title: "Medical History",
            path: `${role}/medical-history`,
            icon: HealthAndSafetyIcon,
        },
        {
            title: "Payment History",
            path: `${role}/payment-history`,
            icon: AttachMoneyIcon,
        },
    ];
    

    switch (userRole) {
        case USER_ROLE.SUPER_ADMIN:
            roleMenus.push(...superAdminMenus, ...defaultMenus);
            break;

        case USER_ROLE.ADMIN:
            roleMenus.push(...adminMenus, ...defaultMenus);
            break;

        case USER_ROLE.DOCTOR:
            roleMenus.push(...doctorMenus, ...defaultMenus);
            break;

        case USER_ROLE.PATIENT:
            roleMenus.push(...patientMenus, ...defaultMenus);
            break;

        default:
            break;
    }

    return roleMenus;
};










