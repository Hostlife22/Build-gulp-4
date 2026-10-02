interface IconProps {
  name:
    'sun' | 'arrow' | 'reset' | 'pause' | 'play' | 'close' | 'cube' | 'plus';
  size?: number;
}

const paths = {
  sun: 'M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  reset: 'M4 10a8 8 0 1 1 1 7M4 4v6h6',
  pause: 'M9 5v14M15 5v14',
  play: 'm8 5 11 7-11 7Z',
  close: 'm6 6 12 12M6 18 18 6',
  cube: 'm12 3 9 5v8l-9 5-9-5V8Zm0 10 9-5M12 13 3 8m9 5v8',
  plus: 'M12 5v14M5 12h14',
};
export function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
