/* ============================================================
   Gigabox — Stores (omnichannel pitch) + Schedule delivery
   ============================================================ */

/* ---------------- shared back header ---------------- */
function BackHeader({ title, onBack, right, dark }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px 10px',
      background: dark?'var(--forest)':'var(--card)', color: dark?'#fff':'var(--ink)',
      borderBottom: dark?'none':'1px solid var(--line)' }}>
      <button onClick={onBack} style={{ width:38, height:38, borderRadius:'50%', display:'grid', placeItems:'center',
        background: dark?'rgba(255,255,255,.12)':'var(--field)' }}>
        <Icon name="chevL" size={20} color={dark?'#fff':'var(--ink)'} sw={2.2} />
      </button>
      <span className="disp" style={{ flex:1, fontSize:18, fontWeight:800 }}>{title}</span>
      {right}
    </div>
  );
}

/* ---------------- STORES ---------------- */
function StoresScreen(props) {
  const s = props.store || GB.store;
  const other = GB.stores.find(x => x.id !== s.id);
  const benefits = [
    { ic:'verified', t:'See the exact product', s:'No surprises — the one you touch is the one that ships.' },
    { ic:'tag', t:'Same price as the app', s:'Shelf price matches online. Always.' },
    { ic:'return', t:'Returns at the counter', s:'Walk in, hand it back. Done.' },
    { ic:'spark', t:'Free product demos', s:'Try the cooker, feel the bat, before you buy.' },
  ];
  const shelf = s.id==='sports'
    ? ['cricket-bat','yoga-mat','badminton-racket','running-shoes','shaker']
    : ['prestige-3l','air-fryer','mixer-grinder','futura-tawa','milton-bottle'];
  return (
    <div className="gb">
      {/* green hero header */}
      <div style={{ background:'var(--forest)', color:'#fff', padding:'4px 16px 20px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', minHeight:44 }}>
          <span className="disp" style={{ fontSize:20, fontWeight:800, whiteSpace:'nowrap' }}>Find your store</span>
          <button style={{ display:'flex', alignItems:'center', gap:5, color:'#fff', fontSize:12.5, fontWeight:700, background:'rgba(255,255,255,.12)', padding:'7px 12px', borderRadius:20 }}>
            <Icon name="phone" size={14} color="var(--butter)" /> Help
          </button>
        </div>
        <div className="disp" style={{ fontSize:24, fontWeight:800, lineHeight:1.08, marginTop:8, letterSpacing:'-.02em' }}>See it. Touch it.<br/>Then decide.</div>
        <div style={{ fontSize:12.5, opacity:.9, marginTop:7, lineHeight:1.4, maxWidth:'28ch' }}>Not ready to order blind? Our Jodhpur store is open daily. Online and in-store are one — same stock, same prices, same warranty.</div>
        {/* search */}
        <div style={{ display:'flex', alignItems:'center', gap:9, background:'#fff', borderRadius:12, padding:'0 12px', height:44, marginTop:14, color:'var(--muted)' }}>
          <Icon name="search" size={18} color="var(--muted)" />
          <span style={{ flex:1, fontSize:13.5 }}>Search by area, street or pincode</span>
          <Icon name="navigate" size={18} color="var(--forest)" />
        </div>
      </div>

      {/* store card */}
      <div style={{ padding:'16px 16px 0' }}>
        <div style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:20, overflow:'hidden', boxShadow:'var(--shadow-sm)' }}>
          <div style={{ position:'relative', height:148, background:'var(--paper)' }}>
            <image-slot id={s.photoSlot} shape="rect" style={{ width:'100%', height:'148px', display:'block' }} placeholder="Drop the storefront photo"></image-slot>
            <div style={{ position:'absolute', top:10, left:10, display:'flex', alignItems:'center', gap:5, background:'rgba(20,50,41,.92)', color:'#fff', padding:'5px 10px 5px 8px', borderRadius:20 }}>
              <span style={{ width:7, height:7, borderRadius:7, background:'#4ED88A', animation:'gb-pulse 2s infinite' }} />
              <span style={{ fontSize:11, fontWeight:800, whiteSpace:'nowrap' }}>OPEN · till 9:30 PM</span>
            </div>
            <div style={{ position:'absolute', top:10, right:10, display:'flex', alignItems:'center', gap:4, background:'#fff', padding:'4px 9px', borderRadius:20, boxShadow:'var(--shadow-sm)' }}>
              <Icon name="star" size={13} color="var(--leaf)" /><span className="tnum" style={{ fontSize:12.5, fontWeight:800 }}>{s.rating}</span>
            </div>
          </div>
          <div style={{ padding:'14px 14px 4px' }}>
            <div className="disp" style={{ fontSize:18, fontWeight:800 }}>{s.name}</div>
            <div style={{ fontSize:12.5, color:'var(--muted)', marginTop:4, lineHeight:1.4 }}>{s.full}</div>
            <div style={{ display:'flex', gap:14, marginTop:10, flexWrap:'wrap' }}>
              <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:'var(--ink-2)' }}><Icon name="clock" size={14} color="var(--muted)" />{s.hours}</span>
              <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:'var(--leaf-ink)' }}><Icon name="navigate" size={14} color="var(--leaf)" />{s.distance}</span>
              <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:'var(--ink-2)' }}><Icon name="user" size={14} color="var(--muted)" />{s.ratings.toLocaleString('en-IN')} shoppers</span>
            </div>
          </div>
          <div style={{ display:'flex', gap:9, padding:14 }}>
            <button style={{ flex:1, height:46, borderRadius:12, background:'var(--forest)', color:'#fff', fontWeight:800, fontSize:13.5, display:'flex', alignItems:'center', justifyContent:'center', gap:7 }}>
              <Icon name="navigate" size={17} color="#fff" /> Directions
            </button>
            <button style={{ width:46, height:46, borderRadius:12, background:'var(--field)', display:'grid', placeItems:'center' }}>
              <Icon name="phone" size={19} color="var(--forest)" />
            </button>
          </div>
        </div>
      </div>

      {/* the other store */}
      {other && (
        <div style={{ padding:'14px 16px 0' }}>
          <button onClick={props.openPicker} style={{ width:'100%', display:'flex', alignItems:'center', gap:12, background:'var(--card)', border:'1px solid var(--line)', borderRadius:16, padding:12, textAlign:'left' }}>
            <div style={{ width:46, height:46, borderRadius:12, background:'var(--leaf-soft)', display:'grid', placeItems:'center', flexShrink:0 }}>
              <Icon name={other.glyph} size={24} color="var(--leaf-ink)" />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:14, fontWeight:800 }}>{other.name}</span>
                <span style={{ fontSize:9, fontWeight:800, background:'var(--butter-2)', color:'var(--butter-ink)', padding:'1px 6px', borderRadius:5 }}>{other.vertical.toUpperCase()}</span>
              </div>
              <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:2 }}>{other.area} · {other.distance} · {other.tagline}</div>
            </div>
            <Icon name="chevR" size={18} color="var(--forest)" sw={2.2} />
          </button>
        </div>
      )}

      {/* why visit */}
      <div style={{ padding:'22px 16px 0' }}>
        <RowHeader title="Why it's worth the trip" tag="The omnichannel promise" />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {benefits.map(b => (
            <div key={b.t} style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:14, padding:13 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:'var(--leaf-soft)', display:'grid', placeItems:'center', marginBottom:9 }}>
                <Icon name={b.ic} size={20} color="var(--leaf-ink)" />
              </div>
              <div style={{ fontSize:13, fontWeight:800, lineHeight:1.2 }}>{b.t}</div>
              <div style={{ fontSize:11, color:'var(--muted)', marginTop:4, lineHeight:1.4 }}>{b.s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* in-store picks */}
      <div style={{ paddingTop:22 }}>
        <RowHeader title="On the shelf right now" tag="Reserve · or get it delivered" onAll={()=>{}} />
        <div className="no-scrollbar" style={{ display:'flex', gap:10, overflowX:'auto', padding:'0 16px' }}>
          {shelf.map(id => {
            const p = GB.byId[id];
            return <div key={id} style={{ position:'relative' }}>
              <ProductCard p={p} qty={props.getQty(id)} onAdd={()=>props.add(id)} onInc={()=>props.inc(id)} onDec={()=>props.dec(id)} onOpen={()=>props.openP(id)} />
              <span style={{ position:'absolute', top:14, left:14, background:'var(--butter)', color:'var(--butter-ink)', fontSize:9, fontWeight:800, padding:'3px 7px', borderRadius:6 }}>IN STOCK · STORE</span>
            </div>;
          })}
        </div>
      </div>

      {/* upcoming store */}
      <div style={{ padding:'22px 16px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, background:'var(--card)', border:'1px dashed var(--line-2)', borderRadius:16, padding:14 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:'var(--paper)', display:'grid', placeItems:'center' }}>
            <Icon name="mappin" size={22} color="var(--forest-2)" />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13.5, fontWeight:800 }}>Paota, Jodhpur — opening soon</div>
            <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:2 }}>Our second store. Want us in your area? Tell us.</div>
          </div>
          <button style={{ fontSize:12, fontWeight:800, color:'var(--leaf-ink)', background:'var(--leaf-soft)', padding:'8px 12px', borderRadius:10 }}>Notify me</button>
        </div>
      </div>
      <div style={{ height:24 }} />
    </div>
  );
}

