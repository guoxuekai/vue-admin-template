import request from '@/utils/request'

export function fetchItem() {
  return request({
    url: '/api/item',
    method: 'get'
  })
}

export function fetchItemByPage(pageNum) {
  return request({
    url: '/api/item/findByPage',
    method: 'get',
    params: { pageNum }
  })
}
export function fetchItemCategory() {
  return request({
    url: '/api/item/category',
    method: 'get'
  })
}

export function fetchItemLocation() {
  return request({
    url: '/api/item/location/findAll',
    method: 'get'
  })
}

export function getItemByPage(pageNum) {
  return request({
    url: '/api/item/findAll',
    method: 'get',
    params: { pageNum }
  })
}

export function getItemById(id) {
  return request({
    url: '/api/item',
    method: 'get',
    params: { id }
  })
}

/*
export function addItem(form) {
  form.categoryId = form.categoryId[2]
  return request({
    url: '/api/item',
    method: 'post',

  })
}
*/
