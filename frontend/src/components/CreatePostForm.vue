<template>
    <main>
      <!--Nouvelle publication row-->
        <div class="contain row justify-content-center mt-5">
            <b-card class="col-md-6 posts">
                <div id="post-row" class="new row">
                    <div class="col-md-12">
                        <h3>Publication</h3>
                        <form @submit.prevent="createNewPost()">
                            <input type="text" class="form-control" v-model="newContent" placeholder="Laisser un commentaire" required/>
                            <b-button type="submit">Publier</b-button>
                        </form>
                    </div>
                </div>
            </b-card>
        </div>
      <!-- fin publication row -->
    
    </main>
</template>


<script>

export default {
    name: 'CreatePostForm',
    props:['posts', 'createNewPosts'],
    data() {
        return {
            content: [],
            newContent: '',
            userId: localStorage.getItem('userId')
        }
    },
    methods: {
        createNewPost() {
            let addedPost = new Object({
                content: this.newcontent,
                users_id: '',
                createdAt: ''
            });
            this.content.push(addedPost);
            this.newContent = '';
            console.log(this.newContent) 
            fetch('http://localhost:3000/api/posts/create', {
                method: "POST", 
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({content: this.newContent})
            })
            .then(() => {
                this.createNewPosts();
                this.content = "";

            })
            .then(response => {
                response.json();
                console.log(response)
            })
            .catch(error => alert(error))
        }
    }
}   
</script>

