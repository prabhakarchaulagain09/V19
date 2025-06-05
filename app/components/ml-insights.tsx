"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Brain,
  TrendingDown,
  AlertTriangle,
  Zap,
  Target,
  BarChart3,
  RefreshCw,
  Lightbulb,
  Shield,
  DollarSign,
} from "lucide-react"

interface MLPrediction {
  id: string
  type: "waste" | "quality" | "treatment" | "market" | "energy"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  timeframe: string
  recommendation: string
  metrics: {
    current: number
    predicted: number
    improvement: number
    unit: string
  }
}

interface MLModel {
  name: string
  accuracy: number
  lastTrained: string
  status: "active" | "training" | "error"
  predictions: number
}

export default function MLInsights() {
  const [predictions, setPredictions] = useState<MLPrediction[]>([])
  const [models, setModels] = useState<MLModel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPrediction, setSelectedPrediction] = useState<MLPrediction | null>(null)

  const generateMLPredictions = async () => {
    setIsLoading(true)

    // Simulate ML model inference
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newPredictions: MLPrediction[] = [
      {
        id: "1",
        type: "waste",
        title: "Waste Reduction Opportunity",
        description: "Zone A-1 shows potential for 25% waste reduction through optimized rotation schedule",
        confidence: 92,
        impact: "high",
        timeframe: "30 days",
        recommendation: "Implement daily rotation for wheat products in Zone A-1",
        metrics: {
          current: 3.2,
          predicted: 2.4,
          improvement: -25,
          unit: "% waste",
        },
      },
      {
        id: "2",
        type: "quality",
        title: "Quality Degradation Risk",
        description: "Sweet Corn batch C-2024-023 at 78% risk of quality degradation",
        confidence: 87,
        impact: "high",
        timeframe: "5 days",
        recommendation: "Immediate quality inspection and potential early distribution",
        metrics: {
          current: 85,
          predicted: 65,
          improvement: -23,
          unit: "% quality score",
        },
      },
      {
        id: "3",
        type: "treatment",
        title: "Optimal Treatment Window",
        description: "Zone B-2 pest treatment effectiveness peaks in 3-5 days",
        confidence: 94,
        impact: "medium",
        timeframe: "3-5 days",
        recommendation: "Schedule organic pest treatment for maximum effectiveness",
        metrics: {
          current: 88,
          predicted: 96,
          improvement: 9,
          unit: "% effectiveness",
        },
      },
      {
        id: "4",
        type: "market",
        title: "Price Optimization",
        description: "Premium Wheat prices expected to rise 12.5% by mid-July",
        confidence: 89,
        impact: "high",
        timeframe: "45 days",
        recommendation: "Hold current wheat inventory for optimal market timing",
        metrics: {
          current: 100,
          predicted: 112.5,
          improvement: 12.5,
          unit: "% price index",
        },
      },
      {
        id: "5",
        type: "energy",
        title: "Energy Optimization",
        description: "HVAC efficiency can be improved by 18% with adjusted settings",
        confidence: 91,
        impact: "medium",
        timeframe: "Immediate",
        recommendation: "Adjust temperature settings to 17.8°C in Zone C",
        metrics: {
          current: 100,
          predicted: 82,
          improvement: -18,
          unit: "% energy usage",
        },
      },
    ]

    const newModels: MLModel[] = [
      {
        name: "Waste Prediction Model",
        accuracy: 94.2,
        lastTrained: "2024-06-01",
        status: "active",
        predictions: 1247,
      },
      {
        name: "Quality Forecasting Model",
        accuracy: 91.8,
        lastTrained: "2024-05-28",
        status: "active",
        predictions: 892,
      },
      {
        name: "Treatment Optimization Model",
        accuracy: 96.1,
        lastTrained: "2024-06-02",
        status: "active",
        predictions: 634,
      },
      {
        name: "Market Intelligence Model",
        accuracy: 87.5,
        lastTrained: "2024-05-30",
        status: "training",
        predictions: 445,
      },
      {
        name: "Energy Efficiency Model",
        accuracy: 93.7,
        lastTrained: "2024-06-03",
        status: "active",
        predictions: 723,
      },
    ]

    setPredictions(newPredictions)
    setModels(newModels)
    setIsLoading(false)
  }

  useEffect(() => {
    generateMLPredictions()
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "waste":
        return TrendingDown
      case "quality":
        return Shield
      case "treatment":
        return Zap
      case "market":
        return DollarSign
      case "energy":
        return Target
      default:
        return Brain
    }
  }

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600"
      case "training":
        return "text-blue-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            Machine Learning Insights
          </h2>
          <p className="text-muted-foreground">AI-powered predictions and recommendations</p>
        </div>
        <Button onClick={generateMLPredictions} disabled={isLoading} className="gap-2">
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Generating..." : "Refresh Predictions"}
        </Button>
      </div>

      {/* ML Model Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            ML Model Performance
          </CardTitle>
          <CardDescription>Current status and accuracy of machine learning models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm">{model.name}</h3>
                  <Badge variant="outline" className={getModelStatusColor(model.status)}>
                    {model.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy:</span>
                    <span className="font-medium">{model.accuracy}%</span>
                  </div>
                  <Progress value={model.accuracy} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Last trained: {model.lastTrained}</span>
                    <span>{model.predictions} predictions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* High Priority Predictions */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-900">High Priority ML Alerts</AlertTitle>
        <AlertDescription className="text-orange-800">
          <div className="mt-2 space-y-1">
            {predictions
              .filter((p) => p.impact === "high")
              .map((prediction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>
                    • {prediction.title} - Action needed in {prediction.timeframe}
                  </span>
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    {prediction.confidence}% confidence
                  </Badge>
                </div>
              ))}
          </div>
        </AlertDescription>
      </Alert>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.map((prediction) => {
          const IconComponent = getTypeIcon(prediction.type)
          return (
            <Card key={prediction.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                  <Badge variant={getImpactColor(prediction.impact)}>{prediction.impact} impact</Badge>
                </div>
                <CardTitle className="text-lg">{prediction.title}</CardTitle>
                <CardDescription>{prediction.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Confidence Level</span>
                    <span className="text-sm font-bold">{prediction.confidence}%</span>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current:</span>
                      <p className="font-medium">
                        {prediction.metrics.current}
                        {prediction.metrics.unit}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Predicted:</span>
                      <p className="font-medium">
                        {prediction.metrics.predicted}
                        {prediction.metrics.unit}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Recommendation</p>
                        <p className="text-sm text-blue-800">{prediction.recommendation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Timeframe:</span>
                    <span className="font-medium">{prediction.timeframe}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Prediction Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Predicted Impact Summary
          </CardTitle>
          <CardDescription>Potential improvements from implementing ML recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg bg-green-50">
              <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">-25%</div>
              <p className="text-sm text-muted-foreground">Waste Reduction</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-blue-50">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">+8%</div>
              <p className="text-sm text-muted-foreground">Quality Improvement</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-purple-50">
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">+9%</div>
              <p className="text-sm text-muted-foreground">Treatment Efficiency</p>
            </div>
            <div className="text-center p-4 border rounded-lg bg-orange-50">
              <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">+$42K</div>
              <p className="text-sm text-muted-foreground">Revenue Impact</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
