'use client';

import React from 'react';
import Lottie from 'react-lottie';

interface LottieWrapperProps {
  animationData: any;
  width?: number;
  height?: number;
  loop?: boolean;
  autoplay?: boolean;
  // Add other props as needed
}

const LottieWrapper = ({
  animationData,
  width = 400,
  height = 400,
  loop = true,
  autoplay = true,
  ...props
}: LottieWrapperProps) => {
  const defaultOptions = {
    loop,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} height={height} width={width} {...props} />;
};

export default LottieWrapper;
