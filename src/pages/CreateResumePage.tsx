
import React from "react";

const CreateResumePage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0e101c] overflow-hidden">
      {/* Animated, Layered Background Blobs */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-[#ff6ec4] via-[#7873f5] to-[#1fd1f9] opacity-40 rounded-full filter blur-3xl animate-blob1 z-0" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#f9d423] via-[#ff4e50] to-[#e96443] opacity-30 rounded-full filter blur-3xl animate-blob2 z-0" />
      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-[#43cea2] via-[#185a9d] to-[#ff6ec4] opacity-20 rounded-full filter blur-3xl animate-blob3 z-0" style={{transform: 'translate(-50%, -50%)'}} />

      {/* Glassmorphism Card with 3D Shadow */}
      <div className="relative z-10 w-full max-w-3xl p-12 rounded-[2.5rem] bg-white/10 backdrop-blur-3xl shadow-[0_8px_64px_0_rgba(80,80,255,0.25)] border border-white/20 flex flex-col items-center animate-fadeInUp">
        {/* Animated Gradient Headline */}
        <h1 className="text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff6ec4] via-[#7873f5] to-[#1fd1f9] drop-shadow-2xl mb-6 text-center animate-gradientMove font-[Poppins,Inter,sans-serif]">
          <span className="inline-block animate-pop">Create</span> <span className="inline-block animate-bounce">Your</span> <span className="inline-block animate-pop2">Perfect</span> Resume
        </h1>
        {/* Subtitle with fade-in */}
        <p className="text-xl md:text-2xl text-white/80 mb-10 text-center max-w-2xl animate-fadeIn delay-200">
          Unlock your dream job with a resume that dazzles recruiters and beats the bots. <span className="font-semibold text-[#1fd1f9]">Start building your future now.</span>
        </p>
        {/* Premium Form Elements */}
        <form className="w-full flex flex-col gap-6 items-center animate-fadeIn delay-400">
          <input
            type="text"
            placeholder="Your Full Name"
            className="w-full max-w-md px-6 py-4 rounded-2xl bg-white/20 text-white placeholder-white/60 font-medium text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#1fd1f9] transition-all duration-200 backdrop-blur-md border border-white/30"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full max-w-md px-6 py-4 rounded-2xl bg-white/20 text-white placeholder-white/60 font-medium text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#ff6ec4] transition-all duration-200 backdrop-blur-md border border-white/30"
          />
          <button
            type="submit"
            className="mt-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#ff6ec4] via-[#7873f5] to-[#1fd1f9] text-white font-bold text-xl shadow-xl hover:scale-105 transition-transform duration-200 animate-glow focus:outline-none focus:ring-4 focus:ring-[#1fd1f9]/40"
          >
            <span className="drop-shadow-lg">Start Building</span>
          </button>
        </form>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(60px, -40px); }
          66% { transform: scale(0.9) translate(-40px, 60px); }
        }
        .animate-blob1 { animation: blob1 14s infinite ease-in-out; }
        @keyframes blob2 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.08) translate(-60px, 40px); }
          66% { transform: scale(0.92) translate(40px, -60px); }
        }
        .animate-blob2 { animation: blob2 16s infinite ease-in-out; }
        @keyframes blob3 {
          0%, 100% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.12) translate(80px, 20px); }
          66% { transform: scale(0.88) translate(-60px, -40px); }
        }
        .animate-blob3 { animation: blob3 18s infinite ease-in-out; }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1) both; }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 1.6s both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 4s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 32px 12px #ff6ec444, 0 0 0 0 #1fd1f944; }
          50% { box-shadow: 0 0 64px 24px #1fd1f988, 0 0 0 0 #ff6ec444; }
        }
        .animate-glow { animation: glow 2.5s infinite alternate; }
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-pop { animation: pop 1.1s cubic-bezier(0.23, 1, 0.32, 1) both; }
        @keyframes pop2 {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-pop2 { animation: pop2 1.3s cubic-bezier(0.23, 1, 0.32, 1) both; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce { animation: bounce 1.2s infinite alternate; }
      `}</style>
    </div>
  );
};

export default CreateResumePage;
