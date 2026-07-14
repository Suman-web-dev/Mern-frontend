import { Star, Award, Users, FileText, Shield, CheckCircle, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: '#032E24' }}>
      {/* Dark Green Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#032E24] via-[#063B31] to-[#0B4D3E]"></div>
      
      {/* Decorative Shapes and Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Radial Gradients */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#0E5B47]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#063B31]/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#0B4D3E]/25 rounded-full blur-2xl"></div>
        
        {/* Abstract Organic Shapes */}
        <div className="absolute top-10 right-1/4 w-48 h-48 bg-[#22C55E]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-[#F97316]/10 rounded-full blur-xl"></div>
        
        {/* Translucent Blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#0E5B47]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#063B31]/30 to-transparent rounded-full blur-3xl"></div>
        
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#032E24]/50 via-transparent to-[#032E24]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#032E24]/40 via-transparent to-[#032E24]/40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-28">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-white">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm mb-6">
              <span className="text-gray-400">Home</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">Conference</span>
              <span className="text-gray-500">/</span>
              <span className="text-[#22C55E]">Abstract Submission</span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="text-sm font-medium text-gray-200">2024 International Conference</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white break-words">
              Submit Your Abstract
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed break-words">
              Join researchers from around the world at the premier architectural research conference. Share your findings and contribute to the advancement of architectural knowledge.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#22C55E]/20 flex items-center justify-center mr-2">
                    <Users className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <span className="text-2xl font-bold text-white">500+</span>
                </div>
                <p className="text-sm text-gray-400">Attendees</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center mr-2">
                    <FileText className="w-4 h-4 text-[#F97316]" />
                  </div>
                  <span className="text-2xl font-bold text-white">150+</span>
                </div>
                <p className="text-sm text-gray-400">Papers</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#22C55E]/20 flex items-center justify-center mr-2">
                    <Award className="w-4 h-4 text-[#22C55E]" />
                  </div>
                  <span className="text-2xl font-bold text-white">25</span>
                </div>
                <p className="text-sm text-gray-400">Countries</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center mr-2">
                    <Star className="w-4 h-4 text-[#F97316]" />
                  </div>
                  <span className="text-2xl font-bold text-white">4.8</span>
                </div>
                <p className="text-sm text-gray-400">Rating</p>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center space-x-1 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-5 h-5",
                    star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                  )}
                />
              ))}
              <span className="ml-2 text-gray-400 text-sm">Based on 200+ reviews</span>
            </div>
          </div>

          {/* Right Content - Circular Image */}
          <div className="flex justify-center items-center relative w-full mt-8 lg:mt-0">
            {/* Decorative Gradient Circles */}
            <div className="absolute top-10 right-10 w-48 h-48 bg-[#22C55E]/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 left-10 w-52 h-52 bg-[#F97316]/20 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0E5B47]/30 rounded-full blur-3xl"></div>

            <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[420px]">
              {/* Main Circular Image — scaled proportionally */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-8 border-white/10 shadow-2xl mx-auto shrink-0">
                <img
                  src="/hero-image.jpg"
                  alt="Abstract Submission"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-3 sm:-top-5 -right-0 sm:-right-2 lg:-right-6 bg-white text-gray-800 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap z-10">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#22C55E] flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm">Ethical & Transparent</span>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 lg:-right-10 bg-white text-gray-800 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap z-10">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#F97316] flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm">Peer Reviewed</span>
              </div>

              <div className="absolute -bottom-3 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-white text-gray-800 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap z-10">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[#22C55E] flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm">Open Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
