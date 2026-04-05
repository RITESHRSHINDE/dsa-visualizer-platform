import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RotateCcw } from 'lucide-react';

const Tree = () => {
    // We represent the tree as a linear array map for absolute positioning
    const [nodes, setNodes] = useState([
        { id: '1', value: 50, x: 50, y: 10, depth: 0, index: 0, parentId: null }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('Binary Search Tree initialized with root 50.');

    // Helper to calculate X and Y percentages based on index (0 to 2^d - 1) and depth
    const addNodeToBST = (val) => {
        let currentIdx = 0; // root index in array representation
        let depth = 0;
        let parentId = null;
        
        let localNodes = [...nodes];
        
        while (true) {
            let current = localNodes.find(n => n.index === currentIdx);
            if (!current) {
                // Determine layout
                const levelWidth = 100 / Math.pow(2, depth);
                const offset = levelWidth / 2;
                // Calculate position based on the binary heap index structure
                const nodesInLevel = Math.pow(2, depth);
                const positionInLevel = currentIdx - (nodesInLevel - 1);
                
                const x = (positionInLevel * levelWidth) + offset;
                const y = 10 + (depth * 25); // 25% height spacing
                
                localNodes.push({
                    id: `id_${Math.random()}`,
                    value: val,
                    x, y, depth, index: currentIdx, parentId
                });
                break;
            }
            
            parentId = current.id;
            if (val < current.value) {
                currentIdx = 2 * currentIdx + 1; // Left child
            } else if (val > current.value) {
                currentIdx = 2 * currentIdx + 2; // Right child
            } else {
                setMessage("Value already exists in the BST!");
                return;
            }
            depth++;
            if (depth > 3) {
                 setMessage("Maximum depth reached for visualization (Depth 3).");
                 return;
            }
        }
        
        setNodes(localNodes);
        setMessage(`Inserted ${val} into the BST.`);
    };

    const handleInsert = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const parsed = parseInt(inputValue, 10);
        if (isNaN(parsed)) return;

        if (nodes.length === 0) {
            setNodes([{ id: `id_${Math.random()}`, value: parsed, x: 50, y: 10, depth: 0, index: 0, parentId: null }]);
            setMessage(`Initialized BST with root ${parsed}.`);
        } else {
            addNodeToBST(parsed);
        }
        setInputValue('');
    };

    const drawEdges = () => {
        return nodes.map((node) => {
            if (!node.parentId) return null;
            const parent = nodes.find(n => n.id === node.parentId);
            if (!parent) return null;

            return (
                <svg key={`edge-${node.id}`} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <motion.line 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        x1={`${parent.x}%`} 
                        y1={`${parent.y}%`} 
                        x2={`${node.x}%`} 
                        y2={`${node.y}%`} 
                        stroke="#6366f1" // indigo-500
                        strokeWidth="3"
                        strokeOpacity="0.5"
                    />
                </svg>
            );
        });
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col h-full space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Binary Search Tree</h1>
                <p className="text-gray-400 text-sm">Visualize node insertion into a balanced hierarchy.</p>
            </header>

            <div className="bg-gray-800/50 backdrop-blur border border-gray-700/80 rounded-2xl p-6 shadow-xl flex flex-wrap gap-4">
                <form onSubmit={handleInsert} className="flex gap-2">
                    <input 
                        type="number" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g. 42"
                        className="w-32 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
                    />
                    <button 
                        type="submit" 
                        disabled={!inputValue.trim()}
                        className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 font-semibold text-sm"
                    >
                        <Plus size={18} /> Insert
                    </button>
                    <button 
                        type="button"
                        onClick={() => { setNodes([]); setMessage('Tree cleared.'); }}
                        className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all shadow-lg flex items-center gap-2 font-semibold text-sm ml-4"
                    >
                        <RotateCcw size={18} /> Clear
                    </button>
                </form>
            </div>

            <div className="flex-1 w-full min-h-[400px] border border-gray-700 bg-gray-900/50 rounded-xl p-4 overflow-hidden relative shadow-inner">
                {drawEdges()}
                
                <AnimatePresence>
                    {nodes.length === 0 && (
                         <div className="text-gray-600 font-semibold tracking-widest absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase">Empty Tree</div>
                    )}
                    {nodes.map((node) => (
                        <motion.div
                            key={node.id}
                            layout
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="absolute w-14 h-14 bg-gray-800 border-2 border-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 -ml-7 -mt-7 shrink-0 cursor-pointer hover:scale-110 hover:bg-indigo-900 transition-colors"
                            style={{ 
                                left: `${node.x}%`, 
                                top: `${node.y}%` 
                            }}
                        >
                            {node.value}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            <p className="text-indigo-300 text-sm bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">{message}</p>
        </div>
    );
};

export default Tree;
