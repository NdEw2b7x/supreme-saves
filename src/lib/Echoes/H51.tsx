import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H51';
const name = '까부는 원숭이';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['솟구치는 용암', '빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
