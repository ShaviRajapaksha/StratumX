(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31713,e=>{"use strict";var a=e.i(43476),t=e.i(71645);let l=(...e)=>e.filter((e,a,t)=>!!e&&""!==e.trim()&&t.indexOf(e)===a).join(" ").trim(),s=e=>{let a=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,a,t)=>t?t.toUpperCase():a.toLowerCase());return a.charAt(0).toUpperCase()+a.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=(0,t.createContext)({}),i=(0,t.forwardRef)(({color:e,size:a,strokeWidth:s,absoluteStrokeWidth:i,className:o="",children:d,iconNode:c,...f},m)=>{let{size:h=24,strokeWidth:x=2,absoluteStrokeWidth:b=!1,color:p="currentColor",className:u=""}=(0,t.useContext)(n)??{},g=i??b?24*Number(s??x)/Number(a??h):s??x;return(0,t.createElement)("svg",{ref:m,...r,width:a??h??r.width,height:a??h??r.height,stroke:e??p,strokeWidth:g,className:l("lucide",u,o),...!d&&!(e=>{for(let a in e)if(a.startsWith("aria-")||"role"===a||"title"===a)return!0;return!1})(f)&&{"aria-hidden":"true"},...f},[...c.map(([e,a])=>(0,t.createElement)(e,a)),...Array.isArray(d)?d:[d]])}),o=(e,a)=>{let r=(0,t.forwardRef)(({className:r,...n},o)=>(0,t.createElement)(i,{ref:o,iconNode:a,className:l(`lucide-${s(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,r),...n}));return r.displayName=s(e),r},d=o("settings",[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),c=o("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]),f=o("rotate-cw",[["path",{d:"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",key:"1p45f6"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}]]),m=o("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),h=o("moon",[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]),x={monochrome:["#000000","#2a2a2a","#555555","#888888","#bbbbbb","#e8e8e8","#ffffff"],sunset:["#4a0e4e","#8b3a62","#c74a64","#e87d5c","#f5a563","#f5d895","#fffbe6"],emerald:["#000000","#1a4d2e","#2d7a4f","#4a9d6f","#7ec176","#b8e8c5","#e8f7f0"],violet:["#2d0a5c","#5c1a9e","#8b3acd","#c76aff","#d68fff","#e8b3ff","#f5e6ff"],ocean:["#001f3f","#003d7a","#0066b3","#0088cc","#3399dd","#66ccff","#ccf0ff"],retro:["#8b3a3a","#d63b3b","#ff6b6b","#ffaa5c","#ffd93d","#f5ff8d","#ffffff"],aurora:["#0a0e27","#1a3a52","#2d5a7b","#4a85b2","#7bb4d9","#afd6f0","#e8f3ff"],forest:["#0d1b0f","#1b3d24","#2d5a3d","#4a7d5c","#6ba87c","#9bd9a8","#c5f0d0"],berry:["#2a0845","#5a1b7d","#8b2fb3","#c74aff","#e580ff","#f0b3ff","#f5e6ff"],peach:["#5c2a1a","#8b4a32","#b85c3d","#e8845c","#f5a57d","#f5c9a8","#fff0e6"],mint:["#0d3d2d","#1a5c4a","#2d8570","#4aae99","#7ddcc9","#b3f0e6","#dfffff"],lavender:["#2d1b5c","#5c3a8b","#8b5acd","#b88aff","#d9b3ff","#ecd9ff","#f5f0ff"],coral:["#4a1a1a","#8b3232","#c75050","#ff7070","#ff9999","#ffb8b8","#ffe6e6"],slate:["#1a1f2e","#2d3f52","#4a5f7a","#6a7f9e","#8fa3b8","#b8d0e6","#dfe8f2"],midnight:["#050a15","#0d1b3d","#1a2d5c","#2d4a7d","#4a7db8","#7db8e8","#e8f0ff"],terra:["#1a0f0a","#3d2a1a","#5c3d2d","#7d5a4a","#b88a7d","#e8c9b8","#fff5e8"],neon:["#0a0a0a","#1a0a2d","#2d0a5c","#4a0a8b","#7d3acd","#b88aff","#f5e6ff"],autumn:["#3d1a0a","#7d3a1a","#b85c2d","#e8844a","#f5a56b","#f5d08d","#fff5e6"],arctic:["#0a1a2a","#1a3d5c","#2d6a8b","#4a9db8","#7dd0e8","#b8e8f5","#e6f5ff"],desert:["#2a1a0a","#5c3d1a","#8b5c2d","#b8844a","#e8b87d","#f5d9b8","#fff5e6"]},b={stripes:"Stripes","layered-waves":"Layered Waves",mountains:"Mountains",organic:"Organic",circles:"Circles","layered-arches":"Layered Arches",geometric:"Geometric","gradient-mesh":"Gradient Mesh","liquid-mixed":"Liquid Mixed","abstract-flow":"Abstract Flow",nebula:"Nebula",crystal:"Crystal",ripple:"Ripple",cosmic:"Cosmic","fluid-blob":"Fluid Blob","terrain-layers":"Terrain Layers","liquid-blend":"Liquid Blend","plasma-flow":"Plasma Flow","mixed-fluid":"Mixed Fluid","sand-dunes":"Sand Dunes","aurora-veil":"Aurora Veil"};function p(e){let a=1e4*Math.sin(e);return a-Math.floor(a)}function u(e,a,t){let l=43758.5453*Math.sin(12.9898*e+78.233*a+43758.5453*t);return l-Math.floor(l)}function g(e,a,t){var l;let s=Math.floor(e),r=Math.floor(a),n=e-s,i=a-r,o=u(s,r,t),d=u(s+1,r,t),c=u(s,r+1,t),f=u(s+1,r+1,t),m=n*n*(3-2*n);return(l=o+(d-o)*m)+i*i*(3-2*i)*(c+(f-c)*m-l)}function v(e){let a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return a?[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]:[0,0,0]}function y(e,a,t,l=!1){let s=a/(t-1);l&&(s=1-s);let r=s*(e.length-1),n=Math.floor(r),i=Math.ceil(r);return n===i?e[n]:function(e,a,t){let[l,s,r]=v(e),[n,i,o]=v(a);return"#"+[l+(n-l)*t,s+(i-s)*t,r+(o-r)*t].map(e=>{let a=Math.round(e).toString(16);return 1===a.length?"0"+a:a}).join("")}(e[n],e[i],r-n)}async function w(e,a,t){let l=e,s=a,r=Math.ceil(Math.sqrt(l*l+s*s));e=r,a=r;let n=document.createElement("canvas");n.width=e,n.height=a;let i=n.getContext("2d"),o=x[t.palette],d=t.pattern.endsWith("-bottom"),c=d?t.pattern.slice(0,-7):t.pattern;t.heightAdjustment;let f=t.layerCount||12;i.fillStyle=d?t.isReversed?t.isDark?o[0]:o[o.length-1]:t.isDark?o[o.length-1]:o[0]:y(o,0,f,t.isReversed),i.fillRect(0,0,e,a);let m=(.3*p(t.seed+1)+.1)*(t.randomness||1);i.save();let h=e/2,b=a/2;if(i.translate(h,b),i.rotate((t.rotation||0)*Math.PI/180),i.translate(-h,-b),"stripes"===c)for(let l=0;l<f;l++){let s=l/f*a,r=y(o,l,f,t.isReversed),n=(l+1)/f*a;i.fillStyle=r,i.fillRect(0,s,e,n-s)}else if("layered-waves"===c){let l=.3*a,s=t.layerCount||8;for(let r=0;r<s;r++){let n=r/s,d=y(o,r,s,t.isReversed),c=n*a*.8+.1*a,f=l*(.3+.7*n)*t.scale,m=2+3*n,h=.5*r+t.seed;i.fillStyle=d,i.globalAlpha=.7+.3*n,i.beginPath(),i.moveTo(0,c+.5*f);for(let a=0;a<=e;a+=e/100){let l=g(a/e*m,h,t.seed+r),s=Math.sin(a/e*m*Math.PI*2+h)*f*.5+l*f*.3*t.randomness;i.lineTo(a,c+s)}i.lineTo(e,a),i.lineTo(0,a),i.closePath(),i.fill(),i.globalAlpha=1}}else if("layered-arches"===c){let l=t.layerCount||8,s=.9*a,r=.1*a,n=e/2;for(let e=l-1;e>=0;e--){let d=e/l,c=y(o,e,l,t.isReversed),f=r+d*s*t.scale,m=1.2*f,h=a*(.9-.8*d),x=n-m,b=n+m;i.fillStyle=c,i.globalAlpha=.6+.4*d,i.beginPath(),i.moveTo(x,h);let p=n-.8*m,u=h-.9*f,g=n+.8*m,v=h-.9*f;i.bezierCurveTo(p,u,g,v,b,h),i.lineTo(b,a),i.lineTo(x,a),i.closePath(),i.fill(),i.globalAlpha=1}}else if("mountains"===c){let l=t.layerCount||6;for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=a*(.3+.5*r),c=a*(.2+(1-r)*.4)*t.scale,f=Math.floor(3+5*r);i.fillStyle=n,i.globalAlpha=.7+.3*r,i.beginPath(),i.moveTo(0,d+.2*c);for(let a=0;a<=f;a++){let l=a/f*e,n=g(l/e*5,2*s,t.seed+100),o=(n-.5)*.6*(1-r)*c,m=l+(n-.5)*e*.1,h=d-c*(.3+.7*(1-r)*(.5+.5*Math.abs(n)))+o;if(0===a)i.lineTo(m,h);else{let t=((a-1)/f*e+m)/2,l=d-c*(.1+.3*(1-r));i.quadraticCurveTo(t,l,m,h)}}i.lineTo(e,a),i.lineTo(0,a),i.closePath(),i.fill(),i.globalAlpha=1}}else if("organic"===c){let l=t.layerCount||8;for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=(.2+.6*r)*e+(p(t.seed+3*s)-.5)*e*.2,c=(.2+.6*r)*a+(p(t.seed+7*s)-.5)*a*.2,f=(.1+.4*r)*Math.min(e,a)*t.scale*.5,m=12+Math.floor(12*r);i.fillStyle=n,i.globalAlpha=.4+.6*r,i.beginPath();for(let e=0;e<=m;e++){let a=e/m*Math.PI*2,l=f*(.7+.3*Math.abs(g(2*Math.cos(a)+s,2*Math.sin(a)+s,t.seed+50)))*(1+.2*t.randomness),r=d+Math.cos(a)*l,n=c+Math.sin(a)*l;if(0===e)i.moveTo(r,n);else{let o=(e-1)/m*Math.PI*2,h=f*(.7+.3*Math.abs(g(2*Math.cos(o)+s,2*Math.sin(o)+s,t.seed+50))),x=d+Math.cos((o+a)/2)*(h+l)*.5,b=c+Math.sin((o+a)/2)*(h+l)*.5;i.quadraticCurveTo(x,b,r,n)}}i.closePath(),i.fill(),i.globalAlpha=1}}else if("circles"===c){let l=e/2,s=a/2,r=1.5*Math.sqrt(l*l+s*s);for(let e=f-1;e>=0;e--){let a=e/f,n=Math.max(0,a*r*t.scale+g(3*a,t.seed,t.seed)*m*.15*r*t.randomness);i.fillStyle=y(o,e,f,t.isReversed),i.beginPath(),i.arc(l,s,n,0,2*Math.PI),i.fill()}}else if("geometric"===c){let l=t.layerCount||12,s=["rect","circle","triangle","polygon"];for(let r=0;r<l;r++){let n=r/l,d=y(o,r,l,t.isReversed),c=(.05+.3*n)*Math.min(e,a)*t.scale,f=(.6*p(t.seed+5*r)+.2)*e,m=(.6*p(t.seed+13*r)+.2)*a,h=s[Math.floor(p(t.seed+11*r)*s.length)];if(i.save(),i.translate(f,m),i.fillStyle=d,i.globalAlpha=.3+.7*n,"rect"===h){let e=c*(.5+.5*p(t.seed+3*r)),a=c*(.5+.5*p(t.seed+17*r)),l=.1*c*p(t.seed+23*r);i.beginPath(),i.roundRect(-e/2,-a/2,e,a,l),i.fill()}else if("circle"===h){let e=.4*c;i.beginPath(),i.arc(0,0,e,0,2*Math.PI),i.fill()}else if("triangle"===h)i.beginPath(),i.moveTo(0,-(.4*c)),i.lineTo(.4*c,.4*c),i.lineTo(-(.4*c),.4*c),i.closePath(),i.fill();else if("polygon"===h){let e=5+Math.floor(5*p(t.seed+31*r));i.beginPath();for(let a=0;a<e;a++){let l=a/e*Math.PI*2,s=.4*c*(.8+.2*p(t.seed+37*r+a));0===a?i.moveTo(Math.cos(l)*s,Math.sin(l)*s):i.lineTo(Math.cos(l)*s,Math.sin(l)*s)}i.closePath(),i.fill()}i.globalAlpha=1,i.restore()}}else if("gradient-mesh"===c){let l=t.layerCount||10;for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=(.8*p(t.seed+7*s)+.1)*e,c=(.8*p(t.seed+13*s)+.1)*a,f=(.1+.3*r)*Math.min(e,a)*t.scale,m=i.createRadialGradient(d,c,0,d,c,f);m.addColorStop(0,n),m.addColorStop(1,n+"00"),i.fillStyle=m,i.globalAlpha=.3+.7*r,i.beginPath(),i.arc(d,c,f,0,2*Math.PI),i.fill(),i.globalAlpha=1}}else if("liquid-mixed"===c){let l=t.layerCount||10;for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=(.1+.8*r)*e+(p(t.seed+7*s)-.5)*e*.15,c=(.1+.8*r)*a+(p(t.seed+13*s)-.5)*a*.15,f=(.05+.35*r)*Math.min(e,a)*t.scale,m=20+Math.floor(20*r);i.fillStyle=n,i.globalAlpha=.2+.6*r,i.beginPath();for(let e=0;e<=m;e++){let a=e/m*Math.PI*2,l=g(4*Math.cos(a)+3*s,4*Math.sin(a)+3*s,t.seed+100),r=g(6*Math.cos(a)+5*s,6*Math.sin(a)+5*s,t.seed+200),n=g(2*Math.cos(a)+s,2*Math.sin(a)+s,t.seed+50),o=f*(.5+.5*Math.abs(l+.3*r+.2*n))*(1+.15*t.randomness),h=d+Math.cos(a+.5*n)*o,x=c+Math.sin(a+.5*n)*o;0===e?i.moveTo(h,x):i.lineTo(h,x)}i.closePath(),i.fill(),i.globalAlpha=1}}else if("abstract-flow"===c){let l=t.layerCount||8;for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=r*a,c=(.1+.3*r)*a*.3*t.scale,f=1+4*r;i.strokeStyle=n,i.globalAlpha=.4+.6*r,i.lineWidth=2+12*r,i.beginPath();for(let a=0;a<=e;a+=2){let l=g(a/e*f,3*r,t.seed+10*s),n=d+Math.sin(a/e*f*Math.PI*2+t.seed)*c*.5+Math.cos(a/e*f*.7*Math.PI*2+.5*t.seed)*c*.3+l*c*.3*t.randomness;if(0===a)i.moveTo(a,n);else{let l=a-2,o=g(l/e*f,3*r,t.seed+10*s),m=d+Math.sin(l/e*f*Math.PI*2+t.seed)*c*.5+Math.cos(l/e*f*.7*Math.PI*2+.5*t.seed)*c*.3+o*c*.3*t.randomness,h=(l+a)/2,x=(m+n)/2+(p(t.seed+5*s+a)-.5)*c*.2;i.quadraticCurveTo(h,x,a,n)}}i.stroke(),i.globalAlpha=1}}else if("nebula"===c){let l=t.layerCount||12;for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=(.9*p(t.seed+11*s)+.05)*e,c=(.9*p(t.seed+17*s)+.05)*a,f=(.05+.4*r)*Math.min(e,a)*t.scale,m=i.createRadialGradient(d,c,0,d,c,f);m.addColorStop(0,n),m.addColorStop(1,n+"00"),i.fillStyle=m,i.globalAlpha=.1+.5*r,i.beginPath();for(let e=0;e<=24;e++){let a=e/24*Math.PI*2,l=f*(.7+.3*Math.abs(g(5*Math.cos(a)+2*s,5*Math.sin(a)+2*s,t.seed+300)+.2*g(8*Math.cos(a)+3*s,8*Math.sin(a)+3*s,t.seed+400)))*(1+.1*t.randomness),r=d+Math.cos(a)*l,n=c+Math.sin(a)*l;0===e?i.moveTo(r,n):i.lineTo(r,n)}i.closePath(),i.fill(),i.globalAlpha=1}}else if("crystal"===c){let l=t.layerCount||10;for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=(.03+.25*r)*Math.min(e,a)*t.scale,c=(.7*p(t.seed+5*s)+.15)*e,f=(.7*p(t.seed+13*s)+.15)*a,m=5+Math.floor(4*p(t.seed+19*s)),h=.3*p(t.seed+23*s);i.save(),i.translate(c,f),i.fillStyle=n,i.globalAlpha=.4+.6*r,i.beginPath();for(let e=0;e<m;e++){let a=e/m*Math.PI*2,t=d*(.8+.2*Math.sin(1.7*e+h)),l=Math.cos(a)*t*(1+.2*h),s=Math.sin(a)*t*(1-.2*h);0===e?i.moveTo(l,s):i.lineTo(l,s)}i.closePath(),i.fill(),i.globalAlpha=1,i.restore()}}else if("ripple"===c){let l=t.layerCount||8,s=e/2,r=a/2,n=.9*Math.min(e,a)*t.scale;for(let e=0;e<l;e++){let a=e/l,d=y(o,e,l,t.isReversed),c=Math.max(0,(.05+.9*a)*n+.05*Math.sin(10*a+t.seed)*n*t.randomness);i.strokeStyle=d,i.globalAlpha=.2+.8*a,i.lineWidth=1+8*a,i.beginPath();for(let a=0;a<=60;a++){let l=a/60*Math.PI*2,n=c*(1+.1*g(3*Math.cos(l)+e,3*Math.sin(l)+e,t.seed+500)*t.randomness),o=s+Math.cos(l)*n,d=r+Math.sin(l)*n;0===a?i.moveTo(o,d):i.lineTo(o,d)}i.closePath(),i.stroke(),i.globalAlpha=1}}else if("cosmic"===c){let l=t.layerCount||10,s=e/2,r=a/2;for(let n=0;n<l;n++){let d=n/l,c=y(o,n,l,t.isReversed),f=(.05+.45*d)*Math.min(e,a)*t.scale,m=5*d+.1*t.seed,h=m+2*Math.PI*(.5+.5*d);i.strokeStyle=c,i.globalAlpha=.1+.7*d,i.lineWidth=1+15*d,i.beginPath();for(let e=0;e<=40;e++){let a=e/40,l=m+(h-m)*a,o=f*(.3+.7*a)*(1+.2*g(2*Math.cos(l)+2*n,2*Math.sin(l)+2*n,t.seed+600)*t.randomness),d=s+Math.cos(l)*o,c=r+Math.sin(l)*o;0===e?i.moveTo(d,c):i.lineTo(d,c)}i.stroke(),i.globalAlpha=1}}else if("fluid-blob"===c){let l=t.layerCount||8;for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=(.1+.8*r)*e+(p(t.seed+5*s)-.5)*e*.2,c=(.1+.8*r)*a+(p(t.seed+13*s)-.5)*a*.2,f=(.1+.4*r)*Math.min(e,a)*t.scale,m=16+Math.floor(16*r);i.fillStyle=n,i.globalAlpha=.3+.7*r,i.beginPath();for(let e=0;e<=m;e++){let a=e/m*Math.PI*2,l=f*(.6+.4*Math.abs(g(3*Math.cos(a)+2*s,3*Math.sin(a)+2*s,t.seed+100)+.3*g(5*Math.cos(a)+3*s,5*Math.sin(a)+3*s,t.seed+200)))*(1+.1*t.randomness),r=d+Math.cos(a)*l,n=c+Math.sin(a)*l;if(0===e)i.moveTo(r,n);else{let a=(e-1)/m*Math.PI*2,l=f*(.6+.4*Math.abs(g(3*Math.cos(a)+2*s,3*Math.sin(a)+2*s,t.seed+100)+.3*g(5*Math.cos(a)+3*s,5*Math.sin(a)+3*s,t.seed+200)))*(1+.1*t.randomness),o=d+Math.cos(a)*l,h=c+Math.sin(a)*l,x=(o+r)/2+(p(t.seed+7*s+e)-.5)*f*.2,b=(h+n)/2+(p(t.seed+11*s+e)-.5)*f*.2;i.quadraticCurveTo(x,b,r,n)}}i.closePath(),i.fill(),i.globalAlpha=1}}else if("terrain-layers"===c)for(let l=0;l<f;l++){let s=l/f,r=y(o,l,f,t.isReversed),n=a*(.25+.6*s),d=a*(.06+(1-s)*.22)*t.scale,c=.6+1.2*s,m=1.8+2.4*s,h=1.3*l+t.seed;i.fillStyle=r,i.globalAlpha=.75+.25*s,i.beginPath(),i.moveTo(0,a),i.lineTo(0,n);for(let a=0;a<=e;a+=e/140){let s=g(a/e*m,h,t.seed+17*l),r=n-Math.sin(a/e*c*Math.PI*2+h)*d*.6-Math.cos(a/e*m*Math.PI*2+.7*h)*d*.25-s*d*.4*t.randomness;i.lineTo(a,r)}i.lineTo(e,a),i.closePath(),i.fill(),i.globalAlpha=1}else if("liquid-blend"===c){for(let l=0;l<f;l++){let s=l/f,r=y(o,l,f,t.isReversed),n=(.1+.8*p(t.seed+4*l))*e,d=(.12+.76*p(t.seed+9*l))*a,c=(.16+.3*s)*e*t.scale,m=c*(.55+.75*p(t.seed+13*l)),h=p(t.seed+21*l)*Math.PI,x=Math.max(c,m),b=i.createRadialGradient(n,d,0,n,d,x);b.addColorStop(0,r),b.addColorStop(.45,r+"CC"),b.addColorStop(.75,r+"55"),b.addColorStop(1,r+"00"),i.save(),i.translate(n,d),i.rotate(h),i.scale(1,m/c),i.globalAlpha=.35+.35*s,i.fillStyle=b,i.beginPath(),i.arc(0,0,c,0,2*Math.PI),i.fill(),i.restore()}i.globalAlpha=1}else if("plasma-flow"===c){let l=i.globalCompositeOperation;i.globalCompositeOperation="lighter";for(let l=0;l<f;l++){let s=l/f,r=y(o,l,f,t.isReversed),n=(.12+.76*p(t.seed+4*l))*e,d=(.12+.76*p(t.seed+9*l))*a,c=(.12+.4*s)*Math.min(e,a)*t.scale*(.6+.4*t.randomness),m=i.createRadialGradient(n,d,0,n,d,c);m.addColorStop(0,r),m.addColorStop(.5,r+"55"),m.addColorStop(1,r+"00"),i.fillStyle=m,i.globalAlpha=.22+.22*s,i.beginPath(),i.arc(n,d,c,0,2*Math.PI),i.fill()}i.globalAlpha=1,i.globalCompositeOperation=l}else if("mixed-fluid"===c){let l=Math.min(e,a)*(.018+.018*t.randomness),s=i.filter,r=i.globalCompositeOperation;i.globalCompositeOperation=t.isDark?"screen":"multiply",i.lineCap="round",i.lineJoin="round";for(let s=0;s<f;s++){let r=s/f,n=y(o,s,f,t.isReversed),d=Math.min(e,a)*(.018+.012*t.scale),c=(.05+(1-r)*.14)*Math.min(e,a)*(.5+.6*t.scale),m=p(t.seed+6*s)*e,h=p(t.seed+11*s)*a,x=p(t.seed+17*s)*Math.PI*2;i.filter=`blur(${l}px)`,i.strokeStyle=n,i.globalAlpha=.4+.3*r,i.lineWidth=c,i.beginPath(),i.moveTo(m,h);for(let l=0;l<70;l++)x+=(g(m/e*3,h/a*3,t.seed+40*s+.4*l)-.5)*.9*t.randomness,m+=Math.cos(x)*d,h+=Math.sin(x)*d,i.lineTo(m,h);i.stroke()}i.globalAlpha=1,i.filter=s,i.globalCompositeOperation=r}else if("sand-dunes"===c){let l=Math.max(3,Math.floor(.6*f));for(let s=0;s<l;s++){let r=s/l,n=y(o,s,l,t.isReversed),d=a*(.3+.6*r),c=a*(.05+(1-r)*.18)*t.scale,f=.35+.5*r,m=2.1*s+t.seed;i.fillStyle=n,i.globalAlpha=.8+.2*r,i.beginPath(),i.moveTo(0,a),i.lineTo(0,d);for(let a=0;a<=e;a+=e/120){let l=g(a/e*f*3,m,t.seed+31*s),r=d-Math.pow(.5*Math.sin(a/e*f*Math.PI*2+m)+.5,1.5)*c-l*c*.3*t.randomness;i.lineTo(a,r)}i.lineTo(e,a),i.closePath(),i.fill(),i.globalAlpha=1}}else if("aurora-veil"===c)for(let l=0;l<f;l++){let s=l/f,r=y(o,l,f,t.isReversed),n=(.08+.84*s)*e,d=e*(.06+.14*s)*t.scale,c=.7+1.3*s,m=.8*l+t.seed;i.strokeStyle=r,i.globalAlpha=.15+.35*s,i.lineWidth=e*(.015+(1-s)*.05)*(1+.5*t.randomness),i.lineCap="round",i.beginPath();for(let e=0;e<=a;e+=a/140){let s=g(m,e/a*c*1.3,t.seed+41*l),r=n+Math.sin(e/a*c*Math.PI*2+m)*d+s*d*.6*t.randomness;0===e?i.moveTo(r,e):i.lineTo(r,e)}i.stroke(),i.globalAlpha=1}i.restore();let u=document.createElement("canvas");u.width=l,u.height=s;let v=u.getContext("2d"),w=(e-l)/2,j=(a-s)/2;return v.drawImage(n,w,j,l,s,0,0,l,s),u}async function j(e,a){let t=await new Promise((a,t)=>{e.toBlob(e=>{e?a(e):t(Error("Canvas toBlob returned null"))},"image/png")});if(function(){if("u"<typeof navigator)return!1;let e=navigator.userAgent;return/iPad|iPhone|iPod/.test(e)||e.includes("Macintosh")&&navigator.maxTouchPoints>1}()){let e=new File([t],a,{type:"image/png"});if("u">typeof navigator&&navigator.canShare&&navigator.canShare({files:[e]}))try{await navigator.share({files:[e]});return}catch(e){if(e?.name==="AbortError")return;console.warn("navigator.share failed, falling back:",e)}let l=URL.createObjectURL(t);window.open(l,"_blank"),setTimeout(()=>URL.revokeObjectURL(l),3e4);return}let l=URL.createObjectURL(t),s=document.createElement("a");s.href=l,s.download=a,document.body.appendChild(s),s.click(),document.body.removeChild(s),setTimeout(()=>URL.revokeObjectURL(l),1e3)}let M=["stripes","layered-waves","mountains","organic","circles","layered-arches","gradient-mesh","nebula","fluid-blob","terrain-layers","liquid-blend","plasma-flow","mixed-fluid","sand-dunes","aurora-veil"];function k({value:e,palette:l,onChange:s}){let r=(0,t.useRef)({});return(0,t.useEffect)(()=>{M.forEach(e=>{(async()=>{let a=r.current[e];if(!a)return;let t=await w(120,120,{pattern:e,palette:l,isDark:!1,isReversed:!1,seed:42,layerCount:12,randomness:1,scale:1,rotation:0,heightAdjustment:.6}),s=a.getContext("2d");s&&(s.clearRect(0,0,120,120),s.drawImage(t,0,0))})()})},[l]),(0,a.jsx)("div",{className:"grid grid-cols-5 gap-1.5 sm:gap-2",children:M.map(t=>(0,a.jsxs)("button",{onClick:()=>s(t),className:`relative rounded-md overflow-hidden border-2 transition-all aspect-square ${e===t?"border-black dark:border-white shadow-md":"border-gray-400 dark:border-black hover:border-gray-400 dark:hover:border-gray-600"}`,title:b[t],children:[(0,a.jsx)("canvas",{ref:e=>{e&&(r.current[t]=e)},width:120,height:120,className:"w-full h-full",style:{display:"block"}}),(0,a.jsx)("div",{className:"absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"})]},t))})}let N={monochrome:{name:"Monochrome",colors:["#000000","#2a2a2a","#555555","#888888","#bbbbbb","#e8e8e8","#ffffff"]},sunset:{name:"Sunset",colors:["#4a0e4e","#8b3a62","#c74a64","#e87d5c","#f5a563","#f5d895","#fffbe6"]},emerald:{name:"Emerald",colors:["#000000","#1a4d2e","#2d7a4f","#4a9d6f","#7ec176","#b8e8c5","#e8f7f0"]},violet:{name:"Violet",colors:["#2d0a5c","#5c1a9e","#8b3acd","#c76aff","#d68fff","#e8b3ff","#f5e6ff"]},ocean:{name:"Ocean",colors:["#001f3f","#003d7a","#0066b3","#0088cc","#3399dd","#66ccff","#ccf0ff"]},retro:{name:"Retro",colors:["#8b3a3a","#d63b3b","#ff6b6b","#ffaa5c","#ffd93d","#f5ff8d","#ffffff"]},aurora:{name:"Aurora",colors:["#0a0e27","#1a3a52","#2d5a7b","#4a85b2","#7bb4d9","#afd6f0","#e8f3ff"]},forest:{name:"Forest",colors:["#0d1b0f","#1b3d24","#2d5a3d","#4a7d5c","#6ba87c","#9bd9a8","#c5f0d0"]},berry:{name:"Berry",colors:["#2a0845","#5a1b7d","#8b2fb3","#c74aff","#e580ff","#f0b3ff","#f5e6ff"]},peach:{name:"Peach",colors:["#5c2a1a","#8b4a32","#b85c3d","#e8845c","#f5a57d","#f5c9a8","#fff0e6"]},mint:{name:"Mint",colors:["#0d3d2d","#1a5c4a","#2d8570","#4aae99","#7ddcc9","#b3f0e6","#dfffff"]},lavender:{name:"Lavender",colors:["#2d1b5c","#5c3a8b","#8b5acd","#b88aff","#d9b3ff","#ecd9ff","#f5f0ff"]},coral:{name:"Coral",colors:["#4a1a1a","#8b3232","#c75050","#ff7070","#ff9999","#ffb8b8","#ffe6e6"]},slate:{name:"Slate",colors:["#1a1f2e","#2d3f52","#4a5f7a","#6a7f9e","#8fa3b8","#b8d0e6","#dfe8f2"]},midnight:{name:"Midnight",colors:["#050a15","#0d1b3d","#1a2d5c","#2d4a7d","#4a7db8","#7db8e8","#e8f0ff"]},terra:{name:"Terra",colors:["#1a0f0a","#3d2a1a","#5c3d2d","#7d5a4a","#b88a7d","#e8c9b8","#fff5e8"]},neon:{name:"Neon",colors:["#0a0a0a","#1a0a2d","#2d0a5c","#4a0a8b","#7d3acd","#b88aff","#f5e6ff"]},autumn:{name:"Autumn",colors:["#3d1a0a","#7d3a1a","#b85c2d","#e8844a","#f5a56b","#f5d08d","#fff5e6"]},arctic:{name:"Arctic",colors:["#0a1a2a","#1a3d5c","#2d6a8b","#4a9db8","#7dd0e8","#b8e8f5","#e6f5ff"]},desert:{name:"Desert",colors:["#2a1a0a","#5c3d1a","#8b5c2d","#b8844a","#e8b87d","#f5d9b8","#fff5e6"]}},C=["monochrome","sunset","ocean","retro","aurora","forest","berry","peach","emerald","neon","lavender","coral","slate","midnight","terra","autumn","arctic","desert","violet","mint"];function P({value:e,onChange:t}){return(0,a.jsx)("div",{className:"grid grid-cols-5 gap-1.5 sm:gap-2",children:C.map(l=>{let{colors:s,name:r}=N[l];return(0,a.jsx)("button",{onClick:()=>t(l),className:`relative rounded-md overflow-hidden border-2 transition-all h-8 sm:h-10 ${e===l?"border-black dark:border-white shadow-md":"border-gray-300 dark:border-black hover:border-gray-400 dark:hover:border-gray-600"}`,title:r,children:(0,a.jsx)("div",{className:"flex h-full",children:s.map((e,t)=>(0,a.jsx)("div",{className:"flex-1",style:{backgroundColor:e}},t))})},l)})})}function R({config:e}){let l=(0,t.useRef)(null),s=(0,t.useRef)(null),[r,n]=(0,t.useState)(""),[i,o]=(0,t.useState)(""),[d,c]=(0,t.useState)(!1);(0,t.useEffect)(()=>{let e=()=>{c(document.documentElement.classList.contains("dark"))};e();let a=new MutationObserver(e);return a.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),()=>a.disconnect()},[]),(0,t.useEffect)(()=>{let e=()=>{let e=new Date,a=String(e.getHours()).padStart(2,"0"),t=String(e.getMinutes()).padStart(2,"0");n(`${a}:${t}`),o(new Intl.DateTimeFormat("en-US",{weekday:"long",day:"numeric",month:"long"}).format(e))};e();let a=setInterval(e,1e3);return()=>clearInterval(a)},[]),(0,t.useEffect)(()=>{(async()=>{if(!l.current)return;let a=await w(1600,900,e),t=l.current.getContext("2d");t&&(t.clearRect(0,0,1600,900),t.drawImage(a,0,0))})()},[e]),(0,t.useEffect)(()=>{(async()=>{if(!s.current)return;let a=await w(1600,900,e),t=9/19.5*900,l=document.createElement("canvas");l.width=430,l.height=930;let r=l.getContext("2d");if(!r)return;let n=x[e.palette];r.fillStyle=e.isReversed?n[0]:n[n.length-1],r.fillRect(0,0,430,930),r.drawImage(a,(1600-t)/2,0,t,900,0,0,430,930);let i=s.current.getContext("2d");i&&(i.clearRect(0,0,430,930),i.drawImage(l,0,0))})()},[e]);let f="border-black",m=d?"bg-gray-10":"bg-black",h=d?"shadow-white/5":"shadow-xl";return(0,a.jsxs)("div",{className:`
        w-full
        flex
        flex-row
        items-center
        justify-center

        gap-2
        sm:gap-3
        md:gap-4
        lg:gap-6
        xl:gap-8
        2xl:gap-10
      `,children:[(0,a.jsxs)("div",{className:"relative flex-shrink-0",children:[(0,a.jsxs)("div",{className:`
            relative

            h-[120px]
            sm:h-[160px]
            md:h-[200px]
            lg:h-[220px]
            xl:h-[260px]
            2xl:h-[320px]

            border
            sm:border-2
            md:border-3
            lg:border-4
            xl:border-5

            ${f}
            rounded-lg
            sm:rounded-xl
            lg:rounded-2xl

            overflow-hidden
            shadow-lg
            ${h}
            ${m}
          `,style:{aspectRatio:"16/9"},children:[(0,a.jsx)("canvas",{ref:l,width:1600,height:900,className:"w-full h-full",style:{display:"block"}}),(0,a.jsx)("div",{className:`
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              z-10

              w-[14%]
              sm:w-[18%]
              md:w-[20%]
              lg:w-[20%]

              h-[4px]
              sm:h-[7px]
              md:h-[9px]
              lg:h-[11px]
              xl:h-[14px]

              rounded-b-md
              sm:rounded-b-sm

              bg-black
              pointer-events-none
            `}),(0,a.jsx)("div",{className:`
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              pointer-events-none

              -translate-y-6
              sm:-translate-y-10
              md:-translate-y-14
              lg:-translate-y-14
              xl:-translate-y-18
            `,children:(0,a.jsxs)("div",{className:"text-white text-center",children:[(0,a.jsx)("p",{className:`
                  text-[5px]
                  sm:text-[6px]
                  md:text-[8px]
                  lg:text-[9px]
                  xl:text-[10px]
                  2xl:text-xs
                  mb-[-1px]
                  sm:mb-[-2px]
                  md:mb-[-2.5]
                  opacity-70
                `,children:i}),(0,a.jsx)("p",{className:`
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  lg:text-4xl
                  xl:text-5xl
                  2xl:text-6xl

                  font-light
                  tracking-tight
                `,children:r})]})})]}),(0,a.jsx)("p",{className:`
            text-center
            text-gray-500
            dark:text-gray-400

            text-[7px]
            sm:text-[8px]
            md:text-[9px]
            lg:text-[10px]

            uppercase
            tracking-widest

            mt-1
            sm:mt-1.5
            lg:mt-2
          `,children:"Desktop"})]}),(0,a.jsxs)("div",{className:"relative flex-shrink-0",children:[(0,a.jsxs)("div",{className:`
            relative

            h-[120px]
            sm:h-[160px]
            md:h-[200px]
            lg:h-[220px]
            xl:h-[260px]
            2xl:h-[320px]

            border
            sm:border-2
            md:border-3
            lg:border-4
            xl:border-5

            ${f}
            rounded-lg
            sm:rounded-xl
            lg:rounded-2xl

            overflow-hidden
            shadow-lg
            ${h}
            ${m}
          `,style:{aspectRatio:"9/19.5"},children:[(0,a.jsx)("canvas",{ref:s,width:430,height:930,className:"w-full h-full",style:{display:"block"}}),(0,a.jsx)("div",{className:`
              absolute
              left-1/2
              -translate-x-1/2
              z-10

              top-[2%]
              sm:top-[2%]
              md:top-[2%]
              lg:top-[2%]
              xl:top-[2%]

              w-[25%]
              sm:w-[28%]
              md:w-[30%]
              lg:w-[32%]
              xl:w-[30%]

              h-[5px]
              sm:h-[7px]
              md:h-[9px]
              lg:h-[11px]
              xl:h-[13px]
              2xl:h-[15px]

              rounded-full

              bg-black
              pointer-events-none
            `}),(0,a.jsx)("div",{className:`
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              pointer-events-none

              -translate-y-8
              sm:-translate-y-10
              md:-translate-y-14
              lg:-translate-y-14
              xl:-translate-y-18
            `,children:(0,a.jsxs)("div",{className:"text-white text-center",children:[(0,a.jsx)("p",{className:`
                  text-[3px]
                  sm:text-[4px]
                  md:text-[5px]
                  lg:text-[6px]
                  xl:text-[7px]
                  2xl:text-[8px]

                  opacity-60
                  mb-[-1px]
                  sm:mb-[-1.5px]
                  md:mb-[-2px]
                  lg:mb-[-3px]
                  xl:mb-[-3.5px]
                `,children:i}),(0,a.jsx)("p",{className:`
                  text-xs
                  sm:text-sm
                  md:text-base
                  lg:text-xl
                  xl:text-2xl
                  2xl:text-3xl

                  font-light
                  tracking-tight
                `,children:r})]})})]}),(0,a.jsx)("p",{className:`
            text-center
            text-gray-500
            dark:text-gray-400

            text-[7px]
            sm:text-[8px]
            md:text-[9px]
            lg:text-[10px]

            uppercase
            tracking-widest

            mt-1
            sm:mt-1.5
            lg:mt-2
          `,children:"Phone"})]})]})}e.s(["default",0,function(){let[e,l]=(0,t.useState)({pattern:"stripes",palette:"monochrome",isDark:!1,isReversed:!1,seed:1e4*Math.random(),layerCount:12,randomness:1,scale:1,rotation:0,heightAdjustment:.6}),[s,r]=(0,t.useState)("light"),[n,i]=(0,t.useState)(!1);(0,t.useEffect)(()=>{let e=document.documentElement;"dark"===s?e.classList.add("dark"):e.classList.remove("dark")},[s]);let o=e=>{l(a=>({...a,pattern:e}))},x=e=>{l(a=>({...a,palette:e}))},b=e=>{l(a=>({...a,isReversed:e}))},p=()=>{l(e=>({...e,seed:1e4*Math.random()}))},u=e=>{l(a=>({...a,layerCount:Math.max(4,Math.min(30,e))}))},g=e=>{l(a=>({...a,randomness:Math.max(0,Math.min(1.5,e))}))},v=e=>{l(a=>({...a,scale:Math.max(.5,Math.min(2,e))}))},y=e=>{l(a=>({...a,rotation:e%360}))},M=async a=>{i(!0);try{let t=await w("desktop"===a?3840:1290,2160,e);await j(t,"desktop"===a?"StratumXY-desktop-4k.png":"StratumXY-mobile.png")}catch(e){console.error("Download failed:",e)}finally{i(!1)}},N="dark"===s?"bg-[#1a1a1e] text-[#e8e8ea]":"bg-white text-gray-900",C="dark"===s?"border-[#2a2a30]":"border-gray-200",$="dark"===s?"bg-[#121215]":"bg-gray-50",S="dark"===s?"hover:bg-[#2a2a30]":"hover:bg-gray-50",T="dark"===s?"text-[#8888aa]":"text-gray-500";return(0,a.jsxs)("main",{className:`min-h-screen flex flex-col ${N} transition-colors duration-300`,children:[(0,a.jsx)("header",{className:`border-b ${C} ${N} px-3 sm:px-8 py-3 sm:py-6`,children:(0,a.jsxs)("div",{className:"relative flex items-center justify-between max-w-full",children:[(0,a.jsxs)("div",{className:"hidden lg:flex items-center gap-2 sm:gap-3",children:[(0,a.jsx)("div",{className:`${"dark"===s?"bg-white text-black":"bg-black text-white"} px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold`,children:"STRXY"}),(0,a.jsx)("h1",{className:"text-xl sm:text-3xl font-bold tracking-tight",children:"StratumXY"})]}),(0,a.jsx)("div",{className:"lg:hidden flex items-center",children:(0,a.jsx)("div",{className:`${"dark"===s?"bg-white text-black":"bg-black text-white"} px-2 py-1 rounded-lg text-xs font-semibold`,children:"STRXY"})}),(0,a.jsx)("div",{className:"hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2",children:(0,a.jsx)("p",{className:"text-2xs text-gray-500 dark:text-gray-400 font-light tracking-wider whitespace-nowrap",children:"Create your own wallpaper"})}),(0,a.jsx)("div",{className:"lg:hidden flex items-center justify-center absolute left-1/2 transform -translate-x-1/2",children:(0,a.jsx)("h1",{className:"text-xl font-bold tracking-tight",children:"StratumXY"})}),(0,a.jsxs)("div",{className:"flex items-center gap-1 sm:gap-2",children:[(0,a.jsx)("button",{onClick:()=>{r(e=>"light"===e?"dark":"light")},className:`p-1.5 sm:p-2 rounded-lg transition-colors ${S}`,"aria-label":"Toggle Theme",children:"light"===s?(0,a.jsx)(h,{className:`w-4 h-4 sm:w-5 sm:h-5 ${T}`}):(0,a.jsx)(m,{className:`w-4 h-4 sm:w-5 sm:h-5 ${T}`})}),(0,a.jsx)("button",{className:`p-1.5 sm:p-2 rounded-lg transition-colors ${S}`,"aria-label":"Settings",children:(0,a.jsx)(d,{className:`w-4 h-4 sm:w-5 sm:h-5 ${T}`})})]})]})}),(0,a.jsxs)("div",{className:"flex flex-1 flex-col lg:flex-row min-h-0 gap-0 lg:gap-0 xl:gap-0 2xl:gap-0",children:[(0,a.jsxs)("div",{className:`hidden lg:block lg:w-56 xl:w-64 2xl:w-72 border-r ${C} ${N} p-3 xl:p-4 2xl:p-6 overflow-y-auto flex-shrink-0`,children:[(0,a.jsxs)("div",{className:"mb-4 xl:mb-6",children:[(0,a.jsx)("h3",{className:`text-[10px] xl:text-xs font-semibold uppercase tracking-widest ${T} mb-2 xl:mb-3`,children:"Patterns"}),(0,a.jsx)(k,{value:e.pattern,palette:e.palette,onChange:o})]}),(0,a.jsxs)("div",{className:"mb-4 xl:mb-6",children:[(0,a.jsx)("h3",{className:`text-[10px] xl:text-xs font-semibold uppercase tracking-widest ${T} mb-2 xl:mb-3`,children:"Palettes"}),(0,a.jsx)(P,{value:e.palette,onChange:x})]}),(0,a.jsxs)("div",{className:"mb-4 xl:mb-6",children:[(0,a.jsx)("h3",{className:`text-[10px] xl:text-xs font-semibold uppercase tracking-widest ${T} mb-2 xl:mb-3`,children:"Depth"}),(0,a.jsx)("button",{onClick:()=>b(!e.isReversed),className:`w-full px-3 xl:px-4 py-1.5 xl:py-2.5 rounded-lg transition-colors text-xs xl:text-sm font-medium border ${e.isReversed?`${"dark"===s?"bg-[#2a2a30] border-[#3a3a44]":"bg-gray-100 border-gray-300"}`:`border-gray-300 ${S}`}`,children:e.isReversed?"⟲ Reversed":"Normal"})]})]}),(0,a.jsxs)("div",{className:"lg:hidden order-2 px-3 py-3 space-y-4 bg-inherit",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:`text-xs font-semibold uppercase tracking-widest ${T} mb-2`,children:"Patterns"}),(0,a.jsx)(k,{value:e.pattern,palette:e.palette,onChange:o})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:`text-xs font-semibold uppercase tracking-widest ${T} mb-2`,children:"Advanced"}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-3",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:`text-xs font-medium ${T}`,children:["Layers: ",e.layerCount]}),(0,a.jsx)("input",{type:"range",min:"4",max:"30",value:e.layerCount,onChange:e=>u(parseInt(e.target.value)),className:"slider-input w-full"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:`text-xs font-medium ${T}`,children:["Random: ",e.randomness.toFixed(2)]}),(0,a.jsx)("input",{type:"range",min:"0",max:"1.5",step:"0.05",value:e.randomness,onChange:e=>g(parseFloat(e.target.value)),className:"slider-input w-full"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:`text-xs font-medium ${T}`,children:["Scale: ",e.scale.toFixed(2)]}),(0,a.jsx)("input",{type:"range",min:"0.5",max:"2",step:"0.05",value:e.scale,onChange:e=>v(parseFloat(e.target.value)),className:"slider-input w-full"})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:`text-xs font-medium ${T}`,children:["Rotate: ",e.rotation,"°"]}),(0,a.jsx)("input",{type:"range",min:"0",max:"360",step:"1",value:e.rotation,onChange:e=>y(parseFloat(e.target.value)),className:"slider-input w-full"})]})]}),(0,a.jsxs)("button",{onClick:p,className:`w-full flex items-center justify-center gap-2 mt-3 px-4 py-2.5 border ${C} rounded-lg transition-colors text-sm font-medium ${S}`,children:[(0,a.jsx)(f,{className:"w-4 h-4"}),"Generate New"]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:`text-xs font-semibold uppercase tracking-widest ${T} mb-2`,children:"Palettes"}),(0,a.jsx)(P,{value:e.palette,onChange:x})]}),(0,a.jsx)("button",{onClick:()=>b(!e.isReversed),className:`w-full px-4 py-2 rounded-lg transition-colors text-sm font-medium border ${e.isReversed?`${"dark"===s?"bg-[#2a2a30] border-[#3a3a44]":"bg-gray-100 border-gray-300"}`:`border-gray-300 ${S}`}`,children:e.isReversed?"⟲ Reversed":"Normal"}),(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)("button",{onClick:p,className:`flex-1 flex items-center justify-center gap-1 px-3 py-2 border ${C} rounded-lg transition-colors text-xs font-medium ${S}`,children:[(0,a.jsx)(f,{className:"w-3 h-3"}),"New"]}),(0,a.jsxs)("button",{onClick:()=>M("desktop"),disabled:n,className:`flex-1 flex items-center justify-center gap-1 px-3 py-2 ${"dark"===s?"bg-white text-black hover:bg-gray-200":"bg-black text-white hover:bg-gray-800"} rounded-lg transition-colors text-xs font-medium disabled:opacity-50`,children:[(0,a.jsx)(c,{className:"w-3 h-3"}),"Desktop"]}),(0,a.jsxs)("button",{onClick:()=>M("mobile"),disabled:n,className:`flex-1 flex items-center justify-center gap-1 px-3 py-2 border ${C} rounded-lg transition-colors text-xs font-medium ${S} disabled:opacity-50`,children:[(0,a.jsx)(c,{className:"w-3 h-3"}),"Phone"]})]})]}),(0,a.jsx)("div",{className:`flex-1 flex flex-col items-center justify-start gap-4 sm:gap-8 pt-6 sm:pt-10 lg:pt-14 pb-2 sm:pb-4 lg:pb-6 ${$} order-1 lg:order-2 min-w-0`,children:(0,a.jsx)("div",{className:"w-full max-w-full flex items-center justify-center",children:(0,a.jsx)(R,{config:e})})}),(0,a.jsxs)("div",{className:`hidden lg:block lg:w-56 xl:w-64 2xl:w-72 border-l ${C} ${N} p-3 xl:p-4 2xl:p-6 overflow-y-auto order-3 flex-shrink-0`,children:[(0,a.jsxs)("div",{className:"mb-4 xl:mb-6",children:[(0,a.jsx)("h3",{className:`text-[10px] xl:text-xs font-semibold uppercase tracking-widest ${T} mb-3 xl:mb-4`,children:"Advanced"}),(0,a.jsxs)("div",{className:"mb-3 xl:mb-4",children:[(0,a.jsx)("div",{className:"flex items-center justify-between mb-1.5 xl:mb-2",children:(0,a.jsxs)("label",{className:`text-[10px] xl:text-xs font-medium ${T}`,children:["Layers: ",e.layerCount]})}),(0,a.jsx)("input",{type:"range",min:"4",max:"30",value:e.layerCount,onChange:e=>u(parseInt(e.target.value)),className:"slider-input w-full"})]}),(0,a.jsxs)("div",{className:"mb-3 xl:mb-4",children:[(0,a.jsx)("div",{className:"flex items-center justify-between mb-1.5 xl:mb-2",children:(0,a.jsxs)("label",{className:`text-[10px] xl:text-xs font-medium ${T}`,children:["Randomness: ",e.randomness.toFixed(2)]})}),(0,a.jsx)("input",{type:"range",min:"0",max:"1.5",step:"0.05",value:e.randomness,onChange:e=>g(parseFloat(e.target.value)),className:"slider-input w-full"})]}),(0,a.jsxs)("div",{className:"mb-3 xl:mb-4",children:[(0,a.jsx)("div",{className:"flex items-center justify-between mb-1.5 xl:mb-2",children:(0,a.jsxs)("label",{className:`text-[10px] xl:text-xs font-medium ${T}`,children:["Scale: ",e.scale.toFixed(2)]})}),(0,a.jsx)("input",{type:"range",min:"0.5",max:"2",step:"0.05",value:e.scale,onChange:e=>v(parseFloat(e.target.value)),className:"slider-input w-full"})]}),(0,a.jsxs)("div",{className:"mb-3 xl:mb-4",children:[(0,a.jsx)("div",{className:"flex items-center justify-between mb-1.5 xl:mb-2",children:(0,a.jsxs)("label",{className:`text-[10px] xl:text-xs font-medium ${T}`,children:["Rotation: ",e.rotation,"°"]})}),(0,a.jsx)("input",{type:"range",min:"0",max:"360",step:"1",value:e.rotation,onChange:e=>y(parseFloat(e.target.value)),className:"slider-input w-full"})]})]}),(0,a.jsxs)("div",{className:"mb-4 xl:mb-6",children:[(0,a.jsx)("h3",{className:`text-[10px] xl:text-xs font-semibold uppercase tracking-widest ${T} mb-2 xl:mb-3`,children:"Variation"}),(0,a.jsxs)("button",{onClick:p,className:`w-full flex items-center justify-center gap-2 px-3 xl:px-4 py-1.5 xl:py-2.5 border ${C} rounded-lg transition-colors text-xs xl:text-sm font-medium ${S}`,children:[(0,a.jsx)(f,{className:"w-3 h-3 xl:w-4 xl:h-4"}),"Generate New"]})]}),(0,a.jsxs)("div",{className:"space-y-1.5 xl:space-y-2",children:[(0,a.jsxs)("button",{onClick:()=>M("desktop"),disabled:n,className:`w-full flex items-center justify-center gap-2 px-3 xl:px-4 py-1.5 xl:py-2.5 ${"dark"===s?"bg-white text-black hover:bg-gray-200":"bg-black text-white hover:bg-gray-800"} rounded-lg transition-colors text-xs xl:text-sm font-medium disabled:opacity-50`,children:[(0,a.jsx)(c,{className:"w-3 h-3 xl:w-4 xl:h-4"}),"Download Desktop"]}),(0,a.jsx)("div",{className:`text-center text-[9px] xl:text-xs ${T}`,children:"3840 × 2160 px"}),(0,a.jsxs)("button",{onClick:()=>M("mobile"),disabled:n,className:`w-full flex items-center justify-center gap-2 px-3 xl:px-4 py-1.5 xl:py-2.5 border ${C} rounded-lg transition-colors text-xs xl:text-sm font-medium ${S} disabled:opacity-50`,children:[(0,a.jsx)(c,{className:"w-3 h-3 xl:w-4 xl:h-4"}),"Download Phone"]}),(0,a.jsx)("div",{className:`text-center text-[9px] xl:text-xs ${T}`,children:"1290 × 2160 px"})]})]})]}),(0,a.jsx)("footer",{className:`border-t ${C} px-4 sm:px-8 py-4 sm:py-6`,children:(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("span",{className:"font-semibold text-gray-900 dark:text-white",children:"StratumXY"}),(0,a.jsxs)("span",{children:["© ",new Date().getFullYear()]})]}),(0,a.jsx)("div",{className:"flex items-center gap-1",children:(0,a.jsx)("span",{children:"Developed by Shavindu Rajapaksha"})})]})})]})}],31713)}]);