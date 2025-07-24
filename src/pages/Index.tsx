import React, { useState, useEffect } from 'react';
import HeaderLogo from '@/components/HeaderLogo';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Zap, Star, Shield, Users, TrendingUp, CheckCircle, Play, BarChart3, FileText, Bot } from 'lucide-react';

const FloatingElement = ({ children, delay = 0, className = "" }) => (
  <div 
    className={`animate-float ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
      animation: `float 6s ease-in-out infinite ${delay}s`
    }}
  >
    {children}
  </div>
);

const GlowCard = ({ children, className = "", delay = 0, glowColor = "blue" }) => {
  const glowColors = {
    blue: "shadow-[0_0_100px_rgba(59,130,246,0.4)] hover:shadow-[0_0_150px_rgba(59,130,246,0.6)]",
    purple: "shadow-[0_0_100px_rgba(147,51,234,0.4)] hover:shadow-[0_0_150px_rgba(147,51,234,0.6)]",
    pink: "shadow-[0_0_100px_rgba(236,72,153,0.4)] hover:shadow-[0_0_150px_rgba(236,72,153,0.6)]",
    green: "shadow-[0_0_100px_rgba(34,197,94,0.4)] hover:shadow-[0_0_150px_rgba(34,197,94,0.6)]",
    cyan: "shadow-[0_0_100px_rgba(6,182,212,0.4)] hover:shadow-[0_0_150px_rgba(6,182,212,0.6)]"
  };

  return (
    <div 
      className={`
        relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl 
        border border-white/30 group hover:scale-105 transition-all duration-700
        before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r 
        before:from-white/40 before:via-blue-100/30 before:to-purple-100/30 
        before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100 ${glowColors[glowColor]}
        animate-fade-in-up overflow-hidden ${className}
      `}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      
      {/* Inner glow effect */}
      <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-white/60 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay, color, glowColor }) => (
  <GlowCard delay={delay} glowColor={glowColor} className="text-center h-full">
    <div className="flex flex-col items-center">
      <div className={`
        w-24 h-24 mb-6 rounded-3xl flex items-center justify-center shadow-2xl
        bg-gradient-to-br ${color} group-hover:scale-110 transition-all duration-700
        relative overflow-hidden
      `}>
        {/* Animated background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Pulsing glow ring */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-white/10 animate-pulse"></div>
        
        {/* Icon glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <Icon className="h-12 w-12 text-white relative z-10 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{description}</p>
    </div>
  </GlowCard>
);

const StatCard = ({ number, label, delay, icon: Icon }) => (
  <GlowCard delay={delay} glowColor="purple" className="text-center">
    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-500 relative overflow-hidden">
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Pulsing inner glow */}
      <div className="absolute inset-2 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <Icon className="h-10 w-10 text-white relative z-10 drop-shadow-lg group-hover:scale-110 transition-all duration-500" />
    </div>
    <div className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500">
      {number}
    </div>
    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide group-hover:text-gray-800 transition-colors duration-300">{label}</div>
  </GlowCard>
);

const Index = () => {
  useEffect(() => {
    document.title = 'JD2Resume AI | AI-Powered Resume Optimization';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'JD2Resume AI: Instantly optimize your resume for any job description using advanced AI. Get ATS analysis, keyword suggestions, and beautiful templates.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'JD2Resume AI: Instantly optimize your resume for any job description using advanced AI. Get ATS analysis, keyword suggestions, and beautiful templates.';
      document.head.appendChild(meta);
    }
  }, []);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    navigate('/app');
  };

  const features = [
    {
      icon: Bot,
      title: "AI Analysis",
      description: "Smart algorithms analyze your resume and provide actionable insights",
      color: "from-blue-500 via-blue-600 to-cyan-500",
      glowColor: "blue"
    },
    {
      icon: Shield,
      title: "ATS Ready", 
      description: "Optimize for automated screening systems with keyword matching",
      color: "from-emerald-500 via-green-600 to-teal-500",
      glowColor: "green"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive feedback in seconds, not hours",
      color: "from-purple-500 via-pink-600 to-rose-500",
      glowColor: "pink"
    }
  ];

  const stats = [
    { number: "95%", label: "Success Rate", icon: Target },
    { number: "10K+", label: "Users", icon: Users },
    { number: "30s", label: "Fast Analysis", icon: Zap }
  ];

  const benefits = [
    "Instant ATS compatibility analysis with detailed scoring",
    "AI-powered keyword optimization recommendations", 
    "Professional resume templates for every industry",
    "Real-time improvement suggestions and feedback",
    "Mobile-optimized responsive interface design",
    "Export to multiple formats (PDF, DOCX, TXT)"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Global Header Logo */}
      <header className="w-full flex items-center justify-center py-6 bg-transparent z-20 relative">
        <HeaderLogo size={48} />
      </header>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl">{null}</FloatingElement>
        <FloatingElement delay={2} className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl">{null}</FloatingElement>
        <FloatingElement delay={4} className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl">{null}</FloatingElement>
        <FloatingElement delay={1} className="absolute bottom-32 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl">{null}</FloatingElement>
      </div>

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="relative z-10 px-4">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl mx-auto">
            <FloatingElement delay={0}>
              <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg mb-6">
                <span className="text-lg font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight pr-2">JD2Resume AI</span>
                <Sparkles className="h-5 w-5 text-purple-500 ml-2" />
              </div>
            </FloatingElement>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Elevate Your Resume
              </span>
              <span className="text-gray-800 block mt-2">Instantly</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Get instant, actionable feedback and build a job-winning resume with AI. 
              <span className="font-semibold text-purple-600"> Simple. Fast. Free.</span>
            </p>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={handleGetStarted}
                className="
                  group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                  text-white text-xl font-bold rounded-2xl shadow-2xl 
                  hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] 
                  transform hover:scale-105 transition-all duration-500
                  border-2 border-white/20 backdrop-blur-sm
                  before:absolute before:inset-0 before:rounded-2xl 
                  before:bg-gradient-to-r before:from-white/20 before:to-transparent 
                  before:opacity-0 before:transition-opacity before:duration-300
                  hover:before:opacity-100
                "
              >
                <span className="relative z-10 flex items-center">
                  Start Free Analysis
                  <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of resume optimization with cutting-edge AI technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature, idx) => (
                <FeatureCard
                  key={idx}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={idx * 0.2}
                  color={feature.color}
                  glowColor={feature.glowColor}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-gray-600">
                Join the success stories of professionals who elevated their careers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {stats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  number={stat.number}
                  label={stat.label}
                  icon={stat.icon}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive tools to make your resume stand out
              </p>
            </div>

            <GlowCard className="max-w-3xl mx-auto" glowColor="cyan">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start space-x-4 animate-fade-in-up group"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-500 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <GlowCard className="bg-gradient-to-r from-blue-500/10 to-purple-500/10" glowColor="purple">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of professionals who've already elevated their resumes
              </p>
              <button 
                onClick={handleGetStarted}
                className="
                  group relative px-10 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  text-white text-xl font-bold rounded-3xl shadow-2xl 
                  hover:shadow-[0_0_80px_rgba(59,130,246,0.6)] 
                  transform hover:scale-105 transition-all duration-700
                  border-2 border-white/30 backdrop-blur-sm
                  before:absolute before:inset-0 before:rounded-3xl 
                  before:bg-gradient-to-r before:from-white/20 before:via-white/10 before:to-white/20 
                  before:opacity-0 before:transition-opacity before:duration-500
                  hover:before:opacity-100 overflow-hidden
                "
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span className="relative z-10 flex items-center">
                  Get Started Now
                  <ArrowRight className="h-7 w-7 ml-3 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </button>
            </GlowCard>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-500 text-sm bg-white/50 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} Ascent Resume Engine. All rights reserved.
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Index;
