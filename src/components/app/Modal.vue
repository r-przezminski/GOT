<template>
  <div>
    <div id="modal-mask">
      <div id="modal-header">
        <slot name="header"></slot>
        <i v-on:click="$emit('close-modal')" class="fa fa-times-circle-o fa-2x" aria-hidden="true"></i>
      </div>
      <div name="body" id="modal-body">
        <slot name="img"></slot>
        <div id="info">
          <slot name="info"></slot>
        </div>
      </div>
      <div id="modal-footer">
        <slot name="footer">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  created() {
  },
}
</script>

<style scoped>
#modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  background-color: rgba(0, 0, 0, .9);
  animation-duration: 1s;
  animation-name: show-modal;
  animation-direction: alternate;
  animation-fill-mode: forwards;
}

#modal-header {
  margin: 20px;
}

#modal-header h2 {
  width: 70%;
  margin: 10px auto;
  color: chocolate;
  font-style: italic;
  text-align: center;
  opacity: 0;
  animation-duration: 1.5s;
  animation-name: show-modal-title;
  animation-direction: alternate;
  animation-fill-mode: forwards;
}

#modal-header i {
  color: #d8d8d8;
  transition: .2s ease-in-out;
  position: absolute;
  /* top: 18px; */
  top: -30px;
  opacity: 0;
  left: 93%;
  animation-duration: 1s;
  animation-name: bounce-modal-close;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-delay: 1.5s;
}

#modal-header i:hover {
  color: chocolate;
  cursor: pointer;
}

#modal-body {
  max-width: 800px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  background-color: #d8d8d8;
  justify-content: space-around;
  overflow: auto;
  transform: scale(0);
  animation-duration: .5s;
  animation-name: show-modal-body;
  animation-fill-mode: forwards;
  animation-delay: 1s;
}

img {
  margin-top: 25px;
  max-width: 300px;
  height: 450px;
}

#info {
  margin-top: 25px;
  height: 350px;
}

#info ul {
  color: black;
  font-weight: 900;
  list-style: none;
}

#info li {
  color: chocolate;
  font-weight: 800;
  font-style: italic;
  margin-left: 20px;
}

@keyframes show-modal {
  0% { left: 50%; top: 50%; width: 1%; height: 20%; }
  25% { left: 0; width: 100%; }
  50% { height: 12%; top: 50%; }
  70%{ top: 0; height: 100%; width: 100%; }
  75%{transform: scale(1.1)}
  90%{ transform: scale(.8) }
  100% { height: 100%; width: 100%; }
}

@keyframes show-modal-title {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounce-modal-close {
  0% { opacity: 1; transform: translateY(-30px)}
  20% { transform: translateY(48px); }
  40% { transform: translateY(35px); }
  60% { transform: translateY(48px); }
  80% { transform: translateY(42px); }
  100% { opacity: 1; transform: translateY(48px); }
}

@keyframes show-modal-body {
  0% { transform: scale(0.2); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@media only screen and (max-width: 768px) {
  #modal-header i {
    left: 90%;
  }

  #modal-body {
    flex-direction: column;
    align-items: center;
  }

  #image img {
    display: none;
  }

  #info {
    margin-top: 0;
  }
}
</style>
