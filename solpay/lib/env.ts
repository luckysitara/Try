export function checkRequiredEnvVars() {
  const requiredEnvVars = ["JWT_SECRET", "NEXT_PUBLIC_BASE_URL", "SOLANA_RPC_URL"]
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
    throw new Error("Missing required environment variables")
  }
}

