import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H19';
const name = '어린 원숭이';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['스쳐가는 바람', '끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
