<template>
    <main>
        <CreatePostForm v-bind:posts="posts" v-bind:createNewPosts="createNewPosts"/>
        <div id="post" v-for="post in posts" :key="post.id">
            <div class="title">
                <div class="user-bloc">
                    <div class="publication">
                        <p class="user">{{ post.User.username }}</p>
                        <p>le {{ post.createdAt | formatDate }}</p>
                    </div>
                </div>
                <div class="div-icon">
                    <font-awesome-icon icon="trash" id="icon-trash" v-if="post.creator_id == id" @click="removePost(post.id)"/>
                </div>
            </div>
            <p>{{ post.content }}</p>
            <router-link :to="{name:'Post', params: {id : post.id}}"></router-link>
        </div>
    </main>
</template>

<script>
import CreatePostForm from './CreatePostForm'

export default {
    name: 'Posts',
    components: {
        CreatePostForm
    },
    data(){
        return {
            posts: "",
            id: localStorage.getItem('id'),
            token: localStorage.getItem('token'),
        }
    },
    methods: {
        removePost(id){
            const postId = id;
            fetch('http://localhost:3000/api/posts/' + postId, {
                method: "DELETE", 
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify(this.posts)
            })
            .then(() => {
                this.createNewPosts();
            })
            .catch(error => console.log(error));
        },
        createNewPosts() {
            fetch('http://localhost:3000/api/posts/', {
                method: "GET", 
                headers: {"Content-type": "application/json;charset=UTF-8"},
            })
            .then(res => {
                const data = res.data;
                this.posts = data;
            })
            .catch(error => console.log({error}));
        },
    },
    beforemount() {
        this.createNewPosts();
    }
}
</script>