import { create } from 'zustand';

interface MotionState {
  motionEnabled: boolean;
  setMotionEnabled: (enabled: boolean) => void;
  toggleMotion: () => void;
}

const getInitialMotionPreference = (): boolean => {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('manthan_motion_pref');
  if (saved !== null) {
    return saved === 'true';
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useMotionStore = create<MotionState>((set) => ({
  motionEnabled: getInitialMotionPreference(),
  setMotionEnabled: (enabled: boolean) => {
    localStorage.setItem('manthan_motion_pref', String(enabled));
    set({ motionEnabled: enabled });
  },
  toggleMotion: () =>
    set((state) => {
      const next = !state.motionEnabled;
      localStorage.setItem('manthan_motion_pref', String(next));
      return { motionEnabled: next };
    }),
}));
