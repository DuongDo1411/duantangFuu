"use client";

import { useEffect, useRef, useState } from "react";

const introSteps = [
  "Hello em bé của anh, lại là anh Dương Đỏ aka Hoàng Tử Kim Mã đây ạ",
  "Xin nhũi vì món quà này gửi đến em hơi muộn, anh có 1 bức thư nho nhỏ gửi tặng em tui đây",
  "Để có trải nghiệm tốt nhất vui lòng kết nối mạng ổn định và bật âm thanh nhoaaa",
  "Sẵn sàng chưa, bắt đầu nè",
];

type Stage = "intro" | "opening" | "letter";

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 27s-11-6.9-11-14.2C5 8.7 8 6 11.6 6c2.1 0 3.6 1 4.4 2.5C16.8 7 18.3 6 20.4 6 24 6 27 8.7 27 12.8 27 20.1 16 27 16 27Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <svg
      className={back ? "arrow-icon arrow-back" : "arrow-icon"}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      {muted ? (
        <path d="m17 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      ) : (
        <path d="M17 9c1.2.8 1.8 1.8 1.8 3s-.6 2.2-1.8 3m2.5-9c2 1.4 3 3.4 3 6s-1 4.6-3 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      )}
    </svg>
  );
}

function Chocolate({ className = "" }: { className?: string }) {
  return (
    <div className={`chocolate ${className}`} aria-hidden="true">
      <span /><span /><span /><span /><span /><span />
    </div>
  );
}

type StickerKind = "strawberry" | "flower" | "bow" | "envelope" | "heart" | "star";

