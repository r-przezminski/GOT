<template>
  <div class="loading">
    <i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  background-color: #d8d8d8be;
}
</style>

