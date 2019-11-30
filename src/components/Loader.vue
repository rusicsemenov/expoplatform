<template>
  <div class="flex spacer align-center justify-center">
    <div class="loader">loding <span id="points">.....</span></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const re = /\./g;
    const pointsSpan = document.querySelector("#points");
    pointsSpan.innerHTML = pointsSpan.innerHTML.replace(re, "<span>.</span>");
  }
};
</script>

<style lang="sass">
.loader
    font-size: 2rem

#points
    span
        display: inline-block
        animation: jump 1s cubic-bezier(.28,.93,.63,1.06) infinite
        @for $i from 1 through 4 
            &:nth-child(3n + #{$i})
                animation-delay: $i*0.2s

@keyframes jump
    0%
        transform: translateY(0) 
    50%
        transform: translateY(-5px)
    100%
        transform: translateY(0)

</style>
