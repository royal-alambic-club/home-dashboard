import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: true,
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      console.log('je passe là togglesidebar1' + state.sidebarVisible)
      state.sidebarVisible = !state.sidebarVisible
      console.log('je passe là togglesidebar2' + state.sidebarVisible)
    },
    toggleUnfoldable(state) {
      console.log('je passe là toggle unfoldable')
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      console.log(payload.value)
      console.log('je passe update')
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {},
})
