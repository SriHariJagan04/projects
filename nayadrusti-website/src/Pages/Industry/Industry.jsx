import React from "react";
import styles from "./industry.module.css";
import IndustryCard from "./IndustryCard";
import {
  HeartPulse,
  MonitorSmartphone,
  TestTube,
  Pill,
  Umbrella,
} from "lucide-react";

import { IndustriesData } from "../../data";

const Industry = () => {
  // const industries = [
  //   { title: 'Healthcare providers', icon: <HeartPulse />, },
  //   { title: 'Medical devices & diagnostics', icon: <MonitorSmartphone />,},
  //   { title: 'Medical laboratories', icon: <TestTube />,},
  //   { title: 'Biotech & pharma', icon: <Pill />,},
  //   { title: 'Healthcare payers', icon: <Umbrella />, },
  // ];

  return (
    <div className={styles.industriesContainer}>
      <h2 className={styles.heading}>Our Industry Expertise</h2>
      <p className={styles.subtitle}>
        We’ve excelled our experience in a wide range of industries to bring
        valuable insights and provide our clients with truly beneficial
        solutions.
      </p>

      {IndustriesData.map((group, i) => (
        <div key={i}>
          <h3 className={styles.sectionTitle}>{group.category}</h3>
          <div className={styles.cardGrid}>
            {group.items.map((item, j) => {
              const Icon = item.icon;
              return(
              <IndustryCard
                key={j}
                title={item.title}
                icon={<Icon />}
                active={item.active}
              />
            )})}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Industry;
