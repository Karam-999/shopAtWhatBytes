import Link from 'next/link';
import { SiGmail } from 'react-icons/si';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">All Products</Link></li>
              <li><Link href="?category=jewelery" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Jewelery</Link></li>
              <li><Link href="?category=electronics" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Electronics</Link></li>
              <li><Link href="?category=men%27s+clothing" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Men's Clothing</Link></li>
              <li><Link href="?category=women%27s+clothing" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Women's Clothing</Link></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="https://karam-dev.vercel.app/about" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm">About Us</Link></li>
              <li><Link href="https://karam-dev.vercel.app/contact" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Follow Us</h3>
            <div className="flex items-center gap-3 mt-2">

              <a
                href="mailto:connect.with.karam25@gmail.com"
                aria-label="Gmail"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-red-600 transition-colors"
              >
                <SiGmail className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/Karam-999"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700 transition-colors"
              >
                <FaGithub className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/karam46"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-blue-700 transition-colors"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">©{new Date().getFullYear()} Shop@WhatBytes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
