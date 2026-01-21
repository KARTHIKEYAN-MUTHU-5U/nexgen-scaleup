"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Users, MessageSquare, MousePointer, DollarSign } from "lucide-react";

// Mock data for charts
const monthlyData = [
    { name: "Jan", messages: 4000, contacts: 2400, clicks: 2400, revenue: 5600 },
    { name: "Feb", messages: 3000, contacts: 1398, clicks: 2210, revenue: 4800 },
    { name: "Mar", messages: 2000, contacts: 9800, clicks: 2290, revenue: 7200 },
    { name: "Apr", messages: 2780, contacts: 3908, clicks: 2000, revenue: 6400 },
    { name: "May", messages: 1890, contacts: 4800, clicks: 2181, revenue: 8900 },
    { name: "Jun", messages: 2390, contacts: 3800, clicks: 2500, revenue: 9200 },
    { name: "Jul", messages: 3490, contacts: 4300, clicks: 2100, revenue: 10100 },
];

const campaignPerformance = [
    { name: "Email", value: 35, color: "#3b82f6" },
    { name: "WhatsApp", value: 45, color: "#10b981" },
    { name: "SMS", value: 20, color: "#f59e0b" },
];

const deviceData = [
    { name: "Mobile", sessions: 4500 },
    { name: "Desktop", sessions: 3200 },
    { name: "Tablet", sessions: 1100 },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">
                    Track your campaign performance, engagement metrics, and revenue insights.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$52,200</div>
                        <div className="flex items-center text-xs text-green-600">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            <span>+12.5% from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">32,406</div>
                        <div className="flex items-center text-xs text-green-600">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            <span>+8.2% from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">19,960</div>
                        <div className="flex items-center text-xs text-red-600">
                            <TrendingDown className="mr-1 h-3 w-3" />
                            <span>-2.1% from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
                        <MousePointer className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24.8%</div>
                        <div className="flex items-center text-xs text-green-600">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            <span>+4.3% from last month</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Revenue Trend</CardTitle>
                                <CardDescription>Monthly revenue performance over the last 7 months</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={350}>
                                    <AreaChart data={monthlyData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#3b82f6"
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Campaign Distribution</CardTitle>
                                <CardDescription>Message distribution by channel</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart>
                                        <Pie
                                            data={campaignPerformance}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {campaignPerformance.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Growth</CardTitle>
                            <CardDescription>New contacts acquired over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="contacts" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="campaigns" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Messages Sent</CardTitle>
                            <CardDescription>Total messages sent across all channels</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Performing Campaigns</CardTitle>
                                <CardDescription>Highest engagement rates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {["Summer Sale Promo", "Product Launch", "Customer Retention"].map((campaign, i) => (
                                        <div key={i} className="flex items-center">
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">{campaign}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {(45 - i * 5)}% engagement rate
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium">
                                                {(12000 - i * 2000).toLocaleString()} sent
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Campaign Status</CardTitle>
                                <CardDescription>Active campaigns overview</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">Active Campaigns</p>
                                            <p className="text-sm text-muted-foreground">Currently running</p>
                                        </div>
                                        <div className="ml-auto text-2xl font-bold text-green-600">12</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">Scheduled</p>
                                            <p className="text-sm text-muted-foreground">Queued for delivery</p>
                                        </div>
                                        <div className="ml-auto text-2xl font-bold text-blue-600">5</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">Completed</p>
                                            <p className="text-sm text-muted-foreground">Last 30 days</p>
                                        </div>
                                        <div className="ml-auto text-2xl font-bold text-gray-600">28</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="engagement" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Click-Through Rate</CardTitle>
                            <CardDescription>Engagement metrics over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Device Breakdown</CardTitle>
                            <CardDescription>Sessions by device type</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={deviceData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip />
                                    <Bar dataKey="sessions" fill="#8b5cf6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
