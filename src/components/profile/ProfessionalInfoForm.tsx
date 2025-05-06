
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit2, Loader2, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ProfileFormData {
  full_name: string;
  username: string;
  profession_type: string;
  qualification: string;
  experience_years: string;
  specialization: string;
  bio: string;
}

const ProfessionalInfoForm = () => {
  const { user, profile, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    username: '',
    profession_type: '',
    qualification: '',
    experience_years: '',
    specialization: '',
    bio: '',
  });
  
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        username: profile.username || '',
        profession_type: profile.profession_type || '',
        qualification: profile.qualification || '',
        experience_years: profile.experience_years || '',
        specialization: profile.specialization || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          username: formData.username,
          profession_type: formData.profession_type,
          qualification: formData.qualification,
          experience_years: formData.experience_years,
          specialization: formData.specialization,
          bio: formData.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local profile state
      if (updateProfile && profile) {
        updateProfile({
          ...profile,
          full_name: formData.full_name,
          username: formData.username,
          profession_type: formData.profession_type,
          qualification: formData.qualification,
          experience_years: formData.experience_years,
          specialization: formData.specialization,
          bio: formData.bio,
        });
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated."
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-serif">Professional Information</CardTitle>
            <CardDescription>Your professional background and expertise</CardDescription>
          </div>
          <Button 
            variant={isEditing ? "outline" : "default"}
            size="sm"
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input 
                id="full_name" 
                name="full_name" 
                value={formData.full_name} 
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                name="username" 
                value={formData.username} 
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profession_type">Profession</Label>
              <Select 
                disabled={!isEditing || isSaving}
                value={formData.profession_type}
                onValueChange={(value) => handleSelectChange('profession_type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Law Student</SelectItem>
                  <SelectItem value="advocate">Advocate</SelectItem>
                  <SelectItem value="judge">Judge</SelectItem>
                  <SelectItem value="professor">Law Professor</SelectItem>
                  <SelectItem value="researcher">Legal Researcher</SelectItem>
                  <SelectItem value="other">Other Legal Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input 
                id="qualification" 
                name="qualification" 
                value={formData.qualification} 
                onChange={handleInputChange}
                placeholder="e.g., LLB, LLM, SJD"
                disabled={!isEditing || isSaving}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience_years">Years of Experience</Label>
              <Input 
                id="experience_years" 
                name="experience_years" 
                value={formData.experience_years} 
                onChange={handleInputChange}
                disabled={!isEditing || isSaving}
                type="number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Select 
                disabled={!isEditing || isSaving}
                value={formData.specialization}
                onValueChange={(value) => handleSelectChange('specialization', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="constitutional">Constitutional Law</SelectItem>
                  <SelectItem value="criminal">Criminal Law</SelectItem>
                  <SelectItem value="civil">Civil Law</SelectItem>
                  <SelectItem value="corporate">Corporate Law</SelectItem>
                  <SelectItem value="intellectual_property">Intellectual Property</SelectItem>
                  <SelectItem value="taxation">Taxation</SelectItem>
                  <SelectItem value="international">International Law</SelectItem>
                  <SelectItem value="family">Family Law</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Professional Summary</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              value={formData.bio} 
              onChange={handleInputChange}
              placeholder="Write a brief professional summary..."
              disabled={!isEditing || isSaving}
              className="resize-none min-h-[120px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalInfoForm;
