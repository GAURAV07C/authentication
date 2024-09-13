"use client";

import React, { Suspense, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

import dynamic from "next/dynamic";
import DeleteClash from "./DeleteClash";
import Env from "@/lib/env";
import { toast } from "sonner";

const EditClash = dynamic(() => import('./EditClash'))

const ClashCardMenu = ({ clash , token}: { clash: ClashType , token:string }) => {
  const [open , setOpen] = useState (false)
  const [deletOopen , setDeleteOpen] = useState (false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/clash/${clash.id}`)
    toast.success("Link copied successfully")
  }


  return (
    <>

    { open && <Suspense fallback={<p>Loading...</p>}>

      <EditClash open={open} setOpen={setOpen} clash={clash} token={token} />

    </Suspense>
    }

{deletOopen && <Suspense fallback={<p>Loading...</p>}>

<DeleteClash open={deletOopen} setOpen={setDeleteOpen} id={clash.id} token={token} />

</Suspense>
}


      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)} >Edit</DropdownMenuItem>
          <DropdownMenuItem  onClick={handleCopy} >Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)} >Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ClashCardMenu;
