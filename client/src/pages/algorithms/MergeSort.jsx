import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  setArray, 
  updateItemStatus, 
  setStatus,
  setIsPlaying,
  resetVisualizer 
} from '../../store/visualizerSlice';
import ControlBar from '../../components/ControlBar';
import ComplexityTable from '../../components/ComplexityTable';
import DataInputBar from '../../components/DataInputBar';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const complexities = {
    description: "Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(n)"
};

const MergeSort = () => {
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

    const merge = async (localArray, l, m, r) => {
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = localArray[l + i];
        for (let j = 0; j < n2; j++) R[j] = localArray[m + 1 + j];

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (!isPlayingRef.current) return false;
            
            dispatch(updateItemStatus({ index: k, status: 'comparing' }));
            await sleep(speedRef.current);

            if (L[i].value <= R[j].value) {
                localArray[k] = L[i];
                i++;
            } else {
                localArray[k] = R[j];
                j++;
            }
            
            // Dispatch the updated array state completely (since we're overriding values in place visually)
            dispatch(setArray(JSON.parse(JSON.stringify(localArray))));
            dispatch(updateItemStatus({ index: k, status: 'default' }));
            
            k++;
        }

        while (i < n1) {
            if (!isPlayingRef.current) return false;
            dispatch(updateItemStatus({ index: k, status: 'comparing' }));
            await sleep(speedRef.current);
            
            localArray[k] = L[i];
            i++; k++;
            dispatch(setArray(JSON.parse(JSON.stringify(localArray))));
            dispatch(updateItemStatus({ index: k-1, status: 'default' }));
        }

        while (j < n2) {
            if (!isPlayingRef.current) return false;
            dispatch(updateItemStatus({ index: k, status: 'comparing' }));
            await sleep(speedRef.current);
            
            localArray[k] = R[j];
            j++; k++;
            dispatch(setArray(JSON.parse(JSON.stringify(localArray))));
            dispatch(updateItemStatus({ index: k-1, status: 'default' }));
        }
        
        return true;
    };

    const mergeSortHelper = async (localArray, l, r) => {
        if (l >= r) return true;
        let m = l + Math.floor((r - l) / 2);
        
        let proceed = await mergeSortHelper(localArray, l, m);
        if (!proceed) return false;
        
        proceed = await mergeSortHelper(localArray, m + 1, r);
        if (!proceed) return false;
        
        return await merge(localArray, l, m, r);
    };

    const runSort = async () => {
        dispatch(setStatus('running'));
        let localArray = JSON.parse(JSON.stringify(array));
        
        const finished = await mergeSortHelper(localArray, 0, localArray.length - 1);
        
        if (finished && isPlayingRef.current) {
            localArray.forEach((_, idx) => dispatch(updateItemStatus({ index: idx, status: 'sorted' })));
            dispatch(setStatus('completed'));
            dispatch(setIsPlaying(false));
            dispatch(setArray(localArray));
        } else {
            dispatch(setStatus('paused'));
        }
    };

    useEffect(() => {
        if (isPlaying && status !== 'completed') runSort();
    }, [isPlaying]);

    useEffect(() => {
       if (status === 'idle' && array.length > 0 && array[0].status === 'sorted') generateArray();
    }, [status]);


    return (
        <div className="max-w-6xl mx-auto flex flex-col h-full space-y-4">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Merge Sort</h1>
                <p className="text-gray-400 text-sm">Visualize the recursive Divide and Conquer arrays merging.</p>
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

export default MergeSort;
