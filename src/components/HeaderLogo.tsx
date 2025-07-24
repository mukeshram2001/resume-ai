import React from "react";

const HeaderLogo = ({ size = 40, className = "" }) => (
  <div className={`flex items-center gap-2 select-none ${className}`}>
    <img
      src="/image-1.png"
      alt="JD2Resume AI Logo"
      width={size}
      height={size}
      className="rounded-xl shadow-md bg-white/80"
      style={{ objectFit: 'contain' }}
    />
    <span className="font-extrabold text-xl md:text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
      JD2Resume AI
    </span>
  </div>
);

export default HeaderLogo;
