import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'R55';
const name = '트랜스카';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['떠오르는 구름', '스쳐가는 바람'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
