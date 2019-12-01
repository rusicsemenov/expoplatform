<template>
  <div class="pagination-buttons flex justify-center" v-if="pageCount > 1">
    <vialan-button
      :value="'назад'"
      :type="'button'"
      @click="page -= 1"
      v-if="page > 1"
    ></vialan-button>
    <template v-for="n in pageCount">
      <vialan-button
        :key="n"
        :value="n.toString()"
        :class="{ active: n == page }"
        :type="'button'"
        @click="page = n"
        v-if="page > n - 2 && page < n + 2"
      ></vialan-button>
    </template>
    <vialan-button
      :value="'вперед'"
      :type="'button'"
      @click="page += 1"
      v-if="page < pageCount"
    ></vialan-button>
  </div>
</template>

<script>
import vialanButton from "@/components/Button";

export default {
  components: {
    vialanButton
  },
  props: {
    rowOnPage: {
      type: Number,
      default: 0
    },
    rowsCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      page: 1
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.rowsCount / this.rowOnPage);
    }
  },
  watch: {
    page(val) {
      this.$emit("click", val);
    }
  }
};
</script>

<style lang="sass">
.pagination-buttons
    button
        border: 1px solid  rgba(0,0,0,.2)
        padding: 5px 10px
        margin-right: 1px
        cursor: pointer
        transition: transform 100ms, backgrount-color 200ms
        background-color: white
        outline: none
        &.active
            background-color: lighten(blue, 20%)
            color: white
        &:last-child
            border-radius: 0 10px 10px 0
        &:first-child
            border-radius: 10px 0 0 10px
        &:hover
            background-color: lighten(blue, 10%)
            color: white
</style>
