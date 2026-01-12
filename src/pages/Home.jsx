import React, { useRef } from "react";
import { Link } from "react-router-dom";
import LiquidEther from "../components/home/LiquidEther";

import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Pricing from "../components/home/Pricing";
import Feedback from "../components/Feedback";
import Footer from "../components/home/Footer";

export default function Home() {
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const feedbackRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToFeedback = () => {
    feedbackRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#020617] text-gray-200">
        {/* Background layer */}
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={35}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={true}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
          {/* Dark overlay */}
          {/* <div className="absolute inset-0 bg-black/10" /> */}
        </div>

        {/* Content layer */}
        <div className="relative z-10 px-4 py-24">
          <Navbar
            onHomeClick={scrollToTop}
            onFeaturesClick={scrollToFeatures}
            onPricingClick={scrollToPricing}
            onFeedbackClick={scrollToFeedback}
          />

          <Hero />

          <div ref={featuresRef}>
            <Features />
          </div>

          <div ref={pricingRef}>
            <Pricing />
          </div>

          <div ref={feedbackRef}>
            <Feedback />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
