
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Send, Mail, MessageSquare, Eye } from 'lucide-react';

interface QuoteMessagePreviewProps {
  emailMessage: string;
  smsMessage: string;
  onCopyEmail: () => void;
  onCopySMS: () => void;
  onSendQuote: () => void;
  copiedEmail: boolean;
  copiedSMS: boolean;
  isSending: boolean;
}

const QuoteMessagePreview: React.FC<QuoteMessagePreviewProps> = ({
  emailMessage,
  smsMessage,
  onCopyEmail,
  onCopySMS,
  onSendQuote,
  copiedEmail,
  copiedSMS,
  isSending,
}) => {
  const [showEmailPreview, setShowEmailPreview] = React.useState(false);

  // Convert plain text email to HTML for preview
  const convertToHTML = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/(\$[\d,]+\.?\d*)/g, '<span style="color: #dc2626; font-weight: bold;">$1</span>');
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Email Preview */}
      <Card className="border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-blue-100 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700">
              {emailMessage}
            </pre>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onCopyEmail}
              className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Email
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEmailPreview(!showEmailPreview)}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
          
          {/* HTML Email Preview */}
          {showEmailPreview && (
            <div className="mt-4 border rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
                Email Preview (HTML Rendered)
              </div>
              <div 
                className="p-4 bg-white max-h-96 overflow-y-auto text-sm"
                dangerouslySetInnerHTML={{ __html: convertToHTML(emailMessage) }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* SMS Preview */}
      <Card className="border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            SMS Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-green-100">
            <p className="text-sm text-gray-700">
              {smsMessage}
            </p>
            <div className="mt-3 text-xs text-gray-500 flex justify-between">
              <span>Characters: {smsMessage.length}/1600</span>
              <span className={smsMessage.length > 1600 ? 'text-red-500 font-semibold' : 'text-green-600'}>
                {smsMessage.length > 1600 ? 'Too long!' : 'Good length'}
              </span>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onCopySMS}
            className="w-full border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400"
          >
            {copiedSMS ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy SMS
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Send Actions */}
      <Card className="md:col-span-2 border-primary/30 shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onSendQuote}
              disabled={isSending}
              size="lg"
              className="bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white font-semibold py-4 px-8 text-lg shadow-lg"
            >
              {isSending ? (
                'Sending Quote...'
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Quote via Email & SMS
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-gray-600 text-center mt-3">
            This will automatically send the email and SMS to your customer and log the quote to your database.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteMessagePreview;
