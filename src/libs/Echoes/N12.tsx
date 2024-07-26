import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'N12';
const name = '용융 프리즘';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['야밤의 서리', '솟구치는 용암', '끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
