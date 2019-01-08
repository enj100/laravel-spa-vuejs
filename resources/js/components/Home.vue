<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-9">
                <div class="card card-default" style="margin-bottom: 35px;">
                    <div class="card-header">Parduodama produkcija</div>
                </div>
                <div class="row">
                    <div class="col-lg-4" v-for="product in products" v-bind:key="product.id">
                        <div class="card" style="min-height:350px;margin-bottom: 30px;">
                          <img class="card-img-top" style="" src="../../images/products.jpg" alt="Card image cap"/>
                          <div class="card-body">
                            <h5 class="card-title">{{ product.title }}</h5>
                            <p class="card-text">{{ product.description }}</p>
                            <p class="card-text">Pardavėjas: {{ product.username }}</p>
                            <div class="d-flex justify-content-end">
                                <router-link to="/products/read" class="nav-link btn btn-primary" style="position: absolute; bottom: 15px;" v-on:click.native="readProduct(product)">Atidaryti</router-link>
                            </div>
                            
                          </div>
                        </div>
                  </div>
                </div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li v-bind:class="[{disabled: !pagination.prev_page_url}]" class="page-item"><a class="page-link" href="#" @click="getProductsHome(pagination.prev_page_url)">Ankstesnis</a></li>
                    <li v-bind:class="[{disabled: !pagination.next_page_url}]" class="page-item"><a class="page-link" href="#" @click="getProductsHome(pagination.next_page_url)">Kitas</a></li>
                  </ul>
                </nav>
            </div>
        </div>
    </div>
</template>


<script>
	import {getProducts} from '../helpers/auth';
    import {deleteProduct} from '../helpers/auth';
    export default {
        name: 'home',
        data(){
        	return {
        		products: [],
        		product:{
        			id: '',
        			title: '',
        			description: '',
        			price: '',
        			contacts: '',
        			user_id: '',
        			username: '',
        		},
                pagination: {}, 
                user_id: this.$store.getters.currentUser.id
        	}
        },
        created() {
        	this.getProductsHome();
        },
        methods: {
        	getProductsHome(page_url){
                let vm = this;
                page_url = page_url || '/api/products';
        		getProducts(this.$store.getters.currentUser.token, page_url)
                    .then((res) => {
                        this.products = res.data;
                        vm.makePagination(res);
                    })
                    .catch(err => console.log(err));
        	},
            makePagination(links){
                let pagination = {
                    current_page: links.current_page,
                    last_page: links.last_page,
                    next_page_url: links.next_page_url,
                    prev_page_url: links.prev_page_url
                }
                this.pagination = pagination;
            },
            isOwner(product){
                if(product.user_id == this.user_id){
                    return true;
                }
                return false;
            },
            deleteProduct(id){
                deleteProduct(id, this.$store.getters.currentUser.token)
                    .then((res) => {
                        this.getProductsHome();
                    });
            },
            editProduct(product){
                this.$store.commit("setProduct", product);
            },
            readProduct(product){
                this.$store.commit("setProduct", product);
            }
        },
        computed: {
        	welcome(){
        		return this.$store.getters.welcome;
        	}
        }
    }
</script>