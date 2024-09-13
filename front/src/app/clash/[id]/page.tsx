
import { fetchClash } from "@/app/fetch/clashFetch";
import Navbar from "@/components/base/Navbar";
import Clashing from "@/components/clash/Clashing";


  import React from "react";
import { authOptions, type CustomeSession } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import AddClashItems from "@/components/clash/AddClashItems";
import ViewClash from "@/components/clash/ViewClash";

  export default async function ClashItems({
    params,
  }: {
    params: { id: number };
  }) {
    const session: CustomeSession | null = await getServerSession(authOptions);
    const clash: ClashType | null = await fetchClash(params.id);


    return (
      <div className=" container ">
        <Navbar />

        <div className="mt-4">
          <h1 className="text-2xl lg:text-4xl font-bold lg:4xl">
            {clash?.title}
          </h1>
          <p className="text-lg">{clash?.description}</p>
        </div>

        {clash?.ClashItem && clash.ClashItem.length > 0 ? (
        <ViewClash clash={clash} />
      ) : (
        <AddClashItems
          token={session?.user?.token!}
          clashId={params?.id.toString()}
        />
      )}


      </div>
    );
  }
