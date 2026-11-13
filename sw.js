// Sales Tracker service worker: caches the app so it opens offline.
// Bump VERSION whenever you upload a new index.html so phones pick it up.
const VERSION="v2",CACHE="sales-tracker-"+VERSION;
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET")return;
  const font=u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com";
  if(u.origin!==location.origin&&!font)return; // never touch Google Sheets sync / AI calls
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(r,{ignoreSearch:true});
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque"))c.put(r,res.clone());return res}).catch(()=>hit);
    return hit||net;
  }));
});
