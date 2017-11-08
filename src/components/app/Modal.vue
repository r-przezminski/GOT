<template>
  <div style="z-index: 10;" v-bind:class="{'hide-mask': modalAnimation.mask}">
    <div id="modal-mask">
      <div id="modal-header">
        <div v-bind:class="{'hide-title': modalAnimation.title}"><slot name="header"></slot></div>
        <div id="i" v-bind:class="{'hide-close-button': modalAnimation.closeButton}"><i v-on:click="closeModal()" class="fa fa-times-circle-o fa-2x" aria-hidden="true"></i></div> 
      </div>
      <div v-bind:class="{'hide-body': modalAnimation.body}">
      <div id="modal-body">
        <slot name="img"></slot>
        <div id="info">
          <slot name="info"></slot>
        </div>
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
      modalAnimation: {
        title: false,
        closeButton: false,
        body: false,
        mask: false
      }
    }
  },
  methods: {
    closeModal() {
      this.modalAnimation.title = true;
      this.modalAnimation.closeButton = true;
      this.modalAnimation.body = true;
      this.modalAnimation.mask = true;
      Event.$emit('close-modal');
    }
  },
};
</script>

<style scoped>
#modal-mask {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
  animation-duration: 1s;
  animation-name: show-modal-mask;
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

#modal-header #i {
  position: absolute; 
  top: -30px;
  left: 93%;
}

#modal-header #i i {
  color: #d8d8d8;
  transition: 0.2s ease-in-out;
  position: absolute;
  opacity: 0;
  animation-duration: .75s;
  animation-name: bounce-modal-closeButton;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-delay: 1.25s;
}

#modal-header #i i:hover {
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
  animation-duration: 0.5s;
  animation-name: show-modal-body;
  animation-fill-mode: forwards;
  animation-delay: 1s;
}

img {
  margin-top: 25px;
  max-width: 300px;
  height: 450px;
  padding: 0 20px;
}

#info {
  margin-top: 25px;
  height: 350px;
  padding: 0 20px;
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

.hide-title {
  animation-duration: 1s;
  animation-name: hide-title;
  animation-fill-mode: forwards;
}

.hide-close-button {
  animation-duration: .3s;
  animation-name: hide-close-button;
  animation-fill-mode: forwards;
  animation-delay: .5s;
}

.hide-body {
  animation-duration: 1.5s;
  animation-name: hide-body;
  animation-fill-mode: forwards;
  animation-delay: .5s;
}

.hide-mask {
  animation-duration: 1s;
  animation-name: hide-mask;
  animation-delay: 2s;
}

@keyframes hide-title {
  15% { transform: scale(0.5, 1); }
  35% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@keyframes hide-close-button {
  from { left: 93%; }
  to { left: 110%; }
}

@keyframes hide-body {
  from { transform: scale(1) rotate(0deg); }
  to { transform: scale(0) rotate(450deg); }
}

@keyframes hide-mask {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes show-modal-mask {
  0% { left: 50%; top: 50%; width: 1%; height: 20%; }
  25% { left: 0; width: 100%; }
  50% { height: 12%; top: 50%; }
  70%{ top: 0; height: 100%; }
  75%{ transform: scale(1.1); }
  90%{ transform: scale(.8); }
  100% { height: 100%; width: 100%; }
}

@keyframes show-modal-title {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes show-modal-body {
  0% { transform: scale(0.5); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes bounce-modal-closeButton {
  0% { opacity: 1; transform: translateY(-30px)}
  20% { transform: translateY(48px); }
  50% { transform: translateY(35px); }
  70% { transform: translateY(48px); }
  90% { transform: translateY(42px); }
  100% { opacity: 1; transform: translateY(48px); }
}

@media only screen and (max-width: 768px) {
  #modal-header #i {
    left: 90%;
  }

  img {
    max-width: 250px;
    height: 200px;
  }

  #info {
    font-size: .5em;
  }
}

@media only screen and (max-width: 480px) {
    #modal-header #i {
    left: 85%;
  }
  
  #modal-body {
    flex-direction: column;
    align-items: center;
    padding: 25px 50px;
  }

  img {
    margin-top: 0;
    max-width: 100px;
    height: 120px;
  }

  #info {
    font-size: .7em;
  }
}
</style>
