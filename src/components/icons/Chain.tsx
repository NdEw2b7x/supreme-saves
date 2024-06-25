export default function Chain({ fill }: { fill: string }) {
  return (
    <div>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 288 288'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g transform='matrix(0.2,0,0,0.32,0,0)'>
          <g transform='matrix(5,0,0,3.125,0,0)' fill={fill}>
            <path d='M30,144C30,144 89,127 108,108C127,89 144,30 144,30C144,30 161,89 180,108C199,127 258,144 258,144C258,144 199,161 180,180C161,199 144,258 144,258C144,258 125.678,197.678 108,180C89,161 30,144 30,144Z' />
          </g>
        </g>
      </svg>
    </div>
  );
}
