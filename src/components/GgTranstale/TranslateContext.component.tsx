import { useEffect } from "react";
import "./Translate.module.css";
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const TranslateGoogle: React.FC = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,vi,zh-CN",
        autoDisplay: false,
      },
      "google_translate_element"
    );

    // Đợi DOM render xong rồi chỉnh sửa và gắn sự kiện
    window.setTimeout(function () {
      const select = document.querySelector(
        "#google_translate_element select"
      ) as HTMLSelectElement;

      if (select) {
        // Đổi nhãn option đầu tiên
        select.options[0].text = "Select language";

        // Gắn sự kiện change để lưu ngôn ngữ
        select.addEventListener("change", (e: Event) => {
          const target = e.target as HTMLSelectElement;
          const selectedLang = target.value;
          console.log("Selected language:", selectedLang); // debug
          localStorage.setItem("language", selectedLang);
        });

        // Nếu có ngôn ngữ đã lưu thì set lại
        const savedLang = localStorage.getItem("language");
        if (savedLang) {
          select.value = savedLang;
          select.dispatchEvent(new Event("change")); // tự động apply lại
        }
      }
    }, 1000);
  };

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <>
      <div id="google_translate_element"></div>
    </>
  );
};

export default TranslateGoogle;
