import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Save, RotateCcw, Bell, Search, ChevronDown, Store, Target, ScanBarcode, PanelsTopLeft, AlertTriangle, Clock3, TrendingUp, Trophy, CheckCircle2, Printer, ListChecks, BarChart3, Settings, ArrowUpRight } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'
import './styles.css'

const trend=[{d:'01',score:91.2,price:94.1,visual:88},{d:'03',score:92.1,price:95,visual:88.9},{d:'05',score:91.7,price:94.4,visual:88.5},{d:'07',score:93,price:95.7,visual:90},{d:'09',score:93.4,price:96.1,visual:90.4},{d:'11',score:92.9,price:95.2,visual:90.2},{d:'13',score:94.1,price:96.8,visual:91},{d:'15',score:94.6,price:97.1,visual:91.7},{d:'17',score:94.2,price:96.7,visual:91.4}]
const stores=[['ML29','Raio Bravo',98.1,1824],['ML26','Oceano Mara',97.6,1718],['ML05','Guardiões da Luz',96.8,1689],['ML31','Raio Bravo',79.4,1332],['ML06','Vento Dourado',76.9,1198]]
const issues=[['Preço divergente','ML06','Mochila Infantil Fluffy','Crítica','2h 18m'],['Sem etiqueta','ML31','Lápis Hot Wheels','Alta','1h 42m'],['Cartaz adulterado','ML18','Volta às Aulas','Crítica','3h 06m'],['Cartaz sem etiqueta','ML42','Pilha promocional','Alta','54m']]
const pie=[{name:'Conforme',value:2418},{name:'Divergente',value:18},{name:'Sem etiqueta',value:592}]
const categories=[{name:'Papelaria',value:74},{name:'Utilidades',value:61},{name:'Organização',value:46},{name:'Cozinha',value:42},{name:'Limpeza',value:31}]

const tabs=['Cockpit','Auditoria de Preços','Auditoria de Cartazes','Lojas','Não Conformidades','Plano de Ação','Análises']

function App(){
 const [tab,setTab]=useState('Cockpit')
 return <div className="shell">
  <header className="suiteHeader">
   <div className="product"><div className="productMark">A</div><div><strong>Auditoria</strong><span>Integridade de preços & comunicação</span></div></div>
   <div className="contextPills"><button className="accentPill">Operação Geral</button><button>Regional Todas</button><button>Agosto 2026</button></div>
   <div className="headerActions"><button className="icon"><Save size={18}/></button><button className="icon"><RotateCcw size={18}/></button><button className="icon"><Bell size={18}/></button><button className="primary">Nova auditoria</button><div className="avatar">WM</div></div>
  </header>
  <nav className="tabs">{tabs.map(x=><button key={x} onClick={()=>setTab(x)} className={tab===x?'active':''}>{x}</button>)}</nav>
  {tab==='Cockpit'?<Cockpit/>:<Module title={tab}/>} 
 </div>
}

