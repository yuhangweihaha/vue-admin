import request from '@/utils/request';

export function getcategory() {
    return request({
        url: '/api/catelog/getcategory',
        method: 'get'
    })
}

export function getMetaCodeList(id) {
    return request({
        url: '/api/metaInfo/getMetaCodeList?categoryId=' + id,
        method: 'get'
    })
}

export function getTableInfoByCatlogId(id, pageNo, pageSize, type) {
    return request({
        url: '/api/metaInfo/getTableInfoByCatlogId?categoryId=' + id + '&pageNo=' + pageNo + '&pageSize=' + pageSize + '&type=' + type,
        method: 'get'
    })
}

export function getMetaTypeList() {
    return request({
        url: '/api/metaInfo/getMetaTypeList',
        method: 'get'
    })
}

export function insertMetaField(query) {
    return request({
        url: '/api/metaInfo/insertMetaField',
        method: 'post',
        data: query
    })
}

export function updateMetaField(query) {
    return request({
        url: '/api/metaInfo/updateMetaField',
        method: 'put',
        data: query
    })
}

export function deleteMetaField(categoryId, id) {
    return request({
        url: '/api/metaInfo/deleteMetaField?categoryId=' + categoryId + '&id=' + id,
        method: 'delete'
    })
}

export function getFieldType() {
    return request({
        url: '/api/metaInfo/getFieldType',
        method: 'get'
    })
}

