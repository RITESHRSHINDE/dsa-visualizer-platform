import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-2">Welcome Back!</h1>
        <p className="text-gray-400">Track your progress and master Data Structures and Algorithms.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-gray-400 text-sm font-medium mb-1">Algorithms Mastered</h3>
          <p className="text-3xl font-bold text-white">1 <span className="text-lg text-gray-500">/ 15</span></p>
          <div className="mt-4 w-full bg-gray-700 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '6.6%' }}></div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-xl"
        >
          <h3 className="text-gray-400 text-sm font-medium mb-1">Data Structures</h3>
          <p className="text-3xl font-bold text-white">0 <span className="text-lg text-gray-500">/ 8</span></p>
          <div className="mt-4 w-full bg-gray-700 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </motion.div>
      </div>
      
      <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Continue Learning</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
             whileHover={{ scale: 1.02 }}
             className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-6 cursor-pointer group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {/* Abstract shape */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="10" width="40" height="40" rx="8" fill="white"/>
                </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bubble Sort</h3>
            <p className="text-indigo-200/70 text-sm mb-4">Master the foundational swapping algorithm with interactive visualization.</p>
            <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">Sorting</span>
          </motion.div>
          
          <motion.div 
             whileHover={{ scale: 1.02 }}
             className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-6 cursor-pointer group"
             onClick={() => window.location.href = '/algorithms/selection-sort'}
          >
            <h3 className="text-xl font-bold text-white mb-2">Selection Sort</h3>
            <p className="text-indigo-200/70 text-sm mb-4">Discover how to scan and select minimum values incrementally.</p>
            <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">Sorting</span>
          </motion.div>

          <motion.div 
             whileHover={{ scale: 1.02 }}
             className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-6 cursor-pointer group"
             onClick={() => window.location.href = '/algorithms/insertion-sort'}
          >
            <h3 className="text-xl font-bold text-white mb-2">Insertion Sort</h3>
            <p className="text-indigo-200/70 text-sm mb-4">Learn how to insert elements securely into an ordered array component.</p>
            <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">Sorting</span>
          </motion.div>

          <motion.div 
             whileHover={{ scale: 1.02 }}
             className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-2xl p-6 cursor-pointer group"
             onClick={() => window.location.href = '/algorithms/merge-sort'}
          >
            <h3 className="text-xl font-bold text-white mb-2">Merge Sort</h3>
            <p className="text-indigo-200/70 text-sm mb-4">Master algorithms that divide subsets and effectively recursively combine them.</p>
            <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">Sorting</span>
          </motion.div>

          <motion.div 
             whileHover={{ scale: 1.02 }}
             className="relative overflow-hidden bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/20 rounded-2xl p-6 cursor-pointer group"
             onClick={() => window.location.href = '/data-structures/stack'}
          >
            <h3 className="text-xl font-bold text-white mb-2">Stack</h3>
            <p className="text-green-200/70 text-sm mb-4">Visualize a LIFO structure with physical gravity block push and pops.</p>
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30">Structure</span>
          </motion.div>

          <motion.div 
             whileHover={{ scale: 1.02 }}
             className="relative overflow-hidden bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/20 rounded-2xl p-6 cursor-pointer group"
             onClick={() => window.location.href = '/data-structures/linked-list'}
          >
            <h3 className="text-xl font-bold text-white mb-2">Linked List</h3>
            <p className="text-green-200/70 text-sm mb-4">Append and prepend nodes on a pointer-based reference framework visually.</p>
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30">Structure</span>
          </motion.div>

          <motion.div 
             whileHover={{ scale: 1.02 }}
             className="relative overflow-hidden bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/20 rounded-2xl p-6 cursor-pointer group"
             onClick={() => window.location.href = '/data-structures/tree'}
          >
            <h3 className="text-xl font-bold text-white mb-2">Binary Search Tree</h3>
            <p className="text-green-200/70 text-sm mb-4">Explore hierarchy algorithms mapping recursive Left/Right structures.</p>
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30">Structure</span>
          </motion.div>

          <motion.div 
             whileHover={{ scale: 1.02 }}
             className="relative overflow-hidden bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/20 rounded-2xl p-6 cursor-pointer group"
             onClick={() => window.location.href = '/data-structures/queue'}
          >
            <h3 className="text-xl font-bold text-white mb-2">Queue</h3>
            <p className="text-green-200/70 text-sm mb-4">Master FIFO paradigms using beautiful interactive graphical pipelines.</p>
            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-semibold rounded-full border border-green-500/30">Structure</span>
          </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
