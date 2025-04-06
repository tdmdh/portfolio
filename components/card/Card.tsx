"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#fffcf2] relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#403d39]/[0.1] dark:bg-[#252422] dark:border-[#ccc5b9]/[0.2] border-[#252422]/[0.1] w-auto sm:w-[30rem] h-auto rounded-3xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-[#252422] dark:text-[#fffcf2]"
        >
          Museum de Pixel
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-[#403d39] text-sm max-w-sm mt-2 dark:text-[#ccc5b9]"
        >
          Een simple website voor een museum over klassieke games.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="/projects/pdm.png"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-[#eb5e28] dark:bg-[#ccc5b9] dark:text-[#252422] text-[#fffcf2] text-xs font-bold"
          >
            <Link
            href="https://102376.stu.sd-lab.nl/broep1/PIXELPROJECT/CentralPage/index.html?classId=0445f3bd-f90e-4275-b9e5-b8b970bdc244&assignmentId=fee2f419-ef29-4342-ac06-59c71cd1e974&submissionId=8d44a5e0-207b-bffb-cecd-26c586e9e155"
            >
            View details
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}


export default ThreeDCardDemo;
