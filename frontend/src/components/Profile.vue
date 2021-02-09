<template>
    <div class="contain row justify-content-center mt-5">
        <b-card class="profile col-md-6 col-md-pull-6">
            <div id="profile" v-for="user in profile" :key="user.userId">
                <h3>{{ user.username }}</h3>
                <div id="info_profile">
                    <p>{{ user.bio }}</p>
                    <p>Vous êtes inscrit depuis le:{{ user.createdAt | formatDate }}</p>
                </div>
            </div>
            <button class="btn btn-warning" @click="toggleModale">Supprimer</button>
            <div id="modal" v-if="showModal===true" @close="toggleModale">
	            <p>Êtes-vous certain de vouloir supprimer l'utilisateur ?</p>
	            <div class="actions">
	    	        <button class="cancel" @click="toggleModale">Annuler</button>
	    	        <button class="confirm" @click="onConfirm">Confirmer</button>
	            </div>
            </div>
        </b-card>
    </div>
</template>

<script>

export default {
    name: "Profile",
    props: ["userId", "token"],
    data() {
        return {
            profile:"",
            showModal: false,
        }
    },
    mounted(){
        fetch("http://localhost:3000/api/users/" + this.userId, {
            method: "GET",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${this.token}`},
            body: JSON.stringify({userId:this.userId})
        })
        .then(response => {
            console.log(response.data)
            this.profile = response.data;
        })
        .catch(error => console.log({error}));
    },
    methods:{
        toggleModale(){
            this.showModal = !this.showModal
        },
        onConfirm(){
            fetch('http://localhost:3000/api/users/' + this.userId, {
                method: "DELETE",
                headers: { "Content-Type" : "application/json;charset=UTF-8", "Authorization": `Bearer ${this.token}`},
                body: JSON.stringify({userId:this.userId})
            })
            .then(() => {
                console.log("Profile supprimé");
                localStorage.clear();
                this.$router.push('/Login');
            })
        }
    }
    
}
</script>

