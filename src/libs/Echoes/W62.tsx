import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W62';
const name = '심연의 위병';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['찬란한 광휘', '끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
