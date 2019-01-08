require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import {routes} from './routes';
import MainApp from './components/MainApp.vue';
import StoreData from './store';
import {initialize} from './helpers/general.js';

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
	routes,
	mode: 'history'
});

initialize(store, router);


const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
    	MainApp
    }
});
