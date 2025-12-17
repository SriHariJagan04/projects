import React, { useState } from "react";
import styles from "./Services.module.css";

import { OurOffering } from '../../data'

// const services = [
//   {
//     title: "Software development",
//     description:
//       "A software development company with 35 years of business excellence, we can engineer reliable, scalable and secure software solutions for any OS, browser and device. We bring together deep industry expertise and the latest IT advancements to deliver custom solutions and products that perfectly fit the needs and behavior of their users.",
//     sublinks: [
//       { label: "Custom app development", href: "/services/software/custom-apps" },
//       { label: "Enterprise systems", href: "/services/software/enterprise" },
//       { label: "Web development", href: "/services/software/web" },
//       { label: "Mobile development" },
//       { label: "API integrations", href: "/services/software/apis" },
//       { label: "Legacy system modernization", href: "/services/software/modernization" },
//       { label: "UI/UX engineering" },
//       { label: "Cloud-native development", href: "/services/software/cloud" },
//     ],
//   },
//   {
//     title: "Testing & QA",
//     description:
//       "Our experts can help to plan and implement an effective IT strategy, assist in smooth digital transformation and system integration as well as advise on improvements to your digital customer experience.",
//     sublinks: [
//       { label: "QA outsourcing", href: "/services/qa/outsourcing" },
//       { label: "QA consulting", href: "/services/qa/consulting" },
//       { label: "Functional testing" },
//       { label: "Usability testing", href: "/services/qa/usability" },
//       { label: "Performance testing", href: "/services/qa/performance" },
//       { label: "Test automation", href: "/services/qa/automation" },
//       { label: "Security testing", href: "/services/qa/security" },
//       { label: "Penetration testing", href: "/services/qa/penetration" },
//     ],
//   },
// ];

const Services = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = OurOffering[activeIndex];

  return (
    <div className={styles.serviceContainer}>
      <h2 className={styles.serviceTitle}>Explore Our Offering</h2>
      <div className={styles.serviceCard}>
        <div className={styles.leftCard}>
          <ul className={styles.leftList}>
            {OurOffering.map((s, i) => (
              <li
                key={i}
                className={`${styles.listItem} ${i === activeIndex ? styles.active : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                {s.title}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.rightCard}>
          <h3 className={styles.cardTitle}>{activeService.title}</h3>
          <p className={styles.cardDesc}>{activeService.description}</p>
          <div className={styles.linksGrid}>
            {activeService.sublinks.map((item, idx) =>
              item.href ? (
                <a key={idx} href={item.href} className={styles.linkItem}>
                  {item.label}
                </a>
              ) : (
                <span key={idx} className={styles.linkItem}>
                  {item.label}
                </span>
              )
            )}
          </div>
          {/* <a href="#" className={styles.detailsLink}>
              Check details →
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Services;
