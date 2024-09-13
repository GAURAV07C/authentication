"use client";
import React, { useState, type Dispatch, type SetStateAction } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { CLASH_URL } from "@/lib/apiEndPoint";
import type { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { toast } from "sonner";
import { clearCashe } from "@/app/actions/commonAction";

const EditClash = ({
  token,
  clash,
  open,
  setOpen,
}: {
  token: string;
  clash: ClashType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [clashData, setClashData] = useState<ClashFormType>({
    title: clash.title,
    description: clash.description,
  });
  const [date, setDate] = React.useState<Date | null>(
    new Date(clash.expire_at)
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ClashFormErrorType>();

  const [image, setImage] = useState<File | null>(null);
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

      const { data } = await axios.put(`${CLASH_URL}/${clash.id}`, formData, {
        headers: {
          Authorization: token,
        },
      });

      setLoading(false);
      if (data?.message) {
        clearCashe("dashboard")
        setClashData({});
        setDate(null);
        setImage(null);
        setErrors({});
        toast.success(data?.message);
        setOpen(false);
      }
    } catch (error) {
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
  };

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
                  onSelect={(date) => setDate(date!)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="text-red-50">{errors?.expire_at}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClash;
