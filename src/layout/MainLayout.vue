<template>
  <div class="flex columt mh100vh">
    <div id="nav" class="flex">
      <router-link to="/">ExpoPlatform</router-link>
      <div class="spacer"></div>
      <span @click="logout">
        Logout {{ userEmail }}
        <span class="mdi  mdi-logout-variant"></span>
      </span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userEmail"])
  },
  methods: {
    async logout() {
      const result = await this.$store.dispatch("logoutUser");
      if (result) this.$router.push("/login");
    }
  }
};
</script>
