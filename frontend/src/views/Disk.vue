<template>
  <div>
    <p>Виртуальные диски системы</p>
    <v-text-field
      v-model="password"
      label="Для управления дисками введите пароль суперпользователя"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-data-table :headers="headers" :items="disks" :readonly="!!password">
      <template v-slot:item.action="{ item }">
        <v-btn :disabled="!item.mountpoint" color="accent" @click="umount(item)"
          >отмонтировать</v-btn
        >
        <v-btn color="error" :disabled="!!item.mountpoint" @click="format(item)"
          >форматировать</v-btn
        >
        <v-btn
          color="primary"
          :disabled="!item.fstype || !!item.mountpoint"
          @click="mount(item)"
          >примонтировать</v-btn
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Disk",
  data() {
    return {
      showPassword: false,
      password: "",
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
    this.$store.dispatch("Disk/fetchDisks");
  },
  computed: {
    ...mapState("Disk", ["disks", "status"]),
  },
  methods: {
    format(item) {
      if (!this.password) {
        alert("Введите пароль суперпользователя");
        return;
      } else {
        this.$store
          .dispatch("Disk/format", { name: item.name, password: this.password })
          .then(() => {
            alert(this.status);
          })
          .finally(() => {
            this.$store.dispatch("Disk/fetchDisks");
          });
      }
    },
    umount(item) {
      if (!this.password) {
        alert("Введите пароль суперпользователя");
        return;
      } else {
        this.$store
          .dispatch("Disk/umount", { name: item.name, password: this.password })
          .then(() => {
            alert(this.status);
          })
          .finally(() => {
            this.$store.dispatch("Disk/fetchDisks");
          });
      }
    },
    mount(item) {
      if (!this.password) {
        alert("Введите пароль суперпользователя");
        return;
      } else {
        this.$store
          .dispatch("Disk/mount", { name: item.name, password: this.password })
          .then(() => {
            alert(this.status);
          })
          .finally(() => {
            this.$store.dispatch("Disk/fetchDisks");
          });
      }
    },
  },
};
</script>
<style>
.v-btn {
  margin: 5px;
}
.v-text-field,
p {
  padding: 20px;
  width: 700px;
}
</style>
