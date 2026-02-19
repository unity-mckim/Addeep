"use client";
import React from "react";
import Link from "next/link";
import { useResponsive } from "../lib/useResponsive";
import { footerLinks, socialIcons } from "../constants/footer";

export default function Footer() {
  const { isMobile, isTablet } = useResponsive();

  if (isMobile || isTablet) {
    return (
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto px-6 py-12">
          {/* Top navigation columns */}
          <div className="grid grid-cols-1 gap-2">
            {footerLinks.map((link) => (
              <div key={link.id} className="flex flex-col">
                <Link
                  href={link.href}
                  className="block w-full text-left p-2 rounded-lg transition-colors duration-200 group"
                >
                  <span className="text-black cursor-pointer font-medium">
                    {link.text}
                  </span>
                </Link>
                {link.subItems && (
                  <div className="ml-2 mt-2 space-y-1">
                    {link.subItems.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className="block text-sm text-gray-400 hover:text-black transition-colors duration-200"
                      >
                        {subItem.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Social icons */}
          <div className="mt-24 grid grid-cols-3 justify-center items-center gap-2 p-2">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.link || "#"}
                rel="noopener noreferrer"
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition-opacity duration-200"
              >
                <span className="sr-only">{social.name}</span>
                {typeof social.icon === "string" ? (
                  <span className="text-xs font-medium">{social.icon}</span>
                ) : (
                  React.createElement(social.icon)
                )}
              </a>
            ))}
          </div>
          <div className="mt-8 flex justify-center text-xs text-gray-400">
            <span>© 2025. Addeep Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-screen-2xl px-6 py-12 md:px-10">
        {/* Top navigation columns */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-6">
          {footerLinks.map((link) => (
            <div key={link.id} className="flex flex-col">
              <Link
                href={link.href}
                className="block w-full text-left p-2 rounded-lg transition-colors duration-200 group"
              >
                <span className="text-black cursor-pointer font-medium">
                  {link.text}
                </span>
              </Link>
              {link.subItems && (
                <div className="ml-2 mt-2 space-y-3">
                  {link.subItems.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className="block text-sm text-gray-400 hover:text-black transition-colors duration-200"
                    >
                      {subItem.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="mt-12 flex justify-center space-x-4">
          {socialIcons.map((social) => (
            <Link
              key={social.name}
              href={social.link || "#"}
              rel="noopener noreferrer"
              target="_blank"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition-opacity duration-200"
            >
              <span className="sr-only">{social.name}</span>
              {typeof social.icon === "string" ? (
                <span className="text-xs font-medium">{social.icon}</span>
              ) : (
                React.createElement(social.icon)
              )}
            </Link>
          ))}
        </div>
        <div className="mt-10 flex justify-center text-xs text-gray-400">
          <span>© 2025. Addeep Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
