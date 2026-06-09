/* ============================================================
   Gigabox — app shell: nav, cart state, bottom bar, device
   ============================================================ */
const GB = window.GB;

function BottomNav({ active, go, cartCount }) {
  const items = [
    { id:'home', label:'Home', ic:'home' },
    { id:'categories', label:'Categories', ic:'grid' },
    { id:'stores', label:'Stores', ic:'store' },
    { id:'orders', label:'Orders', ic:'bag' },
    { id:'account', label:'Account', ic:'user' },
  ];
  return (
    <div style={{ display:'flex', background:'var(--card)', borderTop:'1px solid var(--line)', padding:'7px 4px 6px' }}>
      {items.map(it => {
        const on = active===it.id;
        return (
          <button key={it.id} onClick={()=>go(it.id)} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            color: on?'var(--forest)':'var(--muted)', position:'relative',
          }}>
            <Icon name={it.ic} size={22} color={on?'var(--forest)':'var(--muted)'} sw={on?2:1.7} />
            <span style={{ fontSize:10, fontWeight: on?800:600 }}>{it.label}</span>
            {it.id==='stores' && <span style={{ position:'absolute', top:-2, right:'50%', marginRight:-22, width:6, height:6, borderRadius:6, background:'var(--butter)' }} />}
          </button>
        );
      })}
    </div>
  );
}

function CartBar({ count, total, onView }) {
  return (
    <div style={{ padding:'8px 12px', background:'var(--card)', borderTop:'1px solid var(--line)' }}>
      <button onClick={onView} style={{
        width:'100%', height:50, borderRadius:13, background:'var(--leaf)', color:'#fff',
        display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 8px 0 16px',
        boxShadow:'0 6px 16px rgba(24,147,92,.34)',
      }}>
        <span style={{ display:'flex', alignItems:'center', gap:9 }}>
          <span style={{ display:'grid', placeItems:'center', width:26, height:26, borderRadius:8, background:'rgba(255,255,255,.2)' }}>
            <Icon name="bag" size={16} color="#fff" />
          </span>
          <span className="tnum" style={{ fontWeight:700, fontSize:13.5 }}>{count} item{count>1?'s':''} · {RS(total)}</span>
        </span>
        <span style={{ display:'flex', alignItems:'center', gap:4, background:'rgba(0,0,0,.16)', padding:'9px 14px', borderRadius:10, fontWeight:800, fontSize:13.5 }}>
          View cart <Icon name="chevR" size={16} color="#fff" sw={2.4} />
        </span>
      </button>
    </div>
  );
}

function Placeholder({ title }) {
  return <div className="gb" style={{ padding:40, textAlign:'center', color:'var(--muted)' }}>
    <div className="disp" style={{ fontSize:18, fontWeight:700, color:'var(--ink)' }}>{title}</div>
    <div style={{ fontSize:13, marginTop:8 }}>Coming up next…</div>
  </div>;
}

