import React from "react";

export default function FeaturedIn() {
  return (
    <section className="container-sm mx-auto py-24  space-y-6">
      <p className="body-large-primary text-outline text-center">
        Firasa is featured in
      </p>
      <div className="flex-between gap-6">
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
