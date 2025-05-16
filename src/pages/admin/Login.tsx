
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle authentication here
    console.log('Login attempt with:', email);
  };

  return (
    <Layout
      title="Admin Login | BC Pressure Washing"
      description="Secure login portal for BC Pressure Washing administrators."
      canonicalUrl="/admin/login"
    >
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bc-red"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-bc-red"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-bc-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Log In
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <a href="/" className="text-sm text-bc-red hover:underline">
                Return to Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
