import { Element, EveryWeaponCategory, Name } from '../../types';
import ResonatorData, { genATKSkillNode } from './ResonatorData';

const name: Name = '금희';
const element: Element = 'light';
const weaponCategory: EveryWeaponCategory = '대검';
const [hp1, atk1, def1] = [866, 33, 103];

const genNode = genATKSkillNode('atack');
const result = new ResonatorData({
  name,
  element,
  weaponCategory,
  base: [hp1, atk1, def1],
  skill: {
    basic: {
      name: '달빛의 서리',
      basic: [
        genNode([[0.3343]]),
        genNode([[0.1961], [0.0981, 3]]),
        genNode([[0.0536, 7], [0.1607]]),
        genNode([[0.3174], [0.476]]),
      ],
      heavy: [genNode([[0.12, 5], [0.18], [0.42]])],
      air: [genNode([[0.062], [0.124], [0.434]])],
      airHeavy: [],
      counter: [genNode([[0.0738, 7], [0.2214]])],
    },
    skill: {
      name: '달빛의 석양',
      skill: [
        genNode([[0.0979, 4], [0.3915]]),
        genNode([[0.0496, 4], [0.1488, 4], [0.1984]], '창공의 무지개'),
      ],
    },
    circuit: {
      name: '만물합일',
      skill: [
        genNode([[0.4458]], '하늘로 향해 · 일반 공격 1단'),
        genNode([[0.3922], [0.1308], [0.1308]], '하늘로 향해 · 일반 공격 2단'),
        genNode([[0.5002], [0.3335]], '하늘로 향해 · 일반 공격 3단'),
        genNode([[0.0939, 6], [0.3756]], '하늘로 향해 · 일반 공격 4단'),
        genNode([[0.24], [0.56]], '하늘로 향해 · 강공격'),
        genNode([[0.2208], [0.1656, 2], [0.5519]], '하늘로 향해 · 회피 반격'),
        genNode([[0.5068], [0.3801, 2], [1.267]], '달을 품은 용녀'),
        genNode([[0.1, 6]], '승천하는 용 · 햇살'),
        {
          skillType: 'atack',
          scale: 'ATK',
          value: [{ multiply: 1.75 }],
          name: '승천하는 용 · 별빛',
        },
        genNode([[1.75]], '「봄의 빛」 1pt 당 배율 증가량'),
        { skillType: 'buffSelf', scale: 'HP', value: [] },
      ],
      gaugeName: '봄의 빛',
    },
    burst: { name: '만물의 정화', skill: [genNode([[2.514], [5.866]], '승천하는 용 · 별빛')] },
    intro: {
      name: '',
      skill: [],
    },
    outro: {
      name: '',
      skill: [],
    },
  },

  minorFortes: ['atk', 'cRate'],
});

export default result;
