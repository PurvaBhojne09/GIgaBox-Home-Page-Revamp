/* ============================================================
   Gigabox — Product detail page (trust without seeing it)
   ============================================================ */
function PdpScreen(props) {
  const p = GB.byId[props.id] || GB.products[0];
  const off = Math.round((1 - p.price/p.mrp)*100);
  const qty = props.getQty(p.id);
  const [tab, setTab] = useState('deliver');

  return (
    <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
      {/* image with floating back */}
      <div style={{ position:'relative', background:`radial-gradient(120% 100% at 40% 20%, #fff, ${p.tone})` }}>
        <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 12px' }}>
          <button onClick={()=>props.go('home')} style={{ width:40, height:40, borderRadius:'50%', background:'#fff', display:'grid', placeItems:'center', boxShadow:'var(--shadow-sm)' }}>
            <Icon name="chevL" size={20} color="var(--ink)" sw={2.2} />
          </button>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={()=>props.toggleWish(p.id)} aria-label="Save to wishlist" style={{ width:40, height:40, borderRadius:'50%', background:'#fff', display:'grid', placeItems:'center', boxShadow:'var(--shadow-sm)' }}><Icon name={props.inWish(p.id)?'heartF':'heart'} size={19} color={props.inWish(p.id)?'var(--danger)':'var(--ink)'} /></button>
            <button onClick={()=>props.go('cart')} style={{ width:40, height:40, borderRadius:'50%', background:'#fff', display:'grid', placeItems:'center', boxShadow:'var(--shadow-sm)', position:'relative' }}>
              <Icon name="bag" size={19} color="var(--ink)" />
              {props.cartCount>0 && <span className="tnum" style={{ position:'absolute', top:-3, right:-3, minWidth:18, height:18, padding:'0 4px', borderRadius:9, background:'var(--leaf)', color:'#fff', fontSize:10, fontWeight:800, display:'grid', placeItems:'center' }}>{props.cartCount}</span>}
            </button>
          </div>
        </div>
        <div style={{ height:210, display:'grid', placeItems:'center' }}>
          <Icon name={p.glyph} size={150} sw={1.1} color="rgba(20,40,30,0.32)" />
        </div>
      </div>

      {/* sheet */}
      <div style={{ background:'var(--paper)', borderRadius:'22px 22px 0 0', marginTop:-18, position:'relative', padding:'18px 16px 0' }}>
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--leaf-ink)' }}>{p.brand}</div>
        <h1 className="disp" style={{ fontSize:22, fontWeight:800, lineHeight:1.12, margin:'4px 0 0', letterSpacing:'-.015em' }}>{p.name}</h1>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
          <span style={{ display:'flex', alignItems:'center', gap:4, background:'var(--forest)', color:'#fff', padding:'3px 8px', borderRadius:8 }}>
            <Icon name="star" size={12} color="var(--butter)" /><span className="tnum" style={{ fontSize:12.5, fontWeight:800 }}>{p.rating}</span>
          </span>
          <span className="tnum" style={{ fontSize:12.5, color:'var(--muted)', fontWeight:600 }}>{p.ratings.toLocaleString('en-IN')} ratings</span>
          <span style={{ color:'var(--line-2)' }}>·</span>
          <span style={{ fontSize:12.5, color:'var(--leaf-ink)', fontWeight:700 }}>Verified buyers</span>
        </div>

        {/* price */}
        <div style={{ display:'flex', alignItems:'baseline', gap:9, marginTop:14 }}>
          <span className="disp tnum" style={{ fontSize:28, fontWeight:800 }}>{RS(p.price)}</span>
          <span className="tnum" style={{ fontSize:15, color:'var(--muted)', textDecoration:'line-through' }}>{RS(p.mrp)}</span>
          <span className="tnum" style={{ fontSize:14, fontWeight:800, color:'var(--leaf-ink)' }}>{off}% off</span>
        </div>
        <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:3 }}>Inclusive of all taxes · {p.blurb}</div>

        {/* delivery promise */}
        <div style={{ display:'flex', gap:9, marginTop:14 }}>
          <div style={{ flex:1, background:'var(--card)', border:'1px solid var(--line)', borderRadius:13, padding:'11px 12px', display:'flex', gap:9, alignItems:'center' }}>
            <Icon name="bolt" size={20} color="var(--leaf)" />
            <div><div style={{ fontSize:12.5, fontWeight:800 }}>In 60 minutes</div><div style={{ fontSize:10.5, color:'var(--muted)' }}>to Sardarpura, before 9:30 PM</div></div>
          </div>
          <button onClick={()=>props.go('schedule')} style={{ width:46, background:'var(--card)', border:'1px solid var(--line)', borderRadius:13, display:'grid', placeItems:'center' }}>
            <Icon name="calendar" size={20} color="var(--forest)" />
          </button>
        </div>

        {/* ===== TRUST BLOCK — answers "can I trust ordering blind" ===== */}
        <div style={{ marginTop:16, background:'var(--forest)', color:'#fff', borderRadius:18, padding:'16px 16px 14px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <Icon name="shield" size={18} color="var(--butter)" />
            <span className="disp" style={{ fontSize:15.5, fontWeight:800 }}>Order with zero risk</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:11, marginTop:13 }}>
            {[
              { t:'Exact brand, or full refund', s:'You ordered Prestige? You get Prestige. Wrong item = instant refund + free pickup.' },
              { t:'7-day no-questions returns', s:'Changed your mind? Hand it back at your door or at the store.' },
              { t:'Brand-sealed & GST-billed', s:'100% genuine, with a proper invoice in your name.' },
            ].map(x => (
              <div key={x.t} style={{ display:'flex', gap:10 }}>
                <Icon name="check" size={18} color="var(--butter)" sw={2.6} style={{ marginTop:1 }} />
                <div><div style={{ fontSize:13, fontWeight:800 }}>{x.t}</div><div style={{ fontSize:11.5, opacity:.85, marginTop:2, lineHeight:1.4 }}>{x.s}</div></div>
              </div>
            ))}
          </div>
          {/* the killer line for a first-timer */}
          <div onClick={()=>props.go('stores')} style={{ cursor:'pointer', marginTop:14, paddingTop:13, borderTop:'1px solid rgba(255,255,255,.16)', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'rgba(242,200,75,.2)', display:'grid', placeItems:'center', flexShrink:0 }}>
              <Icon name="store" size={18} color="var(--butter)" />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:800 }}>Rather see it first?</div>
              <div style={{ fontSize:11.5, opacity:.85 }}>It's on the shelf at our Sardarpura store, 2.3 km away.</div>
            </div>
            <Icon name="chevR" size={18} color="var(--butter)" sw={2.4} />
          </div>
        </div>

        {/* highlights */}
        <div style={{ marginTop:18 }}>
          <div className="disp" style={{ fontSize:16, fontWeight:800, marginBottom:10 }}>Highlights</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:9 }}>
            {p.specs.map(s => (
              <div key={s} style={{ display:'flex', gap:8, alignItems:'flex-start', background:'var(--card)', border:'1px solid var(--line)', borderRadius:12, padding:'11px 12px' }}>
                <Icon name="check" size={15} color="var(--leaf)" sw={2.4} style={{ marginTop:1 }} />
                <span style={{ fontSize:12, fontWeight:600, lineHeight:1.3 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* tabs: delivery / returns */}
        <div style={{ marginTop:18, marginBottom:6 }}>
          <div style={{ display:'flex', gap:18, borderBottom:'1px solid var(--line)' }}>
            {[['deliver','Delivery'],['returns','Returns & warranty']].map(([id,l]) => (
              <button key={id} onClick={()=>setTab(id)} style={{ paddingBottom:9, fontSize:13, fontWeight:800, color: tab===id?'var(--forest)':'var(--muted)', borderBottom:`2px solid ${tab===id?'var(--forest)':'transparent'}`, marginBottom:-1 }}>{l}</button>
            ))}
          </div>
          <div style={{ fontSize:12.5, color:'var(--ink-2)', lineHeight:1.55, padding:'12px 0 4px' }}>
            {tab==='deliver'
              ? 'Free delivery in 60 minutes within Jodhpur city before 9:30 PM. After hours, schedule a morning slot — pay cash or UPI at the door. Live tracking from the moment it leaves our store.'
              : '7-day easy returns with free home pickup. Full manufacturer warranty, serviced through the brand. If the product differs from what is shown here in any way, we refund in full — no questions, no restocking fee.'}
          </div>
        </div>

        <div style={{ height:90 }} />
      </div>

      {/* sticky buy bar */}
      <div style={{ position:'sticky', bottom:0, background:'var(--card)', borderTop:'1px solid var(--line)', padding:'10px 14px', display:'flex', gap:11, alignItems:'center' }}>
        <div style={{ minWidth:78 }}>
          <div className="tnum disp" style={{ fontSize:19, fontWeight:800 }}>{RS(p.price)}</div>
          <div className="tnum" style={{ fontSize:10.5, color:'var(--leaf-ink)', fontWeight:700 }}>{off}% off</div>
        </div>
        {qty===0 ? (
          <button onClick={()=>props.add(p.id)} style={{ flex:1, height:50, borderRadius:14, background:'var(--leaf)', color:'#fff', fontWeight:800, fontSize:15, display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:'0 6px 16px rgba(24,147,92,.32)' }}>
            <Icon name="bag" size={19} color="#fff" /> Add to cart
          </button>
        ) : (
          <div style={{ flex:1, display:'flex', gap:11, alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:50, width:120, borderRadius:14, background:'var(--leaf-soft)', border:'1px solid rgba(24,147,92,.3)', padding:'0 6px' }}>
              <button onClick={()=>props.dec(p.id)} style={{ width:38, height:38, display:'grid', placeItems:'center' }}><Icon name="minus" size={18} color="var(--leaf-ink)" sw={2.6} /></button>
              <span className="tnum" style={{ fontWeight:800, fontSize:17, color:'var(--leaf-ink)' }}>{qty}</span>
              <button onClick={()=>props.inc(p.id)} style={{ width:38, height:38, display:'grid', placeItems:'center' }}><Icon name="plus" size={18} color="var(--leaf-ink)" sw={2.6} /></button>
            </div>
            <button onClick={()=>props.go('cart')} style={{ flex:1, height:50, borderRadius:14, background:'var(--forest)', color:'#fff', fontWeight:800, fontSize:15 }}>Go to cart</button>
          </div>
        )}
      </div>
    </div>
  );
}

window.PdpScreen = PdpScreen;
