"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Download, Share, MapPin, Calendar, User, Beaker } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Traceability() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = [
    {
      id: "W-2024-001",
      name: "Premium Wheat",
      currentLocation: "Zone A-1",
      farmer: "Green Valley Farm",
      farmLocation: "Punjab, India",
      harvestDate: "2024-05-15",
      storageDate: "2024-05-17",
      currentStatus: "Good",
      qrCode: "QR_W2024001",
      journey: [
        {
          stage: "Harvest",
          date: "2024-05-15",
          location: "Green Valley Farm, Punjab",
          actor: "Farmer: Rajesh Kumar",
          details: "Harvested at optimal moisture content (14%). Quality grade: A+",
          temperature: "25°C",
          humidity: "40%",
        },
        {
          stage: "Farm Storage",
          date: "2024-05-16",
          location: "Farm Storage Facility",
          actor: "Farm Staff",
          details: "Initial drying and cleaning. No treatments applied.",
          temperature: "22°C",
          humidity: "35%",
        },
        {
          stage: "Transport",
          date: "2024-05-17",
          location: "En Route to FoodTrace Pro",
          actor: "Transport: QuickMove Logistics",
          details: "Temperature-controlled transport. Journey time: 6 hours",
          temperature: "20°C",
          humidity: "38%",
        },
        {
          stage: "Intake",
          date: "2024-05-17",
          location: "FoodTrace Pro Facility",
          actor: "QC Team: Sarah Wilson",
          details: "Quality check passed. Moisture: 12.8%. No pest contamination detected.",
          temperature: "18°C",
          humidity: "42%",
        },
        {
          stage: "Storage",
          date: "2024-05-18",
          location: "Zone A-1",
          actor: "Storage Team: John Smith",
          details: "Placed in Zone A-1. Optimal storage conditions maintained.",
          temperature: "18°C",
          humidity: "45%",
        },
        {
          stage: "Treatment",
          date: "2024-05-25",
          location: "Zone A-1",
          actor: "Treatment Specialist: Maria Garcia",
          details: "Preventive organic treatment applied: Diatomaceous Earth (2.5kg)",
          temperature: "18°C",
          humidity: "43%",
          treatment: "Diatomaceous Earth - 2.5kg",
        },
      ],
    },
  ]

  const generateQRCode = (productId) => {
    // In a real implementation, this would generate an actual QR code
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://foodtrace.pro/track/${productId}`
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStageIcon = (stage) => {
    switch (stage) {
      case "Harvest":
        return Calendar
      case "Farm Storage":
        return MapPin
      case "Transport":
        return MapPin
      case "Intake":
        return Eye
      case "Storage":
        return MapPin
      case "Treatment":
        return Beaker
      default:
        return MapPin
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Product Traceability</h2>
          <p className="text-muted-foreground">Track products from farm to consumer</p>
        </div>
        <Button>
          <Share className="w-4 h-4 mr-2" />
          Share Transparency Report
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by product ID, name, or farmer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Traceability Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tracked Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">100% traceability rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Partner Farms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Verified suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Transparency Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">Consumer trust rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>Traceable Products</CardTitle>
          <CardDescription>Complete supply chain visibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <Badge variant="outline" className="font-mono">
                        {product.id}
                      </Badge>
                      <Badge variant="secondary">{product.currentStatus}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {product.farmer}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {product.farmLocation}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Harvested: {product.harvestDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Currently: {product.currentLocation}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedProduct(product)}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Journey
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Supply Chain Journey - {product?.name}</DialogTitle>
                          <DialogDescription>Complete traceability from farm to storage</DialogDescription>
                        </DialogHeader>
                        {selectedProduct && (
                          <div className="space-y-6 py-4">
                            {/* Product Summary */}
                            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                              <div>
                                <h3 className="font-semibold mb-2">Product Information</h3>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>Product ID:</span>
                                    <span className="font-mono">{selectedProduct.id}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Name:</span>
                                    <span>{selectedProduct.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Current Status:</span>
                                    <Badge variant="secondary">{selectedProduct.currentStatus}</Badge>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-2">QR Code Access</h3>
                                <div className="flex items-center gap-3">
                                  <img
                                    src={generateQRCode(selectedProduct.id) || "/placeholder.svg"}
                                    alt="QR Code"
                                    className="w-16 h-16 border rounded"
                                  />
                                  <div className="text-sm">
                                    <p className="font-medium">Consumer Access</p>
                                    <p className="text-muted-foreground">Scan for full transparency</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Journey Timeline */}
                            <div>
                              <h3 className="font-semibold mb-4">Supply Chain Journey</h3>
                              <div className="space-y-4">
                                {selectedProduct.journey.map((stage, index) => {
                                  const IconComponent = getStageIcon(stage.stage)
                                  return (
                                    <div key={index} className="flex gap-4">
                                      <div className="flex flex-col items-center">
                                        <div className="p-2 rounded-full bg-primary text-primary-foreground">
                                          <IconComponent className="w-4 h-4" />
                                        </div>
                                        {index < selectedProduct.journey.length - 1 && (
                                          <div className="w-px h-12 bg-border mt-2"></div>
                                        )}
                                      </div>
                                      <div className="flex-1 border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                          <h4 className="font-medium">{stage.stage}</h4>
                                          <Badge variant="outline">{stage.date}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">{stage.location}</p>
                                        <p className="text-sm mb-3">{stage.details}</p>
                                        <div className="flex flex-wrap gap-4 text-xs">
                                          <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            {stage.actor}
                                          </span>
                                          <span>Temp: {stage.temperature}</span>
                                          <span>Humidity: {stage.humidity}</span>
                                          {stage.treatment && (
                                            <span className="flex items-center gap-1 text-orange-600">
                                              <Beaker className="w-3 h-3" />
                                              {stage.treatment}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-end gap-2 pt-4 border-t">
                          <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </Button>
                          <Button>
                            <Share className="w-4 h-4 mr-2" />
                            Share with Consumer
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consumer Trust Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consumer Transparency</CardTitle>
            <CardDescription>Building trust through visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">QR Code Access</p>
                <p className="text-sm text-muted-foreground">
                  Consumers can scan QR codes to view complete product journey
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Real-time Updates</p>
                <p className="text-sm text-muted-foreground">Live tracking of storage conditions and treatments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Farmer Profiles</p>
                <p className="text-sm text-muted-foreground">
                  Direct connection to product origin and farming practices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance & Certification</CardTitle>
            <CardDescription>Meeting regulatory standards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge variant="default">ISO 22000</Badge>
              <div className="flex-1">
                <p className="font-medium">Food Safety Management</p>
                <p className="text-sm text-muted-foreground">Certified food safety protocols</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge variant="secondary">HACCP</Badge>
              <div className="flex-1">
                <p className="font-medium">Hazard Analysis</p>
                <p className="text-sm text-muted-foreground">Critical control point monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge variant="outline">Organic</Badge>
              <div className="flex-1">
                <p className="font-medium">Organic Certification</p>
                <p className="text-sm text-muted-foreground">Chemical-free storage practices</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
