import React from "react";
import { Box } from "@mui/material";

type CustomizedDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function MiniGameIframeComponent({
  open,
  onClose,
}: CustomizedDialogProps) {
  if (!open) return null;

  const handleBackdropClick = (event: React.MouseEvent) => {
    onClose();
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent clicks inside iframe container from closing the popup
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        background: "transparent",
      }}
      onClick={handleBackdropClick}
    >
      <Box
        sx={{
          width: "400px",
          height: "300px",
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          background: "none",
        }}
        onClick={handleContentClick}
      >
        <embed
          src="https://client.akhcnehalke.com/?username=kadiesm&password=vu123123"
          width="100%"
          height="300px"
          style={{ border: "none", backgroundColor: "none" }}
        ></embed>
      </Box>
    </Box>
  );
}