/* ---------------- SCHEDULE ---------------- */
function ScheduleScreen(props) {
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState('07-08');
  const [confirmed, setConfirmed] = useState(false);
  const days = [
    { id:0, label:'Tomorrow', sub:'Tue, 10 Jun' },
    { id:1, label:'Wed', sub:'11 Jun' },
    { id:2, label:'Thu', sub:'12 Jun' },
  ];
  const slots = [
    { id:'07-08', t:'7:00 – 8:00 AM', tag:'First delivery' },
    { id:'08-09', t:'8:00 – 9:00 AM', tag:'Popular' },
    { id:'09-10', t:'9:00 – 10:00 AM' },
    { id:'10-11', t:'10:00 – 11:00 AM' },
    { id:'17-18', t:'5:00 – 6:00 PM' },
    { id:'19-20', t:'7:00 – 8:00 PM' },
  ];
  const empty = props.cartCount === 0;

  if (confirmed) {
    const d = days[day]; const sl = slots.find(x=>x.id===slot);
    return (
      <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
        <BackHeader title="Scheduled" onBack={()=>props.go('home')} />
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'30px 24px', textAlign:'center' }}>
          <div style={{ width:84, height:84, borderRadius:'50%', background:'var(--leaf-soft)', display:'grid', placeItems:'center', animation:'gb-pop .4s' }}>
            <Icon name="check" size={44} color="var(--leaf-ink)" sw={2.6} />
          </div>
          <div className="disp" style={{ fontSize:23, fontWeight:800, marginTop:20 }}>You're all set, Priyanka</div>
          <div style={{ fontSize:14, color:'var(--ink-2)', marginTop:8, lineHeight:1.5, maxWidth:'30ch' }}>We'll deliver your order <b>{d.label}, {sl.t}</b>. Pay cash or UPI at the door — no money leaves your hands tonight.</div>
          <div style={{ display:'flex', gap:9, marginTop:24, width:'100%', maxWidth:320 }}>
            <button onClick={()=>props.go('home')} style={{ flex:1, height:50, borderRadius:13, background:'var(--field)', color:'var(--forest)', fontWeight:800, fontSize:14 }}>Keep browsing</button>
            <button onClick={()=>props.go('orders')} style={{ flex:1, height:50, borderRadius:13, background:'var(--forest)', color:'#fff', fontWeight:800, fontSize:14 }}>View order</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
      <BackHeader title="Schedule delivery" onBack={()=>props.go('home')} />
      {/* explainer */}
      <div style={{ margin:'14px 16px 0', background:'var(--forest)', color:'#fff', borderRadius:16, padding:'15px 16px', display:'flex', gap:12, alignItems:'flex-start' }}>
        <Icon name="moon" size={24} color="var(--butter)" />
        <div>
          <div className="disp" style={{ fontSize:15, fontWeight:800 }}>We deliver 7 AM – 9:30 PM</div>
          <div style={{ fontSize:12, opacity:.9, marginTop:3, lineHeight:1.45 }}>It's past hours in Jodhpur right now. Pick a morning slot — your cart is saved and nothing is charged until we hand it over.</div>
        </div>
      </div>

      {empty && (
        <div style={{ margin:'14px 16px 0', background:'var(--butter-2)', borderRadius:14, padding:'12px 14px', display:'flex', gap:10, alignItems:'center' }}>
          <Icon name="info" size={20} color="var(--butter-ink)" />
          <span style={{ fontSize:12.5, color:'var(--butter-ink)', fontWeight:600, flex:1 }}>Your cart is empty — add a few items first, then schedule.</span>
          <button onClick={()=>props.go('home')} style={{ fontSize:12, fontWeight:800, color:'var(--butter-ink)', textDecoration:'underline' }}>Browse</button>
        </div>
      )}

      {/* day */}
      <div style={{ padding:'20px 16px 0' }}>
        <div style={{ fontSize:13, fontWeight:800, marginBottom:10 }}>Choose a day</div>
        <div style={{ display:'flex', gap:9 }}>
          {days.map(d => {
            const on = day===d.id;
            return <button key={d.id} onClick={()=>setDay(d.id)} style={{
              flex:1, padding:'12px 6px', borderRadius:13, textAlign:'center',
              background: on?'var(--forest)':'var(--card)', color: on?'#fff':'var(--ink)',
              border:`1px solid ${on?'var(--forest)':'var(--line)'}`,
            }}>
              <div style={{ fontSize:14, fontWeight:800 }}>{d.label}</div>
              <div style={{ fontSize:11, opacity:.8, marginTop:2 }}>{d.sub}</div>
            </button>;
          })}
        </div>
      </div>

      {/* slot */}
      <div style={{ padding:'20px 16px 0' }}>
        <div style={{ fontSize:13, fontWeight:800, marginBottom:10 }}>Choose a time slot</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {slots.map(sl => {
            const on = slot===sl.id;
            return <button key={sl.id} onClick={()=>setSlot(sl.id)} style={{
              padding:'13px 13px', borderRadius:13, textAlign:'left', position:'relative',
              background: on?'var(--leaf-soft)':'var(--card)',
              border:`1.5px solid ${on?'var(--leaf)':'var(--line)'}`,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ width:16, height:16, borderRadius:'50%', border:`2px solid ${on?'var(--leaf)':'var(--line-2)'}`, display:'grid', placeItems:'center' }}>
                  {on && <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--leaf)' }} />}
                </span>
                <span style={{ fontSize:13, fontWeight:800, color: on?'var(--leaf-ink)':'var(--ink)' }}>{sl.t}</span>
              </div>
              {sl.tag && <div style={{ fontSize:10, fontWeight:700, color:'var(--muted)', marginTop:5, marginLeft:22 }}>{sl.tag}</div>}
            </button>;
          })}
        </div>
      </div>
      <div style={{ flex:1 }} />
      {/* confirm */}
      <div style={{ padding:'14px 16px', borderTop:'1px solid var(--line)', background:'var(--card)' }}>
        <button onClick={()=>!empty && setConfirmed(true)} style={{
          width:'100%', height:54, borderRadius:14, fontWeight:800, fontSize:15,
          background: empty?'var(--field)':'var(--forest)', color: empty?'var(--muted)':'#fff',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        }}>
          <Icon name="calendar" size={19} color={empty?'var(--muted)':'#fff'} />
          {empty ? 'Add items to schedule' : `Confirm ${days[day].label}, ${slots.find(x=>x.id===slot).t}`}
        </button>
      </div>
    </div>
  );
}

