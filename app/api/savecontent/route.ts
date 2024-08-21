import { Content } from "@/type";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const content: Content = await request.json();

    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "content.json");

    // Ensure the directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing content
    let existingContent = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      existingContent = JSON.parse(fileData);
    }

    // Append new content
    existingContent.push(content);

    // Write updated content back to file
    fs.writeFileSync(filePath, JSON.stringify(existingContent, null, 2));

    return NextResponse.json({ message: "Content saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to save content" },
      { status: 500 }
    );
  }
}
