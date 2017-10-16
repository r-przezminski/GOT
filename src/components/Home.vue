<template>
  <div id="wrapper">
    <div id="characters"></div>
    <div id="characters-content" class="content">
      <div class="title">
        <h3>Characters</h3>
      </div>
      <div class="description">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint est minima pariatur debitis illum vitae veritatis aliquam voluptates consequatur repudiandae, incidunt optio tempore distinctio ipsa molestias, laudantium blanditiis totam excepturi commodi alias culpa provident. Consequatur qui sequi iste laboriosam fugiat vitae. Tempore impedit eum, nulla cupiditate neque voluptatibus iusto esse inventore quos ex nam sit incidunt blanditiis accusamus. Nam laborum voluptatibus tempore porro dicta doloribus recusandae atque repudiandae. Recusandae, praesentium.</p>
      </div>
    </div>
    <div id="snow"></div>
    <div id="snow-content" class="content">
      <div class="title">
        <h3>Jon Snow</h3>
      </div>
      <div class="description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis beatae voluptatum autem facere libero odio!</p>
      </div>
    </div>
    <div id="houses"></div>
    <div id="houses-content" class="content">
      <div class="title">
        <h3>Houses</h3>
      </div>
      <div class="description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis beatae voluptatum autem facere libero odio!</p>
      </div>
    </div>
    <div id="cities"></div>
    <div id="cities-content" class="content">
      <div class="title">
        <h3>Cities</h3>
      </div>
      <div class="description">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed aspernatur incidunt cumque eaque natus maxime perferendis, praesentium impedit animi modi.</p>
      </div>
    </div>
    <div id="winter-is-coming"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
#wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
}

#characters {
  grid-column: 1/3;
  grid-row: 1/4;
  background-image: url('../assets/img/characters.jpg');
  background-repeat: round;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
}

#characters-content {
  grid-column: 3/5;
  grid-row: 1/4;
}

#snow {
  grid-column: 2/5;
  grid-row: 4/7;
  background-image: url('../assets/img/snow.png');
  background-repeat: no-repeat;
  background-position-x: -200px;
  background-size: cover;
  background-attachment: fixed;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
}

#snow-content {
  grid-column: 1/2;
  grid-row: 4/7;
}

#houses {
  grid-column: 1/2;
  grid-row: 7/9;
  background-image: url('../assets/img/houses.jpg');
  background-repeat: round;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
}

#houses-content {
  grid-column: 2/3;
  grid-row: 7/9;
}

#cities {
  grid-column: 3/4;
  grid-row: 7/9;
  background-image: url('../assets/img/cities.jpg');
  background-repeat: round;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
}

#cities-content {
  grid-column: 4/5;
  grid-row: 7/9;
}

#winter-is-coming {
  background-image: url('../assets/img/winter-is-coming.png');
  background-repeat: round;
  grid-column: 1/5;
  grid-row: 9/12;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
}

.content {
  padding: 15px;
  background: rgba(0, 0, 0, .3);
  height: 100%;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, .6);
}

.content .title {
  background: rgba(0, 0, 0, .2);
  color: bisque;
  font-style: italic;
  text-align: center;
  padding: 10px;
}

.content .description {
  padding: 10px 20px;
  text-align: justify;
  color: rgba(0, 0, 0, .7);
}

@media only screen and (max-width: 700px) {
  #characters {
    grid-column: 1/5;
    grid-row: 1/3;
  }

  #characters-content {
    grid-column: 1/5;
    grid-row: 3/5;
  }

  #snow {
    grid-column: 1/5;
    grid-row: 5/7;
  }

  #snow-content {
    grid-column: 1/5;
    grid-row: 7/8;
  }

  #houses {
    grid-column: 1/5;
    grid-row: 8/10;
  }

  #houses-content {
    grid-column: 1/5;
    grid-row: 10/11;
  }

  #cities {
    grid-column: 1/5;
    grid-row: 11/13;
  }

  #cities-content {
    grid-column: 1/5;
    grid-row: 13/14;
  }

  #winter-is-coming {
    grid-column: 1/5;
    grid-row: 14/15;
  }
}
</style>
