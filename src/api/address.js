import axios from 'axios'
import {PATH_URL} from 'api/config'

export function getAddress() {
	let url = PATH_URL+'address.json'
	return axios.get(url).then((res)=>{
		return Promise.resolve(res.data)
	})
}

export function editAddress() {
	let url = PATH_URL+'editAddress.json'
	return axios.get(url).then((res)=>{
		return Promise.resolve(res.data)
	})
}

export function addAddress() {
	let url = PATH_URL+'editAddress.json'
	return axios.get(url).then((res)=>{
		return Promise.resolve(res.data)
	})
}