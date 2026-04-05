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

// Helper to pause execution
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const complexities = {
    description: "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order. This algorithm is not suitable for large data sets as its average and worst case time complexity is quite high.",
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)"
};

const BubbleSort = () => {
    const dispatch = useDispatch();
    const { array, isPlaying, speed, status } = useSelector(state => state.visualizer);
    
    // Using refs to access latest state inside async loop without re-triggering effect
    const isPlayingRef = useRef(isPlaying);
    const speedRef = useRef(speed);
    
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    const generateArray = (customArray = null) => {
        if (customArray) {
            dispatch(setArray(customArray.map(val => ({
                id: `id_${Math.random()}`,
                value: val,
                status: 'default'
            }))));
            return;
        }
        const newArr = [];
        for (let i = 0; i < 20; i++) {
            newArr.push({
                id: `id_${Math.random()}`,
                value: Math.floor(Math.random() * 100) + 10,
                status: 'default', // 'default', 'comparing', 'sorted'
            });
        }
        dispatch(setArray(newArr));
    };

    useEffect(() => {
        if (array.length === 0) generateArray();
        return () => { dispatch(resetVisualizer()); };
    }, []);

    const runSort = async () => {
        dispatch(setStatus('running'));
        const arrLen = array.length;
        let localArray = JSON.parse(JSON.stringify(array));

        for (let i = 0; i < arrLen - 1; i++) {
            for (let j = 0; j < arrLen - i - 1; j++) {
                if (!isPlayingRef.current) {
                    dispatch(setStatus('paused'));
                    return; // Pause execution
                }
                
                // Highlight comparing
                dispatch(updateItemStatus({ index: j, status: 'comparing' }));
                dispatch(updateItemStatus({ index: j + 1, status: 'comparing' }));
                await sleep(speedRef.current);

                if (localArray[j].value > localArray[j + 1].value) {
                    // Swap locally to keep track of true order
                    let temp = localArray[j];
                    localArray[j] = localArray[j+1];
                    localArray[j+1] = temp;
                    // Dispatch swap for UI
                    dispatch(swapElements({ idx1: j, idx2: j + 1 }));
                    await sleep(speedRef.current);
                }

                if (!isPlayingRef.current) {
                    dispatch(updateItemStatus({ index: j, status: 'default' }));
                    dispatch(updateItemStatus({ index: j + 1, status: 'default' }));
                    dispatch(setStatus('paused'));
                    return;
                }

                // Reset status
                dispatch(updateItemStatus({ index: j, status: 'default' }));
                dispatch(updateItemStatus({ index: j + 1, status: 'default' }));
            }
            // Mark last element as sorted
            dispatch(updateItemStatus({ index: arrLen - i - 1, status: 'sorted' }));
        }
        dispatch(updateItemStatus({ index: 0, status: 'sorted' }));
        dispatch(setStatus('completed'));
        dispatch(setIsPlaying(false));
    };

    useEffect(() => {
        if (isPlaying && status !== 'completed') {
            runSort();
        }
    }, [isPlaying]);

    useEffect(() => {
       if(status === 'idle' && array.length > 0 && array[0].status === 'sorted'){
           generateArray();
       }
    }, [status]);


    return (
        <div className="max-w-6xl mx-auto flex flex-col h-full space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Bubble Sort</h1>
                <p className="text-gray-400 text-sm">Visualize how the largest elements "bubble" to the top.</p>
            </header>

            <DataInputBar onGenerateRandom={generateArray} />
            <ControlBar />

            <div className="flex-1 min-h-[300px] bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-end justify-center gap-1 md:gap-2 shadow-inner relative overflow-hidden">
                <AnimatePresence>
                    {array.map((item, index) => {
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
                                <motion.span layout="position" className="text-white/90 drop-shadow-md hidden md:block">
                                   {item.value}
                                </motion.span>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <ComplexityTable complexities={complexities} />
        </div>
    );
};

export default BubbleSort;
