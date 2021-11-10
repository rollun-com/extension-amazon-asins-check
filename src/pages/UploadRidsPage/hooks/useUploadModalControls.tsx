import { useState } from 'react';

type UseUploadModalControls = (initialOpenValue?: boolean) => {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

const useUploadModalControls: UseUploadModalControls = (initialOpenValue) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    initialOpenValue ?? false,
  );

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return {
    isModalOpen,
    closeModal,
    openModal,
  };
};

export { useUploadModalControls };
