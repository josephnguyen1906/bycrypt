import { contentInstance } from "@/configs/CustomizeAxios";

export type LoanConfig = {
  enabled: boolean;
  min_amount: string;
  max_amount: string;
  duration_days: number;
  daily_interest_rate: string;
  daily_interest_rate_percent: string;
  lender_name: string;
  sample_interest_amount: string;
  sample_repay_amount: string;
  can_apply: boolean;
  cannot_apply_reason: string | null;
  currency: string;
};

export type LoanItem = {
  id: number;
  user_id: number;
  username: string;
  amount: string;
  currency: string;
  duration_days: number;
  daily_interest_rate: string;
  lender_name: string;
  interest_amount: string;
  repay_amount: string;
  status: string;
  note: string | null;
  img_front: string | null;
  img_back: string | null;
  approved_at: string | null;
  due_at: string | null;
  repaid_at: string | null;
  created_at: string | null;
};

export const getLoanConfig = () => {
  return contentInstance.get<{ status: boolean; data: LoanConfig }>(
    "/api/finance/loan/config",
  );
};

export const submitLoan = (formData: FormData) => {
  return contentInstance.post("/api/finance/loan", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getLoanHistory = (status?: string) => {
  const qs = status && status !== "all" ? `?status=${status}` : "";
  return contentInstance.get<{ status: boolean; data: LoanItem[] }>(
    `/api/finance/loan/history${qs}`,
  );
};

export const getLoanDetail = (id: string | number) => {
  return contentInstance.get<{ status: boolean; data: LoanItem }>(
    `/api/finance/loan/${id}`,
  );
};

export function calcLoanPreview(
  amount: number,
  dailyRate: number,
  days: number,
): { interest: number; repay: number } {
  const interest = Math.round(amount * dailyRate * days * 1e8) / 1e8;
  const repay = Math.round((amount + interest) * 1e8) / 1e8;
  return { interest, repay };
}
