import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'N74';
const name = '반디의 군세';
const dangerous: EchoDangerous = '노도';
const harmony: Harmony[] = ['야밤의 서리'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
