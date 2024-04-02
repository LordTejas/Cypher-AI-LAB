import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'


const useDashboardStore = create(immer(set => ({

  currentMenu: 'dashboard',
  setCurrentMenu: (menu) => set(state => { state.currentMenu = menu }),

  currentSubMenu: 'overview',
  setCurrentSubMenu: (subMenu) => set(state => { state.currentSubMenu = subMenu }),

  currentTab: 'overview',
  setCurrentTab: (tab) => set(state => { state.currentTab = tab }),

})))

export default useDashboardStore