'use client';

import React, { useState, useEffect, useRef } from 'react';
import Lottie, { Options } from 'react-lottie';

interface LottieAnimationProps {
  animationPath: string;
  width?: number | string;
  height?: number | string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ animationPath, width = '100%', height = '100%' }) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent fetching on every render in StrictMode during development
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchAnimation = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(animationPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch animation: ${response.statusText}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
        // Optionally set some fallback state or display an error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimation();
  }, [animationPath]); // Depend only on animationPath

  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  if (isLoading) {
    return <div>Loading animation...</div>; // Or a placeholder skeleton
  }

  if (!animationData) {
    return <div>Error loading animation.</div>; // Fallback for failed fetch
  }

  return (
    <Lottie
      options={defaultOptions}
      height={height}
      width={width}
      isClickToPauseDisabled={true}
    />
  );
};

export default LottieAnimation;
