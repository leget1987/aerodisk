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
        ["disk", ].includes(item.type)
      );
    },
  },
  actions: {
    async fetchDisks({ commit }) {
      const disks = (await fetchDisk()).data.blockdevices;
      commit("setDisks", disks);
    },
    async format({ commit }, params) {
      const responce = await format(params);
      commit("setDisks", responce);
      console.log(responce);
    },
  },
};
