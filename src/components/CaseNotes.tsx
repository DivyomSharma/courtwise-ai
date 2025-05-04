
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface CaseNote {
  id: string;
  note_content: string;
  created_at: string;
  is_favorite: boolean;
}

interface CaseNotesProps {
  caseId: string;
  shouldRefresh?: boolean;
  onRefreshComplete?: () => void;
}

const CaseNotes: React.FC<CaseNotesProps> = ({ 
  caseId, 
  shouldRefresh = false,
  onRefreshComplete
}) => {
  const [notes, setNotes] = useState<CaseNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { toast } = useToast();
  const { isLoggedIn, user } = useUser();

  useEffect(() => {
    if (isLoggedIn && user) {
      fetchNotes();
    } else {
      setLoading(false);
      setNotes([]);
    }
  }, [isLoggedIn, user, caseId]);

  useEffect(() => {
    if (shouldRefresh && isLoggedIn && user) {
      fetchNotes();
      if (onRefreshComplete) {
        onRefreshComplete();
      }
    }
  }, [shouldRefresh]);

  const fetchNotes = async () => {
    if (!isLoggedIn || !user) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('case_notes')
        .select('*')
        .eq('user_id', user.id)
        .eq('case_id', caseId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching notes:', error);
        toast({
          title: "Failed to load notes",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
        return;
      }
      
      setNotes(data || []);
    } catch (error: any) {
      console.error('Error fetching notes:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (noteId: string, currentValue: boolean) => {
    if (!isLoggedIn || !user) return;
    
    setUpdatingId(noteId);
    
    try {
      const { data, error } = await supabase
        .from('case_notes')
        .update({ is_favorite: !currentValue })
        .eq('id', noteId)
        .eq('user_id', user.id)
        .select();
      
      if (error) {
        console.error('Error updating note:', error);
        toast({
          title: "Failed to update note",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
        return;
      }
      
      // Update local state
      setNotes(notes.map(note => 
        note.id === noteId 
          ? { ...note, is_favorite: !currentValue } 
          : note
      ));
      
      toast({
        title: currentValue ? "Removed from favorites" : "Added to favorites",
        description: currentValue 
          ? "Note removed from your favorites" 
          : "Note added to your favorites",
      });
    } catch (error: any) {
      console.error('Error updating note:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please sign in to view your notes for this case.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Notes</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (notes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You haven't added any notes for this case yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className="p-4 rounded-md border border-border bg-background"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-muted-foreground">
                {format(new Date(note.created_at), 'PPP p')}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => toggleFavorite(note.id, note.is_favorite)}
                disabled={updatingId === note.id}
              >
                {updatingId === note.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : note.is_favorite ? (
                  <BookmarkCheck className="h-4 w-4 fill-primary text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {note.is_favorite ? "Remove from favorites" : "Add to favorites"}
                </span>
              </Button>
            </div>
            <p className="whitespace-pre-wrap">{note.note_content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CaseNotes;
