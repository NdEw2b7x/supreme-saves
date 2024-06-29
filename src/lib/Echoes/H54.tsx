import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'H54';
const name = '흑월의 야수';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['빛나는 별'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
