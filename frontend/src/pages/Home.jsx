import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Search, Edit3, ArrowRight, Database, Shield, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import { usePageAnimation, useStaggerAnimation, useButtonHover } from '../hooks/useGSAP';

const Home = () => {
  const pageRef = usePageAnimation();
  const featuresRef = useStaggerAnimation('.feature-card', 0.5);
  const { buttonRef: primaryBtnRef, handleMouseEnter: primaryEnter, handleMouseLeave: primaryLeave } = useButtonHover();
  const { buttonRef: secondaryBtnRef, handleMouseEnter: secondaryEnter, handleMouseLeave: secondaryLeave } = useButtonHover();

  const features = [
    {
      icon: Database,
      title: 'Secure Configuration',
      description: 'Advanced encryption and security protocols protect your configuration data.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures quick retrieval and updates of your data.',
    },
    {
      icon: Shield,
      title: 'Enterprise Ready',
      description: 'Built for scale with enterprise-grade reliability and monitoring.',
    },
  ];

  return (
    <Layout>
      <div ref={pageRef} className="relative opacity-0">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8 hero-icon">
              <div className="relative">
                <Settings className="h-16 w-16 text-violet-600 animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-0 animate-pulse-purple rounded-full"></div>
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 hero-title">
              <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                CodeRower
              </span>
              <br />
              <span className="text-gray-800">Configuration</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed hero-subtitle">
              Professional configuration management platform built for modern teams. 
              Secure, fast, and reliable infrastructure for your critical applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 hero-buttons">
              <Link
                ref={primaryBtnRef}
                to="/fetch-config"
                onMouseEnter={primaryEnter}
                onMouseLeave={primaryLeave}
                className="group bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center justify-center"
              >
                <Search className="h-6 w-6 mr-3" />
                Fetch Configuration
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                ref={secondaryBtnRef}
                to="/update-remark"
                onMouseEnter={secondaryEnter}
                onMouseLeave={secondaryLeave}
                className="px-8 py-4 border-2 border-violet-200 text-violet-700 rounded-xl font-semibold text-lg hover:border-violet-300 hover:bg-violet-50 transition-all duration-200 inline-flex items-center justify-center"
              >
                <Edit3 className="h-6 w-6 mr-3" />
                Update Remark
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 features-header">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">CodeRower</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern technologies and best practices to deliver exceptional performance and security.
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 text-center group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 opacity-0"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-12 stats-section">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="stat-item">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guarantee</div>
              </div>
              <div className="stat-item">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent mb-2">&lt;100ms</div>
                <div className="text-gray-600">Average Response Time</div>
              </div>
              <div className="stat-item">
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-gray-600">Monitoring & Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;