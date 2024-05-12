import { USER_ROLE } from "@/constants/role";

//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import TryIcon from "@mui/icons-material/Try";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IDrawerItem, TUserRole } from "@/types/common";

export const sidebarMenus = (role: TUserRole): IDrawerItem[] => {
    const roleMenus: IDrawerItem[] = [];

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

    switch (role) {
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

export const superAdminMenus = [
    {
        title: "Dashboard",
        path: `${USER_ROLE.SUPER_ADMIN}`,
        icon: DashboardIcon,
    },
    {
        title: "Manage Users",
        path: `${USER_ROLE.SUPER_ADMIN}/manage-users`,
        icon: GroupIcon,
    },
];

export const adminMenus = [
    {
        title: "Dashboard",
        path: `${USER_ROLE.ADMIN}`,
        icon: DashboardIcon,
    },
    {
        title: "Specialties",
        path: `${USER_ROLE.ADMIN}/specialities`,
        icon: TryIcon,
    },
    {
        title: "Doctors",
        path: `${USER_ROLE.ADMIN}/doctors`,
        icon: MedicalInformationIcon,
    },
    {
        title: "Schedules",
        path: `${USER_ROLE.ADMIN}/schedules`,
        icon: CalendarMonthIcon,
    },
    {
        title: "Appointments",
        path: `${USER_ROLE.ADMIN}/appointments`,
        icon: BookOnlineIcon,
    },
    {
        title: "Reviews",
        path: `${USER_ROLE.ADMIN}/reviews`,
        icon: ReviewsIcon,
    },
];

export const doctorMenus = [
    {
        title: "Dashboard",
        path: `${USER_ROLE.DOCTOR}`,
        icon: DashboardIcon,
    },
    {
        title: "Schedules",
        path: `${USER_ROLE.DOCTOR}/schedules`,
        icon: CalendarMonthIcon,
    },
    {
        title: "Appointments",
        path: `${USER_ROLE.DOCTOR}/appointment`,
        icon: BookOnlineIcon,
    },
];

export const patientMenus = [
    {
        title: "Appointments",
        path: `${USER_ROLE.PATIENT}/appointments`,
        icon: BookOnlineIcon,
    },
    {
        title: "Prescriptions",
        path: `${USER_ROLE.PATIENT}/prescriptions`,
        icon: ReceiptLongIcon,
    },
    {
        title: "Payment History",
        path: `${USER_ROLE.PATIENT}/payment-history`,
        icon: AttachMoneyIcon,
    },
];
