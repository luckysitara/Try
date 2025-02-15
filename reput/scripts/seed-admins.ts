import { createClient } from "@supabase/supabase-js"
import { createHash } from "crypto"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex")
}

const NIGERIAN_STATES = {
  Abia: "abia",
  Adamawa: "adamawa",
  AkwaIbom: "akwaibom",
  Anambra: "anambra",
  Bauchi: "bauchi",
  Bayelsa: "bayelsa",
  Benue: "benue",
  Borno: "borno",
  CrossRiver: "crossriver",
  Delta: "delta",
  Ebonyi: "ebonyi",
  Edo: "edo",
  Ekiti: "ekiti",
  Enugu: "enugu",
  Gombe: "gombe",
  Imo: "imo",
  Jigawa: "jigawa",
  Kaduna: "kaduna",
  Kano: "kano",
  Katsina: "katsina",
  Kebbi: "kebbi",
  Kogi: "kogi",
  Kwara: "kwara",
  Lagos: "lagos",
  Nasarawa: "nasarawa",
  Niger: "niger",
  Ogun: "ogun",
  Ondo: "ondo",
  Osun: "osun",
  Oyo: "oyo",
  Plateau: "plateau",
  Rivers: "rivers",
  Sokoto: "sokoto",
  Taraba: "taraba",
  Yobe: "yobe",
  Zamfara: "zamfara",
  FCT: "fct",
}

async function seedAdmins() {
  const superAdminPassword = "superteam2023!"
  const stateAdminPassword = "stateadmin2023!"

  const admins = [
    {
      username: "superadmin",
      password: hashPassword(superAdminPassword),
      is_super_admin: true,
    },
    ...Object.keys(NIGERIAN_STATES).map((state) => ({
      username: state.toLowerCase(),
      password: hashPassword(stateAdminPassword),
      state,
      is_super_admin: false,
    })),
  ]

  const { data, error } = await supabase.from("admins").insert(admins)

  if (error) {
    console.error("Error seeding admins:", error)
  } else {
    console.log("Admins seeded successfully")
    console.log("Super Admin Login:")
    console.log("Username: superadmin")
    console.log("Password: superteam2023!")
    console.log("\nState Admin Login (example for Lagos):")
    console.log("Username: lagos")
    console.log("Password: stateadmin2023!")
  }
}

seedAdmins()

