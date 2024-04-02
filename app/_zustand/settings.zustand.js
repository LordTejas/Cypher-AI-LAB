import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const initProfileValue = {
  username: '',
  email: '',
  image: '',
}
 
export const useSettingsStore = create(immer(set => ({
  profile: initProfileValue,
  setProfile: (profile) => set(state => { state.profile = profile }),
  updateProfileValue: (key, value) => set(state => { state.profile[key] = value }),
})))
