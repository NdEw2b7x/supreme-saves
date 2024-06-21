import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H01';
const name = '꾹꾹복어';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['빛나는 별', '야밤의 서리'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
