import React, { useState } from "react";
import PruebaBondadAjuste from "./PruebaBondadAjuste";
import PruebaHomogeneidad from "./PruebaHomogeneidad";
import PruebaIndependencia from "./PruebaIndependencia";

export default function Content() {
  const [selectComponent, setSelectedComponent] = useState("PruebaBondadAjuste");

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

  const getButtonClass = (component) => {
    const isActive = selectComponent === component;
    return `p-3 gap-3 transition ease-in-out hover:scale-[104%] hover:opacity-80 cursor-pointer rounded-lg text-center ${
      isActive
        ? "dark:bg-slate-800 bg-slate-500 text-white"
        : "dark:bg-slate-600 bg-slate-300"
    }`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Botones para seleccionar el componente */}
      <div className="p-5 flex gap-6 justify-center">
        <button
          className={getButtonClass("PruebaBondadAjuste")}
          onClick={() => handleButtonClick("PruebaBondadAjuste")}
        >
          Bondad de Ajuste
        </button>
        <button
          className={getButtonClass("PruebaHomogeneidad")}
          onClick={() => handleButtonClick("PruebaHomogeneidad")}
        >
          Homogeneidad
        </button>
        <button
          className={getButtonClass("PruebaIndependencia")}
          onClick={() => handleButtonClick("PruebaIndependencia")}
        >
          Independencia
        </button>
      </div>

      {/* Mostrar el componente seleccionado */}
      {selectComponent === "PruebaBondadAjuste" && <PruebaBondadAjuste />}
      {selectComponent === "PruebaHomogeneidad" && <PruebaHomogeneidad />}
      {selectComponent === "PruebaIndependencia" && <PruebaIndependencia />}
    </div>
  );
}

