import { ResonatorElement, WeaponCategory } from '../../types'
import ResonatorData from './ResonatorData'

const name = '산화'
const element: ResonatorElement = 'ice'
const weaponCategory: WeaponCategory = '직검'
const [hp1, atk1, def1] = [805, 22, 77]

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  statBonus: ['atk', 'ice'],
})

export default result
