import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'N13';
const name = '인멸 프리즘';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['울려퍼지는 뇌음', '빛나는 별', '빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
