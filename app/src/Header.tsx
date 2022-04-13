import { useContext } from "react";
import { ThemeContext } from "~/utils/context/theme";

import metadata from "~/metadata.json";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className="rara-layout-header">
      <div className="rara-layout-header-container">
        <div>{metadata.header}</div>
        <div>
          <span
            className="rara-layout-header-theme-switch"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌞" : "🌚"}
          </span>
        </div>
      </div>
    </header>
  );
}
