<template>
  <footer class="footer">
    <div id="copy">
      <h2>&copy; Game of thrones</h2>
    </div>
    <div id="api" class="column">
      <h3>Api</h3>
      <a target="_blank" href="https://api.got.show/doc/">ApiGotShow</a>
      <a target="_blank" href="https://github.com/Rostlab/JS16_ProjectA/tree/master/app">Github</a>
    </div>
    <div id="official" class="column">
      <h3>Official</h3>
      <a target="_blank" href="http://www.hbo.com/game-of-thrones">HBO</a>
      <a target="_blank" href="http://viewers-guide.hbo.com/">Viewers guide</a>
      <a target="_blank" href="http://www.makinggameofthrones.com/">Making</a>
    </div>
    <div id="social" class="column">
      <h3>Social</h3>
      <a target="_blank" href="https://www.facebook.com/GameOfThrones/">Facebook</a>
      <a target="_blank" href="https://www.youtube.com/user/GameofThrones">Youtube</a>
      <a target="_blank" href="https://twitter.com/gameofthrones">Twitter</a>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped>
.footer {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 25px 150px 225px;
  grid-column-gap: 30px;
  background-image: url('../../assets/img/footer.jpg');
  background-attachment: fixed;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, .8);
  height: 400px;
  padding: 30px;
  color: white;
}

#copy {
  grid-column: 6/13;
  grid-row: 3/4;
  text-align: center;
  align-self: center;
}

#api {
  grid-column: 7/9;
  grid-row: 2/3;
}

#official {
  grid-column: 9/11;
  grid-row: 2/3;
}

#social {
  grid-column: 11/13;
  grid-row: 2/3;
}

.column {
  display: flex;
  flex-direction: column;
}

.footer div h3 {
  margin-bottom: 10px;
  color: bisque;
  border-bottom: 1px solid bisque;
}

.footer div a {
  width: 100%;
  color: white;
  text-decoration: none;
  font-style: italic;
  font-size: 13px;
  margin: 10px 0;
  transition: .2s ease-in-out;
}

.footer div a:hover {
  color: bisque;
}

@media only screen and (max-width: 768px) {
  .footer {
    padding: 0;
  }
  #copy {
    grid-column: 1/13;
    grid-row: 3/4;
    text-align: center;
    align-self: center;
  }

  #api {
    grid-column: 2/5;
    grid-row: 2/3;
  }

  #official {
    grid-column: 5/9;
    grid-row: 2/3;
  }

  #social {
    grid-column: 9/12;
    grid-row: 2/3;
  }
}
</style>

