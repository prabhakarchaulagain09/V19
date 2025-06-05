"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomAreaChart } from "./charts/area-chart"
import { CustomBarChart } from "./charts/bar-chart"
import { CustomLineChart } from "./charts/line-chart"
import { CustomDonutChart } from "./charts/donut-chart"
import {
  Download,
  CalendarIcon,
  Package,
  AlertTriangle,
  Activity,
  BarChart3,
  Share,
  RefreshCw,
  CheckCircle,
  TrendingUp,
  Thermometer,
  Droplets,
  Zap,
  DollarSign,
  Target,
  Brain,
} from "lucide-react"
import { format } from "date-fns"

interface DailyReport {
  date: string
  summary: {
    totalProducts: number
    newProducts: number
    activitiesCount: number
    alertsGenerated: number
    qualityChecks: number
    treatmentsApplied: number
    revenueGenerated: number
    costSavings: number
  }
  storage: {
    totalCapacity: number
    utilizationPercentage: number
    zoneUtilization: Array<{
      zone: string
      utilization: number
      status: string
      capacity: number
      products: number
    }>
  }
  quality: {
    excellentProducts: number
    goodProducts: number
    fairProducts: number
    poorProducts: number
    averageQualityScore: number
    qualityTrends: Array<{
      hour: string
      score: number
    }>
  }
  environmental: {
    averageTemperature: number
    averageHumidity: number
    optimalConditions: number
    alertConditions: number
    hourlyData: Array<{
      time: string
      temperature: number
      humidity: number
    }>
  }
  activities: Array<{
    type: string
    count: number
    description: string
    efficiency: number
    costImpact: number
  }>
  alerts: Array<{
    type: string
    severity: string
    count: number
    resolved: number
    avgResolutionTime: number
  }>
  mlInsights: {
    predictionsGenerated: number
    averageConfidence: number
    recommendationsImplemented: number
    valueSaved: number
    modelPerformance: Array<{
      model: string
      accuracy: number
      predictions: number
    }>
  }
  financialMetrics: {
    dailyRevenue: number
    operatingCosts: number
    profitMargin: number
    wasteReduction: number
    energySavings: number
    revenueByCategory: Array<{
      category: string
      revenue: number
      percentage: number
    }>
  }
  recommendations: Array<{
    priority: "high" | "medium" | "low"
    category: string
    title: string
    description: string
    expectedImpact: string
    timeframe: string
  }>
}

