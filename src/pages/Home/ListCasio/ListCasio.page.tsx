import React, { useState } from "react";
import "./ListCasio.css";
import Carousel from "react-multi-carousel";
import { getPlayGameById } from "@/services/GameApi.service";

import NavigationGameComponent from "@/hook/NavigationGame";
import Image from "next/image";
import NumberCount from "@/components/NumberCount/NumberCount";
import swal from "sweetalert";
import usePlayGame from "@/hook/usePlayGame";
import LoadingComponent from "@/components/Loading";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";

export default function ListCasioPage() {
  const { loading, playGame } = usePlayGame();
  return (
    <div className="list-casio">
      {loading ? (
        <>
          <SimpleBackdrop />
          <div className="casio-menu">
            <div className="list-casio-left">
              <h2>The time has come, go all out</h2>
              <Carousel
                additionalTransfrom={0}
                autoPlaySpeed={3000}
                centerMode={false}
                className="list-casio-left-item"
                containerClass="container-with-dots"
                dotListClass=""
                customLeftArrow={
                  <Image
                    src={"/image/icon-pre.png"}
                    width={30}
                    height={30}
                    alt=""
                  />
                }
                customRightArrow={
                  <Image
                    src={"/image/icon-next.png"}
                    width={30}
                    height={30}
                    alt=""
                  />
                }
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
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 2,
                    partialVisibilityGutter: 40,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0,
                    },
                    items: 2,
                    partialVisibilityGutter: 10,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 3,
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
                    src={"/images/custom_INR (12).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("A00070", "AG")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (13).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("SA0001", "SA")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (14).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("DG0013", "DG")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (15).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("DG0013", "DG")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
            <div className="list-casio-right">
              <Image
                src={"/images/model.png"}
                width={1000}
                height={1000}
                alt=""
              />
            </div>
          </div>
        </>
      ) : (
        <div className="casio-menu">
          <div className="list-casio-left">
            <h2>The time has come, go all out</h2>
            <Carousel
              additionalTransfrom={0}
              autoPlaySpeed={3000}
              centerMode={false}
              className="list-casio-left-item"
              containerClass="container-with-dots"
              dotListClass=""
              customLeftArrow={
                <Image
                  src={"/image/icon-pre.png"}
                  width={30}
                  height={30}
                  alt=""
                />
              }
              customRightArrow={
                <Image
                  src={"/image/icon-next.png"}
                  width={30}
                  height={30}
                  alt=""
                />
              }
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
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 2,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 2,
                  partialVisibilityGutter: 10,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 3,
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
                  src={"/images/custom_INR (12).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("JL0120", "JL")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (13).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("JL0079", "JL")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (14).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("JL0091", "JL")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (15).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("JL0075", "JL")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
          <div className="list-casio-right">
            <Image
              src={"/images/model.png"}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  );
}
