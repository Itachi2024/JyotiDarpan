import { Calendar, Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const festivals = [
  {
    name: 'मकर संक्रांति',
    english: 'Makar Sankranti',
    date: '14 Jan 2025',
    description: 'Sun enters Capricorn, harvest festival',
    icon: '🪁',
    daysLeft: 2,
  },
  {
    name: 'वसंत पंचमी',
    english: 'Vasant Panchami',
    date: '2 Feb 2025',
    description: 'Worship of Goddess Saraswati',
    icon: '🌸',
    daysLeft: 21,
  },
  {
    name: 'महाशिवरात्रि',
    english: 'Maha Shivaratri',
    date: '26 Feb 2025',
    description: 'Night of Lord Shiva',
    icon: '🔱',
    daysLeft: 45,
  },
  {
    name: 'होली',
    english: 'Holi',
    date: '14 Mar 2025',
    description: 'Festival of colors',
    icon: '🎨',
    daysLeft: 61,
  },
];

const FestivalSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/20 mb-3 sm:mb-4">
              <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-accent" />
              <span className="text-xs sm:text-sm font-medium text-foreground">Upcoming Festivals</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-foreground mb-2">
              आगामी त्यौहार
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Important Hindu festivals and their muhurat timings
            </p>
          </div>
          <Button variant="spiritual" size="sm" className="w-full sm:w-auto text-sm sm:text-base">
            <Bell className="w-3 sm:w-4 h-3 sm:h-4" />
            Set Reminders
          </Button>
        </div>

        {/* Festival Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-6">
          {festivals.map((festival, index) => (
            <div
              key={festival.english}
              className="group card-spiritual p-4 sm:p-5 lg:p-6 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon & Days Left */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl">{festival.icon}</div>
                <div className="px-2 sm:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {festival.daysLeft} days
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground font-hindi mb-1">
                {festival.name}
              </h3>
              <p className="text-xs sm:text-sm text-primary font-medium mb-2">{festival.english}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">{festival.description}</p>

              {/* Date */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">{festival.date}</span>
                </div>
                <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* View Calendar Link */}
        <div className="text-center mt-6 sm:mt-8">
          <a href="/calendar" className="text-primary font-medium hover:underline inline-flex items-center gap-2 text-sm sm:text-base">
            View Full Hindu Calendar 2025
            <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FestivalSection;
