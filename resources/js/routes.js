import Home from './components/Home.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import CreateProduct from './components/CreateProduct.vue';
import EditProduct from './components/EditProduct.vue';
import ViewProduct from './components/ViewProduct.vue';
import CreateCategory from './components/CreateCategory.vue';

export const routes = [
	{
		path: '/',
		component: Home,
		meta:{
			requiresAuth: true
		}
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/products',
		component: CreateProduct,
		meta:{
			requiresAuth: true
		}
	},
	{
		path: '/products/edit',
		component: EditProduct,
		meta:{
			requiresAuth: true
		}
	},
	{
		path: '/products/read',
		component: ViewProduct,
		meta:{
			requiresAuth: true
		}
	},
	{
		path: '/categories',
		component: CreateCategory,
		meta:{
			requiresAuth: true
		}
	},


];