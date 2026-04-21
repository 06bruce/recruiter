'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'

const pieData = [
  { name: 'Terpenuhi', value: 160 },
  { name: 'Belum terpenuhi', value: 140 },
]

const COLORS = ['#3b82f6', '#ef4444']

export function PieChartComponent() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Aktivitas Departemen</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            label={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">Total</p>
        <p className="text-3xl font-bold text-gray-900">160</p>
        <p className="text-gray-600 text-sm">Karyawan</p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Belum terpenuhi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Terpenuhi</span>
        </div>
      </div>
    </div>
  )
}
