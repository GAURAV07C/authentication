'use client'

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../common/SubmiitButton";
import { useFormState } from "react-dom";
import { forgetPasswordAction, loginAction } from "@/app/actions/authAction";
import { toast } from "sonner";

const ForgetPassword = () => {
  const initState = {
    status:0,
    message:"",
    errors:{},
  }


  const [state,formAction] = useFormState(forgetPasswordAction,initState)

  useEffect(() => {
    if(state.status ===500){
      toast.error(state.message)
    }else if(state.status ===200) {
      toast.success(state.message)
    }
  },[state])


  return (
    <form action={formAction}>
      <div className="mt-4 ">
        <Label className="font-bold" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email.."
        />
        <span className="text-red-500">{state.errors?.email}</span>
         </div>
         <div className="mt-3">

        <SubmitButton />
         </div>

    </form>
  );
};

export default ForgetPassword;
