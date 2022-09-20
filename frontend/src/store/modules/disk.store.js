import { fetchDisk, format } from "@/api/disk.api";

export default {
  namespaced: true,
  state: {
    disks: [],
  },
  getters: {
    getDisks: (state) => {
      return state.disks;
    },
  },
  mutations: {
    setDisks(state, payload) {
      state.disks = payload.filter((item) =>
        ["disk", "rom"].includes(item.type)
      );
    },
  },
  actions: {
    async fetchDisks({ commit }) {
      const disks = (await fetchDisk()).data.blockdevices;
      commit("setDisks", disks);
    },
    async format({ commit }, { name }) {
      const responce = await format(name);
      commit("setDisks", responce);
      console.log(responce);
    },
  },
};
