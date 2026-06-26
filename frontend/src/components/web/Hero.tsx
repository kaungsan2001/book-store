import { ArrowRight, BookOpen, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden  py-6 sm:py-10 lg:py-18 border-b border-zinc-850"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text Copy Section */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="font-serif text-4xl font-extrabold tracking-tigh sm:text-5xl md:text-6xl lg:leading-[1.1]">
              Rediscover the{" "}
              <span className="text-amber-500 italic font-normal">Magic</span>{" "}
              of Paper & Ink
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-xl font-sans leading-relaxed">
              Curation meets comfort. Explore our hand-picked sanctuary of
              books. Discover modern classics, rare technical editions, and
              seasonal award-winners curated by expert librarians.
            </p>

            {/* Quick CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                id="hero-explore-cta"
                onClick={() => {
                  document
                    .getElementById("categories-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                size="lg"
                className="bg-amber-600 hover:bg-amber-500 text-black font-bold uppercase tracking-wider px-8 h-12 rounded-md text-xs cursor-pointer shadow-lg shadow-amber-950/20 transition-all flex items-center gap-2"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                id="hero-bestsellers-cta"
                onClick={() => {
                  document
                    .getElementById("best-sellers")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                size="lg"
                className="border-zinc-800 hover:bg-zinc-900 text-zinc-350 font-bold uppercase tracking-wider px-6 h-12 rounded-md text-xs cursor-pointer"
              >
                Best Sellers
              </Button>
            </div>

            {/* Trust Metrics indicators */}
            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-zinc-850 w-full">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-amber-500">
                  50k+
                </span>
                <span className="text-xs text-zinc-500 mt-1 font-sans">
                  Curated Books
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-amber-500">
                  15k+
                </span>
                <span className="text-xs text-zinc-500 mt-1 font-sans">
                  Happy Readers
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-amber-500">
                  4.9/5
                </span>
                <span className="text-xs text-zinc-500 mt-1 font-sans">
                  Customer Score
                </span>
              </div>
            </div>
          </div>

          {/* Hero Visually Appealing Side Book Presentation (Interactive stack/floating block) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[320px] sm:max-w-90 aspect-4/5 rounded-2xl  p-4 flex items-center justify-center ">
              {/* Primary hovering styled image mockup */}
              <div className="relative z-10 w-full h-full rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=450&h=600"
                  alt="Classic aesthetic book pages"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Book Spine Overlay Effect */}
                <div className="absolute inset-y-0 left-0 w-2.5 bg-black/40 shadow-[1px_0_4px_rgba(0,0,0,0.3)]" />
                <div className="absolute inset-0 bg-linear-to-r from-white/5 via-transparent to-black/35 pointer-events-none" />

                {/* Quote Glassmorphic banner inside side banner cover */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-zinc-800 text-zinc-100 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-amber-500 font-bold">
                    Featured Pick Of the Month
                  </span>
                  <p className="font-serif text-sm font-semibold italic leading-snug">
                    "A room without books is like a body without a soul."
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500 text-right">
                    &mdash; Marcus Tullius Cicero
                  </p>
                </div>
              </div>

              {/* Decorative supporting background book shadows */}
              <div className="absolute -bottom-4 w-[90%] h-4 bg-black/55 blur-xl rounded-full" />

              {/* Abstract decorative book element peeking out */}
              <div className="absolute top-8 -right-8 w-1/3 aspect-2/3 rounded-lg shadow-xl overflow-hidden border border-zinc-800 rotate-12 bg-zinc-900 z-0 hidden sm:block opacity-85">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200&h=300"
                  alt="Aesthetic supporting book cover"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Abstract decorative left book cover peeking out */}
              <div className="absolute bottom-16 -left-8 w-1/3 aspect-2/3 rounded-lg shadow-xl overflow-hidden border border-zinc-800 -rotate-12 bg-zinc-900 z-0 hidden sm:block opacity-85">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200&h=300"
                  alt="Supporting Midnight Library cover"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Icons Footer for Hero */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-6 sm:max-w-none sm:grid-cols-3">
          <div className="flex items-center gap-4 p-5 rounded-xl border border-zinc-850 bg-secondary">
            <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-primary">
                Explore physical & e-books
              </h3>
              <p className="text-xs text-zinc-550 mt-1">
                Multi-format support for all files, print copies, or kindle
                reads.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-xl border border-zinc-850 bg-secondary">
            <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl  bg-primary/10 text-primary">
              <Truck className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-primary">
                Free fast delivery
              </h3>
              <p className="text-xs text-zinc-550 mt-1">
                Complimentary packing and carbon-neutral transit on orders above
                $35.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-xl border border-zinc-850 bg-secondary">
            <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-primary">
                Secured checkout
              </h3>
              <p className="text-xs text-zinc-550 mt-1">
                Encrypted gateways accepting cards, mobile wallets, or PayPal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
