// "use server";

// import { authKey, refreshKey } from "@/constants/authKey";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// const setTokenToCookies = (key:string, token:string) => {
//     cookies().set(key, token);
//     if (option && option.passwordChangeRequired) {
//         redirect("/dashboard/change-password");
//     }
//     if (option && option.redirect) {
//         redirect(option.redirect);
//     }
//     if (option && !option.passwordChangeRequired && option.redirect) {
//         redirect(option.redirect);
//     }
// };

// export default setTokenToCookies;
