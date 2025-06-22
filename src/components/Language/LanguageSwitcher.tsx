"use client";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    // Lưu vào localStorage (nếu cần lưu trạng thái)
    localStorage.setItem("lang", lang);
  };

  return (
    <ul style={{ padding: "10px" }}>
      <li
        style={{ width: "100px", cursor: "pointer", padding: "5px 0" }}
        onClick={() => changeLanguage("en")}
        value="en"
      >
        English
      </li>
      <li
        style={{ width: "100px", cursor: "pointer", padding: "5px 0" }}
        onClick={() => changeLanguage("vi")}
      >
        Việt Nam
      </li>
      <li
        style={{ width: "100px", cursor: "pointer", padding: "5px 0" }}
        onClick={() => changeLanguage("zh")}
      >
        简体中文
      </li>
    </ul>
  );
};

export default LanguageSwitcher;
