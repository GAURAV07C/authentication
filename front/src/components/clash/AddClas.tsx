"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CalendarIcon } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios, { AxiosError } from "axios";
import { CLASH_URL } from "@/lib/apiEndPoint";
import { toast } from "sonner";
import type { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { clearCashe } from "@/app/actions/commonAction";

const AddClas = ({user}:{user:CustomUser}) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = React.useState<Date | null>();
  const [clashData, setClashData] = useState<ClashFormType>({});
  const [errors, setErrors] = useState<ClashFormErrorType>();

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", clashData?.title ?? "");
      formData.append("description", clashData?.description ?? "");
      formData.append("expire_at", date?.toISOString() ?? "");
      if (image) formData.append("image", image);

      const { data } =  await axios.post(CLASH_URL,formData , {
        headers: {
          Authorization:user.token
        }
      })

      setLoading(false)
      if(data?.message){
        setClashData({})
        setDate(null)
        clearCashe("dashboard")
        toast.success(data?.message);
        setOpen(false);
      }

      } catch(error){
        console.log("The error is ", error);
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error.response?.data?.errors);
        }
      } else {
        toast.error("Something went wrong.please try again!");

      }
  }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add clash</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Clash</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter your title here.. "
              value={clashData?.title ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, title: e.target.value })
              }
            />
            <span className="text-red-50">{errors?.title}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter your description here.."
              value={clashData?.description ?? ""}
              onChange={(e) =>
                setClashData({ ...clashData, description: e.target.value })
              }
            />
             <span className="text-red-50">{errors?.description}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              placeholder="Enter your image here.. "
              onChange={handleImage}
            />
             <span className="text-red-50">{errors?.image}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="expireAt" className="block">
              ExpireAt
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full mt-2 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date ?? new Date()}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="text-red-50">{errors?.expire_at}</span>
          </div>
          <div className="mt-4">

          <Button className="w-full" disabled={loading} >{loading ? "Processing.." : "Submit"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClas;
