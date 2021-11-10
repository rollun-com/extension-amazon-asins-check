import React from 'react';
import UploadButton from 'pages/UploadRidsPage/components/UploadButton';
import UploadDialog from 'pages/UploadRidsPage/components/UploadDialog';
import UploadRidsContext from 'pages/UploadRidsPage/UploadRidsContext';
import { useUploadModalControls } from 'pages/UploadRidsPage/hooks';

const UploadRidsPage = () => {
  const { isModalOpen, closeModal, openModal } = useUploadModalControls();

  return (
    <UploadRidsContext.Provider
      value={{
        isModalOpen,
        closeModal,
        openModal,
      }}
    >
      <UploadButton />
      <UploadDialog />
    </UploadRidsContext.Provider>
  );
};

export default UploadRidsPage;
