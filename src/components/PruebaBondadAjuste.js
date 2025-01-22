import React, { useState } from 'react';
import { jStat } from 'jstat';

function PruebaBondadAjuste() {
  const [data, setData] = useState([{ observed: '', expected: '' }]);
  const [chiSquare, setChiSquare] = useState(null);
  const [alpha, setAlpha] = useState(''); // Valor alpha inicial
  const [decision, setDecision] = useState('');
  const [criticalValue, setCriticalValue] = useState(null);

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

    setDecision(chi2 < critical ? 'No se rechaza H0' : 'Se rechaza H0');
  };

  return (
    <section className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Verificación de Hipótesis
      </h1>

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
            className="ml-2 border border-gray-300 dark:border-gray-600 p-2 rounded-lg dark:bg-gray-700 dark:text-gray-200"
          />
        </label>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600 mb-6">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 dark:border-gray-600 p-3">Frecuencia Observada</th>
            <th className="border border-gray-300 dark:border-gray-600 p-3">Frecuencia Esperada</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-700">
              <td className="border border-gray-300 dark:border-gray-600 p-3">
                <input
                  type="number"
                  value={row.observed}
                  onChange={(e) => handleInputChange(index, 'observed', e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              </td>
              <td className="border border-gray-300 dark:border-gray-600 p-3">
                <input
                  type="number"
                  value={row.expected}
                  onChange={(e) => handleInputChange(index, 'expected', e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddRow}
          className=" p-3 gap-3 transition ease-in-out hover:scale-[104%] hover:opacity-80 cursor-pointer dark:bg-slate-600 bg-slate-300 rounded-lg text-center"
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
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md w-full">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Resultados</h2>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Chi-Cuadrado:</strong> {chiSquare.toFixed(3)}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Valor Crítico (α = {alpha}):</strong> {criticalValue?.toFixed(3)}
          </p>
          <p className={`text-lg font-semibold ${decision === 'No se rechaza H0' ? 'text-green-600' : 'text-red-600'}`}>
            <strong>Decisión:</strong> {decision}
          </p>
        </div>
      )}
    </section>
  );
}

export default PruebaBondadAjuste;
