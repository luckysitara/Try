import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/lib/supabase-client"

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const { data, error } = await supabase.auth.getUser(token)

      if (error || !data.user) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      req.user = data.user

      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" })
    }
  }
}

