import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

Vue.use(VueRouter);

const  routes =  [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login,
            meta: {
                guest: true
            },
        },
        {
            path: '/register',
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                auth: true
            },
        },
        { path: '*', redirect: '/'}
    ];

export default new VueRouter({mode: 'history', routes})
