"use server";

import { varfiyTokenForPage } from "@/utils/verfiyToken";
import { JWTPaylod } from "@/utils/Types";

export async function getUser(): Promise<JWTPaylod | null> {
    return varfiyTokenForPage();
}
