import React from "react";
import { PinContainer } from "../ui/3d-pin"; // adjust path as needed

const OurTeam = () => (
  <section className="min-h-screen flex items-center justify-center py-12 px-6 bg-gradient-to-b from-purple-100 via-white to-purple-200">
    <div className="w-full max-w-7xl mx-auto text-center">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-6">
          Our Team
        </h2>
        <div className="w-32 h-1 bg-[#6E1094] mx-auto mb-8 rounded-full"></div>
        <p className="text-xl text-purple-700 max-w-2xl mx-auto">
          Meet the visionary leaders driving innovation in healthcare technology
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20">
        {/* Card 1 - Tharany */}
        <PinContainer
          title="Connect through Linkedin"
          href="https://www.linkedin.com/in/tharanyb"
          containerClassName="mx-auto w-full sm:w-auto"
          className="w-80 h-80 lg:w-96 lg:h-96 flex flex-col items-center bg-purple-900 border-white shadow-2xl px-5 sm:px-0"
        >
          <img
            src="/imgs/tharany.jpg"
            alt="Tharany B- Chief Executive Officer"
            className="rounded-full w-40 h-40 lg:w-48 lg:h-48 object-cover mt-8 lg:mt-10 shadow-xl border-4 border-white"
            style={{ objectPosition: "center top" }}
          />
          <div className="mt-4 lg:mt-6 mb-2 text-white text-lg lg:text-xl font-bold tracking-wide">
            THARANY B
          </div>
          <div className="text-white text-sm lg:text-md text-center px-4">
            Chief Executive Officer

          </div>
        </PinContainer>

        {/* Card 2 - Lokeshwaran */}
        <PinContainer
          title="Connect through Linkedin"
          href="https://www.linkedin.com/in/lokeshwaranj03"
          containerClassName="mx-auto w-full sm:w-auto"
          className="w-80 h-80 lg:w-96 lg:h-96 flex flex-col items-center bg-purple-900 border-white shadow-2xl px-5 sm:px-0"
        >
          <img
            src="/imgs/lokesh.jpg"
            alt="Lokeshwaran J - Chief Operating Officer"
            className="rounded-full w-40 h-40 lg:w-48 lg:h-48 object-cover mt-8 lg:mt-10 shadow-xl border-4 border-white"
            style={{ objectPosition: "center top" }}
          />
          <div className="mt-4 lg:mt-6 mb-2 text-white text-lg lg:text-xl font-bold tracking-wide">
            LOKESHWARAN J
          </div>
          <div className="text-white text-sm lg:text-md text-center px-4">
            Chief Operating Officer
          </div>
        </PinContainer>
      </div>
    </div>
  </section>
);

export default OurTeam;
