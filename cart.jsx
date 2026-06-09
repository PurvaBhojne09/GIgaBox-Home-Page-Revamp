/* ============================================================
   Gigabox — Cart + Checkout
   ============================================================ */
function CartLine({ p, qty, inc, dec, open }) {
  return (
    <div style={{ display:'flex', gap:12, padding:'12px 0', borderBottom:'1px solid var(--line)' }}>
      <div onClick={open} style={{ width:64, height:64, flexShrink:0, borderRadius:12, cursor:'pointer', background:`radial-gradient(120% 120% at 30% 20%, #fff, ${p.tone})`, display:'grid', placeItems:'center' }}>
        <Icon name={p.glyph} size={34} sw={1.3} color="rgba(20,40,30,0.36)" />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:10, fontWeight:800, color:'var(--muted)', textTransform:'uppercase' }}>{p.brand}</div>
        <div onClick={open} style={{ cursor:'pointer', fontSize:13, fontWeight:600, lineHeight:1.25, color:'var(--ink)', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.name}</div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:7 }}>
          <span className="disp tnum" style={{ fontSize:15, fontWeight:800 }}>{RS(p.price*qty)}</span>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:32, width:96, borderRadius:9, background:'var(--leaf)', color:'#fff', padding:'0 4px' }}>
            <button onClick={dec} style={{ width:28, height:28, display:'grid', placeItems:'center' }}><Icon name="minus" size={15} color="#fff" sw={2.6} /></button>
            <span className="tnum" style={{ fontWeight:800, fontSize:14 }}>{qty}</span>
            <button onClick={inc} style={{ width:28, height:28, display:'grid', placeItems:'center' }}><Icon name="plus" size={15} color="#fff" sw={2.6} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartScreen(props) {
  const items = Object.entries(props.cart);
  const total = props.cartTotal;
  const mrpTotal = items.reduce((a,[id,q])=>a+GB.byId[id].mrp*q,0);
  const saved = mrpTotal - total;
  const upsell = ['milton-bottle','spatula-set','shaker','skipping-rope'].filter(id=>!props.cart[id]);

  if (items.length===0) {
    return (
      <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
        <BackHeader title="Your cart" onBack={()=>props.go('home')} />
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:30, textAlign:'center' }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'var(--field)', display:'grid', placeItems:'center' }}><Icon name="bag" size={40} color="var(--muted)" /></div>
          <div className="disp" style={{ fontSize:19, fontWeight:800, marginTop:18 }}>Your cart is empty</div>
          <div style={{ fontSize:13, color:'var(--muted)', marginTop:6, maxWidth:'26ch' }}>Add a cooker, a bat, anything — we'll get it to you in 60 minutes.</div>
          <button onClick={()=>props.go('home')} style={{ marginTop:20, height:48, padding:'0 26px', borderRadius:13, background:'var(--forest)', color:'#fff', fontWeight:800, fontSize:14 }}>Start shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
      <BackHeader title={`Your cart · ${props.cartCount}`} onBack={()=>props.go('home')} />

      {/* delivery state */}
      <div style={{ padding:'12px 16px 0' }}>
        {!props.closed ? (
          <div style={{ display:'flex', gap:10, alignItems:'center', background:'var(--leaf-soft)', border:'1px solid rgba(24,147,92,.25)', borderRadius:13, padding:'11px 13px' }}>
            <Icon name="bolt" size={20} color="var(--leaf-ink)" />
            <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:800, color:'var(--leaf-ink)' }}>Arriving in 60 minutes</div><div style={{ fontSize:11, color:'var(--ink-2)' }}>Order before 9:30 PM · free delivery</div></div>
          </div>
        ) : (
          <div style={{ display:'flex', gap:10, alignItems:'center', background:'var(--forest)', color:'#fff', borderRadius:13, padding:'11px 13px' }}>
            <Icon name="moon" size={20} color="var(--butter)" />
            <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:800 }}>Store's closed for the night</div><div style={{ fontSize:11, opacity:.85 }}>Schedule a morning slot at checkout</div></div>
            <button onClick={()=>props.go('schedule')} style={{ background:'var(--butter)', color:'var(--butter-ink)', fontWeight:800, fontSize:11.5, padding:'8px 11px', borderRadius:9 }}>Schedule</button>
          </div>
        )}
      </div>

      {/* items */}
      <div style={{ padding:'4px 16px 0' }}>
        {items.map(([id,q]) => <CartLine key={id} p={GB.byId[id]} qty={q} inc={()=>props.inc(id)} dec={()=>props.dec(id)} open={()=>props.openP(id)} />)}
      </div>

      {/* upsell */}
      {upsell.length>0 && (
        <div style={{ paddingTop:16 }}>
          <RowHeader title="You might also need" tag="Add in one tap" />
          <div className="no-scrollbar" style={{ display:'flex', gap:10, overflowX:'auto', padding:'0 16px' }}>
            {upsell.map(id => <ProductCard key={id} p={GB.byId[id]} qty={props.getQty(id)} onAdd={()=>props.add(id)} onInc={()=>props.inc(id)} onDec={()=>props.dec(id)} onOpen={()=>props.openP(id)} />)}
          </div>
        </div>
      )}

      {/* bill */}
      <div style={{ padding:'18px 16px 0' }}>
        <div style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:16, padding:'14px 15px' }}>
          <div className="disp" style={{ fontSize:14, fontWeight:800, marginBottom:11 }}>Bill summary</div>
          {[['Item total', RS(mrpTotal)],['Discount', '– '+RS(saved), true],['Delivery fee', 'FREE', false, true]].map(([l,v,disc,free]) => (
            <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:12.5, marginBottom:8, color:'var(--ink-2)' }}>
              <span>{l}</span>
              <span className="tnum" style={{ fontWeight:700, color: disc?'var(--leaf-ink)': free?'var(--leaf-ink)':'var(--ink)' }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop:'1px dashed var(--line-2)', margin:'4px 0 10px' }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span className="disp" style={{ fontSize:15, fontWeight:800 }}>To pay</span>
            <span className="disp tnum" style={{ fontSize:18, fontWeight:800 }}>{RS(total)}</span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7, justifyContent:'center', marginTop:12, color:'var(--leaf-ink)', fontSize:12, fontWeight:700 }}>
          <Icon name="shield" size={15} color="var(--leaf-ink)" /> Exact-brand guarantee · pay on delivery
        </div>
        <div style={{ height:96 }} />
      </div>

      {/* checkout bar */}
      <div style={{ position:'sticky', bottom:0, background:'var(--card)', borderTop:'1px solid var(--line)', padding:'10px 14px' }}>
        <button onClick={()=>props.go('checkout')} style={{ width:'100%', height:54, borderRadius:14, background:'var(--forest)', color:'#fff', fontWeight:800, fontSize:15, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 8px 0 18px' }}>
          <span className="tnum">{RS(total)} · {props.cartCount} item{props.cartCount>1?'s':''}</span>
          <span style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(255,255,255,.16)', padding:'10px 16px', borderRadius:10 }}>{props.closed?'Schedule & checkout':'Checkout'} <Icon name="chevR" size={17} color="#fff" sw={2.4} /></span>
        </button>
      </div>
    </div>
  );
}

