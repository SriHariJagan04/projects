
export const aboutCompany = {
  cards: [
    { value: "20", name: "years of expertise" },
    { value: "10", name: "IT professionals" },
    { value: "5", name: "success stories" },
    { value: "3", name: "industries covered" },
  ],
  dec: "NayaDrishti Consulting is a leading Technology and IT Services company based in India, delivering IT Strategy, Consulting, Custom Software Development services and HR consulting to clients globally.",
   companies: [
    { name: "TTL", logo: "/Images/ttl-logo.jpeg" },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
    {
      name: "Adobe",
      logo: "https://logo.clearbit.com/adobe.com",
    },
    {
      name: "Meta",
      logo: "https://logo.clearbit.com/meta.com",
    },
  ],
};




export const OurOffering = [
  {
    title: "Software Development",
    description:
      "A software development company with 20 years of business excellence, we can engineer reliable, scalable and secure software solutions for any OS, browser and device. We bring together deep industry expertise and the latest IT advancements to deliver custom solutions and products that perfectly fit the needs and behavior of their users.",
    sublinks: [
      { label: "Custom App Development", href: "" },
      { label: "Enterprise Systems", href: "" },
      { label: "Web Development", href: "" },
      { label: "Mobile Development", href: "" },
      { label: "API Integrations", href: "" },
      { label: "Legacy System Modernization", href: "" },
      { label: "UI/UX Engineering", href: "" },
      { label: "Cloud-Native Development", href: "" },
    ],
  },
  {
    title: "HR Consulting",
    description:
      "We provide expert HR consulting to help organizations build strong teams, improve employee engagement, and streamline HR processes, enabling sustainable business growth.",
    sublinks: [
      { label: "Talent Acquisition", href: "" },
      { label: "Organizational Development", href: "" },
      { label: "Employee Engagement", href: "" },
      { label: "Compensation & Benefits Consulting", href: "" },
      { label: "HR Policy Design", href: "" },
      { label: "Compliance & Labor Law Advisory", href: "" },
      { label: "Training & Development", href: "" },
    ],
  },
  {
    title: "IT Services",
    description:
      "We offer a wide range of IT services including consulting, infrastructure setup, support, and cloud services to help you stay competitive in a digital world.",
    sublinks: [
      { label: "IT Consulting", href: "" },
      { label: "Infrastructure Management", href: "" },
      { label: "Cloud Services", href: "" },
      { label: "IT Support & Helpdesk", href: "" },
      { label: "Network Security", href: "" },
      { label: "Disaster Recovery", href: "" },
      { label: "System Integration", href: "" },
    ],
  },
  {
    title: "Testing & QA",
    description:
      "Our experts can help to plan and implement an effective IT strategy, assist in smooth digital transformation and system integration as well as advise on improvements to your digital customer experience.",
    sublinks: [
      { label: "QA Outsourcing", href: "" },
      { label: "QA Consulting", href: "" },
      { label: "Functional Testing", href: "" },
      { label: "Usability Testing", href: "" },
      { label: "Performance Testing", href: "" },
      { label: "Test Automation", href: "" },
      { label: "Security Testing", href: "" },
      { label: "Penetration Testing", href: "" },
    ],
  },
];



import { 
  Factory, 
  Building2, 
  HeartPulse, 
  MonitorSmartphone, 
  TestTube, 
  Pill, 
  Umbrella, 
  Plane, 
  Hotel, 
  MapPinned, 
  ShoppingCart, 
  CreditCard, 
  Banknote, 
  PieChart 
} from "lucide-react";

