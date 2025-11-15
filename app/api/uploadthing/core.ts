import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/app/api/auth/[...nextauth]/route";

const f = createUploadthing();

/**
 * UploadThing File Router Configuration
 * Defines upload endpoints with authentication and file validation
 */
export const ourFileRouter = {
  // Mission proof uploader endpoint
  missionProofUploader: f({
    image: { maxFileSize: "32MB", maxFileCount: 1 },
    video: { maxFileSize: "64MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      // Authenticate user via NextAuth
      const session = await auth();

      if (!session?.user?.email) {
        throw new Error("Unauthorized");
      }

      // Return user data to be available in onUploadComplete
      return { 
        userEmail: session.user.email,
        userId: session.user.id 
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on the server after upload completes
      console.log("Upload complete for user:", metadata.userEmail);
      console.log("File URL:", file.url);

      // Return data to the client
      return { 
        uploadedBy: metadata.userEmail,
        fileUrl: file.url 
      };
    }),

  // Hero media uploader endpoint (admin-only)
  heroMediaUploader: f({
    video: { maxFileSize: "128MB", maxFileCount: 1 },
    image: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      // Authenticate and verify admin role
      const session = await auth();

      if (!session?.user?.email) {
        throw new Error("Unauthorized");
      }

      if (!session.user.roles?.includes('admin')) {
        throw new Error("Admin access required");
      }

      // Return admin data to be available in onUploadComplete
      return { 
        userEmail: session.user.email,
        userId: session.user.id,
        isAdmin: true
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on the server after upload completes
      console.log("Hero media upload complete by admin:", metadata.userEmail);
      console.log("File URL:", file.url);

      // Return data to the client
      return { 
        uploadedBy: metadata.userEmail,
        fileUrl: file.url 
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