/* ---------------- CHECKOUT ---------------- */
function CheckoutScreen(props) {
  const total = props.cartTotal;
  const [pay, setPay] = useState('cod');
  const [placed, setPlaced] = useState(false);
  const scheduled = props.closed;

  if (placed) {
    return (
      <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'30px 26px', textAlign:'center' }}>
          <div style={{ width:88, height:88, borderRadius:'50%', background:'var(--leaf-soft)', display:'grid', placeItems:'center', animation:'gb-pop .4s' }}>
            <Icon name="check" size={46} color="var(--leaf-ink)" sw={2.6} />
          </div>
          <div className="disp" style={{ fontSize:24, fontWeight:800, marginTop:20 }}>Order placed!</div>
          <div style={{ fontSize:14, color:'var(--ink-2)', marginTop:8, lineHeight:1.5, maxWidth:'30ch' }}>
            {scheduled ? 'Arriving tomorrow, 7:00 – 8:00 AM. ' : 'Arriving in about 60 minutes. '}
            Pay {pay==='cod'?'cash or UPI at the door':'is done'} — and remember, exact brand or full refund.</div>
          <div style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:14, padding:'12px 16px', marginTop:20, display:'flex', gap:10, alignItems:'center' }}>
            <Icon name="truck" size={22} color="var(--forest)" />
            <span className="tnum" style={{ fontSize:13, fontWeight:700 }}>Order #GBX{Math.floor(Math.random()*9000+1000)} · {RS(total)}</span>
          </div>
          <button onClick={()=>{ props.go('orders'); }} style={{ marginTop:22, height:50, padding:'0 30px', borderRadius:13, background:'var(--forest)', color:'#fff', fontWeight:800, fontSize:14 }}>Track order</button>
          <button onClick={()=>props.go('home')} style={{ marginTop:10, color:'var(--forest)', fontWeight:700, fontSize:13.5 }}>Back to home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gb" style={{ minHeight:'100%', display:'flex', flexDirection:'column', background:'var(--paper)' }}>
      <BackHeader title="Checkout" onBack={()=>props.go('cart')} />
      <div style={{ padding:'14px 16px 0', display:'flex', flexDirection:'column', gap:13 }}>
        {/* address */}
        <div style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:14, padding:14, display:'flex', gap:11 }}>
          <Icon name="mappin" size={20} color="var(--forest)" />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:800 }}>Deliver to Home</div>
            <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:2, lineHeight:1.4 }}>14, Shastri Nagar, near Ratanada, Jodhpur 342011</div>
          </div>
          <button style={{ fontSize:12, fontWeight:800, color:'var(--leaf-ink)' }}>Change</button>
        </div>

        {/* slot */}
        <div style={{ background:'var(--card)', border:'1px solid var(--line)', borderRadius:14, padding:14, display:'flex', gap:11, alignItems:'center' }}>
          <Icon name={scheduled?'calendar':'bolt'} size={20} color={scheduled?'var(--forest)':'var(--leaf)'} />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:800 }}>{scheduled?'Scheduled delivery':'Express delivery'}</div>
            <div style={{ fontSize:11.5, color:'var(--muted)', marginTop:2 }}>{scheduled?'Tomorrow, 7:00 – 8:00 AM':'In ~60 minutes'}</div>
          </div>
          <button onClick={()=>props.go('schedule')} style={{ fontSize:12, fontWeight:800, color:'var(--leaf-ink)' }}>{scheduled?'Edit':'Schedule'}</button>
        </div>

        {/* payment */}
        <div>
          <div style={{ fontSize:13, fontWeight:800, margin:'4px 2px 9px' }}>Payment method</div>
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            {[
              { id:'cod', t:'Pay on delivery', s:'Cash or UPI at your door — nothing upfront', rec:true },
              { id:'upi', t:'UPI / cards now', s:'GPay, PhonePe, Paytm, all cards' },
            ].map(o => {
              const on = pay===o.id;
              return <button key={o.id} onClick={()=>setPay(o.id)} style={{ display:'flex', gap:11, alignItems:'center', textAlign:'left', background: on?'var(--leaf-soft)':'var(--card)', border:`1.5px solid ${on?'var(--leaf)':'var(--line)'}`, borderRadius:13, padding:'13px 14px' }}>
                <span style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${on?'var(--leaf)':'var(--line-2)'}`, display:'grid', placeItems:'center', flexShrink:0 }}>{on && <span style={{ width:9, height:9, borderRadius:'50%', background:'var(--leaf)' }} />}</span>
                <span style={{ flex:1 }}>
                  <span style={{ display:'flex', alignItems:'center', gap:7 }}><span style={{ fontSize:13.5, fontWeight:800 }}>{o.t}</span>{o.rec && <span style={{ fontSize:9, fontWeight:800, background:'var(--forest)', color:'#fff', padding:'2px 6px', borderRadius:5 }}>EASIEST</span>}</span>
                  <span style={{ display:'block', fontSize:11.5, color:'var(--muted)', marginTop:2 }}>{o.s}</span>
                </span>
              </button>;
            })}
          </div>
        </div>

        {/* reassurance */}
        <div style={{ background:'var(--forest)', color:'#fff', borderRadius:14, padding:'13px 15px', display:'flex', gap:10, alignItems:'center' }}>
          <Icon name="shield" size={20} color="var(--butter)" />
          <span style={{ fontSize:12, lineHeight:1.4 }}>If anything's wrong — wrong brand, damaged, not as shown — we refund in full and pick it up free.</span>
        </div>
        <div style={{ height:96 }} />
      </div>

      {/* place order */}
      <div style={{ position:'sticky', bottom:0, background:'var(--card)', borderTop:'1px solid var(--line)', padding:'10px 14px' }}>
        <button onClick={()=>setPlaced(true)} style={{ width:'100%', height:54, borderRadius:14, background:'var(--leaf)', color:'#fff', fontWeight:800, fontSize:15, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 8px 0 18px', boxShadow:'0 6px 16px rgba(24,147,92,.32)' }}>
          <span className="tnum">{RS(total)}</span>
          <span style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(0,0,0,.16)', padding:'10px 16px', borderRadius:10 }}>{pay==='cod'?'Place order':'Pay now'} <Icon name="chevR" size={17} color="#fff" sw={2.4} /></span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { CartScreen, CheckoutScreen });
