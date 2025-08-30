// pricing.ts (lib/pricing.ts)
export type Plan = { id:string, name:string, price:number, currency:string, perks:string[], originalPrice?: number, discountText?: string };

export function getPlans(region:string, planType: 'stranded' | 'premium' = 'stranded'): Plan[]{
  const INR = (p:number)=> ({currency:'₹', price:p}); 
  const USD = (p:number)=> ({currency:'$', price:p});
  const base = region==='IN' ? INR : USD;
  
  const standardPlans = [
    { 
      id:'free-standard', 
      name:'Free', 
      price:0, 
      perks:['Ads supported','No downloads','Community doubts'] 
    },
    { 
      id:'day-standard', 
      name:'Day Pass', 
      price:199, 
      perks:['All classes 24h','No downloads'] 
    },
    { 
      id:'standard-month', 
      name:'Standard / Month', 
      price:3499, 
      originalPrice: 6000,
      discountText: 'One week free',
      perks:['Downloads','Practice sets','Priority support'] 
    },
    { 
      id:'standard-year', 
      name:'Standard / Year', 
      price:34990, 
      originalPrice: 42000,
      discountText: 'Two months free',
      perks:['Downloads','Practice sets','Priority support', '10% discount'] 
    },
  ];
  
  const premiumPlans = [
    { 
      id:'free-premium', 
      name:'Free', 
      price:0, 
      perks:['Ads supported','No downloads','Community doubts'] 
    },
    { 
      id:'day-premium', 
      name:'Day Pass', 
      price:499, 
      perks:['All classes 24h','No downloads'] 
    },
    { 
      id:'premium-month', 
      name:'Premium Two-Teacher / Month', 
      price:9999, 
      originalPrice: 14000,
      discountText: 'One week free',
      perks:['Two-Teacher live','Downloads','Breakouts'] 
    },
    { 
      id:'premium-year', 
      name:'Premium Two-Teacher / Year', 
      price:89999, 
      originalPrice: 120000,
      discountText: 'Two months free',
      perks:['Two-Teacher live','Downloads','Breakouts', '25% discount'] 
    },
  ];
  
  if (planType === 'premium') {
    return premiumPlans.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      discountText: p.discountText,
      currency: base(0).currency,
      perks: p.perks
    }));
  }
  
  return standardPlans.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    discountText: p.discountText,
    currency: base(0).currency,
    perks: p.perks
  }));
}