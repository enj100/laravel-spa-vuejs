export function login(credentials){
	return new Promise((res, rej) =>{
		axios.post('/api/auth/login', credentials)
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej("Neteisingas el. paštas arba slaptažodis!");
			})
	})
}

export function register(credentials){
	let error = "";
	if(credentials.password != credentials.password_confirmation){
		error = "Slaptažodžiai nesutampa!";
	}
	return new Promise((res, rej) =>{
		axios.post('/api/auth/register', credentials)
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function getProducts(token, page_url){
	return new Promise((res, rej) =>{
		axios.get(page_url, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function editProduct(token, data, id){
	return new Promise((res, rej) =>{
		axios.put(`/api/products/${id}`, data, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function getCategories(token){
	return new Promise((res, rej) =>{
		axios.get('/api/categories',{
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function getComments(token){
	return new Promise((res, rej) =>{
		axios.get('/api/comments',{
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function createProduct(token, data){
	let error = "";
	return new Promise((res, rej) =>{
		axios.post('/api/products', data,{
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function deleteProduct(data, token){
	let error = "";
	console.log(data);
	return new Promise((res, rej) =>{
		axios.delete(`/api/products/${data}`, {
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function createCategory(token, data){
	let error = "";
	return new Promise((res, rej) =>{
		axios.post('/api/categories', data,{
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function createComment(token, data){
	let error = "";
	return new Promise((res, rej) =>{
		axios.post('/api/comments', data,{
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then((response) => {
				res(response.data);
			})
			.catch((err) => {
				rej(error);
			})
	})
}

export function getLocalUser() {
    const userStr = localStorage.getItem("user");

    if(!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}