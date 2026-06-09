/* ============================================================
   Gigabox shared UI — icons, price, product card, buttons
   Exports to window for the other babel scripts.
   ============================================================ */
const { useState, useEffect, useRef, useCallback, useContext } = React;

const RS = (v) => '₹' + v.toLocaleString('en-IN');

/* wishlist context — lets ProductCard/PDP toggle saved items without prop-drilling */
const WishContext = React.createContext({ wished: () => false, toggle: () => {} });
window.WishContext = WishContext;

/* ---------------- Icon set ---------------- */
function Icon({ name, size = 20, sw = 1.7, color = 'currentColor', fill = 'none', style }) {
  const p = { fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const F = { fill: color, stroke: 'none' };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" {...p}/><line x1="16.5" y1="16.5" x2="21" y2="21" {...p}/></>,
    scan: <><path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" {...p}/><line x1="4" y1="12" x2="20" y2="12" {...p}/></>,
    bolt: <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z" {...F}/>,
    phone: <path d="M5 4h3.2l1.4 4-2 1.3a12 12 0 0 0 5.1 5.1l1.3-2 4 1.4V19a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 5 4z" {...p}/>,
    user: <><circle cx="12" cy="8" r="3.4" {...p}/><path d="M5.5 20a6.5 6.5 0 0 1 13 0" {...p}/></>,
    home: <path d="M4 11l8-6.5L20 11v8a1 1 0 0 1-1 1h-4v-6h-4v6H5a1 1 0 0 1-1-1z" {...p}/>,
    grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.6" {...p}/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" {...p}/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" {...p}/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" {...p}/></>,
    store: <><path d="M4 9.5L5.2 5h13.6L20 9.5M4 9.5h16M4 9.5v9.5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9.5" {...p}/><path d="M4 9.5a2.2 2.2 0 0 0 4 0 2.2 2.2 0 0 0 4 0 2.2 2.2 0 0 0 4 0 2.2 2.2 0 0 0 4 0" {...p}/><path d="M9.5 20v-4.5h5V20" {...p}/></>,
    bag: <><path d="M6 8h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8.5A1.5 1.5 0 0 1 7 19.5z" {...p}/><path d="M9 9V7a3 3 0 0 1 6 0v2" {...p}/></>,
    cart: <><circle cx="9.5" cy="20" r="1.5" {...p}/><circle cx="17" cy="20" r="1.5" {...p}/><path d="M3 4h2.2l2 10.4a1.6 1.6 0 0 0 1.6 1.3h7.2a1.6 1.6 0 0 0 1.6-1.2L20.5 8H6" {...p}/></>,
    star: <path d="M12 3.5l2.6 5.3 5.9.86-4.27 4.16 1 5.88L12 17.9l-5.27 2.77 1-5.88L3.46 9.66l5.9-.86z" {...F}/>,
    chevR: <path d="M9 6l6 6-6 6" {...p}/>,
    chevD: <path d="M6 9l6 6 6-6" {...p}/>,
    chevL: <path d="M15 6l-6 6 6 6" {...p}/>,
    plus: <path d="M12 5v14M5 12h14" {...p}/>,
    minus: <path d="M5 12h14" {...p}/>,
    shield: <path d="M12 3l7 2.5v6.2c0 4.3-3 7.4-7 9-4-1.6-7-4.7-7-9V5.5z" {...p}/>,
    return: <><path d="M4 9h11a5 5 0 0 1 0 10H9" {...p}/><path d="M7.5 5.5L4 9l3.5 3.5" {...p}/></>,
    verified: <><path d="M12 3.2l1.9 1.6 2.5-.2.9 2.3 2.2 1.2-.6 2.4 1.3 2.1-1.8 1.7.2 2.5-2.3.8-1.2 2.2-2.4-.6-2.1 1.3-1.6-1.8-2.5.1-.8-2.3L4 14.8l.6-2.4L3.3 10l1.8-1.7-.2-2.5 2.3-.8 1.2-2.2 2.4.6z" {...p}/><path d="M9 12l2 2 4-4" {...p}/></>,
    cash: <><rect x="3" y="6" width="18" height="12" rx="2" {...p}/><circle cx="12" cy="12" r="2.6" {...p}/></>,
    clock: <><circle cx="12" cy="12" r="8" {...p}/><path d="M12 7.5V12l3 2" {...p}/></>,
    mappin: <><path d="M12 21s-6.5-5.5-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.5-6.5 11-6.5 11z" {...p}/><circle cx="12" cy="10" r="2.4" {...p}/></>,
    navigate: <path d="M21 4L3 11l7 2.6L12.6 21z" {...p}/>,
    close: <path d="M6 6l12 12M18 6L6 18" {...p}/>,
    heart: <path d="M12 20s-7-4.4-7-9.4A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 3.6c0 5-7 9.4-7 9.4z" {...p}/>,
    heartF: <path d="M12 20s-7-4.4-7-9.4A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 3.6c0 5-7 9.4-7 9.4z" {...F}/>,
    info: <><circle cx="12" cy="12" r="8.5" {...p}/><path d="M12 11v5M12 8h.01" {...p}/></>,
    check: <path d="M5 12.5l4.5 4.5L19 7" {...p}/>,
    truck: <><path d="M3 6h11v9H3zM14 9h3.5L21 12v3h-7" {...p}/><circle cx="7" cy="17.5" r="1.8" {...p}/><circle cx="17" cy="17.5" r="1.8" {...p}/></>,
    calendar: <><rect x="4" y="5.5" width="16" height="15" rx="2" {...p}/><path d="M4 10h16M8 3.5v4M16 3.5v4" {...p}/></>,
    sun: <><circle cx="12" cy="12" r="4" {...p}/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4" {...p}/></>,
    moon: <path d="M20 13.5A8 8 0 1 1 10.5 4a6.4 6.4 0 0 0 9.5 9.5z" {...p}/>,
    spark: <path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8z" {...F}/>,
    tag: <><path d="M4 12.5l8-8.5h6.5a1.5 1.5 0 0 1 1.5 1.5V12l-8 8z" {...p}/><circle cx="15.5" cy="8.5" r="1.3" {...F}/></>,
    /* ---- product glyphs (line) ---- */
    cooker: <><path d="M5 10h14v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" {...p}/><path d="M5 10l-1.5-1M19 10l1.5-1M9 7.5h6" {...p}/></>,
    pan: <><circle cx="10" cy="13" r="6" {...p}/><path d="M16 11l6-2.5" {...p}/></>,
    bottle: <><path d="M9.5 3h5v2.5l1 2v12a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 8.5 19.5v-12l1-2z" {...p}/><path d="M8.5 11h7" {...p}/></>,
    tools: <><path d="M7 3v7a2 2 0 0 0 4 0V3M9 12v9" {...p}/><path d="M16 3c-1.5 0-2.5 2-2.5 5s1 3.5 2.5 3.5S18.5 11 18.5 8 17.5 3 16 3zM16 12v9" {...p}/></>,
    appliance: <><rect x="6" y="3.5" width="12" height="17" rx="2.5" {...p}/><circle cx="12" cy="13" r="3.5" {...p}/><path d="M9 7h6" {...p}/></>,
    bat: <><path d="M14 4.5a2.2 2.2 0 0 1 3 3l-7 7-3-3z" {...p}/><path d="M9.5 13.5l-4.5 5" {...p}/></>,
    mat: <><rect x="4" y="7" width="16" height="10" rx="2.5" {...p}/><path d="M7.5 17v2M16.5 17v2M7 7l-2-1.5M17 7l2-1.5" {...p}/></>,
    racket: <><ellipse cx="10" cy="9" rx="5.5" ry="6" {...p}/><path d="M13.8 13.6L19 20" {...p}/><path d="M6.5 6.5l7 5M7 11l6-4.5" {...p}/></>,
    shoe: <><path d="M3 14l5-1 3-4 2 3 8 1.5a2 2 0 0 1 2 2V18H3z" {...p}/></>,
    plate: <><circle cx="12" cy="12" r="8" {...p}/><circle cx="12" cy="12" r="4" {...p}/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display:'block', flexShrink:0, ...style }} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
}

