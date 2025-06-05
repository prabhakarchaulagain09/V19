"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CustomAreaChart } from "./charts/area-chart"
import { CustomBarChart } from "./charts/bar-chart"
import { CustomLineChart } from "./charts/line-chart"
import { CustomDonutChart } from "./charts/donut-chart"
import {
  AlertTriangle,
  Package,
  TrendingUp,
  Thermometer,
  Brain,
  TrendingDown,
  WifiOff,
  Wifi,
  Zap,
  Shield,
  Target,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Activity,
  BarChart3,
  PieChart,
} from "lucide-react"

interface DashboardData {
  products: {
    total_products: number
    excellent_products: number
    good_products: number
    fair_products: number
    poor_products: number
    total_quantity_kg: number
    expiring_soon: number
  }
  zones: Array<{
    zone_name: string
    zone_code: string
    capacity_kg: number
    current_utilization_kg: number
    utilization_percentage: string
    product_count: number
  }>
  environmental: Array<{
    zone_name: string
    zone_code: string
    temperature: number
    humidity: number
    status?: string
  }>
  mlInsights: Array<{
    model_type: string
    prediction_value: number
    confidence_score: number
    created_at: string
  }>
  overview: {
    totalCapacity: number
    totalUtilization: number
    overallUtilization: number
    systemHealthScore: number
    totalAlerts: number
  }
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [realtimeData, setRealtimeData] = useState<any>(null)

  // Chart data
  const storageUtilizationData = [
    { name: "Jan", value: 65, value2: 45 },
    { name: "Feb", value: 72, value2: 52 },
    { name: "Mar", value: 78, value2: 58 },
    { name: "Apr", value: 85, value2: 65 },
    { name: "May", value: 83, value2: 68 },
    { name: "Jun", value: 88, value2: 72 },
  ]

  const qualityTrendsData = [
    { name: "Week 1", value: 92 },
    { name: "Week 2", value: 89 },
    { name: "Week 3", value: 94 },
    { name: "Week 4", value: 91 },
    { name: "Week 5", value: 96 },
    { name: "Week 6", value: 93 },
  ]

  const environmentalData = [
    { name: "00:00", value: 18.2, value2: 45 },
    { name: "04:00", value: 17.8, value2: 43 },
    { name: "08:00", value: 18.5, value2: 47 },
    { name: "12:00", value: 19.2, value2: 52 },
    { name: "16:00", value: 18.9, value2: 49 },
    { name: "20:00", value: 18.3, value2: 46 },
  ]

  const productDistributionData = [
    { name: "Excellent", value: 42, color: "#10b981" },
    { name: "Good", value: 35, color: "#3b82f6" },
    { name: "Fair", value: 18, color: "#f59e0b" },
    { name: "Poor", value: 5, color: "#ef4444" },
  ]

  const zoneUtilizationData = [
    { name: "Zone A", value: 92, fill: "#3b82f6" },
    { name: "Zone B", value: 78, fill: "#10b981" },
    { name: "Zone C", value: 85, fill: "#f59e0b" },
    { name: "Zone D", value: 65, fill: "#8b5cf6" },
  ]

  const wasteReductionData = [
    { name: "Jan", value: 12 },
    { name: "Feb", value: 8 },
    { name: "Mar", value: 6 },
    { name: "Apr", value: 4 },
    { name: "May", value: 3 },
    { name: "Jun", value: 2 },
  ]

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockData: DashboardData = {
          products: {
            total_products: 2847,
            excellent_products: 1200,
            good_products: 1000,
            fair_products: 500,
            poor_products: 147,
            total_quantity_kg: 15000,
            expiring_soon: 3,
          },
          zones: [
            {
              zone_name: "Zone A - Grains",
              zone_code: "A",
              capacity_kg: 50000,
              current_utilization_kg: 46000,
              utilization_percentage: "92",
              product_count: 15,
            },
            {
              zone_name: "Zone B - Cereals",
              zone_code: "B",
              capacity_kg: 35000,
              current_utilization_kg: 27300,
              utilization_percentage: "78",
              product_count: 12,
            },
            {
              zone_name: "Zone C - Pulses",
              zone_code: "C",
              capacity_kg: 25000,
              current_utilization_kg: 21250,
              utilization_percentage: "85",
              product_count: 8,
            },
            {
              zone_name: "Zone D - Seeds",
              zone_code: "D",
              capacity_kg: 15000,
              current_utilization_kg: 9750,
              utilization_percentage: "65",
              product_count: 6,
            },
          ],
          environmental: [
            {
              zone_name: "Zone A",
              zone_code: "A",
              temperature: 18.2,
              humidity: 43.5,
              status: "optimal",
            },
            {
              zone_name: "Zone B",
              zone_code: "B",
              temperature: 19.8,
              humidity: 52.0,
              status: "warning",
            },
            {
              zone_name: "Zone C",
              zone_code: "C",
              temperature: 17.5,
              humidity: 41.0,
              status: "optimal",
            },
            {
              zone_name: "Zone D",
              zone_code: "D",
              temperature: 22.0,
              humidity: 58.0,
              status: "alert",
            },
          ],
          mlInsights: [
            {
              model_type: "waste",
              prediction_value: -25.3,
              confidence_score: 92,
              created_at: new Date().toISOString(),
            },
            {
              model_type: "quality",
              prediction_value: 78,
              confidence_score: 87,
              created_at: new Date().toISOString(),
            },
            {
              model_type: "market",
              prediction_value: 12.5,
              confidence_score: 89,
              created_at: new Date().toISOString(),
            },
          ],
          overview: {
            totalCapacity: 125000,
            totalUtilization: 104300,
            overallUtilization: 83,
            systemHealthScore: 92,
            totalAlerts: 23,
          },
        }

