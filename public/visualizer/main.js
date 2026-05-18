const Qm="162",Jm="",oi="srgb",bi="srgb-linear",sn="display-p3",ua="display-p3-linear",ha="linear",ot="srgb",da="rec709",e0="p3",mo="300 es";class Qi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(t)===-1&&a[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const a=this._listeners;return a[e]!==void 0&&a[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const i=a.indexOf(t);i!==-1&&a.splice(i,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const a=t.slice(0);for(let i=0,r=a.length;i<r;i++)a[i].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ln=Math.PI/180,cn=180/Math.PI;function Nr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[a&255]+Et[a>>8&255]+Et[a>>16&255]+Et[a>>24&255]).toLowerCase()}function Ot(n,e,t){return Math.max(e,Math.min(t,n))}function fl(n,e){return(n%e+e)%e}function un(n,e,t){return(1-t)*n+t*e}function go(n){return(n&n-1)===0&&n!==0}function hn(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function zr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Fe{constructor(e=0,t=0){Fe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,a=this.y,i=e.elements;return this.x=i[0]*t+i[3]*a+i[6],this.y=i[1]*t+i[4]*a+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const a=this.dot(e)/t;return Math.acos(Ot(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,a=this.y-e.y;return t*t+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const a=Math.cos(t),i=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*a-s*i+e.x,this.y=r*i+s*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,a,i,r,s,o,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,a,i,r,s,o,l,c)}set(e,t,a,i,r,s,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=a,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,a=e.elements;return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],this}extractBasis(e,t,a){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const a=e.elements,i=t.elements,r=this.elements,s=a[0],o=a[3],l=a[6],c=a[1],u=a[4],h=a[7],d=a[2],f=a[5],g=a[8],v=i[0],p=i[3],m=i[6],b=i[1],_=i[4],M=i[7],S=i[2],E=i[5],w=i[8];return r[0]=s*v+o*b+l*S,r[3]=s*p+o*_+l*E,r[6]=s*m+o*M+l*w,r[1]=c*v+u*b+h*S,r[4]=c*p+u*_+h*E,r[7]=c*m+u*M+h*w,r[2]=d*v+f*b+g*S,r[5]=d*p+f*_+g*E,r[8]=d*m+f*M+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],a=e[1],i=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*s*u-t*o*c-a*r*u+a*o*l+i*r*c-i*s*l}invert(){const e=this.elements,t=e[0],a=e[1],i=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*s-o*c,d=o*l-u*r,f=c*r-s*l,g=t*h+a*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(i*c-u*a)*v,e[2]=(o*a-i*s)*v,e[3]=d*v,e[4]=(u*t-i*l)*v,e[5]=(i*r-o*t)*v,e[6]=f*v,e[7]=(a*l-c*t)*v,e[8]=(s*t-a*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,a,i,r,s,o){const l=Math.cos(r),c=Math.sin(r);return this.set(a*l,a*c,-a*(l*s+c*o)+s+e,-i*c,i*l,-i*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(dn.makeScale(e,t)),this}rotate(e){return this.premultiply(dn.makeRotation(-e)),this}translate(e,t){return this.premultiply(dn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,-a,0,a,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,a=e.elements;for(let i=0;i<9;i++)if(t[i]!==a[i])return!1;return!0}fromArray(e,t=0){for(let a=0;a<9;a++)this.elements[a]=e[a+t];return this}toArray(e=[],t=0){const a=this.elements;return e[t]=a[0],e[t+1]=a[1],e[t+2]=a[2],e[t+3]=a[3],e[t+4]=a[4],e[t+5]=a[5],e[t+6]=a[6],e[t+7]=a[7],e[t+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const dn=new Qe;function vo(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function kr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function pl(){const n=kr("canvas");return n.style.display="block",n}const _o={};function ml(n){n in _o||(_o[n]=!0,console.warn(n))}const xo=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),yo=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),fa={[bi]:{transfer:ha,primaries:da,toReference:n=>n,fromReference:n=>n},[oi]:{transfer:ot,primaries:da,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ua]:{transfer:ha,primaries:"p3",toReference:n=>n.applyMatrix3(yo),fromReference:n=>n.applyMatrix3(xo)},[sn]:{transfer:ot,primaries:"p3",toReference:n=>n.convertSRGBToLinear().applyMatrix3(yo),fromReference:n=>n.applyMatrix3(xo).convertLinearToSRGB()}},gl=new Set([bi,ua]),rt={enabled:!0,_workingColorSpace:bi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!gl.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const a=fa[e].toReference,i=fa[t].fromReference;return i(a(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return fa[n].primaries},getTransfer:function(n){return n===""?ha:fa[n].transfer}};function Ji(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let er;class bo{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{er===void 0&&(er=kr("canvas")),er.width=e.width,er.height=e.height;const a=er.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),t=er}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=kr("canvas");t.width=e.width,t.height=e.height;const a=t.getContext("2d");a.drawImage(e,0,0,e.width,e.height);const i=a.getImageData(0,0,e.width,e.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=Ji(r[s]/255)*255;return a.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let a=0;a<t.length;a++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[a]=Math.floor(Ji(t[a]/255)*255):t[a]=Ji(t[a]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vl=0;class So{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vl++}),this.uuid=Nr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const a={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,o=i.length;s<o;s++)i[s].isDataTexture?r.push(pn(i[s].image)):r.push(pn(i[s]))}else r=pn(i);a.url=r}return t||(e.images[this.uuid]=a),a}}function pn(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?bo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _l=0;class Mt extends Qi{constructor(e=Mt.DEFAULT_IMAGE,t=Mt.DEFAULT_MAPPING,a=1001,i=1001,r=1006,s=1008,o=1023,l=1009,c=Mt.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_l++}),this.uuid=Nr(),this.name="",this.source=new So(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=a,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),t||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Mt.DEFAULT_IMAGE=null,Mt.DEFAULT_MAPPING=300,Mt.DEFAULT_ANISOTROPY=1;class _t{constructor(e=0,t=0,a=0,i=1){_t.prototype.isVector4=!0,this.x=e,this.y=t,this.z=a,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,a,i){return this.x=e,this.y=t,this.z=a,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,a=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*a+s[8]*i+s[12]*r,this.y=s[1]*t+s[5]*a+s[9]*i+s[13]*r,this.z=s[2]*t+s[6]*a+s[10]*i+s[14]*r,this.w=s[3]*t+s[7]*a+s[11]*i+s[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,a,i,r;const s=e.elements,o=s[0],l=s[4],c=s[8],u=s[1],h=s[5],d=s[9],f=s[2],g=s[6],v=s[10];if(Math.abs(l-u)<.01&&Math.abs(c-f)<.01&&Math.abs(d-g)<.01){if(Math.abs(l+u)<.1&&Math.abs(c+f)<.1&&Math.abs(d+g)<.1&&Math.abs(o+h+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const m=(o+1)/2,b=(h+1)/2,_=(v+1)/2,M=(l+u)/4,S=(c+f)/4,E=(d+g)/4;return m>b&&m>_?m<.01?(a=0,i=.707106781,r=.707106781):(a=Math.sqrt(m),i=M/a,r=S/a):b>_?b<.01?(a=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),a=M/i,r=E/i):_<.01?(a=.707106781,i=.707106781,r=0):(r=Math.sqrt(_),a=S/r,i=E/r),this.set(a,i,r,t),this}let p=Math.sqrt((g-d)*(g-d)+(c-f)*(c-f)+(u-l)*(u-l));return Math.abs(p)<.001&&(p=1),this.x=(g-d)/p,this.y=(c-f)/p,this.z=(u-l)/p,this.w=Math.acos((o+h+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this.z=e.z+(t.z-e.z)*a,this.w=e.w+(t.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xl extends Qi{constructor(e=1,t=1,a={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);const i={width:e,height:t,depth:1};a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},a);const r=new Mt(i,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.colorSpace);r.flipY=!1,r.generateMipmaps=a.generateMipmaps,r.internalFormat=a.internalFormat,this.textures=[];const s=a.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.depthTexture=a.depthTexture,this.samples=a.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,a=1){if(this.width!==e||this.height!==t||this.depth!==a){this.width=e,this.height=t,this.depth=a;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=a;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let a=0,i=e.textures.length;a<i;a++)this.textures[a]=e.textures[a].clone(),this.textures[a].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new So(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mt extends xl{constructor(e=1,t=1,a={}){super(e,t,a),this.isWebGLRenderTarget=!0}}class Mo extends Mt{constructor(e=null,t=1,a=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:a,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yl extends Mt{constructor(e=null,t=1,a=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:a,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Br{constructor(e=0,t=0,a=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=a,this._w=i}static slerpFlat(e,t,a,i,r,s,o){let l=a[i+0],c=a[i+1],u=a[i+2],h=a[i+3];const d=r[s+0],f=r[s+1],g=r[s+2],v=r[s+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==d||c!==f||u!==g){let p=1-o;const m=l*d+c*f+u*g+h*v,b=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){const S=Math.sqrt(_),E=Math.atan2(S,m*b);p=Math.sin(p*E)/S,o=Math.sin(o*E)/S}const M=o*b;if(l=l*p+d*M,c=c*p+f*M,u=u*p+g*M,h=h*p+v*M,p===1-o){const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,a,i,r,s){const o=a[i],l=a[i+1],c=a[i+2],u=a[i+3],h=r[s],d=r[s+1],f=r[s+2],g=r[s+3];return e[t]=o*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-o*f,e[t+2]=c*g+u*f+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,a,i){return this._x=e,this._y=t,this._z=a,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const a=e._x,i=e._y,r=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(a/2),u=o(i/2),h=o(r/2),d=l(a/2),f=l(i/2),g=l(r/2);switch(s){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const a=t/2,i=Math.sin(a);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,a=t[0],i=t[4],r=t[8],s=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=a+o+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(s-i)*f}else if(a>o&&a>h){const f=2*Math.sqrt(1+a-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+s)/f,this._z=(r+c)/f}else if(o>h){const f=2*Math.sqrt(1+o-a-h);this._w=(r-c)/f,this._x=(i+s)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-a-o);this._w=(s-i)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let a=e.dot(t)+1;return a<Number.EPSILON?(a=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=a):(this._x=0,this._y=-e.z,this._z=e.y,this._w=a)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=a),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ot(this.dot(e),-1,1)))}rotateTowards(e,t){const a=this.angleTo(e);if(a===0)return this;const i=Math.min(1,t/a);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const a=e._x,i=e._y,r=e._z,s=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=a*u+s*o+i*c-r*l,this._y=i*u+s*l+r*o-a*c,this._z=r*u+s*c+a*l-i*o,this._w=s*u-a*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const a=this._x,i=this._y,r=this._z,s=this._w;let o=s*e._w+a*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=a,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*s+t*this._w,this._x=f*a+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=s*h+this._w*d,this._x=a*h+this._x*d,this._y=i*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,a){return this.copy(e).slerp(t,a)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),a=Math.random(),i=Math.sqrt(1-a),r=Math.sqrt(a);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ae{constructor(e=0,t=0,a=0){ae.prototype.isVector3=!0,this.x=e,this.y=t,this.z=a}set(e,t,a){return a===void 0&&(a=this.z),this.x=e,this.y=t,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(To.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(To.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,a=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*a+r[6]*i,this.y=r[1]*t+r[4]*a+r[7]*i,this.z=r[2]*t+r[5]*a+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,a=this.y,i=this.z,r=e.elements,s=1/(r[3]*t+r[7]*a+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*a+r[8]*i+r[12])*s,this.y=(r[1]*t+r[5]*a+r[9]*i+r[13])*s,this.z=(r[2]*t+r[6]*a+r[10]*i+r[14])*s,this}applyQuaternion(e){const t=this.x,a=this.y,i=this.z,r=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*i-o*a),u=2*(o*t-r*i),h=2*(r*a-s*t);return this.x=t+l*c+s*h-o*u,this.y=a+l*u+o*c-r*h,this.z=i+l*h+r*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,a=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*a+r[8]*i,this.y=r[1]*t+r[5]*a+r[9]*i,this.z=r[2]*t+r[6]*a+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this.z=e.z+(t.z-e.z)*a,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const a=e.x,i=e.y,r=e.z,s=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*s-a*l,this.z=a*o-i*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const a=e.dot(this)/t;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return mn.copy(this).projectOnVector(e),this.sub(mn)}reflect(e){return this.sub(mn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const a=this.dot(e)/t;return Math.acos(Ot(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,a=this.y-e.y,i=this.z-e.z;return t*t+a*a+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,a){const i=Math.sin(t)*e;return this.x=i*Math.sin(a),this.y=Math.cos(t)*e,this.z=i*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,a){return this.x=e*Math.sin(t),this.y=a,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=a,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,a=Math.sqrt(1-t*t);return this.x=a*Math.cos(e),this.y=t,this.z=a*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const mn=new ae,To=new Br;class ui{constructor(e=new ae(1/0,1/0,1/0),t=new ae(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,a=e.length;t<a;t+=3)this.expandByPoint(ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,a=e.count;t<a;t++)this.expandByPoint(ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,a=e.length;t<a;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const a=ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const a=e.geometry;if(a!==void 0){const r=a.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,ei):ei.fromBufferAttribute(r,s),ei.applyMatrix4(e.matrixWorld),this.expandByPoint(ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pa.copy(e.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),pa.copy(a.boundingBox)),pa.applyMatrix4(e.matrixWorld),this.union(pa)}const i=e.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ei),ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,a;return e.normal.x>0?(t=e.normal.x*this.min.x,a=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,a=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,a+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,a+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,a+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,a+=e.normal.z*this.min.z),t<=-e.constant&&a>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gr),ma.subVectors(this.max,Gr),tr.subVectors(e.a,Gr),ir.subVectors(e.b,Gr),rr.subVectors(e.c,Gr),Si.subVectors(ir,tr),Mi.subVectors(rr,ir),Li.subVectors(tr,rr);let t=[0,-Si.z,Si.y,0,-Mi.z,Mi.y,0,-Li.z,Li.y,Si.z,0,-Si.x,Mi.z,0,-Mi.x,Li.z,0,-Li.x,-Si.y,Si.x,0,-Mi.y,Mi.x,0,-Li.y,Li.x,0];return!gn(t,tr,ir,rr,ma)||(t=[1,0,0,0,1,0,0,0,1],!gn(t,tr,ir,rr,ma))?!1:(ga.crossVectors(Si,Mi),t=[ga.x,ga.y,ga.z],gn(t,tr,ir,rr,ma))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hi=[new ae,new ae,new ae,new ae,new ae,new ae,new ae,new ae],ei=new ae,pa=new ui,tr=new ae,ir=new ae,rr=new ae,Si=new ae,Mi=new ae,Li=new ae,Gr=new ae,ma=new ae,ga=new ae,Di=new ae;function gn(n,e,t,a,i){for(let r=0,s=n.length-3;r<=s;r+=3){Di.fromArray(n,r);const o=i.x*Math.abs(Di.x)+i.y*Math.abs(Di.y)+i.z*Math.abs(Di.z),l=e.dot(Di),c=t.dot(Di),u=a.dot(Di);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const bl=new ui,Hr=new ae,vn=new ae;class Fi{constructor(e=new ae,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const a=this.center;t!==void 0?a.copy(t):bl.setFromPoints(e).getCenter(a);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,a.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const a=this.center.distanceToSquared(e);return t.copy(e),a>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hr.subVectors(e,this.center);const t=Hr.lengthSq();if(t>this.radius*this.radius){const a=Math.sqrt(t),i=(a-this.radius)*.5;this.center.addScaledVector(Hr,i/a),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vn.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hr.copy(e.center).add(vn)),this.expandByPoint(Hr.copy(e.center).sub(vn))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const di=new ae,_n=new ae,va=new ae,Ti=new ae,xn=new ae,_a=new ae,yn=new ae;class wo{constructor(e=new ae,t=new ae(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,di)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const a=t.dot(this.direction);return a<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=di.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(di.copy(this.origin).addScaledVector(this.direction,t),di.distanceToSquared(e))}distanceSqToSegment(e,t,a,i){_n.copy(e).add(t).multiplyScalar(.5),va.copy(t).sub(e).normalize(),Ti.copy(this.origin).sub(_n);const r=e.distanceTo(t)*.5,s=-this.direction.dot(va),o=Ti.dot(this.direction),l=-Ti.dot(va),c=Ti.lengthSq(),u=Math.abs(1-s*s);let h,d,f,g;if(u>0)if(h=s*l-o,d=s*o-l,g=r*u,h>=0)if(d>=-g)if(d<=g){const v=1/u;h*=v,d*=v,f=h*(h+s*d+2*o)+d*(s*h+d+2*l)+c}else d=r,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-s*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(s*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=s>0?-r:r,h=Math.max(0,-(s*d+o)),f=-h*h+d*(d+2*l)+c;return a&&a.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(_n).addScaledVector(va,d),f}intersectSphere(e,t){di.subVectors(e.center,this.origin);const a=di.dot(this.direction),i=di.dot(di)-a*a,r=e.radius*e.radius;if(i>r)return null;const s=Math.sqrt(r-i),o=a-s,l=a+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(e.normal)+e.constant)/t;return a>=0?a:null}intersectPlane(e,t){const a=this.distanceToPlane(e);return a===null?null:this.at(a,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let a,i,r,s,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(a=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(a=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,s=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,s=(e.min.y-d.y)*u),a>s||r>i||((r>a||isNaN(a))&&(a=r),(s<i||isNaN(i))&&(i=s),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),a>l||o>i)||((o>a||a!==a)&&(a=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(a>=0?a:i,t)}intersectsBox(e){return this.intersectBox(e,di)!==null}intersectTriangle(e,t,a,i,r){xn.subVectors(t,e),_a.subVectors(a,e),yn.crossVectors(xn,_a);let s=this.direction.dot(yn),o;if(s>0){if(i)return null;o=1}else if(s<0)o=-1,s=-s;else return null;Ti.subVectors(this.origin,e);const l=o*this.direction.dot(_a.crossVectors(Ti,_a));if(l<0)return null;const c=o*this.direction.dot(xn.cross(Ti));if(c<0||l+c>s)return null;const u=-o*Ti.dot(yn);return u<0?null:this.at(u/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,a,i,r,s,o,l,c,u,h,d,f,g,v,p){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,a,i,r,s,o,l,c,u,h,d,f,g,v,p)}set(e,t,a,i,r,s,o,l,c,u,h,d,f,g,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=a,m[12]=i,m[1]=r,m[5]=s,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,a=e.elements;return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],this}copyPosition(e){const t=this.elements,a=e.elements;return t[12]=a[12],t[13]=a[13],t[14]=a[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,a){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(e,t,a){return this.set(e.x,t.x,a.x,0,e.y,t.y,a.y,0,e.z,t.z,a.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,a=e.elements,i=1/ar.setFromMatrixColumn(e,0).length(),r=1/ar.setFromMatrixColumn(e,1).length(),s=1/ar.setFromMatrixColumn(e,2).length();return t[0]=a[0]*i,t[1]=a[1]*i,t[2]=a[2]*i,t[3]=0,t[4]=a[4]*r,t[5]=a[5]*r,t[6]=a[6]*r,t[7]=0,t[8]=a[8]*s,t[9]=a[9]*s,t[10]=a[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,a=e.x,i=e.y,r=e.z,s=Math.cos(a),o=Math.sin(a),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=s*u,f=s*h,g=o*u,v=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=g+f*c,t[10]=s*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,g=c*u,v=c*h;t[0]=d+v*o,t[4]=g*o-f,t[8]=s*c,t[1]=s*h,t[5]=s*u,t[9]=-o,t[2]=f*o-g,t[6]=v+d*o,t[10]=s*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,g=c*u,v=c*h;t[0]=d-v*o,t[4]=-s*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=s*u,t[9]=v-d*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const d=s*u,f=s*h,g=o*u,v=o*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const d=s*l,f=s*c,g=o*l,v=o*c;t[0]=l*u,t[4]=v-d*h,t[8]=g*h+f,t[1]=h,t[5]=s*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-v*h}else if(e.order==="XZY"){const d=s*l,f=s*c,g=o*l,v=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=s*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Sl,e,Ml)}lookAt(e,t,a){const i=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),wi.crossVectors(a,Gt),wi.lengthSq()===0&&(Math.abs(a.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),wi.crossVectors(a,Gt)),wi.normalize(),xa.crossVectors(Gt,wi),i[0]=wi.x,i[4]=xa.x,i[8]=Gt.x,i[1]=wi.y,i[5]=xa.y,i[9]=Gt.y,i[2]=wi.z,i[6]=xa.z,i[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const a=e.elements,i=t.elements,r=this.elements,s=a[0],o=a[4],l=a[8],c=a[12],u=a[1],h=a[5],d=a[9],f=a[13],g=a[2],v=a[6],p=a[10],m=a[14],b=a[3],_=a[7],M=a[11],S=a[15],E=i[0],w=i[4],U=i[8],O=i[12],x=i[1],C=i[5],L=i[9],N=i[13],R=i[2],G=i[6],z=i[10],y=i[14],Y=i[3],k=i[7],X=i[11],D=i[15];return r[0]=s*E+o*x+l*R+c*Y,r[4]=s*w+o*C+l*G+c*k,r[8]=s*U+o*L+l*z+c*X,r[12]=s*O+o*N+l*y+c*D,r[1]=u*E+h*x+d*R+f*Y,r[5]=u*w+h*C+d*G+f*k,r[9]=u*U+h*L+d*z+f*X,r[13]=u*O+h*N+d*y+f*D,r[2]=g*E+v*x+p*R+m*Y,r[6]=g*w+v*C+p*G+m*k,r[10]=g*U+v*L+p*z+m*X,r[14]=g*O+v*N+p*y+m*D,r[3]=b*E+_*x+M*R+S*Y,r[7]=b*w+_*C+M*G+S*k,r[11]=b*U+_*L+M*z+S*X,r[15]=b*O+_*N+M*y+S*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],a=e[4],i=e[8],r=e[12],s=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],v=e[7],p=e[11],m=e[15];return g*(+r*l*h-i*c*h-r*o*d+a*c*d+i*o*f-a*l*f)+v*(+t*l*f-t*c*d+r*s*d-i*s*f+i*c*u-r*l*u)+p*(+t*c*h-t*o*f-r*s*h+a*s*f+r*o*u-a*c*u)+m*(-i*o*u-t*l*h+t*o*d+i*s*h-a*s*d+a*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,a){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=a),this}invert(){const e=this.elements,t=e[0],a=e[1],i=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],v=e[13],p=e[14],m=e[15],b=h*p*c-v*d*c+v*l*f-o*p*f-h*l*m+o*d*m,_=g*d*c-u*p*c-g*l*f+s*p*f+u*l*m-s*d*m,M=u*v*c-g*h*c+g*o*f-s*v*f-u*o*m+s*h*m,S=g*h*l-u*v*l-g*o*d+s*v*d+u*o*p-s*h*p,E=t*b+a*_+i*M+r*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/E;return e[0]=b*w,e[1]=(v*d*r-h*p*r-v*i*f+a*p*f+h*i*m-a*d*m)*w,e[2]=(o*p*r-v*l*r+v*i*c-a*p*c-o*i*m+a*l*m)*w,e[3]=(h*l*r-o*d*r-h*i*c+a*d*c+o*i*f-a*l*f)*w,e[4]=_*w,e[5]=(u*p*r-g*d*r+g*i*f-t*p*f-u*i*m+t*d*m)*w,e[6]=(g*l*r-s*p*r-g*i*c+t*p*c+s*i*m-t*l*m)*w,e[7]=(s*d*r-u*l*r+u*i*c-t*d*c-s*i*f+t*l*f)*w,e[8]=M*w,e[9]=(g*h*r-u*v*r-g*a*f+t*v*f+u*a*m-t*h*m)*w,e[10]=(s*v*r-g*o*r+g*a*c-t*v*c-s*a*m+t*o*m)*w,e[11]=(u*o*r-s*h*r-u*a*c+t*h*c+s*a*f-t*o*f)*w,e[12]=S*w,e[13]=(u*v*i-g*h*i+g*a*d-t*v*d-u*a*p+t*h*p)*w,e[14]=(g*o*i-s*v*i-g*a*l+t*v*l+s*a*p-t*o*p)*w,e[15]=(s*h*i-u*o*i+u*a*l-t*h*l-s*a*d+t*o*d)*w,this}scale(e){const t=this.elements,a=e.x,i=e.y,r=e.z;return t[0]*=a,t[4]*=i,t[8]*=r,t[1]*=a,t[5]*=i,t[9]*=r,t[2]*=a,t[6]*=i,t[10]*=r,t[3]*=a,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,a,i))}makeTranslation(e,t,a){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,a,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,t,-a,0,0,a,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,0,a,0,0,1,0,0,-a,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,-a,0,0,a,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const a=Math.cos(t),i=Math.sin(t),r=1-a,s=e.x,o=e.y,l=e.z,c=r*s,u=r*o;return this.set(c*s+a,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+a,u*l-i*s,0,c*l-i*o,u*l+i*s,r*l*l+a,0,0,0,0,1),this}makeScale(e,t,a){return this.set(e,0,0,0,0,t,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,t,a,i,r,s){return this.set(1,a,r,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,a){const i=this.elements,r=t._x,s=t._y,o=t._z,l=t._w,c=r+r,u=s+s,h=o+o,d=r*c,f=r*u,g=r*h,v=s*u,p=s*h,m=o*h,b=l*c,_=l*u,M=l*h,S=a.x,E=a.y,w=a.z;return i[0]=(1-(v+m))*S,i[1]=(f+M)*S,i[2]=(g-_)*S,i[3]=0,i[4]=(f-M)*E,i[5]=(1-(d+m))*E,i[6]=(p+b)*E,i[7]=0,i[8]=(g+_)*w,i[9]=(p-b)*w,i[10]=(1-(d+v))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,a){const i=this.elements;let r=ar.set(i[0],i[1],i[2]).length();const s=ar.set(i[4],i[5],i[6]).length(),o=ar.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],ti.copy(this);const l=1/r,c=1/s,u=1/o;return ti.elements[0]*=l,ti.elements[1]*=l,ti.elements[2]*=l,ti.elements[4]*=c,ti.elements[5]*=c,ti.elements[6]*=c,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,t.setFromRotationMatrix(ti),a.x=r,a.y=s,a.z=o,this}makePerspective(e,t,a,i,r,s,o=2e3){const l=this.elements,c=2*r/(t-e),u=2*r/(a-i),h=(t+e)/(t-e),d=(a+i)/(a-i);let f,g;if(o===2e3)f=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(o===2001)f=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,a,i,r,s,o=2e3){const l=this.elements,c=1/(t-e),u=1/(a-i),h=1/(s-r),d=(t+e)*c,f=(a+i)*u;let g,v;if(o===2e3)g=(s+r)*h,v=-2*h;else if(o===2001)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,a=e.elements;for(let i=0;i<16;i++)if(t[i]!==a[i])return!1;return!0}fromArray(e,t=0){for(let a=0;a<16;a++)this.elements[a]=e[a+t];return this}toArray(e=[],t=0){const a=this.elements;return e[t]=a[0],e[t+1]=a[1],e[t+2]=a[2],e[t+3]=a[3],e[t+4]=a[4],e[t+5]=a[5],e[t+6]=a[6],e[t+7]=a[7],e[t+8]=a[8],e[t+9]=a[9],e[t+10]=a[10],e[t+11]=a[11],e[t+12]=a[12],e[t+13]=a[13],e[t+14]=a[14],e[t+15]=a[15],e}}const ar=new ae,ti=new ct,Sl=new ae(0,0,0),Ml=new ae(1,1,1),wi=new ae,xa=new ae,Gt=new ae,Eo=new ct,Ao=new Br;class vi{constructor(e=0,t=0,a=0,i=vi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=a,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,a,i=this._order){return this._x=e,this._y=t,this._z=a,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,a=!0){const i=e.elements,r=i[0],s=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ot(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ot(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ot(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,a===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,a){return Eo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eo,t,a)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ao.setFromEuler(this),this.setFromQuaternion(Ao,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vi.DEFAULT_ORDER="XYZ";class Co{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Tl=0;const Ro=new ae,nr=new Br,fi=new ct,ya=new ae,Vr=new ae,wl=new ae,El=new Br,Uo=new ae(1,0,0),Po=new ae(0,1,0),Lo=new ae(0,0,1),Al={type:"added"},Cl={type:"removed"},bn={type:"childadded",child:null},Sn={type:"childremoved",child:null};class Rt extends Qi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tl++}),this.uuid=Nr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new ae,t=new vi,a=new Br,i=new ae(1,1,1);function r(){a.setFromEuler(t,!1)}function s(){t.setFromQuaternion(a,void 0,!1)}t._onChange(r),a._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ct},normalMatrix:{value:new Qe}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return nr.setFromAxisAngle(e,t),this.quaternion.multiply(nr),this}rotateOnWorldAxis(e,t){return nr.setFromAxisAngle(e,t),this.quaternion.premultiply(nr),this}rotateX(e){return this.rotateOnAxis(Uo,e)}rotateY(e){return this.rotateOnAxis(Po,e)}rotateZ(e){return this.rotateOnAxis(Lo,e)}translateOnAxis(e,t){return Ro.copy(e).applyQuaternion(this.quaternion),this.position.add(Ro.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Uo,e)}translateY(e){return this.translateOnAxis(Po,e)}translateZ(e){return this.translateOnAxis(Lo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,a){e.isVector3?ya.copy(e):ya.set(e,t,a);const i=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(Vr,ya,this.up):fi.lookAt(ya,Vr,this.up),this.quaternion.setFromRotationMatrix(fi),i&&(fi.extractRotation(i.matrixWorld),nr.setFromRotationMatrix(fi),this.quaternion.premultiply(nr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Al),bn.child=e,this.dispatchEvent(bn),bn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cl),Sn.child=e,this.dispatchEvent(Sn),Sn.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let a=0,i=this.children.length;a<i;a++){const r=this.children[a].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,a=[]){this[e]===t&&a.push(this);const i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].getObjectsByProperty(e,t,a);return a}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,wl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,El,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let a=0,i=t.length;a<i;a++)t[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let a=0,i=t.length;a<i;a++)t[a].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let a=0,i=t.length;a<i;a++){const r=t[a];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const a=this.parent;if(e===!0&&a!==null&&a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",a={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),h=s(e.shapes),d=s(e.skeletons),f=s(e.animations),g=s(e.nodes);o.length>0&&(a.geometries=o),l.length>0&&(a.materials=l),c.length>0&&(a.textures=c),u.length>0&&(a.images=u),h.length>0&&(a.shapes=h),d.length>0&&(a.skeletons=d),f.length>0&&(a.animations=f),g.length>0&&(a.nodes=g)}return a.object=i,a;function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let a=0;a<e.children.length;a++){const i=e.children[a];this.add(i.clone())}return this}}Rt.DEFAULT_UP=new ae(0,1,0),Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ii=new ae,pi=new ae,Mn=new ae,mi=new ae,or=new ae,sr=new ae,Do=new ae,Tn=new ae,wn=new ae,En=new ae;class ci{constructor(e=new ae,t=new ae,a=new ae){this.a=e,this.b=t,this.c=a}static getNormal(e,t,a,i){i.subVectors(a,t),ii.subVectors(e,t),i.cross(ii);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,a,i,r){ii.subVectors(i,t),pi.subVectors(a,t),Mn.subVectors(e,t);const s=ii.dot(ii),o=ii.dot(pi),l=ii.dot(Mn),c=pi.dot(pi),u=pi.dot(Mn),h=s*c-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,f=(c*l-o*u)*d,g=(s*u-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,a,i){return this.getBarycoord(e,t,a,i,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,a,i,r,s,o,l){return this.getBarycoord(e,t,a,i,mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mi.x),l.addScaledVector(s,mi.y),l.addScaledVector(o,mi.z),l)}static isFrontFacing(e,t,a,i){return ii.subVectors(a,t),pi.subVectors(e,t),ii.cross(pi).dot(i)<0}set(e,t,a){return this.a.copy(e),this.b.copy(t),this.c.copy(a),this}setFromPointsAndIndices(e,t,a,i){return this.a.copy(e[t]),this.b.copy(e[a]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,a,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,a),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),ii.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ci.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ci.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,a,i,r){return ci.getInterpolation(e,this.a,this.b,this.c,t,a,i,r)}containsPoint(e){return ci.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ci.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const a=this.a,i=this.b,r=this.c;let s,o;or.subVectors(i,a),sr.subVectors(r,a),Tn.subVectors(e,a);const l=or.dot(Tn),c=sr.dot(Tn);if(l<=0&&c<=0)return t.copy(a);wn.subVectors(e,i);const u=or.dot(wn),h=sr.dot(wn);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(a).addScaledVector(or,s);En.subVectors(e,r);const f=or.dot(En),g=sr.dot(En);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(a).addScaledVector(sr,o);const p=u*g-f*h;if(p<=0&&h-u>=0&&f-g>=0)return Do.subVectors(r,i),o=(h-u)/(h-u+(f-g)),t.copy(i).addScaledVector(Do,o);const m=1/(p+v+d);return s=v*m,o=d*m,t.copy(a).addScaledVector(or,s).addScaledVector(sr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Fo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},ba={h:0,s:0,l:0};function An(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class fe{constructor(e,t,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,a)}set(e,t,a){if(t===void 0&&a===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,a);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=oi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,a,i=rt.workingColorSpace){return this.r=e,this.g=t,this.b=a,rt.toWorkingColorSpace(this,i),this}setHSL(e,t,a,i=rt.workingColorSpace){if(e=fl(e,1),t=Ot(t,0,1),a=Ot(a,0,1),t===0)this.r=this.g=this.b=a;else{const r=a<=.5?a*(1+t):a+t-a*t,s=2*a-r;this.r=An(s,r,e+1/3),this.g=An(s,r,e),this.b=An(s,r,e-1/3)}return rt.toWorkingColorSpace(this,i),this}setStyle(e,t=oi){function a(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=i[1],o=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return a(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return a(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return a(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=oi){const a=Fo[e.toLowerCase()];return a!==void 0?this.setHex(a,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}copyLinearToSRGB(e){return this.r=fn(e.r),this.g=fn(e.g),this.b=fn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=oi){return rt.fromWorkingColorSpace(At.copy(this),e),Math.round(Ot(At.r*255,0,255))*65536+Math.round(Ot(At.g*255,0,255))*256+Math.round(Ot(At.b*255,0,255))}getHexString(e=oi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(At.copy(this),t);const a=At.r,i=At.g,r=At.b,s=Math.max(a,i,r),o=Math.min(a,i,r);let l,c;const u=(o+s)/2;if(o===s)l=0,c=0;else{const h=s-o;switch(c=u<=.5?h/(s+o):h/(2-s-o),s){case a:l=(i-r)/h+(i<r?6:0);break;case i:l=(r-a)/h+2;break;case r:l=(a-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=oi){rt.fromWorkingColorSpace(At.copy(this),e);const t=At.r,a=At.g,i=At.b;return e!==oi?`color(${e} ${t.toFixed(3)} ${a.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(a*255)},${Math.round(i*255)})`}offsetHSL(e,t,a){return this.getHSL(Ei),this.setHSL(Ei.h+e,Ei.s+t,Ei.l+a)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,a){return this.r=e.r+(t.r-e.r)*a,this.g=e.g+(t.g-e.g)*a,this.b=e.b+(t.b-e.b)*a,this}lerpHSL(e,t){this.getHSL(Ei),e.getHSL(ba);const a=un(Ei.h,ba.h,t),i=un(Ei.s,ba.s,t),r=un(Ei.l,ba.l,t);return this.setHSL(a,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,a=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*a+r[6]*i,this.g=r[1]*t+r[4]*a+r[7]*i,this.b=r[2]*t+r[5]*a+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new fe;fe.NAMES=Fo;let Rl=0;class Wr extends Qi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rl++}),this.uuid=Nr(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new fe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const a=e[t];if(a===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(a):i&&i.isVector3&&a&&a.isVector3?i.copy(a):this[t]=a}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const a={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(e).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(e).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(e).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(e).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(e).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(a.blending=this.blending),this.side!==0&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==204&&(a.blendSrc=this.blendSrc),this.blendDst!==205&&(a.blendDst=this.blendDst),this.blendEquation!==100&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(a.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function i(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(t){const r=i(e.textures),s=i(e.images);r.length>0&&(a.textures=r),s.length>0&&(a.images=s)}return a}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let a=null;if(t!==null){const i=t.length;a=new Array(i);for(let r=0;r!==i;++r)a[r]=t[r].clone()}return this.clippingPlanes=a,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ii extends Wr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new ae,Sa=new Fe;class Ht{constructor(e,t,a=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=a,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return ml("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,a){e*=this.itemSize,a*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[a+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,a=this.count;t<a;t++)Sa.fromBufferAttribute(this,t),Sa.applyMatrix3(e),this.setXY(t,Sa.x,Sa.y);else if(this.itemSize===3)for(let t=0,a=this.count;t<a;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,a=this.count;t<a;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,a=this.count;t<a;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,a=this.count;t<a;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let a=this.array[e*this.itemSize+t];return this.normalized&&(a=zr(a,this.array)),a}setComponent(e,t,a){return this.normalized&&(a=Nt(a,this.array)),this.array[e*this.itemSize+t]=a,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,a){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),a=Nt(a,this.array)),this.array[e+0]=t,this.array[e+1]=a,this}setXYZ(e,t,a,i){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),a=Nt(a,this.array),i=Nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=a,this.array[e+2]=i,this}setXYZW(e,t,a,i,r){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),a=Nt(a,this.array),i=Nt(i,this.array),r=Nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=a,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class Io extends Ht{constructor(e,t,a){super(new Uint16Array(e),t,a)}}class Oo extends Ht{constructor(e,t,a){super(new Uint32Array(e),t,a)}}class Ut extends Ht{constructor(e,t,a){super(new Float32Array(e),t,a)}}let Ul=0;const jt=new ct,Cn=new Rt,lr=new ae,Vt=new ui,Xr=new ui,bt=new ae;class Xt extends Qi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ul++}),this.uuid=Nr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vo(e)?Oo:Io)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,a=0){this.groups.push({start:e,count:t,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const r=new Qe().getNormalMatrix(e);a.applyNormalMatrix(r),a.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,a){return jt.makeTranslation(e,t,a),this.applyMatrix4(jt),this}scale(e,t,a){return jt.makeScale(e,t,a),this.applyMatrix4(jt),this}lookAt(e){return Cn.lookAt(e),Cn.updateMatrix(),this.applyMatrix4(Cn.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(lr).negate(),this.translate(lr.x,lr.y,lr.z),this}setFromPoints(e){const t=[];for(let a=0,i=e.length;a<i;a++){const r=e[a];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ut(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ae(-1/0,-1/0,-1/0),new ae(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let a=0,i=t.length;a<i;a++){const r=t[a];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ae,1/0);return}if(e){const a=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const o=t[r];Xr.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Vt.min,Xr.min),Vt.expandByPoint(bt),bt.addVectors(Vt.max,Xr.max),Vt.expandByPoint(bt)):(Vt.expandByPoint(Xr.min),Vt.expandByPoint(Xr.max))}Vt.getCenter(a);let i=0;for(let r=0,s=e.count;r<s;r++)bt.fromBufferAttribute(e,r),i=Math.max(i,a.distanceToSquared(bt));if(t)for(let r=0,s=t.length;r<s;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)bt.fromBufferAttribute(o,c),l&&(lr.fromBufferAttribute(e,c),bt.add(lr)),i=Math.max(i,a.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*a.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<a.count;U++)o[U]=new ae,l[U]=new ae;const c=new ae,u=new ae,h=new ae,d=new Fe,f=new Fe,g=new Fe,v=new ae,p=new ae;function m(U,O,x){c.fromBufferAttribute(a,U),u.fromBufferAttribute(a,O),h.fromBufferAttribute(a,x),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,O),g.fromBufferAttribute(r,x),u.sub(c),h.sub(c),f.sub(d),g.sub(d);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(C),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),o[U].add(v),o[O].add(v),o[x].add(v),l[U].add(p),l[O].add(p),l[x].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let U=0,O=b.length;U<O;++U){const x=b[U],C=x.start,L=x.count;for(let N=C,R=C+L;N<R;N+=3)m(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const _=new ae,M=new ae,S=new ae,E=new ae;function w(U){S.fromBufferAttribute(i,U),E.copy(S);const O=o[U];_.copy(O),_.sub(S.multiplyScalar(S.dot(O))).normalize(),M.crossVectors(E,O);const x=M.dot(l[U])<0?-1:1;s.setXYZW(U,_.x,_.y,_.z,x)}for(let U=0,O=b.length;U<O;++U){const x=b[U],C=x.start,L=x.count;for(let N=C,R=C+L;N<R;N+=3)w(e.getX(N+0)),w(e.getX(N+1)),w(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",a);else for(let d=0,f=a.count;d<f;d++)a.setXYZ(d,0,0,0);const i=new ae,r=new ae,s=new ae,o=new ae,l=new ae,c=new ae,u=new ae,h=new ae;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),v=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,p),u.subVectors(s,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(a,g),l.fromBufferAttribute(a,v),c.fromBufferAttribute(a,p),o.add(u),l.add(u),c.add(u),a.setXYZ(g,o.x,o.y,o.z),a.setXYZ(v,l.x,l.y,l.z),a.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),u.subVectors(s,r),h.subVectors(i,r),u.cross(h),a.setXYZ(d+0,u.x,u.y,u.z),a.setXYZ(d+1,u.x,u.y,u.z),a.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,a=e.count;t<a;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let m=0;m<u;m++)d[g++]=c[f++]}return new Ht(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,a=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,a);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,a);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const a=this.attributes;for(const l in a){const c=a[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const a=e.index;a!==null&&this.setIndex(a.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const No=new ct,Oi=new wo,Ma=new Fi,zo=new ae,cr=new ae,ur=new ae,hr=new ae,Rn=new ae,Ta=new ae,wa=new Fe,Ea=new Fe,Aa=new Fe,ko=new ae,Bo=new ae,Go=new ae,Ca=new ae,Ra=new ae;class We extends Rt{constructor(e=new Xt,t=new Ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const a=e[t[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,r=a.length;i<r;i++){const s=a[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=i}}}}getVertexPosition(e,t){const a=this.geometry,i=a.attributes.position,r=a.morphAttributes.position,s=a.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Ta.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(Rn.fromBufferAttribute(h,e),s?Ta.addScaledVector(Rn,u):Ta.addScaledVector(Rn.sub(t),u))}t.add(Ta)}return t}raycast(e,t){const a=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Ma.copy(a.boundingSphere),Ma.applyMatrix4(r),Oi.copy(e.ray).recast(e.near),!(Ma.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(Ma,zo)===null||Oi.origin.distanceToSquared(zo)>(e.far-e.near)**2))&&(No.copy(r).invert(),Oi.copy(e.ray).applyMatrix4(No),!(a.boundingBox!==null&&Oi.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(e,t,Oi)))}_computeIntersections(e,t,a){let i;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=s[p.materialIndex],b=Math.max(p.start,f.start),_=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let M=b,S=_;M<S;M+=3){const E=o.getX(M),w=o.getX(M+1),U=o.getX(M+2);i=Ua(this,m,e,a,c,u,h,E,w,U),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const b=o.getX(p),_=o.getX(p+1),M=o.getX(p+2);i=Ua(this,s,e,a,c,u,h,b,_,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=s[p.materialIndex],b=Math.max(p.start,f.start),_=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=b,S=_;M<S;M+=3){const E=M,w=M+1,U=M+2;i=Ua(this,m,e,a,c,u,h,E,w,U),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const b=p,_=p+1,M=p+2;i=Ua(this,s,e,a,c,u,h,b,_,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Pl(n,e,t,a,i,r,s,o){let l;if(e.side===1?l=a.intersectTriangle(s,r,i,!0,o):l=a.intersectTriangle(i,r,s,e.side===0,o),l===null)return null;Ra.copy(o),Ra.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ra);return c<t.near||c>t.far?null:{distance:c,point:Ra.clone(),object:n}}function Ua(n,e,t,a,i,r,s,o,l,c){n.getVertexPosition(o,cr),n.getVertexPosition(l,ur),n.getVertexPosition(c,hr);const u=Pl(n,e,t,a,cr,ur,hr,Ca);if(u){i&&(wa.fromBufferAttribute(i,o),Ea.fromBufferAttribute(i,l),Aa.fromBufferAttribute(i,c),u.uv=ci.getInterpolation(Ca,cr,ur,hr,wa,Ea,Aa,new Fe)),r&&(wa.fromBufferAttribute(r,o),Ea.fromBufferAttribute(r,l),Aa.fromBufferAttribute(r,c),u.uv1=ci.getInterpolation(Ca,cr,ur,hr,wa,Ea,Aa,new Fe)),s&&(ko.fromBufferAttribute(s,o),Bo.fromBufferAttribute(s,l),Go.fromBufferAttribute(s,c),u.normal=ci.getInterpolation(Ca,cr,ur,hr,ko,Bo,Go,new ae),u.normal.dot(a.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new ae,materialIndex:0};ci.getNormal(cr,ur,hr,h.normal),u.face=h}return u}class ia extends Xt{constructor(e=1,t=1,a=1,i=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:a,widthSegments:i,heightSegments:r,depthSegments:s};const o=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,a,t,e,s,r,0),g("z","y","x",1,-1,a,t,-e,s,r,1),g("x","z","y",1,1,e,a,t,i,s,2),g("x","z","y",1,-1,e,a,-t,i,s,3),g("x","y","z",1,-1,e,t,a,i,r,4),g("x","y","z",-1,-1,e,t,-a,i,r,5),this.setIndex(l),this.setAttribute("position",new Ut(c,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(h,2));function g(v,p,m,b,_,M,S,E,w,U,O){const x=M/w,C=S/U,L=M/2,N=S/2,R=E/2,G=w+1,z=U+1;let y=0,Y=0;const k=new ae;for(let X=0;X<z;X++){const D=X*C-N;for(let H=0;H<G;H++){const j=H*x-L;k[v]=j*b,k[p]=D*_,k[m]=R,c.push(k.x,k.y,k.z),k[v]=0,k[p]=0,k[m]=E>0?1:-1,u.push(k.x,k.y,k.z),h.push(H/w),h.push(1-X/U),y+=1}}for(let X=0;X<U;X++)for(let D=0;D<w;D++){const H=d+D+G*X,j=d+D+G*(X+1),I=d+(D+1)+G*(X+1),B=d+(D+1)+G*X;l.push(H,j,B),l.push(j,I,B),Y+=6}o.addGroup(f,Y,O),f+=Y,d+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ia(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function dr(n){const e={};for(const t in n){e[t]={};for(const a in n[t]){const i=n[t][a];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][a]=null):e[t][a]=i.clone():Array.isArray(i)?e[t][a]=i.slice():e[t][a]=i}}return e}function Pt(n){const e={};for(let t=0;t<n.length;t++){const a=dr(n[t]);for(const i in a)e[i]=a[i]}return e}function Ll(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ho(n){return n.getRenderTarget()===null?n.outputColorSpace:rt.workingColorSpace}const qr={clone:dr,merge:Pt};var Dl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ye extends Wr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dl,this.fragmentShader=Fl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dr(e.uniforms),this.uniformsGroups=Ll(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const a={};for(const i in this.extensions)this.extensions[i]===!0&&(a[i]=!0);return Object.keys(a).length>0&&(t.extensions=a),t}}class Vo extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ai=new ae,Wo=new Fe,Xo=new Fe;class Wt extends Vo{constructor(e=50,t=1,a=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=a,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=cn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ln*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cn*2*Math.atan(Math.tan(ln*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,a){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ai.x,Ai.y).multiplyScalar(-e/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(Ai.x,Ai.y).multiplyScalar(-e/Ai.z)}getViewSize(e,t){return this.getViewBounds(e,Wo,Xo),t.subVectors(Xo,Wo)}setViewOffset(e,t,a,i,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=a,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ln*.5*this.fov)/this.zoom,a=2*t,i=this.aspect*a,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*i/l,t-=s.offsetY*a/c,i*=s.width/l,a*=s.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-a,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fr=-90,pr=1;class Il extends Rt{constructor(e,t,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Wt(fr,pr,e,t);i.layers=this.layers,this.add(i);const r=new Wt(fr,pr,e,t);r.layers=this.layers,this.add(r);const s=new Wt(fr,pr,e,t);s.layers=this.layers,this.add(s);const o=new Wt(fr,pr,e,t);o.layers=this.layers,this.add(o);const l=new Wt(fr,pr,e,t);l.layers=this.layers,this.add(l);const c=new Wt(fr,pr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[a,i,r,s,o,l]=t;for(const c of t)this.remove(c);if(e===2e3)a.up.set(0,1,0),a.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)a.up.set(0,-1,0),a.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,e.setRenderTarget(a,0,i),e.render(t,r),e.setRenderTarget(a,1,i),e.render(t,s),e.setRenderTarget(a,2,i),e.render(t,o),e.setRenderTarget(a,3,i),e.render(t,l),e.setRenderTarget(a,4,i),e.render(t,c),a.texture.generateMipmaps=v,e.setRenderTarget(a,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,a.texture.needsPMREMUpdate=!0}}class qo extends Mt{constructor(e,t,a,i,r,s,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,a,i,r,s,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ol extends mt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const a={width:e,height:e,depth:1},i=[a,a,a,a,a,a];this.texture=new qo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ia(5,5,5),r=new Ye({name:"CubemapFromEquirect",uniforms:dr(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:1,blending:0});r.uniforms.tEquirect.value=t;const s=new We(i,r),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Il(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,a,i){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,a,i);e.setRenderTarget(r)}}const Un=new ae,Nl=new ae,zl=new Qe;class Ni{constructor(e=new ae(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,a,i){return this.normal.set(e,t,a),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,a){const i=Un.subVectors(a,t).cross(Nl.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const a=e.delta(Un),i=this.normal.dot(a);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(a,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),a=this.distanceToPoint(e.end);return t<0&&a>0||a<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const a=t||zl.getNormalMatrix(e),i=this.coplanarPoint(Un).applyMatrix4(e),r=this.normal.applyMatrix3(a).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new Fi,Pa=new ae;class jo{constructor(e=new Ni,t=new Ni,a=new Ni,i=new Ni,r=new Ni,s=new Ni){this.planes=[e,t,a,i,r,s]}set(e,t,a,i,r,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(a),o[3].copy(i),o[4].copy(r),o[5].copy(s),this}copy(e){const t=this.planes;for(let a=0;a<6;a++)t[a].copy(e.planes[a]);return this}setFromProjectionMatrix(e,t=2e3){const a=this.planes,i=e.elements,r=i[0],s=i[1],o=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],f=i[8],g=i[9],v=i[10],p=i[11],m=i[12],b=i[13],_=i[14],M=i[15];if(a[0].setComponents(l-r,d-c,p-f,M-m).normalize(),a[1].setComponents(l+r,d+c,p+f,M+m).normalize(),a[2].setComponents(l+s,d+u,p+g,M+b).normalize(),a[3].setComponents(l-s,d-u,p-g,M-b).normalize(),a[4].setComponents(l-o,d-h,p-v,M-_).normalize(),t===2e3)a[5].setComponents(l+o,d+h,p+v,M+_).normalize();else if(t===2001)a[5].setComponents(o,h,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){return zi.center.set(0,0,0),zi.radius=.7071067811865476,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){const t=this.planes,a=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(a)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let a=0;a<6;a++){const i=t[a];if(Pa.x=i.normal.x>0?e.max.x:e.min.x,Pa.y=i.normal.y>0?e.max.y:e.min.y,Pa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Pa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let a=0;a<6;a++)if(t[a].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yo(){let n=null,e=!1,t=null,a=null;function i(r,s){t(r,s),a=n.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(a=n.requestAnimationFrame(i),e=!0)},stop:function(){n.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function kl(n,e){const t=e.isWebGL2,a=new WeakMap;function i(c,u){const h=c.array,d=c.usage,f=h.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,h,d),c.onUploadCallback();let v;if(h instanceof Float32Array)v=n.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)v=n.SHORT;else if(h instanceof Uint32Array)v=n.UNSIGNED_INT;else if(h instanceof Int32Array)v=n.INT;else if(h instanceof Int8Array)v=n.BYTE;else if(h instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,u,h){const d=u.array,f=u._updateRange,g=u.updateRanges;if(n.bindBuffer(h,c),f.count===-1&&g.length===0&&n.bufferSubData(h,0,d),g.length!==0){for(let v=0,p=g.length;v<p;v++){const m=g[v];t?n.bufferSubData(h,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count):n.bufferSubData(h,m.start*d.BYTES_PER_ELEMENT,d.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}f.count!==-1&&(t?n.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):n.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),a.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=a.get(c);u&&(n.deleteBuffer(u.buffer),a.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=a.get(c);(!d||d.version<c.version)&&a.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=a.get(c);if(h===void 0)a.set(c,i(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,c,u),h.version=c.version}}return{get:s,remove:o,update:l}}class et extends Xt{constructor(e=1,t=1,a=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:a,heightSegments:i};const r=e/2,s=t/2,o=Math.floor(a),l=Math.floor(i),c=o+1,u=l+1,h=e/o,d=t/l,f=[],g=[],v=[],p=[];for(let m=0;m<u;m++){const b=m*d-s;for(let _=0;_<c;_++){const M=_*h-r;g.push(M,-b,0),v.push(0,0,1),p.push(_/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let b=0;b<o;b++){const _=b+c*m,M=b+c*(m+1),S=b+1+c*(m+1),E=b+1+c*m;f.push(_,M,E),f.push(M,S,E)}this.setIndex(f),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(v,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new et(e.width,e.height,e.widthSegments,e.heightSegments)}}var Bl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gl=`#ifdef USE_ALPHAHASH
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
#endif`,Hl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wl=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xl=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ql=`#ifdef USE_AOMAP
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
#endif`,jl=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yl=`#ifdef USE_BATCHING
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
#endif`,$l=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Kl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zl=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ql=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jl=`#ifdef USE_IRIDESCENCE
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
#endif`,ec=`#ifdef USE_BUMPMAP
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
#endif`,tc=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ic=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ac=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,oc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,lc=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,cc=`#define PI 3.141592653589793
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
} // validated`,uc=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hc=`vec3 transformedNormal = objectNormal;
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
#endif`,dc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gc="gl_FragColor = linearToOutputTexel( gl_FragColor );",vc=`
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
}`,_c=`#ifdef USE_ENVMAP
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
#endif`,xc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yc=`#ifdef USE_ENVMAP
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
#endif`,bc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Sc=`#ifdef USE_ENVMAP
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
#endif`,Mc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ec=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ac=`#ifdef USE_GRADIENTMAP
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
}`,Cc=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Rc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lc=`uniform bool receiveShadow;
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
#endif`,Dc=`#ifdef USE_ENVMAP
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
#endif`,Fc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ic=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Oc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zc=`PhysicalMaterial material;
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
#endif`,kc=`struct PhysicalMaterial {
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
}`,Bc=`
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
#endif`,Gc=`#if defined( RE_IndirectDiffuse )
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
#endif`,Hc=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,qc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,jc=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$c=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Kc=`#if defined( USE_POINTS_UV )
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
#endif`,Zc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qc=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jc=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,eu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tu=`#ifdef USE_MORPHNORMALS
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
#endif`,iu=`#ifdef USE_MORPHTARGETS
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
#endif`,ru=`#ifdef USE_MORPHTARGETS
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
#endif`,au=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ou=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,su=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cu=`#ifdef USE_NORMALMAP
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
#endif`,uu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,du=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,fu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_u=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Su=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wu=`float getShadowMask() {
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
}`,Eu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Au=`#ifdef USE_SKINNING
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
#endif`,Cu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ru=`#ifdef USE_SKINNING
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
#endif`,Uu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Pu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Du=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fu=`#ifdef USE_TRANSMISSION
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
#endif`,Iu=`#ifdef USE_TRANSMISSION
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
#endif`,Ou=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ku=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Bu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gu=`uniform sampler2D t2D;
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
}`,Hu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vu=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qu=`#include <common>
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
}`,ju=`#if DEPTH_PACKING == 3200
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
}`,Yu=`#define DISTANCE
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
}`,$u=`#define DISTANCE
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
}`,Ku=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qu=`uniform float scale;
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
}`,Ju=`uniform vec3 diffuse;
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
}`,eh=`#include <common>
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
}`,th=`uniform vec3 diffuse;
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
}`,ih=`#define LAMBERT
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
}`,rh=`#define LAMBERT
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
}`,ah=`#define MATCAP
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
}`,nh=`#define MATCAP
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
}`,oh=`#define NORMAL
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
}`,sh=`#define NORMAL
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
}`,lh=`#define PHONG
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
}`,ch=`#define PHONG
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
}`,uh=`#define STANDARD
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
}`,hh=`#define STANDARD
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
}`,dh=`#define TOON
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
}`,fh=`#define TOON
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
}`,ph=`uniform float size;
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
}`,mh=`uniform vec3 diffuse;
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
}`,gh=`#include <common>
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
}`,vh=`uniform vec3 color;
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
}`,_h=`uniform float rotation;
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
}`,xh=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Bl,alphahash_pars_fragment:Gl,alphamap_fragment:Hl,alphamap_pars_fragment:Vl,alphatest_fragment:Wl,alphatest_pars_fragment:Xl,aomap_fragment:ql,aomap_pars_fragment:jl,batching_pars_vertex:Yl,batching_vertex:$l,begin_vertex:Kl,beginnormal_vertex:Zl,bsdfs:Ql,iridescence_fragment:Jl,bumpmap_pars_fragment:ec,clipping_planes_fragment:tc,clipping_planes_pars_fragment:ic,clipping_planes_pars_vertex:rc,clipping_planes_vertex:ac,color_fragment:nc,color_pars_fragment:oc,color_pars_vertex:sc,color_vertex:lc,common:cc,cube_uv_reflection_fragment:uc,defaultnormal_vertex:hc,displacementmap_pars_vertex:dc,displacementmap_vertex:fc,emissivemap_fragment:pc,emissivemap_pars_fragment:mc,colorspace_fragment:gc,colorspace_pars_fragment:vc,envmap_fragment:_c,envmap_common_pars_fragment:xc,envmap_pars_fragment:yc,envmap_pars_vertex:bc,envmap_physical_pars_fragment:Dc,envmap_vertex:Sc,fog_vertex:Mc,fog_pars_vertex:Tc,fog_fragment:wc,fog_pars_fragment:Ec,gradientmap_pars_fragment:Ac,lightmap_fragment:Cc,lightmap_pars_fragment:Rc,lights_lambert_fragment:Uc,lights_lambert_pars_fragment:Pc,lights_pars_begin:Lc,lights_toon_fragment:Fc,lights_toon_pars_fragment:Ic,lights_phong_fragment:Oc,lights_phong_pars_fragment:Nc,lights_physical_fragment:zc,lights_physical_pars_fragment:kc,lights_fragment_begin:Bc,lights_fragment_maps:Gc,lights_fragment_end:Hc,logdepthbuf_fragment:Vc,logdepthbuf_pars_fragment:Wc,logdepthbuf_pars_vertex:Xc,logdepthbuf_vertex:qc,map_fragment:jc,map_pars_fragment:Yc,map_particle_fragment:$c,map_particle_pars_fragment:Kc,metalnessmap_fragment:Zc,metalnessmap_pars_fragment:Qc,morphinstance_vertex:Jc,morphcolor_vertex:eu,morphnormal_vertex:tu,morphtarget_pars_vertex:iu,morphtarget_vertex:ru,normal_fragment_begin:au,normal_fragment_maps:nu,normal_pars_fragment:ou,normal_pars_vertex:su,normal_vertex:lu,normalmap_pars_fragment:cu,clearcoat_normal_fragment_begin:uu,clearcoat_normal_fragment_maps:hu,clearcoat_pars_fragment:du,iridescence_pars_fragment:fu,opaque_fragment:pu,packing:mu,premultiplied_alpha_fragment:gu,project_vertex:vu,dithering_fragment:_u,dithering_pars_fragment:xu,roughnessmap_fragment:yu,roughnessmap_pars_fragment:bu,shadowmap_pars_fragment:Su,shadowmap_pars_vertex:Mu,shadowmap_vertex:Tu,shadowmask_pars_fragment:wu,skinbase_vertex:Eu,skinning_pars_vertex:Au,skinning_vertex:Cu,skinnormal_vertex:Ru,specularmap_fragment:Uu,specularmap_pars_fragment:Pu,tonemapping_fragment:Lu,tonemapping_pars_fragment:Du,transmission_fragment:Fu,transmission_pars_fragment:Iu,uv_pars_fragment:Ou,uv_pars_vertex:Nu,uv_vertex:zu,worldpos_vertex:ku,background_vert:Bu,background_frag:Gu,backgroundCube_vert:Hu,backgroundCube_frag:Vu,cube_vert:Wu,cube_frag:Xu,depth_vert:qu,depth_frag:ju,distanceRGBA_vert:Yu,distanceRGBA_frag:$u,equirect_vert:Ku,equirect_frag:Zu,linedashed_vert:Qu,linedashed_frag:Ju,meshbasic_vert:eh,meshbasic_frag:th,meshlambert_vert:ih,meshlambert_frag:rh,meshmatcap_vert:ah,meshmatcap_frag:nh,meshnormal_vert:oh,meshnormal_frag:sh,meshphong_vert:lh,meshphong_frag:ch,meshphysical_vert:uh,meshphysical_frag:hh,meshtoon_vert:dh,meshtoon_frag:fh,points_vert:ph,points_frag:mh,shadow_vert:gh,shadow_frag:vh,sprite_vert:_h,sprite_frag:xh},Le={common:{diffuse:{value:new fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new fe(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},si={basic:{uniforms:Pt([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Pt([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new fe(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Pt([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new fe(0)},specular:{value:new fe(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Pt([Le.common,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.roughnessmap,Le.metalnessmap,Le.fog,Le.lights,{emissive:{value:new fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Pt([Le.common,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.gradientmap,Le.fog,Le.lights,{emissive:{value:new fe(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Pt([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Pt([Le.points,Le.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Pt([Le.common,Le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Pt([Le.common,Le.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Pt([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Pt([Le.sprite,Le.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Pt([Le.common,Le.displacementmap,{referencePosition:{value:new ae},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Pt([Le.lights,Le.fog,{color:{value:new fe(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};si.physical={uniforms:Pt([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new fe(0)},specularColor:{value:new fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const La={r:0,b:0,g:0},ki=new vi,yh=new ct;function bh(n,e,t,a,i,r,s){const o=new fe(0);let l=r===!0?0:1,c,u,h=null,d=0,f=null;function g(p,m){let b=!1,_=m.isScene===!0?m.background:null;_&&_.isTexture&&(_=(m.backgroundBlurriness>0?t:e).get(_)),_===null?v(o,l):_&&_.isColor&&(v(_,1),b=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?a.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,s),(n.autoClear||b)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),_&&(_.isCubeTexture||_.mapping===306)?(u===void 0&&(u=new We(new ia(1,1,1),new Ye({name:"BackgroundCubeMaterial",uniforms:dr(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(S,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ki.copy(m.backgroundRotation),ki.x*=-1,ki.y*=-1,ki.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(yh.makeRotationFromEuler(ki)),u.material.toneMapped=rt.getTransfer(_.colorSpace)!==ot,(h!==_||d!==_.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new We(new et(2,2),new Ye({name:"BackgroundMaterial",uniforms:dr(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=rt.getTransfer(_.colorSpace)!==ot,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,f=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function v(p,m){p.getRGB(La,Ho(n)),a.buffers.color.setClear(La.r,La.g,La.b,m,s)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),l=m,v(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,v(o,l)},render:g}}function Sh(n,e,t,a){const i=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=a.isWebGL2?null:e.get("OES_vertex_array_object"),s=a.isWebGL2||r!==null,o={},l=p(null);let c=l,u=!1;function h(R,G,z,y,Y){let k=!1;if(s){const X=v(y,z,G);c!==X&&(c=X,f(c.object)),k=m(R,y,z,Y),k&&b(R,y,z,Y)}else{const X=G.wireframe===!0;(c.geometry!==y.id||c.program!==z.id||c.wireframe!==X)&&(c.geometry=y.id,c.program=z.id,c.wireframe=X,k=!0)}Y!==null&&t.update(Y,n.ELEMENT_ARRAY_BUFFER),(k||u)&&(u=!1,U(R,G,z,y),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function d(){return a.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function f(R){return a.isWebGL2?n.bindVertexArray(R):r.bindVertexArrayOES(R)}function g(R){return a.isWebGL2?n.deleteVertexArray(R):r.deleteVertexArrayOES(R)}function v(R,G,z){const y=z.wireframe===!0;let Y=o[R.id];Y===void 0&&(Y={},o[R.id]=Y);let k=Y[G.id];k===void 0&&(k={},Y[G.id]=k);let X=k[y];return X===void 0&&(X=p(d()),k[y]=X),X}function p(R){const G=[],z=[],y=[];for(let Y=0;Y<i;Y++)G[Y]=0,z[Y]=0,y[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:z,attributeDivisors:y,object:R,attributes:{},index:null}}function m(R,G,z,y){const Y=c.attributes,k=G.attributes;let X=0;const D=z.getAttributes();for(const H in D)if(D[H].location>=0){const j=Y[H];let I=k[H];if(I===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&(I=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&(I=R.instanceColor)),j===void 0||j.attribute!==I||I&&j.data!==I.data)return!0;X++}return c.attributesNum!==X||c.index!==y}function b(R,G,z,y){const Y={},k=G.attributes;let X=0;const D=z.getAttributes();for(const H in D)if(D[H].location>=0){let j=k[H];j===void 0&&(H==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),H==="instanceColor"&&R.instanceColor&&(j=R.instanceColor));const I={};I.attribute=j,j&&j.data&&(I.data=j.data),Y[H]=I,X++}c.attributes=Y,c.attributesNum=X,c.index=y}function _(){const R=c.newAttributes;for(let G=0,z=R.length;G<z;G++)R[G]=0}function M(R){S(R,0)}function S(R,G){const z=c.newAttributes,y=c.enabledAttributes,Y=c.attributeDivisors;z[R]=1,y[R]===0&&(n.enableVertexAttribArray(R),y[R]=1),Y[R]!==G&&((a.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[a.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,G),Y[R]=G)}function E(){const R=c.newAttributes,G=c.enabledAttributes;for(let z=0,y=G.length;z<y;z++)G[z]!==R[z]&&(n.disableVertexAttribArray(z),G[z]=0)}function w(R,G,z,y,Y,k,X){X===!0?n.vertexAttribIPointer(R,G,z,Y,k):n.vertexAttribPointer(R,G,z,y,Y,k)}function U(R,G,z,y){if(a.isWebGL2===!1&&(R.isInstancedMesh||y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const Y=y.attributes,k=z.getAttributes(),X=G.defaultAttributeValues;for(const D in k){const H=k[D];if(H.location>=0){let j=Y[D];if(j===void 0&&(D==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),D==="instanceColor"&&R.instanceColor&&(j=R.instanceColor)),j!==void 0){const I=j.normalized,B=j.itemSize,J=t.get(j);if(J===void 0)continue;const W=J.buffer,$=J.type,ee=J.bytesPerElement,xe=a.isWebGL2===!0&&($===n.INT||$===n.UNSIGNED_INT||j.gpuType===1013);if(j.isInterleavedBufferAttribute){const oe=j.data,F=oe.stride,De=j.offset;if(oe.isInstancedInterleavedBuffer){for(let ge=0;ge<H.locationSize;ge++)S(H.location+ge,oe.meshPerAttribute);R.isInstancedMesh!==!0&&y._maxInstanceCount===void 0&&(y._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ge=0;ge<H.locationSize;ge++)M(H.location+ge);n.bindBuffer(n.ARRAY_BUFFER,W);for(let ge=0;ge<H.locationSize;ge++)w(H.location+ge,B/H.locationSize,$,I,F*ee,(De+B/H.locationSize*ge)*ee,xe)}else{if(j.isInstancedBufferAttribute){for(let oe=0;oe<H.locationSize;oe++)S(H.location+oe,j.meshPerAttribute);R.isInstancedMesh!==!0&&y._maxInstanceCount===void 0&&(y._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let oe=0;oe<H.locationSize;oe++)M(H.location+oe);n.bindBuffer(n.ARRAY_BUFFER,W);for(let oe=0;oe<H.locationSize;oe++)w(H.location+oe,B/H.locationSize,$,I,B*ee,B/H.locationSize*oe*ee,xe)}}else if(X!==void 0){const I=X[D];if(I!==void 0)switch(I.length){case 2:n.vertexAttrib2fv(H.location,I);break;case 3:n.vertexAttrib3fv(H.location,I);break;case 4:n.vertexAttrib4fv(H.location,I);break;default:n.vertexAttrib1fv(H.location,I)}}}}E()}function O(){L();for(const R in o){const G=o[R];for(const z in G){const y=G[z];for(const Y in y)g(y[Y].object),delete y[Y];delete G[z]}delete o[R]}}function x(R){if(o[R.id]===void 0)return;const G=o[R.id];for(const z in G){const y=G[z];for(const Y in y)g(y[Y].object),delete y[Y];delete G[z]}delete o[R.id]}function C(R){for(const G in o){const z=o[G];if(z[R.id]===void 0)continue;const y=z[R.id];for(const Y in y)g(y[Y].object),delete y[Y];delete z[R.id]}}function L(){N(),u=!0,c!==l&&(c=l,f(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:L,resetDefaultState:N,dispose:O,releaseStatesOfGeometry:x,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:M,disableUnusedAttributes:E}}function Mh(n,e,t,a){const i=a.isWebGL2;let r;function s(u){r=u}function o(u,h){n.drawArrays(r,u,h),t.update(h,r,1)}function l(u,h,d){if(d===0)return;let f,g;if(i)f=n,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,u,h,d),t.update(h,r,d)}function c(u,h,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(u[g],h[g]);else{f.multiDrawArraysWEBGL(r,u,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];t.update(g,r,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Th(n,e,t){let a;function i(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const s=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=s||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),v=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,M=s||e.has("OES_texture_float"),S=_&&M,E=s?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:b,vertexTextures:_,floatFragmentTextures:M,floatVertexTextures:S,maxSamples:E}}function wh(n){const e=this;let t=null,a=0,i=!1,r=!1;const s=new Ni,o=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||a!==0||i;return i=d,a=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,v=h.clipIntersection,p=h.clipShadows,m=n.get(h);if(!i||g===null||g.length===0||r&&!p)r?u(null):c();else{const b=r?0:a,_=b*4;let M=m.clippingState||null;l.value=M,M=u(g,d,_,f);for(let S=0;S!==_;++S)M[S]=t[S];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0}function u(h,d,f,g){const v=h!==null?h.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const m=f+v*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<m)&&(p=new Float32Array(m));for(let _=0,M=f;_!==v;++_,M+=4)s.copy(h[_]).applyMatrix4(b,o),s.normal.toArray(p,M),p[M+3]=s.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function Eh(n){let e=new WeakMap;function t(s,o){return o===303?s.mapping=301:o===304&&(s.mapping=302),s}function a(s){if(s&&s.isTexture){const o=s.mapping;if(o===303||o===304)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Ol(l.height);return c.fromEquirectangularTexture(n,s),e.set(s,c),s.addEventListener("dispose",i),t(c.texture,s.mapping)}else return null}}return s}function i(s){const o=s.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:a,dispose:r}}class it extends Vo{constructor(e=-1,t=1,a=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=a,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,a,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=a,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=a-e,s=a+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const mr=4,$o=[.125,.215,.35,.446,.526,.582],Bi=20,Pn=new it,Ko=new fe;let Ln=null,Dn=0,Fn=0;const Gi=(1+Math.sqrt(5))/2,gr=1/Gi,Zo=[new ae(1,1,1),new ae(-1,1,1),new ae(1,1,-1),new ae(-1,1,-1),new ae(0,Gi,gr),new ae(0,Gi,-gr),new ae(gr,0,Gi),new ae(-gr,0,Gi),new ae(Gi,gr,0),new ae(-Gi,gr,0)];class Qo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,a=.1,i=100){Ln=this._renderer.getRenderTarget(),Dn=this._renderer.getActiveCubeFace(),Fn=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,a,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ts(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=es(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ln,Dn,Fn),e.scissorTest=!1,Da(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ln=this._renderer.getRenderTarget(),Dn=this._renderer.getActiveCubeFace(),Fn=this._renderer.getActiveMipmapLevel();const a=t||this._allocateTargets();return this._textureToCubeUV(e,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,a={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:bi,depthBuffer:!1},i=Jo(e,t,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jo(e,t,a);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ah(r)),this._blurMaterial=Ch(r,e,t)}return i}_compileMaterial(e){const t=new We(this._lodPlanes[0],e);this._renderer.compile(t,Pn)}_sceneToCubeUV(e,t,a,i){const r=new Wt(90,1,t,a),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,u=l.toneMapping;l.getClearColor(Ko),l.toneMapping=0,l.autoClear=!1;const h=new Ii({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),d=new We(new ia,h);let f=!1;const g=e.background;g?g.isColor&&(h.color.copy(g),e.background=null,f=!0):(h.color.copy(Ko),f=!0);for(let v=0;v<6;v++){const p=v%3;p===0?(r.up.set(0,s[v],0),r.lookAt(o[v],0,0)):p===1?(r.up.set(0,0,s[v]),r.lookAt(0,o[v],0)):(r.up.set(0,s[v],0),r.lookAt(0,0,o[v]));const m=this._cubeSize;Da(i,p*m,v>2?m:0,m,m),l.setRenderTarget(i),f&&l.render(d,r),l.render(e,r)}d.geometry.dispose(),d.material.dispose(),l.toneMapping=u,l.autoClear=c,e.background=g}_textureToCubeUV(e,t){const a=this._renderer,i=e.mapping===301||e.mapping===302;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ts()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=es());const r=i?this._cubemapMaterial:this._equirectMaterial,s=new We(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Da(t,0,0,3*l,2*l),a.setRenderTarget(t),a.render(s,Pn)}_applyPMREM(e){const t=this._renderer,a=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),s=Zo[(i-1)%Zo.length];this._blur(e,i-1,i,r,s)}t.autoClear=a}_blur(e,t,a,i,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,a,i,"latitudinal",r),this._halfBlur(s,e,a,a,i,"longitudinal",r)}_halfBlur(e,t,a,i,r,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new We(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[a]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Bi-1),v=r/g,p=isFinite(r)?1+Math.floor(u*v):Bi;p>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Bi}`);const m=[];let b=0;for(let w=0;w<Bi;++w){const U=w/v,O=Math.exp(-U*U/2);m.push(O),w===0?b+=O:w<p&&(b+=2*O)}for(let w=0;w<m.length;w++)m[w]=m[w]/b;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=s==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-a;const M=this._sizeLods[i],S=3*M*(i>_-mr?i-_+mr:0),E=4*(this._cubeSize-M);Da(t,S,E,3*M,2*M),l.setRenderTarget(t),l.render(h,Pn)}}function Ah(n){const e=[],t=[],a=[];let i=n;const r=n-mr+1+$o.length;for(let s=0;s<r;s++){const o=Math.pow(2,i);t.push(o);let l=1/o;s>n-mr?l=$o[s-n+mr-1]:s===0&&(l=0),a.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,v=3,p=2,m=1,b=new Float32Array(v*g*f),_=new Float32Array(p*g*f),M=new Float32Array(m*g*f);for(let E=0;E<f;E++){const w=E%3*2/3-1,U=E>2?0:-1,O=[w,U,0,w+2/3,U,0,w+2/3,U+1,0,w,U,0,w+2/3,U+1,0,w,U+1,0];b.set(O,v*g*E),_.set(d,p*g*E);const x=[E,E,E,E,E,E];M.set(x,m*g*E)}const S=new Xt;S.setAttribute("position",new Ht(b,v)),S.setAttribute("uv",new Ht(_,p)),S.setAttribute("faceIndex",new Ht(M,m)),e.push(S),i>mr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:a}}function Jo(n,e,t){const a=new mt(n,e,t);return a.texture.mapping=306,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Da(n,e,t,a,i){n.viewport.set(e,t,a,i),n.scissor.set(e,t,a,i)}function Ch(n,e,t){const a=new Float32Array(Bi),i=new ae(0,1,0);return new Ye({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:In(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function es(){return new Ye({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:In(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function ts(){return new Ye({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:In(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function In(){return`

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
	`}function Rh(n){let e=new WeakMap,t=null;function a(o){if(o&&o.isTexture){const l=o.mapping,c=l===303||l===304,u=l===301||l===302;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Qo(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new Qo(n));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:a,dispose:s}}function Uh(n){const e={};function t(a){if(e[a]!==void 0)return e[a];let i;switch(a){case"WEBGL_depth_texture":i=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=n.getExtension(a)}return e[a]=i,i}return{has:function(a){return t(a)!==null},init:function(a){a.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(a){const i=t(a);return i===null&&console.warn("THREE.WebGLRenderer: "+a+" extension not supported."),i}}}function Ph(n,e,t,a){const i={},r=new WeakMap;function s(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let p=0,m=v.length;p<m;p++)e.remove(v[p])}d.removeEventListener("dispose",s),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),a.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",s),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const g in d)e.update(d[g],n.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const v=f[g];for(let p=0,m=v.length;p<m;p++)e.update(v[p],n.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,g=h.attributes.position;let v=0;if(f!==null){const b=f.array;v=f.version;for(let _=0,M=b.length;_<M;_+=3){const S=b[_+0],E=b[_+1],w=b[_+2];d.push(S,E,E,w,w,S)}}else if(g!==void 0){const b=g.array;v=g.version;for(let _=0,M=b.length/3-1;_<M;_+=3){const S=_+0,E=_+1,w=_+2;d.push(S,E,E,w,w,S)}}else return;const p=new(vo(d)?Oo:Io)(d,1);p.version=v;const m=r.get(h);m&&e.remove(m),r.set(h,p)}function u(h){const d=r.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Lh(n,e,t,a){const i=a.isWebGL2;let r;function s(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,g){n.drawElements(r,g,o,f*l),t.update(g,r,1)}function h(f,g,v){if(v===0)return;let p,m;if(i)p=n,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,g,o,f*l,v),t.update(g,r,v)}function d(f,g,v){if(v===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<v;m++)this.render(f[m]/l,g[m]);else{p.multiDrawElementsWEBGL(r,g,0,o,f,0,v);let m=0;for(let b=0;b<v;b++)m+=g[b];t.update(m,r,1)}}this.setMode=s,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function Dh(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function a(r,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:a}}function Fh(n,e){return n[0]-e[0]}function Ih(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Oh(n,e,t){const a={},i=new Float32Array(8),r=new WeakMap,s=new _t,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0;let v=r.get(u);if(v===void 0||v.count!==g){let p=function(){C.dispose(),r.delete(u),u.removeEventListener("dispose",p)};v!==void 0&&v.texture.dispose();const m=u.morphAttributes.position!==void 0,b=u.morphAttributes.normal!==void 0,_=u.morphAttributes.color!==void 0,M=u.morphAttributes.position||[],S=u.morphAttributes.normal||[],E=u.morphAttributes.color||[];let w=0;m===!0&&(w=1),b===!0&&(w=2),_===!0&&(w=3);let U=u.attributes.position.count*w,O=1;U>e.maxTextureSize&&(O=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const x=new Float32Array(U*O*4*g),C=new Mo(x,U,O,g);C.type=1015,C.needsUpdate=!0;const L=w*4;for(let N=0;N<g;N++){const R=M[N],G=S[N],z=E[N],y=U*O*4*N;for(let Y=0;Y<R.count;Y++){const k=Y*L;m===!0&&(s.fromBufferAttribute(R,Y),x[y+k+0]=s.x,x[y+k+1]=s.y,x[y+k+2]=s.z,x[y+k+3]=0),b===!0&&(s.fromBufferAttribute(G,Y),x[y+k+4]=s.x,x[y+k+5]=s.y,x[y+k+6]=s.z,x[y+k+7]=0),_===!0&&(s.fromBufferAttribute(z,Y),x[y+k+8]=s.x,x[y+k+9]=s.y,x[y+k+10]=s.z,x[y+k+11]=z.itemSize===4?s.w:1)}}v={count:g,texture:C,size:new Fe(U,O)},r.set(u,v),u.addEventListener("dispose",p)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",c.morphTexture,t);else{let p=0;for(let b=0;b<d.length;b++)p+=d[b];const m=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",m),h.getUniforms().setValue(n,"morphTargetInfluences",d)}h.getUniforms().setValue(n,"morphTargetsTexture",v.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",v.size)}else{const f=d===void 0?0:d.length;let g=a[u.id];if(g===void 0||g.length!==f){g=[];for(let _=0;_<f;_++)g[_]=[_,0];a[u.id]=g}for(let _=0;_<f;_++){const M=g[_];M[0]=_,M[1]=d[_]}g.sort(Ih);for(let _=0;_<8;_++)_<f&&g[_][1]?(o[_][0]=g[_][0],o[_][1]=g[_][1]):(o[_][0]=Number.MAX_SAFE_INTEGER,o[_][1]=0);o.sort(Fh);const v=u.morphAttributes.position,p=u.morphAttributes.normal;let m=0;for(let _=0;_<8;_++){const M=o[_],S=M[0],E=M[1];S!==Number.MAX_SAFE_INTEGER&&E?(v&&u.getAttribute("morphTarget"+_)!==v[S]&&u.setAttribute("morphTarget"+_,v[S]),p&&u.getAttribute("morphNormal"+_)!==p[S]&&u.setAttribute("morphNormal"+_,p[S]),i[_]=E,m+=E):(v&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),p&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),i[_]=0)}const b=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(n,"morphTargetBaseInfluence",b),h.getUniforms().setValue(n,"morphTargetInfluences",i)}}return{update:l}}function Nh(n,e,t,a){let i=new WeakMap;function r(l){const c=a.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function s(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:s}}class is extends Mt{constructor(e,t,a,i,r,s,o,l,c,u){if(u=u!==void 0?u:1026,u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&u===1026&&(a=1014),a===void 0&&u===1027&&(a=1020),super(null,i,r,s,o,l,u,a,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=l!==void 0?l:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const rs=new Mt,as=new is(1,1);as.compareFunction=515;const ns=new Mo,os=new yl,ss=new qo,ls=[],cs=[],us=new Float32Array(16),hs=new Float32Array(9),ds=new Float32Array(4);function vr(n,e,t){const a=n[0];if(a<=0||a>0)return n;const i=e*t;let r=ls[i];if(r===void 0&&(r=new Float32Array(i),ls[i]=r),e!==0){a.toArray(r,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(r,o)}return r}function gt(n,e){if(n.length!==e.length)return!1;for(let t=0,a=n.length;t<a;t++)if(n[t]!==e[t])return!1;return!0}function vt(n,e){for(let t=0,a=e.length;t<a;t++)n[t]=e[t]}function Fa(n,e){let t=cs[e];t===void 0&&(t=new Int32Array(e),cs[e]=t);for(let a=0;a!==e;++a)t[a]=n.allocateTextureUnit();return t}function zh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function kh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2fv(this.addr,e),vt(t,e)}}function Bh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;n.uniform3fv(this.addr,e),vt(t,e)}}function Gh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4fv(this.addr,e),vt(t,e)}}function Hh(n,e){const t=this.cache,a=e.elements;if(a===void 0){if(gt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(gt(t,a))return;ds.set(a),n.uniformMatrix2fv(this.addr,!1,ds),vt(t,a)}}function Vh(n,e){const t=this.cache,a=e.elements;if(a===void 0){if(gt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(gt(t,a))return;hs.set(a),n.uniformMatrix3fv(this.addr,!1,hs),vt(t,a)}}function Wh(n,e){const t=this.cache,a=e.elements;if(a===void 0){if(gt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(gt(t,a))return;us.set(a),n.uniformMatrix4fv(this.addr,!1,us),vt(t,a)}}function Xh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function qh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2iv(this.addr,e),vt(t,e)}}function jh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;n.uniform3iv(this.addr,e),vt(t,e)}}function Yh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4iv(this.addr,e),vt(t,e)}}function $h(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Kh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;n.uniform2uiv(this.addr,e),vt(t,e)}}function Zh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;n.uniform3uiv(this.addr,e),vt(t,e)}}function Qh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;n.uniform4uiv(this.addr,e),vt(t,e)}}function Jh(n,e,t){const a=this.cache,i=t.allocateTextureUnit();a[0]!==i&&(n.uniform1i(this.addr,i),a[0]=i);const r=this.type===n.SAMPLER_2D_SHADOW?as:rs;t.setTexture2D(e||r,i)}function ed(n,e,t){const a=this.cache,i=t.allocateTextureUnit();a[0]!==i&&(n.uniform1i(this.addr,i),a[0]=i),t.setTexture3D(e||os,i)}function td(n,e,t){const a=this.cache,i=t.allocateTextureUnit();a[0]!==i&&(n.uniform1i(this.addr,i),a[0]=i),t.setTextureCube(e||ss,i)}function id(n,e,t){const a=this.cache,i=t.allocateTextureUnit();a[0]!==i&&(n.uniform1i(this.addr,i),a[0]=i),t.setTexture2DArray(e||ns,i)}function rd(n){switch(n){case 5126:return zh;case 35664:return kh;case 35665:return Bh;case 35666:return Gh;case 35674:return Hh;case 35675:return Vh;case 35676:return Wh;case 5124:case 35670:return Xh;case 35667:case 35671:return qh;case 35668:case 35672:return jh;case 35669:case 35673:return Yh;case 5125:return $h;case 36294:return Kh;case 36295:return Zh;case 36296:return Qh;case 35678:case 36198:case 36298:case 36306:case 35682:return Jh;case 35679:case 36299:case 36307:return ed;case 35680:case 36300:case 36308:case 36293:return td;case 36289:case 36303:case 36311:case 36292:return id}}function ad(n,e){n.uniform1fv(this.addr,e)}function nd(n,e){const t=vr(e,this.size,2);n.uniform2fv(this.addr,t)}function od(n,e){const t=vr(e,this.size,3);n.uniform3fv(this.addr,t)}function sd(n,e){const t=vr(e,this.size,4);n.uniform4fv(this.addr,t)}function ld(n,e){const t=vr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function cd(n,e){const t=vr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ud(n,e){const t=vr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function hd(n,e){n.uniform1iv(this.addr,e)}function dd(n,e){n.uniform2iv(this.addr,e)}function fd(n,e){n.uniform3iv(this.addr,e)}function pd(n,e){n.uniform4iv(this.addr,e)}function md(n,e){n.uniform1uiv(this.addr,e)}function gd(n,e){n.uniform2uiv(this.addr,e)}function vd(n,e){n.uniform3uiv(this.addr,e)}function _d(n,e){n.uniform4uiv(this.addr,e)}function xd(n,e,t){const a=this.cache,i=e.length,r=Fa(t,i);gt(a,r)||(n.uniform1iv(this.addr,r),vt(a,r));for(let s=0;s!==i;++s)t.setTexture2D(e[s]||rs,r[s])}function yd(n,e,t){const a=this.cache,i=e.length,r=Fa(t,i);gt(a,r)||(n.uniform1iv(this.addr,r),vt(a,r));for(let s=0;s!==i;++s)t.setTexture3D(e[s]||os,r[s])}function bd(n,e,t){const a=this.cache,i=e.length,r=Fa(t,i);gt(a,r)||(n.uniform1iv(this.addr,r),vt(a,r));for(let s=0;s!==i;++s)t.setTextureCube(e[s]||ss,r[s])}function Sd(n,e,t){const a=this.cache,i=e.length,r=Fa(t,i);gt(a,r)||(n.uniform1iv(this.addr,r),vt(a,r));for(let s=0;s!==i;++s)t.setTexture2DArray(e[s]||ns,r[s])}function Md(n){switch(n){case 5126:return ad;case 35664:return nd;case 35665:return od;case 35666:return sd;case 35674:return ld;case 35675:return cd;case 35676:return ud;case 5124:case 35670:return hd;case 35667:case 35671:return dd;case 35668:case 35672:return fd;case 35669:case 35673:return pd;case 5125:return md;case 36294:return gd;case 36295:return vd;case 36296:return _d;case 35678:case 36198:case 36298:case 36306:case 35682:return xd;case 35679:case 36299:case 36307:return yd;case 35680:case 36300:case 36308:case 36293:return bd;case 36289:case 36303:case 36311:case 36292:return Sd}}class Td{constructor(e,t,a){this.id=e,this.addr=a,this.cache=[],this.type=t.type,this.setValue=rd(t.type)}}class wd{constructor(e,t,a){this.id=e,this.addr=a,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Md(t.type)}}class Ed{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,a){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const o=i[r];o.setValue(e,t[o.id],a)}}}const On=/(\w+)(\])?(\[|\.)?/g;function fs(n,e){n.seq.push(e),n.map[e.id]=e}function Ad(n,e,t){const a=n.name,i=a.length;for(On.lastIndex=0;;){const r=On.exec(a),s=On.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===i){fs(t,c===void 0?new Td(o,n,e):new wd(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new Ed(o),fs(t,u)),t=u}}}class Ia{constructor(e,t){this.seq=[],this.map={};const a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<a;++i){const r=e.getActiveUniform(t,i),s=e.getUniformLocation(t,r.name);Ad(r,s,this)}}setValue(e,t,a,i){const r=this.map[t];r!==void 0&&r.setValue(e,a,i)}setOptional(e,t,a){const i=t[a];i!==void 0&&this.setValue(e,a,i)}static upload(e,t,a,i){for(let r=0,s=t.length;r!==s;++r){const o=t[r],l=a[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const a=[];for(let i=0,r=e.length;i!==r;++i){const s=e[i];s.id in t&&a.push(s)}return a}}function ps(n,e,t){const a=n.createShader(e);return n.shaderSource(a,t),n.compileShader(a),a}const Cd=37297;let Rd=0;function Ud(n,e){const t=n.split(`
`),a=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let s=i;s<r;s++){const o=s+1;a.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return a.join(`
`)}function Pd(n){const e=rt.getPrimaries(rt.workingColorSpace),t=rt.getPrimaries(n);let a;switch(e===t?a="":e==="p3"&&t===da?a="LinearDisplayP3ToLinearSRGB":e===da&&t==="p3"&&(a="LinearSRGBToLinearDisplayP3"),n){case bi:case ua:return[a,"LinearTransferOETF"];case oi:case sn:return[a,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[a,"LinearTransferOETF"]}}function ms(n,e,t){const a=n.getShaderParameter(e,n.COMPILE_STATUS),i=n.getShaderInfoLog(e).trim();if(a&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const s=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Ud(n.getShaderSource(e),s)}else return i}function Ld(n,e){const t=Pd(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Dd(n,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="OptimizedCineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Fd(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.alphaToCoverage||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(_r).join(`
`)}function Id(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_r).join(`
`)}function Od(n){const e=[];for(const t in n){const a=n[t];a!==!1&&e.push("#define "+t+" "+a)}return e.join(`
`)}function Nd(n,e){const t={},a=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let i=0;i<a;i++){const r=n.getActiveAttrib(e,i),s=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[s]={type:r.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function _r(n){return n!==""}function gs(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vs(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const zd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nn(n){return n.replace(zd,Bd)}const kd=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Bd(n,e){let t=Ze[e];if(t===void 0){const a=kd.get(e);if(a!==void 0)t=Ze[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,a);else throw new Error("Can not resolve #include <"+e+">")}return Nn(t)}const Gd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _s(n){return n.replace(Gd,Hd)}function Hd(n,e,t,a){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=a.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function xs(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	`;return n.isWebGL2&&(e+=`precision ${n.precision} sampler3D;
		precision ${n.precision} sampler2DArray;
		precision ${n.precision} sampler2DShadow;
		precision ${n.precision} samplerCubeShadow;
		precision ${n.precision} sampler2DArrayShadow;
		precision ${n.precision} isampler2D;
		precision ${n.precision} isampler3D;
		precision ${n.precision} isamplerCube;
		precision ${n.precision} isampler2DArray;
		precision ${n.precision} usampler2D;
		precision ${n.precision} usampler3D;
		precision ${n.precision} usamplerCube;
		precision ${n.precision} usampler2DArray;
		`),n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Vd(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function Wd(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Xd(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===302&&(e="ENVMAP_MODE_REFRACTION"),e}function qd(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function jd(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,a=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:a,maxMip:t}}function Yd(n,e,t,a){const i=n.getContext(),r=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=Vd(t),c=Wd(t),u=Xd(t),h=qd(t),d=jd(t),f=t.isWebGL2?"":Fd(t),g=Id(t),v=Od(r),p=i.createProgram();let m,b,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(_r).join(`
`),m.length>0&&(m+=`
`),b=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(_r).join(`
`),b.length>0&&(b+=`
`)):(m=[xs(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_r).join(`
`),b=[f,xs(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Ze.tonemapping_pars_fragment:"",t.toneMapping!==0?Dd("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Ld("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_r).join(`
`)),s=Nn(s),s=gs(s,t),s=vs(s,t),o=Nn(o),o=gs(o,t),o=vs(o,t),s=_s(s),o=_s(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===mo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===mo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const M=_+m+s,S=_+b+o,E=ps(i,i.VERTEX_SHADER,M),w=ps(i,i.FRAGMENT_SHADER,S);i.attachShader(p,E),i.attachShader(p,w),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function U(L){if(n.debug.checkShaderErrors){const N=i.getProgramInfoLog(p).trim(),R=i.getShaderInfoLog(E).trim(),G=i.getShaderInfoLog(w).trim();let z=!0,y=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(i,p,E,w);else{const Y=ms(i,E,"vertex"),k=ms(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+N+`
`+Y+`
`+k)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(R===""||G==="")&&(y=!1);y&&(L.diagnostics={runnable:z,programLog:N,vertexShader:{log:R,prefix:m},fragmentShader:{log:G,prefix:b}})}i.deleteShader(E),i.deleteShader(w),O=new Ia(i,p),x=Nd(i,p)}let O;this.getUniforms=function(){return O===void 0&&U(this),O};let x;this.getAttributes=function(){return x===void 0&&U(this),x};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(p,Cd)),C},this.destroy=function(){a.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rd++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=E,this.fragmentShader=w,this}let $d=0;class Kd{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,a=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(a),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const a of t)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let a=t.get(e);return a===void 0&&(a=new Set,t.set(e,a)),a}_getShaderStage(e){const t=this.shaderCache;let a=t.get(e);return a===void 0&&(a=new Zd(e),t.set(e,a)),a}}class Zd{constructor(e){this.id=$d++,this.code=e,this.usedTimes=0}}function Qd(n,e,t,a,i,r,s){const o=new Co,l=new Kd,c=new Set,u=[],h=i.isWebGL2,d=i.logarithmicDepthBuffer,f=i.vertexTextures;let g=i.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,C,L,N,R){const G=N.fog,z=R.geometry,y=x.isMeshStandardMaterial?N.environment:null,Y=(x.isMeshStandardMaterial?t:e).get(x.envMap||y),k=Y&&Y.mapping===306?Y.image.height:null,X=v[x.type];x.precision!==null&&(g=i.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const D=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,H=D!==void 0?D.length:0;let j=0;z.morphAttributes.position!==void 0&&(j=1),z.morphAttributes.normal!==void 0&&(j=2),z.morphAttributes.color!==void 0&&(j=3);let I,B,J,W;if(X){const ke=si[X];I=ke.vertexShader,B=ke.fragmentShader}else I=x.vertexShader,B=x.fragmentShader,l.update(x),J=l.getVertexShaderID(x),W=l.getFragmentShaderID(x);const $=n.getRenderTarget(),ee=R.isInstancedMesh===!0,xe=R.isBatchedMesh===!0,oe=!!x.map,F=!!x.matcap,De=!!Y,ge=!!x.aoMap,me=!!x.lightMap,de=!!x.bumpMap,Se=!!x.normalMap,ce=!!x.displacementMap,ve=!!x.emissiveMap,se=!!x.metalnessMap,A=!!x.roughnessMap,T=x.anisotropy>0,V=x.clearcoat>0,Z=x.iridescence>0,ie=x.sheen>0,te=x.transmission>0,Re=T&&!!x.anisotropyMap,pe=V&&!!x.clearcoatMap,ue=V&&!!x.clearcoatNormalMap,_e=V&&!!x.clearcoatRoughnessMap,Oe=Z&&!!x.iridescenceMap,he=Z&&!!x.iridescenceThicknessMap,Xe=ie&&!!x.sheenColorMap,Ee=ie&&!!x.sheenRoughnessMap,Me=!!x.specularMap,Ce=!!x.specularColorMap,Ue=!!x.specularIntensityMap,Ge=te&&!!x.transmissionMap,Ae=te&&!!x.thicknessMap,Ne=!!x.gradientMap,q=!!x.alphaMap,ye=x.alphaTest>0,K=!!x.alphaHash,we=!!x.extensions;let Te=0;x.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Te=n.toneMapping);const Ie={isWebGL2:h,shaderID:X,shaderType:x.type,shaderName:x.name,vertexShader:I,fragmentShader:B,defines:x.defines,customVertexShaderID:J,customFragmentShaderID:W,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:xe,instancing:ee,instancingColor:ee&&R.instanceColor!==null,instancingMorph:ee&&R.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:bi,alphaToCoverage:!!x.alphaToCoverage,map:oe,matcap:F,envMap:De,envMapMode:De&&Y.mapping,envMapCubeUVHeight:k,aoMap:ge,lightMap:me,bumpMap:de,normalMap:Se,displacementMap:f&&ce,emissiveMap:ve,normalMapObjectSpace:Se&&x.normalMapType===1,normalMapTangentSpace:Se&&x.normalMapType===0,metalnessMap:se,roughnessMap:A,anisotropy:T,anisotropyMap:Re,clearcoat:V,clearcoatMap:pe,clearcoatNormalMap:ue,clearcoatRoughnessMap:_e,iridescence:Z,iridescenceMap:Oe,iridescenceThicknessMap:he,sheen:ie,sheenColorMap:Xe,sheenRoughnessMap:Ee,specularMap:Me,specularColorMap:Ce,specularIntensityMap:Ue,transmission:te,transmissionMap:Ge,thicknessMap:Ae,gradientMap:Ne,opaque:x.transparent===!1&&x.blending===1&&x.alphaToCoverage===!1,alphaMap:q,alphaTest:ye,alphaHash:K,combine:x.combine,mapUv:oe&&p(x.map.channel),aoMapUv:ge&&p(x.aoMap.channel),lightMapUv:me&&p(x.lightMap.channel),bumpMapUv:de&&p(x.bumpMap.channel),normalMapUv:Se&&p(x.normalMap.channel),displacementMapUv:ce&&p(x.displacementMap.channel),emissiveMapUv:ve&&p(x.emissiveMap.channel),metalnessMapUv:se&&p(x.metalnessMap.channel),roughnessMapUv:A&&p(x.roughnessMap.channel),anisotropyMapUv:Re&&p(x.anisotropyMap.channel),clearcoatMapUv:pe&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ue&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:he&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&p(x.sheenRoughnessMap.channel),specularMapUv:Me&&p(x.specularMap.channel),specularColorMapUv:Ce&&p(x.specularColorMap.channel),specularIntensityMapUv:Ue&&p(x.specularIntensityMap.channel),transmissionMapUv:Ge&&p(x.transmissionMap.channel),thicknessMapUv:Ae&&p(x.thicknessMap.channel),alphaMapUv:q&&p(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Se||T),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!z.attributes.uv&&(oe||q),fog:!!G,useFog:x.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:R.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:j,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Te,useLegacyLights:n._useLegacyLights,decodeVideoTexture:oe&&x.map.isVideoTexture===!0&&rt.getTransfer(x.map.colorSpace)===ot,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===2,flipSided:x.side===1,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:we&&x.extensions.derivatives===!0,extensionFragDepth:we&&x.extensions.fragDepth===!0,extensionDrawBuffers:we&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:we&&x.extensions.shaderTextureLOD===!0,extensionClipCullDistance:we&&x.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:we&&x.extensions.multiDraw===!0&&a.has("WEBGL_multi_draw"),rendererExtensionFragDepth:h||a.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||a.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||a.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function b(x){const C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(const L in x.defines)C.push(L),C.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(_(C,x),M(C,x),C.push(n.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function _(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function M(x,C){o.disableAll(),C.isWebGL2&&o.enable(0),C.supportsVertexTextures&&o.enable(1),C.instancing&&o.enable(2),C.instancingColor&&o.enable(3),C.instancingMorph&&o.enable(4),C.matcap&&o.enable(5),C.envMap&&o.enable(6),C.normalMapObjectSpace&&o.enable(7),C.normalMapTangentSpace&&o.enable(8),C.clearcoat&&o.enable(9),C.iridescence&&o.enable(10),C.alphaTest&&o.enable(11),C.vertexColors&&o.enable(12),C.vertexAlphas&&o.enable(13),C.vertexUv1s&&o.enable(14),C.vertexUv2s&&o.enable(15),C.vertexUv3s&&o.enable(16),C.vertexTangents&&o.enable(17),C.anisotropy&&o.enable(18),C.alphaHash&&o.enable(19),C.batching&&o.enable(20),x.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.skinning&&o.enable(4),C.morphTargets&&o.enable(5),C.morphNormals&&o.enable(6),C.morphColors&&o.enable(7),C.premultipliedAlpha&&o.enable(8),C.shadowMapEnabled&&o.enable(9),C.useLegacyLights&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.alphaToCoverage&&o.enable(20),x.push(o.mask)}function S(x){const C=v[x.type];let L;if(C){const N=si[C];L=qr.clone(N.uniforms)}else L=x.uniforms;return L}function E(x,C){let L;for(let N=0,R=u.length;N<R;N++){const G=u[N];if(G.cacheKey===C){L=G,++L.usedTimes;break}}return L===void 0&&(L=new Yd(n,C,x,r),u.push(L)),L}function w(x){if(--x.usedTimes===0){const C=u.indexOf(x);u[C]=u[u.length-1],u.pop(),x.destroy()}}function U(x){l.remove(x)}function O(){l.dispose()}return{getParameters:m,getProgramCacheKey:b,getUniforms:S,acquireProgram:E,releaseProgram:w,releaseShaderCache:U,programs:u,dispose:O}}function Jd(){let n=new WeakMap;function e(r){let s=n.get(r);return s===void 0&&(s={},n.set(r,s)),s}function t(r){n.delete(r)}function a(r,s,o){n.get(r)[s]=o}function i(){n=new WeakMap}return{get:e,remove:t,update:a,dispose:i}}function ef(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function ys(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function bs(){const n=[];let e=0;const t=[],a=[],i=[];function r(){e=0,t.length=0,a.length=0,i.length=0}function s(h,d,f,g,v,p){let m=n[e];return m===void 0?(m={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:v,group:p},n[e]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=v,m.group=p),e++,m}function o(h,d,f,g,v,p){const m=s(h,d,f,g,v,p);f.transmission>0?a.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(h,d,f,g,v,p){const m=s(h,d,f,g,v,p);f.transmission>0?a.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,d){t.length>1&&t.sort(h||ef),a.length>1&&a.sort(d||ys),i.length>1&&i.sort(d||ys)}function u(){for(let h=e,d=n.length;h<d;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:a,transparent:i,init:r,push:o,unshift:l,finish:u,sort:c}}function tf(){let n=new WeakMap;function e(a,i){const r=n.get(a);let s;return r===void 0?(s=new bs,n.set(a,[s])):i>=r.length?(s=new bs,r.push(s)):s=r[i],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function rf(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new ae,color:new fe};break;case"SpotLight":t={position:new ae,direction:new ae,color:new fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ae,color:new fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ae,skyColor:new fe,groundColor:new fe};break;case"RectAreaLight":t={color:new fe,position:new ae,halfWidth:new ae,halfHeight:new ae};break}return n[e.id]=t,t}}}function af(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let nf=0;function of(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function sf(n,e){const t=new rf,a=af(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new ae);const r=new ae,s=new ct,o=new ct;function l(u,h){let d=0,f=0,g=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let v=0,p=0,m=0,b=0,_=0,M=0,S=0,E=0,w=0,U=0,O=0;u.sort(of);const x=h===!0?Math.PI:1;for(let L=0,N=u.length;L<N;L++){const R=u[L],G=R.color,z=R.intensity,y=R.distance,Y=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=G.r*z*x,f+=G.g*z*x,g+=G.b*z*x;else if(R.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(R.sh.coefficients[k],z);O++}else if(R.isDirectionalLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity*x),R.castShadow){const X=R.shadow,D=a.get(R);D.shadowBias=X.bias,D.shadowNormalBias=X.normalBias,D.shadowRadius=X.radius,D.shadowMapSize=X.mapSize,i.directionalShadow[v]=D,i.directionalShadowMap[v]=Y,i.directionalShadowMatrix[v]=R.shadow.matrix,M++}i.directional[v]=k,v++}else if(R.isSpotLight){const k=t.get(R);k.position.setFromMatrixPosition(R.matrixWorld),k.color.copy(G).multiplyScalar(z*x),k.distance=y,k.coneCos=Math.cos(R.angle),k.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),k.decay=R.decay,i.spot[m]=k;const X=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,X.updateMatrices(R),R.castShadow&&U++),i.spotLightMatrix[m]=X.matrix,R.castShadow){const D=a.get(R);D.shadowBias=X.bias,D.shadowNormalBias=X.normalBias,D.shadowRadius=X.radius,D.shadowMapSize=X.mapSize,i.spotShadow[m]=D,i.spotShadowMap[m]=Y,E++}m++}else if(R.isRectAreaLight){const k=t.get(R);k.color.copy(G).multiplyScalar(z),k.halfWidth.set(R.width*.5,0,0),k.halfHeight.set(0,R.height*.5,0),i.rectArea[b]=k,b++}else if(R.isPointLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity*x),k.distance=R.distance,k.decay=R.decay,R.castShadow){const X=R.shadow,D=a.get(R);D.shadowBias=X.bias,D.shadowNormalBias=X.normalBias,D.shadowRadius=X.radius,D.shadowMapSize=X.mapSize,D.shadowCameraNear=X.camera.near,D.shadowCameraFar=X.camera.far,i.pointShadow[p]=D,i.pointShadowMap[p]=Y,i.pointShadowMatrix[p]=R.shadow.matrix,S++}i.point[p]=k,p++}else if(R.isHemisphereLight){const k=t.get(R);k.skyColor.copy(R.color).multiplyScalar(z*x),k.groundColor.copy(R.groundColor).multiplyScalar(z*x),i.hemi[_]=k,_++}}b>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Le.LTC_FLOAT_1,i.rectAreaLTC2=Le.LTC_FLOAT_2):(i.rectAreaLTC1=Le.LTC_HALF_1,i.rectAreaLTC2=Le.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Le.LTC_FLOAT_1,i.rectAreaLTC2=Le.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Le.LTC_HALF_1,i.rectAreaLTC2=Le.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;const C=i.hash;(C.directionalLength!==v||C.pointLength!==p||C.spotLength!==m||C.rectAreaLength!==b||C.hemiLength!==_||C.numDirectionalShadows!==M||C.numPointShadows!==S||C.numSpotShadows!==E||C.numSpotMaps!==w||C.numLightProbes!==O)&&(i.directional.length=v,i.spot.length=m,i.rectArea.length=b,i.point.length=p,i.hemi.length=_,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=E+w-U,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=U,i.numLightProbes=O,C.directionalLength=v,C.pointLength=p,C.spotLength=m,C.rectAreaLength=b,C.hemiLength=_,C.numDirectionalShadows=M,C.numPointShadows=S,C.numSpotShadows=E,C.numSpotMaps=w,C.numLightProbes=O,i.version=nf++)}function c(u,h){let d=0,f=0,g=0,v=0,p=0;const m=h.matrixWorldInverse;for(let b=0,_=u.length;b<_;b++){const M=u[b];if(M.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(M.isSpotLight){const S=i.spot[g];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),g++}else if(M.isRectAreaLight){const S=i.rectArea[v];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),v++}else if(M.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const S=i.hemi[p];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:i}}function Ss(n,e){const t=new sf(n,e),a=[],i=[];function r(){a.length=0,i.length=0}function s(u){a.push(u)}function o(u){i.push(u)}function l(u){t.setup(a,u)}function c(u){t.setupView(a,u)}return{init:r,state:{lightsArray:a,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:s,pushShadow:o}}function lf(n,e){let t=new WeakMap;function a(r,s=0){const o=t.get(r);let l;return o===void 0?(l=new Ss(n,e),t.set(r,[l])):s>=o.length?(l=new Ss(n,e),o.push(l)):l=o[s],l}function i(){t=new WeakMap}return{get:a,dispose:i}}class Ms extends Wr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ts extends Wr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const cf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uf=`uniform sampler2D shadow_pass;
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
}`;function hf(n,e,t){let a=new jo;const i=new Fe,r=new Fe,s=new _t,o=new Ms({depthPacking:3201}),l=new Ts,c={},u=t.maxTextureSize,h={0:1,1:0,2:2},d=new Ye({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:cf,fragmentShader:uf}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Xt;g.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new We(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let m=this.type;this.render=function(E,w,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;const O=n.getRenderTarget(),x=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),L=n.state;L.setBlending(0),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const N=m!==3&&this.type===3,R=m===3&&this.type!==3;for(let G=0,z=E.length;G<z;G++){const y=E[G],Y=y.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",y,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);const k=Y.getFrameExtents();if(i.multiply(k),r.copy(Y.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/k.x),i.x=r.x*k.x,Y.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/k.y),i.y=r.y*k.y,Y.mapSize.y=r.y)),Y.map===null||N===!0||R===!0){const D=this.type!==3?{minFilter:1003,magFilter:1003}:{};Y.map!==null&&Y.map.dispose(),Y.map=new mt(i.x,i.y,D),Y.map.texture.name=y.name+".shadowMap",Y.camera.updateProjectionMatrix()}n.setRenderTarget(Y.map),n.clear();const X=Y.getViewportCount();for(let D=0;D<X;D++){const H=Y.getViewport(D);s.set(r.x*H.x,r.y*H.y,r.x*H.z,r.y*H.w),L.viewport(s),Y.updateMatrices(y,D),a=Y.getFrustum(),M(w,U,Y.camera,y,this.type)}Y.isPointLightShadow!==!0&&this.type===3&&b(Y,U),Y.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(O,x,C)};function b(E,w){const U=e.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new mt(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(w,null,U,d,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(w,null,U,f,v,null)}function _(E,w,U,O){let x=null;const C=U.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)x=C;else if(x=U.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const L=x.uuid,N=w.uuid;let R=c[L];R===void 0&&(R={},c[L]=R);let G=R[N];G===void 0&&(G=x.clone(),R[N]=G,w.addEventListener("dispose",S)),x=G}if(x.visible=w.visible,x.wireframe=w.wireframe,O===3?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:h[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const L=n.properties.get(x);L.light=U}return x}function M(E,w,U,O,x){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&x===3)&&(!E.frustumCulled||a.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,E.matrixWorld);const L=e.update(E),N=E.material;if(Array.isArray(N)){const R=L.groups;for(let G=0,z=R.length;G<z;G++){const y=R[G],Y=N[y.materialIndex];if(Y&&Y.visible){const k=_(E,Y,O,x);E.onBeforeShadow(n,E,w,U,L,k,y),n.renderBufferDirect(U,null,L,k,E,y),E.onAfterShadow(n,E,w,U,L,k,y)}}}else if(N.visible){const R=_(E,N,O,x);E.onBeforeShadow(n,E,w,U,L,R,null),n.renderBufferDirect(U,null,L,R,E,null),E.onAfterShadow(n,E,w,U,L,R,null)}}const C=E.children;for(let L=0,N=C.length;L<N;L++)M(C[L],w,U,O,x)}function S(E){E.target.removeEventListener("dispose",S);for(const w in c){const U=c[w],O=E.target.uuid;O in U&&(U[O].dispose(),delete U[O])}}}function df(n,e,t){const a=t.isWebGL2;function i(){let q=!1;const ye=new _t;let K=null;const we=new _t(0,0,0,0);return{setMask:function(Te){K!==Te&&!q&&(n.colorMask(Te,Te,Te,Te),K=Te)},setLocked:function(Te){q=Te},setClear:function(Te,Ie,ke,Je,tt){tt===!0&&(Te*=Je,Ie*=Je,ke*=Je),ye.set(Te,Ie,ke,Je),we.equals(ye)===!1&&(n.clearColor(Te,Ie,ke,Je),we.copy(ye))},reset:function(){q=!1,K=null,we.set(-1,0,0,0)}}}function r(){let q=!1,ye=null,K=null,we=null;return{setTest:function(Te){Te?ee(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function(Te){ye!==Te&&!q&&(n.depthMask(Te),ye=Te)},setFunc:function(Te){if(K!==Te){switch(Te){case 0:n.depthFunc(n.NEVER);break;case 1:n.depthFunc(n.ALWAYS);break;case 2:n.depthFunc(n.LESS);break;case 3:n.depthFunc(n.LEQUAL);break;case 4:n.depthFunc(n.EQUAL);break;case 5:n.depthFunc(n.GEQUAL);break;case 6:n.depthFunc(n.GREATER);break;case 7:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}K=Te}},setLocked:function(Te){q=Te},setClear:function(Te){we!==Te&&(n.clearDepth(Te),we=Te)},reset:function(){q=!1,ye=null,K=null,we=null}}}function s(){let q=!1,ye=null,K=null,we=null,Te=null,Ie=null,ke=null,Je=null,tt=null;return{setTest:function(He){q||(He?ee(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function(He){ye!==He&&!q&&(n.stencilMask(He),ye=He)},setFunc:function(He,nt,xt){(K!==He||we!==nt||Te!==xt)&&(n.stencilFunc(He,nt,xt),K=He,we=nt,Te=xt)},setOp:function(He,nt,xt){(Ie!==He||ke!==nt||Je!==xt)&&(n.stencilOp(He,nt,xt),Ie=He,ke=nt,Je=xt)},setLocked:function(He){q=He},setClear:function(He){tt!==He&&(n.clearStencil(He),tt=He)},reset:function(){q=!1,ye=null,K=null,we=null,Te=null,Ie=null,ke=null,Je=null,tt=null}}}const o=new i,l=new r,c=new s,u=new WeakMap,h=new WeakMap;let d={},f={},g=new WeakMap,v=[],p=null,m=!1,b=null,_=null,M=null,S=null,E=null,w=null,U=null,O=new fe(0,0,0),x=0,C=!1,L=null,N=null,R=null,G=null,z=null;const y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,k=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=k>=1):X.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=k>=2);let D=null,H={};const j=n.getParameter(n.SCISSOR_BOX),I=n.getParameter(n.VIEWPORT),B=new _t().fromArray(j),J=new _t().fromArray(I);function W(q,ye,K,we){const Te=new Uint8Array(4),Ie=n.createTexture();n.bindTexture(q,Ie),n.texParameteri(q,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(q,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<K;ke++)a&&(q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY)?n.texImage3D(ye,0,n.RGBA,1,1,we,0,n.RGBA,n.UNSIGNED_BYTE,Te):n.texImage2D(ye+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Te);return Ie}const $={};$[n.TEXTURE_2D]=W(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=W(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),a&&($[n.TEXTURE_2D_ARRAY]=W(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=W(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ee(n.DEPTH_TEST),l.setFunc(3),ce(!1),ve(1),ee(n.CULL_FACE),de(0);function ee(q){d[q]!==!0&&(n.enable(q),d[q]=!0)}function xe(q){d[q]!==!1&&(n.disable(q),d[q]=!1)}function oe(q,ye){return f[q]!==ye?(n.bindFramebuffer(q,ye),f[q]=ye,a&&(q===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ye),q===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ye)),!0):!1}function F(q,ye){let K=v,we=!1;if(q){K=g.get(ye),K===void 0&&(K=[],g.set(ye,K));const Te=q.textures;if(K.length!==Te.length||K[0]!==n.COLOR_ATTACHMENT0){for(let Ie=0,ke=Te.length;Ie<ke;Ie++)K[Ie]=n.COLOR_ATTACHMENT0+Ie;K.length=Te.length,we=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,we=!0);if(we)if(t.isWebGL2)n.drawBuffers(K);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(K);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function De(q){return p!==q?(n.useProgram(q),p=q,!0):!1}const ge={100:n.FUNC_ADD,101:n.FUNC_SUBTRACT,102:n.FUNC_REVERSE_SUBTRACT};if(a)ge[103]=n.MIN,ge[104]=n.MAX;else{const q=e.get("EXT_blend_minmax");q!==null&&(ge[103]=q.MIN_EXT,ge[104]=q.MAX_EXT)}const me={200:n.ZERO,201:n.ONE,202:n.SRC_COLOR,204:n.SRC_ALPHA,210:n.SRC_ALPHA_SATURATE,208:n.DST_COLOR,206:n.DST_ALPHA,203:n.ONE_MINUS_SRC_COLOR,205:n.ONE_MINUS_SRC_ALPHA,209:n.ONE_MINUS_DST_COLOR,207:n.ONE_MINUS_DST_ALPHA,211:n.CONSTANT_COLOR,212:n.ONE_MINUS_CONSTANT_COLOR,213:n.CONSTANT_ALPHA,214:n.ONE_MINUS_CONSTANT_ALPHA};function de(q,ye,K,we,Te,Ie,ke,Je,tt,He){if(q===0){m===!0&&(xe(n.BLEND),m=!1);return}if(m===!1&&(ee(n.BLEND),m=!0),q!==5){if(q!==b||He!==C){if((_!==100||E!==100)&&(n.blendEquation(n.FUNC_ADD),_=100,E=100),He)switch(q){case 1:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.ONE,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}else switch(q){case 1:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}M=null,S=null,w=null,U=null,O.set(0,0,0),x=0,b=q,C=He}return}Te=Te||ye,Ie=Ie||K,ke=ke||we,(ye!==_||Te!==E)&&(n.blendEquationSeparate(ge[ye],ge[Te]),_=ye,E=Te),(K!==M||we!==S||Ie!==w||ke!==U)&&(n.blendFuncSeparate(me[K],me[we],me[Ie],me[ke]),M=K,S=we,w=Ie,U=ke),(Je.equals(O)===!1||tt!==x)&&(n.blendColor(Je.r,Je.g,Je.b,tt),O.copy(Je),x=tt),b=q,C=!1}function Se(q,ye){q.side===2?xe(n.CULL_FACE):ee(n.CULL_FACE);let K=q.side===1;ye&&(K=!K),ce(K),q.blending===1&&q.transparent===!1?de(0):de(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),l.setFunc(q.depthFunc),l.setTest(q.depthTest),l.setMask(q.depthWrite),o.setMask(q.colorWrite);const we=q.stencilWrite;c.setTest(we),we&&(c.setMask(q.stencilWriteMask),c.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),c.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),A(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function ce(q){L!==q&&(q?n.frontFace(n.CW):n.frontFace(n.CCW),L=q)}function ve(q){q!==0?(ee(n.CULL_FACE),q!==N&&(q===1?n.cullFace(n.BACK):q===2?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),N=q}function se(q){q!==R&&(Y&&n.lineWidth(q),R=q)}function A(q,ye,K){q?(ee(n.POLYGON_OFFSET_FILL),(G!==ye||z!==K)&&(n.polygonOffset(ye,K),G=ye,z=K)):xe(n.POLYGON_OFFSET_FILL)}function T(q){q?ee(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function V(q){q===void 0&&(q=n.TEXTURE0+y-1),D!==q&&(n.activeTexture(q),D=q)}function Z(q,ye,K){K===void 0&&(D===null?K=n.TEXTURE0+y-1:K=D);let we=H[K];we===void 0&&(we={type:void 0,texture:void 0},H[K]=we),(we.type!==q||we.texture!==ye)&&(D!==K&&(n.activeTexture(K),D=K),n.bindTexture(q,ye||$[q]),we.type=q,we.texture=ye)}function ie(){const q=H[D];q!==void 0&&q.type!==void 0&&(n.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function te(){try{n.compressedTexImage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Re(){try{n.compressedTexImage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function pe(){try{n.texSubImage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ue(){try{n.texSubImage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function _e(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Oe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function he(){try{n.texStorage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Xe(){try{n.texStorage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ee(){try{n.texImage2D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Me(){try{n.texImage3D.apply(n,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ce(q){B.equals(q)===!1&&(n.scissor(q.x,q.y,q.z,q.w),B.copy(q))}function Ue(q){J.equals(q)===!1&&(n.viewport(q.x,q.y,q.z,q.w),J.copy(q))}function Ge(q,ye){let K=h.get(ye);K===void 0&&(K=new WeakMap,h.set(ye,K));let we=K.get(q);we===void 0&&(we=n.getUniformBlockIndex(ye,q.name),K.set(q,we))}function Ae(q,ye){const K=h.get(ye).get(q);u.get(ye)!==K&&(n.uniformBlockBinding(ye,K,q.__bindingPointIndex),u.set(ye,K))}function Ne(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),a===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},D=null,H={},f={},g=new WeakMap,v=[],p=null,m=!1,b=null,_=null,M=null,S=null,E=null,w=null,U=null,O=new fe(0,0,0),x=0,C=!1,L=null,N=null,R=null,G=null,z=null,B.set(0,0,n.canvas.width,n.canvas.height),J.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:ee,disable:xe,bindFramebuffer:oe,drawBuffers:F,useProgram:De,setBlending:de,setMaterial:Se,setFlipSided:ce,setCullFace:ve,setLineWidth:se,setPolygonOffset:A,setScissorTest:T,activeTexture:V,bindTexture:Z,unbindTexture:ie,compressedTexImage2D:te,compressedTexImage3D:Re,texImage2D:Ee,texImage3D:Me,updateUBOMapping:Ge,uniformBlockBinding:Ae,texStorage2D:he,texStorage3D:Xe,texSubImage2D:pe,texSubImage3D:ue,compressedTexSubImage2D:_e,compressedTexSubImage3D:Oe,scissor:Ce,viewport:Ue,reset:Ne}}function ff(n,e,t,a,i,r,s){const o=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Fe,h=new WeakMap;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,T){return g?new OffscreenCanvas(A,T):kr("canvas")}function p(A,T,V,Z){let ie=1;const te=se(A);if((te.width>Z||te.height>Z)&&(ie=Z/Math.max(te.width,te.height)),ie<1||T===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Re=T?hn:Math.floor,pe=Re(ie*te.width),ue=Re(ie*te.height);d===void 0&&(d=v(pe,ue));const _e=V?v(pe,ue):d;return _e.width=pe,_e.height=ue,_e.getContext("2d").drawImage(A,0,0,pe,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+pe+"x"+ue+")."),_e}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function m(A){const T=se(A);return go(T.width)&&go(T.height)}function b(A){return o?!1:A.wrapS!==1001||A.wrapT!==1001||A.minFilter!==1003&&A.minFilter!==1006}function _(A,T){return A.generateMipmaps&&T&&A.minFilter!==1003&&A.minFilter!==1006}function M(A){n.generateMipmap(A)}function S(A,T,V,Z,ie=!1){if(o===!1)return T;if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let te=T;if(T===n.RED&&(V===n.FLOAT&&(te=n.R32F),V===n.HALF_FLOAT&&(te=n.R16F),V===n.UNSIGNED_BYTE&&(te=n.R8)),T===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(te=n.R8UI),V===n.UNSIGNED_SHORT&&(te=n.R16UI),V===n.UNSIGNED_INT&&(te=n.R32UI),V===n.BYTE&&(te=n.R8I),V===n.SHORT&&(te=n.R16I),V===n.INT&&(te=n.R32I)),T===n.RG&&(V===n.FLOAT&&(te=n.RG32F),V===n.HALF_FLOAT&&(te=n.RG16F),V===n.UNSIGNED_BYTE&&(te=n.RG8)),T===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(te=n.RG8UI),V===n.UNSIGNED_SHORT&&(te=n.RG16UI),V===n.UNSIGNED_INT&&(te=n.RG32UI),V===n.BYTE&&(te=n.RG8I),V===n.SHORT&&(te=n.RG16I),V===n.INT&&(te=n.RG32I)),T===n.RGBA){const Re=ie?ha:rt.getTransfer(Z);V===n.FLOAT&&(te=n.RGBA32F),V===n.HALF_FLOAT&&(te=n.RGBA16F),V===n.UNSIGNED_BYTE&&(te=Re===ot?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(te=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(te=n.RGB5_A1)}return(te===n.R16F||te===n.R32F||te===n.RG16F||te===n.RG32F||te===n.RGBA16F||te===n.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function E(A,T,V){return _(A,V)===!0||A.isFramebufferTexture&&A.minFilter!==1003&&A.minFilter!==1006?Math.log2(Math.max(T.width,T.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?T.mipmaps.length:1}function w(A){return A===1003||A===1004||A===1005?n.NEAREST:n.LINEAR}function U(A){const T=A.target;T.removeEventListener("dispose",U),x(T),T.isVideoTexture&&h.delete(T)}function O(A){const T=A.target;T.removeEventListener("dispose",O),L(T)}function x(A){const T=a.get(A);if(T.__webglInit===void 0)return;const V=A.source,Z=f.get(V);if(Z){const ie=Z[T.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&C(A),Object.keys(Z).length===0&&f.delete(V)}a.remove(A)}function C(A){const T=a.get(A);n.deleteTexture(T.__webglTexture);const V=A.source,Z=f.get(V);delete Z[T.__cacheKey],s.memory.textures--}function L(A){const T=a.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(T.__webglFramebuffer[Z]))for(let ie=0;ie<T.__webglFramebuffer[Z].length;ie++)n.deleteFramebuffer(T.__webglFramebuffer[Z][ie]);else n.deleteFramebuffer(T.__webglFramebuffer[Z]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[Z])}else{if(Array.isArray(T.__webglFramebuffer))for(let Z=0;Z<T.__webglFramebuffer.length;Z++)n.deleteFramebuffer(T.__webglFramebuffer[Z]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let Z=0;Z<T.__webglColorRenderbuffer.length;Z++)T.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[Z]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const V=A.textures;for(let Z=0,ie=V.length;Z<ie;Z++){const te=a.get(V[Z]);te.__webglTexture&&(n.deleteTexture(te.__webglTexture),s.memory.textures--),a.remove(V[Z])}a.remove(A)}let N=0;function R(){N=0}function G(){const A=N;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),N+=1,A}function z(A){const T=[];return T.push(A.wrapS),T.push(A.wrapT),T.push(A.wrapR||0),T.push(A.magFilter),T.push(A.minFilter),T.push(A.anisotropy),T.push(A.internalFormat),T.push(A.format),T.push(A.type),T.push(A.generateMipmaps),T.push(A.premultiplyAlpha),T.push(A.flipY),T.push(A.unpackAlignment),T.push(A.colorSpace),T.join()}function y(A,T){const V=a.get(A);if(A.isVideoTexture&&ce(A),A.isRenderTargetTexture===!1&&A.version>0&&V.__version!==A.version){const Z=A.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(V,A,T);return}}t.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+T)}function Y(A,T){const V=a.get(A);if(A.version>0&&V.__version!==A.version){J(V,A,T);return}t.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+T)}function k(A,T){const V=a.get(A);if(A.version>0&&V.__version!==A.version){J(V,A,T);return}t.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+T)}function X(A,T){const V=a.get(A);if(A.version>0&&V.__version!==A.version){W(V,A,T);return}t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+T)}const D={1e3:n.REPEAT,1001:n.CLAMP_TO_EDGE,1002:n.MIRRORED_REPEAT},H={1003:n.NEAREST,1004:n.NEAREST_MIPMAP_NEAREST,1005:n.NEAREST_MIPMAP_LINEAR,1006:n.LINEAR,1007:n.LINEAR_MIPMAP_NEAREST,1008:n.LINEAR_MIPMAP_LINEAR},j={512:n.NEVER,519:n.ALWAYS,513:n.LESS,515:n.LEQUAL,514:n.EQUAL,518:n.GEQUAL,516:n.GREATER,517:n.NOTEQUAL};function I(A,T,V){if(T.type===1015&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===1006||T.magFilter===1007||T.magFilter===1005||T.magFilter===1008||T.minFilter===1006||T.minFilter===1007||T.minFilter===1005||T.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),V?(n.texParameteri(A,n.TEXTURE_WRAP_S,D[T.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,D[T.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,D[T.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,H[T.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,H[T.minFilter])):(n.texParameteri(A,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(A,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(T.wrapS!==1001||T.wrapT!==1001)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(A,n.TEXTURE_MAG_FILTER,w(T.magFilter)),n.texParameteri(A,n.TEXTURE_MIN_FILTER,w(T.minFilter)),T.minFilter!==1003&&T.minFilter!==1006&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),T.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,j[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===1003||T.minFilter!==1005&&T.minFilter!==1008||T.type===1015&&e.has("OES_texture_float_linear")===!1||o===!1&&T.type===1016&&e.has("OES_texture_half_float_linear")===!1)return;if(T.anisotropy>1||a.get(T).__currentAnisotropy){const Z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),a.get(T).__currentAnisotropy=T.anisotropy}}}function B(A,T){let V=!1;A.__webglInit===void 0&&(A.__webglInit=!0,T.addEventListener("dispose",U));const Z=T.source;let ie=f.get(Z);ie===void 0&&(ie={},f.set(Z,ie));const te=z(T);if(te!==A.__cacheKey){ie[te]===void 0&&(ie[te]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,V=!0),ie[te].usedTimes++;const Re=ie[A.__cacheKey];Re!==void 0&&(ie[A.__cacheKey].usedTimes--,Re.usedTimes===0&&C(T)),A.__cacheKey=te,A.__webglTexture=ie[te].texture}return V}function J(A,T,V){let Z=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(Z=n.TEXTURE_3D);const ie=B(A,T),te=T.source;t.bindTexture(Z,A.__webglTexture,n.TEXTURE0+V);const Re=a.get(te);if(te.version!==Re.__version||ie===!0){t.activeTexture(n.TEXTURE0+V);const pe=rt.getPrimaries(rt.workingColorSpace),ue=T.colorSpace===""?null:rt.getPrimaries(T.colorSpace),_e=T.colorSpace===""||pe===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Oe=b(T)&&m(T.image)===!1;let he=p(T.image,Oe,!1,i.maxTextureSize);he=ve(T,he);const Xe=m(he)||o,Ee=r.convert(T.format,T.colorSpace);let Me=r.convert(T.type),Ce=S(T.internalFormat,Ee,Me,T.colorSpace,T.isVideoTexture);I(Z,T,Xe);let Ue;const Ge=T.mipmaps,Ae=o&&T.isVideoTexture!==!0&&Ce!==36196,Ne=Re.__version===void 0||ie===!0,q=te.dataReady,ye=E(T,he,Xe);if(T.isDepthTexture)Ce=n.DEPTH_COMPONENT,o?T.type===1015?Ce=n.DEPTH_COMPONENT32F:T.type===1014?Ce=n.DEPTH_COMPONENT24:T.type===1020?Ce=n.DEPTH24_STENCIL8:Ce=n.DEPTH_COMPONENT16:T.type===1015&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===1026&&Ce===n.DEPTH_COMPONENT&&T.type!==1012&&T.type!==1014&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=1014,Me=r.convert(T.type)),T.format===1027&&Ce===n.DEPTH_COMPONENT&&(Ce=n.DEPTH_STENCIL,T.type!==1020&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=1020,Me=r.convert(T.type))),Ne&&(Ae?t.texStorage2D(n.TEXTURE_2D,1,Ce,he.width,he.height):t.texImage2D(n.TEXTURE_2D,0,Ce,he.width,he.height,0,Ee,Me,null));else if(T.isDataTexture)if(Ge.length>0&&Xe){Ae&&Ne&&t.texStorage2D(n.TEXTURE_2D,ye,Ce,Ge[0].width,Ge[0].height);for(let K=0,we=Ge.length;K<we;K++)Ue=Ge[K],Ae?q&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,Ue.width,Ue.height,Ee,Me,Ue.data):t.texImage2D(n.TEXTURE_2D,K,Ce,Ue.width,Ue.height,0,Ee,Me,Ue.data);T.generateMipmaps=!1}else Ae?(Ne&&t.texStorage2D(n.TEXTURE_2D,ye,Ce,he.width,he.height),q&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,he.width,he.height,Ee,Me,he.data)):t.texImage2D(n.TEXTURE_2D,0,Ce,he.width,he.height,0,Ee,Me,he.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Ae&&Ne&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Ce,Ge[0].width,Ge[0].height,he.depth);for(let K=0,we=Ge.length;K<we;K++)Ue=Ge[K],T.format!==1023?Ee!==null?Ae?q&&t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,Ue.width,Ue.height,he.depth,Ee,Ue.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,Ce,Ue.width,Ue.height,he.depth,0,Ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ae?q&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,Ue.width,Ue.height,he.depth,Ee,Me,Ue.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,Ce,Ue.width,Ue.height,he.depth,0,Ee,Me,Ue.data)}else{Ae&&Ne&&t.texStorage2D(n.TEXTURE_2D,ye,Ce,Ge[0].width,Ge[0].height);for(let K=0,we=Ge.length;K<we;K++)Ue=Ge[K],T.format!==1023?Ee!==null?Ae?q&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,Ue.width,Ue.height,Ee,Ue.data):t.compressedTexImage2D(n.TEXTURE_2D,K,Ce,Ue.width,Ue.height,0,Ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ae?q&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,Ue.width,Ue.height,Ee,Me,Ue.data):t.texImage2D(n.TEXTURE_2D,K,Ce,Ue.width,Ue.height,0,Ee,Me,Ue.data)}else if(T.isDataArrayTexture)Ae?(Ne&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Ce,he.width,he.height,he.depth),q&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Ee,Me,he.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,he.width,he.height,he.depth,0,Ee,Me,he.data);else if(T.isData3DTexture)Ae?(Ne&&t.texStorage3D(n.TEXTURE_3D,ye,Ce,he.width,he.height,he.depth),q&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Ee,Me,he.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,he.width,he.height,he.depth,0,Ee,Me,he.data);else if(T.isFramebufferTexture){if(Ne)if(Ae)t.texStorage2D(n.TEXTURE_2D,ye,Ce,he.width,he.height);else{let K=he.width,we=he.height;for(let Te=0;Te<ye;Te++)t.texImage2D(n.TEXTURE_2D,Te,Ce,K,we,0,Ee,Me,null),K>>=1,we>>=1}}else if(Ge.length>0&&Xe){if(Ae&&Ne){const K=se(Ge[0]);t.texStorage2D(n.TEXTURE_2D,ye,Ce,K.width,K.height)}for(let K=0,we=Ge.length;K<we;K++)Ue=Ge[K],Ae?q&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,Ee,Me,Ue):t.texImage2D(n.TEXTURE_2D,K,Ce,Ee,Me,Ue);T.generateMipmaps=!1}else if(Ae){if(Ne){const K=se(he);t.texStorage2D(n.TEXTURE_2D,ye,Ce,K.width,K.height)}q&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ee,Me,he)}else t.texImage2D(n.TEXTURE_2D,0,Ce,Ee,Me,he);_(T,Xe)&&M(Z),Re.__version=te.version,T.onUpdate&&T.onUpdate(T)}A.__version=T.version}function W(A,T,V){if(T.image.length!==6)return;const Z=B(A,T),ie=T.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+V);const te=a.get(ie);if(ie.version!==te.__version||Z===!0){t.activeTexture(n.TEXTURE0+V);const Re=rt.getPrimaries(rt.workingColorSpace),pe=T.colorSpace===""?null:rt.getPrimaries(T.colorSpace),ue=T.colorSpace===""||Re===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const _e=T.isCompressedTexture||T.image[0].isCompressedTexture,Oe=T.image[0]&&T.image[0].isDataTexture,he=[];for(let K=0;K<6;K++)!_e&&!Oe?he[K]=p(T.image[K],!1,!0,i.maxCubemapSize):he[K]=Oe?T.image[K].image:T.image[K],he[K]=ve(T,he[K]);const Xe=he[0],Ee=m(Xe)||o,Me=r.convert(T.format,T.colorSpace),Ce=r.convert(T.type),Ue=S(T.internalFormat,Me,Ce,T.colorSpace),Ge=o&&T.isVideoTexture!==!0,Ae=te.__version===void 0||Z===!0,Ne=ie.dataReady;let q=E(T,Xe,Ee);I(n.TEXTURE_CUBE_MAP,T,Ee);let ye;if(_e){Ge&&Ae&&t.texStorage2D(n.TEXTURE_CUBE_MAP,q,Ue,Xe.width,Xe.height);for(let K=0;K<6;K++){ye=he[K].mipmaps;for(let we=0;we<ye.length;we++){const Te=ye[we];T.format!==1023?Me!==null?Ge?Ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,we,0,0,Te.width,Te.height,Me,Te.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,we,Ue,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?Ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,we,0,0,Te.width,Te.height,Me,Ce,Te.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,we,Ue,Te.width,Te.height,0,Me,Ce,Te.data)}}}else{if(ye=T.mipmaps,Ge&&Ae){ye.length>0&&q++;const K=se(he[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,q,Ue,K.width,K.height)}for(let K=0;K<6;K++)if(Oe){Ge?Ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,he[K].width,he[K].height,Me,Ce,he[K].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ue,he[K].width,he[K].height,0,Me,Ce,he[K].data);for(let we=0;we<ye.length;we++){const Te=ye[we].image[K].image;Ge?Ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,we+1,0,0,Te.width,Te.height,Me,Ce,Te.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,we+1,Ue,Te.width,Te.height,0,Me,Ce,Te.data)}}else{Ge?Ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Me,Ce,he[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ue,Me,Ce,he[K]);for(let we=0;we<ye.length;we++){const Te=ye[we];Ge?Ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,we+1,0,0,Me,Ce,Te.image[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,we+1,Ue,Me,Ce,Te.image[K])}}}_(T,Ee)&&M(n.TEXTURE_CUBE_MAP),te.__version=ie.version,T.onUpdate&&T.onUpdate(T)}A.__version=T.version}function $(A,T,V,Z,ie,te){const Re=r.convert(V.format,V.colorSpace),pe=r.convert(V.type),ue=S(V.internalFormat,Re,pe,V.colorSpace);if(!a.get(T).__hasExternalTextures){const _e=Math.max(1,T.width>>te),Oe=Math.max(1,T.height>>te);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,te,ue,_e,Oe,T.depth,0,Re,pe,null):t.texImage2D(ie,te,ue,_e,Oe,0,Re,pe,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Se(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,ie,a.get(V).__webglTexture,0,de(T)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,ie,a.get(V).__webglTexture,te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ee(A,T,V){if(n.bindRenderbuffer(n.RENDERBUFFER,A),T.depthBuffer&&!T.stencilBuffer){let Z=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(V||Se(T)){const ie=T.depthTexture;ie&&ie.isDepthTexture&&(ie.type===1015?Z=n.DEPTH_COMPONENT32F:ie.type===1014&&(Z=n.DEPTH_COMPONENT24));const te=de(T);Se(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,Z,T.width,T.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,te,Z,T.width,T.height)}else n.renderbufferStorage(n.RENDERBUFFER,Z,T.width,T.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,A)}else if(T.depthBuffer&&T.stencilBuffer){const Z=de(T);V&&Se(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Z,n.DEPTH24_STENCIL8,T.width,T.height):Se(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Z,n.DEPTH24_STENCIL8,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,A)}else{const Z=T.textures;for(let ie=0;ie<Z.length;ie++){const te=Z[ie],Re=r.convert(te.format,te.colorSpace),pe=r.convert(te.type),ue=S(te.internalFormat,Re,pe,te.colorSpace),_e=de(T);V&&Se(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,ue,T.width,T.height):Se(T)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e,ue,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,ue,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function xe(A,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!a.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),y(T.depthTexture,0);const V=a.get(T.depthTexture).__webglTexture,Z=de(T);if(T.depthTexture.format===1026)Se(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,V,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,V,0);else if(T.depthTexture.format===1027)Se(T)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,V,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,V,0);else throw new Error("Unknown depthTexture format")}function oe(A){const T=a.get(A),V=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!T.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");xe(T.__webglFramebuffer,A)}else if(V){T.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[Z]),T.__webglDepthbuffer[Z]=n.createRenderbuffer(),ee(T.__webglDepthbuffer[Z],A,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=n.createRenderbuffer(),ee(T.__webglDepthbuffer,A,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function F(A,T,V){const Z=a.get(A);T!==void 0&&$(Z.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&oe(A)}function De(A){const T=A.texture,V=a.get(A),Z=a.get(T);A.addEventListener("dispose",O);const ie=A.textures,te=A.isWebGLCubeRenderTarget===!0,Re=ie.length>1,pe=m(A)||o;if(Re||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=T.version,s.memory.textures++),te){V.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(o&&T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer[ue]=[];for(let _e=0;_e<T.mipmaps.length;_e++)V.__webglFramebuffer[ue][_e]=n.createFramebuffer()}else V.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(o&&T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer=[];for(let ue=0;ue<T.mipmaps.length;ue++)V.__webglFramebuffer[ue]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(Re)if(i.drawBuffers)for(let ue=0,_e=ie.length;ue<_e;ue++){const Oe=a.get(ie[ue]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=n.createTexture(),s.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&Se(A)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ue=0;ue<ie.length;ue++){const _e=ie[ue];V.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[ue]);const Oe=r.convert(_e.format,_e.colorSpace),he=r.convert(_e.type),Xe=S(_e.internalFormat,Oe,he,_e.colorSpace,A.isXRRenderTarget===!0),Ee=de(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ee,Xe,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,V.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),ee(V.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),I(n.TEXTURE_CUBE_MAP,T,pe);for(let ue=0;ue<6;ue++)if(o&&T.mipmaps&&T.mipmaps.length>0)for(let _e=0;_e<T.mipmaps.length;_e++)$(V.__webglFramebuffer[ue][_e],A,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,_e);else $(V.__webglFramebuffer[ue],A,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);_(T,pe)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ue=0,_e=ie.length;ue<_e;ue++){const Oe=ie[ue],he=a.get(Oe);t.bindTexture(n.TEXTURE_2D,he.__webglTexture),I(n.TEXTURE_2D,Oe,pe),$(V.__webglFramebuffer,A,Oe,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,0),_(Oe,pe)&&M(n.TEXTURE_2D)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?ue=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,Z.__webglTexture),I(ue,T,pe),o&&T.mipmaps&&T.mipmaps.length>0)for(let _e=0;_e<T.mipmaps.length;_e++)$(V.__webglFramebuffer[_e],A,T,n.COLOR_ATTACHMENT0,ue,_e);else $(V.__webglFramebuffer,A,T,n.COLOR_ATTACHMENT0,ue,0);_(T,pe)&&M(ue),t.unbindTexture()}A.depthBuffer&&oe(A)}function ge(A){const T=m(A)||o,V=A.textures;for(let Z=0,ie=V.length;Z<ie;Z++){const te=V[Z];if(_(te,T)){const Re=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,pe=a.get(te).__webglTexture;t.bindTexture(Re,pe),M(Re),t.unbindTexture()}}}function me(A){if(o&&A.samples>0&&Se(A)===!1){const T=A.textures,V=A.width,Z=A.height;let ie=n.COLOR_BUFFER_BIT;const te=[],Re=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=a.get(A),ue=T.length>1;if(ue)for(let _e=0;_e<T.length;_e++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let _e=0;_e<T.length;_e++){te.push(n.COLOR_ATTACHMENT0+_e),A.depthBuffer&&te.push(Re);const Oe=pe.__ignoreDepthValues!==void 0?pe.__ignoreDepthValues:!1;if(Oe===!1&&(A.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),ue&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[_e]),Oe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Re]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Re])),ue){const he=a.get(T[_e]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,he,0)}n.blitFramebuffer(0,0,V,Z,0,0,V,Z,ie,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let _e=0;_e<T.length;_e++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,pe.__webglColorRenderbuffer[_e]);const Oe=a.get(T[_e]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,Oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}}function de(A){return Math.min(i.maxSamples,A.samples)}function Se(A){const T=a.get(A);return o&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function ce(A){const T=s.render.frame;h.get(A)!==T&&(h.set(A,T),A.update())}function ve(A,T){const V=A.colorSpace,Z=A.format,ie=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===1035||V!==bi&&V!==""&&(rt.getTransfer(V)===ot?o===!1?e.has("EXT_sRGB")===!0&&Z===1023?(A.format=1035,A.minFilter=1006,A.generateMipmaps=!1):T=bo.sRGBToLinear(T):(Z!==1023||ie!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),T}function se(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(u.width=A.naturalWidth||A.width,u.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(u.width=A.displayWidth,u.height=A.displayHeight):(u.width=A.width,u.height=A.height),u}this.allocateTextureUnit=G,this.resetTextureUnits=R,this.setTexture2D=y,this.setTexture2DArray=Y,this.setTexture3D=k,this.setTextureCube=X,this.rebindTextures=F,this.setupRenderTarget=De,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=me,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=$,this.useMultisampledRTT=Se}function pf(n,e,t){const a=t.isWebGL2;function i(r,s=""){let o;const l=rt.getTransfer(s);if(r===1009)return n.UNSIGNED_BYTE;if(r===1017)return n.UNSIGNED_SHORT_4_4_4_4;if(r===1018)return n.UNSIGNED_SHORT_5_5_5_1;if(r===1010)return n.BYTE;if(r===1011)return n.SHORT;if(r===1012)return n.UNSIGNED_SHORT;if(r===1013)return n.INT;if(r===1014)return n.UNSIGNED_INT;if(r===1015)return n.FLOAT;if(r===1016)return a?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===1021)return n.ALPHA;if(r===1023)return n.RGBA;if(r===1024)return n.LUMINANCE;if(r===1025)return n.LUMINANCE_ALPHA;if(r===1026)return n.DEPTH_COMPONENT;if(r===1027)return n.DEPTH_STENCIL;if(r===1035)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===1028)return n.RED;if(r===1029)return n.RED_INTEGER;if(r===1030)return n.RG;if(r===1031)return n.RG_INTEGER;if(r===1033)return n.RGBA_INTEGER;if(r===33776||r===33777||r===33778||r===33779)if(l===ot)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===33776)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===33777)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===33778)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===33779)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===33776)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===33777)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===33778)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===33779)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===35840||r===35841||r===35842||r===35843)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===35840)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===35841)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===35842)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===35843)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===36196)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===37492||r===37496)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===37492)return l===ot?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===37496)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===37808||r===37809||r===37810||r===37811||r===37812||r===37813||r===37814||r===37815||r===37816||r===37817||r===37818||r===37819||r===37820||r===37821)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===37808)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===37809)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===37810)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===37811)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===37812)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===37813)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===37814)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===37815)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===37816)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===37817)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===37818)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===37819)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===37820)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===37821)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===36492||r===36494||r===36495)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===36492)return l===ot?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===36494)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===36495)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===36283||r===36284||r===36285||r===36286)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===36492)return o.COMPRESSED_RED_RGTC1_EXT;if(r===36284)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===36285)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===36286)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===1020?a?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:i}}class mf extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ci extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gf={type:"move"};class zn{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ci,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ci,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ae,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ae),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ci,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ae,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ae),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const a of e.hand.values())this._getHandJoint(t,a)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,a){let i=null,r=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,a),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,a),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gf)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const a=new Ci;a.matrixAutoUpdate=!1,a.visible=!1,e.joints[t.jointName]=a,e.add(a)}return e.joints[t.jointName]}}const vf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_f=`
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

}`;class xf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,a){if(this.texture===null){const i=new Mt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=a.depthNear||t.depthFar!=a.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}render(e,t){if(this.texture!==null){if(this.mesh===null){const a=t.cameras[0].viewport,i=new Ye({extensions:{fragDepth:!0},vertexShader:vf,fragmentShader:_f,uniforms:{depthColor:{value:this.texture},depthWidth:{value:a.z},depthHeight:{value:a.w}}});this.mesh=new We(new et(20,20),i)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class yf extends Qi{constructor(e,t){super();const a=this;let i=null,r=1,s=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null;const v=new xf,p=t.getContextAttributes();let m=null,b=null;const _=[],M=[],S=new Fe;let E=null;const w=new Wt;w.layers.enable(1),w.viewport=new _t;const U=new Wt;U.layers.enable(2),U.viewport=new _t;const O=[w,U],x=new mf;x.layers.enable(1),x.layers.enable(2);let C=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let B=_[I];return B===void 0&&(B=new zn,_[I]=B),B.getTargetRaySpace()},this.getControllerGrip=function(I){let B=_[I];return B===void 0&&(B=new zn,_[I]=B),B.getGripSpace()},this.getHand=function(I){let B=_[I];return B===void 0&&(B=new zn,_[I]=B),B.getHandSpace()};function N(I){const B=M.indexOf(I.inputSource);if(B===-1)return;const J=_[B];J!==void 0&&(J.update(I.inputSource,I.frame,c||s),J.dispatchEvent({type:I.type,data:I.inputSource}))}function R(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",R),i.removeEventListener("inputsourceschange",G);for(let I=0;I<_.length;I++){const B=M[I];B!==null&&(M[I]=null,_[I].disconnect(B))}C=null,L=null,v.reset(),e.setRenderTarget(m),f=null,d=null,h=null,i=null,b=null,j.stop(),a.isPresenting=!1,e.setPixelRatio(E),e.setSize(S.width,S.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(I){c=I},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(I){if(i=I,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",R),i.addEventListener("inputsourceschange",G),p.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(S),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const B={antialias:i.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,B),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new mt(f.framebufferWidth,f.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let B=null,J=null,W=null;p.depth&&(W=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,B=p.stencil?1027:1026,J=p.stencil?1020:1014);const $={colorFormat:t.RGBA8,depthFormat:W,scaleFactor:r};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer($),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new mt(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new is(d.textureWidth,d.textureHeight,J,void 0,void 0,void 0,void 0,void 0,void 0,B),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const ee=e.properties.get(b);ee.__ignoreDepthValues=d.ignoreDepthValues}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await i.requestReferenceSpace(o),j.setContext(i),j.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function G(I){for(let B=0;B<I.removed.length;B++){const J=I.removed[B],W=M.indexOf(J);W>=0&&(M[W]=null,_[W].disconnect(J))}for(let B=0;B<I.added.length;B++){const J=I.added[B];let W=M.indexOf(J);if(W===-1){for(let ee=0;ee<_.length;ee++)if(ee>=M.length){M.push(J),W=ee;break}else if(M[ee]===null){M[ee]=J,W=ee;break}if(W===-1)break}const $=_[W];$&&$.connect(J)}}const z=new ae,y=new ae;function Y(I,B,J){z.setFromMatrixPosition(B.matrixWorld),y.setFromMatrixPosition(J.matrixWorld);const W=z.distanceTo(y),$=B.projectionMatrix.elements,ee=J.projectionMatrix.elements,xe=$[14]/($[10]-1),oe=$[14]/($[10]+1),F=($[9]+1)/$[5],De=($[9]-1)/$[5],ge=($[8]-1)/$[0],me=(ee[8]+1)/ee[0],de=xe*ge,Se=xe*me,ce=W/(-ge+me),ve=ce*-ge;B.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(ve),I.translateZ(ce),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert();const se=xe+ce,A=oe+ce,T=de-ve,V=Se+(W-ve),Z=F*oe/A*se,ie=De*oe/A*se;I.projectionMatrix.makePerspective(T,V,Z,ie,se,A),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}function k(I,B){B===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(B.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(i===null)return;v.texture!==null&&(I.near=v.depthNear,I.far=v.depthFar),x.near=U.near=w.near=I.near,x.far=U.far=w.far=I.far,(C!==x.near||L!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),C=x.near,L=x.far,w.near=C,w.far=L,U.near=C,U.far=L,w.updateProjectionMatrix(),U.updateProjectionMatrix(),I.updateProjectionMatrix());const B=I.parent,J=x.cameras;k(x,B);for(let W=0;W<J.length;W++)k(J[W],B);J.length===2?Y(x,w,U):x.projectionMatrix.copy(w.projectionMatrix),X(I,x,B)};function X(I,B,J){J===null?I.matrix.copy(B.matrixWorld):(I.matrix.copy(J.matrixWorld),I.matrix.invert(),I.matrix.multiply(B.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(B.projectionMatrix),I.projectionMatrixInverse.copy(B.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=cn*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(I){l=I,d!==null&&(d.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return v.texture!==null};let D=null;function H(I,B){if(u=B.getViewerPose(c||s),g=B,u!==null){const J=u.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let W=!1;J.length!==x.cameras.length&&(x.cameras.length=0,W=!0);for(let ee=0;ee<J.length;ee++){const xe=J[ee];let oe=null;if(f!==null)oe=f.getViewport(xe);else{const De=h.getViewSubImage(d,xe);oe=De.viewport,ee===0&&(e.setRenderTargetTextures(b,De.colorTexture,d.ignoreDepthValues?void 0:De.depthStencilTexture),e.setRenderTarget(b))}let F=O[ee];F===void 0&&(F=new Wt,F.layers.enable(ee),F.viewport=new _t,O[ee]=F),F.matrix.fromArray(xe.transform.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale),F.projectionMatrix.fromArray(xe.projectionMatrix),F.projectionMatrixInverse.copy(F.projectionMatrix).invert(),F.viewport.set(oe.x,oe.y,oe.width,oe.height),ee===0&&(x.matrix.copy(F.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),W===!0&&x.cameras.push(F)}const $=i.enabledFeatures;if($&&$.includes("depth-sensing")){const ee=h.getDepthInformation(J[0]);ee&&ee.isValid&&ee.texture&&v.init(e,ee,i.renderState)}}for(let J=0;J<_.length;J++){const W=M[J],$=_[J];W!==null&&$!==void 0&&$.update(W,B,c||s)}v.render(e,x),D&&D(I,B),B.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:B}),g=null}const j=new Yo;j.setAnimationLoop(H),this.setAnimationLoop=function(I){D=I},this.dispose=function(){}}}const Hi=new vi,bf=new ct;function Sf(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function a(p,m){m.color.getRGB(p.fogColor.value,Ho(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,b,_,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),h(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(s(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,b,_):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===1&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===1&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const b=e.get(m),_=b.envMap,M=b.envMapRotation;if(_&&(p.envMap.value=_,Hi.copy(M),Hi.x*=-1,Hi.y*=-1,Hi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Hi.y*=-1,Hi.z*=-1),p.envMapRotation.value.setFromMatrix4(bf.makeRotationFromEuler(Hi)),p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const S=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*S,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function s(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,b,_){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*b,p.scale.value=_*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,b){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===1&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const b=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:i}}function Mf(n,e,t,a){let i={},r={},s=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(b,_){const M=_.program;a.uniformBlockBinding(b,M)}function c(b,_){let M=i[b.id];M===void 0&&(g(b),M=u(b),i[b.id]=M,b.addEventListener("dispose",p));const S=_.program;a.updateUBOMapping(b,S);const E=e.render.frame;r[b.id]!==E&&(d(b),r[b.id]=E)}function u(b){const _=h();b.__bindingPointIndex=_;const M=n.createBuffer(),S=b.__size,E=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,S,E),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,M),M}function h(){for(let b=0;b<o;b++)if(s.indexOf(b)===-1)return s.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const _=i[b.id],M=b.uniforms,S=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let E=0,w=M.length;E<w;E++){const U=Array.isArray(M[E])?M[E]:[M[E]];for(let O=0,x=U.length;O<x;O++){const C=U[O];if(f(C,E,O,S)===!0){const L=C.__offset,N=Array.isArray(C.value)?C.value:[C.value];let R=0;for(let G=0;G<N.length;G++){const z=N[G],y=v(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,L+R,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,R),R+=y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(b,_,M,S){const E=b.value,w=_+"_"+M;if(S[w]===void 0)return typeof E=="number"||typeof E=="boolean"?S[w]=E:S[w]=E.clone(),!0;{const U=S[w];if(typeof E=="number"||typeof E=="boolean"){if(U!==E)return S[w]=E,!0}else if(U.equals(E)===!1)return U.copy(E),!0}return!1}function g(b){const _=b.uniforms;let M=0;const S=16;for(let w=0,U=_.length;w<U;w++){const O=Array.isArray(_[w])?_[w]:[_[w]];for(let x=0,C=O.length;x<C;x++){const L=O[x],N=Array.isArray(L.value)?L.value:[L.value];for(let R=0,G=N.length;R<G;R++){const z=N[R],y=v(z),Y=M%S;Y!==0&&S-Y<y.boundary&&(M+=S-Y),L.__data=new Float32Array(y.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=y.storage}}}const E=M%S;return E>0&&(M+=S-E),b.__size=M,b.__cache={},this}function v(b){const _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),_}function p(b){const _=b.target;_.removeEventListener("dispose",p);const M=s.indexOf(_.__bindingPointIndex);s.splice(M,1),n.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function m(){for(const b in i)n.deleteBuffer(i[b]);s=[],i={},r={}}return{bind:l,update:c,dispose:m}}class ws{constructor(e={}){const{canvas:t=pl(),context:a=null,depth:i=!0,stencil:r=!0,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;a!==null?d=a.getContextAttributes().alpha:d=s;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,p=null;const m=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=oi,this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;const _=this;let M=!1,S=0,E=0,w=null,U=-1,O=null;const x=new _t,C=new _t;let L=null;const N=new fe(0);let R=0,G=t.width,z=t.height,y=1,Y=null,k=null;const X=new _t(0,0,G,z),D=new _t(0,0,G,z);let H=!1;const j=new jo;let I=!1,B=!1,J=null;const W=new ct,$=new Fe,ee=new ae,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function oe(){return w===null?y:1}let F=a;function De(P,Q){for(let ne=0;ne<P.length;ne++){const le=P[ne],re=t.getContext(le,Q);if(re!==null)return re}return null}try{const P={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r162"),t.addEventListener("webglcontextlost",Ne,!1),t.addEventListener("webglcontextrestored",q,!1),t.addEventListener("webglcontextcreationerror",ye,!1),F===null){const Q=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&Q.shift(),F=De(Q,P),F===null)throw De(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let ge,me,de,Se,ce,ve,se,A,T,V,Z,ie,te,Re,pe,ue,_e,Oe,he,Xe,Ee,Me,Ce,Ue;function Ge(){ge=new Uh(F),me=new Th(F,ge,e),ge.init(me),Me=new pf(F,ge,me),de=new df(F,ge,me),Se=new Dh(F),ce=new Jd,ve=new ff(F,ge,de,ce,me,Me,Se),se=new Eh(_),A=new Rh(_),T=new kl(F,me),Ce=new Sh(F,ge,T,me),V=new Ph(F,T,Se,Ce),Z=new Nh(F,V,T,Se),he=new Oh(F,me,ve),ue=new wh(ce),ie=new Qd(_,se,A,ge,me,Ce,ue),te=new Sf(_,ce),Re=new tf,pe=new lf(ge,me),Oe=new bh(_,se,A,de,Z,d,l),_e=new hf(_,Z,me),Ue=new Mf(F,Se,me,de),Xe=new Mh(F,ge,Se,me),Ee=new Lh(F,ge,Se,me),Se.programs=ie.programs,_.capabilities=me,_.extensions=ge,_.properties=ce,_.renderLists=Re,_.shadowMap=_e,_.state=de,_.info=Se}Ge();const Ae=new yf(_,F);this.xr=Ae,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const P=ge.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=ge.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return y},this.setPixelRatio=function(P){P!==void 0&&(y=P,this.setSize(G,z,!1))},this.getSize=function(P){return P.set(G,z)},this.setSize=function(P,Q,ne=!0){if(Ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=P,z=Q,t.width=Math.floor(P*y),t.height=Math.floor(Q*y),ne===!0&&(t.style.width=P+"px",t.style.height=Q+"px"),this.setViewport(0,0,P,Q)},this.getDrawingBufferSize=function(P){return P.set(G*y,z*y).floor()},this.setDrawingBufferSize=function(P,Q,ne){G=P,z=Q,y=ne,t.width=Math.floor(P*ne),t.height=Math.floor(Q*ne),this.setViewport(0,0,P,Q)},this.getCurrentViewport=function(P){return P.copy(x)},this.getViewport=function(P){return P.copy(X)},this.setViewport=function(P,Q,ne,le){P.isVector4?X.set(P.x,P.y,P.z,P.w):X.set(P,Q,ne,le),de.viewport(x.copy(X).multiplyScalar(y).round())},this.getScissor=function(P){return P.copy(D)},this.setScissor=function(P,Q,ne,le){P.isVector4?D.set(P.x,P.y,P.z,P.w):D.set(P,Q,ne,le),de.scissor(C.copy(D).multiplyScalar(y).round())},this.getScissorTest=function(){return H},this.setScissorTest=function(P){de.setScissorTest(H=P)},this.setOpaqueSort=function(P){Y=P},this.setTransparentSort=function(P){k=P},this.getClearColor=function(P){return P.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor.apply(Oe,arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha.apply(Oe,arguments)},this.clear=function(P=!0,Q=!0,ne=!0){let le=0;if(P){let re=!1;if(w!==null){const Pe=w.texture.format;re=Pe===1033||Pe===1031||Pe===1029}if(re){const Pe=w.texture.type,ze=Pe===1009||Pe===1014||Pe===1012||Pe===1020||Pe===1017||Pe===1018,Be=Oe.getClearColor(),be=Oe.getClearAlpha(),je=Be.r,Ke=Be.g,Ve=Be.b;ze?(f[0]=je,f[1]=Ke,f[2]=Ve,f[3]=be,F.clearBufferuiv(F.COLOR,0,f)):(g[0]=je,g[1]=Ke,g[2]=Ve,g[3]=be,F.clearBufferiv(F.COLOR,0,g))}else le|=F.COLOR_BUFFER_BIT}Q&&(le|=F.DEPTH_BUFFER_BIT),ne&&(le|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(le)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ne,!1),t.removeEventListener("webglcontextrestored",q,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),Re.dispose(),pe.dispose(),ce.dispose(),se.dispose(),A.dispose(),Z.dispose(),Ce.dispose(),Ue.dispose(),ie.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",tt),Ae.removeEventListener("sessionend",He),J&&(J.dispose(),J=null),nt.stop()};function Ne(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function q(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const P=Se.autoReset,Q=_e.enabled,ne=_e.autoUpdate,le=_e.needsUpdate,re=_e.type;Ge(),Se.autoReset=P,_e.enabled=Q,_e.autoUpdate=ne,_e.needsUpdate=le,_e.type=re}function ye(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function K(P){const Q=P.target;Q.removeEventListener("dispose",K),we(Q)}function we(P){Te(P),ce.remove(P)}function Te(P){const Q=ce.get(P).programs;Q!==void 0&&(Q.forEach(function(ne){ie.releaseProgram(ne)}),P.isShaderMaterial&&ie.releaseShaderCache(P))}this.renderBufferDirect=function(P,Q,ne,le,re,Pe){Q===null&&(Q=xe);const ze=re.isMesh&&re.matrixWorld.determinant()<0,Be=ra(P,Q,ne,le,re);de.setMaterial(le,ze);let be=ne.index,je=1;if(le.wireframe===!0){if(be=V.getWireframeAttribute(ne),be===void 0)return;je=2}const Ke=ne.drawRange,Ve=ne.attributes.position;let dt=Ke.start*je,ht=(Ke.start+Ke.count)*je;Pe!==null&&(dt=Math.max(dt,Pe.start*je),ht=Math.min(ht,(Pe.start+Pe.count)*je)),be!==null?(dt=Math.max(dt,0),ht=Math.min(ht,be.count)):Ve!=null&&(dt=Math.max(dt,0),ht=Math.min(ht,Ve.count));const Tt=ht-dt;if(Tt<0||Tt===1/0)return;Ce.setup(re,le,Be,ne,be);let Lt,at=Xe;if(be!==null&&(Lt=T.get(be),at=Ee,at.setIndex(Lt)),re.isMesh)le.wireframe===!0?(de.setLineWidth(le.wireframeLinewidth*oe()),at.setMode(F.LINES)):at.setMode(F.TRIANGLES);else if(re.isLine){let qe=le.linewidth;qe===void 0&&(qe=1),de.setLineWidth(qe*oe()),re.isLineSegments?at.setMode(F.LINES):re.isLineLoop?at.setMode(F.LINE_LOOP):at.setMode(F.LINE_STRIP)}else re.isPoints?at.setMode(F.POINTS):re.isSprite&&at.setMode(F.TRIANGLES);if(re.isBatchedMesh)at.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else if(re.isInstancedMesh)at.renderInstances(dt,Tt,re.count);else if(ne.isInstancedBufferGeometry){const qe=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,_i=Math.min(ne.instanceCount,qe);at.renderInstances(dt,Tt,_i)}else at.render(dt,Tt)};function Ie(P,Q,ne){P.transparent===!0&&P.side===2&&P.forceSinglePass===!1?(P.side=1,P.needsUpdate=!0,yt(P,Q,ne),P.side=0,P.needsUpdate=!0,yt(P,Q,ne),P.side=2):yt(P,Q,ne)}this.compile=function(P,Q,ne=null){ne===null&&(ne=P),p=pe.get(ne),p.init(),b.push(p),ne.traverseVisible(function(re){re.isLight&&re.layers.test(Q.layers)&&(p.pushLight(re),re.castShadow&&p.pushShadow(re))}),P!==ne&&P.traverseVisible(function(re){re.isLight&&re.layers.test(Q.layers)&&(p.pushLight(re),re.castShadow&&p.pushShadow(re))}),p.setupLights(_._useLegacyLights);const le=new Set;return P.traverse(function(re){const Pe=re.material;if(Pe)if(Array.isArray(Pe))for(let ze=0;ze<Pe.length;ze++){const Be=Pe[ze];Ie(Be,ne,re),le.add(Be)}else Ie(Pe,ne,re),le.add(Pe)}),b.pop(),p=null,le},this.compileAsync=function(P,Q,ne=null){const le=this.compile(P,Q,ne);return new Promise(re=>{function Pe(){if(le.forEach(function(ze){ce.get(ze).currentProgram.isReady()&&le.delete(ze)}),le.size===0){re(P);return}setTimeout(Pe,10)}ge.get("KHR_parallel_shader_compile")!==null?Pe():setTimeout(Pe,10)})};let ke=null;function Je(P){ke&&ke(P)}function tt(){nt.stop()}function He(){nt.start()}const nt=new Yo;nt.setAnimationLoop(Je),typeof self<"u"&&nt.setContext(self),this.setAnimationLoop=function(P){ke=P,Ae.setAnimationLoop(P),P===null?nt.stop():nt.start()},Ae.addEventListener("sessionstart",tt),Ae.addEventListener("sessionend",He),this.render=function(P,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(Q),Q=Ae.getCamera()),P.isScene===!0&&P.onBeforeRender(_,P,Q,w),p=pe.get(P,b.length),p.init(),b.push(p),W.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),j.setFromProjectionMatrix(W),B=this.localClippingEnabled,I=ue.init(this.clippingPlanes,B),v=Re.get(P,m.length),v.init(),m.push(v),xt(P,Q,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(Y,k),this.info.render.frame++,I===!0&&ue.beginShadows();const ne=p.state.shadowsArray;if(_e.render(ne,P,Q),I===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),(Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1)&&Oe.render(v,P),p.setupLights(_._useLegacyLights),Q.isArrayCamera){const le=Q.cameras;for(let re=0,Pe=le.length;re<Pe;re++){const ze=le[re];qt(v,P,ze,ze.viewport)}}else qt(v,P,Q);w!==null&&(ve.updateMultisampleRenderTarget(w),ve.updateRenderTargetMipmap(w)),P.isScene===!0&&P.onAfterRender(_,P,Q),Ce.resetDefaultState(),U=-1,O=null,b.pop(),b.length>0?p=b[b.length-1]:p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function xt(P,Q,ne,le){if(P.visible===!1)return;if(P.layers.test(Q.layers)){if(P.isGroup)ne=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(Q);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||j.intersectsSprite(P)){le&&ee.setFromMatrixPosition(P.matrixWorld).applyMatrix4(W);const Pe=Z.update(P),ze=P.material;ze.visible&&v.push(P,Pe,ze,ne,ee.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||j.intersectsObject(P))){const Pe=Z.update(P),ze=P.material;if(le&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),ee.copy(P.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),ee.copy(Pe.boundingSphere.center)),ee.applyMatrix4(P.matrixWorld).applyMatrix4(W)),Array.isArray(ze)){const Be=Pe.groups;for(let be=0,je=Be.length;be<je;be++){const Ke=Be[be],Ve=ze[Ke.materialIndex];Ve&&Ve.visible&&v.push(P,Pe,Ve,ne,ee.z,Ke)}}else ze.visible&&v.push(P,Pe,ze,ne,ee.z,null)}}const re=P.children;for(let Pe=0,ze=re.length;Pe<ze;Pe++)xt(re[Pe],Q,ne,le)}function qt(P,Q,ne,le){const re=P.opaque,Pe=P.transmissive,ze=P.transparent;p.setupLightsView(ne),I===!0&&ue.setGlobalState(_.clippingPlanes,ne),Pe.length>0&&Yt(re,Pe,Q,ne),le&&de.viewport(x.copy(le)),re.length>0&&zt(re,Q,ne),Pe.length>0&&zt(Pe,Q,ne),ze.length>0&&zt(ze,Q,ne),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function Yt(P,Q,ne,le){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;const re=me.isWebGL2;J===null&&(J=new mt(1,1,{generateMipmaps:!0,type:ge.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:re?4:0})),_.getDrawingBufferSize($),re?J.setSize($.x,$.y):J.setSize(hn($.x),hn($.y));const Pe=_.getRenderTarget();_.setRenderTarget(J),_.getClearColor(N),R=_.getClearAlpha(),R<1&&_.setClearColor(16777215,.5),_.clear();const ze=_.toneMapping;_.toneMapping=0,zt(P,ne,le),ve.updateMultisampleRenderTarget(J),ve.updateRenderTargetMipmap(J);let Be=!1;for(let be=0,je=Q.length;be<je;be++){const Ke=Q[be],Ve=Ke.object,dt=Ke.geometry,ht=Ke.material,Tt=Ke.group;if(ht.side===2&&Ve.layers.test(le.layers)){const Lt=ht.side;ht.side=1,ht.needsUpdate=!0,ni(Ve,ne,le,dt,ht,Tt),ht.side=Lt,ht.needsUpdate=!0,Be=!0}}Be===!0&&(ve.updateMultisampleRenderTarget(J),ve.updateRenderTargetMipmap(J)),_.setRenderTarget(Pe),_.setClearColor(N,R),_.toneMapping=ze}function zt(P,Q,ne){const le=Q.isScene===!0?Q.overrideMaterial:null;for(let re=0,Pe=P.length;re<Pe;re++){const ze=P[re],Be=ze.object,be=ze.geometry,je=le===null?ze.material:le,Ke=ze.group;Be.layers.test(ne.layers)&&ni(Be,Q,ne,be,je,Ke)}}function ni(P,Q,ne,le,re,Pe){P.onBeforeRender(_,Q,ne,le,re,Pe),P.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),re.onBeforeRender(_,Q,ne,le,P,Pe),re.transparent===!0&&re.side===2&&re.forceSinglePass===!1?(re.side=1,re.needsUpdate=!0,_.renderBufferDirect(ne,Q,le,re,P,Pe),re.side=0,re.needsUpdate=!0,_.renderBufferDirect(ne,Q,le,re,P,Pe),re.side=2):_.renderBufferDirect(ne,Q,le,re,P,Pe),P.onAfterRender(_,Q,ne,le,re,Pe)}function yt(P,Q,ne){Q.isScene!==!0&&(Q=xe);const le=ce.get(P),re=p.state.lights,Pe=p.state.shadowsArray,ze=re.state.version,Be=ie.getParameters(P,re.state,Pe,Q,ne),be=ie.getProgramCacheKey(Be);let je=le.programs;le.environment=P.isMeshStandardMaterial?Q.environment:null,le.fog=Q.fog,le.envMap=(P.isMeshStandardMaterial?A:se).get(P.envMap||le.environment),le.envMapRotation=le.environment!==null&&P.envMap===null?Q.environmentRotation:P.envMapRotation,je===void 0&&(P.addEventListener("dispose",K),je=new Map,le.programs=je);let Ke=je.get(be);if(Ke!==void 0){if(le.currentProgram===Ke&&le.lightsStateVersion===ze)return Yi(P,Be),Ke}else Be.uniforms=ie.getUniforms(P),P.onBuild(ne,Be,_),P.onBeforeCompile(Be,_),Ke=ie.acquireProgram(Be,be),je.set(be,Ke),le.uniforms=Be.uniforms;const Ve=le.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ve.clippingPlanes=ue.uniform),Yi(P,Be),le.needsLights=Ya(P),le.lightsStateVersion=ze,le.needsLights&&(Ve.ambientLightColor.value=re.state.ambient,Ve.lightProbe.value=re.state.probe,Ve.directionalLights.value=re.state.directional,Ve.directionalLightShadows.value=re.state.directionalShadow,Ve.spotLights.value=re.state.spot,Ve.spotLightShadows.value=re.state.spotShadow,Ve.rectAreaLights.value=re.state.rectArea,Ve.ltc_1.value=re.state.rectAreaLTC1,Ve.ltc_2.value=re.state.rectAreaLTC2,Ve.pointLights.value=re.state.point,Ve.pointLightShadows.value=re.state.pointShadow,Ve.hemisphereLights.value=re.state.hemi,Ve.directionalShadowMap.value=re.state.directionalShadowMap,Ve.directionalShadowMatrix.value=re.state.directionalShadowMatrix,Ve.spotShadowMap.value=re.state.spotShadowMap,Ve.spotLightMatrix.value=re.state.spotLightMatrix,Ve.spotLightMap.value=re.state.spotLightMap,Ve.pointShadowMap.value=re.state.pointShadowMap,Ve.pointShadowMatrix.value=re.state.pointShadowMatrix),le.currentProgram=Ke,le.uniformsList=null,Ke}function kt(P){if(P.uniformsList===null){const Q=P.currentProgram.getUniforms();P.uniformsList=Ia.seqWithValue(Q.seq,P.uniforms)}return P.uniformsList}function Yi(P,Q){const ne=ce.get(P);ne.outputColorSpace=Q.outputColorSpace,ne.batching=Q.batching,ne.instancing=Q.instancing,ne.instancingColor=Q.instancingColor,ne.instancingMorph=Q.instancingMorph,ne.skinning=Q.skinning,ne.morphTargets=Q.morphTargets,ne.morphNormals=Q.morphNormals,ne.morphColors=Q.morphColors,ne.morphTargetsCount=Q.morphTargetsCount,ne.numClippingPlanes=Q.numClippingPlanes,ne.numIntersection=Q.numClipIntersection,ne.vertexAlphas=Q.vertexAlphas,ne.vertexTangents=Q.vertexTangents,ne.toneMapping=Q.toneMapping}function ra(P,Q,ne,le,re){Q.isScene!==!0&&(Q=xe),ve.resetTextureUnits();const Pe=Q.fog,ze=le.isMeshStandardMaterial?Q.environment:null,Be=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:bi,be=(le.isMeshStandardMaterial?A:se).get(le.envMap||ze),je=le.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,Ke=!!ne.attributes.tangent&&(!!le.normalMap||le.anisotropy>0),Ve=!!ne.morphAttributes.position,dt=!!ne.morphAttributes.normal,ht=!!ne.morphAttributes.color;let Tt=0;le.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Tt=_.toneMapping);const Lt=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,at=Lt!==void 0?Lt.length:0,qe=ce.get(le),_i=p.state.lights;if(I===!0&&(B===!0||P!==O)){const wt=P===O&&le.id===U;ue.setState(le,P,wt)}let $i=!1;le.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==_i.state.version||qe.outputColorSpace!==Be||re.isBatchedMesh&&qe.batching===!1||!re.isBatchedMesh&&qe.batching===!0||re.isInstancedMesh&&qe.instancing===!1||!re.isInstancedMesh&&qe.instancing===!0||re.isSkinnedMesh&&qe.skinning===!1||!re.isSkinnedMesh&&qe.skinning===!0||re.isInstancedMesh&&qe.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&qe.instancingColor===!1&&re.instanceColor!==null||re.isInstancedMesh&&qe.instancingMorph===!0&&re.morphTexture===null||re.isInstancedMesh&&qe.instancingMorph===!1&&re.morphTexture!==null||qe.envMap!==be||le.fog===!0&&qe.fog!==Pe||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==ue.numPlanes||qe.numIntersection!==ue.numIntersection)||qe.vertexAlphas!==je||qe.vertexTangents!==Ke||qe.morphTargets!==Ve||qe.morphNormals!==dt||qe.morphColors!==ht||qe.toneMapping!==Tt||me.isWebGL2===!0&&qe.morphTargetsCount!==at)&&($i=!0):($i=!0,qe.__version=le.version);let $t=qe.currentProgram;$i===!0&&($t=yt(le,Q,re));let Cr=!1,Kt=!1,Ri=!1;const ut=$t.getUniforms(),Zt=qe.uniforms;if(de.useProgram($t.program)&&(Cr=!0,Kt=!0,Ri=!0),le.id!==U&&(U=le.id,Kt=!0),Cr||O!==P){ut.setValue(F,"projectionMatrix",P.projectionMatrix),ut.setValue(F,"viewMatrix",P.matrixWorldInverse);const wt=ut.map.cameraPosition;wt!==void 0&&wt.setValue(F,ee.setFromMatrixPosition(P.matrixWorld)),me.logarithmicDepthBuffer&&ut.setValue(F,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(le.isMeshPhongMaterial||le.isMeshToonMaterial||le.isMeshLambertMaterial||le.isMeshBasicMaterial||le.isMeshStandardMaterial||le.isShaderMaterial)&&ut.setValue(F,"isOrthographic",P.isOrthographicCamera===!0),O!==P&&(O=P,Kt=!0,Ri=!0)}if(re.isSkinnedMesh){ut.setOptional(F,re,"bindMatrix"),ut.setOptional(F,re,"bindMatrixInverse");const wt=re.skeleton;wt&&(me.floatVertexTextures?(wt.boneTexture===null&&wt.computeBoneTexture(),ut.setValue(F,"boneTexture",wt.boneTexture,ve)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}re.isBatchedMesh&&(ut.setOptional(F,re,"batchingTexture"),ut.setValue(F,"batchingTexture",re._matricesTexture,ve));const Ui=ne.morphAttributes;if((Ui.position!==void 0||Ui.normal!==void 0||Ui.color!==void 0&&me.isWebGL2===!0)&&he.update(re,ne,$t),(Kt||qe.receiveShadow!==re.receiveShadow)&&(qe.receiveShadow=re.receiveShadow,ut.setValue(F,"receiveShadow",re.receiveShadow)),le.isMeshGouraudMaterial&&le.envMap!==null&&(Zt.envMap.value=be,Zt.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),Kt&&(ut.setValue(F,"toneMappingExposure",_.toneMappingExposure),qe.needsLights&&Ar(Zt,Ri),Pe&&le.fog===!0&&te.refreshFogUniforms(Zt,Pe),te.refreshMaterialUniforms(Zt,le,y,z,J),Ia.upload(F,kt(qe),Zt,ve)),le.isShaderMaterial&&le.uniformsNeedUpdate===!0&&(Ia.upload(F,kt(qe),Zt,ve),le.uniformsNeedUpdate=!1),le.isSpriteMaterial&&ut.setValue(F,"center",re.center),ut.setValue(F,"modelViewMatrix",re.modelViewMatrix),ut.setValue(F,"normalMatrix",re.normalMatrix),ut.setValue(F,"modelMatrix",re.matrixWorld),le.isShaderMaterial||le.isRawShaderMaterial){const wt=le.uniformsGroups;for(let Dt=0,$a=wt.length;Dt<$a;Dt++)if(me.isWebGL2){const Pi=wt[Dt];Ue.update(Pi,$t),Ue.bind(Pi,$t)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return $t}function Ar(P,Q){P.ambientLightColor.needsUpdate=Q,P.lightProbe.needsUpdate=Q,P.directionalLights.needsUpdate=Q,P.directionalLightShadows.needsUpdate=Q,P.pointLights.needsUpdate=Q,P.pointLightShadows.needsUpdate=Q,P.spotLights.needsUpdate=Q,P.spotLightShadows.needsUpdate=Q,P.rectAreaLights.needsUpdate=Q,P.hemisphereLights.needsUpdate=Q}function Ya(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(P,Q,ne){ce.get(P.texture).__webglTexture=Q,ce.get(P.depthTexture).__webglTexture=ne;const le=ce.get(P);le.__hasExternalTextures=!0,le.__autoAllocateDepthBuffer=ne===void 0,le.__autoAllocateDepthBuffer||ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),le.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,Q){const ne=ce.get(P);ne.__webglFramebuffer=Q,ne.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(P,Q=0,ne=0){w=P,S=Q,E=ne;let le=!0,re=null,Pe=!1,ze=!1;if(P){const Be=ce.get(P);Be.__useDefaultFramebuffer!==void 0?(de.bindFramebuffer(F.FRAMEBUFFER,null),le=!1):Be.__webglFramebuffer===void 0?ve.setupRenderTarget(P):Be.__hasExternalTextures&&ve.rebindTextures(P,ce.get(P.texture).__webglTexture,ce.get(P.depthTexture).__webglTexture);const be=P.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(ze=!0);const je=ce.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(je[Q])?re=je[Q][ne]:re=je[Q],Pe=!0):me.isWebGL2&&P.samples>0&&ve.useMultisampledRTT(P)===!1?re=ce.get(P).__webglMultisampledFramebuffer:Array.isArray(je)?re=je[ne]:re=je,x.copy(P.viewport),C.copy(P.scissor),L=P.scissorTest}else x.copy(X).multiplyScalar(y).floor(),C.copy(D).multiplyScalar(y).floor(),L=H;if(de.bindFramebuffer(F.FRAMEBUFFER,re)&&me.drawBuffers&&le&&de.drawBuffers(P,re),de.viewport(x),de.scissor(C),de.setScissorTest(L),Pe){const Be=ce.get(P.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Be.__webglTexture,ne)}else if(ze){const Be=ce.get(P.texture),be=Q||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Be.__webglTexture,ne||0,be)}U=-1},this.readRenderTargetPixels=function(P,Q,ne,le,re,Pe,ze){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Be=ce.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&ze!==void 0&&(Be=Be[ze]),Be){de.bindFramebuffer(F.FRAMEBUFFER,Be);try{const be=P.texture,je=be.format,Ke=be.type;if(je!==1023&&Me.convert(je)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=Ke===1016&&(ge.has("EXT_color_buffer_half_float")||me.isWebGL2&&ge.has("EXT_color_buffer_float"));if(Ke!==1009&&Me.convert(Ke)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ke===1015&&(me.isWebGL2||ge.has("OES_texture_float")||ge.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=P.width-le&&ne>=0&&ne<=P.height-re&&F.readPixels(Q,ne,le,re,Me.convert(je),Me.convert(Ke),Pe)}finally{const be=w!==null?ce.get(w).__webglFramebuffer:null;de.bindFramebuffer(F.FRAMEBUFFER,be)}}},this.copyFramebufferToTexture=function(P,Q,ne=0){const le=Math.pow(2,-ne),re=Math.floor(Q.image.width*le),Pe=Math.floor(Q.image.height*le);ve.setTexture2D(Q,0),F.copyTexSubImage2D(F.TEXTURE_2D,ne,0,0,P.x,P.y,re,Pe),de.unbindTexture()},this.copyTextureToTexture=function(P,Q,ne,le=0){const re=Q.image.width,Pe=Q.image.height,ze=Me.convert(ne.format),Be=Me.convert(ne.type);ve.setTexture2D(ne,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,ne.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ne.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,ne.unpackAlignment),Q.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,le,P.x,P.y,re,Pe,ze,Be,Q.image.data):Q.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,le,P.x,P.y,Q.mipmaps[0].width,Q.mipmaps[0].height,ze,Q.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,le,P.x,P.y,ze,Be,Q.image),le===0&&ne.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),de.unbindTexture()},this.copyTextureToTexture3D=function(P,Q,ne,le,re=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Pe=Math.round(P.max.x-P.min.x),ze=Math.round(P.max.y-P.min.y),Be=P.max.z-P.min.z+1,be=Me.convert(le.format),je=Me.convert(le.type);let Ke;if(le.isData3DTexture)ve.setTexture3D(le,0),Ke=F.TEXTURE_3D;else if(le.isDataArrayTexture||le.isCompressedArrayTexture)ve.setTexture2DArray(le,0),Ke=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,le.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,le.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,le.unpackAlignment);const Ve=F.getParameter(F.UNPACK_ROW_LENGTH),dt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),ht=F.getParameter(F.UNPACK_SKIP_PIXELS),Tt=F.getParameter(F.UNPACK_SKIP_ROWS),Lt=F.getParameter(F.UNPACK_SKIP_IMAGES),at=ne.isCompressedTexture?ne.mipmaps[re]:ne.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,at.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,at.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,P.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,P.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,P.min.z),ne.isDataTexture||ne.isData3DTexture?F.texSubImage3D(Ke,re,Q.x,Q.y,Q.z,Pe,ze,Be,be,je,at.data):le.isCompressedArrayTexture?F.compressedTexSubImage3D(Ke,re,Q.x,Q.y,Q.z,Pe,ze,Be,be,at.data):F.texSubImage3D(Ke,re,Q.x,Q.y,Q.z,Pe,ze,Be,be,je,at),F.pixelStorei(F.UNPACK_ROW_LENGTH,Ve),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,dt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,ht),F.pixelStorei(F.UNPACK_SKIP_ROWS,Tt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Lt),re===0&&le.generateMipmaps&&F.generateMipmap(Ke),de.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?ve.setTextureCube(P,0):P.isData3DTexture?ve.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?ve.setTexture2DArray(P,0):ve.setTexture2D(P,0),de.unbindTexture()},this.resetState=function(){S=0,E=0,w=null,de.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===sn?"display-p3":"srgb",t.unpackColorSpace=rt.workingColorSpace===ua?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Tf extends ws{}Tf.prototype.isWebGL1Renderer=!0;class Oa extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class jr extends Mt{constructor(e=null,t=1,a=1,i,r,s,o,l,c=1003,u=1003,h,d){super(null,s,o,l,c,u,i,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vi extends Ht{constructor(e,t,a,i=1){super(e,t,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const xr=new ct,Es=new ct,Na=[],As=new ui,wf=new ct,Yr=new We,$r=new Fi;class Ef extends We{constructor(e,t,a){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Vi(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<a;i++)this.setMatrixAt(i,wf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<t;a++)this.getMatrixAt(a,xr),As.copy(e.boundingBox).applyMatrix4(xr),this.boundingBox.union(As)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<t;a++)this.getMatrixAt(a,xr),$r.copy(e.boundingSphere).applyMatrix4(xr),this.boundingSphere.union($r)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const a=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=a.length+1,s=e*r+1;for(let o=0;o<a.length;o++)a[o]=i[s+o]}raycast(e,t){const a=this.matrixWorld,i=this.count;if(Yr.geometry=this.geometry,Yr.material=this.material,Yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$r.copy(this.boundingSphere),$r.applyMatrix4(a),e.ray.intersectsSphere($r)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,xr),Es.multiplyMatrices(a,xr),Yr.matrixWorld=Es,Yr.raycast(e,Na);for(let s=0,o=Na.length;s<o;s++){const l=Na[s];l.instanceId=r,l.object=this,t.push(l)}Na.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Vi(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const a=t.morphTargetInfluences,i=a.length+1;this.morphTexture===null&&(this.morphTexture=new jr(new Float32Array(i*this.count),i,this.count,1028,1015));const r=this.morphTexture.source.data.data;let s=0;for(let c=0;c<a.length;c++)s+=a[c];const o=this.geometry.morphTargetsRelative?1:1-s,l=i*e;r[l]=o,r.set(a,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Af extends Wr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new fe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Cs=new ct,kn=new wo,za=new Fi,ka=new ae;class Cf extends Rt{constructor(e=new Xt,t=new Af){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const a=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,s=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),za.copy(a.boundingSphere),za.applyMatrix4(i),za.radius+=r,e.ray.intersectsSphere(za)===!1)return;Cs.copy(i).invert(),kn.copy(e.ray).applyMatrix4(Cs);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=a.index,u=a.attributes.position;if(c!==null){const h=Math.max(0,s.start),d=Math.min(c.count,s.start+s.count);for(let f=h,g=d;f<g;f++){const v=c.getX(f);ka.fromBufferAttribute(u,v),Rs(ka,v,l,i,e,t,this)}}else{const h=Math.max(0,s.start),d=Math.min(u.count,s.start+s.count);for(let f=h,g=d;f<g;f++)ka.fromBufferAttribute(u,f),Rs(ka,f,l,i,e,t,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const a=e[t[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,r=a.length;i<r;i++){const s=a[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=i}}}}}function Rs(n,e,t,a,i,r,s){const o=kn.distanceSqToPoint(n);if(o<t){const l=new ae;kn.closestPointToPoint(n,l),l.applyMatrix4(a);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:s})}}class Zn extends Xt{constructor(e=1,t=32,a=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:a,thetaLength:i},t=Math.max(3,t);const r=[],s=[],o=[],l=[],c=new ae,u=new Fe;s.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const f=a+h/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),s.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(s[d]/e+1)/2,u.y=(s[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Ut(s,3)),this.setAttribute("normal",new Ut(o,3)),this.setAttribute("uv",new Ut(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Qn extends Xt{constructor(e=1,t=32,a=16,i=0,r=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:a,phiStart:i,phiLength:r,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),a=Math.max(2,Math.floor(a));const l=Math.min(s+o,Math.PI);let c=0;const u=[],h=new ae,d=new ae,f=[],g=[],v=[],p=[];for(let m=0;m<=a;m++){const b=[],_=m/a;let M=0;m===0&&s===0?M=.5/t:m===a&&l===Math.PI&&(M=-.5/t);for(let S=0;S<=t;S++){const E=S/t;h.x=-e*Math.cos(i+E*r)*Math.sin(s+_*o),h.y=e*Math.cos(s+_*o),h.z=e*Math.sin(i+E*r)*Math.sin(s+_*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),p.push(E+M,1-_),b.push(c++)}u.push(b)}for(let m=0;m<a;m++)for(let b=0;b<t;b++){const _=u[m][b+1],M=u[m][b],S=u[m+1][b],E=u[m+1][b+1];(m!==0||s>0)&&f.push(_,M,E),(m!==a-1||l<Math.PI)&&f.push(M,S,E)}this.setIndex(f),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(v,3)),this.setAttribute("uv",new Ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}const Us={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Rf{constructor(e,t,a){const i=this;let r=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=a,this.itemStart=function(u){o++,r===!1&&i.onStart!==void 0&&i.onStart(u,s,o),r=!0},this.itemEnd=function(u){s++,i.onProgress!==void 0&&i.onProgress(u,s,o),s===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const Uf=new Rf;class Bn{constructor(e){this.manager=e!==void 0?e:Uf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const a=this;return new Promise(function(i,r){a.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Bn.DEFAULT_MATERIAL_NAME="__DEFAULT";class Pf extends Bn{constructor(e){super(e)}load(e,t,a,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,s=Us.get(e);if(s!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0),s;const o=kr("img");function l(){u(),Us.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Lf extends Bn{constructor(e){super(e)}load(e,t,a,i){const r=new Mt,s=new Pf(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},a,i),r}}class Df extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new fe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Ff extends Df{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class If extends Xt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Of{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Ps(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Ps();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Ps(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"162"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="162");class Nf{constructor(e){this.smoothed={bass:0,mid:0,treble:0,rms:0},this.smoothing=.82,this.analyser=e,this.freqData=new Uint8Array(this.analyser.frequencyBinCount),this.timeData=new Uint8Array(this.analyser.frequencyBinCount)}update(){this.analyser.getByteFrequencyData(this.freqData),this.analyser.getByteTimeDomainData(this.timeData);const e=this.freqData.length,t=Math.floor(e/3);let a=0,i=0,r=0;for(let l=0;l<t;l++)a+=this.freqData[l];for(let l=t;l<t*2;l++)i+=this.freqData[l];for(let l=t*2;l<e;l++)r+=this.freqData[l];a=a/t/255,i=i/t/255,r=r/(e-t*2)/255;let s=0;for(let l=0;l<this.timeData.length;l++){const c=(this.timeData[l]-128)/128;s+=c*c}s=Math.sqrt(s/this.timeData.length);const o=this.smoothing;return this.smoothed.bass=this.smoothed.bass*o+a*(1-o),this.smoothed.mid=this.smoothed.mid*o+i*(1-o),this.smoothed.treble=this.smoothed.treble*o+r*(1-o),this.smoothed.rms=this.smoothed.rms*o+s*(1-o),this.smoothed}}const Ls={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Kr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const zf=new it(-1,1,1,-1,0,1);class kf extends Xt{constructor(){super(),this.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ut([0,2,0,0,2,0],2))}}const Bf=new kf;class Ds{constructor(e){this._mesh=new We(Bf,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,zf)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ba extends Kr{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Ye?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=qr.clone(e.uniforms),this.material=new Ye({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Ds(this.material)}render(e,t,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Fs extends Kr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,a){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,s,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class Gf extends Kr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Hf{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const a=e.getSize(new Fe);this._width=a.width,this._height=a.height,t=new mt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:1016}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ba(Ls),this.copyPass.material.blending=0,this.clock=new Of}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let a=!1;for(let i=0,r=this.passes.length;i<r;i++){const s=this.passes[i];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),s.needsSwap){if(a){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Fs!==void 0&&(s instanceof Fs?a=!0:s instanceof Gf&&(a=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Fe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const a=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(a,i),this.renderTarget2.setSize(a,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(a,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Vf extends Kr{constructor(e,t,a=null,i=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=a,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new fe}render(e,t,a){const i=e.autoClear;e.autoClear=!1;let r,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=i}}const Wf={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new fe(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Er extends Kr{constructor(e,t,a,i){super(),this.strength=t!==void 0?t:1,this.radius=a,this.threshold=i,this.resolution=e!==void 0?new Fe(e.x,e.y):new Fe(256,256),this.clearColor=new fe(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new mt(r,s,{type:1016}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new mt(r,s,{type:1016});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new mt(r,s,{type:1016});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),s=Math.round(s/2)}const o=Wf;this.highPassUniforms=qr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ye({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Fe(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new ae(1,1,1),new ae(1,1,1),new ae(1,1,1),new ae(1,1,1),new ae(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Ls;this.copyUniforms=qr.clone(u.uniforms),this.blendMaterial=new Ye({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new fe,this.oldClearAlpha=1,this.basic=new Ii,this.fsQuad=new Ds(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let a=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(a,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(a,i),this.renderTargetsVertical[r].setSize(a,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Fe(1/a,1/i),a=Math.round(a/2),i=Math.round(i/2)}render(e,t,a,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Er.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Er.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}getSeperableBlurMaterial(e){const t=[];for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(e*e))/e);return new Ye({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Fe(.5,.5)},direction:{value:new Fe(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new Ye({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Er.BlurDirectionX=new Fe(1,0),Er.BlurDirectionY=new Fe(0,1);const Xf={uniforms:{tDiffuse:{value:null},u_intensity:{value:0},u_resolution:{value:new Fe(1,1)}},vertexShader:`
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
  `},Is={uniforms:{tDiffuse:{value:null},u_blur:{value:0},u_resolution:{value:new Fe(1,1)},u_direction:{value:new Fe(1,0)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float u_blur;
    uniform vec2 u_resolution;
    uniform vec2 u_direction;
    varying vec2 vUv;
    void main() {
      if (u_blur < 0.01) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 texel = u_direction / u_resolution;
      vec4 color = vec4(0.0);
      float total = 0.0;
      float sigma = max(u_blur, 0.001);
      int samples = int(min(sigma * 3.0, 10.0));
      for (int i = -10; i <= 10; i++) {
        if (abs(i) > samples) continue;
        float w = exp(-float(i*i) / (2.0 * sigma * sigma));
        color += texture2D(tDiffuse, vUv + float(i) * texel) * w;
        total += w;
      }
      gl_FragColor = color / total;
    }
  `};class qf{constructor(e,t,a){this.uiVisibility=0,this.uiVisibilityTarget=0,this.chromaBeat=0,this._textRenderer=null,this._textDbgCount=0,this.renderer=e,this.scene=t,this.camera=a,this.composer=new Hf(e);const i=new Vf(t,a);i.clear=!0,this.composer.addPass(i);const r=i.render.bind(i);i.render=(s,o,l,c,u)=>{const h=i.camera,d=h.layers.mask;h.layers.set(0),r(s,o,l,c,u),h.layers.mask=d},this.bloom=new Er(new Fe(window.innerWidth,window.innerHeight),.6,.4,.85),this.composer.addPass(this.bloom),this.chromaPass=new Ba(Xf),this.chromaPass.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),this.composer.addPass(this.chromaPass),this.blurPassH=new Ba(Is),this.blurPassH.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),this.blurPassH.uniforms.u_direction.value.set(1,0),this.composer.addPass(this.blurPassH),this.blurPassV=new Ba(Is),this.blurPassV.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),this.blurPassV.uniforms.u_direction.value.set(0,1),this.composer.addPass(this.blurPassV)}setTextRenderer(e){this._textRenderer=e}renderText(){const e=this.camera.layers.mask;this.camera.layers.set(1),this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.render(this.scene,this.camera),this.renderer.autoClear=!0,this.camera.layers.mask=e,this._textDbgCount||(this._textDbgCount=0),this._textDbgCount++,this._textDbgCount%300}setUiVisibility(e){this.uiVisibilityTarget=e?1:0}update(e){this.bloom.threshold=.9-e.rms*.04,this.bloom.strength=.45+e.rms*.2,e.bass>.5&&(this.chromaBeat=Math.max(this.chromaBeat,e.bass)),this.chromaBeat*=.92,this.chromaPass.uniforms.u_intensity.value=this.chromaBeat,this.uiVisibility+=(this.uiVisibilityTarget-this.uiVisibility)*.05,this.blurPassH.uniforms.u_blur.value=0,this.blurPassV.uniforms.u_blur.value=0}setSize(e,t){this.composer.setSize(e,t),this.chromaPass.uniforms.u_resolution.value.set(e,t),this.blurPassH.uniforms.u_resolution.value.set(e,t),this.blurPassV.uniforms.u_resolution.value.set(e,t),this._textRenderer&&this._textRenderer.setSize(e,t,!1)}updateScene(e,t){this.scene=e,this.camera=t;const a=this.composer.passes[0];a.scene=e,a.camera=t}}function jf(){var n=Object.create(null);function e(i,r){var s=i.id,o=i.name,l=i.dependencies;l===void 0&&(l=[]);var c=i.init;c===void 0&&(c=function(){});var u=i.getTransferables;if(u===void 0&&(u=null),!n[s])try{l=l.map(function(d){return d&&d.isWorkerModule&&(e(d,function(f){if(f instanceof Error)throw f}),d=n[d.id].value),d}),c=a("<"+o+">.init",c),u&&(u=a("<"+o+">.getTransferables",u));var h=null;typeof c=="function"?h=c.apply(void 0,l):console.error("worker module init function failed to rehydrate"),n[s]={id:s,value:h,getTransferables:u},r(h)}catch(d){d&&d.noLog||console.error(d),r(d)}}function t(i,r){var s,o=i.id,l=i.args;(!n[o]||typeof n[o].value!="function")&&r(new Error("Worker module "+o+": not found or its 'init' did not return a function"));try{var c=(s=n[o]).value.apply(s,l);c&&typeof c.then=="function"?c.then(u,function(h){return r(h instanceof Error?h:new Error(""+h))}):u(c)}catch(h){r(h)}function u(h){try{var d=n[o].getTransferables&&n[o].getTransferables(h);(!d||!Array.isArray(d)||!d.length)&&(d=void 0),r(h,d)}catch(f){console.error(f),r(f)}}}function a(i,r){var s=void 0;self.troikaDefine=function(l){return s=l};var o=URL.createObjectURL(new Blob(["/** "+i.replace(/\*/g,"")+` **/

troikaDefine(
`+r+`
)`],{type:"application/javascript"}));try{importScripts(o)}catch(l){console.error(l)}return URL.revokeObjectURL(o),delete self.troikaDefine,s}self.addEventListener("message",function(i){var r=i.data,s=r.messageId,o=r.action,l=r.data;try{o==="registerModule"&&e(l,function(c){c instanceof Error?postMessage({messageId:s,success:!1,error:c.message}):postMessage({messageId:s,success:!0,result:{isCallable:typeof c=="function"}})}),o==="callModule"&&t(l,function(c,u){c instanceof Error?postMessage({messageId:s,success:!1,error:c.message}):postMessage({messageId:s,success:!0,result:c},u||void 0)})}catch(c){postMessage({messageId:s,success:!1,error:c.stack})}})}function Yf(n){var e=function(){for(var t=[],a=arguments.length;a--;)t[a]=arguments[a];return e._getInitResult().then(function(i){if(typeof i=="function")return i.apply(void 0,t);throw new Error("Worker module function was called but `init` did not return a callable function")})};return e._getInitResult=function(){var t=n.dependencies,a=n.init;t=Array.isArray(t)?t.map(function(r){return r&&(r=r.onMainThread||r,r._getInitResult&&(r=r._getInitResult())),r}):[];var i=Promise.all(t).then(function(r){return a.apply(null,r)});return e._getInitResult=function(){return i},i},e}var Os=function(){var n=!1;if(typeof window<"u"&&typeof window.document<"u")try{var e=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));e.terminate(),n=!0}catch(t){typeof process<"u"&&!1||console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+t.message+"]")}return Os=function(){return n},n},$f=0,Kf=0,Gn=!1,Zr=Object.create(null),Qr=Object.create(null),Hn=Object.create(null);function yr(n){if((!n||typeof n.init!="function")&&!Gn)throw new Error("requires `options.init` function");var e=n.dependencies,t=n.init,a=n.getTransferables,i=n.workerId,r=Yf(n);i==null&&(i="#default");var s="workerModule"+ ++$f,o=n.name||s,l=null;e=e&&e.map(function(u){return typeof u=="function"&&!u.workerModuleData&&(Gn=!0,u=yr({workerId:i,name:"<"+o+"> function dependency: "+u.name,init:`function(){return (
`+Ga(u)+`
)}`}),Gn=!1),u&&u.workerModuleData&&(u=u.workerModuleData),u});function c(){for(var u=[],h=arguments.length;h--;)u[h]=arguments[h];if(!Os())return r.apply(void 0,u);if(!l){l=Ns(i,"registerModule",c.workerModuleData);var d=function(){l=null,Qr[i].delete(d)};(Qr[i]||(Qr[i]=new Set)).add(d)}return l.then(function(f){var g=f.isCallable;if(g)return Ns(i,"callModule",{id:s,args:u});throw new Error("Worker module function was called but `init` did not return a callable function")})}return c.workerModuleData={isWorkerModule:!0,id:s,name:o,dependencies:e,init:Ga(t),getTransferables:a&&Ga(a)},c.onMainThread=r,c}function Zf(n){Qr[n]&&Qr[n].forEach(function(e){e()}),Zr[n]&&(Zr[n].terminate(),delete Zr[n])}function Ga(n){var e=n.toString();return!/^function/.test(e)&&/^\w+\s*\(/.test(e)&&(e="function "+e),e}function Qf(n){var e=Zr[n];if(!e){var t=Ga(jf);e=Zr[n]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+n.replace(/\*/g,"")+` **/

;(`+t+")()"],{type:"application/javascript"}))),e.onmessage=function(a){var i=a.data,r=i.messageId,s=Hn[r];if(!s)throw new Error("WorkerModule response with empty or unknown messageId");delete Hn[r],s(i)}}return e}function Ns(n,e,t){return new Promise(function(a,i){var r=++Kf;Hn[r]=function(s){s.success?a(s.result):i(new Error("Error in worker "+e+" call: "+s.error))},Qf(n).postMessage({messageId:r,action:e,data:t})})}function zs(){var n=(function(e){function t(k,X,D,H,j,I,B,J){var W=1-B;J.x=W*W*k+2*W*B*D+B*B*j,J.y=W*W*X+2*W*B*H+B*B*I}function a(k,X,D,H,j,I,B,J,W,$){var ee=1-W;$.x=ee*ee*ee*k+3*ee*ee*W*D+3*ee*W*W*j+W*W*W*B,$.y=ee*ee*ee*X+3*ee*ee*W*H+3*ee*W*W*I+W*W*W*J}function i(k,X){for(var D=/([MLQCZ])([^MLQCZ]*)/g,H,j,I,B,J;H=D.exec(k);){var W=H[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function($){return parseFloat($)});switch(H[1]){case"M":B=j=W[0],J=I=W[1];break;case"L":(W[0]!==B||W[1]!==J)&&X("L",B,J,B=W[0],J=W[1]);break;case"Q":{X("Q",B,J,B=W[2],J=W[3],W[0],W[1]);break}case"C":{X("C",B,J,B=W[4],J=W[5],W[0],W[1],W[2],W[3]);break}case"Z":(B!==j||J!==I)&&X("L",B,J,j,I);break}}}function r(k,X,D){D===void 0&&(D=16);var H={x:0,y:0};i(k,function(j,I,B,J,W,$,ee,xe,oe){switch(j){case"L":X(I,B,J,W);break;case"Q":{for(var F=I,De=B,ge=1;ge<D;ge++)t(I,B,$,ee,J,W,ge/(D-1),H),X(F,De,H.x,H.y),F=H.x,De=H.y;break}case"C":{for(var me=I,de=B,Se=1;Se<D;Se++)a(I,B,$,ee,xe,oe,J,W,Se/(D-1),H),X(me,de,H.x,H.y),me=H.x,de=H.y;break}}})}var s="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",o="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",l=new WeakMap,c={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function u(k,X){var D=k.getContext?k.getContext("webgl",c):k,H=l.get(D);if(!H){let ee=function(me){var de=I[me];if(!de&&(de=I[me]=D.getExtension(me),!de))throw new Error(me+" not supported");return de},xe=function(me,de){var Se=D.createShader(de);return D.shaderSource(Se,me),D.compileShader(Se),Se},oe=function(me,de,Se,ce){if(!B[me]){var ve={},se={},A=D.createProgram();D.attachShader(A,xe(de,D.VERTEX_SHADER)),D.attachShader(A,xe(Se,D.FRAGMENT_SHADER)),D.linkProgram(A),B[me]={program:A,transaction:function(T){D.useProgram(A),T({setUniform:function(V,Z){for(var ie=[],te=arguments.length-2;te-- >0;)ie[te]=arguments[te+2];var Re=se[Z]||(se[Z]=D.getUniformLocation(A,Z));D["uniform"+V].apply(D,[Re].concat(ie))},setAttribute:function(V,Z,ie,te,Re){var pe=ve[V];pe||(pe=ve[V]={buf:D.createBuffer(),loc:D.getAttribLocation(A,V),data:null}),D.bindBuffer(D.ARRAY_BUFFER,pe.buf),D.vertexAttribPointer(pe.loc,Z,D.FLOAT,!1,0,0),D.enableVertexAttribArray(pe.loc),j?D.vertexAttribDivisor(pe.loc,te):ee("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(pe.loc,te),Re!==pe.data&&(D.bufferData(D.ARRAY_BUFFER,Re,ie),pe.data=Re)}})}}}B[me].transaction(ce)},F=function(me,de){W++;try{D.activeTexture(D.TEXTURE0+W);var Se=J[me];Se||(Se=J[me]=D.createTexture(),D.bindTexture(D.TEXTURE_2D,Se),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_MIN_FILTER,D.NEAREST),D.texParameteri(D.TEXTURE_2D,D.TEXTURE_MAG_FILTER,D.NEAREST)),D.bindTexture(D.TEXTURE_2D,Se),de(Se,W)}finally{W--}},De=function(me,de,Se){var ce=D.createFramebuffer();$.push(ce),D.bindFramebuffer(D.FRAMEBUFFER,ce),D.activeTexture(D.TEXTURE0+de),D.bindTexture(D.TEXTURE_2D,me),D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,me,0);try{Se(ce)}finally{D.deleteFramebuffer(ce),D.bindFramebuffer(D.FRAMEBUFFER,$[--$.length-1]||null)}},ge=function(){I={},B={},J={},W=-1,$.length=0};var j=typeof WebGL2RenderingContext<"u"&&D instanceof WebGL2RenderingContext,I={},B={},J={},W=-1,$=[];D.canvas.addEventListener("webglcontextlost",function(me){ge(),me.preventDefault()},!1),l.set(D,H={gl:D,isWebGL2:j,getExtension:ee,withProgram:oe,withTexture:F,withTextureFramebuffer:De,handleContextLoss:ge})}X(H)}function h(k,X,D,H,j,I,B,J){B===void 0&&(B=15),J===void 0&&(J=null),u(k,function(W){var $=W.gl,ee=W.withProgram,xe=W.withTexture;xe("copy",function(oe,F){$.texImage2D($.TEXTURE_2D,0,$.RGBA,j,I,0,$.RGBA,$.UNSIGNED_BYTE,X),ee("copy",s,o,function(De){var ge=De.setUniform,me=De.setAttribute;me("aUV",2,$.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),ge("1i","image",F),$.bindFramebuffer($.FRAMEBUFFER,J||null),$.disable($.BLEND),$.colorMask(B&8,B&4,B&2,B&1),$.viewport(D,H,j,I),$.scissor(D,H,j,I),$.drawArrays($.TRIANGLES,0,3)})})})}function d(k,X,D){var H=k.width,j=k.height;u(k,function(I){var B=I.gl,J=new Uint8Array(H*j*4);B.readPixels(0,0,H,j,B.RGBA,B.UNSIGNED_BYTE,J),k.width=X,k.height=D,h(B,J,0,0,H,j)})}var f=Object.freeze({__proto__:null,withWebGLContext:u,renderImageData:h,resizeWebGLCanvasWithoutClearing:d});function g(k,X,D,H,j,I){I===void 0&&(I=1);var B=new Uint8Array(k*X),J=H[2]-H[0],W=H[3]-H[1],$=[];r(D,function(me,de,Se,ce){$.push({x1:me,y1:de,x2:Se,y2:ce,minX:Math.min(me,Se),minY:Math.min(de,ce),maxX:Math.max(me,Se),maxY:Math.max(de,ce)})}),$.sort(function(me,de){return me.maxX-de.maxX});for(var ee=0;ee<k;ee++)for(var xe=0;xe<X;xe++){var oe=De(H[0]+J*(ee+.5)/k,H[1]+W*(xe+.5)/X),F=Math.pow(1-Math.abs(oe)/j,I)/2;oe<0&&(F=1-F),F=Math.max(0,Math.min(255,Math.round(F*255))),B[xe*k+ee]=F}return B;function De(me,de){for(var Se=1/0,ce=1/0,ve=$.length;ve--;){var se=$[ve];if(se.maxX+ce<=me)break;if(me+ce>se.minX&&de-ce<se.maxY&&de+ce>se.minY){var A=m(me,de,se.x1,se.y1,se.x2,se.y2);A<Se&&(Se=A,ce=Math.sqrt(Se))}}return ge(me,de)&&(ce=-ce),ce}function ge(me,de){for(var Se=0,ce=$.length;ce--;){var ve=$[ce];if(ve.maxX<=me)break;var se=ve.y1>de!=ve.y2>de&&me<(ve.x2-ve.x1)*(de-ve.y1)/(ve.y2-ve.y1)+ve.x1;se&&(Se+=ve.y1<ve.y2?1:-1)}return Se!==0}}function v(k,X,D,H,j,I,B,J,W,$){I===void 0&&(I=1),J===void 0&&(J=0),W===void 0&&(W=0),$===void 0&&($=0),p(k,X,D,H,j,I,B,null,J,W,$)}function p(k,X,D,H,j,I,B,J,W,$,ee){I===void 0&&(I=1),W===void 0&&(W=0),$===void 0&&($=0),ee===void 0&&(ee=0);for(var xe=g(k,X,D,H,j,I),oe=new Uint8Array(xe.length*4),F=0;F<xe.length;F++)oe[F*4+ee]=xe[F];h(B,oe,W,$,k,X,1<<3-ee,J)}function m(k,X,D,H,j,I){var B=j-D,J=I-H,W=B*B+J*J,$=W?Math.max(0,Math.min(1,((k-D)*B+(X-H)*J)/W)):0,ee=k-(D+$*B),xe=X-(H+$*J);return ee*ee+xe*xe}var b=Object.freeze({__proto__:null,generate:g,generateIntoCanvas:v,generateIntoFramebuffer:p}),_="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",M="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",S="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",E=new Float32Array([0,0,2,0,0,2]),w=null,U=!1,O={},x=new WeakMap;function C(k){if(!U&&!G(k))throw new Error("WebGL generation not supported")}function L(k,X,D,H,j,I,B){if(I===void 0&&(I=1),B===void 0&&(B=null),!B&&(B=w,!B)){var J=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!J)throw new Error("OffscreenCanvas or DOM canvas not supported");B=w=J.getContext("webgl",{depth:!1})}C(B);var W=new Uint8Array(k*X*4);u(B,function(oe){var F=oe.gl,De=oe.withTexture,ge=oe.withTextureFramebuffer;De("readable",function(me,de){F.texImage2D(F.TEXTURE_2D,0,F.RGBA,k,X,0,F.RGBA,F.UNSIGNED_BYTE,null),ge(me,de,function(Se){R(k,X,D,H,j,I,F,Se,0,0,0),F.readPixels(0,0,k,X,F.RGBA,F.UNSIGNED_BYTE,W)})})});for(var $=new Uint8Array(k*X),ee=0,xe=0;ee<W.length;ee+=4)$[xe++]=W[ee];return $}function N(k,X,D,H,j,I,B,J,W,$){I===void 0&&(I=1),J===void 0&&(J=0),W===void 0&&(W=0),$===void 0&&($=0),R(k,X,D,H,j,I,B,null,J,W,$)}function R(k,X,D,H,j,I,B,J,W,$,ee){I===void 0&&(I=1),W===void 0&&(W=0),$===void 0&&($=0),ee===void 0&&(ee=0),C(B);var xe=[];r(D,function(oe,F,De,ge){xe.push(oe,F,De,ge)}),xe=new Float32Array(xe),u(B,function(oe){var F=oe.gl,De=oe.isWebGL2,ge=oe.getExtension,me=oe.withProgram,de=oe.withTexture,Se=oe.withTextureFramebuffer,ce=oe.handleContextLoss;if(de("rawDistances",function(ve,se){(k!==ve._lastWidth||X!==ve._lastHeight)&&F.texImage2D(F.TEXTURE_2D,0,F.RGBA,ve._lastWidth=k,ve._lastHeight=X,0,F.RGBA,F.UNSIGNED_BYTE,null),me("main",_,M,function(A){var T=A.setAttribute,V=A.setUniform,Z=!De&&ge("ANGLE_instanced_arrays"),ie=!De&&ge("EXT_blend_minmax");T("aUV",2,F.STATIC_DRAW,0,E),T("aLineSegment",4,F.DYNAMIC_DRAW,1,xe),V.apply(void 0,["4f","uGlyphBounds"].concat(H)),V("1f","uMaxDistance",j),V("1f","uExponent",I),Se(ve,se,function(te){F.enable(F.BLEND),F.colorMask(!0,!0,!0,!0),F.viewport(0,0,k,X),F.scissor(0,0,k,X),F.blendFunc(F.ONE,F.ONE),F.blendEquationSeparate(F.FUNC_ADD,De?F.MAX:ie.MAX_EXT),F.clear(F.COLOR_BUFFER_BIT),De?F.drawArraysInstanced(F.TRIANGLES,0,3,xe.length/4):Z.drawArraysInstancedANGLE(F.TRIANGLES,0,3,xe.length/4)})}),me("post",s,S,function(A){A.setAttribute("aUV",2,F.STATIC_DRAW,0,E),A.setUniform("1i","tex",se),F.bindFramebuffer(F.FRAMEBUFFER,J),F.disable(F.BLEND),F.colorMask(ee===0,ee===1,ee===2,ee===3),F.viewport(W,$,k,X),F.scissor(W,$,k,X),F.drawArrays(F.TRIANGLES,0,3)})}),F.isContextLost())throw ce(),new Error("webgl context lost")})}function G(k){var X=!k||k===w?O:k.canvas||k,D=x.get(X);if(D===void 0){U=!0;var H=null;try{var j=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],I=L(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,k);D=I&&j.length===I.length&&I.every(function(B,J){return B===j[J]}),D||(H="bad trial run results",console.info(j,I))}catch(B){D=!1,H=B.message}H&&console.warn("WebGL SDF generation not supported:",H),U=!1,x.set(X,D)}return D}var z=Object.freeze({__proto__:null,generate:L,generateIntoCanvas:N,generateIntoFramebuffer:R,isSupported:G});function y(k,X,D,H,j,I){j===void 0&&(j=Math.max(H[2]-H[0],H[3]-H[1])/2),I===void 0&&(I=1);try{return L.apply(z,arguments)}catch(B){return console.info("WebGL SDF generation failed, falling back to JS",B),g.apply(b,arguments)}}function Y(k,X,D,H,j,I,B,J,W,$){j===void 0&&(j=Math.max(H[2]-H[0],H[3]-H[1])/2),I===void 0&&(I=1),J===void 0&&(J=0),W===void 0&&(W=0),$===void 0&&($=0);try{return N.apply(z,arguments)}catch(ee){return console.info("WebGL SDF generation failed, falling back to JS",ee),v.apply(b,arguments)}}return e.forEachPathCommand=i,e.generate=y,e.generateIntoCanvas=Y,e.javascript=b,e.pathToLineSegments=r,e.webgl=z,e.webglUtils=f,Object.defineProperty(e,"__esModule",{value:!0}),e})({});return n}function Jf(){var n=(function(e){var t={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},a={},i={};a.L=1,i[1]="L",Object.keys(t).forEach(function(ce,ve){a[ce]=1<<ve+1,i[a[ce]]=ce}),Object.freeze(a);var r=a.LRI|a.RLI|a.FSI,s=a.L|a.R|a.AL,o=a.B|a.S|a.WS|a.ON|a.FSI|a.LRI|a.RLI|a.PDI,l=a.BN|a.RLE|a.LRE|a.RLO|a.LRO|a.PDF,c=a.S|a.WS|a.B|r|a.PDI|l,u=null;function h(){if(!u){u=new Map;var ce=function(se){if(t.hasOwnProperty(se)){var A=0;t[se].split(",").forEach(function(T){var V=T.split("+"),Z=V[0],ie=V[1];Z=parseInt(Z,36),ie=ie?parseInt(ie,36):0,u.set(A+=Z,a[se]);for(var te=0;te<ie;te++)u.set(++A,a[se])})}};for(var ve in t)ce(ve)}}function d(ce){return h(),u.get(ce.codePointAt(0))||a.L}function f(ce){return i[d(ce)]}var g={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function v(ce,ve){var se=36,A=0,T=new Map,V=ve&&new Map,Z;return ce.split(",").forEach(function ie(te){if(te.indexOf("+")!==-1)for(var Re=+te;Re--;)ie(Z);else{Z=te;var pe=te.split(">"),ue=pe[0],_e=pe[1];ue=String.fromCodePoint(A+=parseInt(ue,se)),_e=String.fromCodePoint(A+=parseInt(_e,se)),T.set(ue,_e),ve&&V.set(_e,ue)}}),{map:T,reverseMap:V}}var p,m,b;function _(){if(!p){var ce=v(g.pairs,!0),ve=ce.map,se=ce.reverseMap;p=ve,m=se,b=v(g.canonical,!1).map}}function M(ce){return _(),p.get(ce)||null}function S(ce){return _(),m.get(ce)||null}function E(ce){return _(),b.get(ce)||null}var w=a.L,U=a.R,O=a.EN,x=a.ES,C=a.ET,L=a.AN,N=a.CS,R=a.B,G=a.S,z=a.ON,y=a.BN,Y=a.NSM,k=a.AL,X=a.LRO,D=a.RLO,H=a.LRE,j=a.RLE,I=a.PDF,B=a.LRI,J=a.RLI,W=a.FSI,$=a.PDI;function ee(ce,ve){for(var se=125,A=new Uint32Array(ce.length),T=0;T<ce.length;T++)A[T]=d(ce[T]);var V=new Map;function Z(Ft,Jt){var It=A[Ft];A[Ft]=Jt,V.set(It,V.get(It)-1),It&o&&V.set(o,V.get(o)-1),V.set(Jt,(V.get(Jt)||0)+1),Jt&o&&V.set(o,(V.get(o)||0)+1)}for(var ie=new Uint8Array(ce.length),te=new Map,Re=[],pe=null,ue=0;ue<ce.length;ue++)pe||Re.push(pe={start:ue,end:ce.length-1,level:ve==="rtl"?1:ve==="ltr"?0:fo(ue,!1)}),A[ue]&R&&(pe.end=ue,pe=null);for(var _e=j|H|D|X|r|$|I|R,Oe=function(Ft){return Ft+(Ft&1?1:2)},he=function(Ft){return Ft+(Ft&1?2:1)},Xe=0;Xe<Re.length;Xe++){pe=Re[Xe];var Ee=[{_level:pe.level,_override:0,_isolate:0}],Me=void 0,Ce=0,Ue=0,Ge=0;V.clear();for(var Ae=pe.start;Ae<=pe.end;Ae++){var Ne=A[Ae];if(Me=Ee[Ee.length-1],V.set(Ne,(V.get(Ne)||0)+1),Ne&o&&V.set(o,(V.get(o)||0)+1),Ne&_e)if(Ne&(j|H)){ie[Ae]=Me._level;var q=(Ne===j?he:Oe)(Me._level);q<=se&&!Ce&&!Ue?Ee.push({_level:q,_override:0,_isolate:0}):Ce||Ue++}else if(Ne&(D|X)){ie[Ae]=Me._level;var ye=(Ne===D?he:Oe)(Me._level);ye<=se&&!Ce&&!Ue?Ee.push({_level:ye,_override:Ne&D?U:w,_isolate:0}):Ce||Ue++}else if(Ne&r){Ne&W&&(Ne=fo(Ae+1,!0)===1?J:B),ie[Ae]=Me._level,Me._override&&Z(Ae,Me._override);var K=(Ne===J?he:Oe)(Me._level);K<=se&&Ce===0&&Ue===0?(Ge++,Ee.push({_level:K,_override:0,_isolate:1,_isolInitIndex:Ae})):Ce++}else if(Ne&$){if(Ce>0)Ce--;else if(Ge>0){for(Ue=0;!Ee[Ee.length-1]._isolate;)Ee.pop();var we=Ee[Ee.length-1]._isolInitIndex;we!=null&&(te.set(we,Ae),te.set(Ae,we)),Ee.pop(),Ge--}Me=Ee[Ee.length-1],ie[Ae]=Me._level,Me._override&&Z(Ae,Me._override)}else Ne&I?(Ce===0&&(Ue>0?Ue--:!Me._isolate&&Ee.length>1&&(Ee.pop(),Me=Ee[Ee.length-1])),ie[Ae]=Me._level):Ne&R&&(ie[Ae]=pe.level);else ie[Ae]=Me._level,Me._override&&Ne!==y&&Z(Ae,Me._override)}for(var Te=[],Ie=null,ke=pe.start;ke<=pe.end;ke++){var Je=A[ke];if(!(Je&l)){var tt=ie[ke],He=Je&r,nt=Je===$;Ie&&tt===Ie._level?(Ie._end=ke,Ie._endsWithIsolInit=He):Te.push(Ie={_start:ke,_end:ke,_level:tt,_startsWithPDI:nt,_endsWithIsolInit:He})}}for(var xt=[],qt=0;qt<Te.length;qt++){var Yt=Te[qt];if(!Yt._startsWithPDI||Yt._startsWithPDI&&!te.has(Yt._start)){for(var zt=[Ie=Yt],ni=void 0;Ie&&Ie._endsWithIsolInit&&(ni=te.get(Ie._end))!=null;)for(var yt=qt+1;yt<Te.length;yt++)if(Te[yt]._start===ni){zt.push(Ie=Te[yt]);break}for(var kt=[],Yi=0;Yi<zt.length;Yi++)for(var ra=zt[Yi],Ar=ra._start;Ar<=ra._end;Ar++)kt.push(Ar);for(var Ya=ie[kt[0]],P=pe.level,Q=kt[0]-1;Q>=0;Q--)if(!(A[Q]&l)){P=ie[Q];break}var ne=kt[kt.length-1],le=ie[ne],re=pe.level;if(!(A[ne]&r)){for(var Pe=ne+1;Pe<=pe.end;Pe++)if(!(A[Pe]&l)){re=ie[Pe];break}}xt.push({_seqIndices:kt,_sosType:Math.max(P,Ya)%2?U:w,_eosType:Math.max(re,le)%2?U:w})}}for(var ze=0;ze<xt.length;ze++){var Be=xt[ze],be=Be._seqIndices,je=Be._sosType,Ke=Be._eosType,Ve=ie[be[0]]&1?U:w;if(V.get(Y))for(var dt=0;dt<be.length;dt++){var ht=be[dt];if(A[ht]&Y){for(var Tt=je,Lt=dt-1;Lt>=0;Lt--)if(!(A[be[Lt]]&l)){Tt=A[be[Lt]];break}Z(ht,Tt&(r|$)?z:Tt)}}if(V.get(O))for(var at=0;at<be.length;at++){var qe=be[at];if(A[qe]&O)for(var _i=at-1;_i>=-1;_i--){var $i=_i===-1?je:A[be[_i]];if($i&s){$i===k&&Z(qe,L);break}}}if(V.get(k))for(var $t=0;$t<be.length;$t++){var Cr=be[$t];A[Cr]&k&&Z(Cr,U)}if(V.get(x)||V.get(N))for(var Kt=1;Kt<be.length-1;Kt++){var Ri=be[Kt];if(A[Ri]&(x|N)){for(var ut=0,Zt=0,Ui=Kt-1;Ui>=0&&(ut=A[be[Ui]],!!(ut&l));Ui--);for(var wt=Kt+1;wt<be.length&&(Zt=A[be[wt]],!!(Zt&l));wt++);ut===Zt&&(A[Ri]===x?ut===O:ut&(O|L))&&Z(Ri,ut)}}if(V.get(O))for(var Dt=0;Dt<be.length;Dt++){var $a=be[Dt];if(A[$a]&O){for(var Pi=Dt-1;Pi>=0&&A[be[Pi]]&(C|l);Pi--)Z(be[Pi],O);for(Dt++;Dt<be.length&&A[be[Dt]]&(C|l|O);Dt++)A[be[Dt]]!==O&&Z(be[Dt],O)}}if(V.get(C)||V.get(x)||V.get(N))for(var Rr=0;Rr<be.length;Rr++){var Jn=be[Rr];if(A[Jn]&(C|x|N)){Z(Jn,z);for(var aa=Rr-1;aa>=0&&A[be[aa]]&l;aa--)Z(be[aa],z);for(var na=Rr+1;na<be.length&&A[be[na]]&l;na++)Z(be[na],z)}}if(V.get(O))for(var Ka=0,eo=je;Ka<be.length;Ka++){var to=be[Ka],Za=A[to];Za&O?eo===w&&Z(to,w):Za&s&&(eo=Za)}if(V.get(o)){var Ur=U|O|L,io=Ur|w,oa=[];{for(var Ki=[],Zi=0;Zi<be.length;Zi++)if(A[be[Zi]]&o){var Pr=ce[be[Zi]],ro=void 0;if(M(Pr)!==null)if(Ki.length<63)Ki.push({char:Pr,seqIndex:Zi});else break;else if((ro=S(Pr))!==null)for(var Lr=Ki.length-1;Lr>=0;Lr--){var Qa=Ki[Lr].char;if(Qa===ro||Qa===S(E(Pr))||M(E(Qa))===Pr){oa.push([Ki[Lr].seqIndex,Zi]),Ki.length=Lr;break}}}oa.sort(function(Ft,Jt){return Ft[0]-Jt[0]})}for(var Ja=0;Ja<oa.length;Ja++){for(var ao=oa[Ja],sa=ao[0],en=ao[1],no=!1,Qt=0,tn=sa+1;tn<en;tn++){var oo=be[tn];if(A[oo]&io){no=!0;var so=A[oo]&Ur?U:w;if(so===Ve){Qt=so;break}}}if(no&&!Qt){Qt=je;for(var rn=sa-1;rn>=0;rn--){var lo=be[rn];if(A[lo]&io){var co=A[lo]&Ur?U:w;co!==Ve?Qt=co:Qt=Ve;break}}}if(Qt){if(A[be[sa]]=A[be[en]]=Qt,Qt!==Ve){for(var Dr=sa+1;Dr<be.length;Dr++)if(!(A[be[Dr]]&l)){d(ce[be[Dr]])&Y&&(A[be[Dr]]=Qt);break}}if(Qt!==Ve){for(var Fr=en+1;Fr<be.length;Fr++)if(!(A[be[Fr]]&l)){d(ce[be[Fr]])&Y&&(A[be[Fr]]=Qt);break}}}}for(var xi=0;xi<be.length;xi++)if(A[be[xi]]&o){for(var uo=xi,an=xi,nn=je,Ir=xi-1;Ir>=0;Ir--)if(A[be[Ir]]&l)uo=Ir;else{nn=A[be[Ir]]&Ur?U:w;break}for(var ho=Ke,Or=xi+1;Or<be.length;Or++)if(A[be[Or]]&(o|l))an=Or;else{ho=A[be[Or]]&Ur?U:w;break}for(var on=uo;on<=an;on++)A[be[on]]=nn===ho?nn:Ve;xi=an}}}for(var Bt=pe.start;Bt<=pe.end;Bt++){var hl=ie[Bt],la=A[Bt];if(hl&1?la&(w|O|L)&&ie[Bt]++:la&U?ie[Bt]++:la&(L|O)&&(ie[Bt]+=2),la&l&&(ie[Bt]=Bt===0?pe.level:ie[Bt-1]),Bt===pe.end||d(ce[Bt])&(G|R))for(var ca=Bt;ca>=0&&d(ce[ca])&c;ca--)ie[ca]=pe.level}}return{levels:ie,paragraphs:Re};function fo(Ft,Jt){for(var It=Ft;It<ce.length;It++){var yi=A[It];if(yi&(U|k))return 1;if(yi&(R|w)||Jt&&yi===$)return 0;if(yi&r){var po=dl(It);It=po===-1?ce.length:po}}return 0}function dl(Ft){for(var Jt=1,It=Ft+1;It<ce.length;It++){var yi=A[It];if(yi&R)break;if(yi&$){if(--Jt===0)return It}else yi&r&&Jt++}return-1}}var xe="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",oe;function F(){if(!oe){var ce=v(xe,!0),ve=ce.map,se=ce.reverseMap;se.forEach(function(A,T){ve.set(T,A)}),oe=ve}}function De(ce){return F(),oe.get(ce)||null}function ge(ce,ve,se,A){var T=ce.length;se=Math.max(0,se==null?0:+se),A=Math.min(T-1,A==null?T-1:+A);for(var V=new Map,Z=se;Z<=A;Z++)if(ve[Z]&1){var ie=De(ce[Z]);ie!==null&&V.set(Z,ie)}return V}function me(ce,ve,se,A){var T=ce.length;se=Math.max(0,se==null?0:+se),A=Math.min(T-1,A==null?T-1:+A);var V=[];return ve.paragraphs.forEach(function(Z){var ie=Math.max(se,Z.start),te=Math.min(A,Z.end);if(ie<te){for(var Re=ve.levels.slice(ie,te+1),pe=te;pe>=ie&&d(ce[pe])&c;pe--)Re[pe]=Z.level;for(var ue=Z.level,_e=1/0,Oe=0;Oe<Re.length;Oe++){var he=Re[Oe];he>ue&&(ue=he),he<_e&&(_e=he|1)}for(var Xe=ue;Xe>=_e;Xe--)for(var Ee=0;Ee<Re.length;Ee++)if(Re[Ee]>=Xe){for(var Me=Ee;Ee+1<Re.length&&Re[Ee+1]>=Xe;)Ee++;Ee>Me&&V.push([Me+ie,Ee+ie])}}}),V}function de(ce,ve,se,A){var T=Se(ce,ve,se,A),V=[].concat(ce);return T.forEach(function(Z,ie){V[ie]=(ve.levels[Z]&1?De(ce[Z]):null)||ce[Z]}),V.join("")}function Se(ce,ve,se,A){for(var T=me(ce,ve,se,A),V=[],Z=0;Z<ce.length;Z++)V[Z]=Z;return T.forEach(function(ie){for(var te=ie[0],Re=ie[1],pe=V.slice(te,Re+1),ue=pe.length;ue--;)V[Re-ue]=pe[ue]}),V}return e.closingToOpeningBracket=S,e.getBidiCharType=d,e.getBidiCharTypeName=f,e.getCanonicalBracket=E,e.getEmbeddingLevels=ee,e.getMirroredCharacter=De,e.getMirroredCharactersMap=ge,e.getReorderSegments=me,e.getReorderedIndices=Se,e.getReorderedString=de,e.openingToClosingBracket=M,Object.defineProperty(e,"__esModule",{value:!0}),e})({});return n}const ks=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Vn(n){const e=/^[ \t]*#include +<([\w\d./]+)>/gm;function t(a,i){let r=Ze[i];return r?Vn(r):a}return n.replace(e,t)}const St=[];for(let n=0;n<256;n++)St[n]=(n<16?"0":"")+n.toString(16);function ep(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[a&255]+St[a>>8&255]+St[a>>16&255]+St[a>>24&255]).toUpperCase()}const Wi=Object.assign||function(){let n=arguments[0];for(let e=1,t=arguments.length;e<t;e++){let a=arguments[e];if(a)for(let i in a)Object.prototype.hasOwnProperty.call(a,i)&&(n[i]=a[i])}return n},tp=Date.now(),Bs=new WeakMap,Gs=new Map;let ip=1e10;function Wn(n,e){const t=op(e);let a=Bs.get(n);if(a||Bs.set(n,a=Object.create(null)),a[t])return new a[t];const i=`_onBeforeCompile${t}`,r=function(c,u){n.onBeforeCompile.call(this,c,u);const h=this.customProgramCacheKey()+"|"+c.vertexShader+"|"+c.fragmentShader;let d=Gs[h];if(!d){const f=rp(this,c,e,t);d=Gs[h]=f}c.vertexShader=d.vertexShader,c.fragmentShader=d.fragmentShader,Wi(c.uniforms,this.uniforms),e.timeUniform&&(c.uniforms[e.timeUniform]={get value(){return Date.now()-tp}}),this[i]&&this[i](c)},s=function(){return o(e.chained?n:n.clone())},o=function(c){const u=Object.create(c,l);return Object.defineProperty(u,"baseMaterial",{value:n}),Object.defineProperty(u,"id",{value:ip++}),u.uuid=ep(),u.uniforms=Wi({},c.uniforms,e.uniforms),u.defines=Wi({},c.defines,e.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${t}`]="",u.extensions=Wi({},c.extensions,e.extensions),u._listeners=void 0,u},l={constructor:{value:s},isDerivedMaterial:{value:!0},type:{get:()=>n.type,set:c=>{n.type=c}},isDerivedFrom:{writable:!0,configurable:!0,value:function(c){const u=this.baseMaterial;return c===u||u.isDerivedMaterial&&u.isDerivedFrom(c)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return n.customProgramCacheKey()+"|"+t}},onBeforeCompile:{get(){return r},set(c){this[i]=c}},copy:{writable:!0,configurable:!0,value:function(c){return n.copy.call(this,c),!n.isShaderMaterial&&!n.isDerivedMaterial&&(Wi(this.extensions,c.extensions),Wi(this.defines,c.defines),Wi(this.uniforms,qr.clone(c.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const c=new n.constructor;return o(c).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let c=this._depthMaterial;return c||(c=this._depthMaterial=Wn(n.isDerivedMaterial?n.getDepthMaterial():new Ms({depthPacking:3201}),e),c.defines.IS_DEPTH_MATERIAL="",c.uniforms=this.uniforms),c}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let c=this._distanceMaterial;return c||(c=this._distanceMaterial=Wn(n.isDerivedMaterial?n.getDistanceMaterial():new Ts,e),c.defines.IS_DISTANCE_MATERIAL="",c.uniforms=this.uniforms),c}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:c,_distanceMaterial:u}=this;c&&c.dispose(),u&&u.dispose(),n.dispose.call(this)}}};return a[t]=s,new s}function rp(n,{vertexShader:e,fragmentShader:t},a,i){let{vertexDefs:r,vertexMainIntro:s,vertexMainOutro:o,vertexTransform:l,fragmentDefs:c,fragmentMainIntro:u,fragmentMainOutro:h,fragmentColorTransform:d,customRewriter:f,timeUniform:g}=a;if(r=r||"",s=s||"",o=o||"",c=c||"",u=u||"",h=h||"",(l||f)&&(e=Vn(e)),(d||f)&&(t=t.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),t=Vn(t)),f){let v=f({vertexShader:e,fragmentShader:t});e=v.vertexShader,t=v.fragmentShader}if(d){let v=[];t=t.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,p=>(v.push(p),"")),h=`${d}
${v.join(`
`)}
${h}`}if(g){const v=`
uniform float ${g};
`;r=v+r,c=v+c}return l&&(e=`vec3 troika_position_${i};
vec3 troika_normal_${i};
vec2 troika_uv_${i};
${e}
`,r=`${r}
void troikaVertexTransform${i}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${l}
}
`,s=`
troika_position_${i} = vec3(position);
troika_normal_${i} = vec3(normal);
troika_uv_${i} = vec2(uv);
troikaVertexTransform${i}(troika_position_${i}, troika_normal_${i}, troika_uv_${i});
${s}
`,e=e.replace(/\b(position|normal|uv)\b/g,(v,p,m,b)=>/\battribute\s+vec[23]\s+$/.test(b.substr(0,m))?p:`troika_${p}_${i}`),n.map&&n.map.channel>0||(e=e.replace(/\bMAP_UV\b/g,`troika_uv_${i}`))),e=Hs(e,i,r,s,o),t=Hs(t,i,c,u,h),{vertexShader:e,fragmentShader:t}}function Hs(n,e,t,a,i){return(a||i||t)&&(n=n.replace(ks,`
${t}
void troikaOrigMain${e}() {`),n+=`
void main() {
  ${a}
  troikaOrigMain${e}();
  ${i}
}`),n}function ap(n,e){return n==="uniforms"?void 0:typeof e=="function"?e.toString():e}let np=0;const Vs=new Map;function op(n){const e=JSON.stringify(n,ap);let t=Vs.get(e);return t==null&&Vs.set(e,t=++np),t}function sp(){return typeof window>"u"&&(self.window=self),(function(n){var e={parse:function(i){var r=e._bin,s=new Uint8Array(i);if(r.readASCII(s,0,4)=="ttcf"){var o=4;r.readUshort(s,o),o+=2,r.readUshort(s,o),o+=2;var l=r.readUint(s,o);o+=4;for(var c=[],u=0;u<l;u++){var h=r.readUint(s,o);o+=4,c.push(e._readFont(s,h))}return c}return[e._readFont(s,0)]},_readFont:function(i,r){var s=e._bin,o=r;s.readFixed(i,r),r+=4;var l=s.readUshort(i,r);r+=2,s.readUshort(i,r),r+=2,s.readUshort(i,r),r+=2,s.readUshort(i,r),r+=2;for(var c=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],u={_data:i,_offset:o},h={},d=0;d<l;d++){var f=s.readASCII(i,r,4);r+=4,s.readUint(i,r),r+=4;var g=s.readUint(i,r);r+=4;var v=s.readUint(i,r);r+=4,h[f]={offset:g,length:v}}for(d=0;d<c.length;d++){var p=c[d];h[p]&&(u[p.trim()]=e[p.trim()].parse(i,h[p].offset,h[p].length,u))}return u},_tabOffset:function(i,r,s){for(var o=e._bin,l=o.readUshort(i,s+4),c=s+12,u=0;u<l;u++){var h=o.readASCII(i,c,4);c+=4,o.readUint(i,c),c+=4;var d=o.readUint(i,c);if(c+=4,o.readUint(i,c),c+=4,h==r)return d}return 0}};e._bin={readFixed:function(i,r){return(i[r]<<8|i[r+1])+(i[r+2]<<8|i[r+3])/65540},readF2dot14:function(i,r){return e._bin.readShort(i,r)/16384},readInt:function(i,r){return e._bin._view(i).getInt32(r)},readInt8:function(i,r){return e._bin._view(i).getInt8(r)},readShort:function(i,r){return e._bin._view(i).getInt16(r)},readUshort:function(i,r){return e._bin._view(i).getUint16(r)},readUshorts:function(i,r,s){for(var o=[],l=0;l<s;l++)o.push(e._bin.readUshort(i,r+2*l));return o},readUint:function(i,r){return e._bin._view(i).getUint32(r)},readUint64:function(i,r){return 4294967296*e._bin.readUint(i,r)+e._bin.readUint(i,r+4)},readASCII:function(i,r,s){for(var o="",l=0;l<s;l++)o+=String.fromCharCode(i[r+l]);return o},readUnicode:function(i,r,s){for(var o="",l=0;l<s;l++){var c=i[r++]<<8|i[r++];o+=String.fromCharCode(c)}return o},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(i,r,s){var o=e._bin._tdec;return o&&r==0&&s==i.length?o.decode(i):e._bin.readASCII(i,r,s)},readBytes:function(i,r,s){for(var o=[],l=0;l<s;l++)o.push(i[r+l]);return o},readASCIIArray:function(i,r,s){for(var o=[],l=0;l<s;l++)o.push(String.fromCharCode(i[r+l]));return o},_view:function(i){return i._dataView||(i._dataView=i.buffer?new DataView(i.buffer,i.byteOffset,i.byteLength):new DataView(new Uint8Array(i).buffer))}},e._lctf={},e._lctf.parse=function(i,r,s,o,l){var c=e._bin,u={},h=r;c.readFixed(i,r),r+=4;var d=c.readUshort(i,r);r+=2;var f=c.readUshort(i,r);r+=2;var g=c.readUshort(i,r);return r+=2,u.scriptList=e._lctf.readScriptList(i,h+d),u.featureList=e._lctf.readFeatureList(i,h+f),u.lookupList=e._lctf.readLookupList(i,h+g,l),u},e._lctf.readLookupList=function(i,r,s){var o=e._bin,l=r,c=[],u=o.readUshort(i,r);r+=2;for(var h=0;h<u;h++){var d=o.readUshort(i,r);r+=2;var f=e._lctf.readLookupTable(i,l+d,s);c.push(f)}return c},e._lctf.readLookupTable=function(i,r,s){var o=e._bin,l=r,c={tabs:[]};c.ltype=o.readUshort(i,r),r+=2,c.flag=o.readUshort(i,r),r+=2;var u=o.readUshort(i,r);r+=2;for(var h=c.ltype,d=0;d<u;d++){var f=o.readUshort(i,r);r+=2;var g=s(i,h,l+f,c);c.tabs.push(g)}return c},e._lctf.numOfOnes=function(i){for(var r=0,s=0;s<32;s++)i>>>s&1&&r++;return r},e._lctf.readClassDef=function(i,r){var s=e._bin,o=[],l=s.readUshort(i,r);if(r+=2,l==1){var c=s.readUshort(i,r);r+=2;var u=s.readUshort(i,r);r+=2;for(var h=0;h<u;h++)o.push(c+h),o.push(c+h),o.push(s.readUshort(i,r)),r+=2}if(l==2){var d=s.readUshort(i,r);for(r+=2,h=0;h<d;h++)o.push(s.readUshort(i,r)),r+=2,o.push(s.readUshort(i,r)),r+=2,o.push(s.readUshort(i,r)),r+=2}return o},e._lctf.getInterval=function(i,r){for(var s=0;s<i.length;s+=3){var o=i[s],l=i[s+1];if(i[s+2],o<=r&&r<=l)return s}return-1},e._lctf.readCoverage=function(i,r){var s=e._bin,o={};o.fmt=s.readUshort(i,r),r+=2;var l=s.readUshort(i,r);return r+=2,o.fmt==1&&(o.tab=s.readUshorts(i,r,l)),o.fmt==2&&(o.tab=s.readUshorts(i,r,3*l)),o},e._lctf.coverageIndex=function(i,r){var s=i.tab;if(i.fmt==1)return s.indexOf(r);if(i.fmt==2){var o=e._lctf.getInterval(s,r);if(o!=-1)return s[o+2]+(r-s[o])}return-1},e._lctf.readFeatureList=function(i,r){var s=e._bin,o=r,l=[],c=s.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=s.readASCII(i,r,4);r+=4;var d=s.readUshort(i,r);r+=2;var f=e._lctf.readFeatureTable(i,o+d);f.tag=h.trim(),l.push(f)}return l},e._lctf.readFeatureTable=function(i,r){var s=e._bin,o=r,l={},c=s.readUshort(i,r);r+=2,c>0&&(l.featureParams=o+c);var u=s.readUshort(i,r);r+=2,l.tab=[];for(var h=0;h<u;h++)l.tab.push(s.readUshort(i,r+2*h));return l},e._lctf.readScriptList=function(i,r){var s=e._bin,o=r,l={},c=s.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=s.readASCII(i,r,4);r+=4;var d=s.readUshort(i,r);r+=2,l[h.trim()]=e._lctf.readScriptTable(i,o+d)}return l},e._lctf.readScriptTable=function(i,r){var s=e._bin,o=r,l={},c=s.readUshort(i,r);r+=2,c>0&&(l.default=e._lctf.readLangSysTable(i,o+c));var u=s.readUshort(i,r);r+=2;for(var h=0;h<u;h++){var d=s.readASCII(i,r,4);r+=4;var f=s.readUshort(i,r);r+=2,l[d.trim()]=e._lctf.readLangSysTable(i,o+f)}return l},e._lctf.readLangSysTable=function(i,r){var s=e._bin,o={};s.readUshort(i,r),r+=2,o.reqFeature=s.readUshort(i,r),r+=2;var l=s.readUshort(i,r);return r+=2,o.features=s.readUshorts(i,r,l),o},e.CFF={},e.CFF.parse=function(i,r,s){var o=e._bin;(i=new Uint8Array(i.buffer,r,s))[r=0],i[++r],i[++r],i[++r],r++;var l=[];r=e.CFF.readIndex(i,r,l);for(var c=[],u=0;u<l.length-1;u++)c.push(o.readASCII(i,r+l[u],l[u+1]-l[u]));r+=l[l.length-1];var h=[];r=e.CFF.readIndex(i,r,h);var d=[];for(u=0;u<h.length-1;u++)d.push(e.CFF.readDict(i,r+h[u],r+h[u+1]));r+=h[h.length-1];var f=d[0],g=[];r=e.CFF.readIndex(i,r,g);var v=[];for(u=0;u<g.length-1;u++)v.push(o.readASCII(i,r+g[u],g[u+1]-g[u]));if(r+=g[g.length-1],e.CFF.readSubrs(i,r,f),f.CharStrings){r=f.CharStrings,g=[],r=e.CFF.readIndex(i,r,g);var p=[];for(u=0;u<g.length-1;u++)p.push(o.readBytes(i,r+g[u],g[u+1]-g[u]));f.CharStrings=p}if(f.ROS){r=f.FDArray;var m=[];for(r=e.CFF.readIndex(i,r,m),f.FDArray=[],u=0;u<m.length-1;u++){var b=e.CFF.readDict(i,r+m[u],r+m[u+1]);e.CFF._readFDict(i,b,v),f.FDArray.push(b)}r+=m[m.length-1],r=f.FDSelect,f.FDSelect=[];var _=i[r];if(r++,_!=3)throw _;var M=o.readUshort(i,r);for(r+=2,u=0;u<M+1;u++)f.FDSelect.push(o.readUshort(i,r),i[r+2]),r+=3}return f.Encoding&&(f.Encoding=e.CFF.readEncoding(i,f.Encoding,f.CharStrings.length)),f.charset&&(f.charset=e.CFF.readCharset(i,f.charset,f.CharStrings.length)),e.CFF._readFDict(i,f,v),f},e.CFF._readFDict=function(i,r,s){var o;for(var l in r.Private&&(o=r.Private[1],r.Private=e.CFF.readDict(i,o,o+r.Private[0]),r.Private.Subrs&&e.CFF.readSubrs(i,o+r.Private.Subrs,r.Private)),r)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(l)!=-1&&(r[l]=s[r[l]-426+35])},e.CFF.readSubrs=function(i,r,s){var o=e._bin,l=[];r=e.CFF.readIndex(i,r,l);var c,u=l.length;c=u<1240?107:u<33900?1131:32768,s.Bias=c,s.Subrs=[];for(var h=0;h<l.length-1;h++)s.Subrs.push(o.readBytes(i,r+l[h],l[h+1]-l[h]))},e.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],e.CFF.glyphByUnicode=function(i,r){for(var s=0;s<i.charset.length;s++)if(i.charset[s]==r)return s;return-1},e.CFF.glyphBySE=function(i,r){return r<0||r>255?-1:e.CFF.glyphByUnicode(i,e.CFF.tableSE[r])},e.CFF.readEncoding=function(i,r,s){e._bin;var o=[".notdef"],l=i[r];if(r++,l!=0)throw"error: unknown encoding format: "+l;var c=i[r];r++;for(var u=0;u<c;u++)o.push(i[r+u]);return o},e.CFF.readCharset=function(i,r,s){var o=e._bin,l=[".notdef"],c=i[r];if(r++,c==0)for(var u=0;u<s;u++){var h=o.readUshort(i,r);r+=2,l.push(h)}else{if(c!=1&&c!=2)throw"error: format: "+c;for(;l.length<s;){h=o.readUshort(i,r),r+=2;var d=0;for(c==1?(d=i[r],r++):(d=o.readUshort(i,r),r+=2),u=0;u<=d;u++)l.push(h),h++}}return l},e.CFF.readIndex=function(i,r,s){var o=e._bin,l=o.readUshort(i,r)+1,c=i[r+=2];if(r++,c==1)for(var u=0;u<l;u++)s.push(i[r+u]);else if(c==2)for(u=0;u<l;u++)s.push(o.readUshort(i,r+2*u));else if(c==3)for(u=0;u<l;u++)s.push(16777215&o.readUint(i,r+3*u-1));else if(l!=1)throw"unsupported offset size: "+c+", count: "+l;return(r+=l*c)-1},e.CFF.getCharString=function(i,r,s){var o=e._bin,l=i[r],c=i[r+1];i[r+2],i[r+3],i[r+4];var u=1,h=null,d=null;l<=20&&(h=l,u=1),l==12&&(h=100*l+c,u=2),21<=l&&l<=27&&(h=l,u=1),l==28&&(d=o.readShort(i,r+1),u=3),29<=l&&l<=31&&(h=l,u=1),32<=l&&l<=246&&(d=l-139,u=1),247<=l&&l<=250&&(d=256*(l-247)+c+108,u=2),251<=l&&l<=254&&(d=256*-(l-251)-c-108,u=2),l==255&&(d=o.readInt(i,r+1)/65535,u=5),s.val=d??"o"+h,s.size=u},e.CFF.readCharString=function(i,r,s){for(var o=r+s,l=e._bin,c=[];r<o;){var u=i[r],h=i[r+1];i[r+2],i[r+3],i[r+4];var d=1,f=null,g=null;u<=20&&(f=u,d=1),u==12&&(f=100*u+h,d=2),u!=19&&u!=20||(f=u,d=2),21<=u&&u<=27&&(f=u,d=1),u==28&&(g=l.readShort(i,r+1),d=3),29<=u&&u<=31&&(f=u,d=1),32<=u&&u<=246&&(g=u-139,d=1),247<=u&&u<=250&&(g=256*(u-247)+h+108,d=2),251<=u&&u<=254&&(g=256*-(u-251)-h-108,d=2),u==255&&(g=l.readInt(i,r+1)/65535,d=5),c.push(g??"o"+f),r+=d}return c},e.CFF.readDict=function(i,r,s){for(var o=e._bin,l={},c=[];r<s;){var u=i[r],h=i[r+1];i[r+2],i[r+3],i[r+4];var d=1,f=null,g=null;if(u==28&&(g=o.readShort(i,r+1),d=3),u==29&&(g=o.readInt(i,r+1),d=5),32<=u&&u<=246&&(g=u-139,d=1),247<=u&&u<=250&&(g=256*(u-247)+h+108,d=2),251<=u&&u<=254&&(g=256*-(u-251)-h-108,d=2),u==255)throw g=o.readInt(i,r+1)/65535,d=5,"unknown number";if(u==30){var v=[];for(d=1;;){var p=i[r+d];d++;var m=p>>4,b=15&p;if(m!=15&&v.push(m),b!=15&&v.push(b),b==15)break}for(var _="",M=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],S=0;S<v.length;S++)_+=M[v[S]];g=parseFloat(_)}u<=21&&(f=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][u],d=1,u==12&&(f=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][h],d=2)),f!=null?(l[f]=c.length==1?c[0]:c,c=[]):c.push(g),r+=d}return l},e.cmap={},e.cmap.parse=function(i,r,s){i=new Uint8Array(i.buffer,r,s),r=0;var o=e._bin,l={};o.readUshort(i,r),r+=2;var c=o.readUshort(i,r);r+=2;var u=[];l.tables=[];for(var h=0;h<c;h++){var d=o.readUshort(i,r);r+=2;var f=o.readUshort(i,r);r+=2;var g=o.readUint(i,r);r+=4;var v="p"+d+"e"+f,p=u.indexOf(g);if(p==-1){var m;p=l.tables.length,u.push(g);var b=o.readUshort(i,g);b==0?m=e.cmap.parse0(i,g):b==4?m=e.cmap.parse4(i,g):b==6?m=e.cmap.parse6(i,g):b==12?m=e.cmap.parse12(i,g):console.debug("unknown format: "+b,d,f,g),l.tables.push(m)}if(l[v]!=null)throw"multiple tables for one platform+encoding";l[v]=p}return l},e.cmap.parse0=function(i,r){var s=e._bin,o={};o.format=s.readUshort(i,r),r+=2;var l=s.readUshort(i,r);r+=2,s.readUshort(i,r),r+=2,o.map=[];for(var c=0;c<l-6;c++)o.map.push(i[r+c]);return o},e.cmap.parse4=function(i,r){var s=e._bin,o=r,l={};l.format=s.readUshort(i,r),r+=2;var c=s.readUshort(i,r);r+=2,s.readUshort(i,r),r+=2;var u=s.readUshort(i,r);r+=2;var h=u/2;l.searchRange=s.readUshort(i,r),r+=2,l.entrySelector=s.readUshort(i,r),r+=2,l.rangeShift=s.readUshort(i,r),r+=2,l.endCount=s.readUshorts(i,r,h),r+=2*h,r+=2,l.startCount=s.readUshorts(i,r,h),r+=2*h,l.idDelta=[];for(var d=0;d<h;d++)l.idDelta.push(s.readShort(i,r)),r+=2;for(l.idRangeOffset=s.readUshorts(i,r,h),r+=2*h,l.glyphIdArray=[];r<o+c;)l.glyphIdArray.push(s.readUshort(i,r)),r+=2;return l},e.cmap.parse6=function(i,r){var s=e._bin,o={};o.format=s.readUshort(i,r),r+=2,s.readUshort(i,r),r+=2,s.readUshort(i,r),r+=2,o.firstCode=s.readUshort(i,r),r+=2;var l=s.readUshort(i,r);r+=2,o.glyphIdArray=[];for(var c=0;c<l;c++)o.glyphIdArray.push(s.readUshort(i,r)),r+=2;return o},e.cmap.parse12=function(i,r){var s=e._bin,o={};o.format=s.readUshort(i,r),r+=2,r+=2,s.readUint(i,r),r+=4,s.readUint(i,r),r+=4;var l=s.readUint(i,r);r+=4,o.groups=[];for(var c=0;c<l;c++){var u=r+12*c,h=s.readUint(i,u+0),d=s.readUint(i,u+4),f=s.readUint(i,u+8);o.groups.push([h,d,f])}return o},e.glyf={},e.glyf.parse=function(i,r,s,o){for(var l=[],c=0;c<o.maxp.numGlyphs;c++)l.push(null);return l},e.glyf._parseGlyf=function(i,r){var s=e._bin,o=i._data,l=e._tabOffset(o,"glyf",i._offset)+i.loca[r];if(i.loca[r]==i.loca[r+1])return null;var c={};if(c.noc=s.readShort(o,l),l+=2,c.xMin=s.readShort(o,l),l+=2,c.yMin=s.readShort(o,l),l+=2,c.xMax=s.readShort(o,l),l+=2,c.yMax=s.readShort(o,l),l+=2,c.xMin>=c.xMax||c.yMin>=c.yMax)return null;if(c.noc>0){c.endPts=[];for(var u=0;u<c.noc;u++)c.endPts.push(s.readUshort(o,l)),l+=2;var h=s.readUshort(o,l);if(l+=2,o.length-l<h)return null;c.instructions=s.readBytes(o,l,h),l+=h;var d=c.endPts[c.noc-1]+1;for(c.flags=[],u=0;u<d;u++){var f=o[l];if(l++,c.flags.push(f),(8&f)!=0){var g=o[l];l++;for(var v=0;v<g;v++)c.flags.push(f),u++}}for(c.xs=[],u=0;u<d;u++){var p=(2&c.flags[u])!=0,m=(16&c.flags[u])!=0;p?(c.xs.push(m?o[l]:-o[l]),l++):m?c.xs.push(0):(c.xs.push(s.readShort(o,l)),l+=2)}for(c.ys=[],u=0;u<d;u++)p=(4&c.flags[u])!=0,m=(32&c.flags[u])!=0,p?(c.ys.push(m?o[l]:-o[l]),l++):m?c.ys.push(0):(c.ys.push(s.readShort(o,l)),l+=2);var b=0,_=0;for(u=0;u<d;u++)b+=c.xs[u],_+=c.ys[u],c.xs[u]=b,c.ys[u]=_}else{var M;c.parts=[];do{M=s.readUshort(o,l),l+=2;var S={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(c.parts.push(S),S.glyphIndex=s.readUshort(o,l),l+=2,1&M){var E=s.readShort(o,l);l+=2;var w=s.readShort(o,l);l+=2}else E=s.readInt8(o,l),l++,w=s.readInt8(o,l),l++;2&M?(S.m.tx=E,S.m.ty=w):(S.p1=E,S.p2=w),8&M?(S.m.a=S.m.d=s.readF2dot14(o,l),l+=2):64&M?(S.m.a=s.readF2dot14(o,l),l+=2,S.m.d=s.readF2dot14(o,l),l+=2):128&M&&(S.m.a=s.readF2dot14(o,l),l+=2,S.m.b=s.readF2dot14(o,l),l+=2,S.m.c=s.readF2dot14(o,l),l+=2,S.m.d=s.readF2dot14(o,l),l+=2)}while(32&M);if(256&M){var U=s.readUshort(o,l);for(l+=2,c.instr=[],u=0;u<U;u++)c.instr.push(o[l]),l++}}return c},e.GDEF={},e.GDEF.parse=function(i,r,s,o){var l=r;r+=4;var c=e._bin.readUshort(i,r);return{glyphClassDef:c===0?null:e._lctf.readClassDef(i,l+c)}},e.GPOS={},e.GPOS.parse=function(i,r,s,o){return e._lctf.parse(i,r,s,o,e.GPOS.subt)},e.GPOS.subt=function(i,r,s,o){var l=e._bin,c=s,u={};if(u.fmt=l.readUshort(i,s),s+=2,r==1||r==2||r==3||r==7||r==8&&u.fmt<=2){var h=l.readUshort(i,s);s+=2,u.coverage=e._lctf.readCoverage(i,h+c)}if(r==1&&u.fmt==1){var d=l.readUshort(i,s);s+=2,d!=0&&(u.pos=e.GPOS.readValueRecord(i,s,d))}else if(r==2&&u.fmt>=1&&u.fmt<=2){d=l.readUshort(i,s),s+=2;var f=l.readUshort(i,s);s+=2;var g=e._lctf.numOfOnes(d),v=e._lctf.numOfOnes(f);if(u.fmt==1){u.pairsets=[];var p=l.readUshort(i,s);s+=2;for(var m=0;m<p;m++){var b=c+l.readUshort(i,s);s+=2;var _=l.readUshort(i,b);b+=2;for(var M=[],S=0;S<_;S++){var E=l.readUshort(i,b);b+=2,d!=0&&(L=e.GPOS.readValueRecord(i,b,d),b+=2*g),f!=0&&(N=e.GPOS.readValueRecord(i,b,f),b+=2*v),M.push({gid2:E,val1:L,val2:N})}u.pairsets.push(M)}}if(u.fmt==2){var w=l.readUshort(i,s);s+=2;var U=l.readUshort(i,s);s+=2;var O=l.readUshort(i,s);s+=2;var x=l.readUshort(i,s);for(s+=2,u.classDef1=e._lctf.readClassDef(i,c+w),u.classDef2=e._lctf.readClassDef(i,c+U),u.matrix=[],m=0;m<O;m++){var C=[];for(S=0;S<x;S++){var L=null,N=null;d!=0&&(L=e.GPOS.readValueRecord(i,s,d),s+=2*g),f!=0&&(N=e.GPOS.readValueRecord(i,s,f),s+=2*v),C.push({val1:L,val2:N})}u.matrix.push(C)}}}else if(r==4&&u.fmt==1)u.markCoverage=e._lctf.readCoverage(i,l.readUshort(i,s)+c),u.baseCoverage=e._lctf.readCoverage(i,l.readUshort(i,s+2)+c),u.markClassCount=l.readUshort(i,s+4),u.markArray=e.GPOS.readMarkArray(i,l.readUshort(i,s+6)+c),u.baseArray=e.GPOS.readBaseArray(i,l.readUshort(i,s+8)+c,u.markClassCount);else if(r==6&&u.fmt==1)u.mark1Coverage=e._lctf.readCoverage(i,l.readUshort(i,s)+c),u.mark2Coverage=e._lctf.readCoverage(i,l.readUshort(i,s+2)+c),u.markClassCount=l.readUshort(i,s+4),u.mark1Array=e.GPOS.readMarkArray(i,l.readUshort(i,s+6)+c),u.mark2Array=e.GPOS.readBaseArray(i,l.readUshort(i,s+8)+c,u.markClassCount);else{if(r==9&&u.fmt==1){var R=l.readUshort(i,s);s+=2;var G=l.readUint(i,s);if(s+=4,o.ltype==9)o.ltype=R;else if(o.ltype!=R)throw"invalid extension substitution";return e.GPOS.subt(i,o.ltype,c+G)}console.debug("unsupported GPOS table LookupType",r,"format",u.fmt)}return u},e.GPOS.readValueRecord=function(i,r,s){var o=e._bin,l=[];return l.push(1&s?o.readShort(i,r):0),r+=1&s?2:0,l.push(2&s?o.readShort(i,r):0),r+=2&s?2:0,l.push(4&s?o.readShort(i,r):0),r+=4&s?2:0,l.push(8&s?o.readShort(i,r):0),r+=8&s?2:0,l},e.GPOS.readBaseArray=function(i,r,s){var o=e._bin,l=[],c=r,u=o.readUshort(i,r);r+=2;for(var h=0;h<u;h++){for(var d=[],f=0;f<s;f++)d.push(e.GPOS.readAnchorRecord(i,c+o.readUshort(i,r))),r+=2;l.push(d)}return l},e.GPOS.readMarkArray=function(i,r){var s=e._bin,o=[],l=r,c=s.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=e.GPOS.readAnchorRecord(i,s.readUshort(i,r+2)+l);h.markClass=s.readUshort(i,r),o.push(h),r+=4}return o},e.GPOS.readAnchorRecord=function(i,r){var s=e._bin,o={};return o.fmt=s.readUshort(i,r),o.x=s.readShort(i,r+2),o.y=s.readShort(i,r+4),o},e.GSUB={},e.GSUB.parse=function(i,r,s,o){return e._lctf.parse(i,r,s,o,e.GSUB.subt)},e.GSUB.subt=function(i,r,s,o){var l=e._bin,c=s,u={};if(u.fmt=l.readUshort(i,s),s+=2,r!=1&&r!=2&&r!=4&&r!=5&&r!=6)return null;if(r==1||r==2||r==4||r==5&&u.fmt<=2||r==6&&u.fmt<=2){var h=l.readUshort(i,s);s+=2,u.coverage=e._lctf.readCoverage(i,c+h)}if(r==1&&u.fmt>=1&&u.fmt<=2){if(u.fmt==1)u.delta=l.readShort(i,s),s+=2;else if(u.fmt==2){var d=l.readUshort(i,s);s+=2,u.newg=l.readUshorts(i,s,d),s+=2*u.newg.length}}else if(r==2&&u.fmt==1){d=l.readUshort(i,s),s+=2,u.seqs=[];for(var f=0;f<d;f++){var g=l.readUshort(i,s)+c;s+=2;var v=l.readUshort(i,g);u.seqs.push(l.readUshorts(i,g+2,v))}}else if(r==4)for(u.vals=[],d=l.readUshort(i,s),s+=2,f=0;f<d;f++){var p=l.readUshort(i,s);s+=2,u.vals.push(e.GSUB.readLigatureSet(i,c+p))}else if(r==5&&u.fmt==2){if(u.fmt==2){var m=l.readUshort(i,s);s+=2,u.cDef=e._lctf.readClassDef(i,c+m),u.scset=[];var b=l.readUshort(i,s);for(s+=2,f=0;f<b;f++){var _=l.readUshort(i,s);s+=2,u.scset.push(_==0?null:e.GSUB.readSubClassSet(i,c+_))}}}else if(r==6&&u.fmt==3){if(u.fmt==3){for(f=0;f<3;f++){d=l.readUshort(i,s),s+=2;for(var M=[],S=0;S<d;S++)M.push(e._lctf.readCoverage(i,c+l.readUshort(i,s+2*S)));s+=2*d,f==0&&(u.backCvg=M),f==1&&(u.inptCvg=M),f==2&&(u.ahedCvg=M)}d=l.readUshort(i,s),s+=2,u.lookupRec=e.GSUB.readSubstLookupRecords(i,s,d)}}else{if(r==7&&u.fmt==1){var E=l.readUshort(i,s);s+=2;var w=l.readUint(i,s);if(s+=4,o.ltype==9)o.ltype=E;else if(o.ltype!=E)throw"invalid extension substitution";return e.GSUB.subt(i,o.ltype,c+w)}console.debug("unsupported GSUB table LookupType",r,"format",u.fmt)}return u},e.GSUB.readSubClassSet=function(i,r){var s=e._bin.readUshort,o=r,l=[],c=s(i,r);r+=2;for(var u=0;u<c;u++){var h=s(i,r);r+=2,l.push(e.GSUB.readSubClassRule(i,o+h))}return l},e.GSUB.readSubClassRule=function(i,r){var s=e._bin.readUshort,o={},l=s(i,r),c=s(i,r+=2);r+=2,o.input=[];for(var u=0;u<l-1;u++)o.input.push(s(i,r)),r+=2;return o.substLookupRecords=e.GSUB.readSubstLookupRecords(i,r,c),o},e.GSUB.readSubstLookupRecords=function(i,r,s){for(var o=e._bin.readUshort,l=[],c=0;c<s;c++)l.push(o(i,r),o(i,r+2)),r+=4;return l},e.GSUB.readChainSubClassSet=function(i,r){var s=e._bin,o=r,l=[],c=s.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=s.readUshort(i,r);r+=2,l.push(e.GSUB.readChainSubClassRule(i,o+h))}return l},e.GSUB.readChainSubClassRule=function(i,r){for(var s=e._bin,o={},l=["backtrack","input","lookahead"],c=0;c<l.length;c++){var u=s.readUshort(i,r);r+=2,c==1&&u--,o[l[c]]=s.readUshorts(i,r,u),r+=2*o[l[c]].length}return u=s.readUshort(i,r),r+=2,o.subst=s.readUshorts(i,r,2*u),r+=2*o.subst.length,o},e.GSUB.readLigatureSet=function(i,r){var s=e._bin,o=r,l=[],c=s.readUshort(i,r);r+=2;for(var u=0;u<c;u++){var h=s.readUshort(i,r);r+=2,l.push(e.GSUB.readLigature(i,o+h))}return l},e.GSUB.readLigature=function(i,r){var s=e._bin,o={chain:[]};o.nglyph=s.readUshort(i,r),r+=2;var l=s.readUshort(i,r);r+=2;for(var c=0;c<l-1;c++)o.chain.push(s.readUshort(i,r)),r+=2;return o},e.head={},e.head.parse=function(i,r,s){var o=e._bin,l={};return o.readFixed(i,r),r+=4,l.fontRevision=o.readFixed(i,r),r+=4,o.readUint(i,r),r+=4,o.readUint(i,r),r+=4,l.flags=o.readUshort(i,r),r+=2,l.unitsPerEm=o.readUshort(i,r),r+=2,l.created=o.readUint64(i,r),r+=8,l.modified=o.readUint64(i,r),r+=8,l.xMin=o.readShort(i,r),r+=2,l.yMin=o.readShort(i,r),r+=2,l.xMax=o.readShort(i,r),r+=2,l.yMax=o.readShort(i,r),r+=2,l.macStyle=o.readUshort(i,r),r+=2,l.lowestRecPPEM=o.readUshort(i,r),r+=2,l.fontDirectionHint=o.readShort(i,r),r+=2,l.indexToLocFormat=o.readShort(i,r),r+=2,l.glyphDataFormat=o.readShort(i,r),r+=2,l},e.hhea={},e.hhea.parse=function(i,r,s){var o=e._bin,l={};return o.readFixed(i,r),r+=4,l.ascender=o.readShort(i,r),r+=2,l.descender=o.readShort(i,r),r+=2,l.lineGap=o.readShort(i,r),r+=2,l.advanceWidthMax=o.readUshort(i,r),r+=2,l.minLeftSideBearing=o.readShort(i,r),r+=2,l.minRightSideBearing=o.readShort(i,r),r+=2,l.xMaxExtent=o.readShort(i,r),r+=2,l.caretSlopeRise=o.readShort(i,r),r+=2,l.caretSlopeRun=o.readShort(i,r),r+=2,l.caretOffset=o.readShort(i,r),r+=2,r+=8,l.metricDataFormat=o.readShort(i,r),r+=2,l.numberOfHMetrics=o.readUshort(i,r),r+=2,l},e.hmtx={},e.hmtx.parse=function(i,r,s,o){for(var l=e._bin,c={aWidth:[],lsBearing:[]},u=0,h=0,d=0;d<o.maxp.numGlyphs;d++)d<o.hhea.numberOfHMetrics&&(u=l.readUshort(i,r),r+=2,h=l.readShort(i,r),r+=2),c.aWidth.push(u),c.lsBearing.push(h);return c},e.kern={},e.kern.parse=function(i,r,s,o){var l=e._bin,c=l.readUshort(i,r);if(r+=2,c==1)return e.kern.parseV1(i,r-2,s,o);var u=l.readUshort(i,r);r+=2;for(var h={glyph1:[],rval:[]},d=0;d<u;d++){r+=2,s=l.readUshort(i,r),r+=2;var f=l.readUshort(i,r);r+=2;var g=f>>>8;if((g&=15)!=0)throw"unknown kern table format: "+g;r=e.kern.readFormat0(i,r,h)}return h},e.kern.parseV1=function(i,r,s,o){var l=e._bin;l.readFixed(i,r),r+=4;var c=l.readUint(i,r);r+=4;for(var u={glyph1:[],rval:[]},h=0;h<c;h++){l.readUint(i,r),r+=4;var d=l.readUshort(i,r);r+=2,l.readUshort(i,r),r+=2;var f=d>>>8;if((f&=15)!=0)throw"unknown kern table format: "+f;r=e.kern.readFormat0(i,r,u)}return u},e.kern.readFormat0=function(i,r,s){var o=e._bin,l=-1,c=o.readUshort(i,r);r+=2,o.readUshort(i,r),r+=2,o.readUshort(i,r),r+=2,o.readUshort(i,r),r+=2;for(var u=0;u<c;u++){var h=o.readUshort(i,r);r+=2;var d=o.readUshort(i,r);r+=2;var f=o.readShort(i,r);r+=2,h!=l&&(s.glyph1.push(h),s.rval.push({glyph2:[],vals:[]}));var g=s.rval[s.rval.length-1];g.glyph2.push(d),g.vals.push(f),l=h}return r},e.loca={},e.loca.parse=function(i,r,s,o){var l=e._bin,c=[],u=o.head.indexToLocFormat,h=o.maxp.numGlyphs+1;if(u==0)for(var d=0;d<h;d++)c.push(l.readUshort(i,r+(d<<1))<<1);if(u==1)for(d=0;d<h;d++)c.push(l.readUint(i,r+(d<<2)));return c},e.maxp={},e.maxp.parse=function(i,r,s){var o=e._bin,l={},c=o.readUint(i,r);return r+=4,l.numGlyphs=o.readUshort(i,r),r+=2,c==65536&&(l.maxPoints=o.readUshort(i,r),r+=2,l.maxContours=o.readUshort(i,r),r+=2,l.maxCompositePoints=o.readUshort(i,r),r+=2,l.maxCompositeContours=o.readUshort(i,r),r+=2,l.maxZones=o.readUshort(i,r),r+=2,l.maxTwilightPoints=o.readUshort(i,r),r+=2,l.maxStorage=o.readUshort(i,r),r+=2,l.maxFunctionDefs=o.readUshort(i,r),r+=2,l.maxInstructionDefs=o.readUshort(i,r),r+=2,l.maxStackElements=o.readUshort(i,r),r+=2,l.maxSizeOfInstructions=o.readUshort(i,r),r+=2,l.maxComponentElements=o.readUshort(i,r),r+=2,l.maxComponentDepth=o.readUshort(i,r),r+=2),l},e.name={},e.name.parse=function(i,r,s){var o=e._bin,l={};o.readUshort(i,r),r+=2;var c=o.readUshort(i,r);r+=2,o.readUshort(i,r);for(var u,h=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],d=r+=2,f=0;f<c;f++){var g=o.readUshort(i,r);r+=2;var v=o.readUshort(i,r);r+=2;var p=o.readUshort(i,r);r+=2;var m=o.readUshort(i,r);r+=2;var b=o.readUshort(i,r);r+=2;var _=o.readUshort(i,r);r+=2;var M,S=h[m],E=d+12*c+_;if(g==0)M=o.readUnicode(i,E,b/2);else if(g==3&&v==0)M=o.readUnicode(i,E,b/2);else if(v==0)M=o.readASCII(i,E,b);else if(v==1)M=o.readUnicode(i,E,b/2);else if(v==3)M=o.readUnicode(i,E,b/2);else{if(g!=1)throw"unknown encoding "+v+", platformID: "+g;M=o.readASCII(i,E,b),console.debug("reading unknown MAC encoding "+v+" as ASCII")}var w="p"+g+","+p.toString(16);l[w]==null&&(l[w]={}),l[w][S!==void 0?S:m]=M,l[w]._lang=p}for(var U in l)if(l[U].postScriptName!=null&&l[U]._lang==1033)return l[U];for(var U in l)if(l[U].postScriptName!=null&&l[U]._lang==0)return l[U];for(var U in l)if(l[U].postScriptName!=null&&l[U]._lang==3084)return l[U];for(var U in l)if(l[U].postScriptName!=null)return l[U];for(var U in l){u=U;break}return console.debug("returning name table with languageID "+l[u]._lang),l[u]},e["OS/2"]={},e["OS/2"].parse=function(i,r,s){var o=e._bin.readUshort(i,r);r+=2;var l={};if(o==0)e["OS/2"].version0(i,r,l);else if(o==1)e["OS/2"].version1(i,r,l);else if(o==2||o==3||o==4)e["OS/2"].version2(i,r,l);else{if(o!=5)throw"unknown OS/2 table version: "+o;e["OS/2"].version5(i,r,l)}return l},e["OS/2"].version0=function(i,r,s){var o=e._bin;return s.xAvgCharWidth=o.readShort(i,r),r+=2,s.usWeightClass=o.readUshort(i,r),r+=2,s.usWidthClass=o.readUshort(i,r),r+=2,s.fsType=o.readUshort(i,r),r+=2,s.ySubscriptXSize=o.readShort(i,r),r+=2,s.ySubscriptYSize=o.readShort(i,r),r+=2,s.ySubscriptXOffset=o.readShort(i,r),r+=2,s.ySubscriptYOffset=o.readShort(i,r),r+=2,s.ySuperscriptXSize=o.readShort(i,r),r+=2,s.ySuperscriptYSize=o.readShort(i,r),r+=2,s.ySuperscriptXOffset=o.readShort(i,r),r+=2,s.ySuperscriptYOffset=o.readShort(i,r),r+=2,s.yStrikeoutSize=o.readShort(i,r),r+=2,s.yStrikeoutPosition=o.readShort(i,r),r+=2,s.sFamilyClass=o.readShort(i,r),r+=2,s.panose=o.readBytes(i,r,10),r+=10,s.ulUnicodeRange1=o.readUint(i,r),r+=4,s.ulUnicodeRange2=o.readUint(i,r),r+=4,s.ulUnicodeRange3=o.readUint(i,r),r+=4,s.ulUnicodeRange4=o.readUint(i,r),r+=4,s.achVendID=[o.readInt8(i,r),o.readInt8(i,r+1),o.readInt8(i,r+2),o.readInt8(i,r+3)],r+=4,s.fsSelection=o.readUshort(i,r),r+=2,s.usFirstCharIndex=o.readUshort(i,r),r+=2,s.usLastCharIndex=o.readUshort(i,r),r+=2,s.sTypoAscender=o.readShort(i,r),r+=2,s.sTypoDescender=o.readShort(i,r),r+=2,s.sTypoLineGap=o.readShort(i,r),r+=2,s.usWinAscent=o.readUshort(i,r),r+=2,s.usWinDescent=o.readUshort(i,r),r+=2},e["OS/2"].version1=function(i,r,s){var o=e._bin;return r=e["OS/2"].version0(i,r,s),s.ulCodePageRange1=o.readUint(i,r),r+=4,s.ulCodePageRange2=o.readUint(i,r),r+=4},e["OS/2"].version2=function(i,r,s){var o=e._bin;return r=e["OS/2"].version1(i,r,s),s.sxHeight=o.readShort(i,r),r+=2,s.sCapHeight=o.readShort(i,r),r+=2,s.usDefault=o.readUshort(i,r),r+=2,s.usBreak=o.readUshort(i,r),r+=2,s.usMaxContext=o.readUshort(i,r),r+=2},e["OS/2"].version5=function(i,r,s){var o=e._bin;return r=e["OS/2"].version2(i,r,s),s.usLowerOpticalPointSize=o.readUshort(i,r),r+=2,s.usUpperOpticalPointSize=o.readUshort(i,r),r+=2},e.post={},e.post.parse=function(i,r,s){var o=e._bin,l={};return l.version=o.readFixed(i,r),r+=4,l.italicAngle=o.readFixed(i,r),r+=4,l.underlinePosition=o.readShort(i,r),r+=2,l.underlineThickness=o.readShort(i,r),r+=2,l},e==null&&(e={}),e.U==null&&(e.U={}),e.U.codeToGlyph=function(i,r){var s=i.cmap,o=-1;if(s.p0e4!=null?o=s.p0e4:s.p3e1!=null?o=s.p3e1:s.p1e0!=null?o=s.p1e0:s.p0e3!=null&&(o=s.p0e3),o==-1)throw"no familiar platform and encoding!";var l=s.tables[o];if(l.format==0)return r>=l.map.length?0:l.map[r];if(l.format==4){for(var c=-1,u=0;u<l.endCount.length;u++)if(r<=l.endCount[u]){c=u;break}return c==-1||l.startCount[c]>r?0:65535&(l.idRangeOffset[c]!=0?l.glyphIdArray[r-l.startCount[c]+(l.idRangeOffset[c]>>1)-(l.idRangeOffset.length-c)]:r+l.idDelta[c])}if(l.format==12){if(r>l.groups[l.groups.length-1][1])return 0;for(u=0;u<l.groups.length;u++){var h=l.groups[u];if(h[0]<=r&&r<=h[1])return h[2]+(r-h[0])}return 0}throw"unknown cmap table format "+l.format},e.U.glyphToPath=function(i,r){var s={cmds:[],crds:[]};if(i.SVG&&i.SVG.entries[r]){var o=i.SVG.entries[r];return o==null?s:(typeof o=="string"&&(o=e.SVG.toPath(o),i.SVG.entries[r]=o),o)}if(i.CFF){var l={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:i.CFF.Private?i.CFF.Private.defaultWidthX:0,open:!1},c=i.CFF,u=i.CFF.Private;if(c.ROS){for(var h=0;c.FDSelect[h+2]<=r;)h+=2;u=c.FDArray[c.FDSelect[h+1]].Private}e.U._drawCFF(i.CFF.CharStrings[r],l,c,u,s)}else i.glyf&&e.U._drawGlyf(r,i,s);return s},e.U._drawGlyf=function(i,r,s){var o=r.glyf[i];o==null&&(o=r.glyf[i]=e.glyf._parseGlyf(r,i)),o!=null&&(o.noc>-1?e.U._simpleGlyph(o,s):e.U._compoGlyph(o,r,s))},e.U._simpleGlyph=function(i,r){for(var s=0;s<i.noc;s++){for(var o=s==0?0:i.endPts[s-1]+1,l=i.endPts[s],c=o;c<=l;c++){var u=c==o?l:c-1,h=c==l?o:c+1,d=1&i.flags[c],f=1&i.flags[u],g=1&i.flags[h],v=i.xs[c],p=i.ys[c];if(c==o)if(d){if(!f){e.U.P.moveTo(r,v,p);continue}e.U.P.moveTo(r,i.xs[u],i.ys[u])}else f?e.U.P.moveTo(r,i.xs[u],i.ys[u]):e.U.P.moveTo(r,(i.xs[u]+v)/2,(i.ys[u]+p)/2);d?f&&e.U.P.lineTo(r,v,p):g?e.U.P.qcurveTo(r,v,p,i.xs[h],i.ys[h]):e.U.P.qcurveTo(r,v,p,(v+i.xs[h])/2,(p+i.ys[h])/2)}e.U.P.closePath(r)}},e.U._compoGlyph=function(i,r,s){for(var o=0;o<i.parts.length;o++){var l={cmds:[],crds:[]},c=i.parts[o];e.U._drawGlyf(c.glyphIndex,r,l);for(var u=c.m,h=0;h<l.crds.length;h+=2){var d=l.crds[h],f=l.crds[h+1];s.crds.push(d*u.a+f*u.b+u.tx),s.crds.push(d*u.c+f*u.d+u.ty)}for(h=0;h<l.cmds.length;h++)s.cmds.push(l.cmds[h])}},e.U._getGlyphClass=function(i,r){var s=e._lctf.getInterval(r,i);return s==-1?0:r[s+2]},e.U._applySubs=function(i,r,s,o){for(var l=i.length-r-1,c=0;c<s.tabs.length;c++)if(s.tabs[c]!=null){var u,h=s.tabs[c];if(!h.coverage||(u=e._lctf.coverageIndex(h.coverage,i[r]))!=-1){if(s.ltype==1)i[r],h.fmt==1?i[r]=i[r]+h.delta:i[r]=h.newg[u];else if(s.ltype==4)for(var d=h.vals[u],f=0;f<d.length;f++){var g=d[f],v=g.chain.length;if(!(v>l)){for(var p=!0,m=0,b=0;b<v;b++){for(;i[r+m+(1+b)]==-1;)m++;g.chain[b]!=i[r+m+(1+b)]&&(p=!1)}if(p){for(i[r]=g.nglyph,b=0;b<v+m;b++)i[r+b+1]=-1;break}}}else if(s.ltype==5&&h.fmt==2)for(var _=e._lctf.getInterval(h.cDef,i[r]),M=h.cDef[_+2],S=h.scset[M],E=0;E<S.length;E++){var w=S[E],U=w.input;if(!(U.length>l)){for(p=!0,b=0;b<U.length;b++){var O=e._lctf.getInterval(h.cDef,i[r+1+b]);if(_==-1&&h.cDef[O+2]!=U[b]){p=!1;break}}if(p){var x=w.substLookupRecords;for(f=0;f<x.length;f+=2)x[f],x[f+1]}}}else if(s.ltype==6&&h.fmt==3){if(!e.U._glsCovered(i,h.backCvg,r-h.backCvg.length)||!e.U._glsCovered(i,h.inptCvg,r)||!e.U._glsCovered(i,h.ahedCvg,r+h.inptCvg.length))continue;var C=h.lookupRec;for(E=0;E<C.length;E+=2){_=C[E];var L=o[C[E+1]];e.U._applySubs(i,r+_,L,o)}}}}},e.U._glsCovered=function(i,r,s){for(var o=0;o<r.length;o++)if(e._lctf.coverageIndex(r[o],i[s+o])==-1)return!1;return!0},e.U.glyphsToPath=function(i,r,s){for(var o={cmds:[],crds:[]},l=0,c=0;c<r.length;c++){var u=r[c];if(u!=-1){for(var h=c<r.length-1&&r[c+1]!=-1?r[c+1]:0,d=e.U.glyphToPath(i,u),f=0;f<d.crds.length;f+=2)o.crds.push(d.crds[f]+l),o.crds.push(d.crds[f+1]);for(s&&o.cmds.push(s),f=0;f<d.cmds.length;f++)o.cmds.push(d.cmds[f]);s&&o.cmds.push("X"),l+=i.hmtx.aWidth[u],c<r.length-1&&(l+=e.U.getPairAdjustment(i,u,h))}}return o},e.U.P={},e.U.P.moveTo=function(i,r,s){i.cmds.push("M"),i.crds.push(r,s)},e.U.P.lineTo=function(i,r,s){i.cmds.push("L"),i.crds.push(r,s)},e.U.P.curveTo=function(i,r,s,o,l,c,u){i.cmds.push("C"),i.crds.push(r,s,o,l,c,u)},e.U.P.qcurveTo=function(i,r,s,o,l){i.cmds.push("Q"),i.crds.push(r,s,o,l)},e.U.P.closePath=function(i){i.cmds.push("Z")},e.U._drawCFF=function(i,r,s,o,l){for(var c=r.stack,u=r.nStems,h=r.haveWidth,d=r.width,f=r.open,g=0,v=r.x,p=r.y,m=0,b=0,_=0,M=0,S=0,E=0,w=0,U=0,O=0,x=0,C={val:0,size:0};g<i.length;){e.CFF.getCharString(i,g,C);var L=C.val;if(g+=C.size,L=="o1"||L=="o18")c.length%2!=0&&!h&&(d=c.shift()+o.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(L=="o3"||L=="o23")c.length%2!=0&&!h&&(d=c.shift()+o.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(L=="o4")c.length>1&&!h&&(d=c.shift()+o.nominalWidthX,h=!0),f&&e.U.P.closePath(l),p+=c.pop(),e.U.P.moveTo(l,v,p),f=!0;else if(L=="o5")for(;c.length>0;)v+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,v,p);else if(L=="o6"||L=="o7")for(var N=c.length,R=L=="o6",G=0;G<N;G++){var z=c.shift();R?v+=z:p+=z,R=!R,e.U.P.lineTo(l,v,p)}else if(L=="o8"||L=="o24"){N=c.length;for(var y=0;y+6<=N;)m=v+c.shift(),b=p+c.shift(),_=m+c.shift(),M=b+c.shift(),v=_+c.shift(),p=M+c.shift(),e.U.P.curveTo(l,m,b,_,M,v,p),y+=6;L=="o24"&&(v+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,v,p))}else{if(L=="o11")break;if(L=="o1234"||L=="o1235"||L=="o1236"||L=="o1237")L=="o1234"&&(b=p,_=(m=v+c.shift())+c.shift(),x=M=b+c.shift(),E=M,U=p,v=(w=(S=(O=_+c.shift())+c.shift())+c.shift())+c.shift(),e.U.P.curveTo(l,m,b,_,M,O,x),e.U.P.curveTo(l,S,E,w,U,v,p)),L=="o1235"&&(m=v+c.shift(),b=p+c.shift(),_=m+c.shift(),M=b+c.shift(),O=_+c.shift(),x=M+c.shift(),S=O+c.shift(),E=x+c.shift(),w=S+c.shift(),U=E+c.shift(),v=w+c.shift(),p=U+c.shift(),c.shift(),e.U.P.curveTo(l,m,b,_,M,O,x),e.U.P.curveTo(l,S,E,w,U,v,p)),L=="o1236"&&(m=v+c.shift(),b=p+c.shift(),_=m+c.shift(),x=M=b+c.shift(),E=M,w=(S=(O=_+c.shift())+c.shift())+c.shift(),U=E+c.shift(),v=w+c.shift(),e.U.P.curveTo(l,m,b,_,M,O,x),e.U.P.curveTo(l,S,E,w,U,v,p)),L=="o1237"&&(m=v+c.shift(),b=p+c.shift(),_=m+c.shift(),M=b+c.shift(),O=_+c.shift(),x=M+c.shift(),S=O+c.shift(),E=x+c.shift(),w=S+c.shift(),U=E+c.shift(),Math.abs(w-v)>Math.abs(U-p)?v=w+c.shift():p=U+c.shift(),e.U.P.curveTo(l,m,b,_,M,O,x),e.U.P.curveTo(l,S,E,w,U,v,p));else if(L=="o14"){if(c.length>0&&!h&&(d=c.shift()+s.nominalWidthX,h=!0),c.length==4){var Y=c.shift(),k=c.shift(),X=c.shift(),D=c.shift(),H=e.CFF.glyphBySE(s,X),j=e.CFF.glyphBySE(s,D);e.U._drawCFF(s.CharStrings[H],r,s,o,l),r.x=Y,r.y=k,e.U._drawCFF(s.CharStrings[j],r,s,o,l)}f&&(e.U.P.closePath(l),f=!1)}else if(L=="o19"||L=="o20")c.length%2!=0&&!h&&(d=c.shift()+o.nominalWidthX),u+=c.length>>1,c.length=0,h=!0,g+=u+7>>3;else if(L=="o21")c.length>2&&!h&&(d=c.shift()+o.nominalWidthX,h=!0),p+=c.pop(),v+=c.pop(),f&&e.U.P.closePath(l),e.U.P.moveTo(l,v,p),f=!0;else if(L=="o22")c.length>1&&!h&&(d=c.shift()+o.nominalWidthX,h=!0),v+=c.pop(),f&&e.U.P.closePath(l),e.U.P.moveTo(l,v,p),f=!0;else if(L=="o25"){for(;c.length>6;)v+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,v,p);m=v+c.shift(),b=p+c.shift(),_=m+c.shift(),M=b+c.shift(),v=_+c.shift(),p=M+c.shift(),e.U.P.curveTo(l,m,b,_,M,v,p)}else if(L=="o26")for(c.length%2&&(v+=c.shift());c.length>0;)m=v,b=p+c.shift(),v=_=m+c.shift(),p=(M=b+c.shift())+c.shift(),e.U.P.curveTo(l,m,b,_,M,v,p);else if(L=="o27")for(c.length%2&&(p+=c.shift());c.length>0;)b=p,_=(m=v+c.shift())+c.shift(),M=b+c.shift(),v=_+c.shift(),p=M,e.U.P.curveTo(l,m,b,_,M,v,p);else if(L=="o10"||L=="o29"){var I=L=="o10"?o:s;if(c.length==0)console.debug("error: empty stack");else{var B=c.pop(),J=I.Subrs[B+I.Bias];r.x=v,r.y=p,r.nStems=u,r.haveWidth=h,r.width=d,r.open=f,e.U._drawCFF(J,r,s,o,l),v=r.x,p=r.y,u=r.nStems,h=r.haveWidth,d=r.width,f=r.open}}else if(L=="o30"||L=="o31"){var W=c.length,$=(y=0,L=="o31");for(y+=W-(N=-3&W);y<N;)$?(b=p,_=(m=v+c.shift())+c.shift(),p=(M=b+c.shift())+c.shift(),N-y==5?(v=_+c.shift(),y++):v=_,$=!1):(m=v,b=p+c.shift(),_=m+c.shift(),M=b+c.shift(),v=_+c.shift(),N-y==5?(p=M+c.shift(),y++):p=M,$=!0),e.U.P.curveTo(l,m,b,_,M,v,p),y+=4}else{if((L+"").charAt(0)=="o")throw console.debug("Unknown operation: "+L,i),L;c.push(L)}}}r.x=v,r.y=p,r.nStems=u,r.haveWidth=h,r.width=d,r.open=f};var t=e,a={Typr:t};return n.Typr=t,n.default=a,Object.defineProperty(n,"__esModule",{value:!0}),n})({}).Typr}function lp(){return(function(n){var e=Uint8Array,t=Uint16Array,a=Uint32Array,i=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),r=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),s=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),o=function(L,N){for(var R=new t(31),G=0;G<31;++G)R[G]=N+=1<<L[G-1];var z=new a(R[30]);for(G=1;G<30;++G)for(var y=R[G];y<R[G+1];++y)z[y]=y-R[G]<<5|G;return[R,z]},l=o(i,2),c=l[0],u=l[1];c[28]=258,u[258]=28;for(var h=o(r,0)[0],d=new t(32768),f=0;f<32768;++f){var g=(43690&f)>>>1|(21845&f)<<1;g=(61680&(g=(52428&g)>>>2|(13107&g)<<2))>>>4|(3855&g)<<4,d[f]=((65280&g)>>>8|(255&g)<<8)>>>1}var v=function(L,N,R){for(var G=L.length,z=0,y=new t(N);z<G;++z)++y[L[z]-1];var Y,k=new t(N);for(z=0;z<N;++z)k[z]=k[z-1]+y[z-1]<<1;{Y=new t(1<<N);var X=15-N;for(z=0;z<G;++z)if(L[z])for(var D=z<<4|L[z],H=N-L[z],j=k[L[z]-1]++<<H,I=j|(1<<H)-1;j<=I;++j)Y[d[j]>>>X]=D}return Y},p=new e(288);for(f=0;f<144;++f)p[f]=8;for(f=144;f<256;++f)p[f]=9;for(f=256;f<280;++f)p[f]=7;for(f=280;f<288;++f)p[f]=8;var m=new e(32);for(f=0;f<32;++f)m[f]=5;var b=v(p,9),_=v(m,5),M=function(L){for(var N=L[0],R=1;R<L.length;++R)L[R]>N&&(N=L[R]);return N},S=function(L,N,R){var G=N/8|0;return(L[G]|L[G+1]<<8)>>(7&N)&R},E=function(L,N){var R=N/8|0;return(L[R]|L[R+1]<<8|L[R+2]<<16)>>(7&N)},w=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],U=function(L,N,R){var G=new Error(N||w[L]);if(G.code=L,Error.captureStackTrace&&Error.captureStackTrace(G,U),!R)throw G;return G},O=function(L,N,R){var G=L.length;if(!G||R&&!R.l&&G<5)return N||new e(0);var z=!N||R,y=!R||R.i;R||(R={}),N||(N=new e(3*G));var Y,k=function(Me){var Ce=N.length;if(Me>Ce){var Ue=new e(Math.max(2*Ce,Me));Ue.set(N),N=Ue}},X=R.f||0,D=R.p||0,H=R.b||0,j=R.l,I=R.d,B=R.m,J=R.n,W=8*G;do{if(!j){R.f=X=S(L,D,1);var $=S(L,D+1,3);if(D+=3,!$){var ee=L[(se=((Y=D)/8|0)+(7&Y&&1)+4)-4]|L[se-3]<<8,xe=se+ee;if(xe>G){y&&U(0);break}z&&k(H+ee),N.set(L.subarray(se,xe),H),R.b=H+=ee,R.p=D=8*xe;continue}if($==1)j=b,I=_,B=9,J=5;else if($==2){var oe=S(L,D,31)+257,F=S(L,D+10,15)+4,De=oe+S(L,D+5,31)+1;D+=14;for(var ge=new e(De),me=new e(19),de=0;de<F;++de)me[s[de]]=S(L,D+3*de,7);D+=3*F;var Se=M(me),ce=(1<<Se)-1,ve=v(me,Se);for(de=0;de<De;){var se,A=ve[S(L,D,ce)];if(D+=15&A,(se=A>>>4)<16)ge[de++]=se;else{var T=0,V=0;for(se==16?(V=3+S(L,D,3),D+=2,T=ge[de-1]):se==17?(V=3+S(L,D,7),D+=3):se==18&&(V=11+S(L,D,127),D+=7);V--;)ge[de++]=T}}var Z=ge.subarray(0,oe),ie=ge.subarray(oe);B=M(Z),J=M(ie),j=v(Z,B),I=v(ie,J)}else U(1);if(D>W){y&&U(0);break}}z&&k(H+131072);for(var te=(1<<B)-1,Re=(1<<J)-1,pe=D;;pe=D){var ue=(T=j[E(L,D)&te])>>>4;if((D+=15&T)>W){y&&U(0);break}if(T||U(2),ue<256)N[H++]=ue;else{if(ue==256){pe=D,j=null;break}var _e=ue-254;if(ue>264){var Oe=i[de=ue-257];_e=S(L,D,(1<<Oe)-1)+c[de],D+=Oe}var he=I[E(L,D)&Re],Xe=he>>>4;if(he||U(3),D+=15&he,ie=h[Xe],Xe>3&&(Oe=r[Xe],ie+=E(L,D)&(1<<Oe)-1,D+=Oe),D>W){y&&U(0);break}z&&k(H+131072);for(var Ee=H+_e;H<Ee;H+=4)N[H]=N[H-ie],N[H+1]=N[H+1-ie],N[H+2]=N[H+2-ie],N[H+3]=N[H+3-ie];H=Ee}}R.l=j,R.p=pe,R.b=H,j&&(X=1,R.m=B,R.d=I,R.n=J)}while(!X);return H==N.length?N:(function(Me,Ce,Ue){(Ue==null||Ue>Me.length)&&(Ue=Me.length);var Ge=new(Me instanceof t?t:Me instanceof a?a:e)(Ue-Ce);return Ge.set(Me.subarray(Ce,Ue)),Ge})(N,0,H)},x=new e(0),C=typeof TextDecoder<"u"&&new TextDecoder;try{C.decode(x,{stream:!0})}catch{}return n.convert_streams=function(L){var N=new DataView(L),R=0;function G(){var oe=N.getUint16(R);return R+=2,oe}function z(){var oe=N.getUint32(R);return R+=4,oe}function y(oe){ee.setUint16(xe,oe),xe+=2}function Y(oe){ee.setUint32(xe,oe),xe+=4}for(var k={signature:z(),flavor:z(),length:z(),numTables:G(),reserved:G(),totalSfntSize:z(),majorVersion:G(),minorVersion:G(),metaOffset:z(),metaLength:z(),metaOrigLength:z(),privOffset:z(),privLength:z()},X=0;Math.pow(2,X)<=k.numTables;)X++;X--;for(var D=16*Math.pow(2,X),H=16*k.numTables-D,j=12,I=[],B=0;B<k.numTables;B++)I.push({tag:z(),offset:z(),compLength:z(),origLength:z(),origChecksum:z()}),j+=16;var J,W=new Uint8Array(12+16*I.length+I.reduce(function(oe,F){return oe+F.origLength+4},0)),$=W.buffer,ee=new DataView($),xe=0;return Y(k.flavor),y(k.numTables),y(D),y(X),y(H),I.forEach(function(oe){Y(oe.tag),Y(oe.origChecksum),Y(j),Y(oe.origLength),oe.outOffset=j,(j+=oe.origLength)%4!=0&&(j+=4-j%4)}),I.forEach(function(oe){var F,De=L.slice(oe.offset,oe.offset+oe.compLength);if(oe.compLength!=oe.origLength){var ge=new Uint8Array(oe.origLength);F=new Uint8Array(De,2),O(F,ge)}else ge=new Uint8Array(De);W.set(ge,oe.outOffset);var me=0;(j=oe.outOffset+oe.origLength)%4!=0&&(me=4-j%4),W.set(new Uint8Array(me).buffer,oe.outOffset+oe.origLength),J=j+me}),$.slice(0,J)},Object.defineProperty(n,"__esModule",{value:!0}),n})({}).convert_streams}function cp(n,e){const t={M:2,L:2,Q:4,C:6,Z:0},a={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},i=1,r=2,s=4,o=8,l=16,c=32;let u;function h(w){if(!u){const U={R:r,L:i,D:s,C:l,U:c,T:o};u=new Map;for(let O in a){let x=0;a[O].split(",").forEach(C=>{let[L,N]=C.split("+");L=parseInt(L,36),N=N?parseInt(N,36):0,u.set(x+=L,U[O]);for(let R=N;R--;)u.set(++x,U[O])})}}return u.get(w)||c}const d=1,f=2,g=3,v=4,p=[null,"isol","init","fina","medi"];function m(w){const U=new Uint8Array(w.length);let O=c,x=d,C=-1;for(let L=0;L<w.length;L++){const N=w.codePointAt(L);let R=h(N)|0,G=d;R&o||(O&(i|s|l)?R&(r|s|l)?(G=g,(x===d||x===g)&&U[C]++):R&(i|c)&&(x===f||x===v)&&U[C]--:O&(r|c)&&(x===f||x===v)&&U[C]--,x=U[L]=G,O=R,C=L,N>65535&&L++)}return U}function b(w,U){const O=[];for(let C=0;C<U.length;C++){const L=U.codePointAt(C);L>65535&&C++,O.push(n.U.codeToGlyph(w,L))}const x=w.GSUB;if(x){const{lookupList:C,featureList:L}=x;let N;const R=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,G=[];L.forEach(z=>{if(R.test(z.tag))for(let y=0;y<z.tab.length;y++){if(G[z.tab[y]])continue;G[z.tab[y]]=!0;const Y=C[z.tab[y]],k=/^(isol|init|fina|medi)$/.test(z.tag);k&&!N&&(N=m(U));for(let X=0;X<O.length;X++)(!N||!k||p[N[X]]===z.tag)&&n.U._applySubs(O,X,Y,C)}})}return O}function _(w,U){const O=new Int16Array(U.length*3);let x=0;for(;x<U.length;x++){const R=U[x];if(R===-1)continue;O[x*3+2]=w.hmtx.aWidth[R];const G=w.GPOS;if(G){const z=G.lookupList;for(let y=0;y<z.length;y++){const Y=z[y];for(let k=0;k<Y.tabs.length;k++){const X=Y.tabs[k];if(Y.ltype===1){if(n._lctf.coverageIndex(X.coverage,R)!==-1&&X.pos){N(X.pos,x);break}}else if(Y.ltype===2){let D=null,H=C();if(H!==-1){const j=n._lctf.coverageIndex(X.coverage,U[H]);if(j!==-1){if(X.fmt===1){const I=X.pairsets[j];for(let B=0;B<I.length;B++)I[B].gid2===R&&(D=I[B])}else if(X.fmt===2){const I=n.U._getGlyphClass(U[H],X.classDef1),B=n.U._getGlyphClass(R,X.classDef2);D=X.matrix[I][B]}if(D){D.val1&&N(D.val1,H),D.val2&&N(D.val2,x);break}}}}else if(Y.ltype===4){const D=n._lctf.coverageIndex(X.markCoverage,R);if(D!==-1){const H=C(L),j=H===-1?-1:n._lctf.coverageIndex(X.baseCoverage,U[H]);if(j!==-1){const I=X.markArray[D],B=X.baseArray[j][I.markClass];O[x*3]=B.x-I.x+O[H*3]-O[H*3+2],O[x*3+1]=B.y-I.y+O[H*3+1];break}}}else if(Y.ltype===6){const D=n._lctf.coverageIndex(X.mark1Coverage,R);if(D!==-1){const H=C();if(H!==-1){const j=U[H];if(M(w,j)===3){const I=n._lctf.coverageIndex(X.mark2Coverage,j);if(I!==-1){const B=X.mark1Array[D],J=X.mark2Array[I][B.markClass];O[x*3]=J.x-B.x+O[H*3]-O[H*3+2],O[x*3+1]=J.y-B.y+O[H*3+1];break}}}}}}}}else if(w.kern&&!w.cff){const z=C();if(z!==-1){const y=w.kern.glyph1.indexOf(U[z]);if(y!==-1){const Y=w.kern.rval[y].glyph2.indexOf(R);Y!==-1&&(O[z*3+2]+=w.kern.rval[y].vals[Y])}}}}return O;function C(R){for(let G=x-1;G>=0;G--)if(U[G]!==-1&&(!R||R(U[G])))return G;return-1}function L(R){return M(w,R)===1}function N(R,G){for(let z=0;z<3;z++)O[G*3+z]+=R[z]||0}}function M(w,U){const O=w.GDEF&&w.GDEF.glyphClassDef;return O?n.U._getGlyphClass(U,O):0}function S(...w){for(let U=0;U<w.length;U++)if(typeof w[U]=="number")return w[U]}function E(w){const U=Object.create(null),O=w["OS/2"],x=w.hhea,C=w.head.unitsPerEm,L=S(O&&O.sTypoAscender,x&&x.ascender,C),N={unitsPerEm:C,ascender:L,descender:S(O&&O.sTypoDescender,x&&x.descender,0),capHeight:S(O&&O.sCapHeight,L),xHeight:S(O&&O.sxHeight,L),lineGap:S(O&&O.sTypoLineGap,x&&x.lineGap),supportsCodePoint(R){return n.U.codeToGlyph(w,R)>0},forEachGlyph(R,G,z,y){let Y=0;const k=1/N.unitsPerEm*G,X=b(w,R);let D=0;const H=_(w,X);return X.forEach((j,I)=>{if(j!==-1){let B=U[j];if(!B){const{cmds:J,crds:W}=n.U.glyphToPath(w,j);let $="",ee=0;for(let ge=0,me=J.length;ge<me;ge++){const de=t[J[ge]];$+=J[ge];for(let Se=1;Se<=de;Se++)$+=(Se>1?",":"")+W[ee++]}let xe,oe,F,De;if(W.length){xe=oe=1/0,F=De=-1/0;for(let ge=0,me=W.length;ge<me;ge+=2){let de=W[ge],Se=W[ge+1];de<xe&&(xe=de),Se<oe&&(oe=Se),de>F&&(F=de),Se>De&&(De=Se)}}else xe=F=oe=De=0;B=U[j]={index:j,advanceWidth:w.hmtx.aWidth[j],xMin:xe,yMin:oe,xMax:F,yMax:De,path:$}}y.call(null,B,Y+H[I*3]*k,H[I*3+1]*k,D),Y+=H[I*3+2]*k,z&&(Y+=z*G)}D+=R.codePointAt(D)>65535?2:1}),Y}};return N}return function(w){const U=new Uint8Array(w,0,4),O=n._bin.readASCII(U,0,4);if(O==="wOFF")w=e(w);else if(O==="wOF2")throw new Error("woff2 fonts not supported");return E(n.parse(w)[0])}}const up=yr({name:"Typr Font Parser",dependencies:[sp,lp,cp],init(n,e,t){const a=n(),i=e();return t(a,i)}});function hp(){return(function(n){var e=function(){this.buckets=new Map};e.prototype.add=function(_){var M=_>>5;this.buckets.set(M,(this.buckets.get(M)||0)|1<<(31&_))},e.prototype.has=function(_){var M=this.buckets.get(_>>5);return M!==void 0&&(M&1<<(31&_))!=0},e.prototype.serialize=function(){var _=[];return this.buckets.forEach(function(M,S){_.push((+S).toString(36)+":"+M.toString(36))}),_.join(",")},e.prototype.deserialize=function(_){var M=this;this.buckets.clear(),_.split(",").forEach(function(S){var E=S.split(":");M.buckets.set(parseInt(E[0],36),parseInt(E[1],36))})};var t=Math.pow(2,8),a=t-1,i=~a;function r(_){var M=(function(E){return E&i})(_).toString(16),S=(function(E){return(E&i)+t-1})(_).toString(16);return"codepoint-index/plane"+(_>>16)+"/"+M+"-"+S+".json"}function s(_,M){var S=_&a,E=M.codePointAt(S/6|0);return((E=(E||48)-48)&1<<S%6)!=0}function o(_,M){var S;(S=_,S.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(E){return E.split("-").map(function(w){return parseInt(w.trim(),16)})})).forEach(function(E){var w=E[0],U=E[1];U===void 0&&(U=w),M(w,U)})}function l(_,M){o(_,function(S,E){for(var w=S;w<=E;w++)M(w)})}var c={},u={},h=new WeakMap,d="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function f(_){var M=h.get(_);return M||(M=new e,l(_.ranges,function(S){return M.add(S)}),h.set(_,M)),M}var g,v=new Map;function p(_,M,S){return _[M]?M:_[S]?S:(function(E){for(var w in E)return w})(_)}function m(_,M){var S=M;if(!_.includes(S)){S=1/0;for(var E=0;E<_.length;E++)Math.abs(_[E]-M)<Math.abs(S-M)&&(S=_[E])}return S}function b(_){return g||(g=new Set,l("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(M){g.add(M)})),g.has(_)}return n.CodePointSet=e,n.clearCache=function(){c={},u={}},n.getFontsForString=function(_,M){M===void 0&&(M={});var S,E=M.lang;E===void 0&&(E=/\p{Script=Hangul}/u.test(S=_)?"ko":/\p{Script=Hiragana}|\p{Script=Katakana}/u.test(S)?"ja":"en");var w=M.category;w===void 0&&(w="sans-serif");var U=M.style;U===void 0&&(U="normal");var O=M.weight;O===void 0&&(O=400);var x=(M.dataUrl||d).replace(/\/$/g,""),C=new Map,L=new Uint8Array(_.length),N={},R={},G=new Array(_.length),z=new Map,y=!1;function Y(D){var H=v.get(D);return H||(H=fetch(x+"/"+D).then(function(j){if(!j.ok)throw new Error(j.statusText);return j.json().then(function(I){if(!Array.isArray(I)||I[0]!==1)throw new Error("Incorrect schema version; need 1, got "+I[0]);return I[1]})}).catch(function(j){if(x!==d)return y||(console.error('unicode-font-resolver: Failed loading from dataUrl "'+x+'", trying default CDN. '+j.message),y=!0),x=d,v.delete(D),Y(D);throw j}),v.set(D,H)),H}for(var k=function(D){var H=_.codePointAt(D),j=r(H);G[D]=j,c[j]||z.has(j)||z.set(j,Y(j).then(function(I){c[j]=I})),H>65535&&(D++,X=D)},X=0;X<_.length;X++)k(X);return Promise.all(z.values()).then(function(){z.clear();for(var D=function(j){var I=_.codePointAt(j),B=null,J=c[G[j]],W=void 0;for(var $ in J){var ee=R[$];if(ee===void 0&&(ee=R[$]=new RegExp($).test(E||"en")),ee){for(var xe in W=$,J[$])if(s(I,J[$][xe])){B=xe;break}break}}if(!B){e:for(var oe in J)if(oe!==W){for(var F in J[oe])if(s(I,J[oe][F])){B=F;break e}}}B||(console.debug("No font coverage for U+"+I.toString(16)),B="latin"),G[j]=B,u[B]||z.has(B)||z.set(B,Y("font-meta/"+B+".json").then(function(De){u[B]=De})),I>65535&&(j++,H=j)},H=0;H<_.length;H++)D(H);return Promise.all(z.values())}).then(function(){for(var D,H=null,j=0;j<_.length;j++){var I=_.codePointAt(j);if(H&&(b(I)||f(H).has(I)))L[j]=L[j-1];else{H=u[G[j]];var B=N[H.id];if(!B){var J=H.typeforms,W=p(J,w,"sans-serif"),$=p(J[W],U,"normal"),ee=m((D=J[W])===null||D===void 0?void 0:D[$],O);B=N[H.id]=x+"/font-files/"+H.id+"/"+W+"."+$+"."+ee+".woff"}var xe=C.get(B);xe==null&&(xe=C.size,C.set(B,xe)),L[j]=xe}I>65535&&(j++,L[j]=L[j-1])}return{fontUrls:Array.from(C.keys()),chars:L}})},Object.defineProperty(n,"__esModule",{value:!0}),n})({})}function dp(n,e){const t=Object.create(null),a=Object.create(null);function i(s,o){const l=c=>{console.error(`Failure loading font ${s}`,c)};try{const c=new XMLHttpRequest;c.open("get",s,!0),c.responseType="arraybuffer",c.onload=function(){if(c.status>=400)l(new Error(c.statusText));else if(c.status>0)try{const u=n(c.response);u.src=s,o(u)}catch(u){l(u)}},c.onerror=l,c.send()}catch(c){l(c)}}function r(s,o){let l=t[s];l?o(l):a[s]?a[s].push(o):(a[s]=[o],i(s,c=>{c.src=s,t[s]=c,a[s].forEach(u=>u(c)),delete a[s]}))}return function(s,o,{lang:l,fonts:c=[],style:u="normal",weight:h="normal",unicodeFontsURL:d}={}){const f=new Uint8Array(s.length),g=[];s.length||b();const v=new Map,p=[];if(u!=="italic"&&(u="normal"),typeof h!="number"&&(h=h==="bold"?700:400),c&&!Array.isArray(c)&&(c=[c]),c=c.slice().filter(M=>!M.lang||M.lang.test(l)).reverse(),c.length){let M=0;(function S(E=0){for(let w=E,U=s.length;w<U;w++){const O=s.codePointAt(w);if(M===1&&g[f[w-1]].supportsCodePoint(O)||w>0&&/\s/.test(s[w]))f[w]=f[w-1],M===2&&(p[p.length-1][1]=w);else for(let x=f[w],C=c.length;x<=C;x++)if(x===C){const L=M===2?p[p.length-1]:p[p.length]=[w,w];L[1]=w,M=2}else{f[w]=x;const{src:L,unicodeRange:N}=c[x];if(!N||_(O,N)){const R=t[L];if(!R){r(L,()=>{S(w)});return}if(R.supportsCodePoint(O)){let G=v.get(R);typeof G!="number"&&(G=g.length,g.push(R),v.set(R,G)),f[w]=G,M=1;break}}}O>65535&&w+1<U&&(f[w+1]=f[w],w++,M===2&&(p[p.length-1][1]=w))}m()})()}else p.push([0,s.length-1]),m();function m(){if(p.length){const M=p.map(S=>s.substring(S[0],S[1]+1)).join(`
`);e.getFontsForString(M,{lang:l||void 0,style:u,weight:h,dataUrl:d}).then(({fontUrls:S,chars:E})=>{const w=g.length;let U=0;p.forEach(x=>{for(let C=0,L=x[1]-x[0];C<=L;C++)f[x[0]+C]=E[U++]+w;U++});let O=0;S.forEach((x,C)=>{r(x,L=>{g[C+w]=L,++O===S.length&&b()})})})}else b()}function b(){o({chars:f,fonts:g})}function _(M,S){for(let E=0;E<S.length;E++){const[w,U=w]=S[E];if(w<=M&&M<=U)return!0}return!1}}}const fp=yr({name:"FontResolver",dependencies:[dp,up,hp],init(n,e,t){return n(e,t())}});function pp(n,e){const t=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,a="[^\\S\\u00A0]",i=new RegExp(`${a}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function r({text:f,lang:g,fonts:v,style:p,weight:m,preResolvedFonts:b,unicodeFontsURL:_},M){const S=({chars:E,fonts:w})=>{let U,O;const x=[];for(let C=0;C<E.length;C++)E[C]!==O?(O=E[C],x.push(U={start:C,end:C,fontObj:w[E[C]]})):U.end=C;M(x)};b?S(b):n(f,S,{lang:g,fonts:v,style:p,weight:m,unicodeFontsURL:_})}function s({text:f="",font:g,lang:v,sdfGlyphSize:p=64,fontSize:m=400,fontWeight:b=1,fontStyle:_="normal",letterSpacing:M=0,lineHeight:S="normal",maxWidth:E=1/0,direction:w,textAlign:U="left",textIndent:O=0,whiteSpace:x="normal",overflowWrap:C="normal",anchorX:L=0,anchorY:N=0,metricsOnly:R=!1,unicodeFontsURL:G,preResolvedFonts:z=null,includeCaretPositions:y=!1,chunkedBoundsSize:Y=8192,colorRanges:k=null},X){const D=u(),H={fontLoad:0,typesetting:0};f.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),f=f.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),m=+m,M=+M,E=+E,S=S||"normal",O=+O,r({text:f,lang:v,style:_,weight:b,fonts:typeof g=="string"?[{src:g}]:g,unicodeFontsURL:G,preResolvedFonts:z},j=>{H.fontLoad=u()-D;const I=isFinite(E);let B=null,J=null,W=null,$=null,ee=null,xe=null,oe=null,F=null,De=0,ge=0,me=x!=="nowrap";const de=new Map,Se=u();let ce=O,ve=0,se=new h;const A=[se];j.forEach(te=>{const{fontObj:Re}=te,{ascender:pe,descender:ue,unitsPerEm:_e,lineGap:Oe,capHeight:he,xHeight:Xe}=Re;let Ee=de.get(Re);if(!Ee){const Ae=m/_e,Ne=S==="normal"?(pe-ue+Oe)*Ae:S*m,q=(Ne-(pe-ue)*Ae)/2,ye=Math.min(Ne,(pe-ue)*Ae),K=(pe+ue)/2*Ae+ye/2;Ee={index:de.size,src:Re.src,fontObj:Re,fontSizeMult:Ae,unitsPerEm:_e,ascender:pe*Ae,descender:ue*Ae,capHeight:he*Ae,xHeight:Xe*Ae,lineHeight:Ne,baseline:-q-pe*Ae,caretTop:K,caretBottom:K-ye},de.set(Re,Ee)}const{fontSizeMult:Me}=Ee,Ce=f.slice(te.start,te.end+1);let Ue,Ge;Re.forEachGlyph(Ce,m,M,(Ae,Ne,q,ye)=>{Ne+=ve,ye+=te.start,Ue=Ne,Ge=Ae;const K=f.charAt(ye),we=Ae.advanceWidth*Me,Te=se.count;let Ie;if("isEmpty"in Ae||(Ae.isWhitespace=!!K&&new RegExp(a).test(K),Ae.canBreakAfter=!!K&&i.test(K),Ae.isEmpty=Ae.xMin===Ae.xMax||Ae.yMin===Ae.yMax||t.test(K)),!Ae.isWhitespace&&!Ae.isEmpty&&ge++,me&&I&&!Ae.isWhitespace&&Ne+we+ce>E&&Te){if(se.glyphAt(Te-1).glyphObj.canBreakAfter)Ie=new h,ce=-Ne;else for(let Je=Te;Je--;)if(Je===0&&C==="break-word"){Ie=new h,ce=-Ne;break}else if(se.glyphAt(Je).glyphObj.canBreakAfter){Ie=se.splitAt(Je+1);const tt=Ie.glyphAt(0).x;ce-=tt;for(let He=Ie.count;He--;)Ie.glyphAt(He).x-=tt;break}Ie&&(se.isSoftWrapped=!0,se=Ie,A.push(se),De=E)}let ke=se.glyphAt(se.count);ke.glyphObj=Ae,ke.x=Ne+ce,ke.y=q,ke.width=we,ke.charIndex=ye,ke.fontData=Ee,K===`
`&&(se=new h,A.push(se),ce=-(Ne+we+M*m)+O)}),ve=Ue+Ge.advanceWidth*Me+M*m});let T=0;A.forEach(te=>{let Re=!0;for(let pe=te.count;pe--;){const ue=te.glyphAt(pe);Re&&!ue.glyphObj.isWhitespace&&(te.width=ue.x+ue.width,te.width>De&&(De=te.width),Re=!1);let{lineHeight:_e,capHeight:Oe,xHeight:he,baseline:Xe}=ue.fontData;_e>te.lineHeight&&(te.lineHeight=_e);const Ee=Xe-te.baseline;Ee<0&&(te.baseline+=Ee,te.cap+=Ee,te.ex+=Ee),te.cap=Math.max(te.cap,te.baseline+Oe),te.ex=Math.max(te.ex,te.baseline+he)}te.baseline-=T,te.cap-=T,te.ex-=T,T+=te.lineHeight});let V=0,Z=0;if(L&&(typeof L=="number"?V=-L:typeof L=="string"&&(V=-De*(L==="left"?0:L==="center"?.5:L==="right"?1:l(L)))),N&&(typeof N=="number"?Z=-N:typeof N=="string"&&(Z=N==="top"?0:N==="top-baseline"?-A[0].baseline:N==="top-cap"?-A[0].cap:N==="top-ex"?-A[0].ex:N==="middle"?T/2:N==="bottom"?T:N==="bottom-baseline"?-A[A.length-1].baseline:l(N)*T)),!R){const te=e.getEmbeddingLevels(f,w);B=new Uint16Array(ge),J=new Uint8Array(ge),W=new Float32Array(ge*2),$={},oe=[1/0,1/0,-1/0,-1/0],F=[],y&&(xe=new Float32Array(f.length*4)),k&&(ee=new Uint8Array(ge*3));let Re=0,pe=-1,ue=-1,_e,Oe;if(A.forEach((he,Xe)=>{let{count:Ee,width:Me}=he;if(Ee>0){let Ce=0;for(let ye=Ee;ye--&&he.glyphAt(ye).glyphObj.isWhitespace;)Ce++;let Ue=0,Ge=0;if(U==="center")Ue=(De-Me)/2;else if(U==="right")Ue=De-Me;else if(U==="justify"&&he.isSoftWrapped){let ye=0;for(let K=Ee-Ce;K--;)he.glyphAt(K).glyphObj.isWhitespace&&ye++;Ge=(De-Me)/ye}if(Ge||Ue){let ye=0;for(let K=0;K<Ee;K++){let we=he.glyphAt(K);const Te=we.glyphObj;we.x+=Ue+ye,Ge!==0&&Te.isWhitespace&&K<Ee-Ce&&(ye+=Ge,we.width+=Ge)}}const Ae=e.getReorderSegments(f,te,he.glyphAt(0).charIndex,he.glyphAt(he.count-1).charIndex);for(let ye=0;ye<Ae.length;ye++){const[K,we]=Ae[ye];let Te=1/0,Ie=-1/0;for(let ke=0;ke<Ee;ke++)if(he.glyphAt(ke).charIndex>=K){let Je=ke,tt=ke;for(;tt<Ee;tt++){let He=he.glyphAt(tt);if(He.charIndex>we)break;tt<Ee-Ce&&(Te=Math.min(Te,He.x),Ie=Math.max(Ie,He.x+He.width))}for(let He=Je;He<tt;He++){const nt=he.glyphAt(He);nt.x=Ie-(nt.x+nt.width-Te)}break}}let Ne;const q=ye=>Ne=ye;for(let ye=0;ye<Ee;ye++){const K=he.glyphAt(ye);Ne=K.glyphObj;const we=Ne.index,Te=te.levels[K.charIndex]&1;if(Te){const Ie=e.getMirroredCharacter(f[K.charIndex]);Ie&&K.fontData.fontObj.forEachGlyph(Ie,0,0,q)}if(y){const{charIndex:Ie,fontData:ke}=K,Je=K.x+V,tt=K.x+K.width+V;xe[Ie*4]=Te?tt:Je,xe[Ie*4+1]=Te?Je:tt,xe[Ie*4+2]=he.baseline+ke.caretBottom+Z,xe[Ie*4+3]=he.baseline+ke.caretTop+Z;const He=Ie-pe;He>1&&c(xe,pe,He),pe=Ie}if(k){const{charIndex:Ie}=K;for(;Ie>ue;)ue++,k.hasOwnProperty(ue)&&(Oe=k[ue])}if(!Ne.isWhitespace&&!Ne.isEmpty){const Ie=Re++,{fontSizeMult:ke,src:Je,index:tt}=K.fontData,He=$[Je]||($[Je]={});He[we]||(He[we]={path:Ne.path,pathBounds:[Ne.xMin,Ne.yMin,Ne.xMax,Ne.yMax]});const nt=K.x+V,xt=K.y+he.baseline+Z;W[Ie*2]=nt,W[Ie*2+1]=xt;const qt=nt+Ne.xMin*ke,Yt=xt+Ne.yMin*ke,zt=nt+Ne.xMax*ke,ni=xt+Ne.yMax*ke;qt<oe[0]&&(oe[0]=qt),Yt<oe[1]&&(oe[1]=Yt),zt>oe[2]&&(oe[2]=zt),ni>oe[3]&&(oe[3]=ni),Ie%Y===0&&(_e={start:Ie,end:Ie,rect:[1/0,1/0,-1/0,-1/0]},F.push(_e)),_e.end++;const yt=_e.rect;if(qt<yt[0]&&(yt[0]=qt),Yt<yt[1]&&(yt[1]=Yt),zt>yt[2]&&(yt[2]=zt),ni>yt[3]&&(yt[3]=ni),B[Ie]=we,J[Ie]=tt,k){const kt=Ie*3;ee[kt]=Oe>>16&255,ee[kt+1]=Oe>>8&255,ee[kt+2]=Oe&255}}}}}),xe){const he=f.length-pe;he>1&&c(xe,pe,he)}}const ie=[];de.forEach(({index:te,src:Re,unitsPerEm:pe,ascender:ue,descender:_e,lineHeight:Oe,capHeight:he,xHeight:Xe})=>{ie[te]={src:Re,unitsPerEm:pe,ascender:ue,descender:_e,lineHeight:Oe,capHeight:he,xHeight:Xe}}),H.typesetting=u()-Se,X({glyphIds:B,glyphFontIndices:J,glyphPositions:W,glyphData:$,fontData:ie,caretPositions:xe,glyphColors:ee,chunkedBounds:F,fontSize:m,topBaseline:Z+A[0].baseline,blockBounds:[V,Z-T,V+De,Z],visibleBounds:oe,timings:H})})}function o(f,g){s({...f,metricsOnly:!0},v=>{const[p,m,b,_]=v.blockBounds;g({width:b-p,height:_-m})})}function l(f){let g=f.match(/^([\d.]+)%$/),v=g?parseFloat(g[1]):NaN;return isNaN(v)?0:v/100}function c(f,g,v){const p=f[g*4],m=f[g*4+1],b=f[g*4+2],_=f[g*4+3],M=(m-p)/v;for(let S=0;S<v;S++){const E=(g+S)*4;f[E]=p+M*S,f[E+1]=p+M*(S+1),f[E+2]=b,f[E+3]=_}}function u(){return(self.performance||Date).now()}function h(){this.data=[]}const d=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/d.length)},glyphAt(f){let g=h.flyweight;return g.data=this.data,g.index=f,g},splitAt(f){let g=new h;return g.data=this.data.splice(f*d.length),g}},h.flyweight=d.reduce((f,g,v,p)=>(Object.defineProperty(f,g,{get(){return this.data[this.index*d.length+v]},set(m){this.data[this.index*d.length+v]=m}}),f),{data:null,index:0}),{typeset:s,measure:o}}const Xi=()=>(self.performance||Date).now(),Ha=zs();let Ws;function mp(n,e,t,a,i,r,s,o,l,c,u=!0){return u?vp(n,e,t,a,i,r,s,o,l,c).then(null,h=>(Ws||(console.warn("WebGL SDF generation failed, falling back to JS",h),Ws=!0),js(n,e,t,a,i,r,s,o,l,c))):js(n,e,t,a,i,r,s,o,l,c)}const Va=[],gp=5;let Xn=0;function Xs(){const n=Xi();for(;Va.length&&Xi()-n<gp;)Va.shift()();Xn=Va.length?setTimeout(Xs,0):0}const vp=(...n)=>new Promise((e,t)=>{Va.push(()=>{const a=Xi();try{Ha.webgl.generateIntoCanvas(...n),e({timing:Xi()-a})}catch(i){t(i)}}),Xn||(Xn=setTimeout(Xs,0))}),_p=4,xp=2e3,qs={};let yp=0;function js(n,e,t,a,i,r,s,o,l,c){const u="TroikaTextSDFGenerator_JS_"+yp++%_p;let h=qs[u];return h||(h=qs[u]={workerModule:yr({name:u,workerId:u,dependencies:[zs,Xi],init(d,f){const g=d().javascript.generate;return function(...v){const p=f();return{textureData:g(...v),timing:f()-p}}},getTransferables(d){return[d.textureData.buffer]}}),requests:0,idleTimer:null}),h.requests++,clearTimeout(h.idleTimer),h.workerModule(n,e,t,a,i,r).then(({textureData:d,timing:f})=>{const g=Xi(),v=new Uint8Array(d.length*4);for(let p=0;p<d.length;p++)v[p*4+c]=d[p];return Ha.webglUtils.renderImageData(s,v,o,l,n,e,1<<3-c),f+=Xi()-g,--h.requests===0&&(h.idleTimer=setTimeout(()=>{Zf(u)},xp)),{timing:f}})}function bp(n){n._warm||(Ha.webgl.isSupported(n),n._warm=!0)}const Sp=Ha.webglUtils.resizeWebGLCanvasWithoutClearing,Jr={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},Mp=new fe;function br(){return(self.performance||Date).now()}const Ys=Object.create(null);function Tp(n,e){n=Ep({},n);const t=br(),a=[];if(n.font&&a.push({label:"user",src:Ap(n.font)}),n.font=a,n.text=""+n.text,n.sdfGlyphSize=n.sdfGlyphSize||Jr.sdfGlyphSize,n.unicodeFontsURL=n.unicodeFontsURL||Jr.unicodeFontsURL,n.colorRanges!=null){let h={};for(let d in n.colorRanges)if(n.colorRanges.hasOwnProperty(d)){let f=n.colorRanges[d];typeof f!="number"&&(f=Mp.set(f).getHex()),h[d]=f}n.colorRanges=h}Object.freeze(n);const{textureWidth:i,sdfExponent:r}=Jr,{sdfGlyphSize:s}=n,o=i/s*4;let l=Ys[s];if(!l){const h=document.createElement("canvas");h.width=i,h.height=s*256/o,l=Ys[s]={glyphCount:0,sdfGlyphSize:s,sdfCanvas:h,sdfTexture:new Mt(h,void 0,void 0,void 0,1006,1006),contextLost:!1,glyphsByFont:new Map},l.sdfTexture.generateMipmaps=!1,wp(l)}const{sdfTexture:c,sdfCanvas:u}=l;Zs(n).then(h=>{const{glyphIds:d,glyphFontIndices:f,fontData:g,glyphPositions:v,fontSize:p,timings:m}=h,b=[],_=new Float32Array(d.length*4);let M=0,S=0;const E=br(),w=g.map(L=>{let N=l.glyphsByFont.get(L.src);return N||l.glyphsByFont.set(L.src,N=new Map),N});d.forEach((L,N)=>{const R=f[N],{src:G,unitsPerEm:z}=g[R];let y=w[R].get(L);if(!y){const{path:H,pathBounds:j}=h.glyphData[G][L],I=Math.max(j[2]-j[0],j[3]-j[1])/s*(Jr.sdfMargin*s+.5),B=l.glyphCount++,J=[j[0]-I,j[1]-I,j[2]+I,j[3]+I];w[R].set(L,y={path:H,atlasIndex:B,sdfViewBox:J}),b.push(y)}const{sdfViewBox:Y}=y,k=v[S++],X=v[S++],D=p/z;_[M++]=k+Y[0]*D,_[M++]=X+Y[1]*D,_[M++]=k+Y[2]*D,_[M++]=X+Y[3]*D,d[N]=y.atlasIndex}),m.quads=(m.quads||0)+(br()-E);const U=br();m.sdf={};const O=u.height,x=Math.ceil(l.glyphCount/o),C=Math.pow(2,Math.ceil(Math.log2(x*s)));C>O&&(console.info(`Increasing SDF texture size ${O}->${C}`),Sp(u,i,C),c.dispose()),Promise.all(b.map(L=>$s(L,l,n.gpuAccelerateSDF).then(({timing:N})=>{m.sdf[L.atlasIndex]=N}))).then(()=>{b.length&&!l.contextLost&&(Ks(l),c.needsUpdate=!0),m.sdfTotal=br()-U,m.total=br()-t,e(Object.freeze({parameters:n,sdfTexture:c,sdfGlyphSize:s,sdfExponent:r,glyphBounds:_,glyphAtlasIndices:d,glyphColors:h.glyphColors,caretPositions:h.caretPositions,chunkedBounds:h.chunkedBounds,ascender:h.ascender,descender:h.descender,lineHeight:h.lineHeight,capHeight:h.capHeight,xHeight:h.xHeight,topBaseline:h.topBaseline,blockBounds:h.blockBounds,visibleBounds:h.visibleBounds,timings:h.timings}))})}),Promise.resolve().then(()=>{l.contextLost||bp(u)})}function $s({path:n,atlasIndex:e,sdfViewBox:t},{sdfGlyphSize:a,sdfCanvas:i,contextLost:r},s){if(r)return Promise.resolve({timing:-1});const{textureWidth:o,sdfExponent:l}=Jr,c=Math.max(t[2]-t[0],t[3]-t[1]),u=Math.floor(e/4),h=u%(o/a)*a,d=Math.floor(u/(o/a))*a,f=e%4;return mp(a,a,n,t,c,l,i,h,d,f,s)}function wp(n){const e=n.sdfCanvas;e.addEventListener("webglcontextlost",t=>{console.log("Context Lost",t),t.preventDefault(),n.contextLost=!0}),e.addEventListener("webglcontextrestored",t=>{console.log("Context Restored",t),n.contextLost=!1;const a=[];n.glyphsByFont.forEach(i=>{i.forEach(r=>{a.push($s(r,n,!0))})}),Promise.all(a).then(()=>{Ks(n),n.sdfTexture.needsUpdate=!0})})}function Ep(n,e){for(let t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}let Wa;function Ap(n){return Wa||(Wa=typeof document>"u"?{}:document.createElement("a")),Wa.href=n,Wa.href}function Ks(n){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:e,sdfTexture:t}=n,{width:a,height:i}=e,r=n.sdfCanvas.getContext("webgl");let s=t.image.data;(!s||s.length!==a*i*4)&&(s=new Uint8Array(a*i*4),t.image={width:a,height:i,data:s},t.flipY=!1,t.isDataTexture=!0),r.readPixels(0,0,a,i,r.RGBA,r.UNSIGNED_BYTE,s)}}const Cp=yr({name:"Typesetter",dependencies:[pp,fp,Jf],init(n,e,t){return n(e,t())}}),Zs=yr({name:"Typesetter",dependencies:[Cp],init(n){return function(e){return new Promise(t=>{n.typeset(e,t)})}},getTransferables(n){const e=[];for(let t in n)n[t]&&n[t].buffer&&e.push(n[t].buffer);return e}});Zs.onMainThread;const Qs={};function Rp(n){let e=Qs[n];return e||(e=Qs[n]=new et(1,1,n,n).translate(.5,.5,0)),e}const Up="aTroikaGlyphBounds",Js="aTroikaGlyphIndex",Pp="aTroikaGlyphColor";class Lp extends If{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new Fi,this.boundingBox=new ui}computeBoundingSphere(){}computeBoundingBox(){}set detail(e){if(e!==this._detail){this._detail=e,(typeof e!="number"||e<1)&&(e=1);let t=Rp(e);["position","normal","uv"].forEach(a=>{this.attributes[a]=t.attributes[a].clone()}),this.setIndex(t.getIndex().clone())}}get detail(){return this._detail}set curveRadius(e){e!==this._curveRadius&&(this._curveRadius=e,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(e,t,a,i,r){this.updateAttributeData(Up,e,4),this.updateAttributeData(Js,t,1),this.updateAttributeData(Pp,r,3),this._blockBounds=a,this._chunkedBounds=i,this.instanceCount=t.length,this._updateBounds()}_updateBounds(){const e=this._blockBounds;if(e){const{curveRadius:t,boundingBox:a}=this;if(t){const{PI:i,floor:r,min:s,max:o,sin:l,cos:c}=Math,u=i/2,h=i*2,d=Math.abs(t),f=e[0]/d,g=e[2]/d,v=r((f+u)/h)!==r((g+u)/h)?-d:s(l(f)*d,l(g)*d),p=r((f-u)/h)!==r((g-u)/h)?d:o(l(f)*d,l(g)*d),m=r((f+i)/h)!==r((g+i)/h)?d*2:o(d-c(f)*d,d-c(g)*d);a.min.set(v,e[1],t<0?-m:0),a.max.set(p,e[3],t<0?0:m)}else a.min.set(e[0],e[1],0),a.max.set(e[2],e[3],0);a.getBoundingSphere(this.boundingSphere)}}applyClipRect(e){let t=this.getAttribute(Js).count,a=this._chunkedBounds;if(a)for(let i=a.length;i--;){t=a[i].end;let r=a[i].rect;if(r[1]<e.w&&r[3]>e.y&&r[0]<e.z&&r[2]>e.x)break}this.instanceCount=t}updateAttributeData(e,t,a){const i=this.getAttribute(e);t?i&&i.array.length===t.length?(i.array.set(t),i.needsUpdate=!0):(this.setAttribute(e,new Vi(t,a)),delete this._maxInstanceCount,this.dispose()):i&&this.deleteAttribute(e)}}const Dp=`
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
`,Fp=`
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
`,Ip=`
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
`,Op=`
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
`;function Np(n){const e=Wn(n,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new Fe},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new _t(0,0,0,0)},uTroikaClipRect:{value:new _t(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new Fe},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new fe},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Qe},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:Dp,vertexTransform:Fp,fragmentDefs:Ip,fragmentColorTransform:Op,customRewriter({vertexShader:t,fragmentShader:a}){let i=/\buniform\s+vec3\s+diffuse\b/;return i.test(a)&&(a=a.replace(i,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),i.test(t)||(t=t.replace(ks,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:t,fragmentShader:a}}});return e.transparent=!0,e.forceSinglePass=!0,Object.defineProperties(e,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),e}const qn=new Ii({color:16777215,side:2,transparent:!0}),el=8421504,tl=new ct,Xa=new ae,jn=new ae,ea=[],zp=new ae,Yn="+x+y";function il(n){return Array.isArray(n)?n[0]:n}let rl=()=>{const n=new We(new et(1,1),qn);return rl=()=>n,n},al=()=>{const n=new We(new et(1,1,32,1),qn);return al=()=>n,n};const kp={type:"syncstart"},Bp={type:"synccomplete"},nl=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],Gp=nl.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class gi extends We{constructor(){const e=new Lp;super(e,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=el,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Yn,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(e){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(e):(this._isSyncing=!0,this.dispatchEvent(kp),Tp({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},t=>{this._isSyncing=!1,this._textRenderInfo=t,this.geometry.updateGlyphs(t.glyphBounds,t.glyphAtlasIndices,t.blockBounds,t.chunkedBounds,t.glyphColors);const a=this._queuedSyncs;a&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{a.forEach(i=>i&&i())})),this.dispatchEvent(Bp),e&&e()})))}onBeforeRender(e,t,a,i,r,s){this.sync(),r.isTroikaTextMaterial&&this._prepareForRender(r)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(e){return Np(e)}get material(){let e=this._derivedMaterial;const t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=qn.clone());if((!e||!e.isDerivedFrom(t))&&(e=this._derivedMaterial=this.createDerivedMaterial(t),t.addEventListener("dispose",function a(){t.removeEventListener("dispose",a),e.dispose()})),this.hasOutline()){let a=e._outlineMtl;return a||(a=e._outlineMtl=Object.create(e,{id:{value:e.id+.1}}),a.isTextOutlineMaterial=!0,a.depthWrite=!1,a.map=null,e.addEventListener("dispose",function i(){e.removeEventListener("dispose",i),a.dispose()})),[a,e]}else return e}set material(e){e&&e.isTroikaTextMaterial?(this._derivedMaterial=e,this._baseMaterial=e.baseMaterial):this._baseMaterial=e}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(e){this.geometry.detail=e}get curveRadius(){return this.geometry.curveRadius}set curveRadius(e){this.geometry.curveRadius=e}get customDepthMaterial(){return il(this.material).getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return il(this.material).getDistanceMaterial()}set customDistanceMaterial(e){}_prepareForRender(e){const t=e.isTextOutlineMaterial,a=e.uniforms,i=this.textRenderInfo;if(i){const{sdfTexture:o,blockBounds:l}=i;a.uTroikaSDFTexture.value=o,a.uTroikaSDFTextureSize.value.set(o.image.width,o.image.height),a.uTroikaSDFGlyphSize.value=i.sdfGlyphSize,a.uTroikaSDFExponent.value=i.sdfExponent,a.uTroikaTotalBounds.value.fromArray(l),a.uTroikaUseGlyphColors.value=!t&&!!i.glyphColors;let c=0,u=0,h=0,d,f,g,v=0,p=0;if(t){let{outlineWidth:b,outlineOffsetX:_,outlineOffsetY:M,outlineBlur:S,outlineOpacity:E}=this;c=this._parsePercent(b)||0,u=Math.max(0,this._parsePercent(S)||0),d=E,v=this._parsePercent(_)||0,p=this._parsePercent(M)||0}else h=Math.max(0,this._parsePercent(this.strokeWidth)||0),h&&(g=this.strokeColor,a.uTroikaStrokeColor.value.set(g??el),f=this.strokeOpacity,f==null&&(f=1)),d=this.fillOpacity;a.uTroikaEdgeOffset.value=c,a.uTroikaPositionOffset.value.set(v,p),a.uTroikaBlurRadius.value=u,a.uTroikaStrokeWidth.value=h,a.uTroikaStrokeOpacity.value=f,a.uTroikaFillOpacity.value=d??1,a.uTroikaCurveRadius.value=this.curveRadius||0;let m=this.clipRect;if(m&&Array.isArray(m)&&m.length===4)a.uTroikaClipRect.value.fromArray(m);else{const b=(this.fontSize||.1)*100;a.uTroikaClipRect.value.set(l[0]-b,l[1]-b,l[2]+b,l[3]+b)}this.geometry.applyClipRect(a.uTroikaClipRect.value)}a.uTroikaSDFDebug.value=!!this.debugSDF,e.polygonOffset=!!this.depthOffset,e.polygonOffsetFactor=e.polygonOffsetUnits=this.depthOffset||0;const r=t?this.outlineColor||0:this.color;if(r==null)delete e.color;else{const o=e.hasOwnProperty("color")?e.color:e.color=new fe;(r!==o._input||typeof r=="object")&&o.set(o._input=r)}let s=this.orientation||Yn;if(s!==e._orientation){let o=a.uTroikaOrient.value;s=s.replace(/[^-+xyz]/g,"");let l=s!==Yn&&s.match(/^([-+])([xyz])([-+])([xyz])$/);if(l){let[,c,u,h,d]=l;Xa.set(0,0,0)[u]=c==="-"?1:-1,jn.set(0,0,0)[d]=h==="-"?-1:1,tl.lookAt(zp,Xa.cross(jn),jn),o.setFromMatrix4(tl)}else o.identity();e._orientation=s}}_parsePercent(e){if(typeof e=="string"){let t=e.match(/^(-?[\d.]+)%$/),a=t?parseFloat(t[1]):NaN;e=(isNaN(a)?0:a/100)*this.fontSize}return e}localPositionToTextCoords(e,t=new Fe){t.copy(e);const a=this.curveRadius;return a&&(t.x=Math.atan2(e.x,Math.abs(a)-Math.abs(e.z))*Math.abs(a)),t}worldPositionToTextCoords(e,t=new Fe){return Xa.copy(e),this.localPositionToTextCoords(this.worldToLocal(Xa),t)}raycast(e,t){const{textRenderInfo:a,curveRadius:i}=this;if(a){const r=a.blockBounds,s=i?al():rl(),o=s.geometry,{position:l,uv:c}=o.attributes;for(let u=0;u<c.count;u++){let h=r[0]+c.getX(u)*(r[2]-r[0]);const d=r[1]+c.getY(u)*(r[3]-r[1]);let f=0;i&&(f=i-Math.cos(h/i)*i,h=Math.sin(h/i)*i),l.setXYZ(u,h,d,f)}o.boundingSphere=this.geometry.boundingSphere,o.boundingBox=this.geometry.boundingBox,s.matrixWorld=this.matrixWorld,s.material.side=this.material.side,ea.length=0,s.raycast(e,ea);for(let u=0;u<ea.length;u++)ea[u].object=this,t.push(ea[u])}}copy(e){const t=this.geometry;return super.copy(e),this.geometry=t,Gp.forEach(a=>{this[a]=e[a]}),this}clone(){return new this.constructor().copy(this)}}nl.forEach(n=>{const e="_private_"+n;Object.defineProperty(gi.prototype,n,{get(){return this[e]},set(t){t!==this[e]&&(this[e]=t,this._needsSync=!0)}})}),new ui,new fe;const ol="/chromic-lyrics/vendor/SFNS-ExtraBold.ttf",sl="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";class Hp{constructor(e){this.opacity=0,this.targetOpacity=0,this.group=new Ci,this.group.layers.set(1),this.titleText=new gi,this.titleText.font=ol,this.titleText.fontSize=.09,this.titleText.unicodeFontsURL=sl,this.titleText.fontWeight=800,this.titleText.color=16777215,this.titleText.anchorX="center",this.titleText.anchorY="middle",this.titleText.position.set(0,.06,-1),this.titleText.fillOpacity=0,this.titleText.sdfGlyphSize=64,this.titleText.gpuAccelerateSDF=!0,this.titleText.text="",this.titleText.layers.set(1),this.titleText.sync(),this.group.add(this.titleText),this.artistText=new gi,this.artistText.font=ol,this.artistText.fontSize=.055,this.artistText.unicodeFontsURL=sl,this.artistText.fontWeight=800,this.artistText.color=8304895,this.artistText.anchorX="center",this.artistText.anchorY="middle",this.artistText.position.set(0,-.05,-1),this.artistText.fillOpacity=0,this.artistText.sdfGlyphSize=64,this.artistText.gpuAccelerateSDF=!0,this.artistText.text="",this.artistText.layers.set(1),this.artistText.sync(),this.group.add(this.artistText)}setTrack(e,t){this.titleText.text=e,this.artistText.text=t,this.titleText.sync(),this.artistText.sync()}setVisible(e){this.targetOpacity=e?1:0}update(e){this.opacity+=(this.targetOpacity-this.opacity)*.04,this.titleText.fillOpacity=this.opacity,this.artistText.fillOpacity=this.opacity*.85}addToScene(e){e.add(this.group)}removeFromScene(e){e.remove(this.group)}dispose(){this.titleText.dispose(),this.artistText.dispose()}}const $n="/chromic-lyrics/vendor/NotoSans-Bold.ttf",Kn="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data",ri=.5,qi=1,Sr=.15,li=.09,ll=.65,ai=.14,ji=.018,ta=0,Vp=1.35,Mr=0,cl=.9,qa=.3,Wp=.25,$e={active:{op:1,sc:1.04,oy:0},past:{op:0,sc:.93,oy:.06},pastFar:{op:0,sc:.85,oy:.12},future:{op:.04,sc:.88,oy:-.06},future1:{op:.55,sc:.97,oy:-.02},future2:{op:.3,sc:.94,oy:-.04},future3:{op:.14,sc:.92,oy:-.05},future4:{op:.07,sc:.9,oy:-.06},future5:{op:.04,sc:.88,oy:-.06},adlibOn:{op:.6,sc:.92,oy:-.05},adlibOff:{op:.35,sc:.9,oy:-.033},adlibHid:{op:0,sc:.88,oy:.033},scroll:{op:.7,sc:1,oy:0},scrollAct:{op:1,sc:1,oy:0},pairAct:{op:1,sc:.97,oy:0},pairPast:{op:0,sc:.96,oy:-.083},pairFut:{op:0,sc:.9,oy:.067}};function Xp(n){return n.stretch||n.isVocalStretch?"stretch":n.sung?"sung":n.spoken?"spoken":n.whisper?"whisper":"normal"}function ja(n,e,t){n.text=e,n.font=$n,n.fontSize=t,n.maxWidth=cl,n.unicodeFontsURL=Kn,n.fontWeight=800,n.anchorX="left",n.anchorY="middle",n.color=16777215,n.transparent=!0,n.sdfGlyphSize=128,n.gpuAccelerateSDF=!0}function qp(n,e,t,a,i){if(a)return n===e?$e.scrollAct:$e.scroll;if(t)return n===e?$e.adlibOn:n<e?$e.adlibOff:$e.adlibHid;if(i)return n===e?$e.pairAct:n<e?$e.pairPast:$e.pairFut;if(n===e)return $e.active;if(n<e)return e-n>1?$e.pastFar:$e.past;const r=n-e;return r===1?$e.future1:r===2?$e.future2:r===3?$e.future3:r===4?$e.future4:r===5?$e.future5:$e.future}class jp{constructor(){this.lines=[],this.timeline=[],this.activeLineIdx=-1,this.opacity=0,this.targetOpacity=0,this.lastTime=0,this.lastTimeStamp=0,this.interpolatedTime=0,this.ready=!1,this.lastCt=0,this._pendingSeekTime=null,this._leftEdge=0,this._aspectX=1,this.manualScrollOffset=0,this.scrollDecayTimer=0,this.scrollY=qa,this._onSeek=null,this._metaGroup=null,this._metaArtistMesh=null,this._metaAlbumMesh=null,this._metaVisible=!1,this._debugRenderer=null,this._debugEnabled=!1,this._debugLastDump=0,this._uiVisible=!0,this._activeLineY=qa,this._accentColor=new fe(8304895),this._dbgCount=0,this.group=new Ci,this.group.layers.enable(0),this.group.layers.enable(1)}setTimeline(e,t,a){this.disposeLines(),this.timeline=e,this.activeLineIdx=-1,this.ready=!1,this.scrollY=qa,this.manualScrollOffset=0,this.scrollDecayTimer=0,this.opacity=0,this.targetOpacity=0,this.group.visible=!1,e.length&&(this.buildScene(e),(t||a)&&this.setTrackMeta(t,a))}disposeLines(){this._metaGroup&&(this._metaArtistMesh&&(this._metaArtistMesh.dispose(),this._metaArtistMesh=null),this._metaAlbumMesh&&(this._metaAlbumMesh.dispose(),this._metaAlbumMesh=null),this.group.remove(this._metaGroup),this._metaGroup=null,this._metaVisible=!1);for(const e of this.lines){for(const t of e.entries)if(t._isCueDot)t.base.geometry?.dispose(),t.base.material?.dispose(),t.fill.geometry?.dispose(),t.fill.material?.dispose();else if(t._isCharSplit)for(const a of t._chars)a.base.dispose(),a.fill.dispose();else t.base.dispose(),t.fill.dispose();this.group.remove(e.group)}this.lines=[]}buildScene(e){const t=e.filter(d=>d.type==="vocal_cue"||d.words?.length||d.text),a=[],i=t[0],r=i&&(i.start||i.time)||0;i?.type!=="vocal_cue"&&r>2&&a.push({type:"vocal_cue",start:0,end:r,text:""});for(let d=0;d<t.length;d++)a.push(t[d]);const s=[];for(let d=0;d<a.length;d++){const f=a[d],g=a[d+1]?a[d+1].start||a[d+1].time||999:(f.start||0)+5;if(f.type==="vocal_cue"){const v=f.start||f.time||0,p=f.end||Math.min(+g-.1,v+5);s.push({...f,_isCue:!0,start:v,end:p,words:[{text:"\u2022",start:v,end:v+(p-v)*.33},{text:"\u2022",start:v+(p-v)*.33,end:v+(p-v)*.66},{text:"\u2022",start:v+(p-v)*.66,end:p}]});continue}if(!f.words||!f.words.length){const v=(f.text||"").split(/\s+/).filter(Boolean);if(!v.length)continue;const p=f.start||f.time||0,m=((f.end||Math.min(+g-.1,p+5))-p)/v.length;f.words=v.map((b,_)=>({text:b,start:p+_*m,end:p+(_+1)*m}))}!f.end&&f.words.length&&(f.end=f.words[f.words.length-1].end),s.push(f)}if(!s.length)return;let o=0,l=0,c=0;for(let d=0;d<s.length;d++){const f=s[d],g=!!f._isCue,v=!g&&((f.words||[]).every(U=>U.adlib)||!!f.adlib),p=!g&&!v&&(f.words||[]).some(U=>U.adlib),m=g?li:v?li*ll:li,b=new Ci;b.layers.enable(0),b.layers.enable(1),this.group.add(b);const _=[],M={start:f.start||f.time||0,end:f.end||0};if(g){const U=li*.22,O=li*.45,x=new Zn(U,128);for(let L=0;L<3;L++){const N=f.words[L],R=new Ii({color:16777215,transparent:!0,opacity:.1,depthTest:!1,depthWrite:!1}),G=new We(x,R),z=Mr+L*(U*2+O)+U;G.position.set(z,0,ta),G.layers.enable(0),G.layers.enable(1),b.add(G);const y=new Ii({color:16777215,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1}),Y=new We(x,y);Y.position.copy(G.position),Y.scale.set(0,0,1),Y.layers.enable(0),Y.layers.enable(1),b.add(Y),_.push({base:G,fill:Y,start:N.start,end:N.end,text:"\u2022",li:d,wi:L,ad:!1,wt:"normal",_w:U*2,_p:0,_cop:1,_tOp:1,_scX:1,_scY:1,_wave:0,_glow:0,_baseY:0,_isCueDot:!0,_dotRadius:U,_clickFlash:0,_adBaseY:0})}b.position.set(0,c,0);const C=this.lines.length===0;this.lines.push({group:b,entries:_,ld:M,ad:!1,isCue:!0,hasInlineAdlibs:!1,fs:m,_baseY:c,_cOp:C?$e.active.op:$e.future.op,_cSc:C?$e.active.sc:$e.future.sc,_cOy:C?$e.active.oy:$e.future.oy,_tOp:C?$e.active.op:$e.future.op,_tSc:C?$e.active.sc:$e.future.sc,_tOy:C?$e.active.oy:$e.future.oy,_cueCollapse:0,_cueCollapseTarget:0,_cueExitPhase:0,_cueExitTimer:0}),c-=ai;continue}let S=Mr;for(let U=0;U<f.words.length;U++){const O=f.words[U],x=O.word||O.text||"",C=!!O.adlib||v,L=Xp(O),N=C&&!v?m*ll:m;if(L==="stretch"&&x.length>1&&!v){const R=x.split(""),G=[];for(let y=0;y<R.length;y++){const Y=R[y],k=new gi;ja(k,Y,N),k.layers.set(1),b.add(k);const X=new gi;ja(X,Y,N),X.layers.set(1),b.add(X),G.push({base:k,fill:X,idx:y}),o+=2}const z={base:G[0].base,fill:G[0].fill,start:O.start,end:O.end,text:x,li:d,wi:U,ad:C,wt:L,_w:0,_p:0,_cop:1,_tOp:1,_scX:1,_scY:1,_wave:0,_glow:0,_baseY:0,_isCharSplit:!0,_chars:G,_charWidths:[],_charCount:R.length,_clickFlash:0,_adBaseY:0};_.push(z)}else{const R=new gi;ja(R,x,N),R.position.set(S,0,ta),R.layers.set(1),b.add(R);const G=new gi;ja(G,x,N),G.clipRect=[-10,-10,-10,10],G.position.set(S,0,ta),G.layers.set(1),b.add(G);const z={base:R,fill:G,start:O.start,end:O.end,text:x,li:d,wi:U,ad:C,wt:L,_w:0,_p:0,_cop:1,_tOp:1,_scX:1,_scY:1,_wave:0,_glow:0,_baseY:0,_clickFlash:0,_adBaseY:0};_.push(z),o+=2}S+=x.length*N*.55+ji}const E=[];if(p){let U=null;for(const O of _)O.ad?(U||(U={words:[],start:1/0,end:0,totalW:0}),U.words.push(O),U.start=Math.min(U.start,O.start),U.end=Math.max(U.end,O.end),U.totalW+=O._w+ji):U&&(U.totalW-=ji,E.push(U),U=null);U&&(U.totalW-=ji,E.push(U));for(let O=0;O<E.length;O++)for(const x of E[O].words)x._adPhraseIdx=O}b.position.set(0,c,0);const w=this.lines.length===0;this.lines.push({group:b,entries:_,ld:M,ad:v,isCue:!1,hasInlineAdlibs:p,fs:m,_baseY:c,_cOp:w?$e.active.op:$e.future.op,_cSc:w?$e.active.sc:$e.future.sc,_cOy:w?$e.active.oy:$e.future.oy,_tOp:w?$e.active.op:$e.future.op,_tSc:w?$e.active.sc:$e.future.sc,_tOy:w?$e.active.oy:$e.future.oy,_adPhrases:E,_adLastEnd:E.length?Math.max(...E.map(U=>U.end)):0,_adPhraseReveal:0}),c-=ai}for(let d=0;d<this.lines.length;d++)this.lines[d].entries.map(f=>f.text).join(" ").startsWith("(")&&d+1<this.lines.length&&this.lines[d+1].entries.map(f=>f.text).join(" ").startsWith("(")&&(this.lines[d]._pairWith=d+1,this.lines[d+1]._pairWith=d,this.lines[d]._pairRole="first",this.lines[d+1]._pairRole="second",d++);for(let d=0;d<this.lines.length;d++){const f=this.lines[d];f.ad&&!f.isCue&&f._pairWith==null&&(f._standaloneAdlib=!0)}const u=d=>{d.material&&(d.material.transparent=!0,d.material.depthWrite=!1,d.material.depthTest=!1)},h=()=>{if(l++,l>=o){for(const d of this.lines)for(const f of d.entries)if(!f._isCueDot)if(f._isCharSplit&&f._chars)for(const g of f._chars)u(g.base),u(g.fill);else u(f.base),u(f.fill);console.log("[LyricsRenderer] All meshes synced & patched transparent. Lines:",this.lines.length),this.doLayout(),this.ready=!0,this.group.visible=!0,this.targetOpacity=1}};for(const d of this.lines)for(const f of d.entries)if(f._isCueDot)l+=2,l>=o&&(this.doLayout(),this.ready=!0,this.group.visible=!0,this.targetOpacity=1);else if(f._isCharSplit)for(const g of f._chars)g.base.sync(h),g.fill.sync(h);else f.base.sync(h),f.fill.sync(h);o===0&&(this.doLayout(),this.ready=!0,this.group.visible=!0,this.targetOpacity=1)}layoutChars(e,t,a){if(!e._isCharSplit||!e._chars)return;let i=t;for(let r=0;r<e._chars.length;r++){const s=e._chars[r],o=e._charWidths[r]||0;s.base.position.x=i,s.base.position.y=a,s.fill.position.x=i,s.fill.position.y=a,s._baseX=i,i+=o}}doLayout(){const e=cl,t=Mr;this._leftEdge=t;let a=0;for(let i=0;i<this.lines.length;i++){const r=this.lines[i];if(r.isCue){const o=ai*.35,l=r.entries[0]?._dotRadius||li*.18,c=li*.4;for(let u=0;u<r.entries.length;u++){const h=r.entries[u],d=t+u*(l*2+c)+l;h.base.position.x=d,h.base.position.y=0,h.fill.position.x=d,h.fill.position.y=0,h._adBaseY=0}r.group.position.set(0,a+o,0),r._baseY=a+o,a-=ai;continue}for(const o of r.entries)if(!o._isCueDot)if(o._isCharSplit&&o._chars){let l=0;o._charWidths=[];for(const c of o._chars){const u=c.base.textRenderInfo?.blockBounds,h=u?u[2]-u[0]:r.fs*.5;o._charWidths.push(h),l+=h}o._w=l}else{const l=o.base.textRenderInfo?.blockBounds;o._w=l?l[2]-l[0]:o.text.length*r.fs*.5}const s=r.fs*Vp;if(r.hasInlineAdlibs){const o=r.entries.filter(v=>!v.ad),l=r.entries.filter(v=>v.ad);let c=t,u=0;for(const v of o)c+v._w>t+e&&c>t+.01&&(c=t,u-=s),v.base.position.x=c,v.base.position.y=u,v.fill.position.x=c,v.fill.position.y=u,v._adBaseY=u,v._baseY=u,v._baseX=c,v._isCharSplit&&this.layoutChars(v,c,u),c+=v._w+ji;const h=r.fs*.15,d=u-r.fs-h;let f=t;for(const v of l)v.base.position.x=f,v.base.position.y=d,v.fill.position.x=f,v.fill.position.y=d,v._adBaseY=d,v._baseY=d,v._baseX=f,v._adBaseX=f,v._isCharSplit&&this.layoutChars(v,f,d),f+=v._w+ji;r.group.position.set(0,a,0),r._baseY=a;const g=Math.abs(u)+s;a-=g+ai}else{let o=t,l=0;for(const h of r.entries)o+h._w>t+e&&o>t+.01&&(o=t,l-=s),h.base.position.x=o,h.base.position.y=l,h.fill.position.x=o,h.fill.position.y=l,h._adBaseY=l,h._baseY=l,h._baseX=o,h._isCharSplit&&this.layoutChars(h,o,l),o+=h._w+ji;r.group.position.set(0,a,0),r._baseY=a;const c=Math.abs(l)+s;let u;r._pairRole==="first"?u=ai*.3:r._pairRole==="second"?u=ai*1.4:u=r.ad&&!r._standaloneAdlib?ai*.15:r._standaloneAdlib?ai*.5:ai,a-=c+u}}}setVisible(e){this.targetOpacity=e&&this.timeline.length>0?1:0}setControlsVisible(e){this._uiVisible=e,this._activeLineY=e?qa:Wp}setAccentColor(e){this._accentColor=e.clone();const t={h:0,s:0,l:0};if(this._accentColor.getHSL(t),t.l<.5&&this._accentColor.setHSL(t.h,t.s,Math.max(.55,t.l)),this._metaAlbumMesh){const a=this._accentColor.clone(),i={h:0,s:0,l:0};a.getHSL(i),a.setHSL(i.h,Math.max(.15,i.s*.5),Math.min(.75,i.l+.15)),this._metaAlbumMesh.color=a.getHex()}}setAspect(e,t){const a=t/e;Math.abs(a-this._aspectX)>.001&&(this._aspectX=a,this.ready&&this.doLayout())}setCurrentTime(e){this.lastTime=e,this.lastTimeStamp=performance.now()}onSeek(e){this._onSeek=e}setTrackMeta(e,t){this._metaGroup&&(this._metaArtistMesh&&(this._metaArtistMesh.dispose(),this._metaArtistMesh=null),this._metaAlbumMesh&&(this._metaAlbumMesh.dispose(),this._metaAlbumMesh=null),this.group.remove(this._metaGroup),this._metaGroup=null);const a=e||"",i=t||"";if(!a&&!i){this._metaVisible=!1;return}this._metaGroup=new Ci,this._metaGroup.layers.enable(0),this._metaGroup.layers.enable(1);const r=li*.58;this._metaArtistMesh=new gi,this._metaArtistMesh.text=a,this._metaArtistMesh.font=$n,this._metaArtistMesh.fontSize=r,this._metaArtistMesh.unicodeFontsURL=Kn,this._metaArtistMesh.fontWeight=800,this._metaArtistMesh.anchorX="left",this._metaArtistMesh.anchorY="bottom",this._metaArtistMesh.color=this._accentColor.getHex(),this._metaArtistMesh.transparent=!0,this._metaArtistMesh.sdfGlyphSize=128,this._metaArtistMesh.gpuAccelerateSDF=!0,this._metaArtistMesh.position.set(Mr,0,ta),this._metaArtistMesh.layers.enable(0),this._metaArtistMesh.layers.enable(1),this._metaGroup.add(this._metaArtistMesh);const s=li*.47;this._metaAlbumMesh=new gi,this._metaAlbumMesh.text=i,this._metaAlbumMesh.font=$n,this._metaAlbumMesh.fontSize=s,this._metaAlbumMesh.unicodeFontsURL=Kn,this._metaAlbumMesh.fontWeight=800,this._metaAlbumMesh.anchorX="left",this._metaAlbumMesh.anchorY="top";const o=this._accentColor.clone(),l={h:0,s:0,l:0};o.getHSL(l),o.setHSL(l.h,Math.max(.15,l.s*.5),Math.min(.75,l.l+.15)),this._metaAlbumMesh.color=o.getHex(),this._metaAlbumMesh.transparent=!0,this._metaAlbumMesh.sdfGlyphSize=128,this._metaAlbumMesh.gpuAccelerateSDF=!0,this._metaAlbumMesh.position.set(Mr,-r-.003,ta),this._metaAlbumMesh.layers.set(1),this._metaGroup.add(this._metaAlbumMesh),this.group.add(this._metaGroup),this._metaVisible=!0;const c=u=>{u.material&&(u.material.transparent=!0,u.material.depthWrite=!1,u.material.depthTest=!1)};this._metaArtistMesh.sync(()=>c(this._metaArtistMesh)),this._metaAlbumMesh.sync(()=>c(this._metaAlbumMesh))}updateMeta(){if(!this._metaGroup||!this._metaVisible)return;const e=this.lines[this.lines.length-1],t=e?e._baseY-ai*5:-.5;this._metaGroup.position.y=t+this.scrollY,this._metaGroup.position.x=this._leftEdge;const a=this._metaGroup.position.y;let i=1;a>1.2||a<-1.8?i=0:a>.9?i=Math.max(0,(1.2-a)/.3):a<-1.3&&(i=Math.max(0,(a+1.8)/.5));const r=.9*i*this.opacity,s=.55*i*this.opacity;if(this._metaArtistMesh?.material)if(this._metaArtistMesh.material.opacity=r,r>.1){this._metaArtistMesh.layers.enable(0);const o=1+.25*i,l=this._accentColor;this._metaArtistMesh.color=new fe(l.r*o,l.g*o,l.b*o)}else this._metaArtistMesh.layers.disable(0),this._metaArtistMesh.color=this._accentColor.clone();this._metaAlbumMesh?.material&&(this._metaAlbumMesh.material.opacity=s)}handleWheel(e){if(this.manualScrollOffset+=e*.002,this.lines.length>1){const t=this.lines[0]._baseY,a=this.lines[this.lines.length-1]._baseY,i=Math.max(0,this.activeLineIdx),r=this.lines[i]._baseY,s=Math.abs(a-r)+.5,o=Math.abs(r-t)+.3;this.manualScrollOffset=Math.max(-o,Math.min(s,this.manualScrollOffset))}this.scrollDecayTimer=3}handleClick(e,t){if(!this.ready||!this.lines.length||e<Mr-.2)return;const a=e/(this._aspectX||1);let i=null,r=1/0;for(const l of this.lines){const c=l.group.position.y,u=l._cSc||1;if(!(l._cOp<.05))for(const h of l.entries){if(h._isCueDot)continue;const d=c+(h._adBaseY||0)*u,f=l.group.position.x+h.base.position.x*u,g=Math.abs(t-d);if(g>l.fs*2.5)continue;const v=f,p=f+h._w*u,m=a<v?v-a:a>p?a-p:0,b=g+m*.5;b<r&&(r=b,i=h)}}if(i&&i.start!=null&&this._onSeek){console.log(`[LR-SEEK] word="${i.text}" \u2192 t=${i.start.toFixed(3)}`),this.manualScrollOffset=0,this.scrollDecayTimer=0,this._pendingSeekTime=i.start,this._onSeek(i.start),i._clickFlash=1;return}let s=0,o=1/0;for(let l=0;l<this.lines.length;l++){if(this.lines[l]._cOp<.05)continue;const c=Math.abs(this.lines[l].group.position.y-t);c<o&&(o=c,s=l)}if(this._onSeek&&this.lines[s]){console.log(`[LR-SEEK] line #${s} \u2192 t=${this.lines[s].ld.start.toFixed(3)}`),this.manualScrollOffset=0,this.scrollDecayTimer=0,this._pendingSeekTime=this.lines[s].ld.start,this._onSeek(this.lines[s].ld.start);for(const l of this.lines[s].entries)l._clickFlash=1}}update(e){if(this._dbgCount++,this._dbgCount%300,!this.lines.length||!this.ready){this.opacity+=(this.targetOpacity-this.opacity)*.15;return}const t=Math.min((performance.now()-this.lastTimeStamp)/1e3,.5);this.interpolatedTime=this.lastTime+t+.05;let a=this.interpolatedTime;const i=this.opacity<.5?.15:.05;this.opacity+=(this.targetOpacity-this.opacity)*i,this.group.scale.x=this._aspectX;const r=a-this.lastCt,s=r<-.3||r>2,o=this._pendingSeekTime!==null||s,l=this._pendingSeekTime??a;if(o&&(a=l,this.lastTimeStamp=performance.now(),this.interpolatedTime=l,this._pendingSeekTime=null),this.lastCt=a,o){let M=0;for(let S=0;S<this.lines.length;S++){const E=this.lines[S].ld;if(a>=E.start&&a<=E.end){M=S;break}a>E.end&&(M=S)}for(const S of this.lines)for(const E of S.entries)if(a>=E.end?E._p=1:a>=E.start?E._p=Math.min(1,(a-E.start)/(E.end-E.start)):E._p=0,E._clickFlash=0,E._wave=0,E._glow=0,E._scX=1,E._scY=1,!E._isCueDot)if(E._isCharSplit&&E._chars)for(const w of E._chars)w.base.scale.set(1,1,1),w.fill.scale.set(1,1,1),w._lerpScX=1,w._lerpScY=1,w._charGlow=0,w._baseX!==void 0&&(w.base.position.x=w._baseX,w.fill.position.x=w._baseX);else{if(E._p>=1)E.fill.clipRect=[-10,-10,100,10];else if(E._p<=0)E.fill.clipRect=[-10,-10,-10,10];else{const w=E._w*E._p,U=E._w*Sr;E.fill.clipRect=[-.01,-10,w+U,10]}E.fill.layers.disable(0),E.fill.color=16777215,E._baseX!==void 0&&(E.base.position.x=E._baseX,E.fill.position.x=E._baseX)}this.manualScrollOffset=0,this.scrollDecayTimer=0,this.activeLineIdx=M}let c=-1;for(let M=0;M<this.lines.length;M++){const S=this.lines[M].ld;if(a>=S.start&&a<=S.end){c=M;break}}if(c===-1)for(let M=0;M<this.lines.length;M++){const S=this.lines[M].ld;if(a>=S.start-.15&&a<=S.end+.15){c=M;break}}if(c===-1&&this.lines.length>0){if(a>this.lines[this.lines.length-1].ld.end+.5)c=this.lines.length-1;else if(a<this.lines[0].ld.start-.5)c=0;else for(let M=0;M<this.lines.length-1;M++)if(a>this.lines[M].ld.end&&a<this.lines[M+1].ld.start){const S=this.lines[M+1].ld.start-this.lines[M].ld.end;c=a-this.lines[M].ld.end<S*.6?M:M+1;break}}c===-1&&(c=this.activeLineIdx>=0?this.activeLineIdx:0);let u=new Set([c]);if(c>=0&&c<this.lines.length){const M=this.lines[c].ld,S=this.lines[c]._pairWith;if(S!=null&&S>=0&&S<this.lines.length){u.add(S);const E=Math.max(M.end,this.lines[S].ld.end);a<=E+.1&&(c=Math.min(c,S))}for(let E=0;E<this.lines.length;E++){if(u.has(E))continue;const w=this.lines[E].ld;Math.min(M.end,w.end)-Math.max(M.start,w.start)>.05&&u.add(E)}if(u.size>1){let E=0;for(const w of u)E=Math.max(E,this.lines[w].ld.end);a<=E+.1?c=Math.min(...u):u=new Set([c])}}this.activeLineIdx=c;const h=1/60,d=1-Math.exp(-5*h),f=1-Math.exp(-2.5*h),g=1-Math.exp(-12*h);this.scrollDecayTimer>0?this.scrollDecayTimer-=h:(this.manualScrollOffset*=.95,Math.abs(this.manualScrollOffset)<.005&&(this.manualScrollOffset=0));const v=(c>=0&&c<this.lines.length?-this.lines[c]._baseY+this._activeLineY:this._activeLineY)+this.manualScrollOffset,p=Math.abs(v-this.scrollY),m=p>.5?3.5+Math.min(12,p*6):3.5,b=1-Math.exp(-m*h);this.scrollY+=(v-this.scrollY)*b,this.updateMeta();const _=this.scrollDecayTimer>0;for(let M=0;M<this.lines.length;M++){const S=this.lines[M],E=u.has(M),w=S._pairWith!=null,U=w?!1:S.ad&&!S._standaloneAdlib,O=E?$e.active:qp(M,c,U,_,w),x=!E&&M<c,C=E;if(S._tOp=O.op,S._tSc=O.sc,S._tOy=O.oy,x){const y=1-Math.exp(-20*h);S._cOp+=(S._tOp-S._cOp)*y,S._cSc+=(S._tSc-S._cSc)*y,S._cOy+=(S._tOy-S._cOy)*y}else{S._cOp+=(S._tOp-S._cOp)*d,S._cSc+=(S._tSc-S._cSc)*d;const y=M-c;let Y;y===1?Y=d*.8:y===2?Y=d*.5:Y=d*Math.max(.2,.4-y*.04),S._cOy+=(S._tOy-S._cOy)*Y}S.group.scale.set(S._cSc,S._cSc,1),S.group.position.x=this._leftEdge*(1-S._cSc),S.group.position.y=S._baseY+S._cOy+this.scrollY;const L=S.group.position.y,N=.3;let R=1;L>1-N?R=Math.max(0,(1-L)/N):L<-1+N&&(R=Math.max(0,(L+1)/N));const G=S._cOp*R;let z=0;if(w){const y=S.ld.start,Y=S.ld.end;a>=Y?z=1:a>=y&&(z=(a-y)/(Y-y))}for(const y of S.entries){a>=y.end?y._p=1:a>=y.start?y._p=Math.min(1,(a-y.start)/(y.end-y.start)):y._p=0,y._p>0&&y._p<1;const Y=y._p>=1,k=y.wt==="stretch";if((!y.ad||w||S._standaloneAdlib)&&(y._tOp=G,x?y._cop=G:y._cop+=(y._tOp-y._cop)*d),y._clickFlash&&y._clickFlash>.01?y._clickFlash*=1-g:y._clickFlash=0,S.isCue&&y._isCueDot){const W=y.base,$=y.fill,ee=W.material,xe=$.material;$.scale.set(0,0,1),xe.opacity=0,$.layers.disable(0);const oe=.8,F=S.ld.end,De=F-oe,ge=Math.min(y.end,De);let me;a>=ge?me=1:a>=y.start?me=Math.min(1,(a-y.start)/Math.max(.01,ge-y.start)):me=0;const de=S.entries.every(Se=>a>=Math.min(Se.end,De));if(a>=F)W.scale.set(.01,.01,1),ee.opacity=0,ee.color.setRGB(1,1,1);else if(a>=De&&de){const Se=(a-De)/oe,ce=Math.max(0,1-Se*Se),ve=.15;let se;Se<ve?se=1+.25*(Se/ve):se=1.25*(1-(Se-ve)/(1-ve)),se=Math.max(.01,se),W.scale.set(se,se,1),ee.opacity=ce*y._cop*this.opacity,W.layers.enable(0),W.layers.enable(1);const A=1+.2*ce;ee.color.setRGB(A,A,A)}else if(W.position.y=0,ee.color.setRGB(1,1,1),me>0){const Se=C?.4:.2,ce=Se+(1-Se)*me;W.scale.set(1,1,1),ee.opacity=ce*y._cop*this.opacity,W.layers.enable(0),W.layers.disable(1),ee.color.setRGB(1,1,1),de&&(ee.color.setRGB(1.05,1.05,1.05),W.layers.enable(1))}else{W.layers.enable(0),W.layers.disable(1);const Se=C?.4:.2;ee.opacity=Se*y._cop*this.opacity,W.scale.set(1,1,1)}continue}if(y.ad&&!C&&!w)if(y._tOp=0,y._cop+=(y._tOp-y._cop)*g,y._cop<.01&&(y._cop=0),y._isCharSplit&&y._chars)for(const W of y._chars)W.base.material.opacity=ri*y._cop*this.opacity,W.fill.material.opacity=ri*y._cop*this.opacity;else y._isCueDot||(y.base.material.opacity=ri*y._cop*this.opacity,y.fill.material.opacity=ri*y._cop*this.opacity);if(y._isCharSplit&&y._chars){const W=y._charCount,$=(y.end-y.start)*.15,ee=y.end+$-y.start,xe=y._p,oe=ee>0?Math.max(0,Math.min(1,(a-y.start)/ee)):0,F=oe*(W-1),De=2.2;let ge=0;const me=[];for(let ve=0;ve<W;ve++)me.push(ge),ge+=y._charWidths[ve]||S.fs*.5;const de=ge,Se=de*xe,ce=de*Sr;for(let ve=0;ve<W;ve++){const se=y._chars[ve],A=y._charWidths[ve]||S.fs*.5,T=me[ve],V=ve-F,Z=oe>0&&oe<1?Math.exp(-(V*V)/(2*De*De)):0,ie=w&&C?.7:1;if(x)se.base.material.opacity=0,se.fill.material.opacity=qi*y._cop*this.opacity,se.fill.clipRect&&(se.fill.clipRect=null);else if(!C&&!w)se.base.material.opacity=ri*y._cop*this.opacity,se.fill.material.opacity=qi*y._cop*this.opacity,se.fill.clipRect=[-10,-10,-10,10];else{se.base.material.opacity=ri*y._cop*ie*this.opacity;const Me=qi*y._cop*ie*this.opacity;if(Y)se.fill.material.opacity=Me,se.fill.clipRect&&(se.fill.clipRect=null);else if(xe<=0)se.fill.material.opacity=Me,se.fill.clipRect=[-10,-10,-10,10];else{se.fill.material.opacity=Me;const Ce=Se+ce-T;Ce<=0?se.fill.clipRect=[-10,-10,-10,10]:Ce>=A?se.fill.clipRect&&(se.fill.clipRect=null):se.fill.clipRect=[-.01,-10,Ce,10]}}const te=1+.16*Z,Re=1+.03*Z,pe=se._lerpScY??1,ue=se._lerpScX??1,_e=1-Math.exp(-3.5*h),Oe=pe+(te-pe)*_e,he=ue+(Re-ue)*_e;se._lerpScY=Oe,se._lerpScX=he,se.base.scale.set(he,Oe,1),se.fill.scale.set(he,Oe,1);const Xe=(Oe-1)*S.fs*.5;se.base.position.y=(y._adBaseY||0)+Xe,se.fill.position.y=(y._adBaseY||0)+Xe,se.base.position.x=se._baseX,se.fill.position.x=se._baseX,Z>se._charGlow?se._charGlow=Z:se._charGlow=(se._charGlow||0)*.97,Z>y._glow?y._glow=Z:y._glow*=.92;const Ee=se._charGlow||0;if(Ee>.02&&C){const Me=1+.15*Ee;se.fill.color=new fe(Me,Me,Me),se.fill.layers.enable(0)}else se.fill.color=16777215,se.fill.layers.disable(0)}if(y.ad&&S.hasInlineAdlibs&&S._adPhrases){const ve=S._adPhrases,se=y._adPhraseIdx||0,A=ve[se],T=S._adLastEnd||0,V=A.start-a;if(!(!(!C&&a>T)&&a>=A.start-.3))y._tOp=0;else if(V>0&&V<=.3){const ie=1-V/.3;y._tOp=ie*ie*.4*G}else y._tOp=.45*G;const Z=y._tOp<y._cop?g:d;y._cop+=(y._tOp-y._cop)*Z,y._cop<.01&&(y._cop=0);for(const ie of y._chars)ie.base.material.opacity=ri*y._cop*this.opacity,ie.fill.material.opacity=qi*y._cop*this.opacity}continue}const X=w&&C?.7:1,D=x?0:ri*y._cop*X*this.opacity;let H=qi*y._cop*X*this.opacity;if(y._clickFlash&&y._clickFlash>0&&(H=Math.min(1,H+.5*y._clickFlash)),y.base.material&&(y.base.material.opacity=D),y.fill.material&&(y.fill.material.opacity=H),x||Y)y.fill.clipRect=[-10,-10,100,10];else if(w&&C)if(z>=1)y.fill.clipRect=[-10,-10,100,10];else if(z<=0)y.fill.clipRect=[-10,-10,-10,10];else{const W=S.entries[S.entries.length-1],$=W.base.position.x-S.entries[0].base.position.x+W._w,ee=S.entries[0].base.position.x+$*z,xe=$*Sr,oe=y.base.position.x,F=ee+xe-oe;F<=0?y.fill.clipRect=[-10,-10,-10,10]:F>=y._w?y.fill.clipRect=[-10,-10,100,10]:y.fill.clipRect=[-.01,-10,F,10]}else if(y._p<=0)y.fill.clipRect=[-10,-10,-10,10];else{const W=y._w*y._p,$=y._w*Sr;y.fill.clipRect=[-.01,-10,W+$,10]}if(k){const W=y.end-y.start,$=W*.3,ee=y.end+$;if(a>=y.start&&a<ee){const xe=ee-y.start,oe=Math.max(0,Math.min(1,(a-y.start)/xe)),F=Math.pow(Math.sin(oe*Math.PI),.6),De=Math.max(2.5,6/Math.max(.3,W)),ge=(a-y.start)*De*Math.PI*2,me=Math.sin(ge),de=F*me;y._wave+=(de-y._wave)*Math.min(1,h*8)}else a>=ee?y._wave+=(0-y._wave)*Math.min(1,h*4):y._wave+=(0-y._wave)*f}else y._wave+=(0-y._wave)*f;let j=1,I=1;const B=Math.abs(y._wave);if(B>.01){const W=B*.06;I=1+W,j=1+W*.4,y._glow+=(B-y._glow)*.18}else y._glow*=.97,y._glow<.005&&(y._glow=0);const J=y._wave*li*.35;if(y._glow>.005&&C){const W=y._glow,$=W*W,ee=1+.15*$;y.fill.color=new fe(ee,ee,ee),y.fill.material.opacity=Math.min(1,(y.fill.material?.opacity||H)*(1+.15*$)),y.fill.layers.enable(0)}else y.fill.color=16777215,y.fill.layers.disable(0);if(y._scX+=(j-y._scX)*d,y._scY+=(I-y._scY)*d,y.base.scale.set(y._scX,y._scY,1),y.fill.scale.set(y._scX,y._scY,1),!y.ad||!S.hasInlineAdlibs){const W=y._adBaseY||0,$=(y._scY-1)*S.fs*.5;y.base.position.y=W+$,y.fill.position.y=W+$,y._baseX===void 0&&(y._baseX=y.base.position.x),y.base.position.x=(y._baseX??0)+J,y.fill.position.x=(y._baseX??0)+J}if(y.ad&&S.hasInlineAdlibs&&S._adPhrases){const W=S._adPhrases,$=y._adPhraseIdx||0,ee=W[$],xe=S._adLastEnd||0,oe=ee.start-a;let F;if(!C&&a>xe?F=!1:a>=ee.start-.3?F=!0:F=!1,!F)y._tOp=0;else if(oe>0&&oe<=.3){const ge=1-oe/.3;y._tOp=ge*ge*.4*G}else y._tOp=.45*G;const De=y._tOp<y._cop?g:d;if(y._cop+=(y._tOp-y._cop)*De,y._cop<.01&&(y._cop=0),y.base.position.y+=((y._adBaseY||0)-y.base.position.y)*d,y.fill.position.y=y.base.position.y,y.base.material.opacity=ri*y._cop*this.opacity,y.fill.material.opacity=qi*y._cop*this.opacity,x||Y)y.fill.clipRect=[-10,-10,100,10];else if(y._p<=0)y.fill.clipRect=[-10,-10,-10,10];else{const ge=y._w*y._p,me=y._w*Sr;y.fill.clipRect=[-.01,-10,ge+me,10]}}else if(y.ad&&S.ad&&!S._standaloneAdlib){const W=y.start-a;if(a>y.end){const $=a-y.end,ee=Math.max(0,1-$/.25);y._tOp=ee*.35*G}else if(y._p>0)y._tOp=.4*G;else if(W<=.35&&W>0){const $=1-W/.35;y._tOp=$*$*.3*G}else y._tOp=0;if(y._cop+=(y._tOp-y._cop)*d,y._cop<.01&&(y._cop=0),y.base.position.y+=((y._adBaseY||0)-y.base.position.y)*d,y.fill.position.y=y.base.position.y,y.base.material.opacity=ri*y._cop*this.opacity,y.fill.material.opacity=qi*y._cop*this.opacity,x||Y)y.fill.clipRect=[-10,-10,100,10];else if(y._p<=0)y.fill.clipRect=[-10,-10,-10,10];else{const $=y._w*y._p,ee=y._w*Sr;y.fill.clipRect=[-.01,-10,$+ee,10]}}}}this.debugPeriodicDump(a,c)}addToScene(e){e.add(this.group)}removeFromScene(e){e.remove(this.group)}dispose(){this.disposeLines()}debugReadPixel(e,t,a){try{const i=e.getContext(),r=e.getPixelRatio(),s=Math.floor(t*r),o=Math.floor((e.domElement.height/r-a)*r),l=new Uint8Array(4);return i.readPixels(s,o,1,1,i.RGBA,i.UNSIGNED_BYTE,l),{r:l[0],g:l[1],b:l[2],a:l[3]}}catch(i){return console.warn("[LR-DEBUG] readPixels failed:",i),null}}debugInspectClick(e,t,a,i,r){if(console.log("%c[LR-INSPECT] \u2550\u2550\u2550 PIXEL COLOR PICKER \u2550\u2550\u2550","color: #0ff; font-weight: bold; font-size: 14px"),console.log(`  ready=${this.ready} lines=${this.lines.length} ndcX=${e.toFixed(3)} ndcY=${t.toFixed(3)}`),!this.ready||!this.lines.length){console.log("  %cNo lyrics loaded or not ready yet","color: #f80"),console.log("%c[LR-INSPECT] \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550","color: #0ff");return}const s=a.domElement.getBoundingClientRect(),o=i-s.left,l=r-s.top,c=this.debugReadPixel(a,o,l),u=c?`rgba(${c.r},${c.g},${c.b},${c.a})`:"FAILED",h=[];if(c)for(let b=-2;b<=2;b++)for(let _=-2;_<=2;_++){const M=this.debugReadPixel(a,o+_*2,l+b*2);M&&M.a>0&&h.push(`(${M.r},${M.g},${M.b},${M.a})`)}const d=e/(this._aspectX||1);let f=null,g=null,v=1/0,p=-1;for(let b=0;b<this.lines.length;b++){const _=this.lines[b],M=_.group.position.y,S=_._cSc||1;for(const E of _.entries){if(E._isCueDot)continue;const w=M+(E._adBaseY||0)*S,U=_.group.position.x+E.base.position.x*S,O=Math.abs(t-w);if(O>_.fs*2)continue;const x=U+E._w*S,C=O+Math.abs(d-(U+x)/2)*.3;C<v&&(v=C,f=E,g=_,p=b)}}const m=this.activeLineIdx;if(console.log(`  Canvas pos: (${o.toFixed(0)}, ${l.toFixed(0)})  NDC: (${e.toFixed(3)}, ${t.toFixed(3)})`),console.log(`  %cActual rendered pixel: ${u}`,`color: rgb(${c?.r},${c?.g},${c?.b}); font-weight: bold; font-size: 13px; background: #222; padding: 2px 8px`),h.length&&console.log(`  5\xD75 non-transparent samples (${h.length}): ${h.slice(0,8).join(" ")}`),console.log(`  Global opacity: ${this.opacity.toFixed(3)}, aspectX: ${this._aspectX.toFixed(3)}, scrollY: ${this.scrollY.toFixed(3)}`),f&&g){const b=f,_=g,M=p<m?`PAST(${m-p})`:p===m?"ACTIVE":`FUTURE(${p-m})`;if(console.log(`  %cWord: "${b.text}" | line #${p} ${M} | wt=${b.wt} ad=${b.ad}`,"color: #ff0; font-weight: bold"),console.log(`  Line state: cOp=${_._cOp.toFixed(4)} cSc=${_._cSc.toFixed(4)} cOy=${_._cOy.toFixed(4)} tOp=${_._tOp.toFixed(4)}`),console.log(`  Word state: _p=${b._p.toFixed(4)} _cop=${b._cop.toFixed(4)} _tOp=${b._tOp.toFixed(4)} _wave=${b._wave.toFixed(4)} _glow=${b._glow.toFixed(4)}`),console.log(`  Word time: start=${b.start.toFixed(3)} end=${b.end.toFixed(3)} dur=${(b.end-b.start).toFixed(3)}`),b._isCharSplit&&b._chars){console.log(`  CHAR-SPLIT: ${b._charCount} chars`);for(const S of b._chars){const E=S.base?.material?.opacity,w=S.fill?.material?.opacity,U=S.fill?.color,O=U?.isColor?`rgb(${(U.r*255).toFixed(0)},${(U.g*255).toFixed(0)},${(U.b*255).toFixed(0)})`:String(U),x=S.fill?.clipRect?`[${S.fill.clipRect.map(L=>L.toFixed(2)).join(",")}]`:"null",C=S.fill?.scale?`(${S.fill.scale.x.toFixed(3)},${S.fill.scale.y.toFixed(3)})`:"?";console.log(`    char[${S.idx}]: base.op=${E?.toFixed(4)} fill.op=${w?.toFixed(4)} fill.col=${O} fill.scale=${C} clip=${x}`)}}else{const S=b.base?.material?.opacity,E=b.fill?.material?.opacity,w=b.base?.color,U=b.fill?.color,O=w?.isColor?`rgb(${(w.r*255).toFixed(0)},${(w.g*255).toFixed(0)},${(w.b*255).toFixed(0)})`:String(w),x=U?.isColor?`rgb(${(U.r*255).toFixed(0)},${(U.g*255).toFixed(0)},${(U.b*255).toFixed(0)})`:String(U),C=b.fill?.clipRect?`[${b.fill.clipRect.map(N=>N.toFixed(2)).join(",")}]`:"null",L=b.fill?.scale?`(${b.fill.scale.x.toFixed(2)},${b.fill.scale.y.toFixed(2)})`:"?";console.log(`  base: opacity=${S?.toFixed(4)} color=${O}`),console.log(`  fill: opacity=${E?.toFixed(4)} color=${x} clipRect=${C} scale=${L}`),console.log(`  scale: (${b._scX.toFixed(3)}, ${b._scY.toFixed(3)}) layers: fill.mask=${b.fill?.layers?.mask}`)}if(c&&c.a>0){const S=Math.round(255*(b._isCharSplit,ri)*b._cop*this.opacity),E=Math.round((c.r+c.g+c.b)/3);console.log(`  %cExpected brightness ~${S} | Actual pixel brightness ~${E} | Delta: ${E-S}`,Math.abs(E-S)>20?"color: #f00; font-weight: bold":"color: #0f0")}}else console.log("  %cNo word found near click","color: #f80; font-weight: bold");console.log("%c[LR-INSPECT] \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550","color: #0ff")}debugPeriodicDump(e,t){if(!this._debugEnabled||e-this._debugLastDump<5)return;this._debugLastDump=e;const a=Math.max(0,t-2),i=Math.min(this.lines.length-1,t+5);console.log(`%c[LR-DUMP] t=${e.toFixed(2)} active=#${t} globalOp=${this.opacity.toFixed(3)} scrollY=${this.scrollY.toFixed(3)}`,"color: #0ff; font-weight: bold");for(let r=a;r<=i;r++){const s=this.lines[r];if(!s||s.isCue)continue;const o=r<t?`past(${t-r})`:r===t?"ACTIVE":`fut(${r-t})`,l=s.entries.filter(c=>!c._isCueDot).map(c=>{if(c._isCharSplit&&c._chars){const u=c._chars[0],h=u.fill?.scale?`(${u.fill.scale.x.toFixed(2)},${u.fill.scale.y.toFixed(2)})`:"?";return`"${c.text}"[${c.wt}] bOp=${u.base?.material?.opacity?.toFixed(3)||"?"} fOp=${u.fill?.material?.opacity?.toFixed(3)||"?"} fSc=${h} clip=${u.fill?.clipRect?"Y":"N"} p=${c._p.toFixed(2)}`}else{const u=c.fill?.scale?`(${c.fill.scale.x.toFixed(2)},${c.fill.scale.y.toFixed(2)})`:"?";return`"${c.text}"[${c.wt}] bOp=${c.base?.material?.opacity?.toFixed(3)||"?"} fOp=${c.fill?.material?.opacity?.toFixed(3)||"?"} fSc=${u} clip=${c.fill?.clipRect?c.fill.clipRect[2]>0?"open":"shut":"null"} p=${c._p.toFixed(2)}`}});console.log(`  #${r} ${o.padEnd(8)} cOp=${s._cOp.toFixed(3)} | ${l.join(" | ")}`)}}setDebug(e){this._debugEnabled=e,console.log(`[LyricsRenderer] Debug mode ${e?"ON \u2014 Shift+Click to inspect, logs every 5s":"OFF"}`)}}class st{constructor(){this.scene=new Oa,this.camera=new Wt(75,window.innerWidth/window.innerHeight,.1,1e3)}resize(e,t,a){this.camera instanceof Wt&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix())}}var lt=`varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Yp=`precision highp float;
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
}`;class $p extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Yp,uniforms:{u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(1705267),new fe(4856130),new fe(996448)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_treble.value=e.treble}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Kp=`precision highp float;
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
}`,Zp=`uniform sampler2D u_positions;
uniform float u_bass;
attribute vec2 a_ref;
varying vec3 vColor;

void main() {
  vec3 pos = texture2D(u_positions, a_ref).xyz;
  
  pos *= 0.03 * (1.0 + u_bass * 0.5);
  vColor = normalize(abs(pos)) * 0.8 + 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 1.5;
}`,Qp=`varying vec3 vColor;
void main() {
  gl_FragColor = vec4(vColor, 1.0);
}`;const ft=512;class Jp extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.scene.background=new fe(328208),this.camera.position.z=3;const t=new Float32Array(ft*ft*4);for(let l=0;l<ft*ft;l++)t[l*4]=(Math.random()-.5)*50,t[l*4+1]=(Math.random()-.5)*50,t[l*4+2]=Math.random()*50,t[l*4+3]=1;const a=new jr(t,ft,ft,1023,1015);a.needsUpdate=!0;const i={minFilter:1003,magFilter:1003,format:1023,type:1015};this.rt1=new mt(ft,ft,i),this.rt2=new mt(ft,ft,i),this.simCamera=new it(-1,1,1,-1,0,1),this.simScene=new Oa,this.simMaterial=new Ye({vertexShader:lt,fragmentShader:Kp,uniforms:{u_positions:{value:a},u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_resolution:{value:new Fe(ft,ft)}}});const r=new We(new et(2,2),this.simMaterial);this.simScene.add(r),e.setRenderTarget(this.rt1),e.render(this.simScene,this.simCamera),e.setRenderTarget(null);const s=new Float32Array(ft*ft*2);for(let l=0;l<ft;l++)for(let c=0;c<ft;c++){const u=l*ft+c;s[u*2]=c/ft,s[u*2+1]=l/ft}const o=new Xt;o.setAttribute("position",new Ht(new Float32Array(ft*ft*3),3)),o.setAttribute("a_ref",new Ht(s,2)),this.renderMaterial=new Ye({vertexShader:Zp,fragmentShader:Qp,uniforms:{u_positions:{value:this.rt1.texture},u_bass:{value:0}},transparent:!0,depthWrite:!1}),this.particles=new Cf(o,this.renderMaterial),this.scene.add(this.particles),this.gpuCompute={rt1:this.rt1,rt2:this.rt2,simMat:this.simMaterial,mesh:r}}update(e,t){const a=this.flip?this.rt2:this.rt1,i=this.flip?this.rt1:this.rt2;this.simMaterial.uniforms.u_positions.value=a.texture,this.simMaterial.uniforms.u_time.value=t,this.simMaterial.uniforms.u_bass.value=e.bass,this.simMaterial.uniforms.u_treble.value=e.treble,this.renderer.setRenderTarget(i),this.renderer.render(this.simScene,this.simCamera),this.renderer.setRenderTarget(null),this.renderMaterial.uniforms.u_positions.value=i.texture,this.renderMaterial.uniforms.u_bass.value=e.bass,this.flip=!this.flip,this.camera.position.x=Math.sin(t*.1)*3,this.camera.position.z=Math.cos(t*.1)*3,this.camera.lookAt(0,0,0)}dispose(){this.rt1.dispose(),this.rt2.dispose(),this.simMaterial.dispose(),this.renderMaterial.dispose()}}var em=`uniform float u_time;
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
}`,tm=`uniform float u_time;
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
}`;class im extends st{constructor(){super(),this.scene.background=new fe(196882),this.camera.position.z=3,this.freqData=new Uint8Array(256),this.freqTexture=new jr(this.freqData,256,1,1028,1009),this.freqTexture.needsUpdate=!0,this.material=new Ye({vertexShader:em,fragmentShader:tm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_freqData:{value:this.freqTexture},u_colors:{value:[new fe(196882),new fe(1718906),new fe(8247039)]}}});const e=new We(new Qn(1,128,128),this.material);this.scene.add(e),this.scene.add(new Ff(1118498))}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble;for(let a=0;a<256;a++){const i=a/256;this.freqData[a]=Math.floor((e.bass*(1-i)+e.treble*i)*255*(.5+.5*Math.sin(i*20+t*3)))}this.freqTexture.needsUpdate=!0}dispose(){this.material.dispose(),this.freqTexture.dispose()}}var rm=`precision highp float;
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
}`;const Ct=512;class am extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.camera=new it(-1,1,1,-1,0,1);const t={minFilter:1006,magFilter:1006,format:1023,type:1015};this.rt1=new mt(Ct,Ct,t),this.rt2=new mt(Ct,Ct,t);const a=new Float32Array(Ct*Ct*4);for(let r=0;r<Ct*Ct;r++){const s=r%Ct/Ct-.5,o=Math.floor(r/Ct)/Ct-.5;a[r*4]=1,a[r*4+1]=Math.abs(s)<.05&&Math.abs(o)<.05?1:0,a[r*4+2]=0,a[r*4+3]=1}const i=new jr(a,Ct,Ct,1023,1015);i.needsUpdate=!0,this.simCamera=new it(-1,1,1,-1,0,1),this.simScene=new Oa,this.simMaterial=new Ye({vertexShader:lt,fragmentShader:rm,uniforms:{u_state:{value:i},u_resolution:{value:new Fe(Ct,Ct)},u_bass:{value:0},u_treble:{value:0},u_time:{value:0}}}),this.simScene.add(new We(new et(2,2),this.simMaterial)),e.setRenderTarget(this.rt1),e.render(this.simScene,this.simCamera),e.setRenderTarget(null),this.displayMaterial=new Ii({map:this.rt1.texture}),this.scene.add(new We(new et(2,2),this.displayMaterial))}update(e,t){for(let a=0;a<8;a++){const i=this.flip?this.rt2:this.rt1,r=this.flip?this.rt1:this.rt2;this.simMaterial.uniforms.u_state.value=i.texture,this.simMaterial.uniforms.u_bass.value=e.bass,this.simMaterial.uniforms.u_treble.value=e.treble,this.simMaterial.uniforms.u_time.value=t,this.renderer.setRenderTarget(r),this.renderer.render(this.simScene,this.simCamera),this.flip=!this.flip}this.renderer.setRenderTarget(null),this.displayMaterial.map=(this.flip?this.rt2:this.rt1).texture,this.displayMaterial.needsUpdate=!0}dispose(){this.rt1.dispose(),this.rt2.dispose(),this.simMaterial.dispose(),this.displayMaterial.dispose()}}var nm=`precision highp float;
uniform float u_time;
uniform float u_rms;
uniform float u_mid;
uniform vec2 u_resolution;
varying vec2 vUv;

vec2 cdiv(vec2 a, vec2 b) {
  float d = dot(b, b);
  return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / d;
}

float hdist(vec2 a, vec2 b) {
  vec2 diff = a - b;
  float num = length(diff);
  float denom = length(vec2(1.0) - a * b);
  return log((1.0 + num/denom) / (1.0 - num/denom + 0.001));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;

  
  float zoom = 1.0 + u_rms * 2.0 + sin(u_time * 0.2) * 0.3;
  uv *= zoom;

  
  float r = length(uv);
  if (r > 0.99) {
    gl_FragColor = vec4(0.0);
    return;
  }

  
  float angle = atan(uv.y, uv.x);
  float n = 7.0; 

  
  vec2 z = uv;
  float edgeDist = 1.0;

  for (int i = 0; i < 12; i++) {
    
    float a = floor(atan(z.y, z.x) / (6.2832 / n) + 0.5) * (6.2832 / n);
    float cs = cos(-a), sn = sin(-a);
    z = vec2(z.x * cs - z.y * sn, z.x * sn + z.y * cs);

    
    float geoR = 1.0 / cos(3.14159 / n);
    vec2 center = vec2(geoR, 0.0);
    vec2 diff = z - center;
    float d = dot(diff, diff);
    float invR2 = geoR * geoR - 1.0;

    if (d < invR2) {
      z = center + diff * invR2 / d;
    } else {
      break;
    }

    edgeDist = min(edgeDist, abs(length(diff) - sqrt(invR2)));
  }

  
  float tile = mod(floor(atan(z.y, z.x) * n / 6.2832), 2.0);
  vec3 col = mix(vec3(0.05, 0.05, 0.2), vec3(0.1, 0.0, 0.3), tile);

  
  float edge = smoothstep(0.02, 0.0, edgeDist);
  col += vec3(0.3, 0.6, 1.0) * edge * (0.5 + u_mid * 2.0);

  
  col += vec3(0.1, 0.2, 0.5) * smoothstep(0.9, 1.0, r);

  gl_FragColor = vec4(col, 1.0);
}`;class om extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:nm,uniforms:{u_time:{value:0},u_rms:{value:0},u_mid:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)}}}),this.scene.add(new We(new et(2,2),this.material))}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_rms.value=e.rms,this.material.uniforms.u_mid.value=e.mid}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var sm=`uniform float u_time;
uniform float u_bass;
uniform float u_rms;
uniform vec2 u_resolution;
uniform vec3 u_colors[3];
uniform bool u_debug;
uniform float u_smoothing;

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

    gl_FragColor = vec4(finalCol, 1.0);
}`;class lm extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:sm,uniforms:{u_time:{value:0},u_bass:{value:0},u_rms:{value:0},u_smoothing:{value:.5},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(1705267),new fe(4856130),new fe(996448)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var cm=`precision highp float;
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
}`,um=`precision highp float;
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
}`;const Tr=256;class ul extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.camera=new it(-1,1,1,-1,0,1);const t=128,a=new Uint8Array(t*t*4);for(let u=0;u<t;u++)for(let h=0;h<t;h++){const d=(u*t+h)*4,f=h/t,g=u/t;a[d]=Math.floor((.1+f*.2)*255),a[d+1]=Math.floor((.05+g*.15)*255),a[d+2]=Math.floor((.2+(f+g)*.15)*255),a[d+3]=255}this.defaultTexture=new jr(a,t,t,1023),this.defaultTexture.needsUpdate=!0,this.albumTexture=this.defaultTexture;const i={minFilter:1006,magFilter:1006,format:1023,type:1016};this.velRT1=new mt(Tr,Tr,i),this.velRT2=new mt(Tr,Tr,i);const r=window.innerWidth,s=window.innerHeight,o={minFilter:1006,magFilter:1006,format:1023,type:1009};this.frameRT1=new mt(r,s,o),this.frameRT2=new mt(r,s,o),this.simCamera=new it(-1,1,1,-1,0,1),this.simScene=new Oa,this.velMaterial=new Ye({vertexShader:lt,fragmentShader:cm,uniforms:{u_velocity:{value:null},u_pressure:{value:null},u_resolution:{value:new Fe(Tr,Tr)},u_time:{value:0},u_bass:{value:0},u_dissipation:{value:.97}}});const l=new We(new et(2,2),this.velMaterial);this.simScene.add(l),this.canvasMaterial=new Ye({vertexShader:lt,fragmentShader:um,uniforms:{u_albumArt:{value:this.albumTexture},u_velocity:{value:this.velRT1.texture},u_prevFrame:{value:this.frameRT1.texture},u_resolution:{value:new Fe(r,s)},u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_rms:{value:0},u_healRate:{value:.02},u_colors:{value:[new fe(1705267),new fe(4856130),new fe(3377407)]}}});const c=new We(new et(2,2),this.canvasMaterial);this.scene.add(c),globalThis.__DEBUG__&&console.log("[LivingCanvas] Scene initialized")}setAlbumArt(e){new Lf().load(e,t=>{t.minFilter=1006,t.magFilter=1006,this.albumTexture=t,this.canvasMaterial.uniforms.u_albumArt.value=t,globalThis.__DEBUG__&&console.log("[LivingCanvas] Album art loaded:",e)},void 0,()=>{console.warn("[LivingCanvas] Failed to load album art, using default")})}setAlbumTexture(e){this.albumTexture=e,this.canvasMaterial.uniforms.u_albumArt.value=e}setPalette(e){this.canvasMaterial.uniforms.u_colors.value=e}update(e,t){const a=this.flip?this.velRT2:this.velRT1,i=this.flip?this.velRT1:this.velRT2;this.velMaterial.uniforms.u_velocity.value=a.texture,this.velMaterial.uniforms.u_pressure.value=a.texture,this.velMaterial.uniforms.u_time.value=t,this.velMaterial.uniforms.u_bass.value=e.bass,this.renderer.setRenderTarget(i),this.renderer.render(this.simScene,this.simCamera),this.renderer.setRenderTarget(null),this.canvasMaterial.uniforms.u_velocity.value=i.texture,this.canvasMaterial.uniforms.u_time.value=t,this.canvasMaterial.uniforms.u_bass.value=e.bass,this.canvasMaterial.uniforms.u_treble.value=e.treble,this.canvasMaterial.uniforms.u_rms.value=e.rms;const r=this.flip?this.frameRT2:this.frameRT1,s=this.flip?this.frameRT1:this.frameRT2;this.canvasMaterial.uniforms.u_prevFrame.value=r.texture,this.renderer.setRenderTarget(s),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(null),this.flip=!this.flip}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.canvasMaterial.uniforms.u_resolution.value.set(e*i,t*i),this.frameRT1.setSize(e,t),this.frameRT2.setSize(e,t)}dispose(){this.velRT1.dispose(),this.velRT2.dispose(),this.frameRT1.dispose(),this.frameRT2.dispose(),this.velMaterial.dispose(),this.canvasMaterial.dispose(),this.albumTexture!==this.defaultTexture&&this.albumTexture.dispose(),this.defaultTexture.dispose()}}var hm=`precision highp float;

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
}`;class dm extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:hm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(2754629),new fe(6570405),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var fm=`precision highp float;

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
}`;class pm extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:fm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(1706542),new fe(4876097),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var mm=`precision highp float;

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
}`;class gm extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:mm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(661032),new fe(1731386),new fe(65484)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var vm=`precision highp float;

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
}`;class _m extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:vm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(131592),new fe(2984526),new fe(65450)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var xm=`precision highp float;

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
}`;class ym extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:xm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(657946),new fe(6702250),new fe(52479)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var bm=`precision highp float;

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
}`;class Sm extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:bm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(657946),new fe(6702250),new fe(52479)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Mm=`precision highp float;

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
}`;class Tm extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Mm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(657946),new fe(16720486),new fe(52479)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var wm=`precision highp float;

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
}`;class Em extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:wm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(328976),new fe(16724872),new fe(61183)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Am=`precision highp float;

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
}`;class Cm extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Am,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(328976),new fe(16724872),new fe(61183)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Rm=`precision highp float;

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
}`;class Um extends st{constructor(){super(),this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Rm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new fe(328976),new fe(16724872),new fe(61183)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Pm=`precision highp float;

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
}`;class Lm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Pm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(661032),new fe(1731406),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:i,treble:r,rms:s}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>o*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+i*.3+r*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=i,this.material.uniforms.u_treble.value=r,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Dm=`precision highp float;

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
}`;class Fm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Dm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(133136),new fe(1722987),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:i,treble:r,rms:s}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>o*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.9,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.4+i*.35+r*.25)*2;this.currentEnergy=this.currentEnergy*.96+c*.04,this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=i,this.material.uniforms.u_treble.value=r,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Im=`precision highp float;

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
}`;class Om extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Im,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(661032),new fe(1731406),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:i,treble:r,rms:s}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>o*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+i*.3+r*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=i,this.material.uniforms.u_treble.value=r,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Nm=`precision highp float;

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
}`;class zm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Nm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(661032),new fe(1731406),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:i,treble:r,rms:s}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>o*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+i*.3+r*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=i,this.material.uniforms.u_treble.value=r,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var km=`precision highp float;

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
}`;class Bm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:km,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(661032),new fe(1731406),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:i,treble:r,rms:s}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>o*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+i*.3+r*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=i,this.material.uniforms.u_treble.value=r,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Gm=`precision highp float;

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
}`;class Hm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Gm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(661032),new fe(1731406),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:i,treble:r,rms:s}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>o*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+i*.3+r*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=i,this.material.uniforms.u_treble.value=r,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Vm=`precision highp float;

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
}`;class Wm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Vm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(661032),new fe(1731406),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:i,treble:r,rms:s}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>o*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+i*.3+r*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=i,this.material.uniforms.u_treble.value=r,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}var Xm=`precision highp float;

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
}`;class qm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new it(-1,1,1,-1,0,1),this.material=new Ye({vertexShader:lt,fragmentShader:Xm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Fe(window.innerWidth,window.innerHeight)},u_colors:{value:[new fe(661032),new fe(1731470),new fe(54527)]}}});const e=new We(new et(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:i,treble:r,rms:s}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const o=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>o*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+i*.3+r*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,s<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=i,this.material.uniforms.u_treble.value=r,this.material.uniforms.u_rms.value=s,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const i=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*i,t*i)}dispose(){this.material.dispose()}}const wr=200,jm=12,Ym=`
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
`,$m=`
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
`;class Km{constructor(){this.dummy=new Rt;const e=new et(.02,.3,1,jm);this.material=new Ye({vertexShader:Ym,fragmentShader:$m,transparent:!0,depthWrite:!1,side:2,uniforms:{u_time:{value:0},u_bass:{value:0},u_energy:{value:0},u_beat:{value:0},u_rms:{value:0},u_accentColor:{value:new fe(54527)}}}),this.mesh=new Ef(e,this.material,wr),this.mesh.frustumCulled=!1,this.mesh.layers.set(0),this.offsets=new Float32Array(wr*3),this.phases=new Float32Array(wr),this.speeds=new Float32Array(wr);const t=new Float32Array(wr*3);for(let a=0;a<wr;a++){const i=Math.random()*Math.PI*2,r=Math.acos(2*Math.random()-1),s=1.5+Math.random()*3;this.offsets[a*3]=s*Math.sin(r)*Math.cos(i),this.offsets[a*3+1]=s*Math.sin(r)*Math.sin(i),this.offsets[a*3+2]=s*Math.cos(r),this.phases[a]=Math.random()*Math.PI*2,this.speeds[a]=.3+Math.random()*.7;const o=.5+Math.random()*.3,l=new fe().setHSL(o,.7,.5);t[a*3]=l.r,t[a*3+1]=l.g,t[a*3+2]=l.b,this.dummy.position.set(0,0,0),this.dummy.updateMatrix(),this.mesh.setMatrixAt(a,this.dummy.matrix)}e.setAttribute("instanceOffset",new Vi(this.offsets,3)),e.setAttribute("instancePhase",new Vi(this.phases,1)),e.setAttribute("instanceSpeed",new Vi(this.speeds,1)),e.setAttribute("instanceColor",new Vi(t,3))}addToScene(e){e.add(this.mesh)}removeFromScene(e){e.remove(this.mesh)}setAccentColor(e){this.material.uniforms.u_accentColor.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_rms.value=e.rms;const a=(e.bass*.5+e.mid*.3+e.treble*.2)*2;this.material.uniforms.u_energy.value=Math.min(a,1),this.material.uniforms.u_beat.value=e.bass>.6?1:this.material.uniforms.u_beat.value*.9}setVisible(e){this.mesh.visible=e}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}}class Zm{constructor(e){this.scenes=[],this.sceneFactories=[],this.currentIdx=0,this.running=!1,this.frameId=0,this.overlayOpacity=1,this.zenFadeTarget=1,this.zenFadeCurrent=1,this.gpuTextEnabled=!0,this.uiVisible=!1,this._currentPalette=null,this.maxFps=0,this.lastFrameTime=0,this._scrollPaused=!1,this._loopDbg=0,this.timeScale=1,this.timeScaleTarget=1,this.timeScaleLerpSpeed=.005,this.dilatedTime=0,this.lastRealTime=0,this.loop=()=>{if(!this.running||(this.frameId=requestAnimationFrame(this.loop),this._scrollPaused))return;if(this.maxFps>0){const v=performance.now(),p=1e3/this.maxFps;if(v-this.lastFrameTime<p)return;this.lastFrameTime=v}const c=performance.now()*.001,u=this.lastRealTime>0?Math.min(c-this.lastRealTime,.1):.016;this.lastRealTime=c,this.timeScale+=(this.timeScaleTarget-this.timeScale)*this.timeScaleLerpSpeed;const h=Math.abs(this.timeScale-this.timeScaleTarget)>.05?1/60:u;this.dilatedTime+=h*this.timeScale,this.dilatedTime>1e4&&(this.dilatedTime-=1e4);const d=this.audioProcessor.update(),f=this.zenFadeCurrent;this.zenFadeCurrent+=(this.zenFadeTarget-this.zenFadeCurrent)*.05,Math.abs(this.zenFadeCurrent-f)>.001&&(this.renderer.domElement.style.opacity=String(this.zenFadeCurrent)),this.current.update(d,this.dilatedTime),this.gpuTypography.update(d.rms);const g=window.musicRuntime?.audioEngine?.audioElement;if(g&&this.lyricsRenderer.setCurrentTime(g.currentTime),this.lyricsRenderer.update(d.rms),this.kineticRibbons.update(d,this.dilatedTime),this.postProcessing.update(d),this.postProcessing.composer.render(),this.postProcessing.renderText(),this._loopDbg||(this._loopDbg=0),this._loopDbg++,this._loopDbg%300,globalThis.__PERF_MODE__){const v=globalThis;v._chromicMathVisualizer||(v._chromicMathVisualizer={});const p=v._chromicMathVisualizer;p.running=this.running,p._sceneIdx=this.currentIdx,p._sceneName=this.current?.constructor?.name||`Scene ${this.currentIdx}`,p._sceneCount=this.sceneFactories.length,p._rendererInfo={drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles},p.setScene=m=>this.setScene(m)}},this._resizeDebounce=0,this._savedResScale=0,this.container=e.container,this.resolutionScale=e.resolutionScale??1,this.renderer=new ws({alpha:!0,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.debug.checkShaderErrors=!0,this.renderer.setClearColor(0,0),this.renderer.setPixelRatio(window.devicePixelRatio*this.resolutionScale);const t=this.renderer.domElement;t.style.position="absolute",t.style.inset="0",t.style.width="100%",t.style.height="100%",t.style.pointerEvents="none",t.style.zIndex="0",this.container.appendChild(t);const a=this.container.clientWidth||window.innerWidth,i=this.container.clientHeight||window.innerHeight;this.renderer.setSize(a,i,!1),this.audioProcessor=new Nf(e.analyser),this.sceneFactories=[()=>new lm,()=>new $p,()=>new Jp(this.renderer),()=>new im,()=>new am(this.renderer),()=>new om,()=>new ul(this.renderer),()=>new dm,()=>new pm,()=>new gm,()=>new _m,()=>new ym,()=>new Sm,()=>new Tm,()=>new Em,()=>new Cm,()=>new Um,()=>new Lm,()=>new Fm,()=>new Om,()=>new zm,()=>new Bm,()=>new Hm,()=>new Wm,()=>new qm],this.scenes=new Array(this.sceneFactories.length).fill(null),this.current=this.getOrCreateScene(0),this.postProcessing=new qf(this.renderer,this.current.scene,this.current.camera),this.gpuTypography=new Hp(this.current.camera),this.gpuTypography.addToScene(this.current.scene),this.gpuTypography.setVisible(!1),this.lyricsRenderer=new jp,this.lyricsRenderer.addToScene(this.current.scene),this.lyricsRenderer.setVisible(!0),this.lyricsRenderer.setAspect(a,i),this.container.addEventListener("wheel",c=>{const u=this.container.getBoundingClientRect();(c.clientX-u.left)/u.width*2-1>-.1&&(c.preventDefault(),this.lyricsRenderer.handleWheel(c.deltaY))},{passive:!1}),this.container.addEventListener("click",c=>{const u=this.container.getBoundingClientRect(),h=(c.clientX-u.left)/u.width*2-1,d=-((c.clientY-u.top)/u.height)*2+1;console.log(`[Orchestrator] click event: ndcX=${h.toFixed(2)} ndcY=${d.toFixed(2)} target=${c.target?.tagName}`),c.shiftKey?this.lyricsRenderer.debugInspectClick(h,d,this.renderer,c.clientX,c.clientY):this.lyricsRenderer.handleClick(h,d)}),this.lyricsRenderer.onSeek(c=>{console.log(`[Orchestrator] seek \u2192 ${c.toFixed(3)}s`),document.dispatchEvent(new CustomEvent("visualizer-seek",{detail:{time:c}}));const u=window.musicRuntime?.audioEngine?.audioElement||document.querySelector("audio")||document.getElementById("globalAudio");u&&typeof u.currentTime=="number"&&(u.currentTime=c)}),this.kineticRibbons=new Km,this.kineticRibbons.addToScene(this.current.scene),this.current.camera.layers.enable(1),globalThis.__DEBUG__&&console.log(`[Visualizer] Initialized with ${this.sceneFactories.length} scenes (lazy)`),globalThis.__DEBUG__&&console.log("[Visualizer] Scenes: Lava, Julia, Lorenz, Riemann, ReactionDiffusion, Hyperbolic, LivingCanvas, FractalInfinity"),globalThis.__lyricsDebug=(c=!0)=>{this.lyricsRenderer.setDebug(c)},globalThis.__lyricsRenderer=this.lyricsRenderer,document.addEventListener("uiToggle",c=>{this.setUiVisible(c.detail?.visible??!1)}),new ResizeObserver(()=>this.handleResize()).observe(this.container);let r=0,s=!1;const o=this.renderer.domElement,l=()=>{!s&&this.running&&(s=!0,this._scrollPaused=!0,o.style.transition="none",o.style.filter="blur(8px) saturate(1.3)"),clearTimeout(r),r=window.setTimeout(()=>{s&&(s=!1,this._scrollPaused=!1,o.style.transition="filter 0.3s ease-out",o.style.filter="",setTimeout(()=>{o.style.transition=""},350))},200)};document.addEventListener("scroll",l,{capture:!0,passive:!0}),document.addEventListener("keydown",c=>{const u=c.target;if(u?.isContentEditable||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA")return;const h=Number(c.key);h>=1&&h<=9&&this.setScene(h-1),c.key==="0"&&this.setScene(9),c.key.toLowerCase()==="z"&&(this.uiVisible=!this.uiVisible,this.setUiVisible(this.uiVisible))})}getOrCreateScene(e){if(this.scenes[e])return this.scenes[e];const t=this.sceneFactories[e]();return t.camera.layers.enable(1),this.scenes[e]=t,this._currentPalette&&typeof t.setPalette=="function"&&t.setPalette(this._currentPalette),t}setScene(e){e<0||e>=this.sceneFactories.length||e===this.currentIdx&&this.scenes[e]||(globalThis.__DEBUG__&&console.log(`[Visualizer] Switching scene: ${this.currentIdx} \u2192 ${e}`),this.gpuTypography.removeFromScene(this.current.scene),this.lyricsRenderer.removeFromScene(this.current.scene),this.kineticRibbons.removeFromScene(this.current.scene),this.currentIdx=e,this.current=this.getOrCreateScene(e),this._currentPalette&&typeof this.current.setPalette=="function"&&this.current.setPalette(this._currentPalette),this.postProcessing.updateScene(this.current.scene,this.current.camera),this.gpuTypography.addToScene(this.current.scene),this.lyricsRenderer.addToScene(this.current.scene),this.current.camera instanceof it&&this.kineticRibbons.addToScene(this.current.scene),this.handleResize())}setResolutionScale(e){this.resolutionScale=Math.max(.1,Math.min(2,e)),this.renderer.setPixelRatio(window.devicePixelRatio*this.resolutionScale);const t=this.container.clientWidth||window.innerWidth,a=this.container.clientHeight||window.innerHeight;if(t===0||a===0)return;this.renderer.setSize(t,a,!1),this.postProcessing.setSize(t,a);const i=window.devicePixelRatio*this.resolutionScale;this.current.resize(t,a,i)}setMaxFps(e){this.maxFps=Math.max(0,Math.round(e))}setTimeScale(e,t=600){this.timeScaleTarget=Math.max(0,Math.min(3,e)),this.timeScaleLerpSpeed=1-Math.pow(.05,16/t)}setZenMode(e){this.zenFadeTarget=e?.15:1}setUiVisible(e){this.uiVisible=e,this.gpuTypography.setVisible(e),this.lyricsRenderer.setVisible(e),this.lyricsRenderer.setControlsVisible(e),this.postProcessing.setUiVisibility(e)}setTrack(e,t){globalThis.__DEBUG__&&console.log(`[Visualizer] setTrack: "${e}" - "${t}"`),this.gpuTypography.setTrack(e,t),this.setScene(0),this.setUiVisible(!0)}setPalette(e){const t=e.map(i=>new fe(i));this._currentPalette=t;const a=this.scenes[this.currentIdx];a&&typeof a.setPalette=="function"&&a.setPalette(t),this.kineticRibbons.setAccentColor(t[2]),this.lyricsRenderer.setAccentColor(t[0])}setAlbumArt(e){globalThis.__DEBUG__&&console.log("[Visualizer] setAlbumArt:",e);const t=this.scenes[6];t instanceof ul&&t.setAlbumArt(e)}setLyricsTimeline(e,t,a){this.lyricsRenderer.setTimeline(e,t,a),this.gpuTypography.setVisible(!1),this.lyricsRenderer.setVisible(!0)}setCurrentTime(e){this.lyricsRenderer.setCurrentTime(e)}start(){this.running||(this.running=!0,this.lastRealTime=performance.now()*.001,this.dilatedTime>3600&&(this.dilatedTime=0),requestAnimationFrame(()=>this.handleResize()),this.loop())}renderFrame(){const e=performance.now()*.001;this.lastRealTime===0&&(this.lastRealTime=e);const t=Math.min(e-this.lastRealTime,.1)||.016;this.lastRealTime=e,this.timeScale+=(this.timeScaleTarget-this.timeScale)*this.timeScaleLerpSpeed,this.dilatedTime+=t*this.timeScale,this.dilatedTime>1e4&&(this.dilatedTime-=1e4);const a=this.audioProcessor.update();this.zenFadeCurrent+=(this.zenFadeTarget-this.zenFadeCurrent)*.05,this.renderer.domElement.style.opacity=String(this.zenFadeCurrent),this.current.update(a,this.dilatedTime),this.gpuTypography.update(a.rms);const i=window.musicRuntime?.audioEngine?.audioElement;i&&this.lyricsRenderer.setCurrentTime(i.currentTime),this.lyricsRenderer.update(a.rms),this.kineticRibbons.update(a,this.dilatedTime),this.postProcessing.update(a),this.postProcessing.composer.render(),this.postProcessing.renderText()}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}dispose(){this.stop(),this.scenes.forEach(e=>e?.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}handleResize(){const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;if(e===0||t===0)return;const a=this.renderer.domElement;this._savedResScale||(this._savedResScale=this.resolutionScale,this.resolutionScale=.25,this.renderer.setPixelRatio(window.devicePixelRatio*.25),a.style.transition="none",a.style.filter="blur(8px) saturate(1.3)",a.style.opacity="1"),this.renderer.setSize(e,t,!1),this.renderer.setViewport(0,0,e,t),this.postProcessing.setSize(e,t),this.lyricsRenderer.setAspect(e,t);const i=window.devicePixelRatio*this.resolutionScale;this.current.resize(e,t,i),this.running&&this.renderFrame(),clearTimeout(this._resizeDebounce),this._resizeDebounce=window.setTimeout(()=>{const r=this._savedResScale||.6;this._savedResScale=0,this.resolutionScale=r,this.renderer.setPixelRatio(window.devicePixelRatio*r);const s=this.container.clientWidth||window.innerWidth,o=this.container.clientHeight||window.innerHeight;this.renderer.setSize(s,o,!1),this.renderer.setViewport(0,0,s,o),this.postProcessing.setSize(s,o),this.current.resize(s,o,window.devicePixelRatio*r),this.running&&this.renderFrame(),a.style.transition="filter 0.3s ease-out",a.style.filter=""},150)}}export{Zm as ThreeOrchestrator};
