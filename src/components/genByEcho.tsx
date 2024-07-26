import { MyEcho } from '../slice/echoesSlice'
import {
  EchoMainStats,
  EchoSubStats,
  getEchoSecondaryMainStats,
} from '../types'
import { everyEchoData, getEchoMainValue0 } from '../libs/Echoes'

export const genByEcho = (info?: MyEcho) => {
  const byEchoMain: Record<EchoMainStats, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    ice: 0,
    fire: 0,
    electro: 0,
    wind: 0,
    light: 0,
    dark: 0,
    heal: 0,
    cRate: 0,
    cDmg: 0,
    flatHp: 0,
    flatAtk: 0,
  }
  const byEchoSub: Record<EchoSubStats, number> = {
    hp: 0,
    atk: 0,
    def: 0,
    energy: 0,
    cRate: 0,
    cDmg: 0,
    basic: 0,
    heavy: 0,
    skill: 0,
    liberation: 0,
    flatHp: 0,
    flatAtk: 0,
    flatDef: 0,
  }
  if (info) {
    const lv = info['레벨']
    const p = info['메인 스텟']
    const r = info['희귀']
    const data = everyEchoData[info['코드']]
    Object.values(info['서브 스텟']).forEach(i => {
      if (i) {
        byEchoSub[i.stat] = (byEchoSub[i.stat] * 1000 + i.value * 1000) / 1000
      }
    })
    if (data) {
      const c = data.cost
      const [p0, s0] = getEchoMainValue0(r)(c)(p)
      byEchoMain[p] = Math.floor(p0 * (1 + 0.16 * lv) * 1000) / 1000
      byEchoMain[getEchoSecondaryMainStats(c)] = Math.floor(
        s0 * (1 + 0.16 * lv)
      )
    }
  }
  return [byEchoMain, byEchoSub] as const
}
