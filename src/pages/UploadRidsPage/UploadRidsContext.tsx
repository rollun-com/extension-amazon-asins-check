import React from 'react';
import { RidWithAsin } from 'pages/UploadRidsPage/hooks';

interface UploadRidsContext {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  result: RidWithAsin[] | null;
  setResult: (res: RidWithAsin[] | null) => void;
}

const UploadRidsContext = React.createContext<UploadRidsContext | null>(null);

export default UploadRidsContext;
