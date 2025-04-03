import { getPlayGameById } from "@/services/GameApi.service";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavigationGameComponent from "@/hook/NavigationGame";
import Carousel from "react-multi-carousel";
import swal from "sweetalert";

export default function General() {
  const [loading, setLoading] = useState(false);
  const playGame = async (code: string, id: string) => {
    setLoading(true);
    await getPlayGameById(code, id)
      .then((res: any) => {
        if (res.status === true) {
          NavigationGameComponent(res.data.playUrl);
        } else {
          swal("Login", "You are not logged in! please log in", "warning");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#0F192F",
        width: "100%",
        padding: {
          xs: 1.5,
          sm: 4.5,
        },
        borderRadius: "8px",
        marginTop: {
          xs: 15,
          sm: 20,
        },
      }}
    >
      <Grid container>
        <Grid container item xs={24} md={12}>
          <Typography variant="h5" sx={{ color: "white", padding: 2 }}>
            Gerneral
          </Typography>
        </Grid>
        <div className="your-rewards">
          <div className="title-rewards">
            <h4>Your Rewards</h4>
            <Link href={"/profile/account-promotion"}>View details</Link>
          </div>
          <div className="item-rewards">
            <div className="item-rewards-top">
              <h5>Beginner Bonus</h5>
              <p>0 USD</p>
            </div>
            <div className="progress"></div>
          </div>
          <div className="item-rewards">
            <div className="item-rewards-top">
              <h5>Cashback Bonus</h5>
              <p>0 USD</p>
            </div>
            <div className="progress"></div>
          </div>
          <div className="item-rewards">
            <div className="item-rewards-top">
              <h5>Tổng tiền thưởng</h5>
              <p>0 USD</p>
            </div>
            <div className="progress"></div>
          </div>
        </div>

        <div className="your-rewards" style={{ marginTop: 50 }}>
          <div className="title-rewards">
            <h4>Top Game Week</h4>
          </div>
          <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={3000}
            centerMode={false}
            className="list-game-profile"
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
                items: 2,
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
                src={"/images/PG0130.png"}
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
                src={"/images/PG0118.png"}
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
                src={"/images/PG0113.png"}
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
                src={"/images/PG0094.png"}
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
                src={"/images/PG0124.png"}
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
                src={"/images/PG0002.png"}
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
      </Grid>
    </Grid>
  );
}
