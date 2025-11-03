import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const navigationLinks = [
    { name: "HOME", href: "/" },
    { name: "HEADPHONES", href: "/category/headphones" },
    { name: "SPEAKERS", href: "/category/speakers" },
    { name: "EARPHONES", href: "/category/earphones" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer className="bg-[#191919] text-white relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:left-[165px] md:transform-none w-[101px] h-1 bg-primary"></div>

      <div className="max-w-[1440px] mx-auto px-[165px] max-[1189px]:px-10 max-[768px]:px-6 pt-[52px] md:pt-[60px] lg:pt-[75px] pb-[38px] md:pb-[46px] lg:pb-12">
        {/* Top Section - Logo and Navigation */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 md:mb-8 lg:mb-9">
          <div className="flex justify-center md:justify-start mb-12 md:mb-0">
            <Image
              src="/logo.png"
              alt="Audiophile"
              width={143}
              height={25}
              priority
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex justify-center md:justify-end">
            <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-[34px] text-[13px] font-bold tracking-[2px] uppercase">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-12 lg:gap-0 mb-12 md:mb-20 lg:mb-14">
          {/* Description */}
          <p className="text-white/50 text-[15px] leading-[25px] text-center md:text-left max-w-[540px]">
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>

          {/* Social Icons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-0">
          {/* Copyright */}
          <p className="text-white/50 text-[15px] font-bold text-center md:text-left">
            Copyright 2021. All Rights Reserved
          </p>

          {/* Social Icons */}
          <div className="flex lg:hidden items-center justify-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="hover:text-accent transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-6 h-6" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
