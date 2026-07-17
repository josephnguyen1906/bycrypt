"use client";

import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef, useState } from "react";
import {
  IDepositMethod,
  IFinaceBalace,
  IWithdrawHistory,
} from "@/shared/interfaces";
import {
  getDepositMethod,
  getFinaceBalance,
  getListNewDetail,
  getWithdrawHistory,
  sellCoins,
  topUpCoins,
} from "@/services/User.service";
import { toast } from "react-toastify";
import LoadingComponent from "@/components/Loading";
import { useTranslation } from "react-i18next";
import Image from "next/image";

interface INews {
  id: number;
  content: string;
  title: string;
  coverImage: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export default function NewDetailPage() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<INews | null>(null);
  const router = useRouter();
  const params = useParams();
  console.log("params", params);

  const fetchDetail = async () => {
    if (params) {
      const id: any = params.id ?? "";
      const res = await getListNewDetail(id);
      if (res.status) {
        setData(res.data);
      }
    }
  };
  useEffect(() => {
    fetchDetail();
  }, [params]);

  return (
    <>
      <Box
        sx={{
          background: "#0b1727",
          minHeight: "100vh",
          maxWidth: "448px",
          margin: "auto",
          color: "white",
          pb: "120px",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
          p={2}
        >
          <IconButton onClick={() => router.back()}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>

          <Typography fontSize={20} fontWeight={600}>
            {t("HomePage.menu4")}
          </Typography>
          <IconButton></IconButton>
        </Box>
        <Box
          sx={{
            width: "100%",
            background: "white",
            padding: "10px",
            borderRadius: "15px 15px 0px 0px ",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#065f46",
            }}
          >
            {data?.title}
          </Typography>
          <Image
            src={data?.coverImage ?? ""}
            width={342}
            height={228}
            alt=""
            style={{
              height: "228px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <Box
            sx={{ color: "#000", pt: "10px" }}
            dangerouslySetInnerHTML={{
              __html: data?.content || "",
            }}
          />
        </Box>
      </Box>
    </>
  );
}
