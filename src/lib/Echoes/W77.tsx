import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W77';
const name = '지옥불 기사';
const dangerous: EchoDangerous = '노도';
const harmony: Harmony[] = ['솟구치는 용암'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
