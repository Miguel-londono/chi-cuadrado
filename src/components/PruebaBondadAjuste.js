import React, { useState } from 'react';
import { jStat } from 'jstat';

function PruebaBondadAjuste() {
  const [data, setData] = useState([{ observed: '', expected: '' }]);
  const [chiSquare, setChiSquare] = useState(null);
  const [alpha, setAlpha] = useState('');
  const [decision, setDecision] = useState('');
  const [criticalValue, setCriticalValue] = useState(null);
  const [pValue, setPValue] = useState(null);

  const handleAddRow = () => {
    setData([...data, { observed: '', expected: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const calculateChiSquare = () => {
    let chi2 = 0;
    data.forEach(({ observed, expected }) => {
      const obs = parseFloat(observed);
      const exp = parseFloat(expected);
      if (!isNaN(obs) && !isNaN(exp) && exp !== 0) {
        chi2 += Math.pow(obs - exp, 2) / exp;
      }
    });

    setChiSquare(chi2);
    const degreesOfFreedom = data.length - 1;
    const critical = jStat.chisquare.inv(1 - alpha, degreesOfFreedom);
    setCriticalValue(critical);

    const p = 1 - jStat.chisquare.cdf(chi2, degreesOfFreedom);
    setPValue(p);

    setDecision(p > alpha ? 'No se rechaza H0' : 'Se rechaza H0');
  };

  return (
    <section className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Verificación de Hipótesis</h1>

      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
          Valor de α (nivel de significancia):
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="ml-2 border border-gray-300 dark:border-gray-600 p-2 rounded-lg dark:bg-gray-700 dark:text-gray-200  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </label>
      </div>

      <table className="w-full text-left border border-gray-300 dark:border-gray-600 shadow-md overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          <tr>
            <th className="p-3 border border-gray-300 dark:border-gray-600">Frecuencia Observada</th>
            <th className="p-3 border border-gray-300 dark:border-gray-600">Frecuencia Esperada</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-700">
              <td className="p-3 border border-gray-300 dark:border-gray-600">
                <input
                  type="number"
                  value={row.observed}
                  onChange={(e) => handleInputChange(index, 'observed', e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </td>
              <td className="p-3 border border-gray-300 dark:border-gray-600">
                <input
                  type="number"
                  value={row.expected}
                  onChange={(e) => handleInputChange(index, 'expected', e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleAddRow}
          className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 shadow transition"
        >
          Añadir Fila
        </button>
        <button
          onClick={calculateChiSquare}
          className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-600 shadow transition"
        >
          Calcular
        </button>
      </div>

      {chiSquare !== null && (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full mt-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Resultados</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            <strong>Chi-Cuadrado:</strong> {chiSquare.toFixed(3)}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            <strong>Valor Crítico (α = {alpha}):</strong> {criticalValue?.toFixed(3)}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            <strong>P-valor:</strong> {pValue?.toFixed(6)}
          </p>
          <p className={`text-xl font-semibold mt-4 p-3 rounded-lg ${decision === 'No se rechaza H0' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
            <strong>Decisión:</strong> {decision}
          </p>
        </div>
      )}
    </section>
  );
}

export default PruebaBondadAjuste;