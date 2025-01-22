import React, { useEffect, useState } from "react";

export default function ThemeToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Carga el estado inicial desde localStorage o establece el tema claro como predeterminado
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      id="themeToggle"
      onClick={toggleTheme}
      className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Icono del Sol (tema claro) */}
      <svg
        id="sunIcon"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 text-yellow-500 ${isDarkMode ? "hidden" : "block"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.343 17.657l-1.414-1.414m12.728 0l-1.414 1.414M6.343 6.343L4.93 4.93M12 8a4 4 0 100 8 4 4 0 000-8z"
        ></path>
      </svg>

      {/* Icono de la Luna (tema oscuro) */}
      <svg
        id="moonIcon"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 text-blue-500 ${isDarkMode ? "block" : "hidden"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293a8 8 0 11-10.586-10.586A7 7 0 1017.293 13.293z"></path>
      </svg>
    </button>
  );
}
