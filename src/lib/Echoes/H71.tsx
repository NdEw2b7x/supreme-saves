import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H71';
const name = '폭주의 고릴라';
const dangerous: EchoDangerous = '노도';
const harmony: Harmony[] = ['스쳐가는 바람'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
