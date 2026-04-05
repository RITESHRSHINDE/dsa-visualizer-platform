import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  setArray, 
  updateItemStatus, 
  swapElements, 
  setStatus,
  setIsPlaying,
  resetVisualizer 
} from '../../store/visualizerSlice';
import ControlBar from '../../components/ControlBar';
import ComplexityTable from '../../components/ComplexityTable';
import DataInputBar from '../../components/DataInputBar';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const complexities = {
    description: "Selection Sort works by repeatedly finding the minimum element from the unsorted part and putting it at the beginning. It maintains two subarrays in a given array: the subarray which is already sorted, and the remaining subarray which is unsorted.",
    time: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)"
};

const SelectionSort = () => {
    const dispatch = useDispatch();
    const { array, isPlaying, speed, status } = useSelector(state => state.visualizer);
    
    const isPlayingRef = useRef(isPlaying);
    const speedRef = useRef(speed);
    
    useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
    useEffect(() => { speedRef.current = speed; }, [speed]);

    const generateArray = () => {
        const newArr = Array.from({ length: 20 }, () => ({
            id: `id_${Math.random()}`,
            value: Math.floor(Math.random() * 100) + 10,
            status: 'default'
        }));
        dispatch(setArray(newArr));
    };

    useEffect(() => {
        if (array.length === 0) generateArray();
        return () => { dispatch(resetVisualizer()); };
    }, []);

    const runSort = async () => {
        dispatch(setStatus('running'));
        const n = array.length;
        let localArray = JSON.parse(JSON.stringify(array));

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            dispatch(updateItemStatus({ index: minIdx, status: 'comparing' })); // Highlight current min

            for (let j = i + 1; j < n; j++) {
                if (!isPlayingRef.current) return dispatch(setStatus('paused'));
                
                dispatch(updateItemStatus({ index: j, status: 'comparing' }));
                await sleep(speedRef.current);

                if (localArray[j].value < localArray[minIdx].value) {
                    dispatch(updateItemStatus({ index: minIdx, status: 'default' })); // Un-highlight old min
                    minIdx = j;
                    dispatch(updateItemStatus({ index: minIdx, status: 'comparing' })); // Highlight new min
                } else {
                    dispatch(updateItemStatus({ index: j, status: 'default' }));
                }
            }

            if (!isPlayingRef.current) return dispatch(setStatus('paused'));

            if (minIdx !== i) {
                // Swap locally
                let temp = localArray[minIdx];
                localArray[minIdx] = localArray[i];
                localArray[i] = temp;
                
                dispatch(swapElements({ idx1: minIdx, idx2: i }));
                await sleep(speedRef.current);
            }
            
            // Mark the sorted boundary
            dispatch(updateItemStatus({ index: i, status: 'sorted' }));
            if (minIdx !== i) dispatch(updateItemStatus({ index: minIdx, status: 'default' }));
        }
        dispatch(updateItemStatus({ index: n - 1, status: 'sorted' }));
        dispatch(setStatus('completed'));
        dispatch(setIsPlaying(false));
    };

    useEffect(() => {
        if (isPlaying && status !== 'completed') runSort();
    }, [isPlaying]);

    useEffect(() => {
       if(status === 'idle' && array.length > 0 && array[0].status === 'sorted') generateArray();
    }, [status]);


    return (
        <div className="max-w-6xl mx-auto flex flex-col h-full space-y-4">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Selection Sort</h1>
                <p className="text-gray-400 text-sm">Visualize finding the smallest element incrementally.</p>
            </header>

            <DataInputBar onGenerateRandom={generateArray} />
            <ControlBar />

            <div className="flex-1 min-h-[300px] bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-end justify-center gap-1 md:gap-2 shadow-inner relative overflow-hidden">
                <AnimatePresence>
                    {array.map((item) => {
                        let bgColor = 'bg-indigo-500';
                        if (item.status === 'comparing') bgColor = 'bg-yellow-400';
                        if (item.status === 'sorted') bgColor = 'bg-green-500';

                        return (
                            <motion.div
                                key={item.id}
                                layout
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className={`w-8 md:w-12 rounded-t-md flex flex-col justify-end items-center text-xs pb-2 font-medium shadow-lg ${bgColor}`}
                                style={{ height: `${item.value}%` }}
                            >
                                <motion.span layout="position" className="text-white/90 drop-shadow-md hidden md:block">{item.value}</motion.span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <ComplexityTable complexities={complexities} />
        </div>
    );
};

export default SelectionSort;
