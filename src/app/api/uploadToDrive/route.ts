import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json(); // Get text content from request

    // Replace with your credentials
    const CLIENT_ID = "1006236068750-8hiq9fsolmsv9j0k3si3da8e2jcsr6hj.apps.googleusercontent.com";
    const CLIENT_SECRET = "AHNOK-uwnsms5555";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // Change if needed
    const REFRESH_TOKEN = "YOUR_REFRESH_TOKEN"; // Get this from OAuth flow

    // Set up OAuth2 client
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Create Google Drive instance
    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    // Create file metadata
    const fileMetadata = {
      name: "text-editor-content.txt",
      mimeType: "text/plain",
    };

    // Create file content
    const media = {
      mimeType: "text/plain",
      body: content,
    };

    // Upload file to Google Drive
    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    return NextResponse.json({ fileId: response.data.id, message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
