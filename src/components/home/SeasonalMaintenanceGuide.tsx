import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface MaintenanceTask {
  id: string;
  titleKey: string;
  descriptionKey: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  month: number;
  priority: 'high' | 'medium' | 'low';
  service: 'window-cleaning' | 'pressure-washing' | 'gutter-cleaning' | 'roof-cleaning';
}

const SeasonalMaintenanceGuide = () => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: '1',
      titleKey: 'Spring Window Cleaning',
      descriptionKey: 'Remove winter grime and salt buildup from windows',
      season: 'spring',
      month: 3,
      priority: 'high',
      service: 'window-cleaning'
    },
    {
      id: '2',
      titleKey: 'Pressure Wash Exterior',
      descriptionKey: 'Clean siding, driveways, and patios after winter',
      season: 'spring',
      month: 4,
      priority: 'high',
      service: 'pressure-washing'
    },
    {
      id: '3',
      titleKey: 'Gutter Cleaning',
      descriptionKey: 'Remove debris and check for winter damage',
      season: 'spring',
      month: 4,
      priority: 'medium',
      service: 'gutter-cleaning'
    },
    {
      id: '4',
      titleKey: 'Summer Window Maintenance',
      descriptionKey: 'Mid-year window cleaning for optimal clarity',
      season: 'summer',
      month: 7,
      priority: 'medium',
      service: 'window-cleaning'
    },
    {
      id: '5',
      titleKey: 'Deck & Patio Cleaning',
      descriptionKey: 'Prepare outdoor spaces for summer entertaining',
      season: 'summer',
      month: 5,
      priority: 'medium',
      service: 'pressure-washing'
    },
    {
      id: '6',
      titleKey: 'Fall Gutter Cleaning',
      descriptionKey: 'Remove leaves and prepare for winter',
      season: 'fall',
      month: 10,
      priority: 'high',
      service: 'gutter-cleaning'
    },
    {
      id: '7',
      titleKey: 'Roof Cleaning & Inspection',
      descriptionKey: 'Remove moss and check for damage before winter',
      season: 'fall',
      month: 9,
      priority: 'high',
      service: 'roof-cleaning'
    },
    {
      id: '8',
      titleKey: 'Pre-Winter Window Cleaning',
      descriptionKey: 'Final window cleaning before harsh weather',
      season: 'fall',
      month: 11,
      priority: 'medium',
      service: 'window-cleaning'
    },
    {
      id: '9',
      titleKey: 'Winter Maintenance Check',
      descriptionKey: 'Inspect and clean accessible exterior areas',
      season: 'winter',
      month: 1,
      priority: 'low',
      service: 'pressure-washing'
    }
  ];

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';
    return 'winter';
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring': return 'bg-green-100 text-green-800';
      case 'summer': return 'bg-yellow-100 text-yellow-800';
      case 'fall': return 'bg-orange-100 text-orange-800';
      case 'winter': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const filteredTasks = maintenanceTasks.filter(task => 
    selectedSeason === 'all' || task.season === selectedSeason
  );

  const currentSeason = getCurrentSeason();
  const currentTasks = maintenanceTasks.filter(task => task.season === currentSeason);

  const seasonBackgroundStyle = (season: string) => {
    const commonStyles = "bg-cover bg-center text-white after:content-[''] after:absolute after:inset-0 after:bg-black after:bg-opacity-40 after:rounded-lg relative z-0";
    
    switch (season) {
      case 'spring':
        return `${commonStyles} bg-[url('/lovable-uploads/72fb0626-4eb1-451f-b8e0-2b4c1a0b0124.png')]`;
      case 'summer':
        return `${commonStyles} bg-[url('/lovable-uploads/1dc68ebd-89dd-4abf-8432-8ab04c509c12.png')]`;
      case 'fall':
        return `${commonStyles} bg-[url('/lovable-uploads/453b4258-4fed-4125-8587-dc518b9e12c3.png')]`;
      case 'winter':
        return `${commonStyles} bg-[url('/lovable-uploads/396dc39f-80e9-4627-81b1-b1ac91c24d70.png')]`;
      default:
        return "";
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Seasonal Maintenance Guide")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("Stay on top of your property maintenance with our comprehensive seasonal guide. Plan ahead and keep your home looking its best year-round.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calendar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-bc-red" />
                {t("Maintenance Calendar")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">{t("Filter by season:")}</p>
                <div className="flex flex-wrap gap-2">
                  {['all', 'spring', 'summer', 'fall', 'winter'].map((season) => (
                    <Button
                      key={season}
                      variant={selectedSeason === season ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSeason(season)}
                      className={selectedSeason === season ? "bg-bc-red hover:bg-red-700" : ""}
                    >
                      {season === 'all' ? t("All") : season.charAt(0).toUpperCase() + season.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Season Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className={getSeasonColor(currentSeason)}>
                  {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}
                </Badge>
                {t("Recommended Tasks")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentTasks.map((task) => (
                  <div key={task.id} className="border-l-4 border-bc-red pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      {getPriorityIcon(task.priority)}
                      <h4 className="font-semibold">{t(task.titleKey)}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{t(task.descriptionKey)}</p>
                    <Badge variant="outline" className="text-xs">
                      {task.service.replace('-', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-bc-red hover:bg-red-700">
                {t(`Schedule ${currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Service`)}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* All Tasks by Season with Background Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['spring', 'summer', 'fall', 'winter'].map((season) => (
            <Card key={season} className={`${seasonBackgroundStyle(season)} hover:shadow-lg transition-shadow overflow-hidden`}>
              <CardHeader className="relative z-10">
                <CardTitle className="text-center text-white">
                  <span className="text-2xl font-bold">
                    {season.charAt(0).toUpperCase() + season.slice(1)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3">
                  {maintenanceTasks
                    .filter(task => task.season === season)
                    .map((task) => (
                      <div key={task.id} className="p-3 bg-white bg-opacity-90 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          {getPriorityIcon(task.priority)}
                          <h5 className="font-medium text-sm text-gray-800">{t(task.titleKey)}</h5>
                        </div>
                        <p className="text-xs text-gray-700 mb-2">{t(task.descriptionKey)}</p>
                        <Badge variant="outline" className="text-xs bg-white">
                          {task.service.replace('-', ' ')}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            {t("Need help planning your maintenance schedule? Our experts are here to help!")}
          </p>
          <Button size="lg" className="bg-bc-red hover:bg-red-700">
            {t("Get Custom Maintenance Plan")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SeasonalMaintenanceGuide;
