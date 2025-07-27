import { NextRequest, NextResponse } from "next/server";
import { createFrame, getFrameMessage } from "frames.js";
import { getRewardToken } from "@/lib/reward";
import { sendToken } from "@/lib/sendToken";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.text();

  const msg = await getFrameMessage(body, {
    hubHttpUrl: "https://hub.pinata.cloud/",
  });

  if (!msg) {
    return new NextResponse("Invalid Frame", {
      status: 400,
      headers,
    });
  }

  const tokenAddress = getRewardToken();
  const to = msg.requesterFidAddress;

  await sendToken(to, tokenAddress);

  const html = createFrame({
    image: "https://your-repl-url.repl.co/success.png",
    buttons: [{ label: "Share to Warpcast" }],
  });

  return new NextResponse(html, {
    status: 200,
    headers,
  });
}