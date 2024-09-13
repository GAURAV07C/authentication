"use client";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { CLASH_URL } from "@/lib/apiEndPoint";
import { clearCashe } from "@/app/actions/commonAction";

const DeleteClash = ({
  open,
  setOpen,
  id,
  token
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id:number;
  token:string
}) => {
  const deleteClash = async () => {
    try{
        const {data} = await axios.delete(`${CLASH_URL}/${id}` , {headers:{
            Authorization:token
        }})

        if(data?.message){
            setLoading(false)
            clearCashe("dashboard")
            toast.success(data.message)
        }


    }catch(error){
        setLoading(false)
        toast.error("Something went wong")

    }
  };

  const [loading,setLoading] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will delete your clash Permanently in our DB.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteClash} disabled={loading}>
            {loading ? "Processing..." : "Yes Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteClash;
