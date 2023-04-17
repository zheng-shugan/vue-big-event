import dayjs from 'dayjs'

export const formatDate = (dataObj) => {
  // 借助 dayjs 内置的方法把日期对象格式化成指定的格式
  // 并返回格式化好的字符串
  return dayjs(dataObj).format('YYYY-MM-DD HH:mm:ss')
}
