import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Shield } from 'lucide-react';
import { Particles } from 'react-tsparticles';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#4f46e5",
              },
              links: {
                color: "#4f46e5",
                distance: 150,
                enable: true,
                opacity: 0.1,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 80,
              },
              opacity: {
                value: 0.1,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Future of Resume Building is Here
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Create a stunning resume that will get you noticed. Our AI-powered platform will help you craft the perfect resume for your dream job.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/app"
            className="mt-8 inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <Zap className="h-12 w-12 text-indigo-500" />
            <h3 className="mt-4 text-lg font-medium">Instant Analysis</h3>
            <p className="mt-2 text-gray-400">
              Get instant feedback on your resume and see how you stack up against the competition.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-12 w-12 text-indigo-500" />
            <h3 className="mt-4 text-lg font-medium">ATS-Optimized</h3>
            <p className="mt-2 text-gray-400">
              Our platform will help you create a resume that is optimized for applicant tracking systems.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Star className="h-12 w-12 text-indigo-500" />
            <h3 className="mt-4 text-lg font-medium">Stunning Templates</h3>
            <p className="mt-2 text-gray-400">
              Choose from a variety of stunning templates to create a resume that is sure to impress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
