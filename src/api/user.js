import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/auth',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/auth/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function fetchUser() {
  return request({
    url: '/api/user',
    method: 'get'
  })
}

export function fetchUserCount() {
  return request({
    url: '/api/user/count',
    method: 'get'
  })
}

export function fetchUserRole() {
  return request({
    url: '/api/user/role',
    method: 'get'
  })
}
