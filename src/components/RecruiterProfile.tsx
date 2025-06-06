import React, { useEffect, useState, useRef } from "react";
import "../stylesheets/RecruiterProfile.css";
import { FiSearch, FiBell, FiVolume2, FiVolumeX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  MdEdit,
  MdImportExport,
  MdPersonOutline,
  MdHelpOutline,
} from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";

const profileOptions = [
  { name: "Recruiter", image: "/images/blue.png" },
  { name: "Friend", image: "/images/yellow.png" },
  { name: "Stalker", image: "/images/red.png" },
];

const skills = [
  {
    id: 1,
    name: "Java",
    image: "/images/java.png",
  },
  {
    id: 2,
    name: "Rust",
    image: "/images/rust.png",
  },
  {
    id: 3,
    name: "Python",
    image: "/images/python.png",
  },
  {
    id: 4,
    name: "Ocaml",
    image: "/images/ocaml.png",
  },
  {
    id: 5,
    name: "Assembly",
    image: "/images/assembly.png",
  },
  { id: 6, name: "TypeScript", image: "/images/typescript.png" },
  { id: 7, name: "SQL", image: "/images/sql.png" },
  { id: 8, name: "HTML", image: "/images/html.png" },
  { id: 9, name: "CSS", image: "/images/css.png" },
  { id: 10, name: "Ruby", image: "/images/ruby.png" },
  { id: 11, name: "C", image: "/images/c.png" },
  { id: 12, name: "C++", image: "/images/c++.png" },
  { id: 13, name: "AWS", image: "/images/aws.png" },
  { id: 14, name: "Git", image: "/images/git.png" },
  { id: 15, name: "Oracle Database", image: "/images/oracledatabase.png" },
  { id: 16, name: "Tensorflow", image: "/images/tensorflow.png" },
  { id: 17, name: "Pytorch", image: "/images/pytorch.png" },
  { id: 18, name: "Flask", image: "/images/flask.png" },
  { id: 19, name: "Selenium", image: "/images/selenium.png" },
  { id: 20, name: "Cypress", image: "/images/cypress.png" },
  { id: 21, name: "React", image: "/images/react.png" },
  { id: 22, name: "Oracle ERP", image: "/images/oracleerp.png" },
  { id: 23, name: "Pytest", image: "/images/pytest.png" },
  { id: 24, name: "Bamboo", image: "/images/bamboo.png" },
  { id: 25, name: "CAD", image: "/images/cad.png" },
  { id: 26, name: "SolidWords", image: "/images/solidworks.png" },
  { id: 27, name: "Jest", image: "/images/jest.png" },
];

const courses = [
  {
    id: 1,
    name: "Computer Systems (CMSC216)",
    image: "/images/computer_systems.png",
    description:
      "Intro to C, Linux, assembly, memory management, threads, and system-level programming.",
  },
  {
    id: 2,
    name: "Object Oriented Programming (CMSC131/CMSC132)",
    image: "/images/oop.png",
    description:
      "Java-based course on abstraction, encapsulation, inheritance, polymorphism, and data structures.",
  },
  {
    id: 3,
    name: "Discrete Structures (CMSC250)",
    image: "/images/discrete.png",
    description:
      "Mathematical foundations of CS: logic, proofs, set theory, graphs, and combinatorics.",
  },
  {
    id: 4,
    name: "Linear Algebra (MATH240)",
    image: "/images/linear_algebra.png",
    description:
      "Vector spaces, matrices, eigenvalues, and applications in computer science and engineering.",
  },
  {
    id: 5,
    name: "Algorithms (CMSC351)",
    image: "/images/algorithms.png",
    description:
      "Design and analysis of algorithms including sorting, dynamic programming, and graph theory.",
  },
  {
    id: 6,
    name: "Artificial Intelligence (CMSC421)",
    image: "/images/ai.png",
    description:
      "Covers search, reasoning, planning, decision making, and intro to learning in AI systems.",
  },
  {
    id: 7,
    name: "Machine Learning (CMSC422)",
    image: "/images/ml.png",
    description:
      "Supervised/unsupervised learning, model evaluation, and applications in modern AI.",
  },
  {
    id: 8,
    name: "Computer Systems Architecture (CMSC411)",
    image: "/images/architecture.png",
    description:
      "Covers CPUs, pipelining, memory hierarchies, caching, and instruction set architectures.",
  },
  {
    id: 9,
    name: "Probability & Statistics (STAT400)",
    image: "/images/probability.png",
    description:
      "Introduces probability models, random variables, distributions, and statistical inference techniques for data analysis.",
  },
  {
    id: 10,
    name: "Organization of Programming Languages (CMSC330)",
    image: "/images/org_languages.png",
    description:
      "Covers syntax, semantics, and implementation of programming languages including functional and imperative paradigms.",
  },
  {
    id: 11,
    name: "Data Science (CMSC320)",
    image: "/images/data_science.png",
    description:
      "Explores data wrangling, visualization, statistical modeling, and machine learning using real-world datasets.",
  },
  {
    id: 12,
    name: "PM Tools in CS",
    image: "/images/pm_tools.png",
    description:
      "Focuses on project management tools and practices for planning, tracking, and executing software development tasks.",
  },
  {
    id: 13,
    name: "Programming Language Tech & Paradigms (CMSC433)",
    image: "/images/lang_paradigms.png",
    description:
      "Explores different programming paradigms, type systems, evaluation strategies, and language implementation techniques.",
  },
  {
    id: 14,
    name: "Computer & Network Security (CMSC414)",
    image: "/images/security.png",
    description:
      "Studies secure communication, cryptography, system vulnerabilities, and defense strategies in networks and OS.",
  },
  {
    id: 15,
    name: "Advanced Data Structures (CMSC420)",
    image: "/images/data_structures.png",
    description:
      "Explores trees, hash tables, tries, and advanced indexing structures used in modern algorithms and systems.",
  },
];

