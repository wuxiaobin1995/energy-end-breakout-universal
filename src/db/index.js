/*
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 10:43:09
 * @LastEditTime: 2021-09-08 16:35:15
 * @Description : Dexie
 */
import Dexie from 'dexie'

export function initDB() {
  const db = new Dexie('End_Breakout_Universal')
  db.version(1).stores({
    // 用户表
    user: 'userId,userGroup,birthday,sex',
    // 训练动作表
    action: 'actionId',
    // 训练数据记录表
    train_data:
      '++,userId,actionId,userGroup,currentTime,relativeDistance,trainWeight,[userGroup+userId+currentTime]'
  })
  return db
}
