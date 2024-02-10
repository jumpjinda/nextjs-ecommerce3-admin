import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { Field } from "@smithy/protocol-http";

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

async function uploadImageToS3(
  fileStream: NodeJS.ReadableStream,
  fileName: string
): Promise<string> {
  const params: any = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileStream,
    ACL: "public-read",
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;

    // const ext = file?.name.split(".").pop();

    // Check file type by mimeType
    const mimeType = file?.type;
    const fileExtension = mimeType?.split("/")[1];
    const newFileName = Date.now() + "." + fileExtension;

    if (!file) {
      return new NextResponse(
        {
          error: "File blob is required.",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadImageToS3(buffer, newFileName);

    const link = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

    // return new NextResponse("Gg");
    return new NextResponse(link);
  } catch (error) {
    console.error("Error uploading image:", error);
    return new NextResponse({ message: "Error uploading image" });
  }
}
