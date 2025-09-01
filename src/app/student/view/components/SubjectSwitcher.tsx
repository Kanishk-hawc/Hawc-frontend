
type Subject = { id:string, label:string }
export default function SubjectSwitcher({subjects, value, onChange}:{subjects:Subject[], value:string, onChange:(v:string)=>void}){
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}
      className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded-md px-3 py-2 text-sm">
      {subjects.map(s=>(<option key={s.id} value={s.id}>{s.label}</option>))}
    </select>
  )
}
