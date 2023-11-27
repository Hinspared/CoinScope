import { create } from 'zustand';

interface RegisterModalStore {
  isOpen: boolean;
  showModal: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  showModal: false,
  onOpen: () => {
    set({ isOpen: true });
    setTimeout(() => {
      set({ showModal: true });
    }, 300); 
  },
  onClose: () => {
    setTimeout(() => {
      set({ isOpen: false });
    }, 300);
    set({ showModal: false });
  },
}));

export default useRegisterModal;
