import { useRef, useState, useEffect } from "react";
import { FilterChip } from "@/components/ui/FilterChip";

const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleMouseDown = (e: MouseEvent) => { setIsDragging(true); setStartX(e.pageX - element.offsetLeft); setScrollLeft(element.scrollLeft); element.style.cursor = 'grabbing'; element.style.userSelect = 'none'; };
    const handleMouseMove = (e: MouseEvent) => { if (!isDragging) return; e.preventDefault(); const x = e.pageX - element.offsetLeft; element.scrollLeft = scrollLeft - (x - startX) * 2; };
    const handleMouseUp = () => { setIsDragging(false); element.style.cursor = 'grab'; element.style.userSelect = 'auto'; };
    const handleMouseLeave = () => { if (isDragging) { setIsDragging(false); element.style.cursor = 'grab'; element.style.userSelect = 'auto'; } };
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.style.cursor = 'grab';
    return () => { element.removeEventListener('mousedown', handleMouseDown); element.removeEventListener('mousemove', handleMouseMove); element.removeEventListener('mouseup', handleMouseUp); element.removeEventListener('mouseleave', handleMouseLeave); };
  }, [isDragging, startX, scrollLeft]);

  return ref;
};

const FEATURE_FILTERS = ['Display type', 'Resolution', 'Size', 'Refresh rate', 'HDR', 'Internet services'] as const;

interface FeatureContent {
  title: string;
  image?: string;
  badges?: string[];
  paragraphs: Array<{ bold?: string; text: string }>;
}

const FEATURE_CONTENT: Record<string, FeatureContent> = {
  'Display type': {
    title: 'TV display type',
    image: 'https://api.builder.io/api/v1/image/assets/TEMP/d143992c6d26f11fd6b8d8dccd4f3ae258a98c50?width=443',
    badges: ['LED', 'OLED', 'QLED'],
    paragraphs: [
      { bold: 'LED', text: ' is energy-efficient and offer good brightness' },
      { bold: 'OLED', text: ' has superior picture quality with deep blacks, high contrast, and vibrant colors' },
      { bold: 'QLED', text: ' has excellent brightness and color volume, making them suitable for brightly lit rooms' },
    ],
  },
  'Resolution': {
    title: 'Resolution',
    paragraphs: [
      { text: 'TV resolution depends on factors such as screen size, viewing distance, content availability, and budget' },
      { text: 'Higher resolutions like 4K and 8K offer superior image quality but are more costly and require compatible content.' },
    ],
  },
  'Size': {
    title: 'Size',
    paragraphs: [
      { text: 'The size of TV is measured diagonally from one corner of the screen to the opposite corner' },
      { text: 'Larger TVs require a greater viewing distance to avoid eye strain' },
    ],
  },
  'Refresh rate': {
    title: 'Refresh rate',
    paragraphs: [
      { text: 'Refresh rate is measured in hertz (Hz) and indicates how many times per second the screen updates.' },
      { bold: '60Hz', text: ' is standard for most content and suitable for general viewing' },
      { bold: '120Hz', text: ' provides smoother motion, ideal for sports and gaming' },
    ],
  },
  'HDR': {
    title: 'HDR',
    paragraphs: [
      { text: 'High Dynamic Range (HDR) enhances the contrast and color range of your TV display' },
      { bold: 'HDR10', text: ' is the most common standard, supported by most TVs and streaming services' },
      { bold: 'Dolby Vision', text: ' offers dynamic metadata for scene-by-scene optimization' },
    ],
  },
  'Internet services': {
    title: 'Internet services',
    paragraphs: [
      { text: 'Smart TVs come with built-in streaming platforms and apps for easy access to content' },
      { bold: 'Popular platforms:', text: ' Roku, Fire TV, Google TV, webOS, Tizen' },
    ],
  },
};

function FeatureCard({ filter }: { filter: string }) {
  const content = FEATURE_CONTENT[filter];
  if (!content) return null;

  return (
    <>
      <h3 className="text-[13px] font-bold text-foreground text-left mb-2">{content.title}</h3>
      <div className="bg-white rounded-lg overflow-hidden w-full">
        {content.image && (
          <div className="relative">
            <img src={content.image} alt={content.title} className="w-full h-[119px] object-cover rounded-t-lg" />
            {content.badges && (
              <div className="absolute top-[6px] left-[7px] flex gap-2">
                {content.badges.map((badge) => (
                  <div key={badge} className="inline-flex h-5 px-2 justify-center items-center rounded bg-white">
                    <span className="text-[10px] font-bold text-foreground leading-[12.698px]">{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="p-2 space-y-2">
          {content.paragraphs.map((p, i) => (
            <p key={i} className="text-[12px] text-foreground">
              {p.bold && <span className="font-bold">{p.bold}</span>}
              {p.text}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export function FeatureGuideSection() {
  const [selectedFilter, setSelectedFilter] = useState('Display type');
  const featureFiltersScrollRef = useDragScroll();
  const displayCarouselScrollRef = useDragScroll();

  return (
    <div className="px-3 py-4 border-t-8 border-[var(--ld-semantic-color-fill-subtle)] bg-[var(--ld-semantic-color-fill-accent-blue-subtle)]">
      <div className="mb-3">
        <h2 className="text-[16px] font-bold text-foreground mb-2">Features to consider when shopping for TVs</h2>
        <div ref={featureFiltersScrollRef} className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {FEATURE_FILTERS.map((filter) => (
            <FilterChip
              key={filter}
              selected={selectedFilter === filter}
              onSelectedChange={() => setSelectedFilter(filter)}
            >
              {filter}
            </FilterChip>
          ))}
        </div>
      </div>

      <div ref={displayCarouselScrollRef} className="flex gap-2 items-start overflow-x-auto scrollbar-hide pb-2">
        <div className="flex flex-col justify-start items-start bg-white flex-shrink-0 self-stretch rounded-2xl overflow-hidden gap-4 p-4" style={{ width: '300px' }}>
          <FeatureCard filter={selectedFilter} />
        </div>
      </div>
    </div>
  );
}
