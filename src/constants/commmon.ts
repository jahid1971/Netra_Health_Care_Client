export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const Gender = [{ label: "MALE", value: "MALE" }, { label: "FEMALE",value:"FEMALE" }]

export const queryPeriods = [
    { label: "Today", value: "today" },
    { label: "Last Week", value: "lastWeek" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Last Year", value: "lastYear" },
];

export const bloodGroups = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
]

export  const defaultQuery = { page: 1, limit: 5 };
