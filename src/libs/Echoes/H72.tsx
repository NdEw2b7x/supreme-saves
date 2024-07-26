import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H72';
const name = '음험한 백로';
const dangerous: EchoDangerous = '노도';
const harmony: Harmony[] = ['떠오르는 구름'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
