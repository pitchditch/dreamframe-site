
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Send, Mail, MessageSquare } from 'lucide-react';

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
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Email Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {emailMessage}
            </pre>
          </div>
          <Button 
            variant="outline" 
            onClick={onCopyEmail}
            className="w-full"
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
        </CardContent>
      </Card>

      {/* SMS Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            SMS Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm">
              {smsMessage}
            </p>
            <div className="mt-2 text-xs text-gray-500">
              Characters: {smsMessage.length}/300
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onCopySMS}
            className="w-full"
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
      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onSendQuote}
              disabled={isSending}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              {isSending ? (
                'Sending Quote...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Quote & Log to Database
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">
            This will send the email and SMS to your customer and automatically log the quote to your database.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteMessagePreview;