function GigaboxApp({ closed, setClosed }) {
  const [screen, setScreen] = useState('home');     // current top-level / overlay
  const [tab, setTab] = useState('all');            // home category tab
  const [cart, setCart] = useState({});
  const [wish, setWish] = useState({});             // wishlist: id -> true
  const [activeId, setActiveId] = useState(null);
  const [activeCat, setActiveCat] = useState(null);
  const [toast, setToast] = useState(null);
  const scrollRef = useRef(null);

  // ---- first-run store selection (Kitchen vs Sports) ----
  const saved = (() => { try { return localStorage.getItem('gb-store'); } catch (e) { return null; } })();
  const [storeId, setStoreId] = useState(saved || 'kitchen');
  const [showPicker, setShowPicker] = useState(!saved);
  const activeStore = GB.stores.find(s => s.id === storeId) || GB.stores[0];

  const pickStore = (id) => {
    setStoreId(id);
    try { localStorage.setItem('gb-store', id); } catch (e) {}
    setTab(id === 'sports' ? 'sports' : id === 'kitchen' ? 'kitchen' : 'all');
    setShowPicker(false);
    setScreen('home');
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };
  const openPicker = () => setShowPicker(true);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [screen, tab]);

  const getQty = (id) => cart[id] || 0;
  const flashToast = (label, icon) => { setToast({ label, icon }); clearTimeout(window.__gbt); window.__gbt = setTimeout(() => setToast(null), 1500); };
  const add = (id) => { setCart(c => ({ ...c, [id]: (c[id]||0)+1 })); flashToast('Added to cart', 'check'); };
  const inc = (id) => setCart(c => ({ ...c, [id]: (c[id]||0)+1 }));
  const dec = (id) => setCart(c => { const n={...c}; if((n[id]||0)<=1) delete n[id]; else n[id]--; return n; });
  const setQ = (id,q) => setCart(c => { const n={...c}; if(q<=0) delete n[id]; else n[id]=q; return n; });

  // ---- wishlist ----
  const inWish = (id) => !!wish[id];
  const toggleWish = (id) => setWish(w => {
    const n = { ...w };
    if (n[id]) { delete n[id]; flashToast('Removed from wishlist', 'close'); }
    else { n[id] = true; flashToast('Saved to wishlist', 'heartF'); }
    return n;
  });
  const moveToCart = (id) => { setCart(c => ({ ...c, [id]: (c[id]||0)+1 })); setWish(w => { const n={...w}; delete n[id]; return n; }); flashToast('Moved to cart', 'check'); };

  const cartCount = Object.values(cart).reduce((a,b)=>a+b,0);
  const cartTotal = Object.entries(cart).reduce((a,[id,q])=>a+GB.byId[id].price*q,0);
  const wishCount = Object.keys(wish).length;

  const go = (s) => setScreen(s);
  const openP = (id) => { setActiveId(id); setScreen('pdp'); };
  const openCat = (c) => { setActiveCat(c||null); setScreen('categories'); };

  // expose nav for the case-study demo buttons
  useEffect(() => {
    window.__gbGo = go;
    window.__gbOpenP = openP;
    window.__gbPicker = openPicker;
    window.dispatchEvent(new CustomEvent('gb-screen', { detail:{ screen } }));
  }, [screen]);

  // which screens are full-screen overlays (no bottom nav)
  const overlay = ['pdp','cart','checkout','schedule','search','wishlist'].includes(screen);
  const topLevel = overlay ? null : screen;

  const cartCtx = { cart, getQty, add, inc, dec, setQ, cartCount, cartTotal,
    wish, inWish, toggleWish, moveToCart, wishCount };
  const nav = { go, openP, openCat, setTab,
    onProfile:()=>go('account'), onSearch:()=>go('search'), onStore:()=>go('stores'),
    onSchedule:()=>go('schedule'), onCat:openCat, onBannerCta:()=>{},
    onWishlist:()=>go('wishlist'), onCart:()=>go('cart'),
    onContact:()=>flashToast('Call us · 0291 245 1188', 'phone'),
    store:activeStore, openPicker, closed, setClosed };

  const renderScreen = () => {
    const common = { ...cartCtx, ...nav };
    switch (screen) {
      case 'home':    return <HomeScreen closed={closed} tab={tab} setTab={setTab} {...common} />;
      case 'stores':  return window.StoresScreen ? <StoresScreen {...common} /> : <Placeholder title="Stores" />;
      case 'pdp':     return window.PdpScreen ? <PdpScreen id={activeId} {...common} /> : <Placeholder title="Product" />;
      case 'cart':    return window.CartScreen ? <CartScreen {...common} /> : <Placeholder title="Cart" />;
      case 'checkout':return window.CheckoutScreen ? <CheckoutScreen closed={closed} {...common} /> : <Placeholder title="Checkout" />;
      case 'schedule':return window.ScheduleScreen ? <ScheduleScreen {...common} /> : <Placeholder title="Schedule" />;
      case 'search':  return window.SearchScreen ? <SearchScreen {...common} /> : <Placeholder title="Search" />;
      case 'wishlist':return window.WishlistScreen ? <WishlistScreen {...common} /> : <Placeholder title="Wishlist" />;
      case 'categories': return window.CategoriesScreen ? <CategoriesScreen cat={activeCat} {...common} /> : <Placeholder title="Categories" />;
      case 'orders':  return window.OrdersScreen ? <OrdersScreen {...common} /> : <Placeholder title="Orders" />;
      case 'account': return window.AccountScreen ? <AccountScreen closed={closed} setClosed={setClosed} {...common} /> : <Placeholder title="Account" />;
      default: return <HomeScreen closed={closed} tab={tab} setTab={setTab} {...common} />;
    }
  };

  // status bar tint per screen
  const greenTop = (screen==='home' || screen==='stores' || showPicker);
  const statusBg = greenTop ? 'var(--forest)' : '#FBF8F0';

  const wishVal = { wished: inWish, toggle: toggleWish };

  return (
    <WishContext.Provider value={wishVal}>
    <AndroidDevice statusBg={statusBg} statusDark={greenTop} statusTime="9:04" deviceBg="#FBF8F0">
      {showPicker && window.StorePicker ? (
        <StorePicker stores={GB.stores} activeId={storeId} onPick={pickStore} closed={closed} />
      ) : (
      <div className="gb" style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--paper)', position:'relative' }}>
        <div ref={scrollRef} className="gb-scroll" style={{ flex:1, overflow:'auto', minHeight:0 }}>
          {renderScreen()}
        </div>

        {/* toast */}
        {toast && (
          <div style={{ position:'absolute', left:14, right:14, bottom: (overlay?14:128), zIndex:40, display:'flex', justifyContent:'center', pointerEvents:'none' }}>
            <div style={{ background:'var(--ink)', color:'#fff', padding:'10px 16px', borderRadius:12, fontSize:12.5, fontWeight:600, display:'flex', alignItems:'center', gap:8, boxShadow:'var(--shadow-lg)', animation:'gb-fade-up .25s' }}>
              <Icon name={toast.icon} size={16} color={toast.icon==='heartF'?'#FF8B7A':'var(--butter)'} sw={2.6} /> {toast.label}
            </div>
          </div>
        )}

        {/* cart bar + bottom nav for top-level screens */}
        {!overlay && cartCount>0 && screen!=='cart' && <CartBar count={cartCount} total={cartTotal} onView={()=>go('cart')} />}
        {!overlay && <BottomNav active={topLevel} go={go} cartCount={cartCount} />}
      </div>
      )}
    </AndroidDevice>
    </WishContext.Provider>
  );
}

window.GigaboxApp = GigaboxApp;
