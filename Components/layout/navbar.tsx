"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineShoppingCart, HiOutlineMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/use-cart";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openCart = useCart((state) => state.openCart);
  const items = useCart((state) => state.items);
  const _hasHydrated = useCart((state) => state._hasHydrated);
  const setHasHydrated = useCart((state) => state.setHasHydrated);

  useEffect(() => {
    if (useCart.persist?.onFinishHydration) {
      useCart.persist.onFinishHydration(() => {
        setHasHydrated(true);
      });
    } else {
      setHasHydrated(true);
    }
  }, [setHasHydrated]);

  const totalItems = _hasHydrated
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const navigationLinks = [
    { name: "HOME", href: "/" },
    { name: "HEADPHONES", href: "/category/headphones" },
    { name: "SPEAKERS", href: "/category/speakers" },
    { name: "EARPHONES", href: "/category/earphones" },
  ];

  return (
    <>
      <header className="bg-[#191919] text-white fixed top-0 z-50 w-full">
        <nav className="max-w-[1440px] mx-auto flex items-center justify-between px-[165px] max-[1189px]:px-10 h-[90px]">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="block min-[900px]:hidden"
              aria-label="Open menu"
            >
              <HiOutlineMenu size={28} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Audiophile logo"
                width={120}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden min-[900px]:flex gap-[34px] text-[13px] font-bold tracking-[2px] uppercase">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="relative hover:text-primary transition-colors hover:cursor-pointer"
            aria-label={
              _hasHydrated
                ? `Shopping cart with ${totalItems} items`
                : "Shopping cart"
            }
          >
            <HiOutlineShoppingCart size={25} />
            <AnimatePresence mode="popLayout">
              {_hasHydrated && totalItems > 0 && (
                <motion.div
                  key={totalItems} // triggers animation on change
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 20,
                  }}
                  className="absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center bg-primary text-white text-[12px] font-bold rounded-full"
                >
                  {totalItems}
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
        <div className="max-w-[1440px] mx-auto px-[165px] max-[1189px]:px-10">
          <div className="border-t border-white/20"></div>
        </div>

        {/* Sidebar Menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm min-[900px]:hidden z-51"
            onClick={() => setMenuOpen(false)}
          >
            <aside
              className="absolute top-0 left-0 w-3/4 max-w-[300px] h-full bg-white text-black p-6 shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <Image
                  src="/logo.png"
                  alt="Audiophile logo"
                  width={100}
                  height={30}
                  priority
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <HiX size={28} />
                </button>
              </div>

              <ul className="flex flex-col gap-6 text-[15px] font-bold tracking-[1.5px] uppercase">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        )}
      </header>
      <div className="h-[90px]"></div>
    </>
  );
}
