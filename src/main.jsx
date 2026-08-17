import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  LayoutDashboard, Trophy, ScanBarcode, PanelsTopLeft, ClipboardList,
  TriangleAlert, Printer, ListChecks, ChartNoAxesCombined, Settings,
  Search, Bell, ChevronDown, Store, MapPin, TrendingUp, TrendingDown,
  CheckCircle2, AlertTriangle, Tag, FileImage, TimerReset, Target,
  ArrowUpRight, CircleDollarSign, CircleCheckBig, Clock3, PackageSearch
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'
import './styles.css'

const trend = [
  { d:'01', score:91.2, preco:94.1, visual:88.0 },
  { d:'03', score:92.1, preco:95.0, visual:88.9 },
  { d:'05', score:91.7, preco:94.4, visual:88.5 },
  { d:'07', score:93.0, preco:95.7, visual:90.0 },
  { d:'09', score:93.4, preco:96.1, visual:90.4 },
  { d:'11', score:92.9, preco:95.2, visual:90.2 },
  { d:'13', score:94.1, preco:96.8, visual:91.0 },
  { d:'15', score:94.6, preco:97.1, visual:91.7 },
  { d:'17', score:94.2, preco:96.7, visual:91.4 }
]

const stores = [
  {pos:1, store:'ML29', regional:'Raio Bravo', score:98.1, price:99.0, visual:96.2, audited:1824, issues:8, trend:1.2},
  {pos:2, store:'ML26', regional:'Oceano Mara', score:97.6, price:98.4, visual:95.9, audited:1718, issues:11, trend:0.7},
  {pos:3, store:'ML05', regional:'Guardiões da Luz', score:96.8, price:97.9, visual:94.3, audited:1689, issues:15, trend:0.3},
  {pos:4, store:'ML21', regional:'Vento Dourado', score:96.2, price:97.1, visual:94.2, audited:1604, issues:17, trend:0.8},
  {pos:5, store:'ML15', regional:'Raízes do Lar', score:95.7, price:96.9, visual:93.0, audited:1532, issues:21, trend:-0.2},
  {pos:56, store:'ML31', regional:'Raio Bravo', score:79.4, price:84.7, visual:67.1, audited:1332, issues:86, trend:-2.4},
  {pos:57, store:'ML06', regional:'Vento Dourado', score:76.9, price:82.3, visual:64.2, audited:1198, issues:112, trend:-3.1}
]

const categories = [
  {name:'Papelaria', issues:74},
  {name:'Utilidades', issues:61},
  {name:'Organização', issues:46},
  {name:'Cozinha', issues:42},
  {name:'Limpeza', issues:31}
]

const openIssues = [
  {type:'Preço divergente', store:'ML06', item:'Mochila Infantil Fluffy KT MR43273', severity:'Crítica', age:'2h 18m'},
  {type:'Sem etiqueta', store:'ML31', item:'Lápis Preto 3UN Hot Wheels', severity:'Alta', age:'1h 42m'},
  {type:'Cartaz adulterado', store:'ML18', item:'Campanha Volta às Aulas', severity:'Crítica', age:'3h 06m'},
  {type:'Cartaz sem etiqueta', store:'ML42', item:'Pilha promocional - organização', severity:'Alta', age:'54m'},
  {type:'Duplicidade de etiqueta', store:'ML12', item:'Estojo Red Wincy', severity:'Média', age:'38m'}
]

const sessions = [
  {store:'ML02', sector:'Papelaria', corridor:'03', audited:347, ok:333, divergent:9, missing:5, status:'Concluída'},
  {store:'ML17', sector:'Utilidades', corridor:'08', audited:284, ok:274, divergent:7, missing:3, status:'Concluída'},
  {store:'ML31', sector:'Cozinha', corridor:'05', audited:126, ok:103, divergent:14, missing:9, status:'Em andamento'},
  {store:'ML06', sector:'Organização', corridor:'04', audited:198, ok:168, divergent:18, missing:12, status:'Em andamento'}
]

const pieData = [
  {name:'OK', value:2418},
  {name:'Divergentes', value:18},
  {name:'Sem etiqueta', value:592}
]

