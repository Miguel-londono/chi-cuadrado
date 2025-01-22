import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  return (
    <header
      id="header"
      className="sticky top-0 z-10 dark:bg-slate-950 bg-slate-300"
    >
      <section className="max-w-5xl sm:mx-auto flex items-center justify-between">
        {/* Texto del encabezado */}
        <h1 className="text-xl text-gray-800 dark:text-gray-200">
          <spam className="font-bold text-2xl">Chi-Cuadrado:</spam> La Herramienta Estadística para Decisiones
          Significativas
        </h1>
        {/* Botón de cambio de tema */}
        <div className="p-3">
          <ThemeToggleButton />
        </div>
      </section>
    </header>
  );
}
