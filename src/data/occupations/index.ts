import { antiquarianTemplate } from './antiquarian'
import { doctorTemplate } from './doctor'
import { journalistTemplate } from './journalist'
import { privateInvestigatorTemplate } from './privateInvestigator'
import { professorTemplate } from './professor'
import { OccupationTemplate } from '../../interface/OccupationTemplate'
import { CheckObjectKey } from '../../constant/enums' // 虽然在此文件不直接用，但导出类型可能需要

export const occupationTemplates: Record<string, OccupationTemplate> = {
  antiquarian: antiquarianTemplate,
  doctor: doctorTemplate,
  journalist: journalistTemplate,
  privateInvestigator: privateInvestigatorTemplate,
  professor: professorTemplate,
}

// Helper function to get a template by its key (e.g., "antiquarian")
export const getOccupationTemplateByName = (
  name: string,
): OccupationTemplate | undefined => {
  return occupationTemplates[name.toLowerCase()]
}

// For convenience, you might also want to export an array of the templates
export const allOccupationTemplates: OccupationTemplate[] = [
  antiquarianTemplate,
  doctorTemplate,
  journalistTemplate,
  privateInvestigatorTemplate,
  professorTemplate,
]

// Re-exporting types for easier access from other modules
export type { OccupationTemplate } from '../../interface/OccupationTemplate'
export type { CharacterBackground as OccupationBackgroundTemplate } from '../../interface/Character' // Corrected import path
export type { CheckObjectKey } // Re-exporting enums if they are part of the public API of this module

export type OccupationKey = keyof typeof occupationTemplates