const experiences = [
  {
    id: 1,
    company: "Amazon Web Services",
    role: "Software Developer Intern",
    location: "Seattle, WA, USA",
    type: "Internship",
    duration: "Jun 2024 - Aug 2024",
    summary: [
      "Developed a centralized outbound throttling mechanism using AWS Throttling Service, reducing Sev 2 incidents by 50% and cutting operational costs through optimized Lambda utilization.",
      "Built and packaged a centralized throttling library leveraging aspect-oriented programming and Dagger, ensuring consistent and scalable outbound throttling across AWS services.",
    ],
    logo: "/images/aws1.png",
  },
  {
    id: 2,
    company: "Vanguard",
    role: "Software Developer Part-time",
    location: "Malvern, PA, USA",
    type: "Part-Time",
    duration: "May 2022 - Jun 2024",
    summary: [
      "Migrated on-premise integrations to AWS cloud, enhancing test coverage and operational efficiency while reducing costs.",
      "Developed a functional CLI and UI with Click, Flask, HTML, and CSS, improving integration monitoring efficiency by 93%.",
      "Automated Oracle regression testing with Cypress, reducing validation time from 20 minutes to 1 minute (95% faster).",
      "Designed an SFTP solution for transferring financial reports and generated insightful OTBI and BIP reports using SQL.",
    ],
    logo: "/images/vanguard.png",
  },
  {
    id: 3,
    company: "Vanguard",
    role: "Software Engineering Intern",
    location: "Malvern, PA, USA",
    type: "Internship",
    duration: "May 2022 - Aug 2022",
    summary: [
      "Built a test CI/CD pipelines using Jenkins and Bamboo, supporting cloud modernization initiatives.",
      "Enhanced automation frameworks with Python and Java, delivering innovative solutions for fintech operations.",
      "Utilized Agile methodologies and SQL expertise to generate and optimize OTBI and BIP reports.",
    ],
    logo: "/images/vanguard.png",
  },
  {
    id: 4,
    company: "University of Maryland",
    role: "Teaching Assistant - CMSC330",
    location: "College Park, MD, USA",
    type: "Part-Time",
    duration: "Aug 2023 - Present",
    summary: [
      "Guided 40 students in mastering programming paradigms, finite automata, context-free grammar, and lambda calculus using OCaml, Rust, Python, and Racket.",
      "Designed and graded projects, quizzes, and exams to reinforce foundational concepts.",
      "Contributed to the development of the Quuly priority queue system, optimizing student office hours.",
    ],
    logo: "/images/umd.png",
  },
  {
    id: 5,
    company: "University of Maryland",
    role: "Undergraduate Researcher",
    location: "College Park, MD, USA",
    type: "Part-Time",
    duration: "Aug 2024 - Present",
    summary: [
      "Optimized building comfort and energy efficiency by analyzing sensor data and patterns.",
      "Explored AR/VR tools for streamlined facility maintenance under the guidance of Ashok Agrawala.",
    ],
    logo: "/images/umd.png",
  },
  {
    id: 6,
    company: "nth Solutions, LLC",
    role: "Data Analyst Part-time",
    location: "Exton, PA, USA",
    type: "Part-Time",
    duration: "Aug 2019 - Aug 2021",
    summary: [
      "Conducted research and development for sustainable technology products, ensuring seamless implementation and documentation.",
      "Performed extensive testing using Matlab and Python to ensure product functionality and performance.",
      "Streamlined data communication between IMU modules and dashboards, optimizing accuracy and reliability.",
    ],
    logo: "/images/nth.png",
  },
  {
    id: 7,
    company: "Break Through Tech",
    role: "Break Through Tech Participant",
    location: "Remote",
    type: "Internship",
    duration: "Jun 2021 - Jul 2021",
    summary: [
      "Collaborated with peers and mentors from Capital One to design innovative transportation solutions for the University of Maryland.",
      "Presented a Python-based solution to address campus transportation challenges, earning recognition from faculty.",
      "Explored opportunities for enhancing efficiency in Maryland’s transit systems, including the Purple Line project.",
    ],
    logo: "/images/btt.png",
  },
  {
    id: 8,
    company: "AGI",
    role: "AGI Software Intern",
    location: "Exton, PA, USA",
    type: "Internship",
    duration: "Jun 2020 - Jul 2020",
    summary: [
      "Completed STK training and analyzed real-world satellite data for aerospace applications.",
      "Gained insights into software’s impact on industry operations through employee and leadership engagement.",
    ],
    logo: "/images/agi.png",
  },
  {
    id: 9,
    company: "Engineering Firm T.L. Holder Inc.",
    role: "CAD Software Programmer Part-time",
    location: "Downingtown, PA, USA",
    type: "Part-Time",
    duration: "Jan 2018 - Jan 2019",
    summary: [
      "Designed SolidWorks models for clients based on precise engineering requirements and standards.",
      "Collaborated with engineers to translate technical ideas into manufacturable CAD designs.",
      "Gained expertise in machine measurements and standard hardware specifications.",
    ],
    logo: "/images/tlholder.png",
  },
];

