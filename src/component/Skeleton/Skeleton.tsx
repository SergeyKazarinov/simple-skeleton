import { FC, memo } from 'react';

import s from './Skeleton.module.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
  circle?: boolean;
  animationSpeed?: number;
  backgroundColor?: string;
  highlightColor?: string;
  shadowColor?: string;
  animation?: 'pulse' | 'wave';
}

const getCSSProperties = (props: SkeletonProps) => {
  const styles: CustomCSSProperties = {};

  if (props.animationSpeed) {
    styles['--simple-skeleton-animation-speed'] = `${props.animationSpeed}s`;
  }

  if (props.backgroundColor) {
    styles['--simple-skeleton-bg'] = props.backgroundColor;
  }

  if (props.highlightColor) {
    styles['--simple-skeleton-highlight'] = props.highlightColor;
  }

  if (props.shadowColor) {
    styles['--simple-skeleton-shadow'] = props.shadowColor;
  }
  return styles;
};

const Skeleton: FC<SkeletonProps> = ({
  className = '',
  height = '100%',
  width = '100px',
  border,
  circle,
  animation = 'wave',
  backgroundColor,
  highlightColor,
  shadowColor,
  animationSpeed,
  ...otherProps
}) => {
  const styles: CustomCSSProperties = {
    width,
    height,
    borderRadius: circle ? '50%' : border,
    ...getCSSProperties({ backgroundColor, highlightColor, shadowColor, animationSpeed }),
  };
  return (
    <div
      data-testid="skeleton"
      className={`${s.skeleton} ${s[animation]} ${className}`}
      style={styles}
      {...otherProps}
    />
  );
};

export default memo(Skeleton);
