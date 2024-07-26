import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W76';
const name = '뇌운의 비늘';
const dangerous: EchoDangerous = '노도';
const harmony: Harmony[] = ['울려퍼지는 뇌음'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
