
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  MenuIcon, 
  ArrowLeft, 
  Download, 
  Bookmark, 
  Share2, 
  FileText, 
  Book, 
  BookOpen,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import AddCaseNote from '@/components/AddCaseNote';
import CaseNotes from '@/components/CaseNotes';
import { format } from 'date-fns';

interface CaseDetails {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  judges: string[];
  petitioner: string | null;
  respondent: string | null;
  summary: string;
  full_text: string | null;
  key_points: string[] | null;
  related_cases: string[] | null;
}

const CaseDetail = () => {
  const { caseId } = useParams();
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [shouldRefreshNotes, setShouldRefreshNotes] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoggedIn, userRole, remainingCases, decrementRemainingCases } = useUser();
  
  useEffect(() => {
    fetchCaseDetails();
  }, [caseId]);
  
  useEffect(() => {
    // If user is not logged in, show a notification
    if (!isLoggedIn && !loading) {
      toast({
        title: "Limited access",
        description: "Sign in to access full case details and export options.",
      });
    }
    
    // If user is free and has no remaining cases
    if (isLoggedIn && userRole === 'free' && remainingCases <= 0 && !loading) {
      setShowUpgradeDialog(true);
    }
    
    // Track case view for free users
    if (isLoggedIn && userRole === 'free' && remainingCases > 0 && !loading && caseDetails) {
      decrementRemainingCases();
      toast({
        title: "Case note usage",
        description: `You have ${remainingCases - 1} case note${remainingCases - 1 !== 1 ? 's' : ''} remaining today.`,
      });
    }
  }, [isLoggedIn, userRole, remainingCases, loading, caseDetails]);

  const fetchCaseDetails = async () => {
    if (!caseId) return;
    
    setLoading(true);
    
    try {
      // First try to fetch from Supabase directly
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', caseId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching case details:', error);
        toast({
          title: "Error",
          description: "Failed to load case details. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        setCaseDetails(data as CaseDetails);
      } else {
        toast({
          title: "Case not found",
          description: "The requested case could not be found.",
          variant: "destructive",
        });
        navigate('/landmark-cases');
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = (format: string) => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please sign in to download case details.",
      });
      navigate('/auth');
      return;
    }
    
    if (userRole === 'free') {
      setShowUpgradeDialog(true);
      return;
    }
    
    toast({
      title: "Download initiated",
      description: `Downloading case in ${format} format...`,
    });
  };
  
  const handleBookmark = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "Please sign in to bookmark cases.",
      });
      navigate('/auth');
      return;
    }
    
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Bookmark added",
      description: bookmarked ? 
        "This case has been removed from your bookmarks" : 
        "This case has been added to your bookmarks",
    });
  };
  
  const handleShare = () => {
    // In a real app, this would open a sharing dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Case link has been copied to clipboard",
    });
  };

  const handleNoteAdded = () => {
    setShouldRefreshNotes(true);
  };

  const handleRefreshComplete = () => {
    setShouldRefreshNotes(false);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <main className="flex-1 flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </main>
        </div>
      </SidebarProvider>
    );
  }

  if (!caseDetails) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <main className="flex-1">
            <div className="container mx-auto px-4 py-16 text-center">
              <h2 className="text-2xl font-serif mb-4">Case Not Found</h2>
              <p className="mb-6">The case you're looking for could not be found.</p>
              <Button asChild>
                <Link to="/landmark-cases">Browse All Cases</Link>
              </Button>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="md:hidden">
                  <SidebarTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MenuIcon className="h-5 w-5" />
                    </Button>
                  </SidebarTrigger>
                </div>
                
                <Link to="/landmark-cases">
                  <Button variant="ghost" className="mr-2">
                    <ArrowLeft className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                </Link>
                
                <h1 className="text-lg md:text-xl font-serif font-bold truncate max-w-[200px] md:max-w-md">
                  {caseDetails.title}
                </h1>
              </div>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-lg shadow-sm border border-border p-5 mb-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-2">{caseDetails.title}</h2>
                  <p className="text-muted-foreground">{caseDetails.citation}</p>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleBookmark}
                    className={bookmarked ? "bg-primary/10" : ""}
                  >
                    <Bookmark className={`h-4 w-4 mr-1 ${bookmarked ? "fill-primary" : ""}`} />
                    {bookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownload('pdf')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Court</p>
                  <p className="font-medium">{caseDetails.court}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-medium">
                    {caseDetails.date ? format(new Date(caseDetails.date), 'MMMM d, yyyy') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Petitioner</p>
                  <p className="font-medium">{caseDetails.petitioner || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Respondent</p>
                  <p className="font-medium">{caseDetails.respondent || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground mr-2">Category:</span>
                <Badge variant="outline">{caseDetails.category}</Badge>
              </div>
              
              {caseDetails.judges && caseDetails.judges.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Bench:</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseDetails.judges.map((judge, index) => (
                      <Badge key={index} variant="secondary" className="bg-secondary/50">
                        {judge}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Tabs defaultValue="summary" className="mb-6">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="summary" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Summary
                </TabsTrigger>
                <TabsTrigger value="fulltext" className="flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Full Text
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Your Notes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-serif font-semibold mb-4">Case Summary</h3>
                    <p className="text-base leading-relaxed mb-6">
                      {caseDetails.summary}
                    </p>
                    
                    {caseDetails.key_points && caseDetails.key_points.length > 0 && (
                      <>
                        <h4 className="font-medium mb-3">Key Points:</h4>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                          {caseDetails.key_points.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {caseDetails.related_cases && caseDetails.related_cases.length > 0 && (
                      <>
                        <h4 className="font-medium mb-3">Related Cases:</h4>
                        <ul className="list-disc pl-6 space-y-2">
                          {caseDetails.related_cases.map((relatedCase, index) => (
                            <li key={index}>{relatedCase}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="fulltext" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-serif font-semibold mb-4">Full Text</h3>
                    {caseDetails.full_text ? (
                      <div className="prose max-w-none">
                        {caseDetails.full_text.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Full text for this case is not available.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-6">
                <div className="space-y-6">
                  <AddCaseNote 
                    caseId={caseDetails.id} 
                    onNoteAdded={handleNoteAdded} 
                  />
                  
                  <CaseNotes 
                    caseId={caseDetails.id}
                    shouldRefresh={shouldRefreshNotes}
                    onRefreshComplete={handleRefreshComplete}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mb-6">
              <h3 className="text-xl font-serif mb-4">Download Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {['PDF', 'DOCX', 'Plain Text'].map((format) => (
                  <Button 
                    key={format} 
                    variant="outline" 
                    className="h-auto py-4"
                    onClick={() => handleDownload(format)}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {format} Format
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
              
              <Button variant="default" asChild>
                <Link to="/landmark-cases">View More Cases</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
      
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to Premium</DialogTitle>
            <DialogDescription>
              You've reached your daily limit of case notes. Upgrade to premium for unlimited access.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/50 p-4 rounded-md my-2">
            <h4 className="font-medium">Premium Plan Benefits:</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Unlimited case notes access</li>
              <li>• Export to multiple formats</li>
              <li>• Advanced search features</li>
              <li>• Priority support</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>Maybe Later</Button>
            <Button onClick={() => navigate('/profile')}>Upgrade Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default CaseDetail;
