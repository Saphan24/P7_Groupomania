<template>
    <main>
      <!--Nouvelle publication row-->
        <div class="contain row justify-content-center mt-5">
            <b-card class="col-md-6 posts">
                <div id="post-row" class="new row">
                    <div class="col-md-12">
                        <h3>Publication</h3>
                        <form @submit.prevent="createNewPost()">
                            <b-form-group>
                                <input type="text" class="form-control" v-model="content" placeholder="Laisser un commentaire" required/>
                            </b-form-group>
                            <b-form-group>
                                <b-button type="submit">Publier</b-button>
                            </b-form-group>
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
            
        }
    },
    methods: {
        createNewPost() {
            let addedPost = new Object({
                users_id: '',
                content: this.newcontent,
                createdAt: ''
            });
            this.content.push(addedPost);
            this.newContent = '';
            console.log(this.newContent)
            
            fetch('http://localhost:3000/api/posts/create', {
                method: "POST", 
                headers: {"Content-type": "application/json;charset=UTF-8"},
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

