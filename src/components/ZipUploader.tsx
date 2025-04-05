
import { useState } from 'react';
import { extractZipFile, ExtractedFile } from '@/utils/zipUtils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, FileText, Folder } from 'lucide-react';

interface ZipUploaderProps {
  onExtract: (files: ExtractedFile[]) => void;
}

const ZipUploader = ({ onExtract }: ZipUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if it's a zip file
    if (!file.name.endsWith('.zip')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a ZIP file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const files = await extractZipFile(file);
      setExtractedFiles(files);
      onExtract(files);
      
      toast({
        title: "ZIP Extracted Successfully",
        description: `Extracted ${files.length} files from ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Error extracting ZIP",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-dashed border-gray-300 rounded-lg p-6 mb-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud size={48} className="text-gray-400" />
        <h3 className="text-lg font-medium">Upload ZIP File</h3>
        <p className="text-sm text-gray-500 text-center">
          Upload a ZIP file containing HTML content for your pages
        </p>
        
        <div className="w-full max-w-xs">
          <label className="block">
            <Button 
              variant="outline" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Extracting...' : 'Select ZIP File'}
              <input
                type="file"
                accept=".zip"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </Button>
          </label>
        </div>
      </div>

      {extractedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Extracted Files ({extractedFiles.length})</h4>
          <div className="border rounded-md overflow-y-auto max-h-60 p-2 bg-gray-50">
            {extractedFiles.map((file, index) => (
              <div key={index} className="flex items-center p-2 hover:bg-gray-100 rounded">
                <FileText size={16} className="mr-2 text-gray-500" />
                <span className="text-sm truncate">{file.path}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ZipUploader;
