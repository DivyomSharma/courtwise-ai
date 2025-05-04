
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
  BookOpen
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
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock case data for demonstration
const caseDetails = {
  id: "kesavananda-bharati",
  title: "Kesavananda Bharati vs State of Kerala",
  citation: "AIR 1973 SC 1461",
  court: "Supreme Court",
  date: "April 24, 1973",
  category: "Constitutional",
  judges: [
    "S.M. Sikri CJ", "A.N. Ray", "D.G. Palekar", "K.K. Mathew",
    "M.H. Beg", "J.M. Shelat", "A.N. Grover", "P. Jaganmohan Reddy", 
    "H.R. Khanna", "Y.V. Chandrachud", "B.K. Mukherjea", "S.N. Dwivedi", "A.K. Mukherjea"
  ],
  petitioner: "His Holiness Kesavananda Bharati Sripadagalvaru",
  respondent: "State of Kerala and Another",
  summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features.",
  fullText: `
    This landmark case was heard for 68 days and resulted in the most voluminous judgment in the history of the Supreme Court at that time. The 13-judge bench delivered 11 separate judgments, which were summarized by Justice H.R. Khanna.
    
    The case arose from the 24th, 25th, and 29th amendments to the Constitution, which were challenged on the grounds that they violated the "basic structure" of the Constitution. The petitioner, Kesavananda Bharati, was the head of a Hindu monastery in Kerala who challenged the Kerala government's land reforms acts.
    
    By a narrow margin of 7:6, the Supreme Court held that the Parliament could amend any part of the Constitution, including the Fundamental Rights, but it cannot destroy the "basic structure" of the Constitution. While the Court did not precisely define what constitutes the "basic structure," it included elements such as:
    
    1. Supremacy of the Constitution
    2. Republican and democratic form of government
    3. Secular character of the Constitution
    4. Separation of powers
    5. Federal character of the Constitution
    
    This doctrine has since been used to invalidate several constitutional amendments and has become a cornerstone of Indian constitutional law.
  `,
  keyPoints: [
    "Established the 'Basic Structure Doctrine' in Indian constitutional law",
    "Held that Parliament cannot amend the Constitution to destroy its basic features",
    "Limited the amending power of Parliament under Article 368",
    "Partially overruled the decision in Golak Nath v. State of Punjab",
    "One of the most significant constitutional cases in Indian judicial history"
  ],
  relatedCases: [
    "Golak Nath v. State of Punjab (1967)",
    "Minerva Mills v. Union of India (1980)",
    "Indira Gandhi v. Raj Narain (1975)",
    "I.R. Coelho v. State of Tamil Nadu (2007)"
  ]
};

const CaseDetail = () => {
  const { caseId } = useParams();
  const [bookmarked, setBookmarked] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoggedIn, userRole, remainingCases, decrementRemainingCases } = useUser();
  
  // In a real application, you would fetch case details based on caseId
  
  useEffect(() => {
    // If user is not logged in, show a notification or redirect
    if (!isLoggedIn) {
      toast({
        title: "Limited access",
        description: "Sign in to access full case details and export options.",
      });
    }
    
    // If user is free and has no remaining cases
    if (isLoggedIn && userRole === 'free' && remainingCases <= 0) {
      setShowUpgradeDialog(true);
    }
    
    // Track case view for free users
    if (isLoggedIn && userRole === 'free' && remainingCases > 0) {
      decrementRemainingCases();
      toast({
        title: "Case note usage",
        description: `You have ${remainingCases - 1} case note${remainingCases - 1 !== 1 ? 's' : ''} remaining today.`,
      });
    }
  }, [isLoggedIn, userRole, remainingCases]);
  
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="md:hidden">
                  <SidebarTrigger />
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
                  <p className="font-medium">{caseDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Petitioner</p>
                  <p className="font-medium">{caseDetails.petitioner}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Respondent</p>
                  <p className="font-medium">{caseDetails.respondent}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground mr-2">Category:</span>
                <Badge variant="outline">{caseDetails.category}</Badge>
              </div>
              
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
                <TabsTrigger value="analysis" className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Analysis
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-serif font-semibold mb-4">Case Summary</h3>
                    <p className="text-base leading-relaxed mb-6">
                      {caseDetails.summary}
                    </p>
                    
                    <h4 className="font-medium mb-3">Key Points:</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      {caseDetails.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    
                    <h4 className="font-medium mb-3">Related Cases:</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {caseDetails.relatedCases.map((relatedCase, index) => (
                        <li key={index}>{relatedCase}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="fulltext" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-serif font-semibold mb-4">Full Text</h3>
                    <div className="prose max-w-none">
                      {caseDetails.fullText.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analysis" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-serif font-semibold mb-4">Legal Analysis</h3>
                    <p className="text-muted-foreground mb-4">
                      This section provides expert legal analysis of the case and its implications.
                    </p>
                    
                    <div className="rounded-md bg-primary/5 p-4 border border-primary/20 mb-6">
                      <h4 className="font-medium mb-2">Constitutional Significance:</h4>
                      <p className="mb-4">
                        The Kesavananda Bharati case is arguably the most important constitutional case in India's judicial history. 
                        It established the "Basic Structure Doctrine," which limits the amending power of Parliament by protecting certain 
                        fundamental aspects of the Constitution from being altered or destroyed.
                      </p>
                      <p>
                        This doctrine has since been used in numerous cases to strike down constitutional amendments 
                        that were found to violate the basic structure of the Constitution.
                      </p>
                    </div>
                    
                    <h4 className="font-medium mb-3">Legal Principles Established:</h4>
                    <ul className="list-disc pl-6 space-y-3 mb-6">
                      <li>Parliament's power to amend the Constitution under Article 368 is not unlimited</li>
                      <li>The term "amendment" implies changes within the broad framework of the original Constitution</li>
                      <li>Parliament cannot use its amending power to "damage," "emasculate," "destroy," "abrogate," "change," or "alter" the "basic structure" or framework of the Constitution</li>
                    </ul>
                    
                    <h4 className="font-medium mb-3">Impact on Subsequent Legislation:</h4>
                    <p>
                      This landmark decision has shaped the course of constitutional jurisprudence in India and has been cited in numerous subsequent cases. 
                      The doctrine has been applied to invalidate several constitutional amendments, including portions of the 39th, 42nd, and 103rd amendments.
                    </p>
                  </CardContent>
                </Card>
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
