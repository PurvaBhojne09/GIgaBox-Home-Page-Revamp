/* ============================================================
   Deck phone mounts — render live prototype screens as
   static phone mockups inside slides.
   ============================================================ */
(function () {
  const { useState, useRef, useEffect } = React;

  const SEED = { 'prestige-3l':1, 'futura-tawa':1, 'milton-bottle':2 };

  function DeckPhone({ screen, closed = false, scroll = 0, seeded }) {
    const [cart, setCart] = useState(seeded ? { ...SEED } : {});
    const ref = useRef(null);

    useEffect(() => {
      const t = setTimeout(() => {
        if (ref.current) {
          const sc = ref.current.querySelector('.gb-scroll');
          if (sc) sc.scrollTop = scroll;
        }
      }, 30);
      return () => clearTimeout(t);
    }, [scroll, screen]);

    const getQty = (id) => cart[id] || 0;
    const add = (id) => setCart(c => ({ ...c, [id]: (c[id]||0)+1 }));
    const inc = (id) => setCart(c => ({ ...c, [id]: (c[id]||0)+1 }));
    const dec = (id) => setCart(c => { const n={...c}; if((n[id]||0)<=1) delete n[id]; else n[id]--; return n; });
    const cartCount = Object.values(cart).reduce((a,b)=>a+b,0);
    const cartTotal = Object.entries(cart).reduce((a,[id,q])=>a+window.GB.byId[id].price*q,0);
    const noop = () => {};
    const P = { cart, getQty, add, inc, dec, setQ:noop, cartCount, cartTotal, closed,
      go:noop, openP:noop, openCat:noop, setTab:noop, setClosed:noop,
      onProfile:noop, onSearch:noop, onStore:noop, onSchedule:noop, onCat:noop, onBannerCta:noop };

    let el;
    switch (screen) {
      case 'home':     el = <HomeScreen closed={closed} tab="all" setTab={noop} {...P} />; break;
      case 'stores':   el = <StoresScreen {...P} />; break;
      case 'pdp':      el = <PdpScreen id="prestige-3l" {...P} />; break;
      case 'cart':     el = <CartScreen {...P} />; break;
      case 'checkout': el = <CheckoutScreen {...P} />; break;
      case 'schedule': el = <ScheduleScreen {...P} />; break;
      case 'search':   el = <SearchScreen {...P} />; break;
      default:         el = <HomeScreen closed={closed} tab="all" setTab={noop} {...P} />;
    }

    const greenTop = (screen==='home' || screen==='stores');
    return (
      <div ref={ref} style={{ pointerEvents:'none' }}>
        <AndroidDevice statusBg={greenTop?'var(--forest)':'#FBF8F0'} statusDark={greenTop} statusTime={closed?'11:18':'9:04'} deviceBg="#FBF8F0">
          <div className="gb" style={{ height:'100%', display:'flex', flexDirection:'column', background:'var(--paper)', position:'relative' }}>
            <div className="gb-scroll" style={{ flex:1, overflow:'auto', minHeight:0 }}>{el}</div>
            {(screen==='home'||screen==='stores') && cartCount>0 &&
              <div style={{ display:'flex', background:'var(--card)', borderTop:'1px solid var(--line)', padding:'7px 4px 6px' }}>
                {[['home','Home'],['grid','Categories'],['store','Stores'],['bag','Orders'],['user','Account']].map(([ic,l],i)=>(
                  <div key={l} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, color: i===0?'var(--forest)':'var(--muted)' }}>
                    <Icon name={ic} size={22} color={i===0?'var(--forest)':'var(--muted)'} /><span style={{ fontSize:10, fontWeight:i===0?800:600 }}>{l}</span>
                  </div>
                ))}
              </div>}
            {(screen==='home'||screen==='stores') && cartCount===0 &&
              <div style={{ display:'flex', background:'var(--card)', borderTop:'1px solid var(--line)', padding:'7px 4px 6px' }}>
                {[['home','Home'],['grid','Categories'],['store','Stores'],['bag','Orders'],['user','Account']].map(([ic,l],i)=>(
                  <div key={l} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, color: i===0?'var(--forest)':'var(--muted)' }}>
                    <Icon name={ic} size={22} color={i===0?'var(--forest)':'var(--muted)'} /><span style={{ fontSize:10, fontWeight:i===0?800:600 }}>{l}</span>
                  </div>
                ))}
              </div>}
          </div>
        </AndroidDevice>
      </div>
    );
  }

  function PhoneFrame({ targetW = 440, ...rest }) {
    const scale = targetW / 412;
    return (
      <div style={{ width: targetW, height: 892*scale, position:'relative' }}>
        <div style={{ transform:`scale(${scale})`, transformOrigin:'top left', position:'absolute', top:0, left:0 }}>
          <DeckPhone {...rest} />
        </div>
      </div>
    );
  }

  window.__mountPhones = function () {
    document.querySelectorAll('.phone[data-screen]').forEach(node => {
      if (node.__mounted) return;
      node.__mounted = true;
      const screen = node.dataset.screen;
      const closed = node.dataset.closed === '1';
      const scroll = parseInt(node.dataset.scroll || '0', 10);
      const w = parseInt(node.dataset.w || '440', 10);
      const seeded = node.dataset.seeded === '1';
      ReactDOM.createRoot(node).render(<PhoneFrame targetW={w} screen={screen} closed={closed} scroll={scroll} seeded={seeded} />);
    });
  };
})();
