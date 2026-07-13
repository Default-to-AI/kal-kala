import React, { useEffect, useRef, useState, useCallback } from 'react';
import { InlineMathToken } from './InlineMathToken';

// Keep standard statistical formulas
const FORMULAS = [
  { tex: String.raw`f(x)=\dfrac{1}{\sigma\sqrt{2\pi}} \cdot e^{-\frac12\left(\frac{x-\mu}{\sigma}\right)^2}`, cls: "lg" },
  { tex: String.raw`P(A\mid B)=\dfrac{P(B\mid A) \cdot P(A)}{P(B)}`, cls: "alt" },
  { tex: String.raw`\mathbb{E}[X]=\int_{-\infty}^{\infty} x \cdot f(x) \,dx`, cls: "" },
  { tex: String.raw`\operatorname{Var}(X)=\mathbb{E}\!\left[(X-\mu)^2\right]`, cls: "faint" },
  { tex: String.raw`\bar{x}=\dfrac{1}{n}\sum_{i=1}^{n} x_i`, cls: "sm" },
  { tex: String.raw`s^2=\dfrac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2`, cls: "" },
  { tex: String.raw`\hat{\theta}=\arg\max_{\theta}\,L(\theta\mid x)`, cls: "alt sm" },
  { tex: String.raw`Z=\dfrac{\bar{X}-\mu}{\sigma/\sqrt{n}}`, cls: "" },
  { tex: String.raw`H_0:\,\mu=\mu_0`, cls: "faint sm" },
  { tex: String.raw`p=P(T>t\mid H_0)`, cls: "faint sm" },
  { tex: String.raw`\rho_{X,Y}=\dfrac{\operatorname{Cov}(X,Y)}{\sigma_X \cdot \sigma_Y}`, cls: "alt" },
  { tex: String.raw`\hat{y}=\beta_0+\beta_1 \cdot x`, cls: "sm" },
  { tex: String.raw`F(x)=P(X\le x)`, cls: "faint sm" },
  { tex: String.raw`\mu=\sum_{i} x_i \cdot p_i`, cls: "faint sm" },
  { tex: String.raw`\lim_{n\to\infty}\dfrac{\bar{X}_n-\mu}{\sigma/\sqrt{n}}\xrightarrow{d}\mathcal{N}(0,1)`, cls: "lg" },
  { tex: String.raw`\mathcal{N}(\mu,\sigma^2)`, cls: "alt sm" },
  { tex: String.raw`X\sim\text{Bin}(n,p)`, cls: "faint sm" },
  { tex: String.raw`\hat{\beta}=(X^{\top}X)^{-1}X^{\top}y`, cls: "" },
  { tex: String.raw`\int_{-\infty}^{\infty} f(x)\,dx=1`, cls: "faint" },
  { tex: String.raw`\sigma^2=\mathbb{E}[X^2]-(\mathbb{E}[X])^2`, cls: "sm" },
  { tex: String.raw`\text{MSE}=\mathbb{E}\!\left[(\hat{\theta}-\theta)^2\right]`, cls: "alt sm" },
  { tex: String.raw`P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}`, cls: "" }
];

interface PlacedChip {
  id: number;
  tex: string;
  cls: string;
  x: number;
  y: number;
  delay: string;
  duration: string;
}

// Reusable function to pick a random spot outside the central focal area
function getRandomPos() {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const centerClearW = Math.min(800, W * 0.7);
  const centerClearH = Math.min(600, H * 0.6);

  const inCenter = (x: number, y: number, w: number, h: number) => {
    const cx = W / 2, cy = H / 2;
    return (
      x + w/2 > cx - centerClearW/2 &&
      x - w/2 < cx + centerClearW/2 &&
      y + h/2 > cy - centerClearH/2 &&
      y - h/2 < cy + centerClearH/2
    );
  };

  let x = 0, y = 0, ok = false, tries = 0;
  while (!ok && tries < 40) {
    x = 60 + Math.random() * (W - 120);
    y = 70 + Math.random() * (H - 140);
    ok = !inCenter(x, y, 220, 60);
    tries++;
  }
  return { x, y };
}

export function CyberneticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chips, setChips] = useState<PlacedChip[]>([]);

  // Calculate random chip placements on mount
  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    
    const placed: PlacedChip[] = [];
    // Drastically reduce density (about 5-7 chips on a standard 1080p screen)
    const target = Math.min(FORMULAS.length, Math.floor((W * H) / 180000) + 4);
    const shuffled = [...FORMULAS].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffled.length && placed.length < target; i++) {
      const f = shuffled[i];
      const pos = getRandomPos();

      placed.push({
        id: i,
        tex: f.tex,
        cls: f.cls,
        x: pos.x,
        y: pos.y,
        delay: `${(Math.random() * 8).toFixed(2)}s`,
        duration: `${(15 + Math.random() * 10).toFixed(2)}s`,
      });
    }

    setChips(placed);
  }, []);

  // Removed WebGL Shader setup entirely for the Editorial Academic theme.

  return (
    <div className="fixed inset-0 w-screen h-screen z-[-1] pointer-events-none overflow-hidden bg-[var(--color-background)]">
      {/* Subtle Math Background Pattern for Editorial Academic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,color-mix(in_srgb,var(--color-background)_90%,transparent)_100%)]" />

      {/* Drifting Math Chips */}
      <div className="absolute inset-0">
        {chips.map(chip => (
          <React.Fragment key={chip.id}>
            <MathChip initialChip={chip} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// Separate component to handle the mount animation and cycle
function MathChip({ initialChip }: { initialChip: PlacedChip }) {
  const [chip, setChip] = useState(initialChip);

  const handleCycle = useCallback(() => {
    const pos = getRandomPos();
    setChip(prev => ({
      ...prev,
      x: pos.x,
      y: pos.y,
    }));
  }, []);

  // Map the sketch classes to our theme tokens
  let colorClass = "text-[var(--color-text-tertiary)]"; // default
  let dropShadow = "";
  let maxOpacity = "0.15";
  
  if (chip.cls.includes('alt')) {
    colorClass = "text-[var(--color-accent-primary)]";
    dropShadow = "drop-shadow-[0_0_12px_color-mix(in_srgb,var(--color-accent-cobalt)_15%,transparent)]";
    maxOpacity = "0.2";
  } else if (chip.cls.includes('faint')) {
    colorClass = "text-[var(--color-text-tertiary)]";
    maxOpacity = "0.08";
  } else {
    colorClass = "text-[var(--color-text-secondary)]";
    maxOpacity = "0.12";
  }

  const sizeClass = chip.cls.includes('lg') ? 'text-xl' : chip.cls.includes('sm') ? 'text-xs' : 'text-base';

  return (
    <div 
      className={`absolute whitespace-nowrap select-none will-change-transform math-chip-drift ${colorClass} ${sizeClass} ${dropShadow}`}
      style={{
        left: chip.x,
        top: chip.y,
        '--delay': chip.delay,
        '--duration': chip.duration,
        '--max-opacity': maxOpacity
      } as React.CSSProperties}
      onAnimationIteration={handleCycle}
    >
      <InlineMathToken math={chip.tex} />
    </div>
  );
}
