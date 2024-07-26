import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'H51';
const name = '까부는 원숭이';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['스쳐가는 바람', '찬란한 광휘'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
