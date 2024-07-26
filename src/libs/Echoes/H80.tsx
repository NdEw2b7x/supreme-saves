import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H80';
const name = '크라운리스';
const dangerous: EchoDangerous = '노도';
const harmony: Harmony[] = ['빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
