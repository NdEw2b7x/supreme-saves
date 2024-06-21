import { Harmony } from '../../types';
import { EchoCode, EchoCost, EchoDangerous } from '../../types/everyEcho';

export default class EchoData {
  constructor({
    code,
    name,
    dangerous,
    harmony,
  }: {
    code: EchoCode;
    name: string;
    dangerous: EchoDangerous;
    harmony: Array<Harmony>;
  }) {
    this.code = code;
    this.name = name;
    this.dangerous = dangerous;
    this.harmony = harmony;
  }
  code;
  name;
  dangerous;
  harmony;

  get cost(): EchoCost {
    switch (this.dangerous) {
      case '경파':
        return 1;
      case '거랑':
        return 3;
      default:
        return 4;
    }
  }
}
