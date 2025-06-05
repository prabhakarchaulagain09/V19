"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, AlertTriangle, Target, Calendar, DollarSign, Activity } from "lucide-react"

interface PredictiveAlert {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  message: string
  probability: number
  daysUntil: number
  affectedProducts: string[]
  recommendedAction: string
  potentialImpact: string
}

export default function PredictiveDashboard() {
  const [alerts, setAlerts] = useState<PredictiveAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate ML model predictions
    const generatePredictiveAlerts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newAlerts: PredictiveAlert[] = [
        {
          id: "1",
          type: "critical",
          title: "Quality Degradation Predicted",
          message: "Sweet Corn batch C-2024-023 has 85% probability of quality degradation",
          probability: 85,
          daysUntil: 3,
          affectedProducts: ["Sweet Corn C-2024-023"],
          recommendedAction: "Immediate quality inspection and early distribution",
          potentialImpact: "$2,400 loss prevention",
        },
        {
          id: "2",
          type: "warning",
          title: "Pest Activity Risk",
          message: "Zone B-2 showing environmental conditions favorable for pest activity",
          probability: 72,
          daysUntil: 7,
          affectedProducts: ["Basmati Rice R-2024-045", "Brown Rice R-2024-050"],
          recommendedAction: "Schedule preventive pest treatment",
          potentialImpact: "$1,800 treatment cost vs $8,500 damage",
        },
        {
          id: "3",
          type: "info",
          title: "Optimal Sale Window",
          message: "Premium Wheat prices predicted to peak in 6 weeks",
          probability: 89,
          daysUntil: 42,
          affectedProducts: ["Premium Wheat W-2024-001"],
          recommendedAction: "Hold inventory for optimal market timing",
          potentialImpact: "+$3,200 additional revenue",
        },
        {
          id: "4",
          type: "warning",
          title: "Storage Capacity Alert",
          message: "Zone A predicted to reach 95% capacity in 2 weeks",
          probability: 78,
          daysUntil: 14,
          affectedProducts: ["All Zone A products"],
          recommendedAction: "Plan product rotation or expansion",
          potentialImpact: "Prevent storage bottleneck",
        },
        {
          id: "5",
          type: "info",
          title: "Energy Optimization Opportunity",
          message: "HVAC efficiency can be improved by 15% with adjusted settings",
          probability: 91,
          daysUntil: 0,
          affectedProducts: ["All zones"],
          recommendedAction: "Implement optimized temperature/humidity settings",
          potentialImpact: "$450/month energy savings",
        },
      ]

      setAlerts(newAlerts)
      setIsLoading(false)
    }

    generatePredictiveAlerts()
  }, [])

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "destructive"
      case "warning":
        return "default"
      case "info":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return AlertTriangle
      case "warning":
        return Activity
      case "info":
        return Brain
      default:
        return AlertTriangle
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 animate-pulse text-blue-600" />
            <span>AI models analyzing data...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            Predictive Dashboard
          </h2>
          <p className="text-muted-foreground">AI-powered predictions and early warnings</p>
        </div>
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          <Activity className="w-3 h-3 mr-1" />5 Active Predictions
        </Badge>
      </div>

      {/* Critical Alerts */}
      <div className="space-y-4">
        {alerts
          .filter((alert) => alert.type === "critical")
          .map((alert) => {
            const IconComponent = getAlertIcon(alert.type)
            return (
              <Alert key={alert.id} className="border-red-200 bg-red-50">
                <IconComponent className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-900">{alert.title}</AlertTitle>
                <AlertDescription className="text-red-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="mb-2">{alert.message}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span>Probability:</span>
                        <Badge variant="destructive">{alert.probability}%</Badge>
                        <span>•</span>
                        <span>Expected in {alert.daysUntil} days</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Recommended Action:</p>
                      <p className="text-sm">{alert.recommendedAction}</p>
                      <p className="text-sm font-medium mt-2">Impact: {alert.potentialImpact}</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )
          })}
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alerts
          .filter((alert) => alert.type !== "critical")
          .map((alert) => {
            const IconComponent = getAlertIcon(alert.type)
            return (
              <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <Badge variant={getAlertColor(alert.type)}>{alert.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{alert.title}</CardTitle>
                  <CardDescription>{alert.message}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Probability</span>
                      <span className="text-sm font-bold">{alert.probability}%</span>
                    </div>
                    <Progress value={alert.probability} className="h-2" />

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {alert.daysUntil === 0 ? "Immediate action" : `${alert.daysUntil} days until action needed`}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Affected Products:</p>
                      <div className="flex flex-wrap gap-1">
                        {alert.affectedProducts.map((product, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Recommendation</p>
                      <p className="text-sm text-blue-800">{alert.recommendedAction}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{alert.potentialImpact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
      </div>

      {/* ML Model Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Model Performance Insights
          </CardTitle>
          <CardDescription>How our AI models are performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg bg-green-50">
              <div className="text-2xl font-bold text-green-600 mb-2">94.2%</div>
              <p className="text-sm font-medium">Prediction Accuracy</p>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-blue-50">
              <div className="text-2xl font-bold text-blue-600 mb-2">1,247</div>
              <p className="text-sm font-medium">Predictions Made</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-purple-50">
              <div className="text-2xl font-bold text-purple-600 mb-2">$18.5K</div>
              <p className="text-sm font-medium">Value Generated</p>
              <p className="text-xs text-muted-foreground">From predictions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
