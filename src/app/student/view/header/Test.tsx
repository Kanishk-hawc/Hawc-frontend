
import { Link } from 'react-router-dom'
export default function Tests(){
  return (
    <div className="p-6 relative bottom-20 md:bottom-0">
      <h2 className="text-2xl font-semibold mb-2">Tests</h2>
      <p className="text-[color:var(--text-2)] mb-4">Quick quizzes, full mocks (NEET/JEE), and the All-India Weekly Test series.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/tests/weekly" className="rounded-lg border border-[color:var(--border)] p-4 bg-[color:var(--surface)] hover:bg-[color:var(--bg)]">Weekly Tests →</Link>
        <Link to="/test-portal" className="rounded-lg border border-[color:var(--border)] p-4 bg-[color:var(--surface)] hover:bg-[color:var(--bg)]">Open Test Portal (PHP) →</Link>
        <a href="#" className="rounded-lg border border-[color:var(--border)] p-4 bg-[color:var(--surface)] pointer-events-none opacity-60">Mock Tests (native) — coming soon</a>
      </div>
    </div>
  )
}






