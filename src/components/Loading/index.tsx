import React from "react";
import "./loading.css";
import Image from "next/image";

export default function LoadingComponent() {
  return (
    <div className="container-loading">
      <div className="item">
        <div className="banner-loading">
          <Image
            src={"/images/photo_2025-06-18_16-37-52-removebg-preview.png"}
            width="100"
            height={100}
            alt=""
            style={{
              objectFit: "contain",
              width: "80px",
              height: "80px",
            }}
          />
        </div>
        {/* <Image
          src={"/images/openart-1bd95ea5-a202-4491-b723-436d1d59311f.png"}
          width={180}
          height={80}
          alt=""
        /> */}
        <div className="loader"></div>
      </div>
    </div>
  );
}
