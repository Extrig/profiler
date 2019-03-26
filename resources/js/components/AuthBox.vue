<template>
            <ul>
                <router-link
                    to="/login"
                    tag="li"
                    active-class="is-active" exact>
                    <a>
                        Log In
                    </a>
                </router-link>
                <router-link
                    to="/register"
                    tag="li"
                    active-class="is-active">
                    <a>
                        Register
                    </a>
                </router-link>
            </ul>
</template>

<script>
    export default {
        name: "AuthBox"
    }
</script>

<style scoped>

</style>
