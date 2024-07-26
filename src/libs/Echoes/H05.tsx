import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H05';
const name = '두더지';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['야밤의 서리', '빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
