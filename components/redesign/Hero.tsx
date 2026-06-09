import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import sk from "./skin.module.css";
import s from "./Hero.module.css";
import EdgeFX from "./EdgeFX";
import FocalWord from "./FocalWord";

type Cta = { href: string; label: string };

/**
 * Content-page hero — the locked combined direction: cinematic photo +
 * Old London monument ghost + three-layer focal word + swappable right aside.
 * `ghost` defaults to the brand "Dare" looming behind the page's focal word;
 * set it per page (e.g. "Arena" on Home, where the focal already is "Dare").
 * Omit `aside` for a full-width text hero. Dense pages use their own compact
 * hero, not this component.
 */
export default function Hero({
  kicker,
  preline,
  focal,
  ghost = "Dare",
  sub,
  photo,
  photoAlt = "",
  primaryCta,
  secondaryCta,
  aside,
}: {
  kicker: string;
  preline: string;
  focal: { word: string; dash?: number; runLen?: number; viewBox?: string };
  ghost?: string;
  sub: string;
  photo: string;
  photoAlt?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  aside?: ReactNode;
}) {
  return (
    <section className={s.hero}>
      <div className={s.photo}>
        <Image src={photo} alt={photoAlt} fill sizes="100vw" priority />
      </div>
      <div className={s.shade} aria-hidden="true" />
      <div className={s.vig} aria-hidden="true" />
      {ghost ? <span className={s.ghost} aria-hidden="true">{ghost}</span> : null}
      <span className={s.bloom} aria-hidden="true" />

      <div className={s.body}>
        <p className={s.kicker}>{kicker}</p>
        <p className={s.pre}>{preline}</p>
        <div className={s.focal}>
          <FocalWord
            word={focal.word}
            dash={focal.dash ?? 1750}
            runLen={focal.runLen}
            viewBox={focal.viewBox ?? "0 0 560 200"}
          />
        </div>
        <div className={`${s.lower}${aside ? "" : ` ${s.lowerNoAside}`}`}>
          <div>
            <p className={s.sub}>{sub}</p>
            <div className={s.ctas}>
              <Link href={primaryCta.href} className={sk.btnSolid}>{primaryCta.label} &rarr;</Link>
              {secondaryCta ? (
                <Link href={secondaryCta.href} className={sk.btnGhost}>{secondaryCta.label}</Link>
              ) : null}
            </div>
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>

      <EdgeFX />
    </section>
  );
}
