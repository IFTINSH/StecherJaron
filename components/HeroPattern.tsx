'use client';

// A "figure" = three nested line shapes. The variant flips the nesting order so
// the row reads as varied instead of three identical stamps:
//   "a" → diamond · circle · diamond   (used for the outer two)
//   "b" → circle · diamond · circle    (used for the larger middle one)
// Counter-feel like Agentura: an upright circle framed by rotated squares.
function Figure({
  className = '',
  variant = 'a',
}: {
  className?: string;
  variant?: 'a' | 'b';
}) {
  const stroke = 'border border-white/35';
  const diamond = { transform: 'rotate(45deg)' };

  if (variant === 'b') {
    return (
      <div className={`relative aspect-square ${className}`}>
        <div className={`absolute inset-0 rounded-full ${stroke}`} />
        <div className={`absolute inset-[17%] ${stroke}`} style={diamond} />
        <div className={`absolute inset-[36%] rounded-full ${stroke}`} />
      </div>
    );
  }

  return (
    <div className={`relative aspect-square ${className}`}>
      <div className={`absolute inset-0 ${stroke}`} style={diamond} />
      <div className={`absolute inset-[15%] rounded-full ${stroke}`} />
      <div className={`absolute inset-[31%] ${stroke}`} style={diamond} />
    </div>
  );
}

// A horizontal row of three figures, the middle one larger (the "anchor"). The
// whole row is turned / shrunk / faded on scroll by its parent (PatternBackground).
export default function HeroPattern({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-[3vmax] ${className}`}
      style={{ height: '26vmax' }}
      aria-hidden="true"
    >
      <Figure variant="a" className="h-[68%]" />
      <Figure variant="b" className="h-full" />
      <Figure variant="a" className="h-[68%]" />
    </div>
  );
}
