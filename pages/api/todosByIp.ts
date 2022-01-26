import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const clientIp = requestIp.getClientIp(req);
  res.status(!clientIp ? 400 : 200).json({ ip: clientIp } as { ip: string });
};
