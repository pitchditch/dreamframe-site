
import JSZip from 'jszip';

export interface ExtractedFile {
  name: string;
  content: string;
  path: string;
}

/**
 * Extracts files from a zip file
 * @param file The zip file to extract
 * @returns A promise that resolves to an array of extracted files
 */
export const extractZipFile = async (file: File): Promise<ExtractedFile[]> => {
  try {
    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    const extractedFiles: ExtractedFile[] = [];

    const promises = Object.keys(zipContent.files).map(async (filename) => {
      const zipEntry = zipContent.files[filename];
      
      // Skip directories
      if (zipEntry.dir) return;
      
      // Get content as text
      const content = await zipEntry.async('text');
      
      // Extract file info
      const pathParts = filename.split('/');
      const name = pathParts[pathParts.length - 1];
      
      extractedFiles.push({
        name,
        content,
        path: filename
      });
    });

    await Promise.all(promises);
    return extractedFiles;
  } catch (error) {
    console.error('Error extracting zip file:', error);
    throw new Error('Failed to extract zip file');
  }
};
