import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './MartyAgent.module.css';

export type MartyAnimation =
  | 'emotes'
  | 'emotes-no-shadow'
  | 'thinking-left'
  | 'thinking-left-no-shadow'
  | 'thinking-gradient'
  | 'thinking-right'
  | 'thinking-right-no-shadow'
  | 'glasses'
  | 'glasses-no-shadow'
  | 'glasses-thinking'
  | 'glasses-thinking-no-shadow';

const ANIMATION_URLS: Record<MartyAnimation, string> = {
  'emotes': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4e6f695d137d44f5b1f0c2ec98a66ddc?alt=media&token=0d4b24a7-3496-4220-be56-abc4825c6823&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'emotes-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F87a327a1bcd94532ba66228a9c82e607?alt=media&token=81f8755b-4484-4b2c-bd01-7ce3773fd0bf&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'thinking-left': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F349145cddf394b39bf61878ed7f90372?alt=media&token=6ecd8e3e-d660-495d-8233-132ff06c4c19&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'thinking-left-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F3f6080a1ea194faf8484e69f17d0ff5c?alt=media&token=6dae7750-af84-4a1e-812d-7cd71c0fa8d4&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'thinking-gradient': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb97f1aa0dd4a4fe7ab9aa33623462654?alt=media&token=d7daf0e0-df84-4b61-80d6-95d3e1dfb334&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'thinking-right': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fef35d96c42b741ca9dcaf526294fc8f7?alt=media&token=86ac5d2d-e9ad-4fda-8a07-87b493791ccf&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'thinking-right-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fa62394a72f2b425b87044fd7caa7e388?alt=media&token=40889ecc-6aa1-44fd-9aee-ddd31750d6ce&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'glasses': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F43bbb491483f4825a0f6bb3161f80648?alt=media&token=b095eca0-e376-449c-8e7f-e1d146627be0&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'glasses-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F82b0067995904c8ea93b157088cba0cd?alt=media&token=7a80c077-878c-40c8-b760-cbf42b7ed95f&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'glasses-thinking': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5176d51ebc924c32b389370769c27a8f?alt=media&token=a30d7356-64ed-4d81-9d15-c1706267e817&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'glasses-thinking-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F18a44854d4ee4c9997ba6198f88ec28b?alt=media&token=69280a92-2420-490f-bddb-14ec7af50824&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
};

interface MartyAgentProps {
  animation?: MartyAnimation;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MartyAgent({
  animation = 'emotes',
  size = 64,
  loop = true,
  autoplay = true,
  onClick,
  className,
}: MartyAgentProps) {
  return (
    <button
      type="button"
      className={[styles.button, className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label="Marty AI Agent"
      style={{ width: size, height: size }}
    >
      <DotLottieReact
        src={ANIMATION_URLS[animation]}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </button>
  );
}
