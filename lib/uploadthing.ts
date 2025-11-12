import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

/**
 * UploadThing React Helpers
 * Provides hooks and utilities for file uploads in client components
 */
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
