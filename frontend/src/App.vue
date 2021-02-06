<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">

* {
	box-sizing: border-box;
	font-family: Montserrat, Avenir, Helvetica, Arial, sans-serif;
}

body{
    margin:0;
    padding:0;
    background: url("./assets/fond_groupomania.jpg") no-repeat center fixed; 
    -webkit-background-size: cover; /* pour anciens Chrome et Safari */
    background-size: cover; /* version standardisée */
}

</style>
