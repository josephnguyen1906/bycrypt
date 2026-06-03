import { Dialog, DialogContent, Typography, Button, Box } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function WithdrawTimeDialog({ open, onClose }: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#161d2bff",
          borderRadius: 3,
          border: "1px solid rgba(59,130,246,.25)",
          boxShadow: "0 0 30px rgba(59, 131, 246, 0)",
        },
      }}
    >
      <DialogContent
        sx={{
          textAlign: "center",
          py: 4,
        }}
      >
        <Box
          sx={{
            width: 70,
            height: 70,
            mx: "auto",
            mb: 2,
            borderRadius: "50%",
            bgcolor: "rgba(59,130,246,.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
          }}
        >
          ⏰
        </Box>

        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 22,
            mb: 2,
          }}
        >
          Tạm dừng rút tiền
        </Typography>

        <Typography
          sx={{
            color: "#94a3b8",
            lineHeight: 1.8,
            mb: 3,
          }}
        >
          Đã hết thời gian rút tiền.
          <br />
          Thời gian hỗ trợ rút tiền từ
          <Typography
            sx={{
              color: "#60a5fa",
              fontWeight: 700,
              ml: 0.5,
            }}
          >
            12:00 - 00:00
          </Typography>
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            height: 46,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",

            background: "linear-gradient(90deg,#2563eb,#3b82f6)",

            "&:hover": {
              background: "linear-gradient(90deg,#1d4ed8,#2563eb)",
            },
          }}
        >
          Tôi đã hiểu
        </Button>
      </DialogContent>
    </Dialog>
  );
}
