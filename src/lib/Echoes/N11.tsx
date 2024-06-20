import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'N11';
const name = '응결 프리즘';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['빛을 삼키는 해', '떠오르는 구름', '야밤의 서리'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
