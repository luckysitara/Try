export type User = {
  id: string
  name: string
  state: string
  total_xp: number
  monthly_xp: number
  skills: string[]
  created_at: string
  updated_at: string
}

export type Admin = {
  id: string
  username: string
  state?: string
  is_super_admin: boolean
}

export type XpTransaction = {
  id: string
  user_id: string
  amount: number
  description: string
  approved_by: string
  created_at: string
}

export const NIGERIAN_STATES = {
  AB: "Abia",
  AD: "Adamawa",
  AK: "Akwa Ibom",
  AN: "Anambra",
  BA: "Bauchi",
  BY: "Bayelsa",
  BE: "Benue",
  BO: "Borno",
  CR: "Cross River",
  DE: "Delta",
  EB: "Ebonyi",
  ED: "Edo",
  EK: "Ekiti",
  EN: "Enugu",
  FC: "FCT",
  GO: "Gombe",
  IM: "Imo",
  JI: "Jigawa",
  KD: "Kaduna",
  KN: "Kano",
  KT: "Katsina",
  KE: "Kebbi",
  KO: "Kogi",
  KW: "Kwara",
  LA: "Lagos",
  NA: "Nasarawa",
  NI: "Niger",
  OG: "Ogun",
  ON: "Ondo",
  OS: "Osun",
  OY: "Oyo",
  PL: "Plateau",
  RI: "Rivers",
  SO: "Sokoto",
  TA: "Taraba",
  YO: "Yobe",
  ZA: "Zamfara",
} as const

export type NigerianState = keyof typeof NIGERIAN_STATES

