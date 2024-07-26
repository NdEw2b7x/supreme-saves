import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H91';
const name = '타종 거북이';
const dangerous: EchoDangerous = '해일';
const harmony: Harmony[] = ['떠오르는 구름', '찬란한 광휘'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
