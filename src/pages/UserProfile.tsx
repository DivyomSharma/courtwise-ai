
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MenuIcon, User, Camera, Edit } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/context/UserContext';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const UserProfile = () => {
  const { userName, userRole, remainingCases } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userName,
    email: "user@example.com",
    phone: "+91 9876543210",
    organization: "Law Associates LLP",
    title: "Associate Attorney"
  });
  
  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile details have been saved",
    });
  };
  
  const getInitials = () => {
    return profileData.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const getUsagePercentage = () => {
    if (userRole === 'free') {
      return ((1 - remainingCases) / 1) * 100;
    }
    return 0;
  };
  
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
                
                <h1 className="text-xl md:text-2xl font-serif font-bold">User Profile</h1>
              </div>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-border p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-serif">{profileData.name}</h2>
                    <Badge className="capitalize">{userRole}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{profileData.title} at {profileData.organization}</p>
                  
                  {userRole === 'free' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Case Notes Usage</span>
                        <span className="text-sm">{1 - remainingCases}/1 per day</span>
                      </div>
                      <Progress value={getUsagePercentage()} className="h-2" />
                      <div className="mt-2">
                        <Button size="sm" variant="default">Upgrade to Premium</Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="profile" className="mb-6">
              <TabsList>
                <TabsTrigger value="profile">Profile Details</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={profileData.name} 
                            onChange={e => setProfileData({...profileData, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={profileData.email} 
                            onChange={e => setProfileData({...profileData, email: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={profileData.phone} 
                            onChange={e => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="title">Professional Title</Label>
                          <Input 
                            id="title" 
                            value={profileData.title} 
                            onChange={e => setProfileData({...profileData, title: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization</Label>
                          <Input 
                            id="organization" 
                            value={profileData.organization} 
                            onChange={e => setProfileData({...profileData, organization: e.target.value})}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h4>
                            <p>{profileData.name}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h4>
                            <p>{profileData.email}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h4>
                            <p>{profileData.phone}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Professional Title</h4>
                            <p>{profileData.title}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Organization</h4>
                            <p>{profileData.organization}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  {isEditing && (
                    <CardFooter>
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="subscription" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Subscription Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-muted/50 rounded-lg p-4 border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium capitalize">{userRole} Plan</h3>
                            <p className="text-sm text-muted-foreground">
                              {userRole === 'free' 
                                ? 'Limited to 1 case note per day' 
                                : userRole === 'subscriber' 
                                  ? 'Unlimited case notes and premium features' 
                                  : 'Full administrative access'}
                            </p>
                          </div>
                          <Badge variant={userRole === 'free' ? 'outline' : 'default'} className="capitalize">
                            {userRole}
                          </Badge>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Available Plans</h3>
                        
                        <div className="grid gap-4">
                          <div className={`border rounded-lg p-4 ${userRole === 'free' ? 'bg-muted/50' : ''}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Free Plan</h4>
                                <p className="text-sm text-muted-foreground">Limited access with basic features</p>
                              </div>
                              <p className="font-medium">$0 / month</p>
                            </div>
                            <ul className="mt-3 space-y-2 text-sm">
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                1 case note per day
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Basic search functionality
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Limited access to landmark cases
                              </li>
                            </ul>
                          </div>
                          
                          <div className={`border rounded-lg p-4 ${userRole === 'subscriber' ? 'bg-muted/50' : ''}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Premium Plan</h4>
                                <p className="text-sm text-muted-foreground">Full access to all features</p>
                              </div>
                              <p className="font-medium">$9.99 / month</p>
                            </div>
                            <ul className="mt-3 space-y-2 text-sm">
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Unlimited case notes
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Advanced search functionality
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Full access to all landmark cases
                              </li>
                              <li className="flex items-center">
                                <span className="mr-2">•</span>
                                Export in multiple formats
                              </li>
                            </ul>
                            
                            {userRole !== 'subscriber' && (
                              <Button className="mt-4 w-full">Upgrade Now</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Notification Preferences</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
                            <input type="checkbox" id="email-notifications" defaultChecked className="toggle" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="case-updates" className="flex-1">Case Law Updates</Label>
                            <input type="checkbox" id="case-updates" defaultChecked className="toggle" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="subscription" className="flex-1">Subscription Updates</Label>
                            <input type="checkbox" id="subscription" defaultChecked className="toggle" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium mb-2">Account Security</h3>
                        <div className="space-y-2">
                          <Button variant="outline">Change Password</Button>
                          <Button variant="outline">Two-Factor Authentication</Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
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

export default UserProfile;