/* ---------------- Price ---------------- */
function Price({ p, big }) {
  const off = Math.round((1 - p.price / p.mrp) * 100);
  return (
    <div style={{ display:'flex', alignItems:'baseline', gap:6, flexWrap:'wrap' }}>
      <span className="disp tnum" style={{ fontWeight:700, fontSize: big?22:15, color:'var(--ink)' }}>{RS(p.price)}</span>
      <span className="tnum" style={{ fontSize: big?13:11, color:'var(--muted)', textDecoration:'line-through' }}>{RS(p.mrp)}</span>
      {off>0 && <span className="tnum" style={{ fontSize: big?13:11, fontWeight:700, color:'var(--leaf-ink)' }}>{off}% off</span>}
    </div>
  );
}

/* ---------------- Product tile placeholder ---------------- */
function ProductImage({ p, size = 'card' }) {
  const big = size === 'big';
  return (
    <div style={{
      position:'relative', width:'100%', aspectRatio: big ? '1.2/1' : '1/1',
      background:`radial-gradient(120% 120% at 30% 20%, #fff, ${p.tone})`,
      borderRadius: big?16:12, display:'flex', alignItems:'center', justifyContent:'center',
      overflow:'hidden',
    }}>
      <Icon name={p.glyph} size={big?96:54} sw={1.3} color="rgba(20,40,30,0.34)" />
      <span style={{
        position:'absolute', left:8, bottom:7, fontSize: big?11:9, fontWeight:700,
        letterSpacing:'.04em', textTransform:'uppercase', color:'rgba(20,40,30,0.4)',
      }}>{p.brand}</span>
    </div>
  );
}

