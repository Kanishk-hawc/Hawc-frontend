// pricing.ts (lib/pricing.ts)
export type Plan = { id:string, name:string, price:number, currency:string, perks:string[] };

export function getPlans(region:string, planType: 'stranded' | 'premium' = 'stranded'): Plan[]{
  const INR = (p:number)=> ({currency:'₹', price:p}); 
  const USD = (p:number)=> ({currency:'$', price:p});
  const base = region==='IN' ? INR : USD;
  
  // Define all plans with their prices
  const standardPlans = [
    { id:'free-standard', name:'Free', price:0, perks:['Ads supported','No downloads','Community doubts'] },
    { id:'day-standard', name:'Day Pass', price:299, perks:['All classes 24h','No downloads'] },
    { id:'stranded-month', name:'Stranded / Month', price:5999, perks:['Downloads','Practice sets','Priority support'] },
    { id:'stranded-year', name:'Stranded / Year', price:Math.round(5999 * 12 * 0.8), perks:['Downloads','Practice sets','Priority support', '20% discount'] },
  ];
  
  const premiumPlans = [
    { id:'free-premium', name:'Free', price:0, perks:['Ads supported','No downloads','Community doubts'] },
    { id:'day-premium', name:'Day Pass', price:598, perks:['All classes 24h','No downloads'] },
    { id:'premium-month', name:'Premium Two-Teacher / Month', price:7999, perks:['Two-Teacher live','Downloads','Breakouts'] },
    { id:'premium-year', name:'Premium Two-Teacher / Year', price:Math.round(7999 * 12 * 0.8), perks:['Two-Teacher live','Downloads','Breakouts', '20% discount'] },
  ];
  
  // Return plans based on selected plan type
  if (planType === 'premium') {
    return premiumPlans.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      currency: base(0).currency,
      perks: p.perks
    }));
  }
  
  // Default to standard plans
  return standardPlans.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    currency: base(0).currency,
    perks: p.perks
  }));
}