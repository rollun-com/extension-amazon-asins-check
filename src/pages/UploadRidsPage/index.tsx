import React, { useContext, useEffect, useState } from 'react';
import UploadButton from 'pages/UploadRidsPage/components/UploadButton';
import UploadDialog from 'pages/UploadRidsPage/components/UploadDialog';
import UploadRidsContext from 'pages/UploadRidsPage/UploadRidsContext';
import { RidWithAsin, useUploadModalState } from 'pages/UploadRidsPage/hooks';
import RootContext from 'pages/RootPage/RootContext';

const UploadRidsPage = () => {
  const rootContext = useContext(RootContext);
  const { isModalOpen, closeModal, openModal } = useUploadModalState();
  const [result, setResult] = useState<RidWithAsin[] | null>(null);

  useEffect(() => {
    rootContext?.setSearchData(result);
  }, [result]);

  return (
    <UploadRidsContext.Provider
      value={{
        isModalOpen,
        closeModal,
        openModal,
        result,
        setResult,
      }}
    >
      <UploadButton />
      <UploadDialog />
    </UploadRidsContext.Provider>
  );
};

export default UploadRidsPage;
