import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import EchoData from './EchoData';

const code = 'S08';
const name = '선봉 암괴';
const dangerous: EchoDangerous = '경파';
const harmony: Harmony[] = ['야밤의 서리', '빛을 삼키는 해'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;