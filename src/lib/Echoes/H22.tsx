import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H22';
const name = '피그미타조';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['스쳐가는 바람', '찬란한 광휘'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
