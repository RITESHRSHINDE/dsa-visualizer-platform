import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, RotateCcw } from 'lucide-react';
import { setArray, resetVisualizer } from '../store/visualizerSlice';

const DataInputBar = ({ onGenerateRandom }) => {
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { isPlaying } = useSelector(state => state.visualizer);

  const handleCustomInput = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    // Parse values
    const rawValues = inputVal.split(',').map(v => v.trim());
    const newArray = [];
    
    for (let val of rawValues) {
      if (val === '') continue;
      const parsed = parseInt(val, 10);
      if (isNaN(parsed) || parsed < 1 || parsed > 100) {
        setError('Please enter valid integers between 1 and 100.');
        return;
      }
      newArray.push({
        id: `id_${Math.random()}`,
        value: parsed,
        status: 'default'
      });
    }

    if (newArray.length === 0) {
      setError('Please enter at least one number.');
      return;
    }
    
    if (newArray.length > 50) {
      setError('A maximum of 50 elements is supported.');
      return;
    }

    setError('');
    dispatch(resetVisualizer());
    dispatch(setArray(newArray));
    setInputVal('');
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/80 rounded-2xl p-4 shadow-xl mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <form onSubmit={handleCustomInput} className="flex-1 flex items-start flex-col gap-2">
            <div className="flex items-center w-full gap-2 relative">
                <input 
                type="text" 
                value={inputVal}
                onChange={(e) => {
                    setInputVal(e.target.value);
                    if(error) setError('');
                }}
                disabled={isPlaying}
                placeholder="Custom Array (e.g. 45, 12, 89, 33)"
                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                />
                <button 
                type="submit" 
                disabled={isPlaying || !inputVal.trim()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all shadow-lg"
                >
                Load
                </button>
            </div>
            {error && <span className="text-red-400 text-xs font-semibold px-2">{error}</span>}
        </form>

        <div className="h-10 w-px bg-gray-700 hidden md:block mx-4"></div>

        <button 
          onClick={() => {
              if (error) setError('');
              onGenerateRandom();
          }}
          disabled={isPlaying}
          className="px-6 py-3 bg-gray-700 border border-gray-600 hover:bg-gray-600 disabled:opacity-50 text-gray-200 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} /> Randomize Array
        </button>

      </div>
    </div>
  );
};

export default DataInputBar;
