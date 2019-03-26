<template>
        <div>
            <fieldset disabled>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Name</label>
                </div>
                <div class="field-body">
                <div class="field">
                <div class="control">
                    <input class="input" type="text" v-model="user.name" >
                </div>
                </div>
            </div>
            </div>
            <div class="field is-horizontal" v-if="user.lastname">
                <div class="field-label">
                    <label class="label"> Last Name</label>
                </div>
                <div class="field-body">
            <div class="field " >
                <div class="control">
                    <input class="input" type="text"  v-model="user.lastname">
                </div>
            </div>
            </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label"> Email</label>
                </div>
                <div class="field-body">
            <div class="field" >
                <div class="control">
                    <input class="input" type="text"  :value="user.email">
                </div>
            </div>
                </div>
            </div>
            </fieldset>
            <div class="field">

            </div>


                    <div class="field has-addons has-addons-centered">
                        <div class="control ">
                            <button class="button is-primary" @click.prevent="logout">
                                Logout
                            </button>


                </div>
            </div>
        </div>
</template>

<script>
    export default {
        methods: {
            logout(){
                this.$store.dispatch('logout');
            }
        },
        computed: {
            user(){
                return JSON.parse(localStorage.getItem('user'));
            }
        },
        created() {
            const token = localStorage.getItem('token');
            this.$store.dispatch('getProfile', token);
        }

    }
</script>

<style scoped>

</style>