const projects = [
  {
    id: 1,
    title: "DQN for Lunar Landing",
    image: "/images/lunar.png",
    date: "2024",
    languages: ["Python", "PyTorch", "OpenAI Gymnasium", "TensorFlow"],
    description:
      "Built a Deep Q-Network using PyTorch to train an agent to autonomously land a lunar module by learning physics-based controls through OpenAI Gym simulations.",
    link: "https://github.com/vsoni03/AI-projects/blob/main/Personal_Deep_Q_Learning_for_Lunar_Landing.ipynb",
  },
  {
    id: 2,
    title: "Convolution Neural Network for Pac Man",
    image: "/images/pacman.png",
    date: "2024",
    languages: ["Python", "Pytorch", "OpenAI Gymnasium"],
    description:
      "Developed a convolutional deep Q-learning agent that plays Pac-Man by processing raw game frames to make real-time decisions, combining visual understanding and reinforcement learning.",
    link: "https://github.com/vsoni03/AI-projects/blob/main/Personal_Deep_Convolutional_Q_Learning_for_Pac_Man.ipynb",
  },
  {
    id: 3,
    title: "A3C for Kung Fighting",
    image: "/images/kungfu.png",
    date: "2025",
    languages: ["Python", "PyTorch", "OpenAI Gymnasium", "TensorFlow"],
    description:
      "Trained an A3C agent to master the complex, multi-action environment of Kung Fu Master by running parallel simulations and updating a shared neural network for faster, stable reinforcement learning.",
    link: "https://github.com/vsoni03/AI-projects/blob/main/Personal_A3C_for_Kung_Fu.ipynb",
  },
  {
    id: 4,
    title: "AWS DeepRacer model",
    image: "/images/deepracer.png",
    date: "2025",
    languages: ["Python", "AWS"],
    description:
      "Trained and optimized an autonomous racing agent using AWS DeepRacer, applying Proximal Policy Optimization (PPO) to improve lap times and driving performance through continuous reward tuning and track simulation.",
    link: "",
  },
  {
    id: 5,
    title: "Fine-tuned LLama-2 Chatbot for Medical Diagnosis",
    image: "/images/llama2.png",
    date: "2025",
    languages: ["Python", "LLama 2"],
    description:
      "Customized LLama 2 on medical datasets to build a chatbot that accurately responds to patient health queries in real time, using prompt engineering, supervised fine-tuning (SFT), and retrieval-augmented generation (RAG) for reliable medical assistance.",
    link: "https://github.com/vsoni03/AI-projects/blob/main/Personal_Fine_Tuning_LLMs_with_Hugging_Face.ipynb",
  },
  {
    id: 6,
    title: "Omnifood",
    image: "/images/omnifood.png",
    date: "2023",
    languages: ["HTML", "CSS", "JavaScript"],
    description:
      "Created a food website about employing AI to generate personalized recipes and meal plans based on user preferences.",
    link: "https://onmifood-vruti.netlify.app//",
  },
  {
    id: 7,
    title: "Artificial Intelligence Club Website",
    image: "/images/aiclub.png",
    date: "2021",
    languages: ["HTML", "CSS", "JavaScript"],
    description:
      "Built and managed the Artificial Intelligence Club’s website to highlight member projects, share learning resources, and provide updates on events, fostering collaboration and visibility within the highschool's AI community.",
    link: "https://drive.google.com/drive/folders/12O9FD8LDN8GAv7hUHDbWtmAsaRagFVLA?usp=sharing",
  },
  {
    id: 8,
    title: "College Spark",
    image: "/images/collegespark.png",
    date: "2021",
    languages: ["JavaScript", "HTML", "CSS"],
    description:
      "Developed a survey-based platform to recommend colleges based on student preferences.",
    link: "https://drive.google.com/drive/folders/1_LJamZ7CqBBgfKZXjcU40knomAPPwpjQ?usp=sharing",
  },
  {
    id: 9,
    title: "Smart Park",
    image: "/images/smartpark.png",
    date: "2021",
    languages: ["Python", "Figma"],
    description:
      "Collaborated on a prototype app for Maryland transportation with Capital One and MDOT to ease transportation around campus.",
    link: "https://www.figma.com/community/file/1288301827310882280/smartpark",
  },
  {
    id: 10,
    title: "Shell Junior",
    image: "/images/shell.png",
    date: "2022",
    languages: ["C"],
    description:
      "Built a custom C-based shell for LINUX with support for logical operators and subshell creation that supports sequential command execution along with logical operators like AND, OR, PIPE, and NONE.",
    link: "",
  },
  {
    id: 11,
    title: "Lie Detector",
    image: "/images/lie.png",
    date: "2024",
    languages: ["Arduino", "Python"],
    description:
      "Achieved 84% accuracy using Arduino and Python by measuring human conductivity for lie detection.",
    link: "https://www.youtube.com/watch?v=yoL-0agHGy0&ab_channel=Bitcamp",
  },
];

const activities = [
  {
    id: 1,
    title: "Vex Robotics",
    role: "Programmer and Mentor",
    year: "2014 – Present",
    image: "/images/vex.png",
    links: [
      {
        label: "News Article",
        url: "https://www.dailylocal.com/2015/05/06/downingtown-robotics-team-wins-honors-at-2015-vex-robotics-world-championship/",
      },
      {
        label: "Forum",
        url: "https://www.vexforum.com/t/vexmen-80y-80n-and-81m-reveal/29192",
      },
    ],
  },
  {
    id: 2,
    title: "App Dev Club",
    role: "Mentor",
    year: "2024 – 2025",
    image: "/images/appdev.png",
    links: [
      {
        label: "Lesson Plan",
        url: "https://docs.google.com/document/d/1mNCmr_m5Z3xUXkL5hmDXdTnO7hI8WWaWmjrcBJbI4_o/edit?usp=sharing",
      },
    ],
  },
  {
    id: 3,
    title: "Carillon Communities",
    role: "Ambassador",
    year: "2021 – 2025",
    image: "/images/carillon.png",
    links: [
      {
        label: "Video 1",
        url: "https://www.youtube.com/watch?v=Uk6wzz2hAKY&ab_channel=OfficeofUndergraduateStudies-UMD",
      },
      {
        label: "Video 2",
        url: "https://www.youtube.com/watch?v=9b3wBM0ynmg&ab_channel=OfficeofUndergraduateStudies-UMD",
      },
    ],
  },
  {
    id: 4,
    title: "Terps for Change",
    role: "Terpfarm Volunteer",
    year: "2024 – 2025",
    image: "/images/terps.png",
    links: [],
  },
];

