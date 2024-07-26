import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'S09';
const name = '분열 암괴';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['떠오르는 구름', '울려퍼지는 뇌음', '찬란한 광휘'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
