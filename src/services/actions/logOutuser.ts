import { authKey } from "@/constants/authKey"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const logOutUser = (router:AppRouterInstance) => {
   localStorage.removeItem(authKey)
   router.push("/")
   router.refresh()
}