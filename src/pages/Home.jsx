import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Pricing from "../components/home/Pricing";
import Footer from "../components/home/Footer";

const COLORS_TOP = [
  "#660000",
  "#20124d",
  "#274e13",
  "#4c1130",
  "#1E67C6",
  "#DD335C",
  "#274e13",
];

export default function Home() {
  const color = useMotionValue(COLORS_TOP[0]);
  const [showStars, setShowStars] = useState(true);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 35,
      repeat: Infinity,
      repeatType: "mirror",
    });

    // Disable stars on small screens
    if (window.innerWidth < 768) {
      setShowStars(false);
    }
  }, []);

  const backgroundImage = useMotionTemplate`
  radial-gradient(
    100% 60% at 50% 0%,
    ${color} 0%,
    transparent 55%
  ),
  radial-gradient(
    125% 105% at 50% 0%,
    rgba(2, 6, 23, 1) 45%,
    ${color} 100%
  )
  `;

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <>
      <motion.section
        style={{ backgroundImage }}
        className="relative min-h-screen overflow-hidden bg-gray-950 text-gray-200"
      >
        {/* Background Stars */}
        {showStars && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 1.5]}>
              <Stars radius={50} count={800} factor={3} fade speed={1} />
            </Canvas>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 px-4 py-24">
          <Navbar />
          <Hero border={border} boxShadow={boxShadow} />
          <Features />
          <Pricing />
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
