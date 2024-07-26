import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W61';
const name = '마접의 악사';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['울려퍼지는 뇌음', '끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
