<template>
    <main>
        <div id="post" v-for="post in post" :key="post.id">
            <div class="title">
                <div class="user-bloc">
                    <div class="publication-informations">
                        <p class="user">{{ post.User.username }}</p>
                        <p>le {{ post.createdAt | formatDate }}</p>
                    </div>
                </div>
            </div>
            <p>{{ post.content }}</p>
            <Comments/>
        </div>
    </main>
</template>

<script>
import Comments from './Comments'

export default {
    name: 'Post',
    components:{
        Comments
    },
    data(){
        return {
            post:"",
            id: localStorage.getItem('id')
        }
    }
}
</script>