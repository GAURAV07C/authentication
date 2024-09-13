
"use client";
import React, { useEffect } from "react";
import { resetPasswordAction } from "@/app/actions/authAction";
import { SubmitButton } from "@/components/common/SubmiitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { toast } from "sonner"
import { useSearchParams, useRouter } from "next/navigation";

const ResetPassword = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useFormState(resetPasswordAction, initState);
  const sParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
      setTimeout(() => {
        router.replace("/login");
      },1000)
    }
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        <input type="hidden" name="token" value={sParams.get("token") ?? ""} />
        <div className="mt-3 ">
          <div className="mt-4 ">
            <Label className="font-bold" htmlFor="email">
              email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email.."
              readOnly
              value={sParams.get("email") ?? ""}
            />
            <span className="text-red-500">{state.errors?.email}</span>
          </div>
          <div className="mt-4 ">
            <Label className="font-bold" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password.."
            />
            <span className="text-red-500">{state.errors?.password}</span>
          </div>

          <div className="mt-4 ">
            <Label className="font-bold" htmlFor="cpassword">
              Confirm Password
            </Label>
            <Input
              id="cpassword"
              name="confirm_password"
              type="password"
              placeholder="Confirm  your password.."
            />
            <span className="text-red-500">
              {state.errors?.confirm_password}
            </span>
          </div>

          <div>
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
