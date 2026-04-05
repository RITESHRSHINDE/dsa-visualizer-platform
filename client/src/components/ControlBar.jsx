import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsPlaying, setSpeed, resetVisualizer } from '../store/visualizerSlice';

const ControlBar = () => {
  const dispatch = useDispatch();
  const { isPlaying, speed, status } = useSelector(state => state.visualizer);

  const isCompleted = status === 'completed';

  const handlePlayPause = () => {
    if (isCompleted) {
        dispatch(resetVisualizer());
    }
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleReset = () => {
    dispatch(resetVisualizer());
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 border border-gray-700 shadow-xl">
      <div className="flex items-center gap-4">
        <button 
          onClick={handlePlayPause}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          {isPlaying ? <Pause size={20} className="fill-current" /> : (isCompleted ? <RotateCcw size={20} /> : <Play size={20} className="fill-current ml-1" />)}
        </button>
        <button 
          onClick={handleReset}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 transition-all active:scale-95"
          disabled={isPlaying}
        >
          <RotateCcw size={18} />
        </button>
      </div>
      
      <div className="flex-1 w-full md:max-w-md">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Animation Speed</label>
          <span className="text-sm font-medium text-gray-300">{speed}ms</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="500" 
          step="10"
          value={speed}
          onChange={(e) => dispatch(setSpeed(Number(e.target.value)))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          disabled={isPlaying}
        />
      </div>
      
      <div className="ml-auto hidden md:flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-xl">
        <span className="flex items-center gap-2 text-xs text-gray-400"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> Default</span>
        <span className="flex items-center gap-2 text-xs text-gray-400"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Comparing</span>
        <span className="flex items-center gap-2 text-xs text-gray-400"><div className="w-3 h-3 rounded-full bg-green-500"></div> Sorted</span>
      </div>
    </div>
  );
};

export default ControlBar;
