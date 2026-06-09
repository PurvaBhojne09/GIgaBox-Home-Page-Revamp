/* ============================================================
   Gigabox — Search · Categories · Orders · Account
   ============================================================ */

/* ---------------- SEARCH ---------------- */
function SearchScreen(props) {
  const [q, setQ] = useState('');
  const trending = ['Pressure cooker','Air fryer','Yoga mat','Cricket bat','Mixer grinder','Casserole'];
  const results = q.trim()
    ? GB.products.filter(p => (p.name+' '+p.brand+' '+p.sub).toLowerCase().includes(q.toLowerCase()))
    : [];
  return (
    <div className="gb" style={{ minHeight:'100%', background:'var(--paper)' }}>
      <div style={{ background:'var(--forest)', padding:'6px 12px 14px', display:'flex', gap:10, alignItems:'center' }}>
        <button onClick={()=>props.go('home')} style={{ width:38, height:38, borderRadius:'50%', background:'rgba(255,255,255,.12)', display:'grid', placeItems:'center' }}><Icon name="chevL" size={20} color="#fff" sw={2.2} /></button>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:9, background:'#fff', borderRadius:12, padding:'0 12px', height:44 }}>
          <Icon name="search" size={18} color="var(--muted)" />
          <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search across kitchen & sports" style={{ flex:1, border:'none', outline:'none', fontSize:14, background:'transparent', color:'var(--ink)' }} />
          {q && <button onClick={()=>setQ('')}><Icon name="close" size={18} color="var(--muted)" /></button>}
        </div>
      </div>

      {!q && (
        <div style={{ padding:'18px 16px' }}>
          <div style={{ fontSize:12, fontWeight:800, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)', marginBottom:11 }}>Trending in Jodhpur</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>
            {trending.map(t => (
              <button key={t} onClick={()=>setQ(t)} style={{ display:'flex', alignItems:'center', gap:6, background:'var(--card)', border:'1px solid var(--line)', borderRadius:20, padding:'9px 13px', fontSize:12.5, fontWeight:600 }}>
                <Icon name="search" size={13} color="var(--muted)" />{t}
              </button>
            ))}
          </div>
          <div style={{ marginTop:24, background:'var(--card)', border:'1px solid var(--line)', borderRadius:14, padding:14, display:'flex', gap:11, alignItems:'center' }}>
            <Icon name="scan" size={24} color="var(--forest)" />
            <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:800 }}>Scan a barcode</div><div style={{ fontSize:11.5, color:'var(--muted)' }}>Saw it in a shop? Scan to compare our price.</div></div>
          </div>
        </div>
      )}

      {q && (
        <div style={{ padding:'14px 16px' }}>
          <div style={{ fontSize:12.5, color:'var(--muted)', marginBottom:12 }}>{results.length} result{results.length!==1?'s':''} for “{q}”</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {results.map(p => <ProductCard key={p.id} p={p} qty={props.getQty(p.id)} onAdd={()=>props.add(p.id)} onInc={()=>props.inc(p.id)} onDec={()=>props.dec(p.id)} onOpen={()=>props.openP(p.id)} />)}
          </div>
          {results.length===0 && <div style={{ textAlign:'center', color:'var(--muted)', fontSize:13, padding:30 }}>Nothing yet — but it's probably on our shelf. <button onClick={()=>props.go('stores')} style={{ color:'var(--leaf-ink)', fontWeight:800 }}>Visit the store →</button></div>}
        </div>
      )}
    </div>
  );
}

