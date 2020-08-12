import request from '@/utils/request'

export function fetchList( params) {
  return request({
    url: '/api/list/',
    method: 'get',
    params: params
  })
}

export function deleteApi(id) {
  return request({
    url: '/api/delete/' + id,
    method: 'post'
  })
}

export function createApi(data) {
  return request({
    url: '/api/create',
    method: 'post',
    data: data
  })
}

export function updateApi(id, data) {
  return request({
    url: '/api/update/' + id,
    method: 'post',
    data: data
  })
}

export function getApi(id) {
  return request({
    url: '/api/' + id,
    method: 'get',
  })
}

export function updateEnabled(id, params) {
  return request({
    url: '/api/updateEnabled/' + id,
    method: 'post',
    params: params
  })
}