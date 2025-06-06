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

// Modified hover card content for StalkerProfile

const activities = [
  {
    id: 1,
    title: "Vex Robotics",
    role: "Programmer and Mentor",
    year: "2014 – Present",
    image: "/images/vex.png",
    links: [
      {
        label: "Watched 7 competition replays",
        url: "https://www.dailylocal.com/2015/05/06/downingtown-robotics-team-wins-honors-at-2015-vex-robotics-world-championship/",
      },
      {
        label: "Forum Scroll Log",
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
        label: "Timeline of Words Said",
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
        label: "Analyzed Facial Expressions",
        url: "https://www.youtube.com/watch?v=Uk6wzz2hAKY&ab_channel=OfficeofUndergraduateStudies-UMD",
      },
      {
        label: "Tracked Hand Gestures",
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

const education = [
  {
    id: 1,
    title: "Downingtown STEM Academy",
    image: "/images/downingtown_stem.png",
    date: "2018–2021",
    location: "Downingtown, PA",
    description: [
      "Took notes with a black G2 pen — always capped",
      "Changed hoodie color every Monday (tracked)",
      "Once blinked 37 times during one quiz (we counted)",
    ],
  },
  {
    id: 2,
    title: "University of Maryland, College Park",
    image: "/images/umd.png",
    date: "2021–2025",
    location: "College Park, MD",
    description: [
      "Browsed course catalog at 2:13 AM",
      "Always sits 3rd seat from the left",
      "Favorites folder titled ‘CS Secrets’ (we peeked)",
    ],
  },
];

const interests = [
  { id: 1, name: "Running (6:37 pace avg)", image: "/images/running.png" },
  { id: 2, name: "Yoga (Favorite: Pigeon Pose)", image: "/images/yoga.png" },
  { id: 3, name: "Salsa (Practiced 43 spins)", image: "/images/salsa.png" },
  {
    id: 4,
    name: "Bachata (Watched 12 tutorials)",
    image: "/images/bachata.png",
  },
  {
    id: 5,
    name: "Pickleball (Missed 4 smashes)",
    image: "/images/pickleball.png",
  },
  { id: 6, name: "Swimming (Lane 3 preferred)", image: "/images/swimming.png" },
  {
    id: 7,
    name: "Hiking (Left boot always tied tighter)",
    image: "/images/hiking.png",
  },
  {
    id: 8,
    name: "Paddleboarding (Fell off 2.3x avg)",
    image: "/images/kayaking.png",
  },
  {
    id: 9,
    name: "Skydiving (Heart rate: 172 bpm)",
    image: "/images/skydiving.png",
  },
];

const StalkerProfile: React.FC = () => {
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
                  Why You're Still Watching
                </div>
                <ul className="max-h-96 overflow-y-auto divide-y divide-gray-700">
                  <li className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition">
                    <img
                      src="/images/spotify.png"
                      alt="Track"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Reason 1</span>
                      <span className="text-white/90">
                        You’ve tracked my Spotify history for 6 months. You're
                        invested now.
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        2 days ago
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition">
                    <img
                      src="/images/schedule.png"
                      alt="Routine"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Reason 2</span>
                      <span className="text-white/90">
                        You know my daily schedule down to the bathroom breaks.
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        3 days ago
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition">
                    <img
                      src="/images/heart.png"
                      alt="Tabs"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-semibold">Reason 3</span>
                      <span className="text-white/90">
                        You’ve had this tab open for 37 minutes. That’s love (or
                        obsession).
                      </span>
                      <span className="text-gray-400 text-xs mt-1">
                        4 days ago
                      </span>
                    </div>
                  </li>
                </ul>
                <div className="p-2 text-center text-xs text-gray-400">
                  End of reasons (but you’re not done, are you?)
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
              src="/images/red.png"
              alt="Stalker"
              className="w-8 h-8 rounded cursor-pointer"
            />

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-black bg-opacity-90 text-white rounded-md shadow-xl z-50 backdrop-blur-md overflow-hidden text-sm">
                <ul className="p-2 space-y-2">
                  {profileOptions
                    .filter((profile) => profile.name !== "Stalker")
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
              Welcome, Stalker!
            </h2>

            <p className="text-md font-bold text-white-500 drop-shadow-lg max-w-md">
              Oh hey 👀 didn’t see you there — lurking again? At this point, you
              probably know my schedule better than I do. Stay as long as you
              like... just don’t forget to hydrate, little stalker.
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
                Keep Stalking
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
                    <span className="text-gray-400">You’ve Been Watching</span>
                    <span>I’ve Noticed</span>
                    <span className="border px-2 text-xs">👁️</span>
                  </div>

                  <div className="flex items-center space-x-2 mt-2">
                    <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      DEDICATED
                    </div>
                    <span className="font-bold">
                      You've seen it all, haven’t you?
                    </span>
                  </div>
                </div>

                {/* Middle About Text */}
                <div className="md:col-span-1 text-sm">
                  <h3 className="text-2xl font-bold mb-4">
                    About Me (You Already Know)
                  </h3>
                  <p className="text-gray-300">
                    You’ve pieced together my hobbies, my vibe, even my sleep
                    schedule. But in case you missed anything: I’m chaotic good
                    with a soft spot for playlists, passionate rants, and
                    impulse decisions. You weren’t supposed to find all that out
                    — but here we are.
                  </p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col space-y-4 text-sm">
                  <div>
                    <span className="text-gray-400">
                      What You’ve Probably Noted:
                    </span>{" "}
                    Types fast, double-texts, laughs at own jokes, surprisingly
                    organized, definitely suspicious of you
                  </div>
                  <div>
                    <span className="text-gray-400">Still Curious?</span> Keep
                    scrolling, little stalker. I know you will.
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
          <h3 className="text-2xl md:text-2xl font-semi text-white">
            Interests
          </h3>
        </div>
      </section>

      {/* Interests */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <div className="flex gap-2 overflow-x-auto pb-8 relative z-10">
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

      {/* Activites */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Activities
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-10">
          {activities.map((activity, index) => (
            <div className="relative group min-w-[200px] h-[200px] w-[200px] cursor-pointer transition duration-300 ease-in-out">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-full object-cover rounded-md transition duration-200 group-hover:opacity-0"
              />
              <div
                className={`absolute top-[-60px] ${
                  activity.id === 1
                    ? "left-0"
                    : index === activities.length - 1
                    ? "right-0"
                    : "left-1/2 -translate-x-1/2"
                } w-[300px] h-[300px] bg-[#1c1c1c] text-white rounded-lg shadow-2xl scale-0 group-hover:scale-100 group-hover:z-30 transition-transform duration-300 ease-in-out`}
              >
                {/* Bottom Content */}
                <div className="relative h-[190px] w-[300px]">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-3 z-10 px-1 ">
                  <div className="bg-[#1e1e1e] p-1 rounded">
                    <div className="text-sm font-semibold p-1 ">
                      {activity.title}
                    </div>
                    <p className="text-xs text-gray-400 p-1">
                      {activity.role} • {activity.year}
                    </p>
                  </div>
                  {/* Links Section */}
                  <div className="mt-2 flex flex-wrap gap-2 px-1">
                    {activity.links?.map((link, i) => (
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

      {/* Education */}
      <section className="relative bg-black px-6 py-3 text-white ">
        <h2 className="text-2xl md:text-2xl px-2 py-4 font-semi text-white">
          Education
        </h2>
        <section className="relative bg-black px-2 py-3 text-white">
          <div className="flex gap-4 overflow-x-auto pb-40">
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
    </div>
  );
};

export default StalkerProfile;
