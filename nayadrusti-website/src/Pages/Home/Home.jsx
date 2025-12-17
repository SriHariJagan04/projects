import React, { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";
import { motion } from "framer-motion";
import TypingEffect from "../../Components/TypingEffect/TypingEffect";

const Home = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // const text = "we serve clients who lead with purpose. Our consultancy empowers decision-makers with the clarity to act and the wisdom to grow."
  const text = "NayaDrishti Consulting is a leading Technology and IT Services company based in India, delivering IT Strategy, Consulting, Custom Software Development services and HR consulting to clients globally."

 useEffect(() => {
  let effectInstance;

  const loadScripts = async () => {
    const THREE = await import("three");
    const VANTA = await import("vanta/dist/vanta.globe.min");

    if (!vantaEffect) {
      effectInstance = VANTA.default({
        vertexColors: true,
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xDFD0B8,
        color2: 0xFF6500,
        backgroundColor: 0x222831,
      });
      setVantaEffect(effectInstance);
    }
  };

  loadScripts();

  return () => {
    if (effectInstance) effectInstance.destroy();
  };
}, []);


  return (
    <div ref={vantaRef} className={styles.homeContainer}>
      <div className={styles.content}>
        <motion.h2
          className={styles.animatedTitle}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          NayaDrishti Consulting
          <span>NayaDrishti Consulting</span>
          <span>NayaDrishti Consulting</span>
          <span>Your Vision, Reimagined.</span>
        </motion.h2>

        <section>
          {/* <TypingEffect text={text}/> */}
          {text}
        </section>
      </div>
    </div>
  );
};

export default Home;
