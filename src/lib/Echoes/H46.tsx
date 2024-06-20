import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H46';
const name = '그린멜팅카멜레온';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['떠오르는 구름', '솟구치는 용암'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
