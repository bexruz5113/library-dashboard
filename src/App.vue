<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary app>
      <div class="title py-3 pl-6">Library Admin</div>

      <!-- <v-list dense class="mt-4">
        <v-list-item
          v-for="item in nav"
          color="primary"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->

      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <!-- <v-list-item v-for="item in nav" :key="item.title" :to="item.to"> -->
          <v-list-item
            v-for="item in nav"
            :key="item.title"
            @click="routerLink(item.to)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <router-link class="ml-4" to="/" tag="button">
        <v-toolbar-title class="mr-8" style="opacity: 0.9"
          >Library Admin</v-toolbar-title
        >
      </router-link>
    </v-app-bar>

    <v-main>
      <div style="overflow: hidden">
        <div style="z-index: 1; position: relative">
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    selectedItem: 0,
    nav: [
      {
        title: "Dashboard",
        icon: "mdi-home",
        to: "/",
      },
      {
        title: "Create book",
        icon: "mdi-folder-plus",
        to: "/add-book",
      },
      {
        title: "Info table",
        icon: "mdi-table-large",
        to: "/table",
      },

      {
        title: "Setting",
        icon: "mdi-cog",
        to: { name: "users" },
      },
      {
        title: "Analyze",
        icon: "mdi-poll",
        to: { name: "users" },
      },
      {
        title: "History",
        icon: "mdi-history",
        to: { name: "users" },
      },
      {
        title: "Favourite",
        icon: "mdi-cart-heart",
        to: { name: "users" },
      },
      {
        title: "Painel  controle",
        icon: "mdi-view-dashboard",
        to: { name: "users" },
      },
    ],
  }),

  methods: {
    nop() {
      // nothing
    },
    routerLink(to) {
      this.$router.push(to);
    },
  },
};
</script>

<style lang="scss">
.breadcrub-sheet {
  box-shadow: 0 8px 10px -9px rgba(0, 0, 0, 0.05),
    0 3px 14px 2px rgba(0, 0, 0, 0.01), 0 5px 5px -3px rgba(0, 0, 0, 0.05);
}
</style>
