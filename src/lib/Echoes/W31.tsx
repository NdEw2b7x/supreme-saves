import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W31';
const name = '심판하는 전사';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['빛나는 별', '빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
