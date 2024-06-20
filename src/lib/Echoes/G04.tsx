import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'G04';
const name = '우글글';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['끊임없는 잔향', '찬란한 광휘', '솟구치는 용암'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
