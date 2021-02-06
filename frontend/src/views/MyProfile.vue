<template>
    <div class="home">
        <div class="header">
            <NavBar/>
        </div>
        <div class="addProfile">
            <Profile v-bind:userId="userId" v-bind:token="token"/>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Profile from '../components/Profile.vue'

export default {
    name: 'Home',
    data(){
        return{
            revele: false,
            userId: sessionStorage.getItem('userId'),
            token: sessionStorage.getItem('token')
        }
    },
    components:{
        NavBar,
        Profile,
    }
}
</script>
