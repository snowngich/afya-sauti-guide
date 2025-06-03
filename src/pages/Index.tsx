
import { useState } from "react";
import { Heart, Activity, Users, Moon, Sun, Globe } from "lucide-react";
import PatientForm from "@/components/PatientForm";
import DiagnosisDisplay from "@/components/DiagnosisDisplay";
import ReferralLog from "@/components/ReferralLog";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<'en' | 'sw'>('en');
  const [currentView, setCurrentView] = useState<'form' | 'diagnosis' | 'log'>('form');
  const [diagnosisData, setDiagnosisData] = useState(null);

  const translations = {
    en: {
      title: "MediBot Afrika",
      subtitle: "AI Health Assistant for Community Workers",
      newConsultation: "New Consultation",
      diagnosis: "Diagnosis",
      referralLog: "Patient Log",
      toggleTheme: "Toggle theme",
      toggleLanguage: "Switch to Kiswahili"
    },
    sw: {
      title: "MediBot Afrika",
      subtitle: "Msaidizi wa Kifaa cha Akili wa Afya",
      newConsultation: "Ushauri Mpya",
      diagnosis: "Utambuzi",
      referralLog: "Rekodi za Wagonjwa",
      toggleTheme: "Badilisha mandhari",
      toggleLanguage: "Switch to English"
    }
  };

  const t = translations[language];

  const handleDiagnosisComplete = (data: any) => {
    setDiagnosisData(data);
    setCurrentView('diagnosis');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
        {/* Header */}
        <header className="bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{t.title}</h1>
                  <p className="text-sm text-blue-200">{t.subtitle}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
                  className="text-white hover:bg-slate-700/50"
                  title={t.toggleLanguage}
                >
                  <Globe className="h-4 w-4" />
                  <span className="ml-1 text-xs">{language.toUpperCase()}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="text-white hover:bg-slate-700/50"
                  title={t.toggleTheme}
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-slate-800/30 dark:bg-slate-900/30 backdrop-blur-sm border-b border-slate-700/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-1 py-2">
              <Button
                variant={currentView === 'form' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('form')}
                className={`flex-1 max-w-32 ${currentView === 'form' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-200 hover:bg-slate-700/50'}`}
              >
                <Activity className="h-4 w-4 mr-1" />
                <span className="text-xs">{t.newConsultation}</span>
              </Button>
              
              <Button
                variant={currentView === 'diagnosis' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('diagnosis')}
                disabled={!diagnosisData}
                className={`flex-1 max-w-32 ${currentView === 'diagnosis' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-200 hover:bg-slate-700/50 disabled:opacity-50'}`}
              >
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-xs">{t.diagnosis}</span>
              </Button>
              
              <Button
                variant={currentView === 'log' ? 'default' : 'ghost'}
                onClick={() => setCurrentView('log')}
                className={`flex-1 max-w-32 ${currentView === 'log' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-200 hover:bg-slate-700/50'}`}
              >
                <Users className="h-4 w-4 mr-1" />
                <span className="text-xs">{t.referralLog}</span>
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {currentView === 'form' && (
            <PatientForm 
              language={language} 
              onDiagnosisComplete={handleDiagnosisComplete}
            />
          )}
          
          {currentView === 'diagnosis' && diagnosisData && (
            <DiagnosisDisplay 
              data={diagnosisData} 
              language={language}
              onNewConsultation={() => setCurrentView('form')}
            />
          )}
          
          {currentView === 'log' && (
            <ReferralLog language={language} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
