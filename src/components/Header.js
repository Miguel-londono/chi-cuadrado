import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import logoUD from "../assets/Universidad_distrital_Francisco_Jose_de_Caldas-logo-D1988258C8-seeklogo.com.png";
export default function Header() {
  return (
    <header
      id="header"
      className="sticky top-0 z-10 dark:bg-slate-950 bg-slate-300"
    >
      <section className="max-w-5xl sm:mx-auto flex items-center justify-between p-4">
        {/* Imagen al inicio del encabezado */}
        <img
          src={logoUD} // Cambia esto por la ruta correcta de tu imagen
          alt="Logo Chi-Cuadrado"
          className="h-16 w-16 object-contain" // Ajusta el tamaño según necesites
        />

        {/* Texto del encabezado */}
        <h1 className="text-xl text-gray-800 dark:text-gray-200 flex-1 ml-4">
          <span className="font-bold text-2xl">Chi-Cuadrado:</span> La Herramienta Estadística para Decisiones
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