export default function DailyReports() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [reportType, setReportType] = useState("daily")
  const [report, setReport] = useState<DailyReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [generatingReport, setGeneratingReport] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const generateReport = async (date: Date, type: string) => {
    setLoading(true)
    setGeneratingReport(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockReport: DailyReport = {
      date: format(date, "yyyy-MM-dd"),
      summary: {
        totalProducts: 2847,
        newProducts: 12,
        activitiesCount: 45,
        alertsGenerated: 8,
        qualityChecks: 15,
        treatmentsApplied: 3,
        revenueGenerated: 245000,
        costSavings: 18500,
      },
      storage: {
        totalCapacity: 125000,
        utilizationPercentage: 83,
        zoneUtilization: [
          { zone: "Zone A - Grains", utilization: 92, status: "high", capacity: 50000, products: 15 },
          { zone: "Zone B - Cereals", utilization: 78, status: "optimal", capacity: 35000, products: 12 },
          { zone: "Zone C - Pulses", utilization: 85, status: "high", capacity: 25000, products: 8 },
          { zone: "Zone D - Seeds", utilization: 65, status: "optimal", capacity: 15000, products: 6 },
        ],
      },
      quality: {
        excellentProducts: 1200,
        goodProducts: 1000,
        fairProducts: 500,
        poorProducts: 147,
        averageQualityScore: 87.5,
        qualityTrends: [
          { hour: "00:00", score: 85 },
          { hour: "04:00", score: 87 },
          { hour: "08:00", score: 89 },
          { hour: "12:00", score: 91 },
          { hour: "16:00", score: 88 },
          { hour: "20:00", score: 86 },
        ],
      },
      environmental: {
        averageTemperature: 18.5,
        averageHumidity: 45.2,
        optimalConditions: 75,
        alertConditions: 25,
        hourlyData: [
          { time: "00:00", temperature: 18.2, humidity: 45 },
          { time: "04:00", temperature: 17.8, humidity: 43 },
          { time: "08:00", temperature: 18.5, humidity: 47 },
          { time: "12:00", temperature: 19.2, humidity: 52 },
          { time: "16:00", temperature: 18.9, humidity: 49 },
          { time: "20:00", temperature: 18.3, humidity: 46 },
        ],
      },
      activities: [
        {
          type: "Quality Checks",
          count: 15,
          description: "Routine quality inspections",
          efficiency: 94,
          costImpact: 2500,
        },
        {
          type: "Product Movement",
          count: 12,
          description: "Products relocated for optimization",
          efficiency: 88,
          costImpact: 1800,
        },
        {
          type: "Treatments",
          count: 3,
          description: "Pest control treatments applied",
          efficiency: 96,
          costImpact: 4200,
        },
        {
          type: "Environmental Adjustments",
          count: 8,
          description: "HVAC and humidity controls",
          efficiency: 91,
          costImpact: 3100,
        },
        {
          type: "Maintenance",
          count: 7,
          description: "Equipment maintenance and calibration",
          efficiency: 89,
          costImpact: 2800,
        },
      ],
      alerts: [
        { type: "Environmental", severity: "high", count: 3, resolved: 2, avgResolutionTime: 45 },
        { type: "Quality Risk", severity: "medium", count: 2, resolved: 1, avgResolutionTime: 120 },
        { type: "Expiry Warning", severity: "low", count: 3, resolved: 3, avgResolutionTime: 30 },
      ],
      mlInsights: {
        predictionsGenerated: 24,
        averageConfidence: 91.2,
        recommendationsImplemented: 8,
        valueSaved: 240000,
        modelPerformance: [
          { model: "Waste Prediction", accuracy: 94.2, predictions: 8 },
          { model: "Quality Forecasting", accuracy: 91.8, predictions: 6 },
          { model: "Treatment Optimization", accuracy: 96.1, predictions: 5 },
          { model: "Market Intelligence", accuracy: 87.5, predictions: 3 },
          { model: "Energy Efficiency", accuracy: 93.7, predictions: 2 },
        ],
      },
      financialMetrics: {
        dailyRevenue: 245000,
        operatingCosts: 185000,
        profitMargin: 24.5,
        wasteReduction: 15.2,
        energySavings: 12.8,
        revenueByCategory: [
          { category: "Premium Vegetables", revenue: 98000, percentage: 40 },
          { category: "Organic Produce", revenue: 73500, percentage: 30 },
          { category: "Seasonal Items", revenue: 49000, percentage: 20 },
          { category: "Processed Goods", revenue: 24500, percentage: 10 },
        ],
      },
      recommendations: [
        {
          priority: "high",
          category: "Environmental",
          title: "Optimize Zone D Temperature",
          description: "Reduce temperature by 2°C to improve energy efficiency and product quality",
          expectedImpact: "₹8,500 monthly savings",
          timeframe: "Immediate",
        },
        {
          priority: "high",
          category: "Quality",
          title: "Implement Predictive Quality Monitoring",
          description: "Deploy AI-powered quality sensors in high-risk zones",
          expectedImpact: "25% reduction in quality degradation",
          timeframe: "Next 7 days",
        },
        {
          priority: "medium",
          category: "Operations",
          title: "Automate Product Rotation",
          description: "Implement automated FIFO system for better inventory management",
          expectedImpact: "₹12,000 monthly efficiency gains",
          timeframe: "Next 2 weeks",
        },
        {
          priority: "medium",
          category: "Financial",
          title: "Optimize Pricing Strategy",
          description: "Adjust pricing based on quality scores and market demand",
          expectedImpact: "8% revenue increase",
          timeframe: "Next month",
        },
        {
          priority: "low",
          category: "Maintenance",
          title: "Schedule Preventive Maintenance",
          description: "Plan quarterly maintenance for all HVAC systems",
          expectedImpact: "Prevent ₹25,000 emergency repairs",
          timeframe: "Next quarter",
        },
      ],
    }

    setReport(mockReport)
    setLoading(false)
    setGeneratingReport(false)
  }

  useEffect(() => {
    generateReport(selectedDate, reportType)
  }, [selectedDate, reportType])

  const downloadReport = () => {
    const reportData = JSON.stringify(report, null, 2)
    const blob = new Blob([reportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `veggie-vitals-report-${format(selectedDate, "yyyy-MM-dd")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: `Veggie Vitals Report - ${format(selectedDate, "MMM dd, yyyy")}`,
        text: "Daily vegetable storage management report from Veggie Vitals",
        url: window.location.href,
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Advanced Analytics & Reports</h2>
              <p className="text-green-100 text-lg">Comprehensive insights and performance analytics</p>
            </div>

            <div className="flex items-center gap-3">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" className="gap-2 bg-white/20 hover:bg-white/30 border-white/30">
                    <CalendarIcon className="w-4 h-4" />
                    {format(selectedDate, "MMM dd, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Button
                onClick={downloadReport}
                variant="secondary"
                className="gap-2 bg-white/20 hover:bg-white/30 border-white/30"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>

              <Button onClick={shareReport} className="gap-2 bg-white text-green-600 hover:bg-white/90">
                <Share className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Report Generation Status */}
      {generatingReport && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
              <div>
                <h3 className="font-semibold text-blue-900">Generating Advanced Report</h3>
                <p className="text-blue-700">Analyzing data and compiling comprehensive insights...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {report && !generatingReport && (
        <>
          {/* Enhanced Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-hover bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Package className="w-8 h-8 text-blue-600" />
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    +{report.summary.newProducts}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{report.summary.totalProducts}</div>
                <p className="text-blue-700 text-sm">Total Products</p>
                <div className="mt-2 text-xs text-blue-600">
                  Revenue: ₹{(report.summary.revenueGenerated / 1000).toFixed(0)}K
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Activity className="w-8 h-8 text-green-600" />
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">{report.summary.activitiesCount}</div>
                <p className="text-green-700 text-sm">Activities Completed</p>
                <div className="mt-2 text-xs text-green-600">Efficiency: 91.2%</div>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    {report.alerts.reduce((sum, alert) => sum + alert.resolved, 0)} Resolved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">{report.summary.alertsGenerated}</div>
                <p className="text-orange-700 text-sm">Alerts Generated</p>
                <div className="mt-2 text-xs text-orange-600">Avg Resolution: 65 min</div>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    {report.financialMetrics.profitMargin}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  ₹{(report.financialMetrics.dailyRevenue / 1000).toFixed(0)}K
                </div>
                <p className="text-purple-700 text-sm">Daily Revenue</p>
                <div className="mt-2 text-xs text-purple-600">
                  Savings: ₹{(report.summary.costSavings / 1000).toFixed(0)}K
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Tabbed Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="storage" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Storage
              </TabsTrigger>
              <TabsTrigger value="quality" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Quality
              </TabsTrigger>
              <TabsTrigger value="environmental" className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                Environment
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Financial
              </TabsTrigger>
              <TabsTrigger value="ai-insights" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Insights
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Storage Utilization */}
                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Storage Utilization Overview</CardTitle>
                    <CardDescription>Zone-wise capacity and utilization analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomBarChart
                      data={report.storage.zoneUtilization.map((zone) => ({
                        name: zone.zone.split(" - ")[1] || zone.zone,
                        value: zone.utilization,
                      }))}
                      color="#3b82f6"
                      height={280}
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {report.storage.zoneUtilization.map((zone, index) => (
                        <div key={index} className="p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{zone.zone.split(" - ")[0]}</span>
                            <Badge variant={zone.status === "optimal" ? "default" : "secondary"}>
                              {zone.utilization}%
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            {zone.products} products • {(zone.capacity / 1000).toFixed(0)}K kg capacity
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activities Performance */}
                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Activities Performance</CardTitle>
                    <CardDescription>Efficiency and cost impact analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomAreaChart
                      data={report.activities.map((activity) => ({
                        name: activity.type.split(" ")[0],
                        value: activity.efficiency,
                        value2: activity.count * 5,
                      }))}
                      color="#10b981"
                      color2="#f59e0b"
                      height={280}
                    />
                    <div className="space-y-3 mt-4">
                      {report.activities.slice(0, 3).map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                          <div>
                            <p className="font-medium text-green-900">{activity.type}</p>
                            <p className="text-sm text-green-700">{activity.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{activity.efficiency}%</div>
                            <div className="text-xs text-green-600">
                              ₹{(activity.costImpact / 1000).toFixed(1)}K impact
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Storage Tab */}
            <TabsContent value="storage" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Detailed Storage Analysis</CardTitle>
                    <CardDescription>Comprehensive zone utilization metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-medium">Overall Utilization</span>
                        <span className="text-2xl font-bold">{report.storage.utilizationPercentage}%</span>
                      </div>
                      <Progress value={report.storage.utilizationPercentage} className="h-3" />
                    </div>

                    <div className="space-y-4">
                      {report.storage.zoneUtilization.map((zone, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">{zone.zone}</h3>
                            <Badge variant={zone.status === "optimal" ? "default" : "secondary"}>{zone.status}</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Utilization:</span>
                              <p className="font-bold text-lg">{zone.utilization}%</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Products:</span>
                              <p className="font-bold text-lg">{zone.products}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Capacity:</span>
                              <p className="font-bold text-lg">{(zone.capacity / 1000).toFixed(0)}K kg</p>
                            </div>
                          </div>
                          <Progress value={zone.utilization} className="h-2 mt-3" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Storage Efficiency Trends</CardTitle>
                    <CardDescription>Historical utilization patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomLineChart
                      data={[
                        { name: "Week 1", value: 78 },
                        { name: "Week 2", value: 82 },
                        { name: "Week 3", value: 85 },
                        { name: "Week 4", value: 83 },
                        { name: "Current", value: report.storage.utilizationPercentage },
                      ]}
                      color="#8b5cf6"
                      height={280}
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 rounded-lg bg-purple-50">
                        <div className="text-2xl font-bold text-purple-600">+5.2%</div>
                        <p className="text-purple-700 text-sm">Efficiency Improvement</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50">
                        <div className="text-2xl font-bold text-blue-600">₹12.5K</div>
                        <p className="text-blue-700 text-sm">Monthly Savings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Quality Tab */}
            <TabsContent value="quality" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Quality Distribution</CardTitle>
                    <CardDescription>Product quality breakdown and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomDonutChart
                      data={[
                        { name: "Excellent", value: report.quality.excellentProducts, color: "#10b981" },
                        { name: "Good", value: report.quality.goodProducts, color: "#3b82f6" },
                        { name: "Fair", value: report.quality.fairProducts, color: "#f59e0b" },
                        { name: "Poor", value: report.quality.poorProducts, color: "#ef4444" },
                      ]}
                      height={280}
                    />
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-900">{report.quality.averageQualityScore}%</div>
                        <p className="text-blue-700">Average Quality Score</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">+2.3% from yesterday</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Quality Trends</CardTitle>
                    <CardDescription>24-hour quality score monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomLineChart
                      data={report.quality.qualityTrends.map((trend) => ({
                        name: trend.hour,
                        value: trend.score,
                      }))}
                      color="#10b981"
                      height={280}
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 rounded-lg bg-green-50">
                        <div className="text-2xl font-bold text-green-600">91</div>
                        <p className="text-green-700 text-sm">Peak Quality Score</p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-50">
                        <div className="text-2xl font-bold text-orange-600">85</div>
                        <p className="text-orange-700 text-sm">Minimum Score</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Environmental Tab */}
            <TabsContent value="environmental" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Environmental Monitoring</CardTitle>
                    <CardDescription>24-hour temperature and humidity tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomAreaChart
                      data={report.environmental.hourlyData.map((data) => ({
                        name: data.time,
                        value: data.temperature,
                        value2: data.humidity,
                      }))}
                      color="#ef4444"
                      color2="#3b82f6"
                      height={280}
                    />
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-gray-600">Temperature (°C)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Humidity (%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Environmental Performance</CardTitle>
                    <CardDescription>Optimal conditions and alerts summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-xl bg-red-50">
                          <Thermometer className="w-8 h-8 text-red-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-red-600">
                            {report.environmental.averageTemperature}°C
                          </div>
                          <p className="text-red-700 text-sm">Avg Temperature</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-blue-50">
                          <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-blue-600">
                            {report.environmental.averageHumidity}%
                          </div>
                          <p className="text-blue-700 text-sm">Avg Humidity</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Optimal Conditions</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{report.environmental.optimalConditions}%</span>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <Progress value={report.environmental.optimalConditions} className="h-2" />

                        <div className="flex items-center justify-between">
                          <span className="font-medium">Alert Conditions</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{report.environmental.alertConditions}%</span>
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          </div>
                        </div>
                        <Progress value={report.environmental.alertConditions} className="h-2 bg-red-100" />
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-900">Energy Efficiency</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Current settings are optimized for {report.financialMetrics.energySavings}% energy savings
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Revenue Breakdown</CardTitle>
                    <CardDescription>Daily financial performance by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomBarChart
                      data={report.financialMetrics.revenueByCategory.map((cat) => ({
                        name: cat.category.split(" ")[0],
                        value: cat.revenue / 1000,
                      }))}
                      color="#10b981"
                      height={280}
                    />
                    <div className="space-y-3 mt-4">
                      {report.financialMetrics.revenueByCategory.map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                          <span className="font-medium text-green-900">{category.category}</span>
                          <div className="text-right">
                            <div className="font-bold text-green-600">₹{(category.revenue / 1000).toFixed(0)}K</div>
                            <div className="text-sm text-green-600">{category.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Financial Metrics</CardTitle>
                    <CardDescription>Profitability and cost analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-green-50">
                          <div className="text-2xl font-bold text-green-600">
                            ₹{(report.financialMetrics.dailyRevenue / 1000).toFixed(0)}K
                          </div>
                          <p className="text-green-700 text-sm">Daily Revenue</p>
                        </div>
                        <div className="p-4 rounded-xl bg-red-50">
                          <div className="text-2xl font-bold text-red-600">
                            ₹{(report.financialMetrics.operatingCosts / 1000).toFixed(0)}K
                          </div>
                          <p className="text-red-700 text-sm">Operating Costs</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            {report.financialMetrics.profitMargin}%
                          </div>
                          <p className="text-blue-700">Profit Margin</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-purple-50">
                          <div className="text-xl font-bold text-purple-600">
                            {report.financialMetrics.wasteReduction}%
                          </div>
                          <p className="text-purple-700 text-sm">Waste Reduction</p>
                        </div>
                        <div className="p-4 rounded-xl bg-orange-50">
                          <div className="text-xl font-bold text-orange-600">
                            {report.financialMetrics.energySavings}%
                          </div>
                          <p className="text-orange-700 text-sm">Energy Savings</p>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-900">Net Profit</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          ₹
                          {(
                            (report.financialMetrics.dailyRevenue - report.financialMetrics.operatingCosts) /
                            1000
                          ).toFixed(0)}
                          K
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="ai-insights" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">ML Model Performance</CardTitle>
                    <CardDescription>AI prediction accuracy and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomBarChart
                      data={report.mlInsights.modelPerformance.map((model) => ({
                        name: model.model.split(" ")[0],
                        value: model.accuracy,
                      }))}
                      color="#8b5cf6"
                      height={280}
                    />
                    <div className="space-y-3 mt-4">
                      {report.mlInsights.modelPerformance.map((model, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                          <span className="font-medium text-purple-900">{model.model}</span>
                          <div className="text-right">
                            <div className="font-bold text-purple-600">{model.accuracy}%</div>
                            <div className="text-sm text-purple-600">{model.predictions} predictions</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">AI Impact Summary</CardTitle>
                    <CardDescription>Value generated through AI optimization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-xl bg-blue-50">
                          <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-blue-600">
                            {report.mlInsights.predictionsGenerated}
                          </div>
                          <p className="text-blue-700 text-sm">Predictions Generated</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-green-50">
                          <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-green-600">
                            {report.mlInsights.averageConfidence}%
                          </div>
                          <p className="text-green-700 text-sm">Avg Confidence</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">
                            ₹{(report.mlInsights.valueSaved / 1000).toFixed(0)}K
                          </div>
                          <p className="text-purple-700">Total Value Saved</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                          <span className="font-medium text-green-900">Recommendations Implemented</span>
                          <span className="font-bold text-green-600">
                            {report.mlInsights.recommendationsImplemented}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                          <span className="font-medium text-blue-900">Success Rate</span>
                          <span className="font-bold text-blue-600">94.2%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Recommendations */}
              <Card className="card-hover bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI-Generated Recommendations
                  </CardTitle>
                  <CardDescription>Prioritized action items based on machine learning analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {report.recommendations.map((rec, index) => (
                      <div key={index} className="p-6 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/20">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                rec.priority === "high"
                                  ? "destructive"
                                  : rec.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {rec.priority} priority
                            </Badge>
                            <Badge variant="outline">{rec.category}</Badge>
                          </div>
                          <span className="text-sm text-gray-500">{rec.timeframe}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                        <p className="text-gray-700 mb-3">{rec.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600">
                            Expected Impact: {rec.expectedImpact}
                          </span>
                          <Button size="sm" variant="outline">
                            Implement
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
