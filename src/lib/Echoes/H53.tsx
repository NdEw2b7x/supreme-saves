import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'H53';
const name = '갈기늑대 · 눈꽃';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['야밤의 서리', '떠오르는 구름'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
