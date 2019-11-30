<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/MainLayout";

export default {
  components: {
    AuthLayout,
    MainLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || "auth") + "-layout";
    }
  }
};
</script>

<style lang="sass">
@import "style.sass"
</style>
