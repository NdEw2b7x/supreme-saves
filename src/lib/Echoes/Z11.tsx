import { Harmony } from '../../types';
import { EchoDangerous } from '../../types/everyEcho';
import { EchoData } from '.';

const code = 'Z11';
const name = '용비늘의 기축';
const dangerous: EchoDangerous = '거랑';
const harmony: Harmony[] = ['울려퍼지는 뇌음', '야밤의 서리'];

const result = new EchoData({ code, name, dangerous, harmony });

export default result;
