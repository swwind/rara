import Space from "./ui/Space";

import rokishi from "~/img/rokishi.webp";
import metadata from "~/metadata.json";
import { useContext } from "react";
import { LanguageContext, LanguageType } from "~/utils/context/language";

const options = [
  {
    language: "en",
    text: "English",
  },
  {
    language: "zh-CN",
    text: "简体中文",
  },
  {
    language: "ja-JP",
    text: "日本語",
  },
];

export default function Footer() {
  const { footer } = metadata;
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <footer className="rara-footer">
      <div
        className="rara-footer-content"
        style={{ backgroundImage: `url(${rokishi})` }}
      >
        <div className="rara-footer-text">
          <Space
            direction="horizontal"
            className="rara-footer-lang"
            gap={15}
            style={{ display: "inline-flex" }}
          >
            <span>🌎</span>
            {options.map((option) => (
              <span
                key={option.language}
                className={`rara-footer-lang-select ${
                  option.language === language
                    ? "rara-footer-lang-select-active"
                    : ""
                }`}
                onClick={() => setLanguage(option.language as LanguageType)}
              >
                {option.text}
              </span>
            ))}
          </Space>
          <div className="rara-footer-copyright">
            {footer.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}