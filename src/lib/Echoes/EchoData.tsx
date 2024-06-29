import { Harmony, Name } from '../../types';
import { EchoCost, EchoDangerous } from '../../types/everyEcho';

export default class EchoData {
  constructor({
    code,
    name,
    dangerous,
    harmony,
  }: {
    code: string;
    name: Name;
    dangerous: EchoDangerous;
    harmony: Array<Harmony>;
  }) {
    this.code = code;
    this.name = name;
    this.dangerous = dangerous;
    this.harmony = harmony;
  }
  code: string;
  name;
  dangerous;
  harmony;

  get cost(): EchoCost {
    return this.dangerous === '경파' ? 1 : this.dangerous === '거랑' ? 3 : 4;
  }
}
