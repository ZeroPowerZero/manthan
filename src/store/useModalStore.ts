import { create } from 'zustand';
import { EventDetail } from '../types/events';
import { RegistrationPathway } from '../types/registration';

interface ModalState {
  activeEventModal: EventDetail | null;
  openEventModal: (event: EventDetail) => void;
  closeEventModal: () => void;

  registrationDrawerOpen: boolean;
  activePathway: RegistrationPathway;
  preselectedCategory?: string;
  openRegistration: (pathway?: RegistrationPathway, preselectedCategory?: string) => void;
  closeRegistration: () => void;

  handbookModalOpen: boolean;
  openHandbook: () => void;
  closeHandbook: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeEventModal: null,
  openEventModal: (event: EventDetail) => set({ activeEventModal: event }),
  closeEventModal: () => set({ activeEventModal: null }),

  registrationDrawerOpen: false,
  activePathway: 'institution',
  preselectedCategory: undefined,
  openRegistration: (pathway = 'institution', preselectedCategory) =>
    set({
      registrationDrawerOpen: true,
      activePathway: pathway,
      preselectedCategory
    }),
  closeRegistration: () => set({ registrationDrawerOpen: false }),

  handbookModalOpen: false,
  openHandbook: () => set({ handbookModalOpen: true }),
  closeHandbook: () => set({ handbookModalOpen: false }),
}));
