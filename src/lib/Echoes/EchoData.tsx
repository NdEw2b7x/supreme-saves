import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';

export default class EchoData {
  constructor({
    code,
    name,
    dangerous,
    harmony,
  }: {
    name: string;
    code: string;
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
}
