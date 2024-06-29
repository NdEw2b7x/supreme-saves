import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H21';
const name = '용암 벌레';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['끊임없는 잔향', '솟구치는 용암'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
