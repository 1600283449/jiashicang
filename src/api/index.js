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