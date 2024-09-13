"use client";

import { Upload} from "lucide-react";
import React, { useState, useRef, type ChangeEvent } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { CLASH_ITEMS_URL } from "@/lib/apiEndPoint";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddClashItems ({
  token,
  clashId,
}: {
  token: string;
  clashId: string;
}) {
  const router = useRouter();

  const [item, setItem] = useState<Array<ClashItemForm>>([
    { image: null },
    { image: null },
  ]);

  const [urls, setUrls] = useState<Array<string>>(["", ""]);

  const [errors, setErrors] = useState<Array<string>>([]);
  const imgRef1 = useRef<HTMLInputElement | null>(null);
  const imgRef2 = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChamge = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const updateItems = [...item];
      updateItems[index].image = file;
      setItem(updateItems);
      const imageUrl = URL.createObjectURL(file);
      const updatedUrl = [...urls];
      updatedUrl[index] = imageUrl;
      setUrls(updatedUrl);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", clashId);
      item.map((item) => {
        if (item.image) formData.append(`images[]`, item.image);
      });

      if (formData.get("images[]")) {
        setLoading(true);
        const { data } = await axios.post(CLASH_ITEMS_URL, formData, {
          headers: {
            Authorization: token,
          },
        });

        if (data?.message) {
          toast.success("Items added successfully!");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
        setLoading(false);
      } else {
        toast.warning("Please uploade boath Images");
      }
    } catch (error) {
      setLoading(false);

      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error.response?.data?.errors);
        } else if (error.response?.status === 404) {
          toast.error(error.response?.data?.message);
        }
      } else {
        toast.error("Something went wrong. Please try again !");
      }
    }
  };

  return (
    <div className="mt-10 ">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {/* first block */}

        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          <input
            type="file"
            className="hidden"
            ref={imgRef1}
            onChange={(event) => handleImageChamge(event, 0)}
          />

          <div
            className="w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]"
            onClick={() => imgRef1?.current?.click()}
          >
            {urls.length > 0 && urls?.[0] !== "" ? (
              <Image
                src={urls?.[0]}
                alt="preview_2"
                width={500}
                height={500}
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex items-center space-x-2 text-xl">
                <Upload /> <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>

        {/* vs block */}
        <div className="w-full flex lg:w-auto justify-center items-center">
          <h1 className=" text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
            V/S
          </h1>
        </div>

        {/* second block */}

        <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          <input
            type="file"
            className="hidden"
            ref={imgRef2}
            onChange={(event) => handleImageChamge(event, 1)}
          />
          <div
            className="w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]"
            onClick={() => imgRef2?.current?.click()}
          >
            {urls.length > 0 && urls?.[1] !== "" ? (
              <Image
                src={urls?.[1]}
                alt="preview_2"
                width={500}
                height={500}
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex items-center space-x-2 text-xl">
                <Upload /> <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing.." : "Submit"}
        </Button>
      </div>
    </div>
  );
};


