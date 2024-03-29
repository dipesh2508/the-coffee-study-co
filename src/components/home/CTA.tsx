import React from "react";
import cta from "@/assets/images/cta.png";
import circle_cta from "@/assets/Elements/circle_cta.svg";
import arrow_cta from "@/assets/Elements/arrow_cta.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const CTA = () => {
  return (
    <section className="bg-secondary-5">
      <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-44 lg:py-16">
        <div className="grid grid-cols-1  content-center gap-8 lg:grid-cols-2  lg:gap-20">
          
          <div className=" relative my-auto w-full rounded-lg bg-primary-9">
            <Image
              alt="cta"
              width={500}
              height={500}
              src={cta}
              className=""
            />
            <Image
            alt="cta"
            width={80}
            height={80}
            src={circle_cta}
            className="absolute z-20 -top-8 -left-8"
          />
          </div>

          <div className="my-auto lg:py-20">
            <p className="text-3xl font-semibold text-white sm:text-5xl">
              From casual chats to in-depth discussions, find your space in our
              diverse communities
            </p>
            <div className="mt-4">
              <Button className=" bg-white font-medium text-black  hover:bg-primary-3 hover:text-primary-6">
                Let&#39;s Go <FaArrowRightLong className="ml-2" />
              </Button>
            </div>
            <Image
              alt="cta"
              width={50}
              height={50}
              src={arrow_cta}
              className="absolute -bottom-[1042px] right-[64px]    size-32  object-contain object-center "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
