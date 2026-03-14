import { Navbar } from "@/components/layout/Navbar";
import { TripSidebar } from "@/components/layout/TripSidebar";

interface Props {
  params: Promise<{ id: string }>;
}

// TODO: Fetch expenses + trip budget
// const { data: trip } = await supabase.from('trips').select('total_budget, currency').eq('id', params.id).single()
// const { data: expenses } = await supabase.from('expenses').select('*').eq('trip_id', params.id)

export default async function TripBudgetPage({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  return (
    <>
      <Navbar />
      <div className="flex">
        <TripSidebar tripId={params.id} activeTab="budget" />
        <main className="flex-1 max-w-3xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-sand-900 mb-1">
                Budget
              </h1>
              <p className="text-sand-400 text-sm">
                Track spending and stay on target
              </p>
            </div>
            <button className="btn-primary text-sm">+ Add Expense</button>
          </div>

          {/* 
            Person 2: Build budget dashboard here with Recharts
            
            Layout:
            1. Top summary cards:
               - Total budget vs spent (big progress ring)
               - Per-person breakdown (if split_between is used)
               - Days remaining / daily budget remaining
            
            2. Category breakdown (donut chart):
               import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
               Categories: flight, hotel, transport, food, activity, shopping, other
            
            3. Daily spending bar chart:
               import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
               X-axis = each day, bars = spending amount, color = category
            
            4. Expense list:
               - Sortable/filterable table
               - Each row: date, description, category icon, amount, paid_by
               - Click to edit
            
            5. Split summary:
               - Who owes whom
               - "Settle up" calculations
          */}

          {/* Budget overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="card p-5">
              <p className="font-mono text-xs text-sand-400 uppercase tracking-wide mb-1">Budget</p>
              <p className="font-display text-2xl font-bold text-sand-900">$0</p>
              <p className="text-xs text-moss font-medium mt-1">Set a budget →</p>
            </div>
            <div className="card p-5">
              <p className="font-mono text-xs text-sand-400 uppercase tracking-wide mb-1">Spent</p>
              <p className="font-display text-2xl font-bold text-sand-900">$0</p>
              <p className="text-xs text-sand-400 mt-1">0 expenses</p>
            </div>
            <div className="card p-5">
              <p className="font-mono text-xs text-sand-400 uppercase tracking-wide mb-1">Remaining</p>
              <p className="font-display text-2xl font-bold text-moss">$0</p>
              <p className="text-xs text-sand-400 mt-1">On track</p>
            </div>
          </div>

          {/* Charts placeholder */}
          <div className="card p-8 text-center animate-fade-in">
            <p className="text-4xl mb-3">📊</p>
            <p className="text-sand-400 text-sm">
              Charts and expense tracking will appear here.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
