import type {SceneData} from '../interface/Scene'
import {scenes_001_020} from './ts_cn/scenes_001-020'
import {scenes_021_040} from './ts_cn/scenes_021-040'
import {scenes_041_060} from './ts_cn/scenes_041-060'
import {scenes_061_080} from './ts_cn/scenes_061-080'
import {scenes_081_100} from './ts_cn/scenes_081-100'
import {scenes_101_120} from './ts_cn/scenes_101-120'
import {scenes_121_140} from './ts_cn/scenes_121-140'
import {scenes_141_160} from './ts_cn/scenes_141-160'
import {scenes_161_180} from './ts_cn/scenes_161-180'
import {scenes_181_200} from './ts_cn/scenes_181-200'
import {scenes_201_220} from './ts_cn/scenes_201-220'
import {scenes_221_240} from './ts_cn/scenes_221-240'
import {scenes_241_260} from './ts_cn/scenes_241-260'
import {scenes_261_270} from './ts_cn/scenes_261-270'

export const loadAllCnSceneData = (): SceneData => {
  return {
    ...scenes_001_020,
    ...scenes_021_040,
    ...scenes_041_060,
    ...scenes_061_080,
    ...scenes_081_100,
    ...scenes_101_120,
    ...scenes_121_140,
    ...scenes_141_160,
    ...scenes_161_180,
    ...scenes_181_200,
    ...scenes_201_220,
    ...scenes_221_240,
    ...scenes_241_260,
    ...scenes_261_270,
    // The order of spread matters if there are overlapping IDs,
    // the later ones will overwrite earlier ones.
    // Ensure prologue/character creation scenes are spread in a way that makes sense
    // if their IDs might overlap with main story arcs.
  }
}
