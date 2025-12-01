'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Database, Save } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const runSeed = async () => {
    // Confirm before wiping data
    if (!confirm("⚠️ WARNING: This will WIPE all current data and reset the database. Continue?")) return;
    
    setSeeding(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST', headers: { 'x-seed-key': 'supply-chain-secure-seed' } });
      if (res.ok) setSeedStatus('success');
      else setSeedStatus('error');
    } catch {
      setSeedStatus('error');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">System Settings</h2>
        <p className="text-sm text-slate-500">Manage your organization preferences and environment configurations.</p>
      </div>

      {/* General Settings (Placeholder for visuals) */}
      <Card className="rounded-sm border-slate-200">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Organization Profile</CardTitle>
          <CardDescription>Update your company details visible in reports.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input id="org-name" defaultValue="SupplyChain Pulse" className="max-w-md" />
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Developer Zone */}
      <Card className="rounded-sm border-red-100 bg-red-50/10">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-red-700">Developer Zone</CardTitle>
          <CardDescription className="text-red-600/80">
            Actions here can be destructive. Proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-md border border-red-200 bg-white p-4">
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-slate-900">Reset Database</h4>
              <p className="text-xs text-slate-500">
                Wipes all products, orders, and suppliers. Re-populates with mock data.
              </p>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={runSeed} 
              disabled={seeding}
            >
              {seeding ? (
                <>Seeding...</> 
              ) : (
                <><Database className="mr-2 h-4 w-4" /> Reset & Seed Data</>
              )}
            </Button>
          </div>
          
          {seedStatus === 'success' && (
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Database reset successfully.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}