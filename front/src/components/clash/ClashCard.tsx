"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import ClashCardMenu from "./ClashCardMenu";
import Link from "next/link";
import { clashSchema } from '../../../../server/src/validation/clashValidation';

const ClashCard = ({ clash, token }: { clash: ClashType; token: string }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-row">
        <CardTitle>{clash.title}</CardTitle>
        <ClashCardMenu clash={clash} token={token} />
      </CardHeader>
      <CardContent className="h-[300px]">
        {clash?.image && (
          <Image
            src={getImageUrl(clash.image)}
            alt={clash.title}
            width={50}
            height={50}
            className=" rounded-md w-full h-[220px] object-contain"
          />
        )}
        <p  className="flex justify-start mt-2 font-semibold">{clash.description}</p>

        <p className="flex justify-start">
          <strong>Expire At :-</strong>
          {new Date(clash?.expire_at!).toDateString()}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/clash/items/${clash.id}`}>
        <Button>Items</Button>

        </Link>
      </CardFooter>

    </Card>
  );
};

export default ClashCard;
