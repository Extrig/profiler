<template>
    <form @submit.prevent="submit">
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input
                    class="input"
                    :class="{'is-danger': $v.email.$error}"
                    type="email"
                    name="email"
                    @input="$v.email.$touch()"
                    placeholder="Email"
                    required
                    v-model="email">
                <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
                <span class="icon is-small is-right">
      <i class="fas fa-check" :class="{'fa-check' : !$v.email.$error ,'fa-times' : $v.email.$error }"></i>
    </span>
            </p>
            <div v-if="$v.email.$error">
                <p class="help is-danger" v-if="!$v.email.required">Email is required</p>
                <p class="help is-danger" v-if="!$v.email.email">This email is invalid</p>
            </div>
        </div>
        <div class="field">
            <p class="control has-icons-left">
                <input
                    class="input"
                    :class="{'is-danger': $v.password.$error}"
                    type="password"
                    name="password"
                    @input="$v.password.$touch()"
                    placeholder="Password"
                    required
                    v-model="password">
                <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
            </p>

            <div v-if="$v.password.$error">
                <p class="help is-danger" v-if="!$v.password.required">Password is required</p>
                <p class="help is-danger" v-if="!$v.password.minLength">Password must be more than {{$v.password.$params.minLen.min}} characters</p>
            </div>
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-success" :disabled="$v.$invalid"  type="submit">
                    Login
                </button>
            </p>
        </div>
        <div class="notification is-danger"  v-if="error">
            {{error.message}}
        </div>
    </form>
</template>

<script>
    import { required, email, minLength} from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                email: '',
                password: '',
                error: null
            }
        },
        validations: {
                email: {
                    required,
                    email
                },
            password: {
                    required,
                    minLen: minLength(6)
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if(!this.$v.$invalid) {
                    const formData = {
                        email: this.email,
                        password: this.password,
                    };
                        this.$store.dispatch('login', formData)
                            .then (res => {this.$router.push({ name: 'profile' });}).catch(err => {
                                this.error = err.data;
                        });
                }

            }
        }
    }
</script>

<style scoped>

</style>
