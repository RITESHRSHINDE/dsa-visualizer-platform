import React from 'react';

const ComplexityTable = ({ complexities }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl overflow-hidden mt-8">
      <div className="p-4 bg-gray-800/80 border-b border-gray-700">
        <h3 className="text-lg font-bold text-white">Theory & Complexity</h3>
      </div>
      <div className="p-6 text-gray-300 mb-4 text-sm leading-relaxed">
        {complexities.description}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="text-xs text-gray-500 uppercase bg-gray-900/50">
            <tr>
              <th scope="col" className="px-6 py-3">Metric</th>
              <th scope="col" className="px-6 py-3">Best Case</th>
              <th scope="col" className="px-6 py-3">Average Case</th>
              <th scope="col" className="px-6 py-3">Worst Case</th>
              <th scope="col" className="px-6 py-3">Space Complexity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-800/30 border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
              <td className="px-6 py-4 font-medium text-white whitespace-nowrap">Time / Space</td>
              <td className="px-6 py-4 text-green-400">{complexities.time.best}</td>
              <td className="px-6 py-4 text-yellow-400">{complexities.time.average}</td>
              <td className="px-6 py-4 text-red-400">{complexities.time.worst}</td>
              <td className="px-6 py-4 text-indigo-400">{complexities.space}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplexityTable;
