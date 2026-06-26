import React, { useState } from "react";
import {
  BookOpenText,
  Send,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer id="app-footer" className="text-zinc-400">
      {/* Newsletter signup banner first */}
      <div className="bg-secondary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-md">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-primary tracking-tight flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Join the Bookworm Club
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Receive curated reading list recommendations, exclusive seasonal
                discount codes, and local bookstore event announcements directly
                to your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md lg:max-w-sm"
            >
              <div className="relative grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-550" />
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-md border py-2.5 pl-9 pr-4 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-amber-550 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                  aria-label="Email address for newsletter sign-up"
                />
              </div>
              <Button
                id="newsletter-submit-btn"
                type="submit"
                className="uppercase tracking-wider px-4 h-10 rounded-md text-xs gap-1.5 shrink-0 flex items-center"
              >
                {subscribed ? (
                  "Subscribed!"
                ) : (
                  <>
                    <Send className="h-3 w-3" />
                    Subscribe
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Branded Columns */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-10">
          {/* Logo & Column info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm">
                <BookOpenText className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tighter text-primary italic">
                  Pageturner
                </span>
                <span className="text-[8px] font-mono tracking-widest text-zinc-550 uppercase">
                  Online Book Store
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-4 max-w-sm font-sans">
              Dedicated to connecting authors with loyal bookworms worldwide
              since 2026. Supporting local authors, independent publishing, and
              environmental reforestation programs with every sale.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3.5 mt-6"></div>
          </div>

          {/* Useful categories column */}
          <div className="col-span-6 md:col-span-2.5 flex flex-col">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-primary uppercase mb-4">
              Book Genres
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-sans">
              <li>
                <a
                  href="#categories-section"
                  className="hover:text-amber-500 transition-colors"
                >
                  Fiction & Literature
                </a>
              </li>
              <li>
                <a
                  href="#categories-section"
                  className="hover:text-amber-500 transition-colors"
                >
                  Science Fiction
                </a>
              </li>
              <li>
                <a
                  href="#categories-section"
                  className="hover:text-amber-500 transition-colors"
                >
                  Computers & Technology
                </a>
              </li>
              <li>
                <a
                  href="#categories-section"
                  className="hover:text-amber-500 transition-colors"
                >
                  Biographies & History
                </a>
              </li>
              <li>
                <a
                  href="#categories-section"
                  className="hover:text-amber-500 transition-colors"
                >
                  Earthy Lifestyles
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links and policies Column */}
          <div className="col-span-6 md:col-span-2.5 flex flex-col">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-primary uppercase mb-4">
              Support & Care
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-sans">
              <li>
                <a
                  href="#hero"
                  className="hover:text-amber-500 transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  className="hover:text-amber-500 transition-colors"
                >
                  Track Your Order
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  className="hover:text-amber-500 transition-colors"
                >
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  className="hover:text-amber-500 transition-colors"
                >
                  Retail Locations
                </a>
              </li>
              <li>
                <a
                  href="#hero"
                  className="hover:text-amber-500 transition-colors font-semibold"
                >
                  Contact Bookworm Help
                </a>
              </li>
            </ul>
          </div>

          {/* Headquarter Address contacts column */}
          <div className="md:col-span-2 flex flex-col">
            <h4 className="font-serif text-sm font-semibold tracking-wide text-primary uppercase mb-4">
              Contact HQ
            </h4>
            <address className="space-y-3.5 not-italic text-xs text-zinc-450 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>350 Library Plaza, Central Heights, CA 94103</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-500 shrink-0" />
                <span>+1 (800) 555-7243</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="truncate">help@pageturner.edu</span>
              </div>
            </address>
          </div>
        </div>

        {/* copyright line */}
        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-650 font-mono">
          <p>
            © {new Date().getFullYear()} Pageturner Bookstore Inc. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#hero"
              className="hover:text-amber-500 transition-colors hover:underline"
            >
              Privacy Policy
            </a>
            <span>&middot;</span>
            <a
              href="#hero"
              className="hover:text-amber-500 transition-colors hover:underline"
            >
              Terms of Service
            </a>
            <span>&middot;</span>
            <a
              href="#hero"
              className="hover:text-amber-500 transition-colors hover:underline"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
