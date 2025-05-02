
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Landmark, User, Folder } from 'lucide-react';
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
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center p-4 border-b">
        <Avatar className="h-9 w-9">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">Attorney</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/" className="flex items-center">
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
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <Button variant="outline" size="sm" className="w-full">
          <span>Log out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
