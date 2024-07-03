import { WeaponCategory, Element } from '../../types';
import ResonatorData, { genATKDamageNode } from './ResonatorData';

const name = '앙코';
const element: Element = 'fire';
const weaponCategory: WeaponCategory = '증폭기';
const [hp1, atk1, def1] = [841, 34, 102];

const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  skill: {
    normal: {
      name: '그늘이와 구름이 출격',
      basic: [
        genATKDamageNode([[0.28]]),
        genATKDamageNode([[0.333]]),
        genATKDamageNode([[0.3335, 2]]),
        genATKDamageNode([[0.1925, 4]]),
        genATKDamageNode([[1.2]], '메에메에'),
      ],
      heavy: [genATKDamageNode([[0.941]])],
      air: [genATKDamageNode([[0.62]])],
      airHeavy: [],
      counter: [genATKDamageNode([[0.6334]])],
    },
    skill: {
      name: '불꽃 양',
      skill: [
        genATKDamageNode([[0.3853, 8]], '불꽃 양'),
        genATKDamageNode([[1.706]], '열렬한 환영식'),
      ],
    },
    circuit: {
      name: '그늘이와 구름이',
      circuit: { name: '무질서 게이지', max: 0 },
      skill: [],
    },
    liberation: { name: '', skill: [] },
    intro: { name: '', skill: [] },
    outro: { name: '', skill: [] },
  },
  statBonus: ['atk', 'fire'],
});

export default result;
