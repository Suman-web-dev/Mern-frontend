"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Phone, ChevronDown, Menu, X, Send } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 mr-4 min-w-0">
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">Arcc Journals</span>
              <span className="text-[10px] sm:text-xs text-gray-600 truncate">Agricultural Research Communication Center</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="#" className="flex items-center text-gray-700 hover:text-orange-600 font-medium text-sm transition-colors">
              Journals
              <ChevronDown className="ml-1 w-4 h-4" />
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-orange-600 font-medium text-sm transition-colors">
              Services
              <ChevronDown className="ml-1 w-4 h-4" />
            </a>
            <a href="#" className="flex items-center text-gray-700 hover:text-orange-600 font-medium text-sm transition-colors">
              Policies
              <ChevronDown className="ml-1 w-4 h-4" />
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium text-sm transition-colors">
              Events
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium text-sm transition-colors">
              Blogs
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 font-medium text-sm transition-colors">
              About
            </a>
            <button
              onClick={() => router.push('/submissions')}
              className="text-gray-700 hover:text-orange-600 font-medium text-sm transition-colors"
            >
              View Submissions
            </button>
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Submit Manuscript
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-shrink-0 ml-auto">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-black/20 z-40" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="absolute inset-x-0 top-0 bg-white border-b border-gray-200 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-72px)] overflow-y-auto">
              <a href="#" className="flex items-center justify-between text-gray-700 hover:text-orange-600 font-medium py-2">
                Journals
                <ChevronDown className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center justify-between text-gray-700 hover:text-orange-600 font-medium py-2">
                Services
                <ChevronDown className="w-4 h-4" />
              </a>
              <a href="#" className="flex items-center justify-between text-gray-700 hover:text-orange-600 font-medium py-2">
                Policies
                <ChevronDown className="w-4 h-4" />
              </a>
              <a href="#" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                Events
              </a>
              <a href="#" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                Blogs
              </a>
              <a href="#" className="block text-gray-700 hover:text-orange-600 font-medium py-2">
                About
              </a>
              <button
                onClick={() => router.push('/submissions')}
                className="block text-gray-700 hover:text-orange-600 font-medium py-2 text-left"
              >
                View Submissions
              </button>
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
