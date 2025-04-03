import React, { useState } from "react";
import "./BannerListgame.css";
import Carousel from "react-multi-carousel";
import { getPlayGameById } from "@/services/GameApi.service";

import NavigationGameComponent from "@/hook/NavigationGame";
import Image from "next/image";
import NumberCount from "@/components/NumberCount/NumberCount";
import swal from "sweetalert";
import usePlayGame from "@/hook/usePlayGame";
export default function BannerListgamePage() {
  const { loading, playGame } = usePlayGame();
  return (
    <div className="banner-list">
      <div className="img-jackpost">
        <h2>Huge Prize Pool</h2>
        <div className="jackpost-num">
          <Image
            src={"/images/jackpot.png"}
            width={500}
            height={500}
            className=""
            alt=""
          />
          <NumberCount
            classname="jackpost-count"
            numStart={1000}
            numEnd={8509560269}
          />
        </div>
      </div>
      <Carousel
        additionalTransfrom={0}
        autoPlaySpeed={3000}
        centerMode={false}
        className="list-game"
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        autoPlay
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 4,
            partialVisibilityGutter: 10,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <div className="card">
          <Image
            src={"/images/custom_INR (9).avif"}
            className="img"
            width={180}
            height={260}
            alt=""
          />
          <div className="textBox-container">
            <div className="textBox">
              <button
                className="textBox-btn"
                onClick={() => playGame("PG0110", "PG")}
              >
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <Image
            src={"/images/custom_INR (8).avif"}
            className="img"
            width={180}
            height={260}
            alt=""
          />
          <div className="textBox-container">
            <div className="textBox">
              <button
                className="textBox-btn"
                onClick={() => playGame("PG0103", "PG")}
              >
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <Image
            src={"/images/custom_INR (9).avif"}
            className="img"
            width={180}
            height={260}
            alt=""
          />
          <div className="textBox-container">
            <div className="textBox">
              <button
                className="textBox-btn"
                onClick={() => playGame("PG0095", "PG")}
              >
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <Image
            src={"/images/custom_INR (10).avif"}
            className="img"
            width={180}
            height={260}
            alt=""
          />
          <div className="textBox-container">
            <div className="textBox">
              <button
                className="textBox-btn"
                onClick={() => playGame("PG0086", "PG")}
              >
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <Image
            src={"/images/custom_INR (18).avif"}
            className="img"
            width={180}
            height={260}
            alt=""
          />
          <div className="textBox-container">
            <div className="textBox">
              <button
                className="textBox-btn"
                onClick={() => playGame("PG0083", "PG")}
              >
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <Image
            src={"/images/custom_INR (19).avif"}
            className="img"
            width={180}
            height={260}
            alt=""
          />
          <div className="textBox-container">
            <div className="textBox">
              <button
                className="textBox-btn"
                onClick={() => playGame("PG0107", "PG")}
              >
                Play
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}
