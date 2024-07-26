import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'S55';
const name = '거암 투사';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['찬란한 광휘', '떠오르는 구름'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