/* ---------------- FIRST-RUN STORE PICKER ---------------- */
function StorePicker({ stores, activeId, onPick, closed }) {
  const [filter, setFilter] = useState('all');
  const chips = [
    { id:'all', label:'All stores', glyph:'store' },
    { id:'kitchen', label:'Kitchen', glyph:'cooker' },
    { id:'sports', label:'Sports', glyph:'bat' },
  ];
  const list = filter==='all' ? stores : stores.filter(s => s.id===filter);

  return (
    <div className="gb" style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
      {/* header */}
      <div style={{ background:'var(--forest)', color:'#fff', padding:'6px 16px 18px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', minHeight:42 }}>
          <span className="disp" style={{ fontSize:15, fontWeight:800, letterSpacing:'.02em' }}>GIGABOX</span>
          <button style={{ display:'flex', alignItems:'center', gap:5, color:'#fff', fontSize:12.5, fontWeight:700, background:'rgba(255,255,255,.12)', padding:'6px 11px', borderRadius:20 }}>
            <Icon name="phone" size={13} color="var(--butter)" /> Help
          </button>
        </div>
        <div className="disp" style={{ fontSize:24, fontWeight:800, lineHeight:1.08, marginTop:10, letterSpacing:'-.02em' }}>Two real stores<br/>in Jodhpur.</div>
        <div style={{ fontSize:13, opacity:.9, marginTop:7, lineHeight:1.45, maxWidth:'30ch' }}>Pick the one that brought you here. You can switch or browse both anytime.</div>
        {/* search */}
        <div style={{ display:'flex', alignItems:'center', gap:9, background:'#fff', borderRadius:12, padding:'0 12px', height:46, marginTop:14, color:'var(--muted)' }}>
          <Icon name="search" size={18} color="var(--muted)" />
          <span style={{ flex:1, fontSize:13.5 }}>Search by area, street, pin</span>
          <Icon name="navigate" size={18} color="var(--forest)" />
        </div>
      </div>

      {/* filter chips */}
      <div className="no-scrollbar" style={{ display:'flex', gap:8, overflowX:'auto', padding:'14px 16px 4px' }}>
        {chips.map(c => {
          const on = filter===c.id;
          return <button key={c.id} onClick={()=>setFilter(c.id)} style={{
            flexShrink:0, display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:22,
            background: on?'var(--forest)':'var(--card)', color: on?'#fff':'var(--ink)',
            border:`1px solid ${on?'var(--forest)':'var(--line)'}`, fontSize:13, fontWeight:700,
          }}>
            <Icon name={c.glyph} size={15} color={on?'var(--butter)':'var(--forest-2)'} />{c.label}
          </button>;
        })}
      </div>

      {/* store cards */}
      <div className="gb-scroll" style={{ flex:1, overflowY:'auto', padding:'10px 16px 8px' }}>
        {list.map(s => (
          <div key={s.id} style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:20, overflow:'hidden', boxShadow:'var(--shadow-sm)', marginBottom:14 }}>
            <div style={{ position:'relative', height:150, background:'var(--paper)' }}>
              <image-slot id={s.photoSlot} shape="rect" style={{ width:'100%', height:'150px', display:'block' }} placeholder={`${s.vertical} store photo`}></image-slot>
              <div style={{ position:'absolute', top:10, left:10, display:'flex', alignItems:'center', gap:4, background:'#fff', padding:'4px 9px', borderRadius:20, boxShadow:'var(--shadow-sm)' }}>
                <Icon name="star" size={13} color="var(--leaf)" /><span className="tnum" style={{ fontSize:12.5, fontWeight:800 }}>{s.rating}</span>
              </div>
              <div style={{ position:'absolute', top:10, right:10, display:'flex', alignItems:'center', gap:5, background:'var(--butter)', color:'var(--butter-ink)', padding:'4px 10px', borderRadius:20 }}>
                <Icon name={s.glyph} size={13} color="var(--butter-ink)" /><span style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.03em' }}>{s.vertical.toUpperCase()}</span>
              </div>
            </div>
            <div style={{ padding:'13px 14px 4px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span className="disp" style={{ fontSize:18, fontWeight:800 }}>{s.name}</span>
                <Icon name="chevR" size={17} color="var(--forest)" sw={2.2} />
              </div>
              <div style={{ fontSize:12.5, color:'var(--muted)', marginTop:4, lineHeight:1.4 }}>{s.full}</div>
              <div style={{ display:'flex', gap:14, marginTop:10, flexWrap:'wrap' }}>
                <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12.5, fontWeight:700, color:'var(--ink-2)' }}><Icon name="clock" size={14} color="var(--muted)" />{closed ? 'Opens 10:00 AM' : s.openTill}</span>
                <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12.5, fontWeight:700, color:'var(--leaf-ink)' }}><Icon name="navigate" size={14} color="var(--leaf)" />{s.distance}</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:9, padding:14 }}>
              <button aria-label="Call store" style={{ width:50, height:50, borderRadius:13, background:'var(--field)', display:'grid', placeItems:'center' }}>
                <Icon name="phone" size={20} color="var(--forest)" />
              </button>
              <button onClick={()=>onPick(s.id)} style={{ flex:1, height:50, borderRadius:13, background:'var(--forest)', color:'#fff', fontWeight:800, fontSize:14.5, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                Shop this store <Icon name="chevR" size={17} color="#fff" sw={2.4} />
              </button>
            </div>
          </div>
        ))}

        {/* browse both */}
        <button onClick={()=>onPick('all')} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'14px', borderRadius:14, background:'var(--card)', border:'1px dashed var(--line-2)', color:'var(--forest)', fontWeight:800, fontSize:13.5, marginBottom:6 }}>
          Just exploring? Browse both stores <Icon name="chevR" size={16} color="var(--forest)" sw={2.4} />
        </button>
        <div style={{ textAlign:'center', fontSize:11.5, color:'var(--muted)', padding:'4px 16px 8px', lineHeight:1.5 }}>
          One Gigabox account · same prices online & in-store · genuine, brand-billed goods.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StoresScreen, ScheduleScreen, BackHeader, StorePicker });
