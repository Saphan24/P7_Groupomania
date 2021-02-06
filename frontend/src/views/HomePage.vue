<template>
  <div class="home">
      <NavBar />
    <div class="content">
      <Posts />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Posts from '../components/Posts'

export default {
    name: 'Home',
    components:{
        NavBar,
        Posts
        
    },
}
</script>


