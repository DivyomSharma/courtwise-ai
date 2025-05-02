
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuIcon, Download, Settings } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import CaseNote from '@/components/CaseNote';

const mockNotes = [
  {
    id: 1,
    title: "M.C. Mehta vs Union of India",
    citation: "AIR 1987 SC 1086",
    court: "Supreme Court",
    date: "April 12, 1987",
    category: "Environmental",
    summary: "This case established the principle of absolute liability for industries engaged in hazardous activities, holding that such industries must ensure safety and cannot claim exemptions based on traditional defenses."
  },
  {
    id: 2,
    title: "Indra Sawhney vs Union of India",
    citation: "AIR 1993 SC 477",
    court: "Supreme Court",
    date: "November 16, 1992",
    category: "Constitutional",
    summary: "The landmark judgment that upheld the implementation of reservations based on the Mandal Commission recommendations, establishing the 50% ceiling on reservations and excluding the 'creamy layer' from OBC reservations."
  },
  {
    id: 3,
    title: "Navtej Singh Johar vs Union of India",
    citation: "AIR 2018 SC 4321",
    court: "Supreme Court",
    date: "September 6, 2018",
    category: "Constitutional",
    summary: "The Supreme Court decriminalized consensual homosexual acts by declaring Section 377 of the Indian Penal Code unconstitutional insofar as it criminalized consensual sexual conduct between adults of the same sex."
  },
  {
    id: 4,
    title: "Indian Hotel & Restaurant Association vs State of Maharashtra",
    citation: "AIR 2019 SC 589",
    court: "Mumbai High Court",
    date: "January 17, 2019",
    category: "Administrative",
    summary: "This case challenged the constitutional validity of the Maharashtra government's ban on dance performances in hotels and restaurants, eventually leading to the lifting of the ban with certain conditions."
  },
  {
    id: 5,
    title: "Common Cause vs Union of India",
    citation: "AIR 2018 SC 1665",
    court: "Supreme Court",
    date: "March 9, 2018",
    category: "Medical",
    summary: "The Supreme Court recognized the 'right to die with dignity' as a fundamental right and allowed passive euthanasia and living wills with guidelines for their implementation."
  },
  {
    id: 6,
    title: "Shreya Singhal vs Union of India",
    citation: "AIR 2015 SC 1523",
    court: "Supreme Court",
    date: "March 24, 2015",
    category: "IT",
    summary: "This judgment struck down Section 66A of the Information Technology Act, 2000, holding it unconstitutional for violating the freedom of speech guaranteed under Article 19(1)(a) of the Constitution."
  }
];

const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  
  const filteredNotes = filter === 'all' 
    ? mockNotes 
    : mockNotes.filter(note => note.category.toLowerCase() === filter.toLowerCase());

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger asChild>
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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg md:text-xl font-serif mb-1">Your Case Library</h2>
                <p className="text-sm text-muted-foreground">Access and manage your case notes</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="constitutional">Constitutional</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export All Notes
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Notes</TabsTrigger>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes.map((note) => (
                    <CaseNote 
                      key={note.id}
                      title={note.title}
                      citation={note.citation}
                      court={note.court}
                      date={note.date}
                      category={note.category}
                      summary={note.summary}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes.slice(0, 3).map((note) => (
                    <CaseNote 
                      key={note.id}
                      title={note.title}
                      citation={note.citation}
                      court={note.court}
                      date={note.date}
                      category={note.category}
                      summary={note.summary}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes.slice(1, 4).map((note) => (
                    <CaseNote 
                      key={note.id}
                      title={note.title}
                      citation={note.citation}
                      court={note.court}
                      date={note.date}
                      category={note.category}
                      summary={note.summary}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <h3 className="text-lg font-serif mb-4">User Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Export Settings</CardTitle>
                    <CardDescription>Configure your export preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">File Format</label>
                      <Select defaultValue="docx">
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="docx">Microsoft Word (.docx)</SelectItem>
                          <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                          <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Include Details</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select details" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Details</SelectItem>
                          <SelectItem value="summary">Summary Only</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Data Export</CardTitle>
                    <CardDescription>Export all your usage data and notes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">Download a complete backup of all your case notes, search history, and personal preferences.</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Export All Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
