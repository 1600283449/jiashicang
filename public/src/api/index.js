import request from '@/utils/request'

//电梯全部列表
export function elevator (data) {
  return request({
    url: `/cockpit/elevator/listV2`,
    method: 'post',
    data
  })
}
// 首页统计
export function indexLdg (data) {
  return request({
    url: `/cockpit/indexLdg`,
    method: 'post',
    data
  })
}




// 首页困人阻梯数据
export function daytrappedV2 (data) {
  return request({
    url: `/cockpit/daytrappedV2`,
    method: 'post',
    data
  })
}
// 获取困人处置中故障列表
export function alarmdealV2 (data) {
  return request({
    url: `/cockpit/alarmdealV2`,
    method: 'post',
    data
  })
}
// 获取困人处置中故障详情
export function alarmdealSingle (data) {
  return request({
    url: `/cockpit/alarmdeal/singleV2`,
    method: 'post',
    data
  })
}
// 首页区域统计
export function elevatorAreaLdg (data) {
  return request({
    url: `/cockpit/elevatorAreaLdg`,
    method: 'post',
    data
  })
}
// 获取电梯列表
export function elevatorListV2 (data) {
  return request({
    url: `/cockpit/elevator/listV2`,
    method: 'post',
    data
  })
}
// 第三方物联电梯获取物联信息
export function terminal(elevatorId, params) {
  return request({
    url: `/cockpit/terminal/${elevatorId}`,
    method: 'get',
    params
  })
}
// 第三方物联电梯获取推流
export function monitorSteam(data) {
  return request({
    url: `/cockpit/monitor/steam`,
    method: 'post',
    data
  })
}