"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, Plus, Calendar, User, Package, Beaker, RotateCcw, Thermometer } from "lucide-react"

export default function Activities() {
  const [activities] = useState([
    {
      id: 1,
      type: "movement",
      title: "Grain Shuffling",
      product: "Wheat Batch #W-2024-001",
      user: "John Smith",
      timestamp: "2024-06-04 14:30",
      details: "Routine shuffling performed to prevent settling and maintain freshness",
      zone: "Zone A-1",
      status: "completed",
    },
    {
      id: 2,
      type: "treatment",
      title: "Pest Treatment Applied",
      product: "Rice Batch #R-2024-045",
      user: "Maria Garcia",
      timestamp: "2024-06-04 12:15",
      details: "Organic insecticide applied - Diatomaceous Earth (2.5kg). No harmful chemicals used.",
      zone: "Zone B-2",
      chemical: "Diatomaceous Earth",
      quantity: "2.5kg",
      status: "completed",
    },
    {
      id: 3,
      type: "quality_check",
      title: "Quality Inspection",
      product: "Corn Batch #C-2024-023",
      user: "David Chen",
      timestamp: "2024-06-04 11:45",
      details: "Moisture content checked: 12.5%. Color and texture assessment: Good condition.",
      zone: "Zone C-1",
      status: "completed",
    },
    {
      id: 4,
      type: "environmental",
      title: "Temperature Adjustment",
      product: "Storage Zone D",
      user: "System",
      timestamp: "2024-06-04 10:20",
      details: "HVAC system adjusted due to high ambient temperature. Target: 18°C, Current: 19.5°C",
      zone: "Zone D",
      status: "completed",
    },
    {
      id: 5,
      type: "movement",
      title: "Product Relocation",
      product: "Lentils Batch #L-2024-012",
      user: "Sarah Wilson",
      timestamp: "2024-06-04 09:00",
      details: "Moved from Zone D-2 to Zone D-3 due to humidity concerns",
      zone: "Zone D-3",
      status: "completed",
    },
  ])

  const getActivityIcon = (type) => {
    switch (type) {
      case "movement":
        return RotateCcw
      case "treatment":
        return Beaker
      case "quality_check":
        return Package
      case "environmental":
        return Thermometer
      default:
        return Activity
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case "movement":
        return "default"
      case "treatment":
        return "secondary"
      case "quality_check":
        return "outline"
      case "environmental":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Storage Activities</h2>
          <p className="text-muted-foreground">Log and track all storage facility activities</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Log Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log New Activity</DialogTitle>
              <DialogDescription>Record a new storage activity or treatment</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="movement">Product Movement</SelectItem>
                    <SelectItem value="treatment">Chemical Treatment</SelectItem>
                    <SelectItem value="quality_check">Quality Check</SelectItem>
                    <SelectItem value="environmental">Environmental Control</SelectItem>
                    <SelectItem value="maintenance">Equipment Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Product/Location</Label>
                <Input id="product" placeholder="Enter product ID or location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user">Performed By</Label>
                <Input id="user" placeholder="Enter staff name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone">Storage Zone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zone-a">Zone A</SelectItem>
                    <SelectItem value="zone-b">Zone B</SelectItem>
                    <SelectItem value="zone-c">Zone C</SelectItem>
                    <SelectItem value="zone-d">Zone D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chemical">Chemical Used (if applicable)</Label>
                <Input id="chemical" placeholder="Enter chemical name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Applied</Label>
                <Input id="quantity" placeholder="Enter quantity with unit" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="details">Activity Details</Label>
                <Textarea id="details" placeholder="Describe the activity performed..." rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Log Activity</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Treatments Applied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quality Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Product Movements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Log */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Comprehensive log of all storage activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type)
              return (
                <div key={activity.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-muted">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{activity.title}</h3>
                          <Badge variant={getActivityColor(activity.type)}>{activity.type.replace("_", " ")}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{activity.product}</p>
                        <p className="text-sm mb-3">{activity.details}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {activity.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {activity.timestamp}
                          </span>
                          <span>{activity.zone}</span>
                          {activity.chemical && (
                            <span className="flex items-center gap-1">
                              <Beaker className="w-3 h-3" />
                              {activity.chemical} ({activity.quantity})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
