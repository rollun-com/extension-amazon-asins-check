import { useBinaryStateControls } from 'common/hooks';

type UseUploadModalState = (initialOpenValue?: boolean) => {
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
};

const useUploadModalState: UseUploadModalState = (initialOpenValue) => {
  const { state, setFalse, setTrue } = useBinaryStateControls(initialOpenValue);

  return {
    isModalOpen: state,
    closeModal: setFalse,
    openModal: setTrue,
  };
};

export { useUploadModalState };
