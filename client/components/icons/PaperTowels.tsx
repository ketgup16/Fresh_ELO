export default function PaperTowels() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Roll body */}
      <ellipse cx="24" cy="24" rx="14" ry="16" fill="#E8E8E8"/>
      {/* Inner tube */}
      <ellipse cx="24" cy="24" rx="5" ry="6" fill="#9E9E9E"/>
      {/* Paper texture lines */}
      <path d="M14 12 Q14 10, 16 10 L32 10 Q34 10, 34 12" stroke="#D0D0D0" strokeWidth="1" fill="none"/>
      <path d="M14 16 Q14 14, 16 14 L32 14 Q34 14, 34 16" stroke="#D0D0D0" strokeWidth="1" fill="none"/>
      <path d="M14 20 Q14 18, 16 18 L32 18 Q34 18, 34 20" stroke="#D0D0D0" strokeWidth="1" fill="none"/>
      <path d="M14 28 Q14 26, 16 26 L32 26 Q34 26, 34 28" stroke="#D0D0D0" strokeWidth="1" fill="none"/>
      <path d="M14 32 Q14 30, 16 30 L32 30 Q34 30, 34 32" stroke="#D0D0D0" strokeWidth="1" fill="none"/>
      <path d="M14 36 Q14 34, 16 34 L32 34 Q34 34, 34 36" stroke="#D0D0D0" strokeWidth="1" fill="none"/>
      {/* Perforations */}
      <circle cx="12" cy="24" r="0.8" fill="#B0B0B0"/>
      <circle cx="36" cy="24" r="0.8" fill="#B0B0B0"/>
      {/* Decorative pattern on wrapper */}
      <path d="M18 14 L18 34" stroke="#4A90E2" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6"/>
      <path d="M30 14 L30 34" stroke="#4A90E2" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6"/>
    </svg>
  );
}
