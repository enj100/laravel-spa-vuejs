<template>
	<div class="login row justify-content-center">
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">Sukurti naują produktų kategoriją</div>
                <div class="card-body">
                <div class="alert alert-success" v-if="success">
				  <strong>Sukurta!</strong> Nauja kategorija buvo sėkmingai sukurta.
				</div>
                    <form @submit.prevent="createCategory">
                        <div class="form-group row">
                            <label for="title">Pavadinimas:</label>
                            <input type="text" v-model="form.category" class="form-control" placeholder="Daržovės, pieno produktai..." required>
                        </div>
                        <div class="form-group row">
                            <input type="submit" class="btn btn-primary" value="Sukurti">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import {createCategory} from '../helpers/auth';
	export default {
        name: "createCategory",
        data() {
            return {
                form: {
                    category: ''
                },
                error: null,
                success: false
            };
        },
        methods: {
            createCategory() {
                createCategory(this.$store.getters.currentUser.token,this.$data.form)
                    .then((res) => {
                    	console.log(res);
                    	this.form.category = '';
                    	this.success = true;
                    })
                    .catch((error) => {
                        
                    });
            },
        },
        computed: {
        }
        
    }
</script>