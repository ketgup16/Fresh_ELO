import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function CarouselExample() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Basic Carousel
        </h3>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    border: '1px solid var(--ld-semantic-color-border-moderate)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)'
                  }}>
                    <span style={{
                      fontSize: '48px',
                      fontWeight: '700',
                      color: 'var(--ld-semantic-color-text-primary)'
                    }}>
                      {index + 1}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'var(--ld-semantic-font-family-sans)',
          color: 'var(--ld-semantic-color-text-primary)',
          marginBottom: '16px'
        }}>
          Multiple Items
        </h3>
        <Carousel className="w-full max-w-2xl mx-auto">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '120px',
                    border: '1px solid var(--ld-semantic-color-border-moderate)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--ld-semantic-color-fill-surface-primary)'
                  }}>
                    <span style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: 'var(--ld-semantic-color-text-primary)'
                    }}>
                      {index + 1}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
}
