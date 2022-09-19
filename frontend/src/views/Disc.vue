<template>
  <div>
    <p style="padding: 20px">Виртуальные диски системы</p>
    <v-data-table :headers="headers" :items="discs.blockdevices">
    </v-data-table>
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
          value: "name"
        },
        {
          text: "Размер",
          value: "size"
        },
        {
          text: "mountpoint",
          value: "mountpoint"
        },
      ]
    };
  },
  created() {
    this.$store.dispatch("Disc/fetchDiscs");
  },
  computed: {
    ...mapState("Disc", ["discs"])
  },
  methods: {}
};
</script>
