import { create } from 'zustand';

interface LoginModalStore {
  isOpen: boolean;
  showModal: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
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

export default useLoginModal;
