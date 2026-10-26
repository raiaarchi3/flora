export const metadata = { title: "About — Flora" };

export default function About() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-8 pb-24 pt-36 sm:px-14">
      <h1 className="font-display text-6xl leading-none">About Flora</h1>
      <p className="mt-8 text-sm leading-relaxed text-white/75">
        Flora is a small guide to flowers of the daisy family. For each species you can see where it comes from,
        read a short history, and find quick facts and growing tips.
      </p>
      <p className="mt-5 text-sm leading-relaxed text-white/75">
        Scroll, swipe, drag or use the arrow keys on the Species page to move between flowers. Press View Detail
        to open the full facts.
      </p>
      <p className="mt-5 text-sm leading-relaxed text-white/75">
        The family, Asteraceae, has more than 32,000 accepted species in over 1,900 genera.
      </p>
    </main>
  );
}
