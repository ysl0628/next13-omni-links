import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = 'Hello World!'

    return NextResponse.json({ data, message: 'success' })
  } catch (error) {
    return null
  }
}
