
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SimpleCaseNoteProps {
  caseId: string;
  title: string;
  content: string;
  onExport?: () => void;
  onSourceView?: () => void;
}

const SimpleCaseNote: React.FC<SimpleCaseNoteProps> = ({
  caseId,
  title,
  content,
  onExport,
  onSourceView
}) => {
  const { toast } = useToast();
  
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export behavior
      toast({
        title: "Exporting PDF",
        description: "Your case note is being prepared for download.",
      });
      
      // In a real app, this would generate a PDF
      setTimeout(() => {
        toast({
          title: "Export complete",
          description: "Case note PDF has been downloaded.",
        });
      }, 1500);
    }
  };
  
  const handleSourceView = () => {
    if (onSourceView) {
      onSourceView();
    } else {
      // Default behavior to open Indian Kanoon
      window.open(`https://indiankanoon.org/doc/${caseId.split('-')[0]}`, '_blank');
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-serif font-semibold mb-2">{title}</h3>
        <div className="prose max-w-none text-sm mb-4">
          {content.split('\n\n').map((para, idx) => (
            <p key={idx} className="mb-2">{para}</p>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-3 w-3 mr-1" />
            Export PDF
          </Button>
          <Button variant="default" size="sm" onClick={handleSourceView}>
            <ExternalLink className="h-3 w-3 mr-1" />
            View Source
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleCaseNote;
