import React, { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionData, setTransitionData] = useState({
    fromSection: null,
    toSection: null,
    startPosition: null,
    imageUrl: null,
  });
  const [loadingProgress, setLoadingProgress] = useState(0);

  const startTransition = (data) => {
    setTransitionData(data);
    setIsTransitioning(true);
    setLoadingProgress(0);
  };

  const updateLoadingProgress = (progress) => {
    setLoadingProgress(progress);
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setTransitionData({
      fromSection: null,
      toSection: null,
      startPosition: null,
      imageUrl: null,
    });
    setLoadingProgress(0);
  };

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        transitionData,
        loadingProgress,
        startTransition,
        updateLoadingProgress,
        endTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
