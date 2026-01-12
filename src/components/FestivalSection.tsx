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
    <section className="py-12 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 mb-4">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Upcoming Festivals</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">
              आगामी त्यौहार
            </h2>
            <p className="text-muted-foreground">
              Important Hindu festivals and their muhurat timings
            </p>
          </div>
          <Button variant="spiritual">
            <Bell className="w-4 h-4" />
            Set Reminders
          </Button>
        </div>

        {/* Festival Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {festivals.map((festival, index) => (
            <div
              key={festival.english}
              className="group card-spiritual p-5 lg:p-6 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon & Days Left */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl lg:text-5xl">{festival.icon}</div>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {festival.daysLeft} days
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg lg:text-xl font-bold text-foreground font-hindi mb-1">
                {festival.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-2">{festival.english}</p>
              <p className="text-sm text-muted-foreground mb-3">{festival.description}</p>

              {/* Date */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{festival.date}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* View Calendar Link */}
        <div className="text-center mt-8">
          <a href="/calendar" className="text-primary font-medium hover:underline inline-flex items-center gap-2">
            View Full Hindu Calendar 2025
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FestivalSection;
