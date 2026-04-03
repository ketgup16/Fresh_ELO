import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Camera, Microphone, ChevronLeft, Clock, ArrowUpLeft } from "@/components/icons";
import { IconButton } from "@/components/ui/IconButton";
import { HighlightText } from "@/components/ui/HighlightText";
import { allSuggestions as sharedSuggestions } from "@/components/walmart/searchData";
import { IOSKeyboard } from "./IOSKeyboard";
import { NativeStatusBar } from "@/components/walmart/NativeStatusBar";
import { useLayoutSettings } from "@/contexts/LayoutSettingsContext";
import navStyles from "@/components/walmart/MobileTopNav.module.css";

interface SearchTypeaheadModalProps {
  onClose: () => void;
  onCameraClick: () => void;
}

export function SearchTypeaheadModal({ onClose, onCameraClick }: SearchTypeaheadModalProps) {
  const navigate = useNavigate();
  const { platform } = useLayoutSettings();
  const isNative = platform === 'ios' || platform === 'android';
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const [recentSearches, setRecentSearches] = useState(['whole grain cereal', 'frosted flakes', 'cheerios', 'granola', 'oatmeal']);

  // Hide bottom nav while search modal is open
  useEffect(() => {
    document.body.classList.add('search-modal-open');
    return () => document.body.classList.remove('search-modal-open');
  }, []);

  const allSuggestions = sharedSuggestions;
  const filteredSuggestions = searchQuery
    ? allSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] animate-fade-in flex flex-col">
      {/* iOS/Android Status Bar — always white in the search modal */}
      {isNative && (
        <div style={{ backgroundColor: 'var(--ld-semantic-color-surface, #fff)' }}>
          <NativeStatusBar
            platform={platform as 'ios' | 'android'}
            color='var(--ld-semantic-color-text, #2e2f32)'
          />
        </div>
      )}
      {/* Inversed native header — white bg, dark text, shown when search modal is open */}
      {isNative && (
        <div className={navStyles.nativeHeaderInverse}>
          <span className={navStyles.greetingInverse}>Hi, Emilia</span>
          <div className={navStyles.sparkCenter}>
            <img
              src="https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg"
              alt="Walmart"
              className={navStyles.sparkImg}
            />
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-3 border-b border-border flex-shrink-0">
        <button onClick={handleClose} className="flex-shrink-0">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1 rainbow-border animate-search-bar-expand">
          <div className="bg-white rounded-full px-3 py-2 flex items-center gap-2 h-[42px] w-full">
            <div className="flex items-center gap-1 flex-1">
              {isSearchFocused && !searchQuery && (
                <div className="w-[1.5px] h-5 bg-primary animate-pulse"></div>
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="What are you looking for?"
                autoFocus
                className="flex-1 outline-none text-foreground text-[16px] placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <div className="flex gap-1 flex-shrink-0">
              {searchQuery ? (
                <IconButton
                  aria-label="Clear search"
                  variant="secondary"
                  size="medium"
                  onClick={() => setSearchQuery('')}
                >
                  <X />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    aria-label="Camera search"
                    variant="secondary"
                    size="medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCameraClick();
                    }}
                  >
                    <Camera />
                  </IconButton>
                  <IconButton
                    aria-label="Voice search"
                    variant="secondary"
                    size="medium"
                  >
                    <Microphone />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content — pb-[335px] on mobile so content isn't hidden behind the fixed keyboard; no offset on lg+ */}
      <div className="overflow-y-auto flex-1 pb-[335px] lg:pb-0">
        {searchQuery && filteredSuggestions.length > 0 ? (
          <div className="px-4 py-4">
            <div className="flex flex-col">
              {filteredSuggestions.map((suggestion, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      navigate(`/walmart/loading?q=${encodeURIComponent(suggestion)}`);
                    }}
                    className="flex items-center gap-2 py-2 w-full"
                  >
                    <div className="flex-1 text-left text-[14px] text-foreground leading-[20px] overflow-hidden text-ellipsis whitespace-nowrap">
                      <HighlightText text={suggestion} query={searchQuery} />
                    </div>
                    <ArrowUpLeft className="w-4 h-4 text-foreground flex-shrink-0" />
                  </button>
                  {index < filteredSuggestions.length - 1 && (
                    <div className="h-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="px-3 py-4">
              <h2 className="text-[16px] font-bold text-foreground mb-2">Keep shopping for</h2>
              <div className="flex gap-2">
                <div className="flex flex-col items-center w-[72px]">
                  <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/c6cf4ae2ee7df7d73a8d423c511ab68367c47e76?width=120" alt="Snacks" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] text-foreground text-center">Snacks</span>
                </div>
                <div className="flex flex-col items-center w-[72px]">
                  <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/9845889b1dc0169056690b16fab6c2a890ddd7de?width=120" alt="Sunscreen" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] text-foreground text-center">Sunscreen</span>
                </div>
                <div className="flex flex-col items-center w-[72px]">
                  <div className="w-[72px] h-[72px] rounded-full bg-gray-100 mb-1 overflow-hidden">
                    <img src="https://api.builder.io/api/v1/image/assets/TEMP/3ade65abb0fb85923a3106fca9fcba342b749f09?width=120" alt="Women's pants" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[12px] text-foreground text-center">Women's pants</span>
                </div>
              </div>
            </div>

            <div className="px-3 py-4">
              <h2 className="text-[16px] font-bold text-foreground mb-3">Your recent searches</h2>
              <div className="space-y-3">
                {recentSearches.map((search, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-foreground" />
                      <button
                        onClick={() => {
                          setSearchQuery(search);
                          const updatedSearches = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
                          setRecentSearches(updatedSearches);
                        }}
                        className="flex-1 text-[14px] text-foreground text-left"
                      >
                        {search}
                      </button>
                      <IconButton
                        aria-label="Remove recent search"
                        variant="ghost"
                        size="small"
                        onClick={() => {
                          setRecentSearches(recentSearches.filter((_, i) => i !== index));
                        }}
                      >
                        <X />
                      </IconButton>
                    </div>
                    {index < recentSearches.length - 1 && <div className="h-px bg-border mt-3" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="px-3 py-4 border-b border-border">
              <h2 className="text-[16px] font-bold text-foreground mb-3">Trending</h2>
              <div className="flex flex-wrap gap-2">
                {["valentine's gift", 'teddy bear', "valentine's crafts"].map((trend, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(trend);
                      if (!recentSearches.includes(trend)) {
                        setRecentSearches([trend, ...recentSearches].slice(0, 5));
                      }
                    }}
                    className="px-4 py-2 rounded-full border border-muted-foreground bg-white text-[14px] text-black active:bg-gray-100 transition-colors"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-3 py-4 border-b border-border pb-8">
              <h2 className="text-[16px] font-bold text-foreground mb-3">Your frequent searches</h2>
              <div className="flex flex-wrap gap-2">
                {['makeup remover wipes', 'banana', 'dog food'].map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(search);
                      if (!recentSearches.includes(search)) {
                        setRecentSearches([search, ...recentSearches].slice(0, 5));
                      }
                    }}
                    className="px-4 py-2 rounded-full border border-muted-foreground bg-white text-[14px] text-black active:bg-gray-100 transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <IOSKeyboard
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredSuggestions={filteredSuggestions}
        recentSearches={recentSearches}
        setRecentSearches={setRecentSearches}
      />
    </div>
  );
}
