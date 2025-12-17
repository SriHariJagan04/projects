import React from 'react';
import styles from './about.module.css';

const founders = [
  {
    name: "Harish Kumar",
    image: "http://images.icon-icons.com/4076/PNG/512/account_username_people_avatar_profile_person_user_icon_258905.png", // Ensure correct path
    bio: `Harish Kumar is a seasoned data and cloud technology leader with over 15 years of experience delivering enterprise-scale data solutions. Prior to founding this venture, he held senior roles at top-tier organizations including Microsoft, where he led complex Azure Data implementations for Fortune 500 clients. His core expertise lies in Azure ecosystem, big data engineering, and production-grade analytics. Harish has a strong track record of leading cross-functional teams, driving digital transformation, and aligning technical outcomes with business goals. Known for his deep technical acumen and stakeholder management, he consistently delivers impactful and scalable data platforms.`,
  },
  {
    name: "Sunil Mehta",
    image: "https://img.freepik.com/vector-premium/hombre-icono-chaqueta-amarilla-estilo-plano-sobre-fondo-blanco_96318-14531.jpg", // Ensure correct path
    bio: `Sunil Mehta is an accomplished technology and transformation leader with a proven track record of delivering complex, large-scale tech initiatives. Before founding this venture, he amassed 20+ years of corporate experience, including 17+ years in the BFSI domain, working with global institutions such as S&P Global, NatWest Group, and FIS. He has held senior technology leadership roles driving engineering excellence, scaled Agile transformation, and cloud modernization across capital markets and regulatory platforms. Sunil has consistently built high-performing teams, executed multi-million-dollar programs, and driven enterprise agility. His strengths lie in delivering business-aligned innovation, nurturing talent, and managing global stakeholders to create sustained value.`,
  },
];


const values = [
  { title: 'Integrity', desc: 'We act with honesty, transparency, and unwavering ethical standards.' },
  { title: 'Innovation', desc: 'We embrace change and deliver forward-looking solutions.' },
  { title: 'Client-Centricity', desc: 'We prioritize long-term client success above all.' },
  { title: 'Excellence', desc: 'We pursue quality relentlessly and exceed expectations.' },
  { title: 'Collaboration', desc: 'We foster teamwork, respect, and shared growth.' },
];

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.intro}>
        <h1>NayaDrishti Founders</h1>
        <div className={styles.founders}>
          {founders.map((founder, index) => (
            <div key={index} className={styles.founderCard}>
              <img src={founder.image} alt={founder.name} />
              <div>
                <h3>{founder.name}</h3>
                <p>{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.visionMission}>
        <div>
          <h2>Vision Statement</h2>
          <p>
            To be the most trusted catalyst for digital transformation, redefining the future of business through fresh perspectives and purposeful innovation.
          </p>
        </div>
        <div>
          <h2>Mission Statement</h2>
          <p>
            At NayaDrishti Consulting, we empower organizations worldwide by blending cutting-edge technology with strategic insight. We deliver transformative IT and HR solutions that unlock agility, resilience, and growth for the future-ready enterprise.
          </p>
        </div>
      </section>

      <section className={styles.coreValues}>
        <h2>Core Values</h2>
        <div className={styles.valuesGrid}>
          {values.map((val, index) => (
            <div key={index} className={styles.valueCard}>
              <h4>{val.title}</h4>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
