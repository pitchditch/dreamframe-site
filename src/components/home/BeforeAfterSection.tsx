
import { useTranslation } from '@/hooks/use-translation';
import BeforeAfterSlider from '../BeforeAfterSlider';
import SplitBeforeAfterSlider from '../SplitBeforeAfterSlider';
import VideoHoverPlayer from '../VideoHoverPlayer';
import RotatingImageQuadrants from '../RotatingImageQuadrants';
import AnimatedPressureWashing from '../AnimatedPressureWashing';

const BeforeAfterSection = () => {
  const { t } = useTranslation();
  
  const beforeAfterExamples = [
    {
      id: 1,
      component: 'animated',
      image: '/lovable-uploads/0ba0d2d2-78fb-4e69-8727-5f98806e5237.png',
      service: 'Pressure Washing',
      description: 'House exterior cleaning'
    },
    {
      id: 2,
      component: 'rotating',
      rotatingImage: '/lovable-uploads/3f12496a-a48d-49fe-b614-77435e9bab36.png',
      service: 'Window Cleaning',
      description: 'Crystal clear windows'
    },
    {
      id: 3,
      component: 'split',
      splitImage: '/lovable-uploads/761e19f7-4f68-4a54-ae9f-60649f31aa71.png',
      service: 'Roof Cleaning',
      description: 'Remove moss and debris'
    },
    {
      id: 4,
      component: 'rotating',
      rotatingImage: '/lovable-uploads/a8550ac3-e835-44c0-a30c-b105c0c8e773.png',
      service: 'Gutter Cleaning',
      description: 'Clean gutters prevent damage'
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{t("See The Difference")}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-10">
          {t("Explore our professional cleaning results with these interactive before and after demonstrations")}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beforeAfterExamples.map((example) => (
            <div key={example.id} className="flex flex-col">
              {example.component === 'video' && (example as any).videoIds && (
                <VideoHoverPlayer 
                  videoIds={(example as any).videoIds} 
                  thumbnailUrl={(example as any).thumbnailImage} 
                  altText={example.description}
                />
              )}
              {example.component === 'split' && (example as any).splitImage && (
                <SplitBeforeAfterSlider 
                  image={(example as any).splitImage} 
                  altText={example.description} 
                />
              )}
              {example.component === 'rotating' && (example as any).rotatingImage && (
                <RotatingImageQuadrants 
                  image={(example as any).rotatingImage} 
                  altText={example.description}
                />
              )}
              {example.component === 'animated' && (example as any).image && (
                <AnimatedPressureWashing 
                  image={(example as any).image} 
                  altText={example.description} 
                />
              )}
              {example.component === 'slider' && (example as any).beforeImage && (example as any).afterImage && (
                <BeforeAfterSlider 
                  beforeImage={(example as any).beforeImage} 
                  afterImage={(example as any).afterImage} 
                  altText={example.description} 
                />
              )}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{t(example.service)}</h3>
                <p className="text-gray-600">{t(example.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
