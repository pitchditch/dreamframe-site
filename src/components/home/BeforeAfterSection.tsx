
import { useTranslation } from '@/hooks/use-translation';
import BeforeAfterSlider from '../BeforeAfterSlider';
import SplitBeforeAfterSlider from '../SplitBeforeAfterSlider';
import VideoHoverPlayer from '../VideoHoverPlayer';
import RotatingImageQuadrants from '../RotatingImageQuadrants';

const BeforeAfterSection = () => {
  const { t } = useTranslation();
  
  const beforeAfterExamples = [
    {
      id: 1,
      beforeImage: '/lovable-uploads/3f865bfb-458a-4ab3-b2d3-a324d755ab27.png',
      afterImage: '/lovable-uploads/6792b6a1-2ada-44bf-8ccd-b2665245e13d.png',
      service: 'Pressure Washing',
      description: 'House exterior cleaning'
    },
    {
      id: 2,
      component: 'video',
      thumbnailImage: '/lovable-uploads/8f51f55c-a8ce-472b-b398-1a35211096d3.png',
      videoIds: ['xeUNIHhOxb8', 'PKw0OS7iDmY'],
      service: 'Window Cleaning',
      description: 'Crystal clear windows'
    },
    {
      id: 3,
      component: 'split',
      splitImage: '/lovable-uploads/7be3c823-5909-45b7-8972-c2917ec523d5.png',
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
              {example.component === 'video' ? (
                <VideoHoverPlayer 
                  videoIds={(example as any).videoIds} 
                  thumbnailUrl={(example as any).thumbnailImage} 
                  altText={example.description}
                />
              ) : example.component === 'split' ? (
                <SplitBeforeAfterSlider 
                  image={(example as any).splitImage} 
                  altText={example.description} 
                />
              ) : example.component === 'rotating' ? (
                <RotatingImageQuadrants 
                  image={(example as any).rotatingImage} 
                  altText={example.description}
                />
              ) : (
                <BeforeAfterSlider 
                  beforeImage={example.beforeImage!} 
                  afterImage={example.afterImage!} 
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
