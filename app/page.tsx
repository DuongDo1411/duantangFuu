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
