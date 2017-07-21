import axios from 'axios'
import {PATH_URL} from 'api/config'
export function getSwiperData(){
	let url = PATH_URL+'data.json'
	return axios.get(url)
	.then((res)=>{
		return Promise.resolve(res.data)
	})
	.catch(err=>{
		return Promise.reject(err)
	})
}

export function getShopList(){
	let url = PATH_URL+'standShopList.json'
	return axios.get(url)
	.then((res)=>{
		return Promise.resolve(res.data)
	})
	.catch(err=>{
		return Promise.reject(err)
	})
}