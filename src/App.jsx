import { useEffect, useMemo, useRef, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between text-white">
          <a href="#" className="font-black tracking-widest text-xl">NFX CREATIONS</a>
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wide">
            <a href="#work" className="hover:text-cyan-300 cursor-hover">Work</a>
            <a href="#services" className="hover:text-cyan-300 cursor-hover">Services</a>
            <a href="#contact" className="hover:text-cyan-300 cursor-hover">Contact</a>
          </nav>
          <button className="md:hidden inline-flex items-center" onClick={()=>setOpen(v=>!v)}>
            <span className="i-lucide-menu"/>
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <nav className="px-6 py-4 grid gap-3 text-white/90">
            <a href="#work" className="cursor-hover" onClick={()=>setOpen(false)}>Work</a>
            <a href="#services" className="cursor-hover" onClick={()=>setOpen(false)}>Services</a>
            <a href="#contact" className="cursor-hover" onClick={()=>setOpen(false)}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const parallaxRef = useRef(null)
  const glowLeftRef = useRef(null)
  const glowRightRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!loaded) setFailed(true)
    }, 6000)
    return () => clearTimeout(timerRef.current)
  }, [loaded])

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`
      }
      if (glowLeftRef.current) {
        glowLeftRef.current.style.transform = `translate(${(-x*30).toFixed(1)}px, ${(y*30).toFixed(1)}px)`
      }
      if (glowRightRef.current) {
        glowRightRef.current.style.transform = `translate(${(x*40).toFixed(1)}px, ${(-y*40).toFixed(1)}px)`
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY
      const slow = sc * 0.08
      if (parallaxRef.current) parallaxRef.current.style.translate = `0 ${slow * -0.5}px`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-[#0b0e13] overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.12),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.10),transparent_40%)]"/>
      <div ref={glowLeftRef} className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-cyan-500/20 blur-3xl"/>
      <div ref={glowRightRef} className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-3xl"/>

      <div ref={parallaxRef} className="relative z-10 w-full max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-center will-change-transform transition-transform duration-200">
        <div className="text-white">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-300/80">Futuristic • Cinematic • AI</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            Story‑Driven AI Advertisements and Visual Worlds
          </h1>
          <p className="mt-5 text-white/70 max-w-prose">
            We craft cinematic AI ads, music visuals, and product films that feel alive. From concept to cut, our pipeline blends human taste with generative power.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="px-5 py-3 rounded-md bg-white text-black font-semibold hover:bg-cyan-300 transition cursor-hover">See Work</a>
            <a href="#contact" className="px-5 py-3 rounded-md border border-white/20 text-white hover:border-cyan-300/60 hover:text-cyan-200 transition cursor-hover">Start a Project</a>
          </div>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
          {!failed && (
            <iframe
              className="w-full h-full"
              src="https://my.spline.design/untitled-9a8a3f26a0aa1a4fe8b6a386830a1b31/"
              title="Spline scene"
              frameBorder="0"
              loading="lazy"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              onLoad={() => { setLoaded(true); clearTimeout(timerRef.current) }}
            />
          )}
          {(!loaded || failed) && (
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-tr from-[#0b0e13] to-black">
              <div className="text-center px-6">
                <div className="mx-auto h-14 w-14 rounded-full border-2 border-white/20 border-t-cyan-400 animate-spin mb-4"/>
                <p className="text-white/80">Loading interactive scene…</p>
                <p className="text-white/50 text-sm">If this takes too long, we’ll show a fallback.</p>
              </div>
            </div>
          )}
          {failed && (
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1558980664-10ea8d8bde53?q=80&w=1400&auto=format&fit=crop"
                alt="Cyberpunk city"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent"/>
              <div className="absolute bottom-4 left-4 right-4 text-white/80 text-sm">
                Interactive 3D unavailable on this device/network. Showing a cinematic fallback.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function WorkGrid() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const gridRef = useRef(null)

  useEffect(() => {
    const url = `${BACKEND_URL}/projects${filter ? `?category=${encodeURIComponent(filter)}` : ''}`
    fetch(url)
      .then(r => r.json())
      .then(setItems)
      .catch(()=>setItems([]))
      .finally(()=>setLoading(false))
  }, [filter])

  useEffect(() => {
    const onScroll = () => {
      const cards = gridRef.current?.querySelectorAll('[data-card]') || []
      const vh = window.innerHeight
      cards.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const visible = Math.min(1, Math.max(0, 1 - (rect.top - vh) / vh))
        el.style.transform = `translateY(${(1 - visible) * 20}px)`
        el.style.opacity = String(0.4 + visible * 0.6)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  const categories = useMemo(()=>['All','AI Ad','Music Video','Product','Model Shoot','Visuals'],[])

  return (
    <section id="work" className="relative bg-[#0b0e13] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold">Selected Work</h2>
          <div className="flex items-center gap-2 text-sm">
            {categories.map(c => {
              const active = (c==='All' && !filter) || c===filter
              return (
                <button key={c} className={`px-3 py-1.5 rounded-full border ${active? 'border-cyan-300 text-black bg-cyan-300':'border-white/20 text-white/80 hover:text-white'} cursor-hover`} onClick={()=>setFilter(c==='All'?'':c)}>
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        {loading ? (
          <p className="mt-12 text-white/60">Loading projects…</p>
        ) : (
          <div ref={gridRef} className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.length === 0 && (
              <div className="col-span-full text-white/60">No projects yet. Add via POST /projects.</div>
            )}
            {items.map(p => (
              <a key={p.id} data-card href={p.video_url || p.thumbnail_url} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 will-change-transform transition-transform duration-300 hover:translate-y-[-4px] cursor-hover">
                <img src={p.thumbnail_url} alt={p.title} className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition"/>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-cyan-300/90">{p.category}</div>
                    <div className="font-semibold">{p.title}</div>
                  </div>
                  <div className="flex gap-1 text-[10px] text-white/70">
                    {(p.tags||[]).slice(0,3).map(t=> <span key={t} className="px-2 py-0.5 rounded-full bg-black/50 border border-white/10">{t}</span>)}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Services() {
  const services = [
    { title: 'AI Commercials', desc: 'End‑to‑end story, boards, voice, shoot, and gen‑AI comp for cinematic ads.', accent: 'from-cyan-400 to-fuchsia-500' },
    { title: 'Music Visuals', desc: 'Concept‑driven visualizers and videos blending motion design and AI style.', accent: 'from-indigo-400 to-cyan-400' },
    { title: 'Product Films', desc: 'Launch films and hero loops for websites, UGC, and performance ads.', accent: 'from-rose-400 to-amber-300' },
    { title: 'Model Shoots', desc: 'Fashion‑forward campaigns and look‑books with bold lighting and color.', accent: 'from-emerald-400 to-teal-300' },
  ]
  return (
    <section id="services" className="bg-[#0b0e13] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Services</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => (
            <div key={s.title} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 will-change-transform transition-transform duration-300 hover:-translate-y-1 cursor-hover">
              <div className={`absolute -top-10 -right-10 h-32 w-32 bg-gradient-to-br ${s.accent} opacity-40 blur-2xl rounded-full`} />
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-white/70 mt-2 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({name:'', email:'', company:'', message:'', budget:'', service:''})
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Thanks — we\'ll get back within 24 hours.')
      setForm({name:'', email:'', company:'', message:'', budget:'', service:''})
    } catch (e) {
      setStatus('Something went wrong. Please email us at hello@nfxcreations.com')
    }
  }

  return (
    <section id="contact" className="bg-[#0b0e13] text-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Let\'s build something cinematic</h2>
        <form onSubmit={submit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required placeholder="Name" className="bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-cyan-300" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <input required type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-cyan-300" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
          <input placeholder="Company" className="bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-cyan-300" value={form.company} onChange={e=>setForm({...form, company:e.target.value})}/>
          <select className="bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-cyan-300" value={form.service} onChange={e=>setForm({...form, service:e.target.value})}>
            <option value="">Service</option>
            <option>AI Commercials</option>
            <option>Music Visuals</option>
            <option>Product Films</option>
            <option>Model Shoots</option>
          </select>
          <input placeholder="Budget (optional)" className="bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-cyan-300" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})}/>
          <textarea required placeholder="Project details" rows={5} className="sm:col-span-2 bg-white/5 border border-white/10 rounded px-4 py-3 outline-none focus:border-cyan-300" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
          <button className="sm:col-span-2 justify-self-start px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-cyan-300 transition cursor-hover">Send</button>
          <div className="sm:col-span-2 text-white/70">{status}</div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-black text-white/70 py-10 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} NFX Creations</div>
        <div className="flex gap-4">
          <a href="#work" className="hover:text-white cursor-hover">Work</a>
          <a href="#services" className="hover:text-white cursor-hover">Services</a>
          <a href="#contact" className="hover:text-white cursor-hover">Contact</a>
        </div>
      </div>
    </footer>
  )
}

function CursorFX() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hover, setHover] = useState(false)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }
    const onOver = (e) => {
      if (e.target.closest('.cursor-hover, a, button, input, select, textarea')) setHover(true)
    }
    const onOut = (e) => {
      if (e.target.closest('.cursor-hover, a, button, input, select, textarea')) setHover(false)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    const loop = () => {
      const dx = targetRef.current.x - currentRef.current.x
      const dy = targetRef.current.y - currentRef.current.y
      currentRef.current.x += dx * 0.18
      currentRef.current.y += dy * 0.18
      setPos({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen">
      <div
        style={{ transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)` }}
        className="h-3 w-3 rounded-full bg-white/90 shadow-[0_0_20px_6px_rgba(34,211,238,0.45)]"
      />
      <div
        style={{ transform: `translate(${pos.x - (hover?24:16)}px, ${pos.y - (hover?24:16)}px)`, opacity: hover?0.9:0.6 }}
        className={`rounded-full border ${hover? 'h-12 w-12 border-cyan-300 bg-cyan-300/10':'h-8 w-8 border-white/30 bg-white/5'} transition-all duration-150`}
      />
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-[#0b0e13] min-h-screen">
      <CursorFX />
      <Navbar />
      <Hero />
      <WorkGrid />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}
