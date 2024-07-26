import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H12';
const name = '순회나비';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['빛나는 별', '찬란한 광휘', '떠오르는 구름'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
