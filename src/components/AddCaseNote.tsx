
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface AddCaseNoteProps {
  caseId: string;
  onNoteAdded?: () => void;
}

const AddCaseNote: React.FC<AddCaseNoteProps> = ({ caseId, onNoteAdded }) => {
  const [noteContent, setNoteContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isLoggedIn, user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn || !user) {
      toast({
        title: "Login required",
        description: "You must be logged in to add notes",
        variant: "destructive",
      });
      return;
    }
    
    if (!noteContent.trim()) {
      toast({
        title: "Note required",
        description: "Please enter your note content",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('case_notes')
        .insert({
          user_id: user.id,
          case_id: caseId,
          note_content: noteContent.trim()
        })
        .select();
      
      if (error) {
        console.error('Error adding note:', error);
        toast({
          title: "Failed to add note",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Note added",
        description: "Your note has been saved successfully",
      });
      
      // Reset form
      setNoteContent('');
      
      // Notify parent component
      if (onNoteAdded) {
        onNoteAdded();
      }
    } catch (error: any) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please sign in to add notes to this case.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-lg">Add Your Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter your notes or observations about this case..."
            className="min-h-[120px]"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            disabled={isSubmitting}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="ml-auto">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Note"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddCaseNote;
