export class HttpError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
    this.name = "HttpError";
  }
}

export const BadRequest = (msg: string, code?: string) =>
  new HttpError(400, msg, code);
export const Unauthorized = (msg = "Unauthorized") =>
  new HttpError(401, msg);
export const Forbidden = (msg = "Forbidden") => new HttpError(403, msg);
export const NotFound = (msg = "Not found") => new HttpError(404, msg);
export const Conflict = (msg: string, code?: string) =>
  new HttpError(409, msg, code);
