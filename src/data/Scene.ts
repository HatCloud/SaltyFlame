export type SceneId = string

export interface Scene {
    id: SceneId
    story: string
    options: Option[]
    isEnd: boolean
}

export interface Option {
    goto: SceneId
    text: string
}

export interface CheckOption {
    check: Check
    success: Option
    failure: Option
}

export interface Check {
    object: 'skill' | 'characteristic' | 'luck' | 'sanity'
    subObject?: string
    difficulty: 'normal' | 'hard' | 'extreme'
    // 奖励骰
    bonusDice?: boolean
    // 惩罚骰
    penaltyDice?: boolean
}

export type CheckResult =
    | 'success'
    | 'failure'
    | 'criticalSuccess'
    | 'criticalFailure'
