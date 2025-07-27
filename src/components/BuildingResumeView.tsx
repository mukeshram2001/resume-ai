import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const BuildingResumeView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="h-24 w-24 text-indigo-500" />
      </motion.div>
      <h2 className="mt-8 text-3xl font-bold text-white">
        Building Your Optimized Resume...
      </h2>
      <p className="mt-2 text-gray-400">
        Our AI is working its magic. Please wait a moment.
      </p>
    </div>
  );
};

export default BuildingResumeView;
