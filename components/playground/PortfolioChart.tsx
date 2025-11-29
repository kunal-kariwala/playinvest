'use client';

import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp } from 'lucide-react';

export function PortfolioChart() {
  const { language, playground } = useAppStore();

  const chartData = playground.history.map((entry, index) => ({
    step: index,
    value: Math.round(entry.portfolioValue),
    label: `${language === 'en' ? 'Step' : 'चरण'} ${index}`,
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg bg-white p-3 shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-900">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-2 border-emerald-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          {t('playground.history', language)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 1 ? (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis 
                  dataKey="step" 
                  tick={{ fontSize: 10 }} 
                  tickFormatter={(value) => `${value}`}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 10 }} 
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin - 5000', 'dataMax + 5000']}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine 
                  y={100000} 
                  stroke="#94a3b8" 
                  strokeDasharray="3 3" 
                  label={{ value: language === 'en' ? 'Start' : 'शुरुआत', fontSize: 10, fill: '#94a3b8' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center">
            <p className="text-sm text-gray-400 text-center">
              {language === 'en' 
                ? 'Start trading to see your portfolio history'
                : 'अपना पोर्टफोलियो इतिहास देखने के लिए ट्रेडिंग शुरू करें'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

