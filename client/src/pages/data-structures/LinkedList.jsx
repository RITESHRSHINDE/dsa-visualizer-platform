import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const LinkedList = () => {
    const [list, setList] = useState([
        { id: '1', value: 10 },
        { id: '2', value: 45 },
        { id: '3', value: 89 }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('Linked List initialized.');

    const handlePrepend = () => {
        if (!inputValue.trim()) return;
        const parsed = parseInt(inputValue, 10);
        if (isNaN(parsed)) return;

        setList([{ id: `id_${Math.random()}`, value: parsed }, ...list]);
        setMessage(`Prepended ${parsed} to the head.`);
        setInputValue('');
    };
    
    const handleAppend = () => {
        if (!inputValue.trim()) return;
        const parsed = parseInt(inputValue, 10);
        if (isNaN(parsed)) return;

        setList([...list, { id: `id_${Math.random()}`, value: parsed }]);
        setMessage(`Appended ${parsed} to the tail.`);
        setInputValue('');
    };

    const handleRemoveHead = () => {
        if (list.length === 0) {
            setMessage("List is empty!");
            return;
        }
        setList(list.slice(1));
        setMessage(`Removed Head.`);
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col h-full space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Linked List</h1>
                <p className="text-gray-400 text-sm">Visualize dynamically sized chains of nodes.</p>
            </header>

            <div className="bg-gray-800/50 backdrop-blur border border-gray-700/80 rounded-2xl p-6 shadow-xl flex flex-wrap gap-4">
                <input 
                    type="number" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-32 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                />
                <button 
                    onClick={handlePrepend}
                    disabled={!inputValue.trim()}
                    className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 font-semibold text-sm"
                >
                    <Plus size={18} /> Prepend
                </button>
                <button 
                    onClick={handleAppend}
                    disabled={!inputValue.trim()}
                    className="px-4 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 font-semibold text-sm"
                >
                    <Plus size={18} /> Append
                </button>
                <div className="h-10 w-px bg-gray-700 hidden md:block mx-2"></div>
                <button 
                    onClick={handleRemoveHead}
                    className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-semibold text-sm"
                >
                    <Minus size={18} /> Remove Head
                </button>
            </div>

            <div className="flex-1 w-full min-h-[300px] border border-gray-700 bg-gray-900/50 rounded-xl p-8 overflow-x-auto overflow-y-hidden whitespace-nowrap shadow-inner flex items-center">
                <AnimatePresence>
                    {list.length === 0 && (
                         <div className="text-gray-600 font-semibold tracking-widest absolute uppercase left-1/2 -translate-x-1/2">Null Pointer</div>
                    )}
                    {list.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -50 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="inline-flex items-center"
                        >
                            <div className="flex flex-col items-center gap-2 relative">
                                {index === 0 && <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider absolute -top-6">Head</span>}
                                {index === list.length - 1 && list.length > 1 && <span className="text-purple-400 text-xs font-semibold uppercase tracking-wider absolute -top-6">Tail</span>}
                                
                                <div className="w-20 h-16 bg-gray-800 border-2 border-indigo-500/50 rounded-lg flex shadow-lg hover:border-indigo-400 transition-all cursor-pointer group">
                                    <div className="flex-1 flex items-center justify-center text-white font-bold">{item.value}</div>
                                    <div className="w-6 border-l border-gray-700 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Arrow mapping */}
                            <motion.div 
                                layout
                                className="w-16 h-px bg-indigo-500/50 relative mx-2 flex-shrink-0"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.1 }}
                             >
                                 <div className="absolute right-0 -top-1 w-2 h-2 border-t border-r border-indigo-500/50 transform rotate-45"></div>
                             </motion.div>
                        </motion.div>
                    ))}
                    
                    {list.length > 0 && (
                        <motion.div 
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="inline-flex items-center text-rose-500/50 font-bold tracking-widest"
                        >
                            NULL
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <p className="text-indigo-300 text-sm bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">{message}</p>
        </div>
    );
};

export default LinkedList;