const awards = [
  {
    id: 1,
    title: "Dean's List Recipient",
    issuer: "University of Maryland",
    description:
      "Awarded for earning a semester GPA of 3.5 or higher while completing 12 or more graded credits during a regular semester.",
    image: "/images/deanslist.png",
    year: "2021 – 2025",
  },
  {
    id: 2,
    title: "Excellence Award – VEX Robotics World Qualifier",
    issuer: "VEX Robotics",
    description:
      "Highest honor in the VEX Robotics competition, recognizing overall excellence in design, engineering, and competition performance.",
    link: "https://www.dailylocal.com/2015/05/06/downingtown-robotics-team-wins-honors-at-2015-vex-robotics-world-championship/",
    image: "/images/world.png",
    year: "2015",
  },
  {
    id: 3,
    title: "Poem Publication Finalist",
    issuer: "The Illustrious",
    description:
      "Selected as a finalist and published in 'The Illustrious', a national poetry collection celebrating emerging young writers.",
    image: "/images/poetry.png",
    year: "2018",
  },
  {
    id: 4,
    title: "Letter of Recognition from U.S. Senator",
    issuer: "U.S. Senate",
    description:
      "Received a personal letter of recognition from a U.S. Senator for qualifying and competing in the VEX Robotics World Championship.",
    image: "/images/senatorletter.png",
    year: "2015",
  },
];

const certifications = [
  {
    id: 1,
    title: "Artificial Intelligence A-Z",
    issuer: "Udemy",
    date: "Feb 2025",
    credentialId: "UC-8d068401-5b83-49d7-8b54-e0604b0a2ba4",
    skills: ["Artificial Intelligence"],
    image: "/images/udemy1.png",
    link: "https://www.udemy.com/certificate/UC-8d068401-5b83-49d7-8b54-e0604b0a2ba4",
  },
  {
    id: 2,
    title: "Build Responsive Real-World Websites with HTML and CSS",
    issuer: "Udemy",
    date: "Jan 2024",
    credentialId: "UC-1d840ff8-c673-45fb-9c23-92011a2baaf0",
    skills: ["HTML", "CSS", "JavaScript"],
    image: "/images/udemy2.png",
    link: "https://www.udemy.com/certificate/UC-1d840ff8-c673-45fb-9c23-92011a2baaf0",
  },
  {
    id: 3,
    title: "The Complete Python Developer Certification Course",
    issuer: "Udemy",
    date: "Jul 2022",
    credentialId: "UC-d9b84c35-878f-49bb-8203-d3810657c7d",
    skills: ["Python"],
    image: "/images/udemy3.png",
    link: "https://www.udemy.com/certificate/UC-d9b84c35-878f-49bb-8203-d38101657c7d/",
  },
  {
    id: 4,
    title: "Certification Oracle SQL",
    issuer: "Udemy",
    date: "Jun 2022",
    credentialId: "UC-0b25b856-8116-4c49-8b1d-d8b947b1d1fc",
    skills: ["Oracle SQL Developer", "SQL"],
    image: "/images/udemy4.png",
    link: "https://www.udemy.com/certificate/UC-0b26b856-81f6-4c49-8b1d-d8a947b1d1fc/",
  },
];

const education = [
  {
    id: 1,
    title: "Downingtown STEM Academy",
    image: "/images/downingtown_stem.png",
    date: "2018–2021",
    location: "Downingtown, PA",
    description: [
      "HL: Math Analysis, Business, Economics, Physics",
      "IB program focuses on STEM fields",
      "GPA: 4.3",
    ],
  },
  {
    id: 2,
    title: "University of Maryland, College Park",
    image: "/images/umd.png",
    date: "2021–2025",
    location: "College Park, MD",
    description: [
      "Pursued a B.S. in Computer Science",
      "General Business minor",
      "GPA: 3.8",
    ],
  },
];
const interests = [
  { id: 1, name: "Running", image: "/images/running.png" },
  { id: 2, name: "Yoga", image: "/images/yoga.png" },
  { id: 3, name: "Salsa", image: "/images/salsa.png" },
  { id: 4, name: "Bachata", image: "/images/bachata.png" },
  { id: 5, name: "Pickleball/Tennis", image: "/images/pickleball.png" },
  { id: 6, name: "Swimming", image: "/images/swimming.png" },
  { id: 7, name: "Hiking", image: "/images/hiking.png" },
  { id: 8, name: "Kayaking/Paddleboarding", image: "/images/kayaking.png" },
  { id: 9, name: "Skydiving", image: "/images/skydiving.png" },
];

