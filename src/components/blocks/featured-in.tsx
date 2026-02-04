import React from "react";

export default function FeaturedIn() {
  return (
    <section className="section overflow-x-hidden space-y-8 lg:space-y-24">
      <h6 className="text-center text-outline">Firasa is featured in</h6>
      <div className="flex-center gap-24">
        <img
          src="/blink.png"
          alt="Blink logo"
          className="h-10 w-auto grayscale"
        />
        <img src="/ai.png" alt="AI logo" className="h-10 w-auto grayscale" />
        <img
          src="/forbes.png"
          alt="Forbes logo"
          className="h-10 w-auto grayscale"
        />
        <img
          src="/seedtable.png"
          alt="Seedtable logo"
          className="h-10 w-auto grayscale"
        />
        <img src="/spa.png" alt="SPA logo" className="h-10 w-auto grayscale" />
      </div>
    </section>
  );
}
