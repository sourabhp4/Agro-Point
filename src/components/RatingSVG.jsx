
const RatingSVG = ({ rating }) => {
  return (
    <div className="w-32 h-32">
      <svg viewBox="0 0 100 100">
        <path
          fill="none"
          stroke="green"
          strokeWidth="5"
          strokeLinecap="round"
          
          d="M50, 50 m-40, 0 a40, 40 0 0 1 80, 0 a40, 36 0 0 1 -80,0"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
        >
          {rating}
        </text>
      </svg>
    </div>
  )
}

export default RatingSVG
