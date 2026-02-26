import { useNavigate } from "react-router-dom";
import { ChevronLeft, Phone, Clock, Map } from "@/components/icons";
import { BottomNav } from "@/components/walmart/BottomNav";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function PharmacyDelivery() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'shop' | 'heart' | 'user'>('shop');

  return (
    <div className="min-h-screen bg-white font-sans max-w-[430px] mx-auto relative">
      <div className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="tertiary"
            size="small"
            onClick={() => navigate('/walmart')}
            UNSAFE_className="flex-shrink-0 !p-0 !h-auto"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-[20px] font-bold text-foreground">Pharmacy Delivery</h1>
        </div>
      </div>

      <div className="px-4 pt-6 pb-32">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#00A862] to-[#007A47] rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-[28px] font-bold mb-2">Pharmacy</h2>
                <p className="text-[16px] opacity-90">Fast, reliable prescription delivery</p>
              </div>
            </div>
            <Button variant="secondary" size="medium" UNSAFE_className="bg-white !text-[#00A862] hover:bg-gray-50">
              Transfer prescription
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F0FFF9] rounded-lg p-3 text-center">
              <Clock className="w-6 h-6 text-[#00A862] mx-auto mb-2" />
              <p className="text-[12px] font-semibold text-foreground">Same-day</p>
              <p className="text-[10px] text-muted-foreground">delivery</p>
            </div>
            <div className="bg-[#F0FFF9] rounded-lg p-3 text-center">
              <Map className="w-6 h-6 text-[#00A862] mx-auto mb-2" />
              <p className="text-[12px] font-semibold text-foreground">Local</p>
              <p className="text-[10px] text-muted-foreground">pharmacy</p>
            </div>
            <div className="bg-[#F0FFF9] rounded-lg p-3 text-center">
              <Phone className="w-6 h-6 text-[#00A862] mx-auto mb-2" />
              <p className="text-[12px] font-semibold text-foreground">24/7</p>
              <p className="text-[10px] text-muted-foreground">support</p>
            </div>
          </div>

          <div>
            <h3 className="text-[18px] font-bold text-foreground mb-3">Services</h3>
            <div className="space-y-2">
              {[
                { title: 'Refill prescriptions', desc: 'Quick and easy refills' },
                { title: 'New prescriptions', desc: 'Transfer or start new' },
                { title: 'Over-the-counter', desc: 'Health & wellness products' },
                { title: 'Immunizations', desc: 'Flu shots & vaccines' },
                { title: 'Health screenings', desc: 'Check-ups and tests' }
              ].map((service, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:bg-[#F0FFF9] transition-colors"
                >
                  <div className="text-left flex-1">
                    <h4 className="text-[16px] font-semibold text-foreground">{service.title}</h4>
                    <p className="text-[14px] text-muted-foreground">{service.desc}</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[var(--ld-semantic-color-fill-brand-subtle,#F5F8FF)] rounded-lg p-4">
            <h3 className="text-[16px] font-bold text-foreground mb-2">Need help?</h3>
            <p className="text-[14px] text-muted-foreground mb-3">Our pharmacy team is here to assist you</p>
            <div className="flex gap-2">
              <Button variant="primary" size="medium" UNSAFE_className="flex-1">Call pharmacy</Button>
              <Button variant="secondary" size="medium" UNSAFE_className="flex-1">Chat now</Button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
