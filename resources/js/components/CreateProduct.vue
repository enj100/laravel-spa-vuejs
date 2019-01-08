<template>
	<div class="login row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Įdėti naują produktą į pardavimą</div>
                <div class="card-body">
                    <form @submit.prevent="createProduct">
                        <div class="form-group row">
                            <label for="title">Pavadinimas:</label>
                            <input type="text" v-model="form.title" class="form-control" placeholder="Morkos, kopūstai..." required>
                        </div>
                        <div class="form-group row">
                            <label for="description">Aprašymas:</label>
                            <input type="text" v-model="form.description" class="form-control" placeholder="Aprašymas" required>
                        </div>
                        <div class="form-group row">
                            <label for="price">Kaina:</label>
                            <input type="text" v-model="form.price" class="form-control" placeholder="0.2€/kg...">
                        </div>
                        <div class="form-group row">
                            <label for="contacts">Kontaktai:</label>
                            <input type="text" v-model="form.contacts" class="form-control" placeholder="+370..." required>
                        </div>
                        <div class="form-group row">
                            <label for="category_id">Pasirinkite kategoriją:</label>
                            <select class="form-control" id="sel1" v-model="form.category_name">
							    <option v-for="category in categories" v-bind:key="category.category_name">{{category.category}}</option>
						  	</select>
                        </div>
                        <div class="form-group row">
                            <input type="submit" class="btn btn-primary" value="Įdėti skelbimą">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {createProduct} from '../helpers/auth';
	import {getCategories} from '../helpers/auth';
	export default {
        name: "createProduct",
        data() {
            return {
                form: {
                    title: '',
                    description: '',
                    price: '',
                    contacts: '',
                    category_name: '',
                    user_id: this.$store.getters.currentUser.id,
                    username: this.$store.getters.currentUser.name
                },
                categories: {},
                category: {
                	id: '',
                	category: ''
                },
                error: null
            };
        },
        created() {
        	this.getCategories();
        },
        methods: {
            createProduct() {
                createProduct(this.$store.getters.currentUser.token,this.$data.form)
                    .then((res) => {
                        this.$router.push({path: '/'});
                    })
                    .catch((error) => {
                        
                    });
            },
            getCategories(){
            	getCategories(this.$store.getters.currentUser.token)
                    .then((res) => {
                        this.categories = res;
                    });
            }
        },
        computed: {
        }
        
    }
</script>