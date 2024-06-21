import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W30';
const name = '오열하는 전사';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['스쳐가는 바람', '울려퍼지는 뇌음', '솟구치는 용암'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
