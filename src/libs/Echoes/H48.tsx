import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H48';
const name = '화살곰';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['떠오르는 구름', '끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
