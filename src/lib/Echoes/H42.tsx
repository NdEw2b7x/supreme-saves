import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H42';
const name = '보라색 왜가리';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['솟구치는 용암', '울려퍼지는 뇌음'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
