import { NextResponse } from "next/server"

export interface APISuccessResponse<T> {
  message?: string
  data: T
}

export interface APIErrorResponse {
  message: string
}

export class APIError extends Error {
  constructor(public message: string, public code: number = 200) {
    super(message)
  }
}

export const APIErrorHandler = (err: any): NextResponse<APIErrorResponse> => {
  if (!(err instanceof APIError)) NextResponse.json({ message: err.message }, { status: 500 });
  return NextResponse.json({ message: err.message }, { status: err.code });
}