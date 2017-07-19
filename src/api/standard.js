import axios from 'axios'
export function getSwiperData(){
	let url = 'http://localhost:8080/static/data.json'
	return axios.get(url)
	.then((res)=>{
		return Promise.resolve(res.data)
	})
	.catch(err=>{
		return Promise.reject(err)
	})
}