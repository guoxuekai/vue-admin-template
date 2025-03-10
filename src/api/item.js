import request from '@/utils/request'

export function fetchItem() {
  return request({
    url: '/api/item',
    method: 'get'
  })
}

export function fetchItemByPage(query) {
  return request({
    url: '/api/item/findByPage',
    method: 'get',
    params: query
  })
}
export function fetchItemCategoryList() {
  return request({
    url: '/api/item/category/findAllList',
    method: 'get'
  })
}

export function fetchItemCategory() {
  return request({
    url: '/api/item/category',
    method: 'get'
  })
}

export function updateItemCategory(data) {
  return request({
    url: '/api/item/category',
    method: 'put',
    data
  })
}

export function createItemCategory(data) {
  return request({
    url: '/api/item/category',
    method: 'post',
    data
  })
}

export function fetchItemUnit() {
  return request({
    url: '/api/item/unit',
    method: 'get'
  })
}

export function updateItemUnit(data) {
  return request({
    url: '/api/item/unit',
    method: 'put',
    data
  })
}

export function createItemUnit(data) {
  return request({
    url: '/api/item/unit',
    method: 'post',
    data
  })
}

export function fetchItemLocation() {
  return request({
    url: '/api/item/location',
    method: 'get'
  })
}

/* export function updateItemLocation(data) {
  return request({
    url: '/api/item/location/{data.itemLocationID}',
    method: 'put',
    data
  })
} */

export function updateItemLocation(data) {
  /* const data = { itemLocationID, itemLocationName } */

  return request({
    url: `/api/item/location/${data.itemLocationID}`,
    method: 'put',
    data
  })
}

export function createItemLocation(data) {
  return request({
    url: '/api/item/location',
    method: 'post',
    data
  })
}

export function fetchItemStatus() {
  return request({
    url: '/api/item/status',
    method: 'get'
  })
}

export function createItem(data) {
  return request({
    url: '/api/item',
    method: 'post',
    data
  })
}

export function updateItem(data) {
  return request({
    url: '/api/item',
    method: 'put',
    data
  })
}

export function updateItemStatus(data) {
  return request({
    url: '/api/item/updateStatus',
    method: 'put',
    data
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

export function fetchItemCount() {
  return request({
    url: '/api/item/count',
    method: 'get'
  })
}

export function fetchItemStockSum() {
  return request({
    url: '/api/item/stockSum',
    method: 'get'
  })
}

export function fetchItemStockByCategory() {
  return request({
    url: '/api/item/countItemStockByCategory',
    method: 'get'
  })
}

export function fetchItemCategoryCount() {
  return request({
    url: '/api/item/category/count',
    method: 'get'
  })
}

export function fetchItemUnitCount() {
  return request({
    url: '/api/item/unit/count',
    method: 'get'
  })
}

export function fetchItemLocationCount() {
  return request({
    url: '/api/item/location/count',
    method: 'get'
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
