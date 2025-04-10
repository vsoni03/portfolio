import React, { useEffect, useRef, useState } from "react";
import "../stylesheets/Profile.css";

const profiles = [
  {
    name: "Recruiter",
    image: "src/images/blue.png",
  },
  {
    name: "Friend",
    image: "src/images/yellow.png",
  },
  {
    name: "Stalker",
    image: "src/images/red.png",
  },
];

const handleProfileClick = (name: string) => {
  `/profile/${name.toLowerCase()}`;
};

const ProfileSelection: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center space-y-10">
      <h1 className="text-3xl md:text-5xl font-bold">Who's watching?</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {profiles.map((profile, index) => (
          <div
            key={index}
            onClick={() => handleProfileClick(profile.name)}
            className="flex flex-col items-center cursor-pointer group transition-transform duration-200 hover:scale-105"
          >
            <img
              src={profile.image}
              alt={profile.name}
              className={`w-24 h-24 md:w-32 md:h-32`}
            />
            <span className="mt-2 text-sm md:text-base text-gray-300 group-hover:text-white text-center">
              {profile.name}
            </span>
          </div>
        ))}
      </div>
      <button className="mt-6 px-6 py-2 border border-gray-500 text-gray-300 hover:text-white hover:border-white transition">
        MANAGE PROFILES
      </button>
    </div>
  );
};

export default ProfileSelection;
