import { contentInstance } from "@/configs/CustomizeAxios";

// lấy lịch sử cá cược
const getBettingHistory = (
  page: number,
  limit: number,
  from: string,
  to: string
) => {
  return contentInstance.get(
    `/api/game/history?page=${page}&limit=${limit}&from=${from}&to=${to}`
  );
};

// get lịch sử giao dịch
const getTransactionHistory = (
  page: number,
  limit: number,
  from: string,
  to: string
) => {
  return contentInstance.get(
    `/api/payment/history?page=${page}&limit=${limit}&from=${from}&to=${to}`
  );
};

// Lấy tài khoản ngân hàng nạp tiền của admin
const getListBankPayment = () => {
  return contentInstance.get("/api/payment/getListManualBank");
};

// Lấy tất cả tài khoản của user
const getListUserBank = () => {
  return contentInstance.get("/api/payment/getListUserBank");
};

// Lấy tất cả danh sách Ngân hàng
const getListAllBank = () => {
  return contentInstance.get("/api/payment/getListBankDeposit");
};

// Tạo QR bank nộp tiền
const createQRBank = (bank: string, amountDeposit: number) => {
  return contentInstance.post("/api/payment/createRequestQR", {
    bank,
    amountDeposit,
  });
};

// add tài khoảng ngân hàng
const addBankUser = (
  bankProvide: string,
  bankName: string,
  bankNumber: string,
  bankBranch: string
) => {
  return contentInstance.post("/api/payment/userAddBank", {
    bankProvide,
    bankName,
    bankNumber,
    bankBranch,
  });
};

// api rút tiền
const withdrawalsUser = (
  bankName: string,
  bankNumber: string,
  bankProvide: string,
  amount: number,
  passwd: string
) => {
  return contentInstance.post("/api/payment/createRequestWithdraw", {
    bankProvide,
    bankName,
    bankNumber,
    amount,
    passwd,
  });
};
export {
  getBettingHistory,
  getTransactionHistory,
  withdrawalsUser,
  addBankUser,
  createQRBank,
  getListAllBank,
  getListBankPayment,
  getListUserBank,
};