export const IndustriesData = [
  {
    category: "Manufacturing",
    items: [
      { title: "Industrial Machinery", icon: Factory },
      { title: "Construction & Engineering", icon: Building2 },
      { title: "Electronics & Semiconductors", icon: MonitorSmartphone },
      { title: "Automotive", icon: TestTube },
      { title: "Textile & Apparel", icon: Umbrella }
    ]
  },
  {
    category: "Travel",
    items: [
      { title: "Airlines & Aviation", icon: Plane },
      { title: "Hospitality & Hotels", icon: Hotel },
      { title: "Tourism Agencies", icon: MapPinned },
      { title: "Cruise Lines", icon: Umbrella },
      { title: "Travel Tech", icon: MonitorSmartphone }
    ]
  },
  {
    category: "Banking and Finance",
    items: [
      { title: "Retail Banking", icon: Banknote },
      { title: "Investment Banking", icon: PieChart },
      { title: "Insurance", icon: Umbrella },
      { title: "FinTech", icon: MonitorSmartphone },
      { title: "Payments & Wallets", icon: CreditCard }
    ]
  }
];



export const projectDetails = [
  {
    title: 'RoadSight – Smart Road Condition Analytics',
    image: 'https://wallpapercave.com/uwp/uwp4794860.jpeg',
    details: `**Product Summary**  
RoadSight is an intelligent software platform designed to revolutionize road condition analysis for road construction, maintenance, and infrastructure management. It processes raw profiling data (e.g., from Large Profiling Systems) and provides automated, map-based insights that eliminate manual work, increase data accuracy, and accelerate road repair and planning.

**Key Features**  
- Data Consolidation: Merges raw profiling data (1-meter resolution) from Excel files.  
- Automated Road Analytics: Calculates pothole count, surface roughness, crack severity, and road condition index.  
- Geo-Tagging: Maps issues with latitude, longitude, and altitude.  
- Map-Based Visualization: Exportable to Google Maps for inspection and reporting.  
- Multi-Dimensional Filtering: Sort by region, segment, date, issue type, and severity.  
- AI-Ready Architecture: Structured for predictive modeling (e.g., cost, cause, timeline).

**Industry Use Cases**  
- Road Construction: Validate quality and generate reports.  
- Public Works Departments: Prioritize repair based on analytics.  
- Municipalities: Dashboard for road health & pothole density.  
- Highway Concessionaires: Monitor deterioration for toll roads.  
- Consultants: Use data for planning and auditing.  
- GIS/Urban Planners: Integrate into infrastructure tools.

**Benefits**  
- Time Savings: Automates cleaning, consolidation, and analysis.  
- Location Intelligence: Pinpoint segment issues in real-time.  
- Data-Driven Decisions: Replace manual checks with analytics.  
- Audit-Ready Reports: Standardized output for compliance.  
- AI Integration: Predict failures, costs, and timelines.

**Future Enhancements**  
- Predictive AI Models  
- Auto Repair Recommendations  
- Smart Scheduling Engine

**Target Users**  
- Road Engineers, Project Managers, Auditors, Government Agencies, Urban Planners.`,
  },

  {
    title: 'RoadEye – AI-Powered Vehicle Detection & Traffic Analytics',
    image: 'https://wallpapercave.com/wp/wp13766511.png',
    details: `**Overview**  
RoadEye is a powerful AI-driven desktop application for real-time and post-analysis of traffic. Using video feeds (CCTV/recordings), it detects and categorizes vehicle movement and provides actionable traffic insights.

**Key Features**  
- Real-Time Vehicle Counting: Live or recorded detection.  
- Custom Categorization: Car, Truck, Auto, SUV, Sedan, Pickup.  
- Directional Analysis: Incoming/outgoing movement detection.  
- Timestamp Logging: Logs exact time of vehicle passage.  
- Speed Detection: Uses motion tracking for speed estimates.  
- Automated Reporting: Generates visual/tabular exportable reports.

**AI Capabilities**  
- Object Detection: ML models for vehicle identification.  
- Motion Estimation: Analyzes frames for direction/speed.

**Future Enhancements**  
- ANPR (License Plate Recognition)  
- Searchable Vehicle Records  
- Centralized Dashboard (Cloud-based)

**Technical Specs**  
- Platform: Desktop Application  
- Tech Stack: Python (OpenCV, TensorFlow/PyTorch, Pandas, etc.)  
- Input: CCTV feeds, recorded videos  
- Output: Dashboards, reports, searchable logs

**Use Cases by Industry**  
- Smart Cities: Traffic flow & congestion planning  
- Law Enforcement: Vehicle tracking, red-light violations  
- Transportation Depts: Signal design, road usage  
- Toll Booths: Vehicle classification and billing  
- Logistics: Vehicle tracking at depots and warehouses  
- Commercial Complexes: Parking and traffic analytics  
- SEZs/Airports: Entry/exit tracking and safety

**Impact**  
RoadEye improves road safety, planning, and law enforcement through real-time analytics, helping to build smarter, safer cities.`,
  },

  {
    title: 'Civil AI – Smart Office Automation for Civil Engineering',
    image: 'http://wallpapercave.com/uwp/uwp4392062.jpeg',
    details: `**Product Summary**  
Civil AI is an AI-powered productivity tool designed for civil engineering offices. It automates data extraction, estimation, and task management by integrating data from emails, WhatsApp, and other messages into centralized dashboards. Civil AI offers smart voice-activated control and intelligent estimation.

**Key Features**  
- Multi-language NLP: Understands Hindi and English inputs.  
- Smart Data Extraction: Pulls info from emails and WhatsApp.  
- AI-Based Estimation: Auto-calculates cost and material estimates.  
- Master Data Integration: Links estimates with existing project databases.  
- Daily Planner: Auto-generated task lists and calendar sync.  
- Voice Interface: Hands-free command execution.  
- Web-Based UI: Browser-accessible and easy to use.  
- Role-Based Access: Secure multi-level access control.

**System Architecture**  
- Data Input Layer: Ingests chat/text/email data  
- Processing Layer: NLP and ML structuring  
- Integration Layer: Syncs to project databases  
- Visualization Layer: Dashboards and planners

**Future Enhancements**  
- WhatsApp API Support  
- Voice Call Transcription  
- Handwritten Document Parsing  
- PDF/Excel Automation  
- Custom ERP Integration

**Benefits**  
- Boost Productivity: Automates manual work  
- Real-Time Insights: Live dashboard updates  
- Smart Estimations: Less planning effort  
- Voice Access: Improves ease of use  
- Secure Compliance: Role-based access

**Target Users**  
- Site Engineers: Task planning and updates  
- Project Managers: Real-time team tracking  
- Admins: Communication and document handling`,
  },
];


