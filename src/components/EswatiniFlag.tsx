const EswatiniFlag = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 900 600"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Blue stripes */}
    <rect width="900" height="600" fill="#3E5EB9" />
    {/* Yellow stripes */}
    <rect y="100" width="900" height="400" fill="#FCD116" />
    {/* Red/Crimson center */}
    <rect y="120" width="900" height="360" fill="#B10C0C" />
    {/* Shield - black and white Nguni shield */}
    <ellipse cx="450" cy="300" rx="120" ry="160" fill="#000" />
    <ellipse cx="450" cy="300" rx="115" ry="155" fill="#fff" />
    <ellipse cx="450" cy="300" rx="110" ry="150" fill="#000" />
    {/* Shield white center stripe */}
    <rect x="340" y="200" width="220" height="200" fill="none" />
    <path d="M370 300 Q450 150 530 300 Q450 450 370 300Z" fill="#000" />
    <path d="M380 300 Q450 170 520 300 Q450 430 380 300Z" fill="#fff" />
    <path d="M410 300 Q450 210 490 300 Q450 390 410 300Z" fill="#000" />
    {/* Horizontal lines on shield */}
    <line x1="380" y1="270" x2="520" y2="270" stroke="#000" strokeWidth="3" />
    <line x1="380" y1="330" x2="520" y2="330" stroke="#000" strokeWidth="3" />
    {/* Spear left */}
    <line x1="280" y1="140" x2="280" y2="460" stroke="#8B4513" strokeWidth="6" />
    <polygon points="280,130 270,160 290,160" fill="#555" />
    {/* Spear right */}
    <line x1="620" y1="140" x2="620" y2="460" stroke="#8B4513" strokeWidth="6" />
    <polygon points="620,130 610,160 630,160" fill="#555" />
    {/* Feather tassels (injobo) */}
    <rect x="265" y="170" width="30" height="8" rx="4" fill="#1a1aff" />
    <rect x="265" y="182" width="30" height="8" rx="4" fill="#B10C0C" />
    <rect x="605" y="170" width="30" height="8" rx="4" fill="#1a1aff" />
    <rect x="605" y="182" width="30" height="8" rx="4" fill="#B10C0C" />
    {/* Staff feathers top */}
    <ellipse cx="280" cy="440" rx="12" ry="20" fill="#333" />
    <ellipse cx="620" cy="440" rx="12" ry="20" fill="#333" />
  </svg>
);

export default EswatiniFlag;
