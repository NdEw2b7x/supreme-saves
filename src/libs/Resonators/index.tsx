import Aalto from './Aalto'
import Calcharo from './Calcharo'
import Changli from './Changli'
import ChiSha from './ChiSha'
import DanGeun from './DanGeun'
import DoGi from './DoGi'
import Encore from './Encore'
import EumRim from './EumRim'
import GamSim from './GamSim'
import GeumHui from './GeumHui'
import GiYeom from './GiYeom'
import Mortefi from './Mortefi'
import NeungYang from './NeungYang'
import RoverDark from './RoverDark'
import RoverLight from './RoverLight'
import SanHwa from './SanHwa'
import SeolJi from './SeolJi'
import Verina from './Verina'
import YangYang from './YangYang'
import YeonMu from './YeonMu'

export const everyResonatorData = {
  GeumHui,
  GiYeom,
  EumRim,
  Verina,
  Calcharo,
  Changli,
  Encore,
  RoverDark,
  Mortefi,
  SanHwa,
  GamSim,
  DanGeun,
  YeonMu,
  SeolJi,
  ChiSha,
  NeungYang,
  Aalto,
  RoverLight,
  YangYang,
  DoGi,
} as const

export type ResonatorCode = keyof typeof everyResonatorData
export type ResonatorCode_ =
  | Exclude<ResonatorCode, `Rover${'Light' | 'Dark'}`>
  | 'Rover'

export const isRover = (x: ResonatorCode): boolean => {
  return /Rover(Light|Dark)/.test(x)
}

export const codeConverter = (x: ResonatorCode): ResonatorCode_ => {
  return isRover(x) ? 'Rover' : (x as ResonatorCode_)
}
