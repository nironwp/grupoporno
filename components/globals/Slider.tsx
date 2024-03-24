"use client"
import { ICategoryOptions } from "@/functions/categories";
import { IGroupOptions } from "@/functions/groups";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { useMediaQuery } from 'react-responsive';

interface Props {
  groups: IGroupOptions[]
  categories: ICategoryOptions[]
}

export default function SimpleSlider({categories,groups}:Props) {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define largura máxima para dispositivos móveis
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Configurações do Slider para dispositivos móveis e desktops
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 2 : 4, // Mostra 1 slide em dispositivos móveis, 2 em desktops
    slidesToScroll: isMobile ? 2 : 4, // Scrola 1 slide em dispositivos móveis, 2 em desktops
  };

  if(groups.length <= 0) return

  if(groups.length < settings.slidesToShow) {
    settings.slidesToShow = groups.length
  }
  if(groups.length < settings.slidesToScroll) {
    settings.slidesToScroll = groups.length
  }

  return (
    <Slider draggable autoplay autoplaySpeed={2500} className="h-auto slider-container -z-10" ref={sliderRef as any} {...settings}>
      {groups.map((group, idx) => {
        return (
          <div 
            key={idx}
            id={idx+''}
            className={`bg-no-repeat bg-center bg-cover] slide-item`}
          >
          <style>{`
            .banner_background-${idx} {
              background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('${group.bannerImage}');
              background-position: center center;
              background-repeat: no-repeat;
              background-size: cover;
            }
          `}</style>
            <Link
              href={group.link}
              className={`text-center max-h-[35vh] gap-2 md:max-h-[20vh] flex flex-col justify-end aspect-square items-center w-full rounded p-5 transition-all hover:scale-105 banner_background-${idx}`}
            >
              <span className="text-sm font-bold uppercase text-white">
                {group.type === "group" ? "Grupo" : "Canal"}
              </span>
              <h1 className="text-theme-500 text-2xl font-bold uppercase">
                {group.title}
              </h1>
              <span className="text-xs text-white mt-2">
                Categoria:{" "}
                <b>
                  {
                    categories.find(
                      (category) => category.id == group.categoryId
                    )?.title
                  }
                </b>
              </span>
            </Link>
          </div>
        )
      })}
    </Slider>
  );
}
