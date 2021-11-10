import React from 'react';

interface UploadRidsContext {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const UploadRidsContext = React.createContext<UploadRidsContext | null>(null);

export default UploadRidsContext;
