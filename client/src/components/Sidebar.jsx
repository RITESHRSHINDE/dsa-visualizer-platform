import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BarChart2, Layers } from 'lucide-react';

const Sidebar = () => {
  const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";
  const getNavLinkClass = ({ isActive }) => 
    `${baseClass} ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`;

  return (
    <aside className="w-72 bg-gray-950 border-r border-gray-800 hidden md:flex flex-col z-20 h-full drop-shadow-xl flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">DSA Visualizer</h1>
      </div>
      
      <div className="px-4 py-2 flex-1 overflow-y-auto space-y-8">
        <div>
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Overview</p>
          <div className="space-y-1">
            <NavLink to="/" className={getNavLinkClass}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </div>
        </div>

        <div>
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Algorithms</p>
          <div className="space-y-1">
            <NavLink to="/algorithms/bubble-sort" className={getNavLinkClass}>
              <BarChart2 size={20} />
              <span>Bubble Sort</span>
            </NavLink>
            <NavLink to="/algorithms/selection-sort" className={getNavLinkClass}>
              <BarChart2 size={20} />
              <span>Selection Sort</span>
            </NavLink>
            <NavLink to="/algorithms/insertion-sort" className={getNavLinkClass}>
              <BarChart2 size={20} />
              <span>Insertion Sort</span>
            </NavLink>
            <NavLink to="/algorithms/merge-sort" className={getNavLinkClass}>
              <BarChart2 size={20} />
              <span>Merge Sort</span>
            </NavLink>
          </div>
        </div>
        
        <div>
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Data Structures</p>
          <div className="space-y-1">
             <NavLink to="/data-structures/stack" className={getNavLinkClass}>
              <Layers size={20} />
              <span>Stack</span>
            </NavLink>
             <NavLink to="/data-structures/linked-list" className={getNavLinkClass}>
              <Layers size={20} />
              <span>Linked List</span>
            </NavLink>
             <NavLink to="/data-structures/tree" className={getNavLinkClass}>
              <Layers size={20} />
              <span>Tree</span>
            </NavLink>
            <NavLink to="/data-structures/queue" className={getNavLinkClass}>
              <Layers size={20} />
              <span>Queue</span>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
