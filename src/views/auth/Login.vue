<template>
  <div>
    <h1>ExpoPlatform | Вход</h1>
    <div v-if="result" class="red">{{ result }}</div>
    <form @submit.prevent="login">
      <input
        type="email"
        v-model="formdata.email"
        placeholder="email"
        required
      />
      <input
        :type="showpass ? 'text' : 'password'"
        v-model="formdata.password"
        placeholder="password"
        required
      />
      <vialan-button :disabled="sendData" :value="'Вход'" @click="login" />
    </form>
  </div>
</template>

<script>
import vialanButton from "@/components/Button";
export default {
  components: {
    vialanButton
  },
  data() {
    return {
      sendData: false,
      showpass: false,
      result: undefined,
      formdata: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      this.sendData = true;
      this.result = undefined;
      const result = await this.$store.dispatch("loginUser", this.formdata);
      this.result = result;
      this.sendData = false;
    }
  }
};
</script>
