import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'cookie'

const JWT_SECRET = process.env.JWT_SECRET!

export interface JWTPayload {
  userId: string
  email: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function createToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function setAuthCookie(res: NextApiResponse, token: string) {
  res.setHeader('Set-Cookie', [
    `omniflow_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
  ])
}

export function clearAuthCookie(res: NextApiResponse) {
  res.setHeader('Set-Cookie', 'omniflow_token=; HttpOnly; Path=/; Max-Age=0')
}

export function getAuthUser(req: NextApiRequest): JWTPayload | null {
  const cookies = parse(req.headers.cookie || '')
  const token = cookies.omniflow_token
  if (!token) return null
  return verifyToken(token)
}

export function requireAuth(
  handler: (req: NextApiRequest, res: NextApiResponse, user: JWTPayload) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = getAuthUser(req)
    if (!user) {
      return res.status(401).json({ error: 'Non authentifié' })
    }
    return handler(req, res, user)
  }
}
