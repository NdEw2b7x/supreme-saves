import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H08';
const name = '쇄아멧돼지';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['야밤의 서리', '스쳐가는 바람', '떠오르는 구름'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
