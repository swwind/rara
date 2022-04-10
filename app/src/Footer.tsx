import Space from "./ui/Space";

import rokishi from "~/img/rokishi.webp";
import metadata from "~/metadata.json";
import { useContext } from "react";
import { LanguageContext, LanguageType } from "~/utils/context/language";

const options = [
  {
    language: "en-US",
    text: "English (US)",
    color: "deep-orange",
  },
  {
    language: "zh-CN",
    text: "简体中文",
    color: "blue",
  },
  {
    language: "ja-JP",
    text: "日本語",
    color: "pink",
  },
];

export default function Footer() {
  const { footer } = metadata;
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <footer className="rara-layout-footer">
      <div
        className="rara-layout-footer-content"
        style={{ backgroundImage: `url(${rokishi})` }}
      >
        <div className="rara-layout-footer-text">
          <Space
            direction="horizontal"
            className="rara-layout-footer-lang"
            gap={15}
            style={{ display: "inline-flex" }}
          >
            <span>🌎</span>
            {options.map((option) => (
              <span
                key={option.language}
                className={`rara-layout-footer-lang-select ${
                  option.language === language
                    ? "rara-layout-footer-lang-select-active"
                    : ""
                }`}
                style={
                  option.language === language
                    ? { color: `var(--color-${option.color})` }
                    : {}
                }
                onClick={() => setLanguage(option.language as LanguageType)}
              >
                {option.text}
              </span>
            ))}
          </Space>
          <div className="rara-layout-footer-copyright">
            {footer.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
