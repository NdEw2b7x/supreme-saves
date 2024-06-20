import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'H73';
const name = '애곡하는 아익스';
const dangerous: EchoDangerous = '노도';
const harmony: Harmony[] = ['빛나는 별'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
