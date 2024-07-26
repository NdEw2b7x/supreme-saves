import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W26';
const name = '상강의 사냥꾼';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['빛나는 별', '야밤의 서리'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
