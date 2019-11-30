<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span class="mdi mdi-spin mdi-loading" v-if="disabled"></span>
    <span v-else>{{ value }}</span>
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "кнопка"
    },
    type: {
      type: String,
      default: "submit"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: ""
    }
  }
};
</script>