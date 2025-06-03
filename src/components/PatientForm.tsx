
import { useState } from "react";
import { User, Calendar, Users, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface PatientFormProps {
  language: 'en' | 'sw';
  onDiagnosisComplete: (data: any) => void;
}

const PatientForm = ({ language, onDiagnosisComplete }: PatientFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: ''
  });

  const translations = {
    en: {
      title: "Patient Information",
      subtitle: "Enter patient details for AI consultation",
      patientName: "Patient Name",
      patientNamePlaceholder: "Enter patient's full name",
      age: "Age",
      agePlaceholder: "Enter age in years",
      gender: "Gender",
      selectGender: "Select gender",
      male: "Male",
      female: "Female",
      other: "Other",
      symptoms: "Symptoms",
      symptomsPlaceholder: "Describe the patient's symptoms in detail. Include when they started, severity, and any other relevant information...",
      submitConsultation: "Get AI Consultation",
      submitting: "Analyzing symptoms...",
      nameRequired: "Patient name is required",
      ageRequired: "Patient age is required",
      genderRequired: "Patient gender is required",
      symptomsRequired: "Symptoms description is required"
    },
    sw: {
      title: "Taarifa za Mgonjwa",
      subtitle: "Ingiza maelezo ya mgonjwa kwa ushauri wa AI",
      patientName: "Jina la Mgonjwa",
      patientNamePlaceholder: "Ingiza jina kamili la mgonjwa",
      age: "Umri",
      agePlaceholder: "Ingiza umri kwa miaka",
      gender: "Jinsia",
      selectGender: "Chagua jinsia",
      male: "Mwanaume",
      female: "Mwanamke",
      other: "Nyingine",
      symptoms: "Dalili",
      symptomsPlaceholder: "Eleza dalili za mgonjwa kwa undani. Jumuisha wakati zilipoanza, ukali, na maelezo mengine muhimu...",
      submitConsultation: "Pata Ushauri wa AI",
      submitting: "Inachanganua dalili...",
      nameRequired: "Jina la mgonjwa linahitajika",
      ageRequired: "Umri wa mgonjwa unahitajika",
      genderRequired: "Jinsia ya mgonjwa inahitajika",
      symptomsRequired: "Maelezo ya dalili yanahitajika"
    }
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast({ description: t.nameRequired, variant: "destructive" });
      return;
    }
    if (!formData.age.trim()) {
      toast({ description: t.ageRequired, variant: "destructive" });
      return;
    }
    if (!formData.gender) {
      toast({ description: t.genderRequired, variant: "destructive" });
      return;
    }
    if (!formData.symptoms.trim()) {
      toast({ description: t.symptomsRequired, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate AI processing (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock diagnosis data
      const diagnosisData = {
        patient: formData,
        diagnosis: {
          condition: language === 'en' ? "Upper Respiratory Infection" : "Uambukizi wa Njia za Upumuzi wa Juu",
          confidence: 85,
          symptoms_analysis: language === 'en' 
            ? "Based on the reported symptoms, the patient likely has a common cold or upper respiratory infection."
            : "Kulingana na dalili zilizoripotiwa, mgonjwa anaweza kuwa na homa ya kawaida au uambukizi wa njia za upumuzi wa juu.",
          recommended_action: language === 'en' ? "local_treatment" : "matibabu_ya_karibu",
          urgency: "low",
          treatment_suggestions: language === 'en'
            ? ["Rest and fluids", "Paracetamol for fever", "Monitor for 48 hours"]
            : ["Pumziko na vinywaji", "Paracetamol kwa homa", "Fuatilia kwa masaa 48"]
        },
        timestamp: new Date().toISOString()
      };

      // Save to local storage for referral log
      const existingLogs = JSON.parse(localStorage.getItem('medibot_referrals') || '[]');
      existingLogs.unshift(diagnosisData);
      localStorage.setItem('medibot_referrals', JSON.stringify(existingLogs.slice(0, 50))); // Keep last 50

      onDiagnosisComplete(diagnosisData);
      
      // Reset form
      setFormData({ name: '', age: '', gender: '', symptoms: '' });
      
    } catch (error) {
      toast({ 
        description: "Error processing consultation. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          {t.title}
        </CardTitle>
        <p className="text-slate-300 text-sm">{t.subtitle}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-medium">
              {t.patientName}
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder={t.patientNamePlaceholder}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 text-lg py-3"
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age" className="text-white font-medium">
              {t.age}
            </Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              placeholder={t.agePlaceholder}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 text-lg py-3"
              min="0"
              max="120"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t.gender}
            </Label>
            <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white text-lg py-3">
                <SelectValue placeholder={t.selectGender} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="male" className="text-white hover:bg-slate-700">{t.male}</SelectItem>
                <SelectItem value="female" className="text-white hover:bg-slate-700">{t.female}</SelectItem>
                <SelectItem value="other" className="text-white hover:bg-slate-700">{t.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Symptoms */}
          <div className="space-y-2">
            <Label htmlFor="symptoms" className="text-white font-medium">
              {t.symptoms}
            </Label>
            <Textarea
              id="symptoms"
              value={formData.symptoms}
              onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
              placeholder={t.symptomsPlaceholder}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 text-lg py-3 min-h-32 resize-none"
              rows={6}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-4 text-lg disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t.submitting}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                {t.submitConsultation}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;
