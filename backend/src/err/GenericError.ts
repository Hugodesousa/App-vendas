import { ErrorRequestHandler } from 'express';

export class MyNewError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const GenericError: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  const { status, message } = error as MyNewError;
  console.error('Error --------->', error);
  return res.status(status || 500)
    .send({ message: message || error });
};