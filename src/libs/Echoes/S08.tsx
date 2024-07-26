import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'S08';
const name = '선봉 암괴';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['울려퍼지는 뇌음', '찬란한 광휘', '끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
