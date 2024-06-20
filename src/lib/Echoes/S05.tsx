import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'S05';
const name = '가시장미버섯(유체)';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['스쳐가는 바람', '빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
