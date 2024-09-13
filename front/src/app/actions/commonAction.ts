'use server'

import { revalidateTag } from "next/cache"

export async function clearCashe(tag:string) {
    revalidateTag(tag)


}
