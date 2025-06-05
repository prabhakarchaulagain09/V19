"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Package, TrendingDown, CheckCircle, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "expiry",
      severity: "high",
      title: "Products Nearing Expiration",
      message: "3 products will expire within the next 30 days",
      products: ["Sweet Corn (C-2024-023)", "Organic Barley (B-2024-015)", "Quinoa Seeds (Q-2024-008)"],
      timestamp: "2024-06-04 14:30",
      status: "active",
    },
    {
      id: 2,
      type: "priority",
      severity: "medium",
      title: "Priority Items for Sale",
      message: "5 products should be prioritized for distribution",
      products: ["Wheat Batch #W-2024-001", "Rice Batch #R-2024-045"],
      timestamp: "2024-06-04 12:15",
      status: "active",
    },
    {
      id: 3,
      type: "environmental",
      severity: "high",
      title: "High Humidity in Zone D",
      message: "Humidity levels have exceeded safe thresholds (65%)",
      products: ["All products in Zone D"],
      timestamp: "2024-06-04 11:45",
      status: "active",
    },
    {
      id: 4,
      type: "pest",
      severity: "medium",
      title: "Pest Activity Detected",
      message: "Unusual pest activity detected in Zone B-2",
      products: ["Basmati Rice (R-2024-045)", "Brown Rice (R-2024-050)"],
      timestamp: "2024-06-04 09:20",
      status: "active",
    },
    {
      id: 5,
      type: "treatment",
      severity: "low",
      title: "Treatment Schedule Due",
      message: "Regular pest treatment scheduled for Zone A",
      products: ["All products in Zone A"],
      timestamp: "2024-06-04 08:00",
      status: "resolved",
    },
  ])

  const dismissAlert = (alertId) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
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

  const getAlertIcon = (type) => {
    switch (type) {
      case "expiry":
        return Clock
      case "priority":
        return TrendingDown
      case "environmental":
        return AlertTriangle
      case "pest":
        return Package
      case "treatment":
        return CheckCircle
      default:
        return AlertTriangle
    }
  }

  const activeAlerts = alerts.filter((alert) => alert.status === "active")
  const resolvedAlerts = alerts.filter((alert) => alert.status === "resolved")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Alert Management</h2>
          <p className="text-muted-foreground">Monitor and manage storage facility alerts</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="w-3 h-3" />
            {activeAlerts.filter((a) => a.severity === "high").length} High Priority
          </Badge>
          <Badge variant="default" className="gap-1">
            {activeAlerts.filter((a) => a.severity === "medium").length} Medium Priority
          </Badge>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolvedAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Successfully handled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Products at Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">Need immediate action</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Alerts requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeAlerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type)
            return (
              <Alert key={alert.id} className="relative">
                <IconComponent className="h-4 w-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTitle className="flex items-center gap-2">
                      {alert.title}
                      <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    </AlertTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)} className="h-6 w-6 p-0">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <AlertDescription className="mb-3">{alert.message}</AlertDescription>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Affected Products:</p>
                    <div className="flex flex-wrap gap-1">
                      {alert.products.map((product, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Alert>
            )
          })}
        </CardContent>
      </Card>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Resolved</CardTitle>
            <CardDescription>Alerts that have been addressed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {resolvedAlerts.map((alert) => {
              const IconComponent = getAlertIcon(alert.type)
              return (
                <Alert key={alert.id} className="opacity-75">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <AlertTitle className="flex items-center gap-2">
                        {alert.title}
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Resolved
                        </Badge>
                      </AlertTitle>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </div>
                </Alert>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
