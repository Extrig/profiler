<template>
    <form @submit.prevent="submit" class="register">
        <div class="field">
            <label class="label" for="name">Name</label>
            <div class="control">
                <input
                    class="input"
                    :class="{'is-danger': $v.name.$error}"
                    type="text"
                   name="name"
                    id="name"
                    @input="$v.name.$touch()"
                    v-model.trim="name">
            </div>
            <div v-if="$v.name.$error">
                <p class="help is-danger" v-if="!$v.name.required">Name is required</p>
                <p class="help is-danger" v-if="!$v.name.alpha">Name must have  alphabet characters</p>
                <p class="help is-danger" v-if="!$v.name.minLen">Name must have at least {{$v.name.$params.minLen.min}} letters </p>
            </div>
        </div>
        <div class="field">
            <label class="label" for="lastname">Last name <small>(optional)</small></label>
            <div class="control">
                <input
                    class="input"
                    name="lastname"
                    id="lastname"
                    :class="{'is-danger': $v.lastname.$error}"
                    @input="$v.lastname.$touch()"
                    type="text"
                    v-model.trim="lastname">
            </div>
            <div v-if="$v.lastname.$error">
                <p class="help is-danger" v-if="!$v.lastname.alpha">Last name must have  alphabet characters</p>
                <p class="help is-danger" v-if="!$v.lastname.minLen">Last name must have at least {{$v.lastname.$params.minLen.min}} letters </p>
            </div>
        </div>
        <div class="field">
            <label class="label" for="email">Email</label>
            <div class="control">
                <input
                    class="input"
                    :class="{'is-danger': $v.email.$error}"
                    type="email"
                    id="email"
                    name="email"
                    @input="$v.email.$touch()"
                    required
                    v-model.trim="email">
            </div>
            <div v-if="$v.email.$error">
                <p class="help is-danger" v-if="!$v.email.required">Email is required</p>
                <p class="help is-danger" v-if="!$v.email.email">This email is invalid</p>
            </div>
        </div>
        <div class="field">
            <label class="label" for="password">Password</label>
            <div class="control">
                <input
                    class="input"
                    :class="{'is-danger': $v.password.$error}"
                    type="password"
                    name="password"
                    id="password"
                    @input="$v.password.$touch()"
                    required
                    v-model.trim="password">
            </div>

            <div v-if="$v.password.$error">
                <p class="help is-danger" v-if="!$v.password.required">Password is required</p>
                <p class="help is-danger" v-if="!$v.password.minLen">Password must be more than {{$v.password.$params.minLen.min}} characters</p>
            </div>
        </div>
        <div class="field">
            <label class="label" for="confirmPassword">Confirm password</label>
            <div class="control">
                <input
                    class="input"
                    :class="{'is-danger': $v.confirmPassword.$error}"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    @input="$v.confirmPassword.$touch()"
                    required
                    v-model.trim="confirmPassword">
            </div>
            <div v-if="$v.confirmPassword.$error">
                <p class="help is-danger" v-if="!$v.confirmPassword.sameAs">The password and confirm password fields do not match.</p>
            </div>
        </div>
        <!-- @todo: google recaptcha-->
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" v-model="terms">
                    I agree to the terms and conditions
                </label>
            </div>
        </div>
        <div class="notification is-danger" v-if="message.length > 0" v-for="message in messages" :index="message.index">
           {{message}}
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-success" :disabled="$v.$invalid"  type="submit">
                    Register
                </button>
            </p>
        </div>
        <div class="notification is-danger" v-if="error != null" >
            <p v-for="e,index in error.errors" :key="index" >{{e.toString().replace( /[\]\["]/g, "")}}</p>
        </div>

    </form>
</template>

<script>
    import { required, email, minLength, sameAs, alpha} from 'vuelidate/lib/validators'
    export default {
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                name:'',
                lastname: '',
                terms: false,
                messages: [],
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
            },
            confirmPassword: {
                required,
                sameAs: sameAs('password')
            },
            name: {
                required,
                alpha,
                minLen: minLength(3)
            },
            lastname: {
                alpha,
                minLen:minLength(3)
            }
        },
        methods: {
            submit() {
                this.$v.$touch();
                if(!this.$v.$invalid && this.terms) {
                    const formData = {
                        name: this.name,
                        lastname: this.lastname,
                        email: this.email,
                        password: this.password,
                        confirmPassword: this.confirmPassword
                        };
                    this.$store.dispatch('register', formData)
                        .then(res => {
                            this.$router.push({name: 'profile'});
                        }).catch(err => {
                        this.error = err.data;
                    });
                    } else {
                    let msg;
                    if(!this.terms) {
                         msg = 'You need agree with our terms';
                    } else {
                        msg = 'Check all fields and try again please';
                    }

                    this.messages.push(msg);
                }

                }

            }
        }
</script>

<style scoped>

</style>
