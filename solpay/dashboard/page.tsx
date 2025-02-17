"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionHistory } from "@/components/dashboard/transaction-history"
import { PaymentLinkGenerator } from "@/components/dashboard/payment-link-generator"
import { AccountSettings } from "@/components/dashboard/account-settings"
import { ApiKeys } from "@/components/dashboard/api-keys"
import { Webhooks } from "@/components/dashboard/webhooks"
import { Payouts } from "@/components/dashboard/payouts"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10"
    >
      <h1 className="text-3xl font-bold mb-6">Merchant Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payment-links">Payment Links</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          {/* Existing overview content */}
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment-links">
          <Card>
            <CardHeader>
              <CardTitle>Generate Payment Link</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentLinkGenerator />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <ApiKeys />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <Webhooks />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <Payouts />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <AccountSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

