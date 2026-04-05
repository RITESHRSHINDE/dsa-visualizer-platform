import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const Stack = () => {
    const [stack, setStack] = useState([
        { id: '1', value: 10 },
        { id: '2', value: 45 }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('Stack initialized.');

    const handlePush = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        if (stack.length >= 10) {
            setMessage("Stack Overflow! Maximum of 10 elements allowed.");
            return;
        }

        const parsed = parseInt(inputValue, 10);
        if (isNaN(parsed)) return;

        setStack([{ id: `id_${Math.random()}`, value: parsed }, ...stack]);
        setMessage(`Pushed ${parsed} onto the stack.`);
        setInputValue('');
    };

    const handlePop = () => {
        if (stack.length === 0) {
            setMessage("Stack Underflow! The stack is empty.");
            return;
        }
        
        const popped = stack[0];
        setStack(stack.slice(1));
        setMessage(`Popped ${popped.value} from the stack.`);
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col h-full space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Stack Visualizer</h1>
                <p className="text-gray-400 text-sm">Visualize LIFO (Last-In-First-Out) operations.</p>
            </header>

            <div className="bg-gray-800/50 backdrop-blur border border-gray-700/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6">
                <form onSubmit={handlePush} className="flex gap-2 relative flex-1 max-w-sm">
                    <input 
                        type="number" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g. 42"
                        className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                    />
                    <button 
                        type="submit" 
                        disabled={!inputValue.trim()}
                        className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 font-semibold text-sm"
                    >
                        <Plus size={18} /> Push
                    </button>
                </form>
                
                <button 
                    onClick={handlePop}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-semibold text-sm"
                >
                    <Minus size={18} /> Pop
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
               <div className="flex-1 min-h-[400px] border-b-4 border-l-4 border-r-4 border-gray-700 bg-gray-900/50 rounded-b-xl flex flex-col justify-end items-center pb-4 pt-10 overflow-hidden relative shadow-inner">
                    <AnimatePresence>
                        {stack.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -50, scale: 1.1, filter: 'blur(4px)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                className="w-48 h-12 mb-1 bg-gradient-to-r from-indigo-500 to-purple-600 border border-indigo-400/50 rounded-lg shadow-lg flex items-center justify-center text-white font-bold tracking-wider relative group"
                            >
                                {item.value}
                                {index === 0 && (
                                    <span className="absolute -left-16 text-indigo-400 text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                                        TOP →
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {stack.length === 0 && (
                        <div className="text-gray-600 font-semibold tracking-widest absolute top-1/2 -translate-y-1/2 uppercase">Empty</div>
                    )}
               </div>

               <div className="w-full md:w-80 space-y-4">
                  <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-white font-bold text-lg mb-4">Operations Log</h3>
                    <p className={`text-sm ${message.includes('Overflow') || message.includes('Underflow') ? 'text-red-400 font-semibold' : 'text-indigo-300'}`}>
                        {message}
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-white font-bold text-lg mb-4">Theory</h3>
                    <p className="text-sm text-gray-400 mb-2">A stack is a linear data structure that follows the <strong>LIFO (Last In First Out)</strong> principle. The element added last is accessed first.</p>
                    <ul className="text-sm text-gray-500 space-y-1 mt-4">
                        <li><strong>Push:</strong> O(1) Time</li>
                        <li><strong>Pop:</strong> O(1) Time</li>
                        <li><strong>Peek:</strong> O(1) Time</li>
                    </ul>
                  </div>
               </div>
            </div>
        </div>
    );
};

export default Stack;
