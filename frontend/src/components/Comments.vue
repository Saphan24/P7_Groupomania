<template>
<div id="commentaires">
    <b-card-footer class="post-reply comments">
        <blockquote>
            <div is="app-comment" v-for="comment in comments" :key="comment.posts_id" :comment="comment">
                {comment}
            </div>
        </blockquote>
    </b-card-footer>
    <input type="text" class="form-control" rows="1" placeholder="Commentaire..." v-model="newComment" v-on:keyup.enter='submitComment'>
    <!-- Template -->
    <!--<script type="text/x-template" id="commentTemplate">
        <li>
            <p class="post-comment">{{ comment.content }}</p>   
            <small>{{ comment.users_id }} créé le {{ comment.createAt }}</small>
            <button @click="removeComment(n)">X</button>
        </li>
    </script>-->
</div>
    
</template>

<script>

export default {
    name: "Comments",
    
    data() {
        return {
            newComment: '',
            comments: [],
            userId: localStorage.getItem('userId')
        }
    },
    mounted() {
        if(localStorage.getItem('comments')) {
            try {
                this.comments = JSON.parse(localStorage.getItem('comments'));
            } catch(e) {
                localStorage.removeItem('comments')
            }
        }
    },
    methods: {
        removeComment(x){
            this.comment.splice(x,1);
        },
        submitComment() {
            if(!this.newComment) return;
            this.comments.push({
                content: this.newComment,
                users_id: '',
                createdAt: ''
            });
            this.newComment = '';
            fetch('http://localhost:3000/api/comments/create/', {
                method: "POST", 
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify(this.comments)
            })
            /*saveComments() {
              let parsed = JSON.stringify(this.comments);
              localStorage.setItem('comments, parsed');
            }*/
        },
    }
}
</script>