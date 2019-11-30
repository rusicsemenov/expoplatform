<template>
  <div>
    <h1>ExpoPlatform | Регистрация</h1>
    <div v-if="result" class="red">{{ result }}</div>
    <form @submit.prevent="register">
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
      <vialan-button
        :disabled="sendData"
        :value="'Регистрация'"
        @click="register"
      />
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
    async register() {
      this.sendData = true;
      this.result = undefined;
      const res = await this.$store.dispatch("registerUser", this.formdata);
      this.result = res;
      this.sendData = false;
    }
  }
};
</script>
