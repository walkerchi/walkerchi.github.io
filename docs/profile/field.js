/* Original procedural sketches: no external assets or rendering dependencies. */
(() => {
  'use strict';
  const host = document.querySelector('.field');
  if (!host) return;
  const canvas = host.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const stage = host.querySelector('.field-stage');
  const pause = host.querySelector('.field-pause');
  const tabs = [...host.querySelectorAll('[data-scene]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let scene = 'graph', stopped = reduced.matches, visible = false;
  let width = 1, height = 1, frame = 0, last = 0, elapsed = 0;
  let pointer = {x: 0, y: 0}, blue, red, surface;
  const TAU = Math.PI * 2;

  function colors() {
    const css = getComputedStyle(document.body);
    blue = css.getPropertyValue('--p-accent').trim();
    red = document.body.dataset.mdColorScheme === 'slate' ? '#ffab91' : '#d55d38';
    surface = css.getPropertyValue('--p-bg').trim();
  }
  function project(v, turn = 0) {
    const angle = -.52 + turn + pointer.x * .12;
    const x = v[0] * Math.cos(angle) + v[2] * Math.sin(angle);
    const z = -v[0] * Math.sin(angle) + v[2] * Math.cos(angle);
    const tilt = .30 + pointer.y * .08;
    const y = v[1] * Math.cos(tilt) - z * Math.sin(tilt);
    const scale = Math.min(width / 4.8, height / 3.3);
    return [width / 2 + x * scale, height / 2 - y * scale];
  }
  function line(a, b, color = blue, opacity = .35, weight = .8) {
    ctx.globalAlpha = opacity; ctx.strokeStyle = color; ctx.lineWidth = weight;
    ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke();
  }
  function dot(p, radius = 2, color = blue, opacity = 1) {
    ctx.globalAlpha = opacity; ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(p[0], p[1], radius, 0, TAU); ctx.fill();
  }
  function path(points, color = blue, opacity = .4, weight = .8) {
    ctx.globalAlpha = opacity; ctx.strokeStyle = color; ctx.lineWidth = weight;
    ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke();
  }
  function label(point, title) {
    const x = Math.min(width - 105, Math.max(12, point[0] + 24));
    const y = Math.max(28, Math.min(height - 20, point[1] - 30));
    line(point, [x - 5, y - 4], red, .7);
    ctx.globalAlpha = .92; ctx.font = '10px ui-monospace, monospace';
    ctx.fillStyle = surface; ctx.fillRect(x - 3, y - 14, ctx.measureText(title).width + 8, 20);
    ctx.fillStyle = red; ctx.fillText(title, x, y);
  }
  function graph(t) {
    const nodes = [], edges = [];
    const turn = .12 * Math.sin(t * .22);
    for (let l = 0; l < 4; l++) for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
      nodes.push(project([(l - 1.5) * 1.1, (row - 1) * .85, (col - 1) * .85], turn));
      const id = l * 9 + row * 3 + col;
      if (row) edges.push([id - 3, id]);
      if (col) edges.push([id - 1, id]);
      if (l) { edges.push([id - 9, id]); if (row < 2 && col < 2) edges.push([id - 5, id]); }
    }
    edges.forEach(([a,b]) => line(nodes[a],nodes[b],blue,.23));
    nodes.forEach((p,i) => { dot(p,3.7,surface); dot(p,2.2,blue,i%9===4?1:.58); });
    for (let j=0;j<9;j++) {
      const step = (t*.65+j*.17)%3, layer=Math.floor(step), f=step-layer;
      const a=nodes[layer*9+j],b=nodes[(layer+1)*9+j];
      line(a,b,blue,.7,1.15);
      dot([a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f],3,red);
    }
    label(nodes[22], 'aggregate →');
  }
  function mesh(t) {
    const n=9, m=5, depth=4;
    const point=(i,j,k)=>{
      const x=(i/n-.5)*3.4,y=(j/m-.5)*1.8,z=(k/depth-.5)*1.5;
      const bend=Math.sin(i/n*Math.PI)*Math.sin(t*.9)*.4;
      return project([x,y+bend,z+Math.sin(i/n*Math.PI)*Math.cos(t*.6)*.12],.18);
    };
    for(let i=0;i<=n;i++) for(let j=0;j<=m;j++) for(let k=0;k<=depth;k++) {
      if(i!==0&&i!==n&&j!==0&&j!==m&&k!==0&&k!==depth)continue;
      const a=point(i,j,k);
      if(i<n)line(a,point(i+1,j,k),blue,.42);
      if(j<m)line(a,point(i,j+1,k),blue,.36);
      if(k<depth)line(a,point(i,j,k+1),blue,.3);
      if(k===depth&&i<n&&j<m)line(a,point(i+1,j+1,k),blue,.17);
      dot(a,1.2,blue,.5);
    }
    const band=[];for(let i=0;i<=n;i++)band.push(point(i,m,depth));
    path(band,red,.9,1.5);label(point(5,m,depth),'u(x, t)');
    for(let i=2;i<9;i+=2){const a=point(i,m,2),b=[a[0],a[1]-24];line(b,a,red,.65);line(a,[a[0]-3,a[1]-6],red,.65);line(a,[a[0]+3,a[1]-6],red,.65);}
  }
  function orbit(t) {
    const spin=t*.10;
    const globe=(lat,lon)=>[Math.cos(lat)*Math.cos(lon),Math.sin(lat),Math.cos(lat)*Math.sin(lon)];
    for(let lat=-Math.PI/2+.22;lat<Math.PI/2;lat+=Math.PI/9){const ring=[];for(let i=0;i<=100;i++)ring.push(project(globe(lat,i/100*TAU+spin),.25));path(ring,blue,.28);}
    for(let lon=0;lon<Math.PI;lon+=Math.PI/12){const ring=[];for(let i=0;i<=100;i++){const a=i/100*TAU;ring.push(project([Math.cos(a)*Math.cos(lon+spin),Math.sin(a),Math.cos(a)*Math.sin(lon+spin)],.25));}path(ring,blue,.26);}
    const ring=[];for(let i=0;i<=150;i++){const a=i/150*TAU;ring.push(project([2.05*Math.cos(a),0,2.05*Math.sin(a)],.25));}path(ring,blue,.6);
    const a=spin+.7,anchor=[Math.cos(a),0,Math.sin(a)],end=[2.35*Math.cos(a),0,2.35*Math.sin(a)];
    const start=project(anchor,.25),stop=project(end,.25);line(start,stop,red,1,1.7);dot(start,3,red);dot(stop,3,red);
    const f=(t*.14)%1,climber=project(anchor.map((v,i)=>v+(end[i]-v)*f),.25);dot(climber,4,red);
    label(stop,'tether ↗');
    const sat=project([2.05*Math.cos(-t*.22),0,2.05*Math.sin(-t*.22)],.25);dot(sat,3.3,blue);
  }
  function draw() {
    ctx.clearRect(0,0,width,height);
    ({graph,mesh,orbit})[scene](elapsed);
    ctx.globalAlpha=1;
  }
  function tick(now) {
    frame=0;
    if(!visible||document.hidden||stopped)return;
    if(now-last>=1000/30){elapsed+=Math.min((now-last)/1000,.06);last=now;draw();}
    frame=requestAnimationFrame(tick);
  }
  function schedule() {
    if(frame)cancelAnimationFrame(frame);frame=0;last=performance.now();
    if(visible&&!document.hidden&&!stopped)frame=requestAnimationFrame(tick);
  }
  function resize() {
    width=stage.clientWidth;height=stage.clientHeight;
    const ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);draw();
  }
  function pauseState() {
    pause.setAttribute('aria-pressed',String(stopped));
    pause.querySelector('.when-playing').hidden=stopped;
    pause.querySelector('.when-paused').hidden=!stopped;
    schedule();draw();
  }
  tabs.forEach(button=>button.addEventListener('click',()=>{
    scene=button.dataset.scene;elapsed=0;
    tabs.forEach(tab=>tab.setAttribute('aria-pressed',String(tab===button)));
    host.querySelectorAll('[data-scene-caption]').forEach(el=>el.hidden=el.dataset.sceneCaption!==scene);
    draw();
  }));
  pause.addEventListener('click',()=>{stopped=!stopped;pauseState();});
  reduced.addEventListener('change',()=>{stopped=reduced.matches;pauseState();});
  stage.addEventListener('pointermove',e=>{
    if(stopped||e.pointerType==='touch')return;
    const box=stage.getBoundingClientRect();pointer={x:(e.clientX-box.left)/width-.5,y:(e.clientY-box.top)/height-.5};
  });
  stage.addEventListener('pointerleave',()=>{pointer={x:0,y:0};});
  document.addEventListener('visibilitychange',schedule);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();}).observe(host);
  new ResizeObserver(resize).observe(stage);
  new MutationObserver(()=>{colors();draw();}).observe(document.body,{attributes:true,attributeFilter:['data-md-color-scheme']});
  colors();resize();pauseState();host.classList.add('field-ready');
  host.querySelector('.field-tabs').hidden=false;pause.hidden=false;
})();
