import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H09';
const name = '갈기늑대 · 불꽃';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['솟구치는 용암', '찬란한 광휘'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
