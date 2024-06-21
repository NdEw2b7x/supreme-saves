import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'G04';
const name = '우글글';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['빛을 삼키는 해', '찬란한 광휘', '끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
