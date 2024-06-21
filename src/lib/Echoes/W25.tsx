import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W25';
const name = '경칩의 사냥꾼';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['솟구치는 용암', '울려퍼지는 뇌음'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
