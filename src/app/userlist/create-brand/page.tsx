"use client";

import OnboardingForm from "@/components/form/OnboardingForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-50 p-3 border-b border-gray-300 px-5 shadow-md rounded-t-lg" style={{ width: "calc(100vw - 270px)" }}>
        <button
          className="flex items-center bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 font-medium px-4 py-[6px] rounded-lg shadow transition-transform transform hover:scale-105"
          onClick={() => router.back()}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-3 text-gray-600" />
          <span className="text-md">Back</span>
        </button>
        <h2 className="text-xl font-bold text-gray-800 tracking-wide drop-shadow">
          User List
        </h2>
      </div>

      <OnboardingForm />
    </div>
  );
}

export default page;
