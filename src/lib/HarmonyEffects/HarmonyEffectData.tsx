import { Name } from '../../types';
import { Effect2, Effect5 } from '.';

export default class HarmonyEffectData {
  constructor({
    code,
    name,
    effect2,
    effect5,
  }: {
    code: string;
    name: Name;
    effect2: Effect2;
    effect5: Effect5;
  }) {
    this.code = code;
    this.name = name;
    this.effect2 = effect2;
    this.effect5 = effect5;
  }
  code;
  name;
  effect2;
  effect5;
}
