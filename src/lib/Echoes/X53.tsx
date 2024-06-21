import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'X53';
const name = '경전차 로봇';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['야밤의 서리', '빛나는 별'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
