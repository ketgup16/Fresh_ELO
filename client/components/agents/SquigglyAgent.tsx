import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './SquigglyAgent.module.css';

// Animation variants for the Squiggly AI agent
export type SquigglyAnimation =
  | 'emotes'
  | 'emotes-no-shadow'
  | 'laugh'
  | 'laugh-no-shadow'
  | 'look-lr'
  | 'look-lr-no-shadow'
  | 'nod'
  | 'nod-no-shadow'
  | 'shimmy'
  | 'shimmy-no-shadow'
  | 'thinking';

const ANIMATION_URLS: Record<SquigglyAnimation, string> = {
  'emotes': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F4404ea46519e42f48018b863f026208e?alt=media&token=a847b91a-30de-463c-932f-178fc5cf182d&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'emotes-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F1a05759c071b4c26b8d569ab0b61eb46?alt=media&token=c40d1465-bc4f-423b-95f1-c0bb0855f2ab&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'laugh': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fb480c3ef89494665a4636685910bc930?alt=media&token=cfcd6c52-e919-466b-8dc7-fefc4202011c&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'laugh-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fdef006d554cb493d8154bc5dd438ba43?alt=media&token=9c003bd7-378f-4b1e-9037-e4c6e7c37c3a&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'look-lr': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F25412041417f49158863c262ea312313?alt=media&token=a11c1c1b-d8ef-4efa-ba15-e8c95db128f6&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'look-lr-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fda064349c31747fba61ccfa9b9c6f636?alt=media&token=1b48fdc7-a4df-4929-94b2-7eef26883c5c&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'nod': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2Fd4183053c76341a1b11260576aa4a5cd?alt=media&token=fdaad0e8-9744-4259-bd46-2eee83aa0ee8&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'nod-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F7c6a4fb731d54edc8989d5ea55608a0a?alt=media&token=e7018c22-d3b4-47ca-9cb5-c526558ad29e&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'shimmy': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F5fbe3e8cfe81444fabef74b96a3d5b7f?alt=media&token=8edd6b94-ac25-4656-a949-be749b678896&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'shimmy-no-shadow': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F0bc3df57fdf4430791f32d6204afc18f?alt=media&token=dac655ba-19a1-43cc-b2c8-4e2fccc650b8&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
  'thinking': 'https://cdn.builder.io/o/assets%2F02297b1ff48d4a2f8e4d9ed415c47ecf%2F2170bef8406543058fa96d08cf1a9d9d?alt=media&token=2704ff86-986d-4abe-a45b-56acabc65851&apiKey=02297b1ff48d4a2f8e4d9ed415c47ecf',
};

interface SquigglyAgentProps {
  animation?: SquigglyAnimation;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SquigglyAgent({
  animation = 'emotes',
  size = 64,
  loop = true,
  autoplay = true,
  onClick,
  className,
}: SquigglyAgentProps) {
  return (
    <button
      type="button"
      className={[styles.button, className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label="Squiggly AI Agent"
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
