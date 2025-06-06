import { antiquarianTemplate } from './antiquarian'
import { doctorTemplate } from './doctor'
import { journalistTemplate } from './journalist'
import { privateInvestigatorTemplate } from './privateInvestigator'
import { professorTemplate } from './professor'
import { OccupationTemplate } from '../../interface/OccupationTemplate'
import { CheckObjectKey } from '../../constant/enums'

export const occupationTemplates: Record<string, OccupationTemplate> = {
  antiquarian: antiquarianTemplate,
  doctor: doctorTemplate,
  journalist: journalistTemplate,
  privateInvestigator: privateInvestigatorTemplate,
  professor: professorTemplate,
}

export const getOccupationTemplateByName = (
  name: string,
): OccupationTemplate | undefined => {
  return occupationTemplates[name.toLowerCase()]
}

export const allOccupationTemplates: OccupationTemplate[] = [
  antiquarianTemplate,
  doctorTemplate,
  journalistTemplate,
  privateInvestigatorTemplate,
  professorTemplate,
]

export type { OccupationTemplate } from '../../interface/OccupationTemplate'
export type { CharacterBackground as OccupationBackgroundTemplate } from '../../interface/Character'
export type { CheckObjectKey }

export type OccupationKey = keyof typeof occupationTemplates
