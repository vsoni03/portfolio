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

// const skills = [
//   { id: 1, name: "Java", image: "/images/java.png" },
//   { id: 2, name: "Rust", image: "/images/rust.png" },
//   { id: 3, name: "Python", image: "/images/python.png" },
//   { id: 4, name: "Ocaml", image: "/images/ocaml.png" },
//   { id: 5, name: "Assembly", image: "/images/assembly.png" },
//   { id: 6, name: "TypeScript", image: "/images/typescript.png" },
//   { id: 7, name: "SQL", image: "/images/sql.png" },
//   { id: 8, name: "HTML", image: "/images/html.png" },
//   { id: 9, name: "CSS", image: "/images/css.png" },
//   { id: 10, name: "Ruby", image: "/images/ruby.png" },
//   { id: 11, name: "C", image: "/images/c.png" },
//   { id: 12, name: "C++", image: "/images/c++.png" },
//   { id: 13, name: "AWS", image: "/images/aws.png" },
//   { id: 14, name: "Git", image: "/images/git.png" },
//   { id: 15, name: "Oracle Database", image: "/images/oracledatabase.png" },
//   { id: 16, name: "Tensorflow", image: "/images/tensorflow.png" },
//   { id: 17, name: "Pytorch", image: "/images/pytorch.png" },
//   { id: 18, name: "Flask", image: "/images/flask.png" },
//   { id: 19, name: "Selenium", image: "/images/selenium.png" },
//   { id: 20, name: "Cypress", image: "/images/cypress.png" },
//   { id: 21, name: "React", image: "/images/react.png" },
//   { id: 22, name: "Oracle ERP", image: "/images/oracleerp.png" },
//   { id: 23, name: "Pytest", image: "/images/pytest.png" },
//   { id: 24, name: "Bamboo", image: "/images/bamboo.png" },
//   { id: 25, name: "CAD", image: "/images/cad.png" },
//   { id: 26, name: "SolidWords", image: "/images/solidworks.png" },
//   { id: 27, name: "Jest", image: "/images/jest.png" },
// ];

const skills = [
  {
    id: 1,
    name: "Java",
    image: "/images/java.png",
    description: "Blazing fast and memory-safe",
    rating: "TV-14",
    seasons: "9 Seasons",
    tags: ["Intimate", "Heartfelt", "Sitcom"],
  },
  {
    id: 2,
    name: "Python",
    image: "/images/rust.png",
    description: "Blazing fast and memory-safe",
    rating: "TV-14",
    seasons: "9 Seasons",
    tags: ["Intimate", "Heartfelt", "Sitcom"],
  },
  // Add more as needed...
];

const RecruiterProfile: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = (e, skill) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY, // account for scroll
    });
    // Cancel any pending close
    clearTimeout(hoverTimeoutRef.current);
    setHoveredSkill(skill);
  };

  const handleMouseLeave = () => {
    // Delay hiding by 400ms
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSkill(null);
    }, 400);
  };

  const CARD_WIDTH = 320;
  const CARD_HEIGHT = 360;

  const navigate = useNavigate();

  const handleProfileClick = (name: string) => {
    navigate(`/profile/${name.toLowerCase()}`);
    setShowProfileDropdown(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

        {/* 🔥 Dark overlay */}
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
              and dedication to your team."
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
          <h3 className="text-2xl md:text-2xl font-bold text-white">Skills</h3>
        </div>
      </section>

      {/* movies */}
      <section className="relative bg-black px-6 py-10 text-white min-h-[500px]">
        {/* Thumbnail Row */}
        <div className="flex gap-6 overflow-x-auto pb-32">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="min-w-[160px] h-[200px] relative cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(e, skill)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={skill.image}
                alt={skill.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Hover Pop-Up Card */}
        {hoveredSkill && (
          <div
            className="fixed z-[9999] w-[320px] h-[360px] bg-[#141414] rounded-lg shadow-2xl transition-transform duration-300"
            style={{
              top: `${position.y - CARD_HEIGHT + 40}px`,
              left: `${position.x - CARD_WIDTH / 2}px`,
            }}
            onMouseEnter={() => clearTimeout(hoverTimeoutRef.current)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Top Preview */}
            <div className="relative h-[180px] w-full">
              <img
                src={hoveredSkill.image}
                alt={hoveredSkill.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <button className="absolute bottom-2 right-2 text-white bg-black bg-opacity-40 rounded-full p-1">
                🔈
              </button>
            </div>

            {/* Bottom Info */}
            <div className="p-4 space-y-2 flex flex-col justify-between h-[180px]">
              <div className="flex gap-3">
                <button className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl">
                  ▶️
                </button>
                <button className="bg-[#333] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                  ➕
                </button>
                <button className="bg-[#333] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                  ⬇️
                </button>
              </div>

              {hoveredSkill.title && (
                <>
                  <div className="text-sm font-semibold">
                    {hoveredSkill.title}
                  </div>
                  <div className="relative h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="bg-red-600 h-full"
                      style={{
                        width: `${
                          (hoveredSkill.progress / hoveredSkill.duration) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {hoveredSkill.progress} of {hoveredSkill.duration}m
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default RecruiterProfile;
