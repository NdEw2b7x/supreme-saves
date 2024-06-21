import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'G03';
const name = '아즈즈';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['끊임없는 잔향', '빛나는 별', '떠오르는 구름'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
