import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface EnrichmentDisplayProps {
  enrichmentStatus: string;
  enrichmentData: any;
}

const EnrichmentDisplay = ({ enrichmentStatus, enrichmentData }: EnrichmentDisplayProps) => {
  const { toast } = useToast();

  const handleCopyClick = () => {
    if (enrichmentData) {
      navigator.clipboard.writeText(JSON.stringify(enrichmentData, null, 2));
      toast({
        title: "Success",
        description: "Data copied to clipboard!",
      });
    }
  };

  return (
    <div className="w-full p-4 border-t border-zinc-200 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Data Enrichment</h2>
        {enrichmentStatus === 'complete' && (
          <Button
            onClick={handleCopyClick}
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-600"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy Data
          </Button>
        )}
      </div>
      
      {enrichmentStatus === 'complete' && enrichmentData && (
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {JSON.stringify(enrichmentData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default EnrichmentDisplay;