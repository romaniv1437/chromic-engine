const ey="162",ty="",ki="srgb",ur="srgb-linear",ls="display-p3",Yn="display-p3-linear",Zn="linear",ht="srgb",Kn="rec709",iy="p3",ec="300 es";class la{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const a=i.indexOf(t);a!==-1&&i.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const i=t.slice(0);for(let a=0,n=i.length;a<n;a++)i[a].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tc=1234567;const cn=Math.PI/180,un=180/Math.PI;function ca(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[r&255]+zt[r>>8&255]+zt[r>>16&255]+zt[r>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Wt(r,e,t){return Math.max(e,Math.min(t,r))}function cs(r,e){return(r%e+e)%e}function md(r,e,t,i,a){return i+(r-e)*(a-i)/(t-e)}function gd(r,e,t){return r!==e?(t-r)/(e-r):0}function hn(r,e,t){return(1-t)*r+t*e}function vd(r,e,t,i){return hn(r,e,1-Math.exp(-t*i))}function _d(r,e=1){return e-Math.abs(cs(r,e*2)-e)}function xd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function yd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function bd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Sd(r,e){return r+Math.random()*(e-r)}function Md(r){return r*(.5-Math.random())}function wd(r){r!==void 0&&(tc=r);let e=tc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Td(r){return r*cn}function Ed(r){return r*un}function us(r){return(r&r-1)===0&&r!==0}function Ad(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function $n(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Rd(r,e,t,i,a){const n=Math.cos,s=Math.sin,o=n(t/2),l=s(t/2),c=n((e+i)/2),u=s((e+i)/2),h=n((e-i)/2),d=s((e-i)/2),f=n((i-e)/2),g=s((i-e)/2);switch(a){case"XYX":r.set(o*u,l*h,l*d,o*c);break;case"YZY":r.set(l*d,o*u,l*h,o*c);break;case"ZXZ":r.set(l*h,l*d,o*u,o*c);break;case"XZX":r.set(o*u,l*g,l*f,o*c);break;case"YXY":r.set(l*f,o*u,l*g,o*c);break;case"ZYZ":r.set(l*g,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function ua(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Xt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Si={DEG2RAD:cn,RAD2DEG:un,generateUUID:ca,clamp:Wt,euclideanModulo:cs,mapLinear:md,inverseLerp:gd,lerp:hn,damp:vd,pingpong:_d,smoothstep:xd,smootherstep:yd,randInt:bd,randFloat:Sd,randFloatSpread:Md,seededRandom:wd,degToRad:Td,radToDeg:Ed,isPowerOfTwo:us,ceilPowerOfTwo:Ad,floorPowerOfTwo:$n,setQuaternionFromProperEuler:Rd,normalize:Xt,denormalize:ua};class Ue{constructor(e=0,t=0){Ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6],this.y=a[1]*t+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),a=Math.sin(t),n=this.x-e.x,s=this.y-e.y;return this.x=n*i-s*a+e.x,this.y=n*a+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,i,a,n,s,o,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,a,n,s,o,l,c)}set(e,t,i,a,n,s,o,l,c){const u=this.elements;return u[0]=e,u[1]=a,u[2]=o,u[3]=t,u[4]=n,u[5]=l,u[6]=i,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,n=this.elements,s=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],g=i[8],_=a[0],m=a[3],p=a[6],x=a[1],v=a[4],b=a[7],w=a[2],T=a[5],M=a[8];return n[0]=s*_+o*x+l*w,n[3]=s*m+o*v+l*T,n[6]=s*p+o*b+l*M,n[1]=c*_+u*x+h*w,n[4]=c*m+u*v+h*T,n[7]=c*p+u*b+h*M,n[2]=d*_+f*x+g*w,n[5]=d*m+f*v+g*T,n[8]=d*p+f*b+g*M,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],a=e[2],n=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*s*u-t*o*c-i*n*u+i*o*l+a*n*c-a*s*l}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],n=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*s-o*c,d=o*l-u*n,f=c*n-s*l,g=t*h+i*d+a*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(a*c-u*i)*_,e[2]=(o*i-a*s)*_,e[3]=d*_,e[4]=(u*t-a*l)*_,e[5]=(a*n-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(s*t-i*n)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,a,n,s,o){const l=Math.cos(n),c=Math.sin(n);return this.set(i*l,i*c,-i*(l*s+c*o)+s+e,-a*c,a*l,-a*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(hs.makeScale(e,t)),this}rotate(e){return this.premultiply(hs.makeRotation(-e)),this}translate(e,t){return this.premultiply(hs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<9;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const hs=new Qe;function ic(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function dn(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Cd(){const r=dn("canvas");return r.style.display="block",r}const rc={};function Dd(r){r in rc||(rc[r]=!0,console.warn(r))}const ac=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nc=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qn={[ur]:{transfer:Zn,primaries:Kn,toReference:r=>r,fromReference:r=>r},[ki]:{transfer:ht,primaries:Kn,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Yn]:{transfer:Zn,primaries:"p3",toReference:r=>r.applyMatrix3(nc),fromReference:r=>r.applyMatrix3(ac)},[ls]:{transfer:ht,primaries:"p3",toReference:r=>r.convertSRGBToLinear().applyMatrix3(nc),fromReference:r=>r.applyMatrix3(ac).convertLinearToSRGB()}},Pd=new Set([ur,Yn]),at={enabled:!0,_workingColorSpace:ur,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Pd.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const i=Qn[e].toReference,a=Qn[t].fromReference;return a(i(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return Qn[r].primaries},getTransfer:function(r){return r===""?Zn:Qn[r].transfer}};function ha(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ds(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let da;class oc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{da===void 0&&(da=dn("canvas")),da.width=e.width,da.height=e.height;const i=da.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=da}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=dn("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),n=a.data;for(let s=0;s<n.length;s++)n[s]=ha(n[s]/255)*255;return i.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ha(t[i]/255)*255):t[i]=ha(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ud=0;class sc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=ca(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let n;if(Array.isArray(a)){n=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?n.push(fs(a[s].image)):n.push(fs(a[s]))}else n=fs(a);i.url=n}return t||(e.images[this.uuid]=i),i}}function fs(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?oc.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ld=0;class Ot extends la{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=1001,a=1001,n=1006,s=1008,o=1023,l=1009,c=Ot.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=ca(),this.name="",this.source=new sc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=n,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Ot.DEFAULT_IMAGE=null,Ot.DEFAULT_MAPPING=300,Ot.DEFAULT_ANISOTROPY=1;class Rt{constructor(e=0,t=0,i=0,a=1){Rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,a){return this.x=e,this.y=t,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,n=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*a+s[12]*n,this.y=s[1]*t+s[5]*i+s[9]*a+s[13]*n,this.z=s[2]*t+s[6]*i+s[10]*a+s[14]*n,this.w=s[3]*t+s[7]*i+s[11]*a+s[15]*n,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,a,n;const s=e.elements,o=s[0],l=s[4],c=s[8],u=s[1],h=s[5],d=s[9],f=s[2],g=s[6],_=s[10];if(Math.abs(l-u)<.01&&Math.abs(c-f)<.01&&Math.abs(d-g)<.01){if(Math.abs(l+u)<.1&&Math.abs(c+f)<.1&&Math.abs(d+g)<.1&&Math.abs(o+h+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const p=(o+1)/2,x=(h+1)/2,v=(_+1)/2,b=(l+u)/4,w=(c+f)/4,T=(d+g)/4;return p>x&&p>v?p<.01?(i=0,a=.707106781,n=.707106781):(i=Math.sqrt(p),a=b/i,n=w/i):x>v?x<.01?(i=.707106781,a=0,n=.707106781):(a=Math.sqrt(x),i=b/a,n=T/a):v<.01?(i=.707106781,a=.707106781,n=0):(n=Math.sqrt(v),i=w/n,a=T/n),this.set(i,a,n,t),this}let m=Math.sqrt((g-d)*(g-d)+(c-f)*(c-f)+(u-l)*(u-l));return Math.abs(m)<.001&&(m=1),this.x=(g-d)/m,this.y=(c-f)/m,this.z=(u-l)/m,this.w=Math.acos((o+h+_-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Id extends la{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);const a={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},i);const n=new Ot(a,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);n.flipY=!1,n.generateMipmaps=i.generateMipmaps,n.internalFormat=i.internalFormat,this.textures=[];const s=i.count;for(let o=0;o<s;o++)this.textures[o]=n.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let a=0,n=this.textures.length;a<n;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,a=e.textures.length;i<a;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new sc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bt extends Id{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class lc extends Ot{constructor(e=null,t=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Od extends Ot{constructor(e=null,t=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fn{constructor(e=0,t=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=a}static slerpFlat(e,t,i,a,n,s,o){let l=i[a+0],c=i[a+1],u=i[a+2],h=i[a+3];const d=n[s+0],f=n[s+1],g=n[s+2],_=n[s+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==d||c!==f||u!==g){let m=1-o;const p=l*d+c*f+u*g+h*_,x=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const w=Math.sqrt(v),T=Math.atan2(w,p*x);m=Math.sin(m*T)/w,o=Math.sin(o*T)/w}const b=o*x;if(l=l*m+d*b,c=c*m+f*b,u=u*m+g*b,h=h*m+_*b,m===1-o){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,a,n,s){const o=i[a],l=i[a+1],c=i[a+2],u=i[a+3],h=n[s],d=n[s+1],f=n[s+2],g=n[s+3];return e[t]=o*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-o*f,e[t+2]=c*g+u*f+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,a){return this._x=e,this._y=t,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,a=e._y,n=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(a/2),h=o(n/2),d=l(i/2),f=l(a/2),g=l(n/2);switch(s){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],a=t[4],n=t[8],s=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(n-c)*f,this._z=(s-a)*f}else if(i>o&&i>h){const f=2*Math.sqrt(1+i-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(a+s)/f,this._z=(n+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-i-h);this._w=(n-c)/f,this._x=(a+s)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-i-o);this._w=(s-a)/f,this._x=(n+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Wt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,t/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,a=e._y,n=e._z,s=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+s*o+a*c-n*l,this._y=a*u+s*l+n*o-i*c,this._z=n*u+s*c+i*l-a*o,this._w=s*u-i*o-a*l-n*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,a=this._y,n=this._z,s=this._w;let o=s*e._w+i*e._x+a*e._y+n*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=i,this._y=a,this._z=n,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*s+t*this._w,this._x=f*i+t*this._x,this._y=f*a+t*this._y,this._z=f*n+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=s*h+this._w*d,this._x=i*h+this._x*d,this._y=a*h+this._y*d,this._z=n*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),n=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),n*Math.sin(t),n*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ae{constructor(e=0,t=0,i=0){ae.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(cc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(cc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,a=this.z,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6]*a,this.y=n[1]*t+n[4]*i+n[7]*a,this.z=n[2]*t+n[5]*i+n[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,n=e.elements,s=1/(n[3]*t+n[7]*i+n[11]*a+n[15]);return this.x=(n[0]*t+n[4]*i+n[8]*a+n[12])*s,this.y=(n[1]*t+n[5]*i+n[9]*a+n[13])*s,this.z=(n[2]*t+n[6]*i+n[10]*a+n[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,a=this.z,n=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*a-o*i),u=2*(o*t-n*a),h=2*(n*i-s*t);return this.x=t+l*c+s*h-o*u,this.y=i+l*u+o*c-n*h,this.z=a+l*h+n*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,a=this.z,n=e.elements;return this.x=n[0]*t+n[4]*i+n[8]*a,this.y=n[1]*t+n[5]*i+n[9]*a,this.z=n[2]*t+n[6]*i+n[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,a=e.y,n=e.z,s=t.x,o=t.y,l=t.z;return this.x=a*l-n*o,this.y=n*s-i*l,this.z=i*o-a*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ps.copy(this).projectOnVector(e),this.sub(ps)}reflect(e){return this.sub(ps.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return t*t+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const a=Math.sin(t)*e;return this.x=a*Math.sin(i),this.y=Math.cos(t)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ps=new ae,cc=new fn;class Ki{constructor(e=new ae(1/0,1/0,1/0),t=new ae(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const n=i.getAttribute("position");if(t===!0&&n!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=n.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Ii):Ii.fromBufferAttribute(n,s),Ii.applyMatrix4(e.matrixWorld),this.expandByPoint(Ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Jn.copy(i.boundingBox)),Jn.applyMatrix4(e.matrixWorld),this.union(Jn)}const a=e.children;for(let n=0,s=a.length;n<s;n++)this.expandByObject(a[n],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ii),Ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pn),eo.subVectors(this.max,pn),fa.subVectors(e.a,pn),pa.subVectors(e.b,pn),ma.subVectors(e.c,pn),hr.subVectors(pa,fa),dr.subVectors(ma,pa),Lr.subVectors(fa,ma);let t=[0,-hr.z,hr.y,0,-dr.z,dr.y,0,-Lr.z,Lr.y,hr.z,0,-hr.x,dr.z,0,-dr.x,Lr.z,0,-Lr.x,-hr.y,hr.x,0,-dr.y,dr.x,0,-Lr.y,Lr.x,0];return!ms(t,fa,pa,ma,eo)||(t=[1,0,0,0,1,0,0,0,1],!ms(t,fa,pa,ma,eo))?!1:(to.crossVectors(hr,dr),t=[to.x,to.y,to.z],ms(t,fa,pa,ma,eo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($i),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const $i=[new ae,new ae,new ae,new ae,new ae,new ae,new ae,new ae],Ii=new ae,Jn=new Ki,fa=new ae,pa=new ae,ma=new ae,hr=new ae,dr=new ae,Lr=new ae,pn=new ae,eo=new ae,to=new ae,Ir=new ae;function ms(r,e,t,i,a){for(let n=0,s=r.length-3;n<=s;n+=3){Ir.fromArray(r,n);const o=a.x*Math.abs(Ir.x)+a.y*Math.abs(Ir.y)+a.z*Math.abs(Ir.z),l=e.dot(Ir),c=t.dot(Ir),u=i.dot(Ir);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Fd=new Ki,mn=new ae,gs=new ae;class Or{constructor(e=new ae,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Fd.setFromPoints(e).getCenter(i);let a=0;for(let n=0,s=e.length;n<s;n++)a=Math.max(a,i.distanceToSquared(e[n]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mn.subVectors(e,this.center);const t=mn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),a=(i-this.radius)*.5;this.center.addScaledVector(mn,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mn.copy(e.center).add(gs)),this.expandByPoint(mn.copy(e.center).sub(gs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qi=new ae,vs=new ae,io=new ae,fr=new ae,_s=new ae,ro=new ae,xs=new ae;class uc{constructor(e=new ae,t=new ae(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Qi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qi.copy(this.origin).addScaledVector(this.direction,t),Qi.distanceToSquared(e))}distanceSqToSegment(e,t,i,a){vs.copy(e).add(t).multiplyScalar(.5),io.copy(t).sub(e).normalize(),fr.copy(this.origin).sub(vs);const n=e.distanceTo(t)*.5,s=-this.direction.dot(io),o=fr.dot(this.direction),l=-fr.dot(io),c=fr.lengthSq(),u=Math.abs(1-s*s);let h,d,f,g;if(u>0)if(h=s*l-o,d=s*o-l,g=n*u,h>=0)if(d>=-g)if(d<=g){const _=1/u;h*=_,d*=_,f=h*(h+s*d+2*o)+d*(s*h+d+2*l)+c}else d=n,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;else d=-n,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-s*n+o)),d=h>0?-n:Math.min(Math.max(-n,-l),n),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-n,-l),n),f=d*(d+2*l)+c):(h=Math.max(0,-(s*n+o)),d=h>0?n:Math.min(Math.max(-n,-l),n),f=-h*h+d*(d+2*l)+c);else d=s>0?-n:n,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(vs).addScaledVector(io,d),f}intersectSphere(e,t){Qi.subVectors(e.center,this.origin);const i=Qi.dot(this.direction),a=Qi.dot(Qi)-i*i,n=e.radius*e.radius;if(a>n)return null;const s=Math.sqrt(n-a),o=i-s,l=i+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,a,n,s,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,a=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,a=(e.min.x-d.x)*c),u>=0?(n=(e.min.y-d.y)*u,s=(e.max.y-d.y)*u):(n=(e.max.y-d.y)*u,s=(e.min.y-d.y)*u),i>s||n>a||((n>i||isNaN(i))&&(i=n),(s<a||isNaN(a))&&(a=s),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,t)}intersectsBox(e){return this.intersectBox(e,Qi)!==null}intersectTriangle(e,t,i,a,n){_s.subVectors(t,e),ro.subVectors(i,e),xs.crossVectors(_s,ro);let s=this.direction.dot(xs),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;fr.subVectors(this.origin,e);const l=o*this.direction.dot(ro.crossVectors(fr,ro));if(l<0)return null;const c=o*this.direction.dot(_s.cross(fr));if(c<0||l+c>s)return null;const u=-o*fr.dot(xs);return u<0?null:this.at(u/s,n)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ft{constructor(e,t,i,a,n,s,o,l,c,u,h,d,f,g,_,m){ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,a,n,s,o,l,c,u,h,d,f,g,_,m)}set(e,t,i,a,n,s,o,l,c,u,h,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=a,p[1]=n,p[5]=s,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,a=1/ga.setFromMatrixColumn(e,0).length(),n=1/ga.setFromMatrixColumn(e,1).length(),s=1/ga.setFromMatrixColumn(e,2).length();return t[0]=i[0]*a,t[1]=i[1]*a,t[2]=i[2]*a,t[3]=0,t[4]=i[4]*n,t[5]=i[5]*n,t[6]=i[6]*n,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,a=e.y,n=e.z,s=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),u=Math.cos(n),h=Math.sin(n);if(e.order==="XYZ"){const d=s*u,f=s*h,g=o*u,_=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=s*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,g=c*u,_=c*h;t[0]=d+_*o,t[4]=g*o-f,t[8]=s*c,t[1]=s*h,t[5]=s*u,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=s*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,g=c*u,_=c*h;t[0]=d-_*o,t[4]=-s*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=s*u,t[9]=_-d*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const d=s*u,f=s*h,g=o*u,_=o*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*h,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const d=s*l,f=s*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-d*h,t[8]=g*h+f,t[1]=h,t[5]=s*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-_*h}else if(e.order==="XZY"){const d=s*l,f=s*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+_,t[5]=s*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Nd,e,zd)}lookAt(e,t,i){const a=this.elements;return si.subVectors(e,t),si.lengthSq()===0&&(si.z=1),si.normalize(),pr.crossVectors(i,si),pr.lengthSq()===0&&(Math.abs(i.z)===1?si.x+=1e-4:si.z+=1e-4,si.normalize(),pr.crossVectors(i,si)),pr.normalize(),ao.crossVectors(si,pr),a[0]=pr.x,a[4]=ao.x,a[8]=si.x,a[1]=pr.y,a[5]=ao.y,a[9]=si.y,a[2]=pr.z,a[6]=ao.z,a[10]=si.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,n=this.elements,s=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],x=i[3],v=i[7],b=i[11],w=i[15],T=a[0],M=a[4],E=a[8],O=a[12],S=a[1],C=a[5],U=a[9],N=a[13],D=a[2],k=a[6],F=a[10],X=a[14],Y=a[3],z=a[7],q=a[11],y=a[15];return n[0]=s*T+o*S+l*D+c*Y,n[4]=s*M+o*C+l*k+c*z,n[8]=s*E+o*U+l*F+c*q,n[12]=s*O+o*N+l*X+c*y,n[1]=u*T+h*S+d*D+f*Y,n[5]=u*M+h*C+d*k+f*z,n[9]=u*E+h*U+d*F+f*q,n[13]=u*O+h*N+d*X+f*y,n[2]=g*T+_*S+m*D+p*Y,n[6]=g*M+_*C+m*k+p*z,n[10]=g*E+_*U+m*F+p*q,n[14]=g*O+_*N+m*X+p*y,n[3]=x*T+v*S+b*D+w*Y,n[7]=x*M+v*C+b*k+w*z,n[11]=x*E+v*U+b*F+w*q,n[15]=x*O+v*N+b*X+w*y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],a=e[8],n=e[12],s=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+n*l*h-a*c*h-n*o*d+i*c*d+a*o*f-i*l*f)+_*(+t*l*f-t*c*d+n*s*d-a*s*f+a*c*u-n*l*u)+m*(+t*c*h-t*o*f-n*s*h+i*s*f+n*o*u-i*c*u)+p*(-a*o*u-t*l*h+t*o*d+a*s*h-i*s*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],n=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=h*m*c-_*d*c+_*l*f-o*m*f-h*l*p+o*d*p,v=g*d*c-u*m*c-g*l*f+s*m*f+u*l*p-s*d*p,b=u*_*c-g*h*c+g*o*f-s*_*f-u*o*p+s*h*p,w=g*h*l-u*_*l-g*o*d+s*_*d+u*o*m-s*h*m,T=t*x+i*v+a*b+n*w;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/T;return e[0]=x*M,e[1]=(_*d*n-h*m*n-_*a*f+i*m*f+h*a*p-i*d*p)*M,e[2]=(o*m*n-_*l*n+_*a*c-i*m*c-o*a*p+i*l*p)*M,e[3]=(h*l*n-o*d*n-h*a*c+i*d*c+o*a*f-i*l*f)*M,e[4]=v*M,e[5]=(u*m*n-g*d*n+g*a*f-t*m*f-u*a*p+t*d*p)*M,e[6]=(g*l*n-s*m*n-g*a*c+t*m*c+s*a*p-t*l*p)*M,e[7]=(s*d*n-u*l*n+u*a*c-t*d*c-s*a*f+t*l*f)*M,e[8]=b*M,e[9]=(g*h*n-u*_*n-g*i*f+t*_*f+u*i*p-t*h*p)*M,e[10]=(s*_*n-g*o*n+g*i*c-t*_*c-s*i*p+t*o*p)*M,e[11]=(u*o*n-s*h*n-u*i*c+t*h*c+s*i*f-t*o*f)*M,e[12]=w*M,e[13]=(u*_*a-g*h*a+g*i*d-t*_*d-u*i*m+t*h*m)*M,e[14]=(g*o*a-s*_*a-g*i*l+t*_*l+s*i*m-t*o*m)*M,e[15]=(s*h*a-u*o*a+u*i*l-t*h*l-s*i*d+t*o*d)*M,this}scale(e){const t=this.elements,i=e.x,a=e.y,n=e.z;return t[0]*=i,t[4]*=a,t[8]*=n,t[1]*=i,t[5]*=a,t[9]*=n,t[2]*=i,t[6]*=a,t[10]*=n,t[3]*=i,t[7]*=a,t[11]*=n,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,a))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),a=Math.sin(t),n=1-i,s=e.x,o=e.y,l=e.z,c=n*s,u=n*o;return this.set(c*s+i,c*o-a*l,c*l+a*o,0,c*o+a*l,u*o+i,u*l-a*s,0,c*l-a*o,u*l+a*s,n*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,a,n,s){return this.set(1,i,n,0,e,1,s,0,t,a,1,0,0,0,0,1),this}compose(e,t,i){const a=this.elements,n=t._x,s=t._y,o=t._z,l=t._w,c=n+n,u=s+s,h=o+o,d=n*c,f=n*u,g=n*h,_=s*u,m=s*h,p=o*h,x=l*c,v=l*u,b=l*h,w=i.x,T=i.y,M=i.z;return a[0]=(1-(_+p))*w,a[1]=(f+b)*w,a[2]=(g-v)*w,a[3]=0,a[4]=(f-b)*T,a[5]=(1-(d+p))*T,a[6]=(m+x)*T,a[7]=0,a[8]=(g+v)*M,a[9]=(m-x)*M,a[10]=(1-(d+_))*M,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,i){const a=this.elements;let n=ga.set(a[0],a[1],a[2]).length();const s=ga.set(a[4],a[5],a[6]).length(),o=ga.set(a[8],a[9],a[10]).length();this.determinant()<0&&(n=-n),e.x=a[12],e.y=a[13],e.z=a[14],Oi.copy(this);const l=1/n,c=1/s,u=1/o;return Oi.elements[0]*=l,Oi.elements[1]*=l,Oi.elements[2]*=l,Oi.elements[4]*=c,Oi.elements[5]*=c,Oi.elements[6]*=c,Oi.elements[8]*=u,Oi.elements[9]*=u,Oi.elements[10]*=u,t.setFromRotationMatrix(Oi),i.x=n,i.y=s,i.z=o,this}makePerspective(e,t,i,a,n,s,o=2e3){const l=this.elements,c=2*n/(t-e),u=2*n/(i-a),h=(t+e)/(t-e),d=(i+a)/(i-a);let f,g;if(o===2e3)f=-(s+n)/(s-n),g=-2*s*n/(s-n);else if(o===2001)f=-s/(s-n),g=-s*n/(s-n);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,a,n,s,o=2e3){const l=this.elements,c=1/(t-e),u=1/(i-a),h=1/(s-n),d=(t+e)*c,f=(i+a)*u;let g,_;if(o===2e3)g=(s+n)*h,_=-2*h;else if(o===2001)g=n*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<16;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ga=new ae,Oi=new ft,Nd=new ae(0,0,0),zd=new ae(1,1,1),pr=new ae,ao=new ae,si=new ae,hc=new ft,dc=new fn;class or{constructor(e=0,t=0,i=0,a=or.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,a=this._order){return this._x=e,this._y=t,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const a=e.elements,n=a[0],s=a[4],o=a[8],l=a[1],c=a[5],u=a[9],h=a[2],d=a[6],f=a[10];switch(t){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,n)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,n),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,n));break;case"ZYX":this._y=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,n)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,n)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Wt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,n)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return hc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dc.setFromEuler(this),this.setFromQuaternion(dc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}or.DEFAULT_ORDER="XYZ";class fc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kd=0;const pc=new ae,va=new fn,Ji=new ft,no=new ae,gn=new ae,Bd=new ae,Gd=new fn,mc=new ae(1,0,0),gc=new ae(0,1,0),vc=new ae(0,0,1),Hd={type:"added"},Vd={type:"removed"},ys={type:"childadded",child:null},bs={type:"childremoved",child:null};class Vt extends la{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=ca(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new ae,t=new or,i=new fn,a=new ae(1,1,1);function n(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(n),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new ft},normalMatrix:{value:new Qe}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return va.setFromAxisAngle(e,t),this.quaternion.multiply(va),this}rotateOnWorldAxis(e,t){return va.setFromAxisAngle(e,t),this.quaternion.premultiply(va),this}rotateX(e){return this.rotateOnAxis(mc,e)}rotateY(e){return this.rotateOnAxis(gc,e)}rotateZ(e){return this.rotateOnAxis(vc,e)}translateOnAxis(e,t){return pc.copy(e).applyQuaternion(this.quaternion),this.position.add(pc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(mc,e)}translateY(e){return this.translateOnAxis(gc,e)}translateZ(e){return this.translateOnAxis(vc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ji.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?no.copy(e):no.set(e,t,i);const a=this.parent;this.updateWorldMatrix(!0,!1),gn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ji.lookAt(gn,no,this.up):Ji.lookAt(no,gn,this.up),this.quaternion.setFromRotationMatrix(Ji),a&&(Ji.extractRotation(a.matrixWorld),va.setFromRotationMatrix(Ji),this.quaternion.premultiply(va.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Hd),ys.child=e,this.dispatchEvent(ys),ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vd),bs.child=e,this.dispatchEvent(bs),bs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ji.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ji.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ji),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,a=this.children.length;i<a;i++){const n=this.children[i].getObjectByProperty(e,t);if(n!==void 0)return n}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const a=this.children;for(let n=0,s=a.length;n<s;n++)a[n].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gn,e,Bd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gn,Gd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,a=t.length;i<a;i++){const n=t[i];(n.matrixWorldAutoUpdate===!0||e===!0)&&n.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const a=this.children;for(let n=0,s=a.length;n<s;n++){const o=a[n];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxGeometryCount=this._maxGeometryCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function n(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=n(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];n(e.shapes,h)}else n(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(n(e.materials,this.material[l]));a.material=o}else a.material=n(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(n(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),h=s(e.shapes),d=s(e.skeletons),f=s(e.animations),g=s(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=a,i;function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Vt.DEFAULT_UP=new ae(0,1,0),Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fi=new ae,er=new ae,Ss=new ae,tr=new ae,_a=new ae,xa=new ae,_c=new ae,Ms=new ae,ws=new ae,Ts=new ae;class Zi{constructor(e=new ae,t=new ae,i=new ae){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,a){a.subVectors(i,t),Fi.subVectors(e,t),a.cross(Fi);const n=a.lengthSq();return n>0?a.multiplyScalar(1/Math.sqrt(n)):a.set(0,0,0)}static getBarycoord(e,t,i,a,n){Fi.subVectors(a,t),er.subVectors(i,t),Ss.subVectors(e,t);const s=Fi.dot(Fi),o=Fi.dot(er),l=Fi.dot(Ss),c=er.dot(er),u=er.dot(Ss),h=s*c-o*o;if(h===0)return n.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,g=(s*u-o*l)*d;return n.set(1-f-g,g,f)}static containsPoint(e,t,i,a){return this.getBarycoord(e,t,i,a,tr)===null?!1:tr.x>=0&&tr.y>=0&&tr.x+tr.y<=1}static getInterpolation(e,t,i,a,n,s,o,l){return this.getBarycoord(e,t,i,a,tr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(n,tr.x),l.addScaledVector(s,tr.y),l.addScaledVector(o,tr.z),l)}static isFrontFacing(e,t,i,a){return Fi.subVectors(i,t),er.subVectors(e,t),Fi.cross(er).dot(a)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,a){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,i,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fi.subVectors(this.c,this.b),er.subVectors(this.a,this.b),Fi.cross(er).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,a,n){return Zi.getInterpolation(e,this.a,this.b,this.c,t,i,a,n)}containsPoint(e){return Zi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,a=this.b,n=this.c;let s,o;_a.subVectors(a,i),xa.subVectors(n,i),Ms.subVectors(e,i);const l=_a.dot(Ms),c=xa.dot(Ms);if(l<=0&&c<=0)return t.copy(i);ws.subVectors(e,a);const u=_a.dot(ws),h=xa.dot(ws);if(u>=0&&h<=u)return t.copy(a);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(i).addScaledVector(_a,s);Ts.subVectors(e,n);const f=_a.dot(Ts),g=xa.dot(Ts);if(g>=0&&f<=g)return t.copy(n);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(xa,o);const m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return _c.subVectors(n,a),o=(h-u)/(h-u+(f-g)),t.copy(a).addScaledVector(_c,o);const p=1/(m+_+d);return s=_*p,o=d*p,t.copy(i).addScaledVector(_a,s).addScaledVector(xa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mr={h:0,s:0,l:0},oo={h:0,s:0,l:0};function Es(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class he{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ki){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,i,a=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.toWorkingColorSpace(this,a),this}setHSL(e,t,i,a=at.workingColorSpace){if(e=cs(e,1),t=Wt(t,0,1),i=Wt(i,0,1),t===0)this.r=this.g=this.b=i;else{const n=i<=.5?i*(1+t):i+t-i*t,s=2*i-n;this.r=Es(s,n,e+1/3),this.g=Es(s,n,e),this.b=Es(s,n,e-1/3)}return at.toWorkingColorSpace(this,a),this}setStyle(e,t=ki){function i(n){n!==void 0&&parseFloat(n)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let n;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,t);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,t);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const n=a[1],s=n.length;if(s===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(n,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ki){const i=xc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ha(e.r),this.g=ha(e.g),this.b=ha(e.b),this}copyLinearToSRGB(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ki){return at.fromWorkingColorSpace(kt.copy(this),e),Math.round(Wt(kt.r*255,0,255))*65536+Math.round(Wt(kt.g*255,0,255))*256+Math.round(Wt(kt.b*255,0,255))}getHexString(e=ki){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(kt.copy(this),t);const i=kt.r,a=kt.g,n=kt.b,s=Math.max(i,a,n),o=Math.min(i,a,n);let l,c;const u=(o+s)/2;if(o===s)l=0,c=0;else{const h=s-o;switch(c=u<=.5?h/(s+o):h/(2-s-o),s){case i:l=(a-n)/h+(a<n?6:0);break;case a:l=(n-i)/h+2;break;case n:l=(i-a)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(kt.copy(this),t),e.r=kt.r,e.g=kt.g,e.b=kt.b,e}getStyle(e=ki){at.fromWorkingColorSpace(kt.copy(this),e);const t=kt.r,i=kt.g,a=kt.b;return e!==ki?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,t,i){return this.getHSL(mr),this.setHSL(mr.h+e,mr.s+t,mr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(mr),e.getHSL(oo);const i=hn(mr.h,oo.h,t),a=hn(mr.s,oo.s,t),n=hn(mr.l,oo.l,t);return this.setHSL(i,a,n),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,a=this.b,n=e.elements;return this.r=n[0]*t+n[3]*i+n[6]*a,this.g=n[1]*t+n[4]*i+n[7]*a,this.b=n[2]*t+n[5]*i+n[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kt=new he;he.NAMES=xc;let Wd=0;class vn extends la{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=ca(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==0&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==204&&(i.blendSrc=this.blendSrc),this.blendDst!==205&&(i.blendDst=this.blendDst),this.blendEquation!==100&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(i.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(n){const s=[];for(const o in n){const l=n[o];delete l.metadata,s.push(l)}return s}if(t){const n=a(e.textures),s=a(e.images);n.length>0&&(i.textures=n),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const a=t.length;i=new Array(a);for(let n=0;n!==a;++n)i[n]=t[n].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class gr extends vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new or,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new ae,so=new Ue;class li{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Dd("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let a=0,n=this.itemSize;a<n;a++)this.array[e+a]=t.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)so.fromBufferAttribute(this,t),so.applyMatrix3(e),this.setXY(t,so.x,so.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ua(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ua(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ua(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ua(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ua(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,a){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),a=Xt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,t,i,a,n){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),a=Xt(a,this.array),n=Xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=n,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class yc extends li{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class bc extends li{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class qt extends li{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Xd=0;const Mi=new ft,As=new Vt,ya=new ae,ci=new Ki,_n=new Ki,Pt=new ae;class yi extends la{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=ca(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ic(e)?bc:yc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const n=new Qe().getNormalMatrix(e);i.applyNormalMatrix(n),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mi.makeRotationFromQuaternion(e),this.applyMatrix4(Mi),this}rotateX(e){return Mi.makeRotationX(e),this.applyMatrix4(Mi),this}rotateY(e){return Mi.makeRotationY(e),this.applyMatrix4(Mi),this}rotateZ(e){return Mi.makeRotationZ(e),this.applyMatrix4(Mi),this}translate(e,t,i){return Mi.makeTranslation(e,t,i),this.applyMatrix4(Mi),this}scale(e,t,i){return Mi.makeScale(e,t,i),this.applyMatrix4(Mi),this}lookAt(e){return As.lookAt(e),As.updateMatrix(),this.applyMatrix4(As.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ya).negate(),this.translate(ya.x,ya.y,ya.z),this}setFromPoints(e){const t=[];for(let i=0,a=e.length;i<a;i++){const n=e[i];t.push(n.x,n.y,n.z||0)}return this.setAttribute("position",new qt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ae(-1/0,-1/0,-1/0),new ae(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const n=t[i];ci.setFromBufferAttribute(n),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ae,1/0);return}if(e){const i=this.boundingSphere.center;if(ci.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const o=t[n];_n.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(ci.min,_n.min),ci.expandByPoint(Pt),Pt.addVectors(ci.max,_n.max),ci.expandByPoint(Pt)):(ci.expandByPoint(_n.min),ci.expandByPoint(_n.max))}ci.getCenter(i);let a=0;for(let n=0,s=e.count;n<s;n++)Pt.fromBufferAttribute(e,n),a=Math.max(a,i.distanceToSquared(Pt));if(t)for(let n=0,s=t.length;n<s;n++){const o=t[n],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Pt.fromBufferAttribute(o,c),l&&(ya.fromBufferAttribute(e,c),Pt.add(ya)),a=Math.max(a,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,a=t.normal,n=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new li(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<i.count;E++)o[E]=new ae,l[E]=new ae;const c=new ae,u=new ae,h=new ae,d=new Ue,f=new Ue,g=new Ue,_=new ae,m=new ae;function p(E,O,S){c.fromBufferAttribute(i,E),u.fromBufferAttribute(i,O),h.fromBufferAttribute(i,S),d.fromBufferAttribute(n,E),f.fromBufferAttribute(n,O),g.fromBufferAttribute(n,S),u.sub(c),h.sub(c),f.sub(d),g.sub(d);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(C),m.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),o[E].add(_),o[O].add(_),o[S].add(_),l[E].add(m),l[O].add(m),l[S].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let E=0,O=x.length;E<O;++E){const S=x[E],C=S.start,U=S.count;for(let N=C,D=C+U;N<D;N+=3)p(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const v=new ae,b=new ae,w=new ae,T=new ae;function M(E){w.fromBufferAttribute(a,E),T.copy(w);const O=o[E];v.copy(O),v.sub(w.multiplyScalar(w.dot(O))).normalize(),b.crossVectors(T,O);const S=b.dot(l[E])<0?-1:1;s.setXYZW(E,v.x,v.y,v.z,S)}for(let E=0,O=x.length;E<O;++E){const S=x[E],C=S.start,U=S.count;for(let N=C,D=C+U;N<D;N+=3)M(e.getX(N+0)),M(e.getX(N+1)),M(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new li(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const a=new ae,n=new ae,s=new ae,o=new ae,l=new ae,c=new ae,u=new ae,h=new ae;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);a.fromBufferAttribute(t,g),n.fromBufferAttribute(t,_),s.fromBufferAttribute(t,m),u.subVectors(s,n),h.subVectors(a,n),u.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)a.fromBufferAttribute(t,d+0),n.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),u.subVectors(s,n),h.subVectors(a,n),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let p=0;p<u;p++)d[g++]=c[f++]}return new li(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yi,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);t.setAttribute(o,c)}const n=this.morphAttributes;for(const o in n){const l=[],c=n[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let n=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(a[l]=u,n=!0)}n&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const a=e.attributes;for(const c in a){const u=a[c];this.setAttribute(c,u.clone(t))}const n=e.morphAttributes;for(const c in n){const u=[],h=n[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sc=new ft,Fr=new uc,lo=new Or,Mc=new ae,ba=new ae,Sa=new ae,Ma=new ae,Rs=new ae,co=new ae,uo=new Ue,ho=new Ue,fo=new Ue,wc=new ae,Tc=new ae,Ec=new ae,po=new ae,mo=new ae;class Xe extends Vt{constructor(e=new yi,t=new gr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,n=i.length;a<n;a++){const s=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}getVertexPosition(e,t){const i=this.geometry,a=i.attributes.position,n=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(n&&o){co.set(0,0,0);for(let l=0,c=n.length;l<c;l++){const u=o[l],h=n[l];u!==0&&(Rs.fromBufferAttribute(h,e),s?co.addScaledVector(Rs,u):co.addScaledVector(Rs.sub(t),u))}t.add(co)}return t}raycast(e,t){const i=this.geometry,a=this.material,n=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),lo.copy(i.boundingSphere),lo.applyMatrix4(n),Fr.copy(e.ray).recast(e.near),!(lo.containsPoint(Fr.origin)===!1&&(Fr.intersectSphere(lo,Mc)===null||Fr.origin.distanceToSquared(Mc)>(e.far-e.near)**2))&&(Sc.copy(n).invert(),Fr.copy(e.ray).applyMatrix4(Sc),!(i.boundingBox!==null&&Fr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Fr)))}_computeIntersections(e,t,i){let a;const n=this.geometry,s=this.material,o=n.index,l=n.attributes.position,c=n.attributes.uv,u=n.attributes.uv1,h=n.attributes.normal,d=n.groups,f=n.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=s[m.materialIndex],x=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=x,w=v;b<w;b+=3){const T=o.getX(b),M=o.getX(b+1),E=o.getX(b+2);a=go(this,p,e,i,c,u,h,T,M,E),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=o.getX(m),v=o.getX(m+1),b=o.getX(m+2);a=go(this,s,e,i,c,u,h,x,v,b),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=s[m.materialIndex],x=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=x,w=v;b<w;b+=3){const T=b,M=b+1,E=b+2;a=go(this,p,e,i,c,u,h,T,M,E),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const x=m,v=m+1,b=m+2;a=go(this,s,e,i,c,u,h,x,v,b),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function qd(r,e,t,i,a,n,s,o){let l;if(e.side===1?l=i.intersectTriangle(s,n,a,!0,o):l=i.intersectTriangle(a,n,s,e.side===0,o),l===null)return null;mo.copy(o),mo.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(mo);return c<t.near||c>t.far?null:{distance:c,point:mo.clone(),object:r}}function go(r,e,t,i,a,n,s,o,l,c){r.getVertexPosition(o,ba),r.getVertexPosition(l,Sa),r.getVertexPosition(c,Ma);const u=qd(r,e,t,i,ba,Sa,Ma,po);if(u){a&&(uo.fromBufferAttribute(a,o),ho.fromBufferAttribute(a,l),fo.fromBufferAttribute(a,c),u.uv=Zi.getInterpolation(po,ba,Sa,Ma,uo,ho,fo,new Ue)),n&&(uo.fromBufferAttribute(n,o),ho.fromBufferAttribute(n,l),fo.fromBufferAttribute(n,c),u.uv1=Zi.getInterpolation(po,ba,Sa,Ma,uo,ho,fo,new Ue)),s&&(wc.fromBufferAttribute(s,o),Tc.fromBufferAttribute(s,l),Ec.fromBufferAttribute(s,c),u.normal=Zi.getInterpolation(po,ba,Sa,Ma,wc,Tc,Ec,new ae),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new ae,materialIndex:0};Zi.getNormal(ba,Sa,Ma,h.normal),u.face=h}return u}class Bn extends yi{constructor(e=1,t=1,i=1,a=1,n=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:a,heightSegments:n,depthSegments:s};const o=this;a=Math.floor(a),n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,i,t,e,s,n,0),g("z","y","x",1,-1,i,t,-e,s,n,1),g("x","z","y",1,1,e,i,t,a,s,2),g("x","z","y",1,-1,e,i,-t,a,s,3),g("x","y","z",1,-1,e,t,i,a,n,4),g("x","y","z",-1,-1,e,t,-i,a,n,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(u,3)),this.setAttribute("uv",new qt(h,2));function g(_,m,p,x,v,b,w,T,M,E,O){const S=b/M,C=w/E,U=b/2,N=w/2,D=T/2,k=M+1,F=E+1;let X=0,Y=0;const z=new ae;for(let q=0;q<F;q++){const y=q*C-N;for(let B=0;B<k;B++){const W=B*S-U;z[_]=W*x,z[m]=y*v,z[p]=D,c.push(z.x,z.y,z.z),z[_]=0,z[m]=0,z[p]=T>0?1:-1,u.push(z.x,z.y,z.z),h.push(B/M),h.push(1-q/E),X+=1}}for(let q=0;q<E;q++)for(let y=0;y<M;y++){const B=d+y+k*q,W=d+y+k*(q+1),I=d+(y+1)+k*(q+1),V=d+(y+1)+k*q;l.push(B,W,V),l.push(W,I,V),Y+=6}o.addGroup(f,Y,O),f+=Y,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function wa(r){const e={};for(const t in r){e[t]={};for(const i in r[t]){const a=r[t][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=a.clone():Array.isArray(a)?e[t][i]=a.slice():e[t][i]=a}}return e}function jt(r){const e={};for(let t=0;t<r.length;t++){const i=wa(r[t]);for(const a in i)e[a]=i[a]}return e}function jd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Ac(r){return r.getRenderTarget()===null?r.outputColorSpace:at.workingColorSpace}const Bi={clone:wa,merge:jt};var Yd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class He extends vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yd,this.fragmentShader=Zd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wa(e.uniforms),this.uniformsGroups=jd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const n=this.uniforms[a].value;n&&n.isTexture?t.uniforms[a]={type:"t",value:n.toJSON(e).uuid}:n&&n.isColor?t.uniforms[a]={type:"c",value:n.getHex()}:n&&n.isVector2?t.uniforms[a]={type:"v2",value:n.toArray()}:n&&n.isVector3?t.uniforms[a]={type:"v3",value:n.toArray()}:n&&n.isVector4?t.uniforms[a]={type:"v4",value:n.toArray()}:n&&n.isMatrix3?t.uniforms[a]={type:"m3",value:n.toArray()}:n&&n.isMatrix4?t.uniforms[a]={type:"m4",value:n.toArray()}:t.uniforms[a]={value:n}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Rc extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const vr=new ae,Cc=new Ue,Dc=new Ue;class ui extends Rc{constructor(e=50,t=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=un*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(cn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return un*2*Math.atan(Math.tan(cn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){vr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vr.x,vr.y).multiplyScalar(-e/vr.z),vr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vr.x,vr.y).multiplyScalar(-e/vr.z)}getViewSize(e,t){return this.getViewBounds(e,Cc,Dc),t.subVectors(Dc,Cc)}setViewOffset(e,t,i,a,n,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=n,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(cn*.5*this.fov)/this.zoom,i=2*t,a=this.aspect*i,n=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;n+=s.offsetX*a/l,t-=s.offsetY*i/c,a*=s.width/l,i*=s.height/c}const o=this.filmOffset;o!==0&&(n+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(n,n+a,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ta=-90,Ea=1;class Kd extends Vt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new ui(Ta,Ea,e,t);a.layers=this.layers,this.add(a);const n=new ui(Ta,Ea,e,t);n.layers=this.layers,this.add(n);const s=new ui(Ta,Ea,e,t);s.layers=this.layers,this.add(s);const o=new ui(Ta,Ea,e,t);o.layers=this.layers,this.add(o);const l=new ui(Ta,Ea,e,t);l.layers=this.layers,this.add(l);const c=new ui(Ta,Ea,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,a,n,s,o,l]=t;for(const c of t)this.remove(c);if(e===2e3)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),n.up.set(0,0,-1),n.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),n.up.set(0,0,1),n.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[n,s,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(t,n),e.setRenderTarget(i,1,a),e.render(t,s),e.setRenderTarget(i,2,a),e.render(t,o),e.setRenderTarget(i,3,a),e.render(t,l),e.setRenderTarget(i,4,a),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,a),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Pc extends Ot{constructor(e,t,i,a,n,s,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,i,a,n,s,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $d extends bt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Pc(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Bn(5,5,5),n=new He({name:"CubemapFromEquirect",uniforms:wa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:1,blending:0});n.uniforms.tEquirect.value=t;const s=new Xe(a,n),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Kd(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,i,a){const n=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,a);e.setRenderTarget(n)}}const Cs=new ae,Qd=new ae,Jd=new Qe;class Nr{constructor(e=new ae(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,a){return this.normal.set(e,t,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const a=Cs.subVectors(i,t).cross(Qd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Cs),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const n=-(e.start.dot(this.normal)+this.constant)/a;return n<0||n>1?null:t.copy(e.start).addScaledVector(i,n)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Jd.getNormalMatrix(e),a=this.coplanarPoint(Cs).applyMatrix4(e),n=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(n),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zr=new Or,vo=new ae;class Uc{constructor(e=new Nr,t=new Nr,i=new Nr,a=new Nr,n=new Nr,s=new Nr){this.planes=[e,t,i,a,n,s]}set(e,t,i,a,n,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(a),o[4].copy(n),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=2e3){const i=this.planes,a=e.elements,n=a[0],s=a[1],o=a[2],l=a[3],c=a[4],u=a[5],h=a[6],d=a[7],f=a[8],g=a[9],_=a[10],m=a[11],p=a[12],x=a[13],v=a[14],b=a[15];if(i[0].setComponents(l-n,d-c,m-f,b-p).normalize(),i[1].setComponents(l+n,d+c,m+f,b+p).normalize(),i[2].setComponents(l+s,d+u,m+g,b+x).normalize(),i[3].setComponents(l-s,d-u,m-g,b-x).normalize(),i[4].setComponents(l-o,d-h,m-_,b-v).normalize(),t===2e3)i[5].setComponents(l+o,d+h,m+_,b+v).normalize();else if(t===2001)i[5].setComponents(o,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zr)}intersectsSprite(e){return zr.center.set(0,0,0),zr.radius=.7071067811865476,zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(zr)}intersectsSphere(e){const t=this.planes,i=e.center,a=-e.radius;for(let n=0;n<6;n++)if(t[n].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const a=t[i];if(vo.x=a.normal.x>0?e.max.x:e.min.x,vo.y=a.normal.y>0?e.max.y:e.min.y,vo.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(vo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Lc(){let r=null,e=!1,t=null,i=null;function a(n,s){t(n,s),i=r.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(i=r.requestAnimationFrame(a),e=!0)},stop:function(){r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(n){t=n},setContext:function(n){r=n}}}function ef(r,e){const t=e.isWebGL2,i=new WeakMap;function a(c,u){const h=c.array,d=c.usage,f=h.byteLength,g=r.createBuffer();r.bindBuffer(u,g),r.bufferData(u,h,d),c.onUploadCallback();let _;if(h instanceof Float32Array)_=r.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=r.SHORT;else if(h instanceof Uint32Array)_=r.UNSIGNED_INT;else if(h instanceof Int32Array)_=r.INT;else if(h instanceof Int8Array)_=r.BYTE;else if(h instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:f}}function n(c,u,h){const d=u.array,f=u._updateRange,g=u.updateRanges;if(r.bindBuffer(h,c),f.count===-1&&g.length===0&&r.bufferSubData(h,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?r.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):r.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):r.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(r.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);if(h===void 0)i.set(c,a(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,c,u),h.version=c.version}}return{get:s,remove:o,update:l}}class Je extends yi{constructor(e=1,t=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:a};const n=e/2,s=t/2,o=Math.floor(i),l=Math.floor(a),c=o+1,u=l+1,h=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const x=p*d-s;for(let v=0;v<c;v++){const b=v*h-n;g.push(b,-x,0),_.push(0,0,1),m.push(v/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){const v=x+c*p,b=x+c*(p+1),w=x+1+c*(p+1),T=x+1+c*p;f.push(v,b,T),f.push(b,w,T)}this.setIndex(f),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(_,3)),this.setAttribute("uv",new qt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Je(e.width,e.height,e.widthSegments,e.heightSegments)}}var tf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,af=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,of=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ff=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Tf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ef=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Af=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Rf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Df=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,If=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Of=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ff=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Nf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Zf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Kf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$f=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ep=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ip=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ap=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,np=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,op=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,lp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,cp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,up=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,_p=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,xp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,yp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Tp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ep=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Up=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ip=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Op=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,kp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$p=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,um=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_m=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ym=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Em=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Am=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Um=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Im=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Om=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:tf,alphahash_pars_fragment:rf,alphamap_fragment:af,alphamap_pars_fragment:nf,alphatest_fragment:of,alphatest_pars_fragment:sf,aomap_fragment:lf,aomap_pars_fragment:cf,batching_pars_vertex:uf,batching_vertex:hf,begin_vertex:df,beginnormal_vertex:ff,bsdfs:pf,iridescence_fragment:mf,bumpmap_pars_fragment:gf,clipping_planes_fragment:vf,clipping_planes_pars_fragment:_f,clipping_planes_pars_vertex:xf,clipping_planes_vertex:yf,color_fragment:bf,color_pars_fragment:Sf,color_pars_vertex:Mf,color_vertex:wf,common:Tf,cube_uv_reflection_fragment:Ef,defaultnormal_vertex:Af,displacementmap_pars_vertex:Rf,displacementmap_vertex:Cf,emissivemap_fragment:Df,emissivemap_pars_fragment:Pf,colorspace_fragment:Uf,colorspace_pars_fragment:Lf,envmap_fragment:If,envmap_common_pars_fragment:Of,envmap_pars_fragment:Ff,envmap_pars_vertex:Nf,envmap_physical_pars_fragment:Zf,envmap_vertex:zf,fog_vertex:kf,fog_pars_vertex:Bf,fog_fragment:Gf,fog_pars_fragment:Hf,gradientmap_pars_fragment:Vf,lightmap_fragment:Wf,lightmap_pars_fragment:Xf,lights_lambert_fragment:qf,lights_lambert_pars_fragment:jf,lights_pars_begin:Yf,lights_toon_fragment:Kf,lights_toon_pars_fragment:$f,lights_phong_fragment:Qf,lights_phong_pars_fragment:Jf,lights_physical_fragment:ep,lights_physical_pars_fragment:tp,lights_fragment_begin:ip,lights_fragment_maps:rp,lights_fragment_end:ap,logdepthbuf_fragment:np,logdepthbuf_pars_fragment:op,logdepthbuf_pars_vertex:sp,logdepthbuf_vertex:lp,map_fragment:cp,map_pars_fragment:up,map_particle_fragment:hp,map_particle_pars_fragment:dp,metalnessmap_fragment:fp,metalnessmap_pars_fragment:pp,morphinstance_vertex:mp,morphcolor_vertex:gp,morphnormal_vertex:vp,morphtarget_pars_vertex:_p,morphtarget_vertex:xp,normal_fragment_begin:yp,normal_fragment_maps:bp,normal_pars_fragment:Sp,normal_pars_vertex:Mp,normal_vertex:wp,normalmap_pars_fragment:Tp,clearcoat_normal_fragment_begin:Ep,clearcoat_normal_fragment_maps:Ap,clearcoat_pars_fragment:Rp,iridescence_pars_fragment:Cp,opaque_fragment:Dp,packing:Pp,premultiplied_alpha_fragment:Up,project_vertex:Lp,dithering_fragment:Ip,dithering_pars_fragment:Op,roughnessmap_fragment:Fp,roughnessmap_pars_fragment:Np,shadowmap_pars_fragment:zp,shadowmap_pars_vertex:kp,shadowmap_vertex:Bp,shadowmask_pars_fragment:Gp,skinbase_vertex:Hp,skinning_pars_vertex:Vp,skinning_vertex:Wp,skinnormal_vertex:Xp,specularmap_fragment:qp,specularmap_pars_fragment:jp,tonemapping_fragment:Yp,tonemapping_pars_fragment:Zp,transmission_fragment:Kp,transmission_pars_fragment:$p,uv_pars_fragment:Qp,uv_pars_vertex:Jp,uv_vertex:em,worldpos_vertex:tm,background_vert:im,background_frag:rm,backgroundCube_vert:am,backgroundCube_frag:nm,cube_vert:om,cube_frag:sm,depth_vert:lm,depth_frag:cm,distanceRGBA_vert:um,distanceRGBA_frag:hm,equirect_vert:dm,equirect_frag:fm,linedashed_vert:pm,linedashed_frag:mm,meshbasic_vert:gm,meshbasic_frag:vm,meshlambert_vert:_m,meshlambert_frag:xm,meshmatcap_vert:ym,meshmatcap_frag:bm,meshnormal_vert:Sm,meshnormal_frag:Mm,meshphong_vert:wm,meshphong_frag:Tm,meshphysical_vert:Em,meshphysical_frag:Am,meshtoon_vert:Rm,meshtoon_frag:Cm,points_vert:Dm,points_frag:Pm,shadow_vert:Um,shadow_frag:Lm,sprite_vert:Im,sprite_frag:Om},Ie={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},Gi={basic:{uniforms:jt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:jt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new he(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:jt([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:jt([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:jt([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new he(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:jt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:jt([Ie.points,Ie.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:jt([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:jt([Ie.common,Ie.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:jt([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:jt([Ie.sprite,Ie.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:jt([Ie.common,Ie.displacementmap,{referencePosition:{value:new ae},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:jt([Ie.lights,Ie.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Gi.physical={uniforms:jt([Gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const _o={r:0,b:0,g:0},kr=new or,Fm=new ft;function Nm(r,e,t,i,a,n,s){const o=new he(0);let l=n===!0?0:1,c,u,h=null,d=0,f=null;function g(m,p){let x=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(o,l):v&&v.isColor&&(_(v,1),x=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(r.autoClear||x)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),v&&(v.isCubeTexture||v.mapping===306)?(u===void 0&&(u=new Xe(new Bn(1,1,1),new He({name:"BackgroundCubeMaterial",uniforms:wa(Gi.backgroundCube.uniforms),vertexShader:Gi.backgroundCube.vertexShader,fragmentShader:Gi.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,T,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),kr.copy(p.backgroundRotation),kr.x*=-1,kr.y*=-1,kr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(kr.y*=-1,kr.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Fm.makeRotationFromEuler(kr)),u.material.toneMapped=at.getTransfer(v.colorSpace)!==ht,(h!==v||d!==v.version||f!==r.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,f=r.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Xe(new Je(2,2),new He({name:"BackgroundMaterial",uniforms:wa(Gi.background.uniforms),vertexShader:Gi.background.vertexShader,fragmentShader:Gi.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=at.getTransfer(v.colorSpace)!==ht,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,f=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(_o,Ac(r)),i.buffers.color.setClear(_o.r,_o.g,_o.b,p,s)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function zm(r,e,t,i){const a=r.getParameter(r.MAX_VERTEX_ATTRIBS),n=i.isWebGL2?null:e.get("OES_vertex_array_object"),s=i.isWebGL2||n!==null,o={},l=m(null);let c=l,u=!1;function h(D,k,F,X,Y){let z=!1;if(s){const q=_(X,F,k);c!==q&&(c=q,f(c.object)),z=p(D,X,F,Y),z&&x(D,X,F,Y)}else{const q=k.wireframe===!0;(c.geometry!==X.id||c.program!==F.id||c.wireframe!==q)&&(c.geometry=X.id,c.program=F.id,c.wireframe=q,z=!0)}Y!==null&&t.update(Y,r.ELEMENT_ARRAY_BUFFER),(z||u)&&(u=!1,E(D,k,F,X),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function d(){return i.isWebGL2?r.createVertexArray():n.createVertexArrayOES()}function f(D){return i.isWebGL2?r.bindVertexArray(D):n.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?r.deleteVertexArray(D):n.deleteVertexArrayOES(D)}function _(D,k,F){const X=F.wireframe===!0;let Y=o[D.id];Y===void 0&&(Y={},o[D.id]=Y);let z=Y[k.id];z===void 0&&(z={},Y[k.id]=z);let q=z[X];return q===void 0&&(q=m(d()),z[X]=q),q}function m(D){const k=[],F=[],X=[];for(let Y=0;Y<a;Y++)k[Y]=0,F[Y]=0,X[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:F,attributeDivisors:X,object:D,attributes:{},index:null}}function p(D,k,F,X){const Y=c.attributes,z=k.attributes;let q=0;const y=F.getAttributes();for(const B in y)if(y[B].location>=0){const W=Y[B];let I=z[B];if(I===void 0&&(B==="instanceMatrix"&&D.instanceMatrix&&(I=D.instanceMatrix),B==="instanceColor"&&D.instanceColor&&(I=D.instanceColor)),W===void 0||W.attribute!==I||I&&W.data!==I.data)return!0;q++}return c.attributesNum!==q||c.index!==X}function x(D,k,F,X){const Y={},z=k.attributes;let q=0;const y=F.getAttributes();for(const B in y)if(y[B].location>=0){let W=z[B];W===void 0&&(B==="instanceMatrix"&&D.instanceMatrix&&(W=D.instanceMatrix),B==="instanceColor"&&D.instanceColor&&(W=D.instanceColor));const I={};I.attribute=W,W&&W.data&&(I.data=W.data),Y[B]=I,q++}c.attributes=Y,c.attributesNum=q,c.index=X}function v(){const D=c.newAttributes;for(let k=0,F=D.length;k<F;k++)D[k]=0}function b(D){w(D,0)}function w(D,k){const F=c.newAttributes,X=c.enabledAttributes,Y=c.attributeDivisors;F[D]=1,X[D]===0&&(r.enableVertexAttribArray(D),X[D]=1),Y[D]!==k&&((i.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,k),Y[D]=k)}function T(){const D=c.newAttributes,k=c.enabledAttributes;for(let F=0,X=k.length;F<X;F++)k[F]!==D[F]&&(r.disableVertexAttribArray(F),k[F]=0)}function M(D,k,F,X,Y,z,q){q===!0?r.vertexAttribIPointer(D,k,F,Y,z):r.vertexAttribPointer(D,k,F,X,Y,z)}function E(D,k,F,X){if(i.isWebGL2===!1&&(D.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const Y=X.attributes,z=F.getAttributes(),q=k.defaultAttributeValues;for(const y in z){const B=z[y];if(B.location>=0){let W=Y[y];if(W===void 0&&(y==="instanceMatrix"&&D.instanceMatrix&&(W=D.instanceMatrix),y==="instanceColor"&&D.instanceColor&&(W=D.instanceColor)),W!==void 0){const I=W.normalized,V=W.itemSize,Q=t.get(W);if(Q===void 0)continue;const ee=Q.buffer,ie=Q.type,le=Q.bytesPerElement,Me=i.isWebGL2===!0&&(ie===r.INT||ie===r.UNSIGNED_INT||W.gpuType===1013);if(W.isInterleavedBufferAttribute){const K=W.data,L=K.stride,Ae=W.offset;if(K.isInstancedInterleavedBuffer){for(let me=0;me<B.locationSize;me++)w(B.location+me,K.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let me=0;me<B.locationSize;me++)b(B.location+me);r.bindBuffer(r.ARRAY_BUFFER,ee);for(let me=0;me<B.locationSize;me++)M(B.location+me,V/B.locationSize,ie,I,L*le,(Ae+V/B.locationSize*me)*le,Me)}else{if(W.isInstancedBufferAttribute){for(let K=0;K<B.locationSize;K++)w(B.location+K,W.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let K=0;K<B.locationSize;K++)b(B.location+K);r.bindBuffer(r.ARRAY_BUFFER,ee);for(let K=0;K<B.locationSize;K++)M(B.location+K,V/B.locationSize,ie,I,V*le,V/B.locationSize*K*le,Me)}}else if(q!==void 0){const I=q[y];if(I!==void 0)switch(I.length){case 2:r.vertexAttrib2fv(B.location,I);break;case 3:r.vertexAttrib3fv(B.location,I);break;case 4:r.vertexAttrib4fv(B.location,I);break;default:r.vertexAttrib1fv(B.location,I)}}}}T()}function O(){U();for(const D in o){const k=o[D];for(const F in k){const X=k[F];for(const Y in X)g(X[Y].object),delete X[Y];delete k[F]}delete o[D]}}function S(D){if(o[D.id]===void 0)return;const k=o[D.id];for(const F in k){const X=k[F];for(const Y in X)g(X[Y].object),delete X[Y];delete k[F]}delete o[D.id]}function C(D){for(const k in o){const F=o[k];if(F[D.id]===void 0)continue;const X=F[D.id];for(const Y in X)g(X[Y].object),delete X[Y];delete F[D.id]}}function U(){N(),u=!0,c!==l&&(c=l,f(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:U,resetDefaultState:N,dispose:O,releaseStatesOfGeometry:S,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:b,disableUnusedAttributes:T}}function km(r,e,t,i){const a=i.isWebGL2;let n;function s(u){n=u}function o(u,h){r.drawArrays(n,u,h),t.update(h,n,1)}function l(u,h,d){if(d===0)return;let f,g;if(a)f=r,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](n,u,h,d),t.update(h,n,d)}function c(u,h,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(u[g],h[g]);else{f.multiDrawArraysWEBGL(n,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_];t.update(g,n,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Bm(r,e,t){let i;function a(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function n(M){if(M==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const s=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=n(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=s||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,b=s||e.has("OES_texture_float"),w=v&&b,T=s?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:c,getMaxAnisotropy:a,getMaxPrecision:n,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:b,floatVertexTextures:w,maxSamples:T}}function Gm(r){const e=this;let t=null,i=0,a=!1,n=!1;const s=new Nr,o=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||i!==0||a;return a=d,i=h.length,f},this.beginShadows=function(){n=!0,u(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!a||g===null||g.length===0||n&&!m)n?u(null):c();else{const x=n?0:i,v=x*4;let b=p.clippingState||null;l.value=b,b=u(g,d,v,f);for(let w=0;w!==v;++w)b[w]=t[w];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,b=f;v!==_;++v,b+=4)s.copy(h[v]).applyMatrix4(x,o),s.normal.toArray(m,b),m[b+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Hm(r){let e=new WeakMap;function t(s,o){return o===303?s.mapping=301:o===304&&(s.mapping=302),s}function i(s){if(s&&s.isTexture){const o=s.mapping;if(o===303||o===304)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new $d(l.height);return c.fromEquirectangularTexture(r,s),e.set(s,c),s.addEventListener("dispose",a),t(c.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function n(){e=new WeakMap}return{get:i,dispose:n}}class it extends Rc{constructor(e=-1,t=1,i=1,a=-1,n=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=a,this.near=n,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,a,n,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=n,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let n=i-e,s=i+e,o=a+t,l=a-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;n+=c*this.view.offsetX,s=n+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(n,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Aa=4,Ic=[.125,.215,.35,.446,.526,.582],Br=20,Ds=new it,Oc=new he;let Ps=null,Us=0,Ls=0;const Gr=(1+Math.sqrt(5))/2,Ra=1/Gr,Fc=[new ae(1,1,1),new ae(-1,1,1),new ae(1,1,-1),new ae(-1,1,-1),new ae(0,Gr,Ra),new ae(0,Gr,-Ra),new ae(Ra,0,Gr),new ae(-Ra,0,Gr),new ae(Gr,Ra,0),new ae(-Gr,Ra,0)];class Nc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,a=100){Ps=this._renderer.getRenderTarget(),Us=this._renderer.getActiveCubeFace(),Ls=this._renderer.getActiveMipmapLevel(),this._setSize(256);const n=this._allocateTargets();return n.depthBuffer=!0,this._sceneToCubeUV(e,i,a,n),t>0&&this._blur(n,0,0,t),this._applyPMREM(n),this._cleanup(n),n}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ps,Us,Ls),e.scissorTest=!1,xo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ps=this._renderer.getRenderTarget(),Us=this._renderer.getActiveCubeFace(),Ls=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:ur,depthBuffer:!1},a=zc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zc(e,t,i);const{_lodMax:n}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vm(n)),this._blurMaterial=Wm(n,e,t)}return a}_compileMaterial(e){const t=new Xe(this._lodPlanes[0],e);this._renderer.compile(t,Ds)}_sceneToCubeUV(e,t,i,a){const n=new ui(90,1,t,i),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,u=l.toneMapping;l.getClearColor(Oc),l.toneMapping=0,l.autoClear=!1;const h=new gr({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),d=new Xe(new Bn,h);let f=!1;const g=e.background;g?g.isColor&&(h.color.copy(g),e.background=null,f=!0):(h.color.copy(Oc),f=!0);for(let _=0;_<6;_++){const m=_%3;m===0?(n.up.set(0,s[_],0),n.lookAt(o[_],0,0)):m===1?(n.up.set(0,0,s[_]),n.lookAt(0,o[_],0)):(n.up.set(0,s[_],0),n.lookAt(0,0,o[_]));const p=this._cubeSize;xo(a,m*p,_>2?p:0,p,p),l.setRenderTarget(a),f&&l.render(d,n),l.render(e,n)}d.geometry.dispose(),d.material.dispose(),l.toneMapping=u,l.autoClear=c,e.background=g}_textureToCubeUV(e,t){const i=this._renderer,a=e.mapping===301||e.mapping===302;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kc());const n=a?this._cubemapMaterial:this._equirectMaterial,s=new Xe(this._lodPlanes[0],n),o=n.uniforms;o.envMap.value=e;const l=this._cubeSize;xo(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(s,Ds)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let a=1;a<this._lodPlanes.length;a++){const n=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),s=Fc[(a-1)%Fc.length];this._blur(e,a-1,a,n,s)}t.autoClear=i}_blur(e,t,i,a,n){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,a,"latitudinal",n),this._halfBlur(s,e,i,i,a,"longitudinal",n)}_halfBlur(e,t,i,a,n,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Xe(this._lodPlanes[a],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(n)?Math.PI/(2*f):2*Math.PI/(2*Br-1),_=n/g,m=isFinite(n)?1+Math.floor(u*_):Br;m>Br&&console.warn(`sigmaRadians, ${n}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Br}`);const p=[];let x=0;for(let M=0;M<Br;++M){const E=M/_,O=Math.exp(-E*E/2);p.push(O),M===0?x+=O:M<m&&(x+=2*O)}for(let M=0;M<p.length;M++)p[M]=p[M]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=s==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-i;const b=this._sizeLods[a],w=3*b*(a>v-Aa?a-v+Aa:0),T=4*(this._cubeSize-b);xo(t,w,T,3*b,2*b),l.setRenderTarget(t),l.render(h,Ds)}}function Vm(r){const e=[],t=[],i=[];let a=r;const n=r-Aa+1+Ic.length;for(let s=0;s<n;s++){const o=Math.pow(2,a);t.push(o);let l=1/o;s>r-Aa?l=Ic[s-r+Aa-1]:s===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*f),v=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let T=0;T<f;T++){const M=T%3*2/3-1,E=T>2?0:-1,O=[M,E,0,M+2/3,E,0,M+2/3,E+1,0,M,E,0,M+2/3,E+1,0,M,E+1,0];x.set(O,_*g*T),v.set(d,m*g*T);const S=[T,T,T,T,T,T];b.set(S,p*g*T)}const w=new yi;w.setAttribute("position",new li(x,_)),w.setAttribute("uv",new li(v,m)),w.setAttribute("faceIndex",new li(b,p)),e.push(w),a>Aa&&a--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function zc(r,e,t){const i=new bt(r,e,t);return i.texture.mapping=306,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xo(r,e,t,i,a){r.viewport.set(e,t,i,a),r.scissor.set(e,t,i,a)}function Wm(r,e,t){const i=new Float32Array(Br),a=new ae(0,1,0);return new He({name:"SphericalGaussianBlur",defines:{n:Br,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function kc(){return new He({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bc(){return new He({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Is(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Is(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Xm(r){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===303||l===304,u=l===301||l===302;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Nc(r)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&a(h)){t===null&&(t=new Nc(r));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",n),d.texture}else return null}}}return o}function a(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function n(o){const l=o.target;l.removeEventListener("dispose",n);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}function qm(r){const e={};function t(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=r.getExtension(i)}return e[i]=a,a}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const a=t(i);return a===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function jm(r,e,t,i){const a={},n=new WeakMap;function s(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",s),delete a[d.id];const f=n.get(d);f&&(e.remove(f),n.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return a[d.id]===!0||(d.addEventListener("dispose",s),a[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const g in d)e.update(d[g],r.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],r.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,g=h.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let v=0,b=x.length;v<b;v+=3){const w=x[v+0],T=x[v+1],M=x[v+2];d.push(w,T,T,M,M,w)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,b=x.length/3-1;v<b;v+=3){const w=v+0,T=v+1,M=v+2;d.push(w,T,T,M,M,w)}}else return;const m=new(ic(d)?bc:yc)(d,1);m.version=_;const p=n.get(h);p&&e.remove(p),n.set(h,m)}function u(h){const d=n.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return n.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Ym(r,e,t,i){const a=i.isWebGL2;let n;function s(f){n=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,g){r.drawElements(n,g,o,f*l),t.update(g,n,1)}function h(f,g,_){if(_===0)return;let m,p;if(a)m=r,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](n,g,o,f*l,_),t.update(g,n,_)}function d(f,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(n,g,0,o,f,0,_);let p=0;for(let x=0;x<_;x++)p+=g[x];t.update(p,n,1)}}this.setMode=s,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function Zm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(n,s,o){switch(t.calls++,s){case r.TRIANGLES:t.triangles+=o*(n/3);break;case r.LINES:t.lines+=o*(n/2);break;case r.LINE_STRIP:t.lines+=o*(n-1);break;case r.LINE_LOOP:t.lines+=o*n;break;case r.POINTS:t.points+=o*n;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:i}}function Km(r,e){return r[0]-e[0]}function $m(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Qm(r,e,t){const i={},a=new Float32Array(8),n=new WeakMap,s=new Rt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0;let _=n.get(u);if(_===void 0||_.count!==g){let m=function(){C.dispose(),n.delete(u),u.removeEventListener("dispose",m)};_!==void 0&&_.texture.dispose();const p=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,v=u.morphAttributes.color!==void 0,b=u.morphAttributes.position||[],w=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let M=0;p===!0&&(M=1),x===!0&&(M=2),v===!0&&(M=3);let E=u.attributes.position.count*M,O=1;E>e.maxTextureSize&&(O=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const S=new Float32Array(E*O*4*g),C=new lc(S,E,O,g);C.type=1015,C.needsUpdate=!0;const U=M*4;for(let N=0;N<g;N++){const D=b[N],k=w[N],F=T[N],X=E*O*4*N;for(let Y=0;Y<D.count;Y++){const z=Y*U;p===!0&&(s.fromBufferAttribute(D,Y),S[X+z+0]=s.x,S[X+z+1]=s.y,S[X+z+2]=s.z,S[X+z+3]=0),x===!0&&(s.fromBufferAttribute(k,Y),S[X+z+4]=s.x,S[X+z+5]=s.y,S[X+z+6]=s.z,S[X+z+7]=0),v===!0&&(s.fromBufferAttribute(F,Y),S[X+z+8]=s.x,S[X+z+9]=s.y,S[X+z+10]=s.z,S[X+z+11]=F.itemSize===4?s.w:1)}}_={count:g,texture:C,size:new Ue(E,O)},n.set(u,_),u.addEventListener("dispose",m)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(r,"morphTexture",c.morphTexture,t);else{let m=0;for(let x=0;x<d.length;x++)m+=d[x];const p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(r,"morphTargetBaseInfluence",p),h.getUniforms().setValue(r,"morphTargetInfluences",d)}h.getUniforms().setValue(r,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}else{const f=d===void 0?0:d.length;let g=i[u.id];if(g===void 0||g.length!==f){g=[];for(let v=0;v<f;v++)g[v]=[v,0];i[u.id]=g}for(let v=0;v<f;v++){const b=g[v];b[0]=v,b[1]=d[v]}g.sort($m);for(let v=0;v<8;v++)v<f&&g[v][1]?(o[v][0]=g[v][0],o[v][1]=g[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(Km);const _=u.morphAttributes.position,m=u.morphAttributes.normal;let p=0;for(let v=0;v<8;v++){const b=o[v],w=b[0],T=b[1];w!==Number.MAX_SAFE_INTEGER&&T?(_&&u.getAttribute("morphTarget"+v)!==_[w]&&u.setAttribute("morphTarget"+v,_[w]),m&&u.getAttribute("morphNormal"+v)!==m[w]&&u.setAttribute("morphNormal"+v,m[w]),a[v]=T,p+=T):(_&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),a[v]=0)}const x=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(r,"morphTargetBaseInfluence",x),h.getUniforms().setValue(r,"morphTargetInfluences",a)}}return{update:l}}function Jm(r,e,t,i){let a=new WeakMap;function n(l){const c=i.render.frame,u=l.geometry,h=e.get(l,u);if(a.get(h)!==c&&(e.update(h),a.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;a.get(d)!==c&&(d.update(),a.set(d,c))}return h}function s(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:n,dispose:s}}class Gc extends Ot{constructor(e,t,i,a,n,s,o,l,c,u){if(u=u!==void 0?u:1026,u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===1026&&(i=1014),i===void 0&&u===1027&&(i=1020),super(null,a,n,s,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=l!==void 0?l:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Hc=new Ot,Vc=new Gc(1,1);Vc.compareFunction=515;const Wc=new lc,Xc=new Od,qc=new Pc,jc=[],Yc=[],Zc=new Float32Array(16),Kc=new Float32Array(9),$c=new Float32Array(4);function Ca(r,e,t){const i=r[0];if(i<=0||i>0)return r;const a=e*t;let n=jc[a];if(n===void 0&&(n=new Float32Array(a),jc[a]=n),e!==0){i.toArray(n,0);for(let s=1,o=0;s!==e;++s)o+=t,r[s].toArray(n,o)}return n}function Et(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function At(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function yo(r,e){let t=Yc[e];t===void 0&&(t=new Int32Array(e),Yc[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function e0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function t0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;r.uniform2fv(this.addr,e),At(t,e)}}function i0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;r.uniform3fv(this.addr,e),At(t,e)}}function r0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;r.uniform4fv(this.addr,e),At(t,e)}}function a0(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Et(t,i))return;$c.set(i),r.uniformMatrix2fv(this.addr,!1,$c),At(t,i)}}function n0(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Et(t,i))return;Kc.set(i),r.uniformMatrix3fv(this.addr,!1,Kc),At(t,i)}}function o0(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(Et(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Et(t,i))return;Zc.set(i),r.uniformMatrix4fv(this.addr,!1,Zc),At(t,i)}}function s0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function l0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;r.uniform2iv(this.addr,e),At(t,e)}}function c0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;r.uniform3iv(this.addr,e),At(t,e)}}function u0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;r.uniform4iv(this.addr,e),At(t,e)}}function h0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function d0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;r.uniform2uiv(this.addr,e),At(t,e)}}function f0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;r.uniform3uiv(this.addr,e),At(t,e)}}function p0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;r.uniform4uiv(this.addr,e),At(t,e)}}function m0(r,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(r.uniform1i(this.addr,a),i[0]=a);const n=this.type===r.SAMPLER_2D_SHADOW?Vc:Hc;t.setTexture2D(e||n,a)}function g0(r,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(r.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(e||Xc,a)}function v0(r,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(r.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(e||qc,a)}function _0(r,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(r.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(e||Wc,a)}function x0(r){switch(r){case 5126:return e0;case 35664:return t0;case 35665:return i0;case 35666:return r0;case 35674:return a0;case 35675:return n0;case 35676:return o0;case 5124:case 35670:return s0;case 35667:case 35671:return l0;case 35668:case 35672:return c0;case 35669:case 35673:return u0;case 5125:return h0;case 36294:return d0;case 36295:return f0;case 36296:return p0;case 35678:case 36198:case 36298:case 36306:case 35682:return m0;case 35679:case 36299:case 36307:return g0;case 35680:case 36300:case 36308:case 36293:return v0;case 36289:case 36303:case 36311:case 36292:return _0}}function y0(r,e){r.uniform1fv(this.addr,e)}function b0(r,e){const t=Ca(e,this.size,2);r.uniform2fv(this.addr,t)}function S0(r,e){const t=Ca(e,this.size,3);r.uniform3fv(this.addr,t)}function M0(r,e){const t=Ca(e,this.size,4);r.uniform4fv(this.addr,t)}function w0(r,e){const t=Ca(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function T0(r,e){const t=Ca(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function E0(r,e){const t=Ca(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function A0(r,e){r.uniform1iv(this.addr,e)}function R0(r,e){r.uniform2iv(this.addr,e)}function C0(r,e){r.uniform3iv(this.addr,e)}function D0(r,e){r.uniform4iv(this.addr,e)}function P0(r,e){r.uniform1uiv(this.addr,e)}function U0(r,e){r.uniform2uiv(this.addr,e)}function L0(r,e){r.uniform3uiv(this.addr,e)}function I0(r,e){r.uniform4uiv(this.addr,e)}function O0(r,e,t){const i=this.cache,a=e.length,n=yo(t,a);Et(i,n)||(r.uniform1iv(this.addr,n),At(i,n));for(let s=0;s!==a;++s)t.setTexture2D(e[s]||Hc,n[s])}function F0(r,e,t){const i=this.cache,a=e.length,n=yo(t,a);Et(i,n)||(r.uniform1iv(this.addr,n),At(i,n));for(let s=0;s!==a;++s)t.setTexture3D(e[s]||Xc,n[s])}function N0(r,e,t){const i=this.cache,a=e.length,n=yo(t,a);Et(i,n)||(r.uniform1iv(this.addr,n),At(i,n));for(let s=0;s!==a;++s)t.setTextureCube(e[s]||qc,n[s])}function z0(r,e,t){const i=this.cache,a=e.length,n=yo(t,a);Et(i,n)||(r.uniform1iv(this.addr,n),At(i,n));for(let s=0;s!==a;++s)t.setTexture2DArray(e[s]||Wc,n[s])}function k0(r){switch(r){case 5126:return y0;case 35664:return b0;case 35665:return S0;case 35666:return M0;case 35674:return w0;case 35675:return T0;case 35676:return E0;case 5124:case 35670:return A0;case 35667:case 35671:return R0;case 35668:case 35672:return C0;case 35669:case 35673:return D0;case 5125:return P0;case 36294:return U0;case 36295:return L0;case 36296:return I0;case 35678:case 36198:case 36298:case 36306:case 35682:return O0;case 35679:case 36299:case 36307:return F0;case 35680:case 36300:case 36308:case 36293:return N0;case 36289:case 36303:case 36311:case 36292:return z0}}class B0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=x0(t.type)}}class G0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=k0(t.type)}}class H0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const a=this.seq;for(let n=0,s=a.length;n!==s;++n){const o=a[n];o.setValue(e,t[o.id],i)}}}const Os=/(\w+)(\])?(\[|\.)?/g;function Qc(r,e){r.seq.push(e),r.map[e.id]=e}function V0(r,e,t){const i=r.name,a=i.length;for(Os.lastIndex=0;;){const n=Os.exec(i),s=Os.lastIndex;let o=n[1];const l=n[2]==="]",c=n[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===a){Qc(t,c===void 0?new B0(o,r,e):new G0(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new H0(o),Qc(t,u)),t=u}}}class bo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const n=e.getActiveUniform(t,a),s=e.getUniformLocation(t,n.name);V0(n,s,this)}}setValue(e,t,i,a){const n=this.map[t];n!==void 0&&n.setValue(e,i,a)}setOptional(e,t,i){const a=t[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,t,i,a){for(let n=0,s=t.length;n!==s;++n){const o=t[n],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,t){const i=[];for(let a=0,n=e.length;a!==n;++a){const s=e[a];s.id in t&&i.push(s)}return i}}function Jc(r,e,t){const i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}const W0=37297;let X0=0;function q0(r,e){const t=r.split(`
`),i=[],a=Math.max(e-6,0),n=Math.min(e+6,t.length);for(let s=a;s<n;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}function j0(r){const e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(r);let i;switch(e===t?i="":e==="p3"&&t===Kn?i="LinearDisplayP3ToLinearSRGB":e===Kn&&t==="p3"&&(i="LinearSRGBToLinearDisplayP3"),r){case ur:case Yn:return[i,"LinearTransferOETF"];case ki:case ls:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[i,"LinearTransferOETF"]}}function eu(r,e,t){const i=r.getShaderParameter(e,r.COMPILE_STATUS),a=r.getShaderInfoLog(e).trim();if(i&&a==="")return"";const n=/ERROR: 0:(\d+)/.exec(a);if(n){const s=parseInt(n[1]);return t.toUpperCase()+`

`+a+`

`+q0(r.getShaderSource(e),s)}else return a}function Y0(r,e){const t=j0(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Z0(r,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="OptimizedCineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function K0(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.alphaToCoverage||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Da).join(`
`)}function $0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Da).join(`
`)}function Q0(r){const e=[];for(const t in r){const i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function J0(r,e){const t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const n=r.getActiveAttrib(e,a),s=n.name;let o=1;n.type===r.FLOAT_MAT2&&(o=2),n.type===r.FLOAT_MAT3&&(o=3),n.type===r.FLOAT_MAT4&&(o=4),t[s]={type:n.type,location:r.getAttribLocation(e,s),locationSize:o}}return t}function Da(r){return r!==""}function tu(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function iu(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const eg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fs(r){return r.replace(eg,ig)}const tg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ig(r,e){let t=$e[e];if(t===void 0){const i=tg.get(e);if(i!==void 0)t=$e[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Fs(t)}const rg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ru(r){return r.replace(rg,ag)}function ag(r,e,t,i){let a="";for(let n=parseInt(e);n<parseInt(t);n++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return a}function au(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	`;return r.isWebGL2&&(e+=`precision ${r.precision} sampler3D;
		precision ${r.precision} sampler2DArray;
		precision ${r.precision} sampler2DShadow;
		precision ${r.precision} samplerCubeShadow;
		precision ${r.precision} sampler2DArrayShadow;
		precision ${r.precision} isampler2D;
		precision ${r.precision} isampler3D;
		precision ${r.precision} isamplerCube;
		precision ${r.precision} isampler2DArray;
		precision ${r.precision} usampler2D;
		precision ${r.precision} usampler3D;
		precision ${r.precision} usamplerCube;
		precision ${r.precision} usampler2DArray;
		`),r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ng(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function og(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sg(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===302&&(e="ENVMAP_MODE_REFRACTION"),e}function lg(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function cg(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ug(r,e,t,i){const a=r.getContext(),n=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=ng(t),c=og(t),u=sg(t),h=lg(t),d=cg(t),f=t.isWebGL2?"":K0(t),g=$0(t),_=Q0(n),m=a.createProgram();let p,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Da).join(`
`),p.length>0&&(p+=`
`),x=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Da).join(`
`),x.length>0&&(x+=`
`)):(p=[au(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Da).join(`
`),x=[f,au(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?$e.tonemapping_pars_fragment:"",t.toneMapping!==0?Z0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,Y0("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Da).join(`
`)),s=Fs(s),s=tu(s,t),s=iu(s,t),o=Fs(o),o=tu(o,t),o=iu(o,t),s=ru(s),o=ru(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===ec?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ec?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const b=v+p+s,w=v+x+o,T=Jc(a,a.VERTEX_SHADER,b),M=Jc(a,a.FRAGMENT_SHADER,w);a.attachShader(m,T),a.attachShader(m,M),t.index0AttributeName!==void 0?a.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(m,0,"position"),a.linkProgram(m);function E(U){if(r.debug.checkShaderErrors){const N=a.getProgramInfoLog(m).trim(),D=a.getShaderInfoLog(T).trim(),k=a.getShaderInfoLog(M).trim();let F=!0,X=!0;if(a.getProgramParameter(m,a.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(a,m,T,M);else{const Y=eu(a,T,"vertex"),z=eu(a,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(m,a.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+N+`
`+Y+`
`+z)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(D===""||k==="")&&(X=!1);X&&(U.diagnostics={runnable:F,programLog:N,vertexShader:{log:D,prefix:p},fragmentShader:{log:k,prefix:x}})}a.deleteShader(T),a.deleteShader(M),O=new bo(a,m),S=J0(a,m)}let O;this.getUniforms=function(){return O===void 0&&E(this),O};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(m,W0)),C},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=X0++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=M,this}let hg=0;class dg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(t),n=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new fg(e),t.set(e,i)),i}}class fg{constructor(e){this.id=hg++,this.code=e,this.usedTimes=0}}function pg(r,e,t,i,a,n,s){const o=new fc,l=new dg,c=new Set,u=[],h=a.isWebGL2,d=a.logarithmicDepthBuffer,f=a.vertexTextures;let g=a.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(S){return c.add(S),S===0?"uv":`uv${S}`}function p(S,C,U,N,D){const k=N.fog,F=D.geometry,X=S.isMeshStandardMaterial?N.environment:null,Y=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),z=Y&&Y.mapping===306?Y.image.height:null,q=_[S.type];S.precision!==null&&(g=a.getMaxPrecision(S.precision),g!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",g,"instead."));const y=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,B=y!==void 0?y.length:0;let W=0;F.morphAttributes.position!==void 0&&(W=1),F.morphAttributes.normal!==void 0&&(W=2),F.morphAttributes.color!==void 0&&(W=3);let I,V,Q,ee;if(q){const ke=Gi[q];I=ke.vertexShader,V=ke.fragmentShader}else I=S.vertexShader,V=S.fragmentShader,l.update(S),Q=l.getVertexShaderID(S),ee=l.getFragmentShaderID(S);const ie=r.getRenderTarget(),le=D.isInstancedMesh===!0,Me=D.isBatchedMesh===!0,K=!!S.map,L=!!S.matcap,Ae=!!Y,me=!!S.aoMap,pe=!!S.lightMap,ue=!!S.bumpMap,Se=!!S.normalMap,oe=!!S.displacementMap,ge=!!S.emissiveMap,ye=!!S.metalnessMap,R=!!S.roughnessMap,A=S.anisotropy>0,H=S.clearcoat>0,G=S.iridescence>0,te=S.sheen>0,J=S.transmission>0,Ce=A&&!!S.anisotropyMap,fe=H&&!!S.clearcoatMap,ce=H&&!!S.clearcoatNormalMap,ve=H&&!!S.clearcoatRoughnessMap,Ne=G&&!!S.iridescenceMap,de=G&&!!S.iridescenceThicknessMap,qe=te&&!!S.sheenColorMap,Ee=te&&!!S.sheenRoughnessMap,we=!!S.specularMap,Pe=!!S.specularColorMap,De=!!S.specularIntensityMap,Be=J&&!!S.transmissionMap,Re=J&&!!S.thicknessMap,Oe=!!S.gradientMap,j=!!S.alphaMap,_e=S.alphaTest>0,Z=!!S.alphaHash,Te=!!S.extensions;let be=0;S.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(be=r.toneMapping);const Fe={isWebGL2:h,shaderID:q,shaderType:S.type,shaderName:S.name,vertexShader:I,fragmentShader:V,defines:S.defines,customVertexShaderID:Q,customFragmentShaderID:ee,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:g,batching:Me,instancing:le,instancingColor:le&&D.instanceColor!==null,instancingMorph:le&&D.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ie===null?r.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:ur,alphaToCoverage:!!S.alphaToCoverage,map:K,matcap:L,envMap:Ae,envMapMode:Ae&&Y.mapping,envMapCubeUVHeight:z,aoMap:me,lightMap:pe,bumpMap:ue,normalMap:Se,displacementMap:f&&oe,emissiveMap:ge,normalMapObjectSpace:Se&&S.normalMapType===1,normalMapTangentSpace:Se&&S.normalMapType===0,metalnessMap:ye,roughnessMap:R,anisotropy:A,anisotropyMap:Ce,clearcoat:H,clearcoatMap:fe,clearcoatNormalMap:ce,clearcoatRoughnessMap:ve,iridescence:G,iridescenceMap:Ne,iridescenceThicknessMap:de,sheen:te,sheenColorMap:qe,sheenRoughnessMap:Ee,specularMap:we,specularColorMap:Pe,specularIntensityMap:De,transmission:J,transmissionMap:Be,thicknessMap:Re,gradientMap:Oe,opaque:S.transparent===!1&&S.blending===1&&S.alphaToCoverage===!1,alphaMap:j,alphaTest:_e,alphaHash:Z,combine:S.combine,mapUv:K&&m(S.map.channel),aoMapUv:me&&m(S.aoMap.channel),lightMapUv:pe&&m(S.lightMap.channel),bumpMapUv:ue&&m(S.bumpMap.channel),normalMapUv:Se&&m(S.normalMap.channel),displacementMapUv:oe&&m(S.displacementMap.channel),emissiveMapUv:ge&&m(S.emissiveMap.channel),metalnessMapUv:ye&&m(S.metalnessMap.channel),roughnessMapUv:R&&m(S.roughnessMap.channel),anisotropyMapUv:Ce&&m(S.anisotropyMap.channel),clearcoatMapUv:fe&&m(S.clearcoatMap.channel),clearcoatNormalMapUv:ce&&m(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ne&&m(S.iridescenceMap.channel),iridescenceThicknessMapUv:de&&m(S.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&m(S.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(S.sheenRoughnessMap.channel),specularMapUv:we&&m(S.specularMap.channel),specularColorMapUv:Pe&&m(S.specularColorMap.channel),specularIntensityMapUv:De&&m(S.specularIntensityMap.channel),transmissionMapUv:Be&&m(S.transmissionMap.channel),thicknessMapUv:Re&&m(S.thicknessMap.channel),alphaMapUv:j&&m(S.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Se||A),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!F.attributes.uv&&(K||j),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:D.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:B,morphTextureStride:W,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&U.length>0,shadowMapType:r.shadowMap.type,toneMapping:be,useLegacyLights:r._useLegacyLights,decodeVideoTexture:K&&S.map.isVideoTexture===!0&&at.getTransfer(S.map.colorSpace)===ht,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===2,flipSided:S.side===1,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:Te&&S.extensions.derivatives===!0,extensionFragDepth:Te&&S.extensions.fragDepth===!0,extensionDrawBuffers:Te&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:Te&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Te&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Te&&S.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function x(S){const C=[];if(S.shaderID?C.push(S.shaderID):(C.push(S.customVertexShaderID),C.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)C.push(U),C.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(v(C,S),b(C,S),C.push(r.outputColorSpace)),C.push(S.customProgramCacheKey),C.join()}function v(S,C){S.push(C.precision),S.push(C.outputColorSpace),S.push(C.envMapMode),S.push(C.envMapCubeUVHeight),S.push(C.mapUv),S.push(C.alphaMapUv),S.push(C.lightMapUv),S.push(C.aoMapUv),S.push(C.bumpMapUv),S.push(C.normalMapUv),S.push(C.displacementMapUv),S.push(C.emissiveMapUv),S.push(C.metalnessMapUv),S.push(C.roughnessMapUv),S.push(C.anisotropyMapUv),S.push(C.clearcoatMapUv),S.push(C.clearcoatNormalMapUv),S.push(C.clearcoatRoughnessMapUv),S.push(C.iridescenceMapUv),S.push(C.iridescenceThicknessMapUv),S.push(C.sheenColorMapUv),S.push(C.sheenRoughnessMapUv),S.push(C.specularMapUv),S.push(C.specularColorMapUv),S.push(C.specularIntensityMapUv),S.push(C.transmissionMapUv),S.push(C.thicknessMapUv),S.push(C.combine),S.push(C.fogExp2),S.push(C.sizeAttenuation),S.push(C.morphTargetsCount),S.push(C.morphAttributeCount),S.push(C.numDirLights),S.push(C.numPointLights),S.push(C.numSpotLights),S.push(C.numSpotLightMaps),S.push(C.numHemiLights),S.push(C.numRectAreaLights),S.push(C.numDirLightShadows),S.push(C.numPointLightShadows),S.push(C.numSpotLightShadows),S.push(C.numSpotLightShadowsWithMaps),S.push(C.numLightProbes),S.push(C.shadowMapType),S.push(C.toneMapping),S.push(C.numClippingPlanes),S.push(C.numClipIntersection),S.push(C.depthPacking)}function b(S,C){o.disableAll(),C.isWebGL2&&o.enable(0),C.supportsVertexTextures&&o.enable(1),C.instancing&&o.enable(2),C.instancingColor&&o.enable(3),C.instancingMorph&&o.enable(4),C.matcap&&o.enable(5),C.envMap&&o.enable(6),C.normalMapObjectSpace&&o.enable(7),C.normalMapTangentSpace&&o.enable(8),C.clearcoat&&o.enable(9),C.iridescence&&o.enable(10),C.alphaTest&&o.enable(11),C.vertexColors&&o.enable(12),C.vertexAlphas&&o.enable(13),C.vertexUv1s&&o.enable(14),C.vertexUv2s&&o.enable(15),C.vertexUv3s&&o.enable(16),C.vertexTangents&&o.enable(17),C.anisotropy&&o.enable(18),C.alphaHash&&o.enable(19),C.batching&&o.enable(20),S.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.skinning&&o.enable(4),C.morphTargets&&o.enable(5),C.morphNormals&&o.enable(6),C.morphColors&&o.enable(7),C.premultipliedAlpha&&o.enable(8),C.shadowMapEnabled&&o.enable(9),C.useLegacyLights&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.alphaToCoverage&&o.enable(20),S.push(o.mask)}function w(S){const C=_[S.type];let U;if(C){const N=Gi[C];U=Bi.clone(N.uniforms)}else U=S.uniforms;return U}function T(S,C){let U;for(let N=0,D=u.length;N<D;N++){const k=u[N];if(k.cacheKey===C){U=k,++U.usedTimes;break}}return U===void 0&&(U=new ug(r,C,S,n),u.push(U)),U}function M(S){if(--S.usedTimes===0){const C=u.indexOf(S);u[C]=u[u.length-1],u.pop(),S.destroy()}}function E(S){l.remove(S)}function O(){l.dispose()}return{getParameters:p,getProgramCacheKey:x,getUniforms:w,acquireProgram:T,releaseProgram:M,releaseShaderCache:E,programs:u,dispose:O}}function mg(){let r=new WeakMap;function e(n){let s=r.get(n);return s===void 0&&(s={},r.set(n,s)),s}function t(n){r.delete(n)}function i(n,s,o){r.get(n)[s]=o}function a(){r=new WeakMap}return{get:e,remove:t,update:i,dispose:a}}function gg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function nu(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ou(){const r=[];let e=0;const t=[],i=[],a=[];function n(){e=0,t.length=0,i.length=0,a.length=0}function s(h,d,f,g,_,m){let p=r[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},r[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,d,f,g,_,m){const p=s(h,d,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?a.push(p):t.push(p)}function l(h,d,f,g,_,m){const p=s(h,d,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?a.unshift(p):t.unshift(p)}function c(h,d){t.length>1&&t.sort(h||gg),i.length>1&&i.sort(d||nu),a.length>1&&a.sort(d||nu)}function u(){for(let h=e,d=r.length;h<d;h++){const f=r[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:a,init:n,push:o,unshift:l,finish:u,sort:c}}function vg(){let r=new WeakMap;function e(i,a){const n=r.get(i);let s;return n===void 0?(s=new ou,r.set(i,[s])):a>=n.length?(s=new ou,n.push(s)):s=n[a],s}function t(){r=new WeakMap}return{get:e,dispose:t}}function _g(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new ae,color:new he};break;case"SpotLight":t={position:new ae,direction:new ae,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ae,color:new he,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ae,skyColor:new he,groundColor:new he};break;case"RectAreaLight":t={color:new he,position:new ae,halfWidth:new ae,halfHeight:new ae};break}return r[e.id]=t,t}}}function xg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let yg=0;function bg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Sg(r,e){const t=new _g,i=xg(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)a.probe.push(new ae);const n=new ae,s=new ft,o=new ft;function l(u,h){let d=0,f=0,g=0;for(let U=0;U<9;U++)a.probe[U].set(0,0,0);let _=0,m=0,p=0,x=0,v=0,b=0,w=0,T=0,M=0,E=0,O=0;u.sort(bg);const S=h===!0?Math.PI:1;for(let U=0,N=u.length;U<N;U++){const D=u[U],k=D.color,F=D.intensity,X=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=k.r*F*S,f+=k.g*F*S,g+=k.b*F*S;else if(D.isLightProbe){for(let z=0;z<9;z++)a.probe[z].addScaledVector(D.sh.coefficients[z],F);O++}else if(D.isDirectionalLight){const z=t.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity*S),D.castShadow){const q=D.shadow,y=i.get(D);y.shadowBias=q.bias,y.shadowNormalBias=q.normalBias,y.shadowRadius=q.radius,y.shadowMapSize=q.mapSize,a.directionalShadow[_]=y,a.directionalShadowMap[_]=Y,a.directionalShadowMatrix[_]=D.shadow.matrix,b++}a.directional[_]=z,_++}else if(D.isSpotLight){const z=t.get(D);z.position.setFromMatrixPosition(D.matrixWorld),z.color.copy(k).multiplyScalar(F*S),z.distance=X,z.coneCos=Math.cos(D.angle),z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),z.decay=D.decay,a.spot[p]=z;const q=D.shadow;if(D.map&&(a.spotLightMap[M]=D.map,M++,q.updateMatrices(D),D.castShadow&&E++),a.spotLightMatrix[p]=q.matrix,D.castShadow){const y=i.get(D);y.shadowBias=q.bias,y.shadowNormalBias=q.normalBias,y.shadowRadius=q.radius,y.shadowMapSize=q.mapSize,a.spotShadow[p]=y,a.spotShadowMap[p]=Y,T++}p++}else if(D.isRectAreaLight){const z=t.get(D);z.color.copy(k).multiplyScalar(F),z.halfWidth.set(D.width*.5,0,0),z.halfHeight.set(0,D.height*.5,0),a.rectArea[x]=z,x++}else if(D.isPointLight){const z=t.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity*S),z.distance=D.distance,z.decay=D.decay,D.castShadow){const q=D.shadow,y=i.get(D);y.shadowBias=q.bias,y.shadowNormalBias=q.normalBias,y.shadowRadius=q.radius,y.shadowMapSize=q.mapSize,y.shadowCameraNear=q.camera.near,y.shadowCameraFar=q.camera.far,a.pointShadow[m]=y,a.pointShadowMap[m]=Y,a.pointShadowMatrix[m]=D.shadow.matrix,w++}a.point[m]=z,m++}else if(D.isHemisphereLight){const z=t.get(D);z.skyColor.copy(D.color).multiplyScalar(F*S),z.groundColor.copy(D.groundColor).multiplyScalar(F*S),a.hemi[v]=z,v++}}x>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Ie.LTC_FLOAT_1,a.rectAreaLTC2=Ie.LTC_FLOAT_2):(a.rectAreaLTC1=Ie.LTC_HALF_1,a.rectAreaLTC2=Ie.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Ie.LTC_FLOAT_1,a.rectAreaLTC2=Ie.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(a.rectAreaLTC1=Ie.LTC_HALF_1,a.rectAreaLTC2=Ie.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),a.ambient[0]=d,a.ambient[1]=f,a.ambient[2]=g;const C=a.hash;(C.directionalLength!==_||C.pointLength!==m||C.spotLength!==p||C.rectAreaLength!==x||C.hemiLength!==v||C.numDirectionalShadows!==b||C.numPointShadows!==w||C.numSpotShadows!==T||C.numSpotMaps!==M||C.numLightProbes!==O)&&(a.directional.length=_,a.spot.length=p,a.rectArea.length=x,a.point.length=m,a.hemi.length=v,a.directionalShadow.length=b,a.directionalShadowMap.length=b,a.pointShadow.length=w,a.pointShadowMap.length=w,a.spotShadow.length=T,a.spotShadowMap.length=T,a.directionalShadowMatrix.length=b,a.pointShadowMatrix.length=w,a.spotLightMatrix.length=T+M-E,a.spotLightMap.length=M,a.numSpotLightShadowsWithMaps=E,a.numLightProbes=O,C.directionalLength=_,C.pointLength=m,C.spotLength=p,C.rectAreaLength=x,C.hemiLength=v,C.numDirectionalShadows=b,C.numPointShadows=w,C.numSpotShadows=T,C.numSpotMaps=M,C.numLightProbes=O,a.version=yg++)}function c(u,h){let d=0,f=0,g=0,_=0,m=0;const p=h.matrixWorldInverse;for(let x=0,v=u.length;x<v;x++){const b=u[x];if(b.isDirectionalLight){const w=a.directional[d];w.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(n),w.direction.transformDirection(p),d++}else if(b.isSpotLight){const w=a.spot[g];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(n),w.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const w=a.rectArea[_];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),o.identity(),s.copy(b.matrixWorld),s.premultiply(p),o.extractRotation(s),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const w=a.point[f];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const w=a.hemi[m];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:a}}function su(r,e){const t=new Sg(r,e),i=[],a=[];function n(){i.length=0,a.length=0}function s(u){i.push(u)}function o(u){a.push(u)}function l(u){t.setup(i,u)}function c(u){t.setupView(i,u)}return{init:n,state:{lightsArray:i,shadowsArray:a,lights:t},setupLights:l,setupLightsView:c,pushLight:s,pushShadow:o}}function Mg(r,e){let t=new WeakMap;function i(n,s=0){const o=t.get(n);let l;return o===void 0?(l=new su(r,e),t.set(n,[l])):s>=o.length?(l=new su(r,e),o.push(l)):l=o[s],l}function a(){t=new WeakMap}return{get:i,dispose:a}}class lu extends vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cu extends vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Eg(r,e,t){let i=new Uc;const a=new Ue,n=new Ue,s=new Rt,o=new lu({depthPacking:3201}),l=new cu,c={},u=t.maxTextureSize,h={0:1,1:0,2:2},d=new He({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:wg,fragmentShader:Tg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new yi;g.setAttribute("position",new li(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Xe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let p=this.type;this.render=function(T,M,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const O=r.getRenderTarget(),S=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),U=r.state;U.setBlending(0),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const N=p!==3&&this.type===3,D=p===3&&this.type!==3;for(let k=0,F=T.length;k<F;k++){const X=T[k],Y=X.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;a.copy(Y.mapSize);const z=Y.getFrameExtents();if(a.multiply(z),n.copy(Y.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(n.x=Math.floor(u/z.x),a.x=n.x*z.x,Y.mapSize.x=n.x),a.y>u&&(n.y=Math.floor(u/z.y),a.y=n.y*z.y,Y.mapSize.y=n.y)),Y.map===null||N===!0||D===!0){const y=this.type!==3?{minFilter:1003,magFilter:1003}:{};Y.map!==null&&Y.map.dispose(),Y.map=new bt(a.x,a.y,y),Y.map.texture.name=X.name+".shadowMap",Y.camera.updateProjectionMatrix()}r.setRenderTarget(Y.map),r.clear();const q=Y.getViewportCount();for(let y=0;y<q;y++){const B=Y.getViewport(y);s.set(n.x*B.x,n.y*B.y,n.x*B.z,n.y*B.w),U.viewport(s),Y.updateMatrices(X,y),i=Y.getFrustum(),b(M,E,Y.camera,X,this.type)}Y.isPointLightShadow!==!0&&this.type===3&&x(Y,E),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(O,S,C)};function x(T,M){const E=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new bt(a.x,a.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(M,null,E,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(M,null,E,f,_,null)}function v(T,M,E,O){let S=null;const C=E.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)S=C;else if(S=E.isPointLight===!0?l:o,r.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const U=S.uuid,N=M.uuid;let D=c[U];D===void 0&&(D={},c[U]=D);let k=D[N];k===void 0&&(k=S.clone(),D[N]=k,M.addEventListener("dispose",w)),S=k}if(S.visible=M.visible,S.wireframe=M.wireframe,O===3?S.side=M.shadowSide!==null?M.shadowSide:M.side:S.side=M.shadowSide!==null?M.shadowSide:h[M.side],S.alphaMap=M.alphaMap,S.alphaTest=M.alphaTest,S.map=M.map,S.clipShadows=M.clipShadows,S.clippingPlanes=M.clippingPlanes,S.clipIntersection=M.clipIntersection,S.displacementMap=M.displacementMap,S.displacementScale=M.displacementScale,S.displacementBias=M.displacementBias,S.wireframeLinewidth=M.wireframeLinewidth,S.linewidth=M.linewidth,E.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=r.properties.get(S);U.light=E}return S}function b(T,M,E,O,S){if(T.visible===!1)return;if(T.layers.test(M.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===3)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,T.matrixWorld);const U=e.update(T),N=T.material;if(Array.isArray(N)){const D=U.groups;for(let k=0,F=D.length;k<F;k++){const X=D[k],Y=N[X.materialIndex];if(Y&&Y.visible){const z=v(T,Y,O,S);T.onBeforeShadow(r,T,M,E,U,z,X),r.renderBufferDirect(E,null,U,z,T,X),T.onAfterShadow(r,T,M,E,U,z,X)}}}else if(N.visible){const D=v(T,N,O,S);T.onBeforeShadow(r,T,M,E,U,D,null),r.renderBufferDirect(E,null,U,D,T,null),T.onAfterShadow(r,T,M,E,U,D,null)}}const C=T.children;for(let U=0,N=C.length;U<N;U++)b(C[U],M,E,O,S)}function w(T){T.target.removeEventListener("dispose",w);for(const M in c){const E=c[M],O=T.target.uuid;O in E&&(E[O].dispose(),delete E[O])}}}function Ag(r,e,t){const i=t.isWebGL2;function a(){let j=!1;const _e=new Rt;let Z=null;const Te=new Rt(0,0,0,0);return{setMask:function(be){Z!==be&&!j&&(r.colorMask(be,be,be,be),Z=be)},setLocked:function(be){j=be},setClear:function(be,Fe,ke,tt,rt){rt===!0&&(be*=tt,Fe*=tt,ke*=tt),_e.set(be,Fe,ke,tt),Te.equals(_e)===!1&&(r.clearColor(be,Fe,ke,tt),Te.copy(_e))},reset:function(){j=!1,Z=null,Te.set(-1,0,0,0)}}}function n(){let j=!1,_e=null,Z=null,Te=null;return{setTest:function(be){be?le(r.DEPTH_TEST):Me(r.DEPTH_TEST)},setMask:function(be){_e!==be&&!j&&(r.depthMask(be),_e=be)},setFunc:function(be){if(Z!==be){switch(be){case 0:r.depthFunc(r.NEVER);break;case 1:r.depthFunc(r.ALWAYS);break;case 2:r.depthFunc(r.LESS);break;case 3:r.depthFunc(r.LEQUAL);break;case 4:r.depthFunc(r.EQUAL);break;case 5:r.depthFunc(r.GEQUAL);break;case 6:r.depthFunc(r.GREATER);break;case 7:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Z=be}},setLocked:function(be){j=be},setClear:function(be){Te!==be&&(r.clearDepth(be),Te=be)},reset:function(){j=!1,_e=null,Z=null,Te=null}}}function s(){let j=!1,_e=null,Z=null,Te=null,be=null,Fe=null,ke=null,tt=null,rt=null;return{setTest:function(Ve){j||(Ve?le(r.STENCIL_TEST):Me(r.STENCIL_TEST))},setMask:function(Ve){_e!==Ve&&!j&&(r.stencilMask(Ve),_e=Ve)},setFunc:function(Ve,ut,Ct){(Z!==Ve||Te!==ut||be!==Ct)&&(r.stencilFunc(Ve,ut,Ct),Z=Ve,Te=ut,be=Ct)},setOp:function(Ve,ut,Ct){(Fe!==Ve||ke!==ut||tt!==Ct)&&(r.stencilOp(Ve,ut,Ct),Fe=Ve,ke=ut,tt=Ct)},setLocked:function(Ve){j=Ve},setClear:function(Ve){rt!==Ve&&(r.clearStencil(Ve),rt=Ve)},reset:function(){j=!1,_e=null,Z=null,Te=null,be=null,Fe=null,ke=null,tt=null,rt=null}}}const o=new a,l=new n,c=new s,u=new WeakMap,h=new WeakMap;let d={},f={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,b=null,w=null,T=null,M=null,E=null,O=new he(0,0,0),S=0,C=!1,U=null,N=null,D=null,k=null,F=null;const X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,z=0;const q=r.getParameter(r.VERSION);q.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(q)[1]),Y=z>=1):q.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),Y=z>=2);let y=null,B={};const W=r.getParameter(r.SCISSOR_BOX),I=r.getParameter(r.VIEWPORT),V=new Rt().fromArray(W),Q=new Rt().fromArray(I);function ee(j,_e,Z,Te){const be=new Uint8Array(4),Fe=r.createTexture();r.bindTexture(j,Fe),r.texParameteri(j,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(j,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ke=0;ke<Z;ke++)i&&(j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY)?r.texImage3D(_e,0,r.RGBA,1,1,Te,0,r.RGBA,r.UNSIGNED_BYTE,be):r.texImage2D(_e+ke,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,be);return Fe}const ie={};ie[r.TEXTURE_2D]=ee(r.TEXTURE_2D,r.TEXTURE_2D,1),ie[r.TEXTURE_CUBE_MAP]=ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ie[r.TEXTURE_2D_ARRAY]=ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ie[r.TEXTURE_3D]=ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),le(r.DEPTH_TEST),l.setFunc(3),oe(!1),ge(1),le(r.CULL_FACE),ue(0);function le(j){d[j]!==!0&&(r.enable(j),d[j]=!0)}function Me(j){d[j]!==!1&&(r.disable(j),d[j]=!1)}function K(j,_e){return f[j]!==_e?(r.bindFramebuffer(j,_e),f[j]=_e,i&&(j===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=_e),j===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=_e)),!0):!1}function L(j,_e){let Z=_,Te=!1;if(j){Z=g.get(_e),Z===void 0&&(Z=[],g.set(_e,Z));const be=j.textures;if(Z.length!==be.length||Z[0]!==r.COLOR_ATTACHMENT0){for(let Fe=0,ke=be.length;Fe<ke;Fe++)Z[Fe]=r.COLOR_ATTACHMENT0+Fe;Z.length=be.length,Te=!0}}else Z[0]!==r.BACK&&(Z[0]=r.BACK,Te=!0);if(Te)if(t.isWebGL2)r.drawBuffers(Z);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Z);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function Ae(j){return m!==j?(r.useProgram(j),m=j,!0):!1}const me={100:r.FUNC_ADD,101:r.FUNC_SUBTRACT,102:r.FUNC_REVERSE_SUBTRACT};if(i)me[103]=r.MIN,me[104]=r.MAX;else{const j=e.get("EXT_blend_minmax");j!==null&&(me[103]=j.MIN_EXT,me[104]=j.MAX_EXT)}const pe={200:r.ZERO,201:r.ONE,202:r.SRC_COLOR,204:r.SRC_ALPHA,210:r.SRC_ALPHA_SATURATE,208:r.DST_COLOR,206:r.DST_ALPHA,203:r.ONE_MINUS_SRC_COLOR,205:r.ONE_MINUS_SRC_ALPHA,209:r.ONE_MINUS_DST_COLOR,207:r.ONE_MINUS_DST_ALPHA,211:r.CONSTANT_COLOR,212:r.ONE_MINUS_CONSTANT_COLOR,213:r.CONSTANT_ALPHA,214:r.ONE_MINUS_CONSTANT_ALPHA};function ue(j,_e,Z,Te,be,Fe,ke,tt,rt,Ve){if(j===0){p===!0&&(Me(r.BLEND),p=!1);return}if(p===!1&&(le(r.BLEND),p=!0),j!==5){if(j!==x||Ve!==C){if((v!==100||T!==100)&&(r.blendEquation(r.FUNC_ADD),v=100,T=100),Ve)switch(j){case 1:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case 2:r.blendFunc(r.ONE,r.ONE);break;case 3:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case 4:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}else switch(j){case 1:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case 2:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case 3:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case 4:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}b=null,w=null,M=null,E=null,O.set(0,0,0),S=0,x=j,C=Ve}return}be=be||_e,Fe=Fe||Z,ke=ke||Te,(_e!==v||be!==T)&&(r.blendEquationSeparate(me[_e],me[be]),v=_e,T=be),(Z!==b||Te!==w||Fe!==M||ke!==E)&&(r.blendFuncSeparate(pe[Z],pe[Te],pe[Fe],pe[ke]),b=Z,w=Te,M=Fe,E=ke),(tt.equals(O)===!1||rt!==S)&&(r.blendColor(tt.r,tt.g,tt.b,rt),O.copy(tt),S=rt),x=j,C=!1}function Se(j,_e){j.side===2?Me(r.CULL_FACE):le(r.CULL_FACE);let Z=j.side===1;_e&&(Z=!Z),oe(Z),j.blending===1&&j.transparent===!1?ue(0):ue(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),l.setFunc(j.depthFunc),l.setTest(j.depthTest),l.setMask(j.depthWrite),o.setMask(j.colorWrite);const Te=j.stencilWrite;c.setTest(Te),Te&&(c.setMask(j.stencilWriteMask),c.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),c.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),R(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?le(r.SAMPLE_ALPHA_TO_COVERAGE):Me(r.SAMPLE_ALPHA_TO_COVERAGE)}function oe(j){U!==j&&(j?r.frontFace(r.CW):r.frontFace(r.CCW),U=j)}function ge(j){j!==0?(le(r.CULL_FACE),j!==N&&(j===1?r.cullFace(r.BACK):j===2?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Me(r.CULL_FACE),N=j}function ye(j){j!==D&&(Y&&r.lineWidth(j),D=j)}function R(j,_e,Z){j?(le(r.POLYGON_OFFSET_FILL),(k!==_e||F!==Z)&&(r.polygonOffset(_e,Z),k=_e,F=Z)):Me(r.POLYGON_OFFSET_FILL)}function A(j){j?le(r.SCISSOR_TEST):Me(r.SCISSOR_TEST)}function H(j){j===void 0&&(j=r.TEXTURE0+X-1),y!==j&&(r.activeTexture(j),y=j)}function G(j,_e,Z){Z===void 0&&(y===null?Z=r.TEXTURE0+X-1:Z=y);let Te=B[Z];Te===void 0&&(Te={type:void 0,texture:void 0},B[Z]=Te),(Te.type!==j||Te.texture!==_e)&&(y!==Z&&(r.activeTexture(Z),y=Z),r.bindTexture(j,_e||ie[j]),Te.type=j,Te.texture=_e)}function te(){const j=B[y];j!==void 0&&j.type!==void 0&&(r.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function J(){try{r.compressedTexImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ce(){try{r.compressedTexImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function fe(){try{r.texSubImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ce(){try{r.texSubImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ve(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ne(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function de(){try{r.texStorage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function qe(){try{r.texStorage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Ee(){try{r.texImage2D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function we(){try{r.texImage3D.apply(r,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Pe(j){V.equals(j)===!1&&(r.scissor(j.x,j.y,j.z,j.w),V.copy(j))}function De(j){Q.equals(j)===!1&&(r.viewport(j.x,j.y,j.z,j.w),Q.copy(j))}function Be(j,_e){let Z=h.get(_e);Z===void 0&&(Z=new WeakMap,h.set(_e,Z));let Te=Z.get(j);Te===void 0&&(Te=r.getUniformBlockIndex(_e,j.name),Z.set(j,Te))}function Re(j,_e){const Z=h.get(_e).get(j);u.get(_e)!==Z&&(r.uniformBlockBinding(_e,Z,j.__bindingPointIndex),u.set(_e,Z))}function Oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),i===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},y=null,B={},f={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,b=null,w=null,T=null,M=null,E=null,O=new he(0,0,0),S=0,C=!1,U=null,N=null,D=null,k=null,F=null,V.set(0,0,r.canvas.width,r.canvas.height),Q.set(0,0,r.canvas.width,r.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:le,disable:Me,bindFramebuffer:K,drawBuffers:L,useProgram:Ae,setBlending:ue,setMaterial:Se,setFlipSided:oe,setCullFace:ge,setLineWidth:ye,setPolygonOffset:R,setScissorTest:A,activeTexture:H,bindTexture:G,unbindTexture:te,compressedTexImage2D:J,compressedTexImage3D:Ce,texImage2D:Ee,texImage3D:we,updateUBOMapping:Be,uniformBlockBinding:Re,texStorage2D:de,texStorage3D:qe,texSubImage2D:fe,texSubImage3D:ce,compressedTexSubImage2D:ve,compressedTexSubImage3D:Ne,scissor:Pe,viewport:De,reset:Oe}}function Rg(r,e,t,i,a,n,s){const o=a.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Ue,h=new WeakMap;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,A){return g?new OffscreenCanvas(R,A):dn("canvas")}function m(R,A,H,G){let te=1;const J=ye(R);if((J.width>G||J.height>G)&&(te=G/Math.max(J.width,J.height)),te<1||A===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Ce=A?$n:Math.floor,fe=Ce(te*J.width),ce=Ce(te*J.height);d===void 0&&(d=_(fe,ce));const ve=H?_(fe,ce):d;return ve.width=fe,ve.height=ce,ve.getContext("2d").drawImage(R,0,0,fe,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+fe+"x"+ce+")."),ve}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function p(R){const A=ye(R);return us(A.width)&&us(A.height)}function x(R){return o?!1:R.wrapS!==1001||R.wrapT!==1001||R.minFilter!==1003&&R.minFilter!==1006}function v(R,A){return R.generateMipmaps&&A&&R.minFilter!==1003&&R.minFilter!==1006}function b(R){r.generateMipmap(R)}function w(R,A,H,G,te=!1){if(o===!1)return A;if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let J=A;if(A===r.RED&&(H===r.FLOAT&&(J=r.R32F),H===r.HALF_FLOAT&&(J=r.R16F),H===r.UNSIGNED_BYTE&&(J=r.R8)),A===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.R8UI),H===r.UNSIGNED_SHORT&&(J=r.R16UI),H===r.UNSIGNED_INT&&(J=r.R32UI),H===r.BYTE&&(J=r.R8I),H===r.SHORT&&(J=r.R16I),H===r.INT&&(J=r.R32I)),A===r.RG&&(H===r.FLOAT&&(J=r.RG32F),H===r.HALF_FLOAT&&(J=r.RG16F),H===r.UNSIGNED_BYTE&&(J=r.RG8)),A===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(J=r.RG8UI),H===r.UNSIGNED_SHORT&&(J=r.RG16UI),H===r.UNSIGNED_INT&&(J=r.RG32UI),H===r.BYTE&&(J=r.RG8I),H===r.SHORT&&(J=r.RG16I),H===r.INT&&(J=r.RG32I)),A===r.RGBA){const Ce=te?Zn:at.getTransfer(G);H===r.FLOAT&&(J=r.RGBA32F),H===r.HALF_FLOAT&&(J=r.RGBA16F),H===r.UNSIGNED_BYTE&&(J=Ce===ht?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function T(R,A,H){return v(R,H)===!0||R.isFramebufferTexture&&R.minFilter!==1003&&R.minFilter!==1006?Math.log2(Math.max(A.width,A.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?A.mipmaps.length:1}function M(R){return R===1003||R===1004||R===1005?r.NEAREST:r.LINEAR}function E(R){const A=R.target;A.removeEventListener("dispose",E),S(A),A.isVideoTexture&&h.delete(A)}function O(R){const A=R.target;A.removeEventListener("dispose",O),U(A)}function S(R){const A=i.get(R);if(A.__webglInit===void 0)return;const H=R.source,G=f.get(H);if(G){const te=G[A.__cacheKey];te.usedTimes--,te.usedTimes===0&&C(R),Object.keys(G).length===0&&f.delete(H)}i.remove(R)}function C(R){const A=i.get(R);r.deleteTexture(A.__webglTexture);const H=R.source,G=f.get(H);delete G[A.__cacheKey],s.memory.textures--}function U(R){const A=i.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(A.__webglFramebuffer[G]))for(let te=0;te<A.__webglFramebuffer[G].length;te++)r.deleteFramebuffer(A.__webglFramebuffer[G][te]);else r.deleteFramebuffer(A.__webglFramebuffer[G]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[G])}else{if(Array.isArray(A.__webglFramebuffer))for(let G=0;G<A.__webglFramebuffer.length;G++)r.deleteFramebuffer(A.__webglFramebuffer[G]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let G=0;G<A.__webglColorRenderbuffer.length;G++)A.__webglColorRenderbuffer[G]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[G]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const H=R.textures;for(let G=0,te=H.length;G<te;G++){const J=i.get(H[G]);J.__webglTexture&&(r.deleteTexture(J.__webglTexture),s.memory.textures--),i.remove(H[G])}i.remove(R)}let N=0;function D(){N=0}function k(){const R=N;return R>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+a.maxTextures),N+=1,R}function F(R){const A=[];return A.push(R.wrapS),A.push(R.wrapT),A.push(R.wrapR||0),A.push(R.magFilter),A.push(R.minFilter),A.push(R.anisotropy),A.push(R.internalFormat),A.push(R.format),A.push(R.type),A.push(R.generateMipmaps),A.push(R.premultiplyAlpha),A.push(R.flipY),A.push(R.unpackAlignment),A.push(R.colorSpace),A.join()}function X(R,A){const H=i.get(R);if(R.isVideoTexture&&oe(R),R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){const G=R.image;if(G===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(H,R,A);return}}t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+A)}function Y(R,A){const H=i.get(R);if(R.version>0&&H.__version!==R.version){Q(H,R,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+A)}function z(R,A){const H=i.get(R);if(R.version>0&&H.__version!==R.version){Q(H,R,A);return}t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+A)}function q(R,A){const H=i.get(R);if(R.version>0&&H.__version!==R.version){ee(H,R,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+A)}const y={1e3:r.REPEAT,1001:r.CLAMP_TO_EDGE,1002:r.MIRRORED_REPEAT},B={1003:r.NEAREST,1004:r.NEAREST_MIPMAP_NEAREST,1005:r.NEAREST_MIPMAP_LINEAR,1006:r.LINEAR,1007:r.LINEAR_MIPMAP_NEAREST,1008:r.LINEAR_MIPMAP_LINEAR},W={512:r.NEVER,519:r.ALWAYS,513:r.LESS,515:r.LEQUAL,514:r.EQUAL,518:r.GEQUAL,516:r.GREATER,517:r.NOTEQUAL};function I(R,A,H){if(A.type===1015&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===1006||A.magFilter===1007||A.magFilter===1005||A.magFilter===1008||A.minFilter===1006||A.minFilter===1007||A.minFilter===1005||A.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),H?(r.texParameteri(R,r.TEXTURE_WRAP_S,y[A.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,y[A.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,y[A.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,B[A.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,B[A.minFilter])):(r.texParameteri(R,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(R,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(A.wrapS!==1001||A.wrapT!==1001)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(R,r.TEXTURE_MAG_FILTER,M(A.magFilter)),r.texParameteri(R,r.TEXTURE_MIN_FILTER,M(A.minFilter)),A.minFilter!==1003&&A.minFilter!==1006&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,W[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===1003||A.minFilter!==1005&&A.minFilter!==1008||A.type===1015&&e.has("OES_texture_float_linear")===!1||o===!1&&A.type===1016&&e.has("OES_texture_half_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,a.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function V(R,A){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,A.addEventListener("dispose",E));const G=A.source;let te=f.get(G);te===void 0&&(te={},f.set(G,te));const J=F(A);if(J!==R.__cacheKey){te[J]===void 0&&(te[J]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,H=!0),te[J].usedTimes++;const Ce=te[R.__cacheKey];Ce!==void 0&&(te[R.__cacheKey].usedTimes--,Ce.usedTimes===0&&C(A)),R.__cacheKey=J,R.__webglTexture=te[J].texture}return H}function Q(R,A,H){let G=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(G=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(G=r.TEXTURE_3D);const te=V(R,A),J=A.source;t.bindTexture(G,R.__webglTexture,r.TEXTURE0+H);const Ce=i.get(J);if(J.version!==Ce.__version||te===!0){t.activeTexture(r.TEXTURE0+H);const fe=at.getPrimaries(at.workingColorSpace),ce=A.colorSpace===""?null:at.getPrimaries(A.colorSpace),ve=A.colorSpace===""||fe===ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ne=x(A)&&p(A.image)===!1;let de=m(A.image,Ne,!1,a.maxTextureSize);de=ge(A,de);const qe=p(de)||o,Ee=n.convert(A.format,A.colorSpace);let we=n.convert(A.type),Pe=w(A.internalFormat,Ee,we,A.colorSpace,A.isVideoTexture);I(G,A,qe);let De;const Be=A.mipmaps,Re=o&&A.isVideoTexture!==!0&&Pe!==36196,Oe=Ce.__version===void 0||te===!0,j=J.dataReady,_e=T(A,de,qe);if(A.isDepthTexture)Pe=r.DEPTH_COMPONENT,o?A.type===1015?Pe=r.DEPTH_COMPONENT32F:A.type===1014?Pe=r.DEPTH_COMPONENT24:A.type===1020?Pe=r.DEPTH24_STENCIL8:Pe=r.DEPTH_COMPONENT16:A.type===1015&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===1026&&Pe===r.DEPTH_COMPONENT&&A.type!==1012&&A.type!==1014&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=1014,we=n.convert(A.type)),A.format===1027&&Pe===r.DEPTH_COMPONENT&&(Pe=r.DEPTH_STENCIL,A.type!==1020&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=1020,we=n.convert(A.type))),Oe&&(Re?t.texStorage2D(r.TEXTURE_2D,1,Pe,de.width,de.height):t.texImage2D(r.TEXTURE_2D,0,Pe,de.width,de.height,0,Ee,we,null));else if(A.isDataTexture)if(Be.length>0&&qe){Re&&Oe&&t.texStorage2D(r.TEXTURE_2D,_e,Pe,Be[0].width,Be[0].height);for(let Z=0,Te=Be.length;Z<Te;Z++)De=Be[Z],Re?j&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,De.width,De.height,Ee,we,De.data):t.texImage2D(r.TEXTURE_2D,Z,Pe,De.width,De.height,0,Ee,we,De.data);A.generateMipmaps=!1}else Re?(Oe&&t.texStorage2D(r.TEXTURE_2D,_e,Pe,de.width,de.height),j&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,de.width,de.height,Ee,we,de.data)):t.texImage2D(r.TEXTURE_2D,0,Pe,de.width,de.height,0,Ee,we,de.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Re&&Oe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Pe,Be[0].width,Be[0].height,de.depth);for(let Z=0,Te=Be.length;Z<Te;Z++)De=Be[Z],A.format!==1023?Ee!==null?Re?j&&t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,De.width,De.height,de.depth,Ee,De.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Z,Pe,De.width,De.height,de.depth,0,De.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?j&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,De.width,De.height,de.depth,Ee,we,De.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Z,Pe,De.width,De.height,de.depth,0,Ee,we,De.data)}else{Re&&Oe&&t.texStorage2D(r.TEXTURE_2D,_e,Pe,Be[0].width,Be[0].height);for(let Z=0,Te=Be.length;Z<Te;Z++)De=Be[Z],A.format!==1023?Ee!==null?Re?j&&t.compressedTexSubImage2D(r.TEXTURE_2D,Z,0,0,De.width,De.height,Ee,De.data):t.compressedTexImage2D(r.TEXTURE_2D,Z,Pe,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?j&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,De.width,De.height,Ee,we,De.data):t.texImage2D(r.TEXTURE_2D,Z,Pe,De.width,De.height,0,Ee,we,De.data)}else if(A.isDataArrayTexture)Re?(Oe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Pe,de.width,de.height,de.depth),j&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,Ee,we,de.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,Pe,de.width,de.height,de.depth,0,Ee,we,de.data);else if(A.isData3DTexture)Re?(Oe&&t.texStorage3D(r.TEXTURE_3D,_e,Pe,de.width,de.height,de.depth),j&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,Ee,we,de.data)):t.texImage3D(r.TEXTURE_3D,0,Pe,de.width,de.height,de.depth,0,Ee,we,de.data);else if(A.isFramebufferTexture){if(Oe)if(Re)t.texStorage2D(r.TEXTURE_2D,_e,Pe,de.width,de.height);else{let Z=de.width,Te=de.height;for(let be=0;be<_e;be++)t.texImage2D(r.TEXTURE_2D,be,Pe,Z,Te,0,Ee,we,null),Z>>=1,Te>>=1}}else if(Be.length>0&&qe){if(Re&&Oe){const Z=ye(Be[0]);t.texStorage2D(r.TEXTURE_2D,_e,Pe,Z.width,Z.height)}for(let Z=0,Te=Be.length;Z<Te;Z++)De=Be[Z],Re?j&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,Ee,we,De):t.texImage2D(r.TEXTURE_2D,Z,Pe,Ee,we,De);A.generateMipmaps=!1}else if(Re){if(Oe){const Z=ye(de);t.texStorage2D(r.TEXTURE_2D,_e,Pe,Z.width,Z.height)}j&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Ee,we,de)}else t.texImage2D(r.TEXTURE_2D,0,Pe,Ee,we,de);v(A,qe)&&b(G),Ce.__version=J.version,A.onUpdate&&A.onUpdate(A)}R.__version=A.version}function ee(R,A,H){if(A.image.length!==6)return;const G=V(R,A),te=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+H);const J=i.get(te);if(te.version!==J.__version||G===!0){t.activeTexture(r.TEXTURE0+H);const Ce=at.getPrimaries(at.workingColorSpace),fe=A.colorSpace===""?null:at.getPrimaries(A.colorSpace),ce=A.colorSpace===""||Ce===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const ve=A.isCompressedTexture||A.image[0].isCompressedTexture,Ne=A.image[0]&&A.image[0].isDataTexture,de=[];for(let Z=0;Z<6;Z++)!ve&&!Ne?de[Z]=m(A.image[Z],!1,!0,a.maxCubemapSize):de[Z]=Ne?A.image[Z].image:A.image[Z],de[Z]=ge(A,de[Z]);const qe=de[0],Ee=p(qe)||o,we=n.convert(A.format,A.colorSpace),Pe=n.convert(A.type),De=w(A.internalFormat,we,Pe,A.colorSpace),Be=o&&A.isVideoTexture!==!0,Re=J.__version===void 0||G===!0,Oe=te.dataReady;let j=T(A,qe,Ee);I(r.TEXTURE_CUBE_MAP,A,Ee);let _e;if(ve){Be&&Re&&t.texStorage2D(r.TEXTURE_CUBE_MAP,j,De,qe.width,qe.height);for(let Z=0;Z<6;Z++){_e=de[Z].mipmaps;for(let Te=0;Te<_e.length;Te++){const be=_e[Te];A.format!==1023?we!==null?Be?Oe&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Te,0,0,be.width,be.height,we,be.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Te,De,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Te,0,0,be.width,be.height,we,Pe,be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Te,De,be.width,be.height,0,we,Pe,be.data)}}}else{if(_e=A.mipmaps,Be&&Re){_e.length>0&&j++;const Z=ye(de[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,j,De,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(Ne){Be?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,de[Z].width,de[Z].height,we,Pe,de[Z].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,De,de[Z].width,de[Z].height,0,we,Pe,de[Z].data);for(let Te=0;Te<_e.length;Te++){const be=_e[Te].image[Z].image;Be?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Te+1,0,0,be.width,be.height,we,Pe,be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Te+1,De,be.width,be.height,0,we,Pe,be.data)}}else{Be?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,we,Pe,de[Z]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,De,we,Pe,de[Z]);for(let Te=0;Te<_e.length;Te++){const be=_e[Te];Be?Oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Te+1,0,0,we,Pe,be.image[Z]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Te+1,De,we,Pe,be.image[Z])}}}v(A,Ee)&&b(r.TEXTURE_CUBE_MAP),J.__version=te.version,A.onUpdate&&A.onUpdate(A)}R.__version=A.version}function ie(R,A,H,G,te,J){const Ce=n.convert(H.format,H.colorSpace),fe=n.convert(H.type),ce=w(H.internalFormat,Ce,fe,H.colorSpace);if(!i.get(A).__hasExternalTextures){const ve=Math.max(1,A.width>>J),Ne=Math.max(1,A.height>>J);te===r.TEXTURE_3D||te===r.TEXTURE_2D_ARRAY?t.texImage3D(te,J,ce,ve,Ne,A.depth,0,Ce,fe,null):t.texImage2D(te,J,ce,ve,Ne,0,Ce,fe,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),Se(A)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,G,te,i.get(H).__webglTexture,0,ue(A)):(te===r.TEXTURE_2D||te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,G,te,i.get(H).__webglTexture,J),t.bindFramebuffer(r.FRAMEBUFFER,null)}function le(R,A,H){if(r.bindRenderbuffer(r.RENDERBUFFER,R),A.depthBuffer&&!A.stencilBuffer){let G=o===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(H||Se(A)){const te=A.depthTexture;te&&te.isDepthTexture&&(te.type===1015?G=r.DEPTH_COMPONENT32F:te.type===1014&&(G=r.DEPTH_COMPONENT24));const J=ue(A);Se(A)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,J,G,A.width,A.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,J,G,A.width,A.height)}else r.renderbufferStorage(r.RENDERBUFFER,G,A.width,A.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,R)}else if(A.depthBuffer&&A.stencilBuffer){const G=ue(A);H&&Se(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,G,r.DEPTH24_STENCIL8,A.width,A.height):Se(A)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,G,r.DEPTH24_STENCIL8,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,R)}else{const G=A.textures;for(let te=0;te<G.length;te++){const J=G[te],Ce=n.convert(J.format,J.colorSpace),fe=n.convert(J.type),ce=w(J.internalFormat,Ce,fe,J.colorSpace),ve=ue(A);H&&Se(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,ce,A.width,A.height):Se(A)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,ce,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,ce,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Me(R,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),X(A.depthTexture,0);const H=i.get(A.depthTexture).__webglTexture,G=ue(A);if(A.depthTexture.format===1026)Se(A)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,H,0,G):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,H,0);else if(A.depthTexture.format===1027)Se(A)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,H,0,G):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,H,0);else throw new Error("Unknown depthTexture format")}function K(R){const A=i.get(R),H=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!A.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Me(A.__webglFramebuffer,R)}else if(H){A.__webglDepthbuffer=[];for(let G=0;G<6;G++)t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[G]),A.__webglDepthbuffer[G]=r.createRenderbuffer(),le(A.__webglDepthbuffer[G],R,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=r.createRenderbuffer(),le(A.__webglDepthbuffer,R,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function L(R,A,H){const G=i.get(R);A!==void 0&&ie(G.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&K(R)}function Ae(R){const A=R.texture,H=i.get(R),G=i.get(A);R.addEventListener("dispose",O);const te=R.textures,J=R.isWebGLCubeRenderTarget===!0,Ce=te.length>1,fe=p(R)||o;if(Ce||(G.__webglTexture===void 0&&(G.__webglTexture=r.createTexture()),G.__version=A.version,s.memory.textures++),J){H.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(o&&A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer[ce]=[];for(let ve=0;ve<A.mipmaps.length;ve++)H.__webglFramebuffer[ce][ve]=r.createFramebuffer()}else H.__webglFramebuffer[ce]=r.createFramebuffer()}else{if(o&&A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer=[];for(let ce=0;ce<A.mipmaps.length;ce++)H.__webglFramebuffer[ce]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(Ce)if(a.drawBuffers)for(let ce=0,ve=te.length;ce<ve;ce++){const Ne=i.get(te[ce]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=r.createTexture(),s.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&Se(R)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ce=0;ce<te.length;ce++){const ve=te[ce];H.__webglColorRenderbuffer[ce]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[ce]);const Ne=n.convert(ve.format,ve.colorSpace),de=n.convert(ve.type),qe=w(ve.internalFormat,Ne,de,ve.colorSpace,R.isXRRenderTarget===!0),Ee=ue(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ee,qe,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.RENDERBUFFER,H.__webglColorRenderbuffer[ce])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),le(H.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture),I(r.TEXTURE_CUBE_MAP,A,fe);for(let ce=0;ce<6;ce++)if(o&&A.mipmaps&&A.mipmaps.length>0)for(let ve=0;ve<A.mipmaps.length;ve++)ie(H.__webglFramebuffer[ce][ve],R,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ve);else ie(H.__webglFramebuffer[ce],R,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);v(A,fe)&&b(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let ce=0,ve=te.length;ce<ve;ce++){const Ne=te[ce],de=i.get(Ne);t.bindTexture(r.TEXTURE_2D,de.__webglTexture),I(r.TEXTURE_2D,Ne,fe),ie(H.__webglFramebuffer,R,Ne,r.COLOR_ATTACHMENT0+ce,r.TEXTURE_2D,0),v(Ne,fe)&&b(r.TEXTURE_2D)}t.unbindTexture()}else{let ce=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?ce=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,G.__webglTexture),I(ce,A,fe),o&&A.mipmaps&&A.mipmaps.length>0)for(let ve=0;ve<A.mipmaps.length;ve++)ie(H.__webglFramebuffer[ve],R,A,r.COLOR_ATTACHMENT0,ce,ve);else ie(H.__webglFramebuffer,R,A,r.COLOR_ATTACHMENT0,ce,0);v(A,fe)&&b(ce),t.unbindTexture()}R.depthBuffer&&K(R)}function me(R){const A=p(R)||o,H=R.textures;for(let G=0,te=H.length;G<te;G++){const J=H[G];if(v(J,A)){const Ce=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,fe=i.get(J).__webglTexture;t.bindTexture(Ce,fe),b(Ce),t.unbindTexture()}}}function pe(R){if(o&&R.samples>0&&Se(R)===!1){const A=R.textures,H=R.width,G=R.height;let te=r.COLOR_BUFFER_BIT;const J=[],Ce=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=i.get(R),ce=A.length>1;if(ce)for(let ve=0;ve<A.length;ve++)t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let ve=0;ve<A.length;ve++){J.push(r.COLOR_ATTACHMENT0+ve),R.depthBuffer&&J.push(Ce);const Ne=fe.__ignoreDepthValues!==void 0?fe.__ignoreDepthValues:!1;if(Ne===!1&&(R.depthBuffer&&(te|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&(te|=r.STENCIL_BUFFER_BIT)),ce&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,fe.__webglColorRenderbuffer[ve]),Ne===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Ce]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Ce])),ce){const de=i.get(A[ve]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,de,0)}r.blitFramebuffer(0,0,H,G,0,0,H,G,te,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,J)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ce)for(let ve=0;ve<A.length;ve++){t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,fe.__webglColorRenderbuffer[ve]);const Ne=i.get(A[ve]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,Ne,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}}function ue(R){return Math.min(a.maxSamples,R.samples)}function Se(R){const A=i.get(R);return o&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function oe(R){const A=s.render.frame;h.get(R)!==A&&(h.set(R,A),R.update())}function ge(R,A){const H=R.colorSpace,G=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===1035||H!==ur&&H!==""&&(at.getTransfer(H)===ht?o===!1?e.has("EXT_sRGB")===!0&&G===1023?(R.format=1035,R.minFilter=1006,R.generateMipmaps=!1):A=oc.sRGBToLinear(A):(G!==1023||te!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),A}function ye(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(u.width=R.naturalWidth||R.width,u.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(u.width=R.displayWidth,u.height=R.displayHeight):(u.width=R.width,u.height=R.height),u}this.allocateTextureUnit=k,this.resetTextureUnits=D,this.setTexture2D=X,this.setTexture2DArray=Y,this.setTexture3D=z,this.setTextureCube=q,this.rebindTextures=L,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=K,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Se}function Cg(r,e,t){const i=t.isWebGL2;function a(n,s=""){let o;const l=at.getTransfer(s);if(n===1009)return r.UNSIGNED_BYTE;if(n===1017)return r.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return r.UNSIGNED_SHORT_5_5_5_1;if(n===1010)return r.BYTE;if(n===1011)return r.SHORT;if(n===1012)return r.UNSIGNED_SHORT;if(n===1013)return r.INT;if(n===1014)return r.UNSIGNED_INT;if(n===1015)return r.FLOAT;if(n===1016)return i?r.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(n===1021)return r.ALPHA;if(n===1023)return r.RGBA;if(n===1024)return r.LUMINANCE;if(n===1025)return r.LUMINANCE_ALPHA;if(n===1026)return r.DEPTH_COMPONENT;if(n===1027)return r.DEPTH_STENCIL;if(n===1035)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(n===1028)return r.RED;if(n===1029)return r.RED_INTEGER;if(n===1030)return r.RG;if(n===1031)return r.RG_INTEGER;if(n===1033)return r.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(l===ht)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===33776)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===33776)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===35840)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===37492||n===37496)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===37492)return l===ht?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===37496)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===37808)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return l===ht?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===36492)return l===ht?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===36492)return o.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?i?r.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[n]!==void 0?r[n]:null}return{convert:a}}class Dg extends ui{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _r extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pg={type:"move"};class Ns{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ae,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ae),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ae,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ae),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let a=null,n=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(n=t.getPose(e.gripSpace,i),n!==null&&(l.matrix.fromArray(n.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,n.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(n.linearVelocity)):l.hasLinearVelocity=!1,n.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(n.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,i),a===null&&n!==null&&(a=n),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pg)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=n!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _r;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Ug=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ig{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const a=new Ot,n=e.properties.get(a);n.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}render(e,t){if(this.texture!==null){if(this.mesh===null){const i=t.cameras[0].viewport,a=new He({extensions:{fragDepth:!0},vertexShader:Ug,fragmentShader:Lg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Xe(new Je(20,20),a)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class Og extends la{constructor(e,t){super();const i=this;let a=null,n=1,s=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null;const _=new Ig,m=t.getContextAttributes();let p=null,x=null;const v=[],b=[],w=new Ue;let T=null;const M=new ui;M.layers.enable(1),M.viewport=new Rt;const E=new ui;E.layers.enable(2),E.viewport=new Rt;const O=[M,E],S=new Dg;S.layers.enable(1),S.layers.enable(2);let C=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let V=v[I];return V===void 0&&(V=new Ns,v[I]=V),V.getTargetRaySpace()},this.getControllerGrip=function(I){let V=v[I];return V===void 0&&(V=new Ns,v[I]=V),V.getGripSpace()},this.getHand=function(I){let V=v[I];return V===void 0&&(V=new Ns,v[I]=V),V.getHandSpace()};function N(I){const V=b.indexOf(I.inputSource);if(V===-1)return;const Q=v[V];Q!==void 0&&(Q.update(I.inputSource,I.frame,c||s),Q.dispatchEvent({type:I.type,data:I.inputSource}))}function D(){a.removeEventListener("select",N),a.removeEventListener("selectstart",N),a.removeEventListener("selectend",N),a.removeEventListener("squeeze",N),a.removeEventListener("squeezestart",N),a.removeEventListener("squeezeend",N),a.removeEventListener("end",D),a.removeEventListener("inputsourceschange",k);for(let I=0;I<v.length;I++){const V=b[I];V!==null&&(b[I]=null,v[I].disconnect(V))}C=null,U=null,_.reset(),e.setRenderTarget(p),f=null,d=null,h=null,a=null,x=null,W.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){n=I,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(I){c=I},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(I){if(a=I,a!==null){if(p=e.getRenderTarget(),a.addEventListener("select",N),a.addEventListener("selectstart",N),a.addEventListener("selectend",N),a.addEventListener("squeeze",N),a.addEventListener("squeezestart",N),a.addEventListener("squeezeend",N),a.addEventListener("end",D),a.addEventListener("inputsourceschange",k),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),a.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const V={antialias:a.renderState.layers===void 0?m.antialias:!0,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:n};f=new XRWebGLLayer(a,t,V),a.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new bt(f.framebufferWidth,f.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let V=null,Q=null,ee=null;m.depth&&(ee=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=m.stencil?1027:1026,Q=m.stencil?1020:1014);const ie={colorFormat:t.RGBA8,depthFormat:ee,scaleFactor:n};h=new XRWebGLBinding(a,t),d=h.createProjectionLayer(ie),a.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new bt(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new Gc(d.textureWidth,d.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0});const le=e.properties.get(x);le.__ignoreDepthValues=d.ignoreDepthValues}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await a.requestReferenceSpace(o),W.setContext(a),W.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode};function k(I){for(let V=0;V<I.removed.length;V++){const Q=I.removed[V],ee=b.indexOf(Q);ee>=0&&(b[ee]=null,v[ee].disconnect(Q))}for(let V=0;V<I.added.length;V++){const Q=I.added[V];let ee=b.indexOf(Q);if(ee===-1){for(let le=0;le<v.length;le++)if(le>=b.length){b.push(Q),ee=le;break}else if(b[le]===null){b[le]=Q,ee=le;break}if(ee===-1)break}const ie=v[ee];ie&&ie.connect(Q)}}const F=new ae,X=new ae;function Y(I,V,Q){F.setFromMatrixPosition(V.matrixWorld),X.setFromMatrixPosition(Q.matrixWorld);const ee=F.distanceTo(X),ie=V.projectionMatrix.elements,le=Q.projectionMatrix.elements,Me=ie[14]/(ie[10]-1),K=ie[14]/(ie[10]+1),L=(ie[9]+1)/ie[5],Ae=(ie[9]-1)/ie[5],me=(ie[8]-1)/ie[0],pe=(le[8]+1)/le[0],ue=Me*me,Se=Me*pe,oe=ee/(-me+pe),ge=oe*-me;V.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(ge),I.translateZ(oe),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert();const ye=Me+oe,R=K+oe,A=ue-ge,H=Se+(ee-ge),G=L*K/R*ye,te=Ae*K/R*ye;I.projectionMatrix.makePerspective(A,H,G,te,ye,R),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}function z(I,V){V===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(V.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(a===null)return;_.texture!==null&&(I.near=_.depthNear,I.far=_.depthFar),S.near=E.near=M.near=I.near,S.far=E.far=M.far=I.far,(C!==S.near||U!==S.far)&&(a.updateRenderState({depthNear:S.near,depthFar:S.far}),C=S.near,U=S.far,M.near=C,M.far=U,E.near=C,E.far=U,M.updateProjectionMatrix(),E.updateProjectionMatrix(),I.updateProjectionMatrix());const V=I.parent,Q=S.cameras;z(S,V);for(let ee=0;ee<Q.length;ee++)z(Q[ee],V);Q.length===2?Y(S,M,E):S.projectionMatrix.copy(M.projectionMatrix),q(I,S,V)};function q(I,V,Q){Q===null?I.matrix.copy(V.matrixWorld):(I.matrix.copy(Q.matrixWorld),I.matrix.invert(),I.matrix.multiply(V.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(V.projectionMatrix),I.projectionMatrixInverse.copy(V.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=un*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(I){l=I,d!==null&&(d.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return _.texture!==null};let y=null;function B(I,V){if(u=V.getViewerPose(c||s),g=V,u!==null){const Q=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let ee=!1;Q.length!==S.cameras.length&&(S.cameras.length=0,ee=!0);for(let le=0;le<Q.length;le++){const Me=Q[le];let K=null;if(f!==null)K=f.getViewport(Me);else{const Ae=h.getViewSubImage(d,Me);K=Ae.viewport,le===0&&(e.setRenderTargetTextures(x,Ae.colorTexture,d.ignoreDepthValues?void 0:Ae.depthStencilTexture),e.setRenderTarget(x))}let L=O[le];L===void 0&&(L=new ui,L.layers.enable(le),L.viewport=new Rt,O[le]=L),L.matrix.fromArray(Me.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(Me.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(K.x,K.y,K.width,K.height),le===0&&(S.matrix.copy(L.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ee===!0&&S.cameras.push(L)}const ie=a.enabledFeatures;if(ie&&ie.includes("depth-sensing")){const le=h.getDepthInformation(Q[0]);le&&le.isValid&&le.texture&&_.init(e,le,a.renderState)}}for(let Q=0;Q<v.length;Q++){const ee=b[Q],ie=v[Q];ee!==null&&ie!==void 0&&ie.update(ee,V,c||s)}_.render(e,S),y&&y(I,V),V.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:V}),g=null}const W=new Lc;W.setAnimationLoop(B),this.setAnimationLoop=function(I){y=I},this.dispose=function(){}}}const Hr=new or,Fg=new ft;function Ng(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Ac(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function a(m,p,x,v,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?n(m,p):p.isMeshToonMaterial?(n(m,p),h(m,p)):p.isMeshPhongMaterial?(n(m,p),u(m,p)):p.isMeshStandardMaterial?(n(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(n(m,p),g(m,p)):p.isMeshDepthMaterial?n(m,p):p.isMeshDistanceMaterial?(n(m,p),_(m,p)):p.isMeshNormalMaterial?n(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,x,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function n(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===1&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===1&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),v=x.envMap,b=x.envMapRotation;if(v&&(m.envMap.value=v,Hr.copy(b),Hr.x*=-1,Hr.y*=-1,Hr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Hr.y*=-1,Hr.z*=-1),m.envMapRotation.value.setFromMatrix4(Fg.makeRotationFromEuler(Hr)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const w=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*w,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===1&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function zg(r,e,t,i){let a={},n={},s=[];const o=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,v){const b=v.program;i.uniformBlockBinding(x,b)}function c(x,v){let b=a[x.id];b===void 0&&(g(x),b=u(x),a[x.id]=b,x.addEventListener("dispose",m));const w=v.program;i.updateUBOMapping(x,w);const T=e.render.frame;n[x.id]!==T&&(d(x),n[x.id]=T)}function u(x){const v=h();x.__bindingPointIndex=v;const b=r.createBuffer(),w=x.__size,T=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,w,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,b),b}function h(){for(let x=0;x<o;x++)if(s.indexOf(x)===-1)return s.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=a[x.id],b=x.uniforms,w=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let T=0,M=b.length;T<M;T++){const E=Array.isArray(b[T])?b[T]:[b[T]];for(let O=0,S=E.length;O<S;O++){const C=E[O];if(f(C,T,O,w)===!0){const U=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let D=0;for(let k=0;k<N.length;k++){const F=N[k],X=_(F);typeof F=="number"||typeof F=="boolean"?(C.__data[0]=F,r.bufferSubData(r.UNIFORM_BUFFER,U+D,C.__data)):F.isMatrix3?(C.__data[0]=F.elements[0],C.__data[1]=F.elements[1],C.__data[2]=F.elements[2],C.__data[3]=0,C.__data[4]=F.elements[3],C.__data[5]=F.elements[4],C.__data[6]=F.elements[5],C.__data[7]=0,C.__data[8]=F.elements[6],C.__data[9]=F.elements[7],C.__data[10]=F.elements[8],C.__data[11]=0):(F.toArray(C.__data,D),D+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,v,b,w){const T=x.value,M=v+"_"+b;if(w[M]===void 0)return typeof T=="number"||typeof T=="boolean"?w[M]=T:w[M]=T.clone(),!0;{const E=w[M];if(typeof T=="number"||typeof T=="boolean"){if(E!==T)return w[M]=T,!0}else if(E.equals(T)===!1)return E.copy(T),!0}return!1}function g(x){const v=x.uniforms;let b=0;const w=16;for(let M=0,E=v.length;M<E;M++){const O=Array.isArray(v[M])?v[M]:[v[M]];for(let S=0,C=O.length;S<C;S++){const U=O[S],N=Array.isArray(U.value)?U.value:[U.value];for(let D=0,k=N.length;D<k;D++){const F=N[D],X=_(F),Y=b%w;Y!==0&&w-Y<X.boundary&&(b+=w-Y),U.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=X.storage}}}const T=b%w;return T>0&&(b+=w-T),x.__size=b,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const b=s.indexOf(v.__bindingPointIndex);s.splice(b,1),r.deleteBuffer(a[v.id]),delete a[v.id],delete n[v.id]}function p(){for(const x in a)r.deleteBuffer(a[x]);s=[],a={},n={}}return{bind:l,update:c,dispose:p}}class uu{constructor(e={}){const{canvas:t=Cd(),context:i=null,depth:a=!0,stencil:n=!0,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=s;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ki,this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;const v=this;let b=!1,w=0,T=0,M=null,E=-1,O=null;const S=new Rt,C=new Rt;let U=null;const N=new he(0);let D=0,k=t.width,F=t.height,X=1,Y=null,z=null;const q=new Rt(0,0,k,F),y=new Rt(0,0,k,F);let B=!1;const W=new Uc;let I=!1,V=!1,Q=null;const ee=new ft,ie=new Ue,le=new ae,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function K(){return M===null?X:1}let L=i;function Ae(P,$){for(let ne=0;ne<P.length;ne++){const se=P[ne],re=t.getContext(se,$);if(re!==null)return re}return null}try{const P={alpha:!0,depth:a,stencil:n,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r162"),t.addEventListener("webglcontextlost",Oe,!1),t.addEventListener("webglcontextrestored",j,!1),t.addEventListener("webglcontextcreationerror",_e,!1),L===null){const $=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&$.shift(),L=Ae($,P),L===null)throw Ae($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&L instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),L.getShaderPrecisionFormat===void 0&&(L.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let me,pe,ue,Se,oe,ge,ye,R,A,H,G,te,J,Ce,fe,ce,ve,Ne,de,qe,Ee,we,Pe,De;function Be(){me=new qm(L),pe=new Bm(L,me,e),me.init(pe),we=new Cg(L,me,pe),ue=new Ag(L,me,pe),Se=new Zm(L),oe=new mg,ge=new Rg(L,me,ue,oe,pe,we,Se),ye=new Hm(v),R=new Xm(v),A=new ef(L,pe),Pe=new zm(L,me,A,pe),H=new jm(L,A,Se,Pe),G=new Jm(L,H,A,Se),de=new Qm(L,pe,ge),ce=new Gm(oe),te=new pg(v,ye,R,me,pe,Pe,ce),J=new Ng(v,oe),Ce=new vg,fe=new Mg(me,pe),Ne=new Nm(v,ye,R,ue,G,d,l),ve=new Eg(v,G,pe),De=new zg(L,Se,pe,ue),qe=new km(L,me,Se,pe),Ee=new Ym(L,me,Se,pe),Se.programs=te.programs,v.capabilities=pe,v.extensions=me,v.properties=oe,v.renderLists=Ce,v.shadowMap=ve,v.state=ue,v.info=Se}Be();const Re=new Og(v,L);this.xr=Re,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const P=me.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=me.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(P){P!==void 0&&(X=P,this.setSize(k,F,!1))},this.getSize=function(P){return P.set(k,F)},this.setSize=function(P,$,ne=!0){if(Re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=P,F=$,t.width=Math.floor(P*X),t.height=Math.floor($*X),ne===!0&&(t.style.width=P+"px",t.style.height=$+"px"),this.setViewport(0,0,P,$)},this.getDrawingBufferSize=function(P){return P.set(k*X,F*X).floor()},this.setDrawingBufferSize=function(P,$,ne){k=P,F=$,X=ne,t.width=Math.floor(P*ne),t.height=Math.floor($*ne),this.setViewport(0,0,P,$)},this.getCurrentViewport=function(P){return P.copy(S)},this.getViewport=function(P){return P.copy(q)},this.setViewport=function(P,$,ne,se){P.isVector4?q.set(P.x,P.y,P.z,P.w):q.set(P,$,ne,se),ue.viewport(S.copy(q).multiplyScalar(X).round())},this.getScissor=function(P){return P.copy(y)},this.setScissor=function(P,$,ne,se){P.isVector4?y.set(P.x,P.y,P.z,P.w):y.set(P,$,ne,se),ue.scissor(C.copy(y).multiplyScalar(X).round())},this.getScissorTest=function(){return B},this.setScissorTest=function(P){ue.setScissorTest(B=P)},this.setOpaqueSort=function(P){Y=P},this.setTransparentSort=function(P){z=P},this.getClearColor=function(P){return P.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor.apply(Ne,arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha.apply(Ne,arguments)},this.clear=function(P=!0,$=!0,ne=!0){let se=0;if(P){let re=!1;if(M!==null){const Le=M.texture.format;re=Le===1033||Le===1031||Le===1029}if(re){const Le=M.texture.type,ze=Le===1009||Le===1014||Le===1012||Le===1020||Le===1017||Le===1018,Ge=Ne.getClearColor(),xe=Ne.getClearAlpha(),Ye=Ge.r,Ke=Ge.g,We=Ge.b;ze?(f[0]=Ye,f[1]=Ke,f[2]=We,f[3]=xe,L.clearBufferuiv(L.COLOR,0,f)):(g[0]=Ye,g[1]=Ke,g[2]=We,g[3]=xe,L.clearBufferiv(L.COLOR,0,g))}else se|=L.COLOR_BUFFER_BIT}$&&(se|=L.DEPTH_BUFFER_BIT),ne&&(se|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(se)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Oe,!1),t.removeEventListener("webglcontextrestored",j,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),Ce.dispose(),fe.dispose(),oe.dispose(),ye.dispose(),R.dispose(),G.dispose(),Pe.dispose(),De.dispose(),te.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",rt),Re.removeEventListener("sessionend",Ve),Q&&(Q.dispose(),Q=null),ut.stop()};function Oe(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function j(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const P=Se.autoReset,$=ve.enabled,ne=ve.autoUpdate,se=ve.needsUpdate,re=ve.type;Be(),Se.autoReset=P,ve.enabled=$,ve.autoUpdate=ne,ve.needsUpdate=se,ve.type=re}function _e(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Z(P){const $=P.target;$.removeEventListener("dispose",Z),Te($)}function Te(P){be(P),oe.remove(P)}function be(P){const $=oe.get(P).programs;$!==void 0&&($.forEach(function(ne){te.releaseProgram(ne)}),P.isShaderMaterial&&te.releaseShaderCache(P))}this.renderBufferDirect=function(P,$,ne,se,re,Le){$===null&&($=Me);const ze=re.isMesh&&re.matrixWorld.determinant()<0,Ge=Gn(P,$,ne,se,re);ue.setMaterial(se,ze);let xe=ne.index,Ye=1;if(se.wireframe===!0){if(xe=H.getWireframeAttribute(ne),xe===void 0)return;Ye=2}const Ke=ne.drawRange,We=ne.attributes.position;let yt=Ke.start*Ye,_t=(Ke.start+Ke.count)*Ye;Le!==null&&(yt=Math.max(yt,Le.start*Ye),_t=Math.min(_t,(Le.start+Le.count)*Ye)),xe!==null?(yt=Math.max(yt,0),_t=Math.min(_t,xe.count)):We!=null&&(yt=Math.max(yt,0),_t=Math.min(_t,We.count));const Ft=_t-yt;if(Ft<0||Ft===1/0)return;Pe.setup(re,se,Ge,ne,xe);let Yt,ct=qe;if(xe!==null&&(Yt=A.get(xe),ct=Ee,ct.setIndex(Yt)),re.isMesh)se.wireframe===!0?(ue.setLineWidth(se.wireframeLinewidth*K()),ct.setMode(L.LINES)):ct.setMode(L.TRIANGLES);else if(re.isLine){let je=se.linewidth;je===void 0&&(je=1),ue.setLineWidth(je*K()),re.isLineSegments?ct.setMode(L.LINES):re.isLineLoop?ct.setMode(L.LINE_LOOP):ct.setMode(L.LINE_STRIP)}else re.isPoints?ct.setMode(L.POINTS):re.isSprite&&ct.setMode(L.TRIANGLES);if(re.isBatchedMesh)ct.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else if(re.isInstancedMesh)ct.renderInstances(yt,Ft,re.count);else if(ne.isInstancedBufferGeometry){const je=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,sr=Math.min(ne.instanceCount,je);ct.renderInstances(yt,Ft,sr)}else ct.render(yt,Ft)};function Fe(P,$,ne){P.transparent===!0&&P.side===2&&P.forceSinglePass===!1?(P.side=1,P.needsUpdate=!0,Dt(P,$,ne),P.side=0,P.needsUpdate=!0,Dt(P,$,ne),P.side=2):Dt(P,$,ne)}this.compile=function(P,$,ne=null){ne===null&&(ne=P),m=fe.get(ne),m.init(),x.push(m),ne.traverseVisible(function(re){re.isLight&&re.layers.test($.layers)&&(m.pushLight(re),re.castShadow&&m.pushShadow(re))}),P!==ne&&P.traverseVisible(function(re){re.isLight&&re.layers.test($.layers)&&(m.pushLight(re),re.castShadow&&m.pushShadow(re))}),m.setupLights(v._useLegacyLights);const se=new Set;return P.traverse(function(re){const Le=re.material;if(Le)if(Array.isArray(Le))for(let ze=0;ze<Le.length;ze++){const Ge=Le[ze];Fe(Ge,ne,re),se.add(Ge)}else Fe(Le,ne,re),se.add(Le)}),x.pop(),m=null,se},this.compileAsync=function(P,$,ne=null){const se=this.compile(P,$,ne);return new Promise(re=>{function Le(){if(se.forEach(function(ze){oe.get(ze).currentProgram.isReady()&&se.delete(ze)}),se.size===0){re(P);return}setTimeout(Le,10)}me.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let ke=null;function tt(P){ke&&ke(P)}function rt(){ut.stop()}function Ve(){ut.start()}const ut=new Lc;ut.setAnimationLoop(tt),typeof self<"u"&&ut.setContext(self),this.setAnimationLoop=function(P){ke=P,Re.setAnimationLoop(P),P===null?ut.stop():ut.start()},Re.addEventListener("sessionstart",rt),Re.addEventListener("sessionend",Ve),this.render=function(P,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(Re.cameraAutoUpdate===!0&&Re.updateCamera($),$=Re.getCamera()),P.isScene===!0&&P.onBeforeRender(v,P,$,M),m=fe.get(P,x.length),m.init(),x.push(m),ee.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),W.setFromProjectionMatrix(ee),V=this.localClippingEnabled,I=ce.init(this.clippingPlanes,V),_=Ce.get(P,p.length),_.init(),p.push(_),Ct(P,$,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(Y,z),this.info.render.frame++,I===!0&&ce.beginShadows();const ne=m.state.shadowsArray;if(ve.render(ne,P,$),I===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1)&&Ne.render(_,P),m.setupLights(v._useLegacyLights),$.isArrayCamera){const se=$.cameras;for(let re=0,Le=se.length;re<Le;re++){const ze=se[re];bi(_,P,ze,ze.viewport)}}else bi(_,P,$);M!==null&&(ge.updateMultisampleRenderTarget(M),ge.updateRenderTargetMipmap(M)),P.isScene===!0&&P.onAfterRender(v,P,$),Pe.resetDefaultState(),E=-1,O=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Ct(P,$,ne,se){if(P.visible===!1)return;if(P.layers.test($.layers)){if(P.isGroup)ne=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update($);else if(P.isLight)m.pushLight(P),P.castShadow&&m.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||W.intersectsSprite(P)){se&&le.setFromMatrixPosition(P.matrixWorld).applyMatrix4(ee);const Le=G.update(P),ze=P.material;ze.visible&&_.push(P,Le,ze,ne,le.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||W.intersectsObject(P))){const Le=G.update(P),ze=P.material;if(se&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),le.copy(P.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),le.copy(Le.boundingSphere.center)),le.applyMatrix4(P.matrixWorld).applyMatrix4(ee)),Array.isArray(ze)){const Ge=Le.groups;for(let xe=0,Ye=Ge.length;xe<Ye;xe++){const Ke=Ge[xe],We=ze[Ke.materialIndex];We&&We.visible&&_.push(P,Le,We,ne,le.z,Ke)}}else ze.visible&&_.push(P,Le,ze,ne,le.z,null)}}const re=P.children;for(let Le=0,ze=re.length;Le<ze;Le++)Ct(re[Le],$,ne,se)}function bi(P,$,ne,se){const re=P.opaque,Le=P.transmissive,ze=P.transparent;m.setupLightsView(ne),I===!0&&ce.setGlobalState(v.clippingPlanes,ne),Le.length>0&&Ri(re,Le,$,ne),se&&ue.viewport(S.copy(se)),re.length>0&&ai(re,$,ne),Le.length>0&&ai(Le,$,ne),ze.length>0&&ai(ze,$,ne),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function Ri(P,$,ne,se){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;const re=pe.isWebGL2;Q===null&&(Q=new bt(1,1,{generateMipmaps:!0,type:me.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:re?4:0})),v.getDrawingBufferSize(ie),re?Q.setSize(ie.x,ie.y):Q.setSize($n(ie.x),$n(ie.y));const Le=v.getRenderTarget();v.setRenderTarget(Q),v.getClearColor(N),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const ze=v.toneMapping;v.toneMapping=0,ai(P,ne,se),ge.updateMultisampleRenderTarget(Q),ge.updateRenderTargetMipmap(Q);let Ge=!1;for(let xe=0,Ye=$.length;xe<Ye;xe++){const Ke=$[xe],We=Ke.object,yt=Ke.geometry,_t=Ke.material,Ft=Ke.group;if(_t.side===2&&We.layers.test(se.layers)){const Yt=_t.side;_t.side=1,_t.needsUpdate=!0,zi(We,ne,se,yt,_t,Ft),_t.side=Yt,_t.needsUpdate=!0,Ge=!0}}Ge===!0&&(ge.updateMultisampleRenderTarget(Q),ge.updateRenderTargetMipmap(Q)),v.setRenderTarget(Le),v.setClearColor(N,D),v.toneMapping=ze}function ai(P,$,ne){const se=$.isScene===!0?$.overrideMaterial:null;for(let re=0,Le=P.length;re<Le;re++){const ze=P[re],Ge=ze.object,xe=ze.geometry,Ye=se===null?ze.material:se,Ke=ze.group;Ge.layers.test(ne.layers)&&zi(Ge,$,ne,xe,Ye,Ke)}}function zi(P,$,ne,se,re,Le){P.onBeforeRender(v,$,ne,se,re,Le),P.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),re.onBeforeRender(v,$,ne,se,P,Le),re.transparent===!0&&re.side===2&&re.forceSinglePass===!1?(re.side=1,re.needsUpdate=!0,v.renderBufferDirect(ne,$,se,re,P,Le),re.side=0,re.needsUpdate=!0,v.renderBufferDirect(ne,$,se,re,P,Le),re.side=2):v.renderBufferDirect(ne,$,se,re,P,Le),P.onAfterRender(v,$,ne,se,re,Le)}function Dt(P,$,ne){$.isScene!==!0&&($=Me);const se=oe.get(P),re=m.state.lights,Le=m.state.shadowsArray,ze=re.state.version,Ge=te.getParameters(P,re.state,Le,$,ne),xe=te.getProgramCacheKey(Ge);let Ye=se.programs;se.environment=P.isMeshStandardMaterial?$.environment:null,se.fog=$.fog,se.envMap=(P.isMeshStandardMaterial?R:ye).get(P.envMap||se.environment),se.envMapRotation=se.environment!==null&&P.envMap===null?$.environmentRotation:P.envMapRotation,Ye===void 0&&(P.addEventListener("dispose",Z),Ye=new Map,se.programs=Ye);let Ke=Ye.get(xe);if(Ke!==void 0){if(se.currentProgram===Ke&&se.lightsStateVersion===ze)return aa(P,Ge),Ke}else Ge.uniforms=te.getUniforms(P),P.onBuild(ne,Ge,v),P.onBeforeCompile(Ge,v),Ke=te.acquireProgram(Ge,xe),Ye.set(xe,Ke),se.uniforms=Ge.uniforms;const We=se.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(We.clippingPlanes=ce.uniform),aa(P,Ge),se.needsLights=Ko(P),se.lightsStateVersion=ze,se.needsLights&&(We.ambientLightColor.value=re.state.ambient,We.lightProbe.value=re.state.probe,We.directionalLights.value=re.state.directional,We.directionalLightShadows.value=re.state.directionalShadow,We.spotLights.value=re.state.spot,We.spotLightShadows.value=re.state.spotShadow,We.rectAreaLights.value=re.state.rectArea,We.ltc_1.value=re.state.rectAreaLTC1,We.ltc_2.value=re.state.rectAreaLTC2,We.pointLights.value=re.state.point,We.pointLightShadows.value=re.state.pointShadow,We.hemisphereLights.value=re.state.hemi,We.directionalShadowMap.value=re.state.directionalShadowMap,We.directionalShadowMatrix.value=re.state.directionalShadowMatrix,We.spotShadowMap.value=re.state.spotShadowMap,We.spotLightMatrix.value=re.state.spotLightMatrix,We.spotLightMap.value=re.state.spotLightMap,We.pointShadowMap.value=re.state.pointShadowMap,We.pointShadowMatrix.value=re.state.pointShadowMatrix),se.currentProgram=Ke,se.uniformsList=null,Ke}function ni(P){if(P.uniformsList===null){const $=P.currentProgram.getUniforms();P.uniformsList=bo.seqWithValue($.seq,P.uniforms)}return P.uniformsList}function aa(P,$){const ne=oe.get(P);ne.outputColorSpace=$.outputColorSpace,ne.batching=$.batching,ne.instancing=$.instancing,ne.instancingColor=$.instancingColor,ne.instancingMorph=$.instancingMorph,ne.skinning=$.skinning,ne.morphTargets=$.morphTargets,ne.morphNormals=$.morphNormals,ne.morphColors=$.morphColors,ne.morphTargetsCount=$.morphTargetsCount,ne.numClippingPlanes=$.numClippingPlanes,ne.numIntersection=$.numClipIntersection,ne.vertexAlphas=$.vertexAlphas,ne.vertexTangents=$.vertexTangents,ne.toneMapping=$.toneMapping}function Gn(P,$,ne,se,re){$.isScene!==!0&&($=Me),ge.resetTextureUnits();const Le=$.fog,ze=se.isMeshStandardMaterial?$.environment:null,Ge=M===null?v.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:ur,xe=(se.isMeshStandardMaterial?R:ye).get(se.envMap||ze),Ye=se.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,Ke=!!ne.attributes.tangent&&(!!se.normalMap||se.anisotropy>0),We=!!ne.morphAttributes.position,yt=!!ne.morphAttributes.normal,_t=!!ne.morphAttributes.color;let Ft=0;se.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Ft=v.toneMapping);const Yt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,ct=Yt!==void 0?Yt.length:0,je=oe.get(se),sr=m.state.lights;if(I===!0&&(V===!0||P!==O)){const Nt=P===O&&se.id===E;ce.setState(se,P,Nt)}let na=!1;se.version===je.__version?(je.needsLights&&je.lightsStateVersion!==sr.state.version||je.outputColorSpace!==Ge||re.isBatchedMesh&&je.batching===!1||!re.isBatchedMesh&&je.batching===!0||re.isInstancedMesh&&je.instancing===!1||!re.isInstancedMesh&&je.instancing===!0||re.isSkinnedMesh&&je.skinning===!1||!re.isSkinnedMesh&&je.skinning===!0||re.isInstancedMesh&&je.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&je.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&je.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&je.instancingMorph===!1&&re.morphTexture!==null||je.envMap!==xe||se.fog===!0&&je.fog!==Le||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==ce.numPlanes||je.numIntersection!==ce.numIntersection)||je.vertexAlphas!==Ye||je.vertexTangents!==Ke||je.morphTargets!==We||je.morphNormals!==yt||je.morphColors!==_t||je.toneMapping!==Ft||pe.isWebGL2===!0&&je.morphTargetsCount!==ct)&&(na=!0):(na=!0,je.__version=se.version);let Ci=je.currentProgram;na===!0&&(Ci=Dt(se,$,re));let Ja=!1,Di=!1,Dr=!1;const pt=Ci.getUniforms(),Pi=je.uniforms;if(ue.useProgram(Ci.program)&&(Ja=!0,Di=!0,Dr=!0),se.id!==E&&(E=se.id,Di=!0),Ja||O!==P){pt.setValue(L,"projectionMatrix",P.projectionMatrix),pt.setValue(L,"viewMatrix",P.matrixWorldInverse);const Nt=pt.map.cameraPosition;Nt!==void 0&&Nt.setValue(L,le.setFromMatrixPosition(P.matrixWorld)),pe.logarithmicDepthBuffer&&pt.setValue(L,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(se.isMeshPhongMaterial||se.isMeshToonMaterial||se.isMeshLambertMaterial||se.isMeshBasicMaterial||se.isMeshStandardMaterial||se.isShaderMaterial)&&pt.setValue(L,"isOrthographic",P.isOrthographicCamera===!0),O!==P&&(O=P,Di=!0,Dr=!0)}if(re.isSkinnedMesh){pt.setOptional(L,re,"bindMatrix"),pt.setOptional(L,re,"bindMatrixInverse");const Nt=re.skeleton;Nt&&(pe.floatVertexTextures?(Nt.boneTexture===null&&Nt.computeBoneTexture(),pt.setValue(L,"boneTexture",Nt.boneTexture,ge)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}re.isBatchedMesh&&(pt.setOptional(L,re,"batchingTexture"),pt.setValue(L,"batchingTexture",re._matricesTexture,ge));const Pr=ne.morphAttributes;if((Pr.position!==void 0||Pr.normal!==void 0||Pr.color!==void 0&&pe.isWebGL2===!0)&&de.update(re,ne,Ci),(Di||je.receiveShadow!==re.receiveShadow)&&(je.receiveShadow=re.receiveShadow,pt.setValue(L,"receiveShadow",re.receiveShadow)),se.isMeshGouraudMaterial&&se.envMap!==null&&(Pi.envMap.value=xe,Pi.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),Di&&(pt.setValue(L,"toneMappingExposure",v.toneMappingExposure),je.needsLights&&Qa(Pi,Dr),Le&&se.fog===!0&&J.refreshFogUniforms(Pi,Le),J.refreshMaterialUniforms(Pi,se,X,F,Q),bo.upload(L,ni(je),Pi,ge)),se.isShaderMaterial&&se.uniformsNeedUpdate===!0&&(bo.upload(L,ni(je),Pi,ge),se.uniformsNeedUpdate=!1),se.isSpriteMaterial&&pt.setValue(L,"center",re.center),pt.setValue(L,"modelViewMatrix",re.modelViewMatrix),pt.setValue(L,"normalMatrix",re.normalMatrix),pt.setValue(L,"modelMatrix",re.matrixWorld),se.isShaderMaterial||se.isRawShaderMaterial){const Nt=se.uniformsGroups;for(let Zt=0,$o=Nt.length;Zt<$o;Zt++)if(pe.isWebGL2){const Ur=Nt[Zt];De.update(Ur,Ci),De.bind(Ur,Ci)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ci}function Qa(P,$){P.ambientLightColor.needsUpdate=$,P.lightProbe.needsUpdate=$,P.directionalLights.needsUpdate=$,P.directionalLightShadows.needsUpdate=$,P.pointLights.needsUpdate=$,P.pointLightShadows.needsUpdate=$,P.spotLights.needsUpdate=$,P.spotLightShadows.needsUpdate=$,P.rectAreaLights.needsUpdate=$,P.hemisphereLights.needsUpdate=$}function Ko(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(P,$,ne){oe.get(P.texture).__webglTexture=$,oe.get(P.depthTexture).__webglTexture=ne;const se=oe.get(P);se.__hasExternalTextures=!0,se.__autoAllocateDepthBuffer=ne===void 0,se.__autoAllocateDepthBuffer||me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),se.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,$){const ne=oe.get(P);ne.__webglFramebuffer=$,ne.__useDefaultFramebuffer=$===void 0},this.setRenderTarget=function(P,$=0,ne=0){M=P,w=$,T=ne;let se=!0,re=null,Le=!1,ze=!1;if(P){const Ge=oe.get(P);Ge.__useDefaultFramebuffer!==void 0?(ue.bindFramebuffer(L.FRAMEBUFFER,null),se=!1):Ge.__webglFramebuffer===void 0?ge.setupRenderTarget(P):Ge.__hasExternalTextures&&ge.rebindTextures(P,oe.get(P.texture).__webglTexture,oe.get(P.depthTexture).__webglTexture);const xe=P.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(ze=!0);const Ye=oe.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Ye[$])?re=Ye[$][ne]:re=Ye[$],Le=!0):pe.isWebGL2&&P.samples>0&&ge.useMultisampledRTT(P)===!1?re=oe.get(P).__webglMultisampledFramebuffer:Array.isArray(Ye)?re=Ye[ne]:re=Ye,S.copy(P.viewport),C.copy(P.scissor),U=P.scissorTest}else S.copy(q).multiplyScalar(X).floor(),C.copy(y).multiplyScalar(X).floor(),U=B;if(ue.bindFramebuffer(L.FRAMEBUFFER,re)&&pe.drawBuffers&&se&&ue.drawBuffers(P,re),ue.viewport(S),ue.scissor(C),ue.setScissorTest(U),Le){const Ge=oe.get(P.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ge.__webglTexture,ne)}else if(ze){const Ge=oe.get(P.texture),xe=$||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ge.__webglTexture,ne||0,xe)}E=-1},this.readRenderTargetPixels=function(P,$,ne,se,re,Le,ze){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=oe.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&ze!==void 0&&(Ge=Ge[ze]),Ge){ue.bindFramebuffer(L.FRAMEBUFFER,Ge);try{const xe=P.texture,Ye=xe.format,Ke=xe.type;if(Ye!==1023&&we.convert(Ye)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const We=Ke===1016&&(me.has("EXT_color_buffer_half_float")||pe.isWebGL2&&me.has("EXT_color_buffer_float"));if(Ke!==1009&&we.convert(Ke)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ke===1015&&(pe.isWebGL2||me.has("OES_texture_float")||me.has("WEBGL_color_buffer_float")))&&!We){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=P.width-se&&ne>=0&&ne<=P.height-re&&L.readPixels($,ne,se,re,we.convert(Ye),we.convert(Ke),Le)}finally{const xe=M!==null?oe.get(M).__webglFramebuffer:null;ue.bindFramebuffer(L.FRAMEBUFFER,xe)}}},this.copyFramebufferToTexture=function(P,$,ne=0){const se=Math.pow(2,-ne),re=Math.floor($.image.width*se),Le=Math.floor($.image.height*se);ge.setTexture2D($,0),L.copyTexSubImage2D(L.TEXTURE_2D,ne,0,0,P.x,P.y,re,Le),ue.unbindTexture()},this.copyTextureToTexture=function(P,$,ne,se=0){const re=$.image.width,Le=$.image.height,ze=we.convert(ne.format),Ge=we.convert(ne.type);ge.setTexture2D(ne,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,ne.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ne.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,ne.unpackAlignment),$.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,se,P.x,P.y,re,Le,ze,Ge,$.image.data):$.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,se,P.x,P.y,$.mipmaps[0].width,$.mipmaps[0].height,ze,$.mipmaps[0].data):L.texSubImage2D(L.TEXTURE_2D,se,P.x,P.y,ze,Ge,$.image),se===0&&ne.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),ue.unbindTexture()},this.copyTextureToTexture3D=function(P,$,ne,se,re=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Le=Math.round(P.max.x-P.min.x),ze=Math.round(P.max.y-P.min.y),Ge=P.max.z-P.min.z+1,xe=we.convert(se.format),Ye=we.convert(se.type);let Ke;if(se.isData3DTexture)ge.setTexture3D(se,0),Ke=L.TEXTURE_3D;else if(se.isDataArrayTexture||se.isCompressedArrayTexture)ge.setTexture2DArray(se,0),Ke=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,se.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,se.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,se.unpackAlignment);const We=L.getParameter(L.UNPACK_ROW_LENGTH),yt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),_t=L.getParameter(L.UNPACK_SKIP_PIXELS),Ft=L.getParameter(L.UNPACK_SKIP_ROWS),Yt=L.getParameter(L.UNPACK_SKIP_IMAGES),ct=ne.isCompressedTexture?ne.mipmaps[re]:ne.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,ct.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ct.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,P.min.x),L.pixelStorei(L.UNPACK_SKIP_ROWS,P.min.y),L.pixelStorei(L.UNPACK_SKIP_IMAGES,P.min.z),ne.isDataTexture||ne.isData3DTexture?L.texSubImage3D(Ke,re,$.x,$.y,$.z,Le,ze,Ge,xe,Ye,ct.data):se.isCompressedArrayTexture?L.compressedTexSubImage3D(Ke,re,$.x,$.y,$.z,Le,ze,Ge,xe,ct.data):L.texSubImage3D(Ke,re,$.x,$.y,$.z,Le,ze,Ge,xe,Ye,ct),L.pixelStorei(L.UNPACK_ROW_LENGTH,We),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,_t),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ft),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Yt),re===0&&se.generateMipmaps&&L.generateMipmap(Ke),ue.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?ge.setTextureCube(P,0):P.isData3DTexture?ge.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?ge.setTexture2DArray(P,0):ge.setTexture2D(P,0),ue.unbindTexture()},this.resetState=function(){w=0,T=0,M=null,ue.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ls?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===Yn?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class kg extends uu{}kg.prototype.isWebGL1Renderer=!0;class So extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new or,this.environmentRotation=new or,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class xr extends Ot{constructor(e=null,t=1,i=1,a,n,s,o,l,c=1003,u=1003,h,d){super(null,s,o,l,c,u,a,n,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vr extends li{constructor(e,t,i,a=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Pa=new ft,hu=new ft,Mo=[],du=new Ki,Bg=new ft,xn=new Xe,yn=new Or;class Gg extends Xe{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Vr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,Bg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ki),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Pa),du.copy(e.boundingBox).applyMatrix4(Pa),this.boundingBox.union(du)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Or),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Pa),yn.copy(e.boundingSphere).applyMatrix4(Pa),this.boundingSphere.union(yn)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,a=this.morphTexture.source.data.data,n=i.length+1,s=e*n+1;for(let o=0;o<i.length;o++)i[o]=a[s+o]}raycast(e,t){const i=this.matrixWorld,a=this.count;if(xn.geometry=this.geometry,xn.material=this.material,xn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yn.copy(this.boundingSphere),yn.applyMatrix4(i),e.ray.intersectsSphere(yn)!==!1))for(let n=0;n<a;n++){this.getMatrixAt(n,Pa),hu.multiplyMatrices(i,Pa),xn.matrixWorld=hu,xn.raycast(e,Mo);for(let s=0,o=Mo.length;s<o;s++){const l=Mo[s];l.instanceId=n,l.object=this,t.push(l)}Mo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Vr(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new xr(new Float32Array(a*this.count),a,this.count,1028,1015));const n=this.morphTexture.source.data.data;let s=0;for(let c=0;c<i.length;c++)s+=i[c];const o=this.geometry.morphTargetsRelative?1:1-s,l=a*e;n[l]=o,n.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Hg extends vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const fu=new ft,zs=new uc,wo=new Or,To=new ae;class Vg extends Vt{constructor(e=new yi,t=new Hg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,a=this.matrixWorld,n=e.params.Points.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wo.copy(i.boundingSphere),wo.applyMatrix4(a),wo.radius+=n,e.ray.intersectsSphere(wo)===!1)return;fu.copy(a).invert(),zs.copy(e.ray).applyMatrix4(fu);const o=n/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const h=Math.max(0,s.start),d=Math.min(c.count,s.start+s.count);for(let f=h,g=d;f<g;f++){const _=c.getX(f);To.fromBufferAttribute(u,_),pu(To,_,l,a,e,t,this)}}else{const h=Math.max(0,s.start),d=Math.min(u.count,s.start+s.count);for(let f=h,g=d;f<g;f++)To.fromBufferAttribute(u,f),pu(To,f,l,a,e,t,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,n=i.length;a<n;a++){const s=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}}function pu(r,e,t,i,a,n,s){const o=zs.distanceSqToPoint(r);if(o<t){const l=new ae;zs.closestPointToPoint(r,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;n.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:s})}}class Nl extends yi{constructor(e=1,t=32,i=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:a},t=Math.max(3,t);const n=[],s=[],o=[],l=[],c=new ae,u=new Ue;s.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=i+h/t*a;c.x=e*Math.cos(f),c.y=e*Math.sin(f),s.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(s[d]/e+1)/2,u.y=(s[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)n.push(h,h+1,0);this.setIndex(n),this.setAttribute("position",new qt(s,3)),this.setAttribute("normal",new qt(o,3)),this.setAttribute("uv",new qt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nl(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class zl extends yi{constructor(e=1,t=32,i=16,a=0,n=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:a,phiLength:n,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(s+o,Math.PI);let c=0;const u=[],h=new ae,d=new ae,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const x=[],v=p/i;let b=0;p===0&&s===0?b=.5/t:p===i&&l===Math.PI&&(b=-.5/t);for(let w=0;w<=t;w++){const T=w/t;h.x=-e*Math.cos(a+T*n)*Math.sin(s+v*o),h.y=e*Math.cos(s+v*o),h.z=e*Math.sin(a+T*n)*Math.sin(s+v*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),m.push(T+b,1-v),x.push(c++)}u.push(x)}for(let p=0;p<i;p++)for(let x=0;x<t;x++){const v=u[p][x+1],b=u[p][x],w=u[p+1][x],T=u[p+1][x+1];(p!==0||s>0)&&f.push(v,b,T),(p!==i-1||l<Math.PI)&&f.push(b,w,T)}this.setIndex(f),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(_,3)),this.setAttribute("uv",new qt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}const mu={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Wg{constructor(e,t,i){const a=this;let n=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){o++,n===!1&&a.onStart!==void 0&&a.onStart(u,s,o),n=!0},this.itemEnd=function(u){s++,a.onProgress!==void 0&&a.onProgress(u,s,o),s===o&&(n=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(u){a.onError!==void 0&&a.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const Xg=new Wg;class ks{constructor(e){this.manager=e!==void 0?e:Xg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(a,n){i.load(e,a,t,n)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ks.DEFAULT_MATERIAL_NAME="__DEFAULT";class qg extends ks{constructor(e){super(e)}load(e,t,i,a){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const n=this,s=mu.get(e);if(s!==void 0)return n.manager.itemStart(e),setTimeout(function(){t&&t(s),n.manager.itemEnd(e)},0),s;const o=dn("img");function l(){u(),mu.add(e,this),t&&t(this),n.manager.itemEnd(e)}function c(h){u(),a&&a(h),n.manager.itemError(e),n.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),n.manager.itemStart(e),o.src=e,o}}class Bs extends ks{constructor(e){super(e)}load(e,t,i,a){const n=new Ot,s=new qg(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){n.image=o,n.needsUpdate=!0,t!==void 0&&t(n)},i,a),n}}class jg extends Vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new he(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Yg extends jg{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Zg extends yi{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Kg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=gu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=gu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function gu(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"162"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="162");class $g{constructor(e){this.smoothed={bass:0,mid:0,treble:0,rms:0},this.smoothing=.82,this.analyser=e,this.freqData=new Uint8Array(this.analyser.frequencyBinCount),this.timeData=new Uint8Array(this.analyser.frequencyBinCount)}update(){this.analyser.getByteFrequencyData(this.freqData),this.analyser.getByteTimeDomainData(this.timeData);const e=this.freqData.length,t=Math.floor(e/3);let i=0,a=0,n=0;for(let l=0;l<t;l++)i+=this.freqData[l];for(let l=t;l<t*2;l++)a+=this.freqData[l];for(let l=t*2;l<e;l++)n+=this.freqData[l];i=i/t/255,a=a/t/255,n=n/(e-t*2)/255;let s=0;for(let l=0;l<this.timeData.length;l++){const c=(this.timeData[l]-128)/128;s+=c*c}s=Math.sqrt(s/this.timeData.length);const o=this.smoothing;return this.smoothed.bass=this.smoothed.bass*o+i*(1-o),this.smoothed.mid=this.smoothed.mid*o+a*(1-o),this.smoothed.treble=this.smoothed.treble*o+n*(1-o),this.smoothed.rms=this.smoothed.rms*o+s*(1-o),this.smoothed}}const vu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Hi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Qg=new it(-1,1,1,-1,0,1);class Jg extends yi{constructor(){super(),this.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new qt([0,2,0,0,2,0],2))}}const ev=new Jg;class yr{constructor(e){this._mesh=new Xe(ev,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Qg)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class hi extends Hi{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof He?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Bi.clone(e.uniforms),this.material=new He({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new yr(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class _u extends Hi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const a=e.getContext(),n=e.state;n.buffers.color.setMask(!1),n.buffers.depth.setMask(!1),n.buffers.color.setLocked(!0),n.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),n.buffers.stencil.setTest(!0),n.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),n.buffers.stencil.setFunc(a.ALWAYS,s,4294967295),n.buffers.stencil.setClear(o),n.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),n.buffers.color.setLocked(!1),n.buffers.depth.setLocked(!1),n.buffers.color.setMask(!0),n.buffers.depth.setMask(!0),n.buffers.stencil.setLocked(!1),n.buffers.stencil.setFunc(a.EQUAL,1,4294967295),n.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),n.buffers.stencil.setLocked(!0)}}class tv extends Hi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class iv{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new Ue);this._width=i.width,this._height=i.height,t=new bt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:1016}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new hi(vu),this.copyPass.material.blending=0,this.clock=new Kg}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let a=0,n=this.passes.length;a<n;a++){const s=this.passes[a];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),s.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}_u!==void 0&&(s instanceof _u?i=!0:s instanceof tv&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ue);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(i,a),this.renderTarget2.setSize(i,a);for(let n=0;n<this.passes.length;n++)this.passes[n].setSize(i,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class xu extends Hi{constructor(e,t,i=null,a=null,n=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=a,this.clearAlpha=n,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new he}render(e,t,i){const a=e.autoClear;e.autoClear=!1;let n,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(n=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(n),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=a}}const rv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new he(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class $a extends Hi{constructor(e,t,i,a){super(),this.strength=t!==void 0?t:1,this.radius=i,this.threshold=a,this.resolution=e!==void 0?new Ue(e.x,e.y):new Ue(256,256),this.clearColor=new he(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let n=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new bt(n,s,{type:1016}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new bt(n,s,{type:1016});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new bt(n,s,{type:1016});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),n=Math.round(n/2),s=Math.round(s/2)}const o=rv;this.highPassUniforms=Bi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new He({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];n=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ue(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new ae(1,1,1),new ae(1,1,1),new ae(1,1,1),new ae(1,1,1),new ae(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=vu;this.copyUniforms=Bi.clone(u.uniforms),this.blendMaterial=new He({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new he,this.oldClearAlpha=1,this.basic=new gr,this.fsQuad=new yr(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(i,a);for(let n=0;n<this.nMips;n++)this.renderTargetsHorizontal[n].setSize(i,a),this.renderTargetsVertical[n].setSize(i,a),this.separableBlurMaterials[n].uniforms.invSize.value=new Ue(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2)}render(e,t,i,a,n){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),n&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=$a.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=$a.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,n&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}getSeperableBlurMaterial(e){const t=[];for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(e*e))/e);return new He({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ue(.5,.5)},direction:{value:new Ue(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new He({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}$a.BlurDirectionX=new Ue(1,0),$a.BlurDirectionY=new Ue(0,1);const av={uniforms:{tDiffuse:{value:null},u_intensity:{value:0},u_resolution:{value:new Ue(1,1)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float u_intensity;
    uniform vec2 u_resolution;
    varying vec2 vUv;
    void main() {
      if (u_intensity < 0.001) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 dir = (vUv - 0.5) * u_intensity * 0.02;
      float r = texture2D(tDiffuse, vUv + dir).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - dir).b;
      float a = texture2D(tDiffuse, vUv).a;
      gl_FragColor = vec4(r, g, b, a);
    }
  `};new Ue(1,1),new Ue(1,0);const nv={uniforms:{tDiffuse:{value:null},u_enabled:{value:0},u_strength:{value:1},u_resolution:{value:new Ue(1,1)},u_audio:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float u_enabled;
    uniform float u_strength;
    uniform vec2 u_resolution;
    uniform float u_audio;
    varying vec2 vUv;

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      if (u_enabled < 0.5) {
        gl_FragColor = base;
        return;
      }

      // Vertical-biased blur sampling (more vertical spread than horizontal)
      vec2 texelV = vec2(0.0, 1.0) / u_resolution;
      vec2 texelH = vec2(1.0, 0.0) / u_resolution;

      // Audio-reactive sigma: base 4.0, pulse up to 8.0
      float sigma = 4.0 + u_audio * 4.0;
      float vertScale = 2.5 + u_audio * 1.5; // vertical stretch
      float horizScale = 0.6; // subtle horizontal

      vec4 glow = vec4(0.0);
      float total = 0.0;
      for (int i = -8; i <= 8; i++) {
        float fi = float(i);
        float wV = exp(-(fi * fi) / (2.0 * sigma * sigma));
        vec2 offsetV = fi * texelV * vertScale;
        glow += texture2D(tDiffuse, vUv + offsetV) * wV;
        total += wV;
      }
      glow /= total;

      // Second pass: slight horizontal spread
      vec4 glowH = vec4(0.0);
      float totalH = 0.0;
      float sigmaH = sigma * 0.4;
      for (int i = -4; i <= 4; i++) {
        float fi = float(i);
        float wH = exp(-(fi * fi) / (2.0 * sigmaH * sigmaH));
        vec2 offsetH = fi * texelH * horizScale;
        glowH += texture2D(tDiffuse, vUv + offsetH) * wH;
        totalH += wH;
      }
      glowH /= totalH;

      // Blend vertical-dominant glow
      vec4 bloomColor = mix(glow, glowH, 0.25);

      // Tint with Other World palette gradient based on luminance
      float lum = dot(bloomColor.rgb, vec3(0.299, 0.587, 0.114));
      vec3 indigo = vec3(31.0, 24.0, 64.0) / 255.0;       // \u041F\u043E\u0442\u043E\u0439\u0431\u0456\u0447\u043D\u0438\u0439 \u0406\u043D\u0434\u0456\u0433\u043E
      vec3 violet = vec3(92.0, 53.0, 64.0) / 255.0;       // \u041C\u0430\u0433\u0456\u0447\u043D\u0438\u0439 \u0444\u0456\u043E\u043B\u0435\u0442\u043E\u0432\u0438\u0439
      vec3 fuchsia = vec3(186.0, 45.0, 131.0) / 255.0;    // \u041D\u0435\u043E\u043D\u043E\u0432\u0430 \u0424\u0443\u043A\u0441\u0456\u044F

      // Map luminance to color ramp
      vec3 tint;
      if (lum < 0.33) {
        tint = mix(indigo, violet, lum / 0.33);
      } else if (lum < 0.66) {
        tint = mix(violet, fuchsia, (lum - 0.33) / 0.33);
      } else {
        tint = mix(fuchsia, vec3(1.0, 0.6, 0.9), (lum - 0.66) / 0.34);
      }

      vec3 tintedGlow = bloomColor.rgb * tint * 2.5;

      // Additive blend with audio-reactive intensity
      float intensity = u_strength * (0.7 + u_audio * 0.5);
      gl_FragColor = vec4(base.rgb + tintedGlow * intensity, base.a);
    }
  `};class ov{constructor(e,t,i){this.uiVisibility=0,this.uiVisibilityTarget=0,this.chromaBeat=0,this._textRenderer=null,this.defaultBloom={strength:.4,radius:.4,threshold:1},this.isCoraline=!1,this.currentAudio=null,this._textDbgCount=0,this.renderer=e,this.scene=t,this.camera=i,this.composer=new iv(e);const a=new xu(t,i);a.clear=!0,this.composer.addPass(a);const n=a.render.bind(a);a.render=(c,u,h,d,f)=>{const g=a.camera,_=g.layers.mask;g.layers.set(0),n(c,u,h,d,f),g.layers.mask=_},this.coralineBloomPass=new hi(nv),this.coralineBloomPass.uniforms.u_enabled.value=0;const s=e.getPixelRatio();this.coralineBloomPass.uniforms.u_resolution.value.set(window.innerWidth*s,window.innerHeight*s),this.composer.addPass(this.coralineBloomPass);const o=new xu(t,i);o.clear=!1,o.clearDepth=!0,this.composer.addPass(o);const l=o.render.bind(o);o.render=(c,u,h,d,f)=>{const g=o.camera,_=g.layers.mask;g.layers.set(1),l(c,u,h,d,f),g.layers.mask=_},this.bloom=new $a(new Ue(window.innerWidth,window.innerHeight),this.defaultBloom.strength,this.defaultBloom.radius,this.defaultBloom.threshold),this.composer.addPass(this.bloom),this.chromaPass=new hi(av),this.chromaPass.uniforms.u_resolution.value.set(window.innerWidth*s,window.innerHeight*s),this.composer.addPass(this.chromaPass)}setTextRenderer(e){this._textRenderer=e}renderText(){}setUiVisibility(e){this.uiVisibilityTarget=e?1:0}setBlur(e){}setDim(e,t){}update(e){if(this.currentAudio=e,this.isCoraline){const t=e.bass*.5+e.mid*.3+e.treble*.2;this.coralineBloomPass.uniforms.u_audio.value+=(t-this.coralineBloomPass.uniforms.u_audio.value)*.15}this.chromaPass.uniforms.u_intensity.value=0}setSize(e,t){const i=this.renderer.getPixelRatio(),a=e*i,n=t*i;this.composer.setSize(a,n),this.bloom.resolution.set(a,n),this.chromaPass.uniforms.u_resolution.value.set(a,n),this.coralineBloomPass.uniforms.u_resolution.value.set(a,n),this._textRenderer&&this._textRenderer.setSize(e,t,!1)}updateScene(e,t){this.scene=e,this.camera=t;const i=this.composer.passes[0];i.scene=e,i.camera=t;const a=this.composer.passes[2];a.scene=e,a.camera=t}setBloomProfile(e){if(e==="coraline"){this.isCoraline=!0,this.bloom.enabled=!1,this.bloom.strength=.68,this.bloom.radius=.5,this.bloom.threshold=.72,this.coralineBloomPass.uniforms.u_enabled.value=1,this.coralineBloomPass.uniforms.u_strength.value=.95;return}this.isCoraline=!1,this.bloom.enabled=!0,this.bloom.strength=this.defaultBloom.strength,this.bloom.radius=this.defaultBloom.radius,this.bloom.threshold=this.defaultBloom.threshold,this.coralineBloomPass.uniforms.u_enabled.value=0}}function sv(){var r=Object.create(null);function e(a,n){var s=a.id,o=a.name,l=a.dependencies;l===void 0&&(l=[]);var c=a.init;c===void 0&&(c=function(){});var u=a.getTransferables;if(u===void 0&&(u=null),!r[s])try{l=l.map(function(d){return d&&d.isWorkerModule&&(e(d,function(f){if(f instanceof Error)throw f}),d=r[d.id].value),d}),c=i("<"+o+">.init",c),u&&(u=i("<"+o+">.getTransferables",u));var h=null;typeof c=="function"?h=c.apply(void 0,l):console.error("worker module init function failed to rehydrate"),r[s]={id:s,value:h,getTransferables:u},n(h)}catch(d){d&&d.noLog||console.error(d),n(d)}}function t(a,n){var s,o=a.id,l=a.args;(!r[o]||typeof r[o].value!="function")&&n(new Error("Worker module "+o+": not found or its 'init' did not return a function"));try{var c=(s=r[o]).value.apply(s,l);c&&typeof c.then=="function"?c.then(u,function(h){return n(h instanceof Error?h:new Error(""+h))}):u(c)}catch(h){n(h)}function u(h){try{var d=r[o].getTransferables&&r[o].getTransferables(h);(!d||!Array.isArray(d)||!d.length)&&(d=void 0),n(h,d)}catch(f){console.error(f),n(f)}}}function i(a,n){var s=void 0;self.troikaDefine=function(l){return s=l};var o=URL.createObjectURL(new Blob(["/** "+a.replace(/\*/g,"")+` **/

troikaDefine(
`+n+`
)`],{type:"application/javascript"}));try{importScripts(o)}catch(l){console.error(l)}return URL.revokeObjectURL(o),delete self.troikaDefine,s}self.addEventListener("message",function(a){var n=a.data,s=n.messageId,o=n.action,l=n.data;try{o==="registerModule"&&e(l,function(c){c instanceof Error?postMessage({messageId:s,success:!1,error:c.message}):postMessage({messageId:s,success:!0,result:{isCallable:typeof c=="function"}})}),o==="callModule"&&t(l,function(c,u){c instanceof Error?postMessage({messageId:s,success:!1,error:c.message}):postMessage({messageId:s,success:!0,result:c},u||void 0)})}catch(c){postMessage({messageId:s,success:!1,error:c.stack})}})}function lv(r){var e=function(){for(var t=[],i=arguments.length;i--;)t[i]=arguments[i];return e._getInitResult().then(function(a){if(typeof a=="function")return a.apply(void 0,t);throw new Error("Worker module function was called but `init` did not return a callable function")})};return e._getInitResult=function(){var t=r.dependencies,i=r.init;t=Array.isArray(t)?t.map(function(n){return n&&(n=n.onMainThread||n,n._getInitResult&&(n=n._getInitResult())),n}):[];var a=Promise.all(t).then(function(n){return i.apply(null,n)});return e._getInitResult=function(){return a},a},e}var yu=function(){var r=!1;if(typeof window<"u"&&typeof window.document<"u")try{var e=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));e.terminate(),r=!0}catch(t){typeof process<"u"&&!1||console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+t.message+"]")}return yu=function(){return r},r},cv=0,uv=0,Gs=!1,bn=Object.create(null),Sn=Object.create(null),Hs=Object.create(null);function Ua(r){if((!r||typeof r.init!="function")&&!Gs)throw new Error("requires `options.init` function");var e=r.dependencies,t=r.init,i=r.getTransferables,a=r.workerId,n=lv(r);a==null&&(a="#default");var s="workerModule"+ ++cv,o=r.name||s,l=null;e=e&&e.map(function(u){return typeof u=="function"&&!u.workerModuleData&&(Gs=!0,u=Ua({workerId:a,name:"<"+o+"> function dependency: "+u.name,init:`function(){return (
`+Eo(u)+`
)}`}),Gs=!1),u&&u.workerModuleData&&(u=u.workerModuleData),u});function c(){for(var u=[],h=arguments.length;h--;)u[h]=arguments[h];if(!yu())return n.apply(void 0,u);if(!l){l=bu(a,"registerModule",c.workerModuleData);var d=function(){l=null,Sn[a].delete(d)};(Sn[a]||(Sn[a]=new Set)).add(d)}return l.then(function(f){var g=f.isCallable;if(g)return bu(a,"callModule",{id:s,args:u});throw new Error("Worker module function was called but `init` did not return a callable function")})}return c.workerModuleData={isWorkerModule:!0,id:s,name:o,dependencies:e,init:Eo(t),getTransferables:i&&Eo(i)},c.onMainThread=n,c}function hv(r){Sn[r]&&Sn[r].forEach(function(e){e()}),bn[r]&&(bn[r].terminate(),delete bn[r])}function Eo(r){var e=r.toString();return!/^function/.test(e)&&/^\w+\s*\(/.test(e)&&(e="function "+e),e}function dv(r){var e=bn[r];if(!e){var t=Eo(sv);e=bn[r]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+r.replace(/\*/g,"")+` **/

;(`+t+")()"],{type:"application/javascript"}))),e.onmessage=function(i){var a=i.data,n=a.messageId,s=Hs[n];if(!s)throw new Error("WorkerModule response with empty or unknown messageId");delete Hs[n],s(a)}}return e}function bu(r,e,t){return new Promise(function(i,a){var n=++uv;Hs[n]=function(s){s.success?i(s.result):a(new Error("Error in worker "+e+" call: "+s.error))},dv(r).postMessage({messageId:n,action:e,data:t})})}function Su(){var r=(function(e){function t(z,q,y,B,W,I,V,Q){var ee=1-V;Q.x=ee*ee*z+2*ee*V*y+V*V*W,Q.y=ee*ee*q+2*ee*V*B+V*V*I}function i(z,q,y,B,W,I,V,Q,ee,ie){var le=1-ee;ie.x=le*le*le*z+3*le*le*ee*y+3*le*ee*ee*W+ee*ee*ee*V,ie.y=le*le*le*q+3*le*le*ee*B+3*le*ee*ee*I+ee*ee*ee*Q}function a(z,q){for(var y=/([MLQCZ])([^MLQCZ]*)/g,B,W,I,V,Q;B=y.exec(z);){var ee=B[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(ie){return parseFloat(ie)});switch(B[1]){case"M":V=W=ee[0],Q=I=ee[1];break;case"L":(ee[0]!==V||ee[1]!==Q)&&q("L",V,Q,V=ee[0],Q=ee[1]);break;case"Q":{q("Q",V,Q,V=ee[2],Q=ee[3],ee[0],ee[1]);break}case"C":{q("C",V,Q,V=ee[4],Q=ee[5],ee[0],ee[1],ee[2],ee[3]);break}case"Z":(V!==W||Q!==I)&&q("L",V,Q,W,I);break}}}function n(z,q,y){y===void 0&&(y=16);var B={x:0,y:0};a(z,function(W,I,V,Q,ee,ie,le,Me,K){switch(W){case"L":q(I,V,Q,ee);break;case"Q":{for(var L=I,Ae=V,me=1;me<y;me++)t(I,V,ie,le,Q,ee,me/(y-1),B),q(L,Ae,B.x,B.y),L=B.x,Ae=B.y;break}case"C":{for(var pe=I,ue=V,Se=1;Se<y;Se++)i(I,V,ie,le,Me,K,Q,ee,Se/(y-1),B),q(pe,ue,B.x,B.y),pe=B.x,ue=B.y;break}}})}var s="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",o="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",l=new WeakMap,c={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function u(z,q){var y=z.getContext?z.getContext("webgl",c):z,B=l.get(y);if(!B){let le=function(pe){var ue=I[pe];if(!ue&&(ue=I[pe]=y.getExtension(pe),!ue))throw new Error(pe+" not supported");return ue},Me=function(pe,ue){var Se=y.createShader(ue);return y.shaderSource(Se,pe),y.compileShader(Se),Se},K=function(pe,ue,Se,oe){if(!V[pe]){var ge={},ye={},R=y.createProgram();y.attachShader(R,Me(ue,y.VERTEX_SHADER)),y.attachShader(R,Me(Se,y.FRAGMENT_SHADER)),y.linkProgram(R),V[pe]={program:R,transaction:function(A){y.useProgram(R),A({setUniform:function(H,G){for(var te=[],J=arguments.length-2;J-- >0;)te[J]=arguments[J+2];var Ce=ye[G]||(ye[G]=y.getUniformLocation(R,G));y["uniform"+H].apply(y,[Ce].concat(te))},setAttribute:function(H,G,te,J,Ce){var fe=ge[H];fe||(fe=ge[H]={buf:y.createBuffer(),loc:y.getAttribLocation(R,H),data:null}),y.bindBuffer(y.ARRAY_BUFFER,fe.buf),y.vertexAttribPointer(fe.loc,G,y.FLOAT,!1,0,0),y.enableVertexAttribArray(fe.loc),W?y.vertexAttribDivisor(fe.loc,J):le("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(fe.loc,J),Ce!==fe.data&&(y.bufferData(y.ARRAY_BUFFER,Ce,te),fe.data=Ce)}})}}}V[pe].transaction(oe)},L=function(pe,ue){ee++;try{y.activeTexture(y.TEXTURE0+ee);var Se=Q[pe];Se||(Se=Q[pe]=y.createTexture(),y.bindTexture(y.TEXTURE_2D,Se),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MIN_FILTER,y.NEAREST),y.texParameteri(y.TEXTURE_2D,y.TEXTURE_MAG_FILTER,y.NEAREST)),y.bindTexture(y.TEXTURE_2D,Se),ue(Se,ee)}finally{ee--}},Ae=function(pe,ue,Se){var oe=y.createFramebuffer();ie.push(oe),y.bindFramebuffer(y.FRAMEBUFFER,oe),y.activeTexture(y.TEXTURE0+ue),y.bindTexture(y.TEXTURE_2D,pe),y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,pe,0);try{Se(oe)}finally{y.deleteFramebuffer(oe),y.bindFramebuffer(y.FRAMEBUFFER,ie[--ie.length-1]||null)}},me=function(){I={},V={},Q={},ee=-1,ie.length=0};var W=typeof WebGL2RenderingContext<"u"&&y instanceof WebGL2RenderingContext,I={},V={},Q={},ee=-1,ie=[];y.canvas.addEventListener("webglcontextlost",function(pe){me(),pe.preventDefault()},!1),l.set(y,B={gl:y,isWebGL2:W,getExtension:le,withProgram:K,withTexture:L,withTextureFramebuffer:Ae,handleContextLoss:me})}q(B)}function h(z,q,y,B,W,I,V,Q){V===void 0&&(V=15),Q===void 0&&(Q=null),u(z,function(ee){var ie=ee.gl,le=ee.withProgram,Me=ee.withTexture;Me("copy",function(K,L){ie.texImage2D(ie.TEXTURE_2D,0,ie.RGBA,W,I,0,ie.RGBA,ie.UNSIGNED_BYTE,q),le("copy",s,o,function(Ae){var me=Ae.setUniform,pe=Ae.setAttribute;pe("aUV",2,ie.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),me("1i","image",L),ie.bindFramebuffer(ie.FRAMEBUFFER,Q||null),ie.disable(ie.BLEND),ie.colorMask(V&8,V&4,V&2,V&1),ie.viewport(y,B,W,I),ie.scissor(y,B,W,I),ie.drawArrays(ie.TRIANGLES,0,3)})})})}function d(z,q,y){var B=z.width,W=z.height;u(z,function(I){var V=I.gl,Q=new Uint8Array(B*W*4);V.readPixels(0,0,B,W,V.RGBA,V.UNSIGNED_BYTE,Q),z.width=q,z.height=y,h(V,Q,0,0,B,W)})}var f=Object.freeze({__proto__:null,withWebGLContext:u,renderImageData:h,resizeWebGLCanvasWithoutClearing:d});function g(z,q,y,B,W,I){I===void 0&&(I=1);var V=new Uint8Array(z*q),Q=B[2]-B[0],ee=B[3]-B[1],ie=[];n(y,function(pe,ue,Se,oe){ie.push({x1:pe,y1:ue,x2:Se,y2:oe,minX:Math.min(pe,Se),minY:Math.min(ue,oe),maxX:Math.max(pe,Se),maxY:Math.max(ue,oe)})}),ie.sort(function(pe,ue){return pe.maxX-ue.maxX});for(var le=0;le<z;le++)for(var Me=0;Me<q;Me++){var K=Ae(B[0]+Q*(le+.5)/z,B[1]+ee*(Me+.5)/q),L=Math.pow(1-Math.abs(K)/W,I)/2;K<0&&(L=1-L),L=Math.max(0,Math.min(255,Math.round(L*255))),V[Me*z+le]=L}return V;function Ae(pe,ue){for(var Se=1/0,oe=1/0,ge=ie.length;ge--;){var ye=ie[ge];if(ye.maxX+oe<=pe)break;if(pe+oe>ye.minX&&ue-oe<ye.maxY&&ue+oe>ye.minY){var R=p(pe,ue,ye.x1,ye.y1,ye.x2,ye.y2);R<Se&&(Se=R,oe=Math.sqrt(Se))}}return me(pe,ue)&&(oe=-oe),oe}function me(pe,ue){for(var Se=0,oe=ie.length;oe--;){var ge=ie[oe];if(ge.maxX<=pe)break;var ye=ge.y1>ue!=ge.y2>ue&&pe<(ge.x2-ge.x1)*(ue-ge.y1)/(ge.y2-ge.y1)+ge.x1;ye&&(Se+=ge.y1<ge.y2?1:-1)}return Se!==0}}function _(z,q,y,B,W,I,V,Q,ee,ie){I===void 0&&(I=1),Q===void 0&&(Q=0),ee===void 0&&(ee=0),ie===void 0&&(ie=0),m(z,q,y,B,W,I,V,null,Q,ee,ie)}function m(z,q,y,B,W,I,V,Q,ee,ie,le){I===void 0&&(I=1),ee===void 0&&(ee=0),ie===void 0&&(ie=0),le===void 0&&(le=0);for(var Me=g(z,q,y,B,W,I),K=new Uint8Array(Me.length*4),L=0;L<Me.length;L++)K[L*4+le]=Me[L];h(V,K,ee,ie,z,q,1<<3-le,Q)}function p(z,q,y,B,W,I){var V=W-y,Q=I-B,ee=V*V+Q*Q,ie=ee?Math.max(0,Math.min(1,((z-y)*V+(q-B)*Q)/ee)):0,le=z-(y+ie*V),Me=q-(B+ie*Q);return le*le+Me*Me}var x=Object.freeze({__proto__:null,generate:g,generateIntoCanvas:_,generateIntoFramebuffer:m}),v="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",b="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",w="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",T=new Float32Array([0,0,2,0,0,2]),M=null,E=!1,O={},S=new WeakMap;function C(z){if(!E&&!k(z))throw new Error("WebGL generation not supported")}function U(z,q,y,B,W,I,V){if(I===void 0&&(I=1),V===void 0&&(V=null),!V&&(V=M,!V)){var Q=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!Q)throw new Error("OffscreenCanvas or DOM canvas not supported");V=M=Q.getContext("webgl",{depth:!1})}C(V);var ee=new Uint8Array(z*q*4);u(V,function(K){var L=K.gl,Ae=K.withTexture,me=K.withTextureFramebuffer;Ae("readable",function(pe,ue){L.texImage2D(L.TEXTURE_2D,0,L.RGBA,z,q,0,L.RGBA,L.UNSIGNED_BYTE,null),me(pe,ue,function(Se){D(z,q,y,B,W,I,L,Se,0,0,0),L.readPixels(0,0,z,q,L.RGBA,L.UNSIGNED_BYTE,ee)})})});for(var ie=new Uint8Array(z*q),le=0,Me=0;le<ee.length;le+=4)ie[Me++]=ee[le];return ie}function N(z,q,y,B,W,I,V,Q,ee,ie){I===void 0&&(I=1),Q===void 0&&(Q=0),ee===void 0&&(ee=0),ie===void 0&&(ie=0),D(z,q,y,B,W,I,V,null,Q,ee,ie)}function D(z,q,y,B,W,I,V,Q,ee,ie,le){I===void 0&&(I=1),ee===void 0&&(ee=0),ie===void 0&&(ie=0),le===void 0&&(le=0),C(V);var Me=[];n(y,function(K,L,Ae,me){Me.push(K,L,Ae,me)}),Me=new Float32Array(Me),u(V,function(K){var L=K.gl,Ae=K.isWebGL2,me=K.getExtension,pe=K.withProgram,ue=K.withTexture,Se=K.withTextureFramebuffer,oe=K.handleContextLoss;if(ue("rawDistances",function(ge,ye){(z!==ge._lastWidth||q!==ge._lastHeight)&&L.texImage2D(L.TEXTURE_2D,0,L.RGBA,ge._lastWidth=z,ge._lastHeight=q,0,L.RGBA,L.UNSIGNED_BYTE,null),pe("main",v,b,function(R){var A=R.setAttribute,H=R.setUniform,G=!Ae&&me("ANGLE_instanced_arrays"),te=!Ae&&me("EXT_blend_minmax");A("aUV",2,L.STATIC_DRAW,0,T),A("aLineSegment",4,L.DYNAMIC_DRAW,1,Me),H.apply(void 0,["4f","uGlyphBounds"].concat(B)),H("1f","uMaxDistance",W),H("1f","uExponent",I),Se(ge,ye,function(J){L.enable(L.BLEND),L.colorMask(!0,!0,!0,!0),L.viewport(0,0,z,q),L.scissor(0,0,z,q),L.blendFunc(L.ONE,L.ONE),L.blendEquationSeparate(L.FUNC_ADD,Ae?L.MAX:te.MAX_EXT),L.clear(L.COLOR_BUFFER_BIT),Ae?L.drawArraysInstanced(L.TRIANGLES,0,3,Me.length/4):G.drawArraysInstancedANGLE(L.TRIANGLES,0,3,Me.length/4)})}),pe("post",s,w,function(R){R.setAttribute("aUV",2,L.STATIC_DRAW,0,T),R.setUniform("1i","tex",ye),L.bindFramebuffer(L.FRAMEBUFFER,Q),L.disable(L.BLEND),L.colorMask(le===0,le===1,le===2,le===3),L.viewport(ee,ie,z,q),L.scissor(ee,ie,z,q),L.drawArrays(L.TRIANGLES,0,3)})}),L.isContextLost())throw oe(),new Error("webgl context lost")})}function k(z){var q=!z||z===M?O:z.canvas||z,y=S.get(q);if(y===void 0){E=!0;var B=null;try{var W=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],I=U(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,z);y=I&&W.length===I.length&&I.every(function(V,Q){return V===W[Q]}),y||(B="bad trial run results",console.info(W,I))}catch(V){y=!1,B=V.message}B&&console.warn("WebGL SDF generation not supported:",B),E=!1,S.set(q,y)}return y}var F=Object.freeze({__proto__:null,generate:U,generateIntoCanvas:N,generateIntoFramebuffer:D,isSupported:k});function X(z,q,y,B,W,I){W===void 0&&(W=Math.max(B[2]-B[0],B[3]-B[1])/2),I===void 0&&(I=1);try{return U.apply(F,arguments)}catch(V){return console.info("WebGL SDF generation failed, falling back to JS",V),g.apply(x,arguments)}}function Y(z,q,y,B,W,I,V,Q,ee,ie){W===void 0&&(W=Math.max(B[2]-B[0],B[3]-B[1])/2),I===void 0&&(I=1),Q===void 0&&(Q=0),ee===void 0&&(ee=0),ie===void 0&&(ie=0);try{return N.apply(F,arguments)}catch(le){return console.info("WebGL SDF generation failed, falling back to JS",le),_.apply(x,arguments)}}return e.forEachPathCommand=a,e.generate=X,e.generateIntoCanvas=Y,e.javascript=x,e.pathToLineSegments=n,e.webgl=F,e.webglUtils=f,Object.defineProperty(e,"__esModule",{value:!0}),e})({});return r}function fv(){var r=(function(e){var t={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},i={},a={};i.L=1,a[1]="L",Object.keys(t).forEach(function(oe,ge){i[oe]=1<<ge+1,a[i[oe]]=oe}),Object.freeze(i);var n=i.LRI|i.RLI|i.FSI,s=i.L|i.R|i.AL,o=i.B|i.S|i.WS|i.ON|i.FSI|i.LRI|i.RLI|i.PDI,l=i.BN|i.RLE|i.LRE|i.RLO|i.LRO|i.PDF,c=i.S|i.WS|i.B|n|i.PDI|l,u=null;function h(){if(!u){u=new Map;var oe=function(ye){if(t.hasOwnProperty(ye)){var R=0;t[ye].split(",").forEach(function(A){var H=A.split("+"),G=H[0],te=H[1];G=parseInt(G,36),te=te?parseInt(te,36):0,u.set(R+=G,i[ye]);for(var J=0;J<te;J++)u.set(++R,i[ye])})}};for(var ge in t)oe(ge)}}function d(oe){return h(),u.get(oe.codePointAt(0))||i.L}function f(oe){return a[d(oe)]}var g={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function _(oe,ge){var ye=36,R=0,A=new Map,H=ge&&new Map,G;return oe.split(",").forEach(function te(J){if(J.indexOf("+")!==-1)for(var Ce=+J;Ce--;)te(G);else{G=J;var fe=J.split(">"),ce=fe[0],ve=fe[1];ce=String.fromCodePoint(R+=parseInt(ce,ye)),ve=String.fromCodePoint(R+=parseInt(ve,ye)),A.set(ce,ve),ge&&H.set(ve,ce)}}),{map:A,reverseMap:H}}var m,p,x;function v(){if(!m){var oe=_(g.pairs,!0),ge=oe.map,ye=oe.reverseMap;m=ge,p=ye,x=_(g.canonical,!1).map}}function b(oe){return v(),m.get(oe)||null}function w(oe){return v(),p.get(oe)||null}function T(oe){return v(),x.get(oe)||null}var M=i.L,E=i.R,O=i.EN,S=i.ES,C=i.ET,U=i.AN,N=i.CS,D=i.B,k=i.S,F=i.ON,X=i.BN,Y=i.NSM,z=i.AL,q=i.LRO,y=i.RLO,B=i.LRE,W=i.RLE,I=i.PDF,V=i.LRI,Q=i.RLI,ee=i.FSI,ie=i.PDI;function le(oe,ge){for(var ye=125,R=new Uint32Array(oe.length),A=0;A<oe.length;A++)R[A]=d(oe[A]);var H=new Map;function G(Kt,Li){var $t=R[Kt];R[Kt]=Li,H.set($t,H.get($t)-1),$t&o&&H.set(o,H.get(o)-1),H.set(Li,(H.get(Li)||0)+1),Li&o&&H.set(o,(H.get(o)||0)+1)}for(var te=new Uint8Array(oe.length),J=new Map,Ce=[],fe=null,ce=0;ce<oe.length;ce++)fe||Ce.push(fe={start:ce,end:oe.length-1,level:ge==="rtl"?1:ge==="ltr"?0:Ql(ce,!1)}),R[ce]&D&&(fe.end=ce,fe=null);for(var ve=W|B|y|q|n|ie|I|D,Ne=function(Kt){return Kt+(Kt&1?1:2)},de=function(Kt){return Kt+(Kt&1?2:1)},qe=0;qe<Ce.length;qe++){fe=Ce[qe];var Ee=[{_level:fe.level,_override:0,_isolate:0}],we=void 0,Pe=0,De=0,Be=0;H.clear();for(var Re=fe.start;Re<=fe.end;Re++){var Oe=R[Re];if(we=Ee[Ee.length-1],H.set(Oe,(H.get(Oe)||0)+1),Oe&o&&H.set(o,(H.get(o)||0)+1),Oe&ve)if(Oe&(W|B)){te[Re]=we._level;var j=(Oe===W?de:Ne)(we._level);j<=ye&&!Pe&&!De?Ee.push({_level:j,_override:0,_isolate:0}):Pe||De++}else if(Oe&(y|q)){te[Re]=we._level;var _e=(Oe===y?de:Ne)(we._level);_e<=ye&&!Pe&&!De?Ee.push({_level:_e,_override:Oe&y?E:M,_isolate:0}):Pe||De++}else if(Oe&n){Oe&ee&&(Oe=Ql(Re+1,!0)===1?Q:V),te[Re]=we._level,we._override&&G(Re,we._override);var Z=(Oe===Q?de:Ne)(we._level);Z<=ye&&Pe===0&&De===0?(Be++,Ee.push({_level:Z,_override:0,_isolate:1,_isolInitIndex:Re})):Pe++}else if(Oe&ie){if(Pe>0)Pe--;else if(Be>0){for(De=0;!Ee[Ee.length-1]._isolate;)Ee.pop();var Te=Ee[Ee.length-1]._isolInitIndex;Te!=null&&(J.set(Te,Re),J.set(Re,Te)),Ee.pop(),Be--}we=Ee[Ee.length-1],te[Re]=we._level,we._override&&G(Re,we._override)}else Oe&I?(Pe===0&&(De>0?De--:!we._isolate&&Ee.length>1&&(Ee.pop(),we=Ee[Ee.length-1])),te[Re]=we._level):Oe&D&&(te[Re]=fe.level);else te[Re]=we._level,we._override&&Oe!==X&&G(Re,we._override)}for(var be=[],Fe=null,ke=fe.start;ke<=fe.end;ke++){var tt=R[ke];if(!(tt&l)){var rt=te[ke],Ve=tt&n,ut=tt===ie;Fe&&rt===Fe._level?(Fe._end=ke,Fe._endsWithIsolInit=Ve):be.push(Fe={_start:ke,_end:ke,_level:rt,_startsWithPDI:ut,_endsWithIsolInit:Ve})}}for(var Ct=[],bi=0;bi<be.length;bi++){var Ri=be[bi];if(!Ri._startsWithPDI||Ri._startsWithPDI&&!J.has(Ri._start)){for(var ai=[Fe=Ri],zi=void 0;Fe&&Fe._endsWithIsolInit&&(zi=J.get(Fe._end))!=null;)for(var Dt=bi+1;Dt<be.length;Dt++)if(be[Dt]._start===zi){ai.push(Fe=be[Dt]);break}for(var ni=[],aa=0;aa<ai.length;aa++)for(var Gn=ai[aa],Qa=Gn._start;Qa<=Gn._end;Qa++)ni.push(Qa);for(var Ko=te[ni[0]],P=fe.level,$=ni[0]-1;$>=0;$--)if(!(R[$]&l)){P=te[$];break}var ne=ni[ni.length-1],se=te[ne],re=fe.level;if(!(R[ne]&n)){for(var Le=ne+1;Le<=fe.end;Le++)if(!(R[Le]&l)){re=te[Le];break}}Ct.push({_seqIndices:ni,_sosType:Math.max(P,Ko)%2?E:M,_eosType:Math.max(re,se)%2?E:M})}}for(var ze=0;ze<Ct.length;ze++){var Ge=Ct[ze],xe=Ge._seqIndices,Ye=Ge._sosType,Ke=Ge._eosType,We=te[xe[0]]&1?E:M;if(H.get(Y))for(var yt=0;yt<xe.length;yt++){var _t=xe[yt];if(R[_t]&Y){for(var Ft=Ye,Yt=yt-1;Yt>=0;Yt--)if(!(R[xe[Yt]]&l)){Ft=R[xe[Yt]];break}G(_t,Ft&(n|ie)?F:Ft)}}if(H.get(O))for(var ct=0;ct<xe.length;ct++){var je=xe[ct];if(R[je]&O)for(var sr=ct-1;sr>=-1;sr--){var na=sr===-1?Ye:R[xe[sr]];if(na&s){na===z&&G(je,U);break}}}if(H.get(z))for(var Ci=0;Ci<xe.length;Ci++){var Ja=xe[Ci];R[Ja]&z&&G(Ja,E)}if(H.get(S)||H.get(N))for(var Di=1;Di<xe.length-1;Di++){var Dr=xe[Di];if(R[Dr]&(S|N)){for(var pt=0,Pi=0,Pr=Di-1;Pr>=0&&(pt=R[xe[Pr]],!!(pt&l));Pr--);for(var Nt=Di+1;Nt<xe.length&&(Pi=R[xe[Nt]],!!(Pi&l));Nt++);pt===Pi&&(R[Dr]===S?pt===O:pt&(O|U))&&G(Dr,pt)}}if(H.get(O))for(var Zt=0;Zt<xe.length;Zt++){var $o=xe[Zt];if(R[$o]&O){for(var Ur=Zt-1;Ur>=0&&R[xe[Ur]]&(C|l);Ur--)G(xe[Ur],O);for(Zt++;Zt<xe.length&&R[xe[Zt]]&(C|l|O);Zt++)R[xe[Zt]]!==O&&G(xe[Zt],O)}}if(H.get(C)||H.get(S)||H.get(N))for(var en=0;en<xe.length;en++){var kl=xe[en];if(R[kl]&(C|S|N)){G(kl,F);for(var Hn=en-1;Hn>=0&&R[xe[Hn]]&l;Hn--)G(xe[Hn],F);for(var Vn=en+1;Vn<xe.length&&R[xe[Vn]]&l;Vn++)G(xe[Vn],F)}}if(H.get(O))for(var Qo=0,Bl=Ye;Qo<xe.length;Qo++){var Gl=xe[Qo],Jo=R[Gl];Jo&O?Bl===M&&G(Gl,M):Jo&s&&(Bl=Jo)}if(H.get(o)){var tn=E|O|U,Hl=tn|M,Wn=[];{for(var oa=[],sa=0;sa<xe.length;sa++)if(R[xe[sa]]&o){var rn=oe[xe[sa]],Vl=void 0;if(b(rn)!==null)if(oa.length<63)oa.push({char:rn,seqIndex:sa});else break;else if((Vl=w(rn))!==null)for(var an=oa.length-1;an>=0;an--){var es=oa[an].char;if(es===Vl||es===w(T(rn))||b(T(es))===rn){Wn.push([oa[an].seqIndex,sa]),oa.length=an;break}}}Wn.sort(function(Kt,Li){return Kt[0]-Li[0]})}for(var ts=0;ts<Wn.length;ts++){for(var Wl=Wn[ts],Xn=Wl[0],is=Wl[1],Xl=!1,Ui=0,rs=Xn+1;rs<is;rs++){var ql=xe[rs];if(R[ql]&Hl){Xl=!0;var jl=R[ql]&tn?E:M;if(jl===We){Ui=jl;break}}}if(Xl&&!Ui){Ui=Ye;for(var as=Xn-1;as>=0;as--){var Yl=xe[as];if(R[Yl]&Hl){var Zl=R[Yl]&tn?E:M;Zl!==We?Ui=Zl:Ui=We;break}}}if(Ui){if(R[xe[Xn]]=R[xe[is]]=Ui,Ui!==We){for(var nn=Xn+1;nn<xe.length;nn++)if(!(R[xe[nn]]&l)){d(oe[xe[nn]])&Y&&(R[xe[nn]]=Ui);break}}if(Ui!==We){for(var on=is+1;on<xe.length;on++)if(!(R[xe[on]]&l)){d(oe[xe[on]])&Y&&(R[xe[on]]=Ui);break}}}}for(var lr=0;lr<xe.length;lr++)if(R[xe[lr]]&o){for(var Kl=lr,ns=lr,os=Ye,sn=lr-1;sn>=0;sn--)if(R[xe[sn]]&l)Kl=sn;else{os=R[xe[sn]]&tn?E:M;break}for(var $l=Ke,ln=lr+1;ln<xe.length;ln++)if(R[xe[ln]]&(o|l))ns=ln;else{$l=R[xe[ln]]&tn?E:M;break}for(var ss=Kl;ss<=ns;ss++)R[xe[ss]]=os===$l?os:We;lr=ns}}}for(var oi=fe.start;oi<=fe.end;oi++){var fd=te[oi],qn=R[oi];if(fd&1?qn&(M|O|U)&&te[oi]++:qn&E?te[oi]++:qn&(U|O)&&(te[oi]+=2),qn&l&&(te[oi]=oi===0?fe.level:te[oi-1]),oi===fe.end||d(oe[oi])&(k|D))for(var jn=oi;jn>=0&&d(oe[jn])&c;jn--)te[jn]=fe.level}}return{levels:te,paragraphs:Ce};function Ql(Kt,Li){for(var $t=Kt;$t<oe.length;$t++){var cr=R[$t];if(cr&(E|z))return 1;if(cr&(D|M)||Li&&cr===ie)return 0;if(cr&n){var Jl=pd($t);$t=Jl===-1?oe.length:Jl}}return 0}function pd(Kt){for(var Li=1,$t=Kt+1;$t<oe.length;$t++){var cr=R[$t];if(cr&D)break;if(cr&ie){if(--Li===0)return $t}else cr&n&&Li++}return-1}}var Me="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",K;function L(){if(!K){var oe=_(Me,!0),ge=oe.map,ye=oe.reverseMap;ye.forEach(function(R,A){ge.set(A,R)}),K=ge}}function Ae(oe){return L(),K.get(oe)||null}function me(oe,ge,ye,R){var A=oe.length;ye=Math.max(0,ye==null?0:+ye),R=Math.min(A-1,R==null?A-1:+R);for(var H=new Map,G=ye;G<=R;G++)if(ge[G]&1){var te=Ae(oe[G]);te!==null&&H.set(G,te)}return H}function pe(oe,ge,ye,R){var A=oe.length;ye=Math.max(0,ye==null?0:+ye),R=Math.min(A-1,R==null?A-1:+R);var H=[];return ge.paragraphs.forEach(function(G){var te=Math.max(ye,G.start),J=Math.min(R,G.end);if(te<J){for(var Ce=ge.levels.slice(te,J+1),fe=J;fe>=te&&d(oe[fe])&c;fe--)Ce[fe]=G.level;for(var ce=G.level,ve=1/0,Ne=0;Ne<Ce.length;Ne++){var de=Ce[Ne];de>ce&&(ce=de),de<ve&&(ve=de|1)}for(var qe=ce;qe>=ve;qe--)for(var Ee=0;Ee<Ce.length;Ee++)if(Ce[Ee]>=qe){for(var we=Ee;Ee+1<Ce.length&&Ce[Ee+1]>=qe;)Ee++;Ee>we&&H.push([we+te,Ee+te])}}}),H}function ue(oe,ge,ye,R){var A=Se(oe,ge,ye,R),H=[].concat(oe);return A.forEach(function(G,te){H[te]=(ge.levels[G]&1?Ae(oe[G]):null)||oe[G]}),H.join("")}function Se(oe,ge,ye,R){for(var A=pe(oe,ge,ye,R),H=[],G=0;G<oe.length;G++)H[G]=G;return A.forEach(function(te){for(var J=te[0],Ce=te[1],fe=H.slice(J,Ce+1),ce=fe.length;ce--;)H[Ce-ce]=fe[ce]}),H}return e.closingToOpeningBracket=w,e.getBidiCharType=d,e.getBidiCharTypeName=f,e.getCanonicalBracket=T,e.getEmbeddingLevels=le,e.getMirroredCharacter=Ae,e.getMirroredCharactersMap=me,e.getReorderSegments=pe,e.getReorderedIndices=Se,e.getReorderedString=ue,e.openingToClosingBracket=b,Object.defineProperty(e,"__esModule",{value:!0}),e})({});return r}const Mu=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Vs(r){const e=/^[ \t]*#include +<([\w\d./]+)>/gm;function t(i,a){let n=$e[a];return n?Vs(n):i}return r.replace(e,t)}const Lt=[];for(let r=0;r<256;r++)Lt[r]=(r<16?"0":"")+r.toString(16);function pv(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[r&255]+Lt[r>>8&255]+Lt[r>>16&255]+Lt[r>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toUpperCase()}const Wr=Object.assign||function(){let r=arguments[0];for(let e=1,t=arguments.length;e<t;e++){let i=arguments[e];if(i)for(let a in i)Object.prototype.hasOwnProperty.call(i,a)&&(r[a]=i[a])}return r},mv=Date.now(),wu=new WeakMap,Tu=new Map;let gv=1e10;function Ws(r,e){const t=yv(e);let i=wu.get(r);if(i||wu.set(r,i=Object.create(null)),i[t])return new i[t];const a=`_onBeforeCompile${t}`,n=function(c,u){r.onBeforeCompile.call(this,c,u);const h=this.customProgramCacheKey()+"|"+c.vertexShader+"|"+c.fragmentShader;let d=Tu[h];if(!d){const f=vv(this,c,e,t);d=Tu[h]=f}c.vertexShader=d.vertexShader,c.fragmentShader=d.fragmentShader,Wr(c.uniforms,this.uniforms),e.timeUniform&&(c.uniforms[e.timeUniform]={get value(){return Date.now()-mv}}),this[a]&&this[a](c)},s=function(){return o(e.chained?r:r.clone())},o=function(c){const u=Object.create(c,l);return Object.defineProperty(u,"baseMaterial",{value:r}),Object.defineProperty(u,"id",{value:gv++}),u.uuid=pv(),u.uniforms=Wr({},c.uniforms,e.uniforms),u.defines=Wr({},c.defines,e.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${t}`]="",u.extensions=Wr({},c.extensions,e.extensions),u._listeners=void 0,u},l={constructor:{value:s},isDerivedMaterial:{value:!0},type:{get:()=>r.type,set:c=>{r.type=c}},isDerivedFrom:{writable:!0,configurable:!0,value:function(c){const u=this.baseMaterial;return c===u||u.isDerivedMaterial&&u.isDerivedFrom(c)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return r.customProgramCacheKey()+"|"+t}},onBeforeCompile:{get(){return n},set(c){this[a]=c}},copy:{writable:!0,configurable:!0,value:function(c){return r.copy.call(this,c),!r.isShaderMaterial&&!r.isDerivedMaterial&&(Wr(this.extensions,c.extensions),Wr(this.defines,c.defines),Wr(this.uniforms,Bi.clone(c.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const c=new r.constructor;return o(c).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let c=this._depthMaterial;return c||(c=this._depthMaterial=Ws(r.isDerivedMaterial?r.getDepthMaterial():new lu({depthPacking:3201}),e),c.defines.IS_DEPTH_MATERIAL="",c.uniforms=this.uniforms),c}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let c=this._distanceMaterial;return c||(c=this._distanceMaterial=Ws(r.isDerivedMaterial?r.getDistanceMaterial():new cu,e),c.defines.IS_DISTANCE_MATERIAL="",c.uniforms=this.uniforms),c}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:c,_distanceMaterial:u}=this;c&&c.dispose(),u&&u.dispose(),r.dispose.call(this)}}};return i[t]=s,new s}function vv(r,{vertexShader:e,fragmentShader:t},i,a){let{vertexDefs:n,vertexMainIntro:s,vertexMainOutro:o,vertexTransform:l,fragmentDefs:c,fragmentMainIntro:u,fragmentMainOutro:h,fragmentColorTransform:d,customRewriter:f,timeUniform:g}=i;if(n=n||"",s=s||"",o=o||"",c=c||"",u=u||"",h=h||"",(l||f)&&(e=Vs(e)),(d||f)&&(t=t.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),t=Vs(t)),f){let _=f({vertexShader:e,fragmentShader:t});e=_.vertexShader,t=_.fragmentShader}if(d){let _=[];t=t.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,m=>(_.push(m),"")),h=`${d}
${_.join(`
`)}
${h}`}if(g){const _=`
uniform float ${g};
`;n=_+n,c=_+c}return l&&(e=`vec3 troika_position_${a};
vec3 troika_normal_${a};
vec2 troika_uv_${a};
${e}
`,n=`${n}
void troikaVertexTransform${a}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${l}
}
`,s=`
troika_position_${a} = vec3(position);
troika_normal_${a} = vec3(normal);
troika_uv_${a} = vec2(uv);
troikaVertexTransform${a}(troika_position_${a}, troika_normal_${a}, troika_uv_${a});
${s}
`,e=e.replace(/\b(position|normal|uv)\b/g,(_,m,p,x)=>/\battribute\s+vec[23]\s+$/.test(x.substr(0,p))?m:`troika_${m}_${a}`),r.map&&r.map.channel>0||(e=e.replace(/\bMAP_UV\b/g,`troika_uv_${a}`))),e=Eu(e,a,n,s,o),t=Eu(t,a,c,u,h),{vertexShader:e,fragmentShader:t}}function Eu(r,e,t,i,a){return(i||a||t)&&(r=r.replace(Mu,`
${t}
void troikaOrigMain${e}() {`),r+=`
void main() {
  ${i}
  troikaOrigMain${e}();
  ${a}
}`),r}function _v(r,e){return r==="uniforms"?void 0:typeof e=="function"?e.toString():e}let xv=0;const Au=new Map;function yv(r){const e=JSON.stringify(r,_v);let t=Au.get(e);return t==null&&Au.set(e,t=++xv),t}function bv(){return typeof window>"u"&&(self.window=self),(function(r){var e={parse:function(a){var n=e._bin,s=new Uint8Array(a);if(n.readASCII(s,0,4)=="ttcf"){var o=4;n.readUshort(s,o),o+=2,n.readUshort(s,o),o+=2;var l=n.readUint(s,o);o+=4;for(var c=[],u=0;u<l;u++){var h=n.readUint(s,o);o+=4,c.push(e._readFont(s,h))}return c}return[e._readFont(s,0)]},_readFont:function(a,n){var s=e._bin,o=n;s.readFixed(a,n),n+=4;var l=s.readUshort(a,n);n+=2,s.readUshort(a,n),n+=2,s.readUshort(a,n),n+=2,s.readUshort(a,n),n+=2;for(var c=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],u={_data:a,_offset:o},h={},d=0;d<l;d++){var f=s.readASCII(a,n,4);n+=4,s.readUint(a,n),n+=4;var g=s.readUint(a,n);n+=4;var _=s.readUint(a,n);n+=4,h[f]={offset:g,length:_}}for(d=0;d<c.length;d++){var m=c[d];h[m]&&(u[m.trim()]=e[m.trim()].parse(a,h[m].offset,h[m].length,u))}return u},_tabOffset:function(a,n,s){for(var o=e._bin,l=o.readUshort(a,s+4),c=s+12,u=0;u<l;u++){var h=o.readASCII(a,c,4);c+=4,o.readUint(a,c),c+=4;var d=o.readUint(a,c);if(c+=4,o.readUint(a,c),c+=4,h==n)return d}return 0}};e._bin={readFixed:function(a,n){return(a[n]<<8|a[n+1])+(a[n+2]<<8|a[n+3])/65540},readF2dot14:function(a,n){return e._bin.readShort(a,n)/16384},readInt:function(a,n){return e._bin._view(a).getInt32(n)},readInt8:function(a,n){return e._bin._view(a).getInt8(n)},readShort:function(a,n){return e._bin._view(a).getInt16(n)},readUshort:function(a,n){return e._bin._view(a).getUint16(n)},readUshorts:function(a,n,s){for(var o=[],l=0;l<s;l++)o.push(e._bin.readUshort(a,n+2*l));return o},readUint:function(a,n){return e._bin._view(a).getUint32(n)},readUint64:function(a,n){return 4294967296*e._bin.readUint(a,n)+e._bin.readUint(a,n+4)},readASCII:function(a,n,s){for(var o="",l=0;l<s;l++)o+=String.fromCharCode(a[n+l]);return o},readUnicode:function(a,n,s){for(var o="",l=0;l<s;l++){var c=a[n++]<<8|a[n++];o+=String.fromCharCode(c)}return o},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(a,n,s){var o=e._bin._tdec;return o&&n==0&&s==a.length?o.decode(a):e._bin.readASCII(a,n,s)},readBytes:function(a,n,s){for(var o=[],l=0;l<s;l++)o.push(a[n+l]);return o},readASCIIArray:function(a,n,s){for(var o=[],l=0;l<s;l++)o.push(String.fromCharCode(a[n+l]));return o},_view:function(a){return a._dataView||(a._dataView=a.buffer?new DataView(a.buffer,a.byteOffset,a.byteLength):new DataView(new Uint8Array(a).buffer))}},e._lctf={},e._lctf.parse=function(a,n,s,o,l){var c=e._bin,u={},h=n;c.readFixed(a,n),n+=4;var d=c.readUshort(a,n);n+=2;var f=c.readUshort(a,n);n+=2;var g=c.readUshort(a,n);return n+=2,u.scriptList=e._lctf.readScriptList(a,h+d),u.featureList=e._lctf.readFeatureList(a,h+f),u.lookupList=e._lctf.readLookupList(a,h+g,l),u},e._lctf.readLookupList=function(a,n,s){var o=e._bin,l=n,c=[],u=o.readUshort(a,n);n+=2;for(var h=0;h<u;h++){var d=o.readUshort(a,n);n+=2;var f=e._lctf.readLookupTable(a,l+d,s);c.push(f)}return c},e._lctf.readLookupTable=function(a,n,s){var o=e._bin,l=n,c={tabs:[]};c.ltype=o.readUshort(a,n),n+=2,c.flag=o.readUshort(a,n),n+=2;var u=o.readUshort(a,n);n+=2;for(var h=c.ltype,d=0;d<u;d++){var f=o.readUshort(a,n);n+=2;var g=s(a,h,l+f,c);c.tabs.push(g)}return c},e._lctf.numOfOnes=function(a){for(var n=0,s=0;s<32;s++)a>>>s&1&&n++;return n},e._lctf.readClassDef=function(a,n){var s=e._bin,o=[],l=s.readUshort(a,n);if(n+=2,l==1){var c=s.readUshort(a,n);n+=2;var u=s.readUshort(a,n);n+=2;for(var h=0;h<u;h++)o.push(c+h),o.push(c+h),o.push(s.readUshort(a,n)),n+=2}if(l==2){var d=s.readUshort(a,n);for(n+=2,h=0;h<d;h++)o.push(s.readUshort(a,n)),n+=2,o.push(s.readUshort(a,n)),n+=2,o.push(s.readUshort(a,n)),n+=2}return o},e._lctf.getInterval=function(a,n){for(var s=0;s<a.length;s+=3){var o=a[s],l=a[s+1];if(a[s+2],o<=n&&n<=l)return s}return-1},e._lctf.readCoverage=function(a,n){var s=e._bin,o={};o.fmt=s.readUshort(a,n),n+=2;var l=s.readUshort(a,n);return n+=2,o.fmt==1&&(o.tab=s.readUshorts(a,n,l)),o.fmt==2&&(o.tab=s.readUshorts(a,n,3*l)),o},e._lctf.coverageIndex=function(a,n){var s=a.tab;if(a.fmt==1)return s.indexOf(n);if(a.fmt==2){var o=e._lctf.getInterval(s,n);if(o!=-1)return s[o+2]+(n-s[o])}return-1},e._lctf.readFeatureList=function(a,n){var s=e._bin,o=n,l=[],c=s.readUshort(a,n);n+=2;for(var u=0;u<c;u++){var h=s.readASCII(a,n,4);n+=4;var d=s.readUshort(a,n);n+=2;var f=e._lctf.readFeatureTable(a,o+d);f.tag=h.trim(),l.push(f)}return l},e._lctf.readFeatureTable=function(a,n){var s=e._bin,o=n,l={},c=s.readUshort(a,n);n+=2,c>0&&(l.featureParams=o+c);var u=s.readUshort(a,n);n+=2,l.tab=[];for(var h=0;h<u;h++)l.tab.push(s.readUshort(a,n+2*h));return l},e._lctf.readScriptList=function(a,n){var s=e._bin,o=n,l={},c=s.readUshort(a,n);n+=2;for(var u=0;u<c;u++){var h=s.readASCII(a,n,4);n+=4;var d=s.readUshort(a,n);n+=2,l[h.trim()]=e._lctf.readScriptTable(a,o+d)}return l},e._lctf.readScriptTable=function(a,n){var s=e._bin,o=n,l={},c=s.readUshort(a,n);n+=2,c>0&&(l.default=e._lctf.readLangSysTable(a,o+c));var u=s.readUshort(a,n);n+=2;for(var h=0;h<u;h++){var d=s.readASCII(a,n,4);n+=4;var f=s.readUshort(a,n);n+=2,l[d.trim()]=e._lctf.readLangSysTable(a,o+f)}return l},e._lctf.readLangSysTable=function(a,n){var s=e._bin,o={};s.readUshort(a,n),n+=2,o.reqFeature=s.readUshort(a,n),n+=2;var l=s.readUshort(a,n);return n+=2,o.features=s.readUshorts(a,n,l),o},e.CFF={},e.CFF.parse=function(a,n,s){var o=e._bin;(a=new Uint8Array(a.buffer,n,s))[n=0],a[++n],a[++n],a[++n],n++;var l=[];n=e.CFF.readIndex(a,n,l);for(var c=[],u=0;u<l.length-1;u++)c.push(o.readASCII(a,n+l[u],l[u+1]-l[u]));n+=l[l.length-1];var h=[];n=e.CFF.readIndex(a,n,h);var d=[];for(u=0;u<h.length-1;u++)d.push(e.CFF.readDict(a,n+h[u],n+h[u+1]));n+=h[h.length-1];var f=d[0],g=[];n=e.CFF.readIndex(a,n,g);var _=[];for(u=0;u<g.length-1;u++)_.push(o.readASCII(a,n+g[u],g[u+1]-g[u]));if(n+=g[g.length-1],e.CFF.readSubrs(a,n,f),f.CharStrings){n=f.CharStrings,g=[],n=e.CFF.readIndex(a,n,g);var m=[];for(u=0;u<g.length-1;u++)m.push(o.readBytes(a,n+g[u],g[u+1]-g[u]));f.CharStrings=m}if(f.ROS){n=f.FDArray;var p=[];for(n=e.CFF.readIndex(a,n,p),f.FDArray=[],u=0;u<p.length-1;u++){var x=e.CFF.readDict(a,n+p[u],n+p[u+1]);e.CFF._readFDict(a,x,_),f.FDArray.push(x)}n+=p[p.length-1],n=f.FDSelect,f.FDSelect=[];var v=a[n];if(n++,v!=3)throw v;var b=o.readUshort(a,n);for(n+=2,u=0;u<b+1;u++)f.FDSelect.push(o.readUshort(a,n),a[n+2]),n+=3}return f.Encoding&&(f.Encoding=e.CFF.readEncoding(a,f.Encoding,f.CharStrings.length)),f.charset&&(f.charset=e.CFF.readCharset(a,f.charset,f.CharStrings.length)),e.CFF._readFDict(a,f,_),f},e.CFF._readFDict=function(a,n,s){var o;for(var l in n.Private&&(o=n.Private[1],n.Private=e.CFF.readDict(a,o,o+n.Private[0]),n.Private.Subrs&&e.CFF.readSubrs(a,o+n.Private.Subrs,n.Private)),n)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(l)!=-1&&(n[l]=s[n[l]-426+35])},e.CFF.readSubrs=function(a,n,s){var o=e._bin,l=[];n=e.CFF.readIndex(a,n,l);var c,u=l.length;c=u<1240?107:u<33900?1131:32768,s.Bias=c,s.Subrs=[];for(var h=0;h<l.length-1;h++)s.Subrs.push(o.readBytes(a,n+l[h],l[h+1]-l[h]))},e.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],e.CFF.glyphByUnicode=function(a,n){for(var s=0;s<a.charset.length;s++)if(a.charset[s]==n)return s;return-1},e.CFF.glyphBySE=function(a,n){return n<0||n>255?-1:e.CFF.glyphByUnicode(a,e.CFF.tableSE[n])},e.CFF.readEncoding=function(a,n,s){e._bin;var o=[".notdef"],l=a[n];if(n++,l!=0)throw"error: unknown encoding format: "+l;var c=a[n];n++;for(var u=0;u<c;u++)o.push(a[n+u]);return o},e.CFF.readCharset=function(a,n,s){var o=e._bin,l=[".notdef"],c=a[n];if(n++,c==0)for(var u=0;u<s;u++){var h=o.readUshort(a,n);n+=2,l.push(h)}else{if(c!=1&&c!=2)throw"error: format: "+c;for(;l.length<s;){h=o.readUshort(a,n),n+=2;var d=0;for(c==1?(d=a[n],n++):(d=o.readUshort(a,n),n+=2),u=0;u<=d;u++)l.push(h),h++}}return l},e.CFF.readIndex=function(a,n,s){var o=e._bin,l=o.readUshort(a,n)+1,c=a[n+=2];if(n++,c==1)for(var u=0;u<l;u++)s.push(a[n+u]);else if(c==2)for(u=0;u<l;u++)s.push(o.readUshort(a,n+2*u));else if(c==3)for(u=0;u<l;u++)s.push(16777215&o.readUint(a,n+3*u-1));else if(l!=1)throw"unsupported offset size: "+c+", count: "+l;return(n+=l*c)-1},e.CFF.getCharString=function(a,n,s){var o=e._bin,l=a[n],c=a[n+1];a[n+2],a[n+3],a[n+4];var u=1,h=null,d=null;l<=20&&(h=l,u=1),l==12&&(h=100*l+c,u=2),21<=l&&l<=27&&(h=l,u=1),l==28&&(d=o.readShort(a,n+1),u=3),29<=l&&l<=31&&(h=l,u=1),32<=l&&l<=246&&(d=l-139,u=1),247<=l&&l<=250&&(d=256*(l-247)+c+108,u=2),251<=l&&l<=254&&(d=256*-(l-251)-c-108,u=2),l==255&&(d=o.readInt(a,n+1)/65535,u=5),s.val=d??"o"+h,s.size=u},e.CFF.readCharString=function(a,n,s){for(var o=n+s,l=e._bin,c=[];n<o;){var u=a[n],h=a[n+1];a[n+2],a[n+3],a[n+4];var d=1,f=null,g=null;u<=20&&(f=u,d=1),u==12&&(f=100*u+h,d=2),u!=19&&u!=20||(f=u,d=2),21<=u&&u<=27&&(f=u,d=1),u==28&&(g=l.readShort(a,n+1),d=3),29<=u&&u<=31&&(f=u,d=1),32<=u&&u<=246&&(g=u-139,d=1),247<=u&&u<=250&&(g=256*(u-247)+h+108,d=2),251<=u&&u<=254&&(g=256*-(u-251)-h-108,d=2),u==255&&(g=l.readInt(a,n+1)/65535,d=5),c.push(g??"o"+f),n+=d}return c},e.CFF.readDict=function(a,n,s){for(var o=e._bin,l={},c=[];n<s;){var u=a[n],h=a[n+1];a[n+2],a[n+3],a[n+4];var d=1,f=null,g=null;if(u==28&&(g=o.readShort(a,n+1),d=3),u==29&&(g=o.readInt(a,n+1),d=5),32<=u&&u<=246&&(g=u-139,d=1),247<=u&&u<=250&&(g=256*(u-247)+h+108,d=2),251<=u&&u<=254&&(g=256*-(u-251)-h-108,d=2),u==255)throw g=o.readInt(a,n+1)/65535,d=5,"unknown number";if(u==30){var _=[];for(d=1;;){var m=a[n+d];d++;var p=m>>4,x=15&m;if(p!=15&&_.push(p),x!=15&&_.push(x),x==15)break}for(var v="",b=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],w=0;w<_.length;w++)v+=b[_[w]];g=parseFloat(v)}u<=21&&(f=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][u],d=1,u==12&&(f=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][h],d=2)),f!=null?(l[f]=c.length==1?c[0]:c,c=[]):c.push(g),n+=d}return l},e.cmap={},e.cmap.parse=function(a,n,s){a=new Uint8Array(a.buffer,n,s),n=0;var o=e._bin,l={};o.readUshort(a,n),n+=2;var c=o.readUshort(a,n);n+=2;var u=[];l.tables=[];for(var h=0;h<c;h++){var d=o.readUshort(a,n);n+=2;var f=o.readUshort(a,n);n+=2;var g=o.readUint(a,n);n+=4;var _="p"+d+"e"+f,m=u.indexOf(g);if(m==-1){var p;m=l.tables.length,u.push(g);var x=o.readUshort(a,g);x==0?p=e.cmap.parse0(a,g):x==4?p=e.cmap.parse4(a,g):x==6?p=e.cmap.parse6(a,g):x==12?p=e.cmap.parse12(a,g):console.debug("unknown format: "+x,d,f,g),l.tables.push(p)}if(l[_]!=null)throw"multiple tables for one platform+encoding";l[_]=m}return l},e.cmap.parse0=function(a,n){var s=e._bin,o={};o.format=s.readUshort(a,n),n+=2;var l=s.readUshort(a,n);n+=2,s.readUshort(a,n),n+=2,o.map=[];for(var c=0;c<l-6;c++)o.map.push(a[n+c]);return o},e.cmap.parse4=function(a,n){var s=e._bin,o=n,l={};l.format=s.readUshort(a,n),n+=2;var c=s.readUshort(a,n);n+=2,s.readUshort(a,n),n+=2;var u=s.readUshort(a,n);n+=2;var h=u/2;l.searchRange=s.readUshort(a,n),n+=2,l.entrySelector=s.readUshort(a,n),n+=2,l.rangeShift=s.readUshort(a,n),n+=2,l.endCount=s.readUshorts(a,n,h),n+=2*h,n+=2,l.startCount=s.readUshorts(a,n,h),n+=2*h,l.idDelta=[];for(var d=0;d<h;d++)l.idDelta.push(s.readShort(a,n)),n+=2;for(l.idRangeOffset=s.readUshorts(a,n,h),n+=2*h,l.glyphIdArray=[];n<o+c;)l.glyphIdArray.push(s.readUshort(a,n)),n+=2;return l},e.cmap.parse6=function(a,n){var s=e._bin,o={};o.format=s.readUshort(a,n),n+=2,s.readUshort(a,n),n+=2,s.readUshort(a,n),n+=2,o.firstCode=s.readUshort(a,n),n+=2;var l=s.readUshort(a,n);n+=2,o.glyphIdArray=[];for(var c=0;c<l;c++)o.glyphIdArray.push(s.readUshort(a,n)),n+=2;return o},e.cmap.parse12=function(a,n){var s=e._bin,o={};o.format=s.readUshort(a,n),n+=2,n+=2,s.readUint(a,n),n+=4,s.readUint(a,n),n+=4;var l=s.readUint(a,n);n+=4,o.groups=[];for(var c=0;c<l;c++){var u=n+12*c,h=s.readUint(a,u+0),d=s.readUint(a,u+4),f=s.readUint(a,u+8);o.groups.push([h,d,f])}return o},e.glyf={},e.glyf.parse=function(a,n,s,o){for(var l=[],c=0;c<o.maxp.numGlyphs;c++)l.push(null);return l},e.glyf._parseGlyf=function(a,n){var s=e._bin,o=a._data,l=e._tabOffset(o,"glyf",a._offset)+a.loca[n];if(a.loca[n]==a.loca[n+1])return null;var c={};if(c.noc=s.readShort(o,l),l+=2,c.xMin=s.readShort(o,l),l+=2,c.yMin=s.readShort(o,l),l+=2,c.xMax=s.readShort(o,l),l+=2,c.yMax=s.readShort(o,l),l+=2,c.xMin>=c.xMax||c.yMin>=c.yMax)return null;if(c.noc>0){c.endPts=[];for(var u=0;u<c.noc;u++)c.endPts.push(s.readUshort(o,l)),l+=2;var h=s.readUshort(o,l);if(l+=2,o.length-l<h)return null;c.instructions=s.readBytes(o,l,h),l+=h;var d=c.endPts[c.noc-1]+1;for(c.flags=[],u=0;u<d;u++){var f=o[l];if(l++,c.flags.push(f),(8&f)!=0){var g=o[l];l++;for(var _=0;_<g;_++)c.flags.push(f),u++}}for(c.xs=[],u=0;u<d;u++){var m=(2&c.flags[u])!=0,p=(16&c.flags[u])!=0;m?(c.xs.push(p?o[l]:-o[l]),l++):p?c.xs.push(0):(c.xs.push(s.readShort(o,l)),l+=2)}for(c.ys=[],u=0;u<d;u++)m=(4&c.flags[u])!=0,p=(32&c.flags[u])!=0,m?(c.ys.push(p?o[l]:-o[l]),l++):p?c.ys.push(0):(c.ys.push(s.readShort(o,l)),l+=2);var x=0,v=0;for(u=0;u<d;u++)x+=c.xs[u],v+=c.ys[u],c.xs[u]=x,c.ys[u]=v}else{var b;c.parts=[];do{b=s.readUshort(o,l),l+=2;var w={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(c.parts.push(w),w.glyphIndex=s.readUshort(o,l),l+=2,1&b){var T=s.readShort(o,l);l+=2;var M=s.readShort(o,l);l+=2}else T=s.readInt8(o,l),l++,M=s.readInt8(o,l),l++;2&b?(w.m.tx=T,w.m.ty=M):(w.p1=T,w.p2=M),8&b?(w.m.a=w.m.d=s.readF2dot14(o,l),l+=2):64&b?(w.m.a=s.readF2dot14(o,l),l+=2,w.m.d=s.readF2dot14(o,l),l+=2):128&b&&(w.m.a=s.readF2dot14(o,l),l+=2,w.m.b=s.readF2dot14(o,l),l+=2,w.m.c=s.readF2dot14(o,l),l+=2,w.m.d=s.readF2dot14(o,l),l+=2)}while(32&b);if(256&b){var E=s.readUshort(o,l);for(l+=2,c.instr=[],u=0;u<E;u++)c.instr.push(o[l]),l++}}return c},e.GDEF={},e.GDEF.parse=function(a,n,s,o){var l=n;n+=4;var c=e._bin.readUshort(a,n);return{glyphClassDef:c===0?null:e._lctf.readClassDef(a,l+c)}},e.GPOS={},e.GPOS.parse=function(a,n,s,o){return e._lctf.parse(a,n,s,o,e.GPOS.subt)},e.GPOS.subt=function(a,n,s,o){var l=e._bin,c=s,u={};if(u.fmt=l.readUshort(a,s),s+=2,n==1||n==2||n==3||n==7||n==8&&u.fmt<=2){var h=l.readUshort(a,s);s+=2,u.coverage=e._lctf.readCoverage(a,h+c)}if(n==1&&u.fmt==1){var d=l.readUshort(a,s);s+=2,d!=0&&(u.pos=e.GPOS.readValueRecord(a,s,d))}else if(n==2&&u.fmt>=1&&u.fmt<=2){d=l.readUshort(a,s),s+=2;var f=l.readUshort(a,s);s+=2;var g=e._lctf.numOfOnes(d),_=e._lctf.numOfOnes(f);if(u.fmt==1){u.pairsets=[];var m=l.readUshort(a,s);s+=2;for(var p=0;p<m;p++){var x=c+l.readUshort(a,s);s+=2;var v=l.readUshort(a,x);x+=2;for(var b=[],w=0;w<v;w++){var T=l.readUshort(a,x);x+=2,d!=0&&(U=e.GPOS.readValueRecord(a,x,d),x+=2*g),f!=0&&(N=e.GPOS.readValueRecord(a,x,f),x+=2*_),b.push({gid2:T,val1:U,val2:N})}u.pairsets.push(b)}}if(u.fmt==2){var M=l.readUshort(a,s);s+=2;var E=l.readUshort(a,s);s+=2;var O=l.readUshort(a,s);s+=2;var S=l.readUshort(a,s);for(s+=2,u.classDef1=e._lctf.readClassDef(a,c+M),u.classDef2=e._lctf.readClassDef(a,c+E),u.matrix=[],p=0;p<O;p++){var C=[];for(w=0;w<S;w++){var U=null,N=null;d!=0&&(U=e.GPOS.readValueRecord(a,s,d),s+=2*g),f!=0&&(N=e.GPOS.readValueRecord(a,s,f),s+=2*_),C.push({val1:U,val2:N})}u.matrix.push(C)}}}else if(n==4&&u.fmt==1)u.markCoverage=e._lctf.readCoverage(a,l.readUshort(a,s)+c),u.baseCoverage=e._lctf.readCoverage(a,l.readUshort(a,s+2)+c),u.markClassCount=l.readUshort(a,s+4),u.markArray=e.GPOS.readMarkArray(a,l.readUshort(a,s+6)+c),u.baseArray=e.GPOS.readBaseArray(a,l.readUshort(a,s+8)+c,u.markClassCount);else if(n==6&&u.fmt==1)u.mark1Coverage=e._lctf.readCoverage(a,l.readUshort(a,s)+c),u.mark2Coverage=e._lctf.readCoverage(a,l.readUshort(a,s+2)+c),u.markClassCount=l.readUshort(a,s+4),u.mark1Array=e.GPOS.readMarkArray(a,l.readUshort(a,s+6)+c),u.mark2Array=e.GPOS.readBaseArray(a,l.readUshort(a,s+8)+c,u.markClassCount);else{if(n==9&&u.fmt==1){var D=l.readUshort(a,s);s+=2;var k=l.readUint(a,s);if(s+=4,o.ltype==9)o.ltype=D;else if(o.ltype!=D)throw"invalid extension substitution";return e.GPOS.subt(a,o.ltype,c+k)}console.debug("unsupported GPOS table LookupType",n,"format",u.fmt)}return u},e.GPOS.readValueRecord=function(a,n,s){var o=e._bin,l=[];return l.push(1&s?o.readShort(a,n):0),n+=1&s?2:0,l.push(2&s?o.readShort(a,n):0),n+=2&s?2:0,l.push(4&s?o.readShort(a,n):0),n+=4&s?2:0,l.push(8&s?o.readShort(a,n):0),n+=8&s?2:0,l},e.GPOS.readBaseArray=function(a,n,s){var o=e._bin,l=[],c=n,u=o.readUshort(a,n);n+=2;for(var h=0;h<u;h++){for(var d=[],f=0;f<s;f++)d.push(e.GPOS.readAnchorRecord(a,c+o.readUshort(a,n))),n+=2;l.push(d)}return l},e.GPOS.readMarkArray=function(a,n){var s=e._bin,o=[],l=n,c=s.readUshort(a,n);n+=2;for(var u=0;u<c;u++){var h=e.GPOS.readAnchorRecord(a,s.readUshort(a,n+2)+l);h.markClass=s.readUshort(a,n),o.push(h),n+=4}return o},e.GPOS.readAnchorRecord=function(a,n){var s=e._bin,o={};return o.fmt=s.readUshort(a,n),o.x=s.readShort(a,n+2),o.y=s.readShort(a,n+4),o},e.GSUB={},e.GSUB.parse=function(a,n,s,o){return e._lctf.parse(a,n,s,o,e.GSUB.subt)},e.GSUB.subt=function(a,n,s,o){var l=e._bin,c=s,u={};if(u.fmt=l.readUshort(a,s),s+=2,n!=1&&n!=2&&n!=4&&n!=5&&n!=6)return null;if(n==1||n==2||n==4||n==5&&u.fmt<=2||n==6&&u.fmt<=2){var h=l.readUshort(a,s);s+=2,u.coverage=e._lctf.readCoverage(a,c+h)}if(n==1&&u.fmt>=1&&u.fmt<=2){if(u.fmt==1)u.delta=l.readShort(a,s),s+=2;else if(u.fmt==2){var d=l.readUshort(a,s);s+=2,u.newg=l.readUshorts(a,s,d),s+=2*u.newg.length}}else if(n==2&&u.fmt==1){d=l.readUshort(a,s),s+=2,u.seqs=[];for(var f=0;f<d;f++){var g=l.readUshort(a,s)+c;s+=2;var _=l.readUshort(a,g);u.seqs.push(l.readUshorts(a,g+2,_))}}else if(n==4)for(u.vals=[],d=l.readUshort(a,s),s+=2,f=0;f<d;f++){var m=l.readUshort(a,s);s+=2,u.vals.push(e.GSUB.readLigatureSet(a,c+m))}else if(n==5&&u.fmt==2){if(u.fmt==2){var p=l.readUshort(a,s);s+=2,u.cDef=e._lctf.readClassDef(a,c+p),u.scset=[];var x=l.readUshort(a,s);for(s+=2,f=0;f<x;f++){var v=l.readUshort(a,s);s+=2,u.scset.push(v==0?null:e.GSUB.readSubClassSet(a,c+v))}}}else if(n==6&&u.fmt==3){if(u.fmt==3){for(f=0;f<3;f++){d=l.readUshort(a,s),s+=2;for(var b=[],w=0;w<d;w++)b.push(e._lctf.readCoverage(a,c+l.readUshort(a,s+2*w)));s+=2*d,f==0&&(u.backCvg=b),f==1&&(u.inptCvg=b),f==2&&(u.ahedCvg=b)}d=l.readUshort(a,s),s+=2,u.lookupRec=e.GSUB.readSubstLookupRecords(a,s,d)}}else{if(n==7&&u.fmt==1){var T=l.readUshort(a,s);s+=2;var M=l.readUint(a,s);if(s+=4,o.ltype==9)o.ltype=T;else if(o.ltype!=T)throw"invalid extension substitution";return e.GSUB.subt(a,o.ltype,c+M)}console.debug("unsupported GSUB table LookupType",n,"format",u.fmt)}return u},e.GSUB.readSubClassSet=function(a,n){var s=e._bin.readUshort,o=n,l=[],c=s(a,n);n+=2;for(var u=0;u<c;u++){var h=s(a,n);n+=2,l.push(e.GSUB.readSubClassRule(a,o+h))}return l},e.GSUB.readSubClassRule=function(a,n){var s=e._bin.readUshort,o={},l=s(a,n),c=s(a,n+=2);n+=2,o.input=[];for(var u=0;u<l-1;u++)o.input.push(s(a,n)),n+=2;return o.substLookupRecords=e.GSUB.readSubstLookupRecords(a,n,c),o},e.GSUB.readSubstLookupRecords=function(a,n,s){for(var o=e._bin.readUshort,l=[],c=0;c<s;c++)l.push(o(a,n),o(a,n+2)),n+=4;return l},e.GSUB.readChainSubClassSet=function(a,n){var s=e._bin,o=n,l=[],c=s.readUshort(a,n);n+=2;for(var u=0;u<c;u++){var h=s.readUshort(a,n);n+=2,l.push(e.GSUB.readChainSubClassRule(a,o+h))}return l},e.GSUB.readChainSubClassRule=function(a,n){for(var s=e._bin,o={},l=["backtrack","input","lookahead"],c=0;c<l.length;c++){var u=s.readUshort(a,n);n+=2,c==1&&u--,o[l[c]]=s.readUshorts(a,n,u),n+=2*o[l[c]].length}return u=s.readUshort(a,n),n+=2,o.subst=s.readUshorts(a,n,2*u),n+=2*o.subst.length,o},e.GSUB.readLigatureSet=function(a,n){var s=e._bin,o=n,l=[],c=s.readUshort(a,n);n+=2;for(var u=0;u<c;u++){var h=s.readUshort(a,n);n+=2,l.push(e.GSUB.readLigature(a,o+h))}return l},e.GSUB.readLigature=function(a,n){var s=e._bin,o={chain:[]};o.nglyph=s.readUshort(a,n),n+=2;var l=s.readUshort(a,n);n+=2;for(var c=0;c<l-1;c++)o.chain.push(s.readUshort(a,n)),n+=2;return o},e.head={},e.head.parse=function(a,n,s){var o=e._bin,l={};return o.readFixed(a,n),n+=4,l.fontRevision=o.readFixed(a,n),n+=4,o.readUint(a,n),n+=4,o.readUint(a,n),n+=4,l.flags=o.readUshort(a,n),n+=2,l.unitsPerEm=o.readUshort(a,n),n+=2,l.created=o.readUint64(a,n),n+=8,l.modified=o.readUint64(a,n),n+=8,l.xMin=o.readShort(a,n),n+=2,l.yMin=o.readShort(a,n),n+=2,l.xMax=o.readShort(a,n),n+=2,l.yMax=o.readShort(a,n),n+=2,l.macStyle=o.readUshort(a,n),n+=2,l.lowestRecPPEM=o.readUshort(a,n),n+=2,l.fontDirectionHint=o.readShort(a,n),n+=2,l.indexToLocFormat=o.readShort(a,n),n+=2,l.glyphDataFormat=o.readShort(a,n),n+=2,l},e.hhea={},e.hhea.parse=function(a,n,s){var o=e._bin,l={};return o.readFixed(a,n),n+=4,l.ascender=o.readShort(a,n),n+=2,l.descender=o.readShort(a,n),n+=2,l.lineGap=o.readShort(a,n),n+=2,l.advanceWidthMax=o.readUshort(a,n),n+=2,l.minLeftSideBearing=o.readShort(a,n),n+=2,l.minRightSideBearing=o.readShort(a,n),n+=2,l.xMaxExtent=o.readShort(a,n),n+=2,l.caretSlopeRise=o.readShort(a,n),n+=2,l.caretSlopeRun=o.readShort(a,n),n+=2,l.caretOffset=o.readShort(a,n),n+=2,n+=8,l.metricDataFormat=o.readShort(a,n),n+=2,l.numberOfHMetrics=o.readUshort(a,n),n+=2,l},e.hmtx={},e.hmtx.parse=function(a,n,s,o){for(var l=e._bin,c={aWidth:[],lsBearing:[]},u=0,h=0,d=0;d<o.maxp.numGlyphs;d++)d<o.hhea.numberOfHMetrics&&(u=l.readUshort(a,n),n+=2,h=l.readShort(a,n),n+=2),c.aWidth.push(u),c.lsBearing.push(h);return c},e.kern={},e.kern.parse=function(a,n,s,o){var l=e._bin,c=l.readUshort(a,n);if(n+=2,c==1)return e.kern.parseV1(a,n-2,s,o);var u=l.readUshort(a,n);n+=2;for(var h={glyph1:[],rval:[]},d=0;d<u;d++){n+=2,s=l.readUshort(a,n),n+=2;var f=l.readUshort(a,n);n+=2;var g=f>>>8;if((g&=15)!=0)throw"unknown kern table format: "+g;n=e.kern.readFormat0(a,n,h)}return h},e.kern.parseV1=function(a,n,s,o){var l=e._bin;l.readFixed(a,n),n+=4;var c=l.readUint(a,n);n+=4;for(var u={glyph1:[],rval:[]},h=0;h<c;h++){l.readUint(a,n),n+=4;var d=l.readUshort(a,n);n+=2,l.readUshort(a,n),n+=2;var f=d>>>8;if((f&=15)!=0)throw"unknown kern table format: "+f;n=e.kern.readFormat0(a,n,u)}return u},e.kern.readFormat0=function(a,n,s){var o=e._bin,l=-1,c=o.readUshort(a,n);n+=2,o.readUshort(a,n),n+=2,o.readUshort(a,n),n+=2,o.readUshort(a,n),n+=2;for(var u=0;u<c;u++){var h=o.readUshort(a,n);n+=2;var d=o.readUshort(a,n);n+=2;var f=o.readShort(a,n);n+=2,h!=l&&(s.glyph1.push(h),s.rval.push({glyph2:[],vals:[]}));var g=s.rval[s.rval.length-1];g.glyph2.push(d),g.vals.push(f),l=h}return n},e.loca={},e.loca.parse=function(a,n,s,o){var l=e._bin,c=[],u=o.head.indexToLocFormat,h=o.maxp.numGlyphs+1;if(u==0)for(var d=0;d<h;d++)c.push(l.readUshort(a,n+(d<<1))<<1);if(u==1)for(d=0;d<h;d++)c.push(l.readUint(a,n+(d<<2)));return c},e.maxp={},e.maxp.parse=function(a,n,s){var o=e._bin,l={},c=o.readUint(a,n);return n+=4,l.numGlyphs=o.readUshort(a,n),n+=2,c==65536&&(l.maxPoints=o.readUshort(a,n),n+=2,l.maxContours=o.readUshort(a,n),n+=2,l.maxCompositePoints=o.readUshort(a,n),n+=2,l.maxCompositeContours=o.readUshort(a,n),n+=2,l.maxZones=o.readUshort(a,n),n+=2,l.maxTwilightPoints=o.readUshort(a,n),n+=2,l.maxStorage=o.readUshort(a,n),n+=2,l.maxFunctionDefs=o.readUshort(a,n),n+=2,l.maxInstructionDefs=o.readUshort(a,n),n+=2,l.maxStackElements=o.readUshort(a,n),n+=2,l.maxSizeOfInstructions=o.readUshort(a,n),n+=2,l.maxComponentElements=o.readUshort(a,n),n+=2,l.maxComponentDepth=o.readUshort(a,n),n+=2),l},e.name={},e.name.parse=function(a,n,s){var o=e._bin,l={};o.readUshort(a,n),n+=2;var c=o.readUshort(a,n);n+=2,o.readUshort(a,n);for(var u,h=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],d=n+=2,f=0;f<c;f++){var g=o.readUshort(a,n);n+=2;var _=o.readUshort(a,n);n+=2;var m=o.readUshort(a,n);n+=2;var p=o.readUshort(a,n);n+=2;var x=o.readUshort(a,n);n+=2;var v=o.readUshort(a,n);n+=2;var b,w=h[p],T=d+12*c+v;if(g==0)b=o.readUnicode(a,T,x/2);else if(g==3&&_==0)b=o.readUnicode(a,T,x/2);else if(_==0)b=o.readASCII(a,T,x);else if(_==1)b=o.readUnicode(a,T,x/2);else if(_==3)b=o.readUnicode(a,T,x/2);else{if(g!=1)throw"unknown encoding "+_+", platformID: "+g;b=o.readASCII(a,T,x),console.debug("reading unknown MAC encoding "+_+" as ASCII")}var M="p"+g+","+m.toString(16);l[M]==null&&(l[M]={}),l[M][w!==void 0?w:p]=b,l[M]._lang=m}for(var E in l)if(l[E].postScriptName!=null&&l[E]._lang==1033)return l[E];for(var E in l)if(l[E].postScriptName!=null&&l[E]._lang==0)return l[E];for(var E in l)if(l[E].postScriptName!=null&&l[E]._lang==3084)return l[E];for(var E in l)if(l[E].postScriptName!=null)return l[E];for(var E in l){u=E;break}return console.debug("returning name table with languageID "+l[u]._lang),l[u]},e["OS/2"]={},e["OS/2"].parse=function(a,n,s){var o=e._bin.readUshort(a,n);n+=2;var l={};if(o==0)e["OS/2"].version0(a,n,l);else if(o==1)e["OS/2"].version1(a,n,l);else if(o==2||o==3||o==4)e["OS/2"].version2(a,n,l);else{if(o!=5)throw"unknown OS/2 table version: "+o;e["OS/2"].version5(a,n,l)}return l},e["OS/2"].version0=function(a,n,s){var o=e._bin;return s.xAvgCharWidth=o.readShort(a,n),n+=2,s.usWeightClass=o.readUshort(a,n),n+=2,s.usWidthClass=o.readUshort(a,n),n+=2,s.fsType=o.readUshort(a,n),n+=2,s.ySubscriptXSize=o.readShort(a,n),n+=2,s.ySubscriptYSize=o.readShort(a,n),n+=2,s.ySubscriptXOffset=o.readShort(a,n),n+=2,s.ySubscriptYOffset=o.readShort(a,n),n+=2,s.ySuperscriptXSize=o.readShort(a,n),n+=2,s.ySuperscriptYSize=o.readShort(a,n),n+=2,s.ySuperscriptXOffset=o.readShort(a,n),n+=2,s.ySuperscriptYOffset=o.readShort(a,n),n+=2,s.yStrikeoutSize=o.readShort(a,n),n+=2,s.yStrikeoutPosition=o.readShort(a,n),n+=2,s.sFamilyClass=o.readShort(a,n),n+=2,s.panose=o.readBytes(a,n,10),n+=10,s.ulUnicodeRange1=o.readUint(a,n),n+=4,s.ulUnicodeRange2=o.readUint(a,n),n+=4,s.ulUnicodeRange3=o.readUint(a,n),n+=4,s.ulUnicodeRange4=o.readUint(a,n),n+=4,s.achVendID=[o.readInt8(a,n),o.readInt8(a,n+1),o.readInt8(a,n+2),o.readInt8(a,n+3)],n+=4,s.fsSelection=o.readUshort(a,n),n+=2,s.usFirstCharIndex=o.readUshort(a,n),n+=2,s.usLastCharIndex=o.readUshort(a,n),n+=2,s.sTypoAscender=o.readShort(a,n),n+=2,s.sTypoDescender=o.readShort(a,n),n+=2,s.sTypoLineGap=o.readShort(a,n),n+=2,s.usWinAscent=o.readUshort(a,n),n+=2,s.usWinDescent=o.readUshort(a,n),n+=2},e["OS/2"].version1=function(a,n,s){var o=e._bin;return n=e["OS/2"].version0(a,n,s),s.ulCodePageRange1=o.readUint(a,n),n+=4,s.ulCodePageRange2=o.readUint(a,n),n+=4},e["OS/2"].version2=function(a,n,s){var o=e._bin;return n=e["OS/2"].version1(a,n,s),s.sxHeight=o.readShort(a,n),n+=2,s.sCapHeight=o.readShort(a,n),n+=2,s.usDefault=o.readUshort(a,n),n+=2,s.usBreak=o.readUshort(a,n),n+=2,s.usMaxContext=o.readUshort(a,n),n+=2},e["OS/2"].version5=function(a,n,s){var o=e._bin;return n=e["OS/2"].version2(a,n,s),s.usLowerOpticalPointSize=o.readUshort(a,n),n+=2,s.usUpperOpticalPointSize=o.readUshort(a,n),n+=2},e.post={},e.post.parse=function(a,n,s){var o=e._bin,l={};return l.version=o.readFixed(a,n),n+=4,l.italicAngle=o.readFixed(a,n),n+=4,l.underlinePosition=o.readShort(a,n),n+=2,l.underlineThickness=o.readShort(a,n),n+=2,l},e==null&&(e={}),e.U==null&&(e.U={}),e.U.codeToGlyph=function(a,n){var s=a.cmap,o=-1;if(s.p0e4!=null?o=s.p0e4:s.p3e1!=null?o=s.p3e1:s.p1e0!=null?o=s.p1e0:s.p0e3!=null&&(o=s.p0e3),o==-1)throw"no familiar platform and encoding!";var l=s.tables[o];if(l.format==0)return n>=l.map.length?0:l.map[n];if(l.format==4){for(var c=-1,u=0;u<l.endCount.length;u++)if(n<=l.endCount[u]){c=u;break}return c==-1||l.startCount[c]>n?0:65535&(l.idRangeOffset[c]!=0?l.glyphIdArray[n-l.startCount[c]+(l.idRangeOffset[c]>>1)-(l.idRangeOffset.length-c)]:n+l.idDelta[c])}if(l.format==12){if(n>l.groups[l.groups.length-1][1])return 0;for(u=0;u<l.groups.length;u++){var h=l.groups[u];if(h[0]<=n&&n<=h[1])return h[2]+(n-h[0])}return 0}throw"unknown cmap table format "+l.format},e.U.glyphToPath=function(a,n){var s={cmds:[],crds:[]};if(a.SVG&&a.SVG.entries[n]){var o=a.SVG.entries[n];return o==null?s:(typeof o=="string"&&(o=e.SVG.toPath(o),a.SVG.entries[n]=o),o)}if(a.CFF){var l={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:a.CFF.Private?a.CFF.Private.defaultWidthX:0,open:!1},c=a.CFF,u=a.CFF.Private;if(c.ROS){for(var h=0;c.FDSelect[h+2]<=n;)h+=2;u=c.FDArray[c.FDSelect[h+1]].Private}e.U._drawCFF(a.CFF.CharStrings[n],l,c,u,s)}else a.glyf&&e.U._drawGlyf(n,a,s);return s},e.U._drawGlyf=function(a,n,s){var o=n.glyf[a];o==null&&(o=n.glyf[a]=e.glyf._parseGlyf(n,a)),o!=null&&(o.noc>-1?e.U._simpleGlyph(o,s):e.U._compoGlyph(o,n,s))},e.U._simpleGlyph=function(a,n){for(var s=0;s<a.noc;s++){for(var o=s==0?0:a.endPts[s-1]+1,l=a.endPts[s],c=o;c<=l;c++){var u=c==o?l:c-1,h=c==l?o:c+1,d=1&a.flags[c],f=1&a.flags[u],g=1&a.flags[h],_=a.xs[c],m=a.ys[c];if(c==o)if(d){if(!f){e.U.P.moveTo(n,_,m);continue}e.U.P.moveTo(n,a.xs[u],a.ys[u])}else f?e.U.P.moveTo(n,a.xs[u],a.ys[u]):e.U.P.moveTo(n,(a.xs[u]+_)/2,(a.ys[u]+m)/2);d?f&&e.U.P.lineTo(n,_,m):g?e.U.P.qcurveTo(n,_,m,a.xs[h],a.ys[h]):e.U.P.qcurveTo(n,_,m,(_+a.xs[h])/2,(m+a.ys[h])/2)}e.U.P.closePath(n)}},e.U._compoGlyph=function(a,n,s){for(var o=0;o<a.parts.length;o++){var l={cmds:[],crds:[]},c=a.parts[o];e.U._drawGlyf(c.glyphIndex,n,l);for(var u=c.m,h=0;h<l.crds.length;h+=2){var d=l.crds[h],f=l.crds[h+1];s.crds.push(d*u.a+f*u.b+u.tx),s.crds.push(d*u.c+f*u.d+u.ty)}for(h=0;h<l.cmds.length;h++)s.cmds.push(l.cmds[h])}},e.U._getGlyphClass=function(a,n){var s=e._lctf.getInterval(n,a);return s==-1?0:n[s+2]},e.U._applySubs=function(a,n,s,o){for(var l=a.length-n-1,c=0;c<s.tabs.length;c++)if(s.tabs[c]!=null){var u,h=s.tabs[c];if(!h.coverage||(u=e._lctf.coverageIndex(h.coverage,a[n]))!=-1){if(s.ltype==1)a[n],h.fmt==1?a[n]=a[n]+h.delta:a[n]=h.newg[u];else if(s.ltype==4)for(var d=h.vals[u],f=0;f<d.length;f++){var g=d[f],_=g.chain.length;if(!(_>l)){for(var m=!0,p=0,x=0;x<_;x++){for(;a[n+p+(1+x)]==-1;)p++;g.chain[x]!=a[n+p+(1+x)]&&(m=!1)}if(m){for(a[n]=g.nglyph,x=0;x<_+p;x++)a[n+x+1]=-1;break}}}else if(s.ltype==5&&h.fmt==2)for(var v=e._lctf.getInterval(h.cDef,a[n]),b=h.cDef[v+2],w=h.scset[b],T=0;T<w.length;T++){var M=w[T],E=M.input;if(!(E.length>l)){for(m=!0,x=0;x<E.length;x++){var O=e._lctf.getInterval(h.cDef,a[n+1+x]);if(v==-1&&h.cDef[O+2]!=E[x]){m=!1;break}}if(m){var S=M.substLookupRecords;for(f=0;f<S.length;f+=2)S[f],S[f+1]}}}else if(s.ltype==6&&h.fmt==3){if(!e.U._glsCovered(a,h.backCvg,n-h.backCvg.length)||!e.U._glsCovered(a,h.inptCvg,n)||!e.U._glsCovered(a,h.ahedCvg,n+h.inptCvg.length))continue;var C=h.lookupRec;for(T=0;T<C.length;T+=2){v=C[T];var U=o[C[T+1]];e.U._applySubs(a,n+v,U,o)}}}}},e.U._glsCovered=function(a,n,s){for(var o=0;o<n.length;o++)if(e._lctf.coverageIndex(n[o],a[s+o])==-1)return!1;return!0},e.U.glyphsToPath=function(a,n,s){for(var o={cmds:[],crds:[]},l=0,c=0;c<n.length;c++){var u=n[c];if(u!=-1){for(var h=c<n.length-1&&n[c+1]!=-1?n[c+1]:0,d=e.U.glyphToPath(a,u),f=0;f<d.crds.length;f+=2)o.crds.push(d.crds[f]+l),o.crds.push(d.crds[f+1]);for(s&&o.cmds.push(s),f=0;f<d.cmds.length;f++)o.cmds.push(d.cmds[f]);s&&o.cmds.push("X"),l+=a.hmtx.aWidth[u],c<n.length-1&&(l+=e.U.getPairAdjustment(a,u,h))}}return o},e.U.P={},e.U.P.moveTo=function(a,n,s){a.cmds.push("M"),a.crds.push(n,s)},e.U.P.lineTo=function(a,n,s){a.cmds.push("L"),a.crds.push(n,s)},e.U.P.curveTo=function(a,n,s,o,l,c,u){a.cmds.push("C"),a.crds.push(n,s,o,l,c,u)},e.U.P.qcurveTo=function(a,n,s,o,l){a.cmds.push("Q"),a.crds.push(n,s,o,l)},e.U.P.closePath=function(a){a.cmds.push("Z")},e.U._drawCFF=function(a,n,s,o,l){for(var c=n.stack,u=n.nStems,h=n.haveWidth,d=n.width,f=n.open,g=0,_=n.x,m=n.y,p=0,x=0,v=0,b=0,w=0,T=0,M=0,E=0,O=0,S=0,C={val:0,size:0};g<a.length;){e.CFF.getCharString(a,g,C);var U=C.val;if(g+=C.size,U=="o1"||U=="o18")c.length%2!=0&&!h&&(d=c.shift()+o.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(U=="o3"||U=="o23")c.length%2!=0&&!h&&(d=c.shift()+o.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(U=="o4")c.length>1&&!h&&(d=c.shift()+o.nominalWidthX,h=!0),f&&e.U.P.closePath(l),m+=c.pop(),e.U.P.moveTo(l,_,m),f=!0;else if(U=="o5")for(;c.length>0;)_+=c.shift(),m+=c.shift(),e.U.P.lineTo(l,_,m);else if(U=="o6"||U=="o7")for(var N=c.length,D=U=="o6",k=0;k<N;k++){var F=c.shift();D?_+=F:m+=F,D=!D,e.U.P.lineTo(l,_,m)}else if(U=="o8"||U=="o24"){N=c.length;for(var X=0;X+6<=N;)p=_+c.shift(),x=m+c.shift(),v=p+c.shift(),b=x+c.shift(),_=v+c.shift(),m=b+c.shift(),e.U.P.curveTo(l,p,x,v,b,_,m),X+=6;U=="o24"&&(_+=c.shift(),m+=c.shift(),e.U.P.lineTo(l,_,m))}else{if(U=="o11")break;if(U=="o1234"||U=="o1235"||U=="o1236"||U=="o1237")U=="o1234"&&(x=m,v=(p=_+c.shift())+c.shift(),S=b=x+c.shift(),T=b,E=m,_=(M=(w=(O=v+c.shift())+c.shift())+c.shift())+c.shift(),e.U.P.curveTo(l,p,x,v,b,O,S),e.U.P.curveTo(l,w,T,M,E,_,m)),U=="o1235"&&(p=_+c.shift(),x=m+c.shift(),v=p+c.shift(),b=x+c.shift(),O=v+c.shift(),S=b+c.shift(),w=O+c.shift(),T=S+c.shift(),M=w+c.shift(),E=T+c.shift(),_=M+c.shift(),m=E+c.shift(),c.shift(),e.U.P.curveTo(l,p,x,v,b,O,S),e.U.P.curveTo(l,w,T,M,E,_,m)),U=="o1236"&&(p=_+c.shift(),x=m+c.shift(),v=p+c.shift(),S=b=x+c.shift(),T=b,M=(w=(O=v+c.shift())+c.shift())+c.shift(),E=T+c.shift(),_=M+c.shift(),e.U.P.curveTo(l,p,x,v,b,O,S),e.U.P.curveTo(l,w,T,M,E,_,m)),U=="o1237"&&(p=_+c.shift(),x=m+c.shift(),v=p+c.shift(),b=x+c.shift(),O=v+c.shift(),S=b+c.shift(),w=O+c.shift(),T=S+c.shift(),M=w+c.shift(),E=T+c.shift(),Math.abs(M-_)>Math.abs(E-m)?_=M+c.shift():m=E+c.shift(),e.U.P.curveTo(l,p,x,v,b,O,S),e.U.P.curveTo(l,w,T,M,E,_,m));else if(U=="o14"){if(c.length>0&&!h&&(d=c.shift()+s.nominalWidthX,h=!0),c.length==4){var Y=c.shift(),z=c.shift(),q=c.shift(),y=c.shift(),B=e.CFF.glyphBySE(s,q),W=e.CFF.glyphBySE(s,y);e.U._drawCFF(s.CharStrings[B],n,s,o,l),n.x=Y,n.y=z,e.U._drawCFF(s.CharStrings[W],n,s,o,l)}f&&(e.U.P.closePath(l),f=!1)}else if(U=="o19"||U=="o20")c.length%2!=0&&!h&&(d=c.shift()+o.nominalWidthX),u+=c.length>>1,c.length=0,h=!0,g+=u+7>>3;else if(U=="o21")c.length>2&&!h&&(d=c.shift()+o.nominalWidthX,h=!0),m+=c.pop(),_+=c.pop(),f&&e.U.P.closePath(l),e.U.P.moveTo(l,_,m),f=!0;else if(U=="o22")c.length>1&&!h&&(d=c.shift()+o.nominalWidthX,h=!0),_+=c.pop(),f&&e.U.P.closePath(l),e.U.P.moveTo(l,_,m),f=!0;else if(U=="o25"){for(;c.length>6;)_+=c.shift(),m+=c.shift(),e.U.P.lineTo(l,_,m);p=_+c.shift(),x=m+c.shift(),v=p+c.shift(),b=x+c.shift(),_=v+c.shift(),m=b+c.shift(),e.U.P.curveTo(l,p,x,v,b,_,m)}else if(U=="o26")for(c.length%2&&(_+=c.shift());c.length>0;)p=_,x=m+c.shift(),_=v=p+c.shift(),m=(b=x+c.shift())+c.shift(),e.U.P.curveTo(l,p,x,v,b,_,m);else if(U=="o27")for(c.length%2&&(m+=c.shift());c.length>0;)x=m,v=(p=_+c.shift())+c.shift(),b=x+c.shift(),_=v+c.shift(),m=b,e.U.P.curveTo(l,p,x,v,b,_,m);else if(U=="o10"||U=="o29"){var I=U=="o10"?o:s;if(c.length==0)console.debug("error: empty stack");else{var V=c.pop(),Q=I.Subrs[V+I.Bias];n.x=_,n.y=m,n.nStems=u,n.haveWidth=h,n.width=d,n.open=f,e.U._drawCFF(Q,n,s,o,l),_=n.x,m=n.y,u=n.nStems,h=n.haveWidth,d=n.width,f=n.open}}else if(U=="o30"||U=="o31"){var ee=c.length,ie=(X=0,U=="o31");for(X+=ee-(N=-3&ee);X<N;)ie?(x=m,v=(p=_+c.shift())+c.shift(),m=(b=x+c.shift())+c.shift(),N-X==5?(_=v+c.shift(),X++):_=v,ie=!1):(p=_,x=m+c.shift(),v=p+c.shift(),b=x+c.shift(),_=v+c.shift(),N-X==5?(m=b+c.shift(),X++):m=b,ie=!0),e.U.P.curveTo(l,p,x,v,b,_,m),X+=4}else{if((U+"").charAt(0)=="o")throw console.debug("Unknown operation: "+U,a),U;c.push(U)}}}n.x=_,n.y=m,n.nStems=u,n.haveWidth=h,n.width=d,n.open=f};var t=e,i={Typr:t};return r.Typr=t,r.default=i,Object.defineProperty(r,"__esModule",{value:!0}),r})({}).Typr}function Sv(){return(function(r){var e=Uint8Array,t=Uint16Array,i=Uint32Array,a=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),n=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),s=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),o=function(U,N){for(var D=new t(31),k=0;k<31;++k)D[k]=N+=1<<U[k-1];var F=new i(D[30]);for(k=1;k<30;++k)for(var X=D[k];X<D[k+1];++X)F[X]=X-D[k]<<5|k;return[D,F]},l=o(a,2),c=l[0],u=l[1];c[28]=258,u[258]=28;for(var h=o(n,0)[0],d=new t(32768),f=0;f<32768;++f){var g=(43690&f)>>>1|(21845&f)<<1;g=(61680&(g=(52428&g)>>>2|(13107&g)<<2))>>>4|(3855&g)<<4,d[f]=((65280&g)>>>8|(255&g)<<8)>>>1}var _=function(U,N,D){for(var k=U.length,F=0,X=new t(N);F<k;++F)++X[U[F]-1];var Y,z=new t(N);for(F=0;F<N;++F)z[F]=z[F-1]+X[F-1]<<1;{Y=new t(1<<N);var q=15-N;for(F=0;F<k;++F)if(U[F])for(var y=F<<4|U[F],B=N-U[F],W=z[U[F]-1]++<<B,I=W|(1<<B)-1;W<=I;++W)Y[d[W]>>>q]=y}return Y},m=new e(288);for(f=0;f<144;++f)m[f]=8;for(f=144;f<256;++f)m[f]=9;for(f=256;f<280;++f)m[f]=7;for(f=280;f<288;++f)m[f]=8;var p=new e(32);for(f=0;f<32;++f)p[f]=5;var x=_(m,9),v=_(p,5),b=function(U){for(var N=U[0],D=1;D<U.length;++D)U[D]>N&&(N=U[D]);return N},w=function(U,N,D){var k=N/8|0;return(U[k]|U[k+1]<<8)>>(7&N)&D},T=function(U,N){var D=N/8|0;return(U[D]|U[D+1]<<8|U[D+2]<<16)>>(7&N)},M=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(U,N,D){var k=new Error(N||M[U]);if(k.code=U,Error.captureStackTrace&&Error.captureStackTrace(k,E),!D)throw k;return k},O=function(U,N,D){var k=U.length;if(!k||D&&!D.l&&k<5)return N||new e(0);var F=!N||D,X=!D||D.i;D||(D={}),N||(N=new e(3*k));var Y,z=function(we){var Pe=N.length;if(we>Pe){var De=new e(Math.max(2*Pe,we));De.set(N),N=De}},q=D.f||0,y=D.p||0,B=D.b||0,W=D.l,I=D.d,V=D.m,Q=D.n,ee=8*k;do{if(!W){D.f=q=w(U,y,1);var ie=w(U,y+1,3);if(y+=3,!ie){var le=U[(ye=((Y=y)/8|0)+(7&Y&&1)+4)-4]|U[ye-3]<<8,Me=ye+le;if(Me>k){X&&E(0);break}F&&z(B+le),N.set(U.subarray(ye,Me),B),D.b=B+=le,D.p=y=8*Me;continue}if(ie==1)W=x,I=v,V=9,Q=5;else if(ie==2){var K=w(U,y,31)+257,L=w(U,y+10,15)+4,Ae=K+w(U,y+5,31)+1;y+=14;for(var me=new e(Ae),pe=new e(19),ue=0;ue<L;++ue)pe[s[ue]]=w(U,y+3*ue,7);y+=3*L;var Se=b(pe),oe=(1<<Se)-1,ge=_(pe,Se);for(ue=0;ue<Ae;){var ye,R=ge[w(U,y,oe)];if(y+=15&R,(ye=R>>>4)<16)me[ue++]=ye;else{var A=0,H=0;for(ye==16?(H=3+w(U,y,3),y+=2,A=me[ue-1]):ye==17?(H=3+w(U,y,7),y+=3):ye==18&&(H=11+w(U,y,127),y+=7);H--;)me[ue++]=A}}var G=me.subarray(0,K),te=me.subarray(K);V=b(G),Q=b(te),W=_(G,V),I=_(te,Q)}else E(1);if(y>ee){X&&E(0);break}}F&&z(B+131072);for(var J=(1<<V)-1,Ce=(1<<Q)-1,fe=y;;fe=y){var ce=(A=W[T(U,y)&J])>>>4;if((y+=15&A)>ee){X&&E(0);break}if(A||E(2),ce<256)N[B++]=ce;else{if(ce==256){fe=y,W=null;break}var ve=ce-254;if(ce>264){var Ne=a[ue=ce-257];ve=w(U,y,(1<<Ne)-1)+c[ue],y+=Ne}var de=I[T(U,y)&Ce],qe=de>>>4;if(de||E(3),y+=15&de,te=h[qe],qe>3&&(Ne=n[qe],te+=T(U,y)&(1<<Ne)-1,y+=Ne),y>ee){X&&E(0);break}F&&z(B+131072);for(var Ee=B+ve;B<Ee;B+=4)N[B]=N[B-te],N[B+1]=N[B+1-te],N[B+2]=N[B+2-te],N[B+3]=N[B+3-te];B=Ee}}D.l=W,D.p=fe,D.b=B,W&&(q=1,D.m=V,D.d=I,D.n=Q)}while(!q);return B==N.length?N:(function(we,Pe,De){(De==null||De>we.length)&&(De=we.length);var Be=new(we instanceof t?t:we instanceof i?i:e)(De-Pe);return Be.set(we.subarray(Pe,De)),Be})(N,0,B)},S=new e(0),C=typeof TextDecoder<"u"&&new TextDecoder;try{C.decode(S,{stream:!0})}catch{}return r.convert_streams=function(U){var N=new DataView(U),D=0;function k(){var K=N.getUint16(D);return D+=2,K}function F(){var K=N.getUint32(D);return D+=4,K}function X(K){le.setUint16(Me,K),Me+=2}function Y(K){le.setUint32(Me,K),Me+=4}for(var z={signature:F(),flavor:F(),length:F(),numTables:k(),reserved:k(),totalSfntSize:F(),majorVersion:k(),minorVersion:k(),metaOffset:F(),metaLength:F(),metaOrigLength:F(),privOffset:F(),privLength:F()},q=0;Math.pow(2,q)<=z.numTables;)q++;q--;for(var y=16*Math.pow(2,q),B=16*z.numTables-y,W=12,I=[],V=0;V<z.numTables;V++)I.push({tag:F(),offset:F(),compLength:F(),origLength:F(),origChecksum:F()}),W+=16;var Q,ee=new Uint8Array(12+16*I.length+I.reduce(function(K,L){return K+L.origLength+4},0)),ie=ee.buffer,le=new DataView(ie),Me=0;return Y(z.flavor),X(z.numTables),X(y),X(q),X(B),I.forEach(function(K){Y(K.tag),Y(K.origChecksum),Y(W),Y(K.origLength),K.outOffset=W,(W+=K.origLength)%4!=0&&(W+=4-W%4)}),I.forEach(function(K){var L,Ae=U.slice(K.offset,K.offset+K.compLength);if(K.compLength!=K.origLength){var me=new Uint8Array(K.origLength);L=new Uint8Array(Ae,2),O(L,me)}else me=new Uint8Array(Ae);ee.set(me,K.outOffset);var pe=0;(W=K.outOffset+K.origLength)%4!=0&&(pe=4-W%4),ee.set(new Uint8Array(pe).buffer,K.outOffset+K.origLength),Q=W+pe}),ie.slice(0,Q)},Object.defineProperty(r,"__esModule",{value:!0}),r})({}).convert_streams}function Mv(r,e){const t={M:2,L:2,Q:4,C:6,Z:0},i={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},a=1,n=2,s=4,o=8,l=16,c=32;let u;function h(M){if(!u){const E={R:n,L:a,D:s,C:l,U:c,T:o};u=new Map;for(let O in i){let S=0;i[O].split(",").forEach(C=>{let[U,N]=C.split("+");U=parseInt(U,36),N=N?parseInt(N,36):0,u.set(S+=U,E[O]);for(let D=N;D--;)u.set(++S,E[O])})}}return u.get(M)||c}const d=1,f=2,g=3,_=4,m=[null,"isol","init","fina","medi"];function p(M){const E=new Uint8Array(M.length);let O=c,S=d,C=-1;for(let U=0;U<M.length;U++){const N=M.codePointAt(U);let D=h(N)|0,k=d;D&o||(O&(a|s|l)?D&(n|s|l)?(k=g,(S===d||S===g)&&E[C]++):D&(a|c)&&(S===f||S===_)&&E[C]--:O&(n|c)&&(S===f||S===_)&&E[C]--,S=E[U]=k,O=D,C=U,N>65535&&U++)}return E}function x(M,E){const O=[];for(let C=0;C<E.length;C++){const U=E.codePointAt(C);U>65535&&C++,O.push(r.U.codeToGlyph(M,U))}const S=M.GSUB;if(S){const{lookupList:C,featureList:U}=S;let N;const D=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,k=[];U.forEach(F=>{if(D.test(F.tag))for(let X=0;X<F.tab.length;X++){if(k[F.tab[X]])continue;k[F.tab[X]]=!0;const Y=C[F.tab[X]],z=/^(isol|init|fina|medi)$/.test(F.tag);z&&!N&&(N=p(E));for(let q=0;q<O.length;q++)(!N||!z||m[N[q]]===F.tag)&&r.U._applySubs(O,q,Y,C)}})}return O}function v(M,E){const O=new Int16Array(E.length*3);let S=0;for(;S<E.length;S++){const D=E[S];if(D===-1)continue;O[S*3+2]=M.hmtx.aWidth[D];const k=M.GPOS;if(k){const F=k.lookupList;for(let X=0;X<F.length;X++){const Y=F[X];for(let z=0;z<Y.tabs.length;z++){const q=Y.tabs[z];if(Y.ltype===1){if(r._lctf.coverageIndex(q.coverage,D)!==-1&&q.pos){N(q.pos,S);break}}else if(Y.ltype===2){let y=null,B=C();if(B!==-1){const W=r._lctf.coverageIndex(q.coverage,E[B]);if(W!==-1){if(q.fmt===1){const I=q.pairsets[W];for(let V=0;V<I.length;V++)I[V].gid2===D&&(y=I[V])}else if(q.fmt===2){const I=r.U._getGlyphClass(E[B],q.classDef1),V=r.U._getGlyphClass(D,q.classDef2);y=q.matrix[I][V]}if(y){y.val1&&N(y.val1,B),y.val2&&N(y.val2,S);break}}}}else if(Y.ltype===4){const y=r._lctf.coverageIndex(q.markCoverage,D);if(y!==-1){const B=C(U),W=B===-1?-1:r._lctf.coverageIndex(q.baseCoverage,E[B]);if(W!==-1){const I=q.markArray[y],V=q.baseArray[W][I.markClass];O[S*3]=V.x-I.x+O[B*3]-O[B*3+2],O[S*3+1]=V.y-I.y+O[B*3+1];break}}}else if(Y.ltype===6){const y=r._lctf.coverageIndex(q.mark1Coverage,D);if(y!==-1){const B=C();if(B!==-1){const W=E[B];if(b(M,W)===3){const I=r._lctf.coverageIndex(q.mark2Coverage,W);if(I!==-1){const V=q.mark1Array[y],Q=q.mark2Array[I][V.markClass];O[S*3]=Q.x-V.x+O[B*3]-O[B*3+2],O[S*3+1]=Q.y-V.y+O[B*3+1];break}}}}}}}}else if(M.kern&&!M.cff){const F=C();if(F!==-1){const X=M.kern.glyph1.indexOf(E[F]);if(X!==-1){const Y=M.kern.rval[X].glyph2.indexOf(D);Y!==-1&&(O[F*3+2]+=M.kern.rval[X].vals[Y])}}}}return O;function C(D){for(let k=S-1;k>=0;k--)if(E[k]!==-1&&(!D||D(E[k])))return k;return-1}function U(D){return b(M,D)===1}function N(D,k){for(let F=0;F<3;F++)O[k*3+F]+=D[F]||0}}function b(M,E){const O=M.GDEF&&M.GDEF.glyphClassDef;return O?r.U._getGlyphClass(E,O):0}function w(...M){for(let E=0;E<M.length;E++)if(typeof M[E]=="number")return M[E]}function T(M){const E=Object.create(null),O=M["OS/2"],S=M.hhea,C=M.head.unitsPerEm,U=w(O&&O.sTypoAscender,S&&S.ascender,C),N={unitsPerEm:C,ascender:U,descender:w(O&&O.sTypoDescender,S&&S.descender,0),capHeight:w(O&&O.sCapHeight,U),xHeight:w(O&&O.sxHeight,U),lineGap:w(O&&O.sTypoLineGap,S&&S.lineGap),supportsCodePoint(D){return r.U.codeToGlyph(M,D)>0},forEachGlyph(D,k,F,X){let Y=0;const z=1/N.unitsPerEm*k,q=x(M,D);let y=0;const B=v(M,q);return q.forEach((W,I)=>{if(W!==-1){let V=E[W];if(!V){const{cmds:Q,crds:ee}=r.U.glyphToPath(M,W);let ie="",le=0;for(let me=0,pe=Q.length;me<pe;me++){const ue=t[Q[me]];ie+=Q[me];for(let Se=1;Se<=ue;Se++)ie+=(Se>1?",":"")+ee[le++]}let Me,K,L,Ae;if(ee.length){Me=K=1/0,L=Ae=-1/0;for(let me=0,pe=ee.length;me<pe;me+=2){let ue=ee[me],Se=ee[me+1];ue<Me&&(Me=ue),Se<K&&(K=Se),ue>L&&(L=ue),Se>Ae&&(Ae=Se)}}else Me=L=K=Ae=0;V=E[W]={index:W,advanceWidth:M.hmtx.aWidth[W],xMin:Me,yMin:K,xMax:L,yMax:Ae,path:ie}}X.call(null,V,Y+B[I*3]*z,B[I*3+1]*z,y),Y+=B[I*3+2]*z,F&&(Y+=F*k)}y+=D.codePointAt(y)>65535?2:1}),Y}};return N}return function(M){const E=new Uint8Array(M,0,4),O=r._bin.readASCII(E,0,4);if(O==="wOFF")M=e(M);else if(O==="wOF2")throw new Error("woff2 fonts not supported");return T(r.parse(M)[0])}}const wv=Ua({name:"Typr Font Parser",dependencies:[bv,Sv,Mv],init(r,e,t){const i=r(),a=e();return t(i,a)}});function Tv(){return(function(r){var e=function(){this.buckets=new Map};e.prototype.add=function(v){var b=v>>5;this.buckets.set(b,(this.buckets.get(b)||0)|1<<(31&v))},e.prototype.has=function(v){var b=this.buckets.get(v>>5);return b!==void 0&&(b&1<<(31&v))!=0},e.prototype.serialize=function(){var v=[];return this.buckets.forEach(function(b,w){v.push((+w).toString(36)+":"+b.toString(36))}),v.join(",")},e.prototype.deserialize=function(v){var b=this;this.buckets.clear(),v.split(",").forEach(function(w){var T=w.split(":");b.buckets.set(parseInt(T[0],36),parseInt(T[1],36))})};var t=Math.pow(2,8),i=t-1,a=~i;function n(v){var b=(function(T){return T&a})(v).toString(16),w=(function(T){return(T&a)+t-1})(v).toString(16);return"codepoint-index/plane"+(v>>16)+"/"+b+"-"+w+".json"}function s(v,b){var w=v&i,T=b.codePointAt(w/6|0);return((T=(T||48)-48)&1<<w%6)!=0}function o(v,b){var w;(w=v,w.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(T){return T.split("-").map(function(M){return parseInt(M.trim(),16)})})).forEach(function(T){var M=T[0],E=T[1];E===void 0&&(E=M),b(M,E)})}function l(v,b){o(v,function(w,T){for(var M=w;M<=T;M++)b(M)})}var c={},u={},h=new WeakMap,d="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function f(v){var b=h.get(v);return b||(b=new e,l(v.ranges,function(w){return b.add(w)}),h.set(v,b)),b}var g,_=new Map;function m(v,b,w){return v[b]?b:v[w]?w:(function(T){for(var M in T)return M})(v)}function p(v,b){var w=b;if(!v.includes(w)){w=1/0;for(var T=0;T<v.length;T++)Math.abs(v[T]-b)<Math.abs(w-b)&&(w=v[T])}return w}function x(v){return g||(g=new Set,l("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(b){g.add(b)})),g.has(v)}return r.CodePointSet=e,r.clearCache=function(){c={},u={}},r.getFontsForString=function(v,b){b===void 0&&(b={});var w,T=b.lang;T===void 0&&(T=/\p{Script=Hangul}/u.test(w=v)?"ko":/\p{Script=Hiragana}|\p{Script=Katakana}/u.test(w)?"ja":"en");var M=b.category;M===void 0&&(M="sans-serif");var E=b.style;E===void 0&&(E="normal");var O=b.weight;O===void 0&&(O=400);var S=(b.dataUrl||d).replace(/\/$/g,""),C=new Map,U=new Uint8Array(v.length),N={},D={},k=new Array(v.length),F=new Map,X=!1;function Y(y){var B=_.get(y);return B||(B=fetch(S+"/"+y).then(function(W){if(!W.ok)throw new Error(W.statusText);return W.json().then(function(I){if(!Array.isArray(I)||I[0]!==1)throw new Error("Incorrect schema version; need 1, got "+I[0]);return I[1]})}).catch(function(W){if(S!==d)return X||(console.error('unicode-font-resolver: Failed loading from dataUrl "'+S+'", trying default CDN. '+W.message),X=!0),S=d,_.delete(y),Y(y);throw W}),_.set(y,B)),B}for(var z=function(y){var B=v.codePointAt(y),W=n(B);k[y]=W,c[W]||F.has(W)||F.set(W,Y(W).then(function(I){c[W]=I})),B>65535&&(y++,q=y)},q=0;q<v.length;q++)z(q);return Promise.all(F.values()).then(function(){F.clear();for(var y=function(W){var I=v.codePointAt(W),V=null,Q=c[k[W]],ee=void 0;for(var ie in Q){var le=D[ie];if(le===void 0&&(le=D[ie]=new RegExp(ie).test(T||"en")),le){for(var Me in ee=ie,Q[ie])if(s(I,Q[ie][Me])){V=Me;break}break}}if(!V){e:for(var K in Q)if(K!==ee){for(var L in Q[K])if(s(I,Q[K][L])){V=L;break e}}}V||(console.debug("No font coverage for U+"+I.toString(16)),V="latin"),k[W]=V,u[V]||F.has(V)||F.set(V,Y("font-meta/"+V+".json").then(function(Ae){u[V]=Ae})),I>65535&&(W++,B=W)},B=0;B<v.length;B++)y(B);return Promise.all(F.values())}).then(function(){for(var y,B=null,W=0;W<v.length;W++){var I=v.codePointAt(W);if(B&&(x(I)||f(B).has(I)))U[W]=U[W-1];else{B=u[k[W]];var V=N[B.id];if(!V){var Q=B.typeforms,ee=m(Q,M,"sans-serif"),ie=m(Q[ee],E,"normal"),le=p((y=Q[ee])===null||y===void 0?void 0:y[ie],O);V=N[B.id]=S+"/font-files/"+B.id+"/"+ee+"."+ie+"."+le+".woff"}var Me=C.get(V);Me==null&&(Me=C.size,C.set(V,Me)),U[W]=Me}I>65535&&(W++,U[W]=U[W-1])}return{fontUrls:Array.from(C.keys()),chars:U}})},Object.defineProperty(r,"__esModule",{value:!0}),r})({})}function Ev(r,e){const t=Object.create(null),i=Object.create(null);function a(s,o){const l=c=>{console.error(`Failure loading font ${s}`,c)};try{const c=new XMLHttpRequest;c.open("get",s,!0),c.responseType="arraybuffer",c.onload=function(){if(c.status>=400)l(new Error(c.statusText));else if(c.status>0)try{const u=r(c.response);u.src=s,o(u)}catch(u){l(u)}},c.onerror=l,c.send()}catch(c){l(c)}}function n(s,o){let l=t[s];l?o(l):i[s]?i[s].push(o):(i[s]=[o],a(s,c=>{c.src=s,t[s]=c,i[s].forEach(u=>u(c)),delete i[s]}))}return function(s,o,{lang:l,fonts:c=[],style:u="normal",weight:h="normal",unicodeFontsURL:d}={}){const f=new Uint8Array(s.length),g=[];s.length||x();const _=new Map,m=[];if(u!=="italic"&&(u="normal"),typeof h!="number"&&(h=h==="bold"?700:400),c&&!Array.isArray(c)&&(c=[c]),c=c.slice().filter(b=>!b.lang||b.lang.test(l)).reverse(),c.length){let b=0;(function w(T=0){for(let M=T,E=s.length;M<E;M++){const O=s.codePointAt(M);if(b===1&&g[f[M-1]].supportsCodePoint(O)||M>0&&/\s/.test(s[M]))f[M]=f[M-1],b===2&&(m[m.length-1][1]=M);else for(let S=f[M],C=c.length;S<=C;S++)if(S===C){const U=b===2?m[m.length-1]:m[m.length]=[M,M];U[1]=M,b=2}else{f[M]=S;const{src:U,unicodeRange:N}=c[S];if(!N||v(O,N)){const D=t[U];if(!D){n(U,()=>{w(M)});return}if(D.supportsCodePoint(O)){let k=_.get(D);typeof k!="number"&&(k=g.length,g.push(D),_.set(D,k)),f[M]=k,b=1;break}}}O>65535&&M+1<E&&(f[M+1]=f[M],M++,b===2&&(m[m.length-1][1]=M))}p()})()}else m.push([0,s.length-1]),p();function p(){if(m.length){const b=m.map(w=>s.substring(w[0],w[1]+1)).join(`
`);e.getFontsForString(b,{lang:l||void 0,style:u,weight:h,dataUrl:d}).then(({fontUrls:w,chars:T})=>{const M=g.length;let E=0;m.forEach(S=>{for(let C=0,U=S[1]-S[0];C<=U;C++)f[S[0]+C]=T[E++]+M;E++});let O=0;w.forEach((S,C)=>{n(S,U=>{g[C+M]=U,++O===w.length&&x()})})})}else x()}function x(){o({chars:f,fonts:g})}function v(b,w){for(let T=0;T<w.length;T++){const[M,E=M]=w[T];if(M<=b&&b<=E)return!0}return!1}}}const Av=Ua({name:"FontResolver",dependencies:[Ev,wv,Tv],init(r,e,t){return r(e,t())}});function Rv(r,e){const t=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,i="[^\\S\\u00A0]",a=new RegExp(`${i}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function n({text:f,lang:g,fonts:_,style:m,weight:p,preResolvedFonts:x,unicodeFontsURL:v},b){const w=({chars:T,fonts:M})=>{let E,O;const S=[];for(let C=0;C<T.length;C++)T[C]!==O?(O=T[C],S.push(E={start:C,end:C,fontObj:M[T[C]]})):E.end=C;b(S)};x?w(x):r(f,w,{lang:g,fonts:_,style:m,weight:p,unicodeFontsURL:v})}function s({text:f="",font:g,lang:_,sdfGlyphSize:m=64,fontSize:p=400,fontWeight:x=1,fontStyle:v="normal",letterSpacing:b=0,lineHeight:w="normal",maxWidth:T=1/0,direction:M,textAlign:E="left",textIndent:O=0,whiteSpace:S="normal",overflowWrap:C="normal",anchorX:U=0,anchorY:N=0,metricsOnly:D=!1,unicodeFontsURL:k,preResolvedFonts:F=null,includeCaretPositions:X=!1,chunkedBoundsSize:Y=8192,colorRanges:z=null},q){const y=u(),B={fontLoad:0,typesetting:0};f.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),f=f.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),p=+p,b=+b,T=+T,w=w||"normal",O=+O,n({text:f,lang:_,style:v,weight:x,fonts:typeof g=="string"?[{src:g}]:g,unicodeFontsURL:k,preResolvedFonts:F},W=>{B.fontLoad=u()-y;const I=isFinite(T);let V=null,Q=null,ee=null,ie=null,le=null,Me=null,K=null,L=null,Ae=0,me=0,pe=S!=="nowrap";const ue=new Map,Se=u();let oe=O,ge=0,ye=new h;const R=[ye];W.forEach(J=>{const{fontObj:Ce}=J,{ascender:fe,descender:ce,unitsPerEm:ve,lineGap:Ne,capHeight:de,xHeight:qe}=Ce;let Ee=ue.get(Ce);if(!Ee){const Re=p/ve,Oe=w==="normal"?(fe-ce+Ne)*Re:w*p,j=(Oe-(fe-ce)*Re)/2,_e=Math.min(Oe,(fe-ce)*Re),Z=(fe+ce)/2*Re+_e/2;Ee={index:ue.size,src:Ce.src,fontObj:Ce,fontSizeMult:Re,unitsPerEm:ve,ascender:fe*Re,descender:ce*Re,capHeight:de*Re,xHeight:qe*Re,lineHeight:Oe,baseline:-j-fe*Re,caretTop:Z,caretBottom:Z-_e},ue.set(Ce,Ee)}const{fontSizeMult:we}=Ee,Pe=f.slice(J.start,J.end+1);let De,Be;Ce.forEachGlyph(Pe,p,b,(Re,Oe,j,_e)=>{Oe+=ge,_e+=J.start,De=Oe,Be=Re;const Z=f.charAt(_e),Te=Re.advanceWidth*we,be=ye.count;let Fe;if("isEmpty"in Re||(Re.isWhitespace=!!Z&&new RegExp(i).test(Z),Re.canBreakAfter=!!Z&&a.test(Z),Re.isEmpty=Re.xMin===Re.xMax||Re.yMin===Re.yMax||t.test(Z)),!Re.isWhitespace&&!Re.isEmpty&&me++,pe&&I&&!Re.isWhitespace&&Oe+Te+oe>T&&be){if(ye.glyphAt(be-1).glyphObj.canBreakAfter)Fe=new h,oe=-Oe;else for(let tt=be;tt--;)if(tt===0&&C==="break-word"){Fe=new h,oe=-Oe;break}else if(ye.glyphAt(tt).glyphObj.canBreakAfter){Fe=ye.splitAt(tt+1);const rt=Fe.glyphAt(0).x;oe-=rt;for(let Ve=Fe.count;Ve--;)Fe.glyphAt(Ve).x-=rt;break}Fe&&(ye.isSoftWrapped=!0,ye=Fe,R.push(ye),Ae=T)}let ke=ye.glyphAt(ye.count);ke.glyphObj=Re,ke.x=Oe+oe,ke.y=j,ke.width=Te,ke.charIndex=_e,ke.fontData=Ee,Z===`
`&&(ye=new h,R.push(ye),oe=-(Oe+Te+b*p)+O)}),ge=De+Be.advanceWidth*we+b*p});let A=0;R.forEach(J=>{let Ce=!0;for(let fe=J.count;fe--;){const ce=J.glyphAt(fe);Ce&&!ce.glyphObj.isWhitespace&&(J.width=ce.x+ce.width,J.width>Ae&&(Ae=J.width),Ce=!1);let{lineHeight:ve,capHeight:Ne,xHeight:de,baseline:qe}=ce.fontData;ve>J.lineHeight&&(J.lineHeight=ve);const Ee=qe-J.baseline;Ee<0&&(J.baseline+=Ee,J.cap+=Ee,J.ex+=Ee),J.cap=Math.max(J.cap,J.baseline+Ne),J.ex=Math.max(J.ex,J.baseline+de)}J.baseline-=A,J.cap-=A,J.ex-=A,A+=J.lineHeight});let H=0,G=0;if(U&&(typeof U=="number"?H=-U:typeof U=="string"&&(H=-Ae*(U==="left"?0:U==="center"?.5:U==="right"?1:l(U)))),N&&(typeof N=="number"?G=-N:typeof N=="string"&&(G=N==="top"?0:N==="top-baseline"?-R[0].baseline:N==="top-cap"?-R[0].cap:N==="top-ex"?-R[0].ex:N==="middle"?A/2:N==="bottom"?A:N==="bottom-baseline"?-R[R.length-1].baseline:l(N)*A)),!D){const J=e.getEmbeddingLevels(f,M);V=new Uint16Array(me),Q=new Uint8Array(me),ee=new Float32Array(me*2),ie={},K=[1/0,1/0,-1/0,-1/0],L=[],X&&(Me=new Float32Array(f.length*4)),z&&(le=new Uint8Array(me*3));let Ce=0,fe=-1,ce=-1,ve,Ne;if(R.forEach((de,qe)=>{let{count:Ee,width:we}=de;if(Ee>0){let Pe=0;for(let _e=Ee;_e--&&de.glyphAt(_e).glyphObj.isWhitespace;)Pe++;let De=0,Be=0;if(E==="center")De=(Ae-we)/2;else if(E==="right")De=Ae-we;else if(E==="justify"&&de.isSoftWrapped){let _e=0;for(let Z=Ee-Pe;Z--;)de.glyphAt(Z).glyphObj.isWhitespace&&_e++;Be=(Ae-we)/_e}if(Be||De){let _e=0;for(let Z=0;Z<Ee;Z++){let Te=de.glyphAt(Z);const be=Te.glyphObj;Te.x+=De+_e,Be!==0&&be.isWhitespace&&Z<Ee-Pe&&(_e+=Be,Te.width+=Be)}}const Re=e.getReorderSegments(f,J,de.glyphAt(0).charIndex,de.glyphAt(de.count-1).charIndex);for(let _e=0;_e<Re.length;_e++){const[Z,Te]=Re[_e];let be=1/0,Fe=-1/0;for(let ke=0;ke<Ee;ke++)if(de.glyphAt(ke).charIndex>=Z){let tt=ke,rt=ke;for(;rt<Ee;rt++){let Ve=de.glyphAt(rt);if(Ve.charIndex>Te)break;rt<Ee-Pe&&(be=Math.min(be,Ve.x),Fe=Math.max(Fe,Ve.x+Ve.width))}for(let Ve=tt;Ve<rt;Ve++){const ut=de.glyphAt(Ve);ut.x=Fe-(ut.x+ut.width-be)}break}}let Oe;const j=_e=>Oe=_e;for(let _e=0;_e<Ee;_e++){const Z=de.glyphAt(_e);Oe=Z.glyphObj;const Te=Oe.index,be=J.levels[Z.charIndex]&1;if(be){const Fe=e.getMirroredCharacter(f[Z.charIndex]);Fe&&Z.fontData.fontObj.forEachGlyph(Fe,0,0,j)}if(X){const{charIndex:Fe,fontData:ke}=Z,tt=Z.x+H,rt=Z.x+Z.width+H;Me[Fe*4]=be?rt:tt,Me[Fe*4+1]=be?tt:rt,Me[Fe*4+2]=de.baseline+ke.caretBottom+G,Me[Fe*4+3]=de.baseline+ke.caretTop+G;const Ve=Fe-fe;Ve>1&&c(Me,fe,Ve),fe=Fe}if(z){const{charIndex:Fe}=Z;for(;Fe>ce;)ce++,z.hasOwnProperty(ce)&&(Ne=z[ce])}if(!Oe.isWhitespace&&!Oe.isEmpty){const Fe=Ce++,{fontSizeMult:ke,src:tt,index:rt}=Z.fontData,Ve=ie[tt]||(ie[tt]={});Ve[Te]||(Ve[Te]={path:Oe.path,pathBounds:[Oe.xMin,Oe.yMin,Oe.xMax,Oe.yMax]});const ut=Z.x+H,Ct=Z.y+de.baseline+G;ee[Fe*2]=ut,ee[Fe*2+1]=Ct;const bi=ut+Oe.xMin*ke,Ri=Ct+Oe.yMin*ke,ai=ut+Oe.xMax*ke,zi=Ct+Oe.yMax*ke;bi<K[0]&&(K[0]=bi),Ri<K[1]&&(K[1]=Ri),ai>K[2]&&(K[2]=ai),zi>K[3]&&(K[3]=zi),Fe%Y===0&&(ve={start:Fe,end:Fe,rect:[1/0,1/0,-1/0,-1/0]},L.push(ve)),ve.end++;const Dt=ve.rect;if(bi<Dt[0]&&(Dt[0]=bi),Ri<Dt[1]&&(Dt[1]=Ri),ai>Dt[2]&&(Dt[2]=ai),zi>Dt[3]&&(Dt[3]=zi),V[Fe]=Te,Q[Fe]=rt,z){const ni=Fe*3;le[ni]=Ne>>16&255,le[ni+1]=Ne>>8&255,le[ni+2]=Ne&255}}}}}),Me){const de=f.length-fe;de>1&&c(Me,fe,de)}}const te=[];ue.forEach(({index:J,src:Ce,unitsPerEm:fe,ascender:ce,descender:ve,lineHeight:Ne,capHeight:de,xHeight:qe})=>{te[J]={src:Ce,unitsPerEm:fe,ascender:ce,descender:ve,lineHeight:Ne,capHeight:de,xHeight:qe}}),B.typesetting=u()-Se,q({glyphIds:V,glyphFontIndices:Q,glyphPositions:ee,glyphData:ie,fontData:te,caretPositions:Me,glyphColors:le,chunkedBounds:L,fontSize:p,topBaseline:G+R[0].baseline,blockBounds:[H,G-A,H+Ae,G],visibleBounds:K,timings:B})})}function o(f,g){s({...f,metricsOnly:!0},_=>{const[m,p,x,v]=_.blockBounds;g({width:x-m,height:v-p})})}function l(f){let g=f.match(/^([\d.]+)%$/),_=g?parseFloat(g[1]):NaN;return isNaN(_)?0:_/100}function c(f,g,_){const m=f[g*4],p=f[g*4+1],x=f[g*4+2],v=f[g*4+3],b=(p-m)/_;for(let w=0;w<_;w++){const T=(g+w)*4;f[T]=m+b*w,f[T+1]=m+b*(w+1),f[T+2]=x,f[T+3]=v}}function u(){return(self.performance||Date).now()}function h(){this.data=[]}const d=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/d.length)},glyphAt(f){let g=h.flyweight;return g.data=this.data,g.index=f,g},splitAt(f){let g=new h;return g.data=this.data.splice(f*d.length),g}},h.flyweight=d.reduce((f,g,_,m)=>(Object.defineProperty(f,g,{get(){return this.data[this.index*d.length+_]},set(p){this.data[this.index*d.length+_]=p}}),f),{data:null,index:0}),{typeset:s,measure:o}}const Xr=()=>(self.performance||Date).now(),Ao=Su();let Ru;function Cv(r,e,t,i,a,n,s,o,l,c,u=!0){return u?Pv(r,e,t,i,a,n,s,o,l,c).then(null,h=>(Ru||(console.warn("WebGL SDF generation failed, falling back to JS",h),Ru=!0),Pu(r,e,t,i,a,n,s,o,l,c))):Pu(r,e,t,i,a,n,s,o,l,c)}const Ro=[],Dv=5;let Xs=0;function Cu(){const r=Xr();for(;Ro.length&&Xr()-r<Dv;)Ro.shift()();Xs=Ro.length?setTimeout(Cu,0):0}const Pv=(...r)=>new Promise((e,t)=>{Ro.push(()=>{const i=Xr();try{Ao.webgl.generateIntoCanvas(...r),e({timing:Xr()-i})}catch(a){t(a)}}),Xs||(Xs=setTimeout(Cu,0))}),Uv=4,Lv=2e3,Du={};let Iv=0;function Pu(r,e,t,i,a,n,s,o,l,c){const u="TroikaTextSDFGenerator_JS_"+Iv++%Uv;let h=Du[u];return h||(h=Du[u]={workerModule:Ua({name:u,workerId:u,dependencies:[Su,Xr],init(d,f){const g=d().javascript.generate;return function(..._){const m=f();return{textureData:g(..._),timing:f()-m}}},getTransferables(d){return[d.textureData.buffer]}}),requests:0,idleTimer:null}),h.requests++,clearTimeout(h.idleTimer),h.workerModule(r,e,t,i,a,n).then(({textureData:d,timing:f})=>{const g=Xr(),_=new Uint8Array(d.length*4);for(let m=0;m<d.length;m++)_[m*4+c]=d[m];return Ao.webglUtils.renderImageData(s,_,o,l,r,e,1<<3-c),f+=Xr()-g,--h.requests===0&&(h.idleTimer=setTimeout(()=>{hv(u)},Lv)),{timing:f}})}function Ov(r){r._warm||(Ao.webgl.isSupported(r),r._warm=!0)}const Fv=Ao.webglUtils.resizeWebGLCanvasWithoutClearing,Mn={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},Nv=new he;function La(){return(self.performance||Date).now()}const Uu=Object.create(null);function zv(r,e){r=Bv({},r);const t=La(),i=[];if(r.font&&i.push({label:"user",src:Gv(r.font)}),r.font=i,r.text=""+r.text,r.sdfGlyphSize=r.sdfGlyphSize||Mn.sdfGlyphSize,r.unicodeFontsURL=r.unicodeFontsURL||Mn.unicodeFontsURL,r.colorRanges!=null){let h={};for(let d in r.colorRanges)if(r.colorRanges.hasOwnProperty(d)){let f=r.colorRanges[d];typeof f!="number"&&(f=Nv.set(f).getHex()),h[d]=f}r.colorRanges=h}Object.freeze(r);const{textureWidth:a,sdfExponent:n}=Mn,{sdfGlyphSize:s}=r,o=a/s*4;let l=Uu[s];if(!l){const h=document.createElement("canvas");h.width=a,h.height=s*256/o,l=Uu[s]={glyphCount:0,sdfGlyphSize:s,sdfCanvas:h,sdfTexture:new Ot(h,void 0,void 0,void 0,1006,1006),contextLost:!1,glyphsByFont:new Map},l.sdfTexture.generateMipmaps=!1,kv(l)}const{sdfTexture:c,sdfCanvas:u}=l;Ou(r).then(h=>{const{glyphIds:d,glyphFontIndices:f,fontData:g,glyphPositions:_,fontSize:m,timings:p}=h,x=[],v=new Float32Array(d.length*4);let b=0,w=0;const T=La(),M=g.map(U=>{let N=l.glyphsByFont.get(U.src);return N||l.glyphsByFont.set(U.src,N=new Map),N});d.forEach((U,N)=>{const D=f[N],{src:k,unitsPerEm:F}=g[D];let X=M[D].get(U);if(!X){const{path:B,pathBounds:W}=h.glyphData[k][U],I=Math.max(W[2]-W[0],W[3]-W[1])/s*(Mn.sdfMargin*s+.5),V=l.glyphCount++,Q=[W[0]-I,W[1]-I,W[2]+I,W[3]+I];M[D].set(U,X={path:B,atlasIndex:V,sdfViewBox:Q}),x.push(X)}const{sdfViewBox:Y}=X,z=_[w++],q=_[w++],y=m/F;v[b++]=z+Y[0]*y,v[b++]=q+Y[1]*y,v[b++]=z+Y[2]*y,v[b++]=q+Y[3]*y,d[N]=X.atlasIndex}),p.quads=(p.quads||0)+(La()-T);const E=La();p.sdf={};const O=u.height,S=Math.ceil(l.glyphCount/o),C=Math.pow(2,Math.ceil(Math.log2(S*s)));C>O&&(console.info(`Increasing SDF texture size ${O}->${C}`),Fv(u,a,C),c.dispose()),Promise.all(x.map(U=>Lu(U,l,r.gpuAccelerateSDF).then(({timing:N})=>{p.sdf[U.atlasIndex]=N}))).then(()=>{x.length&&!l.contextLost&&(Iu(l),c.needsUpdate=!0),p.sdfTotal=La()-E,p.total=La()-t,e(Object.freeze({parameters:r,sdfTexture:c,sdfGlyphSize:s,sdfExponent:n,glyphBounds:v,glyphAtlasIndices:d,glyphColors:h.glyphColors,caretPositions:h.caretPositions,chunkedBounds:h.chunkedBounds,ascender:h.ascender,descender:h.descender,lineHeight:h.lineHeight,capHeight:h.capHeight,xHeight:h.xHeight,topBaseline:h.topBaseline,blockBounds:h.blockBounds,visibleBounds:h.visibleBounds,timings:h.timings}))})}),Promise.resolve().then(()=>{l.contextLost||Ov(u)})}function Lu({path:r,atlasIndex:e,sdfViewBox:t},{sdfGlyphSize:i,sdfCanvas:a,contextLost:n},s){if(n)return Promise.resolve({timing:-1});const{textureWidth:o,sdfExponent:l}=Mn,c=Math.max(t[2]-t[0],t[3]-t[1]),u=Math.floor(e/4),h=u%(o/i)*i,d=Math.floor(u/(o/i))*i,f=e%4;return Cv(i,i,r,t,c,l,a,h,d,f,s)}function kv(r){const e=r.sdfCanvas;e.addEventListener("webglcontextlost",t=>{console.log("Context Lost",t),t.preventDefault(),r.contextLost=!0}),e.addEventListener("webglcontextrestored",t=>{console.log("Context Restored",t),r.contextLost=!1;const i=[];r.glyphsByFont.forEach(a=>{a.forEach(n=>{i.push(Lu(n,r,!0))})}),Promise.all(i).then(()=>{Iu(r),r.sdfTexture.needsUpdate=!0})})}function Bv(r,e){for(let t in e)e.hasOwnProperty(t)&&(r[t]=e[t]);return r}let Co;function Gv(r){return Co||(Co=typeof document>"u"?{}:document.createElement("a")),Co.href=r,Co.href}function Iu(r){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:e,sdfTexture:t}=r,{width:i,height:a}=e,n=r.sdfCanvas.getContext("webgl");let s=t.image.data;(!s||s.length!==i*a*4)&&(s=new Uint8Array(i*a*4),t.image={width:i,height:a,data:s},t.flipY=!1,t.isDataTexture=!0),n.readPixels(0,0,i,a,n.RGBA,n.UNSIGNED_BYTE,s)}}const Hv=Ua({name:"Typesetter",dependencies:[Rv,Av,fv],init(r,e,t){return r(e,t())}}),Ou=Ua({name:"Typesetter",dependencies:[Hv],init(r){return function(e){return new Promise(t=>{r.typeset(e,t)})}},getTransferables(r){const e=[];for(let t in r)r[t]&&r[t].buffer&&e.push(r[t].buffer);return e}});Ou.onMainThread;const Fu={};function Vv(r){let e=Fu[r];return e||(e=Fu[r]=new Je(1,1,r,r).translate(.5,.5,0)),e}const Wv="aTroikaGlyphBounds",Nu="aTroikaGlyphIndex",Xv="aTroikaGlyphColor";class qv extends Zg{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new Or,this.boundingBox=new Ki}computeBoundingSphere(){}computeBoundingBox(){}set detail(e){if(e!==this._detail){this._detail=e,(typeof e!="number"||e<1)&&(e=1);let t=Vv(e);["position","normal","uv"].forEach(i=>{this.attributes[i]=t.attributes[i].clone()}),this.setIndex(t.getIndex().clone())}}get detail(){return this._detail}set curveRadius(e){e!==this._curveRadius&&(this._curveRadius=e,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(e,t,i,a,n){this.updateAttributeData(Wv,e,4),this.updateAttributeData(Nu,t,1),this.updateAttributeData(Xv,n,3),this._blockBounds=i,this._chunkedBounds=a,this.instanceCount=t.length,this._updateBounds()}_updateBounds(){const e=this._blockBounds;if(e){const{curveRadius:t,boundingBox:i}=this;if(t){const{PI:a,floor:n,min:s,max:o,sin:l,cos:c}=Math,u=a/2,h=a*2,d=Math.abs(t),f=e[0]/d,g=e[2]/d,_=n((f+u)/h)!==n((g+u)/h)?-d:s(l(f)*d,l(g)*d),m=n((f-u)/h)!==n((g-u)/h)?d:o(l(f)*d,l(g)*d),p=n((f+a)/h)!==n((g+a)/h)?d*2:o(d-c(f)*d,d-c(g)*d);i.min.set(_,e[1],t<0?-p:0),i.max.set(m,e[3],t<0?0:p)}else i.min.set(e[0],e[1],0),i.max.set(e[2],e[3],0);i.getBoundingSphere(this.boundingSphere)}}applyClipRect(e){let t=this.getAttribute(Nu).count,i=this._chunkedBounds;if(i)for(let a=i.length;a--;){t=i[a].end;let n=i[a].rect;if(n[1]<e.w&&n[3]>e.y&&n[0]<e.z&&n[2]>e.x)break}this.instanceCount=t}updateAttributeData(e,t,i){const a=this.getAttribute(e);t?a&&a.array.length===t.length?(a.array.set(t),a.needsUpdate=!0):(this.setAttribute(e,new Vr(t,i)),delete this._maxInstanceCount,this.dispose()):a&&this.deleteAttribute(e)}}const jv=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,Yv=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,Zv=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,Kv=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function $v(r){const e=Ws(r,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new Ue},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new Rt(0,0,0,0)},uTroikaClipRect:{value:new Rt(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new Ue},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new he},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Qe},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:jv,vertexTransform:Yv,fragmentDefs:Zv,fragmentColorTransform:Kv,customRewriter({vertexShader:t,fragmentShader:i}){let a=/\buniform\s+vec3\s+diffuse\b/;return a.test(i)&&(i=i.replace(a,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),a.test(t)||(t=t.replace(Mu,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:t,fragmentShader:i}}});return e.transparent=!0,e.forceSinglePass=!0,Object.defineProperties(e,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),e}const qs=new gr({color:16777215,side:2,transparent:!0}),zu=8421504,ku=new ft,Do=new ae,js=new ae,wn=[],Qv=new ae,Ys="+x+y";function Bu(r){return Array.isArray(r)?r[0]:r}let Gu=()=>{const r=new Xe(new Je(1,1),qs);return Gu=()=>r,r},Hu=()=>{const r=new Xe(new Je(1,1,32,1),qs);return Hu=()=>r,r};const Jv={type:"syncstart"},e_={type:"synccomplete"},Vu=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],t_=Vu.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class Vi extends Xe{constructor(){const e=new qv;super(e,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=zu,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Ys,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(e){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(e):(this._isSyncing=!0,this.dispatchEvent(Jv),zv({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},t=>{this._isSyncing=!1,this._textRenderInfo=t,this.geometry.updateGlyphs(t.glyphBounds,t.glyphAtlasIndices,t.blockBounds,t.chunkedBounds,t.glyphColors);const i=this._queuedSyncs;i&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{i.forEach(a=>a&&a())})),this.dispatchEvent(e_),e&&e()})))}onBeforeRender(e,t,i,a,n,s){this.sync(),n.isTroikaTextMaterial&&this._prepareForRender(n)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(e){return $v(e)}get material(){let e=this._derivedMaterial;const t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=qs.clone());if((!e||!e.isDerivedFrom(t))&&(e=this._derivedMaterial=this.createDerivedMaterial(t),t.addEventListener("dispose",function i(){t.removeEventListener("dispose",i),e.dispose()})),this.hasOutline()){let i=e._outlineMtl;return i||(i=e._outlineMtl=Object.create(e,{id:{value:e.id+.1}}),i.isTextOutlineMaterial=!0,i.depthWrite=!1,i.map=null,e.addEventListener("dispose",function a(){e.removeEventListener("dispose",a),i.dispose()})),[i,e]}else return e}set material(e){e&&e.isTroikaTextMaterial?(this._derivedMaterial=e,this._baseMaterial=e.baseMaterial):this._baseMaterial=e}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(e){this.geometry.detail=e}get curveRadius(){return this.geometry.curveRadius}set curveRadius(e){this.geometry.curveRadius=e}get customDepthMaterial(){return Bu(this.material).getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return Bu(this.material).getDistanceMaterial()}set customDistanceMaterial(e){}_prepareForRender(e){const t=e.isTextOutlineMaterial,i=e.uniforms,a=this.textRenderInfo;if(a){const{sdfTexture:o,blockBounds:l}=a;i.uTroikaSDFTexture.value=o,i.uTroikaSDFTextureSize.value.set(o.image.width,o.image.height),i.uTroikaSDFGlyphSize.value=a.sdfGlyphSize,i.uTroikaSDFExponent.value=a.sdfExponent,i.uTroikaTotalBounds.value.fromArray(l),i.uTroikaUseGlyphColors.value=!t&&!!a.glyphColors;let c=0,u=0,h=0,d,f,g,_=0,m=0;if(t){let{outlineWidth:x,outlineOffsetX:v,outlineOffsetY:b,outlineBlur:w,outlineOpacity:T}=this;c=this._parsePercent(x)||0,u=Math.max(0,this._parsePercent(w)||0),d=T,_=this._parsePercent(v)||0,m=this._parsePercent(b)||0}else h=Math.max(0,this._parsePercent(this.strokeWidth)||0),h&&(g=this.strokeColor,i.uTroikaStrokeColor.value.set(g??zu),f=this.strokeOpacity,f==null&&(f=1)),d=this.fillOpacity;i.uTroikaEdgeOffset.value=c,i.uTroikaPositionOffset.value.set(_,m),i.uTroikaBlurRadius.value=u,i.uTroikaStrokeWidth.value=h,i.uTroikaStrokeOpacity.value=f,i.uTroikaFillOpacity.value=d??1,i.uTroikaCurveRadius.value=this.curveRadius||0;let p=this.clipRect;if(p&&Array.isArray(p)&&p.length===4)i.uTroikaClipRect.value.fromArray(p);else{const x=(this.fontSize||.1)*100;i.uTroikaClipRect.value.set(l[0]-x,l[1]-x,l[2]+x,l[3]+x)}this.geometry.applyClipRect(i.uTroikaClipRect.value)}i.uTroikaSDFDebug.value=!!this.debugSDF,e.polygonOffset=!!this.depthOffset,e.polygonOffsetFactor=e.polygonOffsetUnits=this.depthOffset||0;const n=t?this.outlineColor||0:this.color;if(n==null)delete e.color;else{const o=e.hasOwnProperty("color")?e.color:e.color=new he;(n!==o._input||typeof n=="object")&&o.set(o._input=n)}let s=this.orientation||Ys;if(s!==e._orientation){let o=i.uTroikaOrient.value;s=s.replace(/[^-+xyz]/g,"");let l=s!==Ys&&s.match(/^([-+])([xyz])([-+])([xyz])$/);if(l){let[,c,u,h,d]=l;Do.set(0,0,0)[u]=c==="-"?1:-1,js.set(0,0,0)[d]=h==="-"?-1:1,ku.lookAt(Qv,Do.cross(js),js),o.setFromMatrix4(ku)}else o.identity();e._orientation=s}}_parsePercent(e){if(typeof e=="string"){let t=e.match(/^(-?[\d.]+)%$/),i=t?parseFloat(t[1]):NaN;e=(isNaN(i)?0:i/100)*this.fontSize}return e}localPositionToTextCoords(e,t=new Ue){t.copy(e);const i=this.curveRadius;return i&&(t.x=Math.atan2(e.x,Math.abs(i)-Math.abs(e.z))*Math.abs(i)),t}worldPositionToTextCoords(e,t=new Ue){return Do.copy(e),this.localPositionToTextCoords(this.worldToLocal(Do),t)}raycast(e,t){const{textRenderInfo:i,curveRadius:a}=this;if(i){const n=i.blockBounds,s=a?Hu():Gu(),o=s.geometry,{position:l,uv:c}=o.attributes;for(let u=0;u<c.count;u++){let h=n[0]+c.getX(u)*(n[2]-n[0]);const d=n[1]+c.getY(u)*(n[3]-n[1]);let f=0;a&&(f=a-Math.cos(h/a)*a,h=Math.sin(h/a)*a),l.setXYZ(u,h,d,f)}o.boundingSphere=this.geometry.boundingSphere,o.boundingBox=this.geometry.boundingBox,s.matrixWorld=this.matrixWorld,s.material.side=this.material.side,wn.length=0,s.raycast(e,wn);for(let u=0;u<wn.length;u++)wn[u].object=this,t.push(wn[u])}}copy(e){const t=this.geometry;return super.copy(e),this.geometry=t,t_.forEach(i=>{this[i]=e[i]}),this}clone(){return new this.constructor().copy(this)}}Vu.forEach(r=>{const e="_private_"+r;Object.defineProperty(Vi.prototype,r,{get(){return this[e]},set(t){t!==this[e]&&(this[e]=t,this._needsSync=!0)}})}),new Ki,new he;const Wu="/chromic-lyrics/vendor/SFNS-ExtraBold.ttf",Xu="/chromic-lyrics/vendor/SFNS.ttf";let Po=Wu;try{fetch(Wu,{method:"HEAD"}).then(r=>{r.ok||(Po=Xu)})}catch{Po=Xu}const qu="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";class i_{constructor(e){this.opacity=0,this.targetOpacity=0,this._centered=!1,this.group=new _r,this.group.layers.set(1),this.titleText=new Vi,this.titleText.font=Po,this.titleText.fontSize=.09,this.titleText.unicodeFontsURL=qu,this.titleText.fontWeight=800,this.titleText.color=16777215,this.titleText.anchorX="left",this.titleText.anchorY="middle",this.titleText.position.set(-.85,-.65,-1),this.titleText.fillOpacity=0,this.titleText.sdfGlyphSize=64,this.titleText.gpuAccelerateSDF=!0,this.titleText.text="",this.titleText.layers.set(1),this.titleText.sync(),this.group.add(this.titleText),this.artistText=new Vi,this.artistText.font=Po,this.artistText.fontSize=.055,this.artistText.unicodeFontsURL=qu,this.artistText.fontWeight=800,this.artistText.color=8304895,this.artistText.anchorX="left",this.artistText.anchorY="middle",this.artistText.position.set(-.85,-.78,-1),this.artistText.fillOpacity=0,this.artistText.sdfGlyphSize=64,this.artistText.gpuAccelerateSDF=!0,this.artistText.text="",this.artistText.layers.set(1),this.artistText.sync(),this.group.add(this.artistText)}setTrack(e,t){this.titleText.text=e,this.artistText.text=t,this.titleText.sync(),this.artistText.sync()}setCentered(e){e!==this._centered&&(this._centered=e,console.log(`[GpuTypography] setCentered(${e}) \u2014 moving text to ${e?"CENTER":"BOTTOM-LEFT"}`),console.trace("[GpuTypography] setCentered caller"),e?(this.titleText.anchorX="left",this.artistText.anchorX="left",this.titleText.position.set(-.45,.06,-1),this.artistText.position.set(-.45,-.05,-1)):(this.titleText.anchorX="left",this.artistText.anchorX="left",this.titleText.position.set(-.85,-.65,-1),this.artistText.position.set(-.85,-.78,-1)),this.titleText.sync(),this.artistText.sync())}setVisible(e){console.log(`[GpuTypography] setVisible(${e})`),this.targetOpacity=e?1:0}update(e){this.opacity+=(this.targetOpacity-this.opacity)*.04,this.titleText.fillOpacity=this.opacity,this.artistText.fillOpacity=this.opacity*.85}addToScene(e){e.add(this.group)}removeFromScene(e){e.remove(this.group)}dispose(){this.titleText.dispose(),this.artistText.dispose()}}function ir(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ju(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}var di={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Tn={duration:.5,overwrite:!1,delay:0},Zs,It,dt,wi=1e8,nt=1/wi,Ks=Math.PI*2,r_=Ks/4,a_=0,Yu=Math.sqrt,n_=Math.cos,o_=Math.sin,Ut=function(r){return typeof r=="string"},xt=function(r){return typeof r=="function"},rr=function(r){return typeof r=="number"},$s=function(r){return typeof r>"u"},Wi=function(r){return typeof r=="object"},Qt=function(r){return r!==!1},Qs=function(){return typeof window<"u"},Uo=function(r){return xt(r)||Ut(r)},Zu=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Bt=Array.isArray,s_=/random\([^)]+\)/g,l_=/,\s*/g,Ku=/(?:-?\.?\d|\.)+/gi,$u=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ia=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Js=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Qu=/[+-]=-?[.\d]+/,c_=/[^,'"\[\]\s]+/gi,u_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,mt,Xi,el,tl,fi={},Lo={},Ju,eh=function(r){return(Lo=Fa(r,fi))&&ii},il=function(r,e){return console.warn("Invalid property",r,"set to",e,"Missing plugin? gsap.registerPlugin()")},En=function(r,e){return!e&&console.warn(r)},th=function(r,e){return r&&(fi[r]=e)&&Lo&&(Lo[r]=e)||fi},An=function(){return 0},h_={suppressEvents:!0,isStart:!0,kill:!1},Io={suppressEvents:!0,kill:!1},d_={suppressEvents:!0},rl={},br=[],al={},ih,pi={},nl={},rh=30,Oo=[],ol="",sl=function(r){var e=r[0],t,i;if(Wi(e)||xt(e)||(r=[r]),!(t=(e._gsap||{}).harness)){for(i=Oo.length;i--&&!Oo[i].targetTest(e););t=Oo[i]}for(i=r.length;i--;)r[i]&&(r[i]._gsap||(r[i]._gsap=new Dh(r[i],t)))||r.splice(i,1);return r},qr=function(r){return r._gsap||sl(Ei(r))[0]._gsap},ah=function(r,e,t){return(t=r[e])&&xt(t)?r[e]():$s(t)&&r.getAttribute&&r.getAttribute(e)||t},Jt=function(r,e){return(r=r.split(",")).forEach(e)||r},St=function(r){return Math.round(r*1e5)/1e5||0},gt=function(r){return Math.round(r*1e7)/1e7||0},Oa=function(r,e){var t=e.charAt(0),i=parseFloat(e.substr(2));return r=parseFloat(r),t==="+"?r+i:t==="-"?r-i:t==="*"?r*i:r/i},f_=function(r,e){for(var t=e.length,i=0;r.indexOf(e[i])<0&&++i<t;);return i<t},Fo=function(){var r=br.length,e=br.slice(0),t,i;for(al={},br.length=0,t=0;t<r;t++)i=e[t],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},ll=function(r){return!!(r._initted||r._startAt||r.add)},nh=function(r,e,t,i){br.length&&!It&&Fo(),r.render(e,t,!!(It&&e<0&&ll(r))),br.length&&!It&&Fo()},oh=function(r){var e=parseFloat(r);return(e||e===0)&&(r+"").match(c_).length<2?e:Ut(r)?r.trim():r},sh=function(r){return r},mi=function(r,e){for(var t in e)t in r||(r[t]=e[t]);return r},p_=function(r){return function(e,t){for(var i in t)i in e||i==="duration"&&r||i==="ease"||(e[i]=t[i])}},Fa=function(r,e){for(var t in e)r[t]=e[t];return r},lh=function r(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Wi(t[i])?r(e[i]||(e[i]={}),t[i]):t[i]);return e},No=function(r,e){var t={},i;for(i in r)i in e||(t[i]=r[i]);return t},Rn=function(r){var e=r.parent||mt,t=r.keyframes?p_(Bt(r.keyframes)):mi;if(Qt(r.inherit))for(;e;)t(r,e.vars.defaults),e=e.parent||e._dp;return r},m_=function(r,e){for(var t=r.length,i=t===e.length;i&&t--&&r[t]===e[t];);return t<0},ch=function(r,e,t,i,a){var n=r[i],s;if(a)for(s=e[a];n&&n[a]>s;)n=n._prev;return n?(e._next=n._next,n._next=e):(e._next=r[t],r[t]=e),e._next?e._next._prev=e:r[i]=e,e._prev=n,e.parent=e._dp=r,e},zo=function(r,e,t,i){t===void 0&&(t="_first"),i===void 0&&(i="_last");var a=e._prev,n=e._next;a?a._next=n:r[t]===e&&(r[t]=n),n?n._prev=a:r[i]===e&&(r[i]=a),e._next=e._prev=e.parent=null},Sr=function(r,e){r.parent&&(!e||r.parent.autoRemoveChildren)&&r.parent.remove&&r.parent.remove(r),r._act=0},jr=function(r,e){if(r&&(!e||e._end>r._dur||e._start<0))for(var t=r;t;)t._dirty=1,t=t.parent;return r},g_=function(r){for(var e=r.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return r},cl=function(r,e,t,i){return r._startAt&&(It?r._startAt.revert(Io):r.vars.immediateRender&&!r.vars.autoRevert||r._startAt.render(e,!0,i))},v_=function r(e){return!e||e._ts&&r(e.parent)},uh=function(r){return r._repeat?Na(r._tTime,r=r.duration()+r._rDelay)*r:0},Na=function(r,e){var t=Math.floor(r=gt(r/e));return r&&t===r?t-1:t},ko=function(r,e){return(r-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Bo=function(r){return r._end=gt(r._start+(r._tDur/Math.abs(r._ts||r._rts||nt)||0))},Go=function(r,e){var t=r._dp;return t&&t.smoothChildTiming&&r._ts&&(r._start=gt(t._time-(r._ts>0?e/r._ts:((r._dirty?r.totalDuration():r._tDur)-e)/-r._ts)),Bo(r),t._dirty||jr(t,r)),r},hh=function(r,e){var t;if((e._time||!e._dur&&e._initted||e._start<r._time&&(e._dur||!e.add))&&(t=ko(r.rawTime(),e),(!e._dur||Dn(0,e.totalDuration(),t)-e._tTime>nt)&&e.render(t,!0)),jr(r,e)._dp&&r._initted&&r._time>=r._dur&&r._ts){if(r._dur<r.duration())for(t=r;t._dp;)t.rawTime()>=0&&t.totalTime(t._tTime),t=t._dp;r._zTime=-nt}},qi=function(r,e,t,i){return e.parent&&Sr(e),e._start=gt((rr(t)?t:t||r!==mt?Ti(r,t,e):r._time)+e._delay),e._end=gt(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),ch(r,e,"_first","_last",r._sort?"_start":0),ul(e)||(r._recent=e),i||hh(r,e),r._ts<0&&Go(r,r._tTime),r},dh=function(r,e){return(fi.ScrollTrigger||il("scrollTrigger",e))&&fi.ScrollTrigger.create(e,r)},fh=function(r,e,t,i,a){if(xl(r,e,a),!r._initted)return 1;if(!t&&r._pt&&!It&&(r._dur&&r.vars.lazy!==!1||!r._dur&&r.vars.lazy)&&ih!==vi.frame)return br.push(r),r._lazy=[a,i],1},__=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},ul=function(r){var e=r.data;return e==="isFromStart"||e==="isStart"},x_=function(r,e,t,i){var a=r.ratio,n=e<0||!e&&(!r._start&&__(r)&&!(!r._initted&&ul(r))||(r._ts<0||r._dp._ts<0)&&!ul(r))?0:1,s=r._rDelay,o=0,l,c,u;if(s&&r._repeat&&(o=Dn(0,r._tDur,e),c=Na(o,s),r._yoyo&&c&1&&(n=1-n),c!==Na(r._tTime,s)&&(a=1-n,r.vars.repeatRefresh&&r._initted&&r.invalidate())),n!==a||It||i||r._zTime===nt||!e&&r._zTime){if(!r._initted&&fh(r,e,i,t,o))return;for(u=r._zTime,r._zTime=e||(t?nt:0),t||(t=e&&!u),r.ratio=n,r._from&&(n=1-n),r._time=0,r._tTime=o,l=r._pt;l;)l.r(n,l.d),l=l._next;e<0&&cl(r,e,t,!0),r._onUpdate&&!t&&gi(r,"onUpdate"),o&&r._repeat&&!t&&r.parent&&gi(r,"onRepeat"),(e>=r._tDur||e<0)&&r.ratio===n&&(n&&Sr(r,1),!t&&!It&&(gi(r,n?"onComplete":"onReverseComplete",!0),r._prom&&r._prom()))}else r._zTime||(r._zTime=e)},y_=function(r,e,t){var i;if(t>e)for(i=r._first;i&&i._start<=t;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=r._last;i&&i._start>=t;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},za=function(r,e,t,i){var a=r._repeat,n=gt(e)||0,s=r._tTime/r._tDur;return s&&!i&&(r._time*=n/r._dur),r._dur=n,r._tDur=a?a<0?1e10:gt(n*(a+1)+r._rDelay*a):n,s>0&&!i&&Go(r,r._tTime=r._tDur*s),r.parent&&Bo(r),t||jr(r.parent,r),r},ph=function(r){return r instanceof ei?jr(r):za(r,r._dur)},b_={_start:0,endTime:An,totalDuration:An},Ti=function r(e,t,i){var a=e.labels,n=e._recent||b_,s=e.duration()>=wi?n.endTime(!1):e._dur,o,l,c;return Ut(t)&&(isNaN(t)||t in a)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?n._start:n.endTime(n._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?n:i).totalDuration()/100:1)):o<0?(t in a||(a[t]=s),a[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&i&&(l=l/100*(Bt(i)?i[0]:i).totalDuration()),o>1?r(e,t.substr(0,o-1),i)+l:s+l)):t==null?s:+t},Cn=function(r,e,t){var i=rr(e[1]),a=(i?2:1)+(r<2?0:1),n=e[a],s,o;if(i&&(n.duration=e[1]),n.parent=t,r){for(s=n,o=t;o&&!("immediateRender"in s);)s=o.vars.defaults||{},o=Qt(o.vars.inherit)&&o.parent;n.immediateRender=Qt(s.immediateRender),r<2?n.runBackwards=1:n.startAt=e[a-1]}return new Tt(e[0],n,e[a+1])},Mr=function(r,e){return r||r===0?e(r):e},Dn=function(r,e,t){return t<r?r:t>e?e:t},Gt=function(r,e){return!Ut(r)||!(e=u_.exec(r))?"":e[1]},S_=function(r,e,t){return Mr(t,function(i){return Dn(r,e,i)})},hl=[].slice,mh=function(r,e){return r&&Wi(r)&&"length"in r&&(!e&&!r.length||r.length-1 in r&&Wi(r[0]))&&!r.nodeType&&r!==Xi},M_=function(r,e,t){return t===void 0&&(t=[]),r.forEach(function(i){var a;return Ut(i)&&!e||mh(i,1)?(a=t).push.apply(a,Ei(i)):t.push(i)})||t},Ei=function(r,e,t){return dt&&!e&&dt.selector?dt.selector(r):Ut(r)&&!t&&(el||!Ba())?hl.call((e||tl).querySelectorAll(r),0):Bt(r)?M_(r,t):mh(r)?hl.call(r,0):r?[r]:[]},dl=function(r){return r=Ei(r)[0]||En("Invalid scope")||{},function(e){var t=r.current||r.nativeElement||r;return Ei(e,t.querySelectorAll?t:t===r?En("Invalid scope")||tl.createElement("div"):r)}},gh=function(r){return r.sort(function(){return .5-Math.random()})},vh=function(r){if(xt(r))return r;var e=Wi(r)?r:{each:r},t=Yr(e.ease),i=e.from||0,a=parseFloat(e.base)||0,n={},s=i>0&&i<1,o=isNaN(i)||s,l=e.axis,c=i,u=i;return Ut(i)?c=u={center:.5,edges:.5,end:1}[i]||0:!s&&o&&(c=i[0],u=i[1]),function(h,d,f){var g=(f||e).length,_=n[g],m,p,x,v,b,w,T,M,E;if(!_){if(E=e.grid==="auto"?0:(e.grid||[1,wi])[1],!E){for(T=-wi;T<(T=f[E++].getBoundingClientRect().left)&&E<g;);E<g&&E--}for(_=n[g]=[],m=o?Math.min(E,g)*c-.5:i%E,p=E===wi?0:o?g*u/E-.5:i/E|0,T=0,M=wi,w=0;w<g;w++)x=w%E-m,v=p-(w/E|0),_[w]=b=l?Math.abs(l==="y"?v:x):Yu(x*x+v*v),b>T&&(T=b),b<M&&(M=b);i==="random"&&gh(_),_.max=T-M,_.min=M,_.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(E>g?g-1:l?l==="y"?g/E:E:Math.max(E,g/E))||0)*(i==="edges"?-1:1),_.b=g<0?a-g:a,_.u=Gt(e.amount||e.each)||0,t=t&&g<0?F_(t):t}return g=(_[h]-_.min)/_.max||0,gt(_.b+(t?t(g):g)*_.v)+_.u}},fl=function(r){var e=Math.pow(10,((r+"").split(".")[1]||"").length);return function(t){var i=gt(Math.round(parseFloat(t)/r)*r*e);return(i-i%1)/e+(rr(t)?0:Gt(t))}},_h=function(r,e){var t=Bt(r),i,a;return!t&&Wi(r)&&(i=t=r.radius||wi,r.values?(r=Ei(r.values),(a=!rr(r[0]))&&(i*=i)):r=fl(r.increment)),Mr(e,t?xt(r)?function(n){return a=r(n),Math.abs(a-n)<=i?a:n}:function(n){for(var s=parseFloat(a?n.x:n),o=parseFloat(a?n.y:0),l=wi,c=0,u=r.length,h,d;u--;)a?(h=r[u].x-s,d=r[u].y-o,h=h*h+d*d):h=Math.abs(r[u]-s),h<l&&(l=h,c=u);return c=!i||l<=i?r[c]:n,a||c===n||rr(n)?c:c+Gt(n)}:fl(r))},xh=function(r,e,t,i){return Mr(Bt(r)?!e:t===!0?!!(t=0):!i,function(){return Bt(r)?r[~~(Math.random()*r.length)]:(t=t||1e-5)&&(i=t<1?Math.pow(10,(t+"").length-2):1)&&Math.floor(Math.round((r-t/2+Math.random()*(e-r+t*.99))/t)*t*i)/i})},w_=function(){for(var r=arguments.length,e=new Array(r),t=0;t<r;t++)e[t]=arguments[t];return function(i){return e.reduce(function(a,n){return n(a)},i)}},T_=function(r,e){return function(t){return r(parseFloat(t))+(e||Gt(t))}},E_=function(r,e,t){return bh(r,e,0,1,t)},yh=function(r,e,t){return Mr(t,function(i){return r[~~e(i)]})},A_=function r(e,t,i){var a=t-e;return Bt(e)?yh(e,r(0,e.length),t):Mr(i,function(n){return(a+(n-e)%a)%a+e})},R_=function r(e,t,i){var a=t-e,n=a*2;return Bt(e)?yh(e,r(0,e.length-1),t):Mr(i,function(s){return s=(n+(s-e)%n)%n||0,e+(s>a?n-s:s)})},Pn=function(r){return r.replace(s_,function(e){var t=e.indexOf("[")+1,i=e.substring(t||7,t?e.indexOf("]"):e.length-1).split(l_);return xh(t?i:+i[0],t?0:+i[1],+i[2]||1e-5)})},bh=function(r,e,t,i,a){var n=e-r,s=i-t;return Mr(a,function(o){return t+((o-r)/n*s||0)})},C_=function r(e,t,i,a){var n=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!n){var s=Ut(e),o={},l,c,u,h,d;if(i===!0&&(a=1)&&(i=null),s)e={p:e},t={p:t};else if(Bt(e)&&!Bt(t)){for(u=[],h=e.length,d=h-2,c=1;c<h;c++)u.push(r(e[c-1],e[c]));h--,n=function(f){f*=h;var g=Math.min(d,~~f);return u[g](f-g)},i=t}else a||(e=Fa(Bt(e)?[]:{},e));if(!u){for(l in t)vl.call(o,e,l,"get",t[l]);n=function(f){return Sl(f,o)||(s?e.p:e)}}}return Mr(i,n)},Sh=function(r,e,t){var i=r.labels,a=wi,n,s,o;for(n in i)s=i[n]-e,s<0==!!t&&s&&a>(s=Math.abs(s))&&(o=n,a=s);return o},gi=function(r,e,t){var i=r.vars,a=i[e],n=dt,s=r._ctx,o,l,c;if(a)return o=i[e+"Params"],l=i.callbackScope||r,t&&br.length&&Fo(),s&&(dt=s),c=o?a.apply(l,o):a.call(l),dt=n,c},Un=function(r){return Sr(r),r.scrollTrigger&&r.scrollTrigger.kill(!!It),r.progress()<1&&gi(r,"onInterrupt"),r},ka,Mh=[],wh=function(r){if(r)if(r=!r.name&&r.default||r,Qs()||r.headless){var e=r.name,t=xt(r),i=e&&!t&&r.init?function(){this._props=[]}:r,a={init:An,render:Sl,add:vl,kill:q_,modifier:X_,rawVars:0},n={targetTest:0,get:0,getSetter:bl,aliases:{},register:0};if(Ba(),r!==i){if(pi[e])return;mi(i,mi(No(r,a),n)),Fa(i.prototype,Fa(a,No(r,n))),pi[i.prop=e]=i,r.targetTest&&(Oo.push(i),rl[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}th(e,i),r.register&&r.register(ii,i,ti)}else Mh.push(r)},ot=255,Ln={aqua:[0,ot,ot],lime:[0,ot,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ot],navy:[0,0,128],white:[ot,ot,ot],olive:[128,128,0],yellow:[ot,ot,0],orange:[ot,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ot,0,0],pink:[ot,192,203],cyan:[0,ot,ot],transparent:[ot,ot,ot,0]},pl=function(r,e,t){return r+=r<0?1:r>1?-1:0,(r*6<1?e+(t-e)*r*6:r<.5?t:r*3<2?e+(t-e)*(2/3-r)*6:e)*ot+.5|0},Th=function(r,e,t){var i=r?rr(r)?[r>>16,r>>8&ot,r&ot]:0:Ln.black,a,n,s,o,l,c,u,h,d,f;if(!i){if(r.substr(-1)===","&&(r=r.substr(0,r.length-1)),Ln[r])i=Ln[r];else if(r.charAt(0)==="#"){if(r.length<6&&(a=r.charAt(1),n=r.charAt(2),s=r.charAt(3),r="#"+a+a+n+n+s+s+(r.length===5?r.charAt(4)+r.charAt(4):"")),r.length===9)return i=parseInt(r.substr(1,6),16),[i>>16,i>>8&ot,i&ot,parseInt(r.substr(7),16)/255];r=parseInt(r.substr(1),16),i=[r>>16,r>>8&ot,r&ot]}else if(r.substr(0,3)==="hsl"){if(i=f=r.match(Ku),!e)o=+i[0]%360/360,l=+i[1]/100,c=+i[2]/100,n=c<=.5?c*(l+1):c+l-c*l,a=c*2-n,i.length>3&&(i[3]*=1),i[0]=pl(o+1/3,a,n),i[1]=pl(o,a,n),i[2]=pl(o-1/3,a,n);else if(~r.indexOf("="))return i=r.match($u),t&&i.length<4&&(i[3]=1),i}else i=r.match(Ku)||Ln.transparent;i=i.map(Number)}return e&&!f&&(a=i[0]/ot,n=i[1]/ot,s=i[2]/ot,u=Math.max(a,n,s),h=Math.min(a,n,s),c=(u+h)/2,u===h?o=l=0:(d=u-h,l=c>.5?d/(2-u-h):d/(u+h),o=u===a?(n-s)/d+(n<s?6:0):u===n?(s-a)/d+2:(a-n)/d+4,o*=60),i[0]=~~(o+.5),i[1]=~~(l*100+.5),i[2]=~~(c*100+.5)),t&&i.length<4&&(i[3]=1),i},Eh=function(r){var e=[],t=[],i=-1;return r.split(wr).forEach(function(a){var n=a.match(Ia)||[];e.push.apply(e,n),t.push(i+=n.length+1)}),e.c=t,e},Ah=function(r,e,t){var i="",a=(r+i).match(wr),n=e?"hsla(":"rgba(",s=0,o,l,c,u;if(!a)return r;if(a=a.map(function(h){return(h=Th(h,e,1))&&n+(e?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),t&&(c=Eh(r),o=t.c,o.join(i)!==c.c.join(i)))for(l=r.replace(wr,"1").split(Ia),u=l.length-1;s<u;s++)i+=l[s]+(~o.indexOf(s)?a.shift()||n+"0,0,0,0)":(c.length?c:a.length?a:t).shift());if(!l)for(l=r.split(wr),u=l.length-1;s<u;s++)i+=l[s]+a[s];return i+l[u]},wr=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ln)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),D_=/hsl[a]?\(/,Rh=function(r){var e=r.join(" "),t;if(wr.lastIndex=0,wr.test(e))return t=D_.test(e),r[1]=Ah(r[1],t),r[0]=Ah(r[0],t,Eh(r[1])),!0},In,vi=(function(){var r=Date.now,e=500,t=33,i=r(),a=i,n=1e3/240,s=n,o=[],l,c,u,h,d,f,g=function _(m){var p=r()-a,x=m===!0,v,b,w,T;if((p>e||p<0)&&(i+=p-t),a+=p,w=a-i,v=w-s,(v>0||x)&&(T=++h.frame,d=w-h.time*1e3,h.time=w=w/1e3,s+=v+(v>=n?4:n-v),b=1),x||(l=c(_)),b)for(f=0;f<o.length;f++)o[f](w,d,T,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(_){return d/(1e3/(_||60))},wake:function(){Ju&&(!el&&Qs()&&(Xi=el=window,tl=Xi.document||{},fi.gsap=ii,(Xi.gsapVersions||(Xi.gsapVersions=[])).push(ii.version),eh(Lo||Xi.GreenSockGlobals||!Xi.gsap&&Xi||{}),Mh.forEach(wh)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(_){return setTimeout(_,s-h.time*1e3+1|0)},In=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),In=0,c=An},lagSmoothing:function(_,m){e=_||1/0,t=Math.min(m||33,e)},fps:function(_){n=1e3/(_||240),s=h.time*1e3+n},add:function(_,m,p){var x=m?function(v,b,w,T){_(v,b,w,T),h.remove(x)}:_;return h.remove(_),o[p?"unshift":"push"](x),Ba(),x},remove:function(_,m){~(m=o.indexOf(_))&&o.splice(m,1)&&f>=m&&f--},_listeners:o},h})(),Ba=function(){return!In&&vi.wake()},et={},P_=/^[\d.\-M][\d.\-,\s]/,U_=/["']/g,L_=function(r){for(var e={},t=r.substr(1,r.length-3).split(":"),i=t[0],a=1,n=t.length,s,o,l;a<n;a++)o=t[a],s=a!==n-1?o.lastIndexOf(","):o.length,l=o.substr(0,s),e[i]=isNaN(l)?l.replace(U_,"").trim():+l,i=o.substr(s+1).trim();return e},I_=function(r){var e=r.indexOf("(")+1,t=r.indexOf(")"),i=r.indexOf("(",e);return r.substring(e,~i&&i<t?r.indexOf(")",t+1):t)},O_=function(r){var e=(r+"").split("("),t=et[e[0]];return t&&e.length>1&&t.config?t.config.apply(null,~r.indexOf("{")?[L_(e[1])]:I_(r).split(",").map(oh)):et._CE&&P_.test(r)?et._CE("",r):t},F_=function(r){return function(e){return 1-r(1-e)}},Yr=function(r,e){return r&&(xt(r)?r:et[r]||O_(r))||e},Zr=function(r,e,t,i){t===void 0&&(t=function(s){return 1-e(1-s)}),i===void 0&&(i=function(s){return s<.5?e(s*2)/2:1-e((1-s)*2)/2});var a={easeIn:e,easeOut:t,easeInOut:i},n;return Jt(r,function(s){et[s]=fi[s]=a,et[n=s.toLowerCase()]=t;for(var o in a)et[n+(o==="easeIn"?".in":o==="easeOut"?".out":".inOut")]=et[s+"."+o]=a[o]}),a},Ch=function(r){return function(e){return e<.5?(1-r(1-e*2))/2:.5+r((e-.5)*2)/2}},ml=function r(e,t,i){var a=t>=1?t:1,n=(i||(e?.3:.45))/(t<1?t:1),s=n/Ks*(Math.asin(1/a)||0),o=function(c){return c===1?1:a*Math.pow(2,-10*c)*o_((c-s)*n)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:Ch(o);return n=Ks/n,l.config=function(c,u){return r(e,c,u)},l},gl=function r(e,t){t===void 0&&(t=1.70158);var i=function(n){return n?--n*n*((t+1)*n+t)+1:0},a=e==="out"?i:e==="in"?function(n){return 1-i(1-n)}:Ch(i);return a.config=function(n){return r(e,n)},a};Jt("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Zr(r+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})}),et.Linear.easeNone=et.none=et.Linear.easeIn,Zr("Elastic",ml("in"),ml("out"),ml()),(function(r,e){var t=1/e,i=2*t,a=2.5*t,n=function(s){return s<t?r*s*s:s<i?r*Math.pow(s-1.5/e,2)+.75:s<a?r*(s-=2.25/e)*s+.9375:r*Math.pow(s-2.625/e,2)+.984375};Zr("Bounce",function(s){return 1-n(1-s)},n)})(7.5625,2.75),Zr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)}),Zr("Circ",function(r){return-(Yu(1-r*r)-1)}),Zr("Sine",function(r){return r===1?1:-n_(r*r_)+1}),Zr("Back",gl("in"),gl("out"),gl()),et.SteppedEase=et.steps=fi.SteppedEase={config:function(r,e){r===void 0&&(r=1);var t=1/r,i=r+(e?0:1),a=e?1:0,n=1-nt;return function(s){return((i*Dn(0,n,s)|0)+a)*t}}},Tn.ease=et["quad.out"],Jt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return ol+=r+","+r+"Params,"});var Dh=function(r,e){this.id=a_++,r._gsap=this,this.target=r,this.harness=e,this.get=e?e.get:ah,this.set=e?e.getSetter:bl},On=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,za(this,+t.duration,1,1),this.data=t.data,dt&&(this._ctx=dt,dt.data.push(this)),In||vi.wake()}var e=r.prototype;return e.delay=function(t){return t||t===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},e.duration=function(t){return arguments.length?this.totalDuration(this._repeat>0?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},e.totalDuration=function(t){return arguments.length?(this._dirty=0,za(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(t,i){if(Ba(),!arguments.length)return this._tTime;var a=this._dp;if(a&&a.smoothChildTiming&&this._ts){for(Go(this,t),!a._dp||a.parent||hh(a,this);a&&a.parent;)a.parent._time!==a._start+(a._ts>=0?a._tTime/a._ts:(a.totalDuration()-a._tTime)/-a._ts)&&a.totalTime(a._tTime,!0),a=a.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&t<this._tDur||this._ts<0&&t>0||!this._tDur&&!t)&&qi(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===nt||!this._initted&&this._dur&&t||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),nh(this,t,i)),this},e.time=function(t,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+uh(this))%(this._dur+this._rDelay)||(t?this._dur:0),i):this._time},e.totalProgress=function(t,i){return arguments.length?this.totalTime(this.totalDuration()*t,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(t,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-t:t)+uh(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(t,i){var a=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*a,i):this._repeat?Na(this._tTime,a)+1:1},e.timeScale=function(t,i){if(!arguments.length)return this._rts===-nt?0:this._rts;if(this._rts===t)return this;var a=this.parent&&this._ts?ko(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-nt?0:this._rts,this.totalTime(Dn(-Math.abs(this._delay),this.totalDuration(),a),i!==!1),Bo(this),g_(this)},e.paused=function(t){return arguments.length?(this._ps!==t&&(this._ps=t,t?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ba(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==nt&&(this._tTime-=nt)))),this):this._ps},e.startTime=function(t){if(arguments.length){this._start=gt(t);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&qi(i,this,this._start-this._delay),this}return this._start},e.endTime=function(t){return this._start+(Qt(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(t){var i=this.parent||this._dp;return i?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ko(i.rawTime(t),this):this._tTime:this._tTime},e.revert=function(t){t===void 0&&(t=d_);var i=It;return It=t,ll(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),this.data!=="nested"&&t.kill!==!1&&this.kill(),It=i,this},e.globalTime=function(t){for(var i=this,a=arguments.length?t:i.rawTime();i;)a=i._start+a/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(t):a},e.repeat=function(t){return arguments.length?(this._repeat=t===1/0?-2:t,ph(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(t){if(arguments.length){var i=this._time;return this._rDelay=t,ph(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(t){return arguments.length?(this._yoyo=t,this):this._yoyo},e.seek=function(t,i){return this.totalTime(Ti(this,t),Qt(i))},e.restart=function(t,i){return this.play().totalTime(t?-this._delay:0,Qt(i)),this._dur||(this._zTime=-nt),this},e.play=function(t,i){return t!=null&&this.seek(t,i),this.reversed(!1).paused(!1)},e.reverse=function(t,i){return t!=null&&this.seek(t||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(t,i){return t!=null&&this.seek(t,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-nt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-nt,this},e.isActive=function(){var t=this.parent||this._dp,i=this._start,a;return!!(!t||this._ts&&this._initted&&t.isActive()&&(a=t.rawTime(!0))>=i&&a<this.endTime(!0)-nt)},e.eventCallback=function(t,i,a){var n=this.vars;return arguments.length>1?(i?(n[t]=i,a&&(n[t+"Params"]=a),t==="onUpdate"&&(this._onUpdate=i)):delete n[t],this):n[t]},e.then=function(t){var i=this,a=i._prom;return new Promise(function(n){var s=xt(t)?t:sh,o=function(){var l=i.then;i.then=null,a&&a(),xt(s)&&(s=s(i))&&(s.then||s===i)&&(i.then=l),n(s),i.then=l};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?o():i._prom=o})},e.kill=function(){Un(this)},r})();mi(On.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-nt,_prom:0,_ps:!1,_rts:1});var ei=(function(r){ju(e,r);function e(i,a){var n;return i===void 0&&(i={}),n=r.call(this,i)||this,n.labels={},n.smoothChildTiming=!!i.smoothChildTiming,n.autoRemoveChildren=!!i.autoRemoveChildren,n._sort=Qt(i.sortChildren),mt&&qi(i.parent||mt,ir(n),a),i.reversed&&n.reverse(),i.paused&&n.paused(!0),i.scrollTrigger&&dh(ir(n),i.scrollTrigger),n}var t=e.prototype;return t.to=function(i,a,n){return Cn(0,arguments,this),this},t.from=function(i,a,n){return Cn(1,arguments,this),this},t.fromTo=function(i,a,n,s){return Cn(2,arguments,this),this},t.set=function(i,a,n){return a.duration=0,a.parent=this,Rn(a).repeatDelay||(a.repeat=0),a.immediateRender=!!a.immediateRender,new Tt(i,a,Ti(this,n),1),this},t.call=function(i,a,n){return qi(this,Tt.delayedCall(0,i,a),n)},t.staggerTo=function(i,a,n,s,o,l,c){return n.duration=a,n.stagger=n.stagger||s,n.onComplete=l,n.onCompleteParams=c,n.parent=this,new Tt(i,n,Ti(this,o)),this},t.staggerFrom=function(i,a,n,s,o,l,c){return n.runBackwards=1,Rn(n).immediateRender=Qt(n.immediateRender),this.staggerTo(i,a,n,s,o,l,c)},t.staggerFromTo=function(i,a,n,s,o,l,c,u){return s.startAt=n,Rn(s).immediateRender=Qt(s.immediateRender),this.staggerTo(i,a,s,o,l,c,u)},t.render=function(i,a,n){var s=this._time,o=this._dirty?this.totalDuration():this._tDur,l=this._dur,c=i<=0?0:gt(i),u=this._zTime<0!=i<0&&(this._initted||!l),h,d,f,g,_,m,p,x,v,b,w,T;if(this!==mt&&c>o&&i>=0&&(c=o),c!==this._tTime||n||u){if(s!==this._time&&l&&(c+=this._time-s,i+=this._time-s),h=c,v=this._start,x=this._ts,m=!x,u&&(l||(s=this._zTime),(i||!a)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,_=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(_*100+i,a,n);if(h=gt(c%_),c===o?(g=this._repeat,h=l):(b=gt(c/_),g=~~b,g&&g===b&&(h=l,g--),h>l&&(h=l)),b=Na(this._tTime,_),!s&&this._tTime&&b!==g&&this._tTime-b*_-this._dur<=0&&(b=g),w&&g&1&&(h=l-h,T=1),g!==b&&!this._lock){var M=w&&b&1,E=M===(w&&g&1);if(g<b&&(M=!M),s=M?0:c%l?l:c,this._lock=1,this.render(s||(T?0:gt(g*_)),a,!l)._lock=0,this._tTime=c,!a&&this.parent&&gi(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,b=g),s&&s!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,o=this._tDur,E&&(this._lock=2,s=M?l:-1e-4,this.render(s,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(p=y_(this,gt(s),gt(h)),p&&(c-=h-(h=p._start))),this._tTime=c,this._time=h,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,s=0),!s&&c&&l&&!a&&!b&&(gi(this,"onStart"),this._tTime!==c))return this;if(h>=s&&i>=0)for(d=this._first;d;){if(f=d._next,(d._act||h>=d._start)&&d._ts&&p!==d){if(d.parent!==this)return this.render(i,a,n);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,a,n),h!==this._time||!this._ts&&!m){p=0,f&&(c+=this._zTime=-nt);break}}d=f}else{d=this._last;for(var O=i<0?i:h;d;){if(f=d._prev,(d._act||O<=d._end)&&d._ts&&p!==d){if(d.parent!==this)return this.render(i,a,n);if(d.render(d._ts>0?(O-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(O-d._start)*d._ts,a,n||It&&ll(d)),h!==this._time||!this._ts&&!m){p=0,f&&(c+=this._zTime=O?-nt:nt);break}}d=f}}if(p&&!a&&(this.pause(),p.render(h>=s?0:-nt)._zTime=h>=s?1:-1,this._ts))return this._start=v,Bo(this),this.render(i,a,n);this._onUpdate&&!a&&gi(this,"onUpdate",!0),(c===o&&this._tTime>=this.totalDuration()||!c&&s)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(c===o&&this._ts>0||!c&&this._ts<0)&&Sr(this,1),!a&&!(i<0&&!s)&&(c||s||!o)&&(gi(this,c===o&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<o&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,a){var n=this;if(rr(a)||(a=Ti(this,a,i)),!(i instanceof On)){if(Bt(i))return i.forEach(function(s){return n.add(s,a)}),this;if(Ut(i))return this.addLabel(i,a);if(xt(i))i=Tt.delayedCall(0,i);else return this}return this!==i?qi(this,i,a):this},t.getChildren=function(i,a,n,s){i===void 0&&(i=!0),a===void 0&&(a=!0),n===void 0&&(n=!0),s===void 0&&(s=-wi);for(var o=[],l=this._first;l;)l._start>=s&&(l instanceof Tt?a&&o.push(l):(n&&o.push(l),i&&o.push.apply(o,l.getChildren(!0,a,n)))),l=l._next;return o},t.getById=function(i){for(var a=this.getChildren(1,1,1),n=a.length;n--;)if(a[n].vars.id===i)return a[n]},t.remove=function(i){return Ut(i)?this.removeLabel(i):xt(i)?this.killTweensOf(i):(i.parent===this&&zo(this,i),i===this._recent&&(this._recent=this._last),jr(this))},t.totalTime=function(i,a){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=gt(vi.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,a),this._forcing=0,this):this._tTime},t.addLabel=function(i,a){return this.labels[i]=Ti(this,a),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,a,n){var s=Tt.delayedCall(0,a||An,n);return s.data="isPause",this._hasPause=1,qi(this,s,Ti(this,i))},t.removePause=function(i){var a=this._first;for(i=Ti(this,i);a;)a._start===i&&a.data==="isPause"&&Sr(a),a=a._next},t.killTweensOf=function(i,a,n){for(var s=this.getTweensOf(i,n),o=s.length;o--;)Tr!==s[o]&&s[o].kill(i,a);return this},t.getTweensOf=function(i,a){for(var n=[],s=Ei(i),o=this._first,l=rr(a),c;o;)o instanceof Tt?f_(o._targets,s)&&(l?(!Tr||o._initted&&o._ts)&&o.globalTime(0)<=a&&o.globalTime(o.totalDuration())>a:!a||o.isActive())&&n.push(o):(c=o.getTweensOf(s,a)).length&&n.push.apply(n,c),o=o._next;return n},t.tweenTo=function(i,a){a=a||{};var n=this,s=Ti(n,i),o=a,l=o.startAt,c=o.onStart,u=o.onStartParams,h=o.immediateRender,d,f=Tt.to(n,mi({ease:a.ease||"none",lazy:!1,immediateRender:!1,time:s,overwrite:"auto",duration:a.duration||Math.abs((s-(l&&"time"in l?l.time:n._time))/n.timeScale())||nt,onStart:function(){if(n.pause(),!d){var g=a.duration||Math.abs((s-(l&&"time"in l?l.time:n._time))/n.timeScale());f._dur!==g&&za(f,g,0,1).render(f._time,!0,!0),d=1}c&&c.apply(f,u||[])}},a));return h?f.render(0):f},t.tweenFromTo=function(i,a,n){return this.tweenTo(a,mi({startAt:{time:Ti(this,i)}},n))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Sh(this,Ti(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Sh(this,Ti(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+nt)},t.shiftChildren=function(i,a,n){n===void 0&&(n=0);var s=this._first,o=this.labels,l;for(i=gt(i);s;)s._start>=n&&(s._start+=i,s._end+=i),s=s._next;if(a)for(l in o)o[l]>=n&&(o[l]+=i);return jr(this)},t.invalidate=function(i){var a=this._first;for(this._lock=0;a;)a.invalidate(i),a=a._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var a=this._first,n;a;)n=a._next,this.remove(a),a=n;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),jr(this)},t.totalDuration=function(i){var a=0,n=this,s=n._last,o=wi,l,c,u;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-i:i));if(n._dirty){for(u=n.parent;s;)l=s._prev,s._dirty&&s.totalDuration(),c=s._start,c>o&&n._sort&&s._ts&&!n._lock?(n._lock=1,qi(n,s,c-s._delay,1)._lock=0):o=c,c<0&&s._ts&&(a-=c,(!u&&!n._dp||u&&u.smoothChildTiming)&&(n._start+=gt(c/n._ts),n._time-=c,n._tTime-=c),n.shiftChildren(-c,!1,-1/0),o=0),s._end>a&&s._ts&&(a=s._end),s=l;za(n,n===mt&&n._time>a?n._time:a,1,1),n._dirty=0}return n._tDur},e.updateRoot=function(i){if(mt._ts&&(nh(mt,ko(i,mt)),ih=vi.frame),vi.frame>=rh){rh+=di.autoSleep||120;var a=mt._first;if((!a||!a._ts)&&di.autoSleep&&vi._listeners.length<2){for(;a&&!a._ts;)a=a._next;a||vi.sleep()}}},e})(On);mi(ei.prototype,{_lock:0,_hasPause:0,_forcing:0});var N_=function(r,e,t,i,a,n,s){var o=new ti(this._pt,r,e,0,1,Fh,null,a),l=0,c=0,u,h,d,f,g,_,m,p;for(o.b=t,o.e=i,t+="",i+="",(m=~i.indexOf("random("))&&(i=Pn(i)),n&&(p=[t,i],n(p,r,e),t=p[0],i=p[1]),h=t.match(Js)||[];u=Js.exec(i);)f=u[0],g=i.substring(l,u.index),d?d=(d+1)%5:g.substr(-5)==="rgba("&&(d=1),f!==h[c++]&&(_=parseFloat(h[c-1])||0,o._pt={_next:o._pt,p:g||c===1?g:",",s:_,c:f.charAt(1)==="="?Oa(_,f)-_:parseFloat(f)-_,m:d&&d<4?Math.round:0},l=Js.lastIndex);return o.c=l<i.length?i.substring(l,i.length):"",o.fp=s,(Qu.test(i)||m)&&(o.e=0),this._pt=o,o},vl=function(r,e,t,i,a,n,s,o,l,c){xt(i)&&(i=i(a||0,r,n));var u=r[e],h=t!=="get"?t:xt(u)?l?r[e.indexOf("set")||!xt(r["get"+e.substr(3)])?e:"get"+e.substr(3)](l):r[e]():u,d=xt(u)?l?H_:Ih:yl,f;if(Ut(i)&&(~i.indexOf("random(")&&(i=Pn(i)),i.charAt(1)==="="&&(f=Oa(h,i)+(Gt(h)||0),(f||f===0)&&(i=f))),!c||h!==i||_l)return!isNaN(h*i)&&i!==""?(f=new ti(this._pt,r,e,+h||0,i-(h||0),typeof u=="boolean"?W_:Oh,0,d),l&&(f.fp=l),s&&f.modifier(s,this,r),this._pt=f):(!u&&!(e in r)&&il(e,i),N_.call(this,r,e,h,i,d,o||di.stringFilter,l))},z_=function(r,e,t,i,a){if(xt(r)&&(r=Fn(r,a,e,t,i)),!Wi(r)||r.style&&r.nodeType||Bt(r)||Zu(r))return Ut(r)?Fn(r,a,e,t,i):r;var n={},s;for(s in r)n[s]=Fn(r[s],a,e,t,i);return n},Ph=function(r,e,t,i,a,n){var s,o,l,c;if(pi[r]&&(s=new pi[r]).init(a,s.rawVars?e[r]:z_(e[r],i,a,n,t),t,i,n)!==!1&&(t._pt=o=new ti(t._pt,a,r,0,1,s.render,s,0,s.priority),t!==ka))for(l=t._ptLookup[t._targets.indexOf(a)],c=s._props.length;c--;)l[s._props[c]]=o;return s},Tr,_l,xl=function r(e,t,i){var a=e.vars,n=a.ease,s=a.startAt,o=a.immediateRender,l=a.lazy,c=a.onUpdate,u=a.runBackwards,h=a.yoyoEase,d=a.keyframes,f=a.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,x=p&&p.data==="nested"?p.vars.targets:m,v=e._overwrite==="auto"&&!Zs,b=e.timeline,w=a.easeReverse||h,T,M,E,O,S,C,U,N,D,k,F,X,Y;if(b&&(!d||!n)&&(n="none"),e._ease=Yr(n,Tn.ease),e._rEase=w&&(Yr(w)||e._ease),e._from=!b&&!!a.runBackwards,e._from&&(e.ratio=1),!b||d&&!a.stagger){if(N=m[0]?qr(m[0]).harness:0,X=N&&a[N.prop],T=No(a,rl),_&&(_._zTime<0&&_.progress(1),t<0&&u&&o&&!f?_.render(-1,!0):_.revert(u&&g?Io:h_),_._lazy=0),s){if(Sr(e._startAt=Tt.set(m,mi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Qt(l),startAt:null,delay:0,onUpdate:c&&function(){return gi(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(It||!o&&!f)&&e._startAt.revert(Io),o&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(o=!1),E=mi({overwrite:!1,data:"isFromStart",lazy:o&&!_&&Qt(l),immediateRender:o,stagger:0,parent:p},T),X&&(E[N.prop]=X),Sr(e._startAt=Tt.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(It?e._startAt.revert(Io):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,nt,nt);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Qt(l)||l&&!g,M=0;M<m.length;M++){if(S=m[M],U=S._gsap||sl(m)[M]._gsap,e._ptLookup[M]=k={},al[U.id]&&br.length&&Fo(),F=x===m?M:x.indexOf(S),N&&(D=new N).init(S,X||T,e,F,x)!==!1&&(e._pt=O=new ti(e._pt,S,D.name,0,1,D.render,D,0,D.priority),D._props.forEach(function(z){k[z]=O}),D.priority&&(C=1)),!N||X)for(E in T)pi[E]&&(D=Ph(E,T,e,F,S,x))?D.priority&&(C=1):k[E]=O=vl.call(e,S,E,"get",T[E],F,x,0,a.stringFilter);e._op&&e._op[M]&&e.kill(S,e._op[M]),v&&e._pt&&(Tr=e,mt.killTweensOf(S,k,e.globalTime(t)),Y=!e.parent,Tr=0),e._pt&&l&&(al[U.id]=1)}C&&Nh(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!Y,d&&t<=0&&b.render(wi,!0,!0)},k_=function(r,e,t,i,a,n,s,o){var l=(r._pt&&r._ptCache||(r._ptCache={}))[e],c,u,h,d;if(!l)for(l=r._ptCache[e]=[],h=r._ptLookup,d=r._targets.length;d--;){if(c=h[d][e],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==e&&c.fp!==e;)c=c._next;if(!c)return _l=1,r.vars[e]="+=0",xl(r,s),_l=0,o?En(e+" not eligible for reset. Try splitting into individual properties"):1;l.push(c)}for(d=l.length;d--;)u=l[d],c=u._pt||u,c.s=(i||i===0)&&!a?i:c.s+(i||0)+n*c.c,c.c=t-c.s,u.e&&(u.e=St(t)+Gt(u.e)),u.b&&(u.b=c.s+Gt(u.b))},B_=function(r,e){var t=r[0]?qr(r[0]).harness:0,i=t&&t.aliases,a,n,s,o;if(!i)return e;a=Fa({},e);for(n in i)if(n in a)for(o=i[n].split(","),s=o.length;s--;)a[o[s]]=a[n];return a},G_=function(r,e,t,i){var a=e.ease||i||"power1.inOut",n,s;if(Bt(e))s=t[r]||(t[r]=[]),e.forEach(function(o,l){return s.push({t:l/(e.length-1)*100,v:o,e:a})});else for(n in e)s=t[n]||(t[n]=[]),n==="ease"||s.push({t:parseFloat(r),v:e[n],e:a})},Fn=function(r,e,t,i,a){return xt(r)?r.call(e,t,i,a):Ut(r)&&~r.indexOf("random(")?Pn(r):r},Uh=ol+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Lh={};Jt(Uh+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Lh[r]=1});var Tt=(function(r){ju(e,r);function e(i,a,n,s){var o;typeof a=="number"&&(n.duration=a,a=n,n=null),o=r.call(this,s?a:Rn(a))||this;var l=o.vars,c=l.duration,u=l.delay,h=l.immediateRender,d=l.stagger,f=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=a.parent||mt,x=(Bt(i)||Zu(i)?rr(i[0]):"length"in a)?[i]:Ei(i),v,b,w,T,M,E,O,S;if(o._targets=x.length?sl(x):En("GSAP target "+i+" not found. https://gsap.com",!di.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,g||d||Uo(c)||Uo(u)){a=o.vars;var C=a.easeReverse||a.yoyoEase;if(v=o.timeline=new ei({data:"nested",defaults:_||{},targets:p&&p.data==="nested"?p.vars.targets:x}),v.kill(),v.parent=v._dp=ir(o),v._start=0,d||Uo(c)||Uo(u)){if(T=x.length,O=d&&vh(d),Wi(d))for(M in d)~Uh.indexOf(M)&&(S||(S={}),S[M]=d[M]);for(b=0;b<T;b++)w=No(a,Lh),w.stagger=0,C&&(w.easeReverse=C),S&&Fa(w,S),E=x[b],w.duration=+Fn(c,ir(o),b,E,x),w.delay=(+Fn(u,ir(o),b,E,x)||0)-o._delay,!d&&T===1&&w.delay&&(o._delay=u=w.delay,o._start+=u,w.delay=0),v.to(E,w,O?O(b,E,x):0),v._ease=et.none;v.duration()?c=u=0:o.timeline=0}else if(g){Rn(mi(v.vars.defaults,{ease:"none"})),v._ease=Yr(g.ease||a.ease||"none");var U=0,N,D,k;if(Bt(g))g.forEach(function(F){return v.to(x,F,">")}),v.duration();else{w={};for(M in g)M==="ease"||M==="easeEach"||G_(M,g[M],w,g.easeEach);for(M in w)for(N=w[M].sort(function(F,X){return F.t-X.t}),U=0,b=0;b<N.length;b++)D=N[b],k={ease:D.e,duration:(D.t-(b?N[b-1].t:0))/100*c},k[M]=D.v,v.to(x,k,U),U+=k.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||o.duration(c=v.duration())}else o.timeline=0;return f===!0&&!Zs&&(Tr=ir(o),mt.killTweensOf(x),Tr=0),qi(p,ir(o),n),a.reversed&&o.reverse(),a.paused&&o.paused(!0),(h||!c&&!g&&o._start===gt(p._time)&&Qt(h)&&v_(ir(o))&&p.data!=="nested")&&(o._tTime=-nt,o.render(Math.max(0,-u)||0)),m&&dh(ir(o),m),o}var t=e.prototype;return t.render=function(i,a,n){var s=this._time,o=this._tDur,l=this._dur,c=i<0,u=i>o-nt&&!c?o:i<nt?0:i,h,d,f,g,_,m,p,x;if(!l)x_(this,i,a,n);else if(u!==this._tTime||!i||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(h=u,x=this.timeline,this._repeat){if(g=l+this._rDelay,this._repeat<-1&&c)return this.totalTime(g*100+i,a,n);if(h=gt(u%g),u===o?(f=this._repeat,h=l):(_=gt(u/g),f=~~_,f&&f===_?(h=l,f--):h>l&&(h=l)),m=this._yoyo&&f&1,m&&(h=l-h),_=Na(this._tTime,g),h===s&&!n&&this._initted&&f===_)return this._tTime=u,this;f!==_&&this.vars.repeatRefresh&&!m&&!this._lock&&h!==g&&this._initted&&(this._lock=n=1,this.render(gt(g*f),!0).invalidate()._lock=0)}if(!this._initted){if(fh(this,c?i:h,n,a,u))return this._tTime=0,this;if(s!==this._time&&!(n&&this.vars.repeatRefresh&&f!==_))return this;if(l!==this._dur)return this.render(i,a,n)}if(this._rEase){var v=h<s;if(v!==this._inv){var b=v?s:l-s;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=s,this._invRecip=b?(v?-1:1)/b:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=p=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=p=this._ease(h/l);if(this._from&&(this.ratio=p=1-p),this._tTime=u,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!s&&u&&!a&&!_&&(gi(this,"onStart"),this._tTime!==u))return this;for(d=this._pt;d;)d.r(p,d.d),d=d._next;x&&x.render(i<0?i:x._dur*x._ease(h/this._dur),a,n)||this._startAt&&(this._zTime=i),this._onUpdate&&!a&&(c&&cl(this,i,a,n),gi(this,"onUpdate")),this._repeat&&f!==_&&this.vars.onRepeat&&!a&&this.parent&&gi(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(c&&!this._onUpdate&&cl(this,i,!0,!0),(i||!l)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Sr(this,1),!a&&!(c&&!s)&&(u||s||m)&&(gi(this,u===o?"onComplete":"onReverseComplete",!0),this._prom&&!(u<o&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,a,n,s,o){In||vi.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||xl(this,l),c=this._ease(l/this._dur),k_(this,i,a,n,s,c,l,o)?this.resetTo(i,a,n,s,1):(Go(this,0),this.parent||ch(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,a){if(a===void 0&&(a="all"),!i&&(!a||a==="all"))return this._lazy=this._pt=0,this.parent?Un(this):this.scrollTrigger&&this.scrollTrigger.kill(!!It),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(i,a,Tr&&Tr.vars.overwrite!==!0)._first||Un(this),this.parent&&n!==this.timeline.totalDuration()&&za(this,this._dur*this.timeline._tDur/n,0,1),this}var s=this._targets,o=i?Ei(i):s,l=this._ptLookup,c=this._pt,u,h,d,f,g,_,m;if((!a||a==="all")&&m_(s,o))return a==="all"&&(this._pt=0),Un(this);for(u=this._op=this._op||[],a!=="all"&&(Ut(a)&&(g={},Jt(a,function(p){return g[p]=1}),a=g),a=B_(s,a)),m=s.length;m--;)if(~o.indexOf(s[m])){h=l[m],a==="all"?(u[m]=a,f=h,d={}):(d=u[m]=u[m]||{},f=a);for(g in f)_=h&&h[g],_&&((!("kill"in _.d)||_.d.kill(g)===!0)&&zo(this,_,"_pt"),delete h[g]),d!=="all"&&(d[g]=1)}return this._initted&&!this._pt&&c&&Un(this),this},e.to=function(i,a){return new e(i,a,arguments[2])},e.from=function(i,a){return Cn(1,arguments)},e.delayedCall=function(i,a,n,s){return new e(a,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:a,onReverseComplete:a,onCompleteParams:n,onReverseCompleteParams:n,callbackScope:s})},e.fromTo=function(i,a,n){return Cn(2,arguments)},e.set=function(i,a){return a.duration=0,a.repeatDelay||(a.repeat=0),new e(i,a)},e.killTweensOf=function(i,a,n){return mt.killTweensOf(i,a,n)},e})(On);mi(Tt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),Jt("staggerTo,staggerFrom,staggerFromTo",function(r){Tt[r]=function(){var e=new ei,t=hl.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var yl=function(r,e,t){return r[e]=t},Ih=function(r,e,t){return r[e](t)},H_=function(r,e,t,i){return r[e](i.fp,t)},V_=function(r,e,t){return r.setAttribute(e,t)},bl=function(r,e){return xt(r[e])?Ih:$s(r[e])&&r.setAttribute?V_:yl},Oh=function(r,e){return e.set(e.t,e.p,Math.round((e.s+e.c*r)*1e6)/1e6,e)},W_=function(r,e){return e.set(e.t,e.p,!!(e.s+e.c*r),e)},Fh=function(r,e){var t=e._pt,i="";if(!r&&e.b)i=e.b;else if(r===1&&e.e)i=e.e;else{for(;t;)i=t.p+(t.m?t.m(t.s+t.c*r):Math.round((t.s+t.c*r)*1e4)/1e4)+i,t=t._next;i+=e.c}e.set(e.t,e.p,i,e)},Sl=function(r,e){for(var t=e._pt;t;)t.r(r,t.d),t=t._next},X_=function(r,e,t,i){for(var a=this._pt,n;a;)n=a._next,a.p===i&&a.modifier(r,e,t),a=n},q_=function(r){for(var e=this._pt,t,i;e;)i=e._next,e.p===r&&!e.op||e.op===r?zo(this,e,"_pt"):e.dep||(t=1),e=i;return!t},j_=function(r,e,t,i){i.mSet(r,e,i.m.call(i.tween,t,i.mt),i)},Nh=function(r){for(var e=r._pt,t,i,a,n;e;){for(t=e._next,i=a;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:n)?e._prev._next=e:a=e,(e._next=i)?i._prev=e:n=e,e=t}r._pt=a},ti=(function(){function r(t,i,a,n,s,o,l,c,u){this.t=i,this.s=n,this.c=s,this.p=a,this.r=o||Oh,this.d=l||this,this.set=c||yl,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(t,i,a){this.mSet=this.mSet||this.set,this.set=j_,this.m=t,this.mt=a,this.tween=i},r})();Jt(ol+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return rl[r]=1}),fi.TweenMax=fi.TweenLite=Tt,fi.TimelineLite=fi.TimelineMax=ei,mt=new ei({sortChildren:!1,defaults:Tn,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),di.stringFilter=Rh;var Kr=[],Ho={},Y_=[],zh=0,Z_=0,Ml=function(r){return(Ho[r]||Y_).map(function(e){return e()})},wl=function(){var r=Date.now(),e=[];r-zh>2&&(Ml("matchMediaInit"),Kr.forEach(function(t){var i=t.queries,a=t.conditions,n,s,o,l;for(s in i)n=Xi.matchMedia(i[s]).matches,n&&(o=1),n!==a[s]&&(a[s]=n,l=1);l&&(t.revert(),o&&e.push(t))}),Ml("matchMediaRevert"),e.forEach(function(t){return t.onMatch(t,function(i){return t.add(null,i)})}),zh=r,Ml("matchMedia"))},kh=(function(){function r(t,i){this.selector=i&&dl(i),this.data=[],this._r=[],this.isReverted=!1,this.id=Z_++,t&&this.add(t)}var e=r.prototype;return e.add=function(t,i,a){xt(t)&&(a=i,i=t,t=xt);var n=this,s=function(){var o=dt,l=n.selector,c;return o&&o!==n&&o.data.push(n),a&&(n.selector=dl(a)),dt=n,c=i.apply(n,arguments),xt(c)&&n._r.push(c),dt=o,n.selector=l,n.isReverted=!1,c};return n.last=s,t===xt?s(n,function(o){return n.add(null,o)}):t?n[t]=s:s},e.ignore=function(t){var i=dt;dt=null,t(this),dt=i},e.getTweens=function(){var t=[];return this.data.forEach(function(i){return i instanceof r?t.push.apply(t,i.getTweens()):i instanceof Tt&&!(i.parent&&i.parent.data==="nested")&&t.push(i)}),t},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(t,i){var a=this;if(t?(function(){for(var s=a.getTweens(),o=a.data.length,l;o--;)l=a.data[o],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(c){return s.splice(s.indexOf(c),1)}));for(s.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,u){return u.g-c.g||-1/0}).forEach(function(c){return c.t.revert(t)}),o=a.data.length;o--;)l=a.data[o],l instanceof ei?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Tt)&&l.revert&&l.revert(t);a._r.forEach(function(c){return c(t,a)}),a.isReverted=!0})():this.data.forEach(function(s){return s.kill&&s.kill()}),this.clear(),i)for(var n=Kr.length;n--;)Kr[n].id===this.id&&Kr.splice(n,1)},e.revert=function(t){this.kill(t||{})},r})(),K_=(function(){function r(t){this.contexts=[],this.scope=t,dt&&dt.data.push(this)}var e=r.prototype;return e.add=function(t,i,a){Wi(t)||(t={matches:t});var n=new kh(0,a||this.scope),s=n.conditions={},o,l,c;dt&&!n.selector&&(n.selector=dt.selector),this.contexts.push(n),i=n.add("onMatch",i),n.queries=t;for(l in t)l==="all"?c=1:(o=Xi.matchMedia(t[l]),o&&(Kr.indexOf(n)<0&&Kr.push(n),(s[l]=o.matches)&&(c=1),o.addListener?o.addListener(wl):o.addEventListener("change",wl)));return c&&i(n,function(u){return n.add(null,u)}),this},e.revert=function(t){this.kill(t||{})},e.kill=function(t){this.contexts.forEach(function(i){return i.kill(t,!0)})},r})(),Vo={registerPlugin:function(){for(var r=arguments.length,e=new Array(r),t=0;t<r;t++)e[t]=arguments[t];e.forEach(function(i){return wh(i)})},timeline:function(r){return new ei(r)},getTweensOf:function(r,e){return mt.getTweensOf(r,e)},getProperty:function(r,e,t,i){Ut(r)&&(r=Ei(r)[0]);var a=qr(r||{}).get,n=t?sh:oh;return t==="native"&&(t=""),r&&(e?n((pi[e]&&pi[e].get||a)(r,e,t,i)):function(s,o,l){return n((pi[s]&&pi[s].get||a)(r,s,o,l))})},quickSetter:function(r,e,t){if(r=Ei(r),r.length>1){var i=r.map(function(c){return ii.quickSetter(c,e,t)}),a=i.length;return function(c){for(var u=a;u--;)i[u](c)}}r=r[0]||{};var n=pi[e],s=qr(r),o=s.harness&&(s.harness.aliases||{})[e]||e,l=n?function(c){var u=new n;ka._pt=0,u.init(r,t?c+t:c,ka,0,[r]),u.render(1,u),ka._pt&&Sl(1,ka)}:s.set(r,o);return n?l:function(c){return l(r,o,t?c+t:c,s,1)}},quickTo:function(r,e,t){var i,a=ii.to(r,mi((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),t||{})),n=function(s,o,l){return a.resetTo(e,s,o,l)};return n.tween=a,n},isTweening:function(r){return mt.getTweensOf(r,!0).length>0},defaults:function(r){return r&&r.ease&&(r.ease=Yr(r.ease,Tn.ease)),lh(Tn,r||{})},config:function(r){return lh(di,r||{})},registerEffect:function(r){var e=r.name,t=r.effect,i=r.plugins,a=r.defaults,n=r.extendTimeline;(i||"").split(",").forEach(function(s){return s&&!pi[s]&&!fi[s]&&En(e+" effect requires "+s+" plugin.")}),nl[e]=function(s,o,l){return t(Ei(s),mi(o||{},a),l)},n&&(ei.prototype[e]=function(s,o,l){return this.add(nl[e](s,Wi(o)?o:(l=o)&&{},this),l)})},registerEase:function(r,e){et[r]=Yr(e)},parseEase:function(r,e){return arguments.length?Yr(r,e):et},getById:function(r){return mt.getById(r)},exportRoot:function(r,e){r===void 0&&(r={});var t=new ei(r),i,a;for(t.smoothChildTiming=Qt(r.smoothChildTiming),mt.remove(t),t._dp=0,t._time=t._tTime=mt._time,i=mt._first;i;)a=i._next,(e||!(!i._dur&&i instanceof Tt&&i.vars.onComplete===i._targets[0]))&&qi(t,i,i._start-i._delay),i=a;return qi(mt,t,0),t},context:function(r,e){return r?new kh(r,e):dt},matchMedia:function(r){return new K_(r)},matchMediaRefresh:function(){return Kr.forEach(function(r){var e=r.conditions,t,i;for(i in e)e[i]&&(e[i]=!1,t=1);t&&r.revert()})||wl()},addEventListener:function(r,e){var t=Ho[r]||(Ho[r]=[]);~t.indexOf(e)||t.push(e)},removeEventListener:function(r,e){var t=Ho[r],i=t&&t.indexOf(e);i>=0&&t.splice(i,1)},utils:{wrap:A_,wrapYoyo:R_,distribute:vh,random:xh,snap:_h,normalize:E_,getUnit:Gt,clamp:S_,splitColor:Th,toArray:Ei,selector:dl,mapRange:bh,pipe:w_,unitize:T_,interpolate:C_,shuffle:gh},install:eh,effects:nl,ticker:vi,updateRoot:ei.updateRoot,plugins:pi,globalTimeline:mt,core:{PropTween:ti,globals:th,Tween:Tt,Timeline:ei,Animation:On,getCache:qr,_removeLinkedListItem:zo,reverting:function(){return It},context:function(r){return r&&dt&&(dt.data.push(r),r._ctx=dt),dt},suppressOverwrites:function(r){return Zs=r}}};Jt("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Vo[r]=Tt[r]}),vi.add(ei.updateRoot),ka=Vo.to({},{duration:0});var $_=function(r,e){for(var t=r._pt;t&&t.p!==e&&t.op!==e&&t.fp!==e;)t=t._next;return t},Q_=function(r,e){var t=r._targets,i,a,n;for(i in e)for(a=t.length;a--;)n=r._ptLookup[a][i],n&&(n=n.d)&&(n._pt&&(n=$_(n,i)),n&&n.modifier&&n.modifier(e[i],r,t[a],i))},Tl=function(r,e){return{name:r,headless:1,rawVars:1,init:function(t,i,a){a._onInit=function(n){var s,o;if(Ut(i)&&(s={},Jt(i,function(l){return s[l]=1}),i=s),e){s={};for(o in i)s[o]=e(i[o]);i=s}Q_(n,i)}}}},ii=Vo.registerPlugin({name:"attr",init:function(r,e,t,i,a){var n,s,o;this.tween=t;for(n in e)o=r.getAttribute(n)||"",s=this.add(r,"setAttribute",(o||0)+"",e[n],i,a,0,0,n),s.op=n,s.b=o,this._props.push(n)},render:function(r,e){for(var t=e._pt;t;)It?t.set(t.t,t.p,t.b,t):t.r(r,t.d),t=t._next}},{name:"endArray",headless:1,init:function(r,e){for(var t=e.length;t--;)this.add(r,t,r[t]||0,e[t],0,0,0,0,0,1)}},Tl("roundProps",fl),Tl("modifiers"),Tl("snap",_h))||Vo;Tt.version=ei.version=ii.version="3.15.0",Ju=1,Qs()&&Ba(),et.Power0,et.Power1,et.Power2,et.Power3,et.Power4,et.Linear,et.Quad,et.Cubic,et.Quart,et.Quint,et.Strong,et.Elastic,et.Back,et.SteppedEase,et.Bounce,et.Sine,et.Expo,et.Circ;var Bh,Er,Ga,El,$r,Gh,Al,J_=function(){return typeof window<"u"},ar={},Qr=180/Math.PI,Ha=Math.PI/180,Va=Math.atan2,Hh=1e8,Rl=/([A-Z])/g,e1=/(left|right|width|margin|padding|x)/i,t1=/[\s,\(]\S/,ji={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Cl=function(r,e){return e.set(e.t,e.p,Math.round((e.s+e.c*r)*1e4)/1e4+e.u,e)},i1=function(r,e){return e.set(e.t,e.p,r===1?e.e:Math.round((e.s+e.c*r)*1e4)/1e4+e.u,e)},r1=function(r,e){return e.set(e.t,e.p,r?Math.round((e.s+e.c*r)*1e4)/1e4+e.u:e.b,e)},a1=function(r,e){return e.set(e.t,e.p,r===1?e.e:r?Math.round((e.s+e.c*r)*1e4)/1e4+e.u:e.b,e)},n1=function(r,e){var t=e.s+e.c*r;e.set(e.t,e.p,~~(t+(t<0?-.5:.5))+e.u,e)},Vh=function(r,e){return e.set(e.t,e.p,r?e.e:e.b,e)},Wh=function(r,e){return e.set(e.t,e.p,r!==1?e.b:e.e,e)},o1=function(r,e,t){return r.style[e]=t},s1=function(r,e,t){return r.style.setProperty(e,t)},l1=function(r,e,t){return r._gsap[e]=t},c1=function(r,e,t){return r._gsap.scaleX=r._gsap.scaleY=t},u1=function(r,e,t,i,a){var n=r._gsap;n.scaleX=n.scaleY=t,n.renderTransform(a,n)},h1=function(r,e,t,i,a){var n=r._gsap;n[e]=t,n.renderTransform(a,n)},vt="transform",ri=vt+"Origin",d1=function r(e,t){var i=this,a=this.target,n=a.style,s=a._gsap;if(e in ar&&n){if(this.tfm=this.tfm||{},e!=="transform")e=ji[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return i.tfm[o]=nr(a,o)}):this.tfm[e]=s.x?s[e]:nr(a,e),e===ri&&(this.tfm.zOrigin=s.zOrigin);else return ji.transform.split(",").forEach(function(o){return r.call(i,o,t)});if(this.props.indexOf(vt)>=0)return;s.svg&&(this.svgo=a.getAttribute("data-svg-origin"),this.props.push(ri,t,"")),e=vt}(n||t)&&this.props.push(e,t,n[e])},Xh=function(r){r.translate&&(r.removeProperty("translate"),r.removeProperty("scale"),r.removeProperty("rotate"))},f1=function(){var r=this.props,e=this.target,t=e.style,i=e._gsap,a,n;for(a=0;a<r.length;a+=3)r[a+1]?r[a+1]===2?e[r[a]](r[a+2]):e[r[a]]=r[a+2]:r[a+2]?t[r[a]]=r[a+2]:t.removeProperty(r[a].substr(0,2)==="--"?r[a]:r[a].replace(Rl,"-$1").toLowerCase());if(this.tfm){for(n in this.tfm)i[n]=this.tfm[n];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),a=Al(),(!a||!a.isStart)&&!t[vt]&&(Xh(t),i.zOrigin&&t[ri]&&(t[ri]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},qh=function(r,e){var t={target:r,props:[],revert:f1,save:d1};return r._gsap||ii.core.getCache(r),e&&r.style&&r.nodeType&&e.split(",").forEach(function(i){return t.save(i)}),t},jh,Dl=function(r,e){var t=Er.createElementNS?Er.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),r):Er.createElement(r);return t&&t.style?t:Er.createElement(r)},_i=function r(e,t,i){var a=getComputedStyle(e);return a[t]||a.getPropertyValue(t.replace(Rl,"-$1").toLowerCase())||a.getPropertyValue(t)||!i&&r(e,Wa(t)||t,1)||""},Yh="O,Moz,ms,Ms,Webkit".split(","),Wa=function(r,e,t){var i=e||$r,a=i.style,n=5;if(r in a&&!t)return r;for(r=r.charAt(0).toUpperCase()+r.substr(1);n--&&!(Yh[n]+r in a););return n<0?null:(n===3?"ms":n>=0?Yh[n]:"")+r},Pl=function(){J_()&&window.document&&(Bh=window,Er=Bh.document,Ga=Er.documentElement,$r=Dl("div")||{style:{}},Dl("div"),vt=Wa(vt),ri=vt+"Origin",$r.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",jh=!!Wa("perspective"),Al=ii.core.reverting,El=1)},Zh=function(r){var e=r.ownerSVGElement,t=Dl("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=r.cloneNode(!0),a;i.style.display="block",t.appendChild(i),Ga.appendChild(t);try{a=i.getBBox()}catch{}return t.removeChild(i),Ga.removeChild(t),a},Kh=function(r,e){for(var t=e.length;t--;)if(r.hasAttribute(e[t]))return r.getAttribute(e[t])},$h=function(r){var e,t;try{e=r.getBBox()}catch{e=Zh(r),t=1}return e&&(e.width||e.height)||t||(e=Zh(r)),e&&!e.width&&!e.x&&!e.y?{x:+Kh(r,["x","cx","x1"])||0,y:+Kh(r,["y","cy","y1"])||0,width:0,height:0}:e},Qh=function(r){return!!(r.getCTM&&(!r.parentNode||r.ownerSVGElement)&&$h(r))},Ar=function(r,e){if(e){var t=r.style,i;e in ar&&e!==ri&&(e=vt),t.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),t.removeProperty(i==="--"?e:e.replace(Rl,"-$1").toLowerCase())):t.removeAttribute(e)}},Rr=function(r,e,t,i,a,n){var s=new ti(r._pt,e,t,0,1,n?Wh:Vh);return r._pt=s,s.b=i,s.e=a,r._props.push(t),s},Jh={deg:1,rad:1,turn:1},p1={grid:1,flex:1},Cr=function r(e,t,i,a){var n=parseFloat(i)||0,s=(i+"").trim().substr((n+"").length)||"px",o=$r.style,l=e1.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,d=a==="px",f=a==="%",g,_,m,p;if(a===s||!n||Jh[a]||Jh[s])return n;if(s!=="px"&&!d&&(n=r(e,t,i,"px")),p=e.getCTM&&Qh(e),(f||s==="%")&&(ar[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],St(f?n/g*h:n/100*g);if(o[l?"width":"height"]=h+(d?s:a),_=a!=="rem"&&~t.indexOf("adius")||a==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===Er||!_.appendChild)&&(_=Er.body),m=_._gsap,m&&f&&m.width&&l&&m.time===vi.time&&!m.uncache)return St(n/m.width*h);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=h+a,g=e[u],x?e.style[t]=x:Ar(e,t)}else(f||s==="%")&&!p1[_i(_,"display")]&&(o.position=_i(e,"position")),_===e&&(o.position="static"),_.appendChild($r),g=$r[u],_.removeChild($r),o.position="absolute";return l&&f&&(m=qr(_),m.time=vi.time,m.width=_[u]),St(d?g*n/h:g&&n?h/g*n:0)},nr=function(r,e,t,i){var a;return El||Pl(),e in ji&&e!=="transform"&&(e=ji[e],~e.indexOf(",")&&(e=e.split(",")[0])),ar[e]&&e!=="transform"?(a=zn(r,i),a=e!=="transformOrigin"?a[e]:a.svg?a.origin:Xo(_i(r,ri))+" "+a.zOrigin+"px"):(a=r.style[e],(!a||a==="auto"||i||~(a+"").indexOf("calc("))&&(a=Wo[e]&&Wo[e](r,e,t)||_i(r,e)||ah(r,e)||(e==="opacity"?1:0))),t&&!~(a+"").trim().indexOf(" ")?Cr(r,e,a,t)+t:a},m1=function(r,e,t,i){if(!t||t==="none"){var a=Wa(e,r,1),n=a&&_i(r,a,1);n&&n!==t?(e=a,t=n):e==="borderColor"&&(t=_i(r,"borderTopColor"))}var s=new ti(this._pt,r.style,e,0,1,Fh),o=0,l=0,c,u,h,d,f,g,_,m,p,x,v,b;if(s.b=t,s.e=i,t+="",i+="",i.substring(0,6)==="var(--"&&(i=_i(r,i.substring(4,i.indexOf(")")))),i==="auto"&&(g=r.style[e],r.style[e]=i,i=_i(r,e)||i,g?r.style[e]=g:Ar(r,e)),c=[t,i],Rh(c),t=c[0],i=c[1],h=t.match(Ia)||[],b=i.match(Ia)||[],b.length){for(;u=Ia.exec(i);)_=u[0],p=i.substring(o,u.index),f?f=(f+1)%5:(p.substr(-5)==="rgba("||p.substr(-5)==="hsla(")&&(f=1),_!==(g=h[l++]||"")&&(d=parseFloat(g)||0,v=g.substr((d+"").length),_.charAt(1)==="="&&(_=Oa(d,_)+v),m=parseFloat(_),x=_.substr((m+"").length),o=Ia.lastIndex-x.length,x||(x=x||di.units[e]||v,o===i.length&&(i+=x,s.e+=x)),v!==x&&(d=Cr(r,e,g,x)||0),s._pt={_next:s._pt,p:p||l===1?p:",",s:d,c:m-d,m:f&&f<4||e==="zIndex"?Math.round:0});s.c=o<i.length?i.substring(o,i.length):""}else s.r=e==="display"&&i==="none"?Wh:Vh;return Qu.test(i)&&(s.e=0),this._pt=s,s},ed={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},g1=function(r){var e=r.split(" "),t=e[0],i=e[1]||"50%";return(t==="top"||t==="bottom"||i==="left"||i==="right")&&(r=t,t=i,i=r),e[0]=ed[t]||t,e[1]=ed[i]||i,e.join(" ")},v1=function(r,e){if(e.tween&&e.tween._time===e.tween._dur){var t=e.t,i=t.style,a=e.u,n=t._gsap,s,o,l;if(a==="all"||a===!0)i.cssText="",o=1;else for(a=a.split(","),l=a.length;--l>-1;)s=a[l],ar[s]&&(o=1,s=s==="transformOrigin"?ri:vt),Ar(t,s);o&&(Ar(t,vt),n&&(n.svg&&t.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",zn(t,1),n.uncache=1,Xh(i)))}},Wo={clearProps:function(r,e,t,i,a){if(a.data!=="isFromStart"){var n=r._pt=new ti(r._pt,e,t,0,0,v1);return n.u=i,n.pr=-10,n.tween=a,r._props.push(t),1}}},Nn=[1,0,0,1,0,0],td={},id=function(r){return r==="matrix(1, 0, 0, 1, 0, 0)"||r==="none"||!r},rd=function(r){var e=_i(r,vt);return id(e)?Nn:e.substr(7).match($u).map(St)},Ul=function(r,e){var t=r._gsap||qr(r),i=r.style,a=rd(r),n,s,o,l;return t.svg&&r.getAttribute("transform")?(o=r.transform.baseVal.consolidate().matrix,a=[o.a,o.b,o.c,o.d,o.e,o.f],a.join(",")==="1,0,0,1,0,0"?Nn:a):(a===Nn&&!r.offsetParent&&r!==Ga&&!t.svg&&(o=i.display,i.display="block",n=r.parentNode,(!n||!r.offsetParent&&!r.getBoundingClientRect().width)&&(l=1,s=r.nextElementSibling,Ga.appendChild(r)),a=rd(r),o?i.display=o:Ar(r,"display"),l&&(s?n.insertBefore(r,s):n?n.appendChild(r):Ga.removeChild(r))),e&&a.length>6?[a[0],a[1],a[4],a[5],a[12],a[13]]:a)},Ll=function(r,e,t,i,a,n){var s=r._gsap,o=a||Ul(r,!0),l=s.xOrigin||0,c=s.yOrigin||0,u=s.xOffset||0,h=s.yOffset||0,d=o[0],f=o[1],g=o[2],_=o[3],m=o[4],p=o[5],x=e.split(" "),v=parseFloat(x[0])||0,b=parseFloat(x[1])||0,w,T,M,E;t?o!==Nn&&(T=d*_-f*g)&&(M=v*(_/T)+b*(-g/T)+(g*p-_*m)/T,E=v*(-f/T)+b*(d/T)-(d*p-f*m)/T,v=M,b=E):(w=$h(r),v=w.x+(~x[0].indexOf("%")?v/100*w.width:v),b=w.y+(~(x[1]||x[0]).indexOf("%")?b/100*w.height:b)),i||i!==!1&&s.smooth?(m=v-l,p=b-c,s.xOffset=u+(m*d+p*g)-m,s.yOffset=h+(m*f+p*_)-p):s.xOffset=s.yOffset=0,s.xOrigin=v,s.yOrigin=b,s.smooth=!!i,s.origin=e,s.originIsAbsolute=!!t,r.style[ri]="0px 0px",n&&(Rr(n,s,"xOrigin",l,v),Rr(n,s,"yOrigin",c,b),Rr(n,s,"xOffset",u,s.xOffset),Rr(n,s,"yOffset",h,s.yOffset)),r.setAttribute("data-svg-origin",v+" "+b)},zn=function(r,e){var t=r._gsap||new Dh(r);if("x"in t&&!e&&!t.uncache)return t;var i=r.style,a=t.scaleX<0,n="px",s="deg",o=getComputedStyle(r),l=_i(r,ri)||"0",c,u,h,d,f,g,_,m,p,x,v,b,w,T,M,E,O,S,C,U,N,D,k,F,X,Y,z,q,y,B,W,I;return c=u=h=g=_=m=p=x=v=0,d=f=1,t.svg=!!(r.getCTM&&Qh(r)),o.translate&&((o.translate!=="none"||o.scale!=="none"||o.rotate!=="none")&&(i[vt]=(o.translate!=="none"?"translate3d("+(o.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(o.rotate!=="none"?"rotate("+o.rotate+") ":"")+(o.scale!=="none"?"scale("+o.scale.split(" ").join(",")+") ":"")+(o[vt]!=="none"?o[vt]:"")),i.scale=i.rotate=i.translate="none"),T=Ul(r,t.svg),t.svg&&(t.uncache?(X=r.getBBox(),l=t.xOrigin-X.x+"px "+(t.yOrigin-X.y)+"px",F=""):F=!e&&r.getAttribute("data-svg-origin"),Ll(r,F||l,!!F||t.originIsAbsolute,t.smooth!==!1,T)),b=t.xOrigin||0,w=t.yOrigin||0,T!==Nn&&(S=T[0],C=T[1],U=T[2],N=T[3],c=D=T[4],u=k=T[5],T.length===6?(d=Math.sqrt(S*S+C*C),f=Math.sqrt(N*N+U*U),g=S||C?Va(C,S)*Qr:0,p=U||N?Va(U,N)*Qr+g:0,p&&(f*=Math.abs(Math.cos(p*Ha))),t.svg&&(c-=b-(b*S+w*U),u-=w-(b*C+w*N))):(I=T[6],B=T[7],z=T[8],q=T[9],y=T[10],W=T[11],c=T[12],u=T[13],h=T[14],M=Va(I,y),_=M*Qr,M&&(E=Math.cos(-M),O=Math.sin(-M),F=D*E+z*O,X=k*E+q*O,Y=I*E+y*O,z=D*-O+z*E,q=k*-O+q*E,y=I*-O+y*E,W=B*-O+W*E,D=F,k=X,I=Y),M=Va(-U,y),m=M*Qr,M&&(E=Math.cos(-M),O=Math.sin(-M),F=S*E-z*O,X=C*E-q*O,Y=U*E-y*O,W=N*O+W*E,S=F,C=X,U=Y),M=Va(C,S),g=M*Qr,M&&(E=Math.cos(M),O=Math.sin(M),F=S*E+C*O,X=D*E+k*O,C=C*E-S*O,k=k*E-D*O,S=F,D=X),_&&Math.abs(_)+Math.abs(g)>359.9&&(_=g=0,m=180-m),d=St(Math.sqrt(S*S+C*C+U*U)),f=St(Math.sqrt(k*k+I*I)),M=Va(D,k),p=Math.abs(M)>2e-4?M*Qr:0,v=W?1/(W<0?-W:W):0),t.svg&&(F=r.getAttribute("transform"),t.forceCSS=r.setAttribute("transform","")||!id(_i(r,vt)),F&&r.setAttribute("transform",F))),Math.abs(p)>90&&Math.abs(p)<270&&(a?(d*=-1,p+=g<=0?180:-180,g+=g<=0?180:-180):(f*=-1,p+=p<=0?180:-180)),e=e||t.uncache,t.x=c-((t.xPercent=c&&(!e&&t.xPercent||(Math.round(r.offsetWidth/2)===Math.round(-c)?-50:0)))?r.offsetWidth*t.xPercent/100:0)+n,t.y=u-((t.yPercent=u&&(!e&&t.yPercent||(Math.round(r.offsetHeight/2)===Math.round(-u)?-50:0)))?r.offsetHeight*t.yPercent/100:0)+n,t.z=h+n,t.scaleX=St(d),t.scaleY=St(f),t.rotation=St(g)+s,t.rotationX=St(_)+s,t.rotationY=St(m)+s,t.skewX=p+s,t.skewY=x+s,t.transformPerspective=v+n,(t.zOrigin=parseFloat(l.split(" ")[2])||!e&&t.zOrigin||0)&&(i[ri]=Xo(l)),t.xOffset=t.yOffset=0,t.force3D=di.force3D,t.renderTransform=t.svg?x1:jh?ad:_1,t.uncache=0,t},Xo=function(r){return(r=r.split(" "))[0]+" "+r[1]},Il=function(r,e,t){var i=Gt(e);return St(parseFloat(e)+parseFloat(Cr(r,"x",t+"px",i)))+i},_1=function(r,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,ad(r,e)},Jr="0deg",kn="0px",ea=") ",ad=function(r,e){var t=e||this,i=t.xPercent,a=t.yPercent,n=t.x,s=t.y,o=t.z,l=t.rotation,c=t.rotationY,u=t.rotationX,h=t.skewX,d=t.skewY,f=t.scaleX,g=t.scaleY,_=t.transformPerspective,m=t.force3D,p=t.target,x=t.zOrigin,v="",b=m==="auto"&&r&&r!==1||m===!0;if(x&&(u!==Jr||c!==Jr)){var w=parseFloat(c)*Ha,T=Math.sin(w),M=Math.cos(w),E;w=parseFloat(u)*Ha,E=Math.cos(w),n=Il(p,n,T*E*-x),s=Il(p,s,-Math.sin(w)*-x),o=Il(p,o,M*E*-x+x)}_!==kn&&(v+="perspective("+_+ea),(i||a)&&(v+="translate("+i+"%, "+a+"%) "),(b||n!==kn||s!==kn||o!==kn)&&(v+=o!==kn||b?"translate3d("+n+", "+s+", "+o+") ":"translate("+n+", "+s+ea),l!==Jr&&(v+="rotate("+l+ea),c!==Jr&&(v+="rotateY("+c+ea),u!==Jr&&(v+="rotateX("+u+ea),(h!==Jr||d!==Jr)&&(v+="skew("+h+", "+d+ea),(f!==1||g!==1)&&(v+="scale("+f+", "+g+ea),p.style[vt]=v||"translate(0, 0)"},x1=function(r,e){var t=e||this,i=t.xPercent,a=t.yPercent,n=t.x,s=t.y,o=t.rotation,l=t.skewX,c=t.skewY,u=t.scaleX,h=t.scaleY,d=t.target,f=t.xOrigin,g=t.yOrigin,_=t.xOffset,m=t.yOffset,p=t.forceCSS,x=parseFloat(n),v=parseFloat(s),b,w,T,M,E;o=parseFloat(o),l=parseFloat(l),c=parseFloat(c),c&&(c=parseFloat(c),l+=c,o+=c),o||l?(o*=Ha,l*=Ha,b=Math.cos(o)*u,w=Math.sin(o)*u,T=Math.sin(o-l)*-h,M=Math.cos(o-l)*h,l&&(c*=Ha,E=Math.tan(l-c),E=Math.sqrt(1+E*E),T*=E,M*=E,c&&(E=Math.tan(c),E=Math.sqrt(1+E*E),b*=E,w*=E)),b=St(b),w=St(w),T=St(T),M=St(M)):(b=u,M=h,w=T=0),(x&&!~(n+"").indexOf("px")||v&&!~(s+"").indexOf("px"))&&(x=Cr(d,"x",n,"px"),v=Cr(d,"y",s,"px")),(f||g||_||m)&&(x=St(x+f-(f*b+g*T)+_),v=St(v+g-(f*w+g*M)+m)),(i||a)&&(E=d.getBBox(),x=St(x+i/100*E.width),v=St(v+a/100*E.height)),E="matrix("+b+","+w+","+T+","+M+","+x+","+v+")",d.setAttribute("transform",E),p&&(d.style[vt]=E)},y1=function(r,e,t,i,a){var n=360,s=Ut(a),o=parseFloat(a)*(s&&~a.indexOf("rad")?Qr:1),l=o-i,c=i+l+"deg",u,h;return s&&(u=a.split("_")[1],u==="short"&&(l%=n,l!==l%(n/2)&&(l+=l<0?n:-n)),u==="cw"&&l<0?l=(l+n*Hh)%n-~~(l/n)*n:u==="ccw"&&l>0&&(l=(l-n*Hh)%n-~~(l/n)*n)),r._pt=h=new ti(r._pt,e,t,i,l,i1),h.e=c,h.u="deg",r._props.push(t),h},nd=function(r,e){for(var t in e)r[t]=e[t];return r},b1=function(r,e,t){var i=nd({},t._gsap),a="perspective,force3D,transformOrigin,svgOrigin",n=t.style,s,o,l,c,u,h,d,f;i.svg?(l=t.getAttribute("transform"),t.setAttribute("transform",""),n[vt]=e,s=zn(t,1),Ar(t,vt),t.setAttribute("transform",l)):(l=getComputedStyle(t)[vt],n[vt]=e,s=zn(t,1),n[vt]=l);for(o in ar)l=i[o],c=s[o],l!==c&&a.indexOf(o)<0&&(d=Gt(l),f=Gt(c),u=d!==f?Cr(t,o,l,f):parseFloat(l),h=parseFloat(c),r._pt=new ti(r._pt,s,o,u,h-u,Cl),r._pt.u=f||0,r._props.push(o));nd(s,i)};Jt("padding,margin,Width,Radius",function(r,e){var t="Top",i="Right",a="Bottom",n="Left",s=(e<3?[t,i,a,n]:[t+n,t+i,a+i,a+n]).map(function(o){return e<2?r+o:"border"+o+r});Wo[e>1?"border"+r:r]=function(o,l,c,u,h){var d,f;if(arguments.length<4)return d=s.map(function(g){return nr(o,g,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(u+"").split(" "),f={},s.forEach(function(g,_){return f[g]=d[_]=d[_]||d[(_-1)/2|0]}),o.init(l,f,h)}});var od={name:"css",register:Pl,targetTest:function(r){return r.style&&r.nodeType},init:function(r,e,t,i,a){var n=this._props,s=r.style,o=t.vars.startAt,l,c,u,h,d,f,g,_,m,p,x,v,b,w,T,M,E;El||Pl(),this.styles=this.styles||qh(r),M=this.styles.props,this.tween=t;for(g in e)if(g!=="autoRound"&&(c=e[g],!(pi[g]&&Ph(g,e,t,i,r,a)))){if(d=typeof c,f=Wo[g],d==="function"&&(c=c.call(t,i,r,a),d=typeof c),d==="string"&&~c.indexOf("random(")&&(c=Pn(c)),f)f(this,r,g,c,t)&&(T=1);else if(g.substr(0,2)==="--")l=(getComputedStyle(r).getPropertyValue(g)+"").trim(),c+="",wr.lastIndex=0,wr.test(l)||(_=Gt(l),m=Gt(c),m?_!==m&&(l=Cr(r,g,l,m)+m):_&&(c+=_)),this.add(s,"setProperty",l,c,i,a,0,0,g),n.push(g),M.push(g,0,s[g]);else if(d!=="undefined"){if(o&&g in o?(l=typeof o[g]=="function"?o[g].call(t,i,r,a):o[g],Ut(l)&&~l.indexOf("random(")&&(l=Pn(l)),Gt(l+"")||l==="auto"||(l+=di.units[g]||Gt(nr(r,g))||""),(l+"").charAt(1)==="="&&(l=nr(r,g))):l=nr(r,g),h=parseFloat(l),p=d==="string"&&c.charAt(1)==="="&&c.substr(0,2),p&&(c=c.substr(2)),u=parseFloat(c),g in ji&&(g==="autoAlpha"&&(h===1&&nr(r,"visibility")==="hidden"&&u&&(h=0),M.push("visibility",0,s.visibility),Rr(this,s,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),g!=="scale"&&g!=="transform"&&(g=ji[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in ar,x){if(this.styles.save(g),E=c,d==="string"&&c.substring(0,6)==="var(--"){if(c=_i(r,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var O=r.style.perspective;r.style.perspective=c,c=_i(r,"perspective"),O?r.style.perspective=O:Ar(r,"perspective")}u=parseFloat(c)}if(v||(b=r._gsap,b.renderTransform&&!e.parseTransform||zn(r,e.parseTransform),w=e.smoothOrigin!==!1&&b.smooth,v=this._pt=new ti(this._pt,s,vt,0,1,b.renderTransform,b,0,-1),v.dep=1),g==="scale")this._pt=new ti(this._pt,b,"scaleY",b.scaleY,(p?Oa(b.scaleY,p+u):u)-b.scaleY||0,Cl),this._pt.u=0,n.push("scaleY",g),g+="X";else if(g==="transformOrigin"){M.push(ri,0,s[ri]),c=g1(c),b.svg?Ll(r,c,0,w,0,this):(m=parseFloat(c.split(" ")[2])||0,m!==b.zOrigin&&Rr(this,b,"zOrigin",b.zOrigin,m),Rr(this,s,g,Xo(l),Xo(c)));continue}else if(g==="svgOrigin"){Ll(r,c,1,w,0,this);continue}else if(g in td){y1(this,b,g,h,p?Oa(h,p+c):c);continue}else if(g==="smoothOrigin"){Rr(this,b,"smooth",b.smooth,c);continue}else if(g==="force3D"){b[g]=c;continue}else if(g==="transform"){b1(this,c,r);continue}}else g in s||(g=Wa(g)||g);if(x||(u||u===0)&&(h||h===0)&&!t1.test(c)&&g in s)_=(l+"").substr((h+"").length),u||(u=0),m=Gt(c)||(g in di.units?di.units[g]:_),_!==m&&(h=Cr(r,g,l,m)),this._pt=new ti(this._pt,x?b:s,g,h,(p?Oa(h,p+u):u)-h,!x&&(m==="px"||g==="zIndex")&&e.autoRound!==!1?n1:Cl),this._pt.u=m||0,x&&E!==c?(this._pt.b=l,this._pt.e=E,this._pt.r=a1):_!==m&&m!=="%"&&(this._pt.b=l,this._pt.r=r1);else if(g in s)m1.call(this,r,g,l,p?p+c:c);else if(g in r)this.add(r,g,l||r[g],p?p+c:c,i,a);else if(g!=="parseTransform"){il(g,c);continue}x||(g in s?M.push(g,0,s[g]):typeof r[g]=="function"?M.push(g,2,r[g]()):M.push(g,1,l||r[g])),n.push(g)}}T&&Nh(this)},render:function(r,e){if(e.tween._time||!Al())for(var t=e._pt;t;)t.r(r,t.d),t=t._next;else e.styles.revert()},get:nr,aliases:ji,getSetter:function(r,e,t){var i=ji[e];return i&&i.indexOf(",")<0&&(e=i),e in ar&&e!==ri&&(r._gsap.x||nr(r,"x"))?t&&Gh===t?e==="scale"?c1:l1:(Gh=t||{})&&(e==="scale"?u1:h1):r.style&&!$s(r.style[e])?o1:~e.indexOf("-")?s1:bl(r,e)},core:{_removeProperty:Ar,_getMatrix:Ul}};ii.utils.checkPrefix=Wa,ii.core.getStyleSaver=qh,(function(r,e,t,i){var a=Jt(r+","+e+","+t,function(n){ar[n]=1});Jt(e,function(n){di.units[n]="deg",td[n]=1}),ji[a[13]]=r+","+e,Jt(i,function(n){var s=n.split(":");ji[s[1]]=a[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),Jt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){di.units[r]="px"}),ii.registerPlugin(od);var Yi=ii.registerPlugin(od)||ii;Yi.core.Tween;const sd="/chromic-lyrics/vendor/SFNS-ExtraBold.ttf",ld="/chromic-lyrics/vendor/SFNS.ttf";let Xa=sd;try{fetch(sd,{method:"HEAD"}).then(r=>{r.ok||(Xa=ld)})}catch{Xa=ld}const qo="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data",Ni=.5,ta=1,qa=.15,xi=.09,cd=.65,Ai=.14,ia=.018,ja=0,ud=1.35,ra=0,jo=.9,Ya=.3,hd=.25,Ze={active:{op:1,sc:1.04,oy:0},past:{op:0,sc:.93,oy:.06},pastFar:{op:0,sc:.85,oy:.12},future:{op:.04,sc:.88,oy:-.06},future1:{op:.55,sc:.97,oy:-.02},future2:{op:.3,sc:.94,oy:-.04},future3:{op:.14,sc:.92,oy:-.05},future4:{op:.07,sc:.9,oy:-.06},future5:{op:.04,sc:.88,oy:-.06},adlibOn:{op:.6,sc:.92,oy:-.05},adlibOff:{op:.35,sc:.9,oy:-.033},adlibHid:{op:0,sc:.88,oy:.033},scroll:{op:.7,sc:1,oy:0},scrollAct:{op:1,sc:1,oy:0},pairAct:{op:1,sc:.97,oy:0},pairPast:{op:0,sc:.96,oy:-.083},pairFut:{op:.45,sc:.94,oy:-.03}};function S1(r){return r.stretch||r.isVocalStretch?"stretch":r.sung?"sung":r.spoken?"spoken":r.whisper?"whisper":"normal"}function Yo(r,e,t){r.text=e,r.font=Xa,r.fontSize=t,r.maxWidth=jo,r.unicodeFontsURL=qo,r.fontWeight=800,r.anchorX="left",r.anchorY="middle",r.color=16777215,r.transparent=!0,r.sdfGlyphSize=128,r.gpuAccelerateSDF=!0}function M1(r,e,t,i,a){if(i)return r===e?Ze.scrollAct:Ze.scroll;if(t)return r===e?Ze.adlibOn:r<e?Ze.adlibOff:Ze.adlibHid;if(a)return r===e?Ze.pairAct:r<e?Ze.pairPast:Ze.pairFut;if(r===e)return Ze.active;if(r<e)return e-r>1?Ze.pastFar:Ze.past;const n=r-e;return n===1?Ze.future1:n===2?Ze.future2:n===3?Ze.future3:n===4?Ze.future4:n===5?Ze.future5:Ze.future}class w1{constructor(){this.lines=[],this.timeline=[],this.activeLineIdx=-1,this.opacity=0,this.targetOpacity=0,this.lastTime=0,this.lastTimeStamp=0,this.interpolatedTime=0,this._trackStarted=!1,this.ready=!1,this.lastCt=0,this._pendingSeekTime=null,this._leftEdge=0,this._aspectX=1,this.manualScrollOffset=0,this.scrollDecayTimer=0,this.scrollY=Ya,this._scrollVel=0,this._prevScrollY=Ya,this._activeChangeTime=0,this._prevActiveIdx=-1,this._onSeek=null,this._metaGroup=null,this._metaArtistMesh=null,this._metaAlbumMesh=null,this._metaVisible=!1,this._debugRenderer=null,this._debugEnabled=!1,this._debugLastDump=0,this._uiVisible=!0,this._activeLineY=Ya,this._accentColor=new he(8304895),this._translations=[],this._translationVisible=!1,this._translationFactor=0,this._translationMeshes=[],this._shaderProgressCarry=0,this._shaderTrailUntil=0,this._rmsEma=0,this._rmsFloor=0,this._antiStrobe={shortWordSec:.2,gapCloseSec:.08,trailMinSec:.06,trailMaxSec:.1,trailWordScale:.6,decayLerp:.32,rmsEmaLerp:.08,rmsFloorRiseLerp:.002,rmsGateMul:1.35,rmsGateBias:.004},this._zenMode=!1,this._zenScale=1,this._zenOffsetX=0,this._dbgCount=0,this.group=new _r,this.group.layers.enable(0),this.group.layers.enable(1)}setAntiStrobeConfig(e){this._antiStrobe={...this._antiStrobe,...e}}getAntiStrobeConfig(){return{...this._antiStrobe}}getShaderState(){const e=this.activeLineIdx,t=e>=0&&e<this.timeline.length?this.timeline[e]:null,i=!!t&&this.interpolatedTime>=(t.start||0)&&this.interpolatedTime<=(t.end||0);let a=0,n=!1,s=.5;if(t&&i){const l=(t.end||0)-(t.start||0),c=t.start||0;t.end;const u=this.interpolatedTime,h=t.words||[],d=l>0?Math.max(0,Math.min(1,(u-c)/l)):0;let f=d;const g=this._antiStrobe;let _=-1;for(let p=0;p<h.length;p++){const x=h[p];if(u>=x.start&&u<=x.end){_=p;break}}if(_>=0){const p=h[_],x=Math.max(.001,p.end-p.start);let v=Math.max(0,Math.min(1,(u-p.start)/x));x<=g.shortWordSec&&(v=1-(1-v)*(1-v));const b=l>0?Math.max(0,Math.min(1,(p.start-c+v*x)/l)):d;f=Math.max(d,b);const w=Math.max(g.trailMinSec,Math.min(g.trailMaxSec,x*g.trailWordScale));this._shaderTrailUntil=Math.max(this._shaderTrailUntil,p.end+w),this._shaderProgressCarry=Math.max(this._shaderProgressCarry,f)}else{const p=this._rmsEma>this._rmsFloor*g.rmsGateMul+g.rmsGateBias;for(let x=0;x<h.length-1;x++){const v=h[x],b=h[x+1],w=b.start-v.end;if(p&&w>0&&w<=g.gapCloseSec&&u>v.end&&u<b.start){const T=l>0?Math.max(0,Math.min(1,(v.end-c)/l)):d;f=Math.max(f,T),this._shaderTrailUntil=Math.max(this._shaderTrailUntil,b.start),this._shaderProgressCarry=Math.max(this._shaderProgressCarry,f);break}}}u<=this._shaderTrailUntil?a=Math.max(f,this._shaderProgressCarry):(this._shaderProgressCarry+=(f-this._shaderProgressCarry)*this._antiStrobe.decayLerp,Math.abs(this._shaderProgressCarry-f)<.002&&(this._shaderProgressCarry=f),a=this._shaderProgressCarry),a=Math.max(0,Math.min(1,a)),n=!!t.adlib||(t.words||[]).some(p=>p.adlib&&this.interpolatedTime>=p.start&&this.interpolatedTime<=p.end);const m=(t.words||[]).find(p=>this.interpolatedTime>=p.start&&this.interpolatedTime<=p.end);m&&(s=m.sung||m.isVocalStretch||m.stretch?1:m.whisper?.2:m.spoken?.6:.5)}else this._shaderProgressCarry=0,this._shaderTrailUntil=0;const o=e!==this._prevActiveIdx;return{active:i,progress:a,adlib:n,wordIntensity:s,lineChanged:o}}setTimeline(e,t,i){this.disposeLines(),this.timeline=e,this.activeLineIdx=-1,this.ready=!1,this._trackStarted=!1,this.scrollY=Ya,this.manualScrollOffset=0,this.scrollDecayTimer=0,this.opacity=0,this.targetOpacity=0,this.group.visible=!1,e.length&&(this.buildScene(e),(t||i)&&this.setTrackMeta(t,i))}disposeLines(){for(const e of this._translationMeshes)e&&e.dispose();this._translationMeshes=[],this._translations=[],this._metaGroup&&(this._metaArtistMesh&&(this._metaArtistMesh.dispose(),this._metaArtistMesh=null),this._metaAlbumMesh&&(this._metaAlbumMesh.dispose(),this._metaAlbumMesh=null),this.group.remove(this._metaGroup),this._metaGroup=null,this._metaVisible=!1);for(const e of this.lines){Yi.killTweensOf(e);for(const t of e.entries)if(t._isCueDot)t.base.geometry?.dispose(),t.base.material?.dispose(),t.fill.geometry?.dispose(),t.fill.material?.dispose();else if(t._isCharSplit)for(const i of t._chars)i.base.dispose(),i.fill.dispose();else t.base.dispose(),t.fill.dispose();this.group.remove(e.group)}this.lines=[]}buildScene(e){const t=e.filter(d=>d.type==="vocal_cue"||d.words?.length||d.text),i=[],a=t[0],n=a&&(a.start||a.time)||0;a?.type!=="vocal_cue"&&n>6&&i.push({type:"vocal_cue",start:0,end:n,text:""});for(let d=0;d<t.length;d++)i.push(t[d]);const s=[];for(let d=0;d<i.length;d++){const f=i[d],g=i[d+1]?i[d+1].start||i[d+1].time||999:(f.start||0)+5;if(f.type==="vocal_cue"){const _=f.start||f.time||0,m=f.end||Math.min(+g-.1,_+5);s.push({...f,_isCue:!0,start:_,end:m,words:[{text:"\u2022",start:_,end:_+(m-_)*.33},{text:"\u2022",start:_+(m-_)*.33,end:_+(m-_)*.66},{text:"\u2022",start:_+(m-_)*.66,end:m}]});continue}if(!f.words||!f.words.length){const _=(f.text||"").split(/\s+/).filter(Boolean);if(!_.length)continue;const m=f.start||f.time||0,p=((f.end||Math.min(+g-.1,m+5))-m)/_.length;f.words=_.map((x,v)=>({text:x,start:m+v*p,end:m+(v+1)*p}))}!f.end&&f.words.length&&(f.end=f.words[f.words.length-1].end),s.push(f)}if(!s.length)return;let o=0,l=0,c=0;for(let d=0;d<s.length;d++){const f=s[d],g=!!f._isCue,_=!g&&((f.words||[]).every(E=>E.adlib)||!!f.adlib),m=!g&&!_&&(f.words||[]).some(E=>E.adlib),p=g?xi:_?xi*cd:xi,x=new _r;x.layers.enable(0),x.layers.enable(1),this.group.add(x);const v=[],b={start:f.start||f.time||0,end:f.end||0};if(g){const E=xi*.22,O=xi*.45,S=new Nl(E,128);for(let U=0;U<3;U++){const N=f.words[U],D=new gr({color:16777215,transparent:!0,opacity:.1,depthTest:!1,depthWrite:!1}),k=new Xe(S,D),F=ra+U*(E*2+O)+E;k.position.set(F,0,ja),k.layers.set(1),x.add(k);const X=new gr({color:16777215,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1}),Y=new Xe(S,X);Y.position.copy(k.position),Y.scale.set(0,0,1),Y.layers.set(1),x.add(Y),v.push({base:k,fill:Y,start:N.start,end:N.end,text:"\u2022",li:d,wi:U,ad:!1,wt:"normal",_w:E*2,_p:0,_cop:0,_tOp:1,_scX:1,_scY:1,_wave:0,_glow:0,_baseY:0,_isCueDot:!0,_dotRadius:E,_clickFlash:0,_adBaseY:0})}x.position.set(0,c,0);const C=this.lines.length===0;this.lines.push({group:x,entries:v,ld:b,ad:!1,isCue:!0,hasInlineAdlibs:!1,fs:p,_baseY:c,_cOp:C?Ze.active.op:Ze.future.op,_cSc:C?Ze.active.sc:Ze.future.sc,_cOy:C?Ze.active.oy:Ze.future.oy,_tOp:C?Ze.active.op:Ze.future.op,_tSc:C?Ze.active.sc:Ze.future.sc,_tOy:C?Ze.active.oy:Ze.future.oy,_vOp:0,_vSc:0,_vOy:0,_scrollLag:0,_cueCollapse:0,_cueCollapseTarget:0,_cueExitPhase:0,_cueExitTimer:0}),c-=Ai;continue}let w=ra;for(let E=0;E<f.words.length;E++){const O=f.words[E],S=O.word||O.text||"",C=!!O.adlib||_,U=S1(O),N=C&&!_?p*cd:p;if(U==="stretch"&&S.length>1&&!_){const D=S.split(""),k=[];for(let X=0;X<D.length;X++){const Y=D[X],z=new Vi;Yo(z,Y,N),z.layers.set(1),x.add(z);const q=new Vi;Yo(q,Y,N),q.layers.set(1),x.add(q),k.push({base:z,fill:q,idx:X}),o+=2}const F={base:k[0].base,fill:k[0].fill,start:O.start,end:O.end,text:S,li:d,wi:E,ad:C,wt:U,_w:0,_p:0,_cop:1,_tOp:1,_scX:1,_scY:1,_wave:0,_glow:0,_baseY:0,_isCharSplit:!0,_chars:k,_charWidths:[],_charCount:D.length,_clickFlash:0,_adBaseY:0};v.push(F)}else{const D=new Vi;Yo(D,S,N),D.position.set(w,0,ja),D.layers.set(1),x.add(D);const k=new Vi;Yo(k,S,N),k.clipRect=[-10,-10,-10,10],k.position.set(w,0,ja),k.layers.set(1),x.add(k);const F={base:D,fill:k,start:O.start,end:O.end,text:S,li:d,wi:E,ad:C,wt:U,_w:0,_p:0,_cop:1,_tOp:1,_scX:1,_scY:1,_wave:0,_glow:0,_baseY:0,_clickFlash:0,_adBaseY:0};v.push(F),o+=2}w+=S.length*N*.55+ia}const T=[];if(m){let E=null;for(const O of v)O.ad?(E||(E={words:[],start:1/0,end:0,totalW:0}),E.words.push(O),E.start=Math.min(E.start,O.start),E.end=Math.max(E.end,O.end),E.totalW+=O._w+ia):E&&(E.totalW-=ia,T.push(E),E=null);E&&(E.totalW-=ia,T.push(E));for(let O=0;O<T.length;O++)for(const S of T[O].words)S._adPhraseIdx=O}x.position.set(0,c,0);const M=this.lines.length===0;this.lines.push({group:x,entries:v,ld:b,ad:_,isCue:!1,hasInlineAdlibs:m,fs:p,_baseY:c,_cOp:M?Ze.active.op:Ze.future.op,_cSc:M?Ze.active.sc:Ze.future.sc,_cOy:M?Ze.active.oy:Ze.future.oy,_tOp:M?Ze.active.op:Ze.future.op,_tSc:M?Ze.active.sc:Ze.future.sc,_tOy:M?Ze.active.oy:Ze.future.oy,_vOp:0,_vSc:0,_vOy:0,_scrollLag:0,_adPhrases:T,_adLastEnd:T.length?Math.max(...T.map(E=>E.end)):0,_adPhraseReveal:0}),c-=Ai}for(let d=0;d<this.lines.length;d++)this.lines[d].entries.map(f=>f.text).join(" ").startsWith("(")&&d+1<this.lines.length&&this.lines[d+1].entries.map(f=>f.text).join(" ").startsWith("(")&&(this.lines[d]._pairWith=d+1,this.lines[d+1]._pairWith=d,this.lines[d]._pairRole="first",this.lines[d+1]._pairRole="second",d++);for(let d=0;d<this.lines.length;d++){const f=this.lines[d];f.ad&&!f.isCue&&f._pairWith==null&&(f._standaloneAdlib=!0)}const u=d=>{d.material&&(d.material.transparent=!0,d.material.depthWrite=!1,d.material.depthTest=!1)},h=()=>{if(l++,l>=o){for(const d of this.lines)for(const f of d.entries)if(!f._isCueDot)if(f._isCharSplit&&f._chars)for(const g of f._chars)u(g.base),u(g.fill);else u(f.base),u(f.fill);console.log("[LyricsRenderer] All meshes synced & patched transparent. Lines:",this.lines.length),this.doLayout(),this.ready=!0,this.group.visible=!0,this.targetOpacity=1}};for(const d of this.lines)for(const f of d.entries)if(f._isCueDot)l+=2,l>=o&&(this.doLayout(),this.ready=!0,this.group.visible=!0,this.targetOpacity=1);else if(f._isCharSplit)for(const g of f._chars)g.base.sync(h),g.fill.sync(h);else f.base.sync(h),f.fill.sync(h);o===0&&(this.doLayout(),this.ready=!0,this.group.visible=!0,this.targetOpacity=1)}layoutChars(e,t,i){if(!e._isCharSplit||!e._chars)return;let a=t;for(let n=0;n<e._chars.length;n++){const s=e._chars[n],o=e._charWidths[n]||0;s.base.position.x=a,s.base.position.y=i,s.fill.position.x=a,s.fill.position.y=i,s._baseX=a,a+=o}}doLayout(){const e=jo,t=ra;this._leftEdge=t;let i=0;for(let a=0;a<this.lines.length;a++){const n=this.lines[a];if(n.isCue){const o=Ai*.35,l=n.entries[0]?._dotRadius||xi*.18,c=xi*.4;for(let u=0;u<n.entries.length;u++){const h=n.entries[u],d=t+u*(l*2+c)+l;h.base.position.x=d,h.base.position.y=0,h.fill.position.x=d,h.fill.position.y=0,h._adBaseY=0}n.group.position.set(0,i+o,0),n._baseY=i+o,i-=Ai;continue}for(const o of n.entries)if(!o._isCueDot)if(o._isCharSplit&&o._chars){let l=0;o._charWidths=[];for(const c of o._chars){const u=c.base.textRenderInfo?.blockBounds,h=u?u[2]-u[0]:n.fs*.5;o._charWidths.push(h),l+=h}o._w=l}else{const l=o.base.textRenderInfo?.blockBounds;o._w=l?l[2]-l[0]:o.text.length*n.fs*.5}const s=n.fs*ud;if(n.hasInlineAdlibs){const o=n.entries.filter(p=>!p.ad),l=n.entries.filter(p=>p.ad);let c=t,u=0;for(const p of o)c+p._w>t+e&&c>t+.01&&(c=t,u-=s),p.base.position.x=c,p.base.position.y=u,p.fill.position.x=c,p.fill.position.y=u,p._adBaseY=u,p._baseY=u,p._baseX=c,p._isCharSplit&&this.layoutChars(p,c,u),c+=p._w+ia;const h=n.fs*.15,d=u-n.fs-h;let f=t;for(const p of l)p.base.position.x=f,p.base.position.y=d,p.fill.position.x=f,p.fill.position.y=d,p._adBaseY=d,p._baseY=d,p._baseX=f,p._adBaseX=f,p._isCharSplit&&this.layoutChars(p,f,d),f+=p._w+ia;n.group.position.set(0,i,0),n._baseY=i;const g=Math.abs(u)+s,_=xi*.55,m=this._translationMeshes[a]!=null?_*1.4*this._translationFactor:0;i-=g+m+Ai}else{let o=t,l=0;for(const d of n.entries)o+d._w>t+e&&o>t+.01&&(o=t,l-=s),d.base.position.x=o,d.base.position.y=l,d.fill.position.x=o,d.fill.position.y=l,d._adBaseY=l,d._baseY=l,d._baseX=o,d._isCharSplit&&this.layoutChars(d,o,l),o+=d._w+ia;n.group.position.set(0,i,0),n._baseY=i;const c=Math.abs(l)+s;let u=c;if(this._translationFactor>0){const d=this._translationMeshes[a];if(d){const f=xi*.55,g=Math.abs(d.position.y),_=d.textRenderInfo?.blockBounds;let m;if(_)m=Math.abs(_[3]-_[1]);else{const x=d.text||"",v=Math.floor(jo/(f*.55));m=Math.max(1,Math.ceil(x.length/Math.max(1,v)))*f*1.4}const p=g+m;u=c+Math.max(0,p-c)*this._translationFactor}}let h;n._pairRole==="first"?h=Ai*.3:n._pairRole==="second"?h=Ai*1.4:h=n.ad&&!n._standaloneAdlib?Ai*.15:n._standaloneAdlib?Ai*.5:Ai,i-=u+h}}}setVisible(e){this.targetOpacity=e&&this.timeline.length>0?1:0}setCentered(e){this._zenMode=e,this._zenScale=e?1.2:1,this._zenOffsetX=e?-.45:0}setControlsVisible(e){this._uiVisible=e,this._activeLineY=e?Ya:hd}setViewportSize(e,t){const i=e<900;e<600?this._activeLineY=0:i?this._activeLineY=.1:this._activeLineY=this._uiVisible?Ya:hd}setAccentColor(e){this._accentColor=e.clone();const t={h:0,s:0,l:0};if(this._accentColor.getHSL(t),t.l<.5&&this._accentColor.setHSL(t.h,t.s,Math.max(.55,t.l)),this._metaAlbumMesh){const i=this._accentColor.clone(),a={h:0,s:0,l:0};i.getHSL(a),i.setHSL(a.h,Math.max(.15,a.s*.5),Math.min(.75,a.l+.15)),this._metaAlbumMesh.color=i.getHex()}}setAspect(e,t){const i=t/e;Math.abs(i-this._aspectX)>.001&&(this._aspectX=i,this.ready&&this.doLayout())}setCurrentTime(e){this.lastTime=e,this.lastTimeStamp=performance.now(),e>.1&&(this._trackStarted=!0)}onSeek(e){this._onSeek=e}setTrackMeta(e,t){this._metaGroup&&(this._metaArtistMesh&&(this._metaArtistMesh.dispose(),this._metaArtistMesh=null),this._metaAlbumMesh&&(this._metaAlbumMesh.dispose(),this._metaAlbumMesh=null),this.group.remove(this._metaGroup),this._metaGroup=null);const i=e||"",a=t||"";if(!i&&!a){this._metaVisible=!1;return}this._metaGroup=new _r,this._metaGroup.layers.enable(0),this._metaGroup.layers.enable(1);const n=xi*.58;this._metaArtistMesh=new Vi,this._metaArtistMesh.text=i,this._metaArtistMesh.font=Xa,this._metaArtistMesh.fontSize=n,this._metaArtistMesh.unicodeFontsURL=qo,this._metaArtistMesh.fontWeight=800,this._metaArtistMesh.anchorX="left",this._metaArtistMesh.anchorY="bottom",this._metaArtistMesh.color=this._accentColor.getHex(),this._metaArtistMesh.transparent=!0,this._metaArtistMesh.sdfGlyphSize=128,this._metaArtistMesh.gpuAccelerateSDF=!0,this._metaArtistMesh.position.set(ra,0,ja),this._metaArtistMesh.layers.enable(0),this._metaArtistMesh.layers.enable(1),this._metaGroup.add(this._metaArtistMesh);const s=xi*.47;this._metaAlbumMesh=new Vi,this._metaAlbumMesh.text=a,this._metaAlbumMesh.font=Xa,this._metaAlbumMesh.fontSize=s,this._metaAlbumMesh.unicodeFontsURL=qo,this._metaAlbumMesh.fontWeight=800,this._metaAlbumMesh.anchorX="left",this._metaAlbumMesh.anchorY="top";const o=this._accentColor.clone(),l={h:0,s:0,l:0};o.getHSL(l),o.setHSL(l.h,Math.max(.15,l.s*.5),Math.min(.75,l.l+.15)),this._metaAlbumMesh.color=o.getHex(),this._metaAlbumMesh.transparent=!0,this._metaAlbumMesh.sdfGlyphSize=128,this._metaAlbumMesh.gpuAccelerateSDF=!0,this._metaAlbumMesh.position.set(ra,-n-.003,ja),this._metaAlbumMesh.layers.set(1),this._metaGroup.add(this._metaAlbumMesh),this.group.add(this._metaGroup),this._metaVisible=!0;const c=u=>{u.material&&(u.material.transparent=!0,u.material.depthWrite=!1,u.material.depthTest=!1)};this._metaArtistMesh.sync(()=>c(this._metaArtistMesh)),this._metaAlbumMesh.sync(()=>c(this._metaAlbumMesh))}updateMeta(){if(!this._metaGroup||!this._metaVisible)return;const e=this.lines[this.lines.length-1];let t;if(e){let o=0;for(const l of e.entries)l._baseY<o&&(o=l._baseY);t=e._baseY+o-e.fs*ud-Ai*1.5}else t=-.5;this._metaGroup.position.y=t+this.scrollY,this._metaGroup.position.x=this._leftEdge;const i=this._metaGroup.position.y;let a=1;i>1.2||i<-1.8?a=0:i>.9?a=Math.max(0,(1.2-i)/.3):i<-1.3&&(a=Math.max(0,(i+1.8)/.5));const n=.9*a*this.opacity,s=.55*a*this.opacity;if(this._metaArtistMesh?.material)if(this._metaArtistMesh.material.opacity=n,n>.1){this._metaArtistMesh.layers.enable(0);const o=1+.6*a,l=this._accentColor;this._metaArtistMesh.color=new he(l.r*o,l.g*o,l.b*o)}else this._metaArtistMesh.layers.disable(0),this._metaArtistMesh.color=this._accentColor.clone();this._metaAlbumMesh?.material&&(this._metaAlbumMesh.material.opacity=s)}handleWheel(e){if(this.manualScrollOffset+=e*9e-4,this.lines.length>1){const t=this.lines[0]._baseY,i=this.lines[this.lines.length-1]._baseY,a=Math.max(0,this.activeLineIdx),n=this.lines[a]._baseY,s=Math.abs(i-n)+.5,o=Math.abs(n-t)+.3;this.manualScrollOffset=Math.max(-o,Math.min(s,this.manualScrollOffset))}this.scrollDecayTimer=3}handleClick(e,t){if(!this.ready||!this.lines.length||e<ra-.2)return;const i=e/(this._aspectX||1);let a=null,n=null,s=1/0;for(const o of this.lines){const l=o.group.position.y,c=o._cSc||1;for(const u of o.entries){if(u._isCueDot)continue;const h=l+(u._adBaseY||0)*c,d=o.group.position.x+u.base.position.x*c,f=Math.abs(t-h);if(f>o.fs*2.5)continue;const g=d,_=d+u._w*c,m=i<g?g-i:i>_?i-_:0,p=f+m*.5;p<s&&(s=p,a=u,n=o)}}if(a&&a.start!=null&&this._onSeek&&s<(n?.fs||.05)*1.5){console.log(`[LR-SEEK] word="${a.text}" \u2192 t=${a.start.toFixed(3)}`),this.manualScrollOffset=0,this.scrollDecayTimer=0,this._pendingSeekTime=a.start,this._onSeek(a.start),a._clickFlash=1;return}}update(e){if(Number.isFinite(e)&&e>=0){const x=this._antiStrobe;this._rmsEma+=(e-this._rmsEma)*x.rmsEmaLerp,this._rmsFloor<=0||this._rmsEma<this._rmsFloor?this._rmsFloor=this._rmsEma:this._rmsFloor+=(this._rmsEma-this._rmsFloor)*x.rmsFloorRiseLerp}if(this._dbgCount++,this._dbgCount%300,!this.lines.length||!this.ready){this.opacity+=(this.targetOpacity-this.opacity)*.15;return}const t=Math.min((performance.now()-this.lastTimeStamp)/1e3,.5);this.interpolatedTime=this.lastTime+t+.05;let i=this.interpolatedTime;const a=this.opacity<.5?.15:.05;this.opacity+=(this.targetOpacity-this.opacity)*a;const n=(this._translationVisible?1:0)-this._translationFactor;Math.abs(n)>.001&&(this._translationFactor+=n*.08,this.doLayout()),this.group.scale.x=this._aspectX*this._zenScale,this.group.scale.y=this._zenScale,this.group.position.x=this._zenOffsetX;const s=i-this.lastCt,o=s<-.3||s>2,l=this._pendingSeekTime!==null||o,c=this._pendingSeekTime??i;if(l&&(i=c,this.lastTimeStamp=performance.now(),this.interpolatedTime=c,this._pendingSeekTime=null),this.lastCt=i,l){let x=0;for(let v=0;v<this.lines.length;v++){const b=this.lines[v].ld;if(i>=b.start&&i<=b.end){x=v;break}i>b.end&&(x=v)}for(const v of this.lines)for(const b of v.entries)if(i>=b.end?b._p=1:i>=b.start?b._p=Math.min(1,(i-b.start)/(b.end-b.start)):b._p=0,b._clickFlash=0,b._wave=0,b._glow=0,b._scX=1,b._scY=1,!b._isCueDot)if(b._isCharSplit&&b._chars)for(const w of b._chars)w.base.scale.set(1,1,1),w.fill.scale.set(1,1,1),w._lerpScX=1,w._lerpScY=1,w._charGlow=0,w._charFilled=!1,w._baseX!==void 0&&(w.base.position.x=w._baseX,w.fill.position.x=w._baseX);else{if(b._p>=1)b.fill.clipRect=[-10,-10,100,10];else if(b._p<=0)b.fill.clipRect=[-10,-10,-10,10];else{const w=b._w*b._p,T=b._w*qa;b.fill.clipRect=[-.01,-10,w+T,10]}b.fill.layers.disable(0),b.fill.color=16777215,b._baseX!==void 0&&(b.base.position.x=b._baseX,b.fill.position.x=b._baseX)}this.manualScrollOffset=0,this.scrollDecayTimer=0,this.activeLineIdx=x}let u=-1;for(let x=this.lines.length-1;x>=0;x--){const v=this.lines[x].ld;if(i>=v.start){u=x;break}}if(u===-1&&this.lines.length>0&&i<this.lines[0].ld.start-.5&&(u=0),u>=0&&u<this.lines.length-1){const x=this.lines[u].ld.end,v=this.lines[u+1].ld.start;i>x&&i<v&&this.lines[u+1].isCue&&(u=u+1)}u===-1&&(u=this.activeLineIdx>=0?this.activeLineIdx:0);let h=new Set([u]);if(u>=0&&u<this.lines.length){const x=this.lines[u]._pairWith;if(x!=null&&x>=0&&x<this.lines.length){h.add(x);const v=this.lines[u].ld,b=Math.max(v.end,this.lines[x].ld.end);i<=b+.1&&(u=Math.min(u,x))}if(h.size>1){let v=0;for(const b of h)v=Math.max(v,this.lines[b].ld.end);i<=v+.1?u=Math.min(...h):h=new Set([u])}}this.activeLineIdx=u,u!==this._prevActiveIdx&&(this._activeChangeTime=performance.now(),this._prevActiveIdx=u);const d=1/60,f=1-Math.exp(-5*d),g=1-Math.exp(-2.5*d),_=1-Math.exp(-12*d);this.scrollDecayTimer>0?this.scrollDecayTimer-=d:(this.manualScrollOffset*=.95,Math.abs(this.manualScrollOffset)<.005&&(this.manualScrollOffset=0));const m=(u>=0&&u<this.lines.length?-this.lines[u]._baseY+this._activeLineY:this._activeLineY)+this.manualScrollOffset;this._prevScrollY=this.scrollY,this.scrollY+=(m-this.scrollY)*.08,this._scrollVel=this.scrollY-this._prevScrollY,this.updateMeta();const p=this.scrollDecayTimer>0;for(let x=0;x<this.lines.length;x++){const v=this.lines[x],b=h.has(x),w=v._pairWith!=null,T=w?!1:v.ad&&!v._standaloneAdlib,M=b?Ze.active:M1(x,u,T,p,w),E=!b&&x<u,O=b,S=M.op,C=M.sc,U=M.oy;if(v._tOp!==S||v._tSc!==C||v._tOy!==U){v._tOp=S,v._tSc=C,v._tOy=U;const y=x-u;if(Yi.killTweensOf(v,"_cOy,_cSc,_cOp"),E)p?Yi.to(v,{_cSc:1,_cOy:U,duration:.25,ease:"power3.out",overwrite:!0}):Yi.to(v,{_cOp:S,_cSc:1,_cOy:U,duration:.25,ease:"power3.out",overwrite:!0});else if(O)Yi.to(v,{_cOy:U,duration:.4,ease:"power2.out"}),Yi.to(v,{_cOp:S,duration:.25,ease:"power2.out"}),Yi.to(v,{_cSc:C,duration:.3,ease:"power2.out"});else{const B=y*.12+Math.sin(x*123.456)*.03,W=.35+y*.18;let I;y===1?I="power3.out":y===2?I="power2.out":y===3?I="power1.out":I="sine.out",Yi.to(v,{_cOy:U,duration:W,ease:I,delay:B,overwrite:"auto"}),Yi.to(v,{_cOp:S,duration:W*1.4,ease:"power1.out",delay:B+y*.04}),v._cSc=1}}v._cOp=Math.max(0,Math.min(1,v._cOp)),v.group.scale.set(v._cSc,v._cSc,1),v.group.position.x=this._leftEdge*(1-v._cSc);const N=Math.abs(x-u);let D,k;if(p){const y=v._baseY+v._cOy+this.scrollY,B=Math.abs(y-this._activeLineY),W=Math.min(3,Math.floor(B/Ai));D=this.scrollY,k=W===0?.4:W===1?.34:W===2?.28:.23}else if(N===0)D=this.scrollY,k=.5;else{const y=x>u?x-1:x+1,B=y>=0&&y<this.lines.length?this.lines[y]:null;D=B?B._scrollLag:this.scrollY,k=.3}v._scrollLag+=(D-v._scrollLag)*Math.min(1,k),v.group.position.y=v._baseY+v._cOy+v._scrollLag;const F=v.group.position.y;if(!(F>-1.5&&F<1.5)){v.group.visible=!1;continue}v.group.visible=!0;const X=.3;let Y=1;p||(F>1-X?Y=Math.max(0,(1-F)/X):F<-1+X&&(Y=Math.max(0,(F+1)/X)));const z=p?Math.max(v._cOp,.85)*Y:v._cOp*Y;let q=0;if(w){const y=v.ld.start,B=v.ld.end;i>=B?q=1:i>=y&&(q=(i-y)/(B-y))}for(const y of v.entries){i>=y.end?y._p=1:i>=y.start?y._p=Math.min(1,(i-y.start)/(y.end-y.start)):y._p=0,y._p>0&&y._p<1;const B=y._p>=1,W=y.wt==="stretch";if((!y.ad||w||v._standaloneAdlib)&&(y._tOp=z,E?y._cop=z:y._cop+=(y._tOp-y._cop)*f),y._clickFlash&&y._clickFlash>.01?y._clickFlash*=1-_:y._clickFlash=0,v.isCue&&y._isCueDot){const K=y.base,L=y.fill,Ae=K.material,me=L.material;if(L.scale.set(0,0,1),me.opacity=0,L.layers.disable(0),!this._trackStarted){K.scale.set(1,1,1),Ae.opacity=.3*y._cop*this.opacity,Ae.color.setRGB(1,1,1),K.layers.enable(0),K.layers.disable(1);continue}const pe=.8,ue=v.ld.end,Se=ue-pe,oe=Math.min(y.end,Se);let ge;i>=oe?ge=1:i>=y.start?ge=Math.min(1,(i-y.start)/Math.max(.01,oe-y.start)):ge=0;const ye=v.entries.every(R=>i>=Math.min(R.end,Se));if(i>=ue)K.scale.set(.01,.01,1),Ae.opacity=0,Ae.color.setRGB(1,1,1);else if(i>=Se&&ye){const R=(i-Se)/pe,A=Math.max(0,1-R*R),H=.15;let G;R<H?G=1+.25*(R/H):G=1.25*(1-(R-H)/(1-H)),G=Math.max(.01,G),K.scale.set(G,G,1),Ae.opacity=A*y._cop*this.opacity,K.layers.enable(0),K.layers.enable(1);const te=1+.2*A;Ae.color.setRGB(te,te,te)}else if(K.position.y=0,Ae.color.setRGB(1,1,1),ge>0){const R=O?.4:.2,A=R+(1-R)*ge;K.scale.set(1,1,1),Ae.opacity=A*y._cop*this.opacity,K.layers.enable(0),K.layers.disable(1),Ae.color.setRGB(1,1,1),ye&&(Ae.color.setRGB(1.05,1.05,1.05),K.layers.enable(1))}else{K.layers.enable(0),K.layers.disable(1);const R=O?.4:.2;Ae.opacity=R*y._cop*this.opacity,K.scale.set(1,1,1)}continue}if(y.ad&&!O&&!w)if(y._tOp=0,y._cop+=(y._tOp-y._cop)*_,y._cop<.01&&(y._cop=0),y._isCharSplit&&y._chars)for(const K of y._chars)K.base.material.opacity=Ni*y._cop*this.opacity,K.fill.material.opacity=Ni*y._cop*this.opacity;else y._isCueDot||(y.base.material.opacity=Ni*y._cop*this.opacity,y.fill.material.opacity=Ni*y._cop*this.opacity);if(y._isCharSplit&&y._chars){const K=y._charCount,L=(y.end-y.start)*.15,Ae=y.end+L-y.start,me=y._p,pe=Ae>0?Math.max(0,Math.min(1,(i-y.start)/Ae)):0,ue=pe*(K-1),Se=2.2;let oe=0;const ge=[];for(let H=0;H<K;H++)ge.push(oe),oe+=y._charWidths[H]||v.fs*.5;const ye=oe,R=ye*me,A=ye*qa;for(let H=0;H<K;H++){const G=y._chars[H],te=y._charWidths[H]||v.fs*.5,J=ge[H],Ce=H-ue,fe=pe>0&&pe<1?Math.exp(-(Ce*Ce)/(2*Se*Se)):0,ce=w&&O?.7:1;if(E)G.base.material.opacity=0,G.fill.material.opacity=ta*y._cop*this.opacity,G.fill.clipRect&&(G.fill.clipRect=null);else if(!O&&!w)G.base.material.opacity=Ni*y._cop*this.opacity,G.fill.material.opacity=ta*y._cop*this.opacity,G.fill.clipRect=[-10,-10,-10,10];else{G.base.material.opacity=Ni*y._cop*ce*this.opacity;const Oe=ta*y._cop*ce*this.opacity;if(B)G.fill.material.opacity=Oe,G.fill.clipRect&&(G.fill.clipRect=null);else if(me<=0)G.fill.material.opacity=Oe,G.fill.clipRect=[-10,-10,-10,10];else{G.fill.material.opacity=Oe;const j=R+A-J;j<=0?G.fill.clipRect=[-10,-10,-10,10]:j>=te?G.fill.clipRect&&(G.fill.clipRect=null):G.fill.clipRect=[-.01,-10,j,10]}}const ve=1+.16*fe,Ne=1+.03*fe,de=G._lerpScY??1,qe=G._lerpScX??1,Ee=1-Math.exp(-3.5*d),we=de+(ve-de)*Ee,Pe=qe+(Ne-qe)*Ee;G._lerpScY=we,G._lerpScX=Pe,G.base.scale.set(Pe,we,1),G.fill.scale.set(Pe,we,1);const De=(we-1)*v.fs*.5;G.base.position.y=(y._adBaseY||0)+De,G.fill.position.y=(y._adBaseY||0)+De,G.base.position.x=G._baseX,G.fill.position.x=G._baseX;const Be=J+te;(me>=1||Be<=R)&&!G._charFilled&&(G._charFilled=!0),fe>.2?G._charGlow=.6:G._charFilled&&O?((!G._charGlow||G._charGlow<.3)&&(G._charGlow=.3),G._charGlow*=.999):!O&&G._charGlow>0&&(G._charGlow*=.97,G._charGlow<.01&&(G._charGlow=0)),fe>y._glow?y._glow=fe:y._glow*=.95;const Re=G._charGlow||0;if(Re>.01){const Oe=1+.35*Re;G.fill.color=new he(Oe,Oe,Oe),G.fill.layers.enable(0)}else G.fill.color=16777215,G.fill.layers.disable(0)}if(y.ad&&v.hasInlineAdlibs&&v._adPhrases){const H=v._adPhrases,G=y._adPhraseIdx||0,te=H[G],J=v._adLastEnd||0,Ce=te.start-i;if(!(!(!O&&i>J)&&i>=te.start-.3))y._tOp=0;else if(Ce>0&&Ce<=.3){const ce=1-Ce/.3;y._tOp=ce*ce*.4*z}else y._tOp=.45*z;const fe=y._tOp<y._cop?_:f;y._cop+=(y._tOp-y._cop)*fe,y._cop<.01&&(y._cop=0);for(const ce of y._chars)ce.base.material.opacity=Ni*y._cop*this.opacity,ce.fill.material.opacity=ta*y._cop*this.opacity}continue}const I=w&&O?.7:1,V=E?0:Ni*y._cop*I*this.opacity;let Q=ta*y._cop*I*this.opacity;if(y._clickFlash&&y._clickFlash>0&&(Q=Math.min(1,Q+.5*y._clickFlash)),y.base.material&&(y.base.material.opacity=V),y.fill.material&&(y.fill.material.opacity=Q),E||B)y.fill.clipRect=[-10,-10,100,10];else if(w&&O)if(q>=1)y.fill.clipRect=[-10,-10,100,10];else if(q<=0)y.fill.clipRect=[-10,-10,-10,10];else{const K=v.entries[v.entries.length-1],L=K.base.position.x-v.entries[0].base.position.x+K._w,Ae=v.entries[0].base.position.x+L*q,me=L*qa,pe=y.base.position.x,ue=Ae+me-pe;ue<=0?y.fill.clipRect=[-10,-10,-10,10]:ue>=y._w?y.fill.clipRect=[-10,-10,100,10]:y.fill.clipRect=[-.01,-10,ue,10]}else if(y._p<=0)y.fill.clipRect=[-10,-10,-10,10];else{const K=y._w*y._p,L=y._w*qa;y.fill.clipRect=[-.01,-10,K+L,10]}if(W){const K=y.end-y.start,L=K*.3,Ae=y.end+L;if(i>=y.start&&i<Ae){const me=Ae-y.start,pe=Math.max(0,Math.min(1,(i-y.start)/me)),ue=Math.pow(Math.sin(pe*Math.PI),.6),Se=Math.max(1.5,3.5/Math.max(.3,K)),oe=(i-y.start)*Se*Math.PI*2,ge=Math.sin(oe),ye=ue*ge;y._wave+=(ye-y._wave)*Math.min(1,d*8)}else i>=Ae?y._wave+=(0-y._wave)*Math.min(1,d*4):y._wave+=(0-y._wave)*g}else y._wave+=(0-y._wave)*g;let ee=1,ie=1;const le=Math.abs(y._wave);le>.01?(ie=1+.08*le,ee=1+.03*le,y._glow+=(le-y._glow)*.18):O&&y._p>0?y._glow<.15&&(y._glow=.15):(y._glow*=.97,y._glow<.001&&(y._glow=0));const Me=y._wave*xi*.18;if(W&&y._glow>.003&&!y._isCueDot){const K=1+.25*y._glow;y.fill.color=new he(K,K,K),y.fill.layers.enable(0)}else y.fill.color=16777215,y.fill.layers.disable(0);if(y._scX+=(ee-y._scX)*f,y._scY+=(ie-y._scY)*f,y.base.scale.set(y._scX,y._scY,1),y.fill.scale.set(y._scX,y._scY,1),!y.ad||!v.hasInlineAdlibs){const K=y._adBaseY||0,L=(y._scY-1)*v.fs*.5;y.base.position.y=K+L,y.fill.position.y=K+L,y._baseX===void 0&&(y._baseX=y.base.position.x),y.base.position.x=(y._baseX??0)+Me,y.fill.position.x=(y._baseX??0)+Me}if(y.ad&&v.hasInlineAdlibs&&v._adPhrases){const K=v._adPhrases,L=y._adPhraseIdx||0,Ae=K[L],me=v._adLastEnd||0,pe=Ae.start-i;let ue;if(!O&&i>me?ue=!1:i>=Ae.start-.3?ue=!0:ue=!1,!ue)y._tOp=0;else if(pe>0&&pe<=.3){const oe=1-pe/.3;y._tOp=oe*oe*.4*z}else y._tOp=.45*z;const Se=y._tOp<y._cop?_:f;if(y._cop+=(y._tOp-y._cop)*Se,y._cop<.01&&(y._cop=0),y.base.position.y+=((y._adBaseY||0)-y.base.position.y)*f,y.fill.position.y=y.base.position.y,y.base.material.opacity=Ni*y._cop*this.opacity,y.fill.material.opacity=ta*y._cop*this.opacity,E||B)y.fill.clipRect=[-10,-10,100,10];else if(y._p<=0)y.fill.clipRect=[-10,-10,-10,10];else{const oe=y._w*y._p,ge=y._w*qa;y.fill.clipRect=[-.01,-10,oe+ge,10]}}else if(y.ad&&v.ad&&!v._standaloneAdlib){const K=y.start-i;if(i>y.end){const L=i-y.end,Ae=Math.max(0,1-L/.25);y._tOp=Ae*.35*z}else if(y._p>0)y._tOp=.4*z;else if(K<=.35&&K>0){const L=1-K/.35;y._tOp=L*L*.3*z}else y._tOp=0;if(y._cop+=(y._tOp-y._cop)*f,y._cop<.01&&(y._cop=0),y.base.position.y+=((y._adBaseY||0)-y.base.position.y)*f,y.fill.position.y=y.base.position.y,y.base.material.opacity=Ni*y._cop*this.opacity,y.fill.material.opacity=ta*y._cop*this.opacity,E||B)y.fill.clipRect=[-10,-10,100,10];else if(y._p<=0)y.fill.clipRect=[-10,-10,-10,10];else{const L=y._w*y._p,Ae=y._w*qa;y.fill.clipRect=[-.01,-10,L+Ae,10]}}}}if(this._translationMeshes.length)for(let x=0;x<this.lines.length;x++){const v=this._translationMeshes[x];if(!v?.material)continue;const b=this.lines[x],w=h.has(x),T=x-u;let M;p?M=.5:w?M=.4:x<u||T===1?M=.5:T===2?M=.4:T===3||T===4?M=.3:M=.2;const E=p?Math.max(b._cOp,.85):b._cOp;v.material.opacity=M*this._translationFactor*E*this.opacity}this.debugPeriodicDump(i,u)}addToScene(e){e.add(this.group)}removeFromScene(e){e.remove(this.group)}dispose(){this.disposeLines()}debugReadPixel(e,t,i){try{const a=e.getContext(),n=e.getPixelRatio(),s=Math.floor(t*n),o=Math.floor((e.domElement.height/n-i)*n),l=new Uint8Array(4);return a.readPixels(s,o,1,1,a.RGBA,a.UNSIGNED_BYTE,l),{r:l[0],g:l[1],b:l[2],a:l[3]}}catch(a){return console.warn("[LR-DEBUG] readPixels failed:",a),null}}debugInspectClick(e,t,i,a,n){if(console.log("%c[LR-INSPECT] \u2550\u2550\u2550 PIXEL COLOR PICKER \u2550\u2550\u2550","color: #0ff; font-weight: bold; font-size: 14px"),console.log(`  ready=${this.ready} lines=${this.lines.length} ndcX=${e.toFixed(3)} ndcY=${t.toFixed(3)}`),!this.ready||!this.lines.length){console.log("  %cNo lyrics loaded or not ready yet","color: #f80"),console.log("%c[LR-INSPECT] \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550","color: #0ff");return}const s=i.domElement.getBoundingClientRect(),o=a-s.left,l=n-s.top,c=this.debugReadPixel(i,o,l),u=c?`rgba(${c.r},${c.g},${c.b},${c.a})`:"FAILED",h=[];if(c)for(let x=-2;x<=2;x++)for(let v=-2;v<=2;v++){const b=this.debugReadPixel(i,o+v*2,l+x*2);b&&b.a>0&&h.push(`(${b.r},${b.g},${b.b},${b.a})`)}const d=e/(this._aspectX||1);let f=null,g=null,_=1/0,m=-1;for(let x=0;x<this.lines.length;x++){const v=this.lines[x],b=v.group.position.y,w=v._cSc||1;for(const T of v.entries){if(T._isCueDot)continue;const M=b+(T._adBaseY||0)*w,E=v.group.position.x+T.base.position.x*w,O=Math.abs(t-M);if(O>v.fs*2)continue;const S=E+T._w*w,C=O+Math.abs(d-(E+S)/2)*.3;C<_&&(_=C,f=T,g=v,m=x)}}const p=this.activeLineIdx;if(console.log(`  Canvas pos: (${o.toFixed(0)}, ${l.toFixed(0)})  NDC: (${e.toFixed(3)}, ${t.toFixed(3)})`),console.log(`  %cActual rendered pixel: ${u}`,`color: rgb(${c?.r},${c?.g},${c?.b}); font-weight: bold; font-size: 13px; background: #222; padding: 2px 8px`),h.length&&console.log(`  5\xD75 non-transparent samples (${h.length}): ${h.slice(0,8).join(" ")}`),console.log(`  Global opacity: ${this.opacity.toFixed(3)}, aspectX: ${this._aspectX.toFixed(3)}, scrollY: ${this.scrollY.toFixed(3)}`),f&&g){const x=f,v=g,b=m<p?`PAST(${p-m})`:m===p?"ACTIVE":`FUTURE(${m-p})`;if(console.log(`  %cWord: "${x.text}" | line #${m} ${b} | wt=${x.wt} ad=${x.ad}`,"color: #ff0; font-weight: bold"),console.log(`  Line state: cOp=${v._cOp.toFixed(4)} cSc=${v._cSc.toFixed(4)} cOy=${v._cOy.toFixed(4)} tOp=${v._tOp.toFixed(4)}`),console.log(`  Word state: _p=${x._p.toFixed(4)} _cop=${x._cop.toFixed(4)} _tOp=${x._tOp.toFixed(4)} _wave=${x._wave.toFixed(4)} _glow=${x._glow.toFixed(4)}`),console.log(`  Word time: start=${x.start.toFixed(3)} end=${x.end.toFixed(3)} dur=${(x.end-x.start).toFixed(3)}`),x._isCharSplit&&x._chars){console.log(`  CHAR-SPLIT: ${x._charCount} chars`);for(const w of x._chars){const T=w.base?.material?.opacity,M=w.fill?.material?.opacity,E=w.fill?.color,O=E?.isColor?`rgb(${(E.r*255).toFixed(0)},${(E.g*255).toFixed(0)},${(E.b*255).toFixed(0)})`:String(E),S=w.fill?.clipRect?`[${w.fill.clipRect.map(U=>U.toFixed(2)).join(",")}]`:"null",C=w.fill?.scale?`(${w.fill.scale.x.toFixed(3)},${w.fill.scale.y.toFixed(3)})`:"?";console.log(`    char[${w.idx}]: base.op=${T?.toFixed(4)} fill.op=${M?.toFixed(4)} fill.col=${O} fill.scale=${C} clip=${S}`)}}else{const w=x.base?.material?.opacity,T=x.fill?.material?.opacity,M=x.base?.color,E=x.fill?.color,O=M?.isColor?`rgb(${(M.r*255).toFixed(0)},${(M.g*255).toFixed(0)},${(M.b*255).toFixed(0)})`:String(M),S=E?.isColor?`rgb(${(E.r*255).toFixed(0)},${(E.g*255).toFixed(0)},${(E.b*255).toFixed(0)})`:String(E),C=x.fill?.clipRect?`[${x.fill.clipRect.map(N=>N.toFixed(2)).join(",")}]`:"null",U=x.fill?.scale?`(${x.fill.scale.x.toFixed(2)},${x.fill.scale.y.toFixed(2)})`:"?";console.log(`  base: opacity=${w?.toFixed(4)} color=${O}`),console.log(`  fill: opacity=${T?.toFixed(4)} color=${S} clipRect=${C} scale=${U}`),console.log(`  scale: (${x._scX.toFixed(3)}, ${x._scY.toFixed(3)}) layers: fill.mask=${x.fill?.layers?.mask}`)}if(c&&c.a>0){const w=Math.round(255*(x._isCharSplit,Ni)*x._cop*this.opacity),T=Math.round((c.r+c.g+c.b)/3);console.log(`  %cExpected brightness ~${w} | Actual pixel brightness ~${T} | Delta: ${T-w}`,Math.abs(T-w)>20?"color: #f00; font-weight: bold":"color: #0f0")}}else console.log("  %cNo word found near click","color: #f80; font-weight: bold");console.log("%c[LR-INSPECT] \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550","color: #0ff")}debugPeriodicDump(e,t){if(!this._debugEnabled||e-this._debugLastDump<5)return;this._debugLastDump=e;const i=Math.max(0,t-2),a=Math.min(this.lines.length-1,t+5);console.log(`%c[LR-DUMP] t=${e.toFixed(2)} active=#${t} globalOp=${this.opacity.toFixed(3)} scrollY=${this.scrollY.toFixed(3)}`,"color: #0ff; font-weight: bold");for(let n=i;n<=a;n++){const s=this.lines[n];if(!s||s.isCue)continue;const o=n<t?`past(${t-n})`:n===t?"ACTIVE":`fut(${n-t})`,l=s.entries.filter(c=>!c._isCueDot).map(c=>{if(c._isCharSplit&&c._chars){const u=c._chars[0],h=u.fill?.scale?`(${u.fill.scale.x.toFixed(2)},${u.fill.scale.y.toFixed(2)})`:"?";return`"${c.text}"[${c.wt}] bOp=${u.base?.material?.opacity?.toFixed(3)||"?"} fOp=${u.fill?.material?.opacity?.toFixed(3)||"?"} fSc=${h} clip=${u.fill?.clipRect?"Y":"N"} p=${c._p.toFixed(2)}`}else{const u=c.fill?.scale?`(${c.fill.scale.x.toFixed(2)},${c.fill.scale.y.toFixed(2)})`:"?";return`"${c.text}"[${c.wt}] bOp=${c.base?.material?.opacity?.toFixed(3)||"?"} fOp=${c.fill?.material?.opacity?.toFixed(3)||"?"} fSc=${u} clip=${c.fill?.clipRect?c.fill.clipRect[2]>0?"open":"shut":"null"} p=${c._p.toFixed(2)}`}});console.log(`  #${n} ${o.padEnd(8)} cOp=${s._cOp.toFixed(3)} | ${l.join(" | ")}`)}}setDebug(e){this._debugEnabled=e,console.log(`[LyricsRenderer] Debug mode ${e?"ON \u2014 Shift+Click to inspect, logs every 5s":"OFF"}`)}setTranslations(e){this._translations=Array.isArray(e)?e:[];for(const a of this._translationMeshes)a&&a.dispose();if(this._translationMeshes=[],!this.lines.length||!this._translations.length)return;const t=xi*.55;let i=0;for(let a=0;a<this.lines.length;a++){const n=this.lines[a];if(n.isCue){this._translationMeshes.push(null);continue}const s=this._translations[i]||"";if(i++,!s){this._translationMeshes.push(null);continue}const o=new Vi;o.text=s,o.font=Xa,o.fontSize=t,o.maxWidth=jo,o.unicodeFontsURL=qo,o.fontWeight=800,o.fontStyle="italic",o.anchorX="left",o.anchorY="top",o.color=16777215,o.transparent=!0,o.sdfGlyphSize=64,o.gpuAccelerateSDF=!0,o.layers.set(1);let l=0;for(const u of n.entries){const h=u._baseY||0,d=u._adBaseY||0;!u.ad&&h<l&&(l=h),u.ad&&d<l&&(l=d)}let c=l;if(n.hasInlineAdlibs)for(const u of n.entries)u.ad&&(u._adBaseY||0)<c&&(c=u._adBaseY||0);if(n._pairWith!=null&&n._pairRole==="first"){const u=this.lines[n._pairWith];if(u)for(const h of u.entries){const d=h._baseY||0;d<c&&(c=d)}}o.position.set(ra,c-n.fs*.6,ja),n.group.add(o),o.sync(()=>{o.material&&(o.material.transparent=!0,o.material.depthWrite=!1,o.material.depthTest=!1,o.material.opacity=0)}),this._translationMeshes.push(o)}}setTranslationsVisible(e){this._translationVisible=e}}class st{constructor(){this._dimBlurMaterial=null,this._baseResolution=null,this.scene=new So,this.camera=new ui(75,window.innerWidth/window.innerHeight,.1,1e3)}resize(e,t,i){if(this.camera instanceof ui&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix()),this._dimBlurMaterial?.uniforms.u_resolution){const a=i||window.devicePixelRatio||1;this._baseResolution=new Ue(e*a,t*a)}}enableDimBlur(e){if(this._dimBlurMaterial=e,e.uniforms.u_resolution){const a=e.uniforms.u_resolution.value;this._baseResolution=new Ue(a.x,a.y)}e.uniforms.u_dim={value:0},e.uniforms.u_blur={value:0};let t=e.fragmentShader;t=t.replace(/\n\s*gl_FragColor\.rgb \*= \(1\.0 - u_dim\);/g,"");const i=t.lastIndexOf("}");e.fragmentShader=`uniform float u_dim;
uniform float u_blur;
`+t.substring(0,i)+`
  gl_FragColor.rgb *= (1.0 - u_dim);
}`,e.needsUpdate=!0}setDim(e){if(this._dimBlurMaterial){this._dimBlurMaterial.uniforms.u_dim.value=e;return}this.scene.traverse(t=>{const i=t.material;if(i&&i.isShaderMaterial&&i.fragmentShader)if(i.uniforms.u_dim)i.uniforms.u_dim.value=e;else{i.uniforms.u_dim={value:e};let a=i.fragmentShader;if(!a.includes("u_dim")){const n=a.lastIndexOf("}");i.fragmentShader=`uniform float u_dim;
`+a.substring(0,n)+`
  gl_FragColor.rgb *= (1.0 - u_dim);
}`,i.needsUpdate=!0}}})}setBlur(e){if(this._dimBlurMaterial&&(this._dimBlurMaterial.uniforms.u_blur.value=e,this._dimBlurMaterial.uniforms.u_resolution&&this._baseResolution)){const t=Math.max(.05,1-e*.85);this._dimBlurMaterial.uniforms.u_resolution.value.set(this._baseResolution.x*t,this._baseResolution.y*t)}}}var lt=`varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,T1=`precision highp float;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
varying vec2 vUv;

vec4 qMul(vec4 a, vec4 b) {
  return vec4(
    a.x*b.x - a.y*b.y - a.z*b.z - a.w*b.w,
    a.x*b.y + a.y*b.x + a.z*b.w - a.w*b.z,
    a.x*b.z - a.y*b.w + a.z*b.x + a.w*b.y,
    a.x*b.w + a.y*b.z - a.z*b.y + a.w*b.x
  );
}

float julia4D(vec3 p, vec4 c) {
  vec4 z = vec4(p, 0.0);
  float md2 = 1.0;
  float mz2 = dot(z, z);

  for (int i = 0; i < 8; i++) {
    md2 *= 4.0 * mz2;
    z = qMul(z, z) + c;
    mz2 = dot(z, z);
    if (mz2 > 4.0) break;
  }

  return 0.25 * sqrt(mz2 / md2) * log(mz2);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  
  vec3 ro = vec3(0.0, 0.0, 2.5);
  vec3 rd = normalize(vec3(uv, -1.5));

  
  vec4 c = vec4(
    -0.2 + u_bass * 0.6 * sin(u_time * 0.3),
    0.6 + u_bass * 0.3 * cos(u_time * 0.2),
    0.2 + u_bass * 0.2 * sin(u_time * 0.5),
    -0.5 + u_bass * 0.4
  );

  
  float t = 0.0;
  vec3 col = vec3(0.0);

  for (int i = 0; i < 64; i++) {
    vec3 p = ro + rd * t;
    float d = julia4D(p, c);
    if (d < 0.002) {
      
      float glow = 1.0 - float(i) / 64.0;
      float colorIdx = glow * 2.0;
      vec3 baseCol = colorIdx < 1.0 ? mix(u_colors[0], u_colors[1], colorIdx) : mix(u_colors[1], u_colors[2], colorIdx - 1.0);
      col = baseCol * (0.4 + glow * 0.8);
      break;
    }
    t += d * 0.8;
    if (t > 10.0) break;
  }

  
  col += u_colors[2] * u_treble * 0.3;

  
  vec3 bg = u_colors[0] * 0.15 + u_colors[2] * 0.05 * (1.0 - length(uv));
  float hit = step(0.01, length(col));
  col = mix(bg, col, hit);

  gl_FragColor = vec4(col, 1.0);
}`;class E1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:T1,uniforms:{u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(1705267),new he(4856130),new he(996448)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_treble.value=e.treble}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var A1=`precision highp float;
uniform sampler2D u_positions;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform vec2 u_resolution;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec3 pos = texture2D(u_positions, uv).xyz;

  
  float sigma = 10.0;
  float rho = 28.0 + u_bass * 20.0;
  float beta = 8.0 / 3.0;

  float dt = 0.001 + u_treble * 0.005;

  float dx = sigma * (pos.y - pos.x);
  float dy = pos.x * (rho - pos.z) - pos.y;
  float dz = pos.x * pos.y - beta * pos.z;

  pos += vec3(dx, dy, dz) * dt;

  gl_FragColor = vec4(pos, 1.0);
}`,R1=`uniform sampler2D u_positions;
uniform float u_bass;
attribute vec2 a_ref;
varying vec3 vColor;

void main() {
  vec3 pos = texture2D(u_positions, a_ref).xyz;
  
  pos *= 0.03 * (1.0 + u_bass * 0.5);
  vColor = normalize(abs(pos)) * 0.8 + 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 3.0;
}`,C1=`varying vec3 vColor;
void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
  gl_FragColor = vec4(vColor, alpha);
}`;const Mt=512;class D1 extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.scene.background=new he(328208),this.camera.position.z=3;const t=new Float32Array(Mt*Mt*4);for(let l=0;l<Mt*Mt;l++)t[l*4]=(Math.random()-.5)*50,t[l*4+1]=(Math.random()-.5)*50,t[l*4+2]=Math.random()*50,t[l*4+3]=1;const i=new xr(t,Mt,Mt,1023,1015);i.needsUpdate=!0;const a={minFilter:1003,magFilter:1003,format:1023,type:1015};this.rt1=new bt(Mt,Mt,a),this.rt2=new bt(Mt,Mt,a),this.simCamera=new it(-1,1,1,-1,0,1),this.simScene=new So,this.simMaterial=new He({vertexShader:lt,fragmentShader:A1,uniforms:{u_positions:{value:i},u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_resolution:{value:new Ue(Mt,Mt)}}});const n=new Xe(new Je(2,2),this.simMaterial);this.simScene.add(n),e.setRenderTarget(this.rt1),e.render(this.simScene,this.simCamera),e.setRenderTarget(null);const s=new Float32Array(Mt*Mt*2);for(let l=0;l<Mt;l++)for(let c=0;c<Mt;c++){const u=l*Mt+c;s[u*2]=c/Mt,s[u*2+1]=l/Mt}const o=new yi;o.setAttribute("position",new li(new Float32Array(Mt*Mt*3),3)),o.setAttribute("a_ref",new li(s,2)),this.renderMaterial=new He({vertexShader:R1,fragmentShader:C1,uniforms:{u_positions:{value:this.rt1.texture},u_bass:{value:0}},transparent:!0,depthWrite:!1}),this.particles=new Vg(o,this.renderMaterial),this.scene.add(this.particles),this.gpuCompute={rt1:this.rt1,rt2:this.rt2,simMat:this.simMaterial,mesh:n}}update(e,t){const i=this.flip?this.rt2:this.rt1,a=this.flip?this.rt1:this.rt2;this.simMaterial.uniforms.u_positions.value=i.texture,this.simMaterial.uniforms.u_time.value=t,this.simMaterial.uniforms.u_bass.value=e.bass,this.simMaterial.uniforms.u_treble.value=e.treble,this.renderer.setRenderTarget(a),this.renderer.render(this.simScene,this.simCamera),this.renderer.setRenderTarget(null),this.renderMaterial.uniforms.u_positions.value=a.texture,this.renderMaterial.uniforms.u_bass.value=e.bass,this.flip=!this.flip,this.camera.position.x=Math.sin(t*.1)*3,this.camera.position.z=Math.cos(t*.1)*3,this.camera.lookAt(0,0,0)}dispose(){this.rt1.dispose(),this.rt2.dispose(),this.simMaterial.dispose(),this.renderMaterial.dispose()}}var P1=`uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform sampler2D u_freqData;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normal;
  vec3 pos = position;

  
  float theta = atan(pos.y, pos.x);
  float phi = acos(pos.z / length(pos));

  
  float freq = texture2D(u_freqData, vec2(theta / 6.2832 + 0.5, 0.5)).r;

  
  float disp = freq * u_bass * 0.5 + sin(phi * 8.0 + u_time * 2.0) * u_mid * 0.2;
  pos += normal * disp;

  vPosition = pos;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,U1=`uniform float u_time;
uniform float u_treble;
uniform vec3 u_colors[3];
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 light = normalize(vec3(1.0, 1.0, 2.0));
  float diff = max(dot(vNormal, light), 0.0);
  vec3 viewDir = normalize(-vPosition);
  vec3 reflectDir = reflect(-light, vNormal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

  
  float normMix = dot(vNormal, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
  vec3 baseCol = normMix < 0.5 ? mix(u_colors[0], u_colors[1], normMix * 2.0) : mix(u_colors[1], u_colors[2], (normMix - 0.5) * 2.0);
  vec3 col = baseCol * (0.3 + diff * 0.7) + u_colors[2] * spec * (0.5 + u_treble);
  col += u_colors[0] * 0.08;
  gl_FragColor = vec4(col, 1.0);
}`;class L1 extends st{constructor(){super(),this.scene.background=new he(196882),this.camera.position.z=3,this.freqData=new Uint8Array(256),this.freqTexture=new xr(this.freqData,256,1,1028,1009),this.freqTexture.needsUpdate=!0,this.material=new He({vertexShader:P1,fragmentShader:U1,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_freqData:{value:this.freqTexture},u_colors:{value:[new he(196882),new he(1718906),new he(8247039)]}}});const e=new Xe(new zl(1,128,128),this.material);this.scene.add(e),this.scene.add(new Yg(1118498))}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble;for(let i=0;i<256;i++){const a=i/256;this.freqData[i]=Math.floor((e.bass*(1-a)+e.treble*a)*255*(.5+.5*Math.sin(a*20+t*3)))}this.freqTexture.needsUpdate=!0}dispose(){this.material.dispose(),this.freqTexture.dispose()}}var I1=`precision highp float;
uniform sampler2D u_state;
uniform vec2 u_resolution;
uniform float u_bass;
uniform float u_treble;
uniform float u_time;
varying vec2 vUv;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec4 state = texture2D(u_state, vUv);
  float a = state.r;
  float b = state.g;

  
  float la = -a;
  float lb = -b;
  la += texture2D(u_state, vUv + vec2(texel.x, 0.0)).r * 0.2;
  la += texture2D(u_state, vUv - vec2(texel.x, 0.0)).r * 0.2;
  la += texture2D(u_state, vUv + vec2(0.0, texel.y)).r * 0.2;
  la += texture2D(u_state, vUv - vec2(0.0, texel.y)).r * 0.2;
  la += texture2D(u_state, vUv + texel).r * 0.05;
  la += texture2D(u_state, vUv - texel).r * 0.05;
  la += texture2D(u_state, vUv + vec2(texel.x, -texel.y)).r * 0.05;
  la += texture2D(u_state, vUv + vec2(-texel.x, texel.y)).r * 0.05;

  lb += texture2D(u_state, vUv + vec2(texel.x, 0.0)).g * 0.2;
  lb += texture2D(u_state, vUv - vec2(texel.x, 0.0)).g * 0.2;
  lb += texture2D(u_state, vUv + vec2(0.0, texel.y)).g * 0.2;
  lb += texture2D(u_state, vUv - vec2(0.0, texel.y)).g * 0.2;
  lb += texture2D(u_state, vUv + texel).g * 0.05;
  lb += texture2D(u_state, vUv - texel).g * 0.05;
  lb += texture2D(u_state, vUv + vec2(texel.x, -texel.y)).g * 0.05;
  lb += texture2D(u_state, vUv + vec2(-texel.x, texel.y)).g * 0.05;

  
  float f = 0.037 + u_bass * 0.03;
  float k = 0.06 + u_treble * 0.02;
  float Da = 1.0;
  float Db = 0.5;

  float abb = a * b * b;
  float na = a + (Da * la - abb + f * (1.0 - a));
  float nb = b + (Db * lb + abb - (k + f) * b);

  gl_FragColor = vec4(clamp(na, 0.0, 1.0), clamp(nb, 0.0, 1.0), 0.0, 1.0);
}`;const Ht=512;class O1 extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.camera=new it(-1,1,1,-1,0,1);const t={minFilter:1006,magFilter:1006,format:1023,type:1015};this.rt1=new bt(Ht,Ht,t),this.rt2=new bt(Ht,Ht,t);const i=new Float32Array(Ht*Ht*4);for(let n=0;n<Ht*Ht;n++){const s=n%Ht/Ht-.5,o=Math.floor(n/Ht)/Ht-.5;i[n*4]=1,i[n*4+1]=Math.abs(s)<.05&&Math.abs(o)<.05?1:0,i[n*4+2]=0,i[n*4+3]=1}const a=new xr(i,Ht,Ht,1023,1015);a.needsUpdate=!0,this.simCamera=new it(-1,1,1,-1,0,1),this.simScene=new So,this.simMaterial=new He({vertexShader:lt,fragmentShader:I1,uniforms:{u_state:{value:a},u_resolution:{value:new Ue(Ht,Ht)},u_bass:{value:0},u_treble:{value:0},u_time:{value:0}}}),this.simScene.add(new Xe(new Je(2,2),this.simMaterial)),e.setRenderTarget(this.rt1),e.render(this.simScene,this.simCamera),e.setRenderTarget(null),this.displayMaterial=new gr({map:this.rt1.texture}),this.scene.add(new Xe(new Je(2,2),this.displayMaterial))}update(e,t){for(let i=0;i<8;i++){const a=this.flip?this.rt2:this.rt1,n=this.flip?this.rt1:this.rt2;this.simMaterial.uniforms.u_state.value=a.texture,this.simMaterial.uniforms.u_bass.value=e.bass,this.simMaterial.uniforms.u_treble.value=e.treble,this.simMaterial.uniforms.u_time.value=t,this.renderer.setRenderTarget(n),this.renderer.render(this.simScene,this.simCamera),this.flip=!this.flip}this.renderer.setRenderTarget(null),this.displayMaterial.map=(this.flip?this.rt2:this.rt1).texture,this.displayMaterial.needsUpdate=!0}dispose(){this.rt1.dispose(),this.rt2.dispose(),this.simMaterial.dispose(),this.displayMaterial.dispose()}}var F1=`precision highp float;
uniform float u_time;
uniform float u_rms;
uniform float u_mid;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;
varying vec2 vUv;

mat2 rot2(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 34.5);
    return fract(p.x * p.y);
}

float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i + vec2(0.0, 0.0));
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
        v += amp * vnoise(p);
        p = rot2(0.6) * p * 2.02;
        amp *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

    if (u_debug) {
        vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        if (duv.x < -0.3) {
            gl_FragColor = vec4(u_colors[0], 1.0);
            return;
        } else if (duv.x < 0.3) {
            gl_FragColor = vec4(u_colors[1], 1.0);
            return;
        } else {
            gl_FragColor = vec4(u_colors[2], 1.0);
            return;
        }
    }

    
    float smoothRms = u_rms * u_rms;
    float smoothMid = u_mid * u_mid;

    
    vec2 drift = vec2(
        sin(u_time * 0.17) + 0.45 * sin(u_time * 0.07 + 1.9),
        cos(u_time * 0.13 + 0.8) + 0.45 * cos(u_time * 0.05)
    ) * 0.06;
    uv += drift;

    float breathing = 1.32 + sin(u_time * 0.22) * 0.05 + sin(u_time * 0.55 + 1.2) * 0.02;
    float audioPulse = sin(u_time * 2.1) * smoothRms * 0.05;
    uv *= (breathing + audioPulse + u_rms * 0.04);

    float swirl = sin(u_time * 0.11) * 0.18 + smoothMid * 0.06;
    uv = rot2(swirl) * uv;

    float r = length(uv);
    if (r > 0.995) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    float n = 7.0;
    float angleStep = 6.2831853 / n;
    float geoR = 1.0 / cos(3.1415926 / n);
    vec2 center = vec2(geoR, 0.0);
    float invR2 = geoR * geoR - 1.0;
    float sqrtInv = sqrt(invR2);

    vec2 z = uv;
    float edgeDist = 1.0;
    float secondEdge = 1.0;
    float internalWaves = 0.0;
    float reflCount = 0.0;
    float veinFlow = 0.0;

    for (int i = 0; i < 16; i++) {
        float a = floor(atan(z.y, z.x) / angleStep + 0.5) * angleStep;
        z = rot2(-a) * z;

        vec2 diff = z - center;
        float d = dot(diff, diff);

        if (d < invR2) {
            z = center + diff * invR2 / d;
            reflCount += 1.0;
        } else {
            break;
        }

        
        float edgeLocal = abs(length(diff) - sqrtInv);
        if (edgeLocal < edgeDist) {
            secondEdge = edgeDist;
            edgeDist = edgeLocal;
        } else if (edgeLocal < secondEdge) {
            secondEdge = edgeLocal;
        }

        float radial = length(z);
        
        float waveA = sin(radial * 18.0 - u_time * 1.4 + float(i) * 0.30) * 0.5 + 0.5;
        float waveB = sin(radial * 33.0 - u_time * 0.8 + float(i) * 0.55) * 0.5 + 0.5;
        float mask = smoothstep(0.72, 0.05, radial);
        internalWaves += mix(waveA, waveB, 0.5) * mask;

        
        float vein = smoothstep(0.045, 0.0, abs(fract(radial * 4.0 - u_time * 0.25) - 0.5) * 0.5);
        veinFlow += vein * mask;
    }

    internalWaves /= 16.0;
    veinFlow /= 16.0;

    
    
    
    
    vec2 cuv = uv * 2.1;
    float tFlow = u_time * 0.10;
    vec2 warp = vec2(
        fbm(cuv + vec2(0.0, tFlow)),
        fbm(cuv + vec2(5.2, -tFlow * 0.8))
    );
    float liquid = fbm(cuv * 1.4 + warp * 1.8 + vec2(tFlow * 0.6, -tFlow * 0.4));
    liquid = smoothstep(0.25, 0.85, liquid);

    
    float coreMask = smoothstep(0.95, 0.18, r);
    coreMask = pow(coreMask, 1.4);

    
    vec3 liquidCol = mix(u_colors[0], u_colors[1], smoothstep(0.0, 0.6, liquid));
    liquidCol = mix(liquidCol, u_colors[2], smoothstep(0.45, 1.0, liquid));
    vec3 core = liquidCol * coreMask * (0.55 + smoothMid * 0.7 + smoothRms * 0.5);

    
    
    
    vec3 bg = mix(u_colors[0], u_colors[1], 0.18) * 0.16;
    vec3 baseCol = bg + core;

    
    float edge1 = smoothstep(0.016, 0.0, edgeDist);
    float edge2 = smoothstep(0.020, 0.0, secondEdge) * 0.5;
    float edges = edge1 + edge2;
    vec3 edgeCol = mix(u_colors[1], u_colors[2], 0.45) * edges * (0.5 + smoothMid * 1.0);

    vec3 glowA = mix(u_colors[1], u_colors[2], 0.55);
    vec3 veinCol = mix(u_colors[2], u_colors[1], 0.3);
    vec3 innerGlow = glowA * internalWaves * (0.22 + smoothMid * 0.7);
    innerGlow += veinCol * veinFlow * (0.14 + smoothRms * 0.5);

    vec3 col = baseCol + edgeCol + innerGlow;

    
    col += mix(u_colors[1], u_colors[2], 0.6) * smoothstep(0.84, 1.0, r) * (0.2 + smoothRms * 0.3);
    col *= smoothstep(1.25, 0.14, r);

    
    col = col / (1.0 + col * 0.8);
    col = pow(clamp(col, 0.0, 1.0), vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}`;class N1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:F1,uniforms:{u_time:{value:0},u_rms:{value:0},u_mid:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(526870),new he(4086783),new he(9040127)]}}}),this.scene.add(new Xe(new Je(2,2),this.material))}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_rms.value=e.rms,this.material.uniforms.u_mid.value=e.mid}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var z1=`uniform float u_time;
uniform float u_bass;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;
uniform float u_smoothing;
uniform float u_dim;

varying vec2 vUv;

vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise3d(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
                     dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                 mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
                     dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
             mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
                     dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                 mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
                     dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
}

float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
        v += a * noise3d(p);
        p *= 2.1;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

    
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }

    
    float time = u_time * 0.15;
    float bassMod = u_bass * 0.4;

    
    vec3 coords = vec3(p * (1.8 - u_bass * 0.3), time);

    
    vec3 q = vec3(fbm(coords), fbm(coords + vec3(1.2, 4.3, 0.5)), 0.0);
    vec3 r = vec3(fbm(coords + q * 2.5 + vec3(5.7, 1.2, time)),
                  fbm(coords + q * 1.5 + vec3(2.3, 7.8, time)), 0.0);

    float n = fbm(coords + r * (2.0 + bassMod));
    float t = smoothstep(-0.7, 0.7, n);

    
    
    vec3 col0_dark = u_colors[0] * 0.3;  
    vec3 col1_mid = u_colors[1] * 0.6;   
    vec3 col1_hot = u_colors[1];          
    vec3 col2_bright = u_colors[2];       

    
    vec3 finalCol = col0_dark;

    
    finalCol = mix(finalCol, col1_mid, smoothstep(0.1, 0.4, t));

    
    float flowMask = smoothstep(0.35 - bassMod * 0.2, 0.7, t);
    finalCol = mix(finalCol, col1_hot, flowMask);

    
    float heatMask = smoothstep(0.65 - u_rms * 0.25, 0.95, t);
    finalCol = mix(finalCol, col2_bright, heatMask);

    
    
    float grain = hash(uv * 500.0) * 0.08;
    finalCol -= (1.0 - flowMask) * grain;

    
    float edgeDetails = noise3d(vec3(p * 40.0, time * 0.1));
    finalCol += (flowMask * (1.0 - heatMask)) * edgeDetails * 0.1;

    
    finalCol *= 0.9 + (u_rms * 0.4);

    
    finalCol *= smoothstep(1.3, 0.4, length(p));

    
    finalCol = pow(clamp(finalCol, 0.0, 1.0), vec3(0.9));

    
    finalCol *= (1.0 - u_dim);

    gl_FragColor = vec4(finalCol, 1.0);
}`;class k1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:z1,uniforms:{u_time:{value:0},u_bass:{value:0},u_rms:{value:0},u_smoothing:{value:.5},u_dim:{value:0},u_blur:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(1705267),new he(4856130),new he(996448)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}setDim(e){this.material.uniforms.u_dim.value=e}setBlur(e){this.material.uniforms.u_blur.value=e}dispose(){this.material.dispose()}}var B1=`precision highp float;
uniform sampler2D u_velocity;
uniform sampler2D u_pressure;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_bass;
uniform float u_dissipation;

varying vec2 vUv;

void main() {
  vec2 texel = 1.0 / u_resolution;
  vec2 vel = texture2D(u_velocity, vUv).xy;

  
  vec2 prevPos = vUv - vel * texel * 1.0;
  vec2 advected = texture2D(u_velocity, prevPos).xy;

  
  float pL = texture2D(u_pressure, vUv - vec2(texel.x, 0.0)).x;
  float pR = texture2D(u_pressure, vUv + vec2(texel.x, 0.0)).x;
  float pB = texture2D(u_pressure, vUv - vec2(0.0, texel.y)).x;
  float pT = texture2D(u_pressure, vUv + vec2(0.0, texel.y)).x;
  advected -= 0.5 * vec2(pR - pL, pT - pB);

  
  float angle1 = u_time * 1.7;
  float angle2 = u_time * 2.3 + 3.14;
  vec2 injectPos1 = vec2(0.5 + 0.3 * cos(angle1), 0.5 + 0.3 * sin(angle1));
  vec2 injectPos2 = vec2(0.5 + 0.2 * cos(angle2), 0.5 + 0.2 * sin(angle2));

  float dist1 = length(vUv - injectPos1);
  float dist2 = length(vUv - injectPos2);
  float inject1 = smoothstep(0.08, 0.0, dist1) * u_bass * 3.0;
  float inject2 = smoothstep(0.08, 0.0, dist2) * u_bass * 3.0;

  vec2 force1 = vec2(cos(u_time * 3.0), sin(u_time * 2.0)) * inject1;
  vec2 force2 = vec2(sin(u_time * 2.5), cos(u_time * 1.8)) * inject2;

  advected += force1 + force2;

  
  advected *= u_dissipation;

  gl_FragColor = vec4(advected, 0.0, 1.0);
}`,G1=`precision highp float;
uniform sampler2D u_albumArt;
uniform sampler2D u_velocity;
uniform sampler2D u_prevFrame;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_bass;
uniform float u_treble;
uniform float u_rms;
uniform float u_healRate;
uniform vec3 u_colors[3];

varying vec2 vUv;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

float voronoi(vec2 p, float scale) {
  vec2 n = floor(p * scale);
  vec2 f = fract(p * scale);
  float md = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.5 * sin(u_time * 0.5 + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      md = min(md, d);
    }
  }
  return sqrt(md);
}

vec3 paletteMap(float lum, vec3 c0, vec3 c1, vec3 c2) {
  
  if (lum < 0.5) {
    return mix(c0, c1, lum * 2.0);
  }
  return mix(c1, c2, (lum - 0.5) * 2.0);
}

void main() {
  vec2 texel = 1.0 / u_resolution;

  
  vec2 vel = texture2D(u_velocity, vUv).xy;
  vec2 advectedUv = vUv - vel * texel * 2.0;

  
  float aberration = u_rms * 0.008;
  vec2 dir = normalize(vUv - 0.5) * aberration;
  float r = texture2D(u_albumArt, advectedUv + dir).r;
  float g = texture2D(u_albumArt, advectedUv).g;
  float b = texture2D(u_albumArt, advectedUv - dir).b;
  vec3 advectedColor = vec3(r, g, b);

  
  vec3 original = texture2D(u_albumArt, vUv).rgb;

  
  vec3 color = mix(advectedColor, original, u_healRate);

  
  float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
  vec3 paletteTinted = paletteMap(lum, u_colors[0], u_colors[1], u_colors[2]);
  
  
  float tintStrength = 0.3 + u_bass * 0.35;
  color = mix(color, paletteTinted, tintStrength);

  
  float vor = voronoi(vUv, 6.0 + u_treble * 4.0);
  float shatterEdge = smoothstep(0.02, 0.05, vor);
  
  vec3 shatterColor = mix(color * 1.3, color, shatterEdge);
  color = mix(color, shatterColor, u_treble * 0.7);

  
  float edgeGlow = smoothstep(0.05, 0.01, vor) * u_treble;
  color += u_colors[2] * edgeGlow * 1.5;

  
  vec3 prev = texture2D(u_prevFrame, vUv * 1.005).rgb; 
  color = mix(color, prev, 0.15);

  
  float bassGlow = u_bass * 0.15;
  float radial = 1.0 - length(vUv - 0.5) * 1.4;
  color += mix(u_colors[0], u_colors[1], 0.5) * bassGlow * max(radial, 0.0);

  
  float energy = u_rms * u_treble;
  color += u_colors[2] * energy * 0.2 * smoothstep(0.4, 0.8, vor);

  gl_FragColor = vec4(color, 1.0);
}`;const Za=256;class dd extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.camera=new it(-1,1,1,-1,0,1);const t=128,i=new Uint8Array(t*t*4);for(let u=0;u<t;u++)for(let h=0;h<t;h++){const d=(u*t+h)*4,f=h/t,g=u/t;i[d]=Math.floor((.1+f*.2)*255),i[d+1]=Math.floor((.05+g*.15)*255),i[d+2]=Math.floor((.2+(f+g)*.15)*255),i[d+3]=255}this.defaultTexture=new xr(i,t,t,1023),this.defaultTexture.needsUpdate=!0,this.albumTexture=this.defaultTexture;const a={minFilter:1006,magFilter:1006,format:1023,type:1016};this.velRT1=new bt(Za,Za,a),this.velRT2=new bt(Za,Za,a);const n=window.innerWidth,s=window.innerHeight,o={minFilter:1006,magFilter:1006,format:1023,type:1009};this.frameRT1=new bt(n,s,o),this.frameRT2=new bt(n,s,o),this.simCamera=new it(-1,1,1,-1,0,1),this.simScene=new So,this.velMaterial=new He({vertexShader:lt,fragmentShader:B1,uniforms:{u_velocity:{value:null},u_pressure:{value:null},u_resolution:{value:new Ue(Za,Za)},u_time:{value:0},u_bass:{value:0},u_dissipation:{value:.97}}});const l=new Xe(new Je(2,2),this.velMaterial);this.simScene.add(l),this.canvasMaterial=new He({vertexShader:lt,fragmentShader:G1,uniforms:{u_albumArt:{value:this.albumTexture},u_velocity:{value:this.velRT1.texture},u_prevFrame:{value:this.frameRT1.texture},u_resolution:{value:new Ue(n,s)},u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_rms:{value:0},u_healRate:{value:.02},u_colors:{value:[new he(1705267),new he(4856130),new he(3377407)]}}});const c=new Xe(new Je(2,2),this.canvasMaterial);this.scene.add(c),globalThis.__DEBUG__&&console.log("[LivingCanvas] Scene initialized")}setAlbumArt(e){new Bs().load(e,t=>{t.minFilter=1006,t.magFilter=1006,this.albumTexture=t,this.canvasMaterial.uniforms.u_albumArt.value=t,globalThis.__DEBUG__&&console.log("[LivingCanvas] Album art loaded:",e)},void 0,()=>{console.warn("[LivingCanvas] Failed to load album art, using default")})}setAlbumTexture(e){this.albumTexture=e,this.canvasMaterial.uniforms.u_albumArt.value=e}setPalette(e){this.canvasMaterial.uniforms.u_colors.value=e}update(e,t){const i=this.flip?this.velRT2:this.velRT1,a=this.flip?this.velRT1:this.velRT2;this.velMaterial.uniforms.u_velocity.value=i.texture,this.velMaterial.uniforms.u_pressure.value=i.texture,this.velMaterial.uniforms.u_time.value=t,this.velMaterial.uniforms.u_bass.value=e.bass,this.renderer.setRenderTarget(a),this.renderer.render(this.simScene,this.simCamera),this.renderer.setRenderTarget(null),this.canvasMaterial.uniforms.u_velocity.value=a.texture,this.canvasMaterial.uniforms.u_time.value=t,this.canvasMaterial.uniforms.u_bass.value=e.bass,this.canvasMaterial.uniforms.u_treble.value=e.treble,this.canvasMaterial.uniforms.u_rms.value=e.rms;const n=this.flip?this.frameRT2:this.frameRT1,s=this.flip?this.frameRT1:this.frameRT2;this.canvasMaterial.uniforms.u_prevFrame.value=n.texture,this.renderer.setRenderTarget(s),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(null),this.flip=!this.flip}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.canvasMaterial.uniforms.u_resolution.value.set(e*a,t*a),this.frameRT1.setSize(e,t),this.frameRT2.setSize(e,t)}dispose(){this.velRT1.dispose(),this.velRT2.dispose(),this.frameRT1.dispose(),this.frameRT2.dispose(),this.velMaterial.dispose(),this.canvasMaterial.dispose(),this.albumTexture!==this.defaultTexture&&this.albumTexture.dispose(),this.defaultTexture.dispose()}}var H1=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float fractalSDF(vec3 p) {
    
    p.xy *= rot(u_time * 0.05);

    
    float cellSize = 8.0;
    vec3 p_mod = p;
    p_mod.z = mod(p.z, cellSize) - cellSize * 0.5;

    
    float safeBass = min(u_bass, 0.85);
    float safeMid = min(u_mid, 0.85);
    float safeTreble = min(u_treble, 0.85);

    
    float tunnel = length(p_mod.xy) - (1.2 + safeBass * 0.8 + sin(p.z * 0.5) * 0.4);

    float scale = 1.8 + safeMid * 0.4;

    
    for (int i = 0; i < 7; i++) {
        p_mod = abs(p_mod) - vec3(0.8, 1.2, 0.6);

        p_mod.xy *= rot(0.5 + safeBass * 0.1 + float(i) * 0.2);
        p_mod.yz *= rot(0.3 + safeTreble * 0.1);

        
        if (p_mod.x < p_mod.y) p_mod.xy = p_mod.yx;
        if (p_mod.x < p_mod.z) p_mod.xz = p_mod.zx;

        p_mod = p_mod * scale - vec3(1.0, 2.0, 1.0) * (scale - 1.0);
    }

    float fractal = (length(p_mod) - 1.5) / pow(scale, 7.0);

    
    return smin(fractal, -tunnel, 0.5);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - min(u_rms, 0.8) * 0.3;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    
    float baseSpeed = u_time * 3.5;
    float kick = smoothstep(0.5, 1.0, u_bass) * 0.2;
    vec3 ro = vec3(0.0, 0.0, baseSpeed + kick);

    
    ro.x += sin(u_time * 0.7) * 0.5;
    ro.y += cos(u_time * 0.5) * 0.5;

    
    rd.xy *= rot(sin(u_time * 0.3) * 0.2 + min(u_rms, 0.8) * 0.1);
    rd.xz *= rot(cos(u_time * 0.2) * 0.1);

    float t = 0.05;
    float glow = 0.0;
    float d = 0.0;

    
    for (int i = 0; i < 80; i++) {
        vec3 p = ro + rd * t;
        d = fractalSDF(p);

        
        glow += (0.02 + min(u_treble, 0.85) * 0.05) / (0.1 + d * d * 15.0);

        if (d < 0.002 || t > 30.0) break;
        t += d * 0.75;
    }

    vec3 col = vec3(0.0);

    
    vec3 bgCol = mix(u_colors[0] * 0.5, u_colors[2] * 0.5, sin(u_time * 0.2) * 0.5 + 0.5);

    if (d < 0.1) {
        float edge = smoothstep(0.1, 0.0, d);
        
        vec3 material = mix(u_colors[1] * 0.65, u_colors[2] * 0.65, fract(t * 0.1 + u_time * 0.1));
        col = material * edge;

        
        col += u_colors[0] * 0.6 * (1.0 - fract(t * 0.5 - u_time * 2.0)) * min(u_bass, 0.85);
    }

    
    col += glow * mix(u_colors[1] * 0.6, u_colors[0] * 0.6, min(u_rms, 0.8));

    
    col = mix(col, bgCol * 0.05, smoothstep(5.0, 30.0, t));

    
    float mask = 1.0 - length(uv * 0.8);
    col *= mask;

    
    col = smoothstep(-0.05, 1.05, col);
    col = pow(col, vec3(0.8));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;class V1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:H1,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(2754629),new he(6570405),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var W1=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
        val += amp * noise(p);
        p *= 2.3;
        amp *= 0.45;
    }
    return val;
}

float map(vec3 p) {
    float h = fbm(p.xz * 0.2) * 3.5;
    h += noise(p.xz * 0.5 + u_time * 0.1) * u_bass * 1.5;
    float waterLevel = 0.2 + sin(u_time * 0.5) * 0.1;
    return p.y - max(h, waterLevel);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.1, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        0.2,
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - u_rms * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.0));

    
    float travel = u_time * 3.0;
    vec3 ro = vec3(sin(u_time * 0.2) * 1.5, 3.5 + u_bass, travel);

    
    float alpha = sin(u_time * 0.3) * 0.1;
    float s = sin(alpha), c = cos(alpha);
    rd.xy *= mat2(c, -s, s, c);

    float t = 0.1;
    float d = 0.0;

    
    for (int i = 0; i < 50; i++) {
        d = map(ro + rd * t);
        if (d < 0.02 || t > 40.0) break;
        t += d * 0.6;
    }

    vec3 col = vec3(0.0);
    vec3 lightDir = normalize(vec3(0.5, 0.8, -0.5));

    if (t < 40.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, lightDir), 0.0);

        
        float h = p.y;
        vec3 terrainCol = mix(u_colors[2], u_colors[1], smoothstep(0.3, 1.5, h));

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        terrainCol += u_colors[0] * fresnel * u_treble * 2.0;

        col = terrainCol * (diff + 0.2);
    }

    
    float fog = smoothstep(0.0, 40.0, t);
    vec3 fogCol = mix(u_colors[0] * 0.2, u_colors[1] * 0.1, uv.y + 0.5);
    col = mix(col, fogCol, fog);

    
    float sun = pow(max(dot(rd, lightDir), 0.0), 10.0);
    col += u_colors[1] * sun * u_bass;

    
    col = pow(col, vec3(0.8));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;class X1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:W1,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(1706542),new he(4876097),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var q1=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float val = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 3; i++) {
        val += amp * noise(p);
        p *= 2.2;
        amp *= 0.45;
    }
    return val;
}

float map(vec3 p) {
    
    float waterLvl = 0.6 + u_bass * 0.3;

    
    float h = fbm(p.xz * 0.15) * 5.0;
    
    h += noise(p.xz * 0.8 + u_time * 0.3) * u_mid * 0.8;

    
    float waves = sin(p.x * 2.0 + u_time * 2.0) * cos(p.z * 1.5 + u_time * 1.5) * 0.08 * (1.0 + u_bass);

    float terrain = p.y - max(h, waterLvl + waves);
    return terrain;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.1, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        0.2,
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - u_bass * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    
    float travel = u_time * 2.5;
    vec3 ro = vec3(sin(u_time * 0.15) * 2.0, 4.0 + u_bass * 0.5, travel);

    
    rd.xy *= rot(sin(u_time * 0.2) * 0.2);
    rd.xz *= rot(cos(u_time * 0.12) * 0.08);

    float t = 0.1;
    float d = 0.0;

    
    for (int i = 0; i < 64; i++) {
        d = map(ro + rd * t);
        if (d < 0.02 || t > 45.0) break;
        t += d * 0.7;
    }

    vec3 col = vec3(0.0);
    float waterLvl = 0.6 + u_bass * 0.3;

    
    vec3 lightDir = normalize(vec3(0.4, 0.7, -0.5));

    if (t < 45.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float h = fbm(p.xz * 0.15) * 5.0 + noise(p.xz * 0.8 + u_time * 0.3) * u_mid * 0.8;

        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 32.0);

        
        float shoreMix = smoothstep(waterLvl - 0.3, waterLvl + 0.5, h);

        
        vec3 oceanCol = u_colors[2] * 0.4;
        
        oceanCol += spec * vec3(0.8, 0.9, 1.0) * 0.8;
        
        oceanCol += u_colors[2] * 0.3 * (1.0 - smoothstep(0.0, waterLvl, h));
        
        oceanCol += u_colors[2] * u_bass * 0.3 * sin(p.x * 4.0 + u_time * 3.0) * 0.5;

        
        vec3 jungleCol = u_colors[1] * (diff * 0.6 + 0.2);
        
        float veinPattern = smoothstep(0.4, 0.0, abs(noise(p.xz * 3.0 + u_time * 0.5) - 0.5));
        vec3 bioGlow = u_colors[2] * veinPattern * u_rms * 3.0;
        jungleCol += bioGlow;
        
        float canopySpec = pow(max(dot(n, lightDir), 0.0), 8.0);
        jungleCol += u_colors[1] * canopySpec * 0.3;

        
        col = mix(oceanCol, jungleCol, shoreMix);
    }

    
    float fog = smoothstep(0.0, 45.0, t);
    vec3 fogCol = u_colors[0] * 0.3;
    col = mix(col, fogCol, fog);

    
    float horizon = smoothstep(0.05, -0.15, rd.y);
    col += u_colors[2] * horizon * 0.2 * (1.0 + u_treble);

    
    float sun = pow(max(dot(rd, lightDir), 0.0), 16.0);
    col += u_colors[0] * sun * 0.5;

    
    if (t >= 45.0) {
        col = fogCol + u_colors[0] * 0.05 * smoothstep(-0.2, 0.5, rd.y);
        col += u_colors[2] * horizon * 0.3;
    }

    
    col = pow(col, vec3(0.85));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;class j1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:q1,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(661032),new he(1731386),new he(65484)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var Y1=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash(vec3 p) {
    p = fract(p * vec3(123.34, 456.21, 789.53));
    p += dot(p, p.yzx + 45.32);
    return fract(p.x * p.y * p.z);
}

float hash2(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec3(1,0,0));
    float c = hash(i + vec3(0,1,0));
    float d = hash(i + vec3(1,1,0));
    float e = hash(i + vec3(0,0,1));
    float ff = hash(i + vec3(1,0,1));
    float g = hash(i + vec3(0,1,1));
    float h = hash(i + vec3(1,1,1));
    return mix(mix(mix(a,b,f.x), mix(c,d,f.x), f.y),
               mix(mix(e,ff,f.x), mix(g,h,f.x), f.y), f.z);
}

float islandNoise(vec3 p) {
    return noise(p) * 0.7 + noise(p * 2.1) * 0.3;
}

float map(vec3 p) {
    
    float cellSize = 5.0;
    vec3 cellId = floor(p / cellSize);
    vec3 cellPos = mod(p, cellSize) - cellSize * 0.5;

    
    float keep = step(0.7, hash(cellId));
    if (keep < 0.5) return cellSize * 0.4; 

    
    float radius = 0.8 + u_bass * 0.4;
    
    float distortion = islandNoise(cellPos * 0.8 + cellId * 3.7) * 0.6;
    float island = length(cellPos) - radius - distortion;

    
    island += sin(cellPos.y * 3.0 + u_time * 2.0) * u_bass * 0.1;

    return island;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - u_bass * 0.2;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    
    float baseSpeed = u_time * 4.0;
    vec3 ro = vec3(0.0, 0.0, baseSpeed);

    
    ro.x += sin(u_time * 3.7) * u_rms * 0.3;
    ro.y += cos(u_time * 2.9) * u_rms * 0.2;

    
    ro.x += sin(u_time * 0.4) * 1.5;
    ro.y += cos(u_time * 0.3) * 1.0;

    
    rd.xy *= rot(sin(u_time * 0.25) * 0.2);
    rd.xz *= rot(cos(u_time * 0.15) * 0.1);

    float t = 0.05;
    float d = 0.0;
    float glow = 0.0;

    
    for (int i = 0; i < 60; i++) {
        vec3 p = ro + rd * t;
        d = map(p);

        
        glow += (0.015 + u_treble * 0.04) / (0.1 + d * d * 8.0);

        if (d < 0.01) break;
        if (t > 50.0) break;

        
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.05; 

    if (d < 0.1 && t < 50.0) {
        vec3 p = ro + rd * t;
        vec3 cellPos = mod(p, 5.0) - 2.5;

        
        float yGrad = smoothstep(-1.0, 1.0, cellPos.y);

        
        vec3 surface = mix(u_colors[1] * 0.2, u_colors[1], yGrad);

        
        float coreGlow = smoothstep(0.8, 0.0, length(cellPos)) * (1.0 - yGrad);
        surface += u_colors[2] * coreGlow * (0.5 + u_rms * 2.0);

        
        float edge = smoothstep(0.1, 0.0, d);
        col = surface * edge;

        
        col += u_colors[2] * u_bass * 0.2 * edge;
    }

    
    col += glow * u_colors[2] * (0.4 + u_treble * 0.6);

    
    col = mix(col, u_colors[0] * 0.03, smoothstep(5.0, 50.0, t));

    
    col *= 1.0 - 0.4 * dot(uv, uv);

    
    col = smoothstep(-0.02, 1.1, col);
    col = pow(col, vec3(0.85));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;class Z1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:Y1,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(131592),new he(2984526),new he(65450)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var K1=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

vec3 soapRainbow(float f) {
    vec3 shift = vec3(0.0, 0.15, 0.3);
    return 0.5 + 0.5 * cos(6.28318 * (f + shift + u_time * 0.1));
}

float map(vec3 p) {
    float t = u_time * 0.2;

    
    p.y -= t * 2.0;
    p.x += sin(p.y * 0.5 + t) * 0.5;

    
    vec3 id = floor((p + 1.5) / 3.0);
    p = mod(p + 1.5, 3.0) - 1.5;

    
    float h = fract(sin(dot(id, vec3(12.989, 78.233, 45.164))) * 43758.5453);
    p += (h - 0.5) * 1.5;

    
    float size = (0.2 + h * 0.5) + u_bass * 0.2;

    
    float d = abs(length(p) - size) - 0.005;

    
    d -= sin(p.x * 5.0 + u_time) * cos(p.y * 5.0) * 0.02 * u_treble;

    return d;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    vec3 col = u_colors[0] * 0.1 * (1.0 - length(uv));

    vec3 ro = vec3(0.0, 0.0, -5.0);
    vec3 rd = normalize(vec3(uv, 1.5));

    
    ro.xz *= rot(u_time * 0.1);
    rd.xz *= rot(u_time * 0.1);

    float t = 0.0;
    float bubbleAccum = 0.0;

    for (int i = 0; i < 50; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);

        
        float glow = smoothstep(0.5, 0.0, d);
        bubbleAccum += pow(glow, 4.0) * 0.15;

        if (d < 0.001) {
            
            vec2 e = vec2(0.01, 0.0);
            vec3 n = normalize(vec3(
                map(p + e.xyy) - map(p - e.xyy),
                map(p + e.yxy) - map(p - e.yxy),
                map(p + e.yyx) - map(p - e.yyx)
            ));

            float f = pow(1.0 - max(dot(n, -rd), 0.0), 2.0);
            vec3 irid = soapRainbow(f + t * 0.1);

            
            col += irid * f * 0.6;
            col += pow(f, 10.0) * 0.4;

            
            d = 0.05;
        }

        if (t > 15.0) break;
        t += max(d, 0.02);
    }

    
    col += soapRainbow(u_time * 0.05) * bubbleAccum * (0.5 + u_rms);

    
    col *= 1.2;
    col = pow(col, vec3(0.8));
    col = mix(col, u_colors[1], u_bass * 0.1);

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;class $1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:K1,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(657946),new he(6702250),new he(52479)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var Q1=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    float scene = 1e5;
    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        vec3 center = vec3(
            sin(u_time * 0.3 + fi * 1.5) * 2.5,
            mod(u_time * (0.5 + fi * 0.1) + fi * 2.0, 12.0) - 6.0,
            cos(u_time * 0.2 + fi) * 1.5
        );
        float size = 0.5 + fi * 0.1 + u_bass * 0.2;
        
        float b = length(p - center) - size;
        
        b -= sin(p.x * 8.0 + u_time) * 0.02 * u_treble;
        scene = min(scene, b);
    }
    return scene;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    vec3 ro = vec3(0.0, 0.0, -7.0);
    vec3 rd = normalize(vec3(uv, 1.5));

    
    vec3 col = u_colors[0] * 0.02;

    float t = 0.0;
    for (int i = 0; i < 64; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);

        if (d < 0.001) {
            vec3 e = vec3(0.01, 0.0, 0.0);
            vec3 n = normalize(vec3(
                map(p + e.xyy) - map(p - e.xyy),
                map(p + e.yxy) - map(p - e.yxy),
                map(p + e.yyx) - map(p - e.yyx)
            ));

            
            float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);

            
            vec3 irid = 0.5 + 0.5 * cos(6.283 * (fresnel + vec3(0.0, 0.1, 0.2) + u_time * 0.1));

            
            vec3 albumTone = mix(u_colors[1], u_colors[2], fresnel);
            irid = mix(irid, albumTone, 0.4);

            
            col += irid * fresnel * 1.5;
            col += pow(fresnel, 20.0) * 2.0 * u_colors[2];

            
            rd = refract(rd, n, 0.95);
            t += 0.2;
        }

        t += d;
        if (t > 20.0) break;
    }

    
    col += u_colors[1] * pow(u_bass, 3.0) * 0.1;

    
    vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) { col = vec3(1.0); }

    
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
}`;class J1 extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:Q1,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(657946),new he(6702250),new he(52479)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var ex=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;

vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    float explodeForce = 0.5 + pow(u_bass, 3.0) * 3.5;
    float twist = u_time * 0.2 + u_treble * 2.0;

    orbitTrap = vec3(100.0);
    float scale = 1.0;

    for (int i = 0; i < 5; i++) {
        p.xyz = abs(p.xyz);
        p -= vec3(1.2, 0.8, 1.0) * explodeForce * (0.2 + float(i) * 0.05);
        p.xy *= rot(twist + float(i) * 0.1);
        p *= 1.35;
        scale *= 1.35;
        orbitTrap = min(orbitTrap, abs(p));
    }

    float d = (abs(p.x) + abs(p.y) + abs(p.z) - 2.0) / scale;
    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    vec3 ro = vec3(0.0, 0.0, -8.0 + u_bass * 1.5);
    ro.xy *= rot(u_bass * 0.1 * sin(u_time * 10.0));

    vec3 rd = normalize(vec3(uv, 1.5));

    float t = 0.0;
    float d = 0.0;
    vec3 p;

    vec3 col = u_colors[0] * 0.05;

    for (int i = 0; i < 60; i++) {
        p = ro + rd * t;
        d = map(p);
        if (d < 0.002 || t > 25.0) break;
        t += d * 0.8;
    }

    if (d < 0.002) {
        vec3 n = getNormal(p);

        vec3 lightPos = vec3(2.0 * sin(u_time), 3.0, -4.0);
        vec3 l = normalize(lightPos - p);
        float diff = max(dot(n, l), 0.0);

        vec3 coreGlow = vec3(0.0);
        coreGlow += exp(-orbitTrap.x * 2.0) * u_colors[1];
        coreGlow += exp(-orbitTrap.y * 3.0) * u_colors[2];
        coreGlow *= 1.0 + u_bass * 2.0;

        vec3 baseMaterial = mix(u_colors[0], u_colors[1], diff * 0.3);
        col = baseMaterial + coreGlow * 0.8;
    }

    col += u_colors[2] * (0.05 / (0.1 + t * t * 0.005)) * u_mid;

    
    vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
    if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0);

    col *= 1.0 - 0.5 * length(uv);
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));

    gl_FragColor = vec4(col, 1.0);
}`;class tx extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:ex,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(657946),new he(16720486),new he(52479)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var ix=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;
vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    
    p.xy *= rot(p.z * 0.1);
    p.x += sin(p.z * 0.4) * 0.5;

    vec3 q = p;
    float zStep = 10.0;
    q.z = mod(p.z, zStep) - zStep * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    
    float safeBass = min(u_bass, 0.85);
    float safeMid = min(u_mid, 0.85);

    for (int i = 0; i < 6; i++) {
        q = abs(q) - vec3(0.8 + safeBass * 0.5, 1.0 + safeMid * 0.2, 1.2);

        float r2 = dot(q, q);
        float k = (1.6 + safeBass * 0.4) / clamp(r2, 0.15, 1.8);
        q *= k;
        scale *= k;

        q.xy *= rot(0.5 + u_time * 0.05);
        orbitTrap = min(orbitTrap, abs(q));
    }

    
    float fractal = (abs(length(q.xy) - 0.5) - 0.1) / scale;

    
    float tunnel = -(length(p.xy) - (4.0 + safeBass * 2.0));

    return max(fractal, tunnel * 0.5);
}

float getAO(vec3 p, vec3 n) {
    float occ = 0.0;
    float sca = 1.0;
    for (int i = 0; i < 4; i++) {
        float hr = 0.05 + 0.1 * float(i);
        float d = map(p + n * hr);
        occ += -(d - hr) * sca;
        sca *= 0.85;
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, -0.005);
    return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
        else if (uv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; }
        else { gl_FragColor = vec4(u_colors[2], 1.0); return; }
    }

    float speed = u_time * 6.0 + min(u_rms, 0.8) * 3.0;
    vec3 ro = vec3(0.0, 0.0, speed);
    vec3 rd = normalize(vec3(uv, 1.2));

    
    ro.x += sin(u_time * 0.5) * 0.5;
    ro.y += cos(u_time * 0.3) * 0.5;

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 55; i++) {
        d = map(ro + rd * t);
        if (abs(d) < 0.001 || t > 40.0) break;
        t += d * 0.65;
    }

    vec3 skyCol = u_colors[0] * 0.05;
    vec3 col = skyCol;

    if (t < 40.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float ao = getAO(p, n);

        vec3 baseCol = mix(u_colors[1], u_colors[2], fract(orbitTrap.y * 0.3 + u_time * 0.1));

        float diff = max(dot(n, normalize(vec3(0.5, 1.0, -0.5))), 0.0);
        float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);

        col = baseCol * (diff + 0.3);
        col += rim * u_colors[1] * (min(u_bass, 0.85) + 0.5);
        col *= ao;

        
        col += u_colors[2] * exp(-abs(d) * 50.0) * min(u_rms, 0.8);
    }

    
    col = mix(col, skyCol, smoothstep(10.0, 40.0, t));

    
    col += u_colors[1] * 0.2 * exp(-length(uv) * 3.0) * (min(u_bass, 0.85) + 0.5);

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.6)), 1.0);
}`;class rx extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:ix,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(328976),new he(16724872),new he(61183)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var ax=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;
vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    
    p.xy *= rot(p.z * 0.1);
    p.x += sin(p.z * 0.4 + u_time) * 1.2;
    p.y += cos(p.z * 0.3 + u_time * 0.5) * 0.8;

    vec3 q = p;
    float zSize = 5.0;
    q.z = mod(q.z, zSize) - zSize * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    
    float safeBass = min(u_bass, 0.85);
    float safeRms = min(u_rms, 0.8);
    float safeTreble = min(u_treble, 0.85);

    
    vec3 nodeGrowth = vec3(
        0.8 + safeBass * 0.6,
        1.0 + safeRms * 0.4,
        1.2 + safeTreble * 0.3
    );

    for (int i = 0; i < 5; i++) {
        q = abs(q) - nodeGrowth;

        float r2 = dot(q, q);
        float k = (1.85 + safeRms * 0.2) / clamp(r2, 0.15, 2.5);
        q *= k;
        scale *= k;

        q.xy *= rot(0.2 + u_time * 0.02 + float(i) * 0.1);
        orbitTrap = min(orbitTrap, abs(q));
    }

    float shapes = (length(q.xy) - 0.5) / scale;
    float cavern = -(length(p.xy) - (3.5 + safeBass));

    return max(shapes, cavern * 0.8);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.01, -0.01);
    return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.y > 0.9) {
            if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
            if (uv.x < 0.3)  { gl_FragColor = vec4(u_colors[1], 1.0); return; }
            gl_FragColor = vec4(u_colors[2], 1.0); return;
        }
    }

    vec3 ro = vec3(0.0, 0.0, u_time * 7.0);
    vec3 rd = normalize(vec3(uv + (min(u_rms, 0.8) * 0.05 * sin(u_time)), 1.4));

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 45; i++) {
        d = map(ro + rd * t);
        if (d < 0.003 || t > 35.0) break;
        t += d;
    }

    vec3 col = u_colors[0] * 0.05;

    if (t < 35.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, vec3(0.5, 0.7, -0.5)), 0.0);
        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);

        vec3 objCol = mix(u_colors[1], u_colors[2], fract(t * 0.1 + orbitTrap.y * 0.2));

        col = objCol * diff;
        col += fres * u_colors[1] * min(u_bass, 0.85);

        
        float lightning = pow(min(u_rms, 0.8), 3.0) * 2.0;
        col += u_colors[2] * lightning * exp(-d * 2.0);

        col *= exp(-t * 0.05);
    }

    
    col = mix(col, u_colors[0] * 0.1, smoothstep(5.0, 35.0, t));

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.8)), 1.0);
}`;class nx extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:ax,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(328976),new he(16724872),new he(61183)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var ox=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;

varying vec2 vUv;
vec3 orbitTrap;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(a, b, h) + k * h * (1.0 - h);
}

float map(vec3 p) {
    
    float pathX = sin(p.z * 0.4 + u_time) * 1.2;
    float pathY = cos(p.z * 0.3 + u_time * 0.5) * 0.8;
    p.x += pathX;
    p.y += pathY;

    p.xy *= rot(p.z * 0.1);

    vec3 q = p;
    float zSize = 4.0;
    q.z = mod(q.z, zSize) - zSize * 0.5;

    float scale = 1.0;
    orbitTrap = vec3(10.0);

    
    float safeBass = min(u_bass, 0.85);
    float safeRms = min(u_rms, 0.8);
    float safeTreble = min(u_treble, 0.85);

    vec3 nodeGrowth = vec3(
        0.5 + safeBass * 0.8,
        0.7 + safeRms * 0.5,
        0.9 + safeTreble * 0.4
    );

    for (int i = 0; i < 6; i++) {
        q = abs(q) - nodeGrowth;

        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float r2 = dot(q, q);
        float k = (1.7 + safeRms * 0.25) / clamp(r2, 0.1, 2.0);
        q *= k;
        scale *= k;

        q.xy *= rot(0.3 + u_time * 0.01);
        orbitTrap = min(orbitTrap, abs(q));
    }

    float shapes = (length(q.xz) - 0.2) / abs(scale);

    
    float cavernRadius = 1.8 - safeBass * 0.5;
    float cavern = -(length(p.xy) - cavernRadius);

    
    return smax(shapes, cavern, 0.5);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, -0.005);
    return normalize(e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) + e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    if (u_debug) {
        if (uv.y > 0.9) {
            if (uv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; }
            if (uv.x < 0.3)  { gl_FragColor = vec4(u_colors[1], 1.0); return; }
            gl_FragColor = vec4(u_colors[2], 1.0); return;
        }
    }

    vec3 ro = vec3(0.0, 0.0, u_time * 6.0);
    vec3 rd = normalize(vec3(uv, 1.2));

    float t = 0.0, d = 0.0;
    for (int i = 0; i < 50; i++) {
        d = map(ro + rd * t);
        if (d < 0.002 || t > 25.0) break;
        t += d * 0.7;
    }

    vec3 col = u_colors[0] * 0.03;

    if (t < 25.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        float diff = max(dot(n, vec3(0.4, 0.6, -0.4)), 0.0);
        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);

        vec3 objCol = mix(u_colors[1], u_colors[2], fract(orbitTrap.z * 0.4 + t * 0.1));

        col = objCol * (diff + 0.1);
        col += fres * u_colors[1] * min(u_bass, 0.85);

        
        float glow = exp(-d * 30.0) * min(u_rms, 0.8);
        col += u_colors[2] * glow * 1.5;

        col *= exp(-t * 0.08);
    }

    col = mix(col, u_colors[0] * 0.05, smoothstep(5.0, 25.0, t));

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.85)), 1.0);
}`;class sx extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:ox,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(328976),new he(16724872),new he(61183)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var lx=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;        
uniform float u_energy;      
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 60
#define MAX_DIST 20.0
#define SURF_DIST 0.003
#define PI 3.14159265359

mat2 rot2(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

vec3 getMoodColor(float t, float moodShift) {
  
  vec3 c0 = u_colors[0];
  vec3 c1 = u_colors[1];
  vec3 c2 = u_colors[2];

  
  vec3 comp0 = vec3(1.0) - c0;
  vec3 comp1 = vec3(1.0) - c1;

  c0 = mix(c0, comp0, moodShift * 0.4);
  c1 = mix(c1, comp1, moodShift * 0.3);

  
  float seg = t * 2.0;
  if (seg < 1.0) return mix(c0, c1, seg);
  return mix(c1, c2, seg - 1.0);
}

float fractalSDF(vec3 pos) {
  vec3 p = pos;

  
  float bassWarp = 0.1 + u_bass * 1.5;
  p.xz *= rot2(u_time * 0.2 + bassWarp * 0.5 * sin(p.y * 0.5));

  float scale = 1.0;
  float totalScale = 1.0;

  
  float maxIter = 4.0 + min(u_energy, 0.3) * 3.0;

  
  vec3 offset = vec3(
    1.0 + u_bass * 0.3,
    0.9 + u_mid * 0.4,
    1.1 + u_treble * 0.3
  );

  for (int i = 0; i < 5; i++) {
    if (float(i) >= maxIter) break;

    p = abs(p);
    if (p.x < p.y) p.xy = p.yx;
    if (p.x < p.z) p.xz = p.zx;
    if (p.y < p.z) p.yz = p.zy;

    float rotAngle = u_time * 0.1 + u_treble * 0.4 + float(i) * 0.1;
    p.xy *= rot2(rotAngle * 0.2);

    scale = 1.6 + u_mid * 0.4;
    p = p * scale - offset * (scale - 1.0);
    totalScale *= scale;
  }

  
  float baseRadius = 1.5 + u_rms * 0.8;
  float d = (length(p) - baseRadius) / totalScale;

  
  float r = length(pos);
  float shellRadius = 1.2 + u_bass * 0.4;
  d = min(d, r - shellRadius);

  
  if (u_bass > 0.2) {
    float power = 2.0 + u_energy * 4.0;
    float bulge = pow(r, power) * 0.015 * u_bass;
    d = min(d, r - shellRadius - 0.1 + bulge);
  }

  return d;
}

float map(vec3 p) {
  
  vec3 shakeOffset = vec3(
    sin(u_time * 40.0) * u_beat * 0.1,
    cos(u_time * 45.0) * u_beat * 0.08,
    sin(u_time * 35.0) * u_beat * 0.05
  );
  p += shakeOffset;

  p.xz *= rot2(u_time * 0.1);
  p.xy *= rot2(u_time * 0.05 + u_bass * 0.15);

  return fractalSDF(p);
}

vec3 getNormal(vec3 p) {
  float d = map(p);
  vec2 e = vec2(0.001, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - d,
    map(p + e.yxy) - d,
    map(p + e.yyx) - d
  ));
}

float calcAO(vec3 pos, vec3 nor) {
  return clamp(map(pos + nor * 0.15) / 0.15, 0.0, 1.0);
}

float glowAccum = 0.0;

float raymarch(vec3 ro, vec3 rd) {
  float t = 0.0;
  glowAccum = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);

    
    glowAccum += exp(-d * 8.0) * 0.015;

    if (d < SURF_DIST) return t;
    if (t > MAX_DIST) break;

    t += d * 0.8; 
  }
  return -1.0;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

  
  vec3 ro = vec3(0.0, 0.0, 4.5 - u_bass * 0.8); 
  ro.x += sin(u_time * 37.0) * u_beat * 0.2;
  ro.y += cos(u_time * 43.0) * u_beat * 0.15;

  
  ro.xz *= rot2(sin(u_time * 0.1) * 0.3);
  ro.yz *= rot2(cos(u_time * 0.07) * 0.2);

  vec3 lookAt = vec3(0.0);
  vec3 forward = normalize(lookAt - ro);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
  vec3 up = cross(forward, right);

  
  float fov = 1.0 + u_bass * 0.3;
  vec3 rd = normalize(uv.x * right + uv.y * up + fov * forward);

  
  float t = raymarch(ro, rd);

  
  vec3 bgColor = u_colors[0] * 0.05;
  bgColor += u_colors[2] * 0.03 * (1.0 - length(uv));

  vec3 col = bgColor;

  if (t > 0.0) {
    vec3 p = ro + rd * t;
    vec3 n = getNormal(p);

    
    vec3 lightDir = normalize(vec3(1.0, 2.0, 3.0));
    lightDir.xz *= rot2(u_time * 0.2);

    float diff = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 16.0 + u_treble * 48.0);
    float ao = calcAO(p, n);

    
    float colorMix = dot(n, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
    colorMix += length(p) * 0.1;
    float moodShift = u_energy * u_mid; 
    vec3 surfColor = getMoodColor(fract(colorMix), moodShift);

    
    col = surfColor * (0.15 + diff * 0.7) * ao;
    col += spec * u_colors[2] * (0.3 + u_treble * 0.7); 

    
    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    col += rim * u_colors[1] * (0.2 + u_rms * 0.8);
  }

  
  float glowIntensity = u_treble * 1.5 + u_rms * 0.5;
  vec3 glowColor = mix(u_colors[1], u_colors[2], 0.5);
  col += glowAccum * glowColor * glowIntensity;

  
  col += vec3(1.0) * u_beat * 0.3;

  
  float vig = 1.0 - 0.4 * dot(uv, uv);
  col *= vig;

  
  col = col / (col + vec3(1.0));
  col = pow(col, vec3(0.9)); 

  gl_FragColor = vec4(col, 1.0);
}`;class cx extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:lx,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.5+a*.3+n*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var ux=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform float u_beat;
uniform float u_energy;

varying vec2 vUv;

#define MAX_STEPS 55
#define SURF_DIST 0.003
#define VOXEL_SIZE 20.0
#define PI 3.14159265359

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float hash41(vec4 p4) {
  p4 = fract(p4 * vec4(.1031, .11369, .13787, .09987));
  p4 += dot(p4, p4.wzxy + 19.19);
  return fract((p4.x + p4.y) * (p4.z + p4.w));
}

float smax(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
  return mix(b, a, h) + k * h * (1.0 - h);
}

vec3 getCosPalette(float t, vec3 base, vec3 mid, vec3 accent) {
  vec3 a = (base + mid) * 0.5;
  vec3 b = (accent - base) * 0.5 + 0.3;
  return a + b * cos(2.0 * PI * (vec3(1.0) * t + vec3(0.0, 0.33, 0.67)));
}

float de_mandelbox(vec3 p, float audio) {
  vec4 q = vec4(p, 1.0);
  float scale = 2.4 + audio * 1.5;
  for (int i = 0; i < 3; i++) {
    q.xyz = clamp(q.xyz, -1.0, 1.0) * 2.0 - q.xyz;
    float r2 = dot(q.xyz, q.xyz);
    q *= clamp(max(0.25 / r2, 0.25), 0.0, 1.0);
    q = q * scale + vec4(p, 0.0);
  }
  return length(q.xyz) / abs(q.w);
}

float de_apollonian(vec3 p, float audio) {
  float s = 1.0;
  for (int i = 0; i < 3; i++) {
    p = -1.0 + 2.0 * fract(0.5 + 0.5 * p);
    float r2 = dot(p, p);
    float k = (1.15 + audio * 0.5) / r2;
    p *= k;
    s *= k;
  }
  return 0.3 * abs(p.y) / s;
}

float de_menger(vec3 p, float audio) {
  float d = length(max(abs(p) - 1.0, 0.0));
  float s = 1.0;
  for (int i = 0; i < 3; i++) {
    vec3 a = mod(p * s, 2.0) - 1.0;
    s *= 3.0;
    vec3 v = 1.0 - 3.0 * abs(a);
    d = max(d, max(v.x, max(v.y, v.z)) / s);
  }
  return d - audio * 0.1;
}

float de_lattice(vec3 p, float audio) {
  p = abs(mod(p, 4.0) - 2.0);
  float thickness = 0.08 + audio * 0.2;
  return min(length(p.xy), length(p.yz)) - thickness;
}

float de_sierpinski(vec3 p, float audio) {
  float scale = 1.0;
  float offset = 1.0 + audio * 0.3;
  for (int i = 0; i < 3; i++) {
    if (p.x + p.y < 0.0) p.xy = -p.yx;
    if (p.x + p.z < 0.0) p.xz = -p.zx;
    if (p.y + p.z < 0.0) p.yz = -p.zy;
    p = p * 2.0 - offset;
    scale *= 2.0;
  }
  return length(p) / scale - 0.01;
}

float de_kaleido(vec3 p, float audio) {
  float scale = 1.0;
  float angle = PI / (3.0 + audio * 3.0);
  for (int i = 0; i < 3; i++) {
    p = abs(p);
    p.xy *= rot(angle);
    p.xz *= rot(angle * 0.7);
    p -= vec3(1.0, 0.8, 1.2);
    p *= 1.4;
    scale *= 1.4;
  }
  return (length(p.xz) - 0.2) / scale;
}

vec4 map(vec3 p) {
  float tunnelSpeed = u_time * 0.1;
  vec3 q = p;
  q.xy -= vec2(sin(p.z * 0.15 + tunnelSpeed) * 3.5, cos(p.z * 0.1 + tunnelSpeed * 1.2) * 2.5);

  vec3 cell = floor(q / VOXEL_SIZE);
  vec3 localP = mod(q, VOXEL_SIZE) - VOXEL_SIZE * 0.5;

  
  float timeSlice = floor(u_time * 0.02);
  float timeFract = smoothstep(0.0, 1.0, fract(u_time * 0.02));
  float entropy = hash41(vec4(cell, timeSlice));
  float entropyNext = hash41(vec4(cell, timeSlice + 1.0));
  float entropy2 = hash41(vec4(cell + 73.0, timeSlice));

  
  vec3 cellFract = smoothstep(0.0, 0.3, fract(q / VOXEL_SIZE)) * smoothstep(1.0, 0.7, fract(q / VOXEL_SIZE));
  float blendEdge = min(cellFract.x, min(cellFract.y, cellFract.z));

  
  float safeBass = min(u_bass, 0.8);
  float safeMid = min(u_mid, 0.8);
  float safeTreble = min(u_treble, 0.8);
  float safeRms = min(u_rms, 0.7);

  
  int biomeId = int(entropy * 6.0);
  int biomeIdNext = int(entropyNext * 6.0);

  float d1;
  if (biomeId == 0) d1 = de_mandelbox(localP * 0.4, safeBass);
  else if (biomeId == 1) d1 = de_apollonian(localP * 0.5, safeRms * 0.6);
  else if (biomeId == 2) d1 = de_menger(localP * 0.35, safeMid);
  else if (biomeId == 3) d1 = de_lattice(localP, safeTreble);
  else if (biomeId == 4) d1 = de_sierpinski(localP * 0.3, safeBass);
  else d1 = de_kaleido(localP * 0.25, safeTreble);

  float d2;
  if (biomeIdNext == 0) d2 = de_mandelbox(localP * 0.4, safeBass);
  else if (biomeIdNext == 1) d2 = de_apollonian(localP * 0.5, safeRms * 0.6);
  else if (biomeIdNext == 2) d2 = de_menger(localP * 0.35, safeMid);
  else if (biomeIdNext == 3) d2 = de_lattice(localP, safeTreble);
  else if (biomeIdNext == 4) d2 = de_sierpinski(localP * 0.3, safeBass);
  else d2 = de_kaleido(localP * 0.25, safeTreble);

  
  float d = mix(d1, d2, timeFract);

  
  d = mix(d, d * 0.8, 1.0 - blendEdge);

  
  d = smax(d, -(length(q.xy) - (4.0 + safeBass * 2.0)), 1.2);

  return vec4(d, mix(entropy, entropyNext, timeFract), entropy2, length(localP));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  vec3 ro = vec3(sin(u_time * 0.4) * 2.0, 0.0, u_time * 6.0);
  vec3 rd = normalize(vec3(uv, 1.2));
  rd.xy *= rot(sin(u_time * 0.2) * 0.3);

  
  float ehStrength = smoothstep(0.6, 1.0, u_bass) * 0.4;
  rd = normalize(rd + vec3(0.0, 0.0, 1.0) * ehStrength * 0.1);

  float t = 0.0, glow = 0.0;
  vec4 sceneData;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    sceneData = map(p);
    glow += exp(-sceneData.x * 4.0) * 0.04;
    if (sceneData.x < SURF_DIST || t > 80.0) break;
    t += sceneData.x;
  }

  vec3 finalCol = u_colors[0] * 0.05;
  if (t < 80.0) {
    vec3 baseCol = getCosPalette(sceneData.y + t * 0.03 + sceneData.z * 3.0, u_colors[0], u_colors[1], u_colors[2]);
    float fog = exp(-t * 0.025);
    finalCol = baseCol * fog * 2.0;
    
    finalCol += u_colors[1] * pow(1.0 - fog, 2.0) * (0.6 + u_mid * 0.8);
    finalCol += u_colors[2] * pow(fog, 4.0) * u_treble * 2.5;
    
    finalCol += u_colors[0] * pow(u_bass, 2.0) * 0.6 * fog;
  }

  finalCol += getCosPalette(u_time * 0.02, u_colors[0], u_colors[1], u_colors[2]) * glow * 0.08;
  finalCol += u_colors[2] * u_beat * 0.08;
  
  finalCol += mix(u_colors[0], u_colors[1], u_bass) * 0.03;
  finalCol = mix(finalCol, u_colors[0] * 0.05, smoothstep(40.0, 80.0, t));

  gl_FragColor = vec4(pow(finalCol / (1.0 + finalCol), vec3(0.75)), 1.0);
}`;class hx extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:ux,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(133136),new he(1722987),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.9,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.4+a*.35+n*.25)*2;this.currentEnergy=this.currentEnergy*.96+c*.04,this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var dx=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 64
#define MAX_DIST 20.0
#define SURF_DIST 0.002
#define PI 3.14159265359

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
    
    p.xz *= rot(u_time * 0.15 + u_bass * 0.3);
    p.xy *= rot(u_time * 0.1);

    float scene = 1e5;

    
    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        vec3 off = vec3(
            sin(fi * 1.2 + u_time * 0.1) * 0.8,
            cos(fi * 0.9 + u_time * 0.08) * 0.6,
            sin(fi * 1.7) * 0.5
        );
        float size = 1.2 + fi * 0.15 + u_bass * 0.3;
        float oct = sdOctahedron(p - off, size);
        
        float cut = sdBox(p - off, vec3(size * 0.7));
        float crystal = max(oct, -cut * 0.5);
        scene = smin(scene, crystal, 0.3);
    }

    
    float inner = sdOctahedron(p, 0.6 + u_rms * 0.3);
    scene = max(scene, -inner);

    return scene;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.002, -0.002);
    return normalize(
        e.xyy * map(p + e.xyy) +
        e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) +
        e.xxx * map(p + e.xxx)
    );
}

vec3 opticalAxis(float t) {
    float angle = t * 0.2 + u_bass * PI;
    return normalize(vec3(sin(angle), cos(angle * 0.7), sin(angle * 0.3 + 0.5)));
}

vec3 thinFilm(float cosTheta, float thickness) {
    float delta = 2.0 * thickness * cosTheta;
    return 0.5 + 0.5 * cos(2.0 * PI * delta + vec3(0.0, 2.094, 4.188));
}

float glowAccum = 0.0;

float raymarch(vec3 ro, vec3 rd) {
    float t = 0.0;
    glowAccum = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        glowAccum += exp(-d * 6.0) * 0.012;
        if (d < SURF_DIST) return t;
        if (t > MAX_DIST) break;
        t += d * 0.85;
    }
    return -1.0;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    
    vec3 ro = vec3(0.0, 0.0, 5.0 - u_bass * 0.5);
    ro.x += sin(u_time * 31.0) * u_beat * 0.15;
    ro.y += cos(u_time * 37.0) * u_beat * 0.1;
    ro.xz *= rot(sin(u_time * 0.08) * 0.4);
    ro.yz *= rot(cos(u_time * 0.06) * 0.25);

    vec3 lookAt = vec3(0.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 1.2 + u_bass * 0.2;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    
    vec3 bgColor = u_colors[0] * 0.03 + u_colors[2] * 0.02 * (1.0 - length(uv));
    vec3 col = bgColor;

    float t = raymarch(ro, rd);

    if (t > 0.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        vec3 axis = opticalAxis(u_time);

        
        
        float delta_eta = 0.08 + u_treble * 0.15;
        float splitAngle = dot(n, axis) * delta_eta * 3.0;
        float cosNR = max(dot(n, -rd), 0.0);

        
        float splitFactor = 0.5 + 0.3 * dot(n, axis);
        vec3 col_o = u_colors[1] * (0.5 + 0.3 * cosNR);
        vec3 col_e = u_colors[2] * (0.5 + 0.3 * cosNR);
        vec3 refractedCol = mix(col_o, col_e, splitFactor + sin(splitAngle * 6.0) * 0.2);

        
        vec3 lightDir = normalize(vec3(1.0, 2.0, 3.0));
        lightDir.xz *= rot(u_time * 0.25);
        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 32.0 + u_treble * 64.0);

        
        float fresnel = pow(1.0 - cosNR, 4.0);
        float filmThickness = 1.5 + u_mid * 2.0 + length(p) * 0.3;
        vec3 film = thinFilm(cosNR, filmThickness);
        vec3 filmColor = mix(u_colors[1], u_colors[2], film);

        
        float ao = clamp(map(p + n * 0.15) / 0.15, 0.0, 1.0);

        
        col = refractedCol * 0.4;
        col += diff * mix(u_colors[1], filmColor, 0.5) * 0.5 * ao;
        col += spec * u_colors[2] * (0.5 + u_treble * 1.0);
        col += fresnel * filmColor * 0.6;

        
        col += fresnel * fresnel * fresnel * u_colors[2] * (0.3 + u_rms * 0.7);
    }

    
    vec3 glowColor = mix(u_colors[1], u_colors[2], 0.6);
    col += glowAccum * glowColor * (u_treble * 1.5 + u_rms * 0.5);

    
    col += vec3(1.0) * u_beat * 0.25;

    
    col *= 1.0 - 0.4 * dot(uv, uv);

    
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}`;class fx extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:dx,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.5+a*.3+n*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var px=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define PI 3.14159265359
#define MAX_STEPS 48
#define MAX_DIST 12.0

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float waveFunction(vec3 p, float phase) {
    float psi = 0.0;

    
    float r = length(p);
    psi += sin(4.0 * r - phase * 2.0) * exp(-r * 0.8) * 1.5;

    
    float py = p.y / (r + 0.01);
    psi += sin(6.0 * r - phase * 1.5) * py * exp(-r * 0.6);

    
    float dxz = p.x * p.z / (r * r + 0.01);
    psi += sin(5.0 * r - phase * 1.8) * dxz * 2.0 * exp(-r * 0.7);

    return psi;
}

float probabilityDensity(vec3 p, float beat) {
    
    float phase = u_time * 1.5;

    
    phase += beat * 5.0;

    
    p.xz *= rot(u_bass * 0.5);
    p.xy *= rot(u_time * 0.1);

    float psi = waveFunction(p, phase);

    
    return psi * psi;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    
    float camDist = 6.0 - u_bass * 0.8;
    vec3 ro = vec3(
        sin(u_time * 0.15) * camDist,
        sin(u_time * 0.1) * 2.0,
        cos(u_time * 0.15) * camDist
    );
    ro.x += sin(u_time * 35.0) * u_beat * 0.2;
    ro.y += cos(u_time * 41.0) * u_beat * 0.15;

    vec3 lookAt = vec3(0.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 1.0 + u_rms * 0.3;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    
    vec3 col = vec3(0.0);
    float jitter = hash(gl_FragCoord.xy + u_time) * 0.5;

    float stepSize = MAX_DIST / float(MAX_STEPS);
    float t = jitter * stepSize;
    float totalDensity = 0.0;

    
    float temperature = 0.3 + u_rms * 2.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;

        float density = probabilityDensity(p, u_beat);

        if (density > 0.01) {
            
            float r = length(p);
            float colorT = fract(r * 0.3 + density * 0.5 + u_time * 0.05);

            
            vec3 cloudColor;
            float seg = colorT * 2.0;
            if (seg < 1.0) {
                cloudColor = mix(u_colors[0], u_colors[1], seg);
            } else {
                cloudColor = mix(u_colors[1], u_colors[2], seg - 1.0);
            }

            
            float emission = density * temperature * stepSize;
            emission = min(emission, 0.15); 

            
            cloudColor = mix(cloudColor, u_colors[2], u_energy * density * 0.5);

            col += cloudColor * emission * (1.0 - totalDensity);
            totalDensity += emission * 2.0;

            if (totalDensity > 0.95) break;
        }

        t += stepSize;
        if (t > MAX_DIST) break;
    }

    
    vec3 bg = u_colors[0] * 0.03;
    bg += u_colors[2] * 0.015 * (1.0 - length(uv));
    col = mix(bg, col, min(totalDensity * 3.0, 1.0));

    
    float ambientGlow = exp(-length(uv) * 2.0) * 0.08;
    col += mix(u_colors[1], u_colors[2], 0.5) * ambientGlow;

    
    col += vec3(0.8, 0.9, 1.0) * u_beat * 0.2;

    
    col *= 1.0 - 0.35 * dot(uv, uv);

    
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}`;class mx extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:px,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.5+a*.3+n*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var gx=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define PI 3.14159265359
#define MAX_STEPS 60
#define MAX_DIST 20.0
#define SURF_DIST 0.002

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec3 hash33(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453);
}

float blockTime(vec3 blockId) {
    float h = hash21(blockId.xy + blockId.z * 17.3);
    
    float timeDelay = h * u_bass * 2.0;
    return u_time - timeDelay;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

vec2 camPath(float z) {
    float speed = u_time * 0.6 + u_energy * u_time * 0.15;
    return vec2(sin(speed * 0.2) * 2.5, cos(speed * 0.15) * 1.5);
}

float map(vec3 p) {
    
    float blockSize = 1.2 + u_mid * 0.4;

    
    vec3 blockId = floor(p / blockSize);
    vec3 blockPos = fract(p / blockSize) - 0.5; 

    
    vec3 h = hash33(blockId);
    float bt = blockTime(blockId);

    
    float alive = step(0.3, h.x + u_energy * 0.3);

    
    vec3 q = blockPos;
    q.xy *= rot(bt * (h.y - 0.5) * 2.0);
    q.yz *= rot(bt * (h.z - 0.5) * 1.5);

    
    float boxD = sdBox(q, vec3(0.25 + h.y * 0.12));
    float sphereD = length(q) - (0.2 + h.z * 0.12);
    float d = mix(boxD, sphereD, h.x) * blockSize;

    
    d = mix(10.0, d, alive);

    
    float glitchStrength = u_beat * 0.15 + u_treble * 0.05;
    vec3 glitchOff = (h - 0.5) * glitchStrength;
    
    if (u_beat > 0.3) {
        vec3 q2 = blockPos + glitchOff;
        q2.xy *= rot(bt * (h.y - 0.5) * 3.0);
        float gd = mix(sdBox(q2, vec3(0.2)), length(q2) - 0.18, h.x) * blockSize;
        d = mix(d, gd, u_beat);
    }

    
    
    d = max(d, length(blockPos) * blockSize - blockSize * 0.48);

    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.001, -0.001);
    return normalize(
        e.xyy * map(p + e.xyy) +
        e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) +
        e.xxx * map(p + e.xxx)
    );
}

float glowAccum = 0.0;

float raymarch(vec3 ro, vec3 rd) {
    float t = 0.05; 
    glowAccum = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        
        d = max(d, 0.001);
        glowAccum += exp(-d * 5.0) * 0.01;
        if (d < SURF_DIST) return t;
        if (t > MAX_DIST) break;
        t += d * 0.9;
    }
    return -1.0;
}

vec3 scanlineEffect(vec2 uv, vec3 col) {
    
    float scan = sin(uv.y * u_resolution.y * 1.5) * 0.5 + 0.5;
    col *= 0.95 + 0.05 * scan;

    
    float barY = fract(u_time * 0.5 + u_beat * 1.5);
    float bar = smoothstep(0.0, 0.03, abs(uv.y - barY + 0.5));
    float shift = (1.0 - bar) * u_beat * 0.02;
    col.r = mix(col.r, col.g, shift * 3.0);

    return col;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    
    float speed = u_time * 0.6 + u_energy * u_time * 0.15;
    vec3 ro = vec3(sin(speed * 0.2) * 2.5, cos(speed * 0.15) * 1.5, speed);
    ro.x += sin(u_time * 0.8) * u_beat * 0.08;
    ro.y += cos(u_time * 0.7) * u_beat * 0.06;

    vec3 lookAt = ro + vec3(sin(u_time * 0.08) * 0.3, cos(u_time * 0.06) * 0.2, 3.0);
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    
    float roll = u_beat * 0.04;
    vec2 ruv = uv;
    ruv = vec2(ruv.x * cos(roll) - ruv.y * sin(roll),
               ruv.x * sin(roll) + ruv.y * cos(roll));

    float fov = 1.0 + u_bass * 0.2;
    vec3 rd = normalize(ruv.x * right + ruv.y * up + fov * fwd);

    
    float t = raymarch(ro, rd);

    
    vec3 bg = u_colors[0] * 0.04;
    
    vec2 gridUv = fract(uv * 8.0 + u_time * 0.1);
    float grid = smoothstep(0.02, 0.0, min(gridUv.x, gridUv.y));
    bg += u_colors[1] * grid * 0.05;

    vec3 col = bg;

    if (t > 0.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        
        float blockSize = 0.8 + u_mid * 0.5;
        vec3 blockId = floor(p / blockSize);
        vec3 h = hash33(blockId);

        
        float colorIdx = fract(h.x + h.y * 0.5);
        vec3 surfColor;
        float seg = colorIdx * 2.0;
        if (seg < 1.0) {
            surfColor = mix(u_colors[0] * 2.0, u_colors[1], seg);
        } else {
            surfColor = mix(u_colors[1], u_colors[2], seg - 1.0);
        }

        
        vec3 lightDir = normalize(vec3(0.5, 1.0, -0.5));
        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 16.0);

        col = surfColor * (0.3 + diff * 0.6);
        col += spec * u_colors[2] * 0.5;

        
        vec3 localP = fract(p / blockSize);
        float edge = 1.0 - smoothstep(0.0, 0.08, min(min(localP.x, 1.0 - localP.x),
                                                        min(localP.y, 1.0 - localP.y)));
        col += u_colors[2] * edge * 0.4;

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        col += u_colors[1] * fresnel * 0.3;
    }

    
    col += glowAccum * mix(u_colors[1], u_colors[2], 0.5) * (u_rms + 0.3);

    
    col = scanlineEffect(uv, col);

    
    col += vec3(0.9, 1.0, 0.95) * u_beat * 0.08;

    
    float vig = 1.0 - 0.5 * pow(length(uv), 2.5);
    col *= vig;

    
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.92));

    gl_FragColor = vec4(col, 1.0);
}`;class vx extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:gx,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.5+a*.3+n*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var _x=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 90
#define MAX_DIST 40.0
#define SURF_DIST 0.002 

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

vec2 path(float z) {
    return vec2(sin(z * 0.15) * 2.0, cos(z * 0.1) * 1.5);
}

float map(vec3 p) {
    
    vec2 center = path(p.z);

    
    float tube = length(p.xy - center) - 1.5;

    
    vec3 q = p;
    q.xy -= center; 
    q.xy *= rot(q.z * 0.05); 

    
    q = mod(q, 8.0) - 4.0;

    float scale = 1.0;
    float d = 1e5;

    
    
    for (int i = 0; i < 4; i++) {
        q = abs(q) - (1.0 + u_bass * 0.3); 

        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float s = 2.4 + u_mid * 0.2;
        q = q * s - 2.0 * (s - 1.0);
        scale *= s;

        
        float box = (max(abs(q.x), max(abs(q.y), abs(q.z))) - 2.5) / scale;
        d = min(d, box);
    }

    
    return max(d, -tube);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.002, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

vec3 thinFilm(float cosTheta) {
    return 0.5 + 0.5 * cos(6.28 * (cosTheta + vec3(0.0, 0.33, 0.67) + u_time * 0.2));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    
    
    float time = u_time * 2.5;

    vec3 ro = vec3(path(time), time); 
    vec3 lookAt = vec3(path(time + 1.0), time + 1.0);

    
    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);
    float fov = 0.8 + u_bass * 0.2;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);

    
    rd.xy *= rot(sin(u_time * 0.5) * 0.2);

    float t = 0.0;
    float glow = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        
        glow += exp(-d * 4.0) * (0.015 + u_rms * 0.03);

        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.7; 
    }

    vec3 col = u_colors[0] * 0.02; 

    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.5);
        vec3 iri = thinFilm(fresnel);

        
        vec3 rd_o = refract(rd, n, 0.8);
        vec3 rd_e = refract(rd, n, 0.85 + u_treble * 0.2);

        
        vec3 lightCol = mix(u_colors[1], u_colors[2], sin(p.z * 0.1) * 0.5 + 0.5);

        
        col = vec3(0.01); 
        col += iri * fresnel * 2.0; 
        col += lightCol * glow * 0.7; 

        float spec = pow(max(dot(reflect(rd, n), normalize(vec3(0.0, 1.0, 1.0))), 0.0), 32.0);
        col += spec * u_colors[2] * (1.0 + u_bass);

        
        col *= exp(-0.06 * t);
    }

    
    col += mix(u_colors[1], u_colors[2], 0.5) * glow * 0.3;

    
    col += vec3(1.0) * u_beat * 0.15;

    
    col = pow(col, vec3(0.85)) * 1.2;

    gl_FragColor = vec4(col, 1.0);
}`;class xx extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:_x,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.5+a*.3+n*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var yx=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 90
#define MAX_DIST 50.0
#define SURF_DIST 0.0015

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash11(float p) {
    return fract(sin(p * 127.1) * 43758.5453);
}

vec2 path(float z) {
    return vec2(sin(z * 0.15) * 2.5, cos(z * 0.1) * 1.5);
}

float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
    return mix(b, a, h) + k * h * (1.0 - h);
}

vec3 rot4d(vec3 p, float w, float angle) {
    float s = sin(angle), c = cos(angle);
    float nx = p.x * c - w * s;
    float nw = p.x * s + w * c;
    return vec3(nx, p.y + nw * 0.3, p.z);
}

float map(vec3 p) {
    vec2 p_offset = path(p.z);
    vec3 q = p;
    q.xy -= p_offset;

    
    float _bass = max(u_bass, 0.35);
    float _mid = max(u_mid, 0.25);
    float _treble = max(u_treble, 0.15);
    float _rms = max(u_rms, 0.2);
    float _beat = u_beat;
    float _energy = max(u_energy, 0.3);

    float tunnel = length(q.xy) - (1.8 + _bass * 0.3 + _beat * 0.15);

    
    float cellSize = 8.0;
    float cellId = floor(p.z / cellSize);
    float genome = hash11(cellId);

    float discreteShift = hash11(floor(u_time * 2.2) + cellId) * 6.28;
    float w = u_time * 0.2 + _bass * 0.8;

    q = rot4d(q, w, u_time * 0.15 + genome * 3.14);
    q.xy *= rot(p.z * 0.1 + u_time * 0.15 + genome * 2.0);

    
    float s = 1.0;
    vec3 foldOff = mix(vec3(1.0), vec3(1.4, 0.8, 1.2), genome) + vec3(_bass * 0.2, _mid * 0.15, _treble * 0.1);
    float rAngle = mix(0.35, 0.65, genome) + _treble * 0.1 + _bass * 0.08;
    mat2 rMat = rot(rAngle + discreteShift * 0.1);
    float iterScale = mix(1.5, 1.8, genome) + _bass * 0.1 + _rms * 0.08;

    for (int i = 0; i < 5; i++) {
        q = abs(q) - foldOff;

        
        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;

        q.xy *= rMat;
        q *= iterScale;
        s *= iterScale;
    }

    float shape = mix((length(q) - 0.6 - _rms * 0.2), ((abs(q.x) + abs(q.y) + abs(q.z)) * 0.577 - 0.8 - _beat * 0.15), genome) / s;

    
    float columns = 1e5;
    {
        vec3 colQ = p;
        colQ.xy -= p_offset;
        float colGrid = max(abs(mod(colQ.x, 1.5) - 0.75), abs(mod(colQ.y, 1.5) - 0.75)) - 0.08;
        columns = max(colGrid, -(length(colQ.xy) - 1.2 - (_beat * 2.0 + _rms * 1.5)));
    }

    return smax(min(shape, columns), -tunnel, 0.8);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.005, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

vec3 pal(float t) {
    return 0.5 + 0.5 * cos(6.28 * (t + vec3(0.0, 0.3, 0.6) + u_time * 0.08));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    
    float bass = max(u_bass, 0.35);
    float mid = max(u_mid, 0.25);
    float treble = max(u_treble, 0.15);
    float rms = max(u_rms, 0.2);
    float energy = max(u_energy, 0.3);
    float beat = u_beat;

    
    float speed = 3.5;
    float z = u_time * speed;
    vec3 ro = vec3(path(z), z);
    vec3 lookAt = vec3(path(z + 2.0), z + 2.0);

    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    
    vec3 rd = normalize(uv.x * right + uv.y * up + 1.1 * fwd);
    rd.xy *= rot(sin(u_time * 0.15) * 0.06);

    float t = 0.0, d, glow = 0.0;
    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        glow += exp(-max(d, 0.0) * 3.5) * (0.025 + rms * 0.03);
        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.08 + vec3(0.01); 
    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);
        float genome = hash11(floor(p.z / 8.0));

        float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
        vec3 refr = pal(fres + p.z * 0.05 + genome);

        col = vec3(0.03) + refr * fres * 2.5;
        col += mix(u_colors[1], u_colors[2], genome) * (glow * 0.5 + 0.15);

        
        col += pow(max(dot(reflect(rd, n), fwd), 0.0), 32.0) * u_colors[0] * (1.0 + bass);
        col *= exp(-0.025 * t);
    }

    col += pal(u_time * 0.1) * glow * (0.35 + beat * 0.3);
    col = smoothstep(-0.05, 1.1, col * 1.2);
    col *= 1.0 - length(uv) * 0.5; 

    gl_FragColor = vec4(col, 1.0);
}`;class bx extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:yx,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.5+a*.3+n*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var Sx=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];

varying vec2 vUv;

#define MAX_STEPS 55
#define MAX_DIST 45.0
#define SURF_DIST 0.005

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float hash11(float p) {
    return fract(sin(p * 127.1) * 43758.5453);
}

vec2 path(float z) {
    return vec2(sin(z * 0.12) * 2.0, cos(z * 0.08) * 1.2);
}

float de_menger(vec3 p, float audio) {
    float d = length(max(abs(p) - 1.0, 0.0));
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        vec3 a = mod(p * s, 2.0) - 1.0;
        s *= 3.0;
        vec3 v = 1.0 - 3.0 * abs(a);
        d = max(d, max(v.x, max(v.y, v.z)) / s);
    }
    return d - audio * 0.05;
}

float de_kifs(vec3 p, float audio) {
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        p = abs(p) - vec3(1.2, 0.8, 1.0);
        p.xy *= rot(0.5 + audio * 0.1);
        p.yz *= rot(0.3);
        float sc = 1.7;
        p *= sc;
        s *= sc;
    }
    return (length(p) - 0.6) / s;
}

float de_apollonian(vec3 p, float audio) {
    float s = 1.0;
    for (int i = 0; i < 3; i++) {
        p = -1.0 + 2.0 * fract(0.5 + 0.5 * p);
        float r2 = dot(p, p);
        float k = (1.15 + audio * 0.3) / r2;
        p *= k;
        s *= k;
    }
    return 0.25 * abs(p.y) / s;
}

float de_sierpinski(vec3 p, float audio) {
    float scale = 1.0;
    float offset = 1.0 + audio * 0.2;
    for (int i = 0; i < 3; i++) {
        if (p.x + p.y < 0.0) p.xy = -p.yx;
        if (p.x + p.z < 0.0) p.xz = -p.zx;
        if (p.y + p.z < 0.0) p.yz = -p.zy;
        p = p * 2.0 - offset;
        scale *= 2.0;
    }
    return length(p) / scale - 0.01;
}

float smax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
    return mix(b, a, h) + k * h * (1.0 - h);
}

float map(vec3 p) {
    vec2 center = path(p.z);
    vec3 q = p;
    q.xy -= center;

    
    float distFromCenter = length(q.xy);

    
    float cellSize = 20.0;
    
    float wrappedZ = mod(p.z, cellSize * 50.0); 
    float cellId = floor(wrappedZ / cellSize);
    float cellFract = fract(wrappedZ / cellSize);
    float genome = hash11(mod(cellId, 47.0)); 
    float genomeNext = hash11(mod(cellId + 1.0, 47.0));

    
    vec3 lp = q;
    lp.z = mod(q.z, cellSize) - cellSize * 0.5; 
    lp.xy *= rot(wrappedZ * 0.04 + u_time * 0.08);

    
    float bass = min(u_bass, 0.8);
    float treble = min(u_treble, 0.8);

    
    float d1;
    int biome = int(genome * 4.0);
    if (biome == 0) d1 = de_menger(lp * 0.35, bass);
    else if (biome == 1) d1 = de_kifs(lp * 0.3, treble);
    else if (biome == 2) d1 = de_apollonian(lp * 0.4, u_rms * 0.4);
    else d1 = de_sierpinski(lp * 0.3, bass);

    
    float d2;
    int biomeNext = int(genomeNext * 4.0);
    if (biomeNext == 0) d2 = de_menger(lp * 0.35, bass);
    else if (biomeNext == 1) d2 = de_kifs(lp * 0.3, treble);
    else if (biomeNext == 2) d2 = de_apollonian(lp * 0.4, u_rms * 0.4);
    else d2 = de_sierpinski(lp * 0.3, bass);

    
    float fadeIn = smoothstep(0.0, 0.12, cellFract);
    float fadeOut = smoothstep(1.0, 0.88, cellFract);
    float biomePresence = fadeIn * fadeOut;

    float blend = smoothstep(0.75, 1.0, cellFract);
    float d = mix(d1, d2, blend);

    
    d = mix(2.0, d, biomePresence);

    
    float tunnel = distFromCenter - (2.0 + bass * 0.4);
    d = max(d, -tunnel);

    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(0.006, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

vec3 thinFilm(float cosTheta) {
    return 0.5 + 0.5 * cos(6.28 * (cosTheta + vec3(0.0, 0.33, 0.67) + u_time * 0.15));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.y, u_resolution.x);

    
    float speed = u_time * 2.0;
    vec3 ro = vec3(path(speed), speed);
    vec3 lookAt = vec3(path(speed + 2.0), speed + 2.0);

    vec3 fwd = normalize(lookAt - ro);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
    vec3 up = cross(fwd, right);

    float fov = 1.0 + u_bass * 0.15;
    vec3 rd = normalize(uv.x * right + uv.y * up + fov * fwd);
    
    rd.xy *= rot(sin(u_time * 0.25) * 0.12);

    float t = 0.1, d;
    float glow = 0.0;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        glow += exp(-max(d, 0.0) * 3.5) * (0.015 + u_rms * 0.04);
        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.8;
    }

    vec3 col = u_colors[0] * 0.015;

    vec3 c1 = (length(u_colors[1]) > 0.01) ? u_colors[1] : vec3(0.2, 0.5, 1.0);
    vec3 c2 = (length(u_colors[2]) > 0.01) ? u_colors[2] : vec3(1.0, 0.3, 0.6);

    if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        
        float cellId = floor(mod(p.z, 1000.0) / 20.0);
        float genome = hash11(mod(cellId, 47.0));

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
        vec3 iri = thinFilm(fresnel + genome);

        
        vec3 surfColor = mix(c1, c2, genome);

        
        col = vec3(0.01);
        col += iri * fresnel * 2.0;
        col += surfColor * glow * 0.5;

        
        float spec = pow(max(dot(reflect(rd, n), fwd), 0.0), 40.0);
        col += spec * c2 * (1.0 + u_bass * 0.8);

        
        col *= exp(-0.04 * t);
    }

    
    col += mix(c1, c2, 0.5) * glow * (0.25 + u_beat * 0.4);

    
    col += c2 * pow(u_beat, 3.0) * 0.12;

    
    col = col / (col + vec3(1.0)); 
    col = pow(col, vec3(0.85));
    col *= 1.0 - 0.4 * dot(uv, uv); 

    gl_FragColor = vec4(col, 1.0);
}`;class Mx extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new He({vertexShader:lt,fragmentShader:Sx,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731470),new he(54527)]}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.5+a*.3+n*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var wx=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform sampler2D u_albumArt;
uniform float u_seed;
uniform float u_biomePhase; 

uniform float u_lyricsActive;   
uniform float u_lyricsProgress; 
uniform float u_adlib;          
uniform float u_wordIntensity;  
uniform float u_lineBreak;      

varying vec2 vUv;

#define MAX_STEPS 40
#define MAX_DIST 35.0
#define SURF_DIST 0.008
#define PI 3.14159265359
#define TAU 6.28318530718

mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }
float hash(float n) { return fract(sin(n) * 43758.5453); }
float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hash33(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p) * 43758.5453123);
}

float noise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = i.x + i.y * 57.0 + i.z * 113.0;
    return mix(mix(mix(hash(n), hash(n + 1.0), f.x),
                   mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
               mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                   mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
}

float fbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {
        v += a * noise(p);
        p = p * 2.1 + vec3(1.7, 1.2, 0.8);
        a *= 0.5;
    }
    return v;
}

float noise2D(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash2(i), b = hash2(i + vec2(1.0, 0.0));
    float c = hash2(i + vec2(0.0, 1.0)), d = hash2(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float albumLuma(vec2 uv) {
    return dot(texture2D(u_albumArt, fract(uv)).rgb, vec3(0.299, 0.587, 0.114));
}
vec3 albumColor(vec2 uv) {
    return texture2D(u_albumArt, fract(uv)).rgb;
}

struct Config {
    float cameraStyle;
    float biomeBlend;
    float foldCount;
    float twistRate;
    float colorShift;
    float architectScale;
    float organicRate;
    float crystalDensity;
};

Config getConfig() {
    Config c;
    float s = u_seed;
    c.cameraStyle = hash(s * 127.1);
    c.biomeBlend = 0.3 + hash(s * 311.7) * 0.7;
    c.foldCount = 3.0 + floor(hash(s * 74.7) * 5.0);
    c.twistRate = 0.05 + hash(s * 246.1) * 0.15;
    c.colorShift = hash(s * 183.3) * TAU;
    c.architectScale = 1.5 + hash(s * 124.6) * 2.0;
    c.organicRate = 0.3 + hash(s * 531.2) * 0.7;
    c.crystalDensity = 0.5 + hash(s * 97.3) * 0.5;
    return c;
}

vec3 camPos(float t, Config cfg) {
    float st = t * 0.08;
    float s = u_seed * TAU;

    
    float z = t * 0.5;

    
    vec3 pos = vec3(
        sin(st * 0.7 + s) * 0.3 + sin(st * 0.3 + s * 2.1) * 0.15,
        cos(st * 0.5 + s * 0.7) * 0.25 + sin(st * 0.2 + s * 1.3) * 0.1,
        z
    );

    return pos;
}

vec3 cameraTarget(float t, Config cfg) {
    float st = t * 0.08;
    float s = u_seed * TAU;
    float z = t * 0.5;
    
    vec3 target = vec3(
        sin((st + 1.0) * 0.7 + s) * 0.3 + sin((st + 1.0) * 0.3 + s * 2.1) * 0.15,
        cos((st + 1.0) * 0.5 + s * 0.7) * 0.25 + sin((st + 1.0) * 0.2 + s * 1.3) * 0.1,
        z + 3.0
    );
    return target;
}

float sdBox(vec3 p, vec3 b) {
    vec3 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}
float sdSphere(vec3 p, float r) { return length(p) - r; }
float sdTorus(vec3 p, vec2 t) {
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}
float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
}
float sdCappedCylinder(vec3 p, float h, float r) {
    vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * 0.25;
}

float crystalCathedral(vec3 p, Config cfg) {
    float artVal = albumLuma(vec2(u_seed * 3.0, length(p) * 0.05));
    float artVal2 = albumLuma(vec2(p.z * 0.02, p.x * 0.02));
    float angle = PI / cfg.foldCount;

    for (int i = 0; i < 4; i++) {
        p.xy *= rot(angle + float(i) * 0.1 * artVal);
        p.xy = abs(p.xy);
        p.xz *= rot(angle * 0.7 + artVal2 * PI * 0.5 + u_time * 0.005 * cfg.organicRate);
        p.xz = abs(p.xz);
        float sc = 1.5 + artVal * 0.2;
        p = p * sc - vec3(1.5 + artVal * 0.3, 1.2, 1.8);
        p.yz *= rot(0.2 + artVal2 * 0.3);
    }

    float crystal = sdBox(p, vec3(0.8, 0.4, 1.6)) / 32.0;
    float beam = sdCappedCylinder(p.xzy, 3.0, 0.22) / 32.0;
    return min(crystal, beam);
}

float livingMembrane(vec3 p, Config cfg) {
    float artVal = albumLuma(vec2(p.x * 0.05 + u_time * 0.003, p.z * 0.05));
    float artVal2 = albumLuma(vec2(p.z * 0.03 + u_seed, p.y * 0.05));

    float twist = p.z * cfg.twistRate * 2.0 + artVal * 1.5;
    p.xy *= rot(twist);

    float r = length(p.xy);
    float a = atan(p.y, p.x);
    float breathe = 1.8 + sin(u_time * cfg.organicRate * 0.3 + p.z * 0.4) * 0.3 + artVal * 0.5;
    float starN = 3.0 + floor(artVal2 * 5.0);
    float modulation = 1.0 + sin(a * starN + p.z * 0.5 + u_time * 0.05) * 0.25;

    float membrane = abs(r - breathe * modulation) - 0.1;
    float veins = abs(sin(a * 8.0 + p.z * 3.0 + u_time * 0.1) * cos(p.z * 4.0 + a * 3.0)) - 0.04;
    float inner = abs(r - breathe * 0.3 * modulation) - 0.05;

    return smin(membrane, min(veins * 0.3 + 0.15, inner), 0.2);
}

float escherArchitecture(vec3 p, Config cfg) {
    float artVal = albumLuma(vec2(p.z * 0.003 + u_seed, u_seed * 2.0));

    float w = sin(u_time * 0.015 + p.z * 0.01) * PI;
    p.xz *= rot(w * 0.3);
    p.yz *= rot(w * 0.2 + artVal);

    float d = 1e10;
    float s = 1.0;
    vec3 q = p;

    for (int i = 0; i < 4; i++) {
        q = abs(q);
        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float sc = cfg.architectScale + artVal * 0.3;
        vec3 offset = vec3(1.0 + artVal * 0.3, 1.0, 1.0 + (1.0 - artVal) * 0.3);
        q = q * sc - offset * (sc - 1.0);
        s *= sc;

        float cross1 = max(abs(q.x), abs(q.y));
        float cross2 = max(abs(q.y), abs(q.z));
        float cross3 = max(abs(q.x), abs(q.z));
        float beam = min(cross1, min(cross2, cross3)) / s - 0.4 / s;
        d = min(d, beam);
    }

    float platforms = sdBox(mod(p + 3.0, 6.0) - 3.0, vec3(2.0, 0.06, 2.0));
    return min(d, platforms * 0.5);
}

float spectralVoid(vec3 p, Config cfg) {
    
    vec3 warp = vec3(noise(p * 0.4 + u_time * 0.008), noise(p * 0.4 + 100.0 + u_time * 0.006), noise(p * 0.4 + 200.0 + u_time * 0.01));
    p += warp * 1.5;

    float filament1 = abs(sin(p.x * 0.5 + p.z * 0.3 + u_time * 0.03) * cos(p.y * 0.4 + u_time * 0.025)) - 0.12;
    float filament2 = abs(sin(p.y * 0.6 + p.x * 0.2 + u_time * 0.025) * cos(p.z * 0.5 + u_time * 0.02)) - 0.1;

    float r = length(p);
    float shells = abs(sin(r * 0.8 - u_time * 0.06)) - 0.3;

    float artVal = albumLuma(vec2(atan(p.y, p.x) / TAU + 0.5, p.z * 0.01));
    float nodes = sdSphere(mod(p + 4.0, 8.0) - 4.0, 0.5 + artVal * 0.6);

    float d = min(filament1, filament2);
    d = smin(d, shells * 0.5, 0.5);
    d = smin(d, nodes * 0.3, 0.3);
    return d;
}

float tesseractLattice(vec3 p, Config cfg) {
    float artVal = albumLuma(vec2(u_seed + p.z * 0.01, p.x * 0.01));

    
    float t4 = u_time * 0.008 + u_seed * TAU;
    p.xz *= rot(t4 + artVal * 0.5);
    p.xy *= rot(t4 * 0.3);

    float cellSize = cfg.architectScale * 1.5;
    vec3 id = floor(p / cellSize);
    vec3 rp = mod(p, cellSize) - cellSize * 0.5;
    float h = hash(dot(id, vec3(127.1, 311.7, 74.7)));

    float box = sdBox(rp, vec3(0.7 + h * 0.3));
    float oct = sdOctahedron(rp, 0.9 + h * 0.4);
    float tor = sdTorus(rp, vec2(0.7 + h * 0.3, 0.15));

    float d = mix(box, oct, smoothstep(0.3, 0.7, h));
    d = mix(d, tor, smoothstep(0.6, 0.9, fract(h * 7.13)));

    
    float beamX = sdCappedCylinder(rp.yzx, cellSize * 0.5, 0.04);
    float beamY = sdCappedCylinder(rp.xzy, cellSize * 0.5, 0.04);
    float beamZ = sdCappedCylinder(rp, cellSize * 0.5, 0.04);

    return min(d, min(beamX, min(beamY, beamZ)));
}

float map(vec3 p) {
    Config cfg = getConfig();

    
    float selector = u_biomePhase + u_seed * 5.0;
    float blend = fract(selector);
    blend = smoothstep(0.0, 1.0, blend);
    int biomeA = int(mod(floor(selector), 5.0));
    int biomeB = int(mod(floor(selector) + 1.0, 5.0));

    
    vec3 rp = mod(p + 4.0, 8.0) - 4.0;

    
    float dA = 1.0, dB = 1.0;

    if (biomeA == 0) dA = crystalCathedral(rp, cfg);
    else if (biomeA == 1) dA = livingMembrane(rp, cfg);
    else if (biomeA == 2) dA = escherArchitecture(rp, cfg);
    else if (biomeA == 3) dA = spectralVoid(rp, cfg);
    else dA = tesseractLattice(rp, cfg);

    if (biomeB == 0) dB = crystalCathedral(rp, cfg);
    else if (biomeB == 1) dB = livingMembrane(rp, cfg);
    else if (biomeB == 2) dB = escherArchitecture(rp, cfg);
    else if (biomeB == 3) dB = spectralVoid(rp, cfg);
    else dB = tesseractLattice(rp, cfg);

    float d = mix(dA, dB, blend);

    
    
    float corridorDist = length(rp.xy);
    float corridorPush = smoothstep(1.5, 0.3, corridorDist) * 0.5;
    d += corridorPush;

    return d;
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(SURF_DIST * 2.0, 0.0);
    return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
}

float ao(vec3 p, vec3 n) {
    float occ = 0.0, sca = 1.0;
    for (int i = 0; i < 5; i++) {
        float h = 0.01 + 0.12 * float(i);
        occ += (h - map(p + h * n)) * sca;
        sca *= 0.7;
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

float softShadow(vec3 ro, vec3 rd, float mint, float maxt, float k) {
    float res = 1.0, t = mint;
    for (int i = 0; i < 24; i++) {
        float h = map(ro + rd * t);
        res = min(res, k * h / t);
        t += clamp(h, 0.02, 0.5);
        if (res < 0.001 || t > maxt) break;
    }
    return clamp(res, 0.0, 1.0);
}

vec3 iridescence(float cosTheta, float thickness) {
    float offset = thickness * 2.0 + u_time * 0.01;
    return 0.5 + 0.5 * cos(TAU * (cosTheta * 1.5 + offset + vec3(0.0, 0.33, 0.67)));
}

vec3 godRays(vec3 ro, vec3 rd, float tMax) {
    vec3 col = vec3(0.0);
    float dt = tMax / 16.0;
    float t = dt * hash2(gl_FragCoord.xy + u_time);
    for (int i = 0; i < 16; i++) {
        vec3 p = ro + rd * t;
        float density = max(0.0, 0.3 - map(p)) * 2.0;
        vec3 rayCol = mix(u_colors[0], u_colors[1], sin(t * 0.3 + u_time * 0.1) * 0.5 + 0.5);
        rayCol = mix(rayCol, u_colors[2], sin(t * 0.5 + u_time * 0.15) * 0.5 + 0.5);
        col += rayCol * density * dt * 0.3;
        t += dt;
        if (t > tMax) break;
    }
    return col;
}

vec3 stars(vec3 rd) {
    vec3 p = rd * 400.0;
    vec3 id = floor(p);
    vec3 fp = fract(p) - 0.5;
    vec3 h = hash33(id);
    float star = step(0.975, h.x) * pow(max(0.0, 1.0 - length(fp) * 3.0), 10.0);
    vec3 starCol = mix(vec3(0.8, 0.9, 1.0), u_colors[1], h.y);
    star *= 0.7 + 0.3 * sin(u_time * (2.0 + h.z * 4.0) + h.x * 100.0);
    return starCol * star * 3.0;
}

vec3 dispersion(vec3 rd, vec3 n, float ior) {
    vec3 r = refract(rd, n, 1.0 / ior);
    vec3 g = refract(rd, n, 1.0 / (ior + 0.01));
    vec3 b = refract(rd, n, 1.0 / (ior + 0.02));
    return vec3(dot(r, r), dot(g, g), dot(b, b));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;
    Config cfg = getConfig();

    float speed = 0.8;
    float T = u_time * speed + u_seed * 200.0;

    
    vec3 ro = camPos(T, cfg);
    vec3 target = cameraTarget(T, cfg);

    vec2 shake = vec2(sin(T * 7.0) * u_beat * 0.008, cos(T * 5.0) * u_beat * 0.006);
    float roll = sin(T * 0.015 + u_seed * 10.0) * 0.06;

    vec3 fwd = normalize(target - ro);
    vec3 worldUp = vec3(sin(roll), cos(roll), 0.0);
    vec3 right = normalize(cross(worldUp, fwd));
    vec3 up = cross(fwd, right);

    float fov = 1.0 + u_beat * 0.2 + u_energy * 0.1;
    vec3 rd = normalize((uv.x + shake.x) * right + (uv.y + shake.y) * up + fov * fwd);

    
    float t = 0.0, d = 0.0, glow = 0.0, minDist = 1e10;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        d = map(p);
        minDist = min(minDist, d);
        glow += 0.01 / (0.05 + d * d * 3.0);
        if (d < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.95;
    }

    vec3 color = vec3(0.0);

    if (d < SURF_DIST * 2.0) {
        vec3 p = ro + rd * t;
        vec3 n = getNormal(p);

        
        vec2 artUV = fract(p.xz * 0.02 + n.xy * 0.1 + u_time * 0.002);
        vec3 albedo = albumColor(artUV);

        
        vec3 light1Dir = normalize(vec3(sin(T * 0.1), 0.8, cos(T * 0.07)));
        vec3 light2Dir = normalize(vec3(-sin(T * 0.08), -0.3, cos(T * 0.12)));

        float diff1 = max(dot(n, light1Dir), 0.0);
        float diff2 = max(dot(n, light2Dir), 0.0) * 0.4;
        float rim = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);

        vec3 halfVec = normalize(light1Dir - rd);
        float spec = pow(max(dot(n, halfVec), 0.0), 80.0);
        float fresnel = pow(1.0 - abs(dot(n, -rd)), 3.0);

        vec3 irid = iridescence(dot(n, -rd), length(p) * 0.1 + cfg.colorShift);

        vec3 refl = reflect(rd, n);
        vec3 envColor = albumColor(fract(refl.xz * 0.05 + refl.y * 0.03 + u_time * 0.001)) * 0.8 + u_colors[1] * 0.2;

        color = albedo * (diff1 * 0.6 + diff2 * 0.2 + 0.15) * u_colors[0] * 2.0;
        color += u_colors[1] * spec * 0.5;
        color += envColor * fresnel * 0.4;
        color += u_colors[2] * rim * (0.3 + u_energy * 0.5);
        color += irid * fresnel * 0.2;

        
        float sss = max(0.0, dot(rd, light1Dir)) * 0.2;
        color += mix(u_colors[0], u_colors[2], 0.5) * sss * albedo;

        color += u_colors[2] * u_beat * 0.12 * (1.0 - fresnel);
        color += u_colors[1] * u_lyricsActive * u_lyricsProgress * 0.05;

        
        float fog = 1.0 - exp(-t * 0.05);
        color = mix(color, mix(u_colors[0] * 0.3, u_colors[1] * 0.2, fog), fog * 0.6);
    }

    
    vec3 bg = stars(rd);
    float nebula = fbm(rd * 3.0 + u_time * 0.01);
    bg += mix(u_colors[0], u_colors[2], nebula) * nebula * 0.15 * u_energy;
    bg += albumColor(fract(rd.xz * 0.04 + u_time * 0.001)) * 0.06 * pow(1.0 - abs(rd.y), 4.0);
    if (d >= SURF_DIST * 2.0) color = bg;

    
    vec3 glowColor = mix(u_colors[1], u_colors[2], sin(T * 0.3) * 0.5 + 0.5);
    color += glowColor * glow * (0.06 + u_rms * 0.08);
    color += mix(u_colors[0], u_colors[1], 0.5) * exp(-minDist * 5.0) * 0.3 * u_energy;

    
    color += u_colors[2] * u_beat * 0.06;
    if (u_beat > 0.2) {
        float speedLine = smoothstep(0.5, 1.0, length(uv));
        speedLine *= smoothstep(0.8, 1.0, abs(sin(atan(uv.y, uv.x) * 20.0 + T)));
        color += u_colors[1] * speedLine * u_beat * 0.15;
    }

    
    color += vec3(1.0) * u_lineBreak * 0.04;

    
    if (u_adlib > 0.1) {
        float shimmer = sin(uv.x * 50.0 + u_time * 3.0) * sin(uv.y * 50.0 + u_time * 2.7);
        color += u_colors[2] * smoothstep(0.7, 1.0, shimmer) * u_adlib * 0.08;
    }

    
    color *= 1.0 - dot(uv, uv) * 0.4;

    float caStr = length(uv) * 0.003 * (1.0 + u_beat * 2.0);
    color.r *= 1.0 + uv.x * caStr * 0.5;
    color.b *= 1.0 - uv.x * caStr * 0.5;

    
    color = color * (2.51 * color + 0.03) / (color * (2.43 * color + 0.59) + 0.14);

    
    float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
    color = mix(mix(color, u_colors[0] * luma, 0.1), mix(color, u_colors[1] * luma + color, 0.05), smoothstep(0.3, 0.7, luma));

    
    color += (hash2(gl_FragCoord.xy + floor(u_time * 24.0) * 137.0) - 0.5) * 0.01;

    
    

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;class Zo extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.audioHash=0,this.biomePhase=0,this.prevEnergy=0,this.biomeTarget=0,this.lastBiomeSwitch=0,this._lyricsActive=0,this._lyricsProgress=0,this._adlib=0,this._wordIntensity=0,this._lineBreak=0,this.camera=new it(-1,1,1,-1,0,1);const e=new Date,t=(e.getMonth()*31+e.getDate())/372,i=(e.getHours()*60+e.getMinutes())/1440;this.seed=((Date.now()&65535)/65535+t+i)%1,this.material=new He({vertexShader:lt,fragmentShader:wx,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_biomePhase:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(328976),new he(2254506),new he(16724872)]},u_albumArt:{value:this.createDefaultTexture()},u_seed:{value:this.seed},u_audioHash:{value:0},u_dateSeed:{value:t+i*.1},u_lyricsActive:{value:0},u_lyricsProgress:{value:0},u_adlib:{value:0},u_wordIntensity:{value:0},u_lineBreak:{value:0}}});const a=new Xe(new Je(2,2),this.material);this.scene.add(a),this.enableDimBlur(this.material)}createDefaultTexture(){const e=new Uint8Array(16384);for(let i=0;i<64;i++)for(let a=0;a<64;a++){const n=(i*64+a)*4,s=a/64,o=i/64;e[n]=Math.floor((.1+s*.2)*255),e[n+1]=Math.floor((.05+o*.15)*255),e[n+2]=Math.floor((.15+(s+o)*.1)*255),e[n+3]=255}const t=new xr(e,64,64,1023);return t.needsUpdate=!0,t}setAlbumArt(e){new Bs().load(e,t=>{t.wrapS=1e3,t.wrapT=1e3,this.material.uniforms.u_albumArt.value=t})}regenerateSeed(){const e=new Date,t=(e.getMonth()*31+e.getDate())/372,i=(e.getHours()*60+e.getMinutes())/1440;this.seed=((Date.now()&65535)/65535+t+i)%1,this.material.uniforms.u_seed.value=this.seed,this.audioHash=0}setPalette(e){this.material.uniforms.u_colors.value=e}setLyricsState(e,t,i,a){this._lyricsActive=e?1:0,this._lyricsProgress=t;const n=i?1:0;this._adlib+=(n-this._adlib)*.08,this._wordIntensity=a}triggerLineBreak(){this._lineBreak=1}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((d,f)=>d+f,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.4+a*.35+n*.25)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.9+c*.1:this.currentEnergy=this.currentEnergy*.98+c*.02,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.audioHash=(this.audioHash+i*.1+a*.07+n*.05)%1;const u=Math.abs(this.currentEnergy-this.prevEnergy),h=l-this.lastBiomeSwitch;h>8e3&&this.currentBeat>.8&&u>.15?(this.biomeTarget+=1,this.lastBiomeSwitch=l):h>12e3&&u>.25?(this.biomeTarget+=1,this.lastBiomeSwitch=l):h>4e4&&(this.biomeTarget+=1,this.lastBiomeSwitch=l),this.biomePhase+=(this.biomeTarget-this.biomePhase)*.02,this.prevEnergy=this.currentEnergy,this._lineBreak*=.9,this._lineBreak<.01&&(this._lineBreak=0),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy,this.material.uniforms.u_biomePhase.value=this.biomePhase,this.material.uniforms.u_audioHash.value=this.audioHash,this.material.uniforms.u_lyricsActive.value=this._lyricsActive,this.material.uniforms.u_lyricsProgress.value=this._lyricsProgress,this.material.uniforms.u_adlib.value=this._adlib,this.material.uniforms.u_wordIntensity.value=this._wordIntensity,this.material.uniforms.u_lineBreak.value=this._lineBreak}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}var Tx=`precision highp float;

uniform float u_time;
uniform float u_bass;
uniform float u_mid;
uniform float u_treble;
uniform float u_rms;
uniform float u_beat;
uniform float u_energy;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform sampler2D u_albumArt;
uniform float u_seed;

varying vec2 vUv;

#define PI 3.14159265
#define TAU 6.28318530718
#define MAX_STEPS 30
#define MAX_DIST 26.0
#define SURF_DIST 0.0035

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = i.x + i.y * 57.0 + i.z * 113.0;
  float a = hash(n + 0.0);
  float b = hash(n + 1.0);
  float c = hash(n + 57.0);
  float d = hash(n + 58.0);
  float e = hash(n + 113.0);
  float f1 = hash(n + 114.0);
  float g = hash(n + 170.0);
  float h = hash(n + 171.0);
  return mix(mix(mix(a, b, f.x), mix(c, d, f.x), f.y), mix(mix(e, f1, f.x), mix(g, h, f.x), f.y), f.z);
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 2; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec3(1.7, 1.3, 0.9);
    a *= 0.5;
  }
  return v;
}

float waxTexture(vec2 uv) {
  
  vec2 p = uv * 1.18;
  p.x += sin(p.y * 2.4) * 0.24;
  float g0 = hash2(floor(p * 18.0));
  float g1 = hash2(floor((p + vec2(0.73, 1.41)) * 30.0));
  float strokeA = abs(fract(p.x * 7.2 + g0 * 2.3) - 0.5);
  float strokeB = abs(fract((p.x * 5.1 - p.y * 2.3) + g1 * 3.0) - 0.5);
  float strokeC = abs(fract((p.y * 4.8 + p.x * 1.6) + g0 * 2.7) - 0.5);
  float strokes = smoothstep(0.48, 0.09, min(min(strokeA, strokeB), strokeC));
  float grain = mix(g0, g1, 0.45);
  float wax = mix(0.62, 1.38, strokes) * mix(0.8, 1.18, grain);
  return clamp(wax, 0.5, 1.6);
}

vec2 tubeCascadeOffset(float z) {
  float ringCoord = z / 1.05;
  float groupCoord = ringCoord / 4.0;
  float g0 = floor(groupCoord);
  float gBlend = smoothstep(0.18, 0.82, fract(groupCoord));

  
  float phase0 = z * 0.13 - u_time * (0.96 + u_bass * 0.16) + g0 * 1.12;
  float phase1 = z * 0.13 - u_time * (0.96 + u_bass * 0.16) + (g0 + 1.0) * 1.12;
  float cascade0 = 0.5 + 0.5 * sin(z * 0.23 - u_time * (1.34 + u_mid * 0.12) + g0 * 0.84);
  float cascade1 = 0.5 + 0.5 * sin(z * 0.23 - u_time * (1.34 + u_mid * 0.12) + (g0 + 1.0) * 0.84);
  float groupPhase = mix(phase0, phase1, gBlend);
  float cascade = mix(cascade0, cascade1, gBlend);

  float groupAmp = (0.055 + u_energy * 0.022 + u_bass * 0.008) * (0.72 + 0.28 * cascade);
  vec2 groupOffset = vec2(
    sin(groupPhase) + 0.32 * sin(groupPhase * 1.67 + 1.1),
    cos(groupPhase * 1.08 + 1.2) + 0.27 * cos(groupPhase * 1.53 - 0.7)
  ) * groupAmp;

  
  float tubeAmp = 0.03 + u_bass * 0.016 + u_energy * 0.006;
  vec2 tubeOffset = vec2(
    sin(z * 0.10 - u_time * 0.76),
    cos(z * 0.09 - u_time * 0.69 + 1.7)
  ) * tubeAmp;

  return groupOffset + tubeOffset;
}

float map(vec3 p) {
  float z = p.z + u_time * (0.56 + u_bass * 0.03);
  vec2 pxy = p.xy;
  pxy *= rot(z * 0.045 + sin(z * 0.07) * 0.03);
  pxy -= tubeCascadeOffset(z);

  float r = length(pxy);
  float a = atan(pxy.y, pxy.x);

  
  vec3 warpP = vec3(a * 1.9, z * 0.36, r * 0.9);
  float w1 = fbm(warpP + vec3(0.0, 2.0, 1.0));
  float w2 = fbm(warpP * 1.85 + vec3(4.7, 0.6, 2.2));

  float aWarp = a + (w1 - 0.5) * 1.35 + (w2 - 0.5) * 0.5;
  float zWarp = z + (w2 - 0.5) * 2.1;

  
  float segLen = 1.05;
  float segPhase = abs(mod(zWarp + segLen * 0.5, segLen) - segLen * 0.5) / (segLen * 0.5);
  float segBody = 1.0 - smoothstep(0.66, 0.97, segPhase);

  float petals = abs(sin(aWarp * 1.28 + zWarp * 0.13 + w1 * 1.4));
  float petalBody = smoothstep(0.2, 0.88, petals);
  float tipProtrusion = smoothstep(0.62, 0.96, segPhase) * smoothstep(0.52, 0.95, petalBody);

  float folds = abs(sin(aWarp * 2.35 + zWarp * 0.30)) * 0.34;
  folds += abs(sin(aWarp * 1.05 - zWarp * 0.19 + w1 * 2.2)) * 0.16;
  float wrinkles = (fbm(vec3(aWarp * 2.2, zWarp * 0.25, r * 0.8)) - 0.5) * 0.22;
  float micro = (noise(vec3(aWarp * 10.0, zWarp * 0.9, r * 3.0)) - 0.5) * (0.03 + u_treble * 0.02);

  float radius = 1.95 + u_rms * 0.04;
  float wallR = radius + folds + wrinkles + micro + segBody * 0.12 + petalBody * 0.08 + tipProtrusion * 0.1;

  
  float seam = smoothstep(0.93, 1.0, segPhase);
  wallR -= seam * 0.06;

  return abs(r - wallR) - 0.16;
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(0.0025, -0.0025);
  return normalize(
    e.xyy * map(p + e.xyy) +
    e.yyx * map(p + e.yyx) +
    e.yxy * map(p + e.yxy) +
    e.xxx * map(p + e.xxx)
  );
}

float ao(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 3; i++) {
    float h = 0.03 + 0.11 * float(i);
    float d = map(p + n * h);
    occ += (h - d) * sca;
    sca *= 0.62;
  }
  return clamp(1.0 - 3.2 * occ, 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;

  float T = u_time * (0.70 + u_bass * 0.02) + u_seed * 50.0;
  vec3 ro = vec3(0.0, 0.0, T * 1.2);
  vec3 target = vec3(0.0, 0.0, ro.z + 3.8);

  ro.xy += vec2(sin(u_time * 0.21), cos(u_time * 0.18)) * 0.018;

  vec3 fwd = normalize(target - ro);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 up = cross(fwd, right);
  vec3 rd = normalize(uv.x * right + uv.y * up + 1.0 * fwd);

  float t = 0.0;
  float d = 0.0;
  float glow = 0.0;

  for (int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * t;
    d = map(p);
    glow += 0.0032 / (0.05 + d * d * 2.1);
    if (d < SURF_DIST || t > MAX_DIST) break;
    t += d * 0.9;
  }

  vec3 colorBg = vec3(8.0, 8.0, 30.0) / 255.0;
  vec3 colorPri = vec3(28.0, 96.0, 212.0) / 255.0;
  vec3 colorAcc = vec3(120.0, 44.0, 148.0) / 255.0;

  vec3 color = colorBg * 0.12;

  if (d < SURF_DIST * 2.0) {
    vec3 p = ro + rd * t;
    vec3 n = getNormal(p);

    float z = p.z + u_time * (0.56 + u_bass * 0.03);
    vec2 pxy = p.xy;
    pxy *= rot(z * 0.045 + sin(z * 0.07) * 0.03);
    pxy -= tubeCascadeOffset(z);
    float a = atan(pxy.y, pxy.x);
    float r = length(pxy);

    vec3 warpP = vec3(a * 1.9, z * 0.36, r * 0.9);
    float w1 = fbm(warpP + vec3(0.0, 2.0, 1.0));
    float w2 = fbm(warpP * 1.85 + vec3(4.7, 0.6, 2.2));
    float aWarp = a + (w1 - 0.5) * 1.35 + (w2 - 0.5) * 0.5;
    float zWarp = z + (w2 - 0.5) * 2.1;

    float segLen = 1.05;
    float ringId = floor((zWarp + segLen * 0.5) / segLen);
    float segPhase = abs(mod(zWarp + segLen * 0.5, segLen) - segLen * 0.5) / (segLen * 0.5);
    float segBody = 1.0 - smoothstep(0.66, 0.97, segPhase);
    float petals = abs(sin(aWarp * 1.28 + zWarp * 0.13 + w1 * 1.4));
    float petalBody = smoothstep(0.2, 0.88, petals);

    float tipCore = smoothstep(0.78, 0.98, segPhase) * smoothstep(0.50, 0.92, petalBody);
    float tipFeather = smoothstep(0.52, 0.82, segPhase) * (1.0 - smoothstep(0.82, 0.98, segPhase));
    tipFeather *= smoothstep(0.40, 0.90, petalBody);
    float tipMask = tipCore;
    float seamMask = smoothstep(0.92, 1.0, segPhase);
    float ringPartMask = petalBody * segBody * (1.0 - seamMask);

    float ringHueShift = 0.5 + 0.5 * sin(ringId * 0.63 + zWarp * 0.08);
    vec3 ringGlowColor = mix(colorPri, colorAcc, 0.25 + 0.45 * ringHueShift);

    
    vec3 wall = mix(colorAcc, colorPri, 0.54 + (petalBody - 0.5) * 0.12);

    vec3 lightDir = normalize(vec3(-0.23, 0.19, 1.0));
    float diff = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 36.0);
    float occ = ao(p, n);

    color = colorBg * 0.08;
    color += wall * diff * 0.86;

    
    color = mix(color, vec3(0.0), seamMask * 0.42);
    color = mix(color, vec3(0.0), tipCore * 0.9);

    
    color += ringGlowColor * tipFeather * (0.2 + u_mid * 0.08 + u_energy * 0.08);

    color += mix(colorPri, colorAcc, 0.4) * spec * (0.28 + u_treble * 0.07);

    
    float bodyTint = 0.16 + u_mid * 0.22 + u_energy * 0.18;
    color += mix(colorPri, colorAcc, 0.48) * ringPartMask * bodyTint;

    float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.8);
    float ridgeMask = smoothstep(0.45, 0.92, petalBody) * (1.0 - seamMask);

    
    float nonTipBody = ringPartMask * (1.0 - tipMask * 0.95);
    float belowTipBand = smoothstep(0.52, 0.73, segPhase) * (1.0 - smoothstep(0.74, 0.90, segPhase));
    belowTipBand *= petalBody * (1.0 - seamMask) * (1.0 - tipMask);

    
    float pulse = 0.82 + u_bass * 0.6 + u_mid * 0.34 + u_beat * 0.7 + u_energy * 0.5;

    
    float waxRaw = waxTexture(vec2(aWarp * 0.95 + ringId * 0.07, zWarp * 0.34 + u_time * 0.05));
    float wax = mix(1.0, pow(waxRaw, 1.25), 0.95);

    
    float bloomSpread = smoothstep(0.22, 0.92, ringPartMask) * (1.0 - seamMask) * (1.0 - tipCore * 0.9);
    float hdrBody = bloomSpread * (0.6 + 0.42 * pulse) * wax;
    float hdrBelowTip = belowTipBand * (0.9 + u_bass * 0.42 + u_beat * 0.42 + u_energy * 0.24) * wax;
    float hdrRim = rim * ridgeMask * belowTipBand * (0.2 + u_treble * 0.1) * mix(0.82, 1.12, wax);
    vec3 hdrEdges = ringGlowColor * (hdrBody + hdrBelowTip + hdrRim);
    color += hdrEdges;

    color *= occ;

    float fog = 1.0 - exp(-t * 0.07);
    color = mix(color, colorBg * 0.07, fog);
  } else {
    float center = exp(-length(uv) * 5.8);
    color = colorBg * (0.08 + center * 0.14);
  }

  color += mix(colorPri, colorAcc, 0.5) * glow * (0.012 + u_rms * 0.01);

  color *= 1.0 - dot(uv, uv) * 0.33;

  
  color = color * (2.51 * color + 0.03) / (color * (2.43 * color + 0.59) + 0.14);
  color += (hash2(gl_FragCoord.xy + floor(u_time * 24.0) * 131.0) - 0.5) * 0.006;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;class Ex extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.seed=(Date.now()&65535)/65535,this.material=new He({vertexShader:lt,fragmentShader:Tx,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ue(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(1377573),new he(871770),new he(13395481)]},u_albumArt:{value:this.createDefaultTexture()},u_seed:{value:this.seed}}});const e=new Xe(new Je(2,2),this.material);this.scene.add(e),this.enableDimBlur(this.material)}createDefaultTexture(){const e=new Uint8Array(16384);for(let i=0;i<64;i++)for(let a=0;a<64;a++){const n=(i*64+a)*4;e[n]=Math.floor((.1+a/64*.1)*255),e[n+1]=Math.floor(.05*255),e[n+2]=Math.floor((.15+i/64*.1)*255),e[n+3]=255}const t=new xr(e,64,64,1023);return t.needsUpdate=!0,t}setAlbumArt(e){new Bs().load(e,t=>{t.wrapS=1e3,t.wrapT=1e3,this.material.uniforms.u_albumArt.value=t})}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:i,mid:a,treble:n,rms:s}=e;this.bassHistory.push(i),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();i>o*1.4&&i>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(i*.45+a*.35+n*.2)*2.1;this.currentEnergy+=(c-this.currentEnergy)*(c>this.currentEnergy?.16:.055),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=i,this.material.uniforms.u_mid.value=a,this.material.uniforms.u_treble.value=n,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,i){const a=i||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*a,t*a)}dispose(){this.material.dispose()}}const Ax={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float damp;

		uniform sampler2D tOld;
		uniform sampler2D tNew;

		varying vec2 vUv;

		vec4 when_gt( vec4 x, float y ) {

			return max( sign( x - y ), 0.0 );

		}

		void main() {

			vec4 texelOld = texture2D( tOld, vUv );
			vec4 texelNew = texture2D( tNew, vUv );

			texelOld *= damp * when_gt( texelOld, 0.1 );

			gl_FragColor = max(texelNew, texelOld);

		}`};class Rx extends Hi{constructor(e=.96){super(),this.shader=Ax,this.uniforms=Bi.clone(this.shader.uniforms),this.uniforms.damp.value=e,this.textureComp=new bt(window.innerWidth,window.innerHeight,{magFilter:1003,type:1016}),this.textureOld=new bt(window.innerWidth,window.innerHeight,{magFilter:1003,type:1016}),this.compFsMaterial=new He({uniforms:this.uniforms,vertexShader:this.shader.vertexShader,fragmentShader:this.shader.fragmentShader}),this.compFsQuad=new yr(this.compFsMaterial),this.copyFsMaterial=new gr,this.copyFsQuad=new yr(this.copyFsMaterial)}render(e,t,i){this.uniforms.tOld.value=this.textureOld.texture,this.uniforms.tNew.value=i.texture,e.setRenderTarget(this.textureComp),this.compFsQuad.render(e),this.copyFsQuad.material.map=this.textureComp.texture,this.renderToScreen?(e.setRenderTarget(null),this.copyFsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.copyFsQuad.render(e));const a=this.textureOld;this.textureOld=this.textureComp,this.textureComp=a}setSize(e,t){this.textureComp.setSize(e,t),this.textureOld.setSize(e,t)}dispose(){this.textureComp.dispose(),this.textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this.compFsQuad.dispose(),this.copyFsQuad.dispose()}}const Cx={name:"FilmShader",uniforms:{tDiffuse:{value:null},time:{value:0},intensity:{value:.5},grayscale:{value:!1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		uniform float intensity;
		uniform bool grayscale;
		uniform float time;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 base = texture2D( tDiffuse, vUv );

			float noise = rand( fract( vUv + time ) );

			vec3 color = base.rgb + base.rgb * clamp( 0.1 + noise, 0.0, 1.0 );

			color = mix( base.rgb, color, intensity );

			if ( grayscale ) {

				color = vec3( luminance( color ) ); // assuming linear-srgb

			}

			gl_FragColor = vec4( color, base.a );

		}`};class Dx extends Hi{constructor(e=.5,t=!1){super();const i=Cx;this.uniforms=Bi.clone(i.uniforms),this.material=new He({name:i.name,uniforms:this.uniforms,vertexShader:i.vertexShader,fragmentShader:i.fragmentShader}),this.uniforms.intensity.value=e,this.uniforms.grayscale.value=t,this.fsQuad=new yr(this.material)}render(e,t,i,a){this.uniforms.tDiffuse.value=i.texture,this.uniforms.time.value+=a,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Px={uniforms:{tDiffuse:{value:null},tDisp:{value:null},byp:{value:0},amount:{value:.08},angle:{value:.02},seed:{value:.02},seed_x:{value:.02},seed_y:{value:.02},distortion_x:{value:.5},distortion_y:{value:.6},col_s:{value:.05}},vertexShader:`

		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		uniform int byp; //should we apply the glitch ?

		uniform sampler2D tDiffuse;
		uniform sampler2D tDisp;

		uniform float amount;
		uniform float angle;
		uniform float seed;
		uniform float seed_x;
		uniform float seed_y;
		uniform float distortion_x;
		uniform float distortion_y;
		uniform float col_s;

		varying vec2 vUv;


		float rand(vec2 co){
			return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
		}

		void main() {
			if(byp<1) {
				vec2 p = vUv;
				float xs = floor(gl_FragCoord.x / 0.5);
				float ys = floor(gl_FragCoord.y / 0.5);
				//based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
				float disp = texture2D(tDisp, p*seed*seed).r;
				if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {
					if(seed_x>0.){
						p.y = 1. - (p.y + distortion_y);
					}
					else {
						p.y = distortion_y;
					}
				}
				if(p.x<distortion_y+col_s && p.x>distortion_y-col_s*seed) {
					if(seed_y>0.){
						p.x=distortion_x;
					}
					else {
						p.x = 1. - (p.x + distortion_x);
					}
				}
				p.x+=disp*seed_x*(seed/5.);
				p.y+=disp*seed_y*(seed/5.);
				//base from RGB shift shader
				vec2 offset = amount * vec2( cos(angle), sin(angle));
				vec4 cr = texture2D(tDiffuse, p + offset);
				vec4 cga = texture2D(tDiffuse, p);
				vec4 cb = texture2D(tDiffuse, p - offset);
				gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
				//add noise
				vec4 snow = 200.*amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);
				gl_FragColor = gl_FragColor+ snow;
			}
			else {
				gl_FragColor=texture2D (tDiffuse, vUv);
			}
		}`};class Ux extends Hi{constructor(e=64){super();const t=Px;this.uniforms=Bi.clone(t.uniforms),this.heightMap=this.generateHeightmap(e),this.uniforms.tDisp.value=this.heightMap,this.material=new He({uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new yr(this.material),this.goWild=!1,this.curF=0,this.generateTrigger()}render(e,t,i){e.capabilities.isWebGL2===!1&&(this.uniforms.tDisp.value.format=1024),this.uniforms.tDiffuse.value=i.texture,this.uniforms.seed.value=Math.random(),this.uniforms.byp.value=0,this.curF%this.randX==0||this.goWild==!0?(this.uniforms.amount.value=Math.random()/30,this.uniforms.angle.value=Si.randFloat(-Math.PI,Math.PI),this.uniforms.seed_x.value=Si.randFloat(-1,1),this.uniforms.seed_y.value=Si.randFloat(-1,1),this.uniforms.distortion_x.value=Si.randFloat(0,1),this.uniforms.distortion_y.value=Si.randFloat(0,1),this.curF=0,this.generateTrigger()):this.curF%this.randX<this.randX/5?(this.uniforms.amount.value=Math.random()/90,this.uniforms.angle.value=Si.randFloat(-Math.PI,Math.PI),this.uniforms.distortion_x.value=Si.randFloat(0,1),this.uniforms.distortion_y.value=Si.randFloat(0,1),this.uniforms.seed_x.value=Si.randFloat(-.3,.3),this.uniforms.seed_y.value=Si.randFloat(-.3,.3)):this.goWild==!1&&(this.uniforms.byp.value=1),this.curF++,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}generateTrigger(){this.randX=Si.randInt(120,240)}generateHeightmap(e){const t=new Float32Array(e*e),i=e*e;for(let n=0;n<i;n++){const s=Si.randFloat(0,1);t[n]=s}const a=new xr(t,e,e,1028,1015);return a.needsUpdate=!0,a}dispose(){this.material.dispose(),this.heightMap.dispose(),this.fsQuad.dispose()}}const Ol={uniforms:{tDiffuse:{value:null},shape:{value:1},radius:{value:4},rotateR:{value:Math.PI/12*1},rotateG:{value:Math.PI/12*2},rotateB:{value:Math.PI/12*3},scatter:{value:0},width:{value:1},height:{value:1},blending:{value:1},blendingMode:{value:1},greyscale:{value:!1},disable:{value:!1}},vertexShader:`

		varying vec2 vUV;

		void main() {

			vUV = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

		}`,fragmentShader:`

		#define SQRT2_MINUS_ONE 0.41421356
		#define SQRT2_HALF_MINUS_ONE 0.20710678
		#define PI2 6.28318531
		#define SHAPE_DOT 1
		#define SHAPE_ELLIPSE 2
		#define SHAPE_LINE 3
		#define SHAPE_SQUARE 4
		#define BLENDING_LINEAR 1
		#define BLENDING_MULTIPLY 2
		#define BLENDING_ADD 3
		#define BLENDING_LIGHTER 4
		#define BLENDING_DARKER 5
		uniform sampler2D tDiffuse;
		uniform float radius;
		uniform float rotateR;
		uniform float rotateG;
		uniform float rotateB;
		uniform float scatter;
		uniform float width;
		uniform float height;
		uniform int shape;
		uniform bool disable;
		uniform float blending;
		uniform int blendingMode;
		varying vec2 vUV;
		uniform bool greyscale;
		const int samples = 8;

		float blend( float a, float b, float t ) {

		// linear blend
			return a * ( 1.0 - t ) + b * t;

		}

		float hypot( float x, float y ) {

		// vector magnitude
			return sqrt( x * x + y * y );

		}

		float rand( vec2 seed ){

		// get pseudo-random number
			return fract( sin( dot( seed.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );

		}

		float distanceToDotRadius( float channel, vec2 coord, vec2 normal, vec2 p, float angle, float rad_max ) {

		// apply shape-specific transforms
			float dist = hypot( coord.x - p.x, coord.y - p.y );
			float rad = channel;

			if ( shape == SHAPE_DOT ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

			} else if ( shape == SHAPE_ELLIPSE ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

				if ( dist != 0.0 ) {
					float dot_p = abs( ( p.x - coord.x ) / dist * normal.x + ( p.y - coord.y ) / dist * normal.y );
					dist = ( dist * ( 1.0 - SQRT2_HALF_MINUS_ONE ) ) + dot_p * dist * SQRT2_MINUS_ONE;
				}

			} else if ( shape == SHAPE_LINE ) {

				rad = pow( abs( rad ), 1.5) * rad_max;
				float dot_p = ( p.x - coord.x ) * normal.x + ( p.y - coord.y ) * normal.y;
				dist = hypot( normal.x * dot_p, normal.y * dot_p );

			} else if ( shape == SHAPE_SQUARE ) {

				float theta = atan( p.y - coord.y, p.x - coord.x ) - angle;
				float sin_t = abs( sin( theta ) );
				float cos_t = abs( cos( theta ) );
				rad = pow( abs( rad ), 1.4 );
				rad = rad_max * ( rad + ( ( sin_t > cos_t ) ? rad - sin_t * rad : rad - cos_t * rad ) );

			}

			return rad - dist;

		}

		struct Cell {

		// grid sample positions
			vec2 normal;
			vec2 p1;
			vec2 p2;
			vec2 p3;
			vec2 p4;
			float samp2;
			float samp1;
			float samp3;
			float samp4;

		};

		vec4 getSample( vec2 point ) {

		// multi-sampled point
			vec4 tex = texture2D( tDiffuse, vec2( point.x / width, point.y / height ) );
			float base = rand( vec2( floor( point.x ), floor( point.y ) ) ) * PI2;
			float step = PI2 / float( samples );
			float dist = radius * 0.66;

			for ( int i = 0; i < samples; ++i ) {

				float r = base + step * float( i );
				vec2 coord = point + vec2( cos( r ) * dist, sin( r ) * dist );
				tex += texture2D( tDiffuse, vec2( coord.x / width, coord.y / height ) );

			}

			tex /= float( samples ) + 1.0;
			return tex;

		}

		float getDotColour( Cell c, vec2 p, int channel, float angle, float aa ) {

		// get colour for given point
			float dist_c_1, dist_c_2, dist_c_3, dist_c_4, res;

			if ( channel == 0 ) {

				c.samp1 = getSample( c.p1 ).r;
				c.samp2 = getSample( c.p2 ).r;
				c.samp3 = getSample( c.p3 ).r;
				c.samp4 = getSample( c.p4 ).r;

			} else if (channel == 1) {

				c.samp1 = getSample( c.p1 ).g;
				c.samp2 = getSample( c.p2 ).g;
				c.samp3 = getSample( c.p3 ).g;
				c.samp4 = getSample( c.p4 ).g;

			} else {

				c.samp1 = getSample( c.p1 ).b;
				c.samp3 = getSample( c.p3 ).b;
				c.samp2 = getSample( c.p2 ).b;
				c.samp4 = getSample( c.p4 ).b;

			}

			dist_c_1 = distanceToDotRadius( c.samp1, c.p1, c.normal, p, angle, radius );
			dist_c_2 = distanceToDotRadius( c.samp2, c.p2, c.normal, p, angle, radius );
			dist_c_3 = distanceToDotRadius( c.samp3, c.p3, c.normal, p, angle, radius );
			dist_c_4 = distanceToDotRadius( c.samp4, c.p4, c.normal, p, angle, radius );
			res = ( dist_c_1 > 0.0 ) ? clamp( dist_c_1 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_2 > 0.0 ) ? clamp( dist_c_2 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_3 > 0.0 ) ? clamp( dist_c_3 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_4 > 0.0 ) ? clamp( dist_c_4 / aa, 0.0, 1.0 ) : 0.0;
			res = clamp( res, 0.0, 1.0 );

			return res;

		}

		Cell getReferenceCell( vec2 p, vec2 origin, float grid_angle, float step ) {

		// get containing cell
			Cell c;

		// calc grid
			vec2 n = vec2( cos( grid_angle ), sin( grid_angle ) );
			float threshold = step * 0.5;
			float dot_normal = n.x * ( p.x - origin.x ) + n.y * ( p.y - origin.y );
			float dot_line = -n.y * ( p.x - origin.x ) + n.x * ( p.y - origin.y );
			vec2 offset = vec2( n.x * dot_normal, n.y * dot_normal );
			float offset_normal = mod( hypot( offset.x, offset.y ), step );
			float normal_dir = ( dot_normal < 0.0 ) ? 1.0 : -1.0;
			float normal_scale = ( ( offset_normal < threshold ) ? -offset_normal : step - offset_normal ) * normal_dir;
			float offset_line = mod( hypot( ( p.x - offset.x ) - origin.x, ( p.y - offset.y ) - origin.y ), step );
			float line_dir = ( dot_line < 0.0 ) ? 1.0 : -1.0;
			float line_scale = ( ( offset_line < threshold ) ? -offset_line : step - offset_line ) * line_dir;

		// get closest corner
			c.normal = n;
			c.p1.x = p.x - n.x * normal_scale + n.y * line_scale;
			c.p1.y = p.y - n.y * normal_scale - n.x * line_scale;

		// scatter
			if ( scatter != 0.0 ) {

				float off_mag = scatter * threshold * 0.5;
				float off_angle = rand( vec2( floor( c.p1.x ), floor( c.p1.y ) ) ) * PI2;
				c.p1.x += cos( off_angle ) * off_mag;
				c.p1.y += sin( off_angle ) * off_mag;

			}

		// find corners
			float normal_step = normal_dir * ( ( offset_normal < threshold ) ? step : -step );
			float line_step = line_dir * ( ( offset_line < threshold ) ? step : -step );
			c.p2.x = c.p1.x - n.x * normal_step;
			c.p2.y = c.p1.y - n.y * normal_step;
			c.p3.x = c.p1.x + n.y * line_step;
			c.p3.y = c.p1.y - n.x * line_step;
			c.p4.x = c.p1.x - n.x * normal_step + n.y * line_step;
			c.p4.y = c.p1.y - n.y * normal_step - n.x * line_step;

			return c;

		}

		float blendColour( float a, float b, float t ) {

		// blend colours
			if ( blendingMode == BLENDING_LINEAR ) {
				return blend( a, b, 1.0 - t );
			} else if ( blendingMode == BLENDING_ADD ) {
				return blend( a, min( 1.0, a + b ), t );
			} else if ( blendingMode == BLENDING_MULTIPLY ) {
				return blend( a, max( 0.0, a * b ), t );
			} else if ( blendingMode == BLENDING_LIGHTER ) {
				return blend( a, max( a, b ), t );
			} else if ( blendingMode == BLENDING_DARKER ) {
				return blend( a, min( a, b ), t );
			} else {
				return blend( a, b, 1.0 - t );
			}

		}

		void main() {

			if ( ! disable ) {

		// setup
				vec2 p = vec2( vUV.x * width, vUV.y * height );
				vec2 origin = vec2( 0, 0 );
				float aa = ( radius < 2.5 ) ? radius * 0.5 : 1.25;

		// get channel samples
				Cell cell_r = getReferenceCell( p, origin, rotateR, radius );
				Cell cell_g = getReferenceCell( p, origin, rotateG, radius );
				Cell cell_b = getReferenceCell( p, origin, rotateB, radius );
				float r = getDotColour( cell_r, p, 0, rotateR, aa );
				float g = getDotColour( cell_g, p, 1, rotateG, aa );
				float b = getDotColour( cell_b, p, 2, rotateB, aa );

		// blend with original
				vec4 colour = texture2D( tDiffuse, vUV );
				r = blendColour( r, colour.r, blending );
				g = blendColour( g, colour.g, blending );
				b = blendColour( b, colour.b, blending );

				if ( greyscale ) {
					r = g = b = (r + b + g) / 3.0;
				}

				gl_FragColor = vec4( r, g, b, 1.0 );

			} else {

				gl_FragColor = texture2D( tDiffuse, vUV );

			}

		}`};class Lx extends Hi{constructor(e,t,i){super(),this.uniforms=Bi.clone(Ol.uniforms),this.material=new He({uniforms:this.uniforms,fragmentShader:Ol.fragmentShader,vertexShader:Ol.vertexShader}),this.uniforms.width.value=e,this.uniforms.height.value=t;for(const a in i)i.hasOwnProperty(a)&&this.uniforms.hasOwnProperty(a)&&(this.uniforms[a].value=i[a]);this.fsQuad=new yr(this.material)}render(e,t,i){this.material.uniforms.tDiffuse.value=i.texture,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}setSize(e,t){this.uniforms.width.value=e,this.uniforms.height.value=t}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Ix={name:"DotScreenShader",uniforms:{tDiffuse:{value:null},tSize:{value:new Ue(256,256)},center:{value:new Ue(.5,.5)},angle:{value:1.57},scale:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			vec2 tex = vUv * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * sin( point.y ) ) * 4.0;

		}

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;

			gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern() ), color.a );

		}`};class Ox extends Hi{constructor(e,t,i){super();const a=Ix;this.uniforms=Bi.clone(a.uniforms),e!==void 0&&this.uniforms.center.value.copy(e),t!==void 0&&(this.uniforms.angle.value=t),i!==void 0&&(this.uniforms.scale.value=i),this.material=new He({name:a.name,uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.fsQuad=new yr(this.material)}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.tSize.value.set(i.width,i.height),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Fx={name:"KaleidoShader",uniforms:{tDiffuse:{value:null},sides:{value:6},angle:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float sides;
		uniform float angle;

		varying vec2 vUv;

		void main() {

			vec2 p = vUv - 0.5;
			float r = length(p);
			float a = atan(p.y, p.x) + angle;
			float tau = 2. * 3.1416 ;
			a = mod(a, tau/sides);
			a = abs(a - tau/sides/2.) ;
			p = r * vec2(cos(a), sin(a));
			vec4 color = texture2D(tDiffuse, p + 0.5);
			gl_FragColor = color;

		}`},Nx={name:"MirrorShader",uniforms:{tDiffuse:{value:null},side:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform int side;

		varying vec2 vUv;

		void main() {

			vec2 p = vUv;
			if (side == 0){
				if (p.x > 0.5) p.x = 1.0 - p.x;
			}else if (side == 1){
				if (p.x < 0.5) p.x = 1.0 - p.x;
			}else if (side == 2){
				if (p.y < 0.5) p.y = 1.0 - p.y;
			}else if (side == 3){
				if (p.y > 0.5) p.y = 1.0 - p.y;
			}
			vec4 color = texture2D(tDiffuse, p);
			gl_FragColor = color;

		}`},zx={name:"RGBShiftShader",uniforms:{tDiffuse:{value:null},amount:{value:.005},angle:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float amount;
		uniform float angle;

		varying vec2 vUv;

		void main() {

			vec2 offset = amount * vec2( cos(angle), sin(angle));
			vec4 cr = texture2D(tDiffuse, vUv + offset);
			vec4 cga = texture2D(tDiffuse, vUv);
			vec4 cb = texture2D(tDiffuse, vUv - offset);
			gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);

		}`},kx={name:"SepiaShader",uniforms:{tDiffuse:{value:null},amount:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float amount;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );
			vec3 c = color.rgb;

			color.r = dot( c, vec3( 1.0 - 0.607 * amount, 0.769 * amount, 0.189 * amount ) );
			color.g = dot( c, vec3( 0.349 * amount, 1.0 - 0.314 * amount, 0.168 * amount ) );
			color.b = dot( c, vec3( 0.272 * amount, 0.534 * amount, 1.0 - 0.869 * amount ) );

			gl_FragColor = vec4( min( vec3( 1.0 ), color.rgb ), color.a );

		}`},Bx={name:"BleachBypassShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 base = texture2D( tDiffuse, vUv );

			vec3 lumCoeff = vec3( 0.25, 0.65, 0.1 );
			float lum = dot( lumCoeff, base.rgb );
			vec3 blend = vec3( lum );

			float L = min( 1.0, max( 0.0, 10.0 * ( lum - 0.45 ) ) );

			vec3 result1 = 2.0 * base.rgb * blend;
			vec3 result2 = 1.0 - 2.0 * ( 1.0 - blend ) * ( 1.0 - base.rgb );

			vec3 newColor = mix( result1, result2, L );

			float A2 = opacity * base.a;
			vec3 mixRGB = A2 * newColor.rgb;
			mixRGB += ( ( 1.0 - A2 ) * base.rgb );

			gl_FragColor = vec4( mixRGB, base.a );

		}`},Gx={name:"ColorifyShader",uniforms:{tDiffuse:{value:null},color:{value:new he(16777215)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform vec3 color;
		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );
			float v = dot( texel.xyz, luma );

			gl_FragColor = vec4( v * color, texel.w );

		}`},Hx={name:"BrightnessContrastShader",uniforms:{tDiffuse:{value:null},brightness:{value:0},contrast:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float brightness;
		uniform float contrast;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			gl_FragColor.rgb += brightness;

			if (contrast > 0.0) {
				gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) / (1.0 - contrast) + 0.5;
			} else {
				gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * (1.0 + contrast) + 0.5;
			}

		}`},Vx={name:"HueSaturationShader",uniforms:{tDiffuse:{value:null},hue:{value:0},saturation:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float hue;
		uniform float saturation;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// hue
			float angle = hue * 3.14159265;
			float s = sin(angle), c = cos(angle);
			vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;
			float len = length(gl_FragColor.rgb);
			gl_FragColor.rgb = vec3(
				dot(gl_FragColor.rgb, weights.xyz),
				dot(gl_FragColor.rgb, weights.zxy),
				dot(gl_FragColor.rgb, weights.yzx)
			);

			// saturation
			float average = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;
			if (saturation > 0.0) {
				gl_FragColor.rgb += (average - gl_FragColor.rgb) * (1.0 - 1.0 / (1.001 - saturation));
			} else {
				gl_FragColor.rgb += (average - gl_FragColor.rgb) * (-saturation);
			}

		}`},Wx={name:"VignetteShader",uniforms:{tDiffuse:{value:null},offset:{value:1},darkness:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float offset;
		uniform float darkness;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			// Eskil's vignette

			vec4 texel = texture2D( tDiffuse, vUv );
			vec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );
			gl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );

		}`},Xx={name:"FocusShader",uniforms:{tDiffuse:{value:null},screenWidth:{value:1024},screenHeight:{value:1024},sampleDistance:{value:.94},waveFactor:{value:.00125}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float screenWidth;
		uniform float screenHeight;
		uniform float sampleDistance;
		uniform float waveFactor;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 color, org, tmp, add;
			float sample_dist, f;
			vec2 vin;
			vec2 uv = vUv;

			add = color = org = texture2D( tDiffuse, uv );

			vin = ( uv - vec2( 0.5 ) ) * vec2( 1.4 );
			sample_dist = dot( vin, vin ) * 2.0;

			f = ( waveFactor * 100.0 + sample_dist ) * sampleDistance * 4.0;

			vec2 sampleSize = vec2(  1.0 / screenWidth, 1.0 / screenHeight ) * vec2( f );

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.111964, 0.993712 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.846724, 0.532032 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.943883, -0.330279 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( 0.330279, -0.943883 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.532032, -0.846724 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.993712, -0.111964 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			add += tmp = texture2D( tDiffuse, uv + vec2( -0.707107, 0.707107 ) * sampleSize );
			if( tmp.b < color.b ) color = tmp;

			color = color * vec4( 2.0 ) - ( add / vec4( 8.0 ) );
			color = color + ( add / vec4( 8.0 ) - color ) * ( vec4( 1.0 ) - vec4( sample_dist * 0.5 ) );

			gl_FragColor = vec4( color.rgb * color.rgb * vec3( 0.95 ) + color.rgb, 1.0 );

		}`};function qx(r){return()=>{r|=0,r=r+1831565813|0;let e=Math.imul(r^r>>>15,1|r);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const jx=[{name:"afterimage",factory:r=>{const e=new Rx(0);return{name:"afterimage",pass:e,intensity:0,targetIntensity:0,driver:r()>.5?"rms":"bass",weight:.6+r()*.35,floor:0,drive:t=>{e.uniforms.damp.value=.6+t*.36}}}},{name:"film",factory:r=>{const e=new Dx(0,!1);return{name:"film",pass:e,intensity:0,targetIntensity:0,driver:r()>.6?"treble":"rms",weight:.4+r()*.4,floor:.05,drive:t=>{e.uniforms.nIntensity.value=t*.35,e.uniforms.sIntensity.value=t*.12}}}},{name:"glitch",factory:r=>{const e=new Ux;return e.enabled=!1,{name:"glitch",pass:e,intensity:0,targetIntensity:0,driver:"bass",weight:.8+r()*.2,floor:0,drive:t=>{e.enabled=t>.6,e.goWild=t>.85}}}},{name:"halftone",factory:r=>{const e=new Lx(window.innerWidth,window.innerHeight,{radius:4+r()*6,shape:Math.floor(r()*3)+1,scatter:0,blending:.5});return e.enabled=!1,{name:"halftone",pass:e,intensity:0,targetIntensity:0,driver:r()>.5?"mid":"treble",weight:.5+r()*.3,floor:0,drive:t=>{e.enabled=t>.15,e.uniforms?.radius&&(e.uniforms.radius.value=2+t*8)}}}},{name:"dotscreen",factory:r=>{const e=new Ox;return e.enabled=!1,{name:"dotscreen",pass:e,intensity:0,targetIntensity:0,driver:"mid",weight:.4+r()*.3,floor:0,drive:t=>{e.enabled=t>.3,e.uniforms?.scale&&(e.uniforms.scale.value=1.5-t*.8)}}}},{name:"kaleido",factory:r=>{const e=new hi(Fx);e.enabled=!1;const t=3+Math.floor(r()*6);return{name:"kaleido",pass:e,intensity:0,targetIntensity:0,driver:r()>.5?"bass":"mid",weight:.5+r()*.4,floor:0,drive:i=>{e.enabled=i>.2,e.uniforms.sides.value=t+Math.floor(i*4),e.uniforms.angle.value=i*1.5}}}},{name:"mirror",factory:r=>{const e=new hi(Nx);return e.enabled=!1,{name:"mirror",pass:e,intensity:0,targetIntensity:0,driver:"bass",weight:.6+r()*.3,floor:0,drive:t=>{e.enabled=t>.4,e.uniforms.side.value=Math.floor(r()*4)}}}},{name:"rgbshift",factory:r=>{const e=new hi(zx);return{name:"rgbshift",pass:e,intensity:0,targetIntensity:0,driver:"bass",weight:.7+r()*.3,floor:0,drive:t=>{e.uniforms.amount.value=t*.003,e.uniforms.angle.value=r()*6.28}}}},{name:"sepia",factory:r=>{const e=new hi(kx);return{name:"sepia",pass:e,intensity:0,targetIntensity:0,driver:"rms",weight:.3+r()*.3,floor:0,drive:t=>{e.uniforms.amount.value=t*.6}}}},{name:"bleachbypass",factory:r=>{const e=new hi(Bx);return{name:"bleachbypass",pass:e,intensity:0,targetIntensity:0,driver:r()>.5?"rms":"mid",weight:.4+r()*.3,floor:0,drive:t=>{e.uniforms.opacity.value=t*.8}}}},{name:"huesat",factory:r=>{const e=new hi(Vx);return{name:"huesat",pass:e,intensity:0,targetIntensity:0,driver:r()>.5?"treble":"bass",weight:.3+r()*.3,floor:0,drive:t=>{e.uniforms.hue.value=(t-.5)*.3,e.uniforms.saturation.value=t*.4-.1}}}},{name:"vignette",factory:r=>{const e=new hi(Wx);return{name:"vignette",pass:e,intensity:0,targetIntensity:0,driver:"rms",weight:.5+r()*.4,floor:.2,drive:t=>{e.uniforms.offset.value=1-t*.5,e.uniforms.darkness.value=t*1.5}}}},{name:"focus",factory:r=>{const e=new hi(Xx);return{name:"focus",pass:e,intensity:0,targetIntensity:0,driver:r()>.5?"mid":"rms",weight:.3+r()*.3,floor:0,drive:t=>{e.uniforms.sampleDistance.value=t*.8,e.uniforms.waveFactor.value=t*.002}}}},{name:"brightness",factory:r=>{const e=new hi(Hx);return{name:"brightness",pass:e,intensity:0,targetIntensity:0,driver:"rms",weight:.3+r()*.2,floor:0,drive:t=>{e.uniforms.brightness.value=t*.1,e.uniforms.contrast.value=t*.15}}}},{name:"colorify",factory:r=>{const e=new hi(Gx);return e.enabled=!1,{name:"colorify",pass:e,intensity:0,targetIntensity:0,driver:"bass",weight:.5+r()*.3,floor:0,drive:t=>{e.enabled=t>.3}}}}];class Yx{constructor(){this.recipe=null,this._lerpSpeed=.04}generateRecipe(e,t=Date.now(),i=[]){const a=Math.floor(e*100)^t&2147483647|0,n=qx(a),s=3+Math.floor(n()*3),o=jx.filter(u=>!i.includes(u.name)),l=[];for(let u=0;u<s&&o.length>0;u++){const h=Math.floor(n()*o.length),{factory:d}=o.splice(h,1)[0];l.push(d(n))}for(let u=l.length-1;u>0;u--){const h=Math.floor(n()*(u+1));[l[u],l[h]]=[l[h],l[u]]}const c={seed:a,effects:l,chromaWeight:.1+n()*.5,bassBoost:.8+n()*.6};return this.recipe=c,console.log(`[Cinematography] Recipe seed=${a} effects=[${l.map(u=>u.name).join(", ")}] chroma=${c.chromaWeight.toFixed(2)} bassBoost=${c.bassBoost.toFixed(2)}`),c}getRecipe(){return this.recipe}getPasses(){return this.recipe?this.recipe.effects.map(e=>e.pass):[]}update(e){if(this.recipe)for(const t of this.recipe.effects){const i=e[t.driver];t.targetIntensity=Math.max(t.floor,i*t.weight);const a=t.targetIntensity-t.intensity,n=a>0?this._lerpSpeed*2.5:this._lerpSpeed;t.intensity+=a*n,t.intensity=Math.max(0,Math.min(1,t.intensity));try{t.drive(t.intensity,e)}catch{}}}dispose(){if(this.recipe){for(const e of this.recipe.effects)e.pass.dispose&&e.pass.dispose();this.recipe=null}}}const Ka=200,Zx=12,Kx=`
  attribute vec3 instanceOffset;
  attribute float instancePhase;
  attribute float instanceSpeed;
  attribute vec3 instanceColor;

  uniform float u_time;
  uniform float u_bass;
  uniform float u_energy;
  uniform float u_beat;

  varying vec3 vColor;
  varying float vAlpha;
  varying vec3 vNormal;

  void main() {
    vColor = instanceColor;

    // Ribbon animation: B\xE9zier-like path from sin/cos composition
    float t = u_time * instanceSpeed + instancePhase;
    float bassCompress = 1.0 - u_bass * 0.4;

    // Orbital path
    vec3 pathPos = vec3(
      sin(t * 0.7 + instancePhase * 3.0) * (2.0 + sin(t * 0.3) * 1.5) * bassCompress,
      cos(t * 0.5 + instancePhase * 2.0) * (1.5 + cos(t * 0.4) * 1.0) * bassCompress,
      sin(t * 0.9 + instancePhase) * (2.5 + sin(t * 0.2) * 1.0) * bassCompress
    );

    // Turbulence on high energy
    float turb = u_energy * 0.5 + u_beat * 0.8;
    pathPos += vec3(
      sin(t * 5.0 + instancePhase * 10.0),
      cos(t * 4.3 + instancePhase * 8.0),
      sin(t * 3.7 + instancePhase * 12.0)
    ) * turb * 0.3;

    vec3 displaced = position + instanceOffset + pathPos;

    // Fade edges
    float segmentT = (position.y + 0.5); // 0..1 along ribbon length
    vAlpha = smoothstep(0.0, 0.1, segmentT) * smoothstep(1.0, 0.9, segmentT);
    vAlpha *= 0.6 + u_energy * 0.4;

    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`,$x=`
  varying vec3 vColor;
  varying float vAlpha;
  varying vec3 vNormal;

  uniform vec3 u_accentColor;
  uniform float u_rms;

  void main() {
    // Soft lighting
    vec3 light = normalize(vec3(0.5, 1.0, 0.3));
    float diff = max(dot(vNormal, light), 0.0) * 0.5 + 0.5;

    vec3 col = vColor * diff;

    // RMS glow
    col += u_accentColor * u_rms * 0.3;

    // Slight emissive
    col += vColor * 0.1;

    gl_FragColor = vec4(col, vAlpha);
  }
`;class Qx{constructor(){this.dummy=new Vt;const e=new Je(.02,.3,1,Zx);this.material=new He({vertexShader:Kx,fragmentShader:$x,transparent:!0,depthWrite:!1,side:2,uniforms:{u_time:{value:0},u_bass:{value:0},u_energy:{value:0},u_beat:{value:0},u_rms:{value:0},u_accentColor:{value:new he(54527)}}}),this.mesh=new Gg(e,this.material,Ka),this.mesh.frustumCulled=!1,this.mesh.layers.set(0),this.offsets=new Float32Array(Ka*3),this.phases=new Float32Array(Ka),this.speeds=new Float32Array(Ka);const t=new Float32Array(Ka*3);for(let i=0;i<Ka;i++){const a=Math.random()*Math.PI*2,n=Math.acos(2*Math.random()-1),s=1.5+Math.random()*3;this.offsets[i*3]=s*Math.sin(n)*Math.cos(a),this.offsets[i*3+1]=s*Math.sin(n)*Math.sin(a),this.offsets[i*3+2]=s*Math.cos(n),this.phases[i]=Math.random()*Math.PI*2,this.speeds[i]=.3+Math.random()*.7;const o=.5+Math.random()*.3,l=new he().setHSL(o,.7,.5);t[i*3]=l.r,t[i*3+1]=l.g,t[i*3+2]=l.b,this.dummy.position.set(0,0,0),this.dummy.updateMatrix(),this.mesh.setMatrixAt(i,this.dummy.matrix)}e.setAttribute("instanceOffset",new Vr(this.offsets,3)),e.setAttribute("instancePhase",new Vr(this.phases,1)),e.setAttribute("instanceSpeed",new Vr(this.speeds,1)),e.setAttribute("instanceColor",new Vr(t,3))}addToScene(e){e.add(this.mesh)}removeFromScene(e){e.remove(this.mesh)}setAccentColor(e){this.material.uniforms.u_accentColor.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_rms.value=e.rms;const i=(e.bass*.5+e.mid*.3+e.treble*.2)*2;this.material.uniforms.u_energy.value=Math.min(i,1),this.material.uniforms.u_beat.value=e.bass>.6?1:this.material.uniforms.u_beat.value*.9}setVisible(e){this.mesh.visible=e}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}}const Fl=5;class Jx{constructor(e){this.scenes=[],this.sceneFactories=[],this.currentIdx=Fl,this.running=!1,this.frameId=0,this.overlayOpacity=1,this.zenFadeTarget=1,this.zenFadeCurrent=1,this.gpuTextEnabled=!0,this.uiVisible=!1,this._currentPalette=null,this.cinematographyActive=!1,this.maxFps=0,this.lastFrameTime=0,this._scrollPaused=!1,this._loopDbg=0,this._resizeDbgCount=0,this.timeScale=1,this.timeScaleTarget=1,this.timeScaleLerpSpeed=.005,this.dilatedTime=0,this.lastRealTime=0,this._lastAlbumArt=null,this.loop=()=>{if(!this.running||(this.frameId=requestAnimationFrame(this.loop),this._scrollPaused))return;if(this.maxFps>0){const _=performance.now(),m=1e3/this.maxFps;if(_-this.lastFrameTime<m)return;this.lastFrameTime=_}const c=performance.now()*.001,u=this.lastRealTime>0?Math.min(c-this.lastRealTime,.1):.016;this.lastRealTime=c,this.timeScale+=(this.timeScaleTarget-this.timeScale)*this.timeScaleLerpSpeed;const h=Math.abs(this.timeScale-this.timeScaleTarget)>.05?1/60:u;this.dilatedTime+=h*this.timeScale,this.dilatedTime>1e4&&(this.dilatedTime-=1e4);const d=this.audioProcessor.update(),f=this.zenFadeCurrent;this.zenFadeCurrent+=(this.zenFadeTarget-this.zenFadeCurrent)*.05,Math.abs(this.zenFadeCurrent-f)>.001&&(this.renderer.domElement.style.opacity=String(this.zenFadeCurrent)),this.current.update(d,this.dilatedTime),this.gpuTypography.update(d.rms);const g=window.musicRuntime?.audioEngine?.audioElement;if(g&&this.lyricsRenderer.setCurrentTime(g.currentTime),this.lyricsRenderer.update(d.rms),this.currentIdx===25&&this.current instanceof Zo){const _=this.lyricsRenderer.getShaderState();this.current.setLyricsState(_.active,_.progress,_.adlib,_.wordIntensity),_.lineChanged&&this.current.triggerLineBreak()}if(this.kineticRibbons.update(d,this.dilatedTime),this.postProcessing.update(d),this.postProcessing.composer.render(),this.postProcessing.renderText(),this._loopDbg||(this._loopDbg=0),this._loopDbg++,this._loopDbg%300,globalThis.__PERF_MODE__){const _=globalThis;_._chromicMathVisualizer||(_._chromicMathVisualizer={});const m=_._chromicMathVisualizer;m.running=this.running,m._sceneIdx=this.currentIdx,m._sceneName=this.current?.constructor?.name||`Scene ${this.currentIdx}`,m._sceneCount=this.sceneFactories.length,m._rendererInfo={drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles},m.setScene=p=>this.setScene(p)}},this._resizeDebounce=0,this._savedResScale=0,this.container=e.container,this.resolutionScale=e.resolutionScale??1,this.renderer=new uu({alpha:!0,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.debug.checkShaderErrors=!0,this.renderer.setClearColor(0,0),this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1,this.renderer.setPixelRatio(window.devicePixelRatio*this.resolutionScale);const t=window.innerWidth||this.container.clientWidth||1,i=window.innerHeight||this.container.clientHeight||1,a=this.renderer.domElement;a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.display="block",a.style.width=t+"px",a.style.height=i+"px",a.style.pointerEvents="none",a.style.zIndex="0",this.container.appendChild(a),this.renderer.setSize(t,i,!1),this.audioProcessor=new $g(e.analyser),this.sceneFactories=[()=>new k1,()=>new E1,()=>new D1(this.renderer),()=>new L1,()=>new O1(this.renderer),()=>new N1,()=>new dd(this.renderer),()=>new V1,()=>new X1,()=>new j1,()=>new Z1,()=>new $1,()=>new J1,()=>new tx,()=>new rx,()=>new nx,()=>new sx,()=>new cx,()=>new hx,()=>new fx,()=>new mx,()=>new vx,()=>new xx,()=>new bx,()=>new Mx,()=>new Zo,()=>new Ex],this.scenes=new Array(this.sceneFactories.length).fill(null),this.current=this.getOrCreateScene(Fl),this.postProcessing=new ov(this.renderer,this.current.scene,this.current.camera),this.gpuTypography=new i_(this.current.camera),this.gpuTypography.addToScene(this.current.scene),this.gpuTypography.setVisible(!1),this.lyricsRenderer=new w1,this.lyricsRenderer.addToScene(this.current.scene),this.lyricsRenderer.setVisible(!0),this.lyricsRenderer.setAspect(t,i),this.lyricsRenderer.setViewportSize(t,i),this.container.addEventListener("wheel",c=>{const u=this.container.getBoundingClientRect();(c.clientX-u.left)/u.width*2-1>-.1&&(c.preventDefault(),this.lyricsRenderer.handleWheel(c.deltaY))},{passive:!1}),this.container.addEventListener("click",c=>{const u=this.container.getBoundingClientRect(),h=(c.clientX-u.left)/u.width*2-1,d=-((c.clientY-u.top)/u.height)*2+1;console.log(`[Orchestrator] click event: ndcX=${h.toFixed(2)} ndcY=${d.toFixed(2)} target=${c.target?.tagName}`),c.shiftKey?this.lyricsRenderer.debugInspectClick(h,d,this.renderer,c.clientX,c.clientY):this.lyricsRenderer.handleClick(h,d)}),this.lyricsRenderer.onSeek(c=>{console.log(`[Orchestrator] seek \u2192 ${c.toFixed(3)}s`),document.dispatchEvent(new CustomEvent("visualizer-seek",{detail:{time:c}}));const u=window.musicRuntime?.audioEngine?.audioElement||document.querySelector("audio")||document.getElementById("globalAudio");u&&typeof u.currentTime=="number"&&(u.currentTime=c)}),this.kineticRibbons=new Qx,this.kineticRibbons.addToScene(this.current.scene),this.cinematographyEngine=new Yx,this.current.camera.layers.enable(1),globalThis.__DEBUG__&&console.log(`[Visualizer] Initialized with ${this.sceneFactories.length} scenes (lazy)`),globalThis.__DEBUG__&&console.log("[Visualizer] Scenes: Lava, Julia, Lorenz, Riemann, ReactionDiffusion, Hyperbolic, LivingCanvas, FractalInfinity"),globalThis.__lyricsDebug=(c=!0)=>{this.lyricsRenderer.setDebug(c)},globalThis.__lyricsRenderer=this.lyricsRenderer,document.addEventListener("uiToggle",c=>{console.log(`[Orchestrator] uiToggle event: visible=${c.detail?.visible} centered=${c.detail?.centered}`),this.setUiVisible(c.detail?.visible??!1),c.detail?.centered!==void 0&&(this.gpuTypography.setCentered(c.detail.centered),this.lyricsRenderer.setCentered(c.detail.centered))}),new ResizeObserver(()=>this.handleResize()).observe(this.container);let n=0,s=!1;const o=this.renderer.domElement,l=()=>{!s&&this.running&&(s=!0,this._scrollPaused=!0,o.style.transition="none",o.style.filter="blur(8px) saturate(1.3)"),clearTimeout(n),n=window.setTimeout(()=>{s&&(s=!1,this._scrollPaused=!1,o.style.transition="filter 0.3s ease-out",o.style.filter="",setTimeout(()=>{o.style.transition=""},350))},200)};document.addEventListener("scroll",l,{capture:!0,passive:!0}),document.addEventListener("keydown",c=>{const u=c.target;if(u?.isContentEditable||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA")return;const h=Number(c.key);h>=1&&h<=9&&this.setScene(h-1),c.key==="0"&&this.setScene(9),c.key.toLowerCase()==="z"&&(this.uiVisible=!this.uiVisible,this.setUiVisible(this.uiVisible))})}getOrCreateScene(e){if(this.scenes[e])return this.scenes[e];const t=this.sceneFactories[e]();return t.camera.layers.enable(1),this.scenes[e]=t,this._currentPalette&&typeof t.setPalette=="function"&&t.setPalette(this._currentPalette),this._lastAlbumArt&&typeof t.setAlbumArt=="function"&&t.setAlbumArt(this._lastAlbumArt),t}setScene(e){e<0||e>=this.sceneFactories.length||e===this.currentIdx&&this.scenes[e]||(globalThis.__DEBUG__&&console.log(`[Visualizer] Switching scene: ${this.currentIdx} \u2192 ${e}`),this.gpuTypography.removeFromScene(this.current.scene),this.lyricsRenderer.removeFromScene(this.current.scene),this.kineticRibbons.removeFromScene(this.current.scene),this.cinematographyActive&&this._removeCinematographyPasses(),this.currentIdx=e,this.current=this.getOrCreateScene(e),this._currentPalette&&typeof this.current.setPalette=="function"&&this.current.setPalette(this._currentPalette),this.postProcessing.updateScene(this.current.scene,this.current.camera),this.postProcessing.setBloomProfile(e===26?"coraline":"default"),this.gpuTypography.addToScene(this.current.scene),this.lyricsRenderer.addToScene(this.current.scene),this.current.camera instanceof it&&e!==25&&this.kineticRibbons.addToScene(this.current.scene),e===25&&this._activateCinematography(),this.handleResize())}_activateCinematography(){const e=window.musicRuntime?.audioEngine?.audioElement?.duration||200;this.cinematographyEngine.generateRecipe(e,void 0,["mirror"]);const t=this.cinematographyEngine.getPasses();for(const i of t)this.postProcessing.composer.addPass(i);this.cinematographyActive=!0}_removeCinematographyPasses(){const e=this.cinematographyEngine.getPasses();for(const t of e){const i=this.postProcessing.composer.passes.indexOf(t);i!==-1&&this.postProcessing.composer.passes.splice(i,1)}this.cinematographyEngine.dispose(),this.cinematographyActive=!1}setResolutionScale(e){this.resolutionScale=Math.max(.1,Math.min(2,e)),this.renderer.setPixelRatio(window.devicePixelRatio*this.resolutionScale);const t=this.container.clientWidth||window.innerWidth,i=this.container.clientHeight||window.innerHeight;if(t===0||i===0)return;this.renderer.setSize(t,i,!1),this.postProcessing.setSize(t,i);const a=window.devicePixelRatio*this.resolutionScale;this.current.resize(t,i,a)}setMaxFps(e){this.maxFps=Math.max(0,Math.round(e))}setTimeScale(e,t=600){this.timeScaleTarget=Math.max(0,Math.min(3,e)),this.timeScaleLerpSpeed=1-Math.pow(.05,16/t)}setZenMode(e){this.zenFadeTarget=e?.15:1}setUiVisible(e){this.uiVisible=e,this.gpuTypography.setVisible(e),this.lyricsRenderer.setVisible(!0),this.lyricsRenderer.setControlsVisible(e)}setTextCentered(e){this.gpuTypography.setCentered(e)}setBlur(e){this.current.setBlur(e?1:0)}setDim(e,t){this.current.setDim(e?t??.4:0)}setBlurDim(e){this.current.setBlur(e?1:0),this.current.setDim(e?.4:0)}setTrack(e,t){globalThis.__DEBUG__&&console.log(`[Visualizer] setTrack: "${e}" - "${t}"`),this.gpuTypography.setTrack(e,t);const i=this.scenes[25];i instanceof Zo&&i.regenerateSeed(),this.setScene(Fl),this.setUiVisible(!0)}setPalette(e){const t=e.map(a=>new he(a));this._currentPalette=t;const i=this.scenes[this.currentIdx];i&&typeof i.setPalette=="function"&&i.setPalette(t),this.kineticRibbons.setAccentColor(t[2]),this.lyricsRenderer.setAccentColor(t[0])}setAlbumArt(e){globalThis.__DEBUG__&&console.log("[Visualizer] setAlbumArt:",e);const t=this.scenes[6];t instanceof dd&&t.setAlbumArt(e);const i=this.scenes[25];i instanceof Zo&&i.setAlbumArt(e),this._lastAlbumArt=e}setLyricsTimeline(e,t,i){this.lyricsRenderer.setTimeline(e,t,i),this.gpuTypography.setVisible(!1),this.lyricsRenderer.setVisible(!0)}setCurrentTime(e){this.lyricsRenderer.setCurrentTime(e)}start(){this.running||(this.running=!0,this.lastRealTime=performance.now()*.001,this.dilatedTime>3600&&(this.dilatedTime=0),requestAnimationFrame(()=>this.handleResize()),this.loop())}renderFrame(){const e=performance.now()*.001;this.lastRealTime===0&&(this.lastRealTime=e);const t=Math.min(e-this.lastRealTime,.1)||.016;this.lastRealTime=e,this.timeScale+=(this.timeScaleTarget-this.timeScale)*this.timeScaleLerpSpeed,this.dilatedTime+=t*this.timeScale,this.dilatedTime>1e4&&(this.dilatedTime-=1e4);const i=this.audioProcessor.update();this.zenFadeCurrent+=(this.zenFadeTarget-this.zenFadeCurrent)*.05,this.renderer.domElement.style.opacity=String(this.zenFadeCurrent),this.current.update(i,this.dilatedTime),this.gpuTypography.update(i.rms);const a=window.musicRuntime?.audioEngine?.audioElement;a&&this.lyricsRenderer.setCurrentTime(a.currentTime),this.lyricsRenderer.update(i.rms),this.kineticRibbons.update(i,this.dilatedTime),this.cinematographyActive&&this.cinematographyEngine.update(i),this.postProcessing.update(i),this.postProcessing.composer.render(),this.postProcessing.renderText()}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}dispose(){this.stop(),this.scenes.forEach(e=>e?.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}handleResize(){const e=window.innerWidth||this.container.clientWidth||1,t=window.innerHeight||this.container.clientHeight||1;if(e===0||t===0)return;const i=this.renderer.domElement;i.style.width=e+"px",i.style.height=t+"px",this._resizeDbgCount+=1;const a=this.container.clientWidth||0,n=this.container.clientHeight||0;(this._resizeDbgCount<=6||a<e*.9||n<t*.9)&&console.log(`[Orchestrator] handleResize #${this._resizeDbgCount}: viewport=${e}x${t} container=${a}x${n} canvasCss=${i.style.width}x${i.style.height} pixelRatio=${this.renderer.getPixelRatio().toFixed(2)} resScale=${this.resolutionScale}`),this.renderer.setSize(e,t,!1),this.postProcessing.setSize(e,t),this.lyricsRenderer.setAspect(e,t),this.lyricsRenderer.setViewportSize(e,t);const s=window.devicePixelRatio*this.resolutionScale;this.current.resize(e,t,s),this.running&&this.renderFrame()}}export{Jx as ThreeOrchestrator};
