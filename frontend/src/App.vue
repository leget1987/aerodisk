<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped v-if="loggedIn">
      <v-list nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="loggedIn">
        <v-list nav>
          <v-list-item @click="logout">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Выйти
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar app color="primary" clipped-left dark v-if="loggedIn">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="align-center">
        <span class="title hidden-sm-and-down">{{ appTitle }}</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data: () => ({
    appTitle: "Аэродиск",
    drawer: null
  }),
  computed: {
    ...mapGetters("Auth", ["loggedIn"]),
    menuItems() {
      return [
        { icon: "mdi-home", title: "Главная", link: "/" },
        { icon: "mdi-disc", title: "Виртуальные диски", link: "/disc" }
      ];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
