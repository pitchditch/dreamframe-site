
import { useTranslation } from '@/hooks/use-translation';
import BeforeAfterSlider from '../BeforeAfterSlider';

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
      beforeImage: '/lovable-uploads/281422a1-6eb1-4353-9f93-de7d6163152e.png',
      afterImage: '/lovable-uploads/8f51f55c-a8ce-472b-b398-1a35211096d3.png',
      service: 'Window Cleaning',
      description: 'Crystal clear windows'
    },
    {
      id: 3,
      beforeImage: '/lovable-uploads/ac700f26-0c3f-4bb6-9297-862295529d82.png',
      afterImage: '/lovable-uploads/3ff52f8f-29e2-421b-983b-b72c1ab34b52.png',
      service: 'Roof Cleaning',
      description: 'Remove moss and debris'
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{t("See The Difference")}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-10">
          {t("Drag the slider to reveal the dramatic before and after results of our professional cleaning services")}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterExamples.map((example) => (
            <div key={example.id} className="flex flex-col">
              <BeforeAfterSlider 
                beforeImage={example.beforeImage} 
                afterImage={example.afterImage} 
                altText={example.description} 
              />
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
