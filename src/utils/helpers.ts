import { decode } from "jsonwebtoken";
export function extractUserFromJwt(req: any) {
  const auth = req.headers["authorization"];

  try {
    const token = auth.replace("Bearer ", "");

    const decoded = decode(token, { json: true });

    if (!decoded.email) {
      throw new Error();
    }

    return decoded.sub;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}

export function decodePlainJwt(jwt: string) {
  const decoded = decode(jwt, { json: true });

  if (!decoded?.sub) {
    throw new Error("Not authorized");
  }

  return decoded.sub;
}
