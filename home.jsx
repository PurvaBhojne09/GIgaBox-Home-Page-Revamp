/* ============================================================
   Gigabox — Home screen + header + marketing banners
   ============================================================ */
const GBS = window.GB;

/* ---------------- animated typing search placeholder ---------------- */
function useTypingPlaceholder(terms) {
  const [text, setText] = useState('');
  useEffect(() => {
    let ti = 0, ci = 0, deleting = false, timer;
    const tick = () => {
      const term = terms[ti];
      if (!deleting) {
        ci++;
        setText(term.slice(0, ci));
        if (ci === term.length) { deleting = true; timer = setTimeout(tick, 1400); return; }
        timer = setTimeout(tick, 90);
      } else {
        ci--;
        setText(term.slice(0, ci));
        if (ci === 0) { deleting = false; ti = (ti + 1) % terms.length; timer = setTimeout(tick, 320); return; }
        timer = setTimeout(tick, 42);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);
  return text;
}

/* ---------------- time-aware delivery header ---------------- */
function HomeHeader({ closed, tab, setTab, onSearch, onSchedule, store, onWishlist, onCart, onProfile, onContact, wishCount, cartCount, openPicker }) {
  const tabs = [
    { id:'all', label:'All' },
    { id:'kitchen', label:'Kitchen' },
    { id:'sports', label:'Sports' },
  ];
  const typed = useTypingPlaceholder(['yoga mat','pressure cooker','cricket bat','air fryer']);
  return (
    <div style={{ background:'var(--forest)', color:'#fff', padding:'2px 14px 0' }}>
      {/* delivery + actions row */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', minHeight:46, gap:8 }}>
        <div style={{ flex:1, minWidth:0 }}>
          {!closed ? (
            <button onClick={openPicker} style={{ textAlign:'left', color:'#fff' }}>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <Icon name="bolt" size={16} color="var(--butter)" />
                <span className="disp" style={{ fontSize:16, fontWeight:800, letterSpacing:'-.01em', whiteSpace:'nowrap' }}>60-min delivery</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:1, opacity:.92 }}>
                <span style={{ width:6, height:6, borderRadius:6, background:'#4ED88A', flexShrink:0 }} />
                <span style={{ fontSize:11, fontWeight:700, whiteSpace:'nowrap' }}>Open now</span>
                <span style={{ fontSize:11, fontWeight:500, opacity:.8, whiteSpace:'nowrap' }}>· {store.area.replace(', Jodhpur','')}</span>
                <Icon name="chevD" size={12} color="#fff" sw={2} />
              </div>
            </button>
          ) : (
            <button onClick={onSchedule} style={{ textAlign:'left', color:'#fff' }}>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ width:7, height:7, borderRadius:7, background:'#E8704F', flexShrink:0 }} />
                <span className="disp" style={{ fontSize:15, fontWeight:800, whiteSpace:'nowrap' }}>Opens at 7:00 AM</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:2 }}>
                <span style={{ fontSize:11, fontWeight:700, color:'var(--butter)' }}>Schedule for the morning</span>
                <Icon name="chevR" size={12} color="var(--butter)" sw={2.4} />
              </div>
            </button>
          )}
        </div>
        <div style={{ display:'flex', gap:8, flexShrink:0 }}>
          <button onClick={onWishlist} aria-label="Wishlist" style={circBtn}>
            <Icon name={wishCount>0?'heartF':'heart'} size={18} color={wishCount>0?'var(--danger)':'var(--forest)'} />
            {wishCount>0 && <span style={badge}>{wishCount}</span>}
          </button>
          <button onClick={onCart} aria-label="Basket" style={circBtn}>
            <Icon name="cart" size={18} color="var(--forest)" sw={1.9} />
            {cartCount>0 && <span style={badge}>{cartCount}</span>}
          </button>
        </div>
      </div>

      {/* search with animated typing placeholder */}
      <button onClick={onSearch} style={{
        display:'flex', alignItems:'center', gap:9, width:'100%', height:42, margin:'8px 0 9px',
        background:'#fff', borderRadius:12, padding:'0 12px', color:'var(--muted)', textAlign:'left',
      }}>
        <Icon name="search" size={18} color="var(--muted)" />
        <span style={{ flex:1, fontSize:13.5, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden' }}>
          Search <span style={{ color:'var(--ink-2)' }}>“{typed}</span><span className="gb-caret">|</span><span style={{ color:'var(--ink-2)' }}>”</span>
        </span>
        <Icon name="scan" size={19} color="var(--ink-2)" />
      </button>

      {/* tabs — equal weight, All default */}
      <div style={{ display:'flex', gap:4 }}>
        {tabs.map(t => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              position:'relative', padding:'9px 14px 11px', color:'#fff',
              opacity: active?1:.72, fontWeight: active?800:600, fontSize:14.5,
              display:'flex', alignItems:'center', gap:5,
            }}>
              {t.label}
              {active && <span style={{ position:'absolute', left:12, right:12, bottom:0, height:3, borderRadius:3, background:'var(--butter)' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
const circBtn = { position:'relative', width:38, height:38, borderRadius:'50%', background:'#fff', display:'grid', placeItems:'center', boxShadow:'0 2px 6px rgba(0,0,0,.18)' };
const badge = { position:'absolute', top:-4, right:-4, minWidth:17, height:17, padding:'0 4px', borderRadius:9, background:'var(--butter)', color:'var(--butter-ink)', fontSize:10, fontWeight:800, display:'grid', placeItems:'center', border:'1.5px solid var(--forest)', fontVariantNumeric:'tabular-nums' };

/* ---------------- marketing banner carousel ---------------- */
function StorefrontArt({ small }) {
  // simple geometric storefront — on-brand motif, not a detailed drawing
  const s = small ? 0.8 : 1;
  return (
    <svg width={120*s} height={96*s} viewBox="0 0 120 96" style={{ display:'block' }}>
      <rect x="18" y="40" width="84" height="52" rx="3" fill="var(--forest)" />
      <rect x="26" y="52" width="68" height="40" rx="2" fill="#fff" opacity=".96" />
      <circle cx="60" cy="72" r="11" fill="none" stroke="var(--forest)" strokeWidth="2.4" />
      <circle cx="60" cy="72" r="3.4" fill="var(--forest)" />
      {/* awning */}
      <path d="M12 40 Q12 30 22 30 H98 Q108 30 108 40 V44 H12 Z" fill="var(--forest)" />
      {[0,1,2,3,4,5].map(i => (
        <path key={i} d={`M${12+i*16} 44 q8 9 16 0`} fill={i%2? 'var(--butter)':'#fff'} stroke="var(--forest)" strokeWidth="1.2" />
      ))}
      <rect x="40" y="20" width="40" height="13" rx="2.5" fill="var(--forest)" />
      <text x="60" y="29.5" textAnchor="middle" fontFamily="Bricolage Grotesque" fontWeight="800" fontSize="8" fill="#fff" letterSpacing="0.5">GIGABOX</text>
    </svg>
  );
}

function Banner({ b, onCta }) {
  const themes = {
    omni:   { bg:'linear-gradient(120deg,#F7EFD6,#F1E4BE)', ink:'var(--forest)' },
    speed:  { bg:'linear-gradient(120deg,#E7F2E9,#D4ECDA)', ink:'var(--forest)' },
    sports: { bg:'linear-gradient(120deg,#EDE8F4,#E0E6F3)', ink:'var(--forest)' },
  };
  const th = themes[b.kind];
  return (
    <div style={{
      position:'relative', borderRadius:18, overflow:'hidden', background:th.bg,
      padding:'16px 16px 16px', minHeight:148, display:'flex', alignItems:'center',
      border:'1px solid var(--line)',
    }}>
      <div style={{ flex:1, paddingRight:8, zIndex:2 }}>
        <div style={{ fontSize:10, fontWeight:800, letterSpacing:'.1em', color:'var(--leaf-ink)', marginBottom:6 }}>{b.eyebrow}</div>
        <div className="disp" style={{ fontSize:19, fontWeight:800, lineHeight:1.12, color:th.ink, whiteSpace:'pre-line', letterSpacing:'-.015em' }}>{b.title}</div>
        <div style={{ fontSize:11.5, color:'var(--ink-2)', marginTop:6, lineHeight:1.35, maxWidth:200 }}>{b.sub}</div>
        <button onClick={onCta} style={{
          marginTop:11, background:'var(--forest)', color:'#fff', fontWeight:700, fontSize:12.5,
          padding:'8px 15px', borderRadius:10, display:'inline-flex', alignItems:'center', gap:5,
        }}>{b.cta} <Icon name="chevR" size={14} color="#fff" sw={2.4} /></button>
      </div>
      <div style={{ width:120, display:'grid', placeItems:'center', zIndex:1 }}>
        {b.kind==='omni' && <StorefrontArt />}
        {b.kind==='speed' && <div style={artCircle}><Icon name="bolt" size={64} color="var(--leaf)" /></div>}
        {b.kind==='sports' && <div style={artCircle}><Icon name="bat" size={62} color="var(--forest-2)" sw={1.4} /></div>}
      </div>
    </div>
  );
}
const artCircle = { width:110, height:110, borderRadius:'50%', background:'rgba(255,255,255,.6)', display:'grid', placeItems:'center', border:'1px solid var(--line)' };

function BannerCarousel({ onCta }) {
  const [i, setI] = useState(0);
  const list = GBS.banners;
  const drag = useRef({ x:0, active:false });
  const go = (k) => setI(Math.max(0, Math.min(list.length-1, k)));
  // manual swipe only — no auto-rotation (avoids banner blindness)
  const onDown = (e) => { drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX, active:true }; };
  const onUp = (e) => {
    if (!drag.current.active) return;
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const dx = x - drag.current.x;
    if (dx < -36) go(i+1); else if (dx > 36) go(i-1);
    drag.current.active = false;
  };
  return (
    <div style={{ padding:'12px 16px 0' }}>
      <div style={{ overflow:'hidden', borderRadius:18, touchAction:'pan-y' }}
        onPointerDown={onDown} onPointerUp={onUp}
        onTouchStart={onDown} onTouchEnd={onUp}>
        <div style={{ display:'flex', transform:`translateX(-${i*100}%)`, transition:'transform .45s cubic-bezier(.4,0,.1,1)' }}>
          {list.map(b => <div key={b.id} style={{ minWidth:'100%' }}><Banner b={b} onCta={onCta} /></div>)}
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:9 }}>
        {list.map((_,k) => (
          <button key={k} onClick={()=>setI(k)} aria-label={`Banner ${k+1}`} style={{
            width: k===i?18:7, height:7, borderRadius:7, transition:'.3s',
            background: k===i?'var(--forest)':'var(--line-2)',
          }} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- animated value ribbon (Z4) ---------------- */
function ValueRibbon() {
  const items = [
    { ic:'verified', t:'You get what you see' },
    { ic:'bolt', t:'60-min delivery' },
    { ic:'return', t:'Buy online. Return in store' },
  ];
  const Seg = ({k}) => (
    <div style={{ display:'flex', alignItems:'center', gap:0, flexShrink:0 }}>
      {items.map((it,idx) => (
        <span key={k+'-'+idx} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'0 18px', flexShrink:0 }}>
          <Icon name={it.ic} size={15} color="var(--butter)" sw={2.2} />
          <span style={{ fontSize:12.5, fontWeight:700, color:'#fff', whiteSpace:'nowrap' }}>{it.t}</span>
          <span style={{ color:'rgba(255,255,255,.3)', marginLeft:11 }}>•</span>
        </span>
      ))}
    </div>
  );
  return (
    <div style={{ margin:'12px 0 0', background:'var(--forest)', overflow:'hidden', height:42, flexShrink:0, display:'flex', alignItems:'center' }}>
      <div style={{ display:'flex', alignItems:'center', width:'max-content', animation:'gb-marquee 16s linear infinite' }}>
        <Seg k="a" /><Seg k="b" />
      </div>
    </div>
  );
}

/* ---------------- trust ribbon (answers Q3) ---------------- */
function TrustRibbon() {
  return (
    <div style={{ padding:'16px 16px 4px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, background:'var(--card)', border:'1px solid var(--line)', borderRadius:16, padding:12 }}>
        {GBS.trust.map((t,i) => (
          <div key={t.id} style={{ display:'flex', gap:10, alignItems:'center' }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'var(--leaf-soft)', display:'grid', placeItems:'center', flexShrink:0 }}>
              <Icon name={t.glyph} size={18} color="var(--leaf-ink)" />
            </div>
            <div style={{ minWidth:0, display:'flex', flexDirection:'column', gap:1 }}>
              <div style={{ fontSize:12, fontWeight:800, lineHeight:1.2, color:'var(--ink)', whiteSpace:'nowrap' }}>{t.t}</div>
              <div style={{ fontSize:10.5, color:'var(--muted)', lineHeight:1.25 }}>{t.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- nearby stores (Z7) — answers Q2 ---------------- */
function StoreMiniCard({ s, closed, onOpen, onBrowse }) {
  return (
    <div style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:18, overflow:'hidden', boxShadow:'var(--shadow-sm)' }}>
      <div onClick={onOpen} style={{ cursor:'pointer', display:'flex', gap:12, padding:12 }}>
        <div style={{ position:'relative', width:84, height:84, flexShrink:0, borderRadius:14, overflow:'hidden', background:'var(--paper)' }}>
          <image-slot id={s.photoSlot} shape="rounded" radius="14" style={{ width:'84px', height:'84px', display:'block' }} placeholder="Store photo"></image-slot>
          <div style={{ position:'absolute', top:6, left:6, display:'flex', alignItems:'center', gap:3, background:closed?'rgba(40,40,40,.92)':'rgba(20,50,41,.92)', color:'#fff', padding:'2px 6px 2px 5px', borderRadius:20 }}>
            <span style={{ width:6, height:6, borderRadius:6, background: closed?'#E8704F':'#4ED88A', animation: closed?'none':'gb-pulse 2s infinite' }} />
            <span style={{ fontSize:9, fontWeight:800, whiteSpace:'nowrap' }}>{closed?'OPENS 10 AM':'OPEN NOW'}</span>
          </div>
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <span style={{ display:'inline-block', fontSize:9, fontWeight:800, letterSpacing:'.04em', color:'var(--butter-ink)', background:'var(--butter-2)', padding:'2px 7px', borderRadius:6, marginBottom:4 }}>{s.vertical.toUpperCase()}</span>
          <div className="disp" style={{ fontSize:15, fontWeight:800, color:'var(--ink)', lineHeight:1.1 }}>{s.name}</div>
          <div style={{ display:'flex', alignItems:'center', gap:7, marginTop:5, flexWrap:'wrap' }}>
            <span style={{ display:'flex', alignItems:'center', gap:3, background:'var(--forest)', color:'#fff', padding:'2px 6px', borderRadius:7 }}>
              <Icon name="star" size={10} color="var(--butter)" />
              <span className="tnum" style={{ fontSize:11, fontWeight:800 }}>{s.rating}</span>
            </span>
            <span style={{ display:'flex', alignItems:'center', gap:3, color:'var(--leaf-ink)', fontSize:11.5, fontWeight:700 }}>
              <Icon name="navigate" size={12} color="var(--leaf)" />{s.distance}
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:5, color:'var(--muted)', fontSize:11 }}>
            <Icon name="clock" size={12} color="var(--muted)" />
            <span>{closed ? 'Opens 10:00 AM' : s.openTill}</span>
          </div>
        </div>
      </div>
      {/* action strip */}
      <div style={{ display:'flex', borderTop:'1px solid var(--line)' }}>
        {[
          { ic:'navigate', t:'Directions', on:onOpen },
          { ic:'phone', t:'Call store', on:onOpen },
          { ic:'store', t:'Browse in-store', on:onBrowse },
        ].map((a,k) => (
          <button key={a.t} onClick={a.on} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:5, padding:'11px 4px',
            borderLeft: k? '1px solid var(--line)':'none', color:'var(--forest)', fontWeight:700, fontSize:11 }}>
            <Icon name={a.ic} size={14} color="var(--forest)" />{a.t}
          </button>
        ))}
      </div>
    </div>
  );
}

function NearbyStores({ tab, closed, onFindAll, onBrowse }) {
  const [filter, setFilter] = useState('all');
  const chips = [
    { id:'all', label:'All' },
    { id:'kitchen', label:'Kitchen' },
    { id:'sports', label:'Sports' },
  ];
  const sorted = [...GBS.stores].sort((a,b)=>a.distNum-b.distNum);
  const list = filter==='all' ? sorted : sorted.filter(s => s.id===filter);
  return (
    <div style={{ padding:'22px 16px 2px' }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:10 }}>
        <div>
          <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--leaf-ink)', marginBottom:3, display:'flex', alignItems:'center', gap:5 }}>
            <Icon name="store" size={13} color="var(--leaf-ink)" /> Real shops you can visit
          </div>
          <h3 className="disp" style={{ margin:0, fontSize:18, fontWeight:700, color:'var(--ink)' }}>Nearest store</h3>
        </div>
        <button onClick={onFindAll} style={{ display:'flex', alignItems:'center', gap:1, color:'var(--leaf-ink)', fontWeight:700, fontSize:12.5 }}>
          Find all stores <Icon name="chevR" size={15} color="var(--leaf-ink)" sw={2.2} />
        </button>
      </div>
      <div style={{ display:'flex', gap:8, marginBottom:12 }}>
        {chips.map(c => {
          const on = filter===c.id;
          return <button key={c.id} onClick={()=>setFilter(c.id)} style={{
            display:'flex', alignItems:'center', gap:5, padding:'6px 14px', borderRadius:22,
            background: on?'var(--forest)':'var(--card)', color: on?'#fff':'var(--ink-2)',
            border:`1px solid ${on?'var(--forest)':'var(--line)'}`, fontSize:12.5, fontWeight:700,
          }}>{c.label}</button>;
        })}
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {list.map(s => <StoreMiniCard key={s.id} s={s} closed={closed} onOpen={onFindAll} onBrowse={onBrowse} />)}
      </div>
    </div>
  );
}

/* ---------------- shop by category (reinforces Q1) ---------------- */
function CategoryStrip({ tab, onCat }) {
  let cats = GBS.categories;
  if (tab==='kitchen') cats = cats.filter(c => ['cookers','cookware','dinner','crockery','cutlery','glassware','appliances','storage'].includes(c.id));
  if (tab==='sports') cats = cats.filter(c => ['cricket','fitness','racket','footwear'].includes(c.id));
  return (
    <div style={{ padding:'18px 16px 4px' }}>
      <RowHeader title="Shop by category" tag={tab==='all'?'Kitchen · Sports · more coming':null} onAll={()=>onCat&&onCat()} />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
        {cats.slice(0,8).map(c => (
          <button key={c.id} onClick={()=>onCat&&onCat(c)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
            <div style={{ width:'100%', aspectRatio:'1/1', borderRadius:14, background:'var(--card)', border:'1px solid var(--line)', display:'grid', placeItems:'center' }}>
              <Icon name={c.glyph} size={28} sw={1.4} color="var(--forest-2)" />
            </div>
            <span style={{ fontSize:10.5, fontWeight:600, textAlign:'center', lineHeight:1.15, color:'var(--ink-2)' }}>{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- closed-state nudge ---------------- */
function ClosedNudge({ onSchedule }) {
  return (
    <div style={{ padding:'12px 16px 0' }}>
      <div style={{ display:'flex', gap:11, alignItems:'center', background:'var(--forest)', color:'#fff', borderRadius:16, padding:'13px 14px' }}>
        <div style={{ width:40, height:40, borderRadius:11, background:'rgba(242,200,75,.18)', display:'grid', placeItems:'center', flexShrink:0 }}>
          <Icon name="moon" size={22} color="var(--butter)" />
        </div>
        <div style={{ flex:1 }}>
          <div className="disp" style={{ fontSize:15, fontWeight:800 }}>Jodhpur’s asleep — we’re not far behind</div>
          <div style={{ fontSize:11.5, opacity:.9, marginTop:2 }}>Build your cart now. We’ll deliver from 7 AM, or pick a slot.</div>
        </div>
        <button onClick={onSchedule} style={{ background:'var(--butter)', color:'var(--butter-ink)', fontWeight:800, fontSize:12, padding:'9px 13px', borderRadius:10, flexShrink:0 }}>Schedule</button>
      </div>
    </div>
  );
}

/* ---------------- product row ---------------- */
function ProductRow({ row, getQty, add, inc, dec, openP }) {
  return (
    <div style={{ paddingTop:20 }}>
      <RowHeader title={row.title} tag={row.tag} onAll={()=>{}} />
      <div className="no-scrollbar" style={{ display:'flex', gap:10, overflowX:'auto', padding:'0 16px 2px', scrollSnapType:'x proximity' }}>
        {row.items.map((id,k) => {
          const p = GBS.byId[id];
          return <div key={id+k} style={{ scrollSnapAlign:'start' }}>
            <ProductCard p={p} qty={getQty(id)} onAdd={()=>add(id)} onInc={()=>inc(id)} onDec={()=>dec(id)} onOpen={()=>openP(id)} />
          </div>;
        })}
      </div>
    </div>
  );
}

/* ---------------- HOME ---------------- */
function HomeScreen(props) {
  const { closed, tab, setTab } = props;
  const byId = Object.fromEntries(GBS.rows.map(r => [r.id, r]));
  const kitchenRail = byId['kitchen-setup'];
  const sportsRail  = byId['play'];
  const valueRail   = byId['under-999'];
  const hotRail     = byId['hot'];
  const showKitchen = tab==='all' || tab==='kitchen';
  const showSports  = tab==='all' || tab==='sports';
  const railProps = { getQty:props.getQty, add:props.add, inc:props.inc, dec:props.dec, openP:props.openP };
  return (
    <div className="gb gb-scroll" style={{ height:'100%', overflowY:'auto', background:'var(--paper)', display:'flex', flexDirection:'column' }}>
      <HomeHeader closed={closed} tab={tab} setTab={setTab} onSearch={props.onSearch} onSchedule={props.onSchedule}
        store={props.store} onWishlist={props.onWishlist} onCart={props.onCart}
        onProfile={props.onProfile} onContact={props.onContact}
        wishCount={props.wishCount} cartCount={props.cartCount} openPicker={props.openPicker} />
      {closed && <ClosedNudge onSchedule={props.onSchedule} />}
      <BannerCarousel onCta={props.onBannerCta} />
      <ValueRibbon />
      {showKitchen && <ProductRow row={kitchenRail} {...railProps} />}
      {showSports && <ProductRow row={sportsRail} {...railProps} />}
      <NearbyStores tab={tab} closed={closed} onFindAll={props.onStore} onBrowse={props.onStore} />
      <ProductRow row={valueRail} {...railProps} />
      <CategoryStrip tab={tab} onCat={props.onCat} />
      <ProductRow row={hotRail} {...railProps} />
      <div style={{ height:18 }} />
      <TrustStrip />
      <TrustFooter />
      <div style={{ height:18 }} />
    </div>
  );
}

/* ---------------- trust strip (Z9) — social proof before conversion ---------------- */
function TrustStrip() {
  const items = [
    { ic:'verified', t:'5,000+ verified buyers' },
    { ic:'return', t:'Easy returns' },
    { ic:'shield', t:'100% genuine' },
    { ic:'bag', t:'20k+ orders delivered' },
  ];
  return (
    <div style={{ margin:'4px 0 0', background:'var(--forest)', padding:'14px 16px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px 10px' }}>
        {items.map(it => (
          <div key={it.t} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Icon name={it.ic} size={17} color="var(--butter)" sw={2} />
            <span style={{ fontSize:12.5, fontWeight:700, color:'#fff', whiteSpace:'nowrap' }}>{it.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrustFooter() {
  const s = GBS.store;
  return (
    <div style={{ margin:'4px 16px 0', padding:'16px', borderRadius:18, background:'var(--forest)', color:'#fff' }}>
      <div className="disp" style={{ fontSize:16, fontWeight:800 }}>Not just an app.</div>
      <div style={{ fontSize:12.5, opacity:.88, marginTop:4, lineHeight:1.4 }}>{s.since}. Walk into our Sardarpura store, see the product, then let us deliver. Online prices match the shelf.</div>
      <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
        {['GST-registered business','Brand-billed invoices','Local Jodhpur team'].map(x => (
          <span key={x} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, fontWeight:600, background:'rgba(255,255,255,.1)', padding:'5px 9px', borderRadius:20 }}>
            <Icon name="check" size={13} color="var(--butter)" sw={2.4} />{x}
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen });
