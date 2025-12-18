import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* -------------------------
  Types
------------------------- */
type Product = {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image?: string;
  category?: string;
  createdAt?: string;
};

type Order = {
  _id: string;
  buyerName: string;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  items: { productId: string; title: string; qty: number; price: number }[];
};

/* -------------------------
  Mock Data
------------------------- */
const MOCK_PRODUCTS: Product[] = [
  {
    _id: "p1",
    title: "Handwoven Bag",
    price: 1299,
    stock: 18,
    category: "Bags",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "p2",
    title: "Embroidered Scarf",
    price: 699,
    stock: 34,
    category: "Clothing",
    createdAt: new Date().toISOString(),
  },
];

const MOCK_ORDERS: Order[] = [
  {
    _id: "o1",
    buyerName: "Anita R",
    total: 1998,
    status: "Processing",
    createdAt: new Date().toISOString(),
    items: [
      { productId: "p1", title: "Handwoven Bag", qty: 1, price: 1299 },
      { productId: "p2", title: "Embroidered Scarf", qty: 1, price: 699 },
    ],
  },
  {
    _id: "o2",
    buyerName: "Priya S",
    total: 1299,
    status: "Pending",
    createdAt: new Date().toISOString(),
    items: [{ productId: "p1", title: "Handwoven Bag", qty: 1, price: 1299 }],
  },
];

const MOCK_SALES = [
  { date: "2025-09-01", revenue: 1200 },
  { date: "2025-09-02", revenue: 900 },
  { date: "2025-09-03", revenue: 1700 },
  { date: "2025-09-04", revenue: 800 },
  { date: "2025-09-05", revenue: 1500 },
  { date: "2025-09-06", revenue: 700 },
  { date: "2025-09-07", revenue: 2200 },
];

/* -------------------------
  Mock API Simulations
------------------------- */
async function apiFetchProducts(): Promise<Product[]> {
  return new Promise((res) => setTimeout(() => res(MOCK_PRODUCTS), 300));
}
async function apiFetchOrders(): Promise<Order[]> {
  return new Promise((res) => setTimeout(() => res(MOCK_ORDERS), 300));
}
async function apiCreateProduct(payload: Partial<Product>): Promise<Product> {
  const p: Product = {
    _id: "p" + Date.now(),
    title: payload.title || "Untitled",
    price: payload.price || 0,
    stock: payload.stock || 0,
    category: payload.category || "Other",
    createdAt: new Date().toISOString(),
  };
  return new Promise((res) => setTimeout(() => res(p), 300));
}
async function apiUpdateProduct(
  id: string,
  payload: Partial<Product>
): Promise<Product> {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          _id: id,
          title: payload.title || "Updated",
          price: payload.price || 0,
          stock: payload.stock || 0,
          category: payload.category || "Other",
          createdAt: new Date().toISOString(),
        }),
      300
    )
  );
}
async function apiDeleteProduct(id: string): Promise<{ ok: true }> {
  return new Promise((res) => setTimeout(() => res({ ok: true }), 200));
}
async function apiUpdateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<Order> {
  return new Promise((res) =>
    setTimeout(() => res({ ...MOCK_ORDERS[0], _id: id, status }), 300)
  );
}

