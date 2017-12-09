<template>
  <div class="error">
    <h2>{{code}}, {{msg}}</h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["code", "msg"])
  },
  methods: {
    ...mapActions(["resetError"])
  }
};
</script>

<style scoped>
.error {
  min-width: 300px;
  min-height: 100px;
  background: rgba(255, 0, 0, 0.5);
  border: 2px solid red;
  border-radius: 10px;
  margin: 50px auto;
  padding: 30px;
}

.error h2 {
  text-align: center;
  color: indianred;
}
</style>