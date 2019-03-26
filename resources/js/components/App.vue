<template>
    <div  class="box">
        <div class="tabs  is-fullwidth is-toggle is-medium" v-if="!auth">
            <app-auth-box></app-auth-box>
        </div>

            <router-view></router-view>

    </div>
    
</template>

<script>
    import AuthBox from './AuthBox.vue';
    export default {
        components: {
            "app-auth-box": AuthBox,
        },
        computed: {
            auth(){
                return this.$store.getters.isAuth;
            }
        },
        created() {
            this.$store.dispatch('tryAutoLogin');
        }
    }
</script>

<style scoped>

</style>
