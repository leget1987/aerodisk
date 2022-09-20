<template>
  <div>
    <p style="padding: 20px">Виртуальные диски системы</p>
    <v-data-table :headers="headers" :items="discs">
      <template v-slot:item.action="{ item }">
        <v-btn :disabled="!item.mountpoint" color="accent">отмонтировать</v-btn>
        <v-btn color="error" :disabled="!!item.mountpoint">форматировать</v-btn>
        <v-btn
          color="primary"
          :disabled="!item.fstype || !!item.mountpoint"
          @click="checkMount(item)"
          >примонтировать</v-btn
        >
      </template> </v-data-table
    >{{ discs }}
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Disc",
  data() {
    return {
      headers: [
        {
          text: "Имя диска",
          value: "name",
        },
        {
          text: "Размер",
          value: "size",
        },
        {
          text: "mountpoint",
          value: "mountpoint",
        },
        {
          text: "Действие",
          sortable: false,
          value: "action",
          align: "center",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("Disc/fetchDiscs");
  },
  computed: {
    ...mapState("Disc", ["discs"]),
  },
  methods: {
    checkMount(item) {
      console.log(!!item.mountpoint);
      console.log(!item.fstype, "ftype");
      console.log(!item.fstype || !!item.mountpoint);

      return item.fstype && !item.mountpoint;
    },
  },
};
</script>
<style>
.v-btn {
  margin: 5px;
}
</style>
