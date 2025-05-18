
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft, FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getIndianKanoonDocument, getIndianKanoonDocumentFragments } from '@/utils/indianKanoonApi';

const KanoonDocumentView = () => {
  const { toast } = useToast();
  const { docId } = useParams<{ docId: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [loading, setLoading] = useState(true);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [documentTitle, setDocumentTitle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!docId) {
      setError('Document ID is required');
      setLoading(false);
      return;
    }
    
    const fetchDocument = async () => {
      setLoading(true);
      
      try {
        // If query is provided, fetch document fragments, otherwise fetch full document
        if (query) {
          const fragmentResult = await getIndianKanoonDocumentFragments(docId, query);
          
          if (!fragmentResult) {
            throw new Error('Failed to fetch document fragments');
          }
          
          setDocumentTitle(fragmentResult.title);
          
          // Create HTML from fragments
          const fragmentsHtml = fragmentResult.fragments.join('<hr class="my-4" />');
          setDocumentContent(`
            <div class="mb-4">
              <p class="text-muted-foreground">Showing fragments matching "${query}" in this document</p>
            </div>
            ${fragmentsHtml}
          `);
          
        } else {
          // Fetch full document
          const documentResult = await getIndianKanoonDocument(docId);
          
          if (!documentResult) {
            throw new Error('Failed to fetch document');
          }
          
          setDocumentTitle(documentResult.title);
          setDocumentContent(documentResult.doc);
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        setError('Failed to fetch document. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to fetch document. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDocument();
  }, [docId, query]);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 bg-background">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/kanoon">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search
                  </Link>
                </Button>
                
                <h1 className="text-lg md:text-xl font-serif font-bold truncate max-w-md">
                  {documentTitle || 'Document View'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" /> Print
                </Button>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            <Card className="p-6">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <h2 className="text-lg font-medium text-red-500 mb-2">{error}</h2>
                  <Button asChild>
                    <Link to="/kanoon">Return to Search</Link>
                  </Button>
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl font-serif font-bold mb-4">{documentTitle}</h1>
                  
                  <div 
                    className="indiankanoon-document prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: documentContent || '' }}
                  />
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default KanoonDocumentView;
