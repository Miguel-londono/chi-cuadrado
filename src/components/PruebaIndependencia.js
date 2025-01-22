import React, { useState } from "react";
import { jStat } from "jstat";

export default function PruebaIndependencia() {
  const [data, setData] = useState([
    { row: "Categoría 1", values: ["", ""], total: 0 },
    { row: "Categoría 2", values: ["", ""], total: 0 },
  ]);
  const [columnTotals, setColumnTotals] = useState(["", "", 0]); // 2 columnas + total general
  const [alpha, setAlpha] = useState(0.05);
  const [result, setResult] = useState(null);

  // Actualizar una celda específica
  const handleInputChange = (rowIndex, colIndex, value) => {
    const newData = [...data];
    const numericValue = value === "" ? "" : parseFloat(value) || 0;

    // Actualizar el valor observado
    newData[rowIndex].values[colIndex] = numericValue;
    // Recalcular el total de la fila
    newData[rowIndex].total = newData[rowIndex].values.reduce(
      (a, b) => a + (parseFloat(b) || 0),
      0
    );
    setData(newData);

    // Recalcular los totales de las columnas
    const newColumnTotals = Array(newData[0].values.length).fill(0);
    newData.forEach((row) => {
      row.values.forEach((val, index) => {
        newColumnTotals[index] += parseFloat(val) || 0;
      });
    });
    const grandTotal = newColumnTotals.reduce((a, b) => a + b, 0);
    setColumnTotals([...newColumnTotals, grandTotal]);
  };

  // Agregar una nueva fila
  const addRow = () => {
    const newData = [
      ...data,
      { row: `Categoría ${data.length + 1}`, values: Array(columnTotals.length - 1).fill(""), total: 0 },
    ];
    setData(newData);
  };

  // Agregar una nueva columna
  const addColumn = () => {
    const newData = data.map((row) => ({
      ...row,
      values: [...row.values, ""],
    }));
    setData(newData);
    setColumnTotals([...columnTotals.slice(0, -1), "", columnTotals[columnTotals.length - 1]]);
  };

  // Calcular el estadístico chi-cuadrado
  const calculateChiSquare = () => {
    const total = columnTotals[columnTotals.length - 1];
    const expectedValues = data.map((row) =>
      row.values.map((_, colIndex) =>
        row.total * (parseFloat(columnTotals[colIndex]) || 0) / total
      )
    );

    let chiSquare = 0;
    data.forEach((row, rowIndex) => {
      row.values.forEach((observed, colIndex) => {
        const expected = expectedValues[rowIndex][colIndex];
        if (observed !== "" && expected !== 0) {
          chiSquare += Math.pow(parseFloat(observed) - expected, 2) / expected;
        }
      });
    });

    const degreesOfFreedom =
      (data.length - 1) * (columnTotals.length - 2); // Fórmula: (filas - 1) * (columnas - 1)
    const criticalValue = jStat.chisquare.inv(1 - alpha, degreesOfFreedom);

    setResult({
      chiSquare,
      criticalValue,
      decision:
        chiSquare > criticalValue
          ? "Se rechaza H0 (existe relación significativa)"
          : "No se rechaza H0 (no existe relación significativa)",
    });
  };

  return (
    <section className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Prueba de Independencia
      </h1>

      {/* Configuración del nivel de significancia */}
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Nivel de significancia (α):
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="ml-2 border border-gray-300 dark:border-gray-600 p-2 rounded-lg dark:bg-gray-700 dark:text-gray-200"
          />
        </label>
      </div>

      {/* Tabla de datos observados */}
      <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600 mb-6">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 dark:border-gray-600 p-3">Categoría</th>
            {columnTotals.slice(0, -1).map((_, colIndex) => (
              <th key={colIndex} className="border border-gray-300 dark:border-gray-600 p-3">
                Columna {colIndex + 1}
              </th>
            ))}
            <th className="border border-gray-300 dark:border-gray-600 p-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-700">
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{row.row}</td>
              {row.values.map((value, colIndex) => (
                <td key={colIndex} className="border border-gray-300 dark:border-gray-600 p-3 text-center">
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                  />
                </td>
              ))}
              <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">{row.total}</td>
            </tr>
          ))}
          <tr className="bg-gray-200 dark:bg-gray-700">
            <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">Total</td>
            {columnTotals.slice(0, -1).map((total, index) => (
              <td key={index} className="border border-gray-300 dark:border-gray-600 p-3 text-center">
                {total}
              </td>
            ))}
            <td className="border border-gray-300 dark:border-gray-600 p-3 text-center">
              {columnTotals[columnTotals.length - 1]}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Botones para agregar filas y columnas */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow transition"
        >
          Agregar Fila
        </button>
        <button
          onClick={addColumn}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow transition"
        >
          Agregar Columna
        </button>
        <button
          onClick={calculateChiSquare}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow transition"
        >
          Calcular
        </button>
      </div>

      {/* Resultados */}
      {result && (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-full">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
            Resultados
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Chi-Cuadrado:</strong> {result.chiSquare.toFixed(3)}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Valor Crítico:</strong> {result.criticalValue.toFixed(3)}
          </p>
          <p
            className={`text-lg font-semibold ${
              result.decision.includes("rechaza")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            <strong>Decisión:</strong> {result.decision}
          </p>
        </div>
      )}
    </section>
  );
}
