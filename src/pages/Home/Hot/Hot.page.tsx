import React, { useEffect, useState } from "react";
import "./Hot.css";
import Image from "next/image";
import { ThemeProvider } from "styled-components";
import { Box, Button } from "@mui/material";
import { getPlayGameById } from "@/services/GameApi.service";
import LoadingComponent from "@/components/Loading";
import NavigationGameComponent from "@/hook/NavigationGame";
import NumberCount from "@/components/NumberCount/NumberCount";
import swal from "sweetalert";
import usePlayGame from "@/hook/usePlayGame";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
export default function HotPage() {
  const { loading, playGame } = usePlayGame();
  return (
    <>
      {loading ? (
        <>
          <SimpleBackdrop />
          <div className="hot-game">
            <div className="title">
              <h1>Game Hot</h1>
              <div data-v-14b7bc38="" className="box-animation ">
                <Image
                  data-v-4b089deb=""
                  data-v-14b7bc38=""
                  loading="lazy"
                  src="/images/ot-icon.png"
                  alt="jackpot"
                  className="image  img-loaded lazy"
                  width={50}
                  height={30}
                />
              </div>
            </div>

            <div className="list-item">
              <div className="card">
                <Image
                  src={"/images/custom_INR (4).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("CMD049", "CMD")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>

              <div className="card">
                <Image
                  src={"/images/custom_INR (3).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("SB0001", "SB")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/techplay_numbersgame_tp_portrait.webp"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("CMD049", "CMD")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/2custom_INR (2).avif"}
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

              <div className="card-img">
                <Image
                  src={"/images/entrypoint-jackpot.png"}
                  width={376}
                  height={239}
                  alt=""
                />
                <NumberCount
                  classname="title-card"
                  numEnd={100000}
                  numStart={259685665}
                />
              </div>
            </div>
            <div className="website">
              <div className="list-item ">
                <div className="card">
                  <Image
                    src={"/images/custom_INR (2).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("R88012", "R88")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <Image
                    src={"/images/custom_INR (1).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("SEX001", "SEX")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (17).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("TCG_VNLOTT_01", "TCG_VNLOTT")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (27).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("KA0542", "KA")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (28).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("PG0105", "PG")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (25).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("JL0005", "JL")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mobile">
              <div className="list-item ">
                <div className="card">
                  <Image
                    src={"/images/custom_INR (2).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("R88012", "R88")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <Image
                    src={"/images/custom_INR (1).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("SEX001", "SEX")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (17).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("TCG_VNLOTT_01", "TCG_VNLOTT")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <Image
                    src={"/images/custom_INR (27).avif"}
                    className="img"
                    width={180}
                    height={260}
                    alt=""
                  />
                  <div className="textBox-container">
                    <div className="textBox">
                      <button
                        className="textBox-btn"
                        onClick={() => playGame("KA0542", "KA")}
                      >
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="hot-game">
          <div className="title">
            <h1>Game Hot</h1>
            <div data-v-14b7bc38="" className="box-animation ">
              <Image
                data-v-4b089deb=""
                data-v-14b7bc38=""
                loading="lazy"
                src="/images/ot-icon.png"
                alt="jackpot"
                className="image  img-loaded lazy"
                width={50}
                height={30}
              />
            </div>
          </div>

          <div className="list-item">
            <div className="card">
              <Image
                src={"/images/custom_INR (4).avif"}
                className="img"
                width={180}
                height={260}
                alt=""
              />
              <div className="textBox-container">
                <div className="textBox">
                  <button
                    className="textBox-btn"
                    onClick={() => playGame("CMD049", "CMD")}
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <Image
                src={"/images/custom_INR.avif"}
                className="img"
                width={180}
                height={260}
                alt=""
              />
              <div className="textBox-container">
                <div className="textBox">
                  <button
                    className="textBox-btn"
                    onClick={() => playGame("SEX001", "SEX")}
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
            <div className="card">
              <Image
                src={"/images/techplay_numbersgame_tp_portrait.webp"}
                className="img"
                width={180}
                height={260}
                alt=""
              />
              <div className="textBox-container">
                <div className="textBox">
                  <button
                    className="textBox-btn"
                    onClick={() => playGame("TCG_VNLOTT_01", "TCG_VNLOTT")}
                  >
                    Play
                  </button>
                </div>
              </div>
            </div>
            <div className="card">
              <Image
                src={"/images/2custom_INR (2).avif"}
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

            <div className="card-img">
              <Image
                src={"/images/entrypoint-jackpot.png"}
                width={376}
                height={239}
                alt=""
              />
              <NumberCount
                classname="title-card"
                numEnd={100000}
                numStart={259685665}
              />
            </div>
          </div>
          <div className="website">
            <div className="list-item ">
              <div className="card">
                <Image
                  src={"/images/custom_INR5.avif"}
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
                  src={"/images/custom_INR (1).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("WM0001", "WM")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (17).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("JL0083", "JL")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (27).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("KA0542", "KA")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (28).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("PG0105", "PG")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (25).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("JL0005", "JL")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mobile">
            <div className="list-item ">
              <div className="card">
                <Image
                  src={"/images/custom_INR5.avif"}
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
                  src={"/images/custom_INR (1).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("WM0001", "WM")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (17).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("JL0083", "JL")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <Image
                  src={"/images/custom_INR (27).avif"}
                  className="img"
                  width={180}
                  height={260}
                  alt=""
                />
                <div className="textBox-container">
                  <div className="textBox">
                    <button
                      className="textBox-btn"
                      onClick={() => playGame("KA0542", "KA")}
                    >
                      Play
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
