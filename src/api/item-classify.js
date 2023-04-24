import request from '@/utils/request'

export function fetchItemLocation() {
  return request({
    url: '/api/item/location',
    method: 'get'
  })
}

export function updateItemLocation(data) {
  const { timestamp, ...rest } = data
  return request({
    url: `/api/item/location/${data.itemLocationID}`,
    method: 'put',
    data: rest
  })
}

export function updateItemCategory(data) {
  const { timestamp, ...rest } = data
  return request({
    url: `/api/item/category/${data.itemCategoryID}`,
    method: 'put',
    data: rest
  })
}

export function updateItemUnit(data) {
  const { timestamp, ...rest } = data
  return request({
    url: `/api/item/unit/${data.itemUnitID}`,
    method: 'put',
    data: rest
  })
}
