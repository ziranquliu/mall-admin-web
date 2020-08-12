import request from '@/utils/request'

export function fetchList( params) {
  return request({
    url: '/db/list/',
    method: 'get',
    params: params
  })
}

export function deleteDb(id) {
  return request({
    url: '/db/delete/' + id,
    method: 'post'
  })
}

export function createDb(data) {
  return request({
    url: '/db/create',
    method: 'post',
    data: data
  })
}

export function updateDb(id, data) {
  return request({
    url: '/db/update/' + id,
    method: 'post',
    data: data
  })
}

export function getDb(id) {
  return request({
    url: '/db/' + id,
    method: 'get',
  })
}

export function updateEnabled(id, params) {
  return request({
    url: '/db/updateEnabled/' + id,
    method: 'post',
    params: params
  })
}