import { mockDb } from "./mock-data"

export async function authenticateAdmin(username: string, password: string) {
  const admin = mockDb.getAdmin(username)
  if (admin && admin.password === password) {
    const { password, ...adminWithoutPassword } = admin
    return adminWithoutPassword
  }
  return null
}

