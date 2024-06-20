import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'R56';
const name = '조립식 로봇';
const dangerous: EchoDangerous = '노도';
const harmony: Harmony[] = ['끊임없는 잔향'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
