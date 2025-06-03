
import { AlertTriangle, CheckCircle, Clock, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DiagnosisDisplayProps {
  data: any;
  language: 'en' | 'sw';
  onNewConsultation: () => void;
}

const DiagnosisDisplay = ({ data, language, onNewConsultation }: DiagnosisDisplayProps) => {
  const translations = {
    en: {
      title: "AI Diagnosis & Recommendations",
      patientInfo: "Patient Information",
      diagnosis: "Possible Diagnosis",
      confidence: "Confidence Level",
      analysis: "Symptoms Analysis",
      recommendations: "Recommended Actions",
      urgency: "Urgency Level",
      treatmentSuggestions: "Treatment Suggestions",
      actions: {
        local_treatment: "Treat Locally",
        refer_clinic: "Refer to Clinic", 
        emergency: "Emergency Referral"
      },
      urgencyLevels: {
        low: "Low",
        medium: "Medium", 
        high: "High",
        emergency: "Emergency"
      },
      newConsultation: "New Consultation",
      consultationTime: "Consultation Time"
    },
    sw: {
      title: "Utambuzi wa AI na Mapendekezo",
      patientInfo: "Taarifa za Mgonjwa",
      diagnosis: "Utambuzi Unaowezekana",
      confidence: "Kiwango cha Uhakika",
      analysis: "Uchambuzi wa Dalili",
      recommendations: "Vitendo Vinavyopendekezwa",
      urgency: "Kiwango cha Haraka",
      treatmentSuggestions: "Mapendekezo ya Matibabu",
      actions: {
        local_treatment: "Tibu Hapa",
        refer_clinic: "Peleka Kliniki",
        emergency: "Rufaa ya Haraka"
      },
      urgencyLevels: {
        low: "Chini",
        medium: "Wastani",
        high: "Juu", 
        emergency: "Dharura"
      },
      newConsultation: "Ushauri Mpya",
      consultationTime: "Muda wa Ushauri"
    }
  };

  const t = translations[language];
  const { patient, diagnosis, timestamp } = data;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-orange-600';
      case 'emergency': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'local_treatment': return <CheckCircle className="h-5 w-5" />;
      case 'refer_clinic': return <ArrowRight className="h-5 w-5" />;
      case 'emergency': return <AlertTriangle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'local_treatment': return 'bg-green-600 hover:bg-green-700';
      case 'refer_clinic': return 'bg-blue-600 hover:bg-blue-700';
      case 'emergency': return 'bg-red-600 hover:bg-red-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-white text-xl">
            {t.title}
          </CardTitle>
          <p className="text-slate-400 text-sm">
            {t.consultationTime}: {new Date(timestamp).toLocaleString()}
          </p>
        </CardHeader>
      </Card>

      {/* Patient Info */}
      <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-lg">{t.patientInfo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-slate-400 text-sm">{language === 'en' ? 'Name' : 'Jina'}</p>
              <p className="text-white font-medium">{patient.name}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">{language === 'en' ? 'Age' : 'Umri'}</p>
              <p className="text-white font-medium">{patient.age}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">{language === 'en' ? 'Gender' : 'Jinsia'}</p>
              <p className="text-white font-medium capitalize">{patient.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center justify-between">
            {t.diagnosis}
            <Badge className={`${getUrgencyColor(diagnosis.urgency)} text-white`}>
              {t.urgencyLevels[diagnosis.urgency as keyof typeof t.urgencyLevels]}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <h3 className="text-white font-semibold text-lg mb-2">{diagnosis.condition}</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-slate-400 text-sm">{t.confidence}:</span>
              <div className="flex-1 bg-slate-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${diagnosis.confidence}%` }}
                />
              </div>
              <span className="text-white font-medium">{diagnosis.confidence}%</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">{t.analysis}</h4>
            <p className="text-slate-300 leading-relaxed">{diagnosis.symptoms_analysis}</p>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-lg">{t.recommendations}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Action */}
          <div className="bg-slate-700/30 rounded-lg p-4">
            <Button 
              className={`w-full ${getActionColor(diagnosis.recommended_action)} text-white font-semibold py-4 text-lg`}
            >
              <div className="flex items-center justify-center gap-3">
                {getActionIcon(diagnosis.recommended_action)}
                {t.actions[diagnosis.recommended_action as keyof typeof t.actions]}
              </div>
            </Button>
          </div>

          {/* Treatment Suggestions */}
          <div>
            <h4 className="text-white font-medium mb-3">{t.treatmentSuggestions}</h4>
            <div className="space-y-2">
              {diagnosis.treatment_suggestions.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-center gap-3 bg-slate-700/20 rounded-lg p-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                  <span className="text-slate-300">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Consultation Button */}
      <Button
        onClick={onNewConsultation}
        className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-4 text-lg"
      >
        <RotateCcw className="h-5 w-5 mr-2" />
        {t.newConsultation}
      </Button>
    </div>
  );
};

export default DiagnosisDisplay;