function Cockpit(){return <main className="workspace">
 <section className="summaryBar">
  <div className="selector"><span>Escopo / operação</span><strong><Store size={16}/> Operação Geral <ChevronDown size={15}/></strong></div>
  <Summary label="Score da Rede" value="94,2" sub="Meta ≥ 95"/>
  <Summary label="Precificação" value="96,7%" sub="+1,2 p.p."/>
  <Summary label="Cartazeamento" value="91,4%" sub="+2,0 p.p."/>
  <Summary label="Produtividade" value="92,8%" sub="55/60 lojas na meta"/>
 </section>

 <section className="statusStrip">
  <div className="statusHero"><div><span>STATUS OPERACIONAL</span><strong>Rede em atenção</strong><small>5 lojas críticas exigem ação prioritária</small></div><div className="heroScore">94,2</div></div>
  <Mini icon={ScanBarcode} label="Etiquetas auditadas" value="91.284" tone="blue"/>
  <Mini icon={AlertTriangle} label="Divergências" value="486" tone="red"/>
  <Mini icon={PanelsTopLeft} label="Sem etiqueta" value="1.932" tone="orange"/>
  <Mini icon={Clock3} label="Correções ≤ 2h" value="88,6%" tone="green"/>
 </section>

 <section className="mainGrid">
  <Panel title="Evolução da integridade" subtitle="Rede • últimos 17 dias" action="Abrir análise">
   <div className="legend"><i className="b"/>Score geral <i className="g"/>Preço <i className="p"/>Visual</div>
   <ResponsiveContainer width="100%" height={280}><AreaChart data={trend}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="d"/><YAxis domain={[70,100]}/><Tooltip/><Area type="monotone" dataKey="score" stroke="#2c63ff" fill="#2c63ff18" strokeWidth={3}/><Area type="monotone" dataKey="price" stroke="#15aa78" fill="transparent" strokeWidth={2}/><Area type="monotone" dataKey="visual" stroke="#8757e8" fill="transparent" strokeWidth={2}/></AreaChart></ResponsiveContainer>
  </Panel>
  <Panel title="Saúde da auditoria" subtitle="Resultado consolidado" action="Ver detalhes">
   <div className="health"><ResponsiveContainer width="52%" height={250}><PieChart><Pie data={pie} dataKey="value" innerRadius={72} outerRadius={96} paddingAngle={3}><Cell fill="#15aa78"/><Cell fill="#e64b55"/><Cell fill="#f6a623"/></Pie><Tooltip/></PieChart></ResponsiveContainer><div><b>3.028</b><span>itens processados</span><p><i className="g"/>Conformes <strong>2.418</strong></p><p><i className="r"/>Divergentes <strong>18</strong></p><p><i className="o"/>Sem etiqueta <strong>592</strong></p></div></div>
  </Panel>
 </section>

 <section className="lowerGrid">
  <Panel title="Ranking de lojas" subtitle="Conformidade geral" action="Ver ranking">
   <div className="storeList">{stores.map((s,i)=><div className="storeRow" key={s[0]}><span className="posN">{i<3?i+1:'!'}</span><div><b>{s[0]}</b><small>{s[1]}</small></div><strong className={s[2]<85?'badScore':''}>{s[2]}</strong><span>{s[3]} itens</span></div>)}</div>
  </Panel>
  <Panel title="Não conformidades prioritárias" subtitle="Fila operacional" action="Abrir fila">
   <div className="issueList">{issues.map(x=><div className="issueRow" key={x[0]+x[1]}><span className="sev"></span><div><b>{x[0]}</b><small>{x[1]} • {x[2]}</small></div><em>{x[3]}</em><span>{x[4]}</span></div>)}</div>
  </Panel>
  <Panel title="Categorias com mais desvios" subtitle="Últimos 30 dias" action="Analisar">
   <ResponsiveContainer width="100%" height={230}><BarChart data={categories} layout="vertical"><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number"/><YAxis type="category" dataKey="name" width={84}/><Tooltip/><Bar dataKey="value" fill="#ff8a1f" radius={[0,5,5,0]}/></BarChart></ResponsiveContainer>
  </Panel>
 </section>

 <section className="bottomTools">
  <Tool icon={Target} title="Metas de auditoria" text="1.500 etiquetas por semana / loja"/>
  <Tool icon={Printer} title="Fila de correções" text="128 etiquetas aguardando impressão"/>
  <Tool icon={ListChecks} title="Planos de ação" text="11 ações abertas • 3 vencidas"/>
  <Tool icon={BarChart3} title="Analytics" text="Reincidência, SLA e causas"/>
 </section>
 </main>}

function Module({title}){return <main className="workspace"><div className="moduleHead"><div><span>MÓDULO OPERACIONAL</span><h1>{title}</h1><p>Estrutura do MVP preparada para evolução funcional e futura integração com o coletor de dados.</p></div><button className="primary">Nova ação</button></div><div className="moduleCanvas"><div className="empty"><Settings size={34}/><strong>{title}</strong><span>Área funcional pronta para receber a próxima camada operacional.</span></div></div></main>}
function Summary({label,value,sub}){return <div className="summary"><span>{label}</span><strong>{value}</strong><small>{sub}</small></div>}
function Mini({icon:Icon,label,value,tone}){return <div className="mini"><div className={'miniIcon '+tone}><Icon size={18}/></div><span>{label}</span><strong>{value}</strong></div>}
function Panel({title,subtitle,action,children}){return <div className="panel"><div className="panelHead"><div><strong>{title}</strong><span>{subtitle}</span></div><button>{action} <ArrowUpRight size={14}/></button></div>{children}</div>}
function Tool({icon:Icon,title,text}){return <div className="tool"><div><Icon size={19}/></div><span><b>{title}</b><small>{text}</small></span></div>}

createRoot(document.getElementById('root')).render(<App/>)