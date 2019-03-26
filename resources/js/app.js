import Vue from 'vue';
import router from './router';
import App from './components/App';
import store from './store';
import Vuelidate from 'vuelidate';
import axios from 'axios';
Vue.use(Vuelidate);

//@todo: set MIX_APP_URL and insert into axios.defaults.baseUrl
//console.log(process.env.MIX_APP_URL);
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Accepts'] = 'application/json';

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.auth)) {
        if (localStorage.getItem('token') == null) {
            next('/login')
        } else {
                next();
            }
        } else if(to.matched.some(record => record.meta.guest)){
        if (localStorage.getItem('token') == null) {
            next()
        } else {
            next('/profile');
        }
    } else {
        next(false);
    }
});

const app = new Vue({
    el: '#app',
    components: {
        app: App
    },
    store,
    router,
});
