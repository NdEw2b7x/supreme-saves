import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W27';
const name = '부메랑 사냥꾼';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['울려퍼지는 뇌음', '스쳐가는 바람'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
