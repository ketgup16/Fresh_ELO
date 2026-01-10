// This is the new table structure to replace the flex-based columns in AllCampaigns.tsx
// Replace the section starting at line ~966 "Table Content" through line ~1466

              {/* Table Content */}
              <div ref={tableContainerRef} className="overflow-x-auto bg-white">
                <table className="w-full text-sm relative">
                  <thead className="bg-[#F8F8F8] sticky top-0 z-20">
                    <tr>
                      {/* Checkbox Column */}
                      <th className="p-2 text-left relative sticky left-0 bg-[#F8F8F8] z-30">
                        <input
                          ref={selectAllCheckboxRef}
                          type="checkbox"
                          className="w-5 h-5 rounded border-[#909196] accent-black"
                          checked={isAllSelected()}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      
                      {/* Icon Column */}
                      <th className="p-2 text-left relative bg-[#F8F8F8]"></th>
                      
                      {/* Campaign Name */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Campaign name</div>
                      </th>
                      
                      {/* Campaign Status */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Campaign status</div>
                      </th>
                      
                      {/* Total Budget */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Total budget</div>
                      </th>
                      
                      {/* Daily Budget */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Daily budget</div>
                      </th>
                      
                      {/* Bidding Strategy */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Bidding strategy</div>
                      </th>
                      
                      {/* Bidding Status */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Bidding status</div>
                      </th>
                      
                      {/* Average CPC */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Avg. CPC</div>
                      </th>
                      
                      {/* Spend */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Spend</div>
                      </th>
                      
                      {/* Start Date */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Start date</div>
                      </th>
                      
                      {/* End Date */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">End date</div>
                      </th>
                      
                      {/* Suggested Total Budget */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Suggested total budget</div>
                      </th>
                      
                      {/* Suggested Daily Budget */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Suggested daily budget</div>
                      </th>
                      
                      {/* ROAS Target */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">ROAS target</div>
                      </th>
                      
                      {/* Recommended ROAS Target */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Recommended ROAS target</div>
                      </th>
                      
                      {/* Campaign Type */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Campaign type</div>
                      </th>
                      
                      {/* Avg Cap-out Time */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Avg. cap-out time</div>
                      </th>
                      
                      {/* Est. Missed Impressions */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Est. missed impressions</div>
                      </th>
                      
                      {/* Est. Missed Clicks */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Est. missed clicks</div>
                      </th>
                      
                      {/* Campaign Review Status */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Campaign review status</div>
                      </th>
                      
                      {/* ROAS */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">ROAS</div>
                      </th>
                      
                      {/* Total Attributed Sales */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Total attributed sales</div>
                      </th>
                      
                      {/* Impressions */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Impressions</div>
                      </th>
                      
                      {/* Clicks */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Clicks</div>
                      </th>
                      
                      {/* CTR */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">CTR</div>
                      </th>
                      
                      {/* Total Product Detail Page Views */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Total product detail page views</div>
                      </th>
                      
                      {/* Total Add to Cart */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Total add to cart</div>
                      </th>
                      
                      {/* Conversion Rate */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Conversion rate</div>
                      </th>
                      
                      {/* Orders */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Orders</div>
                      </th>
                      
                      {/* Units Sold */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative">
                        <div className="flex items-center gap-1 whitespace-nowrap">Units sold</div>
                      </th>
                      
                      {/* Actions */}
                      <th className="p-2 text-left font-bold text-[#2E2F32] relative sticky right-0 bg-[#F8F8F8] z-30">
                        <div className="whitespace-nowrap">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign, idx) => (
                      <tr key={campaign.id} className="border-b border-[#E3E4E5] hover:bg-[#F0F5FF]">
                        {/* Checkbox */}
                        <td className="p-2 sticky left-0 bg-white group-hover:bg-[#F0F5FF] z-10">
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-[#909196] accent-black"
                            checked={selectedRows.has(campaign.id)}
                            onChange={(e) => handleSelectRow(campaign.id, e.target.checked)}
                          />
                        </td>
                        
                        {/* Icon */}
                        <td className="p-2 text-center">
                          {(campaign.hasAlertIcon || campaign.hasRecIcon) && (
                            <RecommendationsPopover
                              open={recommendationsOpen && selectedCampaignId === campaign.id}
                              onOpenChange={(open) => {
                                setRecommendationsOpen(open);
                                if (!open) {
                                  setSelectedCampaignId(null);
                                }
                              }}
                              campaignData={campaign}
                              onViewRecommendation={handleViewRecommendation}
                              trigger={
                                <button
                                  onClick={() => handleIconClick(campaign.id)}
                                  className="flex items-center justify-center w-6 h-6 rounded-full hover:opacity-80 transition-opacity cursor-pointer"
                                >
                                  {campaign.hasAlertIcon && (
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#F8D2D3]">
                                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]">
                                        <path d="M10.1322 5.0656C10.4529 5.0656 10.7178 5.30386 10.7598 5.61299L10.7656 5.69893V12.2104C10.7656 12.5602 10.482 12.8438 10.1322 12.8438C9.81161 12.8438 9.54663 12.6055 9.50469 12.2964L9.49891 12.2104V5.69893C9.49891 5.34915 9.78246 5.0656 10.1322 5.0656Z" fill="#A20C00"/>
                                        <path d="M10.1322 15.1989C10.482 15.1989 10.7656 14.9153 10.7656 14.5655C10.7656 14.2158 10.482 13.9322 10.1322 13.9322C9.78246 13.9322 9.49891 14.2158 9.49891 14.5655C9.49891 14.9153 9.78246 15.1989 10.1322 15.1989Z" fill="#A20C00"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18.9989 10.1322C18.9989 5.23534 15.0291 1.26562 10.1322 1.26562C5.23534 1.26562 1.26562 5.23534 1.26562 10.1322C1.26562 15.0291 5.23534 18.9989 10.1322 18.9989C15.0291 18.9989 18.9989 15.0291 18.9989 10.1322ZM2.53228 10.1322C2.53228 5.9349 5.9349 2.53228 10.1322 2.53228C14.3296 2.53228 17.7322 5.9349 17.7322 10.1322C17.7322 14.3296 14.3296 17.7322 10.1322 17.7322C5.9349 17.7322 2.53228 14.3296 2.53228 10.1322Z" fill="#A20C00"/>
                                      </svg>
                                    </div>
                                  )}
                                  {campaign.hasRecIcon && (
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FCE9F5]">
                                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px]">
                                        <path d="M8.42285 6.55273L8.32324 7.1543H13.6016L7.39648 14.2852L8.10938 9.98438L8.20898 9.38281H2.93164L9.13477 2.25293L8.42285 6.55273Z" stroke="#661648" strokeWidth="1.03333"/>
                                      </svg>
                                    </div>
                                  )}
                                </button>
                              }
                            />
                          )}
                        </td>
                        
                        {/* Campaign Name */}
                        <td className="p-2">
                          <a href="#" className="text-sm text-[#2E2F32] underline hover:no-underline">
                            {campaign.name}
                          </a>
                        </td>
                        
                        {/* Campaign Status */}
                        <td className="p-2">
                          <span className={`inline-block px-2 py-0.5 text-xs rounded ${
                            campaign.status === 'Live'
                              ? 'bg-[#EAF3E6] text-[#1D5F02]'
                              : 'bg-[#FFF4E5] text-[#74767C]'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                        
                        {/* Total Budget */}
                        <td className="p-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {campaign.hasWarning && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                                <circle cx="8" cy="8" r="7" stroke="#A20C00" strokeWidth="1.5" fill="none"/>
                                <path d="M8 4.5V8.5" stroke="#A20C00" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="8" cy="11" r="0.75" fill="#A20C00"/>
                              </svg>
                            )}
                            {campaign.hasBolt && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                              </svg>
                            )}
                            <span className="text-sm text-[#2E2F32]">{campaign.totalBudget}</span>
                          </div>
                        </td>
                        
                        {/* Daily Budget */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.dailyBudget}</td>
                        
                        {/* Bidding Strategy */}
                        <td className="p-2 relative">
                          {campaign.biddingIcon && (
                            <button
                              onClick={() => {
                                setSelectedCampaignId(campaign.id);
                                setBiddingModalOpen(true);
                                setRecommendedRoasValue(campaign.recommendedRoasTarget !== '-' ? campaign.recommendedRoasTarget : undefined);
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="7" stroke="#A20C00" strokeWidth="1.5" fill="none"/>
                                <path d="M8 4.5V8.5" stroke="#A20C00" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="8" cy="11" r="0.75" fill="#A20C00"/>
                              </svg>
                            </button>
                          )}
                          {campaign.hasBolt && !campaign.biddingIcon && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-1/2 -translate-y-1/2 flex-shrink-0">
                              <path d="M8.15234 6.33984L8.05566 6.9209H13.1641L7.1582 13.8223L7.84863 9.66016L7.94434 9.0791H2.83594L8.84082 2.17676L8.15234 6.33984Z" stroke="#661648"/>
                            </svg>
                          )}
                          <div className={campaign.biddingIcon || (campaign.hasBolt && !campaign.biddingIcon) ? "pl-5" : ""}>
                            <div className="text-sm text-[#2E2F32]">{campaign.biddingStrategy}</div>
                            <div className="text-xs text-[#74767C]">{campaign.biddingTarget}</div>
                          </div>
                        </td>
                        
                        {/* Bidding Status */}
                        <td className="p-2">
                          <div className="text-sm text-[#2E2F32]">{campaign.biddingStatus}</div>
                          <div className="text-xs text-[#74767C]">{campaign.biddingStatusDate}</div>
                        </td>
                        
                        {/* Average CPC */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.avgCPC}</td>
                        
                        {/* Spend */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.spend}</td>
                        
                        {/* Start Date */}
                        <td className="p-2 text-sm text-[#2E2F32]">{campaign.startDate}</td>
                        
                        {/* End Date */}
                        <td className="p-2 text-sm text-[#2E2F32]">{campaign.endDate}</td>
                        
                        {/* Suggested Total Budget */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.suggestedTotalBudget}</td>
                        
                        {/* Suggested Daily Budget */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.suggestedDailyBudget}</td>
                        
                        {/* ROAS Target */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.roasTarget}</td>
                        
                        {/* Recommended ROAS Target */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.recommendedRoasTarget}</td>
                        
                        {/* Campaign Type */}
                        <td className="p-2 text-sm text-[#2E2F32]">{campaign.campaignType}</td>
                        
                        {/* Avg Cap-out Time */}
                        <td className="p-2 text-sm text-[#2E2F32]">{campaign.avgCapOutTime}</td>
                        
                        {/* Est. Missed Impressions */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.estMissedImpressions}</td>
                        
                        {/* Est. Missed Clicks */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.estMissedClicks}</td>
                        
                        {/* Campaign Review Status */}
                        <td className="p-2 text-sm text-[#2E2F32]">{campaign.campaignReviewStatus}</td>
                        
                        {/* ROAS */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.roas}</td>
                        
                        {/* Total Attributed Sales */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.totalAttributedSales}</td>
                        
                        {/* Impressions */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.impressions}</td>
                        
                        {/* Clicks */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.clicks}</td>
                        
                        {/* CTR */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.ctr}</td>
                        
                        {/* Total Product Detail Page Views */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.totalProductDetailPageViews}</td>
                        
                        {/* Total Add to Cart */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.totalAddToCart}</td>
                        
                        {/* Conversion Rate */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.conversionRate}</td>
                        
                        {/* Orders */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.orders}</td>
                        
                        {/* Units Sold */}
                        <td className="p-2 text-right text-sm text-[#2E2F32]">{campaign.unitsSold}</td>
                        
                        {/* Actions */}
                        <td className="p-2 sticky right-0 bg-white group-hover:bg-[#F0F5FF] z-10">
                          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M9 3.5C9 4.05228 8.55228 4.5 8 4.5C7.44772 4.5 7 4.05228 7 3.5C7 2.94772 7.44772 2.5 8 2.5C8.55228 2.5 9 2.94772 9 3.5Z" fill="#2E2F32"/>
                              <path d="M9 8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8Z" fill="#2E2F32"/>
                              <path d="M9 12.5C9 13.0523 8.55228 13.5 8 13.5C7.44772 13.5 7 13.0523 7 12.5C7 11.9477 7.44772 11.5 8 11.5C8.55228 11.5 9 11.9477 9 12.5Z" fill="#2E2F32"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
