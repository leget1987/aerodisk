import { fetchDisc } from "@/api/disc.api";

export default {
  namespaced: true,
  state: {
    discs: {}
  },
  getters: {
    getDiscs: state => {
      return state.discs;
    }
  },
  mutations: {
    setDiscs(state, payload) {
      state.discs = payload;
    }
  },
  actions: {
    async fetchDiscs({ commit }) {
      const discs = (await fetchDisc()).data;
      commit("setDiscs", discs);
    }
  }
};
