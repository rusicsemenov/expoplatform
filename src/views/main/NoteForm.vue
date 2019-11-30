<template>
  <div class="flex justify-center align-start mh100vh">
    <div class="red" v-if="error">{{ error }}</div>
    <div class="content" v-else>
      <h1>{{ actionText }}</h1>
      <p v-if="oldData" class="text-right grey subtitle">
        "{{ oldData.title }}" создано: {{ oldData.created | toDateTime }}
      </p>
      <form @submit.prevent="save">
        <div class="text-left input__block">
          <label class="grey">Title:</label>
          <input type="text" v-model="title" required />
        </div>
        <div class="text-left input__block">
          <label class="grey">Description:</label>
          <textarea v-model="description" cols="30" rows="10"></textarea>
        </div>
        <div class="actions flex">
          <vialan-button
            :value="'отменить'"
            :type="'button'"
            @click="$router.push('/')"
            :classes="'grey mr-2 back'"
          />
          <vialan-button
            :disabled="sendData"
            :value="actionText"
            @click="save"
          />
        </div>
      </form>
    </div>
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
      title: "",
      description: "",
      sendData: false,
      error: undefined,
      oldData: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    actionText() {
      return this.id ? "Обновить" : "Сохранить";
    }
  },
  methods: {
    async save() {
      this.sendData = true;
      if (this.id) {
        await this.$store.dispatch("updateNote", {
          id: this.id,
          data: {
            title: this.title,
            description: this.description
          }
        });
      } else {
        await this.$store.dispatch("addNote", {
          title: this.title,
          description: this.description
        });
      }
      this.sendData = false;
      this.$router.push({ name: "home" });
    }
  },
  mounted() {
    const oldData = this.$store.getters.getNotepadById(this.id);
    if (this.id && !oldData) this.error = "Данные не найдены";
    if (!oldData) return;
    this.oldData = oldData;
    this.title = oldData.title || "";
    this.description = oldData.description || "";
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

.input__block
  margin-bottom: 1rem
</style>
