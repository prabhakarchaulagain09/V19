"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomAreaChart } from "./charts/area-chart"
import { CustomBarChart } from "./charts/bar-chart"
import { CustomLineChart } from "./charts/line-chart"
import { CustomDonutChart } from "./charts/donut-chart"
import { CustomRadialChart } from "./charts/radial-chart"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  Zap,
  Target,
  RefreshCw,
  Lightbulb,
  Shield,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Clock,
  Award,
} from "lucide-react"

export default function Analytics() {
  const [predictions, setPredictions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [activeTab, setActiveTab] = useState("overview")

  // Enhanced Chart Data
  const wasteReductionData = [
    { name: "Jan", value: 12, value2: 10 },
    { name: "Feb", value: 8, value2: 10 },
    { name: "Mar", value: 6, value2: 10 },
    { name: "Apr", value: 4, value2: 10 },
    { name: "May", value: 3, value2: 10 },
    { name: "Jun", value: 2, value2: 10 },
  ]

  const qualityMetricsData = [
    { name: "Grains", value: 95, value2: 88 },
    { name: "Cereals", value: 92, value2: 85 },
    { name: "Pulses", value: 89, value2: 82 },
    { name: "Seeds", value: 94, value2: 87 },
  ]

  const treatmentEfficiencyData = [
    { name: "Organic Pest Control", value: 95 },
    { name: "Humidity Control", value: 92 },
    { name: "Temperature Regulation", value: 98 },
    { name: "Fumigation", value: 88 },
  ]

  const energyOptimizationData = [
    { name: "Zone A", value: 85, color: "#3b82f6" },
    { name: "Zone B", value: 78, color: "#10b981" },
    { name: "Zone C", value: 92, color: "#f59e0b" },
    { name: "Zone D", value: 88, color: "#8b5cf6" },
  ]

  const revenueImpactData = [
    { name: "Q1", value: 152 },
    { name: "Q2", value: 185 },
    { name: "Q3", value: 221 },
    { name: "Q4", value: 258 },
  ]

  const predictiveAlertsData = [
    { name: "Critical", value: 3, fill: "#ef4444" },
    { name: "Warning", value: 8, fill: "#f59e0b" },
    { name: "Info", value: 12, fill: "#3b82f6" },
  ]

  const customerSatisfactionData = [
    { name: "Excellent", value: 45, color: "#10b981" },
    { name: "Good", value: 35, color: "#3b82f6" },
    { name: "Average", value: 15, color: "#f59e0b" },
    { name: "Poor", value: 5, color: "#ef4444" },
  ]

  const marketTrendsData = [
    { name: "Week 1", value: 245 },
    { name: "Week 2", value: 267 },
    { name: "Week 3", value: 289 },
    { name: "Week 4", value: 312 },
    { name: "Week 5", value: 298 },
    { name: "Week 6", value: 334 },
  ]

  const operationalEfficiencyData = [
    { name: "Storage", value: 94, value2: 88 },
    { name: "Processing", value: 91, value2: 85 },
    { name: "Distribution", value: 87, value2: 82 },
    { name: "Quality Control", value: 96, value2: 92 },
  ]

  const generatePredictions = async () => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newPredictions = {
      wasteReduction: {
        currentTrend: -15.2,
        predictedNext30Days: -22.8,
        confidence: 94,
        factors: ["Temperature optimization", "Improved rotation", "Early detection"],
      },
      qualityDegradation: {
        riskProducts: [
          { id: "C-2024-023", name: "Sweet Corn", riskScore: 78, daysToAction: 5 },
          { id: "R-2024-050", name: "Brown Rice", riskScore: 65, daysToAction: 12 },
          { id: "L-2024-018", name: "Black Lentils", riskScore: 45, daysToAction: 18 },
        ],
      },
      optimalTreatment: {
        recommendations: [
          {
            zone: "Zone B-2",
            treatment: "Organic Pest Control",
            timing: "Next 3-5 days",
            effectiveness: 96,
            costSaving: 34000,
          },
          {
            zone: "Zone A-1",
            treatment: "Humidity Adjustment",
            timing: "Immediate",
            effectiveness: 89,
            costSaving: 18000,
          },
        ],
      },
      marketTiming: {
        recommendations: [
          {
            product: "Premium Wheat",
            action: "Hold",
            priceIncrease: 12.5,
            optimalSaleDate: "2024-07-15",
            confidence: 87,
          },
          {
            product: "Basmati Rice",
            action: "Sell Soon",
            priceDecrease: -8.2,
            optimalSaleDate: "2024-06-20",
            confidence: 92,
          },
        ],
      },
      environmentalOptimization: {
        energySavings: 23.4,
        optimalSettings: [
          { zone: "Zone A", temp: "17.5°C", humidity: "42%", savings: "15%" },
          { zone: "Zone B", temp: "18.2°C", humidity: "45%", savings: "12%" },
          { zone: "Zone C", temp: "17.8°C", humidity: "40%", savings: "18%" },
          { zone: "Zone D", temp: "18.0°C", humidity: "43%", savings: "20%" },
        ],
      },
    }

    setPredictions(newPredictions)
    setLastUpdated(new Date())
    setIsLoading(false)
  }

  useEffect(() => {
    generatePredictions()
  }, [])

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Advanced Analytics & Intelligence</h2>
              <p className="text-blue-100 text-lg">Comprehensive business insights and predictive analytics</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-100">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              <Button
                variant="secondary"
                size="sm"
                onClick={generatePredictions}
                disabled={isLoading}
                className="bg-white/20 hover:bg-white/30 border-white/30"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {isLoading ? "Updating..." : "Refresh"}
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Enhanced KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" />
              AI Waste Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-blue-600">
                {predictions ? `${predictions.wasteReduction.predictedNext30Days}%` : "-22.8%"}
              </div>
              <TrendingDown className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-blue-700">
              {predictions ? `${predictions.wasteReduction.confidence}%` : "94%"} confidence
            </p>
            <div className="mt-2">
              <Progress value={94} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-green-600" />
              Quality Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-green-600">96%</div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-green-700">Predicted next month</p>
            <div className="mt-2">
              <Progress value={96} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              Energy Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-purple-600">
                {predictions ? `${predictions.environmentalOptimization.energySavings}%` : "23.4%"}
              </div>
              <TrendingDown className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-purple-700">Potential savings</p>
            <div className="mt-2">
              <Progress value={23.4} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-orange-600" />
              Revenue Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-orange-600">+₹31L</div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-orange-700">Predicted this quarter</p>
            <div className="mt-2">
              <Progress value={78} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Tabbed Analytics */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="predictive" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Predictive
          </TabsTrigger>
          <TabsTrigger value="operational" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Operational
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="customer" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Customer
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Waste Reduction Analysis */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  Predictive Waste Analysis
                </CardTitle>
                <CardDescription>ML-powered waste reduction forecasting</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomAreaChart data={wasteReductionData} color="#10b981" color2="#ef4444" height={280} />
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Actual Waste</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Target Threshold</span>
                  </div>
                </div>
                {predictions && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Key Improvement Factors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {predictions.wasteReduction.factors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Quality Performance Metrics
                </CardTitle>
                <CardDescription>Current vs predicted quality scores by category</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomBarChart data={qualityMetricsData} color="#3b82f6" color2="#10b981" height={280} />
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Current Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Predicted Score</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Trends and Customer Satisfaction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-purple-600" />
                  Market Trends Analysis
                </CardTitle>
                <CardDescription>Weekly revenue trends and market performance</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomLineChart data={marketTrendsData} color="#8b5cf6" height={280} />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <div className="text-xl font-bold text-purple-600">+36%</div>
                    <p className="text-purple-700 text-sm">Growth Rate</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <div className="text-xl font-bold text-blue-600">₹334K</div>
                    <p className="text-blue-700 text-sm">Peak Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-green-600" />
                  Customer Satisfaction
                </CardTitle>
                <CardDescription>Customer feedback and satisfaction metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomDonutChart data={customerSatisfactionData} height={280} />
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">Overall Rating: 4.2/5</span>
                  </div>
                  <p className="text-sm text-green-700">80% of customers rate our service as excellent or good</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Predictive Tab */}
        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Treatment Efficiency */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Treatment Efficiency Analysis
                </CardTitle>
                <CardDescription>Success rates of different treatment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomLineChart data={treatmentEfficiencyData} color="#8b5cf6" height={280} />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {treatmentEfficiencyData.map((treatment, index) => (
                    <div key={index} className="p-3 rounded-lg bg-purple-50">
                      <p className="text-sm font-medium text-purple-900">{treatment.name}</p>
                      <p className="text-lg font-bold text-purple-600">{treatment.value}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Predictive Alerts */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Predictive Alert Distribution
                </CardTitle>
                <CardDescription>AI-generated alerts by severity level</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomRadialChart data={predictiveAlertsData} height={280} />
                <div className="space-y-3 mt-4">
                  {predictiveAlertsData.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: alert.fill }}></div>
                        <span className="text-sm font-medium">{alert.name}</span>
                      </div>
                      <Badge variant="outline">{alert.value} alerts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ML Recommendations */}
          {predictions && (
            <Card className="card-hover bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  AI-Generated Recommendations
                </CardTitle>
                <CardDescription>Machine learning insights and actionable recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {predictions.optimalTreatment.recommendations.map((rec, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{rec.zone}</h3>
                        <Badge variant="outline" className="text-purple-600 border-purple-300">
                          {rec.effectiveness}% effective
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Treatment:</span>
                          <span className="font-medium">{rec.treatment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Timing:</span>
                          <span className="font-medium">{rec.timing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Cost Savings:</span>
                          <span className="font-medium text-green-600">₹{(rec.costSaving / 1000).toFixed(0)}K</span>
                        </div>
                        <Progress value={rec.effectiveness} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Operational Tab */}
        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Operational Efficiency */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Operational Efficiency
                </CardTitle>
                <CardDescription>Performance metrics across key operations</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomBarChart data={operationalEfficiencyData} color="#3b82f6" color2="#10b981" height={280} />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {operationalEfficiencyData.map((op, index) => (
                    <div key={index} className="p-3 rounded-lg bg-blue-50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">{op.name}</span>
                        <span className="text-lg font-bold text-blue-600">{op.value}%</span>
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Target: {op.value2}% | +{op.value - op.value2}% improvement
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Energy Optimization */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Energy Efficiency by Zone
                </CardTitle>
                <CardDescription>Current energy optimization levels</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomDonutChart data={energyOptimizationData} height={280} />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {energyOptimizationData.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }}></div>
                        <span className="text-sm font-medium">{zone.name}</span>
                      </div>
                      <span className="text-sm font-bold">{zone.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Environmental Optimization */}
          {predictions && (
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Environmental Optimization
                </CardTitle>
                <CardDescription>AI-recommended settings for maximum efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {predictions.environmentalOptimization.optimalSettings.map((setting, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-green-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{setting.zone}</h3>
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          {setting.savings} savings
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Optimal Temp:</span>
                          <p className="font-medium">{setting.temp}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Optimal Humidity:</span>
                          <p className="font-medium">{setting.humidity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Total Energy Savings:</strong> {predictions.environmentalOptimization.energySavings}%
                    reduction in energy consumption with optimized settings
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Impact */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Revenue Impact Analysis
                </CardTitle>
                <CardDescription>Quarterly revenue improvements from AI optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomAreaChart data={revenueImpactData} color="#10b981" height={280} />
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">68% Growth</span>
                  </div>
                  <p className="text-sm text-green-700">
                    AI-driven optimizations have increased revenue by ₹25.8L this quarter
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cost Analysis */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Cost Optimization
                </CardTitle>
                <CardDescription>Operational cost reduction through smart analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-green-50">
                      <div className="text-2xl font-bold text-green-600">₹18.5L</div>
                      <p className="text-green-700 text-sm">Cost Savings</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingDown className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">-15.2% reduction</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50">
                      <div className="text-2xl font-bold text-blue-600">₹12.3L</div>
                      <p className="text-blue-700 text-sm">Energy Savings</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Zap className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-blue-600">23.4% efficiency</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-50">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">₹30.8L</div>
                      <p className="text-purple-700">Total Monthly Savings</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-purple-600">ROI: 340%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span className="font-medium">Waste Reduction</span>
                      <span className="font-bold text-green-600">₹8.2L saved</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span className="font-medium">Process Optimization</span>
                      <span className="font-bold text-blue-600">₹6.1L saved</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span className="font-medium">Predictive Maintenance</span>
                      <span className="font-bold text-purple-600">₹4.2L saved</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Tab */}
        <TabsContent value="customer" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Satisfaction Trends */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Customer Satisfaction Trends
                </CardTitle>
                <CardDescription>Monthly customer feedback and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomLineChart
                  data={[
                    { name: "Jan", value: 4.1 },
                    { name: "Feb", value: 4.0 },
                    { name: "Mar", value: 4.2 },
                    { name: "Apr", value: 4.3 },
                    { name: "May", value: 4.2 },
                    { name: "Jun", value: 4.2 },
                  ]}
                  color="#3b82f6"
                  height={280}
                />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 rounded-lg bg-blue-50">
                    <div className="text-xl font-bold text-blue-600">4.2</div>
                    <p className="text-blue-700 text-sm">Avg Rating</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-50">
                    <div className="text-xl font-bold text-green-600">89%</div>
                    <p className="text-green-700 text-sm">Satisfaction</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-50">
                    <div className="text-xl font-bold text-purple-600">1,247</div>
                    <p className="text-purple-700 text-sm">Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Metrics */}
            <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Customer Metrics
                </CardTitle>
                <CardDescription>Key customer performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-green-50">
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <p className="text-green-700 text-sm">Retention Rate</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">+5% this month</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50">
                      <div className="text-2xl font-bold text-blue-600">24h</div>
                      <p className="text-blue-700 text-sm">Avg Response</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span className="text-xs text-blue-600">-12h improvement</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span className="font-medium">New Customers</span>
                      <div className="text-right">
                        <span className="font-bold text-green-600">+156</span>
                        <p className="text-xs text-gray-500">This month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span className="font-medium">Repeat Orders</span>
                      <div className="text-right">
                        <span className="font-bold text-blue-600">78%</span>
                        <p className="text-xs text-gray-500">Customer base</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span className="font-medium">Avg Order Value</span>
                      <div className="text-right">
                        <span className="font-bold text-purple-600">₹2,340</span>
                        <p className="text-xs text-gray-500">+12% increase</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">Customer Loyalty</span>
                    </div>
                    <p className="text-sm text-green-700">85% of customers recommend Veggie Vitals to others</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
