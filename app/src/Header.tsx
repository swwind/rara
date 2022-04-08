import { useContext } from "react";
import { ThemeContext } from "~/utils/context/theme";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className="rara-layout-header">
      <div className="rara-layout-header-container">
        <div>你所热爱的，就是你的生活</div>
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
