"use client";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import socket from "@/lib/socket";

const Clashing = ({ clash }: { clash: ClashType }) => {
  const [clashComments, setClashComments] = useState(clash.ClashComments);

  const [comment, setComment] = useState("");

  const [clashItems, setClashItems] = useState(clash.ClashItem);
  const [hideVote, setHideVote]= useState(false);

  const handleVote =(id:number) => {
      if(clashItems && clashItems.length > 0 ){
        setHideVote(true)

        updateCounter(id)
        // Socket list
        socket.emit(`clashing-${clash.id} ` , {
          clashId : clash.id,
          clashItemId:id
        })
      }


  }

  const updateCounter = (id: number) => {
    if (clashItems) {
      // setHideVote(true);
      const items = [...clashItems];
      const findIndex = clashItems.findIndex((item) => item.id === id);
      if (findIndex !== -1) {
        items[findIndex].count += 1;
      }
      setClashItems(items);
    }
  };
  useEffect(() => {
    socket.on(`clashing-${clash.id}`, (data) => {
      updateCounter(data?.clashItemId)
    })
  })

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {clashItems &&
          clashItems.length > 0 &&
          clashItems.map((item, index) => {
            return (
              <Fragment key={index}>
                {/* first block */}

                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                  <div className="w-full flex justify-center items-center rounded-md p-2 h-[300px]">
                    <Image
                      src={getImageUrl(item.image)}
                      alt="preview_2"
                      width={500}
                      height={500}
                      className="w-full h-[300px] object-contain"
                    />
                  </div>

                  {hideVote ? (
                    <CountUp
                      start={0}
                      end={item.count}
                      duration={0.5}
                      className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    />
                  ) : (
                    <Button onClick={() => handleVote(clash.id)}>
                      <span className="mr-2 text-lg">vote</span> <ThumbsUp />
                    </Button>
                  )}
                </div>

                {/* vs block */}
                {index % 2 === 0 && (
                  <div className="w-full flex lg:w-auto justify-center items-center">
                    <h1 className=" text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                      V/S
                    </h1>
                  </div>
                )}

                {/* second block */}
              </Fragment>
            );
          })}
      </div>
      {/* comments */}

      <form className="mt-4 w-full">
        <Textarea
          placeholder="type your suggesion"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button className="w-full mt-2">Submit Comment</Button>
      </form>

      <div className="mt-4">
        {clashComments &&
          clashComments.length > 0 &&
          clashComments.map((item, index) => (
            <div
              className="w-full md:w-[600px] rounded-lg p-4 bg-muted mt-4 "
              key={index}
            >
              <p className="font-bold ">{item.comment}</p>
              <p>{new Date(item.created_at).toISOString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Clashing;
