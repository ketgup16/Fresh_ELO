import Lottie from 'lottie-react';
import martyAnimation from '@/marty-thinking.json';
import martyGlassesAnimation from '@/marty-glasses.json';

interface MartyAvatarProps {
  size?: number;
  variant?: 'default' | 'glasses';
}

export function MartyAvatar({ size = 38, variant = 'default' }: MartyAvatarProps) {
  return (
    <Lottie
      animationData={variant === 'glasses' ? martyGlassesAnimation : martyAnimation}
      loop={true}
      style={{ width: size, height: size }}
    />
  );
}
