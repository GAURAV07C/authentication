"use client";
import socket from "@/lib/socket";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import CountUp from 'react-countup'


const ViewClash = ({ clash }: { clash: ClashType }) => {
  const  [clashComments, setClashComments] = useState(clash.ClashComments)

  const  [clashItem, setClashItems] = useState(clash.ClashItem)


  const updateCounter= (id:number) => {
    const item = [...clashItem]
    const findindex = clashItem.findIndex((ite) => ite.id === id);
    if(findindex !== -1){
      item[findindex].count +=1
    }
    setClashItems(item)

  }

  useEffect(() => {
    socket.on(`clashing-${clash.id}`, (data) => {
      updateCounter(data?.clashItemId)
    })
  })

  return (
    <div className="mt-10">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
        {clashItem &&
          clashItem.length > 0 &&
          clashItem.map((item, index) => {
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
                  <CountUp

                  start={0}
                  end={item.count}

                  duration={0.5}

                  className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"

                  />


                </div>

                {/* vs block */}
                {index % 2 ===0 &&  (
                <div className="w-full flex lg:w-auto justify-center items-center">
                  <h1 className=" text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
                    V/S
                  </h1>
                </div>
                )  }

                {/* second block */}
              </Fragment>
            );
          })}
      </div>
      {/* comments */}


          <div className="mt-4">
            {clashComments && clashComments.length > 0 && clashComments.map((item,index) =>
                <div className="w-full md:w-[600px] rounded-lg p-4 bg-muted mt-4 " key={index} >
                  <p className="font-bold ">{item.commetnt}</p>
                  <p>{new Date(item.created_at).toISOString()}</p>

                </div>
            )}

          </div>

    </div>
  );
};

export default ViewClash;
