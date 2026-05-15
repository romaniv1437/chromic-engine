const km="162",Gm="",ir="srgb",gr="srgb-linear",Za="display-p3",ta="display-p3-linear",ra="linear",nt="srgb",ia="rec709",Hm="p3",is="300 es";class Vr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(t)===-1&&a[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const a=this._listeners;return a[e]!==void 0&&a[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const r=a.indexOf(t);r!==-1&&a.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const a=t.slice(0);for(let r=0,i=a.length;r<i;r++)a[r].call(this,e);e.target=null}}}const Et=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ka=Math.PI/180,Ja=180/Math.PI;function Ai(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Et[n&255]+Et[n>>8&255]+Et[n>>16&255]+Et[n>>24&255]+"-"+Et[e&255]+Et[e>>8&255]+"-"+Et[e>>16&15|64]+Et[e>>24&255]+"-"+Et[t&63|128]+Et[t>>8&255]+"-"+Et[t>>16&255]+Et[t>>24&255]+Et[a&255]+Et[a>>8&255]+Et[a>>16&255]+Et[a>>24&255]).toLowerCase()}function It(n,e,t){return Math.max(e,Math.min(t,n))}function rl(n,e){return(n%e+e)%e}function $a(n,e,t){return(1-t)*n+t*e}function as(n){return(n&n-1)===0&&n!==0}function Qa(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ci(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ie{constructor(e=0,t=0){Ie.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,a=this.y,r=e.elements;return this.x=r[0]*t+r[3]*a+r[6],this.y=r[1]*t+r[4]*a+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const a=this.dot(e)/t;return Math.acos(It(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,a=this.y-e.y;return t*t+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const a=Math.cos(t),r=Math.sin(t),i=this.x-e.x,o=this.y-e.y;return this.x=i*a-o*r+e.x,this.y=i*r+o*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,a,r,i,o,s,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,a,r,i,o,s,l,c)}set(e,t,a,r,i,o,s,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=s,u[3]=t,u[4]=i,u[5]=l,u[6]=a,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,a=e.elements;return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],this}extractBasis(e,t,a){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const a=e.elements,r=t.elements,i=this.elements,o=a[0],s=a[3],l=a[6],c=a[1],u=a[4],h=a[7],d=a[2],f=a[5],g=a[8],v=r[0],p=r[3],m=r[6],T=r[1],_=r[4],S=r[7],R=r[2],A=r[5],M=r[8];return i[0]=o*v+s*T+l*R,i[3]=o*p+s*_+l*A,i[6]=o*m+s*S+l*M,i[1]=c*v+u*T+h*R,i[4]=c*p+u*_+h*A,i[7]=c*m+u*S+h*M,i[2]=d*v+f*T+g*R,i[5]=d*p+f*_+g*A,i[8]=d*m+f*S+g*M,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],a=e[1],r=e[2],i=e[3],o=e[4],s=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*s*c-a*i*u+a*s*l+r*i*c-r*o*l}invert(){const e=this.elements,t=e[0],a=e[1],r=e[2],i=e[3],o=e[4],s=e[5],l=e[6],c=e[7],u=e[8],h=u*o-s*c,d=s*l-u*i,f=c*i-o*l,g=t*h+a*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(r*c-u*a)*v,e[2]=(s*a-r*o)*v,e[3]=d*v,e[4]=(u*t-r*l)*v,e[5]=(r*i-s*t)*v,e[6]=f*v,e[7]=(a*l-c*t)*v,e[8]=(o*t-a*i)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,a,r,i,o,s){const l=Math.cos(i),c=Math.sin(i);return this.set(a*l,a*c,-a*(l*o+c*s)+o+e,-r*c,r*l,-r*(-c*o+l*s)+s+t,0,0,1),this}scale(e,t){return this.premultiply(en.makeScale(e,t)),this}rotate(e){return this.premultiply(en.makeRotation(-e)),this}translate(e,t){return this.premultiply(en.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,-a,0,a,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,a=e.elements;for(let r=0;r<9;r++)if(t[r]!==a[r])return!1;return!0}fromArray(e,t=0){for(let a=0;a<9;a++)this.elements[a]=e[a+t];return this}toArray(e=[],t=0){const a=this.elements;return e[t]=a[0],e[t+1]=a[1],e[t+2]=a[2],e[t+3]=a[3],e[t+4]=a[4],e[t+5]=a[5],e[t+6]=a[6],e[t+7]=a[7],e[t+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const en=new Ke;function ns(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ri(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function il(){const n=Ri("canvas");return n.style.display="block",n}const ss={};function al(n){n in ss||(ss[n]=!0,console.warn(n))}const os=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ls=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),aa={[gr]:{transfer:ra,primaries:ia,toReference:n=>n,fromReference:n=>n},[ir]:{transfer:nt,primaries:ia,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ta]:{transfer:ra,primaries:"p3",toReference:n=>n.applyMatrix3(ls),fromReference:n=>n.applyMatrix3(os)},[Za]:{transfer:nt,primaries:"p3",toReference:n=>n.convertSRGBToLinear().applyMatrix3(ls),fromReference:n=>n.applyMatrix3(os).convertLinearToSRGB()}},nl=new Set([gr,ta]),rt={enabled:!0,_workingColorSpace:gr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!nl.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const a=aa[e].toReference,r=aa[t].fromReference;return r(a(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return aa[n].primaries},getTransfer:function(n){return n===""?ra:aa[n].transfer}};function Wr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function tn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Xr;class cs{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Xr===void 0&&(Xr=Ri("canvas")),Xr.width=e.width,Xr.height=e.height;const a=Xr.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),t=Xr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ri("canvas");t.width=e.width,t.height=e.height;const a=t.getContext("2d");a.drawImage(e,0,0,e.width,e.height);const r=a.getImageData(0,0,e.width,e.height),i=r.data;for(let o=0;o<i.length;o++)i[o]=Wr(i[o]/255)*255;return a.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let a=0;a<t.length;a++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[a]=Math.floor(Wr(t[a]/255)*255):t[a]=Wr(t[a]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sl=0;class us{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sl++}),this.uuid=Ai(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const a={uuid:this.uuid,url:""},r=this.data;if(r!==null){let i;if(Array.isArray(r)){i=[];for(let o=0,s=r.length;o<s;o++)r[o].isDataTexture?i.push(rn(r[o].image)):i.push(rn(r[o]))}else i=rn(r);a.url=i}return t||(e.images[this.uuid]=a),a}}function rn(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?cs.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ol=0;class St extends Vr{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,a=1001,r=1001,i=1006,o=1008,s=1023,l=1009,c=St.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ol++}),this.uuid=Ai(),this.name="",this.source=new us(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=a,this.wrapT=r,this.magFilter=i,this.minFilter=o,this.anisotropy=c,this.format=s,this.internalFormat=null,this.type=l,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),t||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}St.DEFAULT_IMAGE=null,St.DEFAULT_MAPPING=300,St.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,a=0,r=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=a,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,a,r){return this.x=e,this.y=t,this.z=a,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,a=this.y,r=this.z,i=this.w,o=e.elements;return this.x=o[0]*t+o[4]*a+o[8]*r+o[12]*i,this.y=o[1]*t+o[5]*a+o[9]*r+o[13]*i,this.z=o[2]*t+o[6]*a+o[10]*r+o[14]*i,this.w=o[3]*t+o[7]*a+o[11]*r+o[15]*i,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,a,r,i;const o=e.elements,s=o[0],l=o[4],c=o[8],u=o[1],h=o[5],d=o[9],f=o[2],g=o[6],v=o[10];if(Math.abs(l-u)<.01&&Math.abs(c-f)<.01&&Math.abs(d-g)<.01){if(Math.abs(l+u)<.1&&Math.abs(c+f)<.1&&Math.abs(d+g)<.1&&Math.abs(s+h+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const m=(s+1)/2,T=(h+1)/2,_=(v+1)/2,S=(l+u)/4,R=(c+f)/4,A=(d+g)/4;return m>T&&m>_?m<.01?(a=0,r=.707106781,i=.707106781):(a=Math.sqrt(m),r=S/a,i=R/a):T>_?T<.01?(a=.707106781,r=0,i=.707106781):(r=Math.sqrt(T),a=S/r,i=A/r):_<.01?(a=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),a=R/i,r=A/i),this.set(a,r,i,t),this}let p=Math.sqrt((g-d)*(g-d)+(c-f)*(c-f)+(u-l)*(u-l));return Math.abs(p)<.001&&(p=1),this.x=(g-d)/p,this.y=(c-f)/p,this.z=(u-l)/p,this.w=Math.acos((s+h+v-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this.z=e.z+(t.z-e.z)*a,this.w=e.w+(t.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ll extends Vr{constructor(e=1,t=1,a={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const r={width:e,height:t,depth:1};a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},a);const i=new St(r,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.colorSpace);i.flipY=!1,i.generateMipmaps=a.generateMipmaps,i.internalFormat=a.internalFormat,this.textures=[];const o=a.count;for(let s=0;s<o;s++)this.textures[s]=i.clone(),this.textures[s].isRenderTargetTexture=!0;this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.depthTexture=a.depthTexture,this.samples=a.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,a=1){if(this.width!==e||this.height!==t||this.depth!==a){this.width=e,this.height=t,this.depth=a;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=a;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let a=0,r=e.textures.length;a<r;a++)this.textures[a]=e.textures[a].clone(),this.textures[a].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new us(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pt extends ll{constructor(e=1,t=1,a={}){super(e,t,a),this.isWebGLRenderTarget=!0}}class hs extends St{constructor(e=null,t=1,a=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:a,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cl extends St{constructor(e=null,t=1,a=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:a,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pi{constructor(e=0,t=0,a=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=a,this._w=r}static slerpFlat(e,t,a,r,i,o,s){let l=a[r+0],c=a[r+1],u=a[r+2],h=a[r+3];const d=i[o+0],f=i[o+1],g=i[o+2],v=i[o+3];if(s===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(s===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==d||c!==f||u!==g){let p=1-s;const m=l*d+c*f+u*g+h*v,T=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){const R=Math.sqrt(_),A=Math.atan2(R,m*T);p=Math.sin(p*A)/R,s=Math.sin(s*A)/R}const S=s*T;if(l=l*p+d*S,c=c*p+f*S,u=u*p+g*S,h=h*p+v*S,p===1-s){const R=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=R,c*=R,u*=R,h*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,a,r,i,o){const s=a[r],l=a[r+1],c=a[r+2],u=a[r+3],h=i[o],d=i[o+1],f=i[o+2],g=i[o+3];return e[t]=s*g+u*h+l*f-c*d,e[t+1]=l*g+u*d+c*h-s*f,e[t+2]=c*g+u*f+s*d-l*h,e[t+3]=u*g-s*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,a,r){return this._x=e,this._y=t,this._z=a,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const a=e._x,r=e._y,i=e._z,o=e._order,s=Math.cos,l=Math.sin,c=s(a/2),u=s(r/2),h=s(i/2),d=l(a/2),f=l(r/2),g=l(i/2);switch(o){case"XYZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h+d*f*g;break;case"YZX":this._x=d*u*h+c*f*g,this._y=c*f*h+d*u*g,this._z=c*u*g-d*f*h,this._w=c*u*h-d*f*g;break;case"XZY":this._x=d*u*h-c*f*g,this._y=c*f*h-d*u*g,this._z=c*u*g+d*f*h,this._w=c*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const a=t/2,r=Math.sin(a);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,a=t[0],r=t[4],i=t[8],o=t[1],s=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=a+s+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(i-c)*f,this._z=(o-r)*f}else if(a>s&&a>h){const f=2*Math.sqrt(1+a-s-h);this._w=(u-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(i+c)/f}else if(s>h){const f=2*Math.sqrt(1+s-a-h);this._w=(i-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-a-s);this._w=(o-r)/f,this._x=(i+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let a=e.dot(t)+1;return a<Number.EPSILON?(a=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=a):(this._x=0,this._y=-e.z,this._z=e.y,this._w=a)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=a),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,t){const a=this.angleTo(e);if(a===0)return this;const r=Math.min(1,t/a);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const a=e._x,r=e._y,i=e._z,o=e._w,s=t._x,l=t._y,c=t._z,u=t._w;return this._x=a*u+o*s+r*c-i*l,this._y=r*u+o*l+i*s-a*c,this._z=i*u+o*c+a*l-r*s,this._w=o*u-a*s-r*l-i*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const a=this._x,r=this._y,i=this._z,o=this._w;let s=o*e._w+a*e._x+r*e._y+i*e._z;if(s<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,s=-s):this.copy(e),s>=1)return this._w=o,this._x=a,this._y=r,this._z=i,this;const l=1-s*s;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*a+t*this._x,this._y=f*r+t*this._y,this._z=f*i+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,s),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=a*h+this._x*d,this._y=r*h+this._y*d,this._z=i*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,a){return this.copy(e).slerp(t,a)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),a=Math.random(),r=Math.sqrt(1-a),i=Math.sqrt(a);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class re{constructor(e=0,t=0,a=0){re.prototype.isVector3=!0,this.x=e,this.y=t,this.z=a}set(e,t,a){return a===void 0&&(a=this.z),this.x=e,this.y=t,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ds.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ds.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,a=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*a+i[6]*r,this.y=i[1]*t+i[4]*a+i[7]*r,this.z=i[2]*t+i[5]*a+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,a=this.y,r=this.z,i=e.elements,o=1/(i[3]*t+i[7]*a+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*a+i[8]*r+i[12])*o,this.y=(i[1]*t+i[5]*a+i[9]*r+i[13])*o,this.z=(i[2]*t+i[6]*a+i[10]*r+i[14])*o,this}applyQuaternion(e){const t=this.x,a=this.y,r=this.z,i=e.x,o=e.y,s=e.z,l=e.w,c=2*(o*r-s*a),u=2*(s*t-i*r),h=2*(i*a-o*t);return this.x=t+l*c+o*h-s*u,this.y=a+l*u+s*c-i*h,this.z=r+l*h+i*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,a=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*a+i[8]*r,this.y=i[1]*t+i[5]*a+i[9]*r,this.z=i[2]*t+i[6]*a+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this.z=e.z+(t.z-e.z)*a,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const a=e.x,r=e.y,i=e.z,o=t.x,s=t.y,l=t.z;return this.x=r*l-i*s,this.y=i*o-a*l,this.z=a*s-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const a=e.dot(this)/t;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return an.copy(this).projectOnVector(e),this.sub(an)}reflect(e){return this.sub(an.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const a=this.dot(e)/t;return Math.acos(It(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,a=this.y-e.y,r=this.z-e.z;return t*t+a*a+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,a){const r=Math.sin(t)*e;return this.x=r*Math.sin(a),this.y=Math.cos(t)*e,this.z=r*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,a){return this.x=e*Math.sin(t),this.y=a,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=a,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,a=Math.sqrt(1-t*t);return this.x=a*Math.cos(e),this.y=t,this.z=a*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const an=new re,ds=new Pi;class sr{constructor(e=new re(1/0,1/0,1/0),t=new re(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,a=e.length;t<a;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,a=e.count;t<a;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,a=e.length;t<a;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const a=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const a=e.geometry;if(a!==void 0){const i=a.getAttribute("position");if(t===!0&&i!==void 0&&e.isInstancedMesh!==!0)for(let o=0,s=i.count;o<s;o++)e.isMesh===!0?e.getVertexPosition(o,Qt):Qt.fromBufferAttribute(i,o),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),na.copy(e.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),na.copy(a.boundingBox)),na.applyMatrix4(e.matrixWorld),this.union(na)}const r=e.children;for(let i=0,o=r.length;i<o;i++)this.expandByObject(r[i],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,a;return e.normal.x>0?(t=e.normal.x*this.min.x,a=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,a=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,a+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,a+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,a+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,a+=e.normal.z*this.min.z),t<=-e.constant&&a>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),sa.subVectors(this.max,Ui),qr.subVectors(e.a,Ui),jr.subVectors(e.b,Ui),Yr.subVectors(e.c,Ui),vr.subVectors(jr,qr),_r.subVectors(Yr,jr),wr.subVectors(qr,Yr);let t=[0,-vr.z,vr.y,0,-_r.z,_r.y,0,-wr.z,wr.y,vr.z,0,-vr.x,_r.z,0,-_r.x,wr.z,0,-wr.x,-vr.y,vr.x,0,-_r.y,_r.x,0,-wr.y,wr.x,0];return!nn(t,qr,jr,Yr,sa)||(t=[1,0,0,0,1,0,0,0,1],!nn(t,qr,jr,Yr,sa))?!1:(oa.crossVectors(vr,_r),t=[oa.x,oa.y,oa.z],nn(t,qr,jr,Yr,sa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(or[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),or[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),or[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),or[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),or[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),or[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),or[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),or[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(or),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const or=[new re,new re,new re,new re,new re,new re,new re,new re],Qt=new re,na=new sr,qr=new re,jr=new re,Yr=new re,vr=new re,_r=new re,wr=new re,Ui=new re,sa=new re,oa=new re,Ar=new re;function nn(n,e,t,a,r){for(let i=0,o=n.length-3;i<=o;i+=3){Ar.fromArray(n,i);const s=r.x*Math.abs(Ar.x)+r.y*Math.abs(Ar.y)+r.z*Math.abs(Ar.z),l=e.dot(Ar),c=t.dot(Ar),u=a.dot(Ar);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>s)return!1}return!0}const ul=new sr,Di=new re,sn=new re;class Cr{constructor(e=new re,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const a=this.center;t!==void 0?a.copy(t):ul.setFromPoints(e).getCenter(a);let r=0;for(let i=0,o=e.length;i<o;i++)r=Math.max(r,a.distanceToSquared(e[i]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const a=this.center.distanceToSquared(e);return t.copy(e),a>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Di.subVectors(e,this.center);const t=Di.lengthSq();if(t>this.radius*this.radius){const a=Math.sqrt(t),r=(a-this.radius)*.5;this.center.addScaledVector(Di,r/a),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sn.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Di.copy(e.center).add(sn)),this.expandByPoint(Di.copy(e.center).sub(sn))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const lr=new re,on=new re,la=new re,xr=new re,ln=new re,ca=new re,cn=new re;class fs{constructor(e=new re,t=new re(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,lr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const a=t.dot(this.direction);return a<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=lr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(lr.copy(this.origin).addScaledVector(this.direction,t),lr.distanceToSquared(e))}distanceSqToSegment(e,t,a,r){on.copy(e).add(t).multiplyScalar(.5),la.copy(t).sub(e).normalize(),xr.copy(this.origin).sub(on);const i=e.distanceTo(t)*.5,o=-this.direction.dot(la),s=xr.dot(this.direction),l=-xr.dot(la),c=xr.lengthSq(),u=Math.abs(1-o*o);let h,d,f,g;if(u>0)if(h=o*l-s,d=o*s-l,g=i*u,h>=0)if(d>=-g)if(d<=g){const v=1/u;h*=v,d*=v,f=h*(h+o*d+2*s)+d*(o*h+d+2*l)+c}else d=i,h=Math.max(0,-(o*d+s)),f=-h*h+d*(d+2*l)+c;else d=-i,h=Math.max(0,-(o*d+s)),f=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-o*i+s)),d=h>0?-i:Math.min(Math.max(-i,-l),i),f=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-i,-l),i),f=d*(d+2*l)+c):(h=Math.max(0,-(o*i+s)),d=h>0?i:Math.min(Math.max(-i,-l),i),f=-h*h+d*(d+2*l)+c);else d=o>0?-i:i,h=Math.max(0,-(o*d+s)),f=-h*h+d*(d+2*l)+c;return a&&a.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(on).addScaledVector(la,d),f}intersectSphere(e,t){lr.subVectors(e.center,this.origin);const a=lr.dot(this.direction),r=lr.dot(lr)-a*a,i=e.radius*e.radius;if(r>i)return null;const o=Math.sqrt(i-r),s=a-o,l=a+o;return l<0?null:s<0?this.at(l,t):this.at(s,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(e.normal)+e.constant)/t;return a>=0?a:null}intersectPlane(e,t){const a=this.distanceToPlane(e);return a===null?null:this.at(a,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let a,r,i,o,s,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(a=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(a=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(i=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(i=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),a>o||i>r||((i>a||isNaN(a))&&(a=i),(o<r||isNaN(r))&&(r=o),h>=0?(s=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(s=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),a>l||s>r)||((s>a||a!==a)&&(a=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(a>=0?a:r,t)}intersectsBox(e){return this.intersectBox(e,lr)!==null}intersectTriangle(e,t,a,r,i){ln.subVectors(t,e),ca.subVectors(a,e),cn.crossVectors(ln,ca);let o=this.direction.dot(cn),s;if(o>0){if(r)return null;s=1}else if(o<0)s=-1,o=-o;else return null;xr.subVectors(this.origin,e);const l=s*this.direction.dot(ca.crossVectors(xr,ca));if(l<0)return null;const c=s*this.direction.dot(ln.cross(xr));if(c<0||l+c>o)return null;const u=-s*xr.dot(cn);return u<0?null:this.at(u/o,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class lt{constructor(e,t,a,r,i,o,s,l,c,u,h,d,f,g,v,p){lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,a,r,i,o,s,l,c,u,h,d,f,g,v,p)}set(e,t,a,r,i,o,s,l,c,u,h,d,f,g,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=a,m[12]=r,m[1]=i,m[5]=o,m[9]=s,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lt().fromArray(this.elements)}copy(e){const t=this.elements,a=e.elements;return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],this}copyPosition(e){const t=this.elements,a=e.elements;return t[12]=a[12],t[13]=a[13],t[14]=a[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,a){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(e,t,a){return this.set(e.x,t.x,a.x,0,e.y,t.y,a.y,0,e.z,t.z,a.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,a=e.elements,r=1/Zr.setFromMatrixColumn(e,0).length(),i=1/Zr.setFromMatrixColumn(e,1).length(),o=1/Zr.setFromMatrixColumn(e,2).length();return t[0]=a[0]*r,t[1]=a[1]*r,t[2]=a[2]*r,t[3]=0,t[4]=a[4]*i,t[5]=a[5]*i,t[6]=a[6]*i,t[7]=0,t[8]=a[8]*o,t[9]=a[9]*o,t[10]=a[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,a=e.x,r=e.y,i=e.z,o=Math.cos(a),s=Math.sin(a),l=Math.cos(r),c=Math.sin(r),u=Math.cos(i),h=Math.sin(i);if(e.order==="XYZ"){const d=o*u,f=o*h,g=s*u,v=s*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+g*c,t[5]=d-v*c,t[9]=-s*l,t[2]=v-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,g=c*u,v=c*h;t[0]=d+v*s,t[4]=g*s-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-s,t[2]=f*s-g,t[6]=v+d*s,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,g=c*u,v=c*h;t[0]=d-v*s,t[4]=-o*h,t[8]=g+f*s,t[1]=f+g*s,t[5]=o*u,t[9]=v-d*s,t[2]=-o*c,t[6]=s,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,g=s*u,v=s*h;t[0]=l*u,t[4]=g*c-f,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=f*c-g,t[2]=-c,t[6]=s*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=s*l,v=s*c;t[0]=l*u,t[4]=v-d*h,t[8]=g*h+f,t[1]=h,t[5]=o*u,t[9]=-s*u,t[2]=-c*u,t[6]=f*h+g,t[10]=d-v*h}else if(e.order==="XZY"){const d=o*l,f=o*c,g=s*l,v=s*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=o*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=s*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hl,e,dl)}lookAt(e,t,a){const r=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),yr.crossVectors(a,Bt),yr.lengthSq()===0&&(Math.abs(a.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),yr.crossVectors(a,Bt)),yr.normalize(),ua.crossVectors(Bt,yr),r[0]=yr.x,r[4]=ua.x,r[8]=Bt.x,r[1]=yr.y,r[5]=ua.y,r[9]=Bt.y,r[2]=yr.z,r[6]=ua.z,r[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const a=e.elements,r=t.elements,i=this.elements,o=a[0],s=a[4],l=a[8],c=a[12],u=a[1],h=a[5],d=a[9],f=a[13],g=a[2],v=a[6],p=a[10],m=a[14],T=a[3],_=a[7],S=a[11],R=a[15],A=r[0],M=r[4],L=r[8],H=r[12],x=r[1],E=r[5],U=r[9],B=r[13],C=r[2],V=r[6],z=r[10],j=r[14],K=r[3],O=r[7],W=r[11],P=r[15];return i[0]=o*A+s*x+l*C+c*K,i[4]=o*M+s*E+l*V+c*O,i[8]=o*L+s*U+l*z+c*W,i[12]=o*H+s*B+l*j+c*P,i[1]=u*A+h*x+d*C+f*K,i[5]=u*M+h*E+d*V+f*O,i[9]=u*L+h*U+d*z+f*W,i[13]=u*H+h*B+d*j+f*P,i[2]=g*A+v*x+p*C+m*K,i[6]=g*M+v*E+p*V+m*O,i[10]=g*L+v*U+p*z+m*W,i[14]=g*H+v*B+p*j+m*P,i[3]=T*A+_*x+S*C+R*K,i[7]=T*M+_*E+S*V+R*O,i[11]=T*L+_*U+S*z+R*W,i[15]=T*H+_*B+S*j+R*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],a=e[4],r=e[8],i=e[12],o=e[1],s=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],v=e[7],p=e[11],m=e[15];return g*(+i*l*h-r*c*h-i*s*d+a*c*d+r*s*f-a*l*f)+v*(+t*l*f-t*c*d+i*o*d-r*o*f+r*c*u-i*l*u)+p*(+t*c*h-t*s*f-i*o*h+a*o*f+i*s*u-a*c*u)+m*(-r*s*u-t*l*h+t*s*d+r*o*h-a*o*d+a*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,a){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=a),this}invert(){const e=this.elements,t=e[0],a=e[1],r=e[2],i=e[3],o=e[4],s=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],v=e[13],p=e[14],m=e[15],T=h*p*c-v*d*c+v*l*f-s*p*f-h*l*m+s*d*m,_=g*d*c-u*p*c-g*l*f+o*p*f+u*l*m-o*d*m,S=u*v*c-g*h*c+g*s*f-o*v*f-u*s*m+o*h*m,R=g*h*l-u*v*l-g*s*d+o*v*d+u*s*p-o*h*p,A=t*T+a*_+r*S+i*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/A;return e[0]=T*M,e[1]=(v*d*i-h*p*i-v*r*f+a*p*f+h*r*m-a*d*m)*M,e[2]=(s*p*i-v*l*i+v*r*c-a*p*c-s*r*m+a*l*m)*M,e[3]=(h*l*i-s*d*i-h*r*c+a*d*c+s*r*f-a*l*f)*M,e[4]=_*M,e[5]=(u*p*i-g*d*i+g*r*f-t*p*f-u*r*m+t*d*m)*M,e[6]=(g*l*i-o*p*i-g*r*c+t*p*c+o*r*m-t*l*m)*M,e[7]=(o*d*i-u*l*i+u*r*c-t*d*c-o*r*f+t*l*f)*M,e[8]=S*M,e[9]=(g*h*i-u*v*i-g*a*f+t*v*f+u*a*m-t*h*m)*M,e[10]=(o*v*i-g*s*i+g*a*c-t*v*c-o*a*m+t*s*m)*M,e[11]=(u*s*i-o*h*i-u*a*c+t*h*c+o*a*f-t*s*f)*M,e[12]=R*M,e[13]=(u*v*r-g*h*r+g*a*d-t*v*d-u*a*p+t*h*p)*M,e[14]=(g*s*r-o*v*r-g*a*l+t*v*l+o*a*p-t*s*p)*M,e[15]=(o*h*r-u*s*r+u*a*l-t*h*l-o*a*d+t*s*d)*M,this}scale(e){const t=this.elements,a=e.x,r=e.y,i=e.z;return t[0]*=a,t[4]*=r,t[8]*=i,t[1]*=a,t[5]*=r,t[9]*=i,t[2]*=a,t[6]*=r,t[10]*=i,t[3]*=a,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,a,r))}makeTranslation(e,t,a){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,a,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,t,-a,0,0,a,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,0,a,0,0,1,0,0,-a,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,-a,0,0,a,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const a=Math.cos(t),r=Math.sin(t),i=1-a,o=e.x,s=e.y,l=e.z,c=i*o,u=i*s;return this.set(c*o+a,c*s-r*l,c*l+r*s,0,c*s+r*l,u*s+a,u*l-r*o,0,c*l-r*s,u*l+r*o,i*l*l+a,0,0,0,0,1),this}makeScale(e,t,a){return this.set(e,0,0,0,0,t,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,t,a,r,i,o){return this.set(1,a,i,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,a){const r=this.elements,i=t._x,o=t._y,s=t._z,l=t._w,c=i+i,u=o+o,h=s+s,d=i*c,f=i*u,g=i*h,v=o*u,p=o*h,m=s*h,T=l*c,_=l*u,S=l*h,R=a.x,A=a.y,M=a.z;return r[0]=(1-(v+m))*R,r[1]=(f+S)*R,r[2]=(g-_)*R,r[3]=0,r[4]=(f-S)*A,r[5]=(1-(d+m))*A,r[6]=(p+T)*A,r[7]=0,r[8]=(g+_)*M,r[9]=(p-T)*M,r[10]=(1-(d+v))*M,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,a){const r=this.elements;let i=Zr.set(r[0],r[1],r[2]).length();const o=Zr.set(r[4],r[5],r[6]).length(),s=Zr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],er.copy(this);const l=1/i,c=1/o,u=1/s;return er.elements[0]*=l,er.elements[1]*=l,er.elements[2]*=l,er.elements[4]*=c,er.elements[5]*=c,er.elements[6]*=c,er.elements[8]*=u,er.elements[9]*=u,er.elements[10]*=u,t.setFromRotationMatrix(er),a.x=i,a.y=o,a.z=s,this}makePerspective(e,t,a,r,i,o,s=2e3){const l=this.elements,c=2*i/(t-e),u=2*i/(a-r),h=(t+e)/(t-e),d=(a+r)/(a-r);let f,g;if(s===2e3)f=-(o+i)/(o-i),g=-2*o*i/(o-i);else if(s===2001)f=-o/(o-i),g=-o*i/(o-i);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,a,r,i,o,s=2e3){const l=this.elements,c=1/(t-e),u=1/(a-r),h=1/(o-i),d=(t+e)*c,f=(a+r)*u;let g,v;if(s===2e3)g=(o+i)*h,v=-2*h;else if(s===2001)g=i*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,a=e.elements;for(let r=0;r<16;r++)if(t[r]!==a[r])return!1;return!0}fromArray(e,t=0){for(let a=0;a<16;a++)this.elements[a]=e[a+t];return this}toArray(e=[],t=0){const a=this.elements;return e[t]=a[0],e[t+1]=a[1],e[t+2]=a[2],e[t+3]=a[3],e[t+4]=a[4],e[t+5]=a[5],e[t+6]=a[6],e[t+7]=a[7],e[t+8]=a[8],e[t+9]=a[9],e[t+10]=a[10],e[t+11]=a[11],e[t+12]=a[12],e[t+13]=a[13],e[t+14]=a[14],e[t+15]=a[15],e}}const Zr=new re,er=new lt,hl=new re(0,0,0),dl=new re(1,1,1),yr=new re,ua=new re,Bt=new re,ps=new lt,ms=new Pi;class dr{constructor(e=0,t=0,a=0,r=dr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=a,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,a,r=this._order){return this._x=e,this._y=t,this._z=a,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,a=!0){const r=e.elements,i=r[0],o=r[4],s=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(It(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,i)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-It(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(s,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,i),this._z=0);break;case"ZXY":this._x=Math.asin(It(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,i));break;case"ZYX":this._y=Math.asin(-It(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,i)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(It(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,i)):(this._x=0,this._y=Math.atan2(s,f));break;case"XZY":this._z=Math.asin(-It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(s,i)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,a===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,a){return ps.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ps,t,a)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ms.setFromEuler(this),this.setFromQuaternion(ms,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dr.DEFAULT_ORDER="XYZ";class gs{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fl=0;const vs=new re,Kr=new Pi,cr=new lt,ha=new re,Li=new re,pl=new re,ml=new Pi,_s=new re(1,0,0),xs=new re(0,1,0),ys=new re(0,0,1),gl={type:"added"},vl={type:"removed"},un={type:"childadded",child:null},hn={type:"childremoved",child:null};class Ct extends Vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fl++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new re,t=new dr,a=new Pi,r=new re(1,1,1);function i(){a.setFromEuler(t,!1)}function o(){t.setFromQuaternion(a,void 0,!1)}t._onChange(i),a._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new lt},normalMatrix:{value:new Ke}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Kr.setFromAxisAngle(e,t),this.quaternion.multiply(Kr),this}rotateOnWorldAxis(e,t){return Kr.setFromAxisAngle(e,t),this.quaternion.premultiply(Kr),this}rotateX(e){return this.rotateOnAxis(_s,e)}rotateY(e){return this.rotateOnAxis(xs,e)}rotateZ(e){return this.rotateOnAxis(ys,e)}translateOnAxis(e,t){return vs.copy(e).applyQuaternion(this.quaternion),this.position.add(vs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_s,e)}translateY(e){return this.translateOnAxis(xs,e)}translateZ(e){return this.translateOnAxis(ys,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cr.copy(this.matrixWorld).invert())}lookAt(e,t,a){e.isVector3?ha.copy(e):ha.set(e,t,a);const r=this.parent;this.updateWorldMatrix(!0,!1),Li.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cr.lookAt(Li,ha,this.up):cr.lookAt(ha,Li,this.up),this.quaternion.setFromRotationMatrix(cr),r&&(cr.extractRotation(r.matrixWorld),Kr.setFromRotationMatrix(cr),this.quaternion.premultiply(Kr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(gl),un.child=e,this.dispatchEvent(un),un.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vl),hn.child=e,this.dispatchEvent(hn),hn.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cr.multiply(e.parent.matrixWorld)),e.applyMatrix4(cr),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let a=0,r=this.children.length;a<r;a++){const i=this.children[a].getObjectByProperty(e,t);if(i!==void 0)return i}}getObjectsByProperty(e,t,a=[]){this[e]===t&&a.push(this);const r=this.children;for(let i=0,o=r.length;i<o;i++)r[i].getObjectsByProperty(e,t,a);return a}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Li,e,pl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Li,ml,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let a=0,r=t.length;a<r;a++)t[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let a=0,r=t.length;a<r;a++)t[a].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let a=0,r=t.length;a<r;a++){const i=t[a];(i.matrixWorldAutoUpdate===!0||e===!0)&&i.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const a=this.parent;if(e===!0&&a!==null&&a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let i=0,o=r.length;i<o;i++){const s=r[i];s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",a={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(s=>({boxInitialized:s.boxInitialized,boxMin:s.box.min.toArray(),boxMax:s.box.max.toArray(),sphereInitialized:s.sphereInitialized,sphereRadius:s.sphere.radius,sphereCenter:s.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function i(s,l){return s[l.uuid]===void 0&&(s[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);const s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){const l=s.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];i(e.shapes,h)}else i(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const s=[];for(let l=0,c=this.material.length;l<c;l++)s.push(i(e.materials,this.material[l]));r.material=s}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){const l=this.animations[s];r.animations.push(i(e.animations,l))}}if(t){const s=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);s.length>0&&(a.geometries=s),l.length>0&&(a.materials=l),c.length>0&&(a.textures=c),u.length>0&&(a.images=u),h.length>0&&(a.shapes=h),d.length>0&&(a.skeletons=d),f.length>0&&(a.animations=f),g.length>0&&(a.nodes=g)}return a.object=r,a;function o(s){const l=[];for(const c in s){const u=s[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let a=0;a<e.children.length;a++){const r=e.children[a];this.add(r.clone())}return this}}Ct.DEFAULT_UP=new re(0,1,0),Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tr=new re,ur=new re,dn=new re,hr=new re,Jr=new re,$r=new re,bs=new re,fn=new re,pn=new re,mn=new re;class nr{constructor(e=new re,t=new re,a=new re){this.a=e,this.b=t,this.c=a}static getNormal(e,t,a,r){r.subVectors(a,t),tr.subVectors(e,t),r.cross(tr);const i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,a,r,i){tr.subVectors(r,t),ur.subVectors(a,t),dn.subVectors(e,t);const o=tr.dot(tr),s=tr.dot(ur),l=tr.dot(dn),c=ur.dot(ur),u=ur.dot(dn),h=o*c-s*s;if(h===0)return i.set(0,0,0),null;const d=1/h,f=(c*l-s*u)*d,g=(o*u-s*l)*d;return i.set(1-f-g,g,f)}static containsPoint(e,t,a,r){return this.getBarycoord(e,t,a,r,hr)===null?!1:hr.x>=0&&hr.y>=0&&hr.x+hr.y<=1}static getInterpolation(e,t,a,r,i,o,s,l){return this.getBarycoord(e,t,a,r,hr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(i,hr.x),l.addScaledVector(o,hr.y),l.addScaledVector(s,hr.z),l)}static isFrontFacing(e,t,a,r){return tr.subVectors(a,t),ur.subVectors(e,t),tr.cross(ur).dot(r)<0}set(e,t,a){return this.a.copy(e),this.b.copy(t),this.c.copy(a),this}setFromPointsAndIndices(e,t,a,r){return this.a.copy(e[t]),this.b.copy(e[a]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,a,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,a),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tr.subVectors(this.c,this.b),ur.subVectors(this.a,this.b),tr.cross(ur).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return nr.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return nr.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,a,r,i){return nr.getInterpolation(e,this.a,this.b,this.c,t,a,r,i)}containsPoint(e){return nr.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return nr.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const a=this.a,r=this.b,i=this.c;let o,s;Jr.subVectors(r,a),$r.subVectors(i,a),fn.subVectors(e,a);const l=Jr.dot(fn),c=$r.dot(fn);if(l<=0&&c<=0)return t.copy(a);pn.subVectors(e,r);const u=Jr.dot(pn),h=$r.dot(pn);if(u>=0&&h<=u)return t.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(a).addScaledVector(Jr,o);mn.subVectors(e,i);const f=Jr.dot(mn),g=$r.dot(mn);if(g>=0&&f<=g)return t.copy(i);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return s=c/(c-g),t.copy(a).addScaledVector($r,s);const p=u*g-f*h;if(p<=0&&h-u>=0&&f-g>=0)return bs.subVectors(i,r),s=(h-u)/(h-u+(f-g)),t.copy(r).addScaledVector(bs,s);const m=1/(p+v+d);return o=v*m,s=d*m,t.copy(a).addScaledVector(Jr,o).addScaledVector($r,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ss={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},br={h:0,s:0,l:0},da={h:0,s:0,l:0};function gn(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class he{constructor(e,t,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,a)}set(e,t,a){if(t===void 0&&a===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,a);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ir){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,a,r=rt.workingColorSpace){return this.r=e,this.g=t,this.b=a,rt.toWorkingColorSpace(this,r),this}setHSL(e,t,a,r=rt.workingColorSpace){if(e=rl(e,1),t=It(t,0,1),a=It(a,0,1),t===0)this.r=this.g=this.b=a;else{const i=a<=.5?a*(1+t):a+t-a*t,o=2*a-i;this.r=gn(o,i,e+1/3),this.g=gn(o,i,e),this.b=gn(o,i,e-1/3)}return rt.toWorkingColorSpace(this,r),this}setStyle(e,t=ir){function a(i){i!==void 0&&parseFloat(i)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i;const o=r[1],s=r[2];switch(o){case"rgb":case"rgba":if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return a(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return a(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case"hsl":case"hsla":if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return a(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const i=r[1],o=i.length;if(o===3)return this.setRGB(parseInt(i.charAt(0),16)/15,parseInt(i.charAt(1),16)/15,parseInt(i.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(i,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ir){const a=Ss[e.toLowerCase()];return a!==void 0?this.setHex(a,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wr(e.r),this.g=Wr(e.g),this.b=Wr(e.b),this}copyLinearToSRGB(e){return this.r=tn(e.r),this.g=tn(e.g),this.b=tn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ir){return rt.fromWorkingColorSpace(wt.copy(this),e),Math.round(It(wt.r*255,0,255))*65536+Math.round(It(wt.g*255,0,255))*256+Math.round(It(wt.b*255,0,255))}getHexString(e=ir){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(wt.copy(this),t);const a=wt.r,r=wt.g,i=wt.b,o=Math.max(a,r,i),s=Math.min(a,r,i);let l,c;const u=(s+o)/2;if(s===o)l=0,c=0;else{const h=o-s;switch(c=u<=.5?h/(o+s):h/(2-o-s),o){case a:l=(r-i)/h+(r<i?6:0);break;case r:l=(i-a)/h+2;break;case i:l=(a-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=ir){rt.fromWorkingColorSpace(wt.copy(this),e);const t=wt.r,a=wt.g,r=wt.b;return e!==ir?`color(${e} ${t.toFixed(3)} ${a.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(a*255)},${Math.round(r*255)})`}offsetHSL(e,t,a){return this.getHSL(br),this.setHSL(br.h+e,br.s+t,br.l+a)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,a){return this.r=e.r+(t.r-e.r)*a,this.g=e.g+(t.g-e.g)*a,this.b=e.b+(t.b-e.b)*a,this}lerpHSL(e,t){this.getHSL(br),e.getHSL(da);const a=$a(br.h,da.h,t),r=$a(br.s,da.s,t),i=$a(br.l,da.l,t);return this.setHSL(a,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,a=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*a+i[6]*r,this.g=i[1]*t+i[4]*a+i[7]*r,this.b=i[2]*t+i[5]*a+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new he;he.NAMES=Ss;let _l=0;class Ii extends Vr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_l++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const a=e[t];if(a===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(a):r&&r.isVector3&&a&&a.isVector3?r.copy(a):this[t]=a}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const a={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(e).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(e).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(e).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(e).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(e).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(a.blending=this.blending),this.side!==0&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==204&&(a.blendSrc=this.blendSrc),this.blendDst!==205&&(a.blendDst=this.blendDst),this.blendEquation!==100&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(a.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function r(i){const o=[];for(const s in i){const l=i[s];delete l.metadata,o.push(l)}return o}if(t){const i=r(e.textures),o=r(e.images);i.length>0&&(a.textures=i),o.length>0&&(a.images=o)}return a}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let a=null;if(t!==null){const r=t.length;a=new Array(r);for(let i=0;i!==r;++i)a[i]=t[i].clone()}return this.clippingPlanes=a,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Fi extends Ii{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new re,fa=new Ie;class kt{constructor(e,t,a=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=a,this.usage=35044,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return al("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,a){e*=this.itemSize,a*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[a+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,a=this.count;t<a;t++)fa.fromBufferAttribute(this,t),fa.applyMatrix3(e),this.setXY(t,fa.x,fa.y);else if(this.itemSize===3)for(let t=0,a=this.count;t<a;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,a=this.count;t<a;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,a=this.count;t<a;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,a=this.count;t<a;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let a=this.array[e*this.itemSize+t];return this.normalized&&(a=Ci(a,this.array)),a}setComponent(e,t,a){return this.normalized&&(a=Ft(a,this.array)),this.array[e*this.itemSize+t]=a,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ci(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ci(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ci(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ci(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,a){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),a=Ft(a,this.array)),this.array[e+0]=t,this.array[e+1]=a,this}setXYZ(e,t,a,r){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),a=Ft(a,this.array),r=Ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=a,this.array[e+2]=r,this}setXYZW(e,t,a,r,i){return e*=this.itemSize,this.normalized&&(t=Ft(t,this.array),a=Ft(a,this.array),r=Ft(r,this.array),i=Ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=a,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}}class Ms extends kt{constructor(e,t,a){super(new Uint16Array(e),t,a)}}class Ts extends kt{constructor(e,t,a){super(new Uint32Array(e),t,a)}}class Wt extends kt{constructor(e,t,a){super(new Float32Array(e),t,a)}}let xl=0;const Xt=new lt,vn=new Ct,Qr=new re,Gt=new sr,Oi=new sr,yt=new re;class qt extends Vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xl++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ns(e)?Ts:Ms)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,a=0){this.groups.push({start:e,count:t,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const i=new Ke().getNormalMatrix(e);a.applyNormalMatrix(i),a.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,a){return Xt.makeTranslation(e,t,a),this.applyMatrix4(Xt),this}scale(e,t,a){return Xt.makeScale(e,t,a),this.applyMatrix4(Xt),this}lookAt(e){return vn.lookAt(e),vn.updateMatrix(),this.applyMatrix4(vn.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qr).negate(),this.translate(Qr.x,Qr.y,Qr.z),this}setFromPoints(e){const t=[];for(let a=0,r=e.length;a<r;a++){const i=e[a];t.push(i.x,i.y,i.z||0)}return this.setAttribute("position",new Wt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new re(-1/0,-1/0,-1/0),new re(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const i=t[a];Gt.setFromBufferAttribute(i),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new re,1/0);return}if(e){const a=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let i=0,o=t.length;i<o;i++){const s=t[i];Oi.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(Gt.min,Oi.min),Gt.expandByPoint(yt),yt.addVectors(Gt.max,Oi.max),Gt.expandByPoint(yt)):(Gt.expandByPoint(Oi.min),Gt.expandByPoint(Oi.max))}Gt.getCenter(a);let r=0;for(let i=0,o=e.count;i<o;i++)yt.fromBufferAttribute(e,i),r=Math.max(r,a.distanceToSquared(yt));if(t)for(let i=0,o=t.length;i<o;i++){const s=t[i],l=this.morphTargetsRelative;for(let c=0,u=s.count;c<u;c++)yt.fromBufferAttribute(s,c),l&&(Qr.fromBufferAttribute(e,c),yt.add(Qr)),r=Math.max(r,a.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=t.position,r=t.normal,i=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kt(new Float32Array(4*a.count),4));const o=this.getAttribute("tangent"),s=[],l=[];for(let L=0;L<a.count;L++)s[L]=new re,l[L]=new re;const c=new re,u=new re,h=new re,d=new Ie,f=new Ie,g=new Ie,v=new re,p=new re;function m(L,H,x){c.fromBufferAttribute(a,L),u.fromBufferAttribute(a,H),h.fromBufferAttribute(a,x),d.fromBufferAttribute(i,L),f.fromBufferAttribute(i,H),g.fromBufferAttribute(i,x),u.sub(c),h.sub(c),f.sub(d),g.sub(d);const E=1/(f.x*g.y-g.x*f.y);isFinite(E)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-f.y).multiplyScalar(E),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(E),s[L].add(v),s[H].add(v),s[x].add(v),l[L].add(p),l[H].add(p),l[x].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let L=0,H=T.length;L<H;++L){const x=T[L],E=x.start,U=x.count;for(let B=E,C=E+U;B<C;B+=3)m(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const _=new re,S=new re,R=new re,A=new re;function M(L){R.fromBufferAttribute(r,L),A.copy(R);const H=s[L];_.copy(H),_.sub(R.multiplyScalar(R.dot(H))).normalize(),S.crossVectors(A,H);const x=S.dot(l[L])<0?-1:1;o.setXYZW(L,_.x,_.y,_.z,x)}for(let L=0,H=T.length;L<H;++L){const x=T[L],E=x.start,U=x.count;for(let B=E,C=E+U;B<C;B+=3)M(e.getX(B+0)),M(e.getX(B+1)),M(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",a);else for(let d=0,f=a.count;d<f;d++)a.setXYZ(d,0,0,0);const r=new re,i=new re,o=new re,s=new re,l=new re,c=new re,u=new re,h=new re;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),v=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,g),i.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),u.subVectors(o,i),h.subVectors(r,i),u.cross(h),s.fromBufferAttribute(a,g),l.fromBufferAttribute(a,v),c.fromBufferAttribute(a,p),s.add(u),l.add(u),c.add(u),a.setXYZ(g,s.x,s.y,s.z),a.setXYZ(v,l.x,l.y,l.z),a.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),i.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,i),h.subVectors(r,i),u.cross(h),a.setXYZ(d+0,u.x,u.y,u.z),a.setXYZ(d+1,u.x,u.y,u.z),a.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,a=e.count;t<a;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(s,l){const c=s.array,u=s.itemSize,h=s.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let v=0,p=l.length;v<p;v++){s.isInterleavedBufferAttribute?f=l[v]*s.data.stride+s.offset:f=l[v]*u;for(let m=0;m<u;m++)d[g++]=c[f++]}return new kt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qt,a=this.index.array,r=this.attributes;for(const s in r){const l=r[s],c=e(l,a);t.setAttribute(s,c)}const i=this.morphAttributes;for(const s in i){const l=[],c=i[s];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,a);l.push(f)}t.morphAttributes[s]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let s=0,l=o.length;s<l;s++){const c=o[s];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const a=this.attributes;for(const l in a){const c=a[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let i=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const s=this.boundingSphere;return s!==null&&(e.data.boundingSphere={center:s.center.toArray(),radius:s.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const a=e.index;a!==null&&this.setIndex(a.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const i=e.morphAttributes;for(const c in i){const u=[],h=i[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Es=new lt,Rr=new fs,pa=new Cr,ws=new re,ei=new re,ti=new re,ri=new re,_n=new re,ma=new re,ga=new Ie,va=new Ie,_a=new Ie,As=new re,Cs=new re,Rs=new re,xa=new re,ya=new re;class Xe extends Ct{constructor(e=new qt,t=new Fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const a=e[t[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,i=a.length;r<i;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const a=this.geometry,r=a.attributes.position,i=a.morphAttributes.position,o=a.morphTargetsRelative;t.fromBufferAttribute(r,e);const s=this.morphTargetInfluences;if(i&&s){ma.set(0,0,0);for(let l=0,c=i.length;l<c;l++){const u=s[l],h=i[l];u!==0&&(_n.fromBufferAttribute(h,e),o?ma.addScaledVector(_n,u):ma.addScaledVector(_n.sub(t),u))}t.add(ma)}return t}raycast(e,t){const a=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),pa.copy(a.boundingSphere),pa.applyMatrix4(i),Rr.copy(e.ray).recast(e.near),!(pa.containsPoint(Rr.origin)===!1&&(Rr.intersectSphere(pa,ws)===null||Rr.origin.distanceToSquared(ws)>(e.far-e.near)**2))&&(Es.copy(i).invert(),Rr.copy(e.ray).applyMatrix4(Es),!(a.boundingBox!==null&&Rr.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(e,t,Rr)))}_computeIntersections(e,t,a){let r;const i=this.geometry,o=this.material,s=i.index,l=i.attributes.position,c=i.attributes.uv,u=i.attributes.uv1,h=i.attributes.normal,d=i.groups,f=i.drawRange;if(s!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=o[p.materialIndex],T=Math.max(p.start,f.start),_=Math.min(s.count,Math.min(p.start+p.count,f.start+f.count));for(let S=T,R=_;S<R;S+=3){const A=s.getX(S),M=s.getX(S+1),L=s.getX(S+2);r=ba(this,m,e,a,c,u,h,A,M,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),v=Math.min(s.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const T=s.getX(p),_=s.getX(p+1),S=s.getX(p+2);r=ba(this,o,e,a,c,u,h,T,_,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const p=d[g],m=o[p.materialIndex],T=Math.max(p.start,f.start),_=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let S=T,R=_;S<R;S+=3){const A=S,M=S+1,L=S+2;r=ba(this,m,e,a,c,u,h,A,M,L),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const T=p,_=p+1,S=p+2;r=ba(this,o,e,a,c,u,h,T,_,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function yl(n,e,t,a,r,i,o,s){let l;if(e.side===1?l=a.intersectTriangle(o,i,r,!0,s):l=a.intersectTriangle(r,i,o,e.side===0,s),l===null)return null;ya.copy(s),ya.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ya);return c<t.near||c>t.far?null:{distance:c,point:ya.clone(),object:n}}function ba(n,e,t,a,r,i,o,s,l,c){n.getVertexPosition(s,ei),n.getVertexPosition(l,ti),n.getVertexPosition(c,ri);const u=yl(n,e,t,a,ei,ti,ri,xa);if(u){r&&(ga.fromBufferAttribute(r,s),va.fromBufferAttribute(r,l),_a.fromBufferAttribute(r,c),u.uv=nr.getInterpolation(xa,ei,ti,ri,ga,va,_a,new Ie)),i&&(ga.fromBufferAttribute(i,s),va.fromBufferAttribute(i,l),_a.fromBufferAttribute(i,c),u.uv1=nr.getInterpolation(xa,ei,ti,ri,ga,va,_a,new Ie)),o&&(As.fromBufferAttribute(o,s),Cs.fromBufferAttribute(o,l),Rs.fromBufferAttribute(o,c),u.normal=nr.getInterpolation(xa,ei,ti,ri,As,Cs,Rs,new re),u.normal.dot(a.direction)>0&&u.normal.multiplyScalar(-1));const h={a:s,b:l,c,normal:new re,materialIndex:0};nr.getNormal(ei,ti,ri,h.normal),u.face=h}return u}class ji extends qt{constructor(e=1,t=1,a=1,r=1,i=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:a,widthSegments:r,heightSegments:i,depthSegments:o};const s=this;r=Math.floor(r),i=Math.floor(i),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;g("z","y","x",-1,-1,a,t,e,o,i,0),g("z","y","x",1,-1,a,t,-e,o,i,1),g("x","z","y",1,1,e,a,t,r,o,2),g("x","z","y",1,-1,e,a,-t,r,o,3),g("x","y","z",1,-1,e,t,a,r,i,4),g("x","y","z",-1,-1,e,t,-a,r,i,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(u,3)),this.setAttribute("uv",new Wt(h,2));function g(v,p,m,T,_,S,R,A,M,L,H){const x=S/M,E=R/L,U=S/2,B=R/2,C=A/2,V=M+1,z=L+1;let j=0,K=0;const O=new re;for(let W=0;W<z;W++){const P=W*E-B;for(let N=0;N<V;N++){const X=N*x-U;O[v]=X*T,O[p]=P*_,O[m]=C,c.push(O.x,O.y,O.z),O[v]=0,O[p]=0,O[m]=A>0?1:-1,u.push(O.x,O.y,O.z),h.push(N/M),h.push(1-W/L),j+=1}}for(let W=0;W<L;W++)for(let P=0;P<M;P++){const N=d+P+V*W,X=d+P+V*(W+1),D=d+(P+1)+V*(W+1),F=d+(P+1)+V*W;l.push(N,X,F),l.push(X,D,F),K+=6}s.addGroup(f,K,H),f+=K,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ji(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ii(n){const e={};for(const t in n){e[t]={};for(const a in n[t]){const r=n[t][a];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][a]=null):e[t][a]=r.clone():Array.isArray(r)?e[t][a]=r.slice():e[t][a]=r}}return e}function Rt(n){const e={};for(let t=0;t<n.length;t++){const a=ii(n[t]);for(const r in a)e[r]=a[r]}return e}function bl(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ps(n){return n.getRenderTarget()===null?n.outputColorSpace:rt.workingColorSpace}const Ni={clone:ii,merge:Rt};var Sl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ml=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qe extends Ii{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sl,this.fragmentShader=Ml,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ii(e.uniforms),this.uniformsGroups=bl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const i=this.uniforms[r].value;i&&i.isTexture?t.uniforms[r]={type:"t",value:i.toJSON(e).uuid}:i&&i.isColor?t.uniforms[r]={type:"c",value:i.getHex()}:i&&i.isVector2?t.uniforms[r]={type:"v2",value:i.toArray()}:i&&i.isVector3?t.uniforms[r]={type:"v3",value:i.toArray()}:i&&i.isVector4?t.uniforms[r]={type:"v4",value:i.toArray()}:i&&i.isMatrix3?t.uniforms[r]={type:"m3",value:i.toArray()}:i&&i.isMatrix4?t.uniforms[r]={type:"m4",value:i.toArray()}:t.uniforms[r]={value:i}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const a={};for(const r in this.extensions)this.extensions[r]===!0&&(a[r]=!0);return Object.keys(a).length>0&&(t.extensions=a),t}}class Us extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Sr=new re,Ds=new Ie,Ls=new Ie;class Ht extends Us{constructor(e=50,t=1,a=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=a,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ja*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ka*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ja*2*Math.atan(Math.tan(Ka*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,a){Sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Sr.x,Sr.y).multiplyScalar(-e/Sr.z),Sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(Sr.x,Sr.y).multiplyScalar(-e/Sr.z)}getViewSize(e,t){return this.getViewBounds(e,Ds,Ls),t.subVectors(Ls,Ds)}setViewOffset(e,t,a,r,i,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=a,this.view.offsetY=r,this.view.width=i,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ka*.5*this.fov)/this.zoom,a=2*t,r=this.aspect*a,i=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;i+=o.offsetX*r/l,t-=o.offsetY*a/c,r*=o.width/l,a*=o.height/c}const s=this.filmOffset;s!==0&&(i+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-a,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ai=-90,ni=1;class Tl extends Ct{constructor(e,t,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ht(ai,ni,e,t);r.layers=this.layers,this.add(r);const i=new Ht(ai,ni,e,t);i.layers=this.layers,this.add(i);const o=new Ht(ai,ni,e,t);o.layers=this.layers,this.add(o);const s=new Ht(ai,ni,e,t);s.layers=this.layers,this.add(s);const l=new Ht(ai,ni,e,t);l.layers=this.layers,this.add(l);const c=new Ht(ai,ni,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[a,r,i,o,s,l]=t;for(const c of t)this.remove(c);if(e===2e3)a.up.set(0,1,0),a.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)a.up.set(0,-1,0),a.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[i,o,s,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,e.setRenderTarget(a,0,r),e.render(t,i),e.setRenderTarget(a,1,r),e.render(t,o),e.setRenderTarget(a,2,r),e.render(t,s),e.setRenderTarget(a,3,r),e.render(t,l),e.setRenderTarget(a,4,r),e.render(t,c),a.texture.generateMipmaps=v,e.setRenderTarget(a,5,r),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,a.texture.needsPMREMUpdate=!0}}class Is extends St{constructor(e,t,a,r,i,o,s,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,a,r,i,o,s,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class El extends pt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const a={width:e,height:e,depth:1},r=[a,a,a,a,a,a];this.texture=new Is(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ji(5,5,5),i=new qe({name:"CubemapFromEquirect",uniforms:ii(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;const o=new Xe(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Tl(1,10,this).update(e,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,a,r){const i=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,a,r);e.setRenderTarget(i)}}const xn=new re,wl=new re,Al=new Ke;class Pr{constructor(e=new re(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,a,r){return this.normal.set(e,t,a),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,a){const r=xn.subVectors(a,t).cross(wl.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const a=e.delta(xn),r=this.normal.dot(a);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(e.start).addScaledVector(a,i)}intersectsLine(e){const t=this.distanceToPoint(e.start),a=this.distanceToPoint(e.end);return t<0&&a>0||a<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const a=t||Al.getNormalMatrix(e),r=this.coplanarPoint(xn).applyMatrix4(e),i=this.normal.applyMatrix3(a).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ur=new Cr,Sa=new re;class Fs{constructor(e=new Pr,t=new Pr,a=new Pr,r=new Pr,i=new Pr,o=new Pr){this.planes=[e,t,a,r,i,o]}set(e,t,a,r,i,o){const s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(a),s[3].copy(r),s[4].copy(i),s[5].copy(o),this}copy(e){const t=this.planes;for(let a=0;a<6;a++)t[a].copy(e.planes[a]);return this}setFromProjectionMatrix(e,t=2e3){const a=this.planes,r=e.elements,i=r[0],o=r[1],s=r[2],l=r[3],c=r[4],u=r[5],h=r[6],d=r[7],f=r[8],g=r[9],v=r[10],p=r[11],m=r[12],T=r[13],_=r[14],S=r[15];if(a[0].setComponents(l-i,d-c,p-f,S-m).normalize(),a[1].setComponents(l+i,d+c,p+f,S+m).normalize(),a[2].setComponents(l+o,d+u,p+g,S+T).normalize(),a[3].setComponents(l-o,d-u,p-g,S-T).normalize(),a[4].setComponents(l-s,d-h,p-v,S-_).normalize(),t===2e3)a[5].setComponents(l+s,d+h,p+v,S+_).normalize();else if(t===2001)a[5].setComponents(s,h,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ur.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ur)}intersectsSprite(e){return Ur.center.set(0,0,0),Ur.radius=.7071067811865476,Ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ur)}intersectsSphere(e){const t=this.planes,a=e.center,r=-e.radius;for(let i=0;i<6;i++)if(t[i].distanceToPoint(a)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let a=0;a<6;a++){const r=t[a];if(Sa.x=r.normal.x>0?e.max.x:e.min.x,Sa.y=r.normal.y>0?e.max.y:e.min.y,Sa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Sa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let a=0;a<6;a++)if(t[a].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Os(){let n=null,e=!1,t=null,a=null;function r(i,o){t(i,o),a=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(a=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(i){t=i},setContext:function(i){n=i}}}function Cl(n,e){const t=e.isWebGL2,a=new WeakMap;function r(c,u){const h=c.array,d=c.usage,f=h.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,h,d),c.onUploadCallback();let v;if(h instanceof Float32Array)v=n.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)v=n.SHORT;else if(h instanceof Uint32Array)v=n.UNSIGNED_INT;else if(h instanceof Int32Array)v=n.INT;else if(h instanceof Int8Array)v=n.BYTE;else if(h instanceof Uint8Array)v=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)v=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:v,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:f}}function i(c,u,h){const d=u.array,f=u._updateRange,g=u.updateRanges;if(n.bindBuffer(h,c),f.count===-1&&g.length===0&&n.bufferSubData(h,0,d),g.length!==0){for(let v=0,p=g.length;v<p;v++){const m=g[v];t?n.bufferSubData(h,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count):n.bufferSubData(h,m.start*d.BYTES_PER_ELEMENT,d.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}f.count!==-1&&(t?n.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):n.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),a.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=a.get(c);u&&(n.deleteBuffer(u.buffer),a.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=a.get(c);(!d||d.version<c.version)&&a.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=a.get(c);if(h===void 0)a.set(c,r(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,c,u),h.version=c.version}}return{get:o,remove:s,update:l}}class $e extends qt{constructor(e=1,t=1,a=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:a,heightSegments:r};const i=e/2,o=t/2,s=Math.floor(a),l=Math.floor(r),c=s+1,u=l+1,h=e/s,d=t/l,f=[],g=[],v=[],p=[];for(let m=0;m<u;m++){const T=m*d-o;for(let _=0;_<c;_++){const S=_*h-i;g.push(S,-T,0),v.push(0,0,1),p.push(_/s),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let T=0;T<s;T++){const _=T+c*m,S=T+c*(m+1),R=T+1+c*(m+1),A=T+1+c*m;f.push(_,S,A),f.push(S,R,A)}this.setIndex(f),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(v,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $e(e.width,e.height,e.widthSegments,e.heightSegments)}}var Rl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pl=`#ifdef USE_ALPHAHASH
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
#endif`,Ul=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ll=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Il=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Fl=`#ifdef USE_AOMAP
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
#endif`,Ol=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nl=`#ifdef USE_BATCHING
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
#endif`,zl=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Bl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kl=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gl=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Hl=`#ifdef USE_IRIDESCENCE
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
#endif`,Vl=`#ifdef USE_BUMPMAP
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
#endif`,Wl=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ql=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jl=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yl=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zl=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kl=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Jl=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$l=`#define PI 3.141592653589793
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
} // validated`,Ql=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ec=`vec3 transformedNormal = objectNormal;
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
#endif`,tc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ic=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ac=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nc="gl_FragColor = linearToOutputTexel( gl_FragColor );",sc=`
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
}`,oc=`#ifdef USE_ENVMAP
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
#endif`,lc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cc=`#ifdef USE_ENVMAP
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
#endif`,uc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hc=`#ifdef USE_ENVMAP
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
#endif`,dc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gc=`#ifdef USE_GRADIENTMAP
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
}`,vc=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,_c=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bc=`uniform bool receiveShadow;
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
#endif`,Sc=`#ifdef USE_ENVMAP
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
#endif`,Mc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ec=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ac=`PhysicalMaterial material;
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
#endif`,Cc=`struct PhysicalMaterial {
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
}`,Rc=`
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
#endif`,Pc=`#if defined( RE_IndirectDiffuse )
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
#endif`,Uc=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lc=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ic=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Fc=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Oc=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bc=`#if defined( USE_POINTS_UV )
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
#endif`,kc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gc=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hc=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vc=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wc=`#ifdef USE_MORPHNORMALS
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
#endif`,Xc=`#ifdef USE_MORPHTARGETS
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
#endif`,qc=`#ifdef USE_MORPHTARGETS
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
#endif`,jc=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Yc=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Zc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jc=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$c=`#ifdef USE_NORMALMAP
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
#endif`,Qc=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,eu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ru=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,iu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,au=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,nu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,su=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ou=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,uu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,du=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,pu=`float getShadowMask() {
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
}`,mu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gu=`#ifdef USE_SKINNING
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
#endif`,vu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_u=`#ifdef USE_SKINNING
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
#endif`,xu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Su=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mu=`#ifdef USE_TRANSMISSION
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
#endif`,Tu=`#ifdef USE_TRANSMISSION
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
#endif`,Eu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Au=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ru=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pu=`uniform sampler2D t2D;
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
}`,Uu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Du=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fu=`#include <common>
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
}`,Ou=`#if DEPTH_PACKING == 3200
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
}`,Nu=`#define DISTANCE
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
}`,zu=`#define DISTANCE
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
}`,Bu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ku=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gu=`uniform float scale;
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
}`,Hu=`uniform vec3 diffuse;
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
}`,Vu=`#include <common>
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
}`,Wu=`uniform vec3 diffuse;
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
}`,Xu=`#define LAMBERT
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
}`,qu=`#define LAMBERT
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
}`,ju=`#define MATCAP
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
}`,Yu=`#define MATCAP
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
}`,Zu=`#define NORMAL
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
}`,Ku=`#define NORMAL
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
}`,Ju=`#define PHONG
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
}`,$u=`#define PHONG
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
}`,Qu=`#define STANDARD
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
}`,eh=`#define STANDARD
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
}`,th=`#define TOON
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
}`,rh=`#define TOON
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
}`,ih=`uniform float size;
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
}`,ah=`uniform vec3 diffuse;
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
}`,nh=`#include <common>
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
}`,sh=`uniform vec3 color;
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
}`,oh=`uniform float rotation;
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
}`,lh=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:Rl,alphahash_pars_fragment:Pl,alphamap_fragment:Ul,alphamap_pars_fragment:Dl,alphatest_fragment:Ll,alphatest_pars_fragment:Il,aomap_fragment:Fl,aomap_pars_fragment:Ol,batching_pars_vertex:Nl,batching_vertex:zl,begin_vertex:Bl,beginnormal_vertex:kl,bsdfs:Gl,iridescence_fragment:Hl,bumpmap_pars_fragment:Vl,clipping_planes_fragment:Wl,clipping_planes_pars_fragment:Xl,clipping_planes_pars_vertex:ql,clipping_planes_vertex:jl,color_fragment:Yl,color_pars_fragment:Zl,color_pars_vertex:Kl,color_vertex:Jl,common:$l,cube_uv_reflection_fragment:Ql,defaultnormal_vertex:ec,displacementmap_pars_vertex:tc,displacementmap_vertex:rc,emissivemap_fragment:ic,emissivemap_pars_fragment:ac,colorspace_fragment:nc,colorspace_pars_fragment:sc,envmap_fragment:oc,envmap_common_pars_fragment:lc,envmap_pars_fragment:cc,envmap_pars_vertex:uc,envmap_physical_pars_fragment:Sc,envmap_vertex:hc,fog_vertex:dc,fog_pars_vertex:fc,fog_fragment:pc,fog_pars_fragment:mc,gradientmap_pars_fragment:gc,lightmap_fragment:vc,lightmap_pars_fragment:_c,lights_lambert_fragment:xc,lights_lambert_pars_fragment:yc,lights_pars_begin:bc,lights_toon_fragment:Mc,lights_toon_pars_fragment:Tc,lights_phong_fragment:Ec,lights_phong_pars_fragment:wc,lights_physical_fragment:Ac,lights_physical_pars_fragment:Cc,lights_fragment_begin:Rc,lights_fragment_maps:Pc,lights_fragment_end:Uc,logdepthbuf_fragment:Dc,logdepthbuf_pars_fragment:Lc,logdepthbuf_pars_vertex:Ic,logdepthbuf_vertex:Fc,map_fragment:Oc,map_pars_fragment:Nc,map_particle_fragment:zc,map_particle_pars_fragment:Bc,metalnessmap_fragment:kc,metalnessmap_pars_fragment:Gc,morphinstance_vertex:Hc,morphcolor_vertex:Vc,morphnormal_vertex:Wc,morphtarget_pars_vertex:Xc,morphtarget_vertex:qc,normal_fragment_begin:jc,normal_fragment_maps:Yc,normal_pars_fragment:Zc,normal_pars_vertex:Kc,normal_vertex:Jc,normalmap_pars_fragment:$c,clearcoat_normal_fragment_begin:Qc,clearcoat_normal_fragment_maps:eu,clearcoat_pars_fragment:tu,iridescence_pars_fragment:ru,opaque_fragment:iu,packing:au,premultiplied_alpha_fragment:nu,project_vertex:su,dithering_fragment:ou,dithering_pars_fragment:lu,roughnessmap_fragment:cu,roughnessmap_pars_fragment:uu,shadowmap_pars_fragment:hu,shadowmap_pars_vertex:du,shadowmap_vertex:fu,shadowmask_pars_fragment:pu,skinbase_vertex:mu,skinning_pars_vertex:gu,skinning_vertex:vu,skinnormal_vertex:_u,specularmap_fragment:xu,specularmap_pars_fragment:yu,tonemapping_fragment:bu,tonemapping_pars_fragment:Su,transmission_fragment:Mu,transmission_pars_fragment:Tu,uv_pars_fragment:Eu,uv_pars_vertex:wu,uv_vertex:Au,worldpos_vertex:Cu,background_vert:Ru,background_frag:Pu,backgroundCube_vert:Uu,backgroundCube_frag:Du,cube_vert:Lu,cube_frag:Iu,depth_vert:Fu,depth_frag:Ou,distanceRGBA_vert:Nu,distanceRGBA_frag:zu,equirect_vert:Bu,equirect_frag:ku,linedashed_vert:Gu,linedashed_frag:Hu,meshbasic_vert:Vu,meshbasic_frag:Wu,meshlambert_vert:Xu,meshlambert_frag:qu,meshmatcap_vert:ju,meshmatcap_frag:Yu,meshnormal_vert:Zu,meshnormal_frag:Ku,meshphong_vert:Ju,meshphong_frag:$u,meshphysical_vert:Qu,meshphysical_frag:eh,meshtoon_vert:th,meshtoon_frag:rh,points_vert:ih,points_frag:ah,shadow_vert:nh,shadow_frag:sh,sprite_vert:oh,sprite_frag:lh},De={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},ar={basic:{uniforms:Rt([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Rt([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new he(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Rt([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Rt([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Rt([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new he(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Rt([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Rt([De.points,De.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Rt([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Rt([De.common,De.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Rt([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Rt([De.sprite,De.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Rt([De.common,De.displacementmap,{referencePosition:{value:new re},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Rt([De.lights,De.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};ar.physical={uniforms:Rt([ar.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Ma={r:0,b:0,g:0},Dr=new dr,ch=new lt;function uh(n,e,t,a,r,i,o){const s=new he(0);let l=i===!0?0:1,c,u,h=null,d=0,f=null;function g(p,m){let T=!1,_=m.isScene===!0?m.background:null;_&&_.isTexture&&(_=(m.backgroundBlurriness>0?t:e).get(_)),_===null?v(s,l):_&&_.isColor&&(v(_,1),T=!0);const S=n.xr.getEnvironmentBlendMode();S==="additive"?a.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),_&&(_.isCubeTexture||_.mapping===306)?(u===void 0&&(u=new Xe(new ji(1,1,1),new qe({name:"BackgroundCubeMaterial",uniforms:ii(ar.backgroundCube.uniforms),vertexShader:ar.backgroundCube.vertexShader,fragmentShader:ar.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,A,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Dr.copy(m.backgroundRotation),Dr.x*=-1,Dr.y*=-1,Dr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Dr.y*=-1,Dr.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ch.makeRotationFromEuler(Dr)),u.material.toneMapped=rt.getTransfer(_.colorSpace)!==nt,(h!==_||d!==_.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,f=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Xe(new $e(2,2),new qe({name:"BackgroundMaterial",uniforms:ii(ar.background.uniforms),vertexShader:ar.background.vertexShader,fragmentShader:ar.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=rt.getTransfer(_.colorSpace)!==nt,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,f=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function v(p,m){p.getRGB(Ma,Ps(n)),a.buffers.color.setClear(Ma.r,Ma.g,Ma.b,m,o)}return{getClearColor:function(){return s},setClearColor:function(p,m=1){s.set(p),l=m,v(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,v(s,l)},render:g}}function hh(n,e,t,a){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),i=a.isWebGL2?null:e.get("OES_vertex_array_object"),o=a.isWebGL2||i!==null,s={},l=p(null);let c=l,u=!1;function h(C,V,z,j,K){let O=!1;if(o){const W=v(j,z,V);c!==W&&(c=W,f(c.object)),O=m(C,j,z,K),O&&T(C,j,z,K)}else{const W=V.wireframe===!0;(c.geometry!==j.id||c.program!==z.id||c.wireframe!==W)&&(c.geometry=j.id,c.program=z.id,c.wireframe=W,O=!0)}K!==null&&t.update(K,n.ELEMENT_ARRAY_BUFFER),(O||u)&&(u=!1,L(C,V,z,j),K!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function d(){return a.isWebGL2?n.createVertexArray():i.createVertexArrayOES()}function f(C){return a.isWebGL2?n.bindVertexArray(C):i.bindVertexArrayOES(C)}function g(C){return a.isWebGL2?n.deleteVertexArray(C):i.deleteVertexArrayOES(C)}function v(C,V,z){const j=z.wireframe===!0;let K=s[C.id];K===void 0&&(K={},s[C.id]=K);let O=K[V.id];O===void 0&&(O={},K[V.id]=O);let W=O[j];return W===void 0&&(W=p(d()),O[j]=W),W}function p(C){const V=[],z=[],j=[];for(let K=0;K<r;K++)V[K]=0,z[K]=0,j[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:z,attributeDivisors:j,object:C,attributes:{},index:null}}function m(C,V,z,j){const K=c.attributes,O=V.attributes;let W=0;const P=z.getAttributes();for(const N in P)if(P[N].location>=0){const X=K[N];let D=O[N];if(D===void 0&&(N==="instanceMatrix"&&C.instanceMatrix&&(D=C.instanceMatrix),N==="instanceColor"&&C.instanceColor&&(D=C.instanceColor)),X===void 0||X.attribute!==D||D&&X.data!==D.data)return!0;W++}return c.attributesNum!==W||c.index!==j}function T(C,V,z,j){const K={},O=V.attributes;let W=0;const P=z.getAttributes();for(const N in P)if(P[N].location>=0){let X=O[N];X===void 0&&(N==="instanceMatrix"&&C.instanceMatrix&&(X=C.instanceMatrix),N==="instanceColor"&&C.instanceColor&&(X=C.instanceColor));const D={};D.attribute=X,X&&X.data&&(D.data=X.data),K[N]=D,W++}c.attributes=K,c.attributesNum=W,c.index=j}function _(){const C=c.newAttributes;for(let V=0,z=C.length;V<z;V++)C[V]=0}function S(C){R(C,0)}function R(C,V){const z=c.newAttributes,j=c.enabledAttributes,K=c.attributeDivisors;z[C]=1,j[C]===0&&(n.enableVertexAttribArray(C),j[C]=1),K[C]!==V&&((a.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[a.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,V),K[C]=V)}function A(){const C=c.newAttributes,V=c.enabledAttributes;for(let z=0,j=V.length;z<j;z++)V[z]!==C[z]&&(n.disableVertexAttribArray(z),V[z]=0)}function M(C,V,z,j,K,O,W){W===!0?n.vertexAttribIPointer(C,V,z,K,O):n.vertexAttribPointer(C,V,z,j,K,O)}function L(C,V,z,j){if(a.isWebGL2===!1&&(C.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const K=j.attributes,O=z.getAttributes(),W=V.defaultAttributeValues;for(const P in O){const N=O[P];if(N.location>=0){let X=K[P];if(X===void 0&&(P==="instanceMatrix"&&C.instanceMatrix&&(X=C.instanceMatrix),P==="instanceColor"&&C.instanceColor&&(X=C.instanceColor)),X!==void 0){const D=X.normalized,F=X.itemSize,J=t.get(X);if(J===void 0)continue;const Q=J.buffer,te=J.type,se=J.bytesPerElement,be=a.isWebGL2===!0&&(te===n.INT||te===n.UNSIGNED_INT||X.gpuType===1013);if(X.isInterleavedBufferAttribute){const le=X.data,I=le.stride,Ne=X.offset;if(le.isInstancedInterleavedBuffer){for(let xe=0;xe<N.locationSize;xe++)R(N.location+xe,le.meshPerAttribute);C.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let xe=0;xe<N.locationSize;xe++)S(N.location+xe);n.bindBuffer(n.ARRAY_BUFFER,Q);for(let xe=0;xe<N.locationSize;xe++)M(N.location+xe,F/N.locationSize,te,D,I*se,(Ne+F/N.locationSize*xe)*se,be)}else{if(X.isInstancedBufferAttribute){for(let le=0;le<N.locationSize;le++)R(N.location+le,X.meshPerAttribute);C.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let le=0;le<N.locationSize;le++)S(N.location+le);n.bindBuffer(n.ARRAY_BUFFER,Q);for(let le=0;le<N.locationSize;le++)M(N.location+le,F/N.locationSize,te,D,F*se,F/N.locationSize*le*se,be)}}else if(W!==void 0){const D=W[P];if(D!==void 0)switch(D.length){case 2:n.vertexAttrib2fv(N.location,D);break;case 3:n.vertexAttrib3fv(N.location,D);break;case 4:n.vertexAttrib4fv(N.location,D);break;default:n.vertexAttrib1fv(N.location,D)}}}}A()}function H(){U();for(const C in s){const V=s[C];for(const z in V){const j=V[z];for(const K in j)g(j[K].object),delete j[K];delete V[z]}delete s[C]}}function x(C){if(s[C.id]===void 0)return;const V=s[C.id];for(const z in V){const j=V[z];for(const K in j)g(j[K].object),delete j[K];delete V[z]}delete s[C.id]}function E(C){for(const V in s){const z=s[V];if(z[C.id]===void 0)continue;const j=z[C.id];for(const K in j)g(j[K].object),delete j[K];delete z[C.id]}}function U(){B(),u=!0,c!==l&&(c=l,f(c.object))}function B(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:U,resetDefaultState:B,dispose:H,releaseStatesOfGeometry:x,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:S,disableUnusedAttributes:A}}function dh(n,e,t,a){const r=a.isWebGL2;let i;function o(u){i=u}function s(u,h){n.drawArrays(i,u,h),t.update(h,i,1)}function l(u,h,d){if(d===0)return;let f,g;if(r)f=n,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](i,u,h,d),t.update(h,i,d)}function c(u,h,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(u[g],h[g]);else{f.multiDrawArraysWEBGL(i,u,0,h,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v];t.update(g,i,1)}}this.setMode=o,this.render=s,this.renderInstances=l,this.renderMultiDraw=c}function fh(n,e,t){let a;function r(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function i(M){if(M==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let s=t.precision!==void 0?t.precision:"highp";const l=i(s);l!==s&&(console.warn("THREE.WebGLRenderer:",s,"not supported, using",l,"instead."),s=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),v=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),T=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,S=o||e.has("OES_texture_float"),R=_&&S,A=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:i,precision:s,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:T,vertexTextures:_,floatFragmentTextures:S,floatVertexTextures:R,maxSamples:A}}function ph(n){const e=this;let t=null,a=0,r=!1,i=!1;const o=new Pr,s=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||a!==0||r;return r=d,a=h.length,f},this.beginShadows=function(){i=!0,u(null)},this.endShadows=function(){i=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const g=h.clippingPlanes,v=h.clipIntersection,p=h.clipShadows,m=n.get(h);if(!r||g===null||g.length===0||i&&!p)i?u(null):c();else{const T=i?0:a,_=T*4;let S=m.clippingState||null;l.value=S,S=u(g,d,_,f);for(let R=0;R!==_;++R)S[R]=t[R];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0}function u(h,d,f,g){const v=h!==null?h.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const m=f+v*4,T=d.matrixWorldInverse;s.getNormalMatrix(T),(p===null||p.length<m)&&(p=new Float32Array(m));for(let _=0,S=f;_!==v;++_,S+=4)o.copy(h[_]).applyMatrix4(T,s),o.normal.toArray(p,S),p[S+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function mh(n){let e=new WeakMap;function t(o,s){return s===303?o.mapping=301:s===304&&(o.mapping=302),o}function a(o){if(o&&o.isTexture){const s=o.mapping;if(s===303||s===304)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new El(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const s=o.target;s.removeEventListener("dispose",r);const l=e.get(s);l!==void 0&&(e.delete(s),l.dispose())}function i(){e=new WeakMap}return{get:a,dispose:i}}class tt extends Us{constructor(e=-1,t=1,a=1,r=-1,i=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=a,this.bottom=r,this.near=i,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,a,r,i,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=a,this.view.offsetY=r,this.view.width=i,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let i=a-e,o=a+e,s=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=c*this.view.offsetX,o=i+c*this.view.width,s-=u*this.view.offsetY,l=s-u*this.view.height}this.projectionMatrix.makeOrthographic(i,o,s,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const si=4,Ns=[.125,.215,.35,.446,.526,.582],Lr=20,yn=new tt,zs=new he;let bn=null,Sn=0,Mn=0;const Ir=(1+Math.sqrt(5))/2,oi=1/Ir,Bs=[new re(1,1,1),new re(-1,1,1),new re(1,1,-1),new re(-1,1,-1),new re(0,Ir,oi),new re(0,Ir,-oi),new re(oi,0,Ir),new re(-oi,0,Ir),new re(Ir,oi,0),new re(-Ir,oi,0)];class ks{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,a=.1,r=100){bn=this._renderer.getRenderTarget(),Sn=this._renderer.getActiveCubeFace(),Mn=this._renderer.getActiveMipmapLevel(),this._setSize(256);const i=this._allocateTargets();return i.depthBuffer=!0,this._sceneToCubeUV(e,a,r,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bn,Sn,Mn),e.scissorTest=!1,Ta(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bn=this._renderer.getRenderTarget(),Sn=this._renderer.getActiveCubeFace(),Mn=this._renderer.getActiveMipmapLevel();const a=t||this._allocateTargets();return this._textureToCubeUV(e,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,a={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:gr,depthBuffer:!1},r=Gs(e,t,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gs(e,t,a);const{_lodMax:i}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gh(i)),this._blurMaterial=vh(i,e,t)}return r}_compileMaterial(e){const t=new Xe(this._lodPlanes[0],e);this._renderer.compile(t,yn)}_sceneToCubeUV(e,t,a,r){const i=new Ht(90,1,t,a),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,u=l.toneMapping;l.getClearColor(zs),l.toneMapping=0,l.autoClear=!1;const h=new Fi({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),d=new Xe(new ji,h);let f=!1;const g=e.background;g?g.isColor&&(h.color.copy(g),e.background=null,f=!0):(h.color.copy(zs),f=!0);for(let v=0;v<6;v++){const p=v%3;p===0?(i.up.set(0,o[v],0),i.lookAt(s[v],0,0)):p===1?(i.up.set(0,0,o[v]),i.lookAt(0,s[v],0)):(i.up.set(0,o[v],0),i.lookAt(0,0,s[v]));const m=this._cubeSize;Ta(r,p*m,v>2?m:0,m,m),l.setRenderTarget(r),f&&l.render(d,i),l.render(e,i)}d.geometry.dispose(),d.material.dispose(),l.toneMapping=u,l.autoClear=c,e.background=g}_textureToCubeUV(e,t){const a=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hs());const i=r?this._cubemapMaterial:this._equirectMaterial,o=new Xe(this._lodPlanes[0],i),s=i.uniforms;s.envMap.value=e;const l=this._cubeSize;Ta(t,0,0,3*l,2*l),a.setRenderTarget(t),a.render(o,yn)}_applyPMREM(e){const t=this._renderer,a=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const i=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Bs[(r-1)%Bs.length];this._blur(e,r-1,r,i,o)}t.autoClear=a}_blur(e,t,a,r,i){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,a,r,"latitudinal",i),this._halfBlur(o,e,a,a,r,"longitudinal",i)}_halfBlur(e,t,a,r,i,o,s){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Xe(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[a]-1,g=isFinite(i)?Math.PI/(2*f):2*Math.PI/(2*Lr-1),v=i/g,p=isFinite(i)?1+Math.floor(u*v):Lr;p>Lr&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Lr}`);const m=[];let T=0;for(let M=0;M<Lr;++M){const L=M/v,H=Math.exp(-L*L/2);m.push(H),M===0?T+=H:M<p&&(T+=2*H)}for(let M=0;M<m.length;M++)m[M]=m[M]/T;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",s&&(d.poleAxis.value=s);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-a;const S=this._sizeLods[r],R=3*S*(r>_-si?r-_+si:0),A=4*(this._cubeSize-S);Ta(t,R,A,3*S,2*S),l.setRenderTarget(t),l.render(h,yn)}}function gh(n){const e=[],t=[],a=[];let r=n;const i=n-si+1+Ns.length;for(let o=0;o<i;o++){const s=Math.pow(2,r);t.push(s);let l=1/s;o>n-si?l=Ns[o-n+si-1]:o===0&&(l=0),a.push(l);const c=1/(s-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,v=3,p=2,m=1,T=new Float32Array(v*g*f),_=new Float32Array(p*g*f),S=new Float32Array(m*g*f);for(let A=0;A<f;A++){const M=A%3*2/3-1,L=A>2?0:-1,H=[M,L,0,M+2/3,L,0,M+2/3,L+1,0,M,L,0,M+2/3,L+1,0,M,L+1,0];T.set(H,v*g*A),_.set(d,p*g*A);const x=[A,A,A,A,A,A];S.set(x,m*g*A)}const R=new qt;R.setAttribute("position",new kt(T,v)),R.setAttribute("uv",new kt(_,p)),R.setAttribute("faceIndex",new kt(S,m)),e.push(R),r>si&&r--}return{lodPlanes:e,sizeLods:t,sigmas:a}}function Gs(n,e,t){const a=new pt(n,e,t);return a.texture.mapping=306,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Ta(n,e,t,a,r){n.viewport.set(e,t,a,r),n.scissor.set(e,t,a,r)}function vh(n,e,t){const a=new Float32Array(Lr),r=new re(0,1,0);return new qe({name:"SphericalGaussianBlur",defines:{n:Lr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Tn(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Hs(){return new qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tn(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Vs(){return new qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Tn(){return`

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
	`}function _h(n){let e=new WeakMap,t=null;function a(s){if(s&&s.isTexture){const l=s.mapping,c=l===303||l===304,u=l===301||l===302;if(c||u)if(s.isRenderTargetTexture&&s.needsPMREMUpdate===!0){s.needsPMREMUpdate=!1;let h=e.get(s);return t===null&&(t=new ks(n)),h=c?t.fromEquirectangular(s,h):t.fromCubemap(s,h),e.set(s,h),h.texture}else{if(e.has(s))return e.get(s).texture;{const h=s.image;if(c&&h&&h.height>0||u&&h&&r(h)){t===null&&(t=new ks(n));const d=c?t.fromEquirectangular(s):t.fromCubemap(s);return e.set(s,d),s.addEventListener("dispose",i),d.texture}else return null}}}return s}function r(s){let l=0;const c=6;for(let u=0;u<c;u++)s[u]!==void 0&&l++;return l===c}function i(s){const l=s.target;l.removeEventListener("dispose",i);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:a,dispose:o}}function xh(n){const e={};function t(a){if(e[a]!==void 0)return e[a];let r;switch(a){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(a)}return e[a]=r,r}return{has:function(a){return t(a)!==null},init:function(a){a.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(a){const r=t(a);return r===null&&console.warn("THREE.WebGLRenderer: "+a+" extension not supported."),r}}}function yh(n,e,t,a){const r={},i=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let p=0,m=v.length;p<m;p++)e.remove(v[p])}d.removeEventListener("dispose",o),delete r[d.id];const f=i.get(d);f&&(e.remove(f),i.delete(d)),a.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function s(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const g in d)e.update(d[g],n.ARRAY_BUFFER);const f=h.morphAttributes;for(const g in f){const v=f[g];for(let p=0,m=v.length;p<m;p++)e.update(v[p],n.ARRAY_BUFFER)}}function c(h){const d=[],f=h.index,g=h.attributes.position;let v=0;if(f!==null){const T=f.array;v=f.version;for(let _=0,S=T.length;_<S;_+=3){const R=T[_+0],A=T[_+1],M=T[_+2];d.push(R,A,A,M,M,R)}}else if(g!==void 0){const T=g.array;v=g.version;for(let _=0,S=T.length/3-1;_<S;_+=3){const R=_+0,A=_+1,M=_+2;d.push(R,A,A,M,M,R)}}else return;const p=new(ns(d)?Ts:Ms)(d,1);p.version=v;const m=i.get(h);m&&e.remove(m),i.set(h,p)}function u(h){const d=i.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return i.get(h)}return{get:s,update:l,getWireframeAttribute:u}}function bh(n,e,t,a){const r=a.isWebGL2;let i;function o(f){i=f}let s,l;function c(f){s=f.type,l=f.bytesPerElement}function u(f,g){n.drawElements(i,g,s,f*l),t.update(g,i,1)}function h(f,g,v){if(v===0)return;let p,m;if(r)p=n,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](i,g,s,f*l,v),t.update(g,i,v)}function d(f,g,v){if(v===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<v;m++)this.render(f[m]/l,g[m]);else{p.multiDrawElementsWEBGL(i,g,0,s,f,0,v);let m=0;for(let T=0;T<v;T++)m+=g[T];t.update(m,i,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function Sh(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function a(i,o,s){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=s*(i/3);break;case n.LINES:t.lines+=s*(i/2);break;case n.LINE_STRIP:t.lines+=s*(i-1);break;case n.LINE_LOOP:t.lines+=s*i;break;case n.POINTS:t.points+=s*i;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:a}}function Mh(n,e){return n[0]-e[0]}function Th(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Eh(n,e,t){const a={},r=new Float32Array(8),i=new WeakMap,o=new vt,s=[];for(let c=0;c<8;c++)s[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0;let v=i.get(u);if(v===void 0||v.count!==g){let p=function(){E.dispose(),i.delete(u),u.removeEventListener("dispose",p)};v!==void 0&&v.texture.dispose();const m=u.morphAttributes.position!==void 0,T=u.morphAttributes.normal!==void 0,_=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],R=u.morphAttributes.normal||[],A=u.morphAttributes.color||[];let M=0;m===!0&&(M=1),T===!0&&(M=2),_===!0&&(M=3);let L=u.attributes.position.count*M,H=1;L>e.maxTextureSize&&(H=Math.ceil(L/e.maxTextureSize),L=e.maxTextureSize);const x=new Float32Array(L*H*4*g),E=new hs(x,L,H,g);E.type=1015,E.needsUpdate=!0;const U=M*4;for(let B=0;B<g;B++){const C=S[B],V=R[B],z=A[B],j=L*H*4*B;for(let K=0;K<C.count;K++){const O=K*U;m===!0&&(o.fromBufferAttribute(C,K),x[j+O+0]=o.x,x[j+O+1]=o.y,x[j+O+2]=o.z,x[j+O+3]=0),T===!0&&(o.fromBufferAttribute(V,K),x[j+O+4]=o.x,x[j+O+5]=o.y,x[j+O+6]=o.z,x[j+O+7]=0),_===!0&&(o.fromBufferAttribute(z,K),x[j+O+8]=o.x,x[j+O+9]=o.y,x[j+O+10]=o.z,x[j+O+11]=z.itemSize===4?o.w:1)}}v={count:g,texture:E,size:new Ie(L,H)},i.set(u,v),u.addEventListener("dispose",p)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",c.morphTexture,t);else{let p=0;for(let T=0;T<d.length;T++)p+=d[T];const m=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",m),h.getUniforms().setValue(n,"morphTargetInfluences",d)}h.getUniforms().setValue(n,"morphTargetsTexture",v.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",v.size)}else{const f=d===void 0?0:d.length;let g=a[u.id];if(g===void 0||g.length!==f){g=[];for(let _=0;_<f;_++)g[_]=[_,0];a[u.id]=g}for(let _=0;_<f;_++){const S=g[_];S[0]=_,S[1]=d[_]}g.sort(Th);for(let _=0;_<8;_++)_<f&&g[_][1]?(s[_][0]=g[_][0],s[_][1]=g[_][1]):(s[_][0]=Number.MAX_SAFE_INTEGER,s[_][1]=0);s.sort(Mh);const v=u.morphAttributes.position,p=u.morphAttributes.normal;let m=0;for(let _=0;_<8;_++){const S=s[_],R=S[0],A=S[1];R!==Number.MAX_SAFE_INTEGER&&A?(v&&u.getAttribute("morphTarget"+_)!==v[R]&&u.setAttribute("morphTarget"+_,v[R]),p&&u.getAttribute("morphNormal"+_)!==p[R]&&u.setAttribute("morphNormal"+_,p[R]),r[_]=A,m+=A):(v&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),p&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),r[_]=0)}const T=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(n,"morphTargetBaseInfluence",T),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function wh(n,e,t,a){let r=new WeakMap;function i(l){const c=a.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",s)===!1&&l.addEventListener("dispose",s),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function s(l){const c=l.target;c.removeEventListener("dispose",s),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:i,dispose:o}}class Ws extends St{constructor(e,t,a,r,i,o,s,l,c,u){if(u=u!==void 0?u:1026,u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&u===1026&&(a=1014),a===void 0&&u===1027&&(a=1020),super(null,r,i,o,s,l,u,a,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=s!==void 0?s:1003,this.minFilter=l!==void 0?l:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Xs=new St,qs=new Ws(1,1);qs.compareFunction=515;const js=new hs,Ys=new cl,Zs=new Is,Ks=[],Js=[],$s=new Float32Array(16),Qs=new Float32Array(9),eo=new Float32Array(4);function li(n,e,t){const a=n[0];if(a<=0||a>0)return n;const r=e*t;let i=Ks[r];if(i===void 0&&(i=new Float32Array(r),Ks[r]=i),e!==0){a.toArray(i,0);for(let o=1,s=0;o!==e;++o)s+=t,n[o].toArray(i,s)}return i}function mt(n,e){if(n.length!==e.length)return!1;for(let t=0,a=n.length;t<a;t++)if(n[t]!==e[t])return!1;return!0}function gt(n,e){for(let t=0,a=e.length;t<a;t++)n[t]=e[t]}function Ea(n,e){let t=Js[e];t===void 0&&(t=new Int32Array(e),Js[e]=t);for(let a=0;a!==e;++a)t[a]=n.allocateTextureUnit();return t}function Ah(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ch(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2fv(this.addr,e),gt(t,e)}}function Rh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;n.uniform3fv(this.addr,e),gt(t,e)}}function Ph(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4fv(this.addr,e),gt(t,e)}}function Uh(n,e){const t=this.cache,a=e.elements;if(a===void 0){if(mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,a))return;eo.set(a),n.uniformMatrix2fv(this.addr,!1,eo),gt(t,a)}}function Dh(n,e){const t=this.cache,a=e.elements;if(a===void 0){if(mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,a))return;Qs.set(a),n.uniformMatrix3fv(this.addr,!1,Qs),gt(t,a)}}function Lh(n,e){const t=this.cache,a=e.elements;if(a===void 0){if(mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,a))return;$s.set(a),n.uniformMatrix4fv(this.addr,!1,$s),gt(t,a)}}function Ih(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Fh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2iv(this.addr,e),gt(t,e)}}function Oh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;n.uniform3iv(this.addr,e),gt(t,e)}}function Nh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4iv(this.addr,e),gt(t,e)}}function zh(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Bh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;n.uniform2uiv(this.addr,e),gt(t,e)}}function kh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;n.uniform3uiv(this.addr,e),gt(t,e)}}function Gh(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;n.uniform4uiv(this.addr,e),gt(t,e)}}function Hh(n,e,t){const a=this.cache,r=t.allocateTextureUnit();a[0]!==r&&(n.uniform1i(this.addr,r),a[0]=r);const i=this.type===n.SAMPLER_2D_SHADOW?qs:Xs;t.setTexture2D(e||i,r)}function Vh(n,e,t){const a=this.cache,r=t.allocateTextureUnit();a[0]!==r&&(n.uniform1i(this.addr,r),a[0]=r),t.setTexture3D(e||Ys,r)}function Wh(n,e,t){const a=this.cache,r=t.allocateTextureUnit();a[0]!==r&&(n.uniform1i(this.addr,r),a[0]=r),t.setTextureCube(e||Zs,r)}function Xh(n,e,t){const a=this.cache,r=t.allocateTextureUnit();a[0]!==r&&(n.uniform1i(this.addr,r),a[0]=r),t.setTexture2DArray(e||js,r)}function qh(n){switch(n){case 5126:return Ah;case 35664:return Ch;case 35665:return Rh;case 35666:return Ph;case 35674:return Uh;case 35675:return Dh;case 35676:return Lh;case 5124:case 35670:return Ih;case 35667:case 35671:return Fh;case 35668:case 35672:return Oh;case 35669:case 35673:return Nh;case 5125:return zh;case 36294:return Bh;case 36295:return kh;case 36296:return Gh;case 35678:case 36198:case 36298:case 36306:case 35682:return Hh;case 35679:case 36299:case 36307:return Vh;case 35680:case 36300:case 36308:case 36293:return Wh;case 36289:case 36303:case 36311:case 36292:return Xh}}function jh(n,e){n.uniform1fv(this.addr,e)}function Yh(n,e){const t=li(e,this.size,2);n.uniform2fv(this.addr,t)}function Zh(n,e){const t=li(e,this.size,3);n.uniform3fv(this.addr,t)}function Kh(n,e){const t=li(e,this.size,4);n.uniform4fv(this.addr,t)}function Jh(n,e){const t=li(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function $h(n,e){const t=li(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Qh(n,e){const t=li(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ed(n,e){n.uniform1iv(this.addr,e)}function td(n,e){n.uniform2iv(this.addr,e)}function rd(n,e){n.uniform3iv(this.addr,e)}function id(n,e){n.uniform4iv(this.addr,e)}function ad(n,e){n.uniform1uiv(this.addr,e)}function nd(n,e){n.uniform2uiv(this.addr,e)}function sd(n,e){n.uniform3uiv(this.addr,e)}function od(n,e){n.uniform4uiv(this.addr,e)}function ld(n,e,t){const a=this.cache,r=e.length,i=Ea(t,r);mt(a,i)||(n.uniform1iv(this.addr,i),gt(a,i));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Xs,i[o])}function cd(n,e,t){const a=this.cache,r=e.length,i=Ea(t,r);mt(a,i)||(n.uniform1iv(this.addr,i),gt(a,i));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Ys,i[o])}function ud(n,e,t){const a=this.cache,r=e.length,i=Ea(t,r);mt(a,i)||(n.uniform1iv(this.addr,i),gt(a,i));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Zs,i[o])}function hd(n,e,t){const a=this.cache,r=e.length,i=Ea(t,r);mt(a,i)||(n.uniform1iv(this.addr,i),gt(a,i));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||js,i[o])}function dd(n){switch(n){case 5126:return jh;case 35664:return Yh;case 35665:return Zh;case 35666:return Kh;case 35674:return Jh;case 35675:return $h;case 35676:return Qh;case 5124:case 35670:return ed;case 35667:case 35671:return td;case 35668:case 35672:return rd;case 35669:case 35673:return id;case 5125:return ad;case 36294:return nd;case 36295:return sd;case 36296:return od;case 35678:case 36198:case 36298:case 36306:case 35682:return ld;case 35679:case 36299:case 36307:return cd;case 35680:case 36300:case 36308:case 36293:return ud;case 36289:case 36303:case 36311:case 36292:return hd}}class fd{constructor(e,t,a){this.id=e,this.addr=a,this.cache=[],this.type=t.type,this.setValue=qh(t.type)}}class pd{constructor(e,t,a){this.id=e,this.addr=a,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=dd(t.type)}}class md{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,a){const r=this.seq;for(let i=0,o=r.length;i!==o;++i){const s=r[i];s.setValue(e,t[s.id],a)}}}const En=/(\w+)(\])?(\[|\.)?/g;function to(n,e){n.seq.push(e),n.map[e.id]=e}function gd(n,e,t){const a=n.name,r=a.length;for(En.lastIndex=0;;){const i=En.exec(a),o=En.lastIndex;let s=i[1];const l=i[2]==="]",c=i[3];if(l&&(s=s|0),c===void 0||c==="["&&o+2===r){to(t,c===void 0?new fd(s,n,e):new pd(s,n,e));break}else{let u=t.map[s];u===void 0&&(u=new md(s),to(t,u)),t=u}}}class wa{constructor(e,t){this.seq=[],this.map={};const a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<a;++r){const i=e.getActiveUniform(t,r),o=e.getUniformLocation(t,i.name);gd(i,o,this)}}setValue(e,t,a,r){const i=this.map[t];i!==void 0&&i.setValue(e,a,r)}setOptional(e,t,a){const r=t[a];r!==void 0&&this.setValue(e,a,r)}static upload(e,t,a,r){for(let i=0,o=t.length;i!==o;++i){const s=t[i],l=a[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,t){const a=[];for(let r=0,i=e.length;r!==i;++r){const o=e[r];o.id in t&&a.push(o)}return a}}function ro(n,e,t){const a=n.createShader(e);return n.shaderSource(a,t),n.compileShader(a),a}const vd=37297;let _d=0;function xd(n,e){const t=n.split(`
`),a=[],r=Math.max(e-6,0),i=Math.min(e+6,t.length);for(let o=r;o<i;o++){const s=o+1;a.push(`${s===e?">":" "} ${s}: ${t[o]}`)}return a.join(`
`)}function yd(n){const e=rt.getPrimaries(rt.workingColorSpace),t=rt.getPrimaries(n);let a;switch(e===t?a="":e==="p3"&&t===ia?a="LinearDisplayP3ToLinearSRGB":e===ia&&t==="p3"&&(a="LinearSRGBToLinearDisplayP3"),n){case gr:case ta:return[a,"LinearTransferOETF"];case ir:case Za:return[a,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[a,"LinearTransferOETF"]}}function io(n,e,t){const a=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(a&&r==="")return"";const i=/ERROR: 0:(\d+)/.exec(r);if(i){const o=parseInt(i[1]);return t.toUpperCase()+`

`+r+`

`+xd(n.getShaderSource(e),o)}else return r}function bd(n,e){const t=yd(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Sd(n,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="OptimizedCineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Md(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.alphaToCoverage||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ci).join(`
`)}function Td(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ci).join(`
`)}function Ed(n){const e=[];for(const t in n){const a=n[t];a!==!1&&e.push("#define "+t+" "+a)}return e.join(`
`)}function wd(n,e){const t={},a=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<a;r++){const i=n.getActiveAttrib(e,r),o=i.name;let s=1;i.type===n.FLOAT_MAT2&&(s=2),i.type===n.FLOAT_MAT3&&(s=3),i.type===n.FLOAT_MAT4&&(s=4),t[o]={type:i.type,location:n.getAttribLocation(e,o),locationSize:s}}return t}function ci(n){return n!==""}function ao(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function no(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ad=/^[ \t]*#include +<([\w\d./]+)>/gm;function wn(n){return n.replace(Ad,Rd)}const Cd=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Rd(n,e){let t=Ze[e];if(t===void 0){const a=Cd.get(e);if(a!==void 0)t=Ze[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,a);else throw new Error("Can not resolve #include <"+e+">")}return wn(t)}const Pd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function so(n){return n.replace(Pd,Ud)}function Ud(n,e,t,a){let r="";for(let i=parseInt(e);i<parseInt(t);i++)r+=a.replace(/\[\s*i\s*\]/g,"[ "+i+" ]").replace(/UNROLLED_LOOP_INDEX/g,i);return r}function oo(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Dd(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function Ld(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Id(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===302&&(e="ENVMAP_MODE_REFRACTION"),e}function Fd(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function Od(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,a=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:a,maxMip:t}}function Nd(n,e,t,a){const r=n.getContext(),i=t.defines;let o=t.vertexShader,s=t.fragmentShader;const l=Dd(t),c=Ld(t),u=Id(t),h=Fd(t),d=Od(t),f=t.isWebGL2?"":Md(t),g=Td(t),v=Ed(i),p=r.createProgram();let m,T,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ci).join(`
`),m.length>0&&(m+=`
`),T=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ci).join(`
`),T.length>0&&(T+=`
`)):(m=[oo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ci).join(`
`),T=[f,oo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Ze.tonemapping_pars_fragment:"",t.toneMapping!==0?Sd("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,bd("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ci).join(`
`)),o=wn(o),o=ao(o,t),o=no(o,t),s=wn(s),s=ao(s,t),s=no(s,t),o=so(o),s=so(s),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,T=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===is?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===is?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+T);const S=_+m+o,R=_+T+s,A=ro(r,r.VERTEX_SHADER,S),M=ro(r,r.FRAGMENT_SHADER,R);r.attachShader(p,A),r.attachShader(p,M),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p);function L(U){if(n.debug.checkShaderErrors){const B=r.getProgramInfoLog(p).trim(),C=r.getShaderInfoLog(A).trim(),V=r.getShaderInfoLog(M).trim();let z=!0,j=!0;if(r.getProgramParameter(p,r.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,p,A,M);else{const K=io(r,A,"vertex"),O=io(r,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+B+`
`+K+`
`+O)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(C===""||V==="")&&(j=!1);j&&(U.diagnostics={runnable:z,programLog:B,vertexShader:{log:C,prefix:m},fragmentShader:{log:V,prefix:T}})}r.deleteShader(A),r.deleteShader(M),H=new wa(r,p),x=wd(r,p)}let H;this.getUniforms=function(){return H===void 0&&L(this),H};let x;this.getAttributes=function(){return x===void 0&&L(this),x};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(p,vd)),E},this.destroy=function(){a.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=_d++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=M,this}let zd=0;class Bd{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,a=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(a),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(i)===!1&&(o.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const a of t)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let a=t.get(e);return a===void 0&&(a=new Set,t.set(e,a)),a}_getShaderStage(e){const t=this.shaderCache;let a=t.get(e);return a===void 0&&(a=new kd(e),t.set(e,a)),a}}class kd{constructor(e){this.id=zd++,this.code=e,this.usedTimes=0}}function Gd(n,e,t,a,r,i,o){const s=new gs,l=new Bd,c=new Set,u=[],h=r.isWebGL2,d=r.logarithmicDepthBuffer,f=r.vertexTextures;let g=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,E,U,B,C){const V=B.fog,z=C.geometry,j=x.isMeshStandardMaterial?B.environment:null,K=(x.isMeshStandardMaterial?t:e).get(x.envMap||j),O=K&&K.mapping===306?K.image.height:null,W=v[x.type];x.precision!==null&&(g=r.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const P=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,N=P!==void 0?P.length:0;let X=0;z.morphAttributes.position!==void 0&&(X=1),z.morphAttributes.normal!==void 0&&(X=2),z.morphAttributes.color!==void 0&&(X=3);let D,F,J,Q;if(W){const Be=ar[W];D=Be.vertexShader,F=Be.fragmentShader}else D=x.vertexShader,F=x.fragmentShader,l.update(x),J=l.getVertexShaderID(x),Q=l.getFragmentShaderID(x);const te=n.getRenderTarget(),se=C.isInstancedMesh===!0,be=C.isBatchedMesh===!0,le=!!x.map,I=!!x.matcap,Ne=!!K,xe=!!x.aoMap,ve=!!x.lightMap,fe=!!x.bumpMap,Ae=!!x.normalMap,oe=!!x.displacementMap,Se=!!x.emissiveMap,Me=!!x.metalnessMap,b=!!x.roughnessMap,y=x.anisotropy>0,k=x.clearcoat>0,Y=x.iridescence>0,ie=x.sheen>0,$=x.transmission>0,Pe=y&&!!x.anisotropyMap,de=k&&!!x.clearcoatMap,ce=k&&!!x.clearcoatNormalMap,me=k&&!!x.clearcoatRoughnessMap,Oe=Y&&!!x.iridescenceMap,ue=Y&&!!x.iridescenceThicknessMap,Je=ie&&!!x.sheenColorMap,Ee=ie&&!!x.sheenRoughnessMap,Te=!!x.specularMap,Ue=!!x.specularColorMap,Ce=!!x.specularIntensityMap,Ge=$&&!!x.transmissionMap,we=$&&!!x.thicknessMap,Fe=!!x.gradientMap,G=!!x.alphaMap,pe=x.alphaTest>0,q=!!x.alphaHash,ye=!!x.extensions;let _e=0;x.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(_e=n.toneMapping);const Le={isWebGL2:h,shaderID:W,shaderType:x.type,shaderName:x.name,vertexShader:D,fragmentShader:F,defines:x.defines,customVertexShaderID:J,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:be,instancing:se,instancingColor:se&&C.instanceColor!==null,instancingMorph:se&&C.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:gr,alphaToCoverage:!!x.alphaToCoverage,map:le,matcap:I,envMap:Ne,envMapMode:Ne&&K.mapping,envMapCubeUVHeight:O,aoMap:xe,lightMap:ve,bumpMap:fe,normalMap:Ae,displacementMap:f&&oe,emissiveMap:Se,normalMapObjectSpace:Ae&&x.normalMapType===1,normalMapTangentSpace:Ae&&x.normalMapType===0,metalnessMap:Me,roughnessMap:b,anisotropy:y,anisotropyMap:Pe,clearcoat:k,clearcoatMap:de,clearcoatNormalMap:ce,clearcoatRoughnessMap:me,iridescence:Y,iridescenceMap:Oe,iridescenceThicknessMap:ue,sheen:ie,sheenColorMap:Je,sheenRoughnessMap:Ee,specularMap:Te,specularColorMap:Ue,specularIntensityMap:Ce,transmission:$,transmissionMap:Ge,thicknessMap:we,gradientMap:Fe,opaque:x.transparent===!1&&x.blending===1&&x.alphaToCoverage===!1,alphaMap:G,alphaTest:pe,alphaHash:q,combine:x.combine,mapUv:le&&p(x.map.channel),aoMapUv:xe&&p(x.aoMap.channel),lightMapUv:ve&&p(x.lightMap.channel),bumpMapUv:fe&&p(x.bumpMap.channel),normalMapUv:Ae&&p(x.normalMap.channel),displacementMapUv:oe&&p(x.displacementMap.channel),emissiveMapUv:Se&&p(x.emissiveMap.channel),metalnessMapUv:Me&&p(x.metalnessMap.channel),roughnessMapUv:b&&p(x.roughnessMap.channel),anisotropyMapUv:Pe&&p(x.anisotropyMap.channel),clearcoatMapUv:de&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ce&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Je&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&p(x.sheenRoughnessMap.channel),specularMapUv:Te&&p(x.specularMap.channel),specularColorMapUv:Ue&&p(x.specularColorMap.channel),specularIntensityMapUv:Ce&&p(x.specularIntensityMap.channel),transmissionMapUv:Ge&&p(x.transmissionMap.channel),thicknessMapUv:we&&p(x.thicknessMap.channel),alphaMapUv:G&&p(x.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ae||y),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!z.attributes.uv&&(le||G),fog:!!V,useFog:x.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:C.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:X,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:_e,useLegacyLights:n._useLegacyLights,decodeVideoTexture:le&&x.map.isVideoTexture===!0&&rt.getTransfer(x.map.colorSpace)===nt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===2,flipSided:x.side===1,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:ye&&x.extensions.derivatives===!0,extensionFragDepth:ye&&x.extensions.fragDepth===!0,extensionDrawBuffers:ye&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:ye&&x.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ye&&x.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:ye&&x.extensions.multiDraw===!0&&a.has("WEBGL_multi_draw"),rendererExtensionFragDepth:h||a.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||a.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||a.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function T(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const U in x.defines)E.push(U),E.push(x.defines[U]);return x.isRawShaderMaterial===!1&&(_(E,x),S(E,x),E.push(n.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function _(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function S(x,E){s.disableAll(),E.isWebGL2&&s.enable(0),E.supportsVertexTextures&&s.enable(1),E.instancing&&s.enable(2),E.instancingColor&&s.enable(3),E.instancingMorph&&s.enable(4),E.matcap&&s.enable(5),E.envMap&&s.enable(6),E.normalMapObjectSpace&&s.enable(7),E.normalMapTangentSpace&&s.enable(8),E.clearcoat&&s.enable(9),E.iridescence&&s.enable(10),E.alphaTest&&s.enable(11),E.vertexColors&&s.enable(12),E.vertexAlphas&&s.enable(13),E.vertexUv1s&&s.enable(14),E.vertexUv2s&&s.enable(15),E.vertexUv3s&&s.enable(16),E.vertexTangents&&s.enable(17),E.anisotropy&&s.enable(18),E.alphaHash&&s.enable(19),E.batching&&s.enable(20),x.push(s.mask),s.disableAll(),E.fog&&s.enable(0),E.useFog&&s.enable(1),E.flatShading&&s.enable(2),E.logarithmicDepthBuffer&&s.enable(3),E.skinning&&s.enable(4),E.morphTargets&&s.enable(5),E.morphNormals&&s.enable(6),E.morphColors&&s.enable(7),E.premultipliedAlpha&&s.enable(8),E.shadowMapEnabled&&s.enable(9),E.useLegacyLights&&s.enable(10),E.doubleSided&&s.enable(11),E.flipSided&&s.enable(12),E.useDepthPacking&&s.enable(13),E.dithering&&s.enable(14),E.transmission&&s.enable(15),E.sheen&&s.enable(16),E.opaque&&s.enable(17),E.pointsUvs&&s.enable(18),E.decodeVideoTexture&&s.enable(19),E.alphaToCoverage&&s.enable(20),x.push(s.mask)}function R(x){const E=v[x.type];let U;if(E){const B=ar[E];U=Ni.clone(B.uniforms)}else U=x.uniforms;return U}function A(x,E){let U;for(let B=0,C=u.length;B<C;B++){const V=u[B];if(V.cacheKey===E){U=V,++U.usedTimes;break}}return U===void 0&&(U=new Nd(n,E,x,i),u.push(U)),U}function M(x){if(--x.usedTimes===0){const E=u.indexOf(x);u[E]=u[u.length-1],u.pop(),x.destroy()}}function L(x){l.remove(x)}function H(){l.dispose()}return{getParameters:m,getProgramCacheKey:T,getUniforms:R,acquireProgram:A,releaseProgram:M,releaseShaderCache:L,programs:u,dispose:H}}function Hd(){let n=new WeakMap;function e(i){let o=n.get(i);return o===void 0&&(o={},n.set(i,o)),o}function t(i){n.delete(i)}function a(i,o,s){n.get(i)[o]=s}function r(){n=new WeakMap}return{get:e,remove:t,update:a,dispose:r}}function Vd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function lo(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function co(){const n=[];let e=0;const t=[],a=[],r=[];function i(){e=0,t.length=0,a.length=0,r.length=0}function o(h,d,f,g,v,p){let m=n[e];return m===void 0?(m={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:v,group:p},n[e]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=v,m.group=p),e++,m}function s(h,d,f,g,v,p){const m=o(h,d,f,g,v,p);f.transmission>0?a.push(m):f.transparent===!0?r.push(m):t.push(m)}function l(h,d,f,g,v,p){const m=o(h,d,f,g,v,p);f.transmission>0?a.unshift(m):f.transparent===!0?r.unshift(m):t.unshift(m)}function c(h,d){t.length>1&&t.sort(h||Vd),a.length>1&&a.sort(d||lo),r.length>1&&r.sort(d||lo)}function u(){for(let h=e,d=n.length;h<d;h++){const f=n[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:a,transparent:r,init:i,push:s,unshift:l,finish:u,sort:c}}function Wd(){let n=new WeakMap;function e(a,r){const i=n.get(a);let o;return i===void 0?(o=new co,n.set(a,[o])):r>=i.length?(o=new co,i.push(o)):o=i[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Xd(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new re,color:new he};break;case"SpotLight":t={position:new re,direction:new re,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new re,color:new he,distance:0,decay:0};break;case"HemisphereLight":t={direction:new re,skyColor:new he,groundColor:new he};break;case"RectAreaLight":t={color:new he,position:new re,halfWidth:new re,halfHeight:new re};break}return n[e.id]=t,t}}}function qd(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let jd=0;function Yd(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Zd(n,e){const t=new Xd,a=qd(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new re);const i=new re,o=new lt,s=new lt;function l(u,h){let d=0,f=0,g=0;for(let U=0;U<9;U++)r.probe[U].set(0,0,0);let v=0,p=0,m=0,T=0,_=0,S=0,R=0,A=0,M=0,L=0,H=0;u.sort(Yd);const x=h===!0?Math.PI:1;for(let U=0,B=u.length;U<B;U++){const C=u[U],V=C.color,z=C.intensity,j=C.distance,K=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=V.r*z*x,f+=V.g*z*x,g+=V.b*z*x;else if(C.isLightProbe){for(let O=0;O<9;O++)r.probe[O].addScaledVector(C.sh.coefficients[O],z);H++}else if(C.isDirectionalLight){const O=t.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity*x),C.castShadow){const W=C.shadow,P=a.get(C);P.shadowBias=W.bias,P.shadowNormalBias=W.normalBias,P.shadowRadius=W.radius,P.shadowMapSize=W.mapSize,r.directionalShadow[v]=P,r.directionalShadowMap[v]=K,r.directionalShadowMatrix[v]=C.shadow.matrix,S++}r.directional[v]=O,v++}else if(C.isSpotLight){const O=t.get(C);O.position.setFromMatrixPosition(C.matrixWorld),O.color.copy(V).multiplyScalar(z*x),O.distance=j,O.coneCos=Math.cos(C.angle),O.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),O.decay=C.decay,r.spot[m]=O;const W=C.shadow;if(C.map&&(r.spotLightMap[M]=C.map,M++,W.updateMatrices(C),C.castShadow&&L++),r.spotLightMatrix[m]=W.matrix,C.castShadow){const P=a.get(C);P.shadowBias=W.bias,P.shadowNormalBias=W.normalBias,P.shadowRadius=W.radius,P.shadowMapSize=W.mapSize,r.spotShadow[m]=P,r.spotShadowMap[m]=K,A++}m++}else if(C.isRectAreaLight){const O=t.get(C);O.color.copy(V).multiplyScalar(z),O.halfWidth.set(C.width*.5,0,0),O.halfHeight.set(0,C.height*.5,0),r.rectArea[T]=O,T++}else if(C.isPointLight){const O=t.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity*x),O.distance=C.distance,O.decay=C.decay,C.castShadow){const W=C.shadow,P=a.get(C);P.shadowBias=W.bias,P.shadowNormalBias=W.normalBias,P.shadowRadius=W.radius,P.shadowMapSize=W.mapSize,P.shadowCameraNear=W.camera.near,P.shadowCameraFar=W.camera.far,r.pointShadow[p]=P,r.pointShadowMap[p]=K,r.pointShadowMatrix[p]=C.shadow.matrix,R++}r.point[p]=O,p++}else if(C.isHemisphereLight){const O=t.get(C);O.skyColor.copy(C.color).multiplyScalar(z*x),O.groundColor.copy(C.groundColor).multiplyScalar(z*x),r.hemi[_]=O,_++}}T>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=De.LTC_FLOAT_1,r.rectAreaLTC2=De.LTC_FLOAT_2):(r.rectAreaLTC1=De.LTC_HALF_1,r.rectAreaLTC2=De.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=De.LTC_FLOAT_1,r.rectAreaLTC2=De.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=De.LTC_HALF_1,r.rectAreaLTC2=De.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=f,r.ambient[2]=g;const E=r.hash;(E.directionalLength!==v||E.pointLength!==p||E.spotLength!==m||E.rectAreaLength!==T||E.hemiLength!==_||E.numDirectionalShadows!==S||E.numPointShadows!==R||E.numSpotShadows!==A||E.numSpotMaps!==M||E.numLightProbes!==H)&&(r.directional.length=v,r.spot.length=m,r.rectArea.length=T,r.point.length=p,r.hemi.length=_,r.directionalShadow.length=S,r.directionalShadowMap.length=S,r.pointShadow.length=R,r.pointShadowMap.length=R,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=S,r.pointShadowMatrix.length=R,r.spotLightMatrix.length=A+M-L,r.spotLightMap.length=M,r.numSpotLightShadowsWithMaps=L,r.numLightProbes=H,E.directionalLength=v,E.pointLength=p,E.spotLength=m,E.rectAreaLength=T,E.hemiLength=_,E.numDirectionalShadows=S,E.numPointShadows=R,E.numSpotShadows=A,E.numSpotMaps=M,E.numLightProbes=H,r.version=jd++)}function c(u,h){let d=0,f=0,g=0,v=0,p=0;const m=h.matrixWorldInverse;for(let T=0,_=u.length;T<_;T++){const S=u[T];if(S.isDirectionalLight){const R=r.directional[d];R.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(i),R.direction.transformDirection(m),d++}else if(S.isSpotLight){const R=r.spot[g];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(i),R.direction.transformDirection(m),g++}else if(S.isRectAreaLight){const R=r.rectArea[v];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(m),s.identity(),o.copy(S.matrixWorld),o.premultiply(m),s.extractRotation(o),R.halfWidth.set(S.width*.5,0,0),R.halfHeight.set(0,S.height*.5,0),R.halfWidth.applyMatrix4(s),R.halfHeight.applyMatrix4(s),v++}else if(S.isPointLight){const R=r.point[f];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const R=r.hemi[p];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:r}}function uo(n,e){const t=new Zd(n,e),a=[],r=[];function i(){a.length=0,r.length=0}function o(u){a.push(u)}function s(u){r.push(u)}function l(u){t.setup(a,u)}function c(u){t.setupView(a,u)}return{init:i,state:{lightsArray:a,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:s}}function Kd(n,e){let t=new WeakMap;function a(i,o=0){const s=t.get(i);let l;return s===void 0?(l=new uo(n,e),t.set(i,[l])):o>=s.length?(l=new uo(n,e),s.push(l)):l=s[o],l}function r(){t=new WeakMap}return{get:a,dispose:r}}class ho extends Ii{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fo extends Ii{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Jd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$d=`uniform sampler2D shadow_pass;
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
}`;function Qd(n,e,t){let a=new Fs;const r=new Ie,i=new Ie,o=new vt,s=new ho({depthPacking:3201}),l=new fo,c={},u=t.maxTextureSize,h={0:1,1:0,2:2},d=new qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:Jd,fragmentShader:$d}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new qt;g.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Xe(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let m=this.type;this.render=function(A,M,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const H=n.getRenderTarget(),x=n.getActiveCubeFace(),E=n.getActiveMipmapLevel(),U=n.state;U.setBlending(0),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const B=m!==3&&this.type===3,C=m===3&&this.type!==3;for(let V=0,z=A.length;V<z;V++){const j=A[V],K=j.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);const O=K.getFrameExtents();if(r.multiply(O),i.copy(K.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(i.x=Math.floor(u/O.x),r.x=i.x*O.x,K.mapSize.x=i.x),r.y>u&&(i.y=Math.floor(u/O.y),r.y=i.y*O.y,K.mapSize.y=i.y)),K.map===null||B===!0||C===!0){const P=this.type!==3?{minFilter:1003,magFilter:1003}:{};K.map!==null&&K.map.dispose(),K.map=new pt(r.x,r.y,P),K.map.texture.name=j.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const W=K.getViewportCount();for(let P=0;P<W;P++){const N=K.getViewport(P);o.set(i.x*N.x,i.y*N.y,i.x*N.z,i.y*N.w),U.viewport(o),K.updateMatrices(j,P),a=K.getFrustum(),S(M,L,K.camera,j,this.type)}K.isPointLightShadow!==!0&&this.type===3&&T(K,L),K.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(H,x,E)};function T(A,M){const L=e.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new pt(r.x,r.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(M,null,L,d,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(M,null,L,f,v,null)}function _(A,M,L,H){let x=null;const E=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(E!==void 0)x=E;else if(x=L.isPointLight===!0?l:s,n.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const U=x.uuid,B=M.uuid;let C=c[U];C===void 0&&(C={},c[U]=C);let V=C[B];V===void 0&&(V=x.clone(),C[B]=V,M.addEventListener("dispose",R)),x=V}if(x.visible=M.visible,x.wireframe=M.wireframe,H===3?x.side=M.shadowSide!==null?M.shadowSide:M.side:x.side=M.shadowSide!==null?M.shadowSide:h[M.side],x.alphaMap=M.alphaMap,x.alphaTest=M.alphaTest,x.map=M.map,x.clipShadows=M.clipShadows,x.clippingPlanes=M.clippingPlanes,x.clipIntersection=M.clipIntersection,x.displacementMap=M.displacementMap,x.displacementScale=M.displacementScale,x.displacementBias=M.displacementBias,x.wireframeLinewidth=M.wireframeLinewidth,x.linewidth=M.linewidth,L.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const U=n.properties.get(x);U.light=L}return x}function S(A,M,L,H,x){if(A.visible===!1)return;if(A.layers.test(M.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===3)&&(!A.frustumCulled||a.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const U=e.update(A),B=A.material;if(Array.isArray(B)){const C=U.groups;for(let V=0,z=C.length;V<z;V++){const j=C[V],K=B[j.materialIndex];if(K&&K.visible){const O=_(A,K,H,x);A.onBeforeShadow(n,A,M,L,U,O,j),n.renderBufferDirect(L,null,U,O,A,j),A.onAfterShadow(n,A,M,L,U,O,j)}}}else if(B.visible){const C=_(A,B,H,x);A.onBeforeShadow(n,A,M,L,U,C,null),n.renderBufferDirect(L,null,U,C,A,null),A.onAfterShadow(n,A,M,L,U,C,null)}}const E=A.children;for(let U=0,B=E.length;U<B;U++)S(E[U],M,L,H,x)}function R(A){A.target.removeEventListener("dispose",R);for(const M in c){const L=c[M],H=A.target.uuid;H in L&&(L[H].dispose(),delete L[H])}}}function ef(n,e,t){const a=t.isWebGL2;function r(){let G=!1;const pe=new vt;let q=null;const ye=new vt(0,0,0,0);return{setMask:function(_e){q!==_e&&!G&&(n.colorMask(_e,_e,_e,_e),q=_e)},setLocked:function(_e){G=_e},setClear:function(_e,Le,Be,Qe,et){et===!0&&(_e*=Qe,Le*=Qe,Be*=Qe),pe.set(_e,Le,Be,Qe),ye.equals(pe)===!1&&(n.clearColor(_e,Le,Be,Qe),ye.copy(pe))},reset:function(){G=!1,q=null,ye.set(-1,0,0,0)}}}function i(){let G=!1,pe=null,q=null,ye=null;return{setTest:function(_e){_e?se(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(_e){pe!==_e&&!G&&(n.depthMask(_e),pe=_e)},setFunc:function(_e){if(q!==_e){switch(_e){case 0:n.depthFunc(n.NEVER);break;case 1:n.depthFunc(n.ALWAYS);break;case 2:n.depthFunc(n.LESS);break;case 3:n.depthFunc(n.LEQUAL);break;case 4:n.depthFunc(n.EQUAL);break;case 5:n.depthFunc(n.GEQUAL);break;case 6:n.depthFunc(n.GREATER);break;case 7:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}q=_e}},setLocked:function(_e){G=_e},setClear:function(_e){ye!==_e&&(n.clearDepth(_e),ye=_e)},reset:function(){G=!1,pe=null,q=null,ye=null}}}function o(){let G=!1,pe=null,q=null,ye=null,_e=null,Le=null,Be=null,Qe=null,et=null;return{setTest:function(He){G||(He?se(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(He){pe!==He&&!G&&(n.stencilMask(He),pe=He)},setFunc:function(He,at,_t){(q!==He||ye!==at||_e!==_t)&&(n.stencilFunc(He,at,_t),q=He,ye=at,_e=_t)},setOp:function(He,at,_t){(Le!==He||Be!==at||Qe!==_t)&&(n.stencilOp(He,at,_t),Le=He,Be=at,Qe=_t)},setLocked:function(He){G=He},setClear:function(He){et!==He&&(n.clearStencil(He),et=He)},reset:function(){G=!1,pe=null,q=null,ye=null,_e=null,Le=null,Be=null,Qe=null,et=null}}}const s=new r,l=new i,c=new o,u=new WeakMap,h=new WeakMap;let d={},f={},g=new WeakMap,v=[],p=null,m=!1,T=null,_=null,S=null,R=null,A=null,M=null,L=null,H=new he(0,0,0),x=0,E=!1,U=null,B=null,C=null,V=null,z=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,O=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(W)[1]),K=O>=1):W.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),K=O>=2);let P=null,N={};const X=n.getParameter(n.SCISSOR_BOX),D=n.getParameter(n.VIEWPORT),F=new vt().fromArray(X),J=new vt().fromArray(D);function Q(G,pe,q,ye){const _e=new Uint8Array(4),Le=n.createTexture();n.bindTexture(G,Le),n.texParameteri(G,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(G,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Be=0;Be<q;Be++)a&&(G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY)?n.texImage3D(pe,0,n.RGBA,1,1,ye,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(pe+Be,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return Le}const te={};te[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),te[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),a&&(te[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),te[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),s.setClear(0,0,0,1),l.setClear(1),c.setClear(0),se(n.DEPTH_TEST),l.setFunc(3),oe(!1),Se(1),se(n.CULL_FACE),fe(0);function se(G){d[G]!==!0&&(n.enable(G),d[G]=!0)}function be(G){d[G]!==!1&&(n.disable(G),d[G]=!1)}function le(G,pe){return f[G]!==pe?(n.bindFramebuffer(G,pe),f[G]=pe,a&&(G===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=pe),G===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=pe)),!0):!1}function I(G,pe){let q=v,ye=!1;if(G){q=g.get(pe),q===void 0&&(q=[],g.set(pe,q));const _e=G.textures;if(q.length!==_e.length||q[0]!==n.COLOR_ATTACHMENT0){for(let Le=0,Be=_e.length;Le<Be;Le++)q[Le]=n.COLOR_ATTACHMENT0+Le;q.length=_e.length,ye=!0}}else q[0]!==n.BACK&&(q[0]=n.BACK,ye=!0);if(ye)if(t.isWebGL2)n.drawBuffers(q);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(q);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function Ne(G){return p!==G?(n.useProgram(G),p=G,!0):!1}const xe={100:n.FUNC_ADD,101:n.FUNC_SUBTRACT,102:n.FUNC_REVERSE_SUBTRACT};if(a)xe[103]=n.MIN,xe[104]=n.MAX;else{const G=e.get("EXT_blend_minmax");G!==null&&(xe[103]=G.MIN_EXT,xe[104]=G.MAX_EXT)}const ve={200:n.ZERO,201:n.ONE,202:n.SRC_COLOR,204:n.SRC_ALPHA,210:n.SRC_ALPHA_SATURATE,208:n.DST_COLOR,206:n.DST_ALPHA,203:n.ONE_MINUS_SRC_COLOR,205:n.ONE_MINUS_SRC_ALPHA,209:n.ONE_MINUS_DST_COLOR,207:n.ONE_MINUS_DST_ALPHA,211:n.CONSTANT_COLOR,212:n.ONE_MINUS_CONSTANT_COLOR,213:n.CONSTANT_ALPHA,214:n.ONE_MINUS_CONSTANT_ALPHA};function fe(G,pe,q,ye,_e,Le,Be,Qe,et,He){if(G===0){m===!0&&(be(n.BLEND),m=!1);return}if(m===!1&&(se(n.BLEND),m=!0),G!==5){if(G!==T||He!==E){if((_!==100||A!==100)&&(n.blendEquation(n.FUNC_ADD),_=100,A=100),He)switch(G){case 1:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.ONE,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case 1:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}S=null,R=null,M=null,L=null,H.set(0,0,0),x=0,T=G,E=He}return}_e=_e||pe,Le=Le||q,Be=Be||ye,(pe!==_||_e!==A)&&(n.blendEquationSeparate(xe[pe],xe[_e]),_=pe,A=_e),(q!==S||ye!==R||Le!==M||Be!==L)&&(n.blendFuncSeparate(ve[q],ve[ye],ve[Le],ve[Be]),S=q,R=ye,M=Le,L=Be),(Qe.equals(H)===!1||et!==x)&&(n.blendColor(Qe.r,Qe.g,Qe.b,et),H.copy(Qe),x=et),T=G,E=!1}function Ae(G,pe){G.side===2?be(n.CULL_FACE):se(n.CULL_FACE);let q=G.side===1;pe&&(q=!q),oe(q),G.blending===1&&G.transparent===!1?fe(0):fe(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),l.setFunc(G.depthFunc),l.setTest(G.depthTest),l.setMask(G.depthWrite),s.setMask(G.colorWrite);const ye=G.stencilWrite;c.setTest(ye),ye&&(c.setMask(G.stencilWriteMask),c.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),c.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),b(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function oe(G){U!==G&&(G?n.frontFace(n.CW):n.frontFace(n.CCW),U=G)}function Se(G){G!==0?(se(n.CULL_FACE),G!==B&&(G===1?n.cullFace(n.BACK):G===2?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),B=G}function Me(G){G!==C&&(K&&n.lineWidth(G),C=G)}function b(G,pe,q){G?(se(n.POLYGON_OFFSET_FILL),(V!==pe||z!==q)&&(n.polygonOffset(pe,q),V=pe,z=q)):be(n.POLYGON_OFFSET_FILL)}function y(G){G?se(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function k(G){G===void 0&&(G=n.TEXTURE0+j-1),P!==G&&(n.activeTexture(G),P=G)}function Y(G,pe,q){q===void 0&&(P===null?q=n.TEXTURE0+j-1:q=P);let ye=N[q];ye===void 0&&(ye={type:void 0,texture:void 0},N[q]=ye),(ye.type!==G||ye.texture!==pe)&&(P!==q&&(n.activeTexture(q),P=q),n.bindTexture(G,pe||te[G]),ye.type=G,ye.texture=pe)}function ie(){const G=N[P];G!==void 0&&G.type!==void 0&&(n.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function $(){try{n.compressedTexImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Pe(){try{n.compressedTexImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function de(){try{n.texSubImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ce(){try{n.texSubImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Oe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ue(){try{n.texStorage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Je(){try{n.texStorage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ee(){try{n.texImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Te(){try{n.texImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ue(G){F.equals(G)===!1&&(n.scissor(G.x,G.y,G.z,G.w),F.copy(G))}function Ce(G){J.equals(G)===!1&&(n.viewport(G.x,G.y,G.z,G.w),J.copy(G))}function Ge(G,pe){let q=h.get(pe);q===void 0&&(q=new WeakMap,h.set(pe,q));let ye=q.get(G);ye===void 0&&(ye=n.getUniformBlockIndex(pe,G.name),q.set(G,ye))}function we(G,pe){const q=h.get(pe).get(G);u.get(pe)!==q&&(n.uniformBlockBinding(pe,q,G.__bindingPointIndex),u.set(pe,q))}function Fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),a===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},P=null,N={},f={},g=new WeakMap,v=[],p=null,m=!1,T=null,_=null,S=null,R=null,A=null,M=null,L=null,H=new he(0,0,0),x=0,E=!1,U=null,B=null,C=null,V=null,z=null,F.set(0,0,n.canvas.width,n.canvas.height),J.set(0,0,n.canvas.width,n.canvas.height),s.reset(),l.reset(),c.reset()}return{buffers:{color:s,depth:l,stencil:c},enable:se,disable:be,bindFramebuffer:le,drawBuffers:I,useProgram:Ne,setBlending:fe,setMaterial:Ae,setFlipSided:oe,setCullFace:Se,setLineWidth:Me,setPolygonOffset:b,setScissorTest:y,activeTexture:k,bindTexture:Y,unbindTexture:ie,compressedTexImage2D:$,compressedTexImage3D:Pe,texImage2D:Ee,texImage3D:Te,updateUBOMapping:Ge,uniformBlockBinding:we,texStorage2D:ue,texStorage3D:Je,texSubImage2D:de,texSubImage3D:ce,compressedTexSubImage2D:me,compressedTexSubImage3D:Oe,scissor:Ue,viewport:Ce,reset:Fe}}function tf(n,e,t,a,r,i,o){const s=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Ie,h=new WeakMap;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,y){return g?new OffscreenCanvas(b,y):Ri("canvas")}function p(b,y,k,Y){let ie=1;const $=Me(b);if(($.width>Y||$.height>Y)&&(ie=Y/Math.max($.width,$.height)),ie<1||y===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Pe=y?Qa:Math.floor,de=Pe(ie*$.width),ce=Pe(ie*$.height);d===void 0&&(d=v(de,ce));const me=k?v(de,ce):d;return me.width=de,me.height=ce,me.getContext("2d").drawImage(b,0,0,de,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+de+"x"+ce+")."),me}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),b;return b}function m(b){const y=Me(b);return as(y.width)&&as(y.height)}function T(b){return s?!1:b.wrapS!==1001||b.wrapT!==1001||b.minFilter!==1003&&b.minFilter!==1006}function _(b,y){return b.generateMipmaps&&y&&b.minFilter!==1003&&b.minFilter!==1006}function S(b){n.generateMipmap(b)}function R(b,y,k,Y,ie=!1){if(s===!1)return y;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let $=y;if(y===n.RED&&(k===n.FLOAT&&($=n.R32F),k===n.HALF_FLOAT&&($=n.R16F),k===n.UNSIGNED_BYTE&&($=n.R8)),y===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&($=n.R8UI),k===n.UNSIGNED_SHORT&&($=n.R16UI),k===n.UNSIGNED_INT&&($=n.R32UI),k===n.BYTE&&($=n.R8I),k===n.SHORT&&($=n.R16I),k===n.INT&&($=n.R32I)),y===n.RG&&(k===n.FLOAT&&($=n.RG32F),k===n.HALF_FLOAT&&($=n.RG16F),k===n.UNSIGNED_BYTE&&($=n.RG8)),y===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&($=n.RG8UI),k===n.UNSIGNED_SHORT&&($=n.RG16UI),k===n.UNSIGNED_INT&&($=n.RG32UI),k===n.BYTE&&($=n.RG8I),k===n.SHORT&&($=n.RG16I),k===n.INT&&($=n.RG32I)),y===n.RGBA){const Pe=ie?ra:rt.getTransfer(Y);k===n.FLOAT&&($=n.RGBA32F),k===n.HALF_FLOAT&&($=n.RGBA16F),k===n.UNSIGNED_BYTE&&($=Pe===nt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&($=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&($=n.RGB5_A1)}return($===n.R16F||$===n.R32F||$===n.RG16F||$===n.RG32F||$===n.RGBA16F||$===n.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function A(b,y,k){return _(b,k)===!0||b.isFramebufferTexture&&b.minFilter!==1003&&b.minFilter!==1006?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function M(b){return b===1003||b===1004||b===1005?n.NEAREST:n.LINEAR}function L(b){const y=b.target;y.removeEventListener("dispose",L),x(y),y.isVideoTexture&&h.delete(y)}function H(b){const y=b.target;y.removeEventListener("dispose",H),U(y)}function x(b){const y=a.get(b);if(y.__webglInit===void 0)return;const k=b.source,Y=f.get(k);if(Y){const ie=Y[y.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&E(b),Object.keys(Y).length===0&&f.delete(k)}a.remove(b)}function E(b){const y=a.get(b);n.deleteTexture(y.__webglTexture);const k=b.source,Y=f.get(k);delete Y[y.__cacheKey],o.memory.textures--}function U(b){const y=a.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let ie=0;ie<y.__webglFramebuffer[Y].length;ie++)n.deleteFramebuffer(y.__webglFramebuffer[Y][ie]);else n.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)n.deleteFramebuffer(y.__webglFramebuffer[Y]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const k=b.textures;for(let Y=0,ie=k.length;Y<ie;Y++){const $=a.get(k[Y]);$.__webglTexture&&(n.deleteTexture($.__webglTexture),o.memory.textures--),a.remove(k[Y])}a.remove(b)}let B=0;function C(){B=0}function V(){const b=B;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),B+=1,b}function z(b){const y=[];return y.push(b.wrapS),y.push(b.wrapT),y.push(b.wrapR||0),y.push(b.magFilter),y.push(b.minFilter),y.push(b.anisotropy),y.push(b.internalFormat),y.push(b.format),y.push(b.type),y.push(b.generateMipmaps),y.push(b.premultiplyAlpha),y.push(b.flipY),y.push(b.unpackAlignment),y.push(b.colorSpace),y.join()}function j(b,y){const k=a.get(b);if(b.isVideoTexture&&oe(b),b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){const Y=b.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(k,b,y);return}}t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+y)}function K(b,y){const k=a.get(b);if(b.version>0&&k.__version!==b.version){J(k,b,y);return}t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+y)}function O(b,y){const k=a.get(b);if(b.version>0&&k.__version!==b.version){J(k,b,y);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+y)}function W(b,y){const k=a.get(b);if(b.version>0&&k.__version!==b.version){Q(k,b,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+y)}const P={1e3:n.REPEAT,1001:n.CLAMP_TO_EDGE,1002:n.MIRRORED_REPEAT},N={1003:n.NEAREST,1004:n.NEAREST_MIPMAP_NEAREST,1005:n.NEAREST_MIPMAP_LINEAR,1006:n.LINEAR,1007:n.LINEAR_MIPMAP_NEAREST,1008:n.LINEAR_MIPMAP_LINEAR},X={512:n.NEVER,519:n.ALWAYS,513:n.LESS,515:n.LEQUAL,514:n.EQUAL,518:n.GEQUAL,516:n.GREATER,517:n.NOTEQUAL};function D(b,y,k){if(y.type===1015&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===1006||y.magFilter===1007||y.magFilter===1005||y.magFilter===1008||y.minFilter===1006||y.minFilter===1007||y.minFilter===1005||y.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),k?(n.texParameteri(b,n.TEXTURE_WRAP_S,P[y.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,P[y.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,P[y.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,N[y.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,N[y.minFilter])):(n.texParameteri(b,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(b,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(y.wrapS!==1001||y.wrapT!==1001)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,n.TEXTURE_MAG_FILTER,M(y.magFilter)),n.texParameteri(b,n.TEXTURE_MIN_FILTER,M(y.minFilter)),y.minFilter!==1003&&y.minFilter!==1006&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,X[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===1003||y.minFilter!==1005&&y.minFilter!==1008||y.type===1015&&e.has("OES_texture_float_linear")===!1||s===!1&&y.type===1016&&e.has("OES_texture_half_float_linear")===!1)return;if(y.anisotropy>1||a.get(y).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),a.get(y).__currentAnisotropy=y.anisotropy}}}function F(b,y){let k=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",L));const Y=y.source;let ie=f.get(Y);ie===void 0&&(ie={},f.set(Y,ie));const $=z(y);if($!==b.__cacheKey){ie[$]===void 0&&(ie[$]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ie[$].usedTimes++;const Pe=ie[b.__cacheKey];Pe!==void 0&&(ie[b.__cacheKey].usedTimes--,Pe.usedTimes===0&&E(y)),b.__cacheKey=$,b.__webglTexture=ie[$].texture}return k}function J(b,y,k){let Y=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=n.TEXTURE_3D);const ie=F(b,y),$=y.source;t.bindTexture(Y,b.__webglTexture,n.TEXTURE0+k);const Pe=a.get($);if($.version!==Pe.__version||ie===!0){t.activeTexture(n.TEXTURE0+k);const de=rt.getPrimaries(rt.workingColorSpace),ce=y.colorSpace===""?null:rt.getPrimaries(y.colorSpace),me=y.colorSpace===""||de===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Oe=T(y)&&m(y.image)===!1;let ue=p(y.image,Oe,!1,r.maxTextureSize);ue=Se(y,ue);const Je=m(ue)||s,Ee=i.convert(y.format,y.colorSpace);let Te=i.convert(y.type),Ue=R(y.internalFormat,Ee,Te,y.colorSpace,y.isVideoTexture);D(Y,y,Je);let Ce;const Ge=y.mipmaps,we=s&&y.isVideoTexture!==!0&&Ue!==36196,Fe=Pe.__version===void 0||ie===!0,G=$.dataReady,pe=A(y,ue,Je);if(y.isDepthTexture)Ue=n.DEPTH_COMPONENT,s?y.type===1015?Ue=n.DEPTH_COMPONENT32F:y.type===1014?Ue=n.DEPTH_COMPONENT24:y.type===1020?Ue=n.DEPTH24_STENCIL8:Ue=n.DEPTH_COMPONENT16:y.type===1015&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===1026&&Ue===n.DEPTH_COMPONENT&&y.type!==1012&&y.type!==1014&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=1014,Te=i.convert(y.type)),y.format===1027&&Ue===n.DEPTH_COMPONENT&&(Ue=n.DEPTH_STENCIL,y.type!==1020&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=1020,Te=i.convert(y.type))),Fe&&(we?t.texStorage2D(n.TEXTURE_2D,1,Ue,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Ue,ue.width,ue.height,0,Ee,Te,null));else if(y.isDataTexture)if(Ge.length>0&&Je){we&&Fe&&t.texStorage2D(n.TEXTURE_2D,pe,Ue,Ge[0].width,Ge[0].height);for(let q=0,ye=Ge.length;q<ye;q++)Ce=Ge[q],we?G&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,Ce.width,Ce.height,Ee,Te,Ce.data):t.texImage2D(n.TEXTURE_2D,q,Ue,Ce.width,Ce.height,0,Ee,Te,Ce.data);y.generateMipmaps=!1}else we?(Fe&&t.texStorage2D(n.TEXTURE_2D,pe,Ue,ue.width,ue.height),G&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue.width,ue.height,Ee,Te,ue.data)):t.texImage2D(n.TEXTURE_2D,0,Ue,ue.width,ue.height,0,Ee,Te,ue.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){we&&Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,Ue,Ge[0].width,Ge[0].height,ue.depth);for(let q=0,ye=Ge.length;q<ye;q++)Ce=Ge[q],y.format!==1023?Ee!==null?we?G&&t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,Ce.width,Ce.height,ue.depth,Ee,Ce.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,q,Ue,Ce.width,Ce.height,ue.depth,0,Ce.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):we?G&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,q,0,0,0,Ce.width,Ce.height,ue.depth,Ee,Te,Ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,q,Ue,Ce.width,Ce.height,ue.depth,0,Ee,Te,Ce.data)}else{we&&Fe&&t.texStorage2D(n.TEXTURE_2D,pe,Ue,Ge[0].width,Ge[0].height);for(let q=0,ye=Ge.length;q<ye;q++)Ce=Ge[q],y.format!==1023?Ee!==null?we?G&&t.compressedTexSubImage2D(n.TEXTURE_2D,q,0,0,Ce.width,Ce.height,Ee,Ce.data):t.compressedTexImage2D(n.TEXTURE_2D,q,Ue,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):we?G&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,Ce.width,Ce.height,Ee,Te,Ce.data):t.texImage2D(n.TEXTURE_2D,q,Ue,Ce.width,Ce.height,0,Ee,Te,Ce.data)}else if(y.isDataArrayTexture)we?(Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,Ue,ue.width,ue.height,ue.depth),G&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Ee,Te,ue.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,ue.width,ue.height,ue.depth,0,Ee,Te,ue.data);else if(y.isData3DTexture)we?(Fe&&t.texStorage3D(n.TEXTURE_3D,pe,Ue,ue.width,ue.height,ue.depth),G&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Ee,Te,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,ue.width,ue.height,ue.depth,0,Ee,Te,ue.data);else if(y.isFramebufferTexture){if(Fe)if(we)t.texStorage2D(n.TEXTURE_2D,pe,Ue,ue.width,ue.height);else{let q=ue.width,ye=ue.height;for(let _e=0;_e<pe;_e++)t.texImage2D(n.TEXTURE_2D,_e,Ue,q,ye,0,Ee,Te,null),q>>=1,ye>>=1}}else if(Ge.length>0&&Je){if(we&&Fe){const q=Me(Ge[0]);t.texStorage2D(n.TEXTURE_2D,pe,Ue,q.width,q.height)}for(let q=0,ye=Ge.length;q<ye;q++)Ce=Ge[q],we?G&&t.texSubImage2D(n.TEXTURE_2D,q,0,0,Ee,Te,Ce):t.texImage2D(n.TEXTURE_2D,q,Ue,Ee,Te,Ce);y.generateMipmaps=!1}else if(we){if(Fe){const q=Me(ue);t.texStorage2D(n.TEXTURE_2D,pe,Ue,q.width,q.height)}G&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ee,Te,ue)}else t.texImage2D(n.TEXTURE_2D,0,Ue,Ee,Te,ue);_(y,Je)&&S(Y),Pe.__version=$.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function Q(b,y,k){if(y.image.length!==6)return;const Y=F(b,y),ie=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+k);const $=a.get(ie);if(ie.version!==$.__version||Y===!0){t.activeTexture(n.TEXTURE0+k);const Pe=rt.getPrimaries(rt.workingColorSpace),de=y.colorSpace===""?null:rt.getPrimaries(y.colorSpace),ce=y.colorSpace===""||Pe===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const me=y.isCompressedTexture||y.image[0].isCompressedTexture,Oe=y.image[0]&&y.image[0].isDataTexture,ue=[];for(let q=0;q<6;q++)!me&&!Oe?ue[q]=p(y.image[q],!1,!0,r.maxCubemapSize):ue[q]=Oe?y.image[q].image:y.image[q],ue[q]=Se(y,ue[q]);const Je=ue[0],Ee=m(Je)||s,Te=i.convert(y.format,y.colorSpace),Ue=i.convert(y.type),Ce=R(y.internalFormat,Te,Ue,y.colorSpace),Ge=s&&y.isVideoTexture!==!0,we=$.__version===void 0||Y===!0,Fe=ie.dataReady;let G=A(y,Je,Ee);D(n.TEXTURE_CUBE_MAP,y,Ee);let pe;if(me){Ge&&we&&t.texStorage2D(n.TEXTURE_CUBE_MAP,G,Ce,Je.width,Je.height);for(let q=0;q<6;q++){pe=ue[q].mipmaps;for(let ye=0;ye<pe.length;ye++){const _e=pe[ye];y.format!==1023?Te!==null?Ge?Fe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye,0,0,_e.width,_e.height,Te,_e.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye,Ce,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye,0,0,_e.width,_e.height,Te,Ue,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye,Ce,_e.width,_e.height,0,Te,Ue,_e.data)}}}else{if(pe=y.mipmaps,Ge&&we){pe.length>0&&G++;const q=Me(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,G,Ce,q.width,q.height)}for(let q=0;q<6;q++)if(Oe){Ge?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ue[q].width,ue[q].height,Te,Ue,ue[q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ce,ue[q].width,ue[q].height,0,Te,Ue,ue[q].data);for(let ye=0;ye<pe.length;ye++){const _e=pe[ye].image[q].image;Ge?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye+1,0,0,_e.width,_e.height,Te,Ue,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye+1,Ce,_e.width,_e.height,0,Te,Ue,_e.data)}}else{Ge?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Te,Ue,ue[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ce,Te,Ue,ue[q]);for(let ye=0;ye<pe.length;ye++){const _e=pe[ye];Ge?Fe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye+1,0,0,Te,Ue,_e.image[q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+q,ye+1,Ce,Te,Ue,_e.image[q])}}}_(y,Ee)&&S(n.TEXTURE_CUBE_MAP),$.__version=ie.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function te(b,y,k,Y,ie,$){const Pe=i.convert(k.format,k.colorSpace),de=i.convert(k.type),ce=R(k.internalFormat,Pe,de,k.colorSpace);if(!a.get(y).__hasExternalTextures){const me=Math.max(1,y.width>>$),Oe=Math.max(1,y.height>>$);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,$,ce,me,Oe,y.depth,0,Pe,de,null):t.texImage2D(ie,$,ce,me,Oe,0,Pe,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Ae(y)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,ie,a.get(k).__webglTexture,0,fe(y)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,ie,a.get(k).__webglTexture,$),t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(b,y,k){if(n.bindRenderbuffer(n.RENDERBUFFER,b),y.depthBuffer&&!y.stencilBuffer){let Y=s===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(k||Ae(y)){const ie=y.depthTexture;ie&&ie.isDepthTexture&&(ie.type===1015?Y=n.DEPTH_COMPONENT32F:ie.type===1014&&(Y=n.DEPTH_COMPONENT24));const $=fe(y);Ae(y)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$,Y,y.width,y.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,$,Y,y.width,y.height)}else n.renderbufferStorage(n.RENDERBUFFER,Y,y.width,y.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,b)}else if(y.depthBuffer&&y.stencilBuffer){const Y=fe(y);k&&Ae(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Y,n.DEPTH24_STENCIL8,y.width,y.height):Ae(y)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Y,n.DEPTH24_STENCIL8,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b)}else{const Y=y.textures;for(let ie=0;ie<Y.length;ie++){const $=Y[ie],Pe=i.convert($.format,$.colorSpace),de=i.convert($.type),ce=R($.internalFormat,Pe,de,$.colorSpace),me=fe(y);k&&Ae(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,me,ce,y.width,y.height):Ae(y)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me,ce,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ce,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function be(b,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!a.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),j(y.depthTexture,0);const k=a.get(y.depthTexture).__webglTexture,Y=fe(y);if(y.depthTexture.format===1026)Ae(y)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,k,0);else if(y.depthTexture.format===1027)Ae(y)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,k,0);else throw new Error("Unknown depthTexture format")}function le(b){const y=a.get(b),k=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");be(y.__webglFramebuffer,b)}else if(k){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]=n.createRenderbuffer(),se(y.__webglDepthbuffer[Y],b,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=n.createRenderbuffer(),se(y.__webglDepthbuffer,b,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function I(b,y,k){const Y=a.get(b);y!==void 0&&te(Y.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&le(b)}function Ne(b){const y=b.texture,k=a.get(b),Y=a.get(y);b.addEventListener("dispose",H);const ie=b.textures,$=b.isWebGLCubeRenderTarget===!0,Pe=ie.length>1,de=m(b)||s;if(Pe||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=y.version,o.memory.textures++),$){k.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(s&&y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[ce]=[];for(let me=0;me<y.mipmaps.length;me++)k.__webglFramebuffer[ce][me]=n.createFramebuffer()}else k.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(s&&y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let ce=0;ce<y.mipmaps.length;ce++)k.__webglFramebuffer[ce]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(Pe)if(r.drawBuffers)for(let ce=0,me=ie.length;ce<me;ce++){const Oe=a.get(ie[ce]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=n.createTexture(),o.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(s&&b.samples>0&&Ae(b)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ce=0;ce<ie.length;ce++){const me=ie[ce];k.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[ce]);const Oe=i.convert(me.format,me.colorSpace),ue=i.convert(me.type),Je=R(me.internalFormat,Oe,ue,me.colorSpace,b.isXRRenderTarget===!0),Ee=fe(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ee,Je,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,k.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),se(k.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),D(n.TEXTURE_CUBE_MAP,y,de);for(let ce=0;ce<6;ce++)if(s&&y.mipmaps&&y.mipmaps.length>0)for(let me=0;me<y.mipmaps.length;me++)te(k.__webglFramebuffer[ce][me],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,me);else te(k.__webglFramebuffer[ce],b,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);_(y,de)&&S(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let ce=0,me=ie.length;ce<me;ce++){const Oe=ie[ce],ue=a.get(Oe);t.bindTexture(n.TEXTURE_2D,ue.__webglTexture),D(n.TEXTURE_2D,Oe,de),te(k.__webglFramebuffer,b,Oe,n.COLOR_ATTACHMENT0+ce,n.TEXTURE_2D,0),_(Oe,de)&&S(n.TEXTURE_2D)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(s?ce=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,Y.__webglTexture),D(ce,y,de),s&&y.mipmaps&&y.mipmaps.length>0)for(let me=0;me<y.mipmaps.length;me++)te(k.__webglFramebuffer[me],b,y,n.COLOR_ATTACHMENT0,ce,me);else te(k.__webglFramebuffer,b,y,n.COLOR_ATTACHMENT0,ce,0);_(y,de)&&S(ce),t.unbindTexture()}b.depthBuffer&&le(b)}function xe(b){const y=m(b)||s,k=b.textures;for(let Y=0,ie=k.length;Y<ie;Y++){const $=k[Y];if(_($,y)){const Pe=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,de=a.get($).__webglTexture;t.bindTexture(Pe,de),S(Pe),t.unbindTexture()}}}function ve(b){if(s&&b.samples>0&&Ae(b)===!1){const y=b.textures,k=b.width,Y=b.height;let ie=n.COLOR_BUFFER_BIT;const $=[],Pe=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=a.get(b),ce=y.length>1;if(ce)for(let me=0;me<y.length;me++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let me=0;me<y.length;me++){$.push(n.COLOR_ATTACHMENT0+me),b.depthBuffer&&$.push(Pe);const Oe=de.__ignoreDepthValues!==void 0?de.__ignoreDepthValues:!1;if(Oe===!1&&(b.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),ce&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[me]),Oe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Pe]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Pe])),ce){const ue=a.get(y[me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,k,Y,0,0,k,Y,ie,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,$)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let me=0;me<y.length;me++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,de.__webglColorRenderbuffer[me]);const Oe=a.get(y[me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,Oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}}function fe(b){return Math.min(r.maxSamples,b.samples)}function Ae(b){const y=a.get(b);return s&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function oe(b){const y=o.render.frame;h.get(b)!==y&&(h.set(b,y),b.update())}function Se(b,y){const k=b.colorSpace,Y=b.format,ie=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===1035||k!==gr&&k!==""&&(rt.getTransfer(k)===nt?s===!1?e.has("EXT_sRGB")===!0&&Y===1023?(b.format=1035,b.minFilter=1006,b.generateMipmaps=!1):y=cs.sRGBToLinear(y):(Y!==1023||ie!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),y}function Me(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(u.width=b.naturalWidth||b.width,u.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(u.width=b.displayWidth,u.height=b.displayHeight):(u.width=b.width,u.height=b.height),u}this.allocateTextureUnit=V,this.resetTextureUnits=C,this.setTexture2D=j,this.setTexture2DArray=K,this.setTexture3D=O,this.setTextureCube=W,this.rebindTextures=I,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=te,this.useMultisampledRTT=Ae}function rf(n,e,t){const a=t.isWebGL2;function r(i,o=""){let s;const l=rt.getTransfer(o);if(i===1009)return n.UNSIGNED_BYTE;if(i===1017)return n.UNSIGNED_SHORT_4_4_4_4;if(i===1018)return n.UNSIGNED_SHORT_5_5_5_1;if(i===1010)return n.BYTE;if(i===1011)return n.SHORT;if(i===1012)return n.UNSIGNED_SHORT;if(i===1013)return n.INT;if(i===1014)return n.UNSIGNED_INT;if(i===1015)return n.FLOAT;if(i===1016)return a?n.HALF_FLOAT:(s=e.get("OES_texture_half_float"),s!==null?s.HALF_FLOAT_OES:null);if(i===1021)return n.ALPHA;if(i===1023)return n.RGBA;if(i===1024)return n.LUMINANCE;if(i===1025)return n.LUMINANCE_ALPHA;if(i===1026)return n.DEPTH_COMPONENT;if(i===1027)return n.DEPTH_STENCIL;if(i===1035)return s=e.get("EXT_sRGB"),s!==null?s.SRGB_ALPHA_EXT:null;if(i===1028)return n.RED;if(i===1029)return n.RED_INTEGER;if(i===1030)return n.RG;if(i===1031)return n.RG_INTEGER;if(i===1033)return n.RGBA_INTEGER;if(i===33776||i===33777||i===33778||i===33779)if(l===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===33776)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===33777)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===33778)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===33779)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===33776)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===33777)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===33778)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===33779)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===35840||i===35841||i===35842||i===35843)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===35840)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===35841)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===35842)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===35843)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===36196)return s=e.get("WEBGL_compressed_texture_etc1"),s!==null?s.COMPRESSED_RGB_ETC1_WEBGL:null;if(i===37492||i===37496)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===37492)return l===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===37496)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===37808||i===37809||i===37810||i===37811||i===37812||i===37813||i===37814||i===37815||i===37816||i===37817||i===37818||i===37819||i===37820||i===37821)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===37808)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===37809)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===37810)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===37811)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===37812)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===37813)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===37814)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===37815)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===37816)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===37817)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===37818)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===37819)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===37820)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===37821)return l===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===36492||i===36494||i===36495)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===36492)return l===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===36494)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===36495)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===36283||i===36284||i===36285||i===36286)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===36492)return s.COMPRESSED_RED_RGTC1_EXT;if(i===36284)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===36285)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===36286)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===1020?a?n.UNSIGNED_INT_24_8:(s=e.get("WEBGL_depth_texture"),s!==null?s.UNSIGNED_INT_24_8_WEBGL:null):n[i]!==void 0?n[i]:null}return{convert:r}}class af extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ui extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nf={type:"move"};class An{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new re,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new re),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new re,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new re),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const a of e.hand.values())this._getHandJoint(t,a)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,a){let r=null,i=null,o=null;const s=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,a),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,a),i!==null&&(l.matrix.fromArray(i.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,i.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(i.linearVelocity)):l.hasLinearVelocity=!1,i.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(i.angularVelocity)):l.hasAngularVelocity=!1));s!==null&&(r=t.getPose(e.targetRaySpace,a),r===null&&i!==null&&(r=i),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(nf)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=i!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const a=new ui;a.matrixAutoUpdate=!1,a.visible=!1,e.joints[t.jointName]=a,e.add(a)}return e.joints[t.jointName]}}const sf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,of=`
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

}`;class lf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,a){if(this.texture===null){const r=new St,i=e.properties.get(r);i.__webglTexture=t.texture,(t.depthNear!=a.depthNear||t.depthFar!=a.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}render(e,t){if(this.texture!==null){if(this.mesh===null){const a=t.cameras[0].viewport,r=new qe({extensions:{fragDepth:!0},vertexShader:sf,fragmentShader:of,uniforms:{depthColor:{value:this.texture},depthWidth:{value:a.z},depthHeight:{value:a.w}}});this.mesh=new Xe(new $e(20,20),r)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class cf extends Vr{constructor(e,t){super();const a=this;let r=null,i=1,o=null,s="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,g=null;const v=new lf,p=t.getContextAttributes();let m=null,T=null;const _=[],S=[],R=new Ie;let A=null;const M=new Ht;M.layers.enable(1),M.viewport=new vt;const L=new Ht;L.layers.enable(2),L.viewport=new vt;const H=[M,L],x=new af;x.layers.enable(1),x.layers.enable(2);let E=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let F=_[D];return F===void 0&&(F=new An,_[D]=F),F.getTargetRaySpace()},this.getControllerGrip=function(D){let F=_[D];return F===void 0&&(F=new An,_[D]=F),F.getGripSpace()},this.getHand=function(D){let F=_[D];return F===void 0&&(F=new An,_[D]=F),F.getHandSpace()};function B(D){const F=S.indexOf(D.inputSource);if(F===-1)return;const J=_[F];J!==void 0&&(J.update(D.inputSource,D.frame,c||o),J.dispatchEvent({type:D.type,data:D.inputSource}))}function C(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",C),r.removeEventListener("inputsourceschange",V);for(let D=0;D<_.length;D++){const F=S[D];F!==null&&(S[D]=null,_[D].disconnect(F))}E=null,U=null,v.reset(),e.setRenderTarget(m),f=null,d=null,h=null,r=null,T=null,X.stop(),a.isPresenting=!1,e.setPixelRatio(A),e.setSize(R.width,R.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){i=D,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){s=D,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(D){c=D},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(D){if(r=D,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",C),r.addEventListener("inputsourceschange",V),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const F={antialias:r.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,F),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),T=new pt(f.framebufferWidth,f.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let F=null,J=null,Q=null;p.depth&&(Q=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,F=p.stencil?1027:1026,J=p.stencil?1020:1014);const te={colorFormat:t.RGBA8,depthFormat:Q,scaleFactor:i};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(te),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new pt(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new Ws(d.textureWidth,d.textureHeight,J,void 0,void 0,void 0,void 0,void 0,void 0,F),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const se=e.properties.get(T);se.__ignoreDepthValues=d.ignoreDepthValues}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(s),X.setContext(r),X.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function V(D){for(let F=0;F<D.removed.length;F++){const J=D.removed[F],Q=S.indexOf(J);Q>=0&&(S[Q]=null,_[Q].disconnect(J))}for(let F=0;F<D.added.length;F++){const J=D.added[F];let Q=S.indexOf(J);if(Q===-1){for(let se=0;se<_.length;se++)if(se>=S.length){S.push(J),Q=se;break}else if(S[se]===null){S[se]=J,Q=se;break}if(Q===-1)break}const te=_[Q];te&&te.connect(J)}}const z=new re,j=new re;function K(D,F,J){z.setFromMatrixPosition(F.matrixWorld),j.setFromMatrixPosition(J.matrixWorld);const Q=z.distanceTo(j),te=F.projectionMatrix.elements,se=J.projectionMatrix.elements,be=te[14]/(te[10]-1),le=te[14]/(te[10]+1),I=(te[9]+1)/te[5],Ne=(te[9]-1)/te[5],xe=(te[8]-1)/te[0],ve=(se[8]+1)/se[0],fe=be*xe,Ae=be*ve,oe=Q/(-xe+ve),Se=oe*-xe;F.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(Se),D.translateZ(oe),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert();const Me=be+oe,b=le+oe,y=fe-Se,k=Ae+(Q-Se),Y=I*le/b*Me,ie=Ne*le/b*Me;D.projectionMatrix.makePerspective(y,k,Y,ie,Me,b),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}function O(D,F){F===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(F.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(r===null)return;v.texture!==null&&(D.near=v.depthNear,D.far=v.depthFar),x.near=L.near=M.near=D.near,x.far=L.far=M.far=D.far,(E!==x.near||U!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),E=x.near,U=x.far,M.near=E,M.far=U,L.near=E,L.far=U,M.updateProjectionMatrix(),L.updateProjectionMatrix(),D.updateProjectionMatrix());const F=D.parent,J=x.cameras;O(x,F);for(let Q=0;Q<J.length;Q++)O(J[Q],F);J.length===2?K(x,M,L):x.projectionMatrix.copy(M.projectionMatrix),W(D,x,F)};function W(D,F,J){J===null?D.matrix.copy(F.matrixWorld):(D.matrix.copy(J.matrixWorld),D.matrix.invert(),D.matrix.multiply(F.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(F.projectionMatrix),D.projectionMatrixInverse.copy(F.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=Ja*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(D){l=D,d!==null&&(d.fixedFoveation=D),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=D)},this.hasDepthSensing=function(){return v.texture!==null};let P=null;function N(D,F){if(u=F.getViewerPose(c||o),g=F,u!==null){const J=u.views;f!==null&&(e.setRenderTargetFramebuffer(T,f.framebuffer),e.setRenderTarget(T));let Q=!1;J.length!==x.cameras.length&&(x.cameras.length=0,Q=!0);for(let se=0;se<J.length;se++){const be=J[se];let le=null;if(f!==null)le=f.getViewport(be);else{const Ne=h.getViewSubImage(d,be);le=Ne.viewport,se===0&&(e.setRenderTargetTextures(T,Ne.colorTexture,d.ignoreDepthValues?void 0:Ne.depthStencilTexture),e.setRenderTarget(T))}let I=H[se];I===void 0&&(I=new Ht,I.layers.enable(se),I.viewport=new vt,H[se]=I),I.matrix.fromArray(be.transform.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale),I.projectionMatrix.fromArray(be.projectionMatrix),I.projectionMatrixInverse.copy(I.projectionMatrix).invert(),I.viewport.set(le.x,le.y,le.width,le.height),se===0&&(x.matrix.copy(I.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),Q===!0&&x.cameras.push(I)}const te=r.enabledFeatures;if(te&&te.includes("depth-sensing")){const se=h.getDepthInformation(J[0]);se&&se.isValid&&se.texture&&v.init(e,se,r.renderState)}}for(let J=0;J<_.length;J++){const Q=S[J],te=_[J];Q!==null&&te!==void 0&&te.update(Q,F,c||o)}v.render(e,x),P&&P(D,F),F.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:F}),g=null}const X=new Os;X.setAnimationLoop(N),this.setAnimationLoop=function(D){P=D},this.dispose=function(){}}}const Fr=new dr,uf=new lt;function hf(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function a(p,m){m.color.getRGB(p.fogColor.value,Ps(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,T,_,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?i(p,m):m.isMeshToonMaterial?(i(p,m),h(p,m)):m.isMeshPhongMaterial?(i(p,m),u(p,m)):m.isMeshStandardMaterial?(i(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,S)):m.isMeshMatcapMaterial?(i(p,m),g(p,m)):m.isMeshDepthMaterial?i(p,m):m.isMeshDistanceMaterial?(i(p,m),v(p,m)):m.isMeshNormalMaterial?i(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&s(p,m)):m.isPointsMaterial?l(p,m,T,_):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function i(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===1&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===1&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const T=e.get(m),_=T.envMap,S=T.envMapRotation;if(_&&(p.envMap.value=_,Fr.copy(S),Fr.x*=-1,Fr.y*=-1,Fr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Fr.y*=-1,Fr.z*=-1),p.envMapRotation.value.setFromMatrix4(uf.makeRotationFromEuler(Fr)),p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const R=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*R,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function s(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,T,_){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*T,p.scale.value=_*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,T){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===1&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const T=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:r}}function df(n,e,t,a){let r={},i={},o=[];const s=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(T,_){const S=_.program;a.uniformBlockBinding(T,S)}function c(T,_){let S=r[T.id];S===void 0&&(g(T),S=u(T),r[T.id]=S,T.addEventListener("dispose",p));const R=_.program;a.updateUBOMapping(T,R);const A=e.render.frame;i[T.id]!==A&&(d(T),i[T.id]=A)}function u(T){const _=h();T.__bindingPointIndex=_;const S=n.createBuffer(),R=T.__size,A=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,R,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,S),S}function h(){for(let T=0;T<s;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const _=r[T.id],S=T.uniforms,R=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let A=0,M=S.length;A<M;A++){const L=Array.isArray(S[A])?S[A]:[S[A]];for(let H=0,x=L.length;H<x;H++){const E=L[H];if(f(E,A,H,R)===!0){const U=E.__offset,B=Array.isArray(E.value)?E.value:[E.value];let C=0;for(let V=0;V<B.length;V++){const z=B[V],j=v(z);typeof z=="number"||typeof z=="boolean"?(E.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,U+C,E.__data)):z.isMatrix3?(E.__data[0]=z.elements[0],E.__data[1]=z.elements[1],E.__data[2]=z.elements[2],E.__data[3]=0,E.__data[4]=z.elements[3],E.__data[5]=z.elements[4],E.__data[6]=z.elements[5],E.__data[7]=0,E.__data[8]=z.elements[6],E.__data[9]=z.elements[7],E.__data[10]=z.elements[8],E.__data[11]=0):(z.toArray(E.__data,C),C+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,E.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(T,_,S,R){const A=T.value,M=_+"_"+S;if(R[M]===void 0)return typeof A=="number"||typeof A=="boolean"?R[M]=A:R[M]=A.clone(),!0;{const L=R[M];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return R[M]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function g(T){const _=T.uniforms;let S=0;const R=16;for(let M=0,L=_.length;M<L;M++){const H=Array.isArray(_[M])?_[M]:[_[M]];for(let x=0,E=H.length;x<E;x++){const U=H[x],B=Array.isArray(U.value)?U.value:[U.value];for(let C=0,V=B.length;C<V;C++){const z=B[C],j=v(z),K=S%R;K!==0&&R-K<j.boundary&&(S+=R-K),U.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=S,S+=j.storage}}}const A=S%R;return A>0&&(S+=R-A),T.__size=S,T.__cache={},this}function v(T){const _={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(_.boundary=4,_.storage=4):T.isVector2?(_.boundary=8,_.storage=8):T.isVector3||T.isColor?(_.boundary=16,_.storage=12):T.isVector4?(_.boundary=16,_.storage=16):T.isMatrix3?(_.boundary=48,_.storage=48):T.isMatrix4?(_.boundary=64,_.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),_}function p(T){const _=T.target;_.removeEventListener("dispose",p);const S=o.indexOf(_.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(r[_.id]),delete r[_.id],delete i[_.id]}function m(){for(const T in r)n.deleteBuffer(r[T]);o=[],r={},i={}}return{bind:l,update:c,dispose:m}}class po{constructor(e={}){const{canvas:t=il(),context:a=null,depth:r=!0,stencil:i=!0,alpha:o=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;a!==null?d=a.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,p=null;const m=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ir,this._useLegacyLights=!1,this.toneMapping=0,this.toneMappingExposure=1;const _=this;let S=!1,R=0,A=0,M=null,L=-1,H=null;const x=new vt,E=new vt;let U=null;const B=new he(0);let C=0,V=t.width,z=t.height,j=1,K=null,O=null;const W=new vt(0,0,V,z),P=new vt(0,0,V,z);let N=!1;const X=new Fs;let D=!1,F=!1,J=null;const Q=new lt,te=new Ie,se=new re,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function le(){return M===null?j:1}let I=a;function Ne(w,Z){for(let ae=0;ae<w.length;ae++){const ne=w[ae],ee=t.getContext(ne,Z);if(ee!==null)return ee}return null}try{const w={alpha:!0,depth:r,stencil:i,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r162"),t.addEventListener("webglcontextlost",Fe,!1),t.addEventListener("webglcontextrestored",G,!1),t.addEventListener("webglcontextcreationerror",pe,!1),I===null){const Z=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&Z.shift(),I=Ne(Z,w),I===null)throw Ne(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&I instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),I.getShaderPrecisionFormat===void 0&&(I.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let xe,ve,fe,Ae,oe,Se,Me,b,y,k,Y,ie,$,Pe,de,ce,me,Oe,ue,Je,Ee,Te,Ue,Ce;function Ge(){xe=new xh(I),ve=new fh(I,xe,e),xe.init(ve),Te=new rf(I,xe,ve),fe=new ef(I,xe,ve),Ae=new Sh(I),oe=new Hd,Se=new tf(I,xe,fe,oe,ve,Te,Ae),Me=new mh(_),b=new _h(_),y=new Cl(I,ve),Ue=new hh(I,xe,y,ve),k=new yh(I,y,Ae,Ue),Y=new wh(I,k,y,Ae),ue=new Eh(I,ve,Se),ce=new ph(oe),ie=new Gd(_,Me,b,xe,ve,Ue,ce),$=new hf(_,oe),Pe=new Wd,de=new Kd(xe,ve),Oe=new uh(_,Me,b,fe,Y,d,l),me=new Qd(_,Y,ve),Ce=new df(I,Ae,ve,fe),Je=new dh(I,xe,Ae,ve),Ee=new bh(I,xe,Ae,ve),Ae.programs=ie.programs,_.capabilities=ve,_.extensions=xe,_.properties=oe,_.renderLists=Pe,_.shadowMap=me,_.state=fe,_.info=Ae}Ge();const we=new cf(_,I);this.xr=we,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=xe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=xe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(w){w!==void 0&&(j=w,this.setSize(V,z,!1))},this.getSize=function(w){return w.set(V,z)},this.setSize=function(w,Z,ae=!0){if(we.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=w,z=Z,t.width=Math.floor(w*j),t.height=Math.floor(Z*j),ae===!0&&(t.style.width=w+"px",t.style.height=Z+"px"),this.setViewport(0,0,w,Z)},this.getDrawingBufferSize=function(w){return w.set(V*j,z*j).floor()},this.setDrawingBufferSize=function(w,Z,ae){V=w,z=Z,j=ae,t.width=Math.floor(w*ae),t.height=Math.floor(Z*ae),this.setViewport(0,0,w,Z)},this.getCurrentViewport=function(w){return w.copy(x)},this.getViewport=function(w){return w.copy(W)},this.setViewport=function(w,Z,ae,ne){w.isVector4?W.set(w.x,w.y,w.z,w.w):W.set(w,Z,ae,ne),fe.viewport(x.copy(W).multiplyScalar(j).round())},this.getScissor=function(w){return w.copy(P)},this.setScissor=function(w,Z,ae,ne){w.isVector4?P.set(w.x,w.y,w.z,w.w):P.set(w,Z,ae,ne),fe.scissor(E.copy(P).multiplyScalar(j).round())},this.getScissorTest=function(){return N},this.setScissorTest=function(w){fe.setScissorTest(N=w)},this.setOpaqueSort=function(w){K=w},this.setTransparentSort=function(w){O=w},this.getClearColor=function(w){return w.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor.apply(Oe,arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha.apply(Oe,arguments)},this.clear=function(w=!0,Z=!0,ae=!0){let ne=0;if(w){let ee=!1;if(M!==null){const Re=M.texture.format;ee=Re===1033||Re===1031||Re===1029}if(ee){const Re=M.texture.type,ze=Re===1009||Re===1014||Re===1012||Re===1020||Re===1017||Re===1018,ke=Oe.getClearColor(),ge=Oe.getClearAlpha(),je=ke.r,Ye=ke.g,Ve=ke.b;ze?(f[0]=je,f[1]=Ye,f[2]=Ve,f[3]=ge,I.clearBufferuiv(I.COLOR,0,f)):(g[0]=je,g[1]=Ye,g[2]=Ve,g[3]=ge,I.clearBufferiv(I.COLOR,0,g))}else ne|=I.COLOR_BUFFER_BIT}Z&&(ne|=I.DEPTH_BUFFER_BIT),ae&&(ne|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",G,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),Pe.dispose(),de.dispose(),oe.dispose(),Me.dispose(),b.dispose(),Y.dispose(),Ue.dispose(),Ce.dispose(),ie.dispose(),we.dispose(),we.removeEventListener("sessionstart",et),we.removeEventListener("sessionend",He),J&&(J.dispose(),J=null),at.stop()};function Fe(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function G(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=Ae.autoReset,Z=me.enabled,ae=me.autoUpdate,ne=me.needsUpdate,ee=me.type;Ge(),Ae.autoReset=w,me.enabled=Z,me.autoUpdate=ae,me.needsUpdate=ne,me.type=ee}function pe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function q(w){const Z=w.target;Z.removeEventListener("dispose",q),ye(Z)}function ye(w){_e(w),oe.remove(w)}function _e(w){const Z=oe.get(w).programs;Z!==void 0&&(Z.forEach(function(ae){ie.releaseProgram(ae)}),w.isShaderMaterial&&ie.releaseShaderCache(w))}this.renderBufferDirect=function(w,Z,ae,ne,ee,Re){Z===null&&(Z=be);const ze=ee.isMesh&&ee.matrixWorld.determinant()<0,ke=Yi(w,Z,ae,ne,ee);fe.setMaterial(ne,ze);let ge=ae.index,je=1;if(ne.wireframe===!0){if(ge=k.getWireframeAttribute(ae),ge===void 0)return;je=2}const Ye=ae.drawRange,Ve=ae.attributes.position;let ht=Ye.start*je,ut=(Ye.start+Ye.count)*je;Re!==null&&(ht=Math.max(ht,Re.start*je),ut=Math.min(ut,(Re.start+Re.count)*je)),ge!==null?(ht=Math.max(ht,0),ut=Math.min(ut,ge.count)):Ve!=null&&(ht=Math.max(ht,0),ut=Math.min(ut,Ve.count));const Mt=ut-ht;if(Mt<0||Mt===1/0)return;Ue.setup(ee,ne,ke,ae,ge);let Pt,it=Je;if(ge!==null&&(Pt=y.get(ge),it=Ee,it.setIndex(Pt)),ee.isMesh)ne.wireframe===!0?(fe.setLineWidth(ne.wireframeLinewidth*le()),it.setMode(I.LINES)):it.setMode(I.TRIANGLES);else if(ee.isLine){let We=ne.linewidth;We===void 0&&(We=1),fe.setLineWidth(We*le()),ee.isLineSegments?it.setMode(I.LINES):ee.isLineLoop?it.setMode(I.LINE_LOOP):it.setMode(I.LINE_STRIP)}else ee.isPoints?it.setMode(I.POINTS):ee.isSprite&&it.setMode(I.TRIANGLES);if(ee.isBatchedMesh)it.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else if(ee.isInstancedMesh)it.renderInstances(ht,Mt,ee.count);else if(ae.isInstancedBufferGeometry){const We=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,fr=Math.min(ae.instanceCount,We);it.renderInstances(ht,Mt,fr)}else it.render(ht,Mt)};function Le(w,Z,ae){w.transparent===!0&&w.side===2&&w.forceSinglePass===!1?(w.side=1,w.needsUpdate=!0,xt(w,Z,ae),w.side=0,w.needsUpdate=!0,xt(w,Z,ae),w.side=2):xt(w,Z,ae)}this.compile=function(w,Z,ae=null){ae===null&&(ae=w),p=de.get(ae),p.init(),T.push(p),ae.traverseVisible(function(ee){ee.isLight&&ee.layers.test(Z.layers)&&(p.pushLight(ee),ee.castShadow&&p.pushShadow(ee))}),w!==ae&&w.traverseVisible(function(ee){ee.isLight&&ee.layers.test(Z.layers)&&(p.pushLight(ee),ee.castShadow&&p.pushShadow(ee))}),p.setupLights(_._useLegacyLights);const ne=new Set;return w.traverse(function(ee){const Re=ee.material;if(Re)if(Array.isArray(Re))for(let ze=0;ze<Re.length;ze++){const ke=Re[ze];Le(ke,ae,ee),ne.add(ke)}else Le(Re,ae,ee),ne.add(Re)}),T.pop(),p=null,ne},this.compileAsync=function(w,Z,ae=null){const ne=this.compile(w,Z,ae);return new Promise(ee=>{function Re(){if(ne.forEach(function(ze){oe.get(ze).currentProgram.isReady()&&ne.delete(ze)}),ne.size===0){ee(w);return}setTimeout(Re,10)}xe.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Be=null;function Qe(w){Be&&Be(w)}function et(){at.stop()}function He(){at.start()}const at=new Os;at.setAnimationLoop(Qe),typeof self<"u"&&at.setContext(self),this.setAnimationLoop=function(w){Be=w,we.setAnimationLoop(w),w===null?at.stop():at.start()},we.addEventListener("sessionstart",et),we.addEventListener("sessionend",He),this.render=function(w,Z){if(Z!==void 0&&Z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),we.enabled===!0&&we.isPresenting===!0&&(we.cameraAutoUpdate===!0&&we.updateCamera(Z),Z=we.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,Z,M),p=de.get(w,T.length),p.init(),T.push(p),Q.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),X.setFromProjectionMatrix(Q),F=this.localClippingEnabled,D=ce.init(this.clippingPlanes,F),v=Pe.get(w,m.length),v.init(),m.push(v),_t(w,Z,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(K,O),this.info.render.frame++,D===!0&&ce.beginShadows();const ae=p.state.shadowsArray;if(me.render(ae,w,Z),D===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset(),(we.enabled===!1||we.isPresenting===!1||we.hasDepthSensing()===!1)&&Oe.render(v,w),p.setupLights(_._useLegacyLights),Z.isArrayCamera){const ne=Z.cameras;for(let ee=0,Re=ne.length;ee<Re;ee++){const ze=ne[ee];Vt(v,w,ze,ze.viewport)}}else Vt(v,w,Z);M!==null&&(Se.updateMultisampleRenderTarget(M),Se.updateRenderTargetMipmap(M)),w.isScene===!0&&w.onAfterRender(_,w,Z),Ue.resetDefaultState(),L=-1,H=null,T.pop(),T.length>0?p=T[T.length-1]:p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function _t(w,Z,ae,ne){if(w.visible===!1)return;if(w.layers.test(Z.layers)){if(w.isGroup)ae=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(Z);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){ne&&se.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Q);const Re=Y.update(w),ze=w.material;ze.visible&&v.push(w,Re,ze,ae,se.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){const Re=Y.update(w),ze=w.material;if(ne&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),se.copy(w.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),se.copy(Re.boundingSphere.center)),se.applyMatrix4(w.matrixWorld).applyMatrix4(Q)),Array.isArray(ze)){const ke=Re.groups;for(let ge=0,je=ke.length;ge<je;ge++){const Ye=ke[ge],Ve=ze[Ye.materialIndex];Ve&&Ve.visible&&v.push(w,Re,Ve,ae,se.z,Ye)}}else ze.visible&&v.push(w,Re,ze,ae,se.z,null)}}const ee=w.children;for(let Re=0,ze=ee.length;Re<ze;Re++)_t(ee[Re],Z,ae,ne)}function Vt(w,Z,ae,ne){const ee=w.opaque,Re=w.transmissive,ze=w.transparent;p.setupLightsView(ae),D===!0&&ce.setGlobalState(_.clippingPlanes,ae),Re.length>0&&jt(ee,Re,Z,ae),ne&&fe.viewport(x.copy(ne)),ee.length>0&&Ot(ee,Z,ae),Re.length>0&&Ot(Re,Z,ae),ze.length>0&&Ot(ze,Z,ae),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function jt(w,Z,ae,ne){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;const ee=ve.isWebGL2;J===null&&(J=new pt(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?1016:1009,minFilter:1008,samples:ee?4:0})),_.getDrawingBufferSize(te),ee?J.setSize(te.x,te.y):J.setSize(Qa(te.x),Qa(te.y));const Re=_.getRenderTarget();_.setRenderTarget(J),_.getClearColor(B),C=_.getClearAlpha(),C<1&&_.setClearColor(16777215,.5),_.clear();const ze=_.toneMapping;_.toneMapping=0,Ot(w,ae,ne),Se.updateMultisampleRenderTarget(J),Se.updateRenderTargetMipmap(J);let ke=!1;for(let ge=0,je=Z.length;ge<je;ge++){const Ye=Z[ge],Ve=Ye.object,ht=Ye.geometry,ut=Ye.material,Mt=Ye.group;if(ut.side===2&&Ve.layers.test(ne.layers)){const Pt=ut.side;ut.side=1,ut.needsUpdate=!0,rr(Ve,ae,ne,ht,ut,Mt),ut.side=Pt,ut.needsUpdate=!0,ke=!0}}ke===!0&&(Se.updateMultisampleRenderTarget(J),Se.updateRenderTargetMipmap(J)),_.setRenderTarget(Re),_.setClearColor(B,C),_.toneMapping=ze}function Ot(w,Z,ae){const ne=Z.isScene===!0?Z.overrideMaterial:null;for(let ee=0,Re=w.length;ee<Re;ee++){const ze=w[ee],ke=ze.object,ge=ze.geometry,je=ne===null?ze.material:ne,Ye=ze.group;ke.layers.test(ae.layers)&&rr(ke,Z,ae,ge,je,Ye)}}function rr(w,Z,ae,ne,ee,Re){w.onBeforeRender(_,Z,ae,ne,ee,Re),w.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),ee.onBeforeRender(_,Z,ae,ne,w,Re),ee.transparent===!0&&ee.side===2&&ee.forceSinglePass===!1?(ee.side=1,ee.needsUpdate=!0,_.renderBufferDirect(ae,Z,ne,ee,w,Re),ee.side=0,ee.needsUpdate=!0,_.renderBufferDirect(ae,Z,ne,ee,w,Re),ee.side=2):_.renderBufferDirect(ae,Z,ne,ee,w,Re),w.onAfterRender(_,Z,ae,ne,ee,Re)}function xt(w,Z,ae){Z.isScene!==!0&&(Z=be);const ne=oe.get(w),ee=p.state.lights,Re=p.state.shadowsArray,ze=ee.state.version,ke=ie.getParameters(w,ee.state,Re,Z,ae),ge=ie.getProgramCacheKey(ke);let je=ne.programs;ne.environment=w.isMeshStandardMaterial?Z.environment:null,ne.fog=Z.fog,ne.envMap=(w.isMeshStandardMaterial?b:Me).get(w.envMap||ne.environment),ne.envMapRotation=ne.environment!==null&&w.envMap===null?Z.environmentRotation:w.envMapRotation,je===void 0&&(w.addEventListener("dispose",q),je=new Map,ne.programs=je);let Ye=je.get(ge);if(Ye!==void 0){if(ne.currentProgram===Ye&&ne.lightsStateVersion===ze)return Br(w,ke),Ye}else ke.uniforms=ie.getUniforms(w),w.onBuild(ae,ke,_),w.onBeforeCompile(ke,_),Ye=ie.acquireProgram(ke,ge),je.set(ge,Ye),ne.uniforms=ke.uniforms;const Ve=ne.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ve.clippingPlanes=ce.uniform),Br(w,ke),ne.needsLights=Na(w),ne.lightsStateVersion=ze,ne.needsLights&&(Ve.ambientLightColor.value=ee.state.ambient,Ve.lightProbe.value=ee.state.probe,Ve.directionalLights.value=ee.state.directional,Ve.directionalLightShadows.value=ee.state.directionalShadow,Ve.spotLights.value=ee.state.spot,Ve.spotLightShadows.value=ee.state.spotShadow,Ve.rectAreaLights.value=ee.state.rectArea,Ve.ltc_1.value=ee.state.rectAreaLTC1,Ve.ltc_2.value=ee.state.rectAreaLTC2,Ve.pointLights.value=ee.state.point,Ve.pointLightShadows.value=ee.state.pointShadow,Ve.hemisphereLights.value=ee.state.hemi,Ve.directionalShadowMap.value=ee.state.directionalShadowMap,Ve.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,Ve.spotShadowMap.value=ee.state.spotShadowMap,Ve.spotLightMatrix.value=ee.state.spotLightMatrix,Ve.spotLightMap.value=ee.state.spotLightMap,Ve.pointShadowMap.value=ee.state.pointShadowMap,Ve.pointShadowMatrix.value=ee.state.pointShadowMatrix),ne.currentProgram=Ye,ne.uniformsList=null,Ye}function Nt(w){if(w.uniformsList===null){const Z=w.currentProgram.getUniforms();w.uniformsList=wa.seqWithValue(Z.seq,w.uniforms)}return w.uniformsList}function Br(w,Z){const ae=oe.get(w);ae.outputColorSpace=Z.outputColorSpace,ae.batching=Z.batching,ae.instancing=Z.instancing,ae.instancingColor=Z.instancingColor,ae.instancingMorph=Z.instancingMorph,ae.skinning=Z.skinning,ae.morphTargets=Z.morphTargets,ae.morphNormals=Z.morphNormals,ae.morphColors=Z.morphColors,ae.morphTargetsCount=Z.morphTargetsCount,ae.numClippingPlanes=Z.numClippingPlanes,ae.numIntersection=Z.numClipIntersection,ae.vertexAlphas=Z.vertexAlphas,ae.vertexTangents=Z.vertexTangents,ae.toneMapping=Z.toneMapping}function Yi(w,Z,ae,ne,ee){Z.isScene!==!0&&(Z=be),Se.resetTextureUnits();const Re=Z.fog,ze=ne.isMeshStandardMaterial?Z.environment:null,ke=M===null?_.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:gr,ge=(ne.isMeshStandardMaterial?b:Me).get(ne.envMap||ze),je=ne.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,Ye=!!ae.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Ve=!!ae.morphAttributes.position,ht=!!ae.morphAttributes.normal,ut=!!ae.morphAttributes.color;let Mt=0;ne.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Mt=_.toneMapping);const Pt=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,it=Pt!==void 0?Pt.length:0,We=oe.get(ne),fr=p.state.lights;if(D===!0&&(F===!0||w!==H)){const Tt=w===H&&ne.id===L;ce.setState(ne,w,Tt)}let kr=!1;ne.version===We.__version?(We.needsLights&&We.lightsStateVersion!==fr.state.version||We.outputColorSpace!==ke||ee.isBatchedMesh&&We.batching===!1||!ee.isBatchedMesh&&We.batching===!0||ee.isInstancedMesh&&We.instancing===!1||!ee.isInstancedMesh&&We.instancing===!0||ee.isSkinnedMesh&&We.skinning===!1||!ee.isSkinnedMesh&&We.skinning===!0||ee.isInstancedMesh&&We.instancingColor===!0&&ee.instanceColor===null||ee.isInstancedMesh&&We.instancingColor===!1&&ee.instanceColor!==null||ee.isInstancedMesh&&We.instancingMorph===!0&&ee.morphTexture===null||ee.isInstancedMesh&&We.instancingMorph===!1&&ee.morphTexture!==null||We.envMap!==ge||ne.fog===!0&&We.fog!==Re||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==ce.numPlanes||We.numIntersection!==ce.numIntersection)||We.vertexAlphas!==je||We.vertexTangents!==Ye||We.morphTargets!==Ve||We.morphNormals!==ht||We.morphColors!==ut||We.toneMapping!==Mt||ve.isWebGL2===!0&&We.morphTargetsCount!==it)&&(kr=!0):(kr=!0,We.__version=ne.version);let Yt=We.currentProgram;kr===!0&&(Yt=xt(ne,Z,ee));let _i=!1,Zt=!1,Mr=!1;const ct=Yt.getUniforms(),Kt=We.uniforms;if(fe.useProgram(Yt.program)&&(_i=!0,Zt=!0,Mr=!0),ne.id!==L&&(L=ne.id,Zt=!0),_i||H!==w){ct.setValue(I,"projectionMatrix",w.projectionMatrix),ct.setValue(I,"viewMatrix",w.matrixWorldInverse);const Tt=ct.map.cameraPosition;Tt!==void 0&&Tt.setValue(I,se.setFromMatrixPosition(w.matrixWorld)),ve.logarithmicDepthBuffer&&ct.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&ct.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),H!==w&&(H=w,Zt=!0,Mr=!0)}if(ee.isSkinnedMesh){ct.setOptional(I,ee,"bindMatrix"),ct.setOptional(I,ee,"bindMatrixInverse");const Tt=ee.skeleton;Tt&&(ve.floatVertexTextures?(Tt.boneTexture===null&&Tt.computeBoneTexture(),ct.setValue(I,"boneTexture",Tt.boneTexture,Se)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ee.isBatchedMesh&&(ct.setOptional(I,ee,"batchingTexture"),ct.setValue(I,"batchingTexture",ee._matricesTexture,Se));const Tr=ae.morphAttributes;if((Tr.position!==void 0||Tr.normal!==void 0||Tr.color!==void 0&&ve.isWebGL2===!0)&&ue.update(ee,ae,Yt),(Zt||We.receiveShadow!==ee.receiveShadow)&&(We.receiveShadow=ee.receiveShadow,ct.setValue(I,"receiveShadow",ee.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(Kt.envMap.value=ge,Kt.flipEnvMap.value=ge.isCubeTexture&&ge.isRenderTargetTexture===!1?-1:1),Zt&&(ct.setValue(I,"toneMappingExposure",_.toneMappingExposure),We.needsLights&&vi(Kt,Mr),Re&&ne.fog===!0&&$.refreshFogUniforms(Kt,Re),$.refreshMaterialUniforms(Kt,ne,j,z,J),wa.upload(I,Nt(We),Kt,Se)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(wa.upload(I,Nt(We),Kt,Se),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&ct.setValue(I,"center",ee.center),ct.setValue(I,"modelViewMatrix",ee.modelViewMatrix),ct.setValue(I,"normalMatrix",ee.normalMatrix),ct.setValue(I,"modelMatrix",ee.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){const Tt=ne.uniformsGroups;for(let Ut=0,za=Tt.length;Ut<za;Ut++)if(ve.isWebGL2){const Er=Tt[Ut];Ce.update(Er,Yt),Ce.bind(Er,Yt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Yt}function vi(w,Z){w.ambientLightColor.needsUpdate=Z,w.lightProbe.needsUpdate=Z,w.directionalLights.needsUpdate=Z,w.directionalLightShadows.needsUpdate=Z,w.pointLights.needsUpdate=Z,w.pointLightShadows.needsUpdate=Z,w.spotLights.needsUpdate=Z,w.spotLightShadows.needsUpdate=Z,w.rectAreaLights.needsUpdate=Z,w.hemisphereLights.needsUpdate=Z}function Na(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(w,Z,ae){oe.get(w.texture).__webglTexture=Z,oe.get(w.depthTexture).__webglTexture=ae;const ne=oe.get(w);ne.__hasExternalTextures=!0,ne.__autoAllocateDepthBuffer=ae===void 0,ne.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ne.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,Z){const ae=oe.get(w);ae.__webglFramebuffer=Z,ae.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(w,Z=0,ae=0){M=w,R=Z,A=ae;let ne=!0,ee=null,Re=!1,ze=!1;if(w){const ke=oe.get(w);ke.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(I.FRAMEBUFFER,null),ne=!1):ke.__webglFramebuffer===void 0?Se.setupRenderTarget(w):ke.__hasExternalTextures&&Se.rebindTextures(w,oe.get(w.texture).__webglTexture,oe.get(w.depthTexture).__webglTexture);const ge=w.texture;(ge.isData3DTexture||ge.isDataArrayTexture||ge.isCompressedArrayTexture)&&(ze=!0);const je=oe.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(je[Z])?ee=je[Z][ae]:ee=je[Z],Re=!0):ve.isWebGL2&&w.samples>0&&Se.useMultisampledRTT(w)===!1?ee=oe.get(w).__webglMultisampledFramebuffer:Array.isArray(je)?ee=je[ae]:ee=je,x.copy(w.viewport),E.copy(w.scissor),U=w.scissorTest}else x.copy(W).multiplyScalar(j).floor(),E.copy(P).multiplyScalar(j).floor(),U=N;if(fe.bindFramebuffer(I.FRAMEBUFFER,ee)&&ve.drawBuffers&&ne&&fe.drawBuffers(w,ee),fe.viewport(x),fe.scissor(E),fe.setScissorTest(U),Re){const ke=oe.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ke.__webglTexture,ae)}else if(ze){const ke=oe.get(w.texture),ge=Z||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,ke.__webglTexture,ae||0,ge)}L=-1},this.readRenderTargetPixels=function(w,Z,ae,ne,ee,Re,ze){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=oe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ze!==void 0&&(ke=ke[ze]),ke){fe.bindFramebuffer(I.FRAMEBUFFER,ke);try{const ge=w.texture,je=ge.format,Ye=ge.type;if(je!==1023&&Te.convert(je)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=Ye===1016&&(xe.has("EXT_color_buffer_half_float")||ve.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Ye!==1009&&Te.convert(Ye)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ye===1015&&(ve.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=w.width-ne&&ae>=0&&ae<=w.height-ee&&I.readPixels(Z,ae,ne,ee,Te.convert(je),Te.convert(Ye),Re)}finally{const ge=M!==null?oe.get(M).__webglFramebuffer:null;fe.bindFramebuffer(I.FRAMEBUFFER,ge)}}},this.copyFramebufferToTexture=function(w,Z,ae=0){const ne=Math.pow(2,-ae),ee=Math.floor(Z.image.width*ne),Re=Math.floor(Z.image.height*ne);Se.setTexture2D(Z,0),I.copyTexSubImage2D(I.TEXTURE_2D,ae,0,0,w.x,w.y,ee,Re),fe.unbindTexture()},this.copyTextureToTexture=function(w,Z,ae,ne=0){const ee=Z.image.width,Re=Z.image.height,ze=Te.convert(ae.format),ke=Te.convert(ae.type);Se.setTexture2D(ae,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,ae.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ae.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,ae.unpackAlignment),Z.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ne,w.x,w.y,ee,Re,ze,ke,Z.image.data):Z.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ne,w.x,w.y,Z.mipmaps[0].width,Z.mipmaps[0].height,ze,Z.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,ne,w.x,w.y,ze,ke,Z.image),ne===0&&ae.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(w,Z,ae,ne,ee=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Re=Math.round(w.max.x-w.min.x),ze=Math.round(w.max.y-w.min.y),ke=w.max.z-w.min.z+1,ge=Te.convert(ne.format),je=Te.convert(ne.type);let Ye;if(ne.isData3DTexture)Se.setTexture3D(ne,0),Ye=I.TEXTURE_3D;else if(ne.isDataArrayTexture||ne.isCompressedArrayTexture)Se.setTexture2DArray(ne,0),Ye=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,ne.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ne.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,ne.unpackAlignment);const Ve=I.getParameter(I.UNPACK_ROW_LENGTH),ht=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ut=I.getParameter(I.UNPACK_SKIP_PIXELS),Mt=I.getParameter(I.UNPACK_SKIP_ROWS),Pt=I.getParameter(I.UNPACK_SKIP_IMAGES),it=ae.isCompressedTexture?ae.mipmaps[ee]:ae.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,it.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,it.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,w.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,w.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,w.min.z),ae.isDataTexture||ae.isData3DTexture?I.texSubImage3D(Ye,ee,Z.x,Z.y,Z.z,Re,ze,ke,ge,je,it.data):ne.isCompressedArrayTexture?I.compressedTexSubImage3D(Ye,ee,Z.x,Z.y,Z.z,Re,ze,ke,ge,it.data):I.texSubImage3D(Ye,ee,Z.x,Z.y,Z.z,Re,ze,ke,ge,je,it),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ve),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ht),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ut),I.pixelStorei(I.UNPACK_SKIP_ROWS,Mt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Pt),ee===0&&ne.generateMipmaps&&I.generateMipmap(Ye),fe.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?Se.setTextureCube(w,0):w.isData3DTexture?Se.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Se.setTexture2DArray(w,0):Se.setTexture2D(w,0),fe.unbindTexture()},this.resetState=function(){R=0,A=0,M=null,fe.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Za?"display-p3":"srgb",t.unpackColorSpace=rt.workingColorSpace===ta?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class ff extends po{}ff.prototype.isWebGL1Renderer=!0;class Aa extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dr,this.environmentRotation=new dr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class zi extends St{constructor(e=null,t=1,a=1,r,i,o,s,l,c=1003,u=1003,h,d){super(null,o,s,l,c,u,r,i,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:a},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Or extends kt{constructor(e,t,a,r=1){super(e,t,a),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const hi=new lt,mo=new lt,Ca=[],go=new sr,pf=new lt,Bi=new Xe,ki=new Cr;class mf extends Xe{constructor(e,t,a){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Or(new Float32Array(a*16),16),this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<a;r++)this.setMatrixAt(r,pf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new sr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<t;a++)this.getMatrixAt(a,hi),go.copy(e.boundingBox).applyMatrix4(hi),this.boundingBox.union(go)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Cr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<t;a++)this.getMatrixAt(a,hi),ki.copy(e.boundingSphere).applyMatrix4(hi),this.boundingSphere.union(ki)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const a=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=a.length+1,o=e*i+1;for(let s=0;s<a.length;s++)a[s]=r[o+s]}raycast(e,t){const a=this.matrixWorld,r=this.count;if(Bi.geometry=this.geometry,Bi.material=this.material,Bi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ki.copy(this.boundingSphere),ki.applyMatrix4(a),e.ray.intersectsSphere(ki)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,hi),mo.multiplyMatrices(a,hi),Bi.matrixWorld=mo,Bi.raycast(e,Ca);for(let o=0,s=Ca.length;o<s;o++){const l=Ca[o];l.instanceId=i,l.object=this,t.push(l)}Ca.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Or(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const a=t.morphTargetInfluences,r=a.length+1;this.morphTexture===null&&(this.morphTexture=new zi(new Float32Array(r*this.count),r,this.count,1028,1015));const i=this.morphTexture.source.data.data;let o=0;for(let c=0;c<a.length;c++)o+=a[c];const s=this.geometry.morphTargetsRelative?1:1-o,l=r*e;i[l]=s,i.set(a,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class gf extends Ii{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const vo=new lt,Cn=new fs,Ra=new Cr,Pa=new re;class vf extends Ct{constructor(e=new qt,t=new gf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const a=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,o=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Ra.copy(a.boundingSphere),Ra.applyMatrix4(r),Ra.radius+=i,e.ray.intersectsSphere(Ra)===!1)return;vo.copy(r).invert(),Cn.copy(e.ray).applyMatrix4(vo);const s=i/((this.scale.x+this.scale.y+this.scale.z)/3),l=s*s,c=a.index,u=a.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let f=h,g=d;f<g;f++){const v=c.getX(f);Pa.fromBufferAttribute(u,v),_o(Pa,v,l,r,e,t,this)}}else{const h=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let f=h,g=d;f<g;f++)Pa.fromBufferAttribute(u,f),_o(Pa,f,l,r,e,t,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const a=e[t[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,i=a.length;r<i;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function _o(n,e,t,a,r,i,o){const s=Cn.distanceSqToPoint(n);if(s<t){const l=new re;Cn.closestPointToPoint(n,l),l.applyMatrix4(a);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;i.push({distance:c,distanceToRay:Math.sqrt(s),point:l,index:e,face:null,object:o})}}class Gn extends qt{constructor(e=1,t=32,a=16,r=0,i=Math.PI*2,o=0,s=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:a,phiStart:r,phiLength:i,thetaStart:o,thetaLength:s},t=Math.max(3,Math.floor(t)),a=Math.max(2,Math.floor(a));const l=Math.min(o+s,Math.PI);let c=0;const u=[],h=new re,d=new re,f=[],g=[],v=[],p=[];for(let m=0;m<=a;m++){const T=[],_=m/a;let S=0;m===0&&o===0?S=.5/t:m===a&&l===Math.PI&&(S=-.5/t);for(let R=0;R<=t;R++){const A=R/t;h.x=-e*Math.cos(r+A*i)*Math.sin(o+_*s),h.y=e*Math.cos(o+_*s),h.z=e*Math.sin(r+A*i)*Math.sin(o+_*s),g.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),p.push(A+S,1-_),T.push(c++)}u.push(T)}for(let m=0;m<a;m++)for(let T=0;T<t;T++){const _=u[m][T+1],S=u[m][T],R=u[m+1][T],A=u[m+1][T+1];(m!==0||o>0)&&f.push(_,S,A),(m!==a-1||l<Math.PI)&&f.push(S,R,A)}this.setIndex(f),this.setAttribute("position",new Wt(g,3)),this.setAttribute("normal",new Wt(v,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}const xo={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class _f{constructor(e,t,a){const r=this;let i=!1,o=0,s=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=a,this.itemStart=function(u){s++,i===!1&&r.onStart!==void 0&&r.onStart(u,o,s),i=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,s),o===s&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],g=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const xf=new _f;class Rn{constructor(e){this.manager=e!==void 0?e:xf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const a=this;return new Promise(function(r,i){a.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Rn.DEFAULT_MATERIAL_NAME="__DEFAULT";class yf extends Rn{constructor(e){super(e)}load(e,t,a,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const i=this,o=xo.get(e);if(o!==void 0)return i.manager.itemStart(e),setTimeout(function(){t&&t(o),i.manager.itemEnd(e)},0),o;const s=Ri("img");function l(){u(),xo.add(e,this),t&&t(this),i.manager.itemEnd(e)}function c(h){u(),r&&r(h),i.manager.itemError(e),i.manager.itemEnd(e)}function u(){s.removeEventListener("load",l,!1),s.removeEventListener("error",c,!1)}return s.addEventListener("load",l,!1),s.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(s.crossOrigin=this.crossOrigin),i.manager.itemStart(e),s.src=e,s}}class bf extends Rn{constructor(e){super(e)}load(e,t,a,r){const i=new St,o=new yf(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(s){i.image=s,i.needsUpdate=!0,t!==void 0&&t(i)},a,r),i}}class Sf extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new he(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Mf extends Sf{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Tf extends qt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class Ef{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yo(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=yo();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function yo(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"162"}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="162");class wf{constructor(e){this.smoothed={bass:0,mid:0,treble:0,rms:0},this.smoothing=.82,this.analyser=e,this.freqData=new Uint8Array(this.analyser.frequencyBinCount),this.timeData=new Uint8Array(this.analyser.frequencyBinCount)}update(){this.analyser.getByteFrequencyData(this.freqData),this.analyser.getByteTimeDomainData(this.timeData);const e=this.freqData.length,t=Math.floor(e/3);let a=0,r=0,i=0;for(let l=0;l<t;l++)a+=this.freqData[l];for(let l=t;l<t*2;l++)r+=this.freqData[l];for(let l=t*2;l<e;l++)i+=this.freqData[l];a=a/t/255,r=r/t/255,i=i/(e-t*2)/255;let o=0;for(let l=0;l<this.timeData.length;l++){const c=(this.timeData[l]-128)/128;o+=c*c}o=Math.sqrt(o/this.timeData.length);const s=this.smoothing;return this.smoothed.bass=this.smoothed.bass*s+a*(1-s),this.smoothed.mid=this.smoothed.mid*s+r*(1-s),this.smoothed.treble=this.smoothed.treble*s+i*(1-s),this.smoothed.rms=this.smoothed.rms*s+o*(1-s),this.smoothed}}const bo={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Gi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Af=new tt(-1,1,1,-1,0,1);class Cf extends qt{constructor(){super(),this.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Wt([0,2,0,0,2,0],2))}}const Rf=new Cf;class So{constructor(e){this._mesh=new Xe(Rf,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Af)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Ua extends Gi{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof qe?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ni.clone(e.uniforms),this.material=new qe({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new So(this.material)}render(e,t,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Mo extends Gi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,a){const r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let o,s;this.inverse?(o=0,s=1):(o=1,s=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),i.buffers.stencil.setClear(s),i.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}}class Pf extends Gi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Uf{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const a=e.getSize(new Ie);this._width=a.width,this._height=a.height,t=new pt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:1016}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ua(bo),this.copyPass.material.blending=0,this.clock=new Ef}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let a=!1;for(let r=0,i=this.passes.length;r<i;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),o.needsSwap){if(a){const s=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(s.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(s.EQUAL,1,4294967295)}this.swapBuffers()}Mo!==void 0&&(o instanceof Mo?a=!0:o instanceof Pf&&(a=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ie);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const a=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(a,r),this.renderTarget2.setSize(a,r);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(a,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class To extends Gi{constructor(e,t,a=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=a,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new he}render(e,t,a){const r=e.autoClear;e.autoClear=!1;let i,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const Df={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new he(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class gi extends Gi{constructor(e,t,a,r){super(),this.strength=t!==void 0?t:1,this.radius=a,this.threshold=r,this.resolution=e!==void 0?new Ie(e.x,e.y):new Ie(256,256),this.clearColor=new he(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new pt(i,o,{type:1016}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new pt(i,o,{type:1016});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new pt(i,o,{type:1016});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),i=Math.round(i/2),o=Math.round(o/2)}const s=Df;this.highPassUniforms=Ni.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new qe({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ie(1/i,1/o),i=Math.round(i/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new re(1,1,1),new re(1,1,1),new re(1,1,1),new re(1,1,1),new re(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=bo;this.copyUniforms=Ni.clone(u.uniforms),this.blendMaterial=new qe({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new he,this.oldClearAlpha=1,this.basic=new Fi,this.fsQuad=new So(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let a=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(a,r);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(a,r),this.renderTargetsVertical[i].setSize(a,r),this.separableBlurMaterials[i].uniforms.invSize.value=new Ie(1/a,1/r),a=Math.round(a/2),r=Math.round(r/2)}render(e,t,a,r,i){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let s=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[l].uniforms.direction.value=gi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=gi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),s=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(a),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(e*e))/e);return new qe({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ie(.5,.5)},direction:{value:new Ie(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new qe({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}gi.BlurDirectionX=new Ie(1,0),gi.BlurDirectionY=new Ie(0,1);const Lf={uniforms:{tDiffuse:{value:null},u_intensity:{value:0},u_resolution:{value:new Ie(1,1)}},vertexShader:`
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
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `},Eo={uniforms:{tDiffuse:{value:null},u_blur:{value:0},u_resolution:{value:new Ie(1,1)},u_direction:{value:new Ie(1,0)}},vertexShader:`
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
  `};class If{constructor(e,t,a){this.textRenderPass=null,this.uiVisibility=0,this.uiVisibilityTarget=0,this.chromaBeat=0,this.composer=new Uf(e);const r=new To(t,a);r.clear=!0,this.composer.addPass(r),this.bloom=new gi(new Ie(window.innerWidth,window.innerHeight),1.5,.4,.85),this.composer.addPass(this.bloom),this.chromaPass=new Ua(Lf),this.chromaPass.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),this.composer.addPass(this.chromaPass),this.blurPassH=new Ua(Eo),this.blurPassH.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),this.blurPassH.uniforms.u_direction.value.set(1,0),this.composer.addPass(this.blurPassH),this.blurPassV=new Ua(Eo),this.blurPassV.uniforms.u_resolution.value.set(window.innerWidth,window.innerHeight),this.blurPassV.uniforms.u_direction.value.set(0,1),this.composer.addPass(this.blurPassV),this.textRenderPass=new To(t,a),this.textRenderPass.clear=!1,this.textRenderPass.clearDepth=!0,this.composer.addPass(this.textRenderPass)}setUiVisibility(e){this.uiVisibilityTarget=e?1:0}update(e){this.bloom.threshold=.2-e.rms*.2,this.bloom.strength=1+e.rms*2,e.bass>.5&&(this.chromaBeat=Math.max(this.chromaBeat,e.bass)),this.chromaBeat*=.92,this.chromaPass.uniforms.u_intensity.value=this.chromaBeat,this.uiVisibility+=(this.uiVisibilityTarget-this.uiVisibility)*.05;const t=this.uiVisibility*5;this.blurPassH.uniforms.u_blur.value=t,this.blurPassV.uniforms.u_blur.value=t}setSize(e,t){this.composer.setSize(e,t),this.chromaPass.uniforms.u_resolution.value.set(e,t),this.blurPassH.uniforms.u_resolution.value.set(e,t),this.blurPassV.uniforms.u_resolution.value.set(e,t)}updateScene(e,t){const a=this.composer.passes[0];a.scene=e,a.camera=t,this.textRenderPass&&(this.textRenderPass.scene=e,this.textRenderPass.camera=t)}}function Ff(){var n=Object.create(null);function e(r,i){var o=r.id,s=r.name,l=r.dependencies;l===void 0&&(l=[]);var c=r.init;c===void 0&&(c=function(){});var u=r.getTransferables;if(u===void 0&&(u=null),!n[o])try{l=l.map(function(d){return d&&d.isWorkerModule&&(e(d,function(f){if(f instanceof Error)throw f}),d=n[d.id].value),d}),c=a("<"+s+">.init",c),u&&(u=a("<"+s+">.getTransferables",u));var h=null;typeof c=="function"?h=c.apply(void 0,l):console.error("worker module init function failed to rehydrate"),n[o]={id:o,value:h,getTransferables:u},i(h)}catch(d){d&&d.noLog||console.error(d),i(d)}}function t(r,i){var o,s=r.id,l=r.args;(!n[s]||typeof n[s].value!="function")&&i(new Error("Worker module "+s+": not found or its 'init' did not return a function"));try{var c=(o=n[s]).value.apply(o,l);c&&typeof c.then=="function"?c.then(u,function(h){return i(h instanceof Error?h:new Error(""+h))}):u(c)}catch(h){i(h)}function u(h){try{var d=n[s].getTransferables&&n[s].getTransferables(h);(!d||!Array.isArray(d)||!d.length)&&(d=void 0),i(h,d)}catch(f){console.error(f),i(f)}}}function a(r,i){var o=void 0;self.troikaDefine=function(l){return o=l};var s=URL.createObjectURL(new Blob(["/** "+r.replace(/\*/g,"")+` **/

troikaDefine(
`+i+`
)`],{type:"application/javascript"}));try{importScripts(s)}catch(l){console.error(l)}return URL.revokeObjectURL(s),delete self.troikaDefine,o}self.addEventListener("message",function(r){var i=r.data,o=i.messageId,s=i.action,l=i.data;try{s==="registerModule"&&e(l,function(c){c instanceof Error?postMessage({messageId:o,success:!1,error:c.message}):postMessage({messageId:o,success:!0,result:{isCallable:typeof c=="function"}})}),s==="callModule"&&t(l,function(c,u){c instanceof Error?postMessage({messageId:o,success:!1,error:c.message}):postMessage({messageId:o,success:!0,result:c},u||void 0)})}catch(c){postMessage({messageId:o,success:!1,error:c.stack})}})}function Of(n){var e=function(){for(var t=[],a=arguments.length;a--;)t[a]=arguments[a];return e._getInitResult().then(function(r){if(typeof r=="function")return r.apply(void 0,t);throw new Error("Worker module function was called but `init` did not return a callable function")})};return e._getInitResult=function(){var t=n.dependencies,a=n.init;t=Array.isArray(t)?t.map(function(i){return i&&(i=i.onMainThread||i,i._getInitResult&&(i=i._getInitResult())),i}):[];var r=Promise.all(t).then(function(i){return a.apply(null,i)});return e._getInitResult=function(){return r},r},e}var wo=function(){var n=!1;if(typeof window<"u"&&typeof window.document<"u")try{var e=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));e.terminate(),n=!0}catch(t){typeof process<"u"&&!1||console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+t.message+"]")}return wo=function(){return n},n},Nf=0,zf=0,Pn=!1,Hi=Object.create(null),Vi=Object.create(null),Un=Object.create(null);function di(n){if((!n||typeof n.init!="function")&&!Pn)throw new Error("requires `options.init` function");var e=n.dependencies,t=n.init,a=n.getTransferables,r=n.workerId,i=Of(n);r==null&&(r="#default");var o="workerModule"+ ++Nf,s=n.name||o,l=null;e=e&&e.map(function(u){return typeof u=="function"&&!u.workerModuleData&&(Pn=!0,u=di({workerId:r,name:"<"+s+"> function dependency: "+u.name,init:`function(){return (
`+Da(u)+`
)}`}),Pn=!1),u&&u.workerModuleData&&(u=u.workerModuleData),u});function c(){for(var u=[],h=arguments.length;h--;)u[h]=arguments[h];if(!wo())return i.apply(void 0,u);if(!l){l=Ao(r,"registerModule",c.workerModuleData);var d=function(){l=null,Vi[r].delete(d)};(Vi[r]||(Vi[r]=new Set)).add(d)}return l.then(function(f){var g=f.isCallable;if(g)return Ao(r,"callModule",{id:o,args:u});throw new Error("Worker module function was called but `init` did not return a callable function")})}return c.workerModuleData={isWorkerModule:!0,id:o,name:s,dependencies:e,init:Da(t),getTransferables:a&&Da(a)},c.onMainThread=i,c}function Bf(n){Vi[n]&&Vi[n].forEach(function(e){e()}),Hi[n]&&(Hi[n].terminate(),delete Hi[n])}function Da(n){var e=n.toString();return!/^function/.test(e)&&/^\w+\s*\(/.test(e)&&(e="function "+e),e}function kf(n){var e=Hi[n];if(!e){var t=Da(Ff);e=Hi[n]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+n.replace(/\*/g,"")+` **/

;(`+t+")()"],{type:"application/javascript"}))),e.onmessage=function(a){var r=a.data,i=r.messageId,o=Un[i];if(!o)throw new Error("WorkerModule response with empty or unknown messageId");delete Un[i],o(r)}}return e}function Ao(n,e,t){return new Promise(function(a,r){var i=++zf;Un[i]=function(o){o.success?a(o.result):r(new Error("Error in worker "+e+" call: "+o.error))},kf(n).postMessage({messageId:i,action:e,data:t})})}function Co(){var n=(function(e){function t(O,W,P,N,X,D,F,J){var Q=1-F;J.x=Q*Q*O+2*Q*F*P+F*F*X,J.y=Q*Q*W+2*Q*F*N+F*F*D}function a(O,W,P,N,X,D,F,J,Q,te){var se=1-Q;te.x=se*se*se*O+3*se*se*Q*P+3*se*Q*Q*X+Q*Q*Q*F,te.y=se*se*se*W+3*se*se*Q*N+3*se*Q*Q*D+Q*Q*Q*J}function r(O,W){for(var P=/([MLQCZ])([^MLQCZ]*)/g,N,X,D,F,J;N=P.exec(O);){var Q=N[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(te){return parseFloat(te)});switch(N[1]){case"M":F=X=Q[0],J=D=Q[1];break;case"L":(Q[0]!==F||Q[1]!==J)&&W("L",F,J,F=Q[0],J=Q[1]);break;case"Q":{W("Q",F,J,F=Q[2],J=Q[3],Q[0],Q[1]);break}case"C":{W("C",F,J,F=Q[4],J=Q[5],Q[0],Q[1],Q[2],Q[3]);break}case"Z":(F!==X||J!==D)&&W("L",F,J,X,D);break}}}function i(O,W,P){P===void 0&&(P=16);var N={x:0,y:0};r(O,function(X,D,F,J,Q,te,se,be,le){switch(X){case"L":W(D,F,J,Q);break;case"Q":{for(var I=D,Ne=F,xe=1;xe<P;xe++)t(D,F,te,se,J,Q,xe/(P-1),N),W(I,Ne,N.x,N.y),I=N.x,Ne=N.y;break}case"C":{for(var ve=D,fe=F,Ae=1;Ae<P;Ae++)a(D,F,te,se,be,le,J,Q,Ae/(P-1),N),W(ve,fe,N.x,N.y),ve=N.x,fe=N.y;break}}})}var o="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",s="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",l=new WeakMap,c={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function u(O,W){var P=O.getContext?O.getContext("webgl",c):O,N=l.get(P);if(!N){let se=function(ve){var fe=D[ve];if(!fe&&(fe=D[ve]=P.getExtension(ve),!fe))throw new Error(ve+" not supported");return fe},be=function(ve,fe){var Ae=P.createShader(fe);return P.shaderSource(Ae,ve),P.compileShader(Ae),Ae},le=function(ve,fe,Ae,oe){if(!F[ve]){var Se={},Me={},b=P.createProgram();P.attachShader(b,be(fe,P.VERTEX_SHADER)),P.attachShader(b,be(Ae,P.FRAGMENT_SHADER)),P.linkProgram(b),F[ve]={program:b,transaction:function(y){P.useProgram(b),y({setUniform:function(k,Y){for(var ie=[],$=arguments.length-2;$-- >0;)ie[$]=arguments[$+2];var Pe=Me[Y]||(Me[Y]=P.getUniformLocation(b,Y));P["uniform"+k].apply(P,[Pe].concat(ie))},setAttribute:function(k,Y,ie,$,Pe){var de=Se[k];de||(de=Se[k]={buf:P.createBuffer(),loc:P.getAttribLocation(b,k),data:null}),P.bindBuffer(P.ARRAY_BUFFER,de.buf),P.vertexAttribPointer(de.loc,Y,P.FLOAT,!1,0,0),P.enableVertexAttribArray(de.loc),X?P.vertexAttribDivisor(de.loc,$):se("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(de.loc,$),Pe!==de.data&&(P.bufferData(P.ARRAY_BUFFER,Pe,ie),de.data=Pe)}})}}}F[ve].transaction(oe)},I=function(ve,fe){Q++;try{P.activeTexture(P.TEXTURE0+Q);var Ae=J[ve];Ae||(Ae=J[ve]=P.createTexture(),P.bindTexture(P.TEXTURE_2D,Ae),P.texParameteri(P.TEXTURE_2D,P.TEXTURE_MIN_FILTER,P.NEAREST),P.texParameteri(P.TEXTURE_2D,P.TEXTURE_MAG_FILTER,P.NEAREST)),P.bindTexture(P.TEXTURE_2D,Ae),fe(Ae,Q)}finally{Q--}},Ne=function(ve,fe,Ae){var oe=P.createFramebuffer();te.push(oe),P.bindFramebuffer(P.FRAMEBUFFER,oe),P.activeTexture(P.TEXTURE0+fe),P.bindTexture(P.TEXTURE_2D,ve),P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ve,0);try{Ae(oe)}finally{P.deleteFramebuffer(oe),P.bindFramebuffer(P.FRAMEBUFFER,te[--te.length-1]||null)}},xe=function(){D={},F={},J={},Q=-1,te.length=0};var X=typeof WebGL2RenderingContext<"u"&&P instanceof WebGL2RenderingContext,D={},F={},J={},Q=-1,te=[];P.canvas.addEventListener("webglcontextlost",function(ve){xe(),ve.preventDefault()},!1),l.set(P,N={gl:P,isWebGL2:X,getExtension:se,withProgram:le,withTexture:I,withTextureFramebuffer:Ne,handleContextLoss:xe})}W(N)}function h(O,W,P,N,X,D,F,J){F===void 0&&(F=15),J===void 0&&(J=null),u(O,function(Q){var te=Q.gl,se=Q.withProgram,be=Q.withTexture;be("copy",function(le,I){te.texImage2D(te.TEXTURE_2D,0,te.RGBA,X,D,0,te.RGBA,te.UNSIGNED_BYTE,W),se("copy",o,s,function(Ne){var xe=Ne.setUniform,ve=Ne.setAttribute;ve("aUV",2,te.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),xe("1i","image",I),te.bindFramebuffer(te.FRAMEBUFFER,J||null),te.disable(te.BLEND),te.colorMask(F&8,F&4,F&2,F&1),te.viewport(P,N,X,D),te.scissor(P,N,X,D),te.drawArrays(te.TRIANGLES,0,3)})})})}function d(O,W,P){var N=O.width,X=O.height;u(O,function(D){var F=D.gl,J=new Uint8Array(N*X*4);F.readPixels(0,0,N,X,F.RGBA,F.UNSIGNED_BYTE,J),O.width=W,O.height=P,h(F,J,0,0,N,X)})}var f=Object.freeze({__proto__:null,withWebGLContext:u,renderImageData:h,resizeWebGLCanvasWithoutClearing:d});function g(O,W,P,N,X,D){D===void 0&&(D=1);var F=new Uint8Array(O*W),J=N[2]-N[0],Q=N[3]-N[1],te=[];i(P,function(ve,fe,Ae,oe){te.push({x1:ve,y1:fe,x2:Ae,y2:oe,minX:Math.min(ve,Ae),minY:Math.min(fe,oe),maxX:Math.max(ve,Ae),maxY:Math.max(fe,oe)})}),te.sort(function(ve,fe){return ve.maxX-fe.maxX});for(var se=0;se<O;se++)for(var be=0;be<W;be++){var le=Ne(N[0]+J*(se+.5)/O,N[1]+Q*(be+.5)/W),I=Math.pow(1-Math.abs(le)/X,D)/2;le<0&&(I=1-I),I=Math.max(0,Math.min(255,Math.round(I*255))),F[be*O+se]=I}return F;function Ne(ve,fe){for(var Ae=1/0,oe=1/0,Se=te.length;Se--;){var Me=te[Se];if(Me.maxX+oe<=ve)break;if(ve+oe>Me.minX&&fe-oe<Me.maxY&&fe+oe>Me.minY){var b=m(ve,fe,Me.x1,Me.y1,Me.x2,Me.y2);b<Ae&&(Ae=b,oe=Math.sqrt(Ae))}}return xe(ve,fe)&&(oe=-oe),oe}function xe(ve,fe){for(var Ae=0,oe=te.length;oe--;){var Se=te[oe];if(Se.maxX<=ve)break;var Me=Se.y1>fe!=Se.y2>fe&&ve<(Se.x2-Se.x1)*(fe-Se.y1)/(Se.y2-Se.y1)+Se.x1;Me&&(Ae+=Se.y1<Se.y2?1:-1)}return Ae!==0}}function v(O,W,P,N,X,D,F,J,Q,te){D===void 0&&(D=1),J===void 0&&(J=0),Q===void 0&&(Q=0),te===void 0&&(te=0),p(O,W,P,N,X,D,F,null,J,Q,te)}function p(O,W,P,N,X,D,F,J,Q,te,se){D===void 0&&(D=1),Q===void 0&&(Q=0),te===void 0&&(te=0),se===void 0&&(se=0);for(var be=g(O,W,P,N,X,D),le=new Uint8Array(be.length*4),I=0;I<be.length;I++)le[I*4+se]=be[I];h(F,le,Q,te,O,W,1<<3-se,J)}function m(O,W,P,N,X,D){var F=X-P,J=D-N,Q=F*F+J*J,te=Q?Math.max(0,Math.min(1,((O-P)*F+(W-N)*J)/Q)):0,se=O-(P+te*F),be=W-(N+te*J);return se*se+be*be}var T=Object.freeze({__proto__:null,generate:g,generateIntoCanvas:v,generateIntoFramebuffer:p}),_="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",S="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",R="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",A=new Float32Array([0,0,2,0,0,2]),M=null,L=!1,H={},x=new WeakMap;function E(O){if(!L&&!V(O))throw new Error("WebGL generation not supported")}function U(O,W,P,N,X,D,F){if(D===void 0&&(D=1),F===void 0&&(F=null),!F&&(F=M,!F)){var J=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!J)throw new Error("OffscreenCanvas or DOM canvas not supported");F=M=J.getContext("webgl",{depth:!1})}E(F);var Q=new Uint8Array(O*W*4);u(F,function(le){var I=le.gl,Ne=le.withTexture,xe=le.withTextureFramebuffer;Ne("readable",function(ve,fe){I.texImage2D(I.TEXTURE_2D,0,I.RGBA,O,W,0,I.RGBA,I.UNSIGNED_BYTE,null),xe(ve,fe,function(Ae){C(O,W,P,N,X,D,I,Ae,0,0,0),I.readPixels(0,0,O,W,I.RGBA,I.UNSIGNED_BYTE,Q)})})});for(var te=new Uint8Array(O*W),se=0,be=0;se<Q.length;se+=4)te[be++]=Q[se];return te}function B(O,W,P,N,X,D,F,J,Q,te){D===void 0&&(D=1),J===void 0&&(J=0),Q===void 0&&(Q=0),te===void 0&&(te=0),C(O,W,P,N,X,D,F,null,J,Q,te)}function C(O,W,P,N,X,D,F,J,Q,te,se){D===void 0&&(D=1),Q===void 0&&(Q=0),te===void 0&&(te=0),se===void 0&&(se=0),E(F);var be=[];i(P,function(le,I,Ne,xe){be.push(le,I,Ne,xe)}),be=new Float32Array(be),u(F,function(le){var I=le.gl,Ne=le.isWebGL2,xe=le.getExtension,ve=le.withProgram,fe=le.withTexture,Ae=le.withTextureFramebuffer,oe=le.handleContextLoss;if(fe("rawDistances",function(Se,Me){(O!==Se._lastWidth||W!==Se._lastHeight)&&I.texImage2D(I.TEXTURE_2D,0,I.RGBA,Se._lastWidth=O,Se._lastHeight=W,0,I.RGBA,I.UNSIGNED_BYTE,null),ve("main",_,S,function(b){var y=b.setAttribute,k=b.setUniform,Y=!Ne&&xe("ANGLE_instanced_arrays"),ie=!Ne&&xe("EXT_blend_minmax");y("aUV",2,I.STATIC_DRAW,0,A),y("aLineSegment",4,I.DYNAMIC_DRAW,1,be),k.apply(void 0,["4f","uGlyphBounds"].concat(N)),k("1f","uMaxDistance",X),k("1f","uExponent",D),Ae(Se,Me,function($){I.enable(I.BLEND),I.colorMask(!0,!0,!0,!0),I.viewport(0,0,O,W),I.scissor(0,0,O,W),I.blendFunc(I.ONE,I.ONE),I.blendEquationSeparate(I.FUNC_ADD,Ne?I.MAX:ie.MAX_EXT),I.clear(I.COLOR_BUFFER_BIT),Ne?I.drawArraysInstanced(I.TRIANGLES,0,3,be.length/4):Y.drawArraysInstancedANGLE(I.TRIANGLES,0,3,be.length/4)})}),ve("post",o,R,function(b){b.setAttribute("aUV",2,I.STATIC_DRAW,0,A),b.setUniform("1i","tex",Me),I.bindFramebuffer(I.FRAMEBUFFER,J),I.disable(I.BLEND),I.colorMask(se===0,se===1,se===2,se===3),I.viewport(Q,te,O,W),I.scissor(Q,te,O,W),I.drawArrays(I.TRIANGLES,0,3)})}),I.isContextLost())throw oe(),new Error("webgl context lost")})}function V(O){var W=!O||O===M?H:O.canvas||O,P=x.get(W);if(P===void 0){L=!0;var N=null;try{var X=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],D=U(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,O);P=D&&X.length===D.length&&D.every(function(F,J){return F===X[J]}),P||(N="bad trial run results",console.info(X,D))}catch(F){P=!1,N=F.message}N&&console.warn("WebGL SDF generation not supported:",N),L=!1,x.set(W,P)}return P}var z=Object.freeze({__proto__:null,generate:U,generateIntoCanvas:B,generateIntoFramebuffer:C,isSupported:V});function j(O,W,P,N,X,D){X===void 0&&(X=Math.max(N[2]-N[0],N[3]-N[1])/2),D===void 0&&(D=1);try{return U.apply(z,arguments)}catch(F){return console.info("WebGL SDF generation failed, falling back to JS",F),g.apply(T,arguments)}}function K(O,W,P,N,X,D,F,J,Q,te){X===void 0&&(X=Math.max(N[2]-N[0],N[3]-N[1])/2),D===void 0&&(D=1),J===void 0&&(J=0),Q===void 0&&(Q=0),te===void 0&&(te=0);try{return B.apply(z,arguments)}catch(se){return console.info("WebGL SDF generation failed, falling back to JS",se),v.apply(T,arguments)}}return e.forEachPathCommand=r,e.generate=j,e.generateIntoCanvas=K,e.javascript=T,e.pathToLineSegments=i,e.webgl=z,e.webglUtils=f,Object.defineProperty(e,"__esModule",{value:!0}),e})({});return n}function Gf(){var n=(function(e){var t={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},a={},r={};a.L=1,r[1]="L",Object.keys(t).forEach(function(oe,Se){a[oe]=1<<Se+1,r[a[oe]]=oe}),Object.freeze(a);var i=a.LRI|a.RLI|a.FSI,o=a.L|a.R|a.AL,s=a.B|a.S|a.WS|a.ON|a.FSI|a.LRI|a.RLI|a.PDI,l=a.BN|a.RLE|a.LRE|a.RLO|a.LRO|a.PDF,c=a.S|a.WS|a.B|i|a.PDI|l,u=null;function h(){if(!u){u=new Map;var oe=function(Me){if(t.hasOwnProperty(Me)){var b=0;t[Me].split(",").forEach(function(y){var k=y.split("+"),Y=k[0],ie=k[1];Y=parseInt(Y,36),ie=ie?parseInt(ie,36):0,u.set(b+=Y,a[Me]);for(var $=0;$<ie;$++)u.set(++b,a[Me])})}};for(var Se in t)oe(Se)}}function d(oe){return h(),u.get(oe.codePointAt(0))||a.L}function f(oe){return r[d(oe)]}var g={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function v(oe,Se){var Me=36,b=0,y=new Map,k=Se&&new Map,Y;return oe.split(",").forEach(function ie($){if($.indexOf("+")!==-1)for(var Pe=+$;Pe--;)ie(Y);else{Y=$;var de=$.split(">"),ce=de[0],me=de[1];ce=String.fromCodePoint(b+=parseInt(ce,Me)),me=String.fromCodePoint(b+=parseInt(me,Me)),y.set(ce,me),Se&&k.set(me,ce)}}),{map:y,reverseMap:k}}var p,m,T;function _(){if(!p){var oe=v(g.pairs,!0),Se=oe.map,Me=oe.reverseMap;p=Se,m=Me,T=v(g.canonical,!1).map}}function S(oe){return _(),p.get(oe)||null}function R(oe){return _(),m.get(oe)||null}function A(oe){return _(),T.get(oe)||null}var M=a.L,L=a.R,H=a.EN,x=a.ES,E=a.ET,U=a.AN,B=a.CS,C=a.B,V=a.S,z=a.ON,j=a.BN,K=a.NSM,O=a.AL,W=a.LRO,P=a.RLO,N=a.LRE,X=a.RLE,D=a.PDF,F=a.LRI,J=a.RLI,Q=a.FSI,te=a.PDI;function se(oe,Se){for(var Me=125,b=new Uint32Array(oe.length),y=0;y<oe.length;y++)b[y]=d(oe[y]);var k=new Map;function Y(Dt,$t){var Lt=b[Dt];b[Dt]=$t,k.set(Lt,k.get(Lt)-1),Lt&s&&k.set(s,k.get(s)-1),k.set($t,(k.get($t)||0)+1),$t&s&&k.set(s,(k.get(s)||0)+1)}for(var ie=new Uint8Array(oe.length),$=new Map,Pe=[],de=null,ce=0;ce<oe.length;ce++)de||Pe.push(de={start:ce,end:oe.length-1,level:Se==="rtl"?1:Se==="ltr"?0:ts(ce,!1)}),b[ce]&C&&(de.end=ce,de=null);for(var me=X|N|P|W|i|te|D|C,Oe=function(Dt){return Dt+(Dt&1?1:2)},ue=function(Dt){return Dt+(Dt&1?2:1)},Je=0;Je<Pe.length;Je++){de=Pe[Je];var Ee=[{_level:de.level,_override:0,_isolate:0}],Te=void 0,Ue=0,Ce=0,Ge=0;k.clear();for(var we=de.start;we<=de.end;we++){var Fe=b[we];if(Te=Ee[Ee.length-1],k.set(Fe,(k.get(Fe)||0)+1),Fe&s&&k.set(s,(k.get(s)||0)+1),Fe&me)if(Fe&(X|N)){ie[we]=Te._level;var G=(Fe===X?ue:Oe)(Te._level);G<=Me&&!Ue&&!Ce?Ee.push({_level:G,_override:0,_isolate:0}):Ue||Ce++}else if(Fe&(P|W)){ie[we]=Te._level;var pe=(Fe===P?ue:Oe)(Te._level);pe<=Me&&!Ue&&!Ce?Ee.push({_level:pe,_override:Fe&P?L:M,_isolate:0}):Ue||Ce++}else if(Fe&i){Fe&Q&&(Fe=ts(we+1,!0)===1?J:F),ie[we]=Te._level,Te._override&&Y(we,Te._override);var q=(Fe===J?ue:Oe)(Te._level);q<=Me&&Ue===0&&Ce===0?(Ge++,Ee.push({_level:q,_override:0,_isolate:1,_isolInitIndex:we})):Ue++}else if(Fe&te){if(Ue>0)Ue--;else if(Ge>0){for(Ce=0;!Ee[Ee.length-1]._isolate;)Ee.pop();var ye=Ee[Ee.length-1]._isolInitIndex;ye!=null&&($.set(ye,we),$.set(we,ye)),Ee.pop(),Ge--}Te=Ee[Ee.length-1],ie[we]=Te._level,Te._override&&Y(we,Te._override)}else Fe&D?(Ue===0&&(Ce>0?Ce--:!Te._isolate&&Ee.length>1&&(Ee.pop(),Te=Ee[Ee.length-1])),ie[we]=Te._level):Fe&C&&(ie[we]=de.level);else ie[we]=Te._level,Te._override&&Fe!==j&&Y(we,Te._override)}for(var _e=[],Le=null,Be=de.start;Be<=de.end;Be++){var Qe=b[Be];if(!(Qe&l)){var et=ie[Be],He=Qe&i,at=Qe===te;Le&&et===Le._level?(Le._end=Be,Le._endsWithIsolInit=He):_e.push(Le={_start:Be,_end:Be,_level:et,_startsWithPDI:at,_endsWithIsolInit:He})}}for(var _t=[],Vt=0;Vt<_e.length;Vt++){var jt=_e[Vt];if(!jt._startsWithPDI||jt._startsWithPDI&&!$.has(jt._start)){for(var Ot=[Le=jt],rr=void 0;Le&&Le._endsWithIsolInit&&(rr=$.get(Le._end))!=null;)for(var xt=Vt+1;xt<_e.length;xt++)if(_e[xt]._start===rr){Ot.push(Le=_e[xt]);break}for(var Nt=[],Br=0;Br<Ot.length;Br++)for(var Yi=Ot[Br],vi=Yi._start;vi<=Yi._end;vi++)Nt.push(vi);for(var Na=ie[Nt[0]],w=de.level,Z=Nt[0]-1;Z>=0;Z--)if(!(b[Z]&l)){w=ie[Z];break}var ae=Nt[Nt.length-1],ne=ie[ae],ee=de.level;if(!(b[ae]&i)){for(var Re=ae+1;Re<=de.end;Re++)if(!(b[Re]&l)){ee=ie[Re];break}}_t.push({_seqIndices:Nt,_sosType:Math.max(w,Na)%2?L:M,_eosType:Math.max(ee,ne)%2?L:M})}}for(var ze=0;ze<_t.length;ze++){var ke=_t[ze],ge=ke._seqIndices,je=ke._sosType,Ye=ke._eosType,Ve=ie[ge[0]]&1?L:M;if(k.get(K))for(var ht=0;ht<ge.length;ht++){var ut=ge[ht];if(b[ut]&K){for(var Mt=je,Pt=ht-1;Pt>=0;Pt--)if(!(b[ge[Pt]]&l)){Mt=b[ge[Pt]];break}Y(ut,Mt&(i|te)?z:Mt)}}if(k.get(H))for(var it=0;it<ge.length;it++){var We=ge[it];if(b[We]&H)for(var fr=it-1;fr>=-1;fr--){var kr=fr===-1?je:b[ge[fr]];if(kr&o){kr===O&&Y(We,U);break}}}if(k.get(O))for(var Yt=0;Yt<ge.length;Yt++){var _i=ge[Yt];b[_i]&O&&Y(_i,L)}if(k.get(x)||k.get(B))for(var Zt=1;Zt<ge.length-1;Zt++){var Mr=ge[Zt];if(b[Mr]&(x|B)){for(var ct=0,Kt=0,Tr=Zt-1;Tr>=0&&(ct=b[ge[Tr]],!!(ct&l));Tr--);for(var Tt=Zt+1;Tt<ge.length&&(Kt=b[ge[Tt]],!!(Kt&l));Tt++);ct===Kt&&(b[Mr]===x?ct===H:ct&(H|U))&&Y(Mr,ct)}}if(k.get(H))for(var Ut=0;Ut<ge.length;Ut++){var za=ge[Ut];if(b[za]&H){for(var Er=Ut-1;Er>=0&&b[ge[Er]]&(E|l);Er--)Y(ge[Er],H);for(Ut++;Ut<ge.length&&b[ge[Ut]]&(E|l|H);Ut++)b[ge[Ut]]!==H&&Y(ge[Ut],H)}}if(k.get(E)||k.get(x)||k.get(B))for(var xi=0;xi<ge.length;xi++){var Hn=ge[xi];if(b[Hn]&(E|x|B)){Y(Hn,z);for(var Zi=xi-1;Zi>=0&&b[ge[Zi]]&l;Zi--)Y(ge[Zi],z);for(var Ki=xi+1;Ki<ge.length&&b[ge[Ki]]&l;Ki++)Y(ge[Ki],z)}}if(k.get(H))for(var Ba=0,Vn=je;Ba<ge.length;Ba++){var Wn=ge[Ba],ka=b[Wn];ka&H?Vn===M&&Y(Wn,M):ka&o&&(Vn=ka)}if(k.get(s)){var yi=L|H|U,Xn=yi|M,Ji=[];{for(var Gr=[],Hr=0;Hr<ge.length;Hr++)if(b[ge[Hr]]&s){var bi=oe[ge[Hr]],qn=void 0;if(S(bi)!==null)if(Gr.length<63)Gr.push({char:bi,seqIndex:Hr});else break;else if((qn=R(bi))!==null)for(var Si=Gr.length-1;Si>=0;Si--){var Ga=Gr[Si].char;if(Ga===qn||Ga===R(A(bi))||S(A(Ga))===bi){Ji.push([Gr[Si].seqIndex,Hr]),Gr.length=Si;break}}}Ji.sort(function(Dt,$t){return Dt[0]-$t[0]})}for(var Ha=0;Ha<Ji.length;Ha++){for(var jn=Ji[Ha],$i=jn[0],Va=jn[1],Yn=!1,Jt=0,Wa=$i+1;Wa<Va;Wa++){var Zn=ge[Wa];if(b[Zn]&Xn){Yn=!0;var Kn=b[Zn]&yi?L:M;if(Kn===Ve){Jt=Kn;break}}}if(Yn&&!Jt){Jt=je;for(var Xa=$i-1;Xa>=0;Xa--){var Jn=ge[Xa];if(b[Jn]&Xn){var $n=b[Jn]&yi?L:M;$n!==Ve?Jt=$n:Jt=Ve;break}}}if(Jt){if(b[ge[$i]]=b[ge[Va]]=Jt,Jt!==Ve){for(var Mi=$i+1;Mi<ge.length;Mi++)if(!(b[ge[Mi]]&l)){d(oe[ge[Mi]])&K&&(b[ge[Mi]]=Jt);break}}if(Jt!==Ve){for(var Ti=Va+1;Ti<ge.length;Ti++)if(!(b[ge[Ti]]&l)){d(oe[ge[Ti]])&K&&(b[ge[Ti]]=Jt);break}}}}for(var pr=0;pr<ge.length;pr++)if(b[ge[pr]]&s){for(var Qn=pr,qa=pr,ja=je,Ei=pr-1;Ei>=0;Ei--)if(b[ge[Ei]]&l)Qn=Ei;else{ja=b[ge[Ei]]&yi?L:M;break}for(var es=Ye,wi=pr+1;wi<ge.length;wi++)if(b[ge[wi]]&(s|l))qa=wi;else{es=b[ge[wi]]&yi?L:M;break}for(var Ya=Qn;Ya<=qa;Ya++)b[ge[Ya]]=ja===es?ja:Ve;pr=qa}}}for(var zt=de.start;zt<=de.end;zt++){var el=ie[zt],Qi=b[zt];if(el&1?Qi&(M|H|U)&&ie[zt]++:Qi&L?ie[zt]++:Qi&(U|H)&&(ie[zt]+=2),Qi&l&&(ie[zt]=zt===0?de.level:ie[zt-1]),zt===de.end||d(oe[zt])&(V|C))for(var ea=zt;ea>=0&&d(oe[ea])&c;ea--)ie[ea]=de.level}}return{levels:ie,paragraphs:Pe};function ts(Dt,$t){for(var Lt=Dt;Lt<oe.length;Lt++){var mr=b[Lt];if(mr&(L|O))return 1;if(mr&(C|M)||$t&&mr===te)return 0;if(mr&i){var rs=tl(Lt);Lt=rs===-1?oe.length:rs}}return 0}function tl(Dt){for(var $t=1,Lt=Dt+1;Lt<oe.length;Lt++){var mr=b[Lt];if(mr&C)break;if(mr&te){if(--$t===0)return Lt}else mr&i&&$t++}return-1}}var be="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",le;function I(){if(!le){var oe=v(be,!0),Se=oe.map,Me=oe.reverseMap;Me.forEach(function(b,y){Se.set(y,b)}),le=Se}}function Ne(oe){return I(),le.get(oe)||null}function xe(oe,Se,Me,b){var y=oe.length;Me=Math.max(0,Me==null?0:+Me),b=Math.min(y-1,b==null?y-1:+b);for(var k=new Map,Y=Me;Y<=b;Y++)if(Se[Y]&1){var ie=Ne(oe[Y]);ie!==null&&k.set(Y,ie)}return k}function ve(oe,Se,Me,b){var y=oe.length;Me=Math.max(0,Me==null?0:+Me),b=Math.min(y-1,b==null?y-1:+b);var k=[];return Se.paragraphs.forEach(function(Y){var ie=Math.max(Me,Y.start),$=Math.min(b,Y.end);if(ie<$){for(var Pe=Se.levels.slice(ie,$+1),de=$;de>=ie&&d(oe[de])&c;de--)Pe[de]=Y.level;for(var ce=Y.level,me=1/0,Oe=0;Oe<Pe.length;Oe++){var ue=Pe[Oe];ue>ce&&(ce=ue),ue<me&&(me=ue|1)}for(var Je=ce;Je>=me;Je--)for(var Ee=0;Ee<Pe.length;Ee++)if(Pe[Ee]>=Je){for(var Te=Ee;Ee+1<Pe.length&&Pe[Ee+1]>=Je;)Ee++;Ee>Te&&k.push([Te+ie,Ee+ie])}}}),k}function fe(oe,Se,Me,b){var y=Ae(oe,Se,Me,b),k=[].concat(oe);return y.forEach(function(Y,ie){k[ie]=(Se.levels[Y]&1?Ne(oe[Y]):null)||oe[Y]}),k.join("")}function Ae(oe,Se,Me,b){for(var y=ve(oe,Se,Me,b),k=[],Y=0;Y<oe.length;Y++)k[Y]=Y;return y.forEach(function(ie){for(var $=ie[0],Pe=ie[1],de=k.slice($,Pe+1),ce=de.length;ce--;)k[Pe-ce]=de[ce]}),k}return e.closingToOpeningBracket=R,e.getBidiCharType=d,e.getBidiCharTypeName=f,e.getCanonicalBracket=A,e.getEmbeddingLevels=se,e.getMirroredCharacter=Ne,e.getMirroredCharactersMap=xe,e.getReorderSegments=ve,e.getReorderedIndices=Ae,e.getReorderedString=fe,e.openingToClosingBracket=S,Object.defineProperty(e,"__esModule",{value:!0}),e})({});return n}const Ro=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Dn(n){const e=/^[ \t]*#include +<([\w\d./]+)>/gm;function t(a,r){let i=Ze[r];return i?Dn(i):a}return n.replace(e,t)}const bt=[];for(let n=0;n<256;n++)bt[n]=(n<16?"0":"")+n.toString(16);function Hf(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[a&255]+bt[a>>8&255]+bt[a>>16&255]+bt[a>>24&255]).toUpperCase()}const Nr=Object.assign||function(){let n=arguments[0];for(let e=1,t=arguments.length;e<t;e++){let a=arguments[e];if(a)for(let r in a)Object.prototype.hasOwnProperty.call(a,r)&&(n[r]=a[r])}return n},Vf=Date.now(),Po=new WeakMap,Uo=new Map;let Wf=1e10;function Ln(n,e){const t=Yf(e);let a=Po.get(n);if(a||Po.set(n,a=Object.create(null)),a[t])return new a[t];const r=`_onBeforeCompile${t}`,i=function(c,u){n.onBeforeCompile.call(this,c,u);const h=this.customProgramCacheKey()+"|"+c.vertexShader+"|"+c.fragmentShader;let d=Uo[h];if(!d){const f=Xf(this,c,e,t);d=Uo[h]=f}c.vertexShader=d.vertexShader,c.fragmentShader=d.fragmentShader,Nr(c.uniforms,this.uniforms),e.timeUniform&&(c.uniforms[e.timeUniform]={get value(){return Date.now()-Vf}}),this[r]&&this[r](c)},o=function(){return s(e.chained?n:n.clone())},s=function(c){const u=Object.create(c,l);return Object.defineProperty(u,"baseMaterial",{value:n}),Object.defineProperty(u,"id",{value:Wf++}),u.uuid=Hf(),u.uniforms=Nr({},c.uniforms,e.uniforms),u.defines=Nr({},c.defines,e.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${t}`]="",u.extensions=Nr({},c.extensions,e.extensions),u._listeners=void 0,u},l={constructor:{value:o},isDerivedMaterial:{value:!0},type:{get:()=>n.type,set:c=>{n.type=c}},isDerivedFrom:{writable:!0,configurable:!0,value:function(c){const u=this.baseMaterial;return c===u||u.isDerivedMaterial&&u.isDerivedFrom(c)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return n.customProgramCacheKey()+"|"+t}},onBeforeCompile:{get(){return i},set(c){this[r]=c}},copy:{writable:!0,configurable:!0,value:function(c){return n.copy.call(this,c),!n.isShaderMaterial&&!n.isDerivedMaterial&&(Nr(this.extensions,c.extensions),Nr(this.defines,c.defines),Nr(this.uniforms,Ni.clone(c.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const c=new n.constructor;return s(c).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let c=this._depthMaterial;return c||(c=this._depthMaterial=Ln(n.isDerivedMaterial?n.getDepthMaterial():new ho({depthPacking:3201}),e),c.defines.IS_DEPTH_MATERIAL="",c.uniforms=this.uniforms),c}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let c=this._distanceMaterial;return c||(c=this._distanceMaterial=Ln(n.isDerivedMaterial?n.getDistanceMaterial():new fo,e),c.defines.IS_DISTANCE_MATERIAL="",c.uniforms=this.uniforms),c}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:c,_distanceMaterial:u}=this;c&&c.dispose(),u&&u.dispose(),n.dispose.call(this)}}};return a[t]=o,new o}function Xf(n,{vertexShader:e,fragmentShader:t},a,r){let{vertexDefs:i,vertexMainIntro:o,vertexMainOutro:s,vertexTransform:l,fragmentDefs:c,fragmentMainIntro:u,fragmentMainOutro:h,fragmentColorTransform:d,customRewriter:f,timeUniform:g}=a;if(i=i||"",o=o||"",s=s||"",c=c||"",u=u||"",h=h||"",(l||f)&&(e=Dn(e)),(d||f)&&(t=t.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),t=Dn(t)),f){let v=f({vertexShader:e,fragmentShader:t});e=v.vertexShader,t=v.fragmentShader}if(d){let v=[];t=t.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,p=>(v.push(p),"")),h=`${d}
${v.join(`
`)}
${h}`}if(g){const v=`
uniform float ${g};
`;i=v+i,c=v+c}return l&&(e=`vec3 troika_position_${r};
vec3 troika_normal_${r};
vec2 troika_uv_${r};
${e}
`,i=`${i}
void troikaVertexTransform${r}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${l}
}
`,o=`
troika_position_${r} = vec3(position);
troika_normal_${r} = vec3(normal);
troika_uv_${r} = vec2(uv);
troikaVertexTransform${r}(troika_position_${r}, troika_normal_${r}, troika_uv_${r});
${o}
`,e=e.replace(/\b(position|normal|uv)\b/g,(v,p,m,T)=>/\battribute\s+vec[23]\s+$/.test(T.substr(0,m))?p:`troika_${p}_${r}`),n.map&&n.map.channel>0||(e=e.replace(/\bMAP_UV\b/g,`troika_uv_${r}`))),e=Do(e,r,i,o,s),t=Do(t,r,c,u,h),{vertexShader:e,fragmentShader:t}}function Do(n,e,t,a,r){return(a||r||t)&&(n=n.replace(Ro,`
${t}
void troikaOrigMain${e}() {`),n+=`
void main() {
  ${a}
  troikaOrigMain${e}();
  ${r}
}`),n}function qf(n,e){return n==="uniforms"?void 0:typeof e=="function"?e.toString():e}let jf=0;const Lo=new Map;function Yf(n){const e=JSON.stringify(n,qf);let t=Lo.get(e);return t==null&&Lo.set(e,t=++jf),t}function Zf(){return typeof window>"u"&&(self.window=self),(function(n){var e={parse:function(r){var i=e._bin,o=new Uint8Array(r);if(i.readASCII(o,0,4)=="ttcf"){var s=4;i.readUshort(o,s),s+=2,i.readUshort(o,s),s+=2;var l=i.readUint(o,s);s+=4;for(var c=[],u=0;u<l;u++){var h=i.readUint(o,s);s+=4,c.push(e._readFont(o,h))}return c}return[e._readFont(o,0)]},_readFont:function(r,i){var o=e._bin,s=i;o.readFixed(r,i),i+=4;var l=o.readUshort(r,i);i+=2,o.readUshort(r,i),i+=2,o.readUshort(r,i),i+=2,o.readUshort(r,i),i+=2;for(var c=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],u={_data:r,_offset:s},h={},d=0;d<l;d++){var f=o.readASCII(r,i,4);i+=4,o.readUint(r,i),i+=4;var g=o.readUint(r,i);i+=4;var v=o.readUint(r,i);i+=4,h[f]={offset:g,length:v}}for(d=0;d<c.length;d++){var p=c[d];h[p]&&(u[p.trim()]=e[p.trim()].parse(r,h[p].offset,h[p].length,u))}return u},_tabOffset:function(r,i,o){for(var s=e._bin,l=s.readUshort(r,o+4),c=o+12,u=0;u<l;u++){var h=s.readASCII(r,c,4);c+=4,s.readUint(r,c),c+=4;var d=s.readUint(r,c);if(c+=4,s.readUint(r,c),c+=4,h==i)return d}return 0}};e._bin={readFixed:function(r,i){return(r[i]<<8|r[i+1])+(r[i+2]<<8|r[i+3])/65540},readF2dot14:function(r,i){return e._bin.readShort(r,i)/16384},readInt:function(r,i){return e._bin._view(r).getInt32(i)},readInt8:function(r,i){return e._bin._view(r).getInt8(i)},readShort:function(r,i){return e._bin._view(r).getInt16(i)},readUshort:function(r,i){return e._bin._view(r).getUint16(i)},readUshorts:function(r,i,o){for(var s=[],l=0;l<o;l++)s.push(e._bin.readUshort(r,i+2*l));return s},readUint:function(r,i){return e._bin._view(r).getUint32(i)},readUint64:function(r,i){return 4294967296*e._bin.readUint(r,i)+e._bin.readUint(r,i+4)},readASCII:function(r,i,o){for(var s="",l=0;l<o;l++)s+=String.fromCharCode(r[i+l]);return s},readUnicode:function(r,i,o){for(var s="",l=0;l<o;l++){var c=r[i++]<<8|r[i++];s+=String.fromCharCode(c)}return s},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(r,i,o){var s=e._bin._tdec;return s&&i==0&&o==r.length?s.decode(r):e._bin.readASCII(r,i,o)},readBytes:function(r,i,o){for(var s=[],l=0;l<o;l++)s.push(r[i+l]);return s},readASCIIArray:function(r,i,o){for(var s=[],l=0;l<o;l++)s.push(String.fromCharCode(r[i+l]));return s},_view:function(r){return r._dataView||(r._dataView=r.buffer?new DataView(r.buffer,r.byteOffset,r.byteLength):new DataView(new Uint8Array(r).buffer))}},e._lctf={},e._lctf.parse=function(r,i,o,s,l){var c=e._bin,u={},h=i;c.readFixed(r,i),i+=4;var d=c.readUshort(r,i);i+=2;var f=c.readUshort(r,i);i+=2;var g=c.readUshort(r,i);return i+=2,u.scriptList=e._lctf.readScriptList(r,h+d),u.featureList=e._lctf.readFeatureList(r,h+f),u.lookupList=e._lctf.readLookupList(r,h+g,l),u},e._lctf.readLookupList=function(r,i,o){var s=e._bin,l=i,c=[],u=s.readUshort(r,i);i+=2;for(var h=0;h<u;h++){var d=s.readUshort(r,i);i+=2;var f=e._lctf.readLookupTable(r,l+d,o);c.push(f)}return c},e._lctf.readLookupTable=function(r,i,o){var s=e._bin,l=i,c={tabs:[]};c.ltype=s.readUshort(r,i),i+=2,c.flag=s.readUshort(r,i),i+=2;var u=s.readUshort(r,i);i+=2;for(var h=c.ltype,d=0;d<u;d++){var f=s.readUshort(r,i);i+=2;var g=o(r,h,l+f,c);c.tabs.push(g)}return c},e._lctf.numOfOnes=function(r){for(var i=0,o=0;o<32;o++)r>>>o&1&&i++;return i},e._lctf.readClassDef=function(r,i){var o=e._bin,s=[],l=o.readUshort(r,i);if(i+=2,l==1){var c=o.readUshort(r,i);i+=2;var u=o.readUshort(r,i);i+=2;for(var h=0;h<u;h++)s.push(c+h),s.push(c+h),s.push(o.readUshort(r,i)),i+=2}if(l==2){var d=o.readUshort(r,i);for(i+=2,h=0;h<d;h++)s.push(o.readUshort(r,i)),i+=2,s.push(o.readUshort(r,i)),i+=2,s.push(o.readUshort(r,i)),i+=2}return s},e._lctf.getInterval=function(r,i){for(var o=0;o<r.length;o+=3){var s=r[o],l=r[o+1];if(r[o+2],s<=i&&i<=l)return o}return-1},e._lctf.readCoverage=function(r,i){var o=e._bin,s={};s.fmt=o.readUshort(r,i),i+=2;var l=o.readUshort(r,i);return i+=2,s.fmt==1&&(s.tab=o.readUshorts(r,i,l)),s.fmt==2&&(s.tab=o.readUshorts(r,i,3*l)),s},e._lctf.coverageIndex=function(r,i){var o=r.tab;if(r.fmt==1)return o.indexOf(i);if(r.fmt==2){var s=e._lctf.getInterval(o,i);if(s!=-1)return o[s+2]+(i-o[s])}return-1},e._lctf.readFeatureList=function(r,i){var o=e._bin,s=i,l=[],c=o.readUshort(r,i);i+=2;for(var u=0;u<c;u++){var h=o.readASCII(r,i,4);i+=4;var d=o.readUshort(r,i);i+=2;var f=e._lctf.readFeatureTable(r,s+d);f.tag=h.trim(),l.push(f)}return l},e._lctf.readFeatureTable=function(r,i){var o=e._bin,s=i,l={},c=o.readUshort(r,i);i+=2,c>0&&(l.featureParams=s+c);var u=o.readUshort(r,i);i+=2,l.tab=[];for(var h=0;h<u;h++)l.tab.push(o.readUshort(r,i+2*h));return l},e._lctf.readScriptList=function(r,i){var o=e._bin,s=i,l={},c=o.readUshort(r,i);i+=2;for(var u=0;u<c;u++){var h=o.readASCII(r,i,4);i+=4;var d=o.readUshort(r,i);i+=2,l[h.trim()]=e._lctf.readScriptTable(r,s+d)}return l},e._lctf.readScriptTable=function(r,i){var o=e._bin,s=i,l={},c=o.readUshort(r,i);i+=2,c>0&&(l.default=e._lctf.readLangSysTable(r,s+c));var u=o.readUshort(r,i);i+=2;for(var h=0;h<u;h++){var d=o.readASCII(r,i,4);i+=4;var f=o.readUshort(r,i);i+=2,l[d.trim()]=e._lctf.readLangSysTable(r,s+f)}return l},e._lctf.readLangSysTable=function(r,i){var o=e._bin,s={};o.readUshort(r,i),i+=2,s.reqFeature=o.readUshort(r,i),i+=2;var l=o.readUshort(r,i);return i+=2,s.features=o.readUshorts(r,i,l),s},e.CFF={},e.CFF.parse=function(r,i,o){var s=e._bin;(r=new Uint8Array(r.buffer,i,o))[i=0],r[++i],r[++i],r[++i],i++;var l=[];i=e.CFF.readIndex(r,i,l);for(var c=[],u=0;u<l.length-1;u++)c.push(s.readASCII(r,i+l[u],l[u+1]-l[u]));i+=l[l.length-1];var h=[];i=e.CFF.readIndex(r,i,h);var d=[];for(u=0;u<h.length-1;u++)d.push(e.CFF.readDict(r,i+h[u],i+h[u+1]));i+=h[h.length-1];var f=d[0],g=[];i=e.CFF.readIndex(r,i,g);var v=[];for(u=0;u<g.length-1;u++)v.push(s.readASCII(r,i+g[u],g[u+1]-g[u]));if(i+=g[g.length-1],e.CFF.readSubrs(r,i,f),f.CharStrings){i=f.CharStrings,g=[],i=e.CFF.readIndex(r,i,g);var p=[];for(u=0;u<g.length-1;u++)p.push(s.readBytes(r,i+g[u],g[u+1]-g[u]));f.CharStrings=p}if(f.ROS){i=f.FDArray;var m=[];for(i=e.CFF.readIndex(r,i,m),f.FDArray=[],u=0;u<m.length-1;u++){var T=e.CFF.readDict(r,i+m[u],i+m[u+1]);e.CFF._readFDict(r,T,v),f.FDArray.push(T)}i+=m[m.length-1],i=f.FDSelect,f.FDSelect=[];var _=r[i];if(i++,_!=3)throw _;var S=s.readUshort(r,i);for(i+=2,u=0;u<S+1;u++)f.FDSelect.push(s.readUshort(r,i),r[i+2]),i+=3}return f.Encoding&&(f.Encoding=e.CFF.readEncoding(r,f.Encoding,f.CharStrings.length)),f.charset&&(f.charset=e.CFF.readCharset(r,f.charset,f.CharStrings.length)),e.CFF._readFDict(r,f,v),f},e.CFF._readFDict=function(r,i,o){var s;for(var l in i.Private&&(s=i.Private[1],i.Private=e.CFF.readDict(r,s,s+i.Private[0]),i.Private.Subrs&&e.CFF.readSubrs(r,s+i.Private.Subrs,i.Private)),i)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(l)!=-1&&(i[l]=o[i[l]-426+35])},e.CFF.readSubrs=function(r,i,o){var s=e._bin,l=[];i=e.CFF.readIndex(r,i,l);var c,u=l.length;c=u<1240?107:u<33900?1131:32768,o.Bias=c,o.Subrs=[];for(var h=0;h<l.length-1;h++)o.Subrs.push(s.readBytes(r,i+l[h],l[h+1]-l[h]))},e.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],e.CFF.glyphByUnicode=function(r,i){for(var o=0;o<r.charset.length;o++)if(r.charset[o]==i)return o;return-1},e.CFF.glyphBySE=function(r,i){return i<0||i>255?-1:e.CFF.glyphByUnicode(r,e.CFF.tableSE[i])},e.CFF.readEncoding=function(r,i,o){e._bin;var s=[".notdef"],l=r[i];if(i++,l!=0)throw"error: unknown encoding format: "+l;var c=r[i];i++;for(var u=0;u<c;u++)s.push(r[i+u]);return s},e.CFF.readCharset=function(r,i,o){var s=e._bin,l=[".notdef"],c=r[i];if(i++,c==0)for(var u=0;u<o;u++){var h=s.readUshort(r,i);i+=2,l.push(h)}else{if(c!=1&&c!=2)throw"error: format: "+c;for(;l.length<o;){h=s.readUshort(r,i),i+=2;var d=0;for(c==1?(d=r[i],i++):(d=s.readUshort(r,i),i+=2),u=0;u<=d;u++)l.push(h),h++}}return l},e.CFF.readIndex=function(r,i,o){var s=e._bin,l=s.readUshort(r,i)+1,c=r[i+=2];if(i++,c==1)for(var u=0;u<l;u++)o.push(r[i+u]);else if(c==2)for(u=0;u<l;u++)o.push(s.readUshort(r,i+2*u));else if(c==3)for(u=0;u<l;u++)o.push(16777215&s.readUint(r,i+3*u-1));else if(l!=1)throw"unsupported offset size: "+c+", count: "+l;return(i+=l*c)-1},e.CFF.getCharString=function(r,i,o){var s=e._bin,l=r[i],c=r[i+1];r[i+2],r[i+3],r[i+4];var u=1,h=null,d=null;l<=20&&(h=l,u=1),l==12&&(h=100*l+c,u=2),21<=l&&l<=27&&(h=l,u=1),l==28&&(d=s.readShort(r,i+1),u=3),29<=l&&l<=31&&(h=l,u=1),32<=l&&l<=246&&(d=l-139,u=1),247<=l&&l<=250&&(d=256*(l-247)+c+108,u=2),251<=l&&l<=254&&(d=256*-(l-251)-c-108,u=2),l==255&&(d=s.readInt(r,i+1)/65535,u=5),o.val=d??"o"+h,o.size=u},e.CFF.readCharString=function(r,i,o){for(var s=i+o,l=e._bin,c=[];i<s;){var u=r[i],h=r[i+1];r[i+2],r[i+3],r[i+4];var d=1,f=null,g=null;u<=20&&(f=u,d=1),u==12&&(f=100*u+h,d=2),u!=19&&u!=20||(f=u,d=2),21<=u&&u<=27&&(f=u,d=1),u==28&&(g=l.readShort(r,i+1),d=3),29<=u&&u<=31&&(f=u,d=1),32<=u&&u<=246&&(g=u-139,d=1),247<=u&&u<=250&&(g=256*(u-247)+h+108,d=2),251<=u&&u<=254&&(g=256*-(u-251)-h-108,d=2),u==255&&(g=l.readInt(r,i+1)/65535,d=5),c.push(g??"o"+f),i+=d}return c},e.CFF.readDict=function(r,i,o){for(var s=e._bin,l={},c=[];i<o;){var u=r[i],h=r[i+1];r[i+2],r[i+3],r[i+4];var d=1,f=null,g=null;if(u==28&&(g=s.readShort(r,i+1),d=3),u==29&&(g=s.readInt(r,i+1),d=5),32<=u&&u<=246&&(g=u-139,d=1),247<=u&&u<=250&&(g=256*(u-247)+h+108,d=2),251<=u&&u<=254&&(g=256*-(u-251)-h-108,d=2),u==255)throw g=s.readInt(r,i+1)/65535,d=5,"unknown number";if(u==30){var v=[];for(d=1;;){var p=r[i+d];d++;var m=p>>4,T=15&p;if(m!=15&&v.push(m),T!=15&&v.push(T),T==15)break}for(var _="",S=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],R=0;R<v.length;R++)_+=S[v[R]];g=parseFloat(_)}u<=21&&(f=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][u],d=1,u==12&&(f=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][h],d=2)),f!=null?(l[f]=c.length==1?c[0]:c,c=[]):c.push(g),i+=d}return l},e.cmap={},e.cmap.parse=function(r,i,o){r=new Uint8Array(r.buffer,i,o),i=0;var s=e._bin,l={};s.readUshort(r,i),i+=2;var c=s.readUshort(r,i);i+=2;var u=[];l.tables=[];for(var h=0;h<c;h++){var d=s.readUshort(r,i);i+=2;var f=s.readUshort(r,i);i+=2;var g=s.readUint(r,i);i+=4;var v="p"+d+"e"+f,p=u.indexOf(g);if(p==-1){var m;p=l.tables.length,u.push(g);var T=s.readUshort(r,g);T==0?m=e.cmap.parse0(r,g):T==4?m=e.cmap.parse4(r,g):T==6?m=e.cmap.parse6(r,g):T==12?m=e.cmap.parse12(r,g):console.debug("unknown format: "+T,d,f,g),l.tables.push(m)}if(l[v]!=null)throw"multiple tables for one platform+encoding";l[v]=p}return l},e.cmap.parse0=function(r,i){var o=e._bin,s={};s.format=o.readUshort(r,i),i+=2;var l=o.readUshort(r,i);i+=2,o.readUshort(r,i),i+=2,s.map=[];for(var c=0;c<l-6;c++)s.map.push(r[i+c]);return s},e.cmap.parse4=function(r,i){var o=e._bin,s=i,l={};l.format=o.readUshort(r,i),i+=2;var c=o.readUshort(r,i);i+=2,o.readUshort(r,i),i+=2;var u=o.readUshort(r,i);i+=2;var h=u/2;l.searchRange=o.readUshort(r,i),i+=2,l.entrySelector=o.readUshort(r,i),i+=2,l.rangeShift=o.readUshort(r,i),i+=2,l.endCount=o.readUshorts(r,i,h),i+=2*h,i+=2,l.startCount=o.readUshorts(r,i,h),i+=2*h,l.idDelta=[];for(var d=0;d<h;d++)l.idDelta.push(o.readShort(r,i)),i+=2;for(l.idRangeOffset=o.readUshorts(r,i,h),i+=2*h,l.glyphIdArray=[];i<s+c;)l.glyphIdArray.push(o.readUshort(r,i)),i+=2;return l},e.cmap.parse6=function(r,i){var o=e._bin,s={};s.format=o.readUshort(r,i),i+=2,o.readUshort(r,i),i+=2,o.readUshort(r,i),i+=2,s.firstCode=o.readUshort(r,i),i+=2;var l=o.readUshort(r,i);i+=2,s.glyphIdArray=[];for(var c=0;c<l;c++)s.glyphIdArray.push(o.readUshort(r,i)),i+=2;return s},e.cmap.parse12=function(r,i){var o=e._bin,s={};s.format=o.readUshort(r,i),i+=2,i+=2,o.readUint(r,i),i+=4,o.readUint(r,i),i+=4;var l=o.readUint(r,i);i+=4,s.groups=[];for(var c=0;c<l;c++){var u=i+12*c,h=o.readUint(r,u+0),d=o.readUint(r,u+4),f=o.readUint(r,u+8);s.groups.push([h,d,f])}return s},e.glyf={},e.glyf.parse=function(r,i,o,s){for(var l=[],c=0;c<s.maxp.numGlyphs;c++)l.push(null);return l},e.glyf._parseGlyf=function(r,i){var o=e._bin,s=r._data,l=e._tabOffset(s,"glyf",r._offset)+r.loca[i];if(r.loca[i]==r.loca[i+1])return null;var c={};if(c.noc=o.readShort(s,l),l+=2,c.xMin=o.readShort(s,l),l+=2,c.yMin=o.readShort(s,l),l+=2,c.xMax=o.readShort(s,l),l+=2,c.yMax=o.readShort(s,l),l+=2,c.xMin>=c.xMax||c.yMin>=c.yMax)return null;if(c.noc>0){c.endPts=[];for(var u=0;u<c.noc;u++)c.endPts.push(o.readUshort(s,l)),l+=2;var h=o.readUshort(s,l);if(l+=2,s.length-l<h)return null;c.instructions=o.readBytes(s,l,h),l+=h;var d=c.endPts[c.noc-1]+1;for(c.flags=[],u=0;u<d;u++){var f=s[l];if(l++,c.flags.push(f),(8&f)!=0){var g=s[l];l++;for(var v=0;v<g;v++)c.flags.push(f),u++}}for(c.xs=[],u=0;u<d;u++){var p=(2&c.flags[u])!=0,m=(16&c.flags[u])!=0;p?(c.xs.push(m?s[l]:-s[l]),l++):m?c.xs.push(0):(c.xs.push(o.readShort(s,l)),l+=2)}for(c.ys=[],u=0;u<d;u++)p=(4&c.flags[u])!=0,m=(32&c.flags[u])!=0,p?(c.ys.push(m?s[l]:-s[l]),l++):m?c.ys.push(0):(c.ys.push(o.readShort(s,l)),l+=2);var T=0,_=0;for(u=0;u<d;u++)T+=c.xs[u],_+=c.ys[u],c.xs[u]=T,c.ys[u]=_}else{var S;c.parts=[];do{S=o.readUshort(s,l),l+=2;var R={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(c.parts.push(R),R.glyphIndex=o.readUshort(s,l),l+=2,1&S){var A=o.readShort(s,l);l+=2;var M=o.readShort(s,l);l+=2}else A=o.readInt8(s,l),l++,M=o.readInt8(s,l),l++;2&S?(R.m.tx=A,R.m.ty=M):(R.p1=A,R.p2=M),8&S?(R.m.a=R.m.d=o.readF2dot14(s,l),l+=2):64&S?(R.m.a=o.readF2dot14(s,l),l+=2,R.m.d=o.readF2dot14(s,l),l+=2):128&S&&(R.m.a=o.readF2dot14(s,l),l+=2,R.m.b=o.readF2dot14(s,l),l+=2,R.m.c=o.readF2dot14(s,l),l+=2,R.m.d=o.readF2dot14(s,l),l+=2)}while(32&S);if(256&S){var L=o.readUshort(s,l);for(l+=2,c.instr=[],u=0;u<L;u++)c.instr.push(s[l]),l++}}return c},e.GDEF={},e.GDEF.parse=function(r,i,o,s){var l=i;i+=4;var c=e._bin.readUshort(r,i);return{glyphClassDef:c===0?null:e._lctf.readClassDef(r,l+c)}},e.GPOS={},e.GPOS.parse=function(r,i,o,s){return e._lctf.parse(r,i,o,s,e.GPOS.subt)},e.GPOS.subt=function(r,i,o,s){var l=e._bin,c=o,u={};if(u.fmt=l.readUshort(r,o),o+=2,i==1||i==2||i==3||i==7||i==8&&u.fmt<=2){var h=l.readUshort(r,o);o+=2,u.coverage=e._lctf.readCoverage(r,h+c)}if(i==1&&u.fmt==1){var d=l.readUshort(r,o);o+=2,d!=0&&(u.pos=e.GPOS.readValueRecord(r,o,d))}else if(i==2&&u.fmt>=1&&u.fmt<=2){d=l.readUshort(r,o),o+=2;var f=l.readUshort(r,o);o+=2;var g=e._lctf.numOfOnes(d),v=e._lctf.numOfOnes(f);if(u.fmt==1){u.pairsets=[];var p=l.readUshort(r,o);o+=2;for(var m=0;m<p;m++){var T=c+l.readUshort(r,o);o+=2;var _=l.readUshort(r,T);T+=2;for(var S=[],R=0;R<_;R++){var A=l.readUshort(r,T);T+=2,d!=0&&(U=e.GPOS.readValueRecord(r,T,d),T+=2*g),f!=0&&(B=e.GPOS.readValueRecord(r,T,f),T+=2*v),S.push({gid2:A,val1:U,val2:B})}u.pairsets.push(S)}}if(u.fmt==2){var M=l.readUshort(r,o);o+=2;var L=l.readUshort(r,o);o+=2;var H=l.readUshort(r,o);o+=2;var x=l.readUshort(r,o);for(o+=2,u.classDef1=e._lctf.readClassDef(r,c+M),u.classDef2=e._lctf.readClassDef(r,c+L),u.matrix=[],m=0;m<H;m++){var E=[];for(R=0;R<x;R++){var U=null,B=null;d!=0&&(U=e.GPOS.readValueRecord(r,o,d),o+=2*g),f!=0&&(B=e.GPOS.readValueRecord(r,o,f),o+=2*v),E.push({val1:U,val2:B})}u.matrix.push(E)}}}else if(i==4&&u.fmt==1)u.markCoverage=e._lctf.readCoverage(r,l.readUshort(r,o)+c),u.baseCoverage=e._lctf.readCoverage(r,l.readUshort(r,o+2)+c),u.markClassCount=l.readUshort(r,o+4),u.markArray=e.GPOS.readMarkArray(r,l.readUshort(r,o+6)+c),u.baseArray=e.GPOS.readBaseArray(r,l.readUshort(r,o+8)+c,u.markClassCount);else if(i==6&&u.fmt==1)u.mark1Coverage=e._lctf.readCoverage(r,l.readUshort(r,o)+c),u.mark2Coverage=e._lctf.readCoverage(r,l.readUshort(r,o+2)+c),u.markClassCount=l.readUshort(r,o+4),u.mark1Array=e.GPOS.readMarkArray(r,l.readUshort(r,o+6)+c),u.mark2Array=e.GPOS.readBaseArray(r,l.readUshort(r,o+8)+c,u.markClassCount);else{if(i==9&&u.fmt==1){var C=l.readUshort(r,o);o+=2;var V=l.readUint(r,o);if(o+=4,s.ltype==9)s.ltype=C;else if(s.ltype!=C)throw"invalid extension substitution";return e.GPOS.subt(r,s.ltype,c+V)}console.debug("unsupported GPOS table LookupType",i,"format",u.fmt)}return u},e.GPOS.readValueRecord=function(r,i,o){var s=e._bin,l=[];return l.push(1&o?s.readShort(r,i):0),i+=1&o?2:0,l.push(2&o?s.readShort(r,i):0),i+=2&o?2:0,l.push(4&o?s.readShort(r,i):0),i+=4&o?2:0,l.push(8&o?s.readShort(r,i):0),i+=8&o?2:0,l},e.GPOS.readBaseArray=function(r,i,o){var s=e._bin,l=[],c=i,u=s.readUshort(r,i);i+=2;for(var h=0;h<u;h++){for(var d=[],f=0;f<o;f++)d.push(e.GPOS.readAnchorRecord(r,c+s.readUshort(r,i))),i+=2;l.push(d)}return l},e.GPOS.readMarkArray=function(r,i){var o=e._bin,s=[],l=i,c=o.readUshort(r,i);i+=2;for(var u=0;u<c;u++){var h=e.GPOS.readAnchorRecord(r,o.readUshort(r,i+2)+l);h.markClass=o.readUshort(r,i),s.push(h),i+=4}return s},e.GPOS.readAnchorRecord=function(r,i){var o=e._bin,s={};return s.fmt=o.readUshort(r,i),s.x=o.readShort(r,i+2),s.y=o.readShort(r,i+4),s},e.GSUB={},e.GSUB.parse=function(r,i,o,s){return e._lctf.parse(r,i,o,s,e.GSUB.subt)},e.GSUB.subt=function(r,i,o,s){var l=e._bin,c=o,u={};if(u.fmt=l.readUshort(r,o),o+=2,i!=1&&i!=2&&i!=4&&i!=5&&i!=6)return null;if(i==1||i==2||i==4||i==5&&u.fmt<=2||i==6&&u.fmt<=2){var h=l.readUshort(r,o);o+=2,u.coverage=e._lctf.readCoverage(r,c+h)}if(i==1&&u.fmt>=1&&u.fmt<=2){if(u.fmt==1)u.delta=l.readShort(r,o),o+=2;else if(u.fmt==2){var d=l.readUshort(r,o);o+=2,u.newg=l.readUshorts(r,o,d),o+=2*u.newg.length}}else if(i==2&&u.fmt==1){d=l.readUshort(r,o),o+=2,u.seqs=[];for(var f=0;f<d;f++){var g=l.readUshort(r,o)+c;o+=2;var v=l.readUshort(r,g);u.seqs.push(l.readUshorts(r,g+2,v))}}else if(i==4)for(u.vals=[],d=l.readUshort(r,o),o+=2,f=0;f<d;f++){var p=l.readUshort(r,o);o+=2,u.vals.push(e.GSUB.readLigatureSet(r,c+p))}else if(i==5&&u.fmt==2){if(u.fmt==2){var m=l.readUshort(r,o);o+=2,u.cDef=e._lctf.readClassDef(r,c+m),u.scset=[];var T=l.readUshort(r,o);for(o+=2,f=0;f<T;f++){var _=l.readUshort(r,o);o+=2,u.scset.push(_==0?null:e.GSUB.readSubClassSet(r,c+_))}}}else if(i==6&&u.fmt==3){if(u.fmt==3){for(f=0;f<3;f++){d=l.readUshort(r,o),o+=2;for(var S=[],R=0;R<d;R++)S.push(e._lctf.readCoverage(r,c+l.readUshort(r,o+2*R)));o+=2*d,f==0&&(u.backCvg=S),f==1&&(u.inptCvg=S),f==2&&(u.ahedCvg=S)}d=l.readUshort(r,o),o+=2,u.lookupRec=e.GSUB.readSubstLookupRecords(r,o,d)}}else{if(i==7&&u.fmt==1){var A=l.readUshort(r,o);o+=2;var M=l.readUint(r,o);if(o+=4,s.ltype==9)s.ltype=A;else if(s.ltype!=A)throw"invalid extension substitution";return e.GSUB.subt(r,s.ltype,c+M)}console.debug("unsupported GSUB table LookupType",i,"format",u.fmt)}return u},e.GSUB.readSubClassSet=function(r,i){var o=e._bin.readUshort,s=i,l=[],c=o(r,i);i+=2;for(var u=0;u<c;u++){var h=o(r,i);i+=2,l.push(e.GSUB.readSubClassRule(r,s+h))}return l},e.GSUB.readSubClassRule=function(r,i){var o=e._bin.readUshort,s={},l=o(r,i),c=o(r,i+=2);i+=2,s.input=[];for(var u=0;u<l-1;u++)s.input.push(o(r,i)),i+=2;return s.substLookupRecords=e.GSUB.readSubstLookupRecords(r,i,c),s},e.GSUB.readSubstLookupRecords=function(r,i,o){for(var s=e._bin.readUshort,l=[],c=0;c<o;c++)l.push(s(r,i),s(r,i+2)),i+=4;return l},e.GSUB.readChainSubClassSet=function(r,i){var o=e._bin,s=i,l=[],c=o.readUshort(r,i);i+=2;for(var u=0;u<c;u++){var h=o.readUshort(r,i);i+=2,l.push(e.GSUB.readChainSubClassRule(r,s+h))}return l},e.GSUB.readChainSubClassRule=function(r,i){for(var o=e._bin,s={},l=["backtrack","input","lookahead"],c=0;c<l.length;c++){var u=o.readUshort(r,i);i+=2,c==1&&u--,s[l[c]]=o.readUshorts(r,i,u),i+=2*s[l[c]].length}return u=o.readUshort(r,i),i+=2,s.subst=o.readUshorts(r,i,2*u),i+=2*s.subst.length,s},e.GSUB.readLigatureSet=function(r,i){var o=e._bin,s=i,l=[],c=o.readUshort(r,i);i+=2;for(var u=0;u<c;u++){var h=o.readUshort(r,i);i+=2,l.push(e.GSUB.readLigature(r,s+h))}return l},e.GSUB.readLigature=function(r,i){var o=e._bin,s={chain:[]};s.nglyph=o.readUshort(r,i),i+=2;var l=o.readUshort(r,i);i+=2;for(var c=0;c<l-1;c++)s.chain.push(o.readUshort(r,i)),i+=2;return s},e.head={},e.head.parse=function(r,i,o){var s=e._bin,l={};return s.readFixed(r,i),i+=4,l.fontRevision=s.readFixed(r,i),i+=4,s.readUint(r,i),i+=4,s.readUint(r,i),i+=4,l.flags=s.readUshort(r,i),i+=2,l.unitsPerEm=s.readUshort(r,i),i+=2,l.created=s.readUint64(r,i),i+=8,l.modified=s.readUint64(r,i),i+=8,l.xMin=s.readShort(r,i),i+=2,l.yMin=s.readShort(r,i),i+=2,l.xMax=s.readShort(r,i),i+=2,l.yMax=s.readShort(r,i),i+=2,l.macStyle=s.readUshort(r,i),i+=2,l.lowestRecPPEM=s.readUshort(r,i),i+=2,l.fontDirectionHint=s.readShort(r,i),i+=2,l.indexToLocFormat=s.readShort(r,i),i+=2,l.glyphDataFormat=s.readShort(r,i),i+=2,l},e.hhea={},e.hhea.parse=function(r,i,o){var s=e._bin,l={};return s.readFixed(r,i),i+=4,l.ascender=s.readShort(r,i),i+=2,l.descender=s.readShort(r,i),i+=2,l.lineGap=s.readShort(r,i),i+=2,l.advanceWidthMax=s.readUshort(r,i),i+=2,l.minLeftSideBearing=s.readShort(r,i),i+=2,l.minRightSideBearing=s.readShort(r,i),i+=2,l.xMaxExtent=s.readShort(r,i),i+=2,l.caretSlopeRise=s.readShort(r,i),i+=2,l.caretSlopeRun=s.readShort(r,i),i+=2,l.caretOffset=s.readShort(r,i),i+=2,i+=8,l.metricDataFormat=s.readShort(r,i),i+=2,l.numberOfHMetrics=s.readUshort(r,i),i+=2,l},e.hmtx={},e.hmtx.parse=function(r,i,o,s){for(var l=e._bin,c={aWidth:[],lsBearing:[]},u=0,h=0,d=0;d<s.maxp.numGlyphs;d++)d<s.hhea.numberOfHMetrics&&(u=l.readUshort(r,i),i+=2,h=l.readShort(r,i),i+=2),c.aWidth.push(u),c.lsBearing.push(h);return c},e.kern={},e.kern.parse=function(r,i,o,s){var l=e._bin,c=l.readUshort(r,i);if(i+=2,c==1)return e.kern.parseV1(r,i-2,o,s);var u=l.readUshort(r,i);i+=2;for(var h={glyph1:[],rval:[]},d=0;d<u;d++){i+=2,o=l.readUshort(r,i),i+=2;var f=l.readUshort(r,i);i+=2;var g=f>>>8;if((g&=15)!=0)throw"unknown kern table format: "+g;i=e.kern.readFormat0(r,i,h)}return h},e.kern.parseV1=function(r,i,o,s){var l=e._bin;l.readFixed(r,i),i+=4;var c=l.readUint(r,i);i+=4;for(var u={glyph1:[],rval:[]},h=0;h<c;h++){l.readUint(r,i),i+=4;var d=l.readUshort(r,i);i+=2,l.readUshort(r,i),i+=2;var f=d>>>8;if((f&=15)!=0)throw"unknown kern table format: "+f;i=e.kern.readFormat0(r,i,u)}return u},e.kern.readFormat0=function(r,i,o){var s=e._bin,l=-1,c=s.readUshort(r,i);i+=2,s.readUshort(r,i),i+=2,s.readUshort(r,i),i+=2,s.readUshort(r,i),i+=2;for(var u=0;u<c;u++){var h=s.readUshort(r,i);i+=2;var d=s.readUshort(r,i);i+=2;var f=s.readShort(r,i);i+=2,h!=l&&(o.glyph1.push(h),o.rval.push({glyph2:[],vals:[]}));var g=o.rval[o.rval.length-1];g.glyph2.push(d),g.vals.push(f),l=h}return i},e.loca={},e.loca.parse=function(r,i,o,s){var l=e._bin,c=[],u=s.head.indexToLocFormat,h=s.maxp.numGlyphs+1;if(u==0)for(var d=0;d<h;d++)c.push(l.readUshort(r,i+(d<<1))<<1);if(u==1)for(d=0;d<h;d++)c.push(l.readUint(r,i+(d<<2)));return c},e.maxp={},e.maxp.parse=function(r,i,o){var s=e._bin,l={},c=s.readUint(r,i);return i+=4,l.numGlyphs=s.readUshort(r,i),i+=2,c==65536&&(l.maxPoints=s.readUshort(r,i),i+=2,l.maxContours=s.readUshort(r,i),i+=2,l.maxCompositePoints=s.readUshort(r,i),i+=2,l.maxCompositeContours=s.readUshort(r,i),i+=2,l.maxZones=s.readUshort(r,i),i+=2,l.maxTwilightPoints=s.readUshort(r,i),i+=2,l.maxStorage=s.readUshort(r,i),i+=2,l.maxFunctionDefs=s.readUshort(r,i),i+=2,l.maxInstructionDefs=s.readUshort(r,i),i+=2,l.maxStackElements=s.readUshort(r,i),i+=2,l.maxSizeOfInstructions=s.readUshort(r,i),i+=2,l.maxComponentElements=s.readUshort(r,i),i+=2,l.maxComponentDepth=s.readUshort(r,i),i+=2),l},e.name={},e.name.parse=function(r,i,o){var s=e._bin,l={};s.readUshort(r,i),i+=2;var c=s.readUshort(r,i);i+=2,s.readUshort(r,i);for(var u,h=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],d=i+=2,f=0;f<c;f++){var g=s.readUshort(r,i);i+=2;var v=s.readUshort(r,i);i+=2;var p=s.readUshort(r,i);i+=2;var m=s.readUshort(r,i);i+=2;var T=s.readUshort(r,i);i+=2;var _=s.readUshort(r,i);i+=2;var S,R=h[m],A=d+12*c+_;if(g==0)S=s.readUnicode(r,A,T/2);else if(g==3&&v==0)S=s.readUnicode(r,A,T/2);else if(v==0)S=s.readASCII(r,A,T);else if(v==1)S=s.readUnicode(r,A,T/2);else if(v==3)S=s.readUnicode(r,A,T/2);else{if(g!=1)throw"unknown encoding "+v+", platformID: "+g;S=s.readASCII(r,A,T),console.debug("reading unknown MAC encoding "+v+" as ASCII")}var M="p"+g+","+p.toString(16);l[M]==null&&(l[M]={}),l[M][R!==void 0?R:m]=S,l[M]._lang=p}for(var L in l)if(l[L].postScriptName!=null&&l[L]._lang==1033)return l[L];for(var L in l)if(l[L].postScriptName!=null&&l[L]._lang==0)return l[L];for(var L in l)if(l[L].postScriptName!=null&&l[L]._lang==3084)return l[L];for(var L in l)if(l[L].postScriptName!=null)return l[L];for(var L in l){u=L;break}return console.debug("returning name table with languageID "+l[u]._lang),l[u]},e["OS/2"]={},e["OS/2"].parse=function(r,i,o){var s=e._bin.readUshort(r,i);i+=2;var l={};if(s==0)e["OS/2"].version0(r,i,l);else if(s==1)e["OS/2"].version1(r,i,l);else if(s==2||s==3||s==4)e["OS/2"].version2(r,i,l);else{if(s!=5)throw"unknown OS/2 table version: "+s;e["OS/2"].version5(r,i,l)}return l},e["OS/2"].version0=function(r,i,o){var s=e._bin;return o.xAvgCharWidth=s.readShort(r,i),i+=2,o.usWeightClass=s.readUshort(r,i),i+=2,o.usWidthClass=s.readUshort(r,i),i+=2,o.fsType=s.readUshort(r,i),i+=2,o.ySubscriptXSize=s.readShort(r,i),i+=2,o.ySubscriptYSize=s.readShort(r,i),i+=2,o.ySubscriptXOffset=s.readShort(r,i),i+=2,o.ySubscriptYOffset=s.readShort(r,i),i+=2,o.ySuperscriptXSize=s.readShort(r,i),i+=2,o.ySuperscriptYSize=s.readShort(r,i),i+=2,o.ySuperscriptXOffset=s.readShort(r,i),i+=2,o.ySuperscriptYOffset=s.readShort(r,i),i+=2,o.yStrikeoutSize=s.readShort(r,i),i+=2,o.yStrikeoutPosition=s.readShort(r,i),i+=2,o.sFamilyClass=s.readShort(r,i),i+=2,o.panose=s.readBytes(r,i,10),i+=10,o.ulUnicodeRange1=s.readUint(r,i),i+=4,o.ulUnicodeRange2=s.readUint(r,i),i+=4,o.ulUnicodeRange3=s.readUint(r,i),i+=4,o.ulUnicodeRange4=s.readUint(r,i),i+=4,o.achVendID=[s.readInt8(r,i),s.readInt8(r,i+1),s.readInt8(r,i+2),s.readInt8(r,i+3)],i+=4,o.fsSelection=s.readUshort(r,i),i+=2,o.usFirstCharIndex=s.readUshort(r,i),i+=2,o.usLastCharIndex=s.readUshort(r,i),i+=2,o.sTypoAscender=s.readShort(r,i),i+=2,o.sTypoDescender=s.readShort(r,i),i+=2,o.sTypoLineGap=s.readShort(r,i),i+=2,o.usWinAscent=s.readUshort(r,i),i+=2,o.usWinDescent=s.readUshort(r,i),i+=2},e["OS/2"].version1=function(r,i,o){var s=e._bin;return i=e["OS/2"].version0(r,i,o),o.ulCodePageRange1=s.readUint(r,i),i+=4,o.ulCodePageRange2=s.readUint(r,i),i+=4},e["OS/2"].version2=function(r,i,o){var s=e._bin;return i=e["OS/2"].version1(r,i,o),o.sxHeight=s.readShort(r,i),i+=2,o.sCapHeight=s.readShort(r,i),i+=2,o.usDefault=s.readUshort(r,i),i+=2,o.usBreak=s.readUshort(r,i),i+=2,o.usMaxContext=s.readUshort(r,i),i+=2},e["OS/2"].version5=function(r,i,o){var s=e._bin;return i=e["OS/2"].version2(r,i,o),o.usLowerOpticalPointSize=s.readUshort(r,i),i+=2,o.usUpperOpticalPointSize=s.readUshort(r,i),i+=2},e.post={},e.post.parse=function(r,i,o){var s=e._bin,l={};return l.version=s.readFixed(r,i),i+=4,l.italicAngle=s.readFixed(r,i),i+=4,l.underlinePosition=s.readShort(r,i),i+=2,l.underlineThickness=s.readShort(r,i),i+=2,l},e==null&&(e={}),e.U==null&&(e.U={}),e.U.codeToGlyph=function(r,i){var o=r.cmap,s=-1;if(o.p0e4!=null?s=o.p0e4:o.p3e1!=null?s=o.p3e1:o.p1e0!=null?s=o.p1e0:o.p0e3!=null&&(s=o.p0e3),s==-1)throw"no familiar platform and encoding!";var l=o.tables[s];if(l.format==0)return i>=l.map.length?0:l.map[i];if(l.format==4){for(var c=-1,u=0;u<l.endCount.length;u++)if(i<=l.endCount[u]){c=u;break}return c==-1||l.startCount[c]>i?0:65535&(l.idRangeOffset[c]!=0?l.glyphIdArray[i-l.startCount[c]+(l.idRangeOffset[c]>>1)-(l.idRangeOffset.length-c)]:i+l.idDelta[c])}if(l.format==12){if(i>l.groups[l.groups.length-1][1])return 0;for(u=0;u<l.groups.length;u++){var h=l.groups[u];if(h[0]<=i&&i<=h[1])return h[2]+(i-h[0])}return 0}throw"unknown cmap table format "+l.format},e.U.glyphToPath=function(r,i){var o={cmds:[],crds:[]};if(r.SVG&&r.SVG.entries[i]){var s=r.SVG.entries[i];return s==null?o:(typeof s=="string"&&(s=e.SVG.toPath(s),r.SVG.entries[i]=s),s)}if(r.CFF){var l={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:r.CFF.Private?r.CFF.Private.defaultWidthX:0,open:!1},c=r.CFF,u=r.CFF.Private;if(c.ROS){for(var h=0;c.FDSelect[h+2]<=i;)h+=2;u=c.FDArray[c.FDSelect[h+1]].Private}e.U._drawCFF(r.CFF.CharStrings[i],l,c,u,o)}else r.glyf&&e.U._drawGlyf(i,r,o);return o},e.U._drawGlyf=function(r,i,o){var s=i.glyf[r];s==null&&(s=i.glyf[r]=e.glyf._parseGlyf(i,r)),s!=null&&(s.noc>-1?e.U._simpleGlyph(s,o):e.U._compoGlyph(s,i,o))},e.U._simpleGlyph=function(r,i){for(var o=0;o<r.noc;o++){for(var s=o==0?0:r.endPts[o-1]+1,l=r.endPts[o],c=s;c<=l;c++){var u=c==s?l:c-1,h=c==l?s:c+1,d=1&r.flags[c],f=1&r.flags[u],g=1&r.flags[h],v=r.xs[c],p=r.ys[c];if(c==s)if(d){if(!f){e.U.P.moveTo(i,v,p);continue}e.U.P.moveTo(i,r.xs[u],r.ys[u])}else f?e.U.P.moveTo(i,r.xs[u],r.ys[u]):e.U.P.moveTo(i,(r.xs[u]+v)/2,(r.ys[u]+p)/2);d?f&&e.U.P.lineTo(i,v,p):g?e.U.P.qcurveTo(i,v,p,r.xs[h],r.ys[h]):e.U.P.qcurveTo(i,v,p,(v+r.xs[h])/2,(p+r.ys[h])/2)}e.U.P.closePath(i)}},e.U._compoGlyph=function(r,i,o){for(var s=0;s<r.parts.length;s++){var l={cmds:[],crds:[]},c=r.parts[s];e.U._drawGlyf(c.glyphIndex,i,l);for(var u=c.m,h=0;h<l.crds.length;h+=2){var d=l.crds[h],f=l.crds[h+1];o.crds.push(d*u.a+f*u.b+u.tx),o.crds.push(d*u.c+f*u.d+u.ty)}for(h=0;h<l.cmds.length;h++)o.cmds.push(l.cmds[h])}},e.U._getGlyphClass=function(r,i){var o=e._lctf.getInterval(i,r);return o==-1?0:i[o+2]},e.U._applySubs=function(r,i,o,s){for(var l=r.length-i-1,c=0;c<o.tabs.length;c++)if(o.tabs[c]!=null){var u,h=o.tabs[c];if(!h.coverage||(u=e._lctf.coverageIndex(h.coverage,r[i]))!=-1){if(o.ltype==1)r[i],h.fmt==1?r[i]=r[i]+h.delta:r[i]=h.newg[u];else if(o.ltype==4)for(var d=h.vals[u],f=0;f<d.length;f++){var g=d[f],v=g.chain.length;if(!(v>l)){for(var p=!0,m=0,T=0;T<v;T++){for(;r[i+m+(1+T)]==-1;)m++;g.chain[T]!=r[i+m+(1+T)]&&(p=!1)}if(p){for(r[i]=g.nglyph,T=0;T<v+m;T++)r[i+T+1]=-1;break}}}else if(o.ltype==5&&h.fmt==2)for(var _=e._lctf.getInterval(h.cDef,r[i]),S=h.cDef[_+2],R=h.scset[S],A=0;A<R.length;A++){var M=R[A],L=M.input;if(!(L.length>l)){for(p=!0,T=0;T<L.length;T++){var H=e._lctf.getInterval(h.cDef,r[i+1+T]);if(_==-1&&h.cDef[H+2]!=L[T]){p=!1;break}}if(p){var x=M.substLookupRecords;for(f=0;f<x.length;f+=2)x[f],x[f+1]}}}else if(o.ltype==6&&h.fmt==3){if(!e.U._glsCovered(r,h.backCvg,i-h.backCvg.length)||!e.U._glsCovered(r,h.inptCvg,i)||!e.U._glsCovered(r,h.ahedCvg,i+h.inptCvg.length))continue;var E=h.lookupRec;for(A=0;A<E.length;A+=2){_=E[A];var U=s[E[A+1]];e.U._applySubs(r,i+_,U,s)}}}}},e.U._glsCovered=function(r,i,o){for(var s=0;s<i.length;s++)if(e._lctf.coverageIndex(i[s],r[o+s])==-1)return!1;return!0},e.U.glyphsToPath=function(r,i,o){for(var s={cmds:[],crds:[]},l=0,c=0;c<i.length;c++){var u=i[c];if(u!=-1){for(var h=c<i.length-1&&i[c+1]!=-1?i[c+1]:0,d=e.U.glyphToPath(r,u),f=0;f<d.crds.length;f+=2)s.crds.push(d.crds[f]+l),s.crds.push(d.crds[f+1]);for(o&&s.cmds.push(o),f=0;f<d.cmds.length;f++)s.cmds.push(d.cmds[f]);o&&s.cmds.push("X"),l+=r.hmtx.aWidth[u],c<i.length-1&&(l+=e.U.getPairAdjustment(r,u,h))}}return s},e.U.P={},e.U.P.moveTo=function(r,i,o){r.cmds.push("M"),r.crds.push(i,o)},e.U.P.lineTo=function(r,i,o){r.cmds.push("L"),r.crds.push(i,o)},e.U.P.curveTo=function(r,i,o,s,l,c,u){r.cmds.push("C"),r.crds.push(i,o,s,l,c,u)},e.U.P.qcurveTo=function(r,i,o,s,l){r.cmds.push("Q"),r.crds.push(i,o,s,l)},e.U.P.closePath=function(r){r.cmds.push("Z")},e.U._drawCFF=function(r,i,o,s,l){for(var c=i.stack,u=i.nStems,h=i.haveWidth,d=i.width,f=i.open,g=0,v=i.x,p=i.y,m=0,T=0,_=0,S=0,R=0,A=0,M=0,L=0,H=0,x=0,E={val:0,size:0};g<r.length;){e.CFF.getCharString(r,g,E);var U=E.val;if(g+=E.size,U=="o1"||U=="o18")c.length%2!=0&&!h&&(d=c.shift()+s.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(U=="o3"||U=="o23")c.length%2!=0&&!h&&(d=c.shift()+s.nominalWidthX),u+=c.length>>1,c.length=0,h=!0;else if(U=="o4")c.length>1&&!h&&(d=c.shift()+s.nominalWidthX,h=!0),f&&e.U.P.closePath(l),p+=c.pop(),e.U.P.moveTo(l,v,p),f=!0;else if(U=="o5")for(;c.length>0;)v+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,v,p);else if(U=="o6"||U=="o7")for(var B=c.length,C=U=="o6",V=0;V<B;V++){var z=c.shift();C?v+=z:p+=z,C=!C,e.U.P.lineTo(l,v,p)}else if(U=="o8"||U=="o24"){B=c.length;for(var j=0;j+6<=B;)m=v+c.shift(),T=p+c.shift(),_=m+c.shift(),S=T+c.shift(),v=_+c.shift(),p=S+c.shift(),e.U.P.curveTo(l,m,T,_,S,v,p),j+=6;U=="o24"&&(v+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,v,p))}else{if(U=="o11")break;if(U=="o1234"||U=="o1235"||U=="o1236"||U=="o1237")U=="o1234"&&(T=p,_=(m=v+c.shift())+c.shift(),x=S=T+c.shift(),A=S,L=p,v=(M=(R=(H=_+c.shift())+c.shift())+c.shift())+c.shift(),e.U.P.curveTo(l,m,T,_,S,H,x),e.U.P.curveTo(l,R,A,M,L,v,p)),U=="o1235"&&(m=v+c.shift(),T=p+c.shift(),_=m+c.shift(),S=T+c.shift(),H=_+c.shift(),x=S+c.shift(),R=H+c.shift(),A=x+c.shift(),M=R+c.shift(),L=A+c.shift(),v=M+c.shift(),p=L+c.shift(),c.shift(),e.U.P.curveTo(l,m,T,_,S,H,x),e.U.P.curveTo(l,R,A,M,L,v,p)),U=="o1236"&&(m=v+c.shift(),T=p+c.shift(),_=m+c.shift(),x=S=T+c.shift(),A=S,M=(R=(H=_+c.shift())+c.shift())+c.shift(),L=A+c.shift(),v=M+c.shift(),e.U.P.curveTo(l,m,T,_,S,H,x),e.U.P.curveTo(l,R,A,M,L,v,p)),U=="o1237"&&(m=v+c.shift(),T=p+c.shift(),_=m+c.shift(),S=T+c.shift(),H=_+c.shift(),x=S+c.shift(),R=H+c.shift(),A=x+c.shift(),M=R+c.shift(),L=A+c.shift(),Math.abs(M-v)>Math.abs(L-p)?v=M+c.shift():p=L+c.shift(),e.U.P.curveTo(l,m,T,_,S,H,x),e.U.P.curveTo(l,R,A,M,L,v,p));else if(U=="o14"){if(c.length>0&&!h&&(d=c.shift()+o.nominalWidthX,h=!0),c.length==4){var K=c.shift(),O=c.shift(),W=c.shift(),P=c.shift(),N=e.CFF.glyphBySE(o,W),X=e.CFF.glyphBySE(o,P);e.U._drawCFF(o.CharStrings[N],i,o,s,l),i.x=K,i.y=O,e.U._drawCFF(o.CharStrings[X],i,o,s,l)}f&&(e.U.P.closePath(l),f=!1)}else if(U=="o19"||U=="o20")c.length%2!=0&&!h&&(d=c.shift()+s.nominalWidthX),u+=c.length>>1,c.length=0,h=!0,g+=u+7>>3;else if(U=="o21")c.length>2&&!h&&(d=c.shift()+s.nominalWidthX,h=!0),p+=c.pop(),v+=c.pop(),f&&e.U.P.closePath(l),e.U.P.moveTo(l,v,p),f=!0;else if(U=="o22")c.length>1&&!h&&(d=c.shift()+s.nominalWidthX,h=!0),v+=c.pop(),f&&e.U.P.closePath(l),e.U.P.moveTo(l,v,p),f=!0;else if(U=="o25"){for(;c.length>6;)v+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,v,p);m=v+c.shift(),T=p+c.shift(),_=m+c.shift(),S=T+c.shift(),v=_+c.shift(),p=S+c.shift(),e.U.P.curveTo(l,m,T,_,S,v,p)}else if(U=="o26")for(c.length%2&&(v+=c.shift());c.length>0;)m=v,T=p+c.shift(),v=_=m+c.shift(),p=(S=T+c.shift())+c.shift(),e.U.P.curveTo(l,m,T,_,S,v,p);else if(U=="o27")for(c.length%2&&(p+=c.shift());c.length>0;)T=p,_=(m=v+c.shift())+c.shift(),S=T+c.shift(),v=_+c.shift(),p=S,e.U.P.curveTo(l,m,T,_,S,v,p);else if(U=="o10"||U=="o29"){var D=U=="o10"?s:o;if(c.length==0)console.debug("error: empty stack");else{var F=c.pop(),J=D.Subrs[F+D.Bias];i.x=v,i.y=p,i.nStems=u,i.haveWidth=h,i.width=d,i.open=f,e.U._drawCFF(J,i,o,s,l),v=i.x,p=i.y,u=i.nStems,h=i.haveWidth,d=i.width,f=i.open}}else if(U=="o30"||U=="o31"){var Q=c.length,te=(j=0,U=="o31");for(j+=Q-(B=-3&Q);j<B;)te?(T=p,_=(m=v+c.shift())+c.shift(),p=(S=T+c.shift())+c.shift(),B-j==5?(v=_+c.shift(),j++):v=_,te=!1):(m=v,T=p+c.shift(),_=m+c.shift(),S=T+c.shift(),v=_+c.shift(),B-j==5?(p=S+c.shift(),j++):p=S,te=!0),e.U.P.curveTo(l,m,T,_,S,v,p),j+=4}else{if((U+"").charAt(0)=="o")throw console.debug("Unknown operation: "+U,r),U;c.push(U)}}}i.x=v,i.y=p,i.nStems=u,i.haveWidth=h,i.width=d,i.open=f};var t=e,a={Typr:t};return n.Typr=t,n.default=a,Object.defineProperty(n,"__esModule",{value:!0}),n})({}).Typr}function Kf(){return(function(n){var e=Uint8Array,t=Uint16Array,a=Uint32Array,r=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),i=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),s=function(U,B){for(var C=new t(31),V=0;V<31;++V)C[V]=B+=1<<U[V-1];var z=new a(C[30]);for(V=1;V<30;++V)for(var j=C[V];j<C[V+1];++j)z[j]=j-C[V]<<5|V;return[C,z]},l=s(r,2),c=l[0],u=l[1];c[28]=258,u[258]=28;for(var h=s(i,0)[0],d=new t(32768),f=0;f<32768;++f){var g=(43690&f)>>>1|(21845&f)<<1;g=(61680&(g=(52428&g)>>>2|(13107&g)<<2))>>>4|(3855&g)<<4,d[f]=((65280&g)>>>8|(255&g)<<8)>>>1}var v=function(U,B,C){for(var V=U.length,z=0,j=new t(B);z<V;++z)++j[U[z]-1];var K,O=new t(B);for(z=0;z<B;++z)O[z]=O[z-1]+j[z-1]<<1;{K=new t(1<<B);var W=15-B;for(z=0;z<V;++z)if(U[z])for(var P=z<<4|U[z],N=B-U[z],X=O[U[z]-1]++<<N,D=X|(1<<N)-1;X<=D;++X)K[d[X]>>>W]=P}return K},p=new e(288);for(f=0;f<144;++f)p[f]=8;for(f=144;f<256;++f)p[f]=9;for(f=256;f<280;++f)p[f]=7;for(f=280;f<288;++f)p[f]=8;var m=new e(32);for(f=0;f<32;++f)m[f]=5;var T=v(p,9),_=v(m,5),S=function(U){for(var B=U[0],C=1;C<U.length;++C)U[C]>B&&(B=U[C]);return B},R=function(U,B,C){var V=B/8|0;return(U[V]|U[V+1]<<8)>>(7&B)&C},A=function(U,B){var C=B/8|0;return(U[C]|U[C+1]<<8|U[C+2]<<16)>>(7&B)},M=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],L=function(U,B,C){var V=new Error(B||M[U]);if(V.code=U,Error.captureStackTrace&&Error.captureStackTrace(V,L),!C)throw V;return V},H=function(U,B,C){var V=U.length;if(!V||C&&!C.l&&V<5)return B||new e(0);var z=!B||C,j=!C||C.i;C||(C={}),B||(B=new e(3*V));var K,O=function(Te){var Ue=B.length;if(Te>Ue){var Ce=new e(Math.max(2*Ue,Te));Ce.set(B),B=Ce}},W=C.f||0,P=C.p||0,N=C.b||0,X=C.l,D=C.d,F=C.m,J=C.n,Q=8*V;do{if(!X){C.f=W=R(U,P,1);var te=R(U,P+1,3);if(P+=3,!te){var se=U[(Me=((K=P)/8|0)+(7&K&&1)+4)-4]|U[Me-3]<<8,be=Me+se;if(be>V){j&&L(0);break}z&&O(N+se),B.set(U.subarray(Me,be),N),C.b=N+=se,C.p=P=8*be;continue}if(te==1)X=T,D=_,F=9,J=5;else if(te==2){var le=R(U,P,31)+257,I=R(U,P+10,15)+4,Ne=le+R(U,P+5,31)+1;P+=14;for(var xe=new e(Ne),ve=new e(19),fe=0;fe<I;++fe)ve[o[fe]]=R(U,P+3*fe,7);P+=3*I;var Ae=S(ve),oe=(1<<Ae)-1,Se=v(ve,Ae);for(fe=0;fe<Ne;){var Me,b=Se[R(U,P,oe)];if(P+=15&b,(Me=b>>>4)<16)xe[fe++]=Me;else{var y=0,k=0;for(Me==16?(k=3+R(U,P,3),P+=2,y=xe[fe-1]):Me==17?(k=3+R(U,P,7),P+=3):Me==18&&(k=11+R(U,P,127),P+=7);k--;)xe[fe++]=y}}var Y=xe.subarray(0,le),ie=xe.subarray(le);F=S(Y),J=S(ie),X=v(Y,F),D=v(ie,J)}else L(1);if(P>Q){j&&L(0);break}}z&&O(N+131072);for(var $=(1<<F)-1,Pe=(1<<J)-1,de=P;;de=P){var ce=(y=X[A(U,P)&$])>>>4;if((P+=15&y)>Q){j&&L(0);break}if(y||L(2),ce<256)B[N++]=ce;else{if(ce==256){de=P,X=null;break}var me=ce-254;if(ce>264){var Oe=r[fe=ce-257];me=R(U,P,(1<<Oe)-1)+c[fe],P+=Oe}var ue=D[A(U,P)&Pe],Je=ue>>>4;if(ue||L(3),P+=15&ue,ie=h[Je],Je>3&&(Oe=i[Je],ie+=A(U,P)&(1<<Oe)-1,P+=Oe),P>Q){j&&L(0);break}z&&O(N+131072);for(var Ee=N+me;N<Ee;N+=4)B[N]=B[N-ie],B[N+1]=B[N+1-ie],B[N+2]=B[N+2-ie],B[N+3]=B[N+3-ie];N=Ee}}C.l=X,C.p=de,C.b=N,X&&(W=1,C.m=F,C.d=D,C.n=J)}while(!W);return N==B.length?B:(function(Te,Ue,Ce){(Ce==null||Ce>Te.length)&&(Ce=Te.length);var Ge=new(Te instanceof t?t:Te instanceof a?a:e)(Ce-Ue);return Ge.set(Te.subarray(Ue,Ce)),Ge})(B,0,N)},x=new e(0),E=typeof TextDecoder<"u"&&new TextDecoder;try{E.decode(x,{stream:!0})}catch{}return n.convert_streams=function(U){var B=new DataView(U),C=0;function V(){var le=B.getUint16(C);return C+=2,le}function z(){var le=B.getUint32(C);return C+=4,le}function j(le){se.setUint16(be,le),be+=2}function K(le){se.setUint32(be,le),be+=4}for(var O={signature:z(),flavor:z(),length:z(),numTables:V(),reserved:V(),totalSfntSize:z(),majorVersion:V(),minorVersion:V(),metaOffset:z(),metaLength:z(),metaOrigLength:z(),privOffset:z(),privLength:z()},W=0;Math.pow(2,W)<=O.numTables;)W++;W--;for(var P=16*Math.pow(2,W),N=16*O.numTables-P,X=12,D=[],F=0;F<O.numTables;F++)D.push({tag:z(),offset:z(),compLength:z(),origLength:z(),origChecksum:z()}),X+=16;var J,Q=new Uint8Array(12+16*D.length+D.reduce(function(le,I){return le+I.origLength+4},0)),te=Q.buffer,se=new DataView(te),be=0;return K(O.flavor),j(O.numTables),j(P),j(W),j(N),D.forEach(function(le){K(le.tag),K(le.origChecksum),K(X),K(le.origLength),le.outOffset=X,(X+=le.origLength)%4!=0&&(X+=4-X%4)}),D.forEach(function(le){var I,Ne=U.slice(le.offset,le.offset+le.compLength);if(le.compLength!=le.origLength){var xe=new Uint8Array(le.origLength);I=new Uint8Array(Ne,2),H(I,xe)}else xe=new Uint8Array(Ne);Q.set(xe,le.outOffset);var ve=0;(X=le.outOffset+le.origLength)%4!=0&&(ve=4-X%4),Q.set(new Uint8Array(ve).buffer,le.outOffset+le.origLength),J=X+ve}),te.slice(0,J)},Object.defineProperty(n,"__esModule",{value:!0}),n})({}).convert_streams}function Jf(n,e){const t={M:2,L:2,Q:4,C:6,Z:0},a={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},r=1,i=2,o=4,s=8,l=16,c=32;let u;function h(M){if(!u){const L={R:i,L:r,D:o,C:l,U:c,T:s};u=new Map;for(let H in a){let x=0;a[H].split(",").forEach(E=>{let[U,B]=E.split("+");U=parseInt(U,36),B=B?parseInt(B,36):0,u.set(x+=U,L[H]);for(let C=B;C--;)u.set(++x,L[H])})}}return u.get(M)||c}const d=1,f=2,g=3,v=4,p=[null,"isol","init","fina","medi"];function m(M){const L=new Uint8Array(M.length);let H=c,x=d,E=-1;for(let U=0;U<M.length;U++){const B=M.codePointAt(U);let C=h(B)|0,V=d;C&s||(H&(r|o|l)?C&(i|o|l)?(V=g,(x===d||x===g)&&L[E]++):C&(r|c)&&(x===f||x===v)&&L[E]--:H&(i|c)&&(x===f||x===v)&&L[E]--,x=L[U]=V,H=C,E=U,B>65535&&U++)}return L}function T(M,L){const H=[];for(let E=0;E<L.length;E++){const U=L.codePointAt(E);U>65535&&E++,H.push(n.U.codeToGlyph(M,U))}const x=M.GSUB;if(x){const{lookupList:E,featureList:U}=x;let B;const C=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,V=[];U.forEach(z=>{if(C.test(z.tag))for(let j=0;j<z.tab.length;j++){if(V[z.tab[j]])continue;V[z.tab[j]]=!0;const K=E[z.tab[j]],O=/^(isol|init|fina|medi)$/.test(z.tag);O&&!B&&(B=m(L));for(let W=0;W<H.length;W++)(!B||!O||p[B[W]]===z.tag)&&n.U._applySubs(H,W,K,E)}})}return H}function _(M,L){const H=new Int16Array(L.length*3);let x=0;for(;x<L.length;x++){const C=L[x];if(C===-1)continue;H[x*3+2]=M.hmtx.aWidth[C];const V=M.GPOS;if(V){const z=V.lookupList;for(let j=0;j<z.length;j++){const K=z[j];for(let O=0;O<K.tabs.length;O++){const W=K.tabs[O];if(K.ltype===1){if(n._lctf.coverageIndex(W.coverage,C)!==-1&&W.pos){B(W.pos,x);break}}else if(K.ltype===2){let P=null,N=E();if(N!==-1){const X=n._lctf.coverageIndex(W.coverage,L[N]);if(X!==-1){if(W.fmt===1){const D=W.pairsets[X];for(let F=0;F<D.length;F++)D[F].gid2===C&&(P=D[F])}else if(W.fmt===2){const D=n.U._getGlyphClass(L[N],W.classDef1),F=n.U._getGlyphClass(C,W.classDef2);P=W.matrix[D][F]}if(P){P.val1&&B(P.val1,N),P.val2&&B(P.val2,x);break}}}}else if(K.ltype===4){const P=n._lctf.coverageIndex(W.markCoverage,C);if(P!==-1){const N=E(U),X=N===-1?-1:n._lctf.coverageIndex(W.baseCoverage,L[N]);if(X!==-1){const D=W.markArray[P],F=W.baseArray[X][D.markClass];H[x*3]=F.x-D.x+H[N*3]-H[N*3+2],H[x*3+1]=F.y-D.y+H[N*3+1];break}}}else if(K.ltype===6){const P=n._lctf.coverageIndex(W.mark1Coverage,C);if(P!==-1){const N=E();if(N!==-1){const X=L[N];if(S(M,X)===3){const D=n._lctf.coverageIndex(W.mark2Coverage,X);if(D!==-1){const F=W.mark1Array[P],J=W.mark2Array[D][F.markClass];H[x*3]=J.x-F.x+H[N*3]-H[N*3+2],H[x*3+1]=J.y-F.y+H[N*3+1];break}}}}}}}}else if(M.kern&&!M.cff){const z=E();if(z!==-1){const j=M.kern.glyph1.indexOf(L[z]);if(j!==-1){const K=M.kern.rval[j].glyph2.indexOf(C);K!==-1&&(H[z*3+2]+=M.kern.rval[j].vals[K])}}}}return H;function E(C){for(let V=x-1;V>=0;V--)if(L[V]!==-1&&(!C||C(L[V])))return V;return-1}function U(C){return S(M,C)===1}function B(C,V){for(let z=0;z<3;z++)H[V*3+z]+=C[z]||0}}function S(M,L){const H=M.GDEF&&M.GDEF.glyphClassDef;return H?n.U._getGlyphClass(L,H):0}function R(...M){for(let L=0;L<M.length;L++)if(typeof M[L]=="number")return M[L]}function A(M){const L=Object.create(null),H=M["OS/2"],x=M.hhea,E=M.head.unitsPerEm,U=R(H&&H.sTypoAscender,x&&x.ascender,E),B={unitsPerEm:E,ascender:U,descender:R(H&&H.sTypoDescender,x&&x.descender,0),capHeight:R(H&&H.sCapHeight,U),xHeight:R(H&&H.sxHeight,U),lineGap:R(H&&H.sTypoLineGap,x&&x.lineGap),supportsCodePoint(C){return n.U.codeToGlyph(M,C)>0},forEachGlyph(C,V,z,j){let K=0;const O=1/B.unitsPerEm*V,W=T(M,C);let P=0;const N=_(M,W);return W.forEach((X,D)=>{if(X!==-1){let F=L[X];if(!F){const{cmds:J,crds:Q}=n.U.glyphToPath(M,X);let te="",se=0;for(let xe=0,ve=J.length;xe<ve;xe++){const fe=t[J[xe]];te+=J[xe];for(let Ae=1;Ae<=fe;Ae++)te+=(Ae>1?",":"")+Q[se++]}let be,le,I,Ne;if(Q.length){be=le=1/0,I=Ne=-1/0;for(let xe=0,ve=Q.length;xe<ve;xe+=2){let fe=Q[xe],Ae=Q[xe+1];fe<be&&(be=fe),Ae<le&&(le=Ae),fe>I&&(I=fe),Ae>Ne&&(Ne=Ae)}}else be=I=le=Ne=0;F=L[X]={index:X,advanceWidth:M.hmtx.aWidth[X],xMin:be,yMin:le,xMax:I,yMax:Ne,path:te}}j.call(null,F,K+N[D*3]*O,N[D*3+1]*O,P),K+=N[D*3+2]*O,z&&(K+=z*V)}P+=C.codePointAt(P)>65535?2:1}),K}};return B}return function(M){const L=new Uint8Array(M,0,4),H=n._bin.readASCII(L,0,4);if(H==="wOFF")M=e(M);else if(H==="wOF2")throw new Error("woff2 fonts not supported");return A(n.parse(M)[0])}}const $f=di({name:"Typr Font Parser",dependencies:[Zf,Kf,Jf],init(n,e,t){const a=n(),r=e();return t(a,r)}});function Qf(){return(function(n){var e=function(){this.buckets=new Map};e.prototype.add=function(_){var S=_>>5;this.buckets.set(S,(this.buckets.get(S)||0)|1<<(31&_))},e.prototype.has=function(_){var S=this.buckets.get(_>>5);return S!==void 0&&(S&1<<(31&_))!=0},e.prototype.serialize=function(){var _=[];return this.buckets.forEach(function(S,R){_.push((+R).toString(36)+":"+S.toString(36))}),_.join(",")},e.prototype.deserialize=function(_){var S=this;this.buckets.clear(),_.split(",").forEach(function(R){var A=R.split(":");S.buckets.set(parseInt(A[0],36),parseInt(A[1],36))})};var t=Math.pow(2,8),a=t-1,r=~a;function i(_){var S=(function(A){return A&r})(_).toString(16),R=(function(A){return(A&r)+t-1})(_).toString(16);return"codepoint-index/plane"+(_>>16)+"/"+S+"-"+R+".json"}function o(_,S){var R=_&a,A=S.codePointAt(R/6|0);return((A=(A||48)-48)&1<<R%6)!=0}function s(_,S){var R;(R=_,R.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(A){return A.split("-").map(function(M){return parseInt(M.trim(),16)})})).forEach(function(A){var M=A[0],L=A[1];L===void 0&&(L=M),S(M,L)})}function l(_,S){s(_,function(R,A){for(var M=R;M<=A;M++)S(M)})}var c={},u={},h=new WeakMap,d="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function f(_){var S=h.get(_);return S||(S=new e,l(_.ranges,function(R){return S.add(R)}),h.set(_,S)),S}var g,v=new Map;function p(_,S,R){return _[S]?S:_[R]?R:(function(A){for(var M in A)return M})(_)}function m(_,S){var R=S;if(!_.includes(R)){R=1/0;for(var A=0;A<_.length;A++)Math.abs(_[A]-S)<Math.abs(R-S)&&(R=_[A])}return R}function T(_){return g||(g=new Set,l("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(S){g.add(S)})),g.has(_)}return n.CodePointSet=e,n.clearCache=function(){c={},u={}},n.getFontsForString=function(_,S){S===void 0&&(S={});var R,A=S.lang;A===void 0&&(A=/\p{Script=Hangul}/u.test(R=_)?"ko":/\p{Script=Hiragana}|\p{Script=Katakana}/u.test(R)?"ja":"en");var M=S.category;M===void 0&&(M="sans-serif");var L=S.style;L===void 0&&(L="normal");var H=S.weight;H===void 0&&(H=400);var x=(S.dataUrl||d).replace(/\/$/g,""),E=new Map,U=new Uint8Array(_.length),B={},C={},V=new Array(_.length),z=new Map,j=!1;function K(P){var N=v.get(P);return N||(N=fetch(x+"/"+P).then(function(X){if(!X.ok)throw new Error(X.statusText);return X.json().then(function(D){if(!Array.isArray(D)||D[0]!==1)throw new Error("Incorrect schema version; need 1, got "+D[0]);return D[1]})}).catch(function(X){if(x!==d)return j||(console.error('unicode-font-resolver: Failed loading from dataUrl "'+x+'", trying default CDN. '+X.message),j=!0),x=d,v.delete(P),K(P);throw X}),v.set(P,N)),N}for(var O=function(P){var N=_.codePointAt(P),X=i(N);V[P]=X,c[X]||z.has(X)||z.set(X,K(X).then(function(D){c[X]=D})),N>65535&&(P++,W=P)},W=0;W<_.length;W++)O(W);return Promise.all(z.values()).then(function(){z.clear();for(var P=function(X){var D=_.codePointAt(X),F=null,J=c[V[X]],Q=void 0;for(var te in J){var se=C[te];if(se===void 0&&(se=C[te]=new RegExp(te).test(A||"en")),se){for(var be in Q=te,J[te])if(o(D,J[te][be])){F=be;break}break}}if(!F){e:for(var le in J)if(le!==Q){for(var I in J[le])if(o(D,J[le][I])){F=I;break e}}}F||(console.debug("No font coverage for U+"+D.toString(16)),F="latin"),V[X]=F,u[F]||z.has(F)||z.set(F,K("font-meta/"+F+".json").then(function(Ne){u[F]=Ne})),D>65535&&(X++,N=X)},N=0;N<_.length;N++)P(N);return Promise.all(z.values())}).then(function(){for(var P,N=null,X=0;X<_.length;X++){var D=_.codePointAt(X);if(N&&(T(D)||f(N).has(D)))U[X]=U[X-1];else{N=u[V[X]];var F=B[N.id];if(!F){var J=N.typeforms,Q=p(J,M,"sans-serif"),te=p(J[Q],L,"normal"),se=m((P=J[Q])===null||P===void 0?void 0:P[te],H);F=B[N.id]=x+"/font-files/"+N.id+"/"+Q+"."+te+"."+se+".woff"}var be=E.get(F);be==null&&(be=E.size,E.set(F,be)),U[X]=be}D>65535&&(X++,U[X]=U[X-1])}return{fontUrls:Array.from(E.keys()),chars:U}})},Object.defineProperty(n,"__esModule",{value:!0}),n})({})}function ep(n,e){const t=Object.create(null),a=Object.create(null);function r(o,s){const l=c=>{console.error(`Failure loading font ${o}`,c)};try{const c=new XMLHttpRequest;c.open("get",o,!0),c.responseType="arraybuffer",c.onload=function(){if(c.status>=400)l(new Error(c.statusText));else if(c.status>0)try{const u=n(c.response);u.src=o,s(u)}catch(u){l(u)}},c.onerror=l,c.send()}catch(c){l(c)}}function i(o,s){let l=t[o];l?s(l):a[o]?a[o].push(s):(a[o]=[s],r(o,c=>{c.src=o,t[o]=c,a[o].forEach(u=>u(c)),delete a[o]}))}return function(o,s,{lang:l,fonts:c=[],style:u="normal",weight:h="normal",unicodeFontsURL:d}={}){const f=new Uint8Array(o.length),g=[];o.length||T();const v=new Map,p=[];if(u!=="italic"&&(u="normal"),typeof h!="number"&&(h=h==="bold"?700:400),c&&!Array.isArray(c)&&(c=[c]),c=c.slice().filter(S=>!S.lang||S.lang.test(l)).reverse(),c.length){let S=0;(function R(A=0){for(let M=A,L=o.length;M<L;M++){const H=o.codePointAt(M);if(S===1&&g[f[M-1]].supportsCodePoint(H)||M>0&&/\s/.test(o[M]))f[M]=f[M-1],S===2&&(p[p.length-1][1]=M);else for(let x=f[M],E=c.length;x<=E;x++)if(x===E){const U=S===2?p[p.length-1]:p[p.length]=[M,M];U[1]=M,S=2}else{f[M]=x;const{src:U,unicodeRange:B}=c[x];if(!B||_(H,B)){const C=t[U];if(!C){i(U,()=>{R(M)});return}if(C.supportsCodePoint(H)){let V=v.get(C);typeof V!="number"&&(V=g.length,g.push(C),v.set(C,V)),f[M]=V,S=1;break}}}H>65535&&M+1<L&&(f[M+1]=f[M],M++,S===2&&(p[p.length-1][1]=M))}m()})()}else p.push([0,o.length-1]),m();function m(){if(p.length){const S=p.map(R=>o.substring(R[0],R[1]+1)).join(`
`);e.getFontsForString(S,{lang:l||void 0,style:u,weight:h,dataUrl:d}).then(({fontUrls:R,chars:A})=>{const M=g.length;let L=0;p.forEach(x=>{for(let E=0,U=x[1]-x[0];E<=U;E++)f[x[0]+E]=A[L++]+M;L++});let H=0;R.forEach((x,E)=>{i(x,U=>{g[E+M]=U,++H===R.length&&T()})})})}else T()}function T(){s({chars:f,fonts:g})}function _(S,R){for(let A=0;A<R.length;A++){const[M,L=M]=R[A];if(M<=S&&S<=L)return!0}return!1}}}const tp=di({name:"FontResolver",dependencies:[ep,$f,Qf],init(n,e,t){return n(e,t())}});function rp(n,e){const t=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,a="[^\\S\\u00A0]",r=new RegExp(`${a}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function i({text:f,lang:g,fonts:v,style:p,weight:m,preResolvedFonts:T,unicodeFontsURL:_},S){const R=({chars:A,fonts:M})=>{let L,H;const x=[];for(let E=0;E<A.length;E++)A[E]!==H?(H=A[E],x.push(L={start:E,end:E,fontObj:M[A[E]]})):L.end=E;S(x)};T?R(T):n(f,R,{lang:g,fonts:v,style:p,weight:m,unicodeFontsURL:_})}function o({text:f="",font:g,lang:v,sdfGlyphSize:p=64,fontSize:m=400,fontWeight:T=1,fontStyle:_="normal",letterSpacing:S=0,lineHeight:R="normal",maxWidth:A=1/0,direction:M,textAlign:L="left",textIndent:H=0,whiteSpace:x="normal",overflowWrap:E="normal",anchorX:U=0,anchorY:B=0,metricsOnly:C=!1,unicodeFontsURL:V,preResolvedFonts:z=null,includeCaretPositions:j=!1,chunkedBoundsSize:K=8192,colorRanges:O=null},W){const P=u(),N={fontLoad:0,typesetting:0};f.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),f=f.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),m=+m,S=+S,A=+A,R=R||"normal",H=+H,i({text:f,lang:v,style:_,weight:T,fonts:typeof g=="string"?[{src:g}]:g,unicodeFontsURL:V,preResolvedFonts:z},X=>{N.fontLoad=u()-P;const D=isFinite(A);let F=null,J=null,Q=null,te=null,se=null,be=null,le=null,I=null,Ne=0,xe=0,ve=x!=="nowrap";const fe=new Map,Ae=u();let oe=H,Se=0,Me=new h;const b=[Me];X.forEach($=>{const{fontObj:Pe}=$,{ascender:de,descender:ce,unitsPerEm:me,lineGap:Oe,capHeight:ue,xHeight:Je}=Pe;let Ee=fe.get(Pe);if(!Ee){const we=m/me,Fe=R==="normal"?(de-ce+Oe)*we:R*m,G=(Fe-(de-ce)*we)/2,pe=Math.min(Fe,(de-ce)*we),q=(de+ce)/2*we+pe/2;Ee={index:fe.size,src:Pe.src,fontObj:Pe,fontSizeMult:we,unitsPerEm:me,ascender:de*we,descender:ce*we,capHeight:ue*we,xHeight:Je*we,lineHeight:Fe,baseline:-G-de*we,caretTop:q,caretBottom:q-pe},fe.set(Pe,Ee)}const{fontSizeMult:Te}=Ee,Ue=f.slice($.start,$.end+1);let Ce,Ge;Pe.forEachGlyph(Ue,m,S,(we,Fe,G,pe)=>{Fe+=Se,pe+=$.start,Ce=Fe,Ge=we;const q=f.charAt(pe),ye=we.advanceWidth*Te,_e=Me.count;let Le;if("isEmpty"in we||(we.isWhitespace=!!q&&new RegExp(a).test(q),we.canBreakAfter=!!q&&r.test(q),we.isEmpty=we.xMin===we.xMax||we.yMin===we.yMax||t.test(q)),!we.isWhitespace&&!we.isEmpty&&xe++,ve&&D&&!we.isWhitespace&&Fe+ye+oe>A&&_e){if(Me.glyphAt(_e-1).glyphObj.canBreakAfter)Le=new h,oe=-Fe;else for(let Qe=_e;Qe--;)if(Qe===0&&E==="break-word"){Le=new h,oe=-Fe;break}else if(Me.glyphAt(Qe).glyphObj.canBreakAfter){Le=Me.splitAt(Qe+1);const et=Le.glyphAt(0).x;oe-=et;for(let He=Le.count;He--;)Le.glyphAt(He).x-=et;break}Le&&(Me.isSoftWrapped=!0,Me=Le,b.push(Me),Ne=A)}let Be=Me.glyphAt(Me.count);Be.glyphObj=we,Be.x=Fe+oe,Be.y=G,Be.width=ye,Be.charIndex=pe,Be.fontData=Ee,q===`
`&&(Me=new h,b.push(Me),oe=-(Fe+ye+S*m)+H)}),Se=Ce+Ge.advanceWidth*Te+S*m});let y=0;b.forEach($=>{let Pe=!0;for(let de=$.count;de--;){const ce=$.glyphAt(de);Pe&&!ce.glyphObj.isWhitespace&&($.width=ce.x+ce.width,$.width>Ne&&(Ne=$.width),Pe=!1);let{lineHeight:me,capHeight:Oe,xHeight:ue,baseline:Je}=ce.fontData;me>$.lineHeight&&($.lineHeight=me);const Ee=Je-$.baseline;Ee<0&&($.baseline+=Ee,$.cap+=Ee,$.ex+=Ee),$.cap=Math.max($.cap,$.baseline+Oe),$.ex=Math.max($.ex,$.baseline+ue)}$.baseline-=y,$.cap-=y,$.ex-=y,y+=$.lineHeight});let k=0,Y=0;if(U&&(typeof U=="number"?k=-U:typeof U=="string"&&(k=-Ne*(U==="left"?0:U==="center"?.5:U==="right"?1:l(U)))),B&&(typeof B=="number"?Y=-B:typeof B=="string"&&(Y=B==="top"?0:B==="top-baseline"?-b[0].baseline:B==="top-cap"?-b[0].cap:B==="top-ex"?-b[0].ex:B==="middle"?y/2:B==="bottom"?y:B==="bottom-baseline"?-b[b.length-1].baseline:l(B)*y)),!C){const $=e.getEmbeddingLevels(f,M);F=new Uint16Array(xe),J=new Uint8Array(xe),Q=new Float32Array(xe*2),te={},le=[1/0,1/0,-1/0,-1/0],I=[],j&&(be=new Float32Array(f.length*4)),O&&(se=new Uint8Array(xe*3));let Pe=0,de=-1,ce=-1,me,Oe;if(b.forEach((ue,Je)=>{let{count:Ee,width:Te}=ue;if(Ee>0){let Ue=0;for(let pe=Ee;pe--&&ue.glyphAt(pe).glyphObj.isWhitespace;)Ue++;let Ce=0,Ge=0;if(L==="center")Ce=(Ne-Te)/2;else if(L==="right")Ce=Ne-Te;else if(L==="justify"&&ue.isSoftWrapped){let pe=0;for(let q=Ee-Ue;q--;)ue.glyphAt(q).glyphObj.isWhitespace&&pe++;Ge=(Ne-Te)/pe}if(Ge||Ce){let pe=0;for(let q=0;q<Ee;q++){let ye=ue.glyphAt(q);const _e=ye.glyphObj;ye.x+=Ce+pe,Ge!==0&&_e.isWhitespace&&q<Ee-Ue&&(pe+=Ge,ye.width+=Ge)}}const we=e.getReorderSegments(f,$,ue.glyphAt(0).charIndex,ue.glyphAt(ue.count-1).charIndex);for(let pe=0;pe<we.length;pe++){const[q,ye]=we[pe];let _e=1/0,Le=-1/0;for(let Be=0;Be<Ee;Be++)if(ue.glyphAt(Be).charIndex>=q){let Qe=Be,et=Be;for(;et<Ee;et++){let He=ue.glyphAt(et);if(He.charIndex>ye)break;et<Ee-Ue&&(_e=Math.min(_e,He.x),Le=Math.max(Le,He.x+He.width))}for(let He=Qe;He<et;He++){const at=ue.glyphAt(He);at.x=Le-(at.x+at.width-_e)}break}}let Fe;const G=pe=>Fe=pe;for(let pe=0;pe<Ee;pe++){const q=ue.glyphAt(pe);Fe=q.glyphObj;const ye=Fe.index,_e=$.levels[q.charIndex]&1;if(_e){const Le=e.getMirroredCharacter(f[q.charIndex]);Le&&q.fontData.fontObj.forEachGlyph(Le,0,0,G)}if(j){const{charIndex:Le,fontData:Be}=q,Qe=q.x+k,et=q.x+q.width+k;be[Le*4]=_e?et:Qe,be[Le*4+1]=_e?Qe:et,be[Le*4+2]=ue.baseline+Be.caretBottom+Y,be[Le*4+3]=ue.baseline+Be.caretTop+Y;const He=Le-de;He>1&&c(be,de,He),de=Le}if(O){const{charIndex:Le}=q;for(;Le>ce;)ce++,O.hasOwnProperty(ce)&&(Oe=O[ce])}if(!Fe.isWhitespace&&!Fe.isEmpty){const Le=Pe++,{fontSizeMult:Be,src:Qe,index:et}=q.fontData,He=te[Qe]||(te[Qe]={});He[ye]||(He[ye]={path:Fe.path,pathBounds:[Fe.xMin,Fe.yMin,Fe.xMax,Fe.yMax]});const at=q.x+k,_t=q.y+ue.baseline+Y;Q[Le*2]=at,Q[Le*2+1]=_t;const Vt=at+Fe.xMin*Be,jt=_t+Fe.yMin*Be,Ot=at+Fe.xMax*Be,rr=_t+Fe.yMax*Be;Vt<le[0]&&(le[0]=Vt),jt<le[1]&&(le[1]=jt),Ot>le[2]&&(le[2]=Ot),rr>le[3]&&(le[3]=rr),Le%K===0&&(me={start:Le,end:Le,rect:[1/0,1/0,-1/0,-1/0]},I.push(me)),me.end++;const xt=me.rect;if(Vt<xt[0]&&(xt[0]=Vt),jt<xt[1]&&(xt[1]=jt),Ot>xt[2]&&(xt[2]=Ot),rr>xt[3]&&(xt[3]=rr),F[Le]=ye,J[Le]=et,O){const Nt=Le*3;se[Nt]=Oe>>16&255,se[Nt+1]=Oe>>8&255,se[Nt+2]=Oe&255}}}}}),be){const ue=f.length-de;ue>1&&c(be,de,ue)}}const ie=[];fe.forEach(({index:$,src:Pe,unitsPerEm:de,ascender:ce,descender:me,lineHeight:Oe,capHeight:ue,xHeight:Je})=>{ie[$]={src:Pe,unitsPerEm:de,ascender:ce,descender:me,lineHeight:Oe,capHeight:ue,xHeight:Je}}),N.typesetting=u()-Ae,W({glyphIds:F,glyphFontIndices:J,glyphPositions:Q,glyphData:te,fontData:ie,caretPositions:be,glyphColors:se,chunkedBounds:I,fontSize:m,topBaseline:Y+b[0].baseline,blockBounds:[k,Y-y,k+Ne,Y],visibleBounds:le,timings:N})})}function s(f,g){o({...f,metricsOnly:!0},v=>{const[p,m,T,_]=v.blockBounds;g({width:T-p,height:_-m})})}function l(f){let g=f.match(/^([\d.]+)%$/),v=g?parseFloat(g[1]):NaN;return isNaN(v)?0:v/100}function c(f,g,v){const p=f[g*4],m=f[g*4+1],T=f[g*4+2],_=f[g*4+3],S=(m-p)/v;for(let R=0;R<v;R++){const A=(g+R)*4;f[A]=p+S*R,f[A+1]=p+S*(R+1),f[A+2]=T,f[A+3]=_}}function u(){return(self.performance||Date).now()}function h(){this.data=[]}const d=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/d.length)},glyphAt(f){let g=h.flyweight;return g.data=this.data,g.index=f,g},splitAt(f){let g=new h;return g.data=this.data.splice(f*d.length),g}},h.flyweight=d.reduce((f,g,v,p)=>(Object.defineProperty(f,g,{get(){return this.data[this.index*d.length+v]},set(m){this.data[this.index*d.length+v]=m}}),f),{data:null,index:0}),{typeset:o,measure:s}}const zr=()=>(self.performance||Date).now(),La=Co();let Io;function ip(n,e,t,a,r,i,o,s,l,c,u=!0){return u?np(n,e,t,a,r,i,o,s,l,c).then(null,h=>(Io||(console.warn("WebGL SDF generation failed, falling back to JS",h),Io=!0),No(n,e,t,a,r,i,o,s,l,c))):No(n,e,t,a,r,i,o,s,l,c)}const Ia=[],ap=5;let In=0;function Fo(){const n=zr();for(;Ia.length&&zr()-n<ap;)Ia.shift()();In=Ia.length?setTimeout(Fo,0):0}const np=(...n)=>new Promise((e,t)=>{Ia.push(()=>{const a=zr();try{La.webgl.generateIntoCanvas(...n),e({timing:zr()-a})}catch(r){t(r)}}),In||(In=setTimeout(Fo,0))}),sp=4,op=2e3,Oo={};let lp=0;function No(n,e,t,a,r,i,o,s,l,c){const u="TroikaTextSDFGenerator_JS_"+lp++%sp;let h=Oo[u];return h||(h=Oo[u]={workerModule:di({name:u,workerId:u,dependencies:[Co,zr],init(d,f){const g=d().javascript.generate;return function(...v){const p=f();return{textureData:g(...v),timing:f()-p}}},getTransferables(d){return[d.textureData.buffer]}}),requests:0,idleTimer:null}),h.requests++,clearTimeout(h.idleTimer),h.workerModule(n,e,t,a,r,i).then(({textureData:d,timing:f})=>{const g=zr(),v=new Uint8Array(d.length*4);for(let p=0;p<d.length;p++)v[p*4+c]=d[p];return La.webglUtils.renderImageData(o,v,s,l,n,e,1<<3-c),f+=zr()-g,--h.requests===0&&(h.idleTimer=setTimeout(()=>{Bf(u)},op)),{timing:f}})}function cp(n){n._warm||(La.webgl.isSupported(n),n._warm=!0)}const up=La.webglUtils.resizeWebGLCanvasWithoutClearing,Wi={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},hp=new he;function fi(){return(self.performance||Date).now()}const zo=Object.create(null);function dp(n,e){n=pp({},n);const t=fi(),a=[];if(n.font&&a.push({label:"user",src:mp(n.font)}),n.font=a,n.text=""+n.text,n.sdfGlyphSize=n.sdfGlyphSize||Wi.sdfGlyphSize,n.unicodeFontsURL=n.unicodeFontsURL||Wi.unicodeFontsURL,n.colorRanges!=null){let h={};for(let d in n.colorRanges)if(n.colorRanges.hasOwnProperty(d)){let f=n.colorRanges[d];typeof f!="number"&&(f=hp.set(f).getHex()),h[d]=f}n.colorRanges=h}Object.freeze(n);const{textureWidth:r,sdfExponent:i}=Wi,{sdfGlyphSize:o}=n,s=r/o*4;let l=zo[o];if(!l){const h=document.createElement("canvas");h.width=r,h.height=o*256/s,l=zo[o]={glyphCount:0,sdfGlyphSize:o,sdfCanvas:h,sdfTexture:new St(h,void 0,void 0,void 0,1006,1006),contextLost:!1,glyphsByFont:new Map},l.sdfTexture.generateMipmaps=!1,fp(l)}const{sdfTexture:c,sdfCanvas:u}=l;Go(n).then(h=>{const{glyphIds:d,glyphFontIndices:f,fontData:g,glyphPositions:v,fontSize:p,timings:m}=h,T=[],_=new Float32Array(d.length*4);let S=0,R=0;const A=fi(),M=g.map(U=>{let B=l.glyphsByFont.get(U.src);return B||l.glyphsByFont.set(U.src,B=new Map),B});d.forEach((U,B)=>{const C=f[B],{src:V,unitsPerEm:z}=g[C];let j=M[C].get(U);if(!j){const{path:N,pathBounds:X}=h.glyphData[V][U],D=Math.max(X[2]-X[0],X[3]-X[1])/o*(Wi.sdfMargin*o+.5),F=l.glyphCount++,J=[X[0]-D,X[1]-D,X[2]+D,X[3]+D];M[C].set(U,j={path:N,atlasIndex:F,sdfViewBox:J}),T.push(j)}const{sdfViewBox:K}=j,O=v[R++],W=v[R++],P=p/z;_[S++]=O+K[0]*P,_[S++]=W+K[1]*P,_[S++]=O+K[2]*P,_[S++]=W+K[3]*P,d[B]=j.atlasIndex}),m.quads=(m.quads||0)+(fi()-A);const L=fi();m.sdf={};const H=u.height,x=Math.ceil(l.glyphCount/s),E=Math.pow(2,Math.ceil(Math.log2(x*o)));E>H&&(console.info(`Increasing SDF texture size ${H}->${E}`),up(u,r,E),c.dispose()),Promise.all(T.map(U=>Bo(U,l,n.gpuAccelerateSDF).then(({timing:B})=>{m.sdf[U.atlasIndex]=B}))).then(()=>{T.length&&!l.contextLost&&(ko(l),c.needsUpdate=!0),m.sdfTotal=fi()-L,m.total=fi()-t,e(Object.freeze({parameters:n,sdfTexture:c,sdfGlyphSize:o,sdfExponent:i,glyphBounds:_,glyphAtlasIndices:d,glyphColors:h.glyphColors,caretPositions:h.caretPositions,chunkedBounds:h.chunkedBounds,ascender:h.ascender,descender:h.descender,lineHeight:h.lineHeight,capHeight:h.capHeight,xHeight:h.xHeight,topBaseline:h.topBaseline,blockBounds:h.blockBounds,visibleBounds:h.visibleBounds,timings:h.timings}))})}),Promise.resolve().then(()=>{l.contextLost||cp(u)})}function Bo({path:n,atlasIndex:e,sdfViewBox:t},{sdfGlyphSize:a,sdfCanvas:r,contextLost:i},o){if(i)return Promise.resolve({timing:-1});const{textureWidth:s,sdfExponent:l}=Wi,c=Math.max(t[2]-t[0],t[3]-t[1]),u=Math.floor(e/4),h=u%(s/a)*a,d=Math.floor(u/(s/a))*a,f=e%4;return ip(a,a,n,t,c,l,r,h,d,f,o)}function fp(n){const e=n.sdfCanvas;e.addEventListener("webglcontextlost",t=>{console.log("Context Lost",t),t.preventDefault(),n.contextLost=!0}),e.addEventListener("webglcontextrestored",t=>{console.log("Context Restored",t),n.contextLost=!1;const a=[];n.glyphsByFont.forEach(r=>{r.forEach(i=>{a.push(Bo(i,n,!0))})}),Promise.all(a).then(()=>{ko(n),n.sdfTexture.needsUpdate=!0})})}function pp(n,e){for(let t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}let Fa;function mp(n){return Fa||(Fa=typeof document>"u"?{}:document.createElement("a")),Fa.href=n,Fa.href}function ko(n){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:e,sdfTexture:t}=n,{width:a,height:r}=e,i=n.sdfCanvas.getContext("webgl");let o=t.image.data;(!o||o.length!==a*r*4)&&(o=new Uint8Array(a*r*4),t.image={width:a,height:r,data:o},t.flipY=!1,t.isDataTexture=!0),i.readPixels(0,0,a,r,i.RGBA,i.UNSIGNED_BYTE,o)}}const gp=di({name:"Typesetter",dependencies:[rp,tp,Gf],init(n,e,t){return n(e,t())}}),Go=di({name:"Typesetter",dependencies:[gp],init(n){return function(e){return new Promise(t=>{n.typeset(e,t)})}},getTransferables(n){const e=[];for(let t in n)n[t]&&n[t].buffer&&e.push(n[t].buffer);return e}});Go.onMainThread;const Ho={};function vp(n){let e=Ho[n];return e||(e=Ho[n]=new $e(1,1,n,n).translate(.5,.5,0)),e}const _p="aTroikaGlyphBounds",Vo="aTroikaGlyphIndex",xp="aTroikaGlyphColor";class yp extends Tf{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new Cr,this.boundingBox=new sr}computeBoundingSphere(){}computeBoundingBox(){}set detail(e){if(e!==this._detail){this._detail=e,(typeof e!="number"||e<1)&&(e=1);let t=vp(e);["position","normal","uv"].forEach(a=>{this.attributes[a]=t.attributes[a].clone()}),this.setIndex(t.getIndex().clone())}}get detail(){return this._detail}set curveRadius(e){e!==this._curveRadius&&(this._curveRadius=e,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(e,t,a,r,i){this.updateAttributeData(_p,e,4),this.updateAttributeData(Vo,t,1),this.updateAttributeData(xp,i,3),this._blockBounds=a,this._chunkedBounds=r,this.instanceCount=t.length,this._updateBounds()}_updateBounds(){const e=this._blockBounds;if(e){const{curveRadius:t,boundingBox:a}=this;if(t){const{PI:r,floor:i,min:o,max:s,sin:l,cos:c}=Math,u=r/2,h=r*2,d=Math.abs(t),f=e[0]/d,g=e[2]/d,v=i((f+u)/h)!==i((g+u)/h)?-d:o(l(f)*d,l(g)*d),p=i((f-u)/h)!==i((g-u)/h)?d:s(l(f)*d,l(g)*d),m=i((f+r)/h)!==i((g+r)/h)?d*2:s(d-c(f)*d,d-c(g)*d);a.min.set(v,e[1],t<0?-m:0),a.max.set(p,e[3],t<0?0:m)}else a.min.set(e[0],e[1],0),a.max.set(e[2],e[3],0);a.getBoundingSphere(this.boundingSphere)}}applyClipRect(e){let t=this.getAttribute(Vo).count,a=this._chunkedBounds;if(a)for(let r=a.length;r--;){t=a[r].end;let i=a[r].rect;if(i[1]<e.w&&i[3]>e.y&&i[0]<e.z&&i[2]>e.x)break}this.instanceCount=t}updateAttributeData(e,t,a){const r=this.getAttribute(e);t?r&&r.array.length===t.length?(r.array.set(t),r.needsUpdate=!0):(this.setAttribute(e,new Or(t,a)),delete this._maxInstanceCount,this.dispose()):r&&this.deleteAttribute(e)}}const bp=`
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
`,Sp=`
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
`,Mp=`
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
`,Tp=`
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
`;function Ep(n){const e=Ln(n,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new Ie},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new vt(0,0,0,0)},uTroikaClipRect:{value:new vt(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new Ie},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new he},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Ke},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:bp,vertexTransform:Sp,fragmentDefs:Mp,fragmentColorTransform:Tp,customRewriter({vertexShader:t,fragmentShader:a}){let r=/\buniform\s+vec3\s+diffuse\b/;return r.test(a)&&(a=a.replace(r,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),r.test(t)||(t=t.replace(Ro,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:t,fragmentShader:a}}});return e.transparent=!0,e.forceSinglePass=!0,Object.defineProperties(e,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),e}const Fn=new Fi({color:16777215,side:2,transparent:!0}),Wo=8421504,Xo=new lt,Oa=new re,On=new re,Xi=[],wp=new re,Nn="+x+y";function qo(n){return Array.isArray(n)?n[0]:n}let jo=()=>{const n=new Xe(new $e(1,1),Fn);return jo=()=>n,n},Yo=()=>{const n=new Xe(new $e(1,1,32,1),Fn);return Yo=()=>n,n};const Ap={type:"syncstart"},Cp={type:"synccomplete"},Zo=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],Rp=Zo.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class qi extends Xe{constructor(){const e=new yp;super(e,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=Wo,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Nn,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(e){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(e):(this._isSyncing=!0,this.dispatchEvent(Ap),dp({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},t=>{this._isSyncing=!1,this._textRenderInfo=t,this.geometry.updateGlyphs(t.glyphBounds,t.glyphAtlasIndices,t.blockBounds,t.chunkedBounds,t.glyphColors);const a=this._queuedSyncs;a&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{a.forEach(r=>r&&r())})),this.dispatchEvent(Cp),e&&e()})))}onBeforeRender(e,t,a,r,i,o){this.sync(),i.isTroikaTextMaterial&&this._prepareForRender(i)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(e){return Ep(e)}get material(){let e=this._derivedMaterial;const t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Fn.clone());if((!e||!e.isDerivedFrom(t))&&(e=this._derivedMaterial=this.createDerivedMaterial(t),t.addEventListener("dispose",function a(){t.removeEventListener("dispose",a),e.dispose()})),this.hasOutline()){let a=e._outlineMtl;return a||(a=e._outlineMtl=Object.create(e,{id:{value:e.id+.1}}),a.isTextOutlineMaterial=!0,a.depthWrite=!1,a.map=null,e.addEventListener("dispose",function r(){e.removeEventListener("dispose",r),a.dispose()})),[a,e]}else return e}set material(e){e&&e.isTroikaTextMaterial?(this._derivedMaterial=e,this._baseMaterial=e.baseMaterial):this._baseMaterial=e}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(e){this.geometry.detail=e}get curveRadius(){return this.geometry.curveRadius}set curveRadius(e){this.geometry.curveRadius=e}get customDepthMaterial(){return qo(this.material).getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return qo(this.material).getDistanceMaterial()}set customDistanceMaterial(e){}_prepareForRender(e){const t=e.isTextOutlineMaterial,a=e.uniforms,r=this.textRenderInfo;if(r){const{sdfTexture:s,blockBounds:l}=r;a.uTroikaSDFTexture.value=s,a.uTroikaSDFTextureSize.value.set(s.image.width,s.image.height),a.uTroikaSDFGlyphSize.value=r.sdfGlyphSize,a.uTroikaSDFExponent.value=r.sdfExponent,a.uTroikaTotalBounds.value.fromArray(l),a.uTroikaUseGlyphColors.value=!t&&!!r.glyphColors;let c=0,u=0,h=0,d,f,g,v=0,p=0;if(t){let{outlineWidth:T,outlineOffsetX:_,outlineOffsetY:S,outlineBlur:R,outlineOpacity:A}=this;c=this._parsePercent(T)||0,u=Math.max(0,this._parsePercent(R)||0),d=A,v=this._parsePercent(_)||0,p=this._parsePercent(S)||0}else h=Math.max(0,this._parsePercent(this.strokeWidth)||0),h&&(g=this.strokeColor,a.uTroikaStrokeColor.value.set(g??Wo),f=this.strokeOpacity,f==null&&(f=1)),d=this.fillOpacity;a.uTroikaEdgeOffset.value=c,a.uTroikaPositionOffset.value.set(v,p),a.uTroikaBlurRadius.value=u,a.uTroikaStrokeWidth.value=h,a.uTroikaStrokeOpacity.value=f,a.uTroikaFillOpacity.value=d??1,a.uTroikaCurveRadius.value=this.curveRadius||0;let m=this.clipRect;if(m&&Array.isArray(m)&&m.length===4)a.uTroikaClipRect.value.fromArray(m);else{const T=(this.fontSize||.1)*100;a.uTroikaClipRect.value.set(l[0]-T,l[1]-T,l[2]+T,l[3]+T)}this.geometry.applyClipRect(a.uTroikaClipRect.value)}a.uTroikaSDFDebug.value=!!this.debugSDF,e.polygonOffset=!!this.depthOffset,e.polygonOffsetFactor=e.polygonOffsetUnits=this.depthOffset||0;const i=t?this.outlineColor||0:this.color;if(i==null)delete e.color;else{const s=e.hasOwnProperty("color")?e.color:e.color=new he;(i!==s._input||typeof i=="object")&&s.set(s._input=i)}let o=this.orientation||Nn;if(o!==e._orientation){let s=a.uTroikaOrient.value;o=o.replace(/[^-+xyz]/g,"");let l=o!==Nn&&o.match(/^([-+])([xyz])([-+])([xyz])$/);if(l){let[,c,u,h,d]=l;Oa.set(0,0,0)[u]=c==="-"?1:-1,On.set(0,0,0)[d]=h==="-"?-1:1,Xo.lookAt(wp,Oa.cross(On),On),s.setFromMatrix4(Xo)}else s.identity();e._orientation=o}}_parsePercent(e){if(typeof e=="string"){let t=e.match(/^(-?[\d.]+)%$/),a=t?parseFloat(t[1]):NaN;e=(isNaN(a)?0:a/100)*this.fontSize}return e}localPositionToTextCoords(e,t=new Ie){t.copy(e);const a=this.curveRadius;return a&&(t.x=Math.atan2(e.x,Math.abs(a)-Math.abs(e.z))*Math.abs(a)),t}worldPositionToTextCoords(e,t=new Ie){return Oa.copy(e),this.localPositionToTextCoords(this.worldToLocal(Oa),t)}raycast(e,t){const{textRenderInfo:a,curveRadius:r}=this;if(a){const i=a.blockBounds,o=r?Yo():jo(),s=o.geometry,{position:l,uv:c}=s.attributes;for(let u=0;u<c.count;u++){let h=i[0]+c.getX(u)*(i[2]-i[0]);const d=i[1]+c.getY(u)*(i[3]-i[1]);let f=0;r&&(f=r-Math.cos(h/r)*r,h=Math.sin(h/r)*r),l.setXYZ(u,h,d,f)}s.boundingSphere=this.geometry.boundingSphere,s.boundingBox=this.geometry.boundingBox,o.matrixWorld=this.matrixWorld,o.material.side=this.material.side,Xi.length=0,o.raycast(e,Xi);for(let u=0;u<Xi.length;u++)Xi[u].object=this,t.push(Xi[u])}}copy(e){const t=this.geometry;return super.copy(e),this.geometry=t,Rp.forEach(a=>{this[a]=e[a]}),this}clone(){return new this.constructor().copy(this)}}Zo.forEach(n=>{const e="_private_"+n;Object.defineProperty(qi.prototype,n,{get(){return this[e]},set(t){t!==this[e]&&(this[e]=t,this._needsSync=!0)}})}),new sr,new he;class Pp{constructor(e){this.camera=e,this.opacity=0,this.targetOpacity=0,this.group=new ui,this.group.layers.set(1),this.titleText=new qi,this.titleText.fontSize=.12,this.titleText.color=16777215,this.titleText.anchorX="center",this.titleText.anchorY="middle",this.titleText.position.set(0,.08,-1),this.titleText.fillOpacity=0,this.titleText.outlineWidth=.004,this.titleText.outlineColor=8965375,this.titleText.outlineOpacity=.6,this.titleText.text="",this.titleText.sync(),this.group.add(this.titleText),this.artistText=new qi,this.artistText.fontSize=.07,this.artistText.color=11197951,this.artistText.anchorX="center",this.artistText.anchorY="middle",this.artistText.position.set(0,-.05,-1),this.artistText.fillOpacity=0,this.artistText.outlineWidth=.002,this.artistText.outlineColor=6724044,this.artistText.outlineOpacity=.4,this.artistText.text="",this.artistText.sync(),this.group.add(this.artistText);const t=new $e(1.6,.5),a=new qe({transparent:!0,depthWrite:!1,uniforms:{u_opacity:{value:0},u_color:{value:new he(1714762)}},vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float u_opacity;
        uniform vec3 u_color;
        varying vec2 vUv;
        void main() {
          vec2 center = vUv - 0.5;
          float dist = length(center * vec2(1.0, 2.0));
          float alpha = smoothstep(0.5, 0.0, dist) * u_opacity * 0.6;
          gl_FragColor = vec4(u_color, alpha);
        }
      `});this.glowMesh=new Xe(t,a),this.glowMesh.position.set(0,0,-1.01),this.group.add(this.glowMesh)}setTrack(e,t){this.titleText.text=e,this.artistText.text=t,this.titleText.sync(),this.artistText.sync()}setVisible(e){this.targetOpacity=e?1:0}update(e){this.opacity+=(this.targetOpacity-this.opacity)*.04;const t=1+e*.3;this.titleText.fillOpacity=this.opacity*t,this.titleText.outlineWidth=.004+e*.002,this.artistText.fillOpacity=this.opacity*.85*t;const a=this.glowMesh.material;a.uniforms.u_opacity.value=this.opacity}addToScene(e){e.add(this.group)}removeFromScene(e){e.remove(this.group)}dispose(){this.titleText.dispose(),this.artistText.dispose(),this.glowMesh.geometry.dispose(),this.glowMesh.material.dispose()}}const zn=5,Bn=.09,kn=.055,Up=.065,Ko=-1,Dp=.25,Jo=6710920,Lp=16777215,$o=16777215,Ip=8952575;class Fp{constructor(){this.slots=[],this.timeline=[],this.activeLineIdx=-1,this.targetScrollY=0,this.currentScrollY=0,this.opacity=0,this.targetOpacity=0,this.lastTime=0,this.lastTimeStamp=0,this.interpolatedTime=0,this.group=new ui,this.group.layers.set(1);for(let e=0;e<zn;e++){const t=new qi;t.fontSize=kn,t.color=Jo,t.anchorX="center",t.anchorY="middle",t.position.set(0,0,Ko),t.fillOpacity=0,t.maxWidth=1.4,t.textAlign="center",t.text="",t.layers.set(1),t.sync(),this.group.add(t);const a=new qi;a.fontSize=kn,a.color=$o,a.anchorX="center",a.anchorY="middle",a.position.set(0,0,Ko+.001),a.fillOpacity=0,a.maxWidth=1.4,a.textAlign="center",a.text="",a.layers.set(1),a.clipRect=[0,-1/0,0,1/0],a.sync(),this.group.add(a),this.slots.push({textMesh:t,fillMesh:a,lineIdx:-1,assigned:!1})}}setTimeline(e){this.timeline=e.filter(t=>t.type!=="vocal_cue"&&t.text),this.activeLineIdx=-1,this.currentScrollY=0,this.targetScrollY=0,this.slots.forEach(t=>{t.textMesh.text="",t.fillMesh.text="",t.assigned=!1,t.lineIdx=-1,t.textMesh.fillOpacity=0,t.fillMesh.fillOpacity=0}),this.targetOpacity=this.timeline.length>0?1:0}setVisible(e){this.targetOpacity=e&&this.timeline.length>0?1:0}setCurrentTime(e){this.lastTime=e,this.lastTimeStamp=performance.now()}update(e){if(!this.timeline.length){this.opacity+=(0-this.opacity)*.05;return}const t=(performance.now()-this.lastTimeStamp)/1e3;this.interpolatedTime=this.lastTime+t+.05;const a=this.interpolatedTime;let r=-1;for(let o=0;o<this.timeline.length;o++){const s=this.timeline[o];if(a>=s.start&&a<s.end){r=o;break}}if(r===-1){for(let o=0;o<this.timeline.length;o++)if(a<this.timeline[o].start){o>0&&a-this.timeline[o-1].end<2&&(r=o-1);break}}r!==this.activeLineIdx&&(this.activeLineIdx=r,this.assignSlots()),this.activeLineIdx>=0&&(this.targetScrollY=this.activeLineIdx*Bn),this.currentScrollY+=(this.targetScrollY-this.currentScrollY)*Dp,this.opacity+=(this.targetOpacity-this.opacity)*.05;const i=Math.floor(zn/2);for(let o=0;o<this.slots.length;o++){const s=this.slots[o];if(!s.assigned||s.lineIdx<0){s.textMesh.fillOpacity=0,s.fillMesh.fillOpacity=0;continue}const l=this.timeline[s.lineIdx];(s.lineIdx-this.activeLineIdx)*-Bn+(this.targetScrollY-this.currentScrollY)*0;const c=(i-o)*Bn;s.textMesh.position.y=c,s.fillMesh.position.y=c;const u=s.lineIdx===this.activeLineIdx,h=s.lineIdx<this.activeLineIdx,d=Math.abs(s.lineIdx-this.activeLineIdx),f=Math.abs(this.targetScrollY-this.currentScrollY)>.002;let g;f?g=u?1:.6:u?g=1:d===1?g=.4:d===2?g=.3:d<=4?g=.2:g=.15;const v=u?Up:kn;if(s.textMesh.fontSize=v,s.fillMesh.fontSize=v,s.textMesh.color=u?Lp:h?Ip:Jo,s.textMesh.fillOpacity=this.opacity*g,u&&l.words&&l.words.length>0){const p=-.7+this.computeWordFillProgress(l,a)*1.4;s.fillMesh.clipRect=[-.8,-1/0,p,1/0],s.fillMesh.fillOpacity=this.opacity,s.fillMesh.color=$o}else if(u){const p=-.7+(l.end>l.start?Math.max(0,Math.min(1,(a-l.start)/(l.end-l.start))):0)*1.4;s.fillMesh.clipRect=[-.8,-1/0,p,1/0],s.fillMesh.fillOpacity=this.opacity}else s.fillMesh.fillOpacity=0;u?(s.textMesh.outlineWidth=.002+e*.003,s.textMesh.outlineColor=4491519,s.textMesh.outlineOpacity=.4+e*.4):(s.textMesh.outlineWidth=0,s.textMesh.outlineOpacity=0)}}computeWordFillProgress(e,t){const a=e.words;if(!a.length)return 0;let r=0;const i=(e.text||"").length||1;let o=0;for(const s of a){const l=s.text.length;if(t>=s.end)r=o+l;else if(t>=s.start){const c=(t-s.start)/(s.end-s.start),u=1-Math.pow(1-c,3.5);r=o+u*l}o+=l+1}return Math.min(1,r/i)}assignSlots(){const e=this.activeLineIdx>=0?this.activeLineIdx:0,t=Math.floor(zn/2),a=Math.max(0,e-t),r=Math.min(this.timeline.length-1,e+t);for(let i=0;i<this.slots.length;i++){const o=a+i,s=this.slots[i];if(o>r||o>=this.timeline.length){s.assigned&&(s.assigned=!1,s.lineIdx=-1,s.textMesh.fillOpacity=0,s.fillMesh.fillOpacity=0);continue}const l=this.timeline[o];s.lineIdx!==o&&(s.lineIdx=o,s.textMesh.text=l.text,s.fillMesh.text=l.text,s.textMesh.sync(),s.fillMesh.sync()),s.assigned=!0}}addToScene(e){e.add(this.group)}removeFromScene(e){e.remove(this.group)}dispose(){this.slots.forEach(e=>{e.textMesh.dispose(),e.fillMesh.dispose()})}}class st{constructor(){this.scene=new Aa,this.camera=new Ht(75,window.innerWidth/window.innerHeight,.1,1e3)}resize(e,t,a){this.camera instanceof Ht&&(this.camera.aspect=e/t,this.camera.updateProjectionMatrix())}}var ot=`varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Op=`precision highp float;
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

  for (int i = 0; i < 11; i++) {
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

  for (int i = 0; i < 100; i++) {
    vec3 p = ro + rd * t;
    float d = julia4D(p, c);
    if (d < 0.001) {
      
      float glow = 1.0 - float(i) / 100.0;
      float colorIdx = glow * 2.0;
      vec3 baseCol = colorIdx < 1.0 ? mix(u_colors[0], u_colors[1], colorIdx) : mix(u_colors[1], u_colors[2], colorIdx - 1.0);
      col = baseCol * (0.4 + glow * 0.8);
      break;
    }
    t += d;
    if (t > 10.0) break;
  }

  
  col += u_colors[2] * u_treble * 0.3;

  
  vec3 bg = u_colors[0] * 0.15 + u_colors[2] * 0.05 * (1.0 - length(uv));
  float hit = step(0.01, length(col));
  col = mix(bg, col, hit);

  gl_FragColor = vec4(col, 1.0);
}`;class Np extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Op,uniforms:{u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(1705267),new he(4856130),new he(996448)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_treble.value=e.treble}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var zp=`precision highp float;
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
}`,Bp=`uniform sampler2D u_positions;
uniform float u_bass;
attribute vec2 a_ref;
varying vec3 vColor;

void main() {
  vec3 pos = texture2D(u_positions, a_ref).xyz;
  
  pos *= 0.03 * (1.0 + u_bass * 0.5);
  vColor = normalize(abs(pos)) * 0.8 + 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 1.5;
}`,kp=`varying vec3 vColor;
void main() {
  gl_FragColor = vec4(vColor, 1.0);
}`;const dt=512;class Gp extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.scene.background=new he(328208),this.camera.position.z=3;const t=new Float32Array(dt*dt*4);for(let l=0;l<dt*dt;l++)t[l*4]=(Math.random()-.5)*50,t[l*4+1]=(Math.random()-.5)*50,t[l*4+2]=Math.random()*50,t[l*4+3]=1;const a=new zi(t,dt,dt,1023,1015);a.needsUpdate=!0;const r={minFilter:1003,magFilter:1003,format:1023,type:1015};this.rt1=new pt(dt,dt,r),this.rt2=new pt(dt,dt,r),this.simCamera=new tt(-1,1,1,-1,0,1),this.simScene=new Aa,this.simMaterial=new qe({vertexShader:ot,fragmentShader:zp,uniforms:{u_positions:{value:a},u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_resolution:{value:new Ie(dt,dt)}}});const i=new Xe(new $e(2,2),this.simMaterial);this.simScene.add(i),e.setRenderTarget(this.rt1),e.render(this.simScene,this.simCamera),e.setRenderTarget(null);const o=new Float32Array(dt*dt*2);for(let l=0;l<dt;l++)for(let c=0;c<dt;c++){const u=l*dt+c;o[u*2]=c/dt,o[u*2+1]=l/dt}const s=new qt;s.setAttribute("position",new kt(new Float32Array(dt*dt*3),3)),s.setAttribute("a_ref",new kt(o,2)),this.renderMaterial=new qe({vertexShader:Bp,fragmentShader:kp,uniforms:{u_positions:{value:this.rt1.texture},u_bass:{value:0}},transparent:!0,depthWrite:!1}),this.particles=new vf(s,this.renderMaterial),this.scene.add(this.particles),this.gpuCompute={rt1:this.rt1,rt2:this.rt2,simMat:this.simMaterial,mesh:i}}update(e,t){const a=this.flip?this.rt2:this.rt1,r=this.flip?this.rt1:this.rt2;this.simMaterial.uniforms.u_positions.value=a.texture,this.simMaterial.uniforms.u_time.value=t,this.simMaterial.uniforms.u_bass.value=e.bass,this.simMaterial.uniforms.u_treble.value=e.treble,this.renderer.setRenderTarget(r),this.renderer.render(this.simScene,this.simCamera),this.renderer.setRenderTarget(null),this.renderMaterial.uniforms.u_positions.value=r.texture,this.renderMaterial.uniforms.u_bass.value=e.bass,this.flip=!this.flip,this.camera.position.x=Math.sin(t*.1)*3,this.camera.position.z=Math.cos(t*.1)*3,this.camera.lookAt(0,0,0)}dispose(){this.rt1.dispose(),this.rt2.dispose(),this.simMaterial.dispose(),this.renderMaterial.dispose()}}var Hp=`uniform float u_time;
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
}`,Vp=`uniform float u_time;
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
}`;class Wp extends st{constructor(){super(),this.scene.background=new he(196882),this.camera.position.z=3,this.freqData=new Uint8Array(256),this.freqTexture=new zi(this.freqData,256,1,1028,1009),this.freqTexture.needsUpdate=!0,this.material=new qe({vertexShader:Hp,fragmentShader:Vp,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_freqData:{value:this.freqTexture},u_colors:{value:[new he(196882),new he(1718906),new he(8247039)]}}});const e=new Xe(new Gn(1,128,128),this.material);this.scene.add(e),this.scene.add(new Mf(1118498))}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble;for(let a=0;a<256;a++){const r=a/256;this.freqData[a]=Math.floor((e.bass*(1-r)+e.treble*r)*255*(.5+.5*Math.sin(r*20+t*3)))}this.freqTexture.needsUpdate=!0}dispose(){this.material.dispose(),this.freqTexture.dispose()}}var Xp=`precision highp float;
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
}`;const At=512;class qp extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.camera=new tt(-1,1,1,-1,0,1);const t={minFilter:1006,magFilter:1006,format:1023,type:1015};this.rt1=new pt(At,At,t),this.rt2=new pt(At,At,t);const a=new Float32Array(At*At*4);for(let i=0;i<At*At;i++){const o=i%At/At-.5,s=Math.floor(i/At)/At-.5;a[i*4]=1,a[i*4+1]=Math.abs(o)<.05&&Math.abs(s)<.05?1:0,a[i*4+2]=0,a[i*4+3]=1}const r=new zi(a,At,At,1023,1015);r.needsUpdate=!0,this.simCamera=new tt(-1,1,1,-1,0,1),this.simScene=new Aa,this.simMaterial=new qe({vertexShader:ot,fragmentShader:Xp,uniforms:{u_state:{value:r},u_resolution:{value:new Ie(At,At)},u_bass:{value:0},u_treble:{value:0},u_time:{value:0}}}),this.simScene.add(new Xe(new $e(2,2),this.simMaterial)),e.setRenderTarget(this.rt1),e.render(this.simScene,this.simCamera),e.setRenderTarget(null),this.displayMaterial=new Fi({map:this.rt1.texture}),this.scene.add(new Xe(new $e(2,2),this.displayMaterial))}update(e,t){for(let a=0;a<8;a++){const r=this.flip?this.rt2:this.rt1,i=this.flip?this.rt1:this.rt2;this.simMaterial.uniforms.u_state.value=r.texture,this.simMaterial.uniforms.u_bass.value=e.bass,this.simMaterial.uniforms.u_treble.value=e.treble,this.simMaterial.uniforms.u_time.value=t,this.renderer.setRenderTarget(i),this.renderer.render(this.simScene,this.simCamera),this.flip=!this.flip}this.renderer.setRenderTarget(null),this.displayMaterial.map=(this.flip?this.rt2:this.rt1).texture,this.displayMaterial.needsUpdate=!0}dispose(){this.rt1.dispose(),this.rt2.dispose(),this.simMaterial.dispose(),this.displayMaterial.dispose()}}var jp=`precision highp float;
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

  for (int i = 0; i < 20; i++) {
    
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
}`;class Yp extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:jp,uniforms:{u_time:{value:0},u_rms:{value:0},u_mid:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)}}}),this.scene.add(new Xe(new $e(2,2),this.material))}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_rms.value=e.rms,this.material.uniforms.u_mid.value=e.mid}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var Zp=`uniform float u_time;
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
}`;class Kp extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Zp,uniforms:{u_time:{value:0},u_bass:{value:0},u_rms:{value:0},u_smoothing:{value:.5},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(1705267),new he(4856130),new he(996448)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var Jp=`precision highp float;
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
}`,$p=`precision highp float;
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
}`;const pi=256;class Qo extends st{constructor(e){super(),this.flip=!1,this.renderer=e,this.camera=new tt(-1,1,1,-1,0,1);const t=128,a=new Uint8Array(t*t*4);for(let u=0;u<t;u++)for(let h=0;h<t;h++){const d=(u*t+h)*4,f=h/t,g=u/t;a[d]=Math.floor((.1+f*.2)*255),a[d+1]=Math.floor((.05+g*.15)*255),a[d+2]=Math.floor((.2+(f+g)*.15)*255),a[d+3]=255}this.defaultTexture=new zi(a,t,t,1023),this.defaultTexture.needsUpdate=!0,this.albumTexture=this.defaultTexture;const r={minFilter:1006,magFilter:1006,format:1023,type:1016};this.velRT1=new pt(pi,pi,r),this.velRT2=new pt(pi,pi,r);const i=window.innerWidth,o=window.innerHeight,s={minFilter:1006,magFilter:1006,format:1023,type:1009};this.frameRT1=new pt(i,o,s),this.frameRT2=new pt(i,o,s),this.simCamera=new tt(-1,1,1,-1,0,1),this.simScene=new Aa,this.velMaterial=new qe({vertexShader:ot,fragmentShader:Jp,uniforms:{u_velocity:{value:null},u_pressure:{value:null},u_resolution:{value:new Ie(pi,pi)},u_time:{value:0},u_bass:{value:0},u_dissipation:{value:.97}}});const l=new Xe(new $e(2,2),this.velMaterial);this.simScene.add(l),this.canvasMaterial=new qe({vertexShader:ot,fragmentShader:$p,uniforms:{u_albumArt:{value:this.albumTexture},u_velocity:{value:this.velRT1.texture},u_prevFrame:{value:this.frameRT1.texture},u_resolution:{value:new Ie(i,o)},u_time:{value:0},u_bass:{value:0},u_treble:{value:0},u_rms:{value:0},u_healRate:{value:.02},u_colors:{value:[new he(1705267),new he(4856130),new he(3377407)]}}});const c=new Xe(new $e(2,2),this.canvasMaterial);this.scene.add(c),console.log("[LivingCanvas] Scene initialized")}setAlbumArt(e){new bf().load(e,t=>{t.minFilter=1006,t.magFilter=1006,this.albumTexture=t,this.canvasMaterial.uniforms.u_albumArt.value=t,console.log("[LivingCanvas] Album art loaded:",e)},void 0,()=>{console.warn("[LivingCanvas] Failed to load album art, using default")})}setAlbumTexture(e){this.albumTexture=e,this.canvasMaterial.uniforms.u_albumArt.value=e}setPalette(e){this.canvasMaterial.uniforms.u_colors.value=e}update(e,t){const a=this.flip?this.velRT2:this.velRT1,r=this.flip?this.velRT1:this.velRT2;this.velMaterial.uniforms.u_velocity.value=a.texture,this.velMaterial.uniforms.u_pressure.value=a.texture,this.velMaterial.uniforms.u_time.value=t,this.velMaterial.uniforms.u_bass.value=e.bass,this.renderer.setRenderTarget(r),this.renderer.render(this.simScene,this.simCamera),this.renderer.setRenderTarget(null),this.canvasMaterial.uniforms.u_velocity.value=r.texture,this.canvasMaterial.uniforms.u_time.value=t,this.canvasMaterial.uniforms.u_bass.value=e.bass,this.canvasMaterial.uniforms.u_treble.value=e.treble,this.canvasMaterial.uniforms.u_rms.value=e.rms;const i=this.flip?this.frameRT2:this.frameRT1,o=this.flip?this.frameRT1:this.frameRT2;this.canvasMaterial.uniforms.u_prevFrame.value=i.texture,this.renderer.setRenderTarget(o),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(null),this.flip=!this.flip}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.canvasMaterial.uniforms.u_resolution.value.set(e*r,t*r),this.frameRT1.setSize(e,t),this.frameRT2.setSize(e,t)}dispose(){this.velRT1.dispose(),this.velRT2.dispose(),this.frameRT1.dispose(),this.frameRT2.dispose(),this.velMaterial.dispose(),this.canvasMaterial.dispose(),this.albumTexture!==this.defaultTexture&&this.albumTexture.dispose(),this.defaultTexture.dispose()}}var Qp=`precision highp float;

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

    
    float tunnel = length(p_mod.xy) - (1.2 + u_bass * 0.8 + sin(p.z * 0.5) * 0.4);

    float scale = 1.8 + u_mid * 0.4;

    
    for (int i = 0; i < 7; i++) {
        p_mod = abs(p_mod) - vec3(0.8, 1.2, 0.6);

        p_mod.xy *= rot(0.5 + u_bass * 0.1 + float(i) * 0.2);
        p_mod.yz *= rot(0.3 + u_treble * 0.1);

        
        if (p_mod.x < p_mod.y) p_mod.xy = p_mod.yx;
        if (p_mod.x < p_mod.z) p_mod.xz = p_mod.zx;

        p_mod = p_mod * scale - vec3(1.0, 2.0, 1.0) * (scale - 1.0);
    }

    float fractal = (length(p_mod) - 1.5) / pow(scale, 7.0);

    
    return smin(fractal, -tunnel, 0.5);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    
    float fov = 1.0 - u_rms * 0.3;
    vec3 rd = normalize(vec3(uv * fov, 1.2));

    
    float baseSpeed = u_time * 3.5;
    float kick = smoothstep(0.5, 1.0, u_bass) * 0.2;
    vec3 ro = vec3(0.0, 0.0, baseSpeed + kick);

    
    ro.x += sin(u_time * 0.7) * 0.5;
    ro.y += cos(u_time * 0.5) * 0.5;

    
    rd.xy *= rot(sin(u_time * 0.3) * 0.2 + u_rms * 0.1);
    rd.xz *= rot(cos(u_time * 0.2) * 0.1);

    float t = 0.05;
    float glow = 0.0;
    float d = 0.0;

    
    for (int i = 0; i < 80; i++) {
        vec3 p = ro + rd * t;
        d = fractalSDF(p);

        
        glow += (0.02 + u_treble * 0.05) / (0.1 + d * d * 15.0);

        if (d < 0.002 || t > 30.0) break;
        t += d * 0.75;
    }

    vec3 col = vec3(0.0);

    
    vec3 bgCol = mix(u_colors[0], u_colors[2], sin(u_time * 0.2) * 0.5 + 0.5);

    if (d < 0.1) {
        float edge = smoothstep(0.1, 0.0, d);
        
        vec3 material = mix(u_colors[1], u_colors[2], fract(t * 0.1 + u_time * 0.1));
        col = material * edge;

        
        col += u_colors[0] * (1.0 - fract(t * 0.5 - u_time * 2.0)) * u_bass;
    }

    
    col += glow * mix(u_colors[1], u_colors[0], u_rms);

    
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
}`;class em extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Qp,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(2754629),new he(6570405),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var tm=`precision highp float;

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
}`;class rm extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:tm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(1706542),new he(4876097),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var im=`precision highp float;

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
    for (int i = 0; i < 5; i++) {
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
        t += d * 0.55;
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
}`;class am extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:im,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(661032),new he(1731386),new he(65484)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var nm=`precision highp float;

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

    
    float sparkle = hash2(uv * 100.0 + u_time * 5.0);
    sparkle = smoothstep(0.98, 1.0, sparkle) * u_treble * 2.0;
    col += u_colors[2] * sparkle;

    
    col *= 1.0 - 0.4 * dot(uv, uv);

    
    col = smoothstep(-0.02, 1.1, col);
    col = pow(col, vec3(0.85));

        
    if (u_debug) { vec2 duv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (duv.x < -0.3) { gl_FragColor = vec4(u_colors[0], 1.0); return; } else if (duv.x < 0.3) { gl_FragColor = vec4(u_colors[1], 1.0); return; } else { gl_FragColor = vec4(u_colors[2], 1.0); return; } }
    
    { vec2 duv2 = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); if (length(duv2 - vec2(0.8, -0.8)) < u_bass * 0.1 + 0.01) col = vec3(1.0); }
    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
}`;class sm extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:nm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(131592),new he(2984526),new he(65450)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var om=`precision highp float;

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
}`;class lm extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:om,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(657946),new he(6702250),new he(52479)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var cm=`precision highp float;

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
}`;class um extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:cm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(657946),new he(6702250),new he(52479)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var hm=`precision highp float;

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

    for (int i = 0; i < 8; i++) {
        p.xyz = abs(p.xyz);
        p -= vec3(1.2, 0.8, 1.0) * explodeForce * (0.2 + float(i) * 0.05);
        p.xy *= rot(twist + float(i) * 0.1);
        p.yz *= rot(twist * 0.7 - u_mid * float(i) * 0.2);
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

    for (int i = 0; i < 80; i++) {
        p = ro + rd * t;
        d = map(p);
        if (d < 0.001 || t > 25.0) break;
        t += d;
    }

    if (d < 0.001) {
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
}`;class dm extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:hm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(657946),new he(16720486),new he(52479)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var fm=`precision highp float;

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

    for (int i = 0; i < 6; i++) {
        q = abs(q) - vec3(0.8 + u_bass * 0.5, 1.0 + u_mid * 0.2, 1.2);

        float r2 = dot(q, q);
        float k = (1.6 + u_bass * 0.4) / clamp(r2, 0.15, 1.8);
        q *= k;
        scale *= k;

        q.xy *= rot(0.5 + u_time * 0.05);
        orbitTrap = min(orbitTrap, abs(q));
    }

    
    float fractal = (abs(length(q.xy) - 0.5) - 0.1) / scale;

    
    float tunnel = -(length(p.xy) - (4.0 + u_bass * 2.0));

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

    float speed = u_time * 6.0 + u_rms * 3.0;
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
        col += rim * u_colors[1] * (u_bass + 0.5);
        col *= ao;

        
        col += u_colors[2] * exp(-abs(d) * 50.0) * u_rms;
    }

    
    col = mix(col, skyCol, smoothstep(10.0, 40.0, t));

    
    col += u_colors[1] * 0.2 * exp(-length(uv) * 3.0) * (u_bass + 0.5);

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.6)), 1.0);
}`;class pm extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:fm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(328976),new he(16724872),new he(61183)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var mm=`precision highp float;

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

    
    vec3 nodeGrowth = vec3(
        0.8 + u_bass * 0.6,
        1.0 + u_rms * 0.4,
        1.2 + u_treble * 0.3
    );

    for (int i = 0; i < 5; i++) {
        q = abs(q) - nodeGrowth;

        float r2 = dot(q, q);
        float k = (1.85 + u_rms * 0.2) / clamp(r2, 0.15, 2.5);
        q *= k;
        scale *= k;

        q.xy *= rot(0.2 + u_time * 0.02 + float(i) * 0.1);
        orbitTrap = min(orbitTrap, abs(q));
    }

    float shapes = (length(q.xy) - 0.5) / scale;
    float cavern = -(length(p.xy) - (3.5 + u_bass));

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
    vec3 rd = normalize(vec3(uv + (u_rms * 0.05 * sin(u_time)), 1.4));

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
        col += fres * u_colors[1] * u_bass;

        
        float lightning = pow(u_rms, 3.0) * 2.0;
        col += u_colors[2] * lightning * exp(-d * 2.0);

        col *= exp(-t * 0.05);
    }

    
    col = mix(col, u_colors[0] * 0.1, smoothstep(5.0, 35.0, t));

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.8)), 1.0);
}`;class gm extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:mm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(328976),new he(16724872),new he(61183)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var vm=`precision highp float;

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

    vec3 nodeGrowth = vec3(
        0.5 + u_bass * 0.8,
        0.7 + u_rms * 0.5,
        0.9 + u_treble * 0.4
    );

    for (int i = 0; i < 6; i++) {
        q = abs(q) - nodeGrowth;

        if (q.x < q.y) q.xy = q.yx;
        if (q.x < q.z) q.xz = q.zx;
        if (q.y < q.z) q.yz = q.zy;

        float r2 = dot(q, q);
        float k = (1.7 + u_rms * 0.25) / clamp(r2, 0.1, 2.0);
        q *= k;
        scale *= k;

        q.xy *= rot(0.3 + u_time * 0.01);
        orbitTrap = min(orbitTrap, abs(q));
    }

    float shapes = (length(q.xz) - 0.2) / abs(scale);

    
    float cavernRadius = 1.8 - u_bass * 0.5;
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
        col += fres * u_colors[1] * u_bass;

        
        float glow = exp(-d * 30.0) * u_rms;
        col += u_colors[2] * glow * 1.5;

        col *= exp(-t * 0.08);
    }

    col = mix(col, u_colors[0] * 0.05, smoothstep(5.0, 25.0, t));

    col = smoothstep(-0.1, 1.1, col);
    gl_FragColor = vec4(pow(col, vec3(0.85)), 1.0);
}`;class _m extends st{constructor(){super(),this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:vm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_debug:{value:!1},u_colors:{value:[new he(328976),new he(16724872),new he(61183)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_mid.value=e.mid,this.material.uniforms.u_treble.value=e.treble,this.material.uniforms.u_rms.value=e.rms}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var xm=`precision highp float;

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

#define MAX_STEPS 80
#define MAX_DIST 20.0
#define SURF_DIST 0.002
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

  
  float maxIter = 4.0 + min(u_energy, 0.6) * 5.0;

  
  vec3 offset = vec3(
    1.0 + u_bass * 0.3,
    0.9 + u_mid * 0.4,
    1.1 + u_treble * 0.3
  );

  for (int i = 0; i < 8; i++) {
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

float softShadow(vec3 ro, vec3 rd, float mint, float maxt) {
  float res = 1.0;
  float t = mint;
  for (int i = 0; i < 16; i++) {
    float h = map(ro + rd * t);
    res = min(res, 8.0 * h / t);
    t += clamp(h, 0.02, 0.2);
    if (h < 0.001 || t > maxt) break;
  }
  return clamp(res, 0.0, 1.0);
}

float calcAO(vec3 pos, vec3 nor) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 5; i++) {
    float h = 0.01 + 0.12 * float(i);
    float d = map(pos + h * nor);
    occ += (h - d) * sca;
    sca *= 0.75;
  }
  return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
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
    float shadow = softShadow(p + n * 0.01, lightDir, 0.01, 5.0);

    
    float colorMix = dot(n, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
    colorMix += length(p) * 0.1;
    float moodShift = u_energy * u_mid; 
    vec3 surfColor = getMoodColor(fract(colorMix), moodShift);

    
    col = surfColor * (0.15 + diff * shadow * 0.7) * ao;
    col += spec * u_colors[2] * (0.3 + u_treble * 0.7) * shadow; 

    
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
}`;class ym extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:xm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:r,treble:i,rms:o}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const s=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>s*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+r*.3+i*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,o<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=r,this.material.uniforms.u_treble.value=i,this.material.uniforms.u_rms.value=o,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var bm=`precision highp float;

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

#define MAX_STEPS 40
#define SURF_DIST 0.008
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

  
  d = smax(d, -(length(q.xy) - (6.0 + safeBass * 3.0)), 1.5);

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
    glow += exp(-sceneData.x * 2.0) * 0.08;
    if (sceneData.x < SURF_DIST || t > 80.0) break;
    t += sceneData.x;
  }

  vec3 finalCol = u_colors[0] * 0.02;
  if (t < 80.0) {
    vec3 baseCol = getCosPalette(sceneData.y + t * 0.02 + sceneData.z * 2.0, u_colors[0], u_colors[1], u_colors[2]);
    float fog = exp(-t * 0.018);
    finalCol = baseCol * fog * 1.6;
    finalCol += u_colors[2] * pow(1.0 - fog, 3.0) * (0.5 + u_bass * 0.6);
    finalCol += u_colors[2] * pow(fog, 5.0) * u_treble * 1.5;
  }

  finalCol += getCosPalette(u_time * 0.02, u_colors[0], u_colors[1], u_colors[2]) * glow * 0.08;
  finalCol += u_colors[2] * u_beat * 0.04;
  finalCol = mix(finalCol, u_colors[0] * 0.03, smoothstep(40.0, 80.0, t));

  gl_FragColor = vec4(pow(finalCol / (1.0 + finalCol), vec3(0.85)), 1.0);
}`;class Sm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:bm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(133136),new he(1722987),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:r,treble:i,rms:o}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const s=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>s*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.9,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.4+r*.35+i*.25)*2;this.currentEnergy=this.currentEnergy*.96+c*.04,this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=r,this.material.uniforms.u_treble.value=i,this.material.uniforms.u_rms.value=o,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var Mm=`precision highp float;

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

#define MAX_STEPS 80
#define MAX_DIST 25.0
#define SURF_DIST 0.001
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
    vec2 e = vec2(0.001, -0.001);
    return normalize(
        e.xyy * map(p + e.xyy) +
        e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) +
        e.xxx * map(p + e.xxx)
    );
}

float calcAO(vec3 p, vec3 n) {
    float occ = 0.0, sca = 1.0;
    for (int i = 0; i < 4; i++) {
        float hr = 0.05 + 0.1 * float(i);
        float d = map(p + n * hr);
        occ += -(d - hr) * sca;
        sca *= 0.85;
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0);
}

vec3 opticalAxis(float t) {
    float angle = t * 0.2 + u_bass * PI;
    return normalize(vec3(sin(angle), cos(angle * 0.7), sin(angle * 0.3 + 0.5)));
}

void birefract(vec3 rd, vec3 n, vec3 axis, float eta_o, float eta_e,
               out vec3 rd_o, out vec3 rd_e) {
    rd_o = refract(rd, n, eta_o);
    
    float cosTheta = abs(dot(rd, axis));
    float eta_eff = mix(eta_e, eta_o, cosTheta * cosTheta);
    rd_e = refract(rd, n, eta_eff);
    
    rd_e = normalize(rd_e + axis * (eta_e - eta_o) * 0.15);
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
        float ao = calcAO(p, n);

        vec3 axis = opticalAxis(u_time);

        
        float eta_o = 0.65;
        float delta_eta = 0.08 + u_treble * 0.15;
        float eta_e = eta_o + delta_eta;

        vec3 rd_o, rd_e;
        birefract(rd, n, axis, eta_o, eta_e, rd_o, rd_e);

        
        vec3 col_o = vec3(0.0);
        if (length(rd_o) > 0.5) {
            float t_o = raymarch(p + n * 0.02, rd_o);
            if (t_o > 0.0) {
                vec3 p2 = p + n * 0.02 + rd_o * t_o;
                vec3 n2 = getNormal(p2);
                float diff = max(dot(n2, normalize(vec3(1.0, 2.0, 3.0))), 0.0);
                col_o = u_colors[1] * diff * 0.8;
            } else {
                col_o = u_colors[1] * 0.15;
            }
        }

        
        vec3 col_e = vec3(0.0);
        if (length(rd_e) > 0.5) {
            float t_e = raymarch(p + n * 0.02, rd_e);
            if (t_e > 0.0) {
                vec3 p3 = p + n * 0.02 + rd_e * t_e;
                vec3 n3 = getNormal(p3);
                float diff = max(dot(n3, normalize(vec3(-1.0, 1.5, 2.0))), 0.0);
                col_e = u_colors[2] * diff * 0.8;
            } else {
                col_e = u_colors[2] * 0.15;
            }
        }

        
        float splitFactor = 0.5 + 0.3 * dot(n, axis);
        vec3 refractedCol = mix(col_o, col_e, splitFactor);

        
        vec3 lightDir = normalize(vec3(1.0, 2.0, 3.0));
        lightDir.xz *= rot(u_time * 0.25);
        float diff = max(dot(n, lightDir), 0.0);
        float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 32.0 + u_treble * 64.0);

        
        float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 4.0);
        float filmThickness = 1.5 + u_mid * 2.0 + length(p) * 0.3;
        vec3 film = thinFilm(max(dot(n, -rd), 0.0), filmThickness);
        vec3 filmColor = mix(u_colors[1], u_colors[2], film);

        
        col = refractedCol * 0.4;
        col += diff * mix(u_colors[1], filmColor, 0.5) * 0.5 * ao;
        col += spec * u_colors[2] * (0.5 + u_treble * 1.0);
        col += fresnel * filmColor * 0.6;

        
        col += pow(fresnel, 3.0) * u_colors[2] * (0.3 + u_rms * 0.7);
    }

    
    vec3 glowColor = mix(u_colors[1], u_colors[2], 0.6);
    col += glowAccum * glowColor * (u_treble * 1.5 + u_rms * 0.5);

    
    col += vec3(1.0) * u_beat * 0.25;

    
    col *= 1.0 - 0.4 * dot(uv, uv);

    
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.9));

    gl_FragColor = vec4(col, 1.0);
}`;class Tm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Mm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:r,treble:i,rms:o}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const s=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>s*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+r*.3+i*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,o<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=r,this.material.uniforms.u_treble.value=i,this.material.uniforms.u_rms.value=o,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var Em=`precision highp float;

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
#define MAX_STEPS 64
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

    
    float fy = (5.0 * p.y * p.y * p.y - 3.0 * p.y * r * r) / (r * r * r + 0.01);
    psi += sin(3.0 * r - phase) * fy * 0.5 * exp(-r * 0.5);

    
    float ring = length(p.xz) - 1.5;
    psi += sin(8.0 * ring + p.y * 4.0 - phase * 3.0) * exp(-ring * ring * 2.0 - p.y * p.y * 0.5) * 0.8;

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
}`;class wm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Em,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:r,treble:i,rms:o}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const s=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>s*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+r*.3+i*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,o<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=r,this.material.uniforms.u_treble.value=i,this.material.uniforms.u_rms.value=o,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var Am=`precision highp float;

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
}`;class Cm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Am,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:r,treble:i,rms:o}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const s=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>s*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+r*.3+i*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,o<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=r,this.material.uniforms.u_treble.value=i,this.material.uniforms.u_rms.value=o,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var Rm=`precision highp float;

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
}`;class Pm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Rm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:r,treble:i,rms:o}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const s=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>s*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+r*.3+i*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,o<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=r,this.material.uniforms.u_treble.value=i,this.material.uniforms.u_rms.value=o,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var Um=`precision highp float;

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
}`;class Dm extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Um,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731406),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:r,treble:i,rms:o}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const s=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>s*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+r*.3+i*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,o<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=r,this.material.uniforms.u_treble.value=i,this.material.uniforms.u_rms.value=o,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}var Lm=`precision highp float;

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
}`;class Im extends st{constructor(){super(),this.bassHistory=[],this.lastBeatTime=0,this.currentBeat=0,this.currentEnergy=0,this.camera=new tt(-1,1,1,-1,0,1),this.material=new qe({vertexShader:ot,fragmentShader:Lm,uniforms:{u_time:{value:0},u_bass:{value:0},u_mid:{value:0},u_treble:{value:0},u_rms:{value:0},u_beat:{value:0},u_energy:{value:0},u_resolution:{value:new Ie(window.innerWidth,window.innerHeight)},u_colors:{value:[new he(661032),new he(1731470),new he(54527)]}}});const e=new Xe(new $e(2,2),this.material);this.scene.add(e)}setPalette(e){this.material.uniforms.u_colors.value=e}update(e,t){const{bass:a,mid:r,treble:i,rms:o}=e;this.bassHistory.push(a),this.bassHistory.length>20&&this.bassHistory.shift();const s=this.bassHistory.reduce((u,h)=>u+h,0)/this.bassHistory.length,l=performance.now();a>s*1.4&&a>.35&&l-this.lastBeatTime>150&&(this.currentBeat=1,this.lastBeatTime=l),this.currentBeat*=.88,this.currentBeat<.01&&(this.currentBeat=0);const c=(a*.5+r*.3+i*.2)*2;c>this.currentEnergy?this.currentEnergy=this.currentEnergy*.92+c*.08:this.currentEnergy=this.currentEnergy*.985+c*.015,o<.01&&(this.currentEnergy*=.9),this.currentEnergy=Math.min(this.currentEnergy,1),this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=a,this.material.uniforms.u_mid.value=r,this.material.uniforms.u_treble.value=i,this.material.uniforms.u_rms.value=o,this.material.uniforms.u_beat.value=this.currentBeat,this.material.uniforms.u_energy.value=this.currentEnergy}resize(e,t,a){const r=a||window.devicePixelRatio||1;this.material.uniforms.u_resolution.value.set(e*r,t*r)}dispose(){this.material.dispose()}}const mi=200,Fm=12,Om=`
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
`,Nm=`
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
`;class zm{constructor(){this.dummy=new Ct;const e=new $e(.02,.3,1,Fm);this.material=new qe({vertexShader:Om,fragmentShader:Nm,transparent:!0,depthWrite:!1,side:2,uniforms:{u_time:{value:0},u_bass:{value:0},u_energy:{value:0},u_beat:{value:0},u_rms:{value:0},u_accentColor:{value:new he(54527)}}}),this.mesh=new mf(e,this.material,mi),this.mesh.frustumCulled=!1,this.mesh.layers.set(0),this.offsets=new Float32Array(mi*3),this.phases=new Float32Array(mi),this.speeds=new Float32Array(mi);const t=new Float32Array(mi*3);for(let a=0;a<mi;a++){const r=Math.random()*Math.PI*2,i=Math.acos(2*Math.random()-1),o=1.5+Math.random()*3;this.offsets[a*3]=o*Math.sin(i)*Math.cos(r),this.offsets[a*3+1]=o*Math.sin(i)*Math.sin(r),this.offsets[a*3+2]=o*Math.cos(i),this.phases[a]=Math.random()*Math.PI*2,this.speeds[a]=.3+Math.random()*.7;const s=.5+Math.random()*.3,l=new he().setHSL(s,.7,.5);t[a*3]=l.r,t[a*3+1]=l.g,t[a*3+2]=l.b,this.dummy.position.set(0,0,0),this.dummy.updateMatrix(),this.mesh.setMatrixAt(a,this.dummy.matrix)}e.setAttribute("instanceOffset",new Or(this.offsets,3)),e.setAttribute("instancePhase",new Or(this.phases,1)),e.setAttribute("instanceSpeed",new Or(this.speeds,1)),e.setAttribute("instanceColor",new Or(t,3))}addToScene(e){e.add(this.mesh)}removeFromScene(e){e.remove(this.mesh)}setAccentColor(e){this.material.uniforms.u_accentColor.value=e}update(e,t){this.material.uniforms.u_time.value=t,this.material.uniforms.u_bass.value=e.bass,this.material.uniforms.u_rms.value=e.rms;const a=(e.bass*.5+e.mid*.3+e.treble*.2)*2;this.material.uniforms.u_energy.value=Math.min(a,1),this.material.uniforms.u_beat.value=e.bass>.6?1:this.material.uniforms.u_beat.value*.9}setVisible(e){this.mesh.visible=e}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}}class Bm{constructor(e){this.scenes=[],this.sceneFactories=[],this.currentIdx=0,this.running=!1,this.frameId=0,this.overlayOpacity=1,this.zenFadeTarget=1,this.zenFadeCurrent=1,this.gpuTextEnabled=!0,this.uiVisible=!1,this._currentPalette=null,this.maxFps=0,this.lastFrameTime=0,this.timeScale=1,this.timeScaleTarget=1,this.timeScaleLerpSpeed=.005,this.dilatedTime=0,this.lastRealTime=0,this.loop=()=>{if(!this.running)return;if(this.frameId=requestAnimationFrame(this.loop),this.maxFps>0){const g=performance.now(),v=1e3/this.maxFps;if(g-this.lastFrameTime<v)return;this.lastFrameTime=g}const c=performance.now()*.001,u=this.lastRealTime>0?Math.min(c-this.lastRealTime,.1):.016;this.lastRealTime=c,this.timeScale+=(this.timeScaleTarget-this.timeScale)*this.timeScaleLerpSpeed;const h=Math.abs(this.timeScale-this.timeScaleTarget)>.05?1/60:u;this.dilatedTime+=h*this.timeScale;const d=this.audioProcessor.update(),f=this.zenFadeCurrent;this.zenFadeCurrent+=(this.zenFadeTarget-this.zenFadeCurrent)*.05,Math.abs(this.zenFadeCurrent-f)>.001&&(this.renderer.domElement.style.opacity=String(this.zenFadeCurrent)),this.current.update(d,this.dilatedTime),this.gpuTypography.update(d.rms),this.lyricsRenderer.update(d.rms),this.kineticRibbons.update(d,this.dilatedTime),this.postProcessing.update(d),this.postProcessing.composer.render()},this._resizeDebounce=0,this._savedResScale=0,this.container=e.container,this.resolutionScale=e.resolutionScale??1,this.renderer=new po({alpha:!0,antialias:!1,powerPreference:"high-performance"}),this.renderer.debug.checkShaderErrors=!0,this.renderer.setClearColor(0,0),this.renderer.setPixelRatio(window.devicePixelRatio*this.resolutionScale);const t=this.renderer.domElement;t.style.position="absolute",t.style.inset="0",t.style.width="100%",t.style.height="100%",t.style.pointerEvents="none",t.style.zIndex="0",this.container.appendChild(t);const a=this.container.clientWidth||window.innerWidth,r=this.container.clientHeight||window.innerHeight;this.renderer.setSize(a,r,!1),this.audioProcessor=new wf(e.analyser),this.sceneFactories=[()=>new Kp,()=>new Np,()=>new Gp(this.renderer),()=>new Wp,()=>new qp(this.renderer),()=>new Yp,()=>new Qo(this.renderer),()=>new em,()=>new rm,()=>new am,()=>new sm,()=>new lm,()=>new um,()=>new dm,()=>new pm,()=>new gm,()=>new _m,()=>new ym,()=>new Sm,()=>new Tm,()=>new wm,()=>new Cm,()=>new Pm,()=>new Dm,()=>new Im],this.scenes=new Array(this.sceneFactories.length).fill(null),this.current=this.getOrCreateScene(0),this.postProcessing=new If(this.renderer,this.current.scene,this.current.camera),this.gpuTypography=new Pp(this.current.camera),this.gpuTypography.addToScene(this.current.scene),this.gpuTypography.setVisible(!1),this.lyricsRenderer=new Fp,this.lyricsRenderer.addToScene(this.current.scene),this.lyricsRenderer.setVisible(!1),this.kineticRibbons=new zm,this.kineticRibbons.addToScene(this.current.scene),this.current.camera.layers.enable(1),console.log(`[Visualizer] Initialized with ${this.sceneFactories.length} scenes (lazy)`),console.log("[Visualizer] Scenes: Lava, Julia, Lorenz, Riemann, ReactionDiffusion, Hyperbolic, LivingCanvas, FractalInfinity"),document.addEventListener("uiToggle",c=>{this.setUiVisible(c.detail?.visible??!1)}),new ResizeObserver(()=>this.handleResize()).observe(this.container);let i=0,o=!1;const s=this.renderer.domElement,l=()=>{!o&&this.running&&(o=!0,s.style.transition="none",s.style.filter="blur(8px) saturate(1.3)"),clearTimeout(i),i=window.setTimeout(()=>{o&&(o=!1,s.style.transition="filter 0.3s ease-out",s.style.filter="",setTimeout(()=>{s.style.transition=""},350))},200)};document.addEventListener("scroll",l,{capture:!0,passive:!0}),document.addEventListener("keydown",c=>{const u=c.target;if(u?.isContentEditable||u?.tagName==="INPUT"||u?.tagName==="TEXTAREA")return;const h=Number(c.key);h>=1&&h<=9&&this.setScene(h-1),c.key==="0"&&this.setScene(9),c.key.toLowerCase()==="z"&&(this.uiVisible=!this.uiVisible,this.setUiVisible(this.uiVisible))})}getOrCreateScene(e){if(this.scenes[e])return this.scenes[e];const t=this.sceneFactories[e]();return t.camera.layers.enable(1),this.scenes[e]=t,this._currentPalette&&typeof t.setPalette=="function"&&t.setPalette(this._currentPalette),t}setScene(e){e<0||e>=this.sceneFactories.length||e===this.currentIdx&&this.scenes[e]||(console.log(`[Visualizer] Switching scene: ${this.currentIdx} \u2192 ${e}`),this.gpuTypography.removeFromScene(this.current.scene),this.lyricsRenderer.removeFromScene(this.current.scene),this.kineticRibbons.removeFromScene(this.current.scene),this.currentIdx=e,this.current=this.getOrCreateScene(e),this._currentPalette&&typeof this.current.setPalette=="function"&&this.current.setPalette(this._currentPalette),this.postProcessing.updateScene(this.current.scene,this.current.camera),this.gpuTypography.addToScene(this.current.scene),this.lyricsRenderer.addToScene(this.current.scene),this.current.camera instanceof tt&&this.kineticRibbons.addToScene(this.current.scene),this.handleResize())}setResolutionScale(e){this.resolutionScale=Math.max(.1,Math.min(2,e)),this.renderer.setPixelRatio(window.devicePixelRatio*this.resolutionScale);const t=this.container.clientWidth||window.innerWidth,a=this.container.clientHeight||window.innerHeight;if(t===0||a===0)return;this.renderer.setSize(t,a,!1),this.postProcessing.setSize(t,a);const r=window.devicePixelRatio*this.resolutionScale;this.current.resize(t,a,r)}setMaxFps(e){this.maxFps=Math.max(0,Math.round(e))}setTimeScale(e,t=600){this.timeScaleTarget=Math.max(0,Math.min(3,e)),this.timeScaleLerpSpeed=1-Math.pow(.05,16/t)}setZenMode(e){this.zenFadeTarget=e?.15:1}setUiVisible(e){this.uiVisible=e,this.gpuTypography.setVisible(e),this.lyricsRenderer.setVisible(e),this.postProcessing.setUiVisibility(e)}setTrack(e,t){console.log(`[Visualizer] setTrack: "${e}" - "${t}"`),this.gpuTypography.setTrack(e,t),this.setScene(0),this.setUiVisible(!0)}setPalette(e){const t=e.map(r=>new he(r));this._currentPalette=t;const a=this.scenes[this.currentIdx];a&&typeof a.setPalette=="function"&&a.setPalette(t),this.kineticRibbons.setAccentColor(t[2])}setAlbumArt(e){console.log("[Visualizer] setAlbumArt:",e);const t=this.scenes[6];t instanceof Qo&&t.setAlbumArt(e)}setLyricsTimeline(e){this.lyricsRenderer.setTimeline(e),this.gpuTypography.setVisible(!1),this.lyricsRenderer.setVisible(!0)}setCurrentTime(e){this.lyricsRenderer.setCurrentTime(e)}start(){this.running||(this.running=!0,this.lastRealTime=performance.now()*.001,requestAnimationFrame(()=>this.handleResize()),this.loop())}renderFrame(){const e=performance.now()*.001;this.lastRealTime===0&&(this.lastRealTime=e);const t=Math.min(e-this.lastRealTime,.1)||.016;this.lastRealTime=e,this.timeScale+=(this.timeScaleTarget-this.timeScale)*this.timeScaleLerpSpeed,this.dilatedTime+=t*this.timeScale;const a=this.audioProcessor.update();this.zenFadeCurrent+=(this.zenFadeTarget-this.zenFadeCurrent)*.05,this.renderer.domElement.style.opacity=String(this.zenFadeCurrent),this.current.update(a,this.dilatedTime),this.gpuTypography.update(a.rms),this.lyricsRenderer.update(a.rms),this.kineticRibbons.update(a,this.dilatedTime),this.postProcessing.update(a),this.postProcessing.composer.render()}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}dispose(){this.stop(),this.scenes.forEach(e=>e?.dispose()),this.renderer.dispose(),this.renderer.domElement.remove()}handleResize(){const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;if(e===0||t===0)return;const a=this.renderer.domElement;this._savedResScale||(this._savedResScale=this.resolutionScale,this.resolutionScale=.25,this.renderer.setPixelRatio(window.devicePixelRatio*.25),a.style.transition="none",a.style.filter="blur(8px) saturate(1.3)",a.style.opacity="1"),this.renderer.setSize(e,t,!1),this.renderer.setViewport(0,0,e,t),this.postProcessing.setSize(e,t);const r=window.devicePixelRatio*this.resolutionScale;this.current.resize(e,t,r),this.running&&this.renderFrame(),clearTimeout(this._resizeDebounce),this._resizeDebounce=window.setTimeout(()=>{const i=this._savedResScale||.6;this._savedResScale=0,this.resolutionScale=i,this.renderer.setPixelRatio(window.devicePixelRatio*i);const o=this.container.clientWidth||window.innerWidth,s=this.container.clientHeight||window.innerHeight;this.renderer.setSize(o,s,!1),this.renderer.setViewport(0,0,o,s),this.postProcessing.setSize(o,s),this.current.resize(o,s,window.devicePixelRatio*i),this.running&&this.renderFrame(),a.style.transition="filter 0.3s ease-out",a.style.filter=""},150)}}export{Bm as ThreeOrchestrator};