function App(){
  const [active, setActive] = useState('Cockpit Executivo')
  const [period] = useState('01 a 17 de agosto de 2026')

  const nav = [
    ['Cockpit Executivo', LayoutDashboard],
    ['Ranking de Lojas', Trophy],
    ['Auditoria de Preços', ScanBarcode],
    ['Auditoria de Cartazes', PanelsTopLeft],
    ['Sessões de Auditoria', ClipboardList],
    ['Não Conformidades', TriangleAlert],
    ['Fila de Correções', Printer],
    ['Plano de Ação', ListChecks],
    ['Analytics', ChartNoAxesCombined],
    ['Configurações', Settings],
  ]

  const pageTitle = useMemo(()=>active, [active])

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">A</div>
          <div>
            <strong>Auditoria</strong>
            <span>Integridade de Preços</span>
          </div>
        </div>

        <div className="scope">
          <span>VISÃO ATUAL</span>
          <div><Store size={17}/> Operação Geral <ChevronDown size={15}/></div>
        </div>

        <nav>
          {nav.map(([label,Icon])=>(
            <button
              key={label}
              className={active===label?'active':''}
              onClick={()=>setActive(label)}
            >
              <Icon size={18}/><span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebarFooter">
          <div className="miniStatus"><span className="dot"></span> Ambiente MVP</div>
          <small>Frontend • dados simulados</small>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <span className="eyebrow">PRECIFICAÇÃO & CONFORMIDADE</span>
            <h1>{pageTitle}</h1>
          </div>
          <div className="topActions">
            <div className="search"><Search size={17}/><span>Buscar loja, SKU ou auditoria...</span></div>
            <button className="iconBtn"><Bell size={19}/><i></i></button>
            <div className="user">
              <div className="avatar">WM</div>
              <div><strong>Wagner Mussi</strong><span>Administrador</span></div>
              <ChevronDown size={15}/>
            </div>
          </div>
        </header>

        <section className="content">
          {active==='Cockpit Executivo' ? <Dashboard period={period}/> :
           active==='Ranking de Lojas' ? <Ranking/> :
           active==='Auditoria de Preços' ? <PriceAudit/> :
           active==='Auditoria de Cartazes' ? <PosterAudit/> :
           active==='Sessões de Auditoria' ? <Sessions/> :
           active==='Não Conformidades' ? <Issues/> :
           active==='Fila de Correções' ? <CorrectionQueue/> :
           active==='Plano de Ação' ? <ActionPlan/> :
           active==='Analytics' ? <Analytics/> :
           <SettingsPage/>}
        </section>
      </main>
    </div>
  )
}

function Dashboard({period}){
  return <>
    <div className="filterbar">
      <div><span>Período</span><strong>{period}</strong></div>
      <div><span>Regional</span><strong>Todas as regionais</strong></div>
      <div><span>Loja</span><strong>Todas as lojas</strong></div>
      <button>Aplicar filtros</button>
    </div>

    <div className="heroGrid">
      <div className="heroScore">
        <div className="heroHeader">
          <div><span className="eyebrow">SCORE GERAL DA REDE</span><h2>94,2</h2></div>
          <div className="scoreRing"><span>94%</span></div>
        </div>
        <div className="scoreTrack"><i style={{width:'94.2%'}}></i></div>
        <div className="heroMeta">
          <span><TrendingUp size={16}/> +1,7 p.p. vs período anterior</span>
          <strong>Meta ≥ 95</strong>
        </div>
      </div>

      <MetricCard title="Score de Precificação" value="96,7%" delta="+1,2 p.p." icon={Tag} tone="blue"/>
      <MetricCard title="Score Visual" value="91,4%" delta="+2,0 p.p." icon={FileImage} tone="purple"/>
      <MetricCard title="Produtividade" value="92,8%" delta="55/60 lojas na meta" icon={Target} tone="green"/>
    </div>

    <div className="kpiGrid">
      <MiniKpi label="Etiquetas auditadas" value="91.284" sub="mês atual" icon={ScanBarcode}/>
      <MiniKpi label="Divergências" value="486" sub="0,53% das leituras" icon={AlertTriangle}/>
      <MiniKpi label="Sem etiqueta" value="1.932" sub="2,12% das leituras" icon={PackageSearch}/>
      <MiniKpi label="Correções ≤ 2h" value="88,6%" sub="+3,4 p.p." icon={Clock3}/>
      <MiniKpi label="Reincidência" value="4,1%" sub="-0,8 p.p." icon={TimerReset}/>
    </div>

    <div className="twoCol">
      <Panel title="Evolução dos Scores" subtitle="Rede • últimos 17 dias">
        <div className="legend"><span className="l1">Score geral</span><span className="l2">Precificação</span><span className="l3">Visual</span></div>
        <ResponsiveContainer width="100%" height={285}>
          <AreaChart data={trend}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#275DFF" stopOpacity=".22"/><stop offset="100%" stopColor="#275DFF" stopOpacity="0"/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
            <XAxis dataKey="d"/>
            <YAxis domain={[70,100]}/>
            <Tooltip/>
            <Area type="monotone" dataKey="score" stroke="#275DFF" strokeWidth={3} fill="url(#g1)"/>
            <Area type="monotone" dataKey="preco" stroke="#18a979" strokeWidth={2} fill="transparent"/>
            <Area type="monotone" dataKey="visual" stroke="#8054d8" strokeWidth={2} fill="transparent"/>
          </AreaChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Saúde da Auditoria" subtitle="Resultado consolidado">
        <div className="donutWrap">
          <ResponsiveContainer width="48%" height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={70} outerRadius={95} paddingAngle={4}>
                <Cell fill="#18a979"/><Cell fill="#e44949"/><Cell fill="#f0a530"/>
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
          <div className="donutLegend">
            <strong>3.028</strong><span>itens processados</span>
            <div><i className="ok"></i>OK <b>2.418</b></div>
            <div><i className="bad"></i>Divergentes <b>18</b></div>
            <div><i className="warn"></i>Sem etiqueta <b>592</b></div>
          </div>
        </div>
      </Panel>
    </div>

    <div className="threeCol">
      <Panel title="Melhores lojas" subtitle="Score geral">
        {stores.slice(0,5).map(s=><StoreRow key={s.store} s={s}/>)}
      </Panel>

      <Panel title="Lojas em atenção" subtitle="Menores scores">
        {stores.slice(-2).map(s=><StoreRow key={s.store} s={s} danger/>)}
        <div className="attentionBox">
          <AlertTriangle size={18}/>
          <div><strong>5 lojas abaixo de 85</strong><span>Recomenda-se plano de ação prioritário.</span></div>
        </div>
      </Panel>

      <Panel title="Categorias com mais desvios" subtitle="Últimos 30 dias">
        <ResponsiveContainer width="100%" height={270}>
          <BarChart data={categories} layout="vertical" margin={{left:10}}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
            <XAxis type="number"/>
            <YAxis type="category" dataKey="name" width={85}/>
            <Tooltip/>
            <Bar dataKey="issues" fill="#275DFF" radius={[0,5,5,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>

    <Panel title="Não conformidades prioritárias" subtitle="Fila operacional">
      <div className="table">
        <div className="tr th"><span>Tipo</span><span>Loja</span><span>Item / contexto</span><span>Criticidade</span><span>Tempo aberto</span><span></span></div>
        {openIssues.map((i,n)=><div className="tr" key={n}>
          <span>{i.type}</span><span><b>{i.store}</b></span><span>{i.item}</span>
          <span><Badge>{i.severity}</Badge></span><span>{i.age}</span><span><ArrowUpRight size={17}/></span>
        </div>)}
      </div>
    </Panel>
  </>
}

function Ranking(){
  return <PageShell title="Ranking de Lojas" subtitle="Visão comparativa da conformidade e execução">
    <div className="rankingCards">
      <MetricCard title="Melhor score" value="98,1" delta="ML29 • Raio Bravo" icon={Trophy} tone="green"/>
      <MetricCard title="Média da rede" value="94,2" delta="+1,7 p.p." icon={TrendingUp} tone="blue"/>
      <MetricCard title="Abaixo da meta" value="13" delta="de 60 lojas" icon={AlertTriangle} tone="orange"/>
    </div>
    <Panel title="Ranking consolidado" subtitle="Preço + cartazeamento + execução + correção">
      <div className="rankingTable">
        <div className="rrow head"><span>#</span><span>Loja</span><span>Regional</span><span>Score</span><span>Preço</span><span>Visual</span><span>Auditados</span><span>Desvios</span><span>Tendência</span></div>
        {stores.map(s=><div className="rrow" key={s.store}><span>{s.pos}</span><span><b>{s.store}</b></span><span>{s.regional}</span><span><ScorePill value={s.score}/></span><span>{s.price}%</span><span>{s.visual}%</span><span>{s.audited}</span><span>{s.issues}</span><span className={s.trend>=0?'pos':'neg'}>{s.trend>=0?'+':''}{s.trend}%</span></div>)}
      </div>
    </Panel>
  </PageShell>
}

function PriceAudit(){
  return <PageShell title="Auditoria de Preços" subtitle="Leituras, divergências e ausência de etiquetas">
    <div className="kpiGrid">
      <MiniKpi label="Auditados hoje" value="3.028" sub="+11,4% vs média" icon={ScanBarcode}/>
      <MiniKpi label="Preço correto" value="2.418" sub="79,9%" icon={CircleCheckBig}/>
      <MiniKpi label="Divergentes" value="18" sub="0,59%" icon={CircleDollarSign}/>
      <MiniKpi label="Sem etiqueta" value="592" sub="19,55%" icon={Tag}/>
    </div>
    <Panel title="Auditorias recentes" subtitle="Dados simulados do futuro coletor">
      <div className="table">
        <div className="tr th"><span>Loja</span><span>Setor</span><span>Corredor</span><span>Auditados</span><span>OK</span><span>Divergentes</span></div>
        {sessions.map((s,n)=><div className="tr" key={n}><span><b>{s.store}</b></span><span>{s.sector}</span><span>{s.corridor}</span><span>{s.audited}</span><span className="pos">{s.ok}</span><span className="neg">{s.divergent}</span></div>)}
      </div>
    </Panel>
  </PageShell>
}

function PosterAudit(){
  const rules = [
    ['Conservação', 'Rasgos, sujeira, amassados e falha de impressão'],
    ['Preço & conteúdo', 'Preço vigente, descrição, unidade e código interno'],
    ['Tamanho correto', 'A3, A4, A5, A6 ou A7 conforme exposição'],
    ['Aplicação', 'Suporte PVC, fita, pegboard e posição adequada'],
    ['Etiqueta complementar', 'Cartaz não substitui etiqueta de gôndola'],
    ['Integridade', 'Sem adulterações, rasuras ou produção não autorizada']
  ]
  return <PageShell title="Auditoria de Cartazes" subtitle="Conformidade visual e comunicação de preços">
    <div className="posterGrid">
      {rules.map(([a,b],i)=><div className="ruleCard" key={i}><div className="ruleIcon"><FileImage size={20}/></div><strong>{a}</strong><span>{b}</span><div className="ruleFoot"><CheckCircle2 size={15}/> Regra monitorável</div></div>)}
    </div>
    <Panel title="Tipos de exposição" subtitle="Preparado para o futuro app do coletor">
      <div className="exposureGrid">
        {['Gôndola / módulo','Terminal','Lateral','Gancho / gancheira','Pilha / ilha','Móveis','Aéreos'].map((x,i)=><div className="exposure" key={i}><PanelsTopLeft size={22}/><span>{x}</span></div>)}
      </div>
    </Panel>
  </PageShell>
}

function Sessions(){
  return <PageShell title="Sessões de Auditoria" subtitle="Controle por loja, setor, corredor e gôndola">
    <Panel title="Sessões em andamento e concluídas" subtitle="A sessão será a entidade central do futuro coletor">
      <div className="sessionCards">
        {sessions.map((s,i)=><div className="sessionCard" key={i}>
          <div className="sessionTop"><div><strong>{s.store}</strong><span>{s.sector} • Corredor {s.corridor}</span></div><Badge>{s.status}</Badge></div>
          <div className="sessionNumbers"><span><b>{s.audited}</b> Auditados</span><span><b>{s.ok}</b> OK</span><span><b>{s.divergent}</b> Divergentes</span><span><b>{s.missing}</b> Sem etiqueta</span></div>
          <div className="progress"><i style={{width:`${Math.min(100, s.audited/3.5)}%`}}></i></div>
        </div>)}
      </div>
    </Panel>
  </PageShell>
}

function Issues(){
  return <PageShell title="Não Conformidades" subtitle="Priorização por criticidade, idade e reincidência">
    <Panel title="Fila de desvios" subtitle="Preço, etiqueta, cartaz e aplicação">
      <div className="table">
        <div className="tr th"><span>Tipo</span><span>Loja</span><span>Contexto</span><span>Criticidade</span><span>Tempo</span><span>Status</span></div>
        {openIssues.map((i,n)=><div className="tr" key={n}><span>{i.type}</span><span><b>{i.store}</b></span><span>{i.item}</span><span><Badge>{i.severity}</Badge></span><span>{i.age}</span><span><Badge>Aberta</Badge></span></div>)}
      </div>
    </Panel>
  </PageShell>
}

function CorrectionQueue(){
  return <PageShell title="Fila de Correções" subtitle="Itens identificados em auditoria aguardando ação">
    <div className="queueGrid">
      <MetricCard title="Aguardando impressão" value="128" delta="Etiquetas" icon={Printer} tone="orange"/>
      <MetricCard title="Correção em loja" value="64" delta="Em andamento" icon={ListChecks} tone="blue"/>
      <MetricCard title="SLA vencido" value="11" delta="Prioridade imediata" icon={Clock3} tone="red"/>
    </div>
    <Panel title="Fila operacional" subtitle="Preparada para integração com impressão e coletor">
      <div className="emptyIllustration"><Printer size={44}/><strong>Fila inteligente de correções</strong><span>No backend futuro, divergências e produtos sem etiqueta poderão gerar tarefas ou comandos de impressão automaticamente.</span></div>
    </Panel>
  </PageShell>
}

function ActionPlan(){
  return <PageShell title="Plano de Ação" subtitle="Gestão da correção e melhoria contínua">
    <div className="actionGrid">
      {[
        ['ML06','Revisão completa do corredor 04','Gerente + Líder','Hoje','Em andamento'],
        ['ML31','Mutirão de reposição de etiquetas','Líder Setor','Hoje','Atrasado'],
        ['ML18','Retirada de cartazes não homologados','Gerente','Imediato','Em andamento'],
        ['ML42','Revisão de pilhas promocionais','VM + Loja','Amanhã','Planejado']
      ].map((x,i)=><div className="actionCard" key={i}><div><b>{x[0]}</b><Badge>{x[4]}</Badge></div><strong>{x[1]}</strong><span>{x[2]}</span><small>Prazo: {x[3]}</small></div>)}
    </div>
  </PageShell>
}

function Analytics(){
  return <PageShell title="Analytics" subtitle="Tendências, reincidência e causas">
    <div className="twoCol">
      <Panel title="Ocorrências por categoria" subtitle="Desvios acumulados">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={categories}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="issues" fill="#275DFF" radius={[5,5,0,0]}/></BarChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="Efetividade da correção" subtitle="Indicadores operacionais">
        <div className="analyticsStats">
          <div><span>Correções em até 2 horas</span><b>88,6%</b><i style={{width:'88.6%'}}/></div>
          <div><span>Não conformidades reincidentes</span><b>4,1%</b><i style={{width:'41%'}}/></div>
          <div><span>Sessões finalizadas corretamente</span><b>96,2%</b><i style={{width:'96.2%'}}/></div>
          <div><span>Lojas dentro da meta semanal</span><b>91,7%</b><i style={{width:'91.7%'}}/></div>
        </div>
      </Panel>
    </div>
  </PageShell>
}

function SettingsPage(){
  return <PageShell title="Configurações" subtitle="Parâmetros do score e regras operacionais">
    <div className="settingsGrid">
      {[
        ['Peso • Precificação','45%','Preço correto, divergência e ausência de etiqueta'],
        ['Peso • Visual','25%','Cartazes, aplicação, conservação e padrão'],
        ['Peso • Execução','15%','Meta semanal e cobertura de auditoria'],
        ['Peso • Correção','15%','SLA, reincidência e encerramento'],
        ['Meta semanal','1.500','Etiquetas por loja'],
        ['SLA padrão','2 horas','Não conformidades de alta criticidade']
      ].map((x,i)=><div className="settingCard" key={i}><span>{x[0]}</span><strong>{x[1]}</strong><small>{x[2]}</small></div>)}
    </div>
  </PageShell>
}

function MetricCard({title,value,delta,icon:Icon,tone='blue'}){
  return <div className={`metricCard ${tone}`}><div className="metricIcon"><Icon size={20}/></div><span>{title}</span><strong>{value}</strong><small>{delta}</small></div>
}
function MiniKpi({label,value,sub,icon:Icon}){
  return <div className="miniKpi"><div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div><div className="miniIcon"><Icon size={21}/></div></div>
}
function Panel({title,subtitle,children}){
  return <div className="panel"><div className="panelHead"><div><strong>{title}</strong><span>{subtitle}</span></div><button>Ver detalhes <ArrowUpRight size={15}/></button></div>{children}</div>
}
function StoreRow({s,danger}){
  return <div className="storeRow"><div className={`rankNum ${danger?'danger':''}`}>{s.pos}</div><div className="storeName"><strong>{s.store}</strong><span>{s.regional}</span></div><ScorePill value={s.score}/><span className={s.trend>=0?'pos':'neg'}>{s.trend>=0?<TrendingUp size={15}/>:<TrendingDown size={15}/>} {Math.abs(s.trend)}%</span></div>
}
function ScorePill({value}){ return <span className={`scorePill ${value>=95?'good':value>=85?'mid':'low'}`}>{value}</span>}
function Badge({children}){ return <span className={`badge ${String(children).toLowerCase().includes('crítica')||String(children).toLowerCase().includes('atrasado')?'critical':''}`}>{children}</span>}
function PageShell({title,subtitle,children}){return <><div className="pageIntro"><div><span className="eyebrow">OPERAÇÃO DE PRECIFICAÇÃO</span><h2>{title}</h2><p>{subtitle}</p></div><button className="primary">Nova ação</button></div>{children}</>}

createRoot(document.getElementById('root')).render(<App/>)
