import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: null,
        token: null,
        time: null
    },
    mutations: {
        saveAuth(state, userData)
        {
            state.token = userData.token;
            state.currentUser = userData.user;
            state.time = userData.expiresIn;
        },
        stayAuth(state, data)
        {
            state.token = data.token;
            state.time = data.time;
        },
        storeUser(state, user)
        {
           state.currentUser = user;
           localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state)
        {
            state.token = null;
            state.currentUser = null;
            state.time = null;
            localStorage.removeItem('token');
            localStorage.removeItem('expTime');
            localStorage.removeItem('user');
        }
    },
    actions: {
        register({commit}, userData)
        {
            return new Promise((resolve , reject) => {
                axios.post('/registration', userData)
                    .then(res => {
                        console.log(res);

                        const now = new Date();
                        const expTime = now.getTime() + res.data.expiresIn * 1000;
                        localStorage.setItem('expTime', new Date(expTime));
                        localStorage.setItem('token', res.data.token);

                        commit('saveAuth', res.data);
                        commit('storeUser', res.data.user);
                        resolve(res);

                    })
                    .catch(error => {
                        reject(error.response);
                    })
            });
        },
        login({commit}, credentials){
            return new Promise((resolve , reject) => {
                axios.post('/login', credentials)
                    .then(res => {
                        console.log(res);
                        const now = new Date();
                        const expTime = now.getTime() + res.data.expiresIn * 1000;
                        localStorage.setItem('expTime', new Date(expTime));
                        localStorage.setItem('token', res.data.token);
                        commit('saveAuth', res.data);
                        commit('storeUser', res.data.user);
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error.response);
                    })
            });

        },
        logout({commit, state}){
            axios.get('/logout?token=' + state.token)
                .then(res => {
                    commit('clearUser');
                    router.push('/login');
                })
                .catch(error => {
                    //console.log(error.response);
                })
        },
        tryAutoLogin({commit, dispatch})
        {
            const token = localStorage.getItem('token');
            if(!token)
            {
                return;
            }
            const time = localStorage.getItem('expTime');
            const now = new Date();
            if(now >= time)
            {
                return;
            }
            if(token && time) {
                commit('stayAuth', {
                    token,
                    time
                });
                dispatch('getProfile', token);
            } else {
                commit('clearUser');
            }

        },
        getProfile({commit}, token){
            axios.get('/profiler?token=' + token)
                .then(res => {
                    commit('storeUser', res.data.user)
                })
                .catch(error => {
                   if(error.response.status == 401){
                       router.push('/login');
                   }
                })
        }
    },
    getters: {
        isAuth(state)
        {
            return state.token !== null;
        },
        getUser(state)
        {
            return state.currentUser;
        }
    }
})
