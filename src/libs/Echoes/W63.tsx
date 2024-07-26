import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W63';
const name = '불굴의 호위';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['빛나는 별', '찬란한 광휘'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
