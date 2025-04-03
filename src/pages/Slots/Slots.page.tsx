"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import usePlayGame from "@/hook/usePlayGame";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import {
  Box,
  Typography,
  Button,
  Pagination,
  Tooltip,
  IconButton,
} from "@mui/material";
import { getListGame } from "@/services/GameApi.service";
import { GameSlotsMenu } from "@/datafake/Menu";
import SlotsGameItemPage from "./SlotsGameItem.page";

export default function SlotsPage() {
  const { loading, playGame } = usePlayGame();
  const [load, setLoad] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [GameType, setGameType] = useState<string>("RNG");
  const [ProductType, setProductType] = useState<string>("JL");

  return (
    <>
      {loading || load || isPageLoading ? (
        <>
          <SimpleBackdrop />
        </>
      ) : (
        <Box
          sx={{
            width: {
              xs: "98%",
              sm: "80%",
            },
            margin: "auto",
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: {
              xs: 80,
              sm: 2,
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "30px",
              height: 50,
              textAlign: {
                xs: "center",
                sm: "left",
              },
            }}
          >
            Slot Game
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              flexWrap: "nowrap",
              overflowX: "auto",
              padding: "30px",
              gap: "10px",
              justifyContent: { xs: "flex-start", sm: "center" },
              WebkitOverflowScrolling: "touch", // Giữ trải nghiệm cuộn mượt mà trên iOS
              "&::-webkit-scrollbar": {
                display: "none", // Ẩn scrollbar trên Webkit (bao gồm iOS)
              },
              "-ms-overflow-style": "none", // Ẩn scrollbar trên IE và Edge
              "scrollbar-width": "none", // Ẩn scrollbar trên Firefox
            }}
          >
            {GameSlotsMenu.map((item) => (
              <Button
                onClick={() => {
                  setGameType(item.gameType);
                  setProductType(item.productType);
                }}
                sx={{
                  display: "flex",
                  minWidth: "100px",
                  maxWidth: "200px",
                  flexShrink: 0,
                  background: "#353D50",
                  color: "white",
                  gap: "5px",
                  fontSize: { xs: "12px", sm: "14px" },
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    background: "#353D50",
                  },
                }}
                key={item.id}
              >
                {item.icon}
                {item.title}
              </Button>
            ))}
          </Box>

          <SlotsGameItemPage GameType={GameType} ProductType={ProductType} />
        </Box>
      )}
    </>
  );
}
