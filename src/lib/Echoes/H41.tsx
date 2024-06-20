import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H41';
const name = '초록색 왜가리';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['스쳐가는 바람', '빛나는 별'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
