
import { useMemo, useState } from 'react'
export default function WeeklyTestCalendar(){
  const [month, setMonth] = useState(new Date())
  const days = useMemo(()=>{
    const start = new Date(month.getFullYear(), month.getMonth(), 1)
    const end = new Date(month.getFullYear(), month.getMonth()+1, 0)
    const padStart = start.getDay(); const total = padStart + end.getDate()
    const rows = Math.ceil(total/7); const arr:(Date|null)[] = []
    for(let i=0;i<padStart;i++) arr.push(null)
    for(let d=1; d<=end.getDate(); d++) arr.push(new Date(month.getFullYear(), month.getMonth(), d))
    while(arr.length < rows*7) arr.push(null); return arr
  }, [month])
  const isSunday = (d:Date)=> d.getDay()===0
  const upcomingSyllabus = [
    { subject:'Physics', chapters:['Kinematics','Laws of Motion']},
    { subject:'Chemistry', chapters:['Atomic Structure','Chemical Bonding']},
    { subject:'Biology/Math', chapters:['Cell Structure / Quadratic Equations']},
  ]
  return (
    <div className="p-6 relative bottom-20 md:bottom-0">
      <div className="grid md:grid-cols-[2fr_1fr] gap-6">
        <div className="bg-[color:var(--surface)] rounded-lg border border-[color:var(--border)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">{month.toLocaleString(undefined,{month:'long', year:'numeric'})}</div>
            <div className="flex gap-2">
              <button className="chip" onClick={()=>setMonth(new Date(month.getFullYear(), month.getMonth()-1, 1))}>Prev</button>
              <button className="chip" onClick={()=>setMonth(new Date(month.getFullYear(), month.getMonth()+1, 1))}>Next</button>
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-[color:var(--text-2)] text-sm mb-1">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} className="py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d,i)=> d ? (
              <div key={i} className={`aspect-square rounded-md flex items-center justify-center ${isSunday(d) ? 'bg-primary-700 text-white font-semibold' : 'bg-[color:var(--surface)] border border-[color:var(--border)]'}`}>
                {d.getDate()}{isSunday(d)?' • Test':''}
              </div>
            ) : <div key={i}></div>)}
          </div>
        </div>
        <div className="bg-[color:var(--surface)] rounded-lg border border-[color:var(--border)] p-4">
          <h3 className="font-semibold mb-2">Upcoming Sunday Test</h3>
          <p className="text-[color:var(--text-2)] text-sm mb-3">Sundays • 9:00–12:00 IST • NEET/JEE pattern</p>
          <div className="space-y-3">
            {upcomingSyllabus.map((s,idx)=>(
              <div key={idx} className="border border-[color:var(--border)] rounded-md p-3">
                <div className="font-medium">{s.subject}</div>
                <ul className="text-sm text-[color:var(--text-2)] list-disc ml-5">
                  {s.chapters.map((c,i)=><li key={i}>{c}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="btn-primary">Register / Remind Me</button>
            <button className="chip">View Syllabus PDF</button>
          </div>
        </div>
      </div>
    </div>
  )
}
