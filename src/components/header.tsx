"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { navItems } from "@/constants/navigation";
import { site } from "@/constants/site";

const linkFocus =
  "focus-visible:outline-offset-4 focus-visible:outline-cyan-bright";

export function Header() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();
  const pathname = usePathname();
  const scrollHomeToTop = (href: string) => {
    if (href === "/" && pathname === "/") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-header text-white">
      <div className="flex h-(--header-height) items-center justify-between gap-8 px-3 md:px-10">
        <button
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={openMenu}
          className={`p-2 md:hidden ${linkFocus}`}
        >
          <Menu aria-hidden="true" size={32} strokeWidth={1.5} />
        </button>

        <Link
          href="/"
          onClick={() => scrollHomeToTop("/")}
          className={`text-right md:text-left ${linkFocus}`}
        >
          <span className="block text-2xl leading-none text-cyan-bright uppercase md:w-min md:text-5xl md:font-medium md:tracking-[0.2em] xl:w-auto">
            {site.name}
          </span>
          <span className="mt-3 hidden font-tagline text-base leading-none tracking-normal md:block">
            {site.tagline}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="group flex flex-wrap justify-end gap-x-6 gap-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => scrollHomeToTop(item.href)}
                  className={`text-base font-bold uppercase transition-opacity group-hover:opacity-50 hover:opacity-100! ${linkFocus}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        onClick={(event) => event.target === menuRef.current && closeMenu()}
        className="m-0 h-dvh max-h-none w-80 max-w-[85vw] bg-header p-8 text-white backdrop:bg-black/60 motion-safe:animate-slide-in motion-safe:backdrop:animate-fade-in"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className={`mb-8 p-2 ${linkFocus}`}
        >
          <X aria-hidden="true" size={20} strokeWidth={1.5} />
        </button>
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => {
                    closeMenu();
                    scrollHomeToTop(item.href);
                  }}
                  className={`text-xl ${linkFocus}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </header>
  );
}
