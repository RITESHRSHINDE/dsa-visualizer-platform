import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trash2 } from 'lucide-react';

const Queue = () => {
    const [queue, setQueue] = useState([
        { id: '1', value: 10 },
        { id: '2', value: 45 },
        { id: '3', value: 12 }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('Queue initialized.');

    const handleEnqueue = (e) => {
         e.preventDefault();
        if (!inputValue.trim()) return;
        
        if (queue.length >= 10) {
            setMessage("Queue Overflow! Maximum of 10 elements allowed.");
            return;
        }

        const parsed = parseInt(inputValue, 10);
        if (isNaN(parsed)) return;

        setQueue([...queue, { id: `id_${Math.random()}`, value: parsed }]);
        setMessage(`Enqueued ${parsed} into the queue.`);
        setInputValue('');
    };

    const handleDequeue = () => {
        if (queue.length === 0) {
            setMessage("Queue Underflow! The queue is empty.");
            return;
        }
        
        const removed = queue[0];
        setQueue(queue.slice(1));
        setMessage(`Dequeued ${removed.value} from the front of the queue.`);
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col h-full space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Queue Visualizer</h1>
                <p className="text-gray-400 text-sm">Visualize FIFO (First-In-First-Out) operations.</p>
            </header>

            <div className="bg-gray-800/50 backdrop-blur border border-gray-700/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6">
                <form onSubmit={handleEnqueue} className="flex gap-2 relative flex-1 max-w-sm">
                    <input 
                        type="number" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g. 42"
                        className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-200"
                    />
                    <button 
                        type="submit" 
                        disabled={!inputValue.trim()}
                        className="px-4 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 font-semibold text-sm"
                    >
                         Enqueue <ArrowRight size={18} />
                    </button>
                </form>
                
                <button 
                    onClick={handleDequeue}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-semibold text-sm"
                >
                    Dequeue <Trash2 size={18} />
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
               <div className="flex-1 min-h-[300px] border-y-4 border-gray-700 bg-gray-900/50 flex items-center p-8 overflow-x-auto relative shadow-inner">
                    
                    <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 flex flex-col items-center opacity-50 z-0 text-sm font-bold uppercase tracking-widest gap-2">
                        <ArrowRight size={24} /> FRONT
                    </div>

                    <div className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 flex flex-col items-center opacity-50 z-0 text-sm font-bold uppercase tracking-widest gap-2">
                         BACK <ArrowRight size={24} />
                    </div>

                    <div className="flex z-10 mx-auto items-center">
                        <AnimatePresence>
                            {queue.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -100, scale: 1.1, filter: 'blur(4px)' }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                    className="w-24 h-24 mx-2 bg-gradient-to-br from-teal-500 to-cyan-600 border border-teal-400/50 rounded-xl shadow-lg flex flex-col items-center justify-center text-white font-bold text-2xl tracking-wider relative group shrink-0"
                                >
                                    {item.value}
                                    {index === 0 && (
                                        <span className="absolute -top-6 text-teal-400 text-xs font-semibold tracking-widest uppercase">
                                            Front
                                        </span>
                                    )}
                                     {index === queue.length - 1 && queue.length > 1 && (
                                        <span className="absolute -top-6 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
                                            Rear
                                        </span>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {queue.length === 0 && (
                        <div className="text-gray-600 font-semibold tracking-widest absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-xl">Empty Queue</div>
                    )}
               </div>

               <div className="w-full md:w-80 space-y-4 flex-shrink-0">
                  <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-white font-bold text-lg mb-4">Operations Log</h3>
                    <p className={`text-sm ${message.includes('Overflow') || message.includes('Underflow') ? 'text-red-400 font-semibold' : 'text-teal-300'}`}>
                        {message}
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-white font-bold text-lg mb-4">Theory</h3>
                    <p className="text-sm text-gray-400 mb-2">A Queue is a linear structure which follows the <strong>FIFO (First In First Out)</strong> principle. The first item inserted is the first item removed.</p>
                    <ul className="text-sm text-gray-500 space-y-1 mt-4">
                        <li><strong>Enqueue:</strong> O(1) Time</li>
                        <li><strong>Dequeue:</strong> O(1) Time</li>
                    </ul>
                  </div>
               </div>
            </div>
        </div>
    );
};

export default Queue;
