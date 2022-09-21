import { fetchDisk, format, mount, umount } from "@/api/disk.api";

export default {
  namespaced: true,
  state: {
    disks: [],
    status: 1,
  },
  getters: {
    getDisks: (state) => {
      return state.disks;
    },
  },
  mutations: {
    setDisks(state, payload) {
      state.disks = payload.filter((item) => ["disk"].includes(item.type));
    },
    setStatus(state, payload) {
      state.status = payload;
    },
  },
  actions: {
    async fetchDisks({ commit }) {
      const disks = (await fetchDisk()).data.blockdevices;
      commit("setDisks", disks);
    },
    async format({ commit }, params) {
      try {
        const responce = await format(params);
        commit("setStatus", responce.data);
      } catch (error) {
        commit("setStatus", error);
      }
    },

    async mount({ commit }, params) {
      try {
        const responce = await mount(params);
        commit(
          "setStatus",
          responce.data ? responce.data : "Монтирование завершено"
        );
      } catch (error) {
        commit("setStatus", error);
      }
    },
    async umount({ commit }, params) {
      try {
        const responce = await umount(params);
        commit(
          "setStatus",
          responce.data ? responce.data : "Диск отмонтирован"
        );
      } catch (error) {
        commit("setStatus", error);
      }
    },
  },
};