/* ---------------- CATEGORIES ---------------- */
function CategoriesScreen(props) {
  const groups = [
    { head:'Kitchen', ids:['cookers','cookware','dinner','crockery','cutlery','glassware','appliances','storage'] },
    { head:'Sports', ids:['cricket','fitness','racket','footwear'] },
  ];
  const map = Object.fromEntries(GB.categories.map(c=>[c.id,c]));
  return (
    <div className="gb" style={{ minHeight:'100%', background:'var(--paper)' }}>
      <div style={{ background:'var(--forest)', color:'#fff', padding:'6px 16px 16px' }}>
        <span className="disp" style={{ fontSize:20, fontWeight:800 }}>All categories</span>
        <div style={{ fontSize:12, opacity:.85, marginTop:3 }}>Kitchen & Sports today · more coming soon</div>
      </div>
      {groups.map(g => (
        <div key={g.head} style={{ padding:'18px 16px 0' }}>
          <div className="disp" style={{ fontSize:17, fontWeight:800, marginBottom:12 }}>{g.head}</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {g.ids.map(id => { const c=map[id]; return (
              <button key={id} onClick={()=>props.go('search')} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:7 }}>
                <div style={{ width:'100%', aspectRatio:'1/1', borderRadius:16, background:'var(--card)', border:'1px solid var(--line)', display:'grid', placeItems:'center' }}>
                  <Icon name={c.glyph} size={30} sw={1.4} color="var(--forest-2)" />
                </div>
                <span style={{ fontSize:11, fontWeight:600, textAlign:'center', lineHeight:1.2 }}>{c.name}</span>
              </button>
            ); })}
          </div>
        </div>
      ))}
      <div style={{ margin:'22px 16px 0', padding:16, borderRadius:16, background:'var(--butter-2)' }}>
        <div className="disp" style={{ fontSize:15, fontWeight:800, color:'var(--butter-ink)' }}>What should we stock next?</div>
        <div style={{ fontSize:12, color:'var(--butter-ink)', opacity:.85, marginTop:3 }}>Home, baby care, electronics… tell us and we'll bring it to Jodhpur.</div>
      </div>
      <div style={{ height:20 }} />
    </div>
  );
}

