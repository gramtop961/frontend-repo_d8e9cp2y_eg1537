import React, { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
            <span className="text-white font-semibold tracking-wide">NFX Creations</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#work" className="text-gray-300 hover:text-white">Work</a>
            <a href="#services" className="text-gray-300 hover:text-white">Services</a>
            <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-white">Menu</button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-black/80 backdrop-blur border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3">
            <a href="#work" className="text-gray-300">Work</a>
            <a href="#services" className="text-gray-300">Services</a>
            <a href="#contact" className="text-gray-300">Contact</a>
          </div>
        </div>
      )}
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#0b0b10]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[90vh]">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Story-driven AI Films and Visuals
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            NFX Creations crafts cinematic AI advertisements, music videos, product showcases, and model shoots. We blend narrative with cutting-edge generative tech to deliver unforgettable campaigns.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition">Start a Project</a>
            <a href="#work" className="inline-flex items-center justify-center rounded-md border border-white/30 text-white px-6 py-3 font-medium hover:bg-white/10 transition">See Our Work</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkGrid() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/projects`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id="work" className="relative bg-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Selected Work</h2>
          <div className="text-sm text-gray-400">Real-time feed</div>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full text-gray-400">Loading...</div>
          )}
          {!loading && items.length === 0 && (
            <div className="col-span-full text-gray-400">No projects yet. Add some via the API.</div>
          )}
          {items.map((item) => (
            <a key={item.id} href={item.video_url || '#'} target="_blank" rel="noreferrer" className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <img src={item.thumbnail_url} alt={item.title} className="h-56 w-full object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-4">
                <div className="text-white font-semibold">{item.title}</div>
                <div className="text-xs text-gray-300">{item.category} {item.tags && '• ' + item.tags.join(', ')}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    {
      title: 'AI Ads',
      desc: 'Narrative-first campaigns generated with advanced diffusion and 3D pipelines.',
    },
    {
      title: 'AI Songs & Visuals',
      desc: 'Custom lyrics, vocals, and VFX paired with striking retro-futurist aesthetics.',
    },
    {
      title: 'Product & Model Shooting',
      desc: 'Studio-grade lighting and text-to-video augmentation for striking showcases.',
    },
    {
      title: 'Creative Direction',
      desc: 'From script to screen — ideation, storyboarding, lookdev, and post.',
    },
  ]
  return (
    <section id="services" className="relative bg-[#0b0b10] py-20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.12),transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Services</h2>
        <p className="mt-3 text-gray-300 max-w-2xl">We design end-to-end productions that fuse human storytelling with AI-driven invention.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
              <div className="text-lg font-semibold">{s.title}</div>
              <div className="mt-2 text-sm text-gray-300">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', budget: '', service: '' })
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Network')
      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '', budget: '', service: '' })
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative bg-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Let’s build something unreal</h2>
            <p className="mt-3 text-gray-300">Tell us about your product, story, or sound — we’ll help bring it to life with AI.</p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-white">
              <form onSubmit={submit} className="grid grid-cols-1 gap-4">
                <input className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400" placeholder="Company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400" placeholder="Budget (optional)" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                  <input className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400" placeholder="Service (optional)" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
                </div>
                <textarea rows={5} className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400" placeholder="Project details" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                <button disabled={status==='loading'} className="inline-flex items-center justify-center rounded-md bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-200 transition">
                  {status==='loading' ? 'Sending…' : 'Send message'}
                </button>
                {status==='success' && <div className="text-emerald-400 text-sm">Thanks — we’ll get back within 24 hours.</div>}
                {status==='error' && <div className="text-red-400 text-sm">Something went wrong. Please try again.</div>}
              </form>
            </div>
          </div>
          <div className="text-gray-300">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-white font-semibold">Why NFX?</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>• Story-first, not prompt-first</li>
                <li>• Hybrid human+AI pipeline</li>
                <li>• Fast iteration, cinematic output</li>
                <li>• End-to-end production</li>
              </ul>
              <div className="mt-6 text-sm">Email: hello@nfxcreations.com</div>
              <div className="text-sm">Instagram: @nfx.creations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="bg-[#0b0b10] border-t border-white/10 text-gray-400 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} NFX Creations. All rights reserved.</div>
        <div className="text-sm">Built with love and AI.</div>
      </div>
    </footer>
  )
}

export default function App(){
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <WorkGrid />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}
