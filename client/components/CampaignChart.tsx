import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function CampaignChart() {
  const chartData = [
    { date: 'Dec 30', impressions: 15234000, clicks: 121000, cpc: 1.42 },
    { date: 'Jan 6', impressions: 16123000, clicks: 127500, cpc: 1.39 },
    { date: 'Jan 13', impressions: 16234000, clicks: 129800, cpc: 1.38 },
    { date: 'Jan 20', impressions: 17456000, clicks: 135200, cpc: 1.41 },
    { date: 'Jan 27', impressions: 17823000, clicks: 138900, cpc: 1.37 },
    { date: 'Feb 3', impressions: 18234000, clicks: 142100, cpc: 1.36 },
    { date: 'Feb 10', impressions: 18456000, clicks: 143800, cpc: 1.35 },
    { date: 'Feb 17', impressions: 18567000, clicks: 145200, cpc: 1.34 },
    { date: 'Feb 24', impressions: 18689000, clicks: 146700, cpc: 1.35 },
    { date: 'Mar 3', impressions: 18734000, clicks: 147200, cpc: 1.36 },
    { date: 'Mar 10', impressions: 18689154, clicks: 148782, cpc: 1.36 },
    { date: 'Mar 17', impressions: 18712000, clicks: 148300, cpc: 1.37 },
    { date: 'Mar 24', impressions: 18745000, clicks: 148500, cpc: 1.36 },
    { date: 'Mar 31', impressions: 18689154, clicks: 148782, cpc: 1.36 }
  ];

  return (
    <div className="flex flex-col items-start w-full bg-white">
      {/* Chart Container */}
      <div className="w-full h-[200px] bg-white px-4 pt-4 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="#E3E4E5" 
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#2E2F32' }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis hide />
            
            {/* Impressions - Purple */}
            <Line 
              type="monotone" 
              dataKey="impressions" 
              stroke="#993EF4" 
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
            
            {/* Clicks - Cyan */}
            <Line 
              type="monotone" 
              dataKey="clicks" 
              stroke="#4DBDF5" 
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
            
            {/* CPC - Blue (scaled up for visibility) */}
            <Line 
              type="monotone" 
              dataKey={(data) => data.cpc * 100000} 
              stroke="#0053E2" 
              strokeWidth={3}
              dot={false}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