export const clientData = [
    {
      logo: "https://www.creativefabrica.com/wp-content/uploads/2022/05/06/Best-Creative-R-Logo-Design-Graphics-30151648-1-1-580x387.jpg",
      avatar: "https://cdn-icons-png.flaticon.com/512/5951/5951752.png",
      name: "Heather Owen Nigl",
      role: "Chief Financial Officer",
      linkedIn: "https://linkedin.com/in/heather",
      feedback:
        "ScienceSoft’s team members proved to be extremely flexible and responsive. They stayed in daily contact with us and delivered demos every other week so that we could be sure that the invoicing system was aligned with our business needs. We have already engaged ScienceSoft in supporting the solution.",
      rating: 5,
      originalLink: "#",
      projectLink: "#",
    },
    {
      logo: "https://i.pinimg.com/736x/5c/9e/56/5c9e56f8d2ee277d5c43b7258a8001fa.jpg",
      avatar: "https://cdn-icons-png.flaticon.com/512/5951/5951752.png",
      name: "Maria Zannes",
      role: "President & CEO",
      linkedIn: "https://linkedin.com/in/maria",
      feedback:
        "ScienceSoft has been a competent partner for application development. Their developers are reliable, thorough, smart, available, extremely good communicators and very friendly. We look forward to working with them over the long term and would recommend hiring ScienceSoft.",
      rating: 5,
      originalLink: "#",
      projectLink: "#",
    },
  ];
