
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuIcon, Plus, Edit, Trash2, Search, FileText, Users, Database } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminDashboard = () => {
  const { userRole } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Redirect non-admin users
  React.useEffect(() => {
    if (userRole !== 'admin') {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [userRole, navigate, toast]);
  
  // Mock data for admin dashboard
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'subscriber', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'free', status: 'active' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'admin', status: 'active' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'subscriber', status: 'inactive' },
  ];
  
  const mockCases = [
    { id: 1, title: 'Kesavananda Bharati vs State of Kerala', court: 'Supreme Court', status: 'published', date: '2023-05-12' },
    { id: 2, title: 'Navtej Singh Johar vs Union of India', court: 'Supreme Court', status: 'published', date: '2023-06-24' },
    { id: 3, title: 'Indian Hotel & Restaurant Association vs State of Maharashtra', court: 'Mumbai High Court', status: 'draft', date: '2023-07-30' },
    { id: 4, title: 'Vishaka vs State of Rajasthan', court: 'Supreme Court', status: 'published', date: '2023-08-15' },
  ];
  
  if (userRole !== 'admin') {
    return null; // Don't render anything while redirecting
  }
  
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
                
                <h1 className="text-xl md:text-2xl font-serif font-bold">Admin Dashboard</h1>
              </div>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Total Cases</p>
                        <h2 className="text-2xl font-bold">245</h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Total Users</p>
                        <h2 className="text-2xl font-bold">1,283</h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Database className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Database Size</p>
                        <h2 className="text-2xl font-bold">2.4 GB</h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Tabs defaultValue="cases">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="cases">Manage Cases</TabsTrigger>
                  <TabsTrigger value="users">Manage Users</TabsTrigger>
                  <TabsTrigger value="news">Manage News</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Search..." 
                      className="pl-9 w-[200px] md:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </div>
              </div>
              
              <TabsContent value="cases" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-serif">Cases Database</CardTitle>
                    <CardDescription>Manage all cases in the system</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[300px]">Case Title</TableHead>
                            <TableHead>Court</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockCases.map((caseItem) => (
                            <TableRow key={caseItem.id}>
                              <TableCell className="font-medium">{caseItem.title}</TableCell>
                              <TableCell>{caseItem.court}</TableCell>
                              <TableCell>
                                <Badge variant={caseItem.status === 'published' ? 'default' : 'outline'}>
                                  {caseItem.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{caseItem.date}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-sm text-muted-foreground">Showing 4 of 245 cases</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="users" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-serif">User Management</CardTitle>
                    <CardDescription>Manage all users in the system</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Select defaultValue={user.role}>
                                  <SelectTrigger className="w-28">
                                    <SelectValue placeholder={user.role} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="free">Free</SelectItem>
                                    <SelectItem value="subscriber">Subscriber</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-sm text-muted-foreground">Showing 4 of 1,283 users</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="news" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-serif">News Management</CardTitle>
                    <CardDescription>Manage legal news content</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="py-10 text-center">
                    <div className="mx-auto max-w-md space-y-4">
                      <h3 className="text-lg font-medium">No news items found</h3>
                      <p className="text-muted-foreground">
                        Add your first news item to start populating the legal news section.
                      </p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add News Item
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
