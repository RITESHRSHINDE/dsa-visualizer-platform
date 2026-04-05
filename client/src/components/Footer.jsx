import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-800 bg-gray-900/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="text-gray-400 mb-4 md:mb-0">
          <p>© {currentYear} Full-Stack DSA Platform. All rights reserved.</p>
        </div>
        <div className="flex flex-col items-center md:items-end text-gray-500">
          <p className="font-medium text-indigo-400">Developed by Ritesh Shinde</p>
          <p className="text-xs mt-1">Built with React, Redux, Node.js, and MongoDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
