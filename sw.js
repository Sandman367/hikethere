/* Network first so updates show right away; falls back to the last copy when there is no signal in the woods. */
const C="hikethere-v1";
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./manifest.webmanifest","./icon-192.png"]).catch(()=>{})));});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url),keep=u.origin===location.origin||/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.host);
  if(!keep)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok||res.type==="opaque"){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;})
    .catch(()=>caches.match(r,{ignoreSearch:u.origin===location.origin}).then(m=>m||caches.match("./"))));});