        setDashboardData(mockData)
        setConnected(true)
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()

    const interval = setInterval(() => {
      setRealtimeData({
        activities: [
          {
            title: "Grain Shuffling",
            product_name: "Premium Wheat",
            status: "completed",
            performed_at: new Date().toISOString(),
          },
          {
            title: "Pest Treatment",
            product_name: "Basmati Rice",
            status: "in-progress",
            performed_at: new Date().toISOString(),
          },
          {
            title: "Quality Check",
            product_name: "Sweet Corn",
            status: "completed",
            performed_at: new Date().toISOString(),
          },
        ],
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  if (error && !dashboardData) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">Failed to load dashboard data: {error}</AlertDescription>
      </Alert>
    )
  }

  const storageStats = [
    {
      title: "Total Products",
      value: dashboardData?.products?.total_products?.toString() || "0",
      change: "+12%",
      changeType: "positive",
      icon: Package,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      title: "Storage Capacity",
      value: `${dashboardData?.overview?.overallUtilization || 0}%`,
      change: "-3%",
      changeType: "negative",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
    },
    {
      title: "Active Alerts",
      value: dashboardData?.overview?.totalAlerts?.toString() || "0",
      change: "+5",
      changeType: "negative",
      icon: AlertTriangle,
      gradient: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
    },
    {
      title: "System Health",
      value: `${dashboardData?.overview?.systemHealthScore || 0}%`,
      change: "0",
      changeType: "neutral",
      icon: Shield,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Veggie Vitals</h2>
              <p className="text-blue-100 text-lg">Real-time insights into your vegetable storage operations</p>
            </div>
            <div className="flex items-center gap-3">
              {connected ? (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Wifi className="w-3 h-3 mr-1" />
                  Live Data
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-red-500/20 text-white border-red-300/30">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Offline
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {storageStats.map((stat, index) => (
          <Card key={index} className={`card-hover bg-gradient-to-br ${stat.bgGradient} border-0 shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="flex items-center text-sm">
                {stat.changeType === "positive" ? (
                  <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                ) : stat.changeType === "negative" ? (
                  <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
                ) : null}
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-gray-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Storage Utilization Trends */}
        <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Storage Utilization Trends
                </CardTitle>
                <CardDescription>Monthly capacity utilization across all zones</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CustomAreaChart data={storageUtilizationData} color="#3b82f6" color2="#10b981" height={280} />
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Current Utilization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Optimal Range</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Quality Distribution */}
        <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-green-600" />
                  Product Quality Distribution
                </CardTitle>
                <CardDescription>Current quality status breakdown</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <CustomDonutChart data={productDistributionData} height={280} />
              <div className="space-y-4">
                {productDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Monitoring Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Environmental Conditions */}
        <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-600" />
                  Environmental Monitoring
                </CardTitle>
                <CardDescription>24-hour temperature and humidity trends</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CustomLineChart data={environmentalData} color="#ef4444" color2="#3b82f6" height={280} />
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Temperature (°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Humidity (%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zone Utilization */}
        <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Zone Utilization
                </CardTitle>
                <CardDescription>Current capacity usage by storage zone</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CustomBarChart data={zoneUtilizationData} color="#8b5cf6" height={280} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {dashboardData?.zones?.map((zone, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <span className="text-sm font-medium">{zone.zone_code}</span>
                  <span className="text-sm text-gray-600">{zone.utilization_percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights with Charts */}
      <Card className="card-hover bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold gradient-text">AI-Powered Insights</CardTitle>
              <CardDescription className="text-lg">Machine learning predictions and recommendations</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Waste Reduction Trends */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Waste Reduction Trends</h3>
              <CustomAreaChart data={wasteReductionData} color="#10b981" height={200} />
              <div className="p-4 bg-white/60 backdrop-blur-lg rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900">25% Reduction Predicted</span>
                </div>
                <p className="text-sm text-green-700">
                  AI models predict continued waste reduction through optimized storage practices
                </p>
              </div>
            </div>

            {/* Quality Trends */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Quality Score Trends</h3>
              <CustomLineChart data={qualityTrendsData} color="#3b82f6" height={200} />
              <div className="p-4 bg-white/60 backdrop-blur-lg rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">93% Average Quality</span>
                </div>
                <p className="text-sm text-blue-700">Consistent quality maintenance with AI-driven monitoring</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6" />
              <span className="text-xl font-semibold">ML Model Performance</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">94.2%</div>
                <div className="text-blue-100">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{dashboardData?.mlInsights?.length || 0}</div>
                <div className="text-blue-100">Predictions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">₹18.5L</div>
                <div className="text-blue-100">Value Generated (NPR)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                Recent Storage Activities
              </CardTitle>
              <CardDescription>Latest actions and system updates</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(realtimeData?.activities || []).slice(0, 3).map((activity: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100"
              >
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.product_name || activity.description}</p>
                </div>
                <div className="text-right">
                  <Badge
                    variant={activity.status === "completed" ? "default" : "secondary"}
                    className={
                      activity.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{new Date(activity.performed_at).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
