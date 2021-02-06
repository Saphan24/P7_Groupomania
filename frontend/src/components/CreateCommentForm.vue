<template>
    <script type="text" id="commentTemplate">
        <li>
            <p class="post-comment">{{ comment.content }}</p>   
            <small>{{ comment.users_id }} créé le {{ comment.createAt }}</small>
        </li>
    </script>
</template>

<script>

export default {
    name: "CreateCommentForm",
    template: "#commentTemplate",
    props: ["comment"]

}
</script>