function Sticker({ kind, className }: { kind: StickerKind; className: string }) {
  const content = {
    strawberry: (
      <>
        <path d="M50 27C26 16 13 37 24 64c7 18 19 29 26 31 7-2 19-13 26-31 11-27-2-48-26-37Z" fill="#E77691" stroke="#C95C7A" strokeWidth="3" />
        <path d="M50 29c-11-14-26-8-28-1 12-2 20 1 28 9 8-8 16-11 28-9-2-7-17-13-28 1Z" fill="#8FB8A0" stroke="#6E9C87" strokeWidth="2" />
        <path d="M50 27c-4-11-1-19 5-23" stroke="#6E9C87" strokeWidth="4" strokeLinecap="round" />
        <g fill="#FFF0D7"><ellipse cx="35" cy="49" rx="2" ry="3" transform="rotate(-19 35 49)" /><ellipse cx="55" cy="49" rx="2" ry="3" /><ellipse cx="68" cy="59" rx="2" ry="3" transform="rotate(18 68 59)" /><ellipse cx="43" cy="69" rx="2" ry="3" /><ellipse cx="57" cy="76" rx="2" ry="3" /></g>
      </>
    ),
    flower: (
      <>
        <g fill="#FFF9F4" stroke="#E3A3B5" strokeWidth="2.3">
          <ellipse cx="50" cy="25" rx="13" ry="21" /><ellipse cx="50" cy="75" rx="13" ry="21" />
          <ellipse cx="25" cy="50" rx="21" ry="13" /><ellipse cx="75" cy="50" rx="21" ry="13" />
          <ellipse cx="32" cy="32" rx="13" ry="19" transform="rotate(-45 32 32)" /><ellipse cx="68" cy="32" rx="13" ry="19" transform="rotate(45 68 32)" />
          <ellipse cx="32" cy="68" rx="13" ry="19" transform="rotate(45 32 68)" /><ellipse cx="68" cy="68" rx="13" ry="19" transform="rotate(-45 68 68)" />
        </g>
        <circle cx="50" cy="50" r="16" fill="#F3C978" stroke="#DFAC5D" strokeWidth="2" />
        <circle cx="44" cy="47" r="1.8" fill="#B78648" /><circle cx="56" cy="47" r="1.8" fill="#B78648" />
        <path d="M46 55c3 3 5 3 8 0" stroke="#B78648" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    bow: (
      <>
        <path d="M45 39C23 19 8 25 9 46c1 18 17 21 36 10M55 39c22-20 37-14 36 7-1 18-17 21-36 10" fill="#F2A5B9" stroke="#BC6E87" strokeWidth="3" strokeLinejoin="round" />
        <path d="M43 57 34 86l17-9 17 9-10-29" fill="#E98FA9" stroke="#BC6E87" strokeWidth="3" strokeLinejoin="round" />
        <rect x="42" y="37" width="16" height="24" rx="7" fill="#D67998" stroke="#BC6E87" strokeWidth="3" />
        <path d="m17 40 16 7m50-7-16 7" stroke="#FFD8E1" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    envelope: (
      <>
        <rect x="10" y="23" width="80" height="58" rx="8" fill="#FFF9F4" stroke="#C9849A" strokeWidth="3" />
        <path d="m12 30 34 27a7 7 0 0 0 8 0l34-27" fill="#F8D7DF" stroke="#C9849A" strokeWidth="3" strokeLinejoin="round" />
        <path d="m12 76 29-24m47 24L59 52" stroke="#D8A4B1" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 67s-9-5-9-11c0-5 6-7 9-2 3-5 9-3 9 2 0 6-9 11-9 11Z" fill="#D47594" />
      </>
    ),
    heart: (
      <>
        <path d="M50 86S12 65 12 39c0-13 8-22 20-22 8 0 14 4 18 11 4-7 10-11 18-11 12 0 20 9 20 22 0 26-38 47-38 47Z" fill="#F2AEC2" stroke="#CA718E" strokeWidth="3" />
        <path d="M25 35c2-4 5-6 9-6" stroke="#FFF1F4" strokeWidth="5" strokeLinecap="round" />
      </>
    ),
    star: (
      <>
        <path d="m50 7 9 30 31 13-31 10-9 31-10-31L9 50l31-13L50 7Z" fill="#F5D28A" stroke="#DBA95B" strokeWidth="3" strokeLinejoin="round" />
        <path d="M50 28v13M38 50h-8" stroke="#FFF6DC" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  }[kind];

  return <svg className={`background-sticker ${className}`} viewBox="0 0 100 100" fill="none" focusable="false">{content}</svg>;
}

function BackgroundStickers() {
  return (
    <div className="background-stickers" aria-hidden="true">
      <Sticker kind="strawberry" className="sticker-berry-one" />
      <Sticker kind="flower" className="sticker-flower-one" />
      <Sticker kind="bow" className="sticker-bow" />
      <Sticker kind="envelope" className="sticker-envelope" />
      <Sticker kind="heart" className="sticker-heart" />
      <Sticker kind="flower" className="sticker-flower-two" />
      <Sticker kind="strawberry" className="sticker-berry-two" />
      <Sticker kind="star" className="sticker-star" />
    </div>
  );
}

function playOpeningChime() {
  try {
    const audio = new AudioContext();
    const start = audio.currentTime;
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const volume = audio.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      volume.gain.setValueAtTime(0.0001, start + index * 0.12);
      volume.gain.exponentialRampToValueAtTime(0.035, start + index * 0.12 + 0.025);
      volume.gain.exponentialRampToValueAtTime(0.0001, start + index * 0.12 + 0.5);
      oscillator.connect(volume);
      volume.connect(audio.destination);
      oscillator.start(start + index * 0.12);
      oscillator.stop(start + index * 0.12 + 0.52);
    });
    window.setTimeout(() => void audio.close(), 1200);
  } catch {
    // Some browsers block audio; the letter still opens normally.
  }
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<Stage>("intro");
  const [soundOn, setSoundOn] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const letterHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (stage === "letter") letterHeading.current?.focus();
  }, [stage]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function openLetter() {
    if (soundOn) playOpeningChime();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setStage("letter");
      return;
    }
    setStage("opening");
    timer.current = setTimeout(() => setStage("letter"), 1150);
  }

  function advance() {
    if (step < introSteps.length - 1) setStep(step + 1);
    else openLetter();
  }

  return (
    <div className={`site-shell stage-${stage}`}>
      <div className="background-glow glow-one" aria-hidden="true" />
      <div className="background-glow glow-two" aria-hidden="true" />
      <div className="background-dots" aria-hidden="true" />
      <BackgroundStickers />

      <header className="topbar">
        <div className="brand">
          <HeartIcon className="brand-heart" />
          <span>một chút thương gửi em</span>
        </div>
        <div className="topbar-actions">
          <span className="date-pill">20.10</span>
          <button
            className="sound-toggle"
            type="button"
            aria-label={soundOn ? "Tắt âm thanh" : "Bật âm thanh"}
            aria-pressed={soundOn}
            title={soundOn ? "Tắt âm thanh" : "Bật âm thanh"}
            onClick={() => setSoundOn((current) => !current)}
          >
            <SoundIcon muted={!soundOn} />
          </button>
        </div>
      </header>

      {stage === "intro" && (
        <main className="intro-layout">
          <div className="intro-side-note" aria-hidden="true">
            <span className="small-rule" />
            <span>một món quà<br />nhỏ xíu cho em</span>
          </div>

          <section className="intro-card" aria-label="Lời nhắn trước khi mở thư">
            <div className="card-topline">
              <span className="eyebrow">TRƯỚC KHI MỞ THƯ</span>
              <span className="card-number">0{step + 1} <span>/</span> 04</span>
            </div>
            <div className="message-wrap" key={step}>
              <div className="message-decoration" aria-hidden="true">✳</div>
              <h1 aria-live="polite">{introSteps[step]}</h1>
            </div>
            <div className="intro-card-bottom">
              <div className="progress-dots" aria-label={`Lời nhắn ${step + 1} trên 4`}>
                {introSteps.map((_, index) => (
                  <span key={index} className={index === step ? "dot active" : "dot"} />
                ))}
              </div>
              <div className="intro-controls">
                {step > 0 && (
                  <button className="back-button" type="button" onClick={() => setStep(step - 1)}>
                    <ArrowIcon back />
                    Quay lại
                  </button>
                )}
                <button className="primary-button" type="button" onClick={advance}>
                  {step === introSteps.length - 1 ? "Mở thư" : "Tiếp theo"}
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </section>

          <div className="intro-otter-wrap" aria-hidden="true">
            <span className="otter-label">một chút ngọt ngào ♡</span>
            <img src="/otter.svg" alt="" className="intro-otter" />
          </div>
          <Chocolate className="intro-chocolate" />
          <span className="sparkle sparkle-one" aria-hidden="true">✳</span>
          <span className="sparkle sparkle-two" aria-hidden="true">✳</span>
        </main>
      )}

      {stage === "opening" && (
        <main className="opening-layout" aria-label="Đang mở thư">
          <div className="envelope-animation" aria-hidden="true">
            <div className="envelope-letter"><HeartIcon /></div>
            <div className="envelope-back" />
            <div className="envelope-front" />
            <div className="envelope-flap" />
            <div className="envelope-seal"><HeartIcon /></div>
          </div>
          <p>Đang mở thư cho em...</p>
        </main>
      )}

      {stage === "letter" && (
        <main className="letter-layout">
          <div className="letter-intro">
            <span className="eyebrow">MỘT MÓN QUÀ NHỎ</span>
            <p>từ anh Dương Đỏ, gửi riêng cho em.</p>
          </div>

          <div className="letter-scene">
            <Chocolate className="letter-chocolate" />
            <div className="letter-doodle doodle-left" aria-hidden="true">✳</div>
            <div className="letter-doodle doodle-right" aria-hidden="true">✳</div>

            <article className="letter-paper">
              <div className="letter-paper-top">
                <span>20 THÁNG 10</span>
                <HeartIcon />
              </div>
              <div className="letter-content">
                <span className="letter-overline">MỘT BỨC THƯ NHO NHỎ</span>
                <h1 ref={letterHeading} tabIndex={-1}>Gửi em bé của anh,</h1>
                <div className="letter-placeholder">
                  <p>Nội dung lá thư sẽ được anh viết vào đây sau...</p>
                  <span className="writing-line" />
                  <span className="writing-line" />
                  <span className="writing-line short" />
                </div>
                <div className="letter-signature">
                  <span>Thương em,</span>
                  <strong>Dương Đỏ</strong>
                </div>
              </div>
              <div className="letter-paper-bottom">
                <span>MỘT CHÚT THƯƠNG · MỘT CHÚT NGỌT</span>
                <div className="wax-seal"><HeartIcon /></div>
              </div>
            </article>

            <div className="letter-otter-wrap" aria-hidden="true">
              <img src="/otter.svg" alt="" className="letter-otter" />
              <span>cho em nè!</span>
            </div>
          </div>
        </main>
      )}

      <footer className="site-footer">
        <span>made with ♡ by Dương Đỏ</span>
        <span>chỉ dành cho em</span>
      </footer>
    </div>
  );
}
