import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H81';
const name = '무망자';
const dangerous: EchoDangerous = '해일';
const harmony: Harmony[] = ['빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
