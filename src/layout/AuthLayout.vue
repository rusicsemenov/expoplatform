<template>
  <div class="flex justify-center align-center mh100vh">
    <div class="content">
      <router-view></router-view>
      <div class="content__links text-right grey">
        <router-link to="register" class="grey thin" v-if="ifLoginPage"
          >регистрация</router-link
        >
        <router-link to="login" class="grey thin" v-else>вход</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    ifLoginPage() {
      return this.$route.name === "login";
    }
  }
};
</script>

<style lang="sass" scoped>
.content
  width: 500px
  &__links
    *
      margin: 5px
      display: inline-block
</style>
