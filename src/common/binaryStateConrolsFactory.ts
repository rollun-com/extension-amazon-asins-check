const createBinaryStateControls = (setState: (newState: boolean) => void) => {
  return {
    setTrue: () => setState(true),
    setFalse: () => setState(false),
  };
};

export { createBinaryStateControls };
