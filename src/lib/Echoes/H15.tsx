import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H15';
const name = '서릿땅거북';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['야밤의 서리', '빛나는 별'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
