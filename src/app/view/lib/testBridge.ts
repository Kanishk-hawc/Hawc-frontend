
export type TestResultPayload = { type:'TEST_RESULT', testId:string, userId:string, score:number, sections:Array<{name:string, score:number, total:number}>, startedAt:string, completedAt:string }
export function registerTestBridge(onResult:(p:TestResultPayload)=>void){
  function handler(ev: MessageEvent){
    try{ const data = typeof ev.data === 'string' ? JSON.parse(ev.data) : ev.data; if(data && data.type==='TEST_RESULT'){ onResult(data as TestResultPayload) } }catch{}
  }
  window.addEventListener('message', handler); return ()=> window.removeEventListener('message', handler)
}
