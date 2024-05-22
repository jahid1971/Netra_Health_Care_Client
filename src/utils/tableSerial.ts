import { IMeta, TQuery } from "@/types/common";

export default function tableSerial(meta: IMeta | undefined, index: number) {
    return ((meta?.page ?? 1) - 1) * (meta?.limit ?? 5) + index + 1 + ".";
}
