import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H06';
const name = '그린멜팅카멜레온(유체)';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['솟구치는 용암', '울려퍼지는 뇌음', '끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
