import React from "react";

const Navbar = () => {
  return (
    <nav
      className="bg-gradient-to-r from-purple-900 via-zinc-900 to-emerald-900
                 text-emerald-400 flex justify-between items-center 
                 py-3 px-8 shadow-[0_2px_15px_#9333ea33] border-b border-purple-800/40 sticky"
    >
      <div className="logo">
        <span
          className="font-extrabold text-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 
                     bg-clip-text text-transparent drop-shadow-[0_0_10px_#a855f7aa]"
        >
          Tickit
        </span>
      </div>
      <ul className="list-none flex gap-8 mx-9">
        <li className="cursor-pointer hover:text-pink-400 hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:text-pink-400 hover:font-bold transition-all">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
