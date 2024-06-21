import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'X54';
const name = '신호등 로봇';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['솟구치는 용암', '울려퍼지는 뇌음', '스쳐가는 바람'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
