'use server';

import { cookies } from 'next/headers';

export const deleteCookies = (keys: string[]) => {
   keys.forEach((key) => {
      cookies().delete(key);
   });
};


export const setTokenToCookies = (key: string, token: string, httpOnly: boolean = false) => {
   const options: {
     httpOnly?: boolean;
     secure?: boolean;
   //   sameSite?: 'strict' | 'lax' | 'none';
   } = {};
 
   if (httpOnly) {
     options.httpOnly = true;
     options.secure = process.env.NODE_ENV === "production";
   }
 
   cookies().set(key, token, options);
 };



export const getCookies = (key: string) => {
   return cookies().get(key)?.value;
}
