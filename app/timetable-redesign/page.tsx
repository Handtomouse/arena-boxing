import type { Metadata } from "next";
import sk from "@/components/redesign/skin.module.css";
import s from "./timetable-redesign.module.css";
import SkinNav from "@/components/redesign/SkinNav";
import MonumentCTA from "@/components/redesign/MonumentCTA";
import FocalWord from "@/components/redesign/FocalWord";
import TimetableClient from "./TimetableClient";

export const metadata: Metadata = {
  title: "Timetable (redesign preview)",
  description:
    "Seven days of boxing at Arena Boxing Bondi: THE WORK, THE LONG ROUND, THE CRAFT and THE OPENER. Coach-led, capped at twenty. Tap a class to book.",
};

export default function TimetableRedesignPage() {
  return (
    <div className={sk.page}>
      <SkinNav />

      {/* compact hero — Old London focal word with draw-on + red running highlight
          (per Nate; overrides the dense-page no-trace default) */}
      <section className={s.thero}>
        <div className={s.theroWrap}>
          <p className={sk.kicker}>Twenty-seven sessions this week</p>
          <h1 className={s.theroTitle}>
            <FocalWord word="Timetable" dash={3500} viewBox="0 0 685 200" ariaLabel="Timetable" />
          </h1>
          <p className={s.theroSub}>Find your hour and book your spot. Tap any class for the detail.</p>
        </div>
      </section>

      <TimetableClient />

      <MonumentCTA
        ghost="Week"
        head={
          <>
            FIND YOUR
            <br />
            HOUR.
          </>
        }
        sub="First class on the house. Coach-led, capped at twenty, plainly laid out."
        cta="Book a Class →"
      />
    </div>
  );
}
