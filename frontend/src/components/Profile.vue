<template>
    <div class="profile">
        <b-card class="profile col-md-3 col-md-pull-3">
            <div id="profile" v-for="user in profile" :key="user.userId">
                <h4>{{ user.username }}</h4>
                <hr>
                <p>{{ user.bio }}</p>
                <p>Vous êtes inscrit depuis le:{{ user.createdAt | formatDate }}</p>
            </div>
            <button class="btn btn-warning" @click="toggleModale">Supprimer</button>
            <div id="modal" v-if="showModal===true" @close="toggleModale">
	        <p>Êtes-vous certain de vouloir supprimer l'utilisateur <strong>{{ user.username }}</strong> ?</p>
	        <div class="actions">
	    	    <button class="cancel" @click="onCancel">Annuler</button>
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
  methods:{
        toggleModale(){
            this.showModal = !this.showModal
        },
        onConfirm(){
            fetch('http://localhost:3000/api/users/' + this.userId, {
                method: "DELETE",
                headers: { "Content-Type" : "application/json;charset=UTF-8", "Authorization": `Bearer ${this.token}`}
            })
            .then(() => {
                console.log("Profile supprimé");
                localStorage.clear();
                this.$router.push('/Login');
            })
        }
    },
    mounted(){
        fetch("http://localhost:3000/api/users/" + this.userId, {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`}
        })
        .then(response => {
            const data = response.data;
            this.profile = data;

        })
        .catch(error => console.log({error}));
    } 
}
</script>

