import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'W60';
const name = '초혼의 악사';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['야밤의 서리', '빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
