import storage from 'good-storage'

const DETAILSHOP = "__detalilShop__"

export function setLocalDetailShop(item){
	 storage.set(DETAILSHOP, item)
	 return item
}

export function getLocalDetailShop(){
	return storage.get(DETAILSHOP, {})
}