import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'Z01';
const name = '용의 별자리';
const dangerous: EchoDangerous = '해일';
const harmony: Harmony[] = ['빛나는 별'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
