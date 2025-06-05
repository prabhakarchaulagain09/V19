"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Search, Plus, Eye, Calendar, MapPin, Filter, MoreVertical, TrendingUp, Package2, Wheat } from "lucide-react"

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filterCategory, setFilterCategory] = useState("all")

  const products = [
    {
      id: "W-2024-001",
      name: "Premium Wheat",
      category: "Grains",
      farmer: "Green Valley Farm",
      harvestDate: "2024-05-15",
      quantity: "2,500 kg",
      location: "Zone A-1",
      status: "Good",
      expiryDate: "2025-05-15",
      treatments: 2,
      lastActivity: "2024-06-01",
      qualityScore: 92,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "R-2024-045",
      name: "Basmati Rice",
      category: "Grains",
      farmer: "Sunrise Agriculture",
      harvestDate: "2024-04-20",
      quantity: "1,800 kg",
      location: "Zone B-2",
      status: "Excellent",
      expiryDate: "2025-04-20",
      treatments: 1,
      lastActivity: "2024-06-03",
      qualityScore: 96,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "C-2024-023",
      name: "Sweet Corn",
      category: "Cereals",
      farmer: "Mountain View Ranch",
      harvestDate: "2024-05-28",
      quantity: "3,200 kg",
      location: "Zone C-1",
      status: "Fair",
      expiryDate: "2024-11-28",
      treatments: 3,
      lastActivity: "2024-06-02",
      qualityScore: 78,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "L-2024-012",
      name: "Red Lentils",
      category: "Pulses",
      farmer: "Organic Farms Co.",
      harvestDate: "2024-03-10",
      quantity: "1,200 kg",
      location: "Zone D-3",
      status: "Good",
      expiryDate: "2025-03-10",
      treatments: 1,
      lastActivity: "2024-05-30",
      qualityScore: 88,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || product.category.toLowerCase() === filterCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-700 border-green-200"
      case "Good":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Fair":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-red-100 text-red-700 border-red-200"
    }
  }

  const getQualityScoreColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const categories = ["All", "Grains", "Cereals", "Pulses", "Seeds"]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Product Inventory</h2>
              <p className="text-blue-100 text-lg">Manage and track all stored vegetables with AI-powered insights</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{products.length}</div>
                <div className="text-blue-100 text-sm">Total Products</div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white/20 hover:bg-white/30 border-white/30">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Register New Product</DialogTitle>
                    <DialogDescription>Add a new product to the storage inventory</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" placeholder="Enter product name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grains">Grains</SelectItem>
                          <SelectItem value="cereals">Cereals</SelectItem>
                          <SelectItem value="pulses">Pulses</SelectItem>
                          <SelectItem value="seeds">Seeds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmer">Farmer/Supplier</Label>
                      <Input id="farmer" placeholder="Enter farmer name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="harvest-date">Harvest Date</Label>
                      <Input id="harvest-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" placeholder="Enter quantity with unit" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Storage Location</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="zone-a">Zone A</SelectItem>
                          <SelectItem value="zone-b">Zone B</SelectItem>
                          <SelectItem value="zone-c">Zone C</SelectItem>
                          <SelectItem value="zone-d">Zone D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="initial-conditions">Initial Conditions</Label>
                      <Textarea id="initial-conditions" placeholder="Describe the initial condition of the product" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Register Product</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products, IDs, or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-lg border-white/20"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 bg-white/80 backdrop-blur-lg border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Products</p>
                <p className="text-2xl font-bold text-blue-900">{products.length}</p>
              </div>
              <Package2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Excellent Quality</p>
                <p className="text-2xl font-bold text-green-900">
                  {products.filter((p) => p.status === "Excellent").length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Need Attention</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {products.filter((p) => p.status === "Fair").length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Avg Quality Score</p>
                <p className="text-2xl font-bold text-purple-900">
                  {Math.round(products.reduce((sum, p) => sum + p.qualityScore, 0) / products.length)}%
                </p>
              </div>
              <Wheat className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="card-hover bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Current Inventory</CardTitle>
              <CardDescription>All products currently in storage with real-time status</CardDescription>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              {filteredProducts.length} products
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold">Farmer</TableHead>
                  <TableHead className="font-semibold">Quantity</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Quality Score</TableHead>
                  <TableHead className="font-semibold">Expiry Date</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.id}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.farmer}</p>
                        <p className="text-sm text-gray-500">Harvested: {product.harvestDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{product.quantity}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="w-3 h-3" />
                        {product.location}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${getQualityScoreColor(product.qualityScore)}`}>
                          {product.qualityScore}%
                        </span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              product.qualityScore >= 90
                                ? "bg-green-500"
                                : product.qualityScore >= 80
                                  ? "bg-blue-500"
                                  : product.qualityScore >= 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                            style={{ width: `${product.qualityScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{product.expiryDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(product)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Product Details - {product?.name}</DialogTitle>
                              <DialogDescription>Complete storage history and information</DialogDescription>
                            </DialogHeader>
                            {selectedProduct && (
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                                <div className="space-y-6">
                                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                                    <h3 className="font-semibold mb-3 text-blue-900">Basic Information</h3>
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Product ID:</span>
                                        <span className="font-mono font-medium">{selectedProduct.id}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Category:</span>
                                        <Badge variant="outline">{selectedProduct.category}</Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Farmer:</span>
                                        <span className="font-medium">{selectedProduct.farmer}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Harvest Date:</span>
                                        <span>{selectedProduct.harvestDate}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Current Quantity:</span>
                                        <span className="font-medium">{selectedProduct.quantity}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50">
                                    <h3 className="font-semibold mb-3 text-green-900">Storage Details</h3>
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Location:</span>
                                        <Badge variant="outline" className="gap-1">
                                          <MapPin className="w-3 h-3" />
                                          {selectedProduct.location}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <Badge variant="outline" className={getStatusColor(selectedProduct.status)}>
                                          {selectedProduct.status}
                                        </Badge>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Quality Score:</span>
                                        <span
                                          className={`font-bold ${getQualityScoreColor(selectedProduct.qualityScore)}`}
                                        >
                                          {selectedProduct.qualityScore}%
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Treatments Applied:</span>
                                        <span className="font-medium">{selectedProduct.treatments}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Last Activity:</span>
                                        <span>{selectedProduct.lastActivity}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-6">
                                  <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50">
                                    <h3 className="font-semibold mb-3 text-yellow-900">Storage History</h3>
                                    <div className="space-y-3">
                                      <div className="border-l-4 border-blue-500 pl-4 py-2">
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="font-medium text-blue-900">Product Registered</span>
                                          <span className="text-sm text-gray-500">{selectedProduct.harvestDate}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                          Initial storage in {selectedProduct.location}
                                        </p>
                                      </div>
                                      <div className="border-l-4 border-green-500 pl-4 py-2">
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="font-medium text-green-900">Quality Assessment</span>
                                          <span className="text-sm text-gray-500">2024-05-20</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                          Quality score: {selectedProduct.qualityScore}% - {selectedProduct.status}{" "}
                                          condition
                                        </p>
                                      </div>
                                      <div className="border-l-4 border-purple-500 pl-4 py-2">
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="font-medium text-purple-900">Treatment Applied</span>
                                          <span className="text-sm text-gray-500">2024-05-25</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                          Organic pest control treatment - 2.5L applied
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
                                    <h3 className="font-semibold mb-3 text-purple-900">AI Insights</h3>
                                    <div className="space-y-3">
                                      <div className="p-3 bg-white/60 rounded-lg">
                                        <p className="text-sm font-medium text-purple-800">Quality Prediction</p>
                                        <p className="text-xs text-purple-600">
                                          Expected to maintain current quality for 45 days
                                        </p>
                                      </div>
                                      <div className="p-3 bg-white/60 rounded-lg">
                                        <p className="text-sm font-medium text-blue-800">Optimal Sale Window</p>
                                        <p className="text-xs text-blue-600">Best market conditions in 2-3 weeks</p>
                                      </div>
                                      <div className="p-3 bg-white/60 rounded-lg">
                                        <p className="text-sm font-medium text-green-800">Storage Recommendation</p>
                                        <p className="text-xs text-green-600">Current storage conditions are optimal</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
