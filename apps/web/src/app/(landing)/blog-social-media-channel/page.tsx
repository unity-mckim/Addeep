"use client";

import React from "react";
import { items } from "../../../constants/blog";
import { useResponsive } from "../../../lib/useResponsive";
import { images } from "../../../constants/images";

const CoreValueHeader = () => {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <div className="w-full text-center">
        <div className="absolute max-h-[745px] min-h-[640px] mt-20 inset-0 bg-black bg-opacity-60 rounded-lg" />
        <div
          className="w-full h-screen p-8 rounded-lg flex flex-col items-center justify-center"
          style={{
            background: `url(${images.blogContact.contactBanner})`,
            border: "1px solid #E5E7EB",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col gap-4 items-center justify-center z-10">
            <h1 className="text-2xl font-bold text-white mb-4">
              Connect with Us
            </h1>
            <SocialLinksRow />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-center">
      <div
        className="w-full h-screen p-4 rounded-lg flex flex-col items-center justify-center bg-opacity-10"
        style={{
          background: `url(${images.blogContact.contactBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          border: "1px solid #E5E7EB",
        }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-24 mb-4">
          Connect with Us
        </h1>
        <SocialLinksRow />
      </div>
    </div>
  );
};

const SocialLinksRow = () => {
  const { isMobile, isTablet } = useResponsive();

  const linkProps = {
    target: "_blank",
    rel: "noopener noreferrer",
  };

  if (isMobile || isTablet) {
    return (
      <section
        aria-label="Social Links"
        className="w-full flex-1 flex flex-col items-center justify-center"
      >
        <div>
          <ul className="flex flex-col gap-12">
            {items.map(({ label, href, Icon }) => (
              <li
                key={label}
                className="bg-transparent w-14 h-14 rounded-3xl flex flex-col items-center justify-center"
              >
                <a
                  href={href}
                  {...linkProps}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <Icon className="h-6 w-6" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Social Links" className="w-full p-16">
      <div className="mx-auto max-w-6xl rounded-3xl p-6 md:p-8">
        <ul className="flex flex-wrap gap-24 items-center justify-center">
          {items.map(({ label, href, Icon }) => (
            <li
              key={label}
              className="bg-white/15 w-32 h-32 rounded-3xl border border-white/20 flex flex-col items-center justify-center"
            >
              <a
                href={href}
                {...linkProps}
                className="flex flex-col items-center justify-center gap-2"
              >
                <div className="h-12">
                  <Icon className="h-10 w-10" />
                </div>
                <span className="text-base font-semibold text-white drop-shadow-sm">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <CoreValueHeader />
    </div>
  );
}
