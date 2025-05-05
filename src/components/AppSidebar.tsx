
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Search,
  User, 
  LogIn, 
  Settings,
  X,
  List
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/context/UserContext';

const AppSidebar = () => {
  const location = useLocation();
  const { isLoggedIn, userName, userRole } = useUser();
  
  return (
    <Sidebar className="border-r bg-card overflow-hidden w-64">
      <div className="flex h-full flex-col">
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <Link to="/" className="flex items-center">
            <span className="font-serif text-xl font-bold">Courtwise AI</span>
          </Link>
          {/* Button for closing sidebar on mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        
        
        <ScrollArea className="flex-1 overflow-auto">
          <nav className="p-4 space-y-2">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Navigation</h3>
              <div className="space-y-1">
                <Button 
                  variant={location.pathname === '/' ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </Button>
                
                {isLoggedIn && (
                  <Button 
                    variant={location.pathname === '/dashboard' ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/dashboard">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Case Library</h3>
              <div className="space-y-1">
                <Button 
                  variant={location.pathname === '/landmark-cases' ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/landmark-cases">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Landmark Cases
                  </Link>
                </Button>
                
                <Button 
                  variant={location.pathname === '/explore' ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/explore">
                    <List className="h-4 w-4 mr-2" />
                    Explore Cases
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => window.open('https://indiankanoon.org/', '_blank')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Indian Kanoon
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Account</h3>
              <div className="space-y-1">
                {isLoggedIn ? (
                  <>
                    <Button 
                      variant={location.pathname === '/profile' ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                    
                    {userRole === 'admin' && (
                      <Button 
                        variant={location.pathname === '/admin' ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                      >
                        <Link to="/admin">
                          <Settings className="h-4 w-4 mr-2" />
                          Admin
                        </Link>
                      </Button>
                    )}
                  </>
                ) : (
                  <Button 
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/auth">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </nav>
        </ScrollArea>
        
        {isLoggedIn && (
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {userName?.charAt(0) || 'U'}
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium">{userName || 'User'}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole} Plan</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