/* ---------------- Add / stepper button ---------------- */
function AddBtn({ qty, onAdd, onInc, onDec, block }) {
  if (!qty) {
    return (
      <button onClick={onAdd} style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:6,
        height:34, width: block?'100%':38, padding: block?'0 16px':0, borderRadius:10,
        background:'var(--leaf-soft)', color:'var(--leaf-ink)',
        border:'1px solid rgba(24,147,92,0.3)', fontWeight:800, fontSize:14,
      }}>
        <Icon name="plus" size={17} sw={2.4} color="var(--leaf-ink)" />
        {block && <span>Add to cart</span>}
      </button>
    );
  }
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      height:34, width: block?'100%':86, borderRadius:10, background:'var(--leaf)',
      color:'#fff', padding:'0 4px', boxShadow:'var(--shadow-sm)',
    }}>
      <button onClick={onDec} style={{ width:30, height:30, color:'#fff', display:'grid', placeItems:'center' }}>
        <Icon name="minus" size={16} sw={2.6} color="#fff" />
      </button>
      <span className="tnum" style={{ fontWeight:800, fontSize:15, animation:'gb-pop .25s' }}>{qty}</span>
      <button onClick={onInc} style={{ width:30, height:30, color:'#fff', display:'grid', placeItems:'center' }}>
        <Icon name="plus" size={16} sw={2.6} color="#fff" />
      </button>
    </div>
  );
}

/* ---------------- Product card (grid) ---------------- */
function ProductCard({ p, qty, onAdd, onInc, onDec, onOpen }) {
  const wish = useContext(WishContext);
  const saved = wish.wished(p.id);
  return (
    <div style={{
      position:'relative', width:148, flexShrink:0, background:'var(--card)', borderRadius:14,
      border:'1px solid var(--line)', padding:8, display:'flex', flexDirection:'column', gap:7,
    }}>
      <button onClick={(e)=>{ e.stopPropagation(); wish.toggle(p.id); }} aria-label="Save to wishlist" style={{
        position:'absolute', top:14, right:14, zIndex:3, width:30, height:30, borderRadius:'50%',
        background:'rgba(255,255,255,.92)', boxShadow:'var(--shadow-sm)', display:'grid', placeItems:'center',
        border: saved?'1px solid rgba(201,70,46,.3)':'1px solid var(--line)',
      }}>
        <Icon name={saved?'heartF':'heart'} size={16} sw={2} color={saved?'var(--danger)':'var(--muted)'} />
      </button>
      <div onClick={onOpen} style={{ cursor:'pointer' }}><ProductImage p={p} /></div>
      <div onClick={onOpen} style={{ cursor:'pointer', display:'flex', flexDirection:'column', gap:2, minHeight:54 }}>
        <span style={{ fontSize:10, fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.03em' }}>{p.brand}</span>
        <span style={{ fontSize:12.5, fontWeight:600, lineHeight:1.25, color:'var(--ink)',
          display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.name}</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:4 }}>
        <Icon name="star" size={11} color="var(--leaf)" />
        <span className="tnum" style={{ fontSize:11, fontWeight:700 }}>{p.rating}</span>
        <span className="tnum" style={{ fontSize:10.5, color:'var(--muted)' }}>({p.ratings>999?(p.ratings/1000).toFixed(1)+'k':p.ratings})</span>
      </div>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginTop:'auto', gap:6 }}>
        <Price p={p} />
        <AddBtn qty={qty} onAdd={onAdd} onInc={onInc} onDec={onDec} />
      </div>
    </div>
  );
}

/* ---------------- Section header ---------------- */
function RowHeader({ title, tag, onAll }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 16px', marginBottom:10 }}>
      <div>
        {tag && <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--leaf-ink)', marginBottom:2 }}>{tag}</div>}
        <h3 className="disp" style={{ margin:0, fontSize:18, fontWeight:700, color:'var(--ink)' }}>{title}</h3>
      </div>
      {onAll && (
        <button onClick={onAll} style={{ display:'flex', alignItems:'center', gap:1, color:'var(--leaf-ink)', fontWeight:700, fontSize:12.5 }}>
          View all <Icon name="chevR" size={15} color="var(--leaf-ink)" sw={2.2} />
        </button>
      )}
    </div>
  );
}

Object.assign(window, { RS, Icon, Price, ProductImage, AddBtn, ProductCard, RowHeader });
