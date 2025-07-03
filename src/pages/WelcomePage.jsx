import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";



export default function WelcomePage() {
  // No need for body padding as we'll handle spacing in the component

  return (
    <div className="bg-[#181A20] min-h-screen flex flex-col pt-16">
      <Navbar />
      

      {/* HERO SECTION */}
      <section
        className="relative flex items-center min-h-[70vh] px-4 py-28 sm:px-8 z-0"
        style={{
          backgroundImage: "url('/path/to/your/hero-bg.jpg')", // Replace with your image
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="max-w-2xl z-10 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Hire the best freelancers for any job, online.
          </h1>
          <ul className="text-white text-base sm:text-lg mb-6 sm:mb-8 space-y-2">
            <li className="flex items-start"><span className="mr-2 text-pink-500">•</span> World's largest freelance marketplace</li>
            <li className="flex items-start"><span className="mr-2 text-pink-500">•</span> Any job you can possibly think of</li>
            <li className="flex items-start"><span className="mr-2 text-pink-500">•</span> Save up to 90% & get quotes for free</li>
            <li className="flex items-start"><span className="mr-2 text-pink-500">•</span> Pay only when you're 100% happy</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-md text-base sm:text-lg w-full sm:w-auto transition-colors">
              Hire a Freelancer
            </button>
            <button className="border border-white text-white font-semibold py-3 px-6 rounded-md text-base sm:text-lg hover:bg-white hover:text-black w-full sm:w-auto transition-colors">
              Earn Money Freelancing
            </button>
          </div>
        </div>
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/70 z-0" />
      </section>

      {/* ORGANIZATION POWER SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 py-12 sm:py-16 bg-[#181A20]">
        <div className="flex-1 text-white w-full md:max-w-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 leading-tight">
            Power your organisation's <span className="text-pink-500">competitive advantage</span>
          </h2>
          <div className="space-y-6 sm:space-y-8">
            <div className="p-4 rounded-lg hover:bg-[#23262F] transition-colors">
              <h3 className="font-bold text-lg mb-2">Freelancer Enterprise</h3>
              <p className="mb-3 text-gray-300">
                Company budget? Get more done for less. Use our workforce of millions to help your business achieve more.
              </p>
              <a href="#" className="text-pink-500 font-semibold inline-flex items-center hover:underline">View more <span className="ml-1">→</span></a>
            </div>
            <div className="p-4 rounded-lg hover:bg-[#23262F] transition-colors">
              <h3 className="font-bold text-lg mb-2">Innovation Challenges</h3>
              <p className="mb-3 text-gray-300">
                Transform impossible challenges into breakthrough solutions through the world's largest innovation ecosystem.
              </p>
              <a href="#" className="text-pink-500 font-semibold inline-flex items-center hover:underline">View more <span className="ml-1">→</span></a>
            </div>
            <div className="p-4 rounded-lg hover:bg-[#23262F] transition-colors">
              <h3 className="font-bold text-lg mb-2">Freelancer API</h3>
              <p className="mb-3 text-gray-300">
                Millions of professionals on demand. Why hire people when you can simply integrate our talented cloud workforce instead?
              </p>
              <a href="#" className="text-pink-500 font-semibold inline-flex items-center hover:underline">View more <span className="ml-1">→</span></a>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0 w-full">
          <img
            src="/path/to/hummingbird-globe.png" // Replace with your image
            alt="Hummingbird Globe"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
            loading="lazy"
          />
        </div>
      </section>

      {/* BRAND LOGOS */}
      <section className="bg-[#14151a] py-8 px-4">
        <p className="text-center text-white text-sm mb-4 opacity-70">As used by</p>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 items-center">
          {/* Replace with <img src={...}/> for real logos */}
          {["Adobe", "Facebook", "Deloitte", "IBM", "Airbus", "Telstra", "Fujitsu", "Google"].map((brand, i) => (
            <span key={i} className="text-white text-base sm:text-lg opacity-70 font-semibold px-2 py-1">{brand}</span>
          ))}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center sm:text-left">
          Make it real <span className="text-pink-500">with Freelancer</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-white">
          <div className="bg-[#23262F] p-5 rounded-lg hover:bg-[#2a2d36] transition-colors">
            <div className="text-pink-500 text-2xl mb-3">💼</div>
            <h3 className="font-bold text-lg mb-3">The best talent</h3>
            <p className="text-gray-300">Discover reliable professionals by exploring their portfolios and immersing yourself in the feedback shared on their profiles.</p>
          </div>
          <div className="bg-[#23262F] p-5 rounded-lg hover:bg-[#2a2d36] transition-colors">
            <div className="text-pink-500 text-2xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-3">Fast bids</h3>
            <p className="text-gray-300">Get quick, no-obligation quotes from skilled freelancers. 80% of jobs receive bids within 60 seconds.</p>
          </div>
          <div className="bg-[#23262F] p-5 rounded-lg hover:bg-[#2a2d36] transition-colors">
            <div className="text-pink-500 text-2xl mb-3">✨</div>
            <h3 className="font-bold text-lg mb-3">Quality work</h3>
            <p className="text-gray-300">With Freelancer's talent pool of over 70 million professionals, you'll find the right expert for your project.</p>
          </div>
          <div className="bg-[#23262F] p-5 rounded-lg hover:bg-[#2a2d36] transition-colors">
            <div className="text-pink-500 text-2xl mb-3">🔄</div>
            <h3 className="font-bold text-lg mb-3">Be in control</h3>
            <p className="text-gray-300">Stay in the loop with the new project management dashboard, messaging, and milestone payments.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}