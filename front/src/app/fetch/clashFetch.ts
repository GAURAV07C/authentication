import { CLASH_URL } from "@/lib/apiEndPoint";

export async function fetchClashs(token:string) {
    const res = await fetch(CLASH_URL,{
        headers:{
            Authorization:token
        },
        next:{
            revalidate:60*60,
            tags:["dashboard"]
        }


    })

    if(!res.ok){
        throw new Error("failed to fetch data")
    }

    const responce = await res.json()

    if(responce?.data){
        return responce?.data
    }
    return []


}



export async function fetchClash(id:number) {
    const res = await fetch(`${CLASH_URL}/${id}`,{
        cache:"no-cache"
    })

    if(!res.ok){
        throw new Error("failed to fetch data")
    }

    const responce = await res.json()

    if(responce?.data){
        return responce?.data
    }
    return null;


}
