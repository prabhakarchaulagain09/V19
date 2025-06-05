"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Package,
  TrendingUp,
  Bell,
  Activity,
  BarChart3,
  Eye,
  Brain,
  Search,
  Settings,
  User,
  FileText,
} from "lucide-react"
import Dashboard from "./components/dashboard"
import Inventory from "./components/inventory"
import Alerts from "./components/alerts"
import Activities from "./components/activities"
import Analytics from "./components/analytics"
import Traceability from "./components/traceability"
import MLInsights from "./components/ml-insights"
import DailyReports from "./components/daily-reports"

export default function FoodStorageSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text font-poppins">Veggie Vitals</h1>
                <p className="text-sm text-gray-600">Smart Vegetable Storage Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                  <Activity className="w-3 h-3 mr-1" />
                  System Active
                </Badge>
                <Badge variant="outline" className="text-blue-600 border-blue-600 bg-blue-50">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Enabled
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Modern Tab Navigation */}
          <div className="mb-8">
            <TabsList className="grid w-full grid-cols-8 bg-white/60 backdrop-blur-lg border border-white/20 rounded-2xl p-2 shadow-lg">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Inventory</span>
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger
                value="activities"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Activities</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger
                value="traceability"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Traceability</span>
              </TabsTrigger>
              <TabsTrigger
                value="ml-insights"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">ML Insights</span>
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Reports</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="mt-0">
            <Dashboard />
          </TabsContent>

          <TabsContent value="inventory" className="mt-0">
            <Inventory />
          </TabsContent>

          <TabsContent value="alerts" className="mt-0">
            <Alerts />
          </TabsContent>

          <TabsContent value="activities" className="mt-0">
            <Activities />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <Analytics />
          </TabsContent>

          <TabsContent value="traceability" className="mt-0">
            <Traceability />
          </TabsContent>

          <TabsContent value="ml-insights" className="mt-0">
            <MLInsights />
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <DailyReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
