<template>
	<div class="container">
        <div class="row justify-content-center">
            <div class="col-md-9">
                <div class="card card-default" style="min-width: 300px;margin-bottom: 35px;">
                    <div class="card-header">
                    	<div class="row">
                    		<div class="col-md-9">
                    			{{product.title}}
                    		</div>
                    		<div class="col-md-3">
                    			<a href="#" v-if="isOwner(product)" class="btn btn-danger btn-sm" style="margin-right: 8px;" @click="deleteProduct(product.id)">Trinti</a>
                   				<router-link v-if="isOwner(product)" to="/products/edit" class="btn btn-secondary btn-sm">Redaguoti</router-link>
                    		</div>
                    	</div>
                    </div>
                	<div class="card-body">
                		<div class="row">
                			<div class="col-md-7">
                				<img class="card-img-top img-thumbnail" style="min-width: 250px; margin-bottom: 20px;" src="../../images/products.jpg" alt="Card image cap"/>
                			</div>
                			<div class="col-md-5">
                				<div class="card">
								  <div class="card-header">
								    Apie prekę
								  </div>
								  <ul class="list-group list-group-flush">
								    <li class="list-group-item"><p class="font-weight-bold">Aprašymas: </p>{{product.description}}</li>
								    <li class="list-group-item"><p class="font-weight-bold">Kategorija: </p>{{product.category_name}}</li>
								    <li class="list-group-item"><p class="font-weight-bold">Kaina: </p>{{product.price}}</li>
								    <li class="list-group-item"><p class="font-weight-bold">Kontaktai: </p>{{product.contacts}}</li>
								    <li class="list-group-item"><p class="font-weight-bold">Vartotojas: </p>{{product.username}}</li>
								  </ul>
								</div>
                			</div>
                		</div>
                	</div>
                </div>
                <div class="card">
				  	<div class="card-header">
				    	<div class="row">
				    		<div class="col-md-10">
				    			Komentarai
				    		</div>
				    		<div class="col-md-2">
				    			<button type="button" style="padding-top: 1px; padding-bottom: 1px;" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
				    			@click="resetMessage()">
				 				 Pridėti
								</button>
				    		</div>
				    	</div>
	 	 			</div>
				  	<ul class="list-group list-group-flush" v-for="comment in comments" v-bind:key="comment.id">
				    	<li class="list-group-item" v-if="checkIfCommentDepentsToProduct(comment)">
				    	<p>{{comment.username}}: {{comment.description}}</p>
				    	</li>
			 	 	</ul>
				</div>
				<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Pridėti komentarą</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      	<div class="alert alert-success" v-if="success">
					 		<strong>Komentaras</strong> buvo sėkmingai pridėtas!
						</div>
				      <form @submit.prevent="createComment">
					      <div class="modal-body">
					        
					          <div class="form-group">
					            <label for="message-text" class="col-form-label">Komentaras:</label>
					            <textarea class="form-control" id="message-text" v-model="commentForm.description"></textarea>
					          </div>
					      </div>
					      <div class="modal-footer">
					        <button type="button" class="btn btn-secondary" data-dismiss="modal">Uždaryti</button>
					        <input type="submit" class="btn btn-primary" value="Komentuoti">
					      </div>
				      </form>
				    </div>
				  </div>
				</div>
            </div>
        </div>
    </div>
</template>

<script>
	import {getCategories} from '../helpers/auth';
    import {editProduct} from '../helpers/auth';
    import {createComment} from '../helpers/auth';
    import {getComments} from '../helpers/auth';
    import {deleteProduct} from '../helpers/auth';
	export default {
        name: "viewProduct",
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
                commentForm: {
                	username: '',
                	user_id: '',
                	product_id: '',
                	description: '',
                },
                categories: {},
                category: {
                	id: '',
                	category: ''
                },
                product: {},
                error: null,
                success: false,
                user_id: this.$store.getters.currentUser.id,
                comments: {},
                comment: {
                	id: '',
					username: '',
                	user_id: '',
                	product_id: '',
                	description: '',
                }
            };
        },
        created() {
        	this.product = JSON.parse(localStorage.getItem('product'));
        	this.getComments();
        },
        methods: {
            editProduct() {
                editProduct(this.$store.getters.currentUser.token,this.$data.form, this.product.id)
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
                        this.$router.push({path: '/'});
                    });
            },
            editProduct(product){
                this.$store.commit("setProduct", product);
            },
            createComment() {
            	this.commentForm.username = this.$store.getters.currentUser.name;
            	this.commentForm.user_id = this.user_id;
            	this.commentForm.product_id = this.product.id;
                createComment(this.$store.getters.currentUser.token,this.$data.commentForm)
                    .then((res) => {
                    	this.commentForm.description = '';
                    	this.success = true;
                    	this.getComments();
                    })
                    .catch((error) => {
                        
                    });
            },
            resetMessage(){
            	this.success = false;
            },
            getComments(){
            	getComments(this.$store.getters.currentUser.token)
                    .then((res) => {
                        this.comments = res;
                    })
                    .catch(err => console.log(err));
            },
            checkIfCommentDepentsToProduct(comment){
            	if(comment.product_id == this.product.id){
            		return true;
            	}
            	return false;
            }
        },
        computed: {

        }
        
    }
</script>