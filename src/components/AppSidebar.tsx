
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Landmark, User, Folder, LogOut, Settings, Bell } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const categoriesList = [
  "Constitutional",
  "Criminal",
  "Civil",
  "Corporate",
  "Tax",
  "Intellectual Property",
  "Family",
  "Labor & Employment",
  "Environmental",
  "International",
];

const AppSidebar = () => {
  const [isExploreOpen, setIsExploreOpen] = React.useState(false);
  const { isLoggedIn, userName, userRole, logout, remainingCases } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };
  
  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!userName) return "GU";
    return userName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center p-4 border-b">
        {isLoggedIn ? (
          <Link to="/profile" className="flex items-center w-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex-1">
              <p className="text-sm font-medium">{userName}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                {userRole === 'free' && (
                  <Badge variant="outline" className="text-xs">
                    {remainingCases} case{remainingCases !== 1 ? 's' : ''} left
                  </Badge>
                )}
              </div>
            </div>
          </Link>
        ) : (
          <Link to="/auth" className="flex items-center w-full">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-muted">GU</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium">Guest User</p>
              <p className="text-xs text-muted-foreground">Sign in</p>
            </div>
          </Link>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/" className="flex items-center">
                  <User className="h-5 w-5 mr-3" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/dashboard" className="flex items-center">
                  <User className="h-5 w-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/landmark-cases" className="flex items-center">
                  <Landmark className="h-5 w-5 mr-3" />
                  <span>Landmark Cases</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <Collapsible open={isExploreOpen} onOpenChange={setIsExploreOpen}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="w-full justify-between">
                    <div className="flex items-center">
                      <Folder className="h-5 w-5 mr-3" />
                      <span>Explore</span>
                    </div>
                    {isExploreOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-9 pr-2 py-2 space-y-1">
                  {categoriesList.map((category) => (
                    <div key={category} className="rounded-md hover:bg-accent">
                      <Link
                        to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-2 py-1.5 text-sm"
                      >
                        {category}
                      </Link>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
            
            {userRole === 'admin' && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/admin" className="flex items-center">
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Admin Panel</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        {isLoggedIn ? (
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log out</span>
          </Button>
        ) : (
          <Button variant="default" size="sm" className="w-full" asChild>
            <Link to="/auth">
              <span>Sign In</span>
            </Link>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
