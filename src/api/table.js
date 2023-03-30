import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://localhost:9528/dev-api/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getItemList(params) {
  return request({
    url: 'http://localhost:8080/api/item/findAll',
    method: 'get',
    params
  })
}
