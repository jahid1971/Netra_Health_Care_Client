import { useEffect, useState } from "react";

import { jwtDecode, JwtPayload } from "jwt-decode";
import { authKey } from "@/constants/authKey";

const useUserInfo = (): any | string => {
    const [userInfo, setUserInfo] = useState<any | string>("");

    useEffect(() => {
        const fetchUserInfo = () => {
            const authToken = localStorage.getItem(authKey);
            if (authToken) {
                const decodedData: JwtPayload & { role: any } = jwtDecode(authToken) as JwtPayload & {
                    role: any;
                };
                const userInfo: any = {
                    ...decodedData,
                    role: decodedData.role?.toLowerCase() || "",
                };
                setUserInfo(userInfo);
            } else {
                setUserInfo("");
            }
        };

        fetchUserInfo();
    }, []);
    // [localStorage.getItem(authKey)]

    return userInfo;
};

export default useUserInfo;
