// 设置不同版本域名 测试版本  上线版本
const host = 'https://baojia.chelun.com'

function getWheelData(url, method = 'GET', data = {}) {
    let params = {
        method
    };
    /**
     * 判断如果是一个POST请求，带上请求体信息
     */
    if (method == 'POST') {
        params.body = JSON.stringify(data)
    };
    /**
     * 判断请求查询URL是否携带query
     * @param 目的 防止缓存
     */
    url.indexOf('?') == -1 ? url += `?_=${+new Date()}` : url += `&_=${+new Date()}`
    return fetch(host + url, params).then(res => res.json()).then(body => body);
};

/**
 * 返回首页数据
 * @return Promise
 */
export let getMasterBrandList = () => {
    return getWheelData('/v2-car-getMasterBrandList.html');
};

/**
 * 返回首页侧边列表数据
 * @param 列表id
 * @return Promise
 */
export let getMakeList = (id) => {
    return getWheelData(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
};

/**
 * 返回详情数据
 * @param 详情id
 * @return Promise
 */
export let getInfoAndList = (id) => {
    return getWheelData(`/v2-car-getInfoAndListById.html?SerialID=${id}`);
}

export let getCityInfo = () => {
    return getWheelData(`/location-client.html`);
}

export let getInquiryInfo = (carId,cityId) => {
    return getWheelData(`/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}`);
}

export let getCityList = () => {
    return getWheelData(`/v1-city-alllist.html`);
}

export let getCityEveryList = (id) => {
    return getWheelData(`/v1-city-alllist.html?provinceid=${id}`);
}

/**
 * 获取图片列表的接口
 * @param {*} serialId  车系id
 * @param {*} imgId   图片分类id
 * @param {number} [page=1] 分页页码数
 * @param {number} [pageSize=30] 分页每页数量
 * @param {*} carId  车型id
 * @param {*} colorId 颜色id
 * @returns promise
 */
export let getCategoryImgList = (param)=>{
    let search = ``;
    for(let i in param){
        search += `&${i}=${param[i]}`;
    }
    // 补充page与pageSize
    if (!param['Page']){
        search += `&Page=1`;
    }
    if (!param['PageSize']){
        search += `&PageSize=30`;
    }
    return getWheelData(`/v2-car-getCategoryImageList.html?${search.slice(1, search.length)}`);
}

export let getImageList = (param) => {
    let search = ``;
    for(let i in param){
        search += `&${i}=${param[i]}`;
    }
    return getWheelData(`/v2-car-getImageList.html?${search.slice(1, search.length)}`);
}

export let getModelImageYearColor = (id) => {
    return getWheelData(`/v2-car-getModelImageYearColor.html?SerialID=${id}`);
}