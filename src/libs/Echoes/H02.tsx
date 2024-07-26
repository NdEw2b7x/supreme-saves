import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H02';
const name = '쮸쮸복어';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['스쳐가는 바람', '빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
