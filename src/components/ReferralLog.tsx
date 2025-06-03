
import { useState, useEffect } from "react";
import { Calendar, User, FileText, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReferralLogProps {
  language: 'en' | 'sw';
}

const ReferralLog = ({ language }: ReferralLogProps) => {
  const [referrals, setReferrals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('all');

  const translations = {
    en: {
      title: "Patient Referral Log",
      subtitle: "Recent consultations and recommendations",
      searchPlaceholder: "Search patients...",
      filterAll: "All",
      filterLow: "Low",
      filterMedium: "Medium", 
      filterHigh: "High",
      filterEmergency: "Emergency",
      noRecords: "No consultation records found",
      noRecordsDesc: "Completed consultations will appear here",
      patient: "Patient",
      diagnosis: "Diagnosis",
      action: "Action",
      date: "Date",
      confidence: "Confidence",
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
      }
    },
    sw: {
      title: "Rekodi za Rufaa za Wagonjwa",
      subtitle: "Ushauri wa hivi karibuni na mapendekezo",
      searchPlaceholder: "Tafuta wagonjwa...",
      filterAll: "Wote",
      filterLow: "Chini",
      filterMedium: "Wastani",
      filterHigh: "Juu",
      filterEmergency: "Dharura",
      noRecords: "Hakuna rekodi za ushauri zilizopatikana",
      noRecordsDesc: "Ushauri uliokamilika utaonekana hapa",
      patient: "Mgonjwa",
      diagnosis: "Utambuzi",
      action: "Kitendo",
      date: "Tarehe",
      confidence: "Uhakika",
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
      }
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Load referrals from localStorage
    const storedReferrals = JSON.parse(localStorage.getItem('medibot_referrals') || '[]');
    setReferrals(storedReferrals);
  }, []);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-orange-600';
      case 'emergency': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'local_treatment': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'refer_clinic': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'emergency': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const filteredReferrals = referrals.filter((referral: any) => {
    const matchesSearch = referral.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.diagnosis.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterUrgency === 'all' || referral.diagnosis.urgency === filterUrgency;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            {t.title}
          </CardTitle>
          <p className="text-slate-300 text-sm">{t.subtitle}</p>
        </CardHeader>
      </Card>

      {/* Search and Filter */}
      <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterUrgency === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilterUrgency('all')}
                className={filterUrgency === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-700/50'}
              >
                {t.filterAll}
              </Button>
              {['low', 'medium', 'high', 'emergency'].map((urgency) => (
                <Button
                  key={urgency}
                  variant={filterUrgency === urgency ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterUrgency(urgency)}
                  className={filterUrgency === urgency 
                    ? `${getUrgencyColor(urgency)} text-white` 
                    : 'text-slate-300 hover:bg-slate-700/50'}
                >
                  {t.urgencyLevels[urgency as keyof typeof t.urgencyLevels]}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referrals List */}
      {filteredReferrals.length === 0 ? (
        <Card className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">{t.noRecords}</h3>
              <p className="text-slate-400">{t.noRecordsDesc}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReferrals.map((referral: any, index: number) => (
            <Card key={index} className="bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-semibold">{referral.patient.name}</h3>
                        <p className="text-slate-400 text-sm">
                          {referral.patient.age} {language === 'en' ? 'years' : 'miaka'} • {referral.patient.gender}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${getUrgencyColor(referral.diagnosis.urgency)} text-white mb-1`}>
                        {t.urgencyLevels[referral.diagnosis.urgency as keyof typeof t.urgencyLevels]}
                      </Badge>
                      <p className="text-slate-400 text-xs">
                        {new Date(referral.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <h4 className="text-white font-medium mb-1">{referral.diagnosis.condition}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-slate-400 text-sm">{t.confidence}:</span>
                      <div className="flex-1 bg-slate-600 rounded-full h-1.5 max-w-20">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-teal-500 h-1.5 rounded-full"
                          style={{ width: `${referral.diagnosis.confidence}%` }}
                        />
                      </div>
                      <span className="text-slate-300 text-sm">{referral.diagnosis.confidence}%</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div>
                    <Badge className={`${getActionColor(referral.diagnosis.recommended_action)} border`}>
                      {t.actions[referral.diagnosis.recommended_action as keyof typeof t.actions]}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferralLog;
