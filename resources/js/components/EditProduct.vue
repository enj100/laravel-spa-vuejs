<template>
	<div class="login row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Redaguoti skelbimą</div>
                <div class="card-body">
                    <form @submit.prevent="editProduct">
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
                            <input type="text" v-model="form.price" class="form-control" placeholder="0.2€/kg..." required>
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
                            <input type="submit" class="btn btn-primary" value="Išsaugoti">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {getCategories} from '../helpers/auth';
    import {editProduct} from '../helpers/auth';
	export default {
        name: "editProduct",
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
                product: {},
                error: null
            };
        },
        created() {
            this.getCategories();
        	this.product = JSON.parse(localStorage.getItem('product'));
            this.form.title = this.product.title;
            this.form.description = this.product.description;
            this.form.price = this.product.price;
            this.form.contacts = this.product.contacts;
            this.form.category_name = this.product.category_name;
        },
        methods: {
            editProduct() {
                this.updateProduct();
                editProduct(this.$store.getters.currentUser.token,this.$data.form, this.product.id)
                    .then((res) => {
                        this.$router.push({path: '/products/read'});
                    })
                    .catch((error) => {
                        
                    });
            },
            getCategories(){
            	getCategories(this.$store.getters.currentUser.token)
                    .then((res) => {
                        this.categories = res;
                    });
            },
            updateProduct(){
                this.product.title = this.$data.form.title;
                this.product.description = this.$data.form.description;
                this.product.price = this.$data.form.price;
                this.product.contacts = this.$data.form.contacts;
                this.product.category_name = this.$data.form.category_name;
                this.$store.commit("setProduct", this.product);
                console.log(this.product);
            }
        },
        computed: {

        }
        
    }
</script>