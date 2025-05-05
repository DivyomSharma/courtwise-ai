import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuIcon, Download, Settings, Bookmark, User, Calendar, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import CaseNote from '@/components/CaseNote';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface BookmarkedCase {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
}

interface UserNote {
  id: string;
  case_id: string;
  case_title: string;
  created_at: string;
  note_content: string;
}

interface UsageData {
  date: string;
  cases_viewed: number;
}

const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  const [bookmarkedCases, setBookmarkedCases] = useState<BookmarkedCase[]>([]);
  const [userNotes, setUserNotes] = useState<UserNote[]>([]);
  const [usageData, setUsageData] = useState<UsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, userRole, remainingCases, userName } = useUser();
  const { toast } = useToast();
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);
  
  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Fetch bookmarked cases (mock data for now)
      const mockBookmarkedCases = [
        {
          id: "kesavananda-bharati",
          title: "Kesavananda Bharati vs State of Kerala",
          citation: "AIR 1973 SC 1461",
          court: "Supreme Court",
          date: "April 24, 1973",
          category: "Constitutional",
          summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features."
        },
        {
          id: "vishaka",
          title: "Vishaka vs State of Rajasthan",
          citation: "AIR 1997 SC 3011",
          court: "Supreme Court",
          date: "August 13, 1997",
          category: "Labor & Employment",
          summary: "This landmark judgment laid down guidelines to prevent sexual harassment of women at workplaces, which later formed the basis for the Sexual Harassment of Women at Workplace Act, 2013."
        }
      ];
      
      setBookmarkedCases(mockBookmarkedCases);
      
      // Fetch user notes (mock data for now)
      const mockUserNotes = [
        {
          id: "1",
          case_id: "kesavananda-bharati",
          case_title: "Kesavananda Bharati vs State of Kerala",
          created_at: "2025-05-01T10:30:00Z",
          note_content: "Important case establishing the basic structure doctrine. Need to review the dissenting opinions."
        },
        {
          id: "2",
          case_id: "vishaka",
          case_title: "Vishaka vs State of Rajasthan",
          created_at: "2025-05-03T14:15:00Z",
          note_content: "Guidelines were later codified into law. Compare with international standards on workplace harassment."
        },
        {
          id: "3",
          case_id: "puttaswamy",
          case_title: "Justice K.S. Puttaswamy vs Union of India",
          created_at: "2025-05-04T09:00:00Z",
          note_content: "Landmark privacy judgment. Connects with global privacy regulations and data protection frameworks."
        }
      ];
      
      setUserNotes(mockUserNotes);
      
      // Fetch usage data (mock data for now)
      const mockUsageData = [
        { date: "May 1", cases_viewed: 3 },
        { date: "May 2", cases_viewed: 5 },
        { date: "May 3", cases_viewed: 2 },
        { date: "May 4", cases_viewed: 7 },
        { date: "May 5", cases_viewed: 4 }
      ];
      
      setUsageData(mockUsageData);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error",
        description: "Failed to load your dashboard data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger>
                  <Button variant="ghost" size="icon" className="md:hidden mr-2">
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SidebarTrigger>
                
                <h1 className="text-xl md:text-2xl font-serif font-bold">Dashboard</h1>
              </div>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            {/* Subscription Status */}
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-serif mb-4">Subscription Status</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={userRole === 'free' ? "border-primary" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Free Plan</CardTitle>
                      {userRole === 'free' && <Badge>Current Plan</Badge>}
                    </div>
                    <CardDescription>Basic access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">$0<span className="text-sm text-muted-foreground">/month</span></p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">• Limited case access</li>
                        <li className="flex items-center">• 5 case notes per day</li>
                        <li className="flex items-center">• Basic search</li>
                      </ul>
                    </div>
                    {userRole !== 'free' && (
                      <Button variant="outline" className="w-full mt-4">Downgrade</Button>
                    )}
                  </CardContent>
                </Card>
                
                <Card className={userRole === 'subscriber' ? "border-primary" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Premium Plan</CardTitle>
                      {userRole === 'subscriber' && <Badge>Current Plan</Badge>}
                    </div>
                    <CardDescription>Enhanced access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">$19.99<span className="text-sm text-muted-foreground">/month</span></p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">• Unlimited case access</li>
                        <li className="flex items-center">• Unlimited case notes</li>
                        <li className="flex items-center">• Advanced search</li>
                        <li className="flex items-center">• Export functionality</li>
                      </ul>
                    </div>
                    {userRole !== 'subscriber' && (
                      <Button className="w-full mt-4">Upgrade to Premium</Button>
                    )}
                  </CardContent>
                </Card>
                
                <Card className={userRole === 'admin' ? "border-primary" : ""}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Enterprise Plan</CardTitle>
                      {userRole === 'admin' && <Badge>Current Plan</Badge>}
                    </div>
                    <CardDescription>Full professional access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">$49.99<span className="text-sm text-muted-foreground">/month</span></p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">• All Premium features</li>
                        <li className="flex items-center">• Team collaboration</li>
                        <li className="flex items-center">• AI-powered research</li>
                        <li className="flex items-center">• Priority support</li>
                      </ul>
                    </div>
                    {userRole !== 'admin' && (
                      <Button className="w-full mt-4">Contact Sales</Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Usage Statistics */}
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-serif mb-4">Usage Statistics</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Usage History</CardTitle>
                    <CardDescription>Cases viewed over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={usageData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="cases_viewed" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Today's Usage</CardTitle>
                    <CardDescription>Remaining case notes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userRole === 'free' && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground text-sm">Case Notes Used</span>
                          <span className="font-medium">{5 - remainingCases}/5</span>
                        </div>
                        <Progress value={(5 - remainingCases) * 20} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          You have {remainingCases} case {remainingCases === 1 ? 'note' : 'notes'} remaining today.
                        </p>
                      </>
                    )}
                    {userRole !== 'free' && (
                      <div className="text-center py-8">
                        <p className="text-lg font-medium">Unlimited</p>
                        <p className="text-muted-foreground text-sm mt-1">
                          Premium plan includes unlimited case notes
                        </p>
                      </div>
                    )}
                    <div className="pt-2">
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link to="/profile">Upgrade for More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Bookmarked Cases */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-lg md:text-xl font-serif mb-1">Bookmarked Cases</h2>
                  <p className="text-sm text-muted-foreground">Quick access to your saved cases</p>
                </div>
                
                <div className="flex gap-3">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="constitutional">Constitutional</SelectItem>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="labor">Labor & Employment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedCases.length === 0 ? (
                  <Card className="col-span-full">
                    <CardContent className="text-center py-8">
                      <Bookmark className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg mb-1">No bookmarked cases</h3>
                      <p className="text-muted-foreground">Save cases to access them quickly from your dashboard</p>
                      <Button className="mt-4" asChild>
                        <Link to="/landmark-cases">Browse Cases</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  bookmarkedCases.map((caseItem) => (
                    <CaseNote
                      key={caseItem.id}
                      title={caseItem.title}
                      citation={caseItem.citation}
                      court={caseItem.court}
                      date={caseItem.date}
                      category={caseItem.category}
                      summary={caseItem.summary}
                    />
                  ))
                )}
              </div>
            </div>
            
            {/* Recent Notes */}
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-serif mb-4">Your Study History</h2>
              <div className="space-y-4">
                {userNotes.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Clock className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg mb-1">No notes found</h3>
                      <p className="text-muted-foreground">You haven't created any case notes yet</p>
                      <Button className="mt-4" asChild>
                        <Link to="/landmark-cases">Start Studying</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {userNotes.map((note) => (
                      <Card key={note.id} className="relative">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="mb-2 md:mb-0">
                              <Link to={`/case/${note.case_id}`}>
                                <h3 className="font-medium hover:text-primary transition-colors">
                                  {note.case_title}
                                </h3>
                              </Link>
                              <p className="text-xs text-muted-foreground">{formatDate(note.created_at)}</p>
                            </div>
                            <Badge variant="outline" className="self-start md:self-auto">Note</Badge>
                          </div>
                          <p className="text-sm mt-2">{note.note_content}</p>
                          <div className="flex justify-end mt-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link to={`/case/${note.case_id}`}>View Case</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