/* -------------------------
  Main Component
------------------------- */
export default function SellerDashboard() {
  const [, setLocation] = useLocation();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [salesData] = useState(MOCK_SALES);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: "",
    price: 0,
    stock: 0,
    category: "",
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    async function loadAll() {
      setLoading(true);
      const [p, o] = await Promise.all([
        apiFetchProducts(),
        apiFetchOrders(),
      ]);
      if (!mounted) return;
      setProducts(p);
      setOrders(o);
      setLoading(false);
    }
    loadAll();
    return () => {
      mounted = false;
    };
  }, []);

  const totalRevenue = useMemo(
    () => orders.reduce((s, o) => s + o.total, 0),
    [orders]
  );
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  async function handleAddProduct() {
    if (!newProduct.title) return alert("Product title required");
    setAdding(true);
    const created = await apiCreateProduct(newProduct);
    setProducts((s) => [created, ...s]);
    setNewProduct({ title: "", price: 0, stock: 0, category: "" });
    setAdding(false);
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm("Delete product?")) return;
    await apiDeleteProduct(id);
    setProducts((s) => s.filter((x) => x._id !== id));
  }

  async function handleUpdateStock(id: string, stock: number) {
    const updated = await apiUpdateProduct(id, { stock });
    setProducts((s) => s.map((p) => (p._id === id ? updated : p)));
  }

  async function handleChangeOrderStatus(
    orderId: string,
    status: Order["status"]
  ) {
    const updated = await apiUpdateOrderStatus(orderId, status);
    setOrders((s) => s.map((o) => (o._id === orderId ? updated : o)));
  }

  function goToCreateListing() {
    setLocation("/seller-create-listing");
  }

  return (
    <div className="min-h-screen p-6 bg-pink-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Seller Dashboard</h2>
          <div className="flex gap-2">
            <Button onClick={() => setLocation("/seller-profile")}>
              Profile
            </Button>
            <Button onClick={goToCreateListing}>Create Listing</Button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Revenue</div>
            <div className="text-xl font-bold">
              ₹ {totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last 7 days
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Orders</div>
            <div className="text-xl font-bold">{totalOrders}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Total orders
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Products</div>
            <div className="text-xl font-bold">{totalProducts}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Active listings
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Low stock</div>
            <div className="text-xl font-bold text-rose-600">
              {lowStockCount}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Reorder needed
            </div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Orders + Products */}
          <div className="lg:col-span-2 space-y-4">
            {/* Orders */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Recent Orders</h3>
                <div className="text-sm text-muted-foreground">
                  Showing latest 10
                </div>
              </div>

              {loading ? (
                <div>Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No orders yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div
                      key={o._id}
                      className="flex items-center justify-between p-3 border rounded-md bg-white"
                    >
                      <div>
                        <div className="font-medium">{o.buyerName}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(o.createdAt).toLocaleString()}
                        </div>
                        <div className="text-sm mt-1">
                          {o.items.map((it) => (
                            <span key={it.productId} className="mr-2">
                              {it.title} × {it.qty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">₹ {o.total}</div>
                        <div className="mt-2 flex flex-col items-end gap-2">
                          <select
                            value={o.status}
                            onChange={(e) =>
                              handleChangeOrderStatus(
                                o._id,
                                e.target.value as Order["status"]
                              )
                            }
                            className="px-2 py-1 rounded border"
                          >
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                          <Button
                            size="sm"
                            onClick={() => alert("Open order details")}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Products */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Products</h3>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search product..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <Button onClick={() => setLocation("/seller-create-listing")}>
                    New
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {products
                  .filter((p) =>
                    p.title.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((p) => (
                    <div
                      key={p._id}
                      className="flex items-center justify-between p-3 border rounded-md bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center overflow-hidden">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.title}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-xs">IMG</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{p.title}</div>
                          <div className="text-xs text-muted-foreground">
                            ₹ {p.price.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-sm">
                          Stock:{" "}
                          <input
                            type="number"
                            value={p.stock}
                            min={0}
                            onChange={(e) =>
                              handleUpdateStock(p._id, Number(e.target.value))
                            }
                            className="w-16 border rounded p-1 text-sm"
                          />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => alert("Edit product")}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteProduct(p._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Quick Add Product */}
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Quick Add Product</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  className="p-2 border rounded"
                  placeholder="Title"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct((s) => ({ ...s, title: e.target.value }))
                  }
                />
                <input
                  className="p-2 border rounded"
                  placeholder="Price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct((s) => ({
                      ...s,
                      price: Number(e.target.value),
                    }))
                  }
                />
                <input
                  className="p-2 border rounded"
                  placeholder="Stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct((s) => ({
                      ...s,
                      stock: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="flex gap-2 mt-3">
                <Button onClick={handleAddProduct} disabled={adding}>
                  {adding ? "Adding..." : "Add Product"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setNewProduct({ title: "", price: 0, stock: 0 })
                  }
                >
                  Reset
                </Button>
              </div>
            </Card>
          </div>

          {/* Right: Analytics */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Sales (Last 7 Days)</h3>
              <div style={{ width: "100%", height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#f97316"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#fb923c"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#f97316"
                      fillOpacity={1}
                      fill="url(#colorRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Notifications</h4>
              <div className="text-sm text-muted-foreground">
                No new notifications
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