const RecruiterProfile: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleProfileClick = (name: string) => {
    navigate(`/profile/${name.toLowerCase()}`);
    setShowProfileDropdown(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setScrollY(window.scrollY);

      // Cancel hover card on scroll
      setHoveredSkill(null);
      clearTimeout(hoverTimeoutRef.current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white text-white min-h-screen overflow-x-hidden">
      {/* Header */}
      <header
        // header transition from clear and scroll down will be black background
        className={`fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "bg-black bg-opacity-95 shadow-md" : "bg-transparent"
        }`}
      >
        {/* VRUTI Logo */}
        <div className="flex items-center gap-x-8">
          <h1 className="flex text-3xl md:text-4xl font-bold text-red-700 tracking-normal">
            {["V", "R", "U", "T", "I"].map((char, idx) => (
              <span
                key={idx}
                className={`inline-block transform ${
                  idx === 0
                    ? "rotate-[-6deg] translate-y-[2px]"
                    : idx === 1
                    ? "rotate-[-3deg] translate-y-[1px]"
                    : idx === 2
                    ? "rotate-0"
                    : idx === 3
                    ? "rotate-[3deg] translate-y-[1px]"
                    : "rotate-[6deg] translate-y-[2px]"
                }`}
              >
                {char}
              </span>
            ))}
          </h1>
          {/* Navigation */}
          {/* Navigation Links - all inline */}
          <nav className="flex items-center gap-x-4 text-white text-sm font-medium">
            <a
              href="https://docs.google.com/document/d/1nptZ0FV9AroeSsB0kIWgN1BQX8TW-lpg/edit?usp=sharing&ouid=109617576304378465245&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              Resume
            </a>
            <a href="mailto:vrutisni@gmail.com" className="hover:text-gray-500">
              Email
            </a>
            <a
              href="https://github.com/vsoni03/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vrutisoni/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              LinkedIn
            </a>
          </nav>
        </div>

        {/* Icons Section */}
        {/* Search icon */}
        <div className="flex gap-6 items-center text-white text-2xl">
          <span className="cursor-pointer">
            <FiSearch />
          </span>

          {/* Notification
            Show thwe notifications and not show the profile dropdown
            Leave the mouse the notifications will go away
          */}

          <div
            className="relative"
            onMouseEnter={() => {
              if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current);
                setShowNotifications(true);
                setShowProfileDropdown(false);
              }
            }}
            onMouseLeave={() => {
              notificationTimeoutRef.current = setTimeout(() => {
                setShowNotifications(false);
              }, 200);
            }}
          >
            {/* Bell */}
            <span className="cursor-pointer relative">
              <FiBell />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none shadow-md">
                3
              </span>
            </span>
            {/* Have the notifications shown - with three different notifications */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-black bg-opacity-80 text-white rounded-lg shadow-xl z-50 backdrop-blur-md">
                <div className="p-3 font-semibold border-b border-gray-700 text-base">
                  Why Hire Me
                </div>
                <ul className="max-h-96 overflow-y-auto divide-y divide-gray-700">
                  <li className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition">
                    <img
                      src="/images/resume.png"
                      alt="Resume"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Reason 1</span>
                      <span className="text-white/90">
                        Let’s be real — you’ve scrolled enough resumes. I’m the
                        one.
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        2 days ago
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition">
                    <img
                      src="/images/bragging.jpeg"
                      alt="Brag"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Reason 2</span>
                      <span className="text-white/90">
                        Hire me before someone else brags about it.
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        3 days ago
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition">
                    <img
                      src="/images/food.jpeg"
                      alt="Food"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Reason 3</span>
                      <span className="text-white/90">
                        I debug my life like I debug my code — efficiently, and
                        with snacks.
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        4 days ago
                      </span>
                    </div>
                  </li>
                </ul>
                <div className="p-2 text-center text-xs text-gray-400">
                  End of list
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
                setShowProfileDropdown(true);
                setShowNotifications(false);
              }
            }}
            onMouseLeave={() => {
              dropdownTimeoutRef.current = setTimeout(() => {
                setShowProfileDropdown(false);
              }, 200);
            }}
          >
            <img
              src="/images/blue.png"
              alt="Recruiter"
              className="w-8 h-8 rounded cursor-pointer"
            />

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-black bg-opacity-90 text-white rounded-md shadow-xl z-50 backdrop-blur-md overflow-hidden text-sm">
                <ul className="p-2 space-y-2">
                  {profileOptions
                    .filter((profile) => profile.name !== "Recruiter")
                    .map((profile, index) => (
                      <li
                        key={index}
                        onClick={() => handleProfileClick(profile.name)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded cursor-pointer"
                      >
                        <img
                          src={profile.image}
                          className="w-9 h-9 rounded"
                          alt={profile.name}
                        />
                        <span className="text-sm text-white">
                          {profile.name}
                        </span>
                      </li>
                    ))}
                </ul>

                <div className="border-t border-gray-700 my-2"></div>

                <ul className="text-sm space-y-1 px-2 pb-2">
                  <li className="flex items-center gap-3 px-2 py-2 hover:bg-gray-800 rounded cursor-pointer">
                    <MdEdit size={20} />
                    <span>Manage Profiles</span>
                  </li>
                  <li className="flex items-center gap-3 px-2 py-2 hover:bg-gray-800 rounded cursor-pointer">
                    <MdImportExport size={20} />
                    <span>Transfer Profile</span>
                  </li>
                  <li className="flex items-center gap-3 px-2 py-2 hover:bg-gray-800 rounded cursor-pointer">
                    <MdPersonOutline size={20} />
                    <span>Account</span>
                  </li>
                  <li className="flex items-center gap-3 px-2 py-2 hover:bg-gray-800 rounded cursor-pointer">
                    <MdHelpOutline size={20} />
                    <span>Help Center</span>
                  </li>
                </ul>

                <div className="border-t border-gray-700 my-2"></div>

                <div className="px-4 py-3 text-sm text-white hover:bg-gray-800 cursor-pointer text-center">
                  Sign out of Netflix
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}

      {/* Video Content */}
      <section className="relative h-[80vh] pt-[80px] overflow-hidden">
        {/* Background Video */}
        <video
          // connects the video reference it, autoplays, muted at first
          ref={videoRef}
          autoPlay
          loop
          muted={!soundOn}
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-20 bg-black z-10"></div>

        {/* Overlay Content */}
        <div className="relative z-20 flex items-end h-full p-8">
          <div className="absolute bottom-20 left-8 z-10 flex flex-col items-start space-y-4">
            <h2 className="text-5xl font-extrabold text-white mb-4">
              Welcome, Recruiter!
            </h2>

            <p className="text-md font-bold text-white-500 drop-shadow-lg max-w-md">
              I'm a driven and passionate individual with a hunger to learn,
              grow, and make an impact. I’m ready to bring energy, creativity,
              and dedication to your team.
            </p>

            {/* Buttons Row */}
            <div className="flex items-center space-x-4">
              {/* Play Button */}
              <button className="flex items-center bg-white text-black font-bold py-2 px-5 rounded-md hover:bg-gray-200 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Hire Me
              </button>

              {/* More Info Button */}

              <button
                onClick={() => setShowPopup(true)}
                className="flex items-center bg-gray-600 bg-opacity-70 text-white font-semibold py-2 px-5 rounded-md hover:bg-opacity-90 transition space-x-2"
              >
                <BsInfoCircle size={20} />
                <span>More About Me</span>
              </button>
            </div>
          </div>

          {/* Pop-up Overlay */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center overflow-y-auto">
              {/* Pop-up Card */}
              <div className="bg-[#141414] text-white rounded-lg p-8 max-w-4xl w-full relative grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
                {/* Left Side Info */}
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Senior</span>
                    <span>Computer Science Major</span>
                    <span className="border px-2 text-xs">2025</span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      TOP 10
                    </div>
                    <span className="font-bold">#1 in Students to Watch!</span>
                  </div>
                </div>

                {/* Middle About Text */}
                <div className="md:col-span-1 text-sm">
                  <h3 className="text-2xl font-bold mb-4">About Me</h3>
                  <p className="text-gray-300">
                    I'm a senior at the University of Maryland majoring in
                    Computer Science. I discovered my passion for coding during
                    college, realizing it was something I could immerse myself
                    in for hours. Over time, I’ve gained valuable experience
                    through internships, projects, and research opportunities.
                    I’m driven by continuous learning and growth, always pushing
                    myself to reach new heights.
                  </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col space-y-4 text-sm">
                  <div>
                    <span className="text-gray-400">Strengths:</span>{" "}
                    Problem-Solving, Teamwork, Leadership, Communication, Time
                    Management and Attention to Detail
                  </div>
                  <div>
                    <span className="text-gray-400">Interests:</span> Software
                    Engineering, Full-stack Development, Web Development, AI,
                    Robotics, Bachata, and Salsa
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition"
                >
                  ✖
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Mute/Unmute Button - Separate at Bottom Right */}
        <button
          onClick={() => {
            if (videoRef.current) {
              const newMuted = !videoRef.current.muted;
              videoRef.current.muted = newMuted;
              setSoundOn(!newMuted);

              if (!newMuted) {
                const promise = videoRef.current.play();
                if (promise !== undefined) {
                  promise.catch((error) =>
                    console.error("Video playback error:", error)
                  );
                }
              }
            }
          }}
          className="absolute bottom-20 right-8 z-20 bg-black bg-opacity-0 text-white rounded-full 
             sm:p-6 md:p-2 lg:p-4 hover:border-2 transition-all duration-300"
        >
          {soundOn ? <FiVolume2 size={25} /> : <FiVolumeX size={25} />}
        </button>

        {/* Gradient transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#14141488] to-[#141414] pointer-events-none" />
        {/*  */}
        <div className="absolute bottom-0 left-8  mb-90">
          <h3 className="text-2xl md:text-2xl font-semi text-white">Skills</h3>
        </div>
      </section>

      {/* Skills */}
      <section
        ref={skillsSectionRef}
        className="relative bg-black px-6 py-3 text-white"
      >
        {/* Thumbnail Row */}
        <div className="flex gap-2 overflow-x-auto pb-4 relative z-10">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="relative group min-w-[200px] h-[200px] cursor-pointer transition-all duration-300 ease-in-out"
            >
              {/* Base Thumbnail */}
              <img
                src={skill.image}
                alt={skill.name}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />

              {/* Hover Card */}
              <div
                className={`absolute top-[-60px] ${
                  skill.id === 1 ? "left-0" : "left-1/2 -translate-x-1/2"
                } w-[360px] h-[320px] bg-[#141414] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-90 group-hover:z-30 transition-transform duration-300 ease-in-out overflow-hidden`}
              >
                <div className="relative h-[210px] w-[360px]">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom Content */}
                <div className="bg-[#141414] p-2 font-bold rounded-b-md">
                  {/* Action buttons row */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {/* Play */}
                      <button className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>

                      {/* Plus */}
                      <button className="w-9 h-9 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 4v16m8-8H4" />
                        </svg>
                      </button>

                      {/* Thumbs Up */}
                      <button className="w-9 h-9 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14 9V5a3 3 0 0 0-6 0v4H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h11a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2z" />
                        </svg>
                      </button>
                    </div>

                    {/* Chevron Down */}
                    <button className="w-9 h-9 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white transition">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Title */}
                  <div className="text-base font-semibold mb-1">
                    {skill.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coursework */}
      <section className="relative bg-black px-6 py-3 text-white">
        <h3 className="text-2xl md:text-2xl px-2 font-semi text-white">
          Coursework
        </h3>

        <div className="flex gap-2 overflow-x-auto pb-5 py-3 relative z-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative group min-w-[200px] h-[200px] w-[240px] cursor-pointer transition-all duration-300 ease-in-out"
            >
              {/* Base Thumbnail */}
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />

              {/* Hover Card */}
              <div
                className={`absolute top-[-60px] ${
                  course.id === courses.length - 1
                    ? "right-0"
                    : course.id === 1
                    ? "left-0"
                    : "left-1/2 -translate-x-1/2"
                } w-[300px] h-[300px] bg-[#1c1c1c] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-100 group-hover:z-30 transition-transform duration-300 ease-in-out overflow-hidden`}
              >
                {/* Top Image */}
                <div className="relative h-[160px] w-[300px]">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom Content */}
                <div className="bg-[#1e1e1e] px-3 py-2">
                  <div className="text-base font-semibold mb-1">
                    {course.name}
                  </div>
                  <p className="text-sm text-gray-200">{course.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Work Experience
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-8">
          {experiences.map((exp, index) => (
            <div className="relative group min-w-[200px] h-[200px] w-[200px] cursor-pointer transition duration-300 ease-in-out">
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />
              <div
                className={`absolute top-[-60px] ${
                  exp.id === 1
                    ? "left-0"
                    : index === experiences.length - 1
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2"
                } w-[300px] h-[300px] bg-[#1c1c1c] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-100 group-hover:z-30 transition-transform duration-300 ease-in-out`}
              >
                {/* Bottom Content */}
                <div className="relative h-[200px] w-[300px]">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-3 z-10">
                  <div className="bg-[#1e1e1e] p-1 rounded">
                    <div className="text-sm font-semibold p-1 ">
                      {exp.company} • {exp.role}
                    </div>
                    <p className="text-xs text-gray-200 p-1">
                      {exp.type} • {exp.location} • {exp.duration}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExperience(index);
                      }}
                      className="mt-2 px-2 py-1 bg-white text-black text-sm rounded hover:bg-gray-300 transition"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedExperience !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
            <div className="bg-[#1c1c1c] text-white rounded-lg overflow-hidden w-[90%] max-w-[800px] shadow-2xl relative">
              {/* Banner Image with dark overlay */}
              <div className="relative h-[300px] w-full">
                <img
                  src={experiences[selectedExperience].logo}
                  alt={experiences[selectedExperience].company}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
                >
                  ✕
                </button>
                {/* Action buttons on image */}
                <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4">
                  <button className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition">
                    ▶ Play
                  </button>
                  <button className="bg-white/10 border border-white px-3 py-2 rounded text-white hover:bg-white/20 transition">
                    ⊕ My List
                  </button>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-1">
                  {experiences[selectedExperience].role}
                </h2>
                <div className="text-sm text-gray-400 mb-2">
                  {experiences[selectedExperience].company} •{" "}
                  {experiences[selectedExperience].location}
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  {experiences[selectedExperience].type} •{" "}
                  {experiences[selectedExperience].duration}
                </div>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  {experiences[selectedExperience].summary.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Projects */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Projects
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-20">
          {projects.map((projects, index) => (
            <div className="relative group min-w-[200px] h-[200px] w-[200px] cursor-pointer transition duration-300 ease-in-out">
              <img
                src={projects.image}
                alt={projects.title}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />
              <p className="text-small font-semibold text-white tracking-wide text-center">
                {projects.title}
              </p>
              <div
                className={`absolute top-[-60px] ${
                  projects.id === 1
                    ? "left-0"
                    : index === experiences.length - 1
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2"
                } w-[300px] h-[340px] bg-[#1c1c1c] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-100 group-hover:z-30 transition-transform duration-300 ease-in-out`}
              >
                {/* Bottom Content */}
                <div className="relative h-[200px] w-[300px]">
                  <img
                    src={projects.image}
                    alt={projects.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-3 z-10 w-full">
                  <div className="bg-[#1e1e1e] rounded px-2 py-2">
                    <div className="text-sm font-semibold px-1">
                      {projects.title} • {projects.date}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 py-1">
                      {projects.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-100 text-xs px-1 py-1 rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(index);
                      }}
                      className="mt-2 px-2 py-1 bg-white text-black text-sm rounded hover:bg-gray-300 transition"
                    >
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {selectedProject !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
              <div className="bg-[#1c1c1c] text-white rounded-lg overflow-hidden w-[90%] max-w-[800px] shadow-2xl relative">
                {/* Banner Image with dark overlay */}
                <div className="relative h-[300px] w-full">
                  <img
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50" />{" "}
                  {/* Dark overlay */}
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
                  >
                    ✕
                  </button>
                  {/* Action buttons on image */}
                  <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4">
                    <button className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition">
                      ▶ Play
                    </button>
                    <button className="bg-white/10 border border-white px-3 py-2 rounded text-white hover:bg-white/20 transition">
                      ⊕ My List
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-1">
                    {projects[selectedProject].title}
                  </h2>
                  <div className="text-sm text-gray-400 mb-2">
                    {projects[selectedProject].date} •{" "}
                    {projects[selectedProject].languages.join(", ")}
                  </div>
                  <p className="text-gray-200 text-sm mb-4">
                    {projects[selectedProject].description}
                  </p>

                  {/* Insert here 👇 */}
                  {projects[selectedProject].link && (
                    <a
                      href={projects[selectedProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block bg-gray-800 text-white text-xs px-3 py-1 rounded-full hover:bg-gray-700 transition"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Activites */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Activities
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-8">
          {activities.map((activities, index) => (
            <div className="relative group min-w-[200px] h-[200px] w-[200px] cursor-pointer transition duration-300 ease-in-out">
              <img
                src={activities.image}
                alt={activities.title}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />
              <div
                className={`absolute top-[-60px] ${
                  activities.id === 1
                    ? "left-0"
                    : index === experiences.length - 1
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2"
                } w-[300px] h-[300px] bg-[#1c1c1c] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-100 group-hover:z-30 transition-transform duration-300 ease-in-out`}
              >
                {/* Bottom Content */}
                <div className="relative h-[190px] w-[300px]">
                  <img
                    src={activities.image}
                    alt={activities.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-3 z-10 px-1 ">
                  <div className="bg-[#1e1e1e] p-1 rounded">
                    <div className="text-sm font-semibold p-1 ">
                      {activities.title}
                    </div>
                    <p className="text-xs text-gray-400 p-1">
                      {activities.role} • {activities.year}
                    </p>
                  </div>
                  {/* Links Section */}
                  <div className="mt-2 flex flex-wrap gap-2 px-1">
                    {activities.links?.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-white text-black px-2 py-1 rounded hover:bg-gray-200 transition"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Awards
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-8">
          {awards.map((award, index) => (
            <div
              key={index}
              className="relative group min-w-[200px] h-[200px] w-[200px] cursor-pointer transition duration-300 ease-in-out"
            >
              <img
                src={award.image}
                alt={award.title}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />
              <div
                className={`absolute top-[-60px] ${
                  award.id === 1
                    ? "left-0"
                    : index === experiences.length - 1
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2"
                } w-[300px] h-[300px] bg-[#1c1c1c] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-100 group-hover:z-30 transition-transform duration-300 ease-in-out`}
              >
                <div className="relative h-[185px] w-[300px]">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="bg-[#1e1e1e] p-1 rounded">
                    <div className="text-sm font-semibold p-1 ">
                      {award.title} • {award.year}
                    </div>
                    <p className="text-xs text-gray-400 p-1">
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-[#1e1e1e] text-white p-6 rounded-lg w-[90%] max-w-[500px] max-h-[80%] overflow-y-auto relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-2 right-2 text-xl text-white hover:text-gray-300"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-1">
                {experiences[selected].role}
              </h3>
              <p className="text-sm text-gray-400 mb-1">
                {experiences[selected].company} •{" "}
                {experiences[selected].location}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                {experiences[selected].type} • {experiences[selected].duration}
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {experiences[selected].summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Certifications */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Certifications
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-10">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="relative group min-w-[200px] h-[200px] w-[200px] cursor-pointer transition duration-300 ease-in-out"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />
              <div
                className={`absolute top-[-60px] ${
                  cert.id === 1
                    ? "left-0"
                    : index === experiences.length - 1
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2"
                } w-[300px] h-[300px] bg-[#1c1c1c] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-100 group-hover:z-30 transition-transform duration-300 ease-in-out`}
              >
                <div className="relative h-[170px] w-[300px]">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="bg-[#1e1e1e] p-1 rounded">
                    <div className="text-sm font-semibold p-1 ">
                      {cert.title} • {cert.date} • {cert.issuer}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 py-1">
                      {cert.skills.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-100 text-xs px-1 py-1 rounded-full"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                    <div className="mt-1">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white text-sm px-1 py-1 rounded-full hover:underline transition"
                      >
                        View Credential →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Education
        </h2>
        <section className="relative bg-black px-2 py-3 text-white">
          <div className="flex gap-4 overflow-x-auto pb-8">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className="relative group min-w-[200px] h-[200px] w-[200px] cursor-pointer transition duration-300 ease-in-out"
              >
                <img
                  src={edu.image}
                  alt={edu.title}
                  className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
                />
                <div
                  className={`absolute top-[-60px] ${
                    index === 0
                      ? "left-0"
                      : index === education.length - 1
                      ? "right-0"
                      : "left-1/2 -translate-x-1/2"
                  } w-[300px] h-[300px] bg-[#1c1c1c] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-100 group-hover:z-30 transition-transform duration-300 ease-in-out`}
                >
                  <div className="relative h-[220px] w-[300px]">
                    <img
                      src={edu.image}
                      alt={edu.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 z-10 px-1">
                    <div className="bg-[#1e1e1e] p-1 rounded">
                      <div className="text-sm font-semibold p-1">
                        {edu.title}
                      </div>
                      <p className="text-xs text-gray-400 p-1">
                        {edu.location} • {edu.date}
                      </p>
                      <ul className="text-xs text-gray-300 p-1 list-disc list-inside">
                        {edu.description.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Interests
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-40 relative z-10">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className="relative group min-w-[200px] h-[200px] cursor-pointer transition-all duration-300 ease-in-out"
            >
              {/* Base Image */}
              <img
                src={interest.image}
                alt={interest.name}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />

              {/* Hover Card */}
              <div
                className={`absolute top-[-60px] ${
                  interest.id === 1 ? "left-0" : "left-1/2 -translate-x-1/2"
                } w-[360px] h-[320px] bg-[#141414] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-90 group-hover:z-30 transition-transform duration-300 ease-in-out overflow-hidden`}
              >
                <div className="relative h-[210px] w-[360px]">
                  <img
                    src={interest.image}
                    alt={interest.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom Content */}
                <div className="bg-[#141414] p-2 font-bold rounded-b-md">
                  {/* Action buttons row */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {/* Play */}
                      <button className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>

                      {/* Plus */}
                      <button className="w-9 h-9 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 4v16m8-8H4" />
                        </svg>
                      </button>

                      {/* Thumbs Up */}
                      <button className="w-9 h-9 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14 9V5a3 3 0 0 0-6 0v4H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h11a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2z" />
                        </svg>
                      </button>
                    </div>

                    {/* Chevron Down */}
                    <button className="w-9 h-9 rounded-full border border-gray-400 text-white flex items-center justify-center hover:border-white transition">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Title */}
                  <div className="text-base font-semibold mb-1">
                    {interest.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecruiterProfile;
