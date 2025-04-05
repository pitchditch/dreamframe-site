
import { useState } from 'react';
import Layout from '@/components/Layout';
import ZipUploader from '@/components/ZipUploader';
import { ExtractedFile } from '@/utils/zipUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ZipUploaderPage = () => {
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<ExtractedFile | null>(null);
  const { toast } = useToast();

  const handleExtract = (files: ExtractedFile[]) => {
    setExtractedFiles(files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "Content has been copied to clipboard",
        });
      },
      (err) => {
        toast({
          title: "Failed to copy",
          description: "Could not copy text to clipboard",
          variant: "destructive",
        });
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">HTML ZIP Uploader</h1>
        <p className="mb-8 text-gray-600">
          Upload a ZIP file containing HTML content for your pages. The content will be extracted and you can view and copy the HTML.
        </p>

        <ZipUploader onExtract={handleExtract} />

        {extractedFiles.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <Tabs defaultValue="preview" className="w-full">
              <div className="bg-gray-100 p-2">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">HTML Code</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="preview" className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Select a file to preview:</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-md"
                    value={selectedFile?.path || ''}
                    onChange={(e) => {
                      const selected = extractedFiles.find(file => file.path === e.target.value);
                      if (selected) setSelectedFile(selected);
                    }}
                  >
                    {extractedFiles.map((file, index) => (
                      <option key={index} value={file.path}>{file.path}</option>
                    ))}
                  </select>
                </div>

                {selectedFile && (
                  <div className="border rounded-md p-4 bg-white">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{selectedFile.name}</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyToClipboard(selectedFile.content)}
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                    <div 
                      className="rounded bg-gray-50 p-4 overflow-auto max-h-[500px]"
                      dangerouslySetInnerHTML={{ __html: selectedFile.content }}
                    />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="code" className="p-4">
                {selectedFile && (
                  <div className="border rounded-md p-4 bg-white">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{selectedFile.name}</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyToClipboard(selectedFile.content)}
                      >
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                    <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-[500px] text-sm">
                      {selectedFile.content}
                    </pre>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ZipUploaderPage;