/* ---------------- ORDERS (live tracker) ---------------- */
function OrdersScreen(props) {
  const steps = [
    { t:'Order confirmed', s:'Packed at Sardarpura store', done:true },
    { t:'Out for delivery', s:'Rohit is 1.2 km away', done:true, active:true },
    { t:'Arriving', s: props.closed?'Tomorrow, 7–8 AM':'In ~22 min', done:false },
    { t:'Delivered', s:'Pay at your door', done:false },
  ];
  return (
    <div className="gb" style={{ minHeight:'100%', background:'var(--paper)' }}>
      <div style={{ background:'var(--forest)', color:'#fff', padding:'6px 16px 16px' }}>
        <span className="disp" style={{ fontSize:20, fontWeight:800 }}>Orders</span>
      </div>
      <div style={{ padding:'16px 16px 0' }}>
        <div style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:18, overflow:'hidden', boxShadow:'var(--shadow-sm)' }}>
          <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div><div className="tnum" style={{ fontSize:13, fontWeight:800 }}>Order #GBX4821</div><div style={{ fontSize:11.5, color:'var(--muted)', marginTop:2 }}>3 items · {RS(2993)}</div></div>
            <span style={{ fontSize:11, fontWeight:800, color:'var(--leaf-ink)', background:'var(--leaf-soft)', padding:'5px 10px', borderRadius:20 }}>{props.closed?'SCHEDULED':'ON THE WAY'}</span>
          </div>
          <div style={{ padding:'16px' }}>
            {steps.map((st,i) => (
              <div key={i} style={{ display:'flex', gap:13 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background: st.done?'var(--leaf)':'var(--field)', border: st.done?'none':'2px solid var(--line-2)', display:'grid', placeItems:'center' }}>
                    {st.done && <Icon name="check" size={13} color="#fff" sw={3} />}
                  </div>
                  {i<steps.length-1 && <div style={{ width:2, flex:1, minHeight:26, background: st.done?'var(--leaf)':'var(--line-2)' }} />}
                </div>
                <div style={{ paddingBottom:14 }}>
                  <div style={{ fontSize:13.5, fontWeight: st.active?800:700, color: st.done?'var(--ink)':'var(--muted)' }}>{st.t}</div>
                  <div style={{ fontSize:11.5, color: st.active?'var(--leaf-ink)':'var(--muted)', fontWeight: st.active?700:500, marginTop:2 }}>{st.s}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', borderTop:'1px solid var(--line)' }}>
            <button style={{ flex:1, padding:'13px', fontWeight:700, fontSize:12.5, color:'var(--forest)', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}><Icon name="phone" size={15} color="var(--forest)" /> Call Rohit</button>
            <button style={{ flex:1, padding:'13px', fontWeight:700, fontSize:12.5, color:'var(--forest)', borderLeft:'1px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}><Icon name="navigate" size={15} color="var(--forest)" /> Live map</button>
          </div>
        </div>
        <div style={{ textAlign:'center', color:'var(--muted)', fontSize:12.5, padding:'24px 20px' }}>That's your only order so far. <br/>Welcome to Gigabox, Priyanka 👋</div>
      </div>
    </div>
  );
}

/* ---------------- ACCOUNT ---------------- */
function AccountScreen(props) {
  const rows = [
    { ic:'mappin', t:'Saved addresses' },
    { ic:'bag', t:'Your orders' },
    { ic:'return', t:'Returns & refunds' },
    { ic:'store', t:'Visit our store' },
    { ic:'phone', t:'Help & support' },
  ];
  return (
    <div className="gb" style={{ minHeight:'100%', background:'var(--paper)' }}>
      <div style={{ background:'var(--forest)', color:'#fff', padding:'10px 16px 22px' }}>
        <span className="disp" style={{ fontSize:20, fontWeight:800 }}>Account</span>
        <div style={{ display:'flex', alignItems:'center', gap:13, marginTop:14 }}>
          <div style={{ width:54, height:54, borderRadius:'50%', background:'var(--butter)', display:'grid', placeItems:'center', color:'var(--forest)' }}><span className="disp" style={{ fontSize:22, fontWeight:800 }}>P</span></div>
          <div><div className="disp" style={{ fontSize:18, fontWeight:800 }}>Priyanka</div><div style={{ fontSize:12.5, opacity:.85 }}>+91 ••••• 43210 · Jodhpur</div></div>
        </div>
      </div>

      {/* demo time toggle */}
      <div style={{ margin:'16px 16px 0', background:'var(--card)', border:'1px solid var(--line)', borderRadius:14, padding:'13px 14px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
          <Icon name="clock" size={16} color="var(--forest)" />
          <span style={{ fontSize:12.5, fontWeight:800 }}>Demo: time of day</span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button onClick={()=>props.setClosed(false)} style={{ flex:1, padding:'10px', borderRadius:10, fontWeight:800, fontSize:12.5, display:'flex', alignItems:'center', justifyContent:'center', gap:6, background: !props.closed?'var(--leaf-soft)':'var(--field)', color: !props.closed?'var(--leaf-ink)':'var(--muted)', border:`1px solid ${!props.closed?'var(--leaf)':'transparent'}` }}><Icon name="sun" size={16} color={!props.closed?'var(--leaf-ink)':'var(--muted)'} /> Open (9 PM)</button>
          <button onClick={()=>props.setClosed(true)} style={{ flex:1, padding:'10px', borderRadius:10, fontWeight:800, fontSize:12.5, display:'flex', alignItems:'center', justifyContent:'center', gap:6, background: props.closed?'var(--forest)':'var(--field)', color: props.closed?'#fff':'var(--muted)' }}><Icon name="moon" size={16} color={props.closed?'var(--butter)':'var(--muted)'} /> Closed (11 PM)</button>
        </div>
      </div>

      <div style={{ margin:'16px 16px 0', background:'var(--card)', border:'1px solid var(--line)', borderRadius:14, overflow:'hidden' }}>
        {rows.map((r,i) => (
          <button key={r.t} onClick={()=> r.ic==='store'?props.go('stores'): r.ic==='bag'?props.go('orders'):null} style={{ display:'flex', alignItems:'center', gap:13, width:'100%', padding:'14px 15px', borderTop: i? '1px solid var(--line)':'none', textAlign:'left' }}>
            <Icon name={r.ic} size={20} color="var(--forest)" />
            <span style={{ flex:1, fontSize:13.5, fontWeight:600 }}>{r.t}</span>
            <Icon name="chevR" size={17} color="var(--muted)" />
          </button>
        ))}
      </div>

      <div style={{ margin:'16px 16px 0', padding:16, borderRadius:16, background:'var(--forest)', color:'#fff' }}>
        <div className="disp" style={{ fontSize:15, fontWeight:800 }}>About Gigabox</div>
        <div style={{ fontSize:12, opacity:.88, marginTop:5, lineHeight:1.45 }}>A Jodhpur business since 2016. GST-registered, brand-billed, with a real store you can walk into. We're not going anywhere.</div>
      </div>
      <div style={{ height:24 }} />
    </div>
  );
}

/* ---------------- WISHLIST ---------------- */
function WishlistScreen(props) {
  const ids = Object.keys(props.wish);

  if (ids.length === 0) {
    return (
      <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
        <BackHeader title="Wishlist" onBack={()=>props.go('home')} />
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:30, textAlign:'center' }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'var(--leaf-soft)', display:'grid', placeItems:'center' }}><Icon name="heart" size={38} color="var(--leaf-ink)" /></div>
          <div className="disp" style={{ fontSize:19, fontWeight:800, marginTop:18 }}>Nothing saved yet</div>
          <div style={{ fontSize:13, color:'var(--muted)', marginTop:6, maxWidth:'26ch', lineHeight:1.5 }}>Tap the <b style={{ color:'var(--danger)' }}>♥</b> on any product to keep it here while you decide — no rush, no pressure.</div>
          <button onClick={()=>props.go('home')} style={{ marginTop:20, height:48, padding:'0 26px', borderRadius:13, background:'var(--forest)', color:'#fff', fontWeight:800, fontSize:14 }}>Browse products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
      <BackHeader title={`Wishlist · ${ids.length}`} onBack={()=>props.go('home')} />
      <div style={{ padding:'12px 16px 0', display:'flex', alignItems:'center', gap:8, color:'var(--muted)', fontSize:12.5 }}>
        <Icon name="info" size={15} color="var(--muted)" />
        <span>Saved for later — prices update live. Move to cart when you're ready.</span>
      </div>
      <div style={{ padding:'12px 16px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {ids.map(id => {
          const p = GB.byId[id];
          const inCart = props.getQty(id) > 0;
          return (
            <div key={id} style={{ position:'relative', background:'var(--card)', borderRadius:14, border:'1px solid var(--line)', padding:8, display:'flex', flexDirection:'column', gap:7 }}>
              <button onClick={()=>props.toggleWish(id)} aria-label="Remove from wishlist" style={{ position:'absolute', top:14, right:14, zIndex:3, width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,.92)', boxShadow:'var(--shadow-sm)', display:'grid', placeItems:'center', border:'1px solid var(--line)' }}>
                <Icon name="close" size={15} color="var(--muted)" sw={2.2} />
              </button>
              <div onClick={()=>props.openP(id)} style={{ cursor:'pointer' }}><ProductImage p={p} /></div>
              <div onClick={()=>props.openP(id)} style={{ cursor:'pointer', display:'flex', flexDirection:'column', gap:2, minHeight:46 }}>
                <span style={{ fontSize:10, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.03em' }}>{p.brand}</span>
                <span style={{ fontSize:12.5, fontWeight:600, lineHeight:1.25, color:'var(--ink)', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.name}</span>
              </div>
              <Price p={p} />
              <button onClick={()=>props.moveToCart(id)} style={{ marginTop:2, height:36, borderRadius:10, background: inCart?'var(--leaf-soft)':'var(--forest)', color: inCart?'var(--leaf-ink)':'#fff', fontWeight:800, fontSize:12.5, display:'flex', alignItems:'center', justifyContent:'center', gap:6, border: inCart?'1px solid rgba(24,147,92,.3)':'none' }}>
                <Icon name={inCart?'check':'bag'} size={15} color={inCart?'var(--leaf-ink)':'#fff'} sw={2.2} /> {inCart?'In cart — add more':'Move to cart'}
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ height:24 }} />
    </div>
  );
}

Object.assign(window, { SearchScreen, CategoriesScreen, OrdersScreen, AccountScreen, WishlistScreen });
