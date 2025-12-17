import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling down
        setHideHeader(true);
      } else {
        // Scrolling up
        setHideHeader(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigateScroll = (e, id) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      sessionStorage.setItem("scrollTo", id);
      navigate("/");
    }
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${hideHeader ? styles.hide : ""}`}>
      <div className={styles.container}>
        <a href="#" className={styles.logo} onClick={(e) => handleNavigateScroll(e, "home")}>
          NayaDrishti Consulting
        </a>

        <div className={styles.toggle} onClick={() => setMenuOpen(true)}>
          <HiMenuAlt3 />
        </div>

        <nav
          ref={navRef}
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        >
          <div className={styles.navCloseMobile} onClick={() => setMenuOpen(false)}>
            <IoClose />
          </div>

          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/about" onClick={() => setMenuOpen(false)} className={styles.navLink}>About</Link>
            </li>
            <li className={styles.navItem}>
              <a onClick={(e) => handleNavigateScroll(e, "services")} className={styles.navLink}>
                Services
              </a>
            </li>
            <li className={styles.navItem}>
              <a onClick={(e) => handleNavigateScroll(e, "industry")} className={styles.navLink}>
                Industry
              </a>
            </li>
            <li className={styles.navItem}>
              <a onClick={(e) => handleNavigateScroll(e, "projects")} className={styles.navLink}>
                Projects
              </a>
            </li>
            <li className={styles.navItem}>
              <a onClick={(e) => handleNavigateScroll(e, "clients")} className={styles.navLink}>
                Clients
              </a>
            </li>
            <li className={styles.navItem}>
              <a onClick={(e) => handleNavigateScroll(e, "contact")} className={styles.navLink}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;


// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./header.module.css";
// import { HiMenuAlt3 } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const navRef = useRef();

//   const handleDropdownToggle = (index) => {
//     setDropdownOpen(dropdownOpen === index ? null : index);
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (navRef.current && !navRef.current.contains(e.target)) {
//         setDropdownOpen(null);
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const dropdownLinks = {
//     Services: [
//       { label: "About", path: "/a123" },
//       { label: "Bottle", path: "/b345" },
//       { label: "Cars", path: "#" }, // update if needed
//     ],
//     Industries: [
//       { label: "1", path: "/abc" },
//       { label: "2", path: "/def" },
//       { label: "3", path: "#" }, // update if needed
//     ],
//   };

//   const labels = Object.keys(dropdownLinks);

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         <Link to="/" className={styles.logo}>
//           NayaDrishti Consulting
//         </Link>

//         <div className={styles.toggle} onClick={() => setMenuOpen(true)}>
//           <HiMenuAlt3 />
//         </div>

//         <nav
//           ref={navRef}
//           className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
//         >
//           <div
//             className={styles.navCloseMobile}
//             onClick={() => setMenuOpen(false)}
//           >
//             <IoClose />
//           </div>

//           <ul className={styles.navList}>

//             <li className={styles.navItem}>
//               <Link to="/about" className={styles.navLink}>
//                 About
//               </Link>
//             </li>

//             {labels.map((label, index) => (
//               <li key={index} className={styles.navItem}>
//                 <div
//                   className={styles.navLink}
//                   onClick={() => handleDropdownToggle(index)}
//                 >
//                   {label}
//                   {dropdownOpen === index ? (
//                     <MdKeyboardArrowUp className={styles.arrowIcon} />
//                   ) : (
//                     <MdKeyboardArrowDown className={styles.arrowIcon} />
//                   )}
//                 </div>

//                 <ul
//                   className={`${styles.dropdown} ${
//                     dropdownOpen === index ? styles.show : ""
//                   }`}
//                 >
//                   {dropdownLinks[label].map((item, idx) => (
//                     <li key={idx}>
//                       <Link to={item.path}>{item.label}</Link>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}

//             <li className={styles.navItem}>
//               <Link to="/contact" className={styles.navLink}>
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
