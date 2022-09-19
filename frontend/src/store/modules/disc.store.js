import { fetchDisc } from "@/api/disc.api";

export default {
  namespaced: true,
  state: {
    discs: []
  },
  getters: {
    getDiscs: state => {
      return state.discs;
    }
  },
  mutations: {
    setDiscs(state, payload) {
      state.discs = payload.filter(item => item.type === 'disk');
    }
  },
  actions: {
    async fetchDiscs({ commit }) {
      const discs = (await fetchDisc()).data.blockdevices;
      commit("setDiscs", discs);
    }
  }
};
