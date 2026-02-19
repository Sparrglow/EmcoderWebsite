import{d as Gn,u as Bn,p as jn,c as Hn,w as qn,o as zn,e as Wn,b as Ue,a as Ge,n as Kn,A as Vn,z as Xn,x as Qn}from"./index-CiVBJYKN.js";import{P as Yn,_ as $n}from"./PageLayout-CDmakjhY.js";import{P as Jn}from"./PageHeader-ulFHArPE.js";const Be={};function Zn(e){let n=Be[e];if(n)return n;n=Be[e]=[];for(let u=0;u<128;u++){const t=String.fromCharCode(u);n.push(t)}for(let u=0;u<e.length;u++){const t=e.charCodeAt(u);n[t]="%"+("0"+t.toString(16).toUpperCase()).slice(-2)}return n}function K(e,n){typeof n!="string"&&(n=K.defaultChars);const u=Zn(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(t){let r="";for(let a=0,o=t.length;a<o;a+=3){const i=parseInt(t.slice(a+1,a+3),16);if(i<128){r+=u[i];continue}if((i&224)===192&&a+3<o){const s=parseInt(t.slice(a+4,a+6),16);if((s&192)===128){const c=i<<6&1984|s&63;c<128?r+="��":r+=String.fromCharCode(c),a+=3;continue}}if((i&240)===224&&a+6<o){const s=parseInt(t.slice(a+4,a+6),16),c=parseInt(t.slice(a+7,a+9),16);if((s&192)===128&&(c&192)===128){const l=i<<12&61440|s<<6&4032|c&63;l<2048||l>=55296&&l<=57343?r+="���":r+=String.fromCharCode(l),a+=6;continue}}if((i&248)===240&&a+9<o){const s=parseInt(t.slice(a+4,a+6),16),c=parseInt(t.slice(a+7,a+9),16),l=parseInt(t.slice(a+10,a+12),16);if((s&192)===128&&(c&192)===128&&(l&192)===128){let d=i<<18&1835008|s<<12&258048|c<<6&4032|l&63;d<65536||d>1114111?r+="����":(d-=65536,r+=String.fromCharCode(55296+(d>>10),56320+(d&1023))),a+=9;continue}}r+="�"}return r})}K.defaultChars=";/?:@&=+$,#";K.componentChars="";const je={};function eu(e){let n=je[e];if(n)return n;n=je[e]=[];for(let u=0;u<128;u++){const t=String.fromCharCode(u);/^[0-9a-z]$/i.test(t)?n.push(t):n.push("%"+("0"+u.toString(16).toUpperCase()).slice(-2))}for(let u=0;u<e.length;u++)n[e.charCodeAt(u)]=e[u];return n}function ne(e,n,u){typeof n!="string"&&(u=n,n=ne.defaultChars),typeof u>"u"&&(u=!0);const t=eu(n);let r="";for(let a=0,o=e.length;a<o;a++){const i=e.charCodeAt(a);if(u&&i===37&&a+2<o&&/^[0-9a-f]{2}$/i.test(e.slice(a+1,a+3))){r+=e.slice(a,a+3),a+=2;continue}if(i<128){r+=t[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&a+1<o){const s=e.charCodeAt(a+1);if(s>=56320&&s<=57343){r+=encodeURIComponent(e[a]+e[a+1]),a++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[a])}return r}ne.defaultChars=";/?:@&=+$,-_.!~*'()#";ne.componentChars="-_.!~*'()";function ve(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function oe(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}const nu=/^([a-z0-9.+-]+:)/i,uu=/:[0-9]*$/,tu=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,ru=["<",">",'"',"`"," ","\r",`
`,"	"],au=["{","}","|","\\","^","`"].concat(ru),iu=["'"].concat(au),He=["%","/","?",";","#"].concat(iu),qe=["/","?","#"],ou=255,ze=/^[+a-z0-9A-Z_-]{0,63}$/,su=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,We={javascript:!0,"javascript:":!0},Ke={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function Pe(e,n){if(e&&e instanceof oe)return e;const u=new oe;return u.parse(e,n),u}oe.prototype.parse=function(e,n){let u,t,r,a=e;if(a=a.trim(),!n&&e.split("#").length===1){const c=tu.exec(a);if(c)return this.pathname=c[1],c[2]&&(this.search=c[2]),this}let o=nu.exec(a);if(o&&(o=o[0],u=o.toLowerCase(),this.protocol=o,a=a.substr(o.length)),(n||o||a.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=a.substr(0,2)==="//",r&&!(o&&We[o])&&(a=a.substr(2),this.slashes=!0)),!We[o]&&(r||o&&!Ke[o])){let c=-1;for(let p=0;p<qe.length;p++)t=a.indexOf(qe[p]),t!==-1&&(c===-1||t<c)&&(c=t);let l,d;c===-1?d=a.lastIndexOf("@"):d=a.lastIndexOf("@",c),d!==-1&&(l=a.slice(0,d),a=a.slice(d+1),this.auth=l),c=-1;for(let p=0;p<He.length;p++)t=a.indexOf(He[p]),t!==-1&&(c===-1||t<c)&&(c=t);c===-1&&(c=a.length),a[c-1]===":"&&c--;const h=a.slice(0,c);a=a.slice(c),this.parseHost(h),this.hostname=this.hostname||"";const f=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!f){const p=this.hostname.split(/\./);for(let E=0,y=p.length;E<y;E++){const x=p[E];if(x&&!x.match(ze)){let m="";for(let _=0,b=x.length;_<b;_++)x.charCodeAt(_)>127?m+="x":m+=x[_];if(!m.match(ze)){const _=p.slice(0,E),b=p.slice(E+1),g=x.match(su);g&&(_.push(g[1]),b.unshift(g[2])),b.length&&(a=b.join(".")+a),this.hostname=_.join(".");break}}}}this.hostname.length>ou&&(this.hostname=""),f&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}const i=a.indexOf("#");i!==-1&&(this.hash=a.substr(i),a=a.slice(0,i));const s=a.indexOf("?");return s!==-1&&(this.search=a.substr(s),a=a.slice(0,s)),a&&(this.pathname=a),Ke[u]&&this.hostname&&!this.pathname&&(this.pathname=""),this};oe.prototype.parseHost=function(e){let n=uu.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};const cu=Object.freeze(Object.defineProperty({__proto__:null,decode:K,encode:ne,format:ve,parse:Pe},Symbol.toStringTag,{value:"Module"})),sn=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,cn=/[\0-\x1F\x7F-\x9F]/,lu=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,Ie=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,ln=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,dn=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,du=Object.freeze(Object.defineProperty({__proto__:null,Any:sn,Cc:cn,Cf:lu,P:Ie,S:ln,Z:dn},Symbol.toStringTag,{value:"Module"})),pu=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),fu=new Uint16Array("Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0)));var _e;const hu=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),mu=(_e=String.fromCodePoint)!==null&&_e!==void 0?_e:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function bu(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=hu.get(e))!==null&&n!==void 0?n:e}var A;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(A||(A={}));const _u=32;var G;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(G||(G={}));function ke(e){return e>=A.ZERO&&e<=A.NINE}function gu(e){return e>=A.UPPER_A&&e<=A.UPPER_F||e>=A.LOWER_A&&e<=A.LOWER_F}function Eu(e){return e>=A.UPPER_A&&e<=A.UPPER_Z||e>=A.LOWER_A&&e<=A.LOWER_Z||ke(e)}function yu(e){return e===A.EQUALS||Eu(e)}var k;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(k||(k={}));var U;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(U||(U={}));class Su{constructor(n,u,t){this.decodeTree=n,this.emitCodePoint=u,this.errors=t,this.state=k.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=U.Strict}startEntity(n){this.decodeMode=n,this.state=k.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,u){switch(this.state){case k.EntityStart:return n.charCodeAt(u)===A.NUM?(this.state=k.NumericStart,this.consumed+=1,this.stateNumericStart(n,u+1)):(this.state=k.NamedEntity,this.stateNamedEntity(n,u));case k.NumericStart:return this.stateNumericStart(n,u);case k.NumericDecimal:return this.stateNumericDecimal(n,u);case k.NumericHex:return this.stateNumericHex(n,u);case k.NamedEntity:return this.stateNamedEntity(n,u)}}stateNumericStart(n,u){return u>=n.length?-1:(n.charCodeAt(u)|_u)===A.LOWER_X?(this.state=k.NumericHex,this.consumed+=1,this.stateNumericHex(n,u+1)):(this.state=k.NumericDecimal,this.stateNumericDecimal(n,u))}addToNumericResult(n,u,t,r){if(u!==t){const a=t-u;this.result=this.result*Math.pow(r,a)+parseInt(n.substr(u,a),r),this.consumed+=a}}stateNumericHex(n,u){const t=u;for(;u<n.length;){const r=n.charCodeAt(u);if(ke(r)||gu(r))u+=1;else return this.addToNumericResult(n,t,u,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(n,t,u,16),-1}stateNumericDecimal(n,u){const t=u;for(;u<n.length;){const r=n.charCodeAt(u);if(ke(r))u+=1;else return this.addToNumericResult(n,t,u,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(n,t,u,10),-1}emitNumericEntity(n,u){var t;if(this.consumed<=u)return(t=this.errors)===null||t===void 0||t.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===A.SEMI)this.consumed+=1;else if(this.decodeMode===U.Strict)return 0;return this.emitCodePoint(bu(this.result),this.consumed),this.errors&&(n!==A.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,u){const{decodeTree:t}=this;let r=t[this.treeIndex],a=(r&G.VALUE_LENGTH)>>14;for(;u<n.length;u++,this.excess++){const o=n.charCodeAt(u);if(this.treeIndex=xu(t,r,this.treeIndex+Math.max(1,a),o),this.treeIndex<0)return this.result===0||this.decodeMode===U.Attribute&&(a===0||yu(o))?0:this.emitNotTerminatedNamedEntity();if(r=t[this.treeIndex],a=(r&G.VALUE_LENGTH)>>14,a!==0){if(o===A.SEMI)return this.emitNamedEntityData(this.treeIndex,a,this.consumed+this.excess);this.decodeMode!==U.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:u,decodeTree:t}=this,r=(t[u]&G.VALUE_LENGTH)>>14;return this.emitNamedEntityData(u,r,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,u,t){const{decodeTree:r}=this;return this.emitCodePoint(u===1?r[n]&~G.VALUE_LENGTH:r[n+1],t),u===3&&this.emitCodePoint(r[n+2],t),t}end(){var n;switch(this.state){case k.NamedEntity:return this.result!==0&&(this.decodeMode!==U.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case k.NumericDecimal:return this.emitNumericEntity(0,2);case k.NumericHex:return this.emitNumericEntity(0,3);case k.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case k.EntityStart:return 0}}}function pn(e){let n="";const u=new Su(e,t=>n+=mu(t));return function(r,a){let o=0,i=0;for(;(i=r.indexOf("&",i))>=0;){n+=r.slice(o,i),u.startEntity(a);const c=u.write(r,i+1);if(c<0){o=i+u.end();break}o=i+c,i=c===0?o+1:o}const s=n+r.slice(o);return n="",s}}function xu(e,n,u,t){const r=(n&G.BRANCH_LENGTH)>>7,a=n&G.JUMP_TABLE;if(r===0)return a!==0&&t===a?u:-1;if(a){const s=t-a;return s<0||s>=r?-1:e[u+s]-1}let o=u,i=o+r-1;for(;o<=i;){const s=o+i>>>1,c=e[s];if(c<t)o=s+1;else if(c>t)i=s-1;else return e[s+r]}return-1}const Cu=pn(pu);pn(fu);function fn(e,n=U.Legacy){return Cu(e,n)}function ku(e){return Object.prototype.toString.call(e)}function Me(e){return ku(e)==="[object String]"}const Au=Object.prototype.hasOwnProperty;function Tu(e,n){return Au.call(e,n)}function de(e){return Array.prototype.slice.call(arguments,1).forEach(function(u){if(u){if(typeof u!="object")throw new TypeError(u+"must be object");Object.keys(u).forEach(function(t){e[t]=u[t]})}}),e}function hn(e,n,u){return[].concat(e.slice(0,n),u,e.slice(n+1))}function Oe(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function se(e){if(e>65535){e-=65536;const n=55296+(e>>10),u=56320+(e&1023);return String.fromCharCode(n,u)}return String.fromCharCode(e)}const mn=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Du=/&([a-z#][a-z0-9]{1,31});/gi,vu=new RegExp(mn.source+"|"+Du.source,"gi"),Pu=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Iu(e,n){if(n.charCodeAt(0)===35&&Pu.test(n)){const t=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return Oe(t)?se(t):e}const u=fn(e);return u!==e?u:e}function Mu(e){return e.indexOf("\\")<0?e:e.replace(mn,"$1")}function V(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(vu,function(n,u,t){return u||Iu(n,t)})}const Ou=/[&<>"]/,Lu=/[&<>"]/g,wu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Ru(e){return wu[e]}function B(e){return Ou.test(e)?e.replace(Lu,Ru):e}const Fu=/[.?*+^$[\]\\(){}|-]/g;function Nu(e){return e.replace(Fu,"\\$&")}function C(e){switch(e){case 9:case 32:return!0}return!1}function $(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function J(e){return Ie.test(e)||ln.test(e)}function Z(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function pe(e){return e=e.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(e=e.replace(/ẞ/g,"ß")),e.toLowerCase().toUpperCase()}const Uu={mdurl:cu,ucmicro:du},Gu=Object.freeze(Object.defineProperty({__proto__:null,arrayReplaceAt:hn,assign:de,escapeHtml:B,escapeRE:Nu,fromCodePoint:se,has:Tu,isMdAsciiPunct:Z,isPunctChar:J,isSpace:C,isString:Me,isValidEntityCode:Oe,isWhiteSpace:$,lib:Uu,normalizeReference:pe,unescapeAll:V,unescapeMd:Mu},Symbol.toStringTag,{value:"Module"}));function Bu(e,n,u){let t,r,a,o;const i=e.posMax,s=e.pos;for(e.pos=n+1,t=1;e.pos<i;){if(a=e.src.charCodeAt(e.pos),a===93&&(t--,t===0)){r=!0;break}if(o=e.pos,e.md.inline.skipToken(e),a===91){if(o===e.pos-1)t++;else if(u)return e.pos=s,-1}}let c=-1;return r&&(c=e.pos),e.pos=s,c}function ju(e,n,u){let t,r=n;const a={ok:!1,pos:0,str:""};if(e.charCodeAt(r)===60){for(r++;r<u;){if(t=e.charCodeAt(r),t===10||t===60)return a;if(t===62)return a.pos=r+1,a.str=V(e.slice(n+1,r)),a.ok=!0,a;if(t===92&&r+1<u){r+=2;continue}r++}return a}let o=0;for(;r<u&&(t=e.charCodeAt(r),!(t===32||t<32||t===127));){if(t===92&&r+1<u){if(e.charCodeAt(r+1)===32)break;r+=2;continue}if(t===40&&(o++,o>32))return a;if(t===41){if(o===0)break;o--}r++}return n===r||o!==0||(a.str=V(e.slice(n,r)),a.pos=r,a.ok=!0),a}function Hu(e,n,u,t){let r,a=n;const o={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(t)o.str=t.str,o.marker=t.marker;else{if(a>=u)return o;let i=e.charCodeAt(a);if(i!==34&&i!==39&&i!==40)return o;n++,a++,i===40&&(i=41),o.marker=i}for(;a<u;){if(r=e.charCodeAt(a),r===o.marker)return o.pos=a+1,o.str+=V(e.slice(n,a)),o.ok=!0,o;if(r===40&&o.marker===41)return o;r===92&&a+1<u&&a++,a++}return o.can_continue=!0,o.str+=V(e.slice(n,a)),o}const qu=Object.freeze(Object.defineProperty({__proto__:null,parseLinkDestination:ju,parseLinkLabel:Bu,parseLinkTitle:Hu},Symbol.toStringTag,{value:"Module"})),w={};w.code_inline=function(e,n,u,t,r){const a=e[n];return"<code"+r.renderAttrs(a)+">"+B(a.content)+"</code>"};w.code_block=function(e,n,u,t,r){const a=e[n];return"<pre"+r.renderAttrs(a)+"><code>"+B(e[n].content)+`</code></pre>
`};w.fence=function(e,n,u,t,r){const a=e[n],o=a.info?V(a.info).trim():"";let i="",s="";if(o){const l=o.split(/(\s+)/g);i=l[0],s=l.slice(2).join("")}let c;if(u.highlight?c=u.highlight(a.content,i,s)||B(a.content):c=B(a.content),c.indexOf("<pre")===0)return c+`
`;if(o){const l=a.attrIndex("class"),d=a.attrs?a.attrs.slice():[];l<0?d.push(["class",u.langPrefix+i]):(d[l]=d[l].slice(),d[l][1]+=" "+u.langPrefix+i);const h={attrs:d};return`<pre><code${r.renderAttrs(h)}>${c}</code></pre>
`}return`<pre><code${r.renderAttrs(a)}>${c}</code></pre>
`};w.image=function(e,n,u,t,r){const a=e[n];return a.attrs[a.attrIndex("alt")][1]=r.renderInlineAsText(a.children,u,t),r.renderToken(e,n,u)};w.hardbreak=function(e,n,u){return u.xhtmlOut?`<br />
`:`<br>
`};w.softbreak=function(e,n,u){return u.breaks?u.xhtmlOut?`<br />
`:`<br>
`:`
`};w.text=function(e,n){return B(e[n].content)};w.html_block=function(e,n){return e[n].content};w.html_inline=function(e,n){return e[n].content};function Q(){this.rules=de({},w)}Q.prototype.renderAttrs=function(n){let u,t,r;if(!n.attrs)return"";for(r="",u=0,t=n.attrs.length;u<t;u++)r+=" "+B(n.attrs[u][0])+'="'+B(n.attrs[u][1])+'"';return r};Q.prototype.renderToken=function(n,u,t){const r=n[u];let a="";if(r.hidden)return"";r.block&&r.nesting!==-1&&u&&n[u-1].hidden&&(a+=`
`),a+=(r.nesting===-1?"</":"<")+r.tag,a+=this.renderAttrs(r),r.nesting===0&&t.xhtmlOut&&(a+=" /");let o=!1;if(r.block&&(o=!0,r.nesting===1&&u+1<n.length)){const i=n[u+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===r.tag)&&(o=!1)}return a+=o?`>
`:">",a};Q.prototype.renderInline=function(e,n,u){let t="";const r=this.rules;for(let a=0,o=e.length;a<o;a++){const i=e[a].type;typeof r[i]<"u"?t+=r[i](e,a,n,u,this):t+=this.renderToken(e,a,n)}return t};Q.prototype.renderInlineAsText=function(e,n,u){let t="";for(let r=0,a=e.length;r<a;r++)switch(e[r].type){case"text":t+=e[r].content;break;case"image":t+=this.renderInlineAsText(e[r].children,n,u);break;case"html_inline":case"html_block":t+=e[r].content;break;case"softbreak":case"hardbreak":t+=`
`;break}return t};Q.prototype.render=function(e,n,u){let t="";const r=this.rules;for(let a=0,o=e.length;a<o;a++){const i=e[a].type;i==="inline"?t+=this.renderInline(e[a].children,n,u):typeof r[i]<"u"?t+=r[i](e,a,n,u,this):t+=this.renderToken(e,a,n,u)}return t};function D(){this.__rules__=[],this.__cache__=null}D.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};D.prototype.__compile__=function(){const e=this,n=[""];e.__rules__.forEach(function(u){u.enabled&&u.alt.forEach(function(t){n.indexOf(t)<0&&n.push(t)})}),e.__cache__={},n.forEach(function(u){e.__cache__[u]=[],e.__rules__.forEach(function(t){t.enabled&&(u&&t.alt.indexOf(u)<0||e.__cache__[u].push(t.fn))})})};D.prototype.at=function(e,n,u){const t=this.__find__(e),r=u||{};if(t===-1)throw new Error("Parser rule not found: "+e);this.__rules__[t].fn=n,this.__rules__[t].alt=r.alt||[],this.__cache__=null};D.prototype.before=function(e,n,u,t){const r=this.__find__(e),a=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r,0,{name:n,enabled:!0,fn:u,alt:a.alt||[]}),this.__cache__=null};D.prototype.after=function(e,n,u,t){const r=this.__find__(e),a=t||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r+1,0,{name:n,enabled:!0,fn:u,alt:a.alt||[]}),this.__cache__=null};D.prototype.push=function(e,n,u){const t=u||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:t.alt||[]}),this.__cache__=null};D.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);const u=[];return e.forEach(function(t){const r=this.__find__(t);if(r<0){if(n)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!0,u.push(t)},this),this.__cache__=null,u};D.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(u){u.enabled=!1}),this.enable(e,n)};D.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);const u=[];return e.forEach(function(t){const r=this.__find__(t);if(r<0){if(n)return;throw new Error("Rules manager: invalid rule name "+t)}this.__rules__[r].enabled=!1,u.push(t)},this),this.__cache__=null,u};D.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};function M(e,n,u){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=u,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}M.prototype.attrIndex=function(n){if(!this.attrs)return-1;const u=this.attrs;for(let t=0,r=u.length;t<r;t++)if(u[t][0]===n)return t;return-1};M.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};M.prototype.attrSet=function(n,u){const t=this.attrIndex(n),r=[n,u];t<0?this.attrPush(r):this.attrs[t]=r};M.prototype.attrGet=function(n){const u=this.attrIndex(n);let t=null;return u>=0&&(t=this.attrs[u][1]),t};M.prototype.attrJoin=function(n,u){const t=this.attrIndex(n);t<0?this.attrPush([n,u]):this.attrs[t][1]=this.attrs[t][1]+" "+u};function bn(e,n,u){this.src=e,this.env=u,this.tokens=[],this.inlineMode=!1,this.md=n}bn.prototype.Token=M;const zu=/\r\n?|\n/g,Wu=/\0/g;function Ku(e){let n;n=e.src.replace(zu,`
`),n=n.replace(Wu,"�"),e.src=n}function Vu(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function Xu(e){const n=e.tokens;for(let u=0,t=n.length;u<t;u++){const r=n[u];r.type==="inline"&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function Qu(e){return/^<a[>\s]/i.test(e)}function Yu(e){return/^<\/a\s*>/i.test(e)}function $u(e){const n=e.tokens;if(e.md.options.linkify)for(let u=0,t=n.length;u<t;u++){if(n[u].type!=="inline"||!e.md.linkify.pretest(n[u].content))continue;let r=n[u].children,a=0;for(let o=r.length-1;o>=0;o--){const i=r[o];if(i.type==="link_close"){for(o--;r[o].level!==i.level&&r[o].type!=="link_open";)o--;continue}if(i.type==="html_inline"&&(Qu(i.content)&&a>0&&a--,Yu(i.content)&&a++),!(a>0)&&i.type==="text"&&e.md.linkify.test(i.content)){const s=i.content;let c=e.md.linkify.match(s);const l=[];let d=i.level,h=0;c.length>0&&c[0].index===0&&o>0&&r[o-1].type==="text_special"&&(c=c.slice(1));for(let f=0;f<c.length;f++){const p=c[f].url,E=e.md.normalizeLink(p);if(!e.md.validateLink(E))continue;let y=c[f].text;c[f].schema?c[f].schema==="mailto:"&&!/^mailto:/i.test(y)?y=e.md.normalizeLinkText("mailto:"+y).replace(/^mailto:/,""):y=e.md.normalizeLinkText(y):y=e.md.normalizeLinkText("http://"+y).replace(/^http:\/\//,"");const x=c[f].index;if(x>h){const g=new e.Token("text","",0);g.content=s.slice(h,x),g.level=d,l.push(g)}const m=new e.Token("link_open","a",1);m.attrs=[["href",E]],m.level=d++,m.markup="linkify",m.info="auto",l.push(m);const _=new e.Token("text","",0);_.content=y,_.level=d,l.push(_);const b=new e.Token("link_close","a",-1);b.level=--d,b.markup="linkify",b.info="auto",l.push(b),h=c[f].lastIndex}if(h<s.length){const f=new e.Token("text","",0);f.content=s.slice(h),f.level=d,l.push(f)}n[u].children=r=hn(r,o,l)}}}}const _n=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,Ju=/\((c|tm|r)\)/i,Zu=/\((c|tm|r)\)/ig,et={c:"©",r:"®",tm:"™"};function nt(e,n){return et[n.toLowerCase()]}function ut(e){let n=0;for(let u=e.length-1;u>=0;u--){const t=e[u];t.type==="text"&&!n&&(t.content=t.content.replace(Zu,nt)),t.type==="link_open"&&t.info==="auto"&&n--,t.type==="link_close"&&t.info==="auto"&&n++}}function tt(e){let n=0;for(let u=e.length-1;u>=0;u--){const t=e[u];t.type==="text"&&!n&&_n.test(t.content)&&(t.content=t.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),t.type==="link_open"&&t.info==="auto"&&n--,t.type==="link_close"&&t.info==="auto"&&n++}}function rt(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&(Ju.test(e.tokens[n].content)&&ut(e.tokens[n].children),_n.test(e.tokens[n].content)&&tt(e.tokens[n].children))}const at=/['"]/,Ve=/['"]/g,Xe="’";function ae(e,n,u){return e.slice(0,n)+u+e.slice(n+1)}function it(e,n){let u;const t=[];for(let r=0;r<e.length;r++){const a=e[r],o=e[r].level;for(u=t.length-1;u>=0&&!(t[u].level<=o);u--);if(t.length=u+1,a.type!=="text")continue;let i=a.content,s=0,c=i.length;e:for(;s<c;){Ve.lastIndex=s;const l=Ve.exec(i);if(!l)break;let d=!0,h=!0;s=l.index+1;const f=l[0]==="'";let p=32;if(l.index-1>=0)p=i.charCodeAt(l.index-1);else for(u=r-1;u>=0&&!(e[u].type==="softbreak"||e[u].type==="hardbreak");u--)if(e[u].content){p=e[u].content.charCodeAt(e[u].content.length-1);break}let E=32;if(s<c)E=i.charCodeAt(s);else for(u=r+1;u<e.length&&!(e[u].type==="softbreak"||e[u].type==="hardbreak");u++)if(e[u].content){E=e[u].content.charCodeAt(0);break}const y=Z(p)||J(String.fromCharCode(p)),x=Z(E)||J(String.fromCharCode(E)),m=$(p),_=$(E);if(_?d=!1:x&&(m||y||(d=!1)),m?h=!1:y&&(_||x||(h=!1)),E===34&&l[0]==='"'&&p>=48&&p<=57&&(h=d=!1),d&&h&&(d=y,h=x),!d&&!h){f&&(a.content=ae(a.content,l.index,Xe));continue}if(h)for(u=t.length-1;u>=0;u--){let b=t[u];if(t[u].level<o)break;if(b.single===f&&t[u].level===o){b=t[u];let g,S;f?(g=n.md.options.quotes[2],S=n.md.options.quotes[3]):(g=n.md.options.quotes[0],S=n.md.options.quotes[1]),a.content=ae(a.content,l.index,S),e[b.token].content=ae(e[b.token].content,b.pos,g),s+=S.length-1,b.token===r&&(s+=g.length-1),i=a.content,c=i.length,t.length=u;continue e}}d?t.push({token:r,pos:l.index,single:f,level:o}):h&&f&&(a.content=ae(a.content,l.index,Xe))}}}function ot(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!at.test(e.tokens[n].content)||it(e.tokens[n].children,e)}function st(e){let n,u;const t=e.tokens,r=t.length;for(let a=0;a<r;a++){if(t[a].type!=="inline")continue;const o=t[a].children,i=o.length;for(n=0;n<i;n++)o[n].type==="text_special"&&(o[n].type="text");for(n=u=0;n<i;n++)o[n].type==="text"&&n+1<i&&o[n+1].type==="text"?o[n+1].content=o[n].content+o[n+1].content:(n!==u&&(o[u]=o[n]),u++);n!==u&&(o.length=u)}}const ge=[["normalize",Ku],["block",Vu],["inline",Xu],["linkify",$u],["replacements",rt],["smartquotes",ot],["text_join",st]];function Le(){this.ruler=new D;for(let e=0;e<ge.length;e++)this.ruler.push(ge[e][0],ge[e][1])}Le.prototype.process=function(e){const n=this.ruler.getRules("");for(let u=0,t=n.length;u<t;u++)n[u](e)};Le.prototype.State=bn;function R(e,n,u,t){this.src=e,this.md=n,this.env=u,this.tokens=t,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;const r=this.src;for(let a=0,o=0,i=0,s=0,c=r.length,l=!1;o<c;o++){const d=r.charCodeAt(o);if(!l)if(C(d)){i++,d===9?s+=4-s%4:s++;continue}else l=!0;(d===10||o===c-1)&&(d!==10&&o++,this.bMarks.push(a),this.eMarks.push(o),this.tShift.push(i),this.sCount.push(s),this.bsCount.push(0),l=!1,i=0,s=0,a=o+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}R.prototype.push=function(e,n,u){const t=new M(e,n,u);return t.block=!0,u<0&&this.level--,t.level=this.level,u>0&&this.level++,this.tokens.push(t),t};R.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};R.prototype.skipEmptyLines=function(n){for(let u=this.lineMax;n<u&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};R.prototype.skipSpaces=function(n){for(let u=this.src.length;n<u;n++){const t=this.src.charCodeAt(n);if(!C(t))break}return n};R.prototype.skipSpacesBack=function(n,u){if(n<=u)return n;for(;n>u;)if(!C(this.src.charCodeAt(--n)))return n+1;return n};R.prototype.skipChars=function(n,u){for(let t=this.src.length;n<t&&this.src.charCodeAt(n)===u;n++);return n};R.prototype.skipCharsBack=function(n,u,t){if(n<=t)return n;for(;n>t;)if(u!==this.src.charCodeAt(--n))return n+1;return n};R.prototype.getLines=function(n,u,t,r){if(n>=u)return"";const a=new Array(u-n);for(let o=0,i=n;i<u;i++,o++){let s=0;const c=this.bMarks[i];let l=c,d;for(i+1<u||r?d=this.eMarks[i]+1:d=this.eMarks[i];l<d&&s<t;){const h=this.src.charCodeAt(l);if(C(h))h===9?s+=4-(s+this.bsCount[i])%4:s++;else if(l-c<this.tShift[i])s++;else break;l++}s>t?a[o]=new Array(s-t+1).join(" ")+this.src.slice(l,d):a[o]=this.src.slice(l,d)}return a.join("")};R.prototype.Token=M;const ct=65536;function Ee(e,n){const u=e.bMarks[n]+e.tShift[n],t=e.eMarks[n];return e.src.slice(u,t)}function Qe(e){const n=[],u=e.length;let t=0,r=e.charCodeAt(t),a=!1,o=0,i="";for(;t<u;)r===124&&(a?(i+=e.substring(o,t-1),o=t):(n.push(i+e.substring(o,t)),i="",o=t+1)),a=r===92,t++,r=e.charCodeAt(t);return n.push(i+e.substring(o)),n}function lt(e,n,u,t){if(n+2>u)return!1;let r=n+1;if(e.sCount[r]<e.blkIndent||e.sCount[r]-e.blkIndent>=4)return!1;let a=e.bMarks[r]+e.tShift[r];if(a>=e.eMarks[r])return!1;const o=e.src.charCodeAt(a++);if(o!==124&&o!==45&&o!==58||a>=e.eMarks[r])return!1;const i=e.src.charCodeAt(a++);if(i!==124&&i!==45&&i!==58&&!C(i)||o===45&&C(i))return!1;for(;a<e.eMarks[r];){const b=e.src.charCodeAt(a);if(b!==124&&b!==45&&b!==58&&!C(b))return!1;a++}let s=Ee(e,n+1),c=s.split("|");const l=[];for(let b=0;b<c.length;b++){const g=c[b].trim();if(!g){if(b===0||b===c.length-1)continue;return!1}if(!/^:?-+:?$/.test(g))return!1;g.charCodeAt(g.length-1)===58?l.push(g.charCodeAt(0)===58?"center":"right"):g.charCodeAt(0)===58?l.push("left"):l.push("")}if(s=Ee(e,n).trim(),s.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;c=Qe(s),c.length&&c[0]===""&&c.shift(),c.length&&c[c.length-1]===""&&c.pop();const d=c.length;if(d===0||d!==l.length)return!1;if(t)return!0;const h=e.parentType;e.parentType="table";const f=e.md.block.ruler.getRules("blockquote"),p=e.push("table_open","table",1),E=[n,0];p.map=E;const y=e.push("thead_open","thead",1);y.map=[n,n+1];const x=e.push("tr_open","tr",1);x.map=[n,n+1];for(let b=0;b<c.length;b++){const g=e.push("th_open","th",1);l[b]&&(g.attrs=[["style","text-align:"+l[b]]]);const S=e.push("inline","",0);S.content=c[b].trim(),S.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let m,_=0;for(r=n+2;r<u&&!(e.sCount[r]<e.blkIndent);r++){let b=!1;for(let S=0,T=f.length;S<T;S++)if(f[S](e,r,u,!0)){b=!0;break}if(b||(s=Ee(e,r).trim(),!s)||e.sCount[r]-e.blkIndent>=4||(c=Qe(s),c.length&&c[0]===""&&c.shift(),c.length&&c[c.length-1]===""&&c.pop(),_+=d-c.length,_>ct))break;if(r===n+2){const S=e.push("tbody_open","tbody",1);S.map=m=[n+2,0]}const g=e.push("tr_open","tr",1);g.map=[r,r+1];for(let S=0;S<d;S++){const T=e.push("td_open","td",1);l[S]&&(T.attrs=[["style","text-align:"+l[S]]]);const I=e.push("inline","",0);I.content=c[S]?c[S].trim():"",I.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return m&&(e.push("tbody_close","tbody",-1),m[1]=r),e.push("table_close","table",-1),E[1]=r,e.parentType=h,e.line=r,!0}function dt(e,n,u){if(e.sCount[n]-e.blkIndent<4)return!1;let t=n+1,r=t;for(;t<u;){if(e.isEmpty(t)){t++;continue}if(e.sCount[t]-e.blkIndent>=4){t++,r=t;continue}break}e.line=r;const a=e.push("code_block","code",0);return a.content=e.getLines(n,r,4+e.blkIndent,!1)+`
`,a.map=[n,e.line],!0}function pt(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||r+3>a)return!1;const o=e.src.charCodeAt(r);if(o!==126&&o!==96)return!1;let i=r;r=e.skipChars(r,o);let s=r-i;if(s<3)return!1;const c=e.src.slice(i,r),l=e.src.slice(r,a);if(o===96&&l.indexOf(String.fromCharCode(o))>=0)return!1;if(t)return!0;let d=n,h=!1;for(;d++,!(d>=u||(r=i=e.bMarks[d]+e.tShift[d],a=e.eMarks[d],r<a&&e.sCount[d]<e.blkIndent));)if(e.src.charCodeAt(r)===o&&!(e.sCount[d]-e.blkIndent>=4)&&(r=e.skipChars(r,o),!(r-i<s)&&(r=e.skipSpaces(r),!(r<a)))){h=!0;break}s=e.sCount[n],e.line=d+(h?1:0);const f=e.push("fence","code",0);return f.info=l,f.content=e.getLines(n+1,d,s,!0),f.markup=c,f.map=[n,e.line],!0}function ft(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];const o=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(r)!==62)return!1;if(t)return!0;const i=[],s=[],c=[],l=[],d=e.md.block.ruler.getRules("blockquote"),h=e.parentType;e.parentType="blockquote";let f=!1,p;for(p=n;p<u;p++){const _=e.sCount[p]<e.blkIndent;if(r=e.bMarks[p]+e.tShift[p],a=e.eMarks[p],r>=a)break;if(e.src.charCodeAt(r++)===62&&!_){let g=e.sCount[p]+1,S,T;e.src.charCodeAt(r)===32?(r++,g++,T=!1,S=!0):e.src.charCodeAt(r)===9?(S=!0,(e.bsCount[p]+g)%4===3?(r++,g++,T=!1):T=!0):S=!1;let I=g;for(i.push(e.bMarks[p]),e.bMarks[p]=r;r<a;){const F=e.src.charCodeAt(r);if(C(F))F===9?I+=4-(I+e.bsCount[p]+(T?1:0))%4:I++;else break;r++}f=r>=a,s.push(e.bsCount[p]),e.bsCount[p]=e.sCount[p]+1+(S?1:0),c.push(e.sCount[p]),e.sCount[p]=I-g,l.push(e.tShift[p]),e.tShift[p]=r-e.bMarks[p];continue}if(f)break;let b=!1;for(let g=0,S=d.length;g<S;g++)if(d[g](e,p,u,!0)){b=!0;break}if(b){e.lineMax=p,e.blkIndent!==0&&(i.push(e.bMarks[p]),s.push(e.bsCount[p]),l.push(e.tShift[p]),c.push(e.sCount[p]),e.sCount[p]-=e.blkIndent);break}i.push(e.bMarks[p]),s.push(e.bsCount[p]),l.push(e.tShift[p]),c.push(e.sCount[p]),e.sCount[p]=-1}const E=e.blkIndent;e.blkIndent=0;const y=e.push("blockquote_open","blockquote",1);y.markup=">";const x=[n,0];y.map=x,e.md.block.tokenize(e,n,p);const m=e.push("blockquote_close","blockquote",-1);m.markup=">",e.lineMax=o,e.parentType=h,x[1]=e.line;for(let _=0;_<l.length;_++)e.bMarks[_+n]=i[_],e.tShift[_+n]=l[_],e.sCount[_+n]=c[_],e.bsCount[_+n]=s[_];return e.blkIndent=E,!0}function ht(e,n,u,t){const r=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let a=e.bMarks[n]+e.tShift[n];const o=e.src.charCodeAt(a++);if(o!==42&&o!==45&&o!==95)return!1;let i=1;for(;a<r;){const c=e.src.charCodeAt(a++);if(c!==o&&!C(c))return!1;c===o&&i++}if(i<3)return!1;if(t)return!0;e.line=n+1;const s=e.push("hr","hr",0);return s.map=[n,e.line],s.markup=Array(i+1).join(String.fromCharCode(o)),!0}function Ye(e,n){const u=e.eMarks[n];let t=e.bMarks[n]+e.tShift[n];const r=e.src.charCodeAt(t++);if(r!==42&&r!==45&&r!==43)return-1;if(t<u){const a=e.src.charCodeAt(t);if(!C(a))return-1}return t}function $e(e,n){const u=e.bMarks[n]+e.tShift[n],t=e.eMarks[n];let r=u;if(r+1>=t)return-1;let a=e.src.charCodeAt(r++);if(a<48||a>57)return-1;for(;;){if(r>=t)return-1;if(a=e.src.charCodeAt(r++),a>=48&&a<=57){if(r-u>=10)return-1;continue}if(a===41||a===46)break;return-1}return r<t&&(a=e.src.charCodeAt(r),!C(a))?-1:r}function mt(e,n){const u=e.level+2;for(let t=n+2,r=e.tokens.length-2;t<r;t++)e.tokens[t].level===u&&e.tokens[t].type==="paragraph_open"&&(e.tokens[t+2].hidden=!0,e.tokens[t].hidden=!0,t+=2)}function bt(e,n,u,t){let r,a,o,i,s=n,c=!0;if(e.sCount[s]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[s]-e.listIndent>=4&&e.sCount[s]<e.blkIndent)return!1;let l=!1;t&&e.parentType==="paragraph"&&e.sCount[s]>=e.blkIndent&&(l=!0);let d,h,f;if((f=$e(e,s))>=0){if(d=!0,o=e.bMarks[s]+e.tShift[s],h=Number(e.src.slice(o,f-1)),l&&h!==1)return!1}else if((f=Ye(e,s))>=0)d=!1;else return!1;if(l&&e.skipSpaces(f)>=e.eMarks[s])return!1;if(t)return!0;const p=e.src.charCodeAt(f-1),E=e.tokens.length;d?(i=e.push("ordered_list_open","ol",1),h!==1&&(i.attrs=[["start",h]])):i=e.push("bullet_list_open","ul",1);const y=[s,0];i.map=y,i.markup=String.fromCharCode(p);let x=!1;const m=e.md.block.ruler.getRules("list"),_=e.parentType;for(e.parentType="list";s<u;){a=f,r=e.eMarks[s];const b=e.sCount[s]+f-(e.bMarks[s]+e.tShift[s]);let g=b;for(;a<r;){const H=e.src.charCodeAt(a);if(H===9)g+=4-(g+e.bsCount[s])%4;else if(H===32)g++;else break;a++}const S=a;let T;S>=r?T=1:T=g-b,T>4&&(T=1);const I=b+T;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(p);const F=[s,0];i.map=F,d&&(i.info=e.src.slice(o,f-1));const Y=e.tight,be=e.tShift[s],Fn=e.sCount[s],Nn=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=I,e.tight=!0,e.tShift[s]=S-e.bMarks[s],e.sCount[s]=g,S>=r&&e.isEmpty(s+1)?e.line=Math.min(e.line+2,u):e.md.block.tokenize(e,s,u,!0),(!e.tight||x)&&(c=!1),x=e.line-s>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=Nn,e.tShift[s]=be,e.sCount[s]=Fn,e.tight=Y,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(p),s=e.line,F[1]=s,s>=u||e.sCount[s]<e.blkIndent||e.sCount[s]-e.blkIndent>=4)break;let Ne=!1;for(let H=0,Un=m.length;H<Un;H++)if(m[H](e,s,u,!0)){Ne=!0;break}if(Ne)break;if(d){if(f=$e(e,s),f<0)break;o=e.bMarks[s]+e.tShift[s]}else if(f=Ye(e,s),f<0)break;if(p!==e.src.charCodeAt(f-1))break}return d?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(p),y[1]=s,e.line=s,e.parentType=_,c&&mt(e,E),!0}function _t(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],a=e.eMarks[n],o=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(r)!==91)return!1;function i(m){const _=e.lineMax;if(m>=_||e.isEmpty(m))return null;let b=!1;if(e.sCount[m]-e.blkIndent>3&&(b=!0),e.sCount[m]<0&&(b=!0),!b){const T=e.md.block.ruler.getRules("reference"),I=e.parentType;e.parentType="reference";let F=!1;for(let Y=0,be=T.length;Y<be;Y++)if(T[Y](e,m,_,!0)){F=!0;break}if(e.parentType=I,F)return null}const g=e.bMarks[m]+e.tShift[m],S=e.eMarks[m];return e.src.slice(g,S+1)}let s=e.src.slice(r,a+1);a=s.length;let c=-1;for(r=1;r<a;r++){const m=s.charCodeAt(r);if(m===91)return!1;if(m===93){c=r;break}else if(m===10){const _=i(o);_!==null&&(s+=_,a=s.length,o++)}else if(m===92&&(r++,r<a&&s.charCodeAt(r)===10)){const _=i(o);_!==null&&(s+=_,a=s.length,o++)}}if(c<0||s.charCodeAt(c+1)!==58)return!1;for(r=c+2;r<a;r++){const m=s.charCodeAt(r);if(m===10){const _=i(o);_!==null&&(s+=_,a=s.length,o++)}else if(!C(m))break}const l=e.md.helpers.parseLinkDestination(s,r,a);if(!l.ok)return!1;const d=e.md.normalizeLink(l.str);if(!e.md.validateLink(d))return!1;r=l.pos;const h=r,f=o,p=r;for(;r<a;r++){const m=s.charCodeAt(r);if(m===10){const _=i(o);_!==null&&(s+=_,a=s.length,o++)}else if(!C(m))break}let E=e.md.helpers.parseLinkTitle(s,r,a);for(;E.can_continue;){const m=i(o);if(m===null)break;s+=m,r=a,a=s.length,o++,E=e.md.helpers.parseLinkTitle(s,r,a,E)}let y;for(r<a&&p!==r&&E.ok?(y=E.str,r=E.pos):(y="",r=h,o=f);r<a;){const m=s.charCodeAt(r);if(!C(m))break;r++}if(r<a&&s.charCodeAt(r)!==10&&y)for(y="",r=h,o=f;r<a;){const m=s.charCodeAt(r);if(!C(m))break;r++}if(r<a&&s.charCodeAt(r)!==10)return!1;const x=pe(s.slice(1,c));return x?(t||(typeof e.env.references>"u"&&(e.env.references={}),typeof e.env.references[x]>"u"&&(e.env.references[x]={title:y,href:d}),e.line=o),!0):!1}const gt=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],Et="[a-zA-Z_:][a-zA-Z0-9:._-]*",yt="[^\"'=<>`\\x00-\\x20]+",St="'[^']*'",xt='"[^"]*"',Ct="(?:"+yt+"|"+St+"|"+xt+")",kt="(?:\\s+"+Et+"(?:\\s*=\\s*"+Ct+")?)",gn="<[A-Za-z][A-Za-z0-9\\-]*"+kt+"*\\s*\\/?>",En="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",At="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",Tt="<[?][\\s\\S]*?[?]>",Dt="<![A-Za-z][^>]*>",vt="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",Pt=new RegExp("^(?:"+gn+"|"+En+"|"+At+"|"+Tt+"|"+Dt+"|"+vt+")"),It=new RegExp("^(?:"+gn+"|"+En+")"),q=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+gt.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(It.source+"\\s*$"),/^$/,!1]];function Mt(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(r)!==60)return!1;let o=e.src.slice(r,a),i=0;for(;i<q.length&&!q[i][0].test(o);i++);if(i===q.length)return!1;if(t)return q[i][2];let s=n+1;if(!q[i][1].test(o)){for(;s<u&&!(e.sCount[s]<e.blkIndent);s++)if(r=e.bMarks[s]+e.tShift[s],a=e.eMarks[s],o=e.src.slice(r,a),q[i][1].test(o)){o.length!==0&&s++;break}}e.line=s;const c=e.push("html_block","",0);return c.map=[n,s],c.content=e.getLines(n,s,e.blkIndent,!0),!0}function Ot(e,n,u,t){let r=e.bMarks[n]+e.tShift[n],a=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let o=e.src.charCodeAt(r);if(o!==35||r>=a)return!1;let i=1;for(o=e.src.charCodeAt(++r);o===35&&r<a&&i<=6;)i++,o=e.src.charCodeAt(++r);if(i>6||r<a&&!C(o))return!1;if(t)return!0;a=e.skipSpacesBack(a,r);const s=e.skipCharsBack(a,35,r);s>r&&C(e.src.charCodeAt(s-1))&&(a=s),e.line=n+1;const c=e.push("heading_open","h"+String(i),1);c.markup="########".slice(0,i),c.map=[n,e.line];const l=e.push("inline","",0);l.content=e.src.slice(r,a).trim(),l.map=[n,e.line],l.children=[];const d=e.push("heading_close","h"+String(i),-1);return d.markup="########".slice(0,i),!0}function Lt(e,n,u){const t=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;const r=e.parentType;e.parentType="paragraph";let a=0,o,i=n+1;for(;i<u&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let f=e.bMarks[i]+e.tShift[i];const p=e.eMarks[i];if(f<p&&(o=e.src.charCodeAt(f),(o===45||o===61)&&(f=e.skipChars(f,o),f=e.skipSpaces(f),f>=p))){a=o===61?1:2;break}}if(e.sCount[i]<0)continue;let h=!1;for(let f=0,p=t.length;f<p;f++)if(t[f](e,i,u,!0)){h=!0;break}if(h)break}if(!a)return!1;const s=e.getLines(n,i,e.blkIndent,!1).trim();e.line=i+1;const c=e.push("heading_open","h"+String(a),1);c.markup=String.fromCharCode(o),c.map=[n,e.line];const l=e.push("inline","",0);l.content=s,l.map=[n,e.line-1],l.children=[];const d=e.push("heading_close","h"+String(a),-1);return d.markup=String.fromCharCode(o),e.parentType=r,!0}function wt(e,n,u){const t=e.md.block.ruler.getRules("paragraph"),r=e.parentType;let a=n+1;for(e.parentType="paragraph";a<u&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3||e.sCount[a]<0)continue;let c=!1;for(let l=0,d=t.length;l<d;l++)if(t[l](e,a,u,!0)){c=!0;break}if(c)break}const o=e.getLines(n,a,e.blkIndent,!1).trim();e.line=a;const i=e.push("paragraph_open","p",1);i.map=[n,e.line];const s=e.push("inline","",0);return s.content=o,s.map=[n,e.line],s.children=[],e.push("paragraph_close","p",-1),e.parentType=r,!0}const ie=[["table",lt,["paragraph","reference"]],["code",dt],["fence",pt,["paragraph","reference","blockquote","list"]],["blockquote",ft,["paragraph","reference","blockquote","list"]],["hr",ht,["paragraph","reference","blockquote","list"]],["list",bt,["paragraph","reference","blockquote"]],["reference",_t],["html_block",Mt,["paragraph","reference","blockquote"]],["heading",Ot,["paragraph","reference","blockquote"]],["lheading",Lt],["paragraph",wt]];function fe(){this.ruler=new D;for(let e=0;e<ie.length;e++)this.ruler.push(ie[e][0],ie[e][1],{alt:(ie[e][2]||[]).slice()})}fe.prototype.tokenize=function(e,n,u){const t=this.ruler.getRules(""),r=t.length,a=e.md.options.maxNesting;let o=n,i=!1;for(;o<u&&(e.line=o=e.skipEmptyLines(o),!(o>=u||e.sCount[o]<e.blkIndent));){if(e.level>=a){e.line=u;break}const s=e.line;let c=!1;for(let l=0;l<r;l++)if(c=t[l](e,o,u,!1),c){if(s>=e.line)throw new Error("block rule didn't increment state.line");break}if(!c)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),o=e.line,o<u&&e.isEmpty(o)&&(i=!0,o++,e.line=o)}};fe.prototype.parse=function(e,n,u,t){if(!e)return;const r=new this.State(e,n,u,t);this.tokenize(r,r.line,r.lineMax)};fe.prototype.State=R;function ue(e,n,u,t){this.src=e,this.env=u,this.md=n,this.tokens=t,this.tokens_meta=Array(t.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}ue.prototype.pushPending=function(){const e=new M("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};ue.prototype.push=function(e,n,u){this.pending&&this.pushPending();const t=new M(e,n,u);let r=null;return u<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),t.level=this.level,u>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(t),this.tokens_meta.push(r),t};ue.prototype.scanDelims=function(e,n){const u=this.posMax,t=this.src.charCodeAt(e),r=e>0?this.src.charCodeAt(e-1):32;let a=e;for(;a<u&&this.src.charCodeAt(a)===t;)a++;const o=a-e,i=a<u?this.src.charCodeAt(a):32,s=Z(r)||J(String.fromCharCode(r)),c=Z(i)||J(String.fromCharCode(i)),l=$(r),d=$(i),h=!d&&(!c||l||s),f=!l&&(!s||d||c);return{can_open:h&&(n||!f||s),can_close:f&&(n||!h||c),length:o}};ue.prototype.Token=M;function Rt(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function Ft(e,n){let u=e.pos;for(;u<e.posMax&&!Rt(e.src.charCodeAt(u));)u++;return u===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,u)),e.pos=u,!0)}const Nt=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function Ut(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;const u=e.pos,t=e.posMax;if(u+3>t||e.src.charCodeAt(u)!==58||e.src.charCodeAt(u+1)!==47||e.src.charCodeAt(u+2)!==47)return!1;const r=e.pending.match(Nt);if(!r)return!1;const a=r[1],o=e.md.linkify.matchAtStart(e.src.slice(u-a.length));if(!o)return!1;let i=o.url;if(i.length<=a.length)return!1;let s=i.length;for(;s>0&&i.charCodeAt(s-1)===42;)s--;s!==i.length&&(i=i.slice(0,s));const c=e.md.normalizeLink(i);if(!e.md.validateLink(c))return!1;if(!n){e.pending=e.pending.slice(0,-a.length);const l=e.push("link_open","a",1);l.attrs=[["href",c]],l.markup="linkify",l.info="auto";const d=e.push("text","",0);d.content=e.md.normalizeLinkText(i);const h=e.push("link_close","a",-1);h.markup="linkify",h.info="auto"}return e.pos+=i.length-a.length,!0}function Gt(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==10)return!1;const t=e.pending.length-1,r=e.posMax;if(!n)if(t>=0&&e.pending.charCodeAt(t)===32)if(t>=1&&e.pending.charCodeAt(t-1)===32){let a=t-1;for(;a>=1&&e.pending.charCodeAt(a-1)===32;)a--;e.pending=e.pending.slice(0,a),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(u++;u<r&&C(e.src.charCodeAt(u));)u++;return e.pos=u,!0}const we=[];for(let e=0;e<256;e++)we.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){we[e.charCodeAt(0)]=1});function Bt(e,n){let u=e.pos;const t=e.posMax;if(e.src.charCodeAt(u)!==92||(u++,u>=t))return!1;let r=e.src.charCodeAt(u);if(r===10){for(n||e.push("hardbreak","br",0),u++;u<t&&(r=e.src.charCodeAt(u),!!C(r));)u++;return e.pos=u,!0}let a=e.src[u];if(r>=55296&&r<=56319&&u+1<t){const i=e.src.charCodeAt(u+1);i>=56320&&i<=57343&&(a+=e.src[u+1],u++)}const o="\\"+a;if(!n){const i=e.push("text_special","",0);r<256&&we[r]!==0?i.content=a:i.content=o,i.markup=o,i.info="escape"}return e.pos=u+1,!0}function jt(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==96)return!1;const r=u;u++;const a=e.posMax;for(;u<a&&e.src.charCodeAt(u)===96;)u++;const o=e.src.slice(r,u),i=o.length;if(e.backticksScanned&&(e.backticks[i]||0)<=r)return n||(e.pending+=o),e.pos+=i,!0;let s=u,c;for(;(c=e.src.indexOf("`",s))!==-1;){for(s=c+1;s<a&&e.src.charCodeAt(s)===96;)s++;const l=s-c;if(l===i){if(!n){const d=e.push("code_inline","code",0);d.markup=o,d.content=e.src.slice(u,c).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=s,!0}e.backticks[l]=c}return e.backticksScanned=!0,n||(e.pending+=o),e.pos+=i,!0}function Ht(e,n){const u=e.pos,t=e.src.charCodeAt(u);if(n||t!==126)return!1;const r=e.scanDelims(e.pos,!0);let a=r.length;const o=String.fromCharCode(t);if(a<2)return!1;let i;a%2&&(i=e.push("text","",0),i.content=o,a--);for(let s=0;s<a;s+=2)i=e.push("text","",0),i.content=o+o,e.delimiters.push({marker:t,length:0,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function Je(e,n){let u;const t=[],r=n.length;for(let a=0;a<r;a++){const o=n[a];if(o.marker!==126||o.end===-1)continue;const i=n[o.end];u=e.tokens[o.token],u.type="s_open",u.tag="s",u.nesting=1,u.markup="~~",u.content="",u=e.tokens[i.token],u.type="s_close",u.tag="s",u.nesting=-1,u.markup="~~",u.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&t.push(i.token-1)}for(;t.length;){const a=t.pop();let o=a+1;for(;o<e.tokens.length&&e.tokens[o].type==="s_close";)o++;o--,a!==o&&(u=e.tokens[o],e.tokens[o]=e.tokens[a],e.tokens[a]=u)}}function qt(e){const n=e.tokens_meta,u=e.tokens_meta.length;Je(e,e.delimiters);for(let t=0;t<u;t++)n[t]&&n[t].delimiters&&Je(e,n[t].delimiters)}const yn={tokenize:Ht,postProcess:qt};function zt(e,n){const u=e.pos,t=e.src.charCodeAt(u);if(n||t!==95&&t!==42)return!1;const r=e.scanDelims(e.pos,t===42);for(let a=0;a<r.length;a++){const o=e.push("text","",0);o.content=String.fromCharCode(t),e.delimiters.push({marker:t,length:r.length,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return e.pos+=r.length,!0}function Ze(e,n){const u=n.length;for(let t=u-1;t>=0;t--){const r=n[t];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;const a=n[r.end],o=t>0&&n[t-1].end===r.end+1&&n[t-1].marker===r.marker&&n[t-1].token===r.token-1&&n[r.end+1].token===a.token+1,i=String.fromCharCode(r.marker),s=e.tokens[r.token];s.type=o?"strong_open":"em_open",s.tag=o?"strong":"em",s.nesting=1,s.markup=o?i+i:i,s.content="";const c=e.tokens[a.token];c.type=o?"strong_close":"em_close",c.tag=o?"strong":"em",c.nesting=-1,c.markup=o?i+i:i,c.content="",o&&(e.tokens[n[t-1].token].content="",e.tokens[n[r.end+1].token].content="",t--)}}function Wt(e){const n=e.tokens_meta,u=e.tokens_meta.length;Ze(e,e.delimiters);for(let t=0;t<u;t++)n[t]&&n[t].delimiters&&Ze(e,n[t].delimiters)}const Sn={tokenize:zt,postProcess:Wt};function Kt(e,n){let u,t,r,a,o="",i="",s=e.pos,c=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;const l=e.pos,d=e.posMax,h=e.pos+1,f=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(f<0)return!1;let p=f+1;if(p<d&&e.src.charCodeAt(p)===40){for(c=!1,p++;p<d&&(u=e.src.charCodeAt(p),!(!C(u)&&u!==10));p++);if(p>=d)return!1;if(s=p,r=e.md.helpers.parseLinkDestination(e.src,p,e.posMax),r.ok){for(o=e.md.normalizeLink(r.str),e.md.validateLink(o)?p=r.pos:o="",s=p;p<d&&(u=e.src.charCodeAt(p),!(!C(u)&&u!==10));p++);if(r=e.md.helpers.parseLinkTitle(e.src,p,e.posMax),p<d&&s!==p&&r.ok)for(i=r.str,p=r.pos;p<d&&(u=e.src.charCodeAt(p),!(!C(u)&&u!==10));p++);}(p>=d||e.src.charCodeAt(p)!==41)&&(c=!0),p++}if(c){if(typeof e.env.references>"u")return!1;if(p<d&&e.src.charCodeAt(p)===91?(s=p+1,p=e.md.helpers.parseLinkLabel(e,p),p>=0?t=e.src.slice(s,p++):p=f+1):p=f+1,t||(t=e.src.slice(h,f)),a=e.env.references[pe(t)],!a)return e.pos=l,!1;o=a.href,i=a.title}if(!n){e.pos=h,e.posMax=f;const E=e.push("link_open","a",1),y=[["href",o]];E.attrs=y,i&&y.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=p,e.posMax=d,!0}function Vt(e,n){let u,t,r,a,o,i,s,c,l="";const d=e.pos,h=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;const f=e.pos+2,p=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(p<0)return!1;if(a=p+1,a<h&&e.src.charCodeAt(a)===40){for(a++;a<h&&(u=e.src.charCodeAt(a),!(!C(u)&&u!==10));a++);if(a>=h)return!1;for(c=a,i=e.md.helpers.parseLinkDestination(e.src,a,e.posMax),i.ok&&(l=e.md.normalizeLink(i.str),e.md.validateLink(l)?a=i.pos:l=""),c=a;a<h&&(u=e.src.charCodeAt(a),!(!C(u)&&u!==10));a++);if(i=e.md.helpers.parseLinkTitle(e.src,a,e.posMax),a<h&&c!==a&&i.ok)for(s=i.str,a=i.pos;a<h&&(u=e.src.charCodeAt(a),!(!C(u)&&u!==10));a++);else s="";if(a>=h||e.src.charCodeAt(a)!==41)return e.pos=d,!1;a++}else{if(typeof e.env.references>"u")return!1;if(a<h&&e.src.charCodeAt(a)===91?(c=a+1,a=e.md.helpers.parseLinkLabel(e,a),a>=0?r=e.src.slice(c,a++):a=p+1):a=p+1,r||(r=e.src.slice(f,p)),o=e.env.references[pe(r)],!o)return e.pos=d,!1;l=o.href,s=o.title}if(!n){t=e.src.slice(f,p);const E=[];e.md.inline.parse(t,e.md,e.env,E);const y=e.push("image","img",0),x=[["src",l],["alt",""]];y.attrs=x,y.children=E,y.content=t,s&&x.push(["title",s])}return e.pos=a,e.posMax=h,!0}const Xt=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,Qt=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function Yt(e,n){let u=e.pos;if(e.src.charCodeAt(u)!==60)return!1;const t=e.pos,r=e.posMax;for(;;){if(++u>=r)return!1;const o=e.src.charCodeAt(u);if(o===60)return!1;if(o===62)break}const a=e.src.slice(t+1,u);if(Qt.test(a)){const o=e.md.normalizeLink(a);if(!e.md.validateLink(o))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",o]],i.markup="autolink",i.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(a);const c=e.push("link_close","a",-1);c.markup="autolink",c.info="auto"}return e.pos+=a.length+2,!0}if(Xt.test(a)){const o=e.md.normalizeLink("mailto:"+a);if(!e.md.validateLink(o))return!1;if(!n){const i=e.push("link_open","a",1);i.attrs=[["href",o]],i.markup="autolink",i.info="auto";const s=e.push("text","",0);s.content=e.md.normalizeLinkText(a);const c=e.push("link_close","a",-1);c.markup="autolink",c.info="auto"}return e.pos+=a.length+2,!0}return!1}function $t(e){return/^<a[>\s]/i.test(e)}function Jt(e){return/^<\/a\s*>/i.test(e)}function Zt(e){const n=e|32;return n>=97&&n<=122}function er(e,n){if(!e.md.options.html)return!1;const u=e.posMax,t=e.pos;if(e.src.charCodeAt(t)!==60||t+2>=u)return!1;const r=e.src.charCodeAt(t+1);if(r!==33&&r!==63&&r!==47&&!Zt(r))return!1;const a=e.src.slice(t).match(Pt);if(!a)return!1;if(!n){const o=e.push("html_inline","",0);o.content=a[0],$t(o.content)&&e.linkLevel++,Jt(o.content)&&e.linkLevel--}return e.pos+=a[0].length,!0}const nr=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,ur=/^&([a-z][a-z0-9]{1,31});/i;function tr(e,n){const u=e.pos,t=e.posMax;if(e.src.charCodeAt(u)!==38||u+1>=t)return!1;if(e.src.charCodeAt(u+1)===35){const a=e.src.slice(u).match(nr);if(a){if(!n){const o=a[1][0].toLowerCase()==="x"?parseInt(a[1].slice(1),16):parseInt(a[1],10),i=e.push("text_special","",0);i.content=Oe(o)?se(o):se(65533),i.markup=a[0],i.info="entity"}return e.pos+=a[0].length,!0}}else{const a=e.src.slice(u).match(ur);if(a){const o=fn(a[0]);if(o!==a[0]){if(!n){const i=e.push("text_special","",0);i.content=o,i.markup=a[0],i.info="entity"}return e.pos+=a[0].length,!0}}}return!1}function en(e){const n={},u=e.length;if(!u)return;let t=0,r=-2;const a=[];for(let o=0;o<u;o++){const i=e[o];if(a.push(0),(e[t].marker!==i.marker||r!==i.token-1)&&(t=o),r=i.token,i.length=i.length||0,!i.close)continue;n.hasOwnProperty(i.marker)||(n[i.marker]=[-1,-1,-1,-1,-1,-1]);const s=n[i.marker][(i.open?3:0)+i.length%3];let c=t-a[t]-1,l=c;for(;c>s;c-=a[c]+1){const d=e[c];if(d.marker===i.marker&&d.open&&d.end<0){let h=!1;if((d.close||i.open)&&(d.length+i.length)%3===0&&(d.length%3!==0||i.length%3!==0)&&(h=!0),!h){const f=c>0&&!e[c-1].open?a[c-1]+1:0;a[o]=o-c+f,a[c]=f,i.open=!1,d.end=o,d.close=!1,l=-1,r=-2;break}}}l!==-1&&(n[i.marker][(i.open?3:0)+(i.length||0)%3]=l)}}function rr(e){const n=e.tokens_meta,u=e.tokens_meta.length;en(e.delimiters);for(let t=0;t<u;t++)n[t]&&n[t].delimiters&&en(n[t].delimiters)}function ar(e){let n,u,t=0;const r=e.tokens,a=e.tokens.length;for(n=u=0;n<a;n++)r[n].nesting<0&&t--,r[n].level=t,r[n].nesting>0&&t++,r[n].type==="text"&&n+1<a&&r[n+1].type==="text"?r[n+1].content=r[n].content+r[n+1].content:(n!==u&&(r[u]=r[n]),u++);n!==u&&(r.length=u)}const ye=[["text",Ft],["linkify",Ut],["newline",Gt],["escape",Bt],["backticks",jt],["strikethrough",yn.tokenize],["emphasis",Sn.tokenize],["link",Kt],["image",Vt],["autolink",Yt],["html_inline",er],["entity",tr]],Se=[["balance_pairs",rr],["strikethrough",yn.postProcess],["emphasis",Sn.postProcess],["fragments_join",ar]];function te(){this.ruler=new D;for(let e=0;e<ye.length;e++)this.ruler.push(ye[e][0],ye[e][1]);this.ruler2=new D;for(let e=0;e<Se.length;e++)this.ruler2.push(Se[e][0],Se[e][1])}te.prototype.skipToken=function(e){const n=e.pos,u=this.ruler.getRules(""),t=u.length,r=e.md.options.maxNesting,a=e.cache;if(typeof a[n]<"u"){e.pos=a[n];return}let o=!1;if(e.level<r){for(let i=0;i<t;i++)if(e.level++,o=u[i](e,!0),e.level--,o){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;o||e.pos++,a[n]=e.pos};te.prototype.tokenize=function(e){const n=this.ruler.getRules(""),u=n.length,t=e.posMax,r=e.md.options.maxNesting;for(;e.pos<t;){const a=e.pos;let o=!1;if(e.level<r){for(let i=0;i<u;i++)if(o=n[i](e,!1),o){if(a>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(o){if(e.pos>=t)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};te.prototype.parse=function(e,n,u,t){const r=new this.State(e,n,u,t);this.tokenize(r);const a=this.ruler2.getRules(""),o=a.length;for(let i=0;i<o;i++)a[i](r)};te.prototype.State=ue;function ir(e){const n={};e=e||{},n.src_Any=sn.source,n.src_Cc=cn.source,n.src_Z=dn.source,n.src_P=Ie.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");const u="[><｜]";return n.src_pseudo_letter="(?:(?!"+u+"|"+n.src_ZPCc+")"+n.src_Any+")",n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth="(?:(?:(?!"+n.src_ZCc+"|[@/\\[\\]()]).)+@)?",n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator="(?=$|"+u+"|"+n.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+n.src_ZPCc+"))",n.src_path="(?:[/?#](?:(?!"+n.src_ZCc+"|"+u+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+n.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+n.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+n.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+n.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+n.src_ZCc+"|[']).)+\\'|\\'(?="+n.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+n.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+n.src_ZCc+"|$)|;(?!"+n.src_ZCc+"|$)|\\!+(?!"+n.src_ZCc+"|[!]|$)|\\?(?!"+n.src_ZCc+"|[?]|$))+|\\/)?",n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+"|"+n.src_pseudo_letter+"{1,63})",n.src_domain="(?:"+n.src_xn+"|(?:"+n.src_pseudo_letter+")|(?:"+n.src_pseudo_letter+"(?:-|"+n.src_pseudo_letter+"){0,61}"+n.src_pseudo_letter+"))",n.src_host="(?:(?:(?:(?:"+n.src_domain+")\\.)*"+n.src_domain+"))",n.tpl_host_fuzzy="(?:"+n.src_ip4+"|(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%)))",n.tpl_host_no_ip_fuzzy="(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%))",n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+n.src_ZPCc+"|>|$))",n.tpl_email_fuzzy="(^|"+u+'|"|\\(|'+n.src_ZCc+")("+n.src_email_name+"@"+n.tpl_host_fuzzy_strict+")",n.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_fuzzy_strict+n.src_path+")",n.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+n.src_ZPCc+"))((?![$+<=>^`|｜])"+n.tpl_host_port_no_ip_fuzzy_strict+n.src_path+")",n}function Ae(e){return Array.prototype.slice.call(arguments,1).forEach(function(u){u&&Object.keys(u).forEach(function(t){e[t]=u[t]})}),e}function he(e){return Object.prototype.toString.call(e)}function or(e){return he(e)==="[object String]"}function sr(e){return he(e)==="[object Object]"}function cr(e){return he(e)==="[object RegExp]"}function nn(e){return he(e)==="[object Function]"}function lr(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}const xn={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function dr(e){return Object.keys(e||{}).reduce(function(n,u){return n||xn.hasOwnProperty(u)},!1)}const pr={"http:":{validate:function(e,n,u){const t=e.slice(n);return u.re.http||(u.re.http=new RegExp("^\\/\\/"+u.re.src_auth+u.re.src_host_port_strict+u.re.src_path,"i")),u.re.http.test(t)?t.match(u.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,u){const t=e.slice(n);return u.re.no_http||(u.re.no_http=new RegExp("^"+u.re.src_auth+"(?:localhost|(?:(?:"+u.re.src_domain+")\\.)+"+u.re.src_domain_root+")"+u.re.src_port+u.re.src_host_terminator+u.re.src_path,"i")),u.re.no_http.test(t)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:t.match(u.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,u){const t=e.slice(n);return u.re.mailto||(u.re.mailto=new RegExp("^"+u.re.src_email_name+"@"+u.re.src_host_strict,"i")),u.re.mailto.test(t)?t.match(u.re.mailto)[0].length:0}}},fr="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",hr="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function mr(e){e.__index__=-1,e.__text_cache__=""}function br(e){return function(n,u){const t=n.slice(u);return e.test(t)?t.match(e)[0].length:0}}function un(){return function(e,n){n.normalize(e)}}function ce(e){const n=e.re=ir(e.__opts__),u=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||u.push(fr),u.push(n.src_xn),n.src_tlds=u.join("|");function t(i){return i.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(t(n.tpl_email_fuzzy),"i"),n.link_fuzzy=RegExp(t(n.tpl_link_fuzzy),"i"),n.link_no_ip_fuzzy=RegExp(t(n.tpl_link_no_ip_fuzzy),"i"),n.host_fuzzy_test=RegExp(t(n.tpl_host_fuzzy_test),"i");const r=[];e.__compiled__={};function a(i,s){throw new Error('(LinkifyIt) Invalid schema "'+i+'": '+s)}Object.keys(e.__schemas__).forEach(function(i){const s=e.__schemas__[i];if(s===null)return;const c={validate:null,link:null};if(e.__compiled__[i]=c,sr(s)){cr(s.validate)?c.validate=br(s.validate):nn(s.validate)?c.validate=s.validate:a(i,s),nn(s.normalize)?c.normalize=s.normalize:s.normalize?a(i,s):c.normalize=un();return}if(or(s)){r.push(i);return}a(i,s)}),r.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:un()};const o=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(lr).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+o+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+n.src_ZPCc+"))("+o+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i"),mr(e)}function _r(e,n){const u=e.__index__,t=e.__last_index__,r=e.__text_cache__.slice(u,t);this.schema=e.__schema__.toLowerCase(),this.index=u+n,this.lastIndex=t+n,this.raw=r,this.text=r,this.url=r}function Te(e,n){const u=new _r(e,n);return e.__compiled__[u.schema].normalize(u,e),u}function v(e,n){if(!(this instanceof v))return new v(e,n);n||dr(e)&&(n=e,e={}),this.__opts__=Ae({},xn,n),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=Ae({},pr,e),this.__compiled__={},this.__tlds__=hr,this.__tlds_replaced__=!1,this.re={},ce(this)}v.prototype.add=function(n,u){return this.__schemas__[n]=u,ce(this),this};v.prototype.set=function(n){return this.__opts__=Ae(this.__opts__,n),this};v.prototype.test=function(n){if(this.__text_cache__=n,this.__index__=-1,!n.length)return!1;let u,t,r,a,o,i,s,c,l;if(this.re.schema_test.test(n)){for(s=this.re.schema_search,s.lastIndex=0;(u=s.exec(n))!==null;)if(a=this.testSchemaAt(n,u[2],s.lastIndex),a){this.__schema__=u[2],this.__index__=u.index+u[1].length,this.__last_index__=u.index+u[0].length+a;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(c=n.search(this.re.host_fuzzy_test),c>=0&&(this.__index__<0||c<this.__index__)&&(t=n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(o=t.index+t[1].length,(this.__index__<0||o<this.__index__)&&(this.__schema__="",this.__index__=o,this.__last_index__=t.index+t[0].length))),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&(l=n.indexOf("@"),l>=0&&(r=n.match(this.re.email_fuzzy))!==null&&(o=r.index+r[1].length,i=r.index+r[0].length,(this.__index__<0||o<this.__index__||o===this.__index__&&i>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=o,this.__last_index__=i))),this.__index__>=0};v.prototype.pretest=function(n){return this.re.pretest.test(n)};v.prototype.testSchemaAt=function(n,u,t){return this.__compiled__[u.toLowerCase()]?this.__compiled__[u.toLowerCase()].validate(n,t,this):0};v.prototype.match=function(n){const u=[];let t=0;this.__index__>=0&&this.__text_cache__===n&&(u.push(Te(this,t)),t=this.__last_index__);let r=t?n.slice(t):n;for(;this.test(r);)u.push(Te(this,t)),r=r.slice(this.__last_index__),t+=this.__last_index__;return u.length?u:null};v.prototype.matchAtStart=function(n){if(this.__text_cache__=n,this.__index__=-1,!n.length)return null;const u=this.re.schema_at_start.exec(n);if(!u)return null;const t=this.testSchemaAt(n,u[2],u[0].length);return t?(this.__schema__=u[2],this.__index__=u.index+u[1].length,this.__last_index__=u.index+u[0].length+t,Te(this,0)):null};v.prototype.tlds=function(n,u){return n=Array.isArray(n)?n:[n],u?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(t,r,a){return t!==a[r-1]}).reverse(),ce(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,ce(this),this)};v.prototype.normalize=function(n){n.schema||(n.url="http://"+n.url),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url="mailto:"+n.url)};v.prototype.onCompile=function(){};const W=2147483647,O=36,Re=1,ee=26,gr=38,Er=700,Cn=72,kn=128,An="-",yr=/^xn--/,Sr=/[^\0-\x7F]/,xr=/[\x2E\u3002\uFF0E\uFF61]/g,Cr={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},xe=O-Re,L=Math.floor,Ce=String.fromCharCode;function N(e){throw new RangeError(Cr[e])}function kr(e,n){const u=[];let t=e.length;for(;t--;)u[t]=n(e[t]);return u}function Tn(e,n){const u=e.split("@");let t="";u.length>1&&(t=u[0]+"@",e=u[1]),e=e.replace(xr,".");const r=e.split("."),a=kr(r,n).join(".");return t+a}function Dn(e){const n=[];let u=0;const t=e.length;for(;u<t;){const r=e.charCodeAt(u++);if(r>=55296&&r<=56319&&u<t){const a=e.charCodeAt(u++);(a&64512)==56320?n.push(((r&1023)<<10)+(a&1023)+65536):(n.push(r),u--)}else n.push(r)}return n}const Ar=e=>String.fromCodePoint(...e),Tr=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:O},tn=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},vn=function(e,n,u){let t=0;for(e=u?L(e/Er):e>>1,e+=L(e/n);e>xe*ee>>1;t+=O)e=L(e/xe);return L(t+(xe+1)*e/(e+gr))},Pn=function(e){const n=[],u=e.length;let t=0,r=kn,a=Cn,o=e.lastIndexOf(An);o<0&&(o=0);for(let i=0;i<o;++i)e.charCodeAt(i)>=128&&N("not-basic"),n.push(e.charCodeAt(i));for(let i=o>0?o+1:0;i<u;){const s=t;for(let l=1,d=O;;d+=O){i>=u&&N("invalid-input");const h=Tr(e.charCodeAt(i++));h>=O&&N("invalid-input"),h>L((W-t)/l)&&N("overflow"),t+=h*l;const f=d<=a?Re:d>=a+ee?ee:d-a;if(h<f)break;const p=O-f;l>L(W/p)&&N("overflow"),l*=p}const c=n.length+1;a=vn(t-s,c,s==0),L(t/c)>W-r&&N("overflow"),r+=L(t/c),t%=c,n.splice(t++,0,r)}return String.fromCodePoint(...n)},In=function(e){const n=[];e=Dn(e);const u=e.length;let t=kn,r=0,a=Cn;for(const s of e)s<128&&n.push(Ce(s));const o=n.length;let i=o;for(o&&n.push(An);i<u;){let s=W;for(const l of e)l>=t&&l<s&&(s=l);const c=i+1;s-t>L((W-r)/c)&&N("overflow"),r+=(s-t)*c,t=s;for(const l of e)if(l<t&&++r>W&&N("overflow"),l===t){let d=r;for(let h=O;;h+=O){const f=h<=a?Re:h>=a+ee?ee:h-a;if(d<f)break;const p=d-f,E=O-f;n.push(Ce(tn(f+p%E,0))),d=L(p/E)}n.push(Ce(tn(d,0))),a=vn(r,c,i===o),r=0,++i}++r,++t}return n.join("")},Dr=function(e){return Tn(e,function(n){return yr.test(n)?Pn(n.slice(4).toLowerCase()):n})},vr=function(e){return Tn(e,function(n){return Sr.test(n)?"xn--"+In(n):n})},Mn={version:"2.3.1",ucs2:{decode:Dn,encode:Ar},decode:Pn,encode:In,toASCII:vr,toUnicode:Dr},Pr={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},Ir={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},Mr={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}},Or={default:Pr,zero:Ir,commonmark:Mr},Lr=/^(vbscript|javascript|file|data):/,wr=/^data:image\/(gif|png|jpeg|webp);/;function Rr(e){const n=e.trim().toLowerCase();return Lr.test(n)?wr.test(n):!0}const On=["http:","https:","mailto:"];function Fr(e){const n=Pe(e,!0);if(n.hostname&&(!n.protocol||On.indexOf(n.protocol)>=0))try{n.hostname=Mn.toASCII(n.hostname)}catch{}return ne(ve(n))}function Nr(e){const n=Pe(e,!0);if(n.hostname&&(!n.protocol||On.indexOf(n.protocol)>=0))try{n.hostname=Mn.toUnicode(n.hostname)}catch{}return K(ve(n),K.defaultChars+"%")}function P(e,n){if(!(this instanceof P))return new P(e,n);n||Me(e)||(n=e||{},e="default"),this.inline=new te,this.block=new fe,this.core=new Le,this.renderer=new Q,this.linkify=new v,this.validateLink=Rr,this.normalizeLink=Fr,this.normalizeLinkText=Nr,this.utils=Gu,this.helpers=de({},qu),this.options={},this.configure(e),n&&this.set(n)}P.prototype.set=function(e){return de(this.options,e),this};P.prototype.configure=function(e){const n=this;if(Me(e)){const u=e;if(e=Or[u],!e)throw new Error('Wrong `markdown-it` preset "'+u+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(u){e.components[u].rules&&n[u].ruler.enableOnly(e.components[u].rules),e.components[u].rules2&&n[u].ruler2.enableOnly(e.components[u].rules2)}),this};P.prototype.enable=function(e,n){let u=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){u=u.concat(this[r].ruler.enable(e,!0))},this),u=u.concat(this.inline.ruler2.enable(e,!0));const t=e.filter(function(r){return u.indexOf(r)<0});if(t.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+t);return this};P.prototype.disable=function(e,n){let u=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){u=u.concat(this[r].ruler.disable(e,!0))},this),u=u.concat(this.inline.ruler2.disable(e,!0));const t=e.filter(function(r){return u.indexOf(r)<0});if(t.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+t);return this};P.prototype.use=function(e){const n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};P.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");const u=new this.core.State(e,this,n);return this.core.process(u),u.tokens};P.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};P.prototype.parseInline=function(e,n){const u=new this.core.State(e,this,n);return u.inlineMode=!0,this.core.process(u),u.tokens};P.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var rn=!1,X={false:"push",true:"unshift",after:"push",before:"unshift"},le={isPermalinkSymbol:!0};function De(e,n,u,t){var r;if(!rn){var a="Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";typeof process=="object"&&process&&process.emitWarning?process.emitWarning(a):console.warn(a),rn=!0}var o=[Object.assign(new u.Token("link_open","a",1),{attrs:[].concat(n.permalinkClass?[["class",n.permalinkClass]]:[],[["href",n.permalinkHref(e,u)]],Object.entries(n.permalinkAttrs(e,u)))}),Object.assign(new u.Token("html_block","",0),{content:n.permalinkSymbol,meta:le}),new u.Token("link_close","a",-1)];n.permalinkSpace&&u.tokens[t+1].children[X[n.permalinkBefore]](Object.assign(new u.Token("text","",0),{content:" "})),(r=u.tokens[t+1].children)[X[n.permalinkBefore]].apply(r,o)}function Ln(e){return"#"+e}function wn(e){return{}}var Ur={class:"header-anchor",symbol:"#",renderHref:Ln,renderAttrs:wn};function re(e){function n(u){return u=Object.assign({},n.defaults,u),function(t,r,a,o){return e(t,u,r,a,o)}}return n.defaults=Object.assign({},Ur),n.renderPermalinkImpl=e,n}function Fe(e){var n=[],u=e.filter(function(t){if(t[0]!=="class")return!0;n.push(t[1])});return n.length>0&&u.unshift(["class",n.join(" ")]),u}var me=re(function(e,n,u,t,r){var a,o=[Object.assign(new t.Token("link_open","a",1),{attrs:Fe([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,t)]],n.ariaHidden?[["aria-hidden","true"]]:[],Object.entries(n.renderAttrs(e,t))))}),Object.assign(new t.Token("html_inline","",0),{content:n.symbol,meta:le}),new t.Token("link_close","a",-1)];if(n.space){var i=typeof n.space=="string"?n.space:" ";t.tokens[r+1].children[X[n.placement]](Object.assign(new t.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:i}))}(a=t.tokens[r+1].children)[X[n.placement]].apply(a,o)});Object.assign(me.defaults,{space:!0,placement:"after",ariaHidden:!1});var j=re(me.renderPermalinkImpl);j.defaults=Object.assign({},me.defaults,{ariaHidden:!0});var Rn=re(function(e,n,u,t,r){var a=[Object.assign(new t.Token("link_open","a",1),{attrs:Fe([].concat(n.class?[["class",n.class]]:[],[["href",n.renderHref(e,t)]],Object.entries(n.renderAttrs(e,t))))})].concat(n.safariReaderFix?[new t.Token("span_open","span",1)]:[],t.tokens[r+1].children,n.safariReaderFix?[new t.Token("span_close","span",-1)]:[],[new t.Token("link_close","a",-1)]);t.tokens[r+1]=Object.assign(new t.Token("inline","",0),{children:a})});Object.assign(Rn.defaults,{safariReaderFix:!1});var an=re(function(e,n,u,t,r){var a;if(!["visually-hidden","aria-label","aria-describedby","aria-labelledby"].includes(n.style))throw new Error("`permalink.linkAfterHeader` called with unknown style option `"+n.style+"`");if(!["aria-describedby","aria-labelledby"].includes(n.style)&&!n.assistiveText)throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `"+n.style+"` style");if(n.style==="visually-hidden"&&!n.visuallyHiddenClass)throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");var o=t.tokens[r+1].children.filter(function(d){return d.type==="text"||d.type==="code_inline"}).reduce(function(d,h){return d+h.content},""),i=[],s=[];if(n.class&&s.push(["class",n.class]),s.push(["href",n.renderHref(e,t)]),s.push.apply(s,Object.entries(n.renderAttrs(e,t))),n.style==="visually-hidden"){if(i.push(Object.assign(new t.Token("span_open","span",1),{attrs:[["class",n.visuallyHiddenClass]]}),Object.assign(new t.Token("text","",0),{content:n.assistiveText(o)}),new t.Token("span_close","span",-1)),n.space){var c=typeof n.space=="string"?n.space:" ";i[X[n.placement]](Object.assign(new t.Token(typeof n.space=="string"?"html_inline":"text","",0),{content:c}))}i[X[n.placement]](Object.assign(new t.Token("span_open","span",1),{attrs:[["aria-hidden","true"]]}),Object.assign(new t.Token("html_inline","",0),{content:n.symbol,meta:le}),new t.Token("span_close","span",-1))}else i.push(Object.assign(new t.Token("html_inline","",0),{content:n.symbol,meta:le}));n.style==="aria-label"?s.push(["aria-label",n.assistiveText(o)]):["aria-describedby","aria-labelledby"].includes(n.style)&&s.push([n.style,e]);var l=[Object.assign(new t.Token("link_open","a",1),{attrs:Fe(s)})].concat(i,[new t.Token("link_close","a",-1)]);(a=t.tokens).splice.apply(a,[r+3,0].concat(l)),n.wrapper&&(t.tokens.splice(r,0,Object.assign(new t.Token("html_block","",0),{content:n.wrapper[0]+`
`})),t.tokens.splice(r+3+l.length+1,0,Object.assign(new t.Token("html_block","",0),{content:n.wrapper[1]+`
`})))});function on(e,n,u,t){var r=e,a=t;if(u&&Object.prototype.hasOwnProperty.call(n,r))throw new Error("User defined `id` attribute `"+e+"` is not unique. Please fix it in your Markdown to continue.");for(;Object.prototype.hasOwnProperty.call(n,r);)r=e+"-"+a,a+=1;return n[r]=!0,r}function z(e,n){n=Object.assign({},z.defaults,n),e.core.ruler.push("anchor",function(u){for(var t,r={},a=u.tokens,o=Array.isArray(n.level)?(t=n.level,function(d){return t.includes(d)}):(function(d){return function(h){return h>=d}})(n.level),i=0;i<a.length;i++){var s=a[i];if(s.type==="heading_open"&&o(Number(s.tag.substr(1)))){var c=n.getTokensText(a[i+1].children),l=s.attrGet("id");l=l==null?on(l=n.slugifyWithState?n.slugifyWithState(c,u):n.slugify(c),r,!1,n.uniqueSlugStartIndex):on(l,r,!0,n.uniqueSlugStartIndex),s.attrSet("id",l),n.tabIndex!==!1&&s.attrSet("tabindex",""+n.tabIndex),typeof n.permalink=="function"?n.permalink(l,n,u,i):(n.permalink||n.renderPermalink&&n.renderPermalink!==De)&&n.renderPermalink(l,n,u,i),i=a.indexOf(s),n.callback&&n.callback(s,{slug:l,title:c})}}})}Object.assign(an.defaults,{style:"visually-hidden",space:!0,placement:"after",wrapper:null}),z.permalink={__proto__:null,legacy:De,renderHref:Ln,renderAttrs:wn,makePermalink:re,linkInsideHeader:me,ariaHidden:j,headerLink:Rn,linkAfterHeader:an},z.defaults={level:1,slugify:function(e){return encodeURIComponent(String(e).trim().toLowerCase().replace(/\s+/g,"-"))},uniqueSlugStartIndex:1,tabIndex:"-1",getTokensText:function(e){return e.filter(function(n){return["text","code_inline"].includes(n.type)}).map(function(n){return n.content}).join("")},permalink:!1,renderPermalink:De,permalinkClass:j.defaults.class,permalinkSpace:j.defaults.space,permalinkSymbol:"¶",permalinkBefore:j.defaults.placement==="before",permalinkHref:j.defaults.renderHref,permalinkAttrs:j.defaults.renderAttrs},z.default=z;const Gr=`\uFEFF# Emcoder CLI v2.1 — 使用说明书（保姆级）

嵌入式 MCU 智能开发 AI Agent 系统。集 AI 对话、代码生成、知识检索、串口通信、固件烧录、硬件调试、QEMU 仿真于一体，提供 **CLI / TUI / REST API / WebSocket** 四种交互方式。

> 最后更新：2026-02-20

---

## 目录

- [1. 系统概览](#1-系统概览)
- [2. 安装与环境准备](#2-安装与环境准备)
- [3. 配置（完整参考）](#3-配置完整参考)
- [4. 启动后端服务](#4-启动后端服务)
- [5. CLI 命令行工具](#5-cli-命令行工具)
- [6. TUI 终端界面](#6-tui-终端界面)
- [7. REST API 完整参考](#7-rest-api-完整参考)
- [8. WebSocket 端点](#8-websocket-端点)
- [9. AI Agent 系统](#9-ai-agent-系统)
- [10. Skill 插件系统](#10-skill-插件系统)
- [11. RAG 知识库](#11-rag-知识库)
- [12. 代码引擎](#12-代码引擎)
- [13. 硬件功能](#13-硬件功能)
- [14. 数据捕获与管线](#14-数据捕获与管线)
- [15. 安全机制](#15-安全机制)
- [16. 编辑协议](#16-编辑协议)
- [17. 测试](#17-测试)
- [18. 架构参考](#18-架构参考)
- [19. 故障排查](#19-故障排查)
- [20. 附录](#20-附录)

---

## 1. 系统概览

### 1.1 定位

Emcoder 是一个面向嵌入式 MCU 开发的 **AI Sidecar 服务**。它以后端引擎的身份运行，可被 CLI、TUI、VSCode 扩展或任意 HTTP/WebSocket 客户端调用。

### 1.2 核心能力一览

| 能力 | 说明 |
|------|------|
| AI 对话 | 基于 Agent Loop（Think → Act → Observe → Repeat）的多轮推理，支持 27 种工具调用（19 内置 + 8 LLM 提供商） |
| 代码生成 | 生成符合 HAL/LL/ESP-IDF 规范的嵌入式 C 代码 |
| 知识检索 (RAG) | FAISS 向量索引 + 增量 RAG，内置 STM32/ESP32 知识库 |
| Skill 插件 | 可扩展的平台技能系统，自动发现、懒加载、关键词 + 语义匹配 |
| 工程管理 | 创建 / 构建 / 解析 CubeMX / ESP-IDF / Keil 工程 |
| 串口通信 | 端口枚举、监控、数据收发、WebSocket 透传 |
| 固件烧录 | 支持 STM32 (st-flash / STM32CubeProgrammer) 和 ESP32 (esptool) |
| 硬件调试 | OpenOCD 调试会话，内存/寄存器读写，GDB 命令 |
| QEMU 仿真 | 无硬件情况下运行固件仿真，支持执行/内存/中断追踪 |
| 静态分析 | MISRA C 子集检查、安全审计、圈复杂度度量 |
| 约束检查 | 引脚冲突检测、电气规格验证、资源限制检查 |
| 日志分析 | 嵌入式错误模式库 + 错误链追踪 + 根因分析 |
| 状态机分析 | 从 C 代码提取 FSM，检测死锁和不可达状态 |
| 编辑协议 | Agent 不直接写磁盘，生成 EditProposal 由前端审批 |
| 数据捕获 | 统一的硬件数据采集管线（过滤 + 采样 + AI 上下文格式化） |
| 遥测监控 | CPU/内存/构建/崩溃上报，WebSocket 仪表盘 |

### 1.3 支持的 MCU 平台

| 平台 | 芯片系列 | Skill ID |
|------|---------|----------|
| STM32 | F1, F4, F7, H7, L0, L4, G0, G4, U5 | \`stm32\` |
| ESP32 | ESP32, ESP32-S2, ESP32-S3, ESP32-C3, ESP32-C6, ESP32-H2 | \`esp32\` |

> Skill 系统可扩展——添加新平台只需在 \`app/skills/embedded/\` 下新建目录，无需改动主框架。

### 1.4 支持的 LLM 提供商

| 提供商 | 默认模型 | API 兼容协议 | 默认端点 |
|--------|---------|-------------|---------|
| Qwen (通义千问) | qwen-max | OpenAI 兼容 | \`dashscope.aliyuncs.com/compatible-mode/v1\` |
| DeepSeek | deepseek-coder | OpenAI 兼容 | \`api.deepseek.com/v1\` |
| OpenAI | gpt-4-turbo-preview | 原生 | \`api.openai.com/v1\` |
| Groq | llama2-70b-4096 | OpenAI 兼容 | \`api.groq.com/openai/v1\` |
| Ollama (本地) | codellama | OpenAI 兼容 | \`localhost:11434/v1\` |
| Anthropic | claude-3 | 原生 | — |

### 1.5 三种交互方式

| 方式 | 适用场景 | 启动命令 |
|------|---------|---------|
| CLI (Click) | 脚本化、CI/CD、快速命令 | \`python -m cli <command>\` |
| TUI (Textual) | 终端交互、无 GUI 环境 | \`python -m cli tui\` |
| REST API + WebSocket | VSCode 扩展、Web 前端、第三方集成 | \`python run.py\` |

---

## 2. 安装与环境准备

### 2.1 系统要求

| 项目 | 要求 |
|------|------|
| Python | 3.10 或更高 |
| 操作系统 | Windows / macOS / Linux |
| 内存 | 建议 8 GB+（RAG 嵌入模型约需 500 MB） |
| 磁盘 | 约 2 GB（含 Python 包 + 模型缓存） |

### 2.2 安装步骤

\`\`\`powershell
# 1. 克隆仓库
git clone <repo-url>
cd EmcoderCLI

# 2. 创建虚拟环境
python -m venv .venv

# Windows 激活
.venv\\Scripts\\Activate.ps1

# Linux/macOS 激活
# source .venv/bin/activate

# 3. 安装依赖
cd backend
pip install -r requirements.txt
\`\`\`

> **提示**：首次运行时，sentence-transformers 嵌入模型（~500 MB）会自动下载。  
> 如果下载慢，可设置 Hugging Face 镜像：\`$env:HF_ENDPOINT = "https://hf-mirror.com"\`

### 2.3 核心依赖一览

| 分类 | 包 |
|------|-----|
| Web 框架 | fastapi ≥0.104, uvicorn[standard] ≥0.24, pydantic ≥2.5, pydantic-settings ≥2.1, python-multipart, python-dotenv |
| LLM/AI | langchain ≥0.1, langchain-community, openai ≥1.3, httpx ≥0.25, tiktoken ≥0.5 |
| RAG 向量检索 | faiss-cpu ≥1.7.4, sentence-transformers ≥2.2.2, numpy ≥1.24 |
| C 代码解析 | pycparser ≥2.21 |
| 日志 & 格式化 | structlog ≥23.2, rich ≥13.7 |
| 异步 | aiofiles ≥23.2, anyio ≥4.0 |
| 工具库 | tenacity ≥8.2, orjson ≥3.9, PyYAML ≥6.0.1, packaging ≥23.0 |
| 串口 | pyserial ≥3.5 |
| CLI/TUI | click ≥8.1, textual ≥0.85, aiohttp ≥3.9 |
| 系统监控 | psutil ≥5.9 |
| 测试 | pytest ≥7.4, pytest-asyncio ≥0.23, pytest-cov, black, ruff, mypy |

### 2.4 MCU 工具链（可选，按需安装）

根据目标平台安装对应外部工具：

| 工具 | 用途 | 下载地址 | 环境变量 |
|------|------|---------|---------|
| ARM GCC | STM32 交叉编译 | developer.arm.com | \`MCU_ARM_GCC_PATH\` |
| STM32CubeMX | 工程生成 | st.com | \`MCU_STM32CUBEMX_PATH\` |
| STM32CubeProgrammer | STM32 烧录 | st.com | \`MCU_STM32_PROGRAMMER_PATH\` |
| ESP-IDF | ESP32 开发框架 | docs.espressif.com | \`MCU_ESP_IDF_PATH\` |
| esptool | ESP32 烧录 | \`pip install esptool\` | \`MCU_ESPTOOL_PATH\` |
| OpenOCD | 调试服务器 | openocd.org | \`MCU_OPENOCD_PATH\` |
| QEMU (ARM) | 仿真 | qemu.org | — |

> **小贴士**：所有工具均为可选，未安装时相关功能会优雅降级。Skill 系统的 \`detect_cli()\` 可自动检测并报告安装状态。

---

## 3. 配置（完整参考）

### 3.1 配置文件

将 \`.env.example\`（如有）复制为 \`.env\` 并编辑：

\`\`\`powershell
cd backend
copy .env.example .env   # 或 cp .env.example .env
\`\`\`

配置系统基于 **Pydantic Settings**，支持：
- \`.env\` 文件自动加载
- 环境变量覆盖（优先级高于 \`.env\`）
- 嵌套分隔符 \`__\`（如 \`LLM__TEMPERATURE=0.5\`）
- 类型自动验证

### 3.2 完整配置项

#### 3.2.1 服务核心（顶层 Settings）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| \`APP_NAME\` | str | \`Emcoder\` | 应用名称 |
| \`VERSION\` | str | \`0.1.0\` | 版本号 |
| \`DEBUG\` | bool | \`false\` | 调试模式 |
| \`ENVIRONMENT\` | str | \`development\` | 运行环境：\`development\` / \`testing\` / \`production\` |
| \`HOST\` | str | \`127.0.0.1\` | 监听地址 |
| \`PORT\` | int | \`8002\` | 监听端口（范围 1024-65535） |
| \`LOG_LEVEL\` | str | \`INFO\` | 日志级别：\`DEBUG\` / \`INFO\` / \`WARNING\` / \`ERROR\` / \`CRITICAL\` |
| \`LOG_FORMAT\` | str | \`text\` | 日志格式：\`text\` / \`json\` |
| \`LOG_FILE\` | str | 无 | 日志文件路径（留空只输出控制台） |
| \`DATA_DIR\` | str | \`data\` | 数据存储根目录 |

#### 3.2.2 LLM 配置（\`LLM_\` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| \`LLM_PROVIDER\` | str | \`qwen\` | 提供商：\`openai\` / \`qwen\` / \`deepseek\` / \`anthropic\` / \`groq\` / \`ollama\` |
| \`LLM_API_KEY\` | str | 无 | API 密钥 |
| \`LLM_API_BASE\` | str | 自动（按 provider） | 自定义 API 端点 |
| \`LLM_MODEL_NAME\` | str | \`qwen-max\` | 主模型 |
| \`LLM_CODE_MODEL_NAME\` | str | 同主模型 | 代码生成专用模型 |
| \`LLM_TEMPERATURE\` | float | \`0.7\` | 生成温度（0.0 ~ 2.0） |
| \`LLM_MAX_TOKENS\` | int | \`4096\` | 最大输出 token 数（100 ~ 32000） |
| \`LLM_TIMEOUT\` | int | \`180\` | 请求超时（秒） |
| \`LLM_MAX_RETRIES\` | int | \`3\` | 失败重试次数 |
| \`LLM_FALLBACK_PROVIDER\` | str | 无 | 备选提供商 |
| \`LLM_FALLBACK_MODEL\` | str | 无 | 备选模型 |

**API Key 解析优先级**：

\`\`\`
LLM_API_KEY > DASHSCOPE_API_KEY > OPENAI_API_KEY > DEEPSEEK_API_KEY
\`\`\`

**各提供商专属配置示例**：

\`\`\`dotenv
# ── Qwen (通义千问) ──
DASHSCOPE_API_KEY=sk-xxx
LLM_PROVIDER=qwen
LLM_MODEL_NAME=qwen-plus

# ── DeepSeek ──
DEEPSEEK_API_KEY=sk-xxx
LLM_PROVIDER=deepseek
LLM_MODEL_NAME=deepseek-coder

# ── OpenAI ──
OPENAI_API_KEY=sk-xxx
LLM_PROVIDER=openai
LLM_MODEL_NAME=gpt-4-turbo-preview

# ── Groq ──
LLM_API_KEY=gsk_xxx
LLM_PROVIDER=groq
LLM_MODEL_NAME=llama2-70b-4096

# ── Ollama (本地, 无需 API Key) ──
LLM_PROVIDER=ollama
LLM_MODEL_NAME=codellama
LLM_API_BASE=http://localhost:11434/v1

# ── Anthropic ──
LLM_API_KEY=sk-ant-xxx
LLM_PROVIDER=anthropic
LLM_MODEL_NAME=claude-3
\`\`\`

#### 3.2.3 RAG 知识库（\`RAG_\` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| \`RAG_VECTOR_STORE\` | str | \`faiss\` | 向量存储引擎：\`faiss\` / \`chroma\` |
| \`RAG_INDEX_PATH\` | str | \`data/rag_index\` | 索引文件路径 |
| \`RAG_EMBEDDING_MODEL\` | str | \`sentence-transformers/all-MiniLM-L6-v2\` | 嵌入模型 |
| \`RAG_EMBEDDING_DIMENSION\` | int | \`384\` | 嵌入向量维度 |
| \`RAG_DEFAULT_TOP_K\` | int | \`5\` | 默认检索返回条数 |
| \`RAG_SIMILARITY_THRESHOLD\` | float | \`0.5\` | 相似度阈值（0.0 ~ 1.0） |
| \`RAG_KNOWLEDGE_BASE_PATH\` | str | \`data/knowledge_base\` | 知识库文档目录 |

#### 3.2.4 Skill 系统（\`SKILL_\` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| \`SKILL_EXTRA_SKILL_DIRS\` | list | \`[]\` | 额外 Skill 目录（JSON 数组格式） |
| \`SKILL_USER_CONFIG_PATH\` | str | \`~/.emcoder/config.json\` | 用户 Skill 配置覆盖文件 |
| \`SKILL_ENABLE_SEMANTIC_MATCH\` | bool | \`false\` | 启用语义匹配（需 sentence-transformers） |

#### 3.2.5 工程管理（\`PROJECT_\` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| \`PROJECT_WORKSPACE_PATH\` | str | \`workspace\` | 工程工作区根目录 |
| \`PROJECT_TEMPLATE_PATH\` | str | \`data/templates\` | 工程模板目录 |
| \`PROJECT_DEFAULT_PLATFORM\` | str | \`stm32\` | 默认目标平台 |
| \`PROJECT_AUTO_BUILD\` | bool | \`false\` | 代码生成后自动编译 |

#### 3.2.6 Agent 引擎（\`AGENT_\` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| \`AGENT_MAX_ROUNDS\` | int | \`20\` | 单次对话最大循环轮次（1 ~ 100） |
| \`AGENT_MAX_CONSECUTIVE_ERRORS\` | int | \`3\` | 连续错误上限，超过则中止（1 ~ 20） |
| \`AGENT_LOOP_TIMEOUT\` | int | \`300\` | 总超时秒数（30 ~ 3600） |
| \`AGENT_MAX_CONCURRENT\` | int | \`5\` | 最大并发 Agent 数（1 ~ 50） |

#### 3.2.7 安全配置（\`SECURITY_\` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| \`SECURITY_ENABLE_FUSE_PROTECTION\` | bool | \`true\` | 保护芯片 fuse 区域 |
| \`SECURITY_ENABLE_FLASH_LIMIT\` | bool | \`true\` | 限制烧录频率 |
| \`SECURITY_REQUIRE_CONFIRMATION\` | bool | \`true\` | 高危操作前需用户确认 |
| \`SECURITY_ENABLE_CODE_REVIEW\` | bool | \`true\` | 启用代码安全审查 |
| \`SECURITY_PROTECTED_REGIONS\` | list | \`["MX_", "SystemClock_Config", "Error_Handler"]\` | 受保护的代码区域前缀 |
| \`SECURITY_ALLOWED_ORIGINS\` | list | \`["http://localhost:*", "http://127.0.0.1:*", "vscode-webview://*"]\` | CORS 白名单 |

#### 3.2.8 MCU 工具链（\`MCU_\` 前缀）——已弃用

> **注意**：此配置组已弃用，平台工具链路径已迁移到 Skill 系统。新代码请通过 \`skill_manager.get_skill(platform).handler.detect_cli()\` 获取工具信息。现有消费者在迁移完成前仍可使用。

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| \`MCU_STM32CUBEMX_PATH\` | 无 | STM32CubeMX 路径 |
| \`MCU_STM32_PROGRAMMER_PATH\` | 无 | STM32CubeProgrammer CLI 路径 |
| \`MCU_ARM_GCC_PATH\` | 无 | ARM GCC bin 目录 |
| \`MCU_ESP_IDF_PATH\` | 无 | ESP-IDF 安装路径 |
| \`MCU_ESPTOOL_PATH\` | \`esptool.py\` | esptool 路径 |
| \`MCU_OPENOCD_PATH\` | 无 | OpenOCD 路径 |

### 3.3 完整 \`.env\` 示例

\`\`\`dotenv
# ─── 服务核心 ───
HOST=127.0.0.1
PORT=8000
DEBUG=false
ENVIRONMENT=development
LOG_LEVEL=INFO
LOG_FORMAT=text

# ─── LLM ───
LLM_PROVIDER=qwen
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LLM_MODEL_NAME=qwen-plus
LLM_TEMPERATURE=0.7
LLM_MAX_TOKENS=4096
LLM_TIMEOUT=180

# ─── RAG ───
RAG_VECTOR_STORE=faiss
RAG_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
RAG_DEFAULT_TOP_K=5

# ─── Skill ───
SKILL_ENABLE_SEMANTIC_MATCH=false

# ─── 工程 ───
PROJECT_DEFAULT_PLATFORM=stm32
PROJECT_AUTO_BUILD=false

# ─── Agent ───
AGENT_MAX_ROUNDS=20
AGENT_LOOP_TIMEOUT=300

# ─── 安全 ───
SECURITY_REQUIRE_CONFIRMATION=true
SECURITY_ENABLE_FUSE_PROTECTION=true
\`\`\`

---

## 4. 启动后端服务

### 4.1 方式一：Python 直接启动

\`\`\`powershell
cd backend
python run.py
\`\`\`

默认在 \`http://127.0.0.1:8000\` 启动，终端打印 Banner：

\`\`\`
===========================================================
     EMCODER - Embedded MCU Intelligent Development Sidecar v2.0.0
===========================================================
 -> Starting Emcoder Sidecar Engine...
\`\`\`

#### 全部启动参数

| 参数 | 类型/可选值 | 默认值 | 说明 |
|------|-----------|--------|------|
| \`--mode\` | \`http\` / \`stdio\` / \`pipe\` | \`http\` | 启动模式 |
| \`--host\` | str | \`127.0.0.1\` | 监听地址 |
| \`--port\` | int | \`8000\` | 监听端口（\`0\` = 自动分配） |
| \`--reload\` | flag | \`false\` | 热重载（仅 http 开发模式） |
| \`--workers\` | int | \`1\` | 工作进程数（仅 http） |
| \`--log-level\` | \`debug\`/\`info\`/\`warning\`/\`error\` | \`info\` | 日志级别 |
| \`--env\` | str | 无 | 指定 \`.env\` 文件路径 |
| \`--workspace\` | str | 无 | 设置 VSCode 工作区路径 |

#### 常用启动示例

\`\`\`powershell
# 指定端口
python run.py --port 9000

# 自动分配空闲端口
python run.py --port 0

# 开发热重载模式
python run.py --reload

# 指定日志级别
python run.py --log-level debug

# 指定 .env 文件
python run.py --env /path/to/.env

# 指定工作区
python run.py --workspace /path/to/project

# Sidecar 模式 (VSCode 扩展使用)
python run.py --mode stdio
\`\`\`

#### 启动模式说明

| 模式 | 命令 | 行为 |
|------|------|------|
| **http** | \`python run.py\` | 标准开发模式，启动 HTTP 服务，打印 Banner，浏览器可访问 Swagger UI |
| **stdio** | \`python run.py --mode stdio\` | 管道模式：日志走 stderr，stdout 保留给 IPC；固定 workers=1；VSCode Sidecar 使用 |
| **pipe** | \`python run.py --mode pipe\` | 命名管道模式：类似 stdio；固定 workers=1 |

### 4.2 方式二：PowerShell 脚本启动

\`\`\`powershell
cd backend
.\\start_server.ps1
# 或指定模式和端口
.\\start_server.ps1 http 9000
\`\`\`

该脚本自动：
1. 检查 \`DASHSCOPE_API_KEY\` 环境变量，不存在则从 \`.env\` 加载
2. 设置 \`EMCODER_SIDECAR_MODE\` 和 \`EMCODER_PORT\` 环境变量
3. 按优先级查找 Python：\`D:\\Python312\` → \`D:\\Python311\` → \`python\` → \`python3\` → \`py\`
4. 检查 fastapi/uvicorn 是否安装，缺失则自动 \`pip install -r requirements.txt\`
5. 启动服务

### 4.3 验证服务状态

\`\`\`powershell
# 浏览器访问 API 文档
start http://127.0.0.1:8000/docs       # Swagger UI
start http://127.0.0.1:8000/redoc      # ReDoc

# 健康检查
curl http://127.0.0.1:8000/health

# 系统状态
curl http://127.0.0.1:8000/api/v1/system/status
\`\`\`

### 4.4 握手魔数（Sidecar 模式）

stdio/pipe 模式下，后端就绪后会向 stdout 输出一行握手 JSON：

\`\`\`
EMCODER_READY:{"status":"ready","port":8000,"pid":1234,"mode":"stdio","version":"2.0.0","protocol":"jsonrpc-2.0"}
\`\`\`

VSCode 扩展通过检测 \`EMCODER_READY:\` 前缀确认后端已启动。

### 4.5 生命周期管理

后端使用 \`LifecycleManager\` 管理进程生命周期：

| 状态 | 含义 |
|------|------|
| \`created\` | 初始化完成 |
| \`starting\` | 正在启动各服务 |
| \`ready\` | 全部就绪，可接受请求 |
| \`stopping\` | 正在关闭 |
| \`stopped\` | 已停止 |

启动顺序：LifecycleManager.startup() → RAG 初始化 → LLM 初始化 → CLI 初始化 → Project 初始化 → mark_ready()

关闭时：执行所有注册的 shutdown hooks（包括 RAG 索引保存）→ 终结子进程。

---

## 5. CLI 命令行工具

### 5.1 基本用法

\`\`\`powershell
cd backend
python -m cli [OPTIONS] COMMAND [ARGS]
\`\`\`

> 无子命令时默认启动 TUI。

### 5.2 全局选项

| 选项 | 简写 | 默认值 | 说明 |
|------|------|--------|------|
| \`--backend\` | \`-b\` | \`http://127.0.0.1:8000\` | 后端服务地址 |
| \`--verbose\` | \`-v\` | false | 详细输出 |
| \`--help\` | | | 显示帮助信息 |

### 5.3 命令树总览

\`\`\`
emcoder
├── chat             AI 交互式聊天
├── tui              TUI 终端界面 (默认)
├── serial           串口操作
│   ├── list           列出可用串口
│   ├── monitor        监控串口数据
│   └── send           发送数据
├── flash            烧录操作
│   ├── write          写入固件
│   └── erase          擦除 Flash
├── debug            调试 (OpenOCD)
│   └── start          启动调试服务器
├── simulate         仿真 (QEMU)
│   └── start          启动仿真
└── status           系统状态
\`\`\`

### 5.4 chat — AI 聊天

\`\`\`powershell
# 交互模式 (REPL)
python -m cli chat

# 单条消息模式
python -m cli chat -m "帮我写一个 STM32F407 的 UART 初始化代码"
\`\`\`

| 参数 | 说明 |
|------|------|
| \`--message\` / \`-m\` | 可选。指定消息后直接执行，不进入交互模式 |

**交互模式操作**：
- 输入文本后回车 → 与 AI 对话
- 输入 \`/quit\` 或 \`/exit\` → 退出

**SSE 事件流处理**：CLI 自动处理以下事件类型：

| 事件类型 | 显示行为 |
|---------|---------|
| \`token\` | 实时流式输出 AI 回复文本 |
| \`thinking\` | 显示思考过程 |
| \`tool_call\` / \`tool_call_start\` | 显示工具调用信息 |
| \`tool_call_end\` | 显示工具执行结果 |
| \`confirm_required\` | 交互式确认提示 |
| \`error\` | 显示错误信息 |
| \`done\` | 结束本轮对话 |

### 5.5 tui — 终端图形界面

\`\`\`powershell
python -m cli tui
# 或直接运行 (无子命令默认启动 TUI)
python -m cli
\`\`\`

详见 [第 6 节 TUI 终端界面](#6-tui-终端界面)。

### 5.6 serial — 串口操作

#### 列出可用串口

\`\`\`powershell
python -m cli serial list
\`\`\`

输出示例：
\`\`\`
  COM4: USB Serial Device [USB\\VID_0483&PID_5740]
  COM3: Bluetooth Serial (COM3) [BTHENUM\\...]
\`\`\`

#### 监控串口

\`\`\`powershell
python -m cli serial monitor COM4
python -m cli serial monitor COM4 --baud 9600
python -m cli serial monitor COM4 --baud 115200 --encoding utf-8
\`\`\`

| 参数 | 默认值 | 说明 |
|------|--------|------|
| \`PORT\`（位置参数） | 必填 | 串口名（如 \`COM4\`、\`/dev/ttyUSB0\`） |
| \`--baud\` / \`-b\` | \`115200\` | 波特率 |
| \`--encoding\` / \`-e\` | \`utf-8\` | 字符编码 |

按 \`Ctrl+C\` 停止监控。

#### 发送数据

\`\`\`powershell
python -m cli serial send COM4 "AT\\r\\n"
python -m cli serial send COM4 "Hello" --baud 9600
\`\`\`

| 参数 | 默认值 | 说明 |
|------|--------|------|
| \`PORT\`（位置参数） | 必填 | 串口名 |
| \`DATA\`（位置参数） | 必填 | 发送内容 |
| \`--baud\` / \`-b\` | \`115200\` | 波特率 |

### 5.7 flash — 固件烧录

#### 写入固件

\`\`\`powershell
# STM32 烧录
python -m cli flash write firmware.bin
python -m cli flash write firmware.hex --platform stm32 --address 0x08000000

# ESP32 烧录
python -m cli flash write firmware.bin --platform esp32 --port COM4 --address 0x10000
\`\`\`

| 参数 | 默认值 | 说明 |
|------|--------|------|
| \`FIRMWARE\`（位置参数） | 必填 | 固件文件路径 |
| \`--platform\` / \`-p\` | \`stm32\` | 目标平台：\`stm32\` / \`esp32\` |
| \`--port\` | 无 | 串口（ESP32 必填） |
| \`--address\` / \`-a\` | 自动 | 烧录地址（STM32: \`0x08000000\`，ESP32: \`0x10000\`） |

#### 擦除 Flash

\`\`\`powershell
python -m cli flash erase
python -m cli flash erase --platform esp32 --port COM4
\`\`\`

### 5.8 debug — OpenOCD 调试

\`\`\`powershell
python -m cli debug start
python -m cli debug start --interface interface/stlink.cfg --target target/stm32f4x.cfg
\`\`\`

| 参数 | 默认值 | 说明 |
|------|--------|------|
| \`--interface\` / \`-i\` | \`interface/stlink.cfg\` | OpenOCD interface 配置文件 |
| \`--target\` / \`-t\` | \`target/stm32f4x.cfg\` | OpenOCD target 配置文件 |

启动后 OpenOCD 持续运行，按 \`Ctrl+C\` 停止。

### 5.9 simulate — QEMU 仿真

\`\`\`powershell
python -m cli simulate start firmware.elf
python -m cli simulate start firmware.elf --machine stm32f4-discovery --gdb-port 3333
\`\`\`

| 参数 | 默认值 | 说明 |
|------|--------|------|
| \`FIRMWARE\`（位置参数） | 必填 | ELF 固件文件 |
| \`--machine\` / \`-m\` | \`stm32f4-discovery\` | QEMU 机器类型 |
| \`--gdb-port\` | \`3333\` | GDB 调试端口 |

### 5.10 status — 系统状态

\`\`\`powershell
python -m cli status
\`\`\`

输出示例：
\`\`\`
Backend: Connected (http://127.0.0.1:8000)
Serial Ports: 2 found
  COM4: USB Serial Device
  COM3: Bluetooth Serial
\`\`\`

---

## 6. TUI 终端界面

### 6.1 启动

\`\`\`powershell
cd backend
python -m cli tui

# 指定后端地址
python -m cli -b http://127.0.0.1:9000 tui
\`\`\`

### 6.2 界面布局

\`\`\`
+---------------------------------------------+
|  Emcoder CLI               Embedded AI Asst  |
+---------------------------------------------+
|  TOOLS: [+] Backend OK                       |
+----------+----------------------------------+
| Tool     | [System] 19:20:01                |
| Status   | Welcome to Emcoder CLI           |
|          | Type a message to start chatting.|
| Serial:--| Ctrl+Q quit  |  F1 help         |
| Flash: --|                                   |
| Debug: --| [You] 19:20:15                   |
| QEMU:  --|  帮我初始化 UART                   |
|          |                                   |
| Session: | [Emcoder] 19:20:18               |
|   --     |  以下是 STM32F407 UART 初始化...    |
|          |                                   |
+----------+----------------------------------+
|  > Type a message...            [Send]       |
+---------------------------------------------+
|  Ctrl+Q Quit | Ctrl+L Clear | F1 Help        |
+---------------------------------------------+
\`\`\`

**组件说明**：

| 组件 | 类名 | 说明 |
|------|------|------|
| 消息气泡 | \`ChatMessageWidget\` | 单条消息，按角色显示不同样式 |
| 消息列表 | \`ChatView\` | 滚动消息容器，自动滚动到底部 |
| 输入框 | \`ChatInput\` | 文本输入 + 发送按钮 |
| 工具栏 | \`ToolStatusBar\` | 顶部工具状态栏 |
| 风险对话框 | \`RiskConfirmDialog\` | 高危操作确认弹窗 |

### 6.3 快捷键

| 快捷键 | 功能 |
|--------|------|
| \`Ctrl+Q\` | 退出应用 |
| \`Ctrl+L\` | 清空聊天记录 |
| \`Ctrl+S\` | 切换侧栏显示/隐藏 |
| \`Ctrl+D\` | 切换日志面板 |
| \`F1\` | 显示帮助信息 |
| \`Enter\` | 发送消息 |

### 6.4 聊天斜杠命令

在输入框输入以 \`/\` 开头的命令：

| 命令 | 说明 |
|------|------|
| \`/help\` | 显示可用命令列表 |
| \`/clear\` | 清空聊天记录 |
| \`/status\` | 显示后端连接状态和会话信息 |
| \`/connect\` | 重新连接后端 |
| \`/quit\` | 退出 |

### 6.5 消息角色与样式

| 角色标签 | 图标 | 说明 | 视觉特征 |
|---------|------|------|---------|
| \`[You]\` | \`>\` | 用户消息 | 蓝色左边框，右缩进 |
| \`[Emcoder]\` | \`<\` | AI 回复 | 灰蓝左边框，左缩进 |
| \`[System]\` | \`[*]\` | 系统消息 | 灰色左边框 |
| \`[Tool]\` | \`/-\` | 工具调用 | 橙色左边框 |

### 6.6 侧栏状态指示

侧边栏实时显示各硬件工具的连接状态：

| 状态项 | ID | 说明 |
|--------|-----|------|
| Serial | \`status-serial\` | 串口连接状态 |
| Flash | \`status-flash\` | 烧录状态 |
| Debug | \`status-debug\` | 调试状态 |
| QEMU | \`status-qemu\` | 仿真状态 |
| Session | \`session-info\` | 当前会话 ID |

工具状态颜色：

| 状态 | 颜色 |
|------|------|
| connected | 绿色 |
| disconnected | 红色 |
| running | 绿色 |
| stopped | 灰色 |
| error | 红色 |
| flashing | 黄色 |
| debugging | 青色 |
| simulating | 品红 |

### 6.7 风险确认对话框

当 AI Agent 执行高风险操作（如烧录固件、执行终端命令）时，TUI 弹出确认对话框。必须点击 **Confirm** 或 **Cancel** 后才能继续。

### 6.8 TUI Client 连接

TUI 使用 \`AgentClient\` 通过 SSE（Server-Sent Events）与后端 Agent 通信：

| 配置 | 默认值 |
|------|--------|
| 后端地址 | \`http://127.0.0.1:8000\` |
| 普通请求超时 | 30 秒 |
| SSE 流超时 | 600 秒 |
| API 端点 | \`POST /api/v1/agent/chat/stream\` |

连接状态：\`disconnected\` → \`connecting\` → \`connected\` / \`error\`

### 6.9 TUI 主题色板

| 名称 | 色值 | 用途 |
|------|------|------|
| bg_primary | \`#181b20\` | 主背景 |
| bg_secondary | \`#1e2228\` | 次背景 |
| bg_panel | \`#252a31\` | 面板 |
| accent | \`#5b8def\` | 主强调（低饱和蓝） |
| accent_dim | \`#3d5a80\` | 弱强调 |
| text_primary | \`#d4d4d4\` | 主文字 |
| text_secondary | \`#8b8b8b\` | 次文字 |
| success | \`#4caf7c\` | 柔绿 |
| warning | \`#d4a054\` | 柔橙 |
| error | \`#cf6679\` | 柔红 |
| border | \`#2e333a\` | 边框 |

> 设计风格：极简商务科技感，严禁 emoji，纯 ASCII 图标。

---

## 7. REST API 完整参考

所有 API 端点前缀为 \`/api/v1\`。交互式文档：\`http://127.0.0.1:8000/docs\`（Swagger）或 \`/redoc\`（ReDoc）。

### 7.1 系统与健康

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | \`/health\` | 全局健康检查（顶层路由） |
| GET | \`/\` | 根路径信息 |
| GET | \`/api/v1/health\` | 综合系统健康 |
| GET | \`/api/v1/health/{component}\` | 单组件健康检查 |
| GET | \`/api/v1/system/status\` | 系统引擎状态 |
| GET | \`/api/v1/system/bus/status\` | WebSocket 事件总线状态 |
| GET | \`/api/v1/system/update/check\` | 检查更新（参数：\`client_version\`） |
| GET | \`/api/v1/metrics\` | 系统度量（CPU / 内存 / 磁盘） |
| GET | \`/api/v1/metrics/prometheus\` | Prometheus 格式度量 |

### 7.2 Agent — AI 对话

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/agent/chat\` | 非流式聊天 |
| POST | \`/api/v1/agent/chat/stream\` | SSE 流式聊天 |
| POST | \`/api/v1/agent/chat/stream/v2\` | SSE 流式聊天 (v2) |
| POST | \`/api/v1/agent/confirm\` | 确认 / 拒绝敏感操作 |
| GET | \`/api/v1/agent/confirm/pending\` | 待处理确认列表 |
| GET | \`/api/v1/agent/tools\` | 可用工具列表 |
| POST | \`/api/v1/agent/workspace\` | 设置工作区路径 |
| GET | \`/api/v1/agent/cache/stats\` | 知识缓存统计 |
| POST | \`/api/v1/agent/cache/clear\` | 清空知识缓存 |
| POST | \`/api/v1/agent/fix_terminal_error\` | 编译错误智能修复 |
| WS | \`/api/v1/agent/code_completion\` | 代码补全 WebSocket |

#### 聊天请求体

\`\`\`json
{
  "message": "帮我写一个 STM32 UART 初始化",
  "session_id": "sess_xxxx",       // 可选，留空自动生成
  "workspace_path": "/path/to/dir", // 可选
  "platform": "stm32",             // 可选，留空读配置默认值
  "context": "额外上下文信息"        // 可选
}
\`\`\`

#### SSE 事件流格式

\`\`\`
data: {"type": "session", "session_id": "sess_xxx"}

data: {"type": "thinking", "content": "第 1 轮推理 — 分析用户意图..."}

data: {"type": "tool_call", "tool": "search_knowledge", "args": {"query": "UART init"}}

data: {"type": "tool_call_end", "tool": "search_knowledge", "result": "..."}

data: {"type": "token", "content": "以下是"}

data: {"type": "text_done", "content": "完整回复内容..."}

data: {"type": "edit", "proposal": {"proposal_id": "xxx", "edits": [...]}}

data: {"type": "confirmation_required", "message": "即将执行 flash_firmware..."}

data: {"type": "done"}
\`\`\`

### 7.3 编辑协议

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | \`/api/v1/agent/edit/pending\` | 查询待确认编辑 |
| GET | \`/api/v1/agent/edit/{proposal_id}\` | 获取编辑详情 |
| POST | \`/api/v1/agent/edit/apply\` | 接受编辑提议 |
| POST | \`/api/v1/agent/edit/reject\` | 拒绝编辑提议 |

### 7.4 会话管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | \`/api/v1/agent/sessions\` | 列出 Agent 会话 |
| GET | \`/api/v1/agent/sessions/{id}\` | 获取会话历史 |
| DELETE | \`/api/v1/agent/sessions/{id}\` | 删除会话 |
| GET | \`/api/v1/session/\` | 列出所有会话 |
| POST | \`/api/v1/session/\` | 创建新会话 |
| GET | \`/api/v1/session/{id}\` | 获取会话详情 |
| DELETE | \`/api/v1/session/{id}\` | 删除会话 |
| POST | \`/api/v1/session/{id}/restore\` | 恢复已删除会话 |

### 7.5 对话（简单模式）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/chat/send\` | 发送消息（非 Agent 模式） |
| GET | \`/api/v1/chat/health\` | 对话服务健康 |
| WS | \`/api/v1/chat/ws\` | 聊天 WebSocket |

### 7.6 代码生成与分析

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/code/generate\` | AI 代码生成 |
| POST | \`/api/v1/code/fuse\` | 代码融合（保护 CubeMX 区域） |
| POST | \`/api/v1/code/analyze\` | 代码结构分析 |
| POST | \`/api/v1/code/patch\` | 生成 / 应用补丁 |
| POST | \`/api/v1/code/validate\` | 代码质量验证 |
| POST | \`/api/v1/code/format\` | 代码格式化 |
| POST | \`/api/v1/completion\` | GhostText 行内补全 |

### 7.7 AI 智能分析

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/fusion\` | 代码融合 |
| POST | \`/api/v1/constraint-check\` | 硬件约束检查 |
| POST | \`/api/v1/static-analyze\` | C 代码静态分析 |
| POST | \`/api/v1/log-analyze\` | 嵌入式日志分析 |
| POST | \`/api/v1/fsm-analyze\` | 状态机分析 |
| POST | \`/api/v1/smart-correct\` | 智能纠错 |
| POST | \`/api/v1/explain\` | 代码解释 |
| POST | \`/api/v1/agent/analyze\` | AI 综合分析 |

### 7.8 工程管理

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/project/create\` | 创建工程 |
| GET | \`/api/v1/project/list\` | 工程列表 |
| GET | \`/api/v1/project/{path}/info\` | 工程信息 |
| POST | \`/api/v1/project/{path}/build\` | 构建工程 |
| POST | \`/api/v1/project/{path}/config\` | 更新工程配置 |
| DELETE | \`/api/v1/project/{path}\` | 删除工程 |
| GET | \`/api/v1/project/{path}/files\` | 工程文件列表 |
| GET | \`/api/v1/project/{path}/file\` | 读取文件内容 |
| POST | \`/api/v1/project/{path}/file\` | 写入文件 |
| DELETE | \`/api/v1/project/{path}/file\` | 删除文件 |
| POST | \`/api/v1/project/{path}/folder\` | 创建文件夹 |
| POST | \`/api/v1/project/build\` | 统一构建端点 |
| GET | \`/api/v1/project/info\` | 工程信息 (GET) |
| POST | \`/api/v1/project/info\` | 工程信息 (POST) |
| POST | \`/api/v1/project/parse\` | 解析工程结构 |

### 7.9 RAG 知识库

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/rag/search\` | 语义搜索 |
| POST | \`/api/v1/rag/add\` | 添加单个文档 |
| POST | \`/api/v1/rag/add-batch\` | 批量添加 |
| POST | \`/api/v1/rag/upload\` | 上传文档文件 |
| GET | \`/api/v1/rag/stats\` | 索引统计信息 |
| POST | \`/api/v1/rag/save\` | 保存索引到磁盘 |
| POST | \`/api/v1/rag/load\` | 从磁盘加载索引 |
| DELETE | \`/api/v1/rag/clear\` | 清空索引 |

#### 搜索请求体

\`\`\`json
{
  "query": "STM32 UART DMA 发送",
  "platform": "stm32",    // 可选，按平台过滤
  "top_k": 5              // 返回条数
}
\`\`\`

### 7.10 硬件

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | \`/api/v1/hardware/status\` | 硬件整体状态 |
| GET | \`/api/v1/hardware/toolchains\` | 工具链安装状态 |
| GET | \`/api/v1/hardware/detect\` | 检测连接的硬件设备 |
| POST | \`/api/v1/hardware/reset/{port}\` | 复位指定端口设备 |
| GET | \`/api/v1/hardware/info/{port}\` | 设备详细信息 |
| GET | \`/api/v1/hardware/chips\` | 支持的芯片列表 |
| GET | \`/api/v1/hardware/chip-info\` | 芯片详情（参数：\`chip\`） |
| GET | \`/api/v1/hardware/pin-info\` | 引脚复用信息（参数：\`chip\`, \`pin\`） |
| GET | \`/api/v1/hardware/register-info\` | 外设寄存器信息 |
| GET | \`/api/v1/hardware/peripheral-map\` | 外设地址映射 |
| GET | \`/api/v1/hardware/clock-tree\` | 时钟树配置 |
| GET | \`/api/v1/hardware/pinout/{chip_model}\` | 引脚复用完整数据 |
| POST | \`/api/v1/hardware/validate_pinout\` | 引脚冲突检测 |

### 7.11 串口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | \`/api/v1/serial/ports\` | 列出所有串口 |
| POST | \`/api/v1/serial/connect\` | 连接串口 |
| POST | \`/api/v1/serial/disconnect/{session_id}\` | 断开指定会话 |
| POST | \`/api/v1/serial/disconnect\` | 断开当前连接 |
| POST | \`/api/v1/serial/send/{session_id}\` | 发送数据 |
| POST | \`/api/v1/serial/send\` | 发送数据（默认会话） |
| GET | \`/api/v1/serial/read/{session_id}\` | 读取数据 |
| WS | \`/api/v1/serial/tunnel/{session_id}\` | WebSocket 双向透传 |
| GET | \`/api/v1/serial/ws/sessions\` | WS 会话列表 |

#### 连接请求体

\`\`\`json
{
  "port": "COM4",
  "baudrate": 115200,
  "databits": 8,
  "stopbits": 1,
  "parity": "none"
}
\`\`\`

### 7.12 烧录

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/flash/\` | 烧录固件 |
| POST | \`/api/v1/flash/execute\` | 执行烧录（扩展接口） |
| GET | \`/api/v1/flash/progress/{task_id}\` | 烧录进度查询 |
| POST | \`/api/v1/flash/verify\` | 验证固件 |
| POST | \`/api/v1/flash/erase\` | 擦除 Flash |
| GET | \`/api/v1/flash/detect-firmware\` | 检测固件文件 (GET) |
| POST | \`/api/v1/flash/detect-firmware\` | 检测固件文件 (POST) |
| POST | \`/api/v1/flash/safety-check\` | 安全检查 |
| POST | \`/api/v1/flash/reset\` | 复位 MCU |

### 7.13 调试

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | \`/api/v1/debug/config\` | 生成调试配置 |
| GET | \`/api/v1/debug/supported_chips\` | 支持的调试芯片 |
| GET | \`/api/v1/debug/probe\` | 检测调试探针 |
| GET | \`/api/v1/debug/adapters\` | 调试适配器列表 |
| GET | \`/api/v1/debug/probes\` | 扫描所有探针 |
| POST | \`/api/v1/debug/start\` | 启动调试会话 |
| POST | \`/api/v1/debug/stop\` | 停止调试会话 |
| POST | \`/api/v1/debug/memory/read\` | 读取内存 |
| POST | \`/api/v1/debug/memory/write\` | 写入内存 |
| POST | \`/api/v1/debug/registers\` | 读取寄存器 |
| POST | \`/api/v1/debug/peripheral/{name}\` | 读取外设寄存器 |
| POST | \`/api/v1/debug/evaluate\` | GDB 表达式求值 |
| POST | \`/api/v1/debug/gdb\` | 原始 GDB 命令 |

### 7.14 构建

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/build/run\` | 执行构建 |
| GET | \`/api/v1/build/status\` | 构建状态 |
| GET | \`/api/v1/build/memory-usage\` | 固件内存用量 (GET) |
| POST | \`/api/v1/build/memory-usage\` | 固件内存用量 (POST) |

### 7.15 终端

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/terminal/execute\` | 安全执行终端命令 |
| GET | \`/api/v1/terminal/health\` | 终端服务状态 |

> 命令白名单：\`make\`, \`cmake\`, \`ninja\`, \`idf.py\`, \`arm-none-eabi-*\`, \`gcc\`, \`python\`, \`git\`, \`echo\`, \`mkdir\`, \`cp\`, \`mv\`, \`ls\`, \`cat\`, \`head\`, \`tail\`, \`wc\`, \`sort\`, \`diff\`, \`pwd\`, \`cd\`, \`openocd\`, \`esptool\`, \`st-flash\`, \`JLinkExe\` 等 55+ 命令。

### 7.16 日志

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | \`/api/v1/logs/\` | 获取日志（支持按 session / level / 分页） |
| GET | \`/api/v1/logs/serial/{session_id}\` | 串口会话日志 |
| GET | \`/api/v1/logs/build/{project_id}\` | 构建日志 |
| DELETE | \`/api/v1/logs/\` | 清除所有日志 |

### 7.17 遥测

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/telemetry/event\` | 通用事件上报 |
| POST | \`/api/v1/telemetry/build\` | 构建结果上报 |
| POST | \`/api/v1/telemetry/crash\` | 崩溃上报 |
| GET | \`/api/v1/telemetry/dashboard\` | 仪表盘数据 |
| GET | \`/api/v1/telemetry/builds/stats\` | 构建统计 |
| GET | \`/api/v1/telemetry/features/usage\` | 功能使用排行 |
| GET | \`/api/v1/telemetry/crashes/recent\` | 最近崩溃列表 |

### 7.18 配置热更新

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | \`/api/v1/config\` | 获取当前运行时配置 |
| PATCH | \`/api/v1/config\` | 运行时修改配置 |
| GET | \`/api/v1/cache/stats\` | 缓存统计 |
| POST | \`/api/v1/cache/clear\` | 清空缓存 |

### 7.19 工作流

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/workflow/execute\` | 执行工作流 |
| GET | \`/api/v1/workflow/status/{id}\` | 工作流状态 |
| GET | \`/api/v1/workflow/templates\` | 工作流模板列表 |

### 7.20 上下文同步

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/context/update\` | IDE 文件变更推送 |
| POST | \`/api/v1/context/query\` | 上下文语义检索 |

### 7.21 扩展管理

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | \`/api/v1/extensions/query\` | 查询可用扩展 |
| GET | \`/api/v1/extensions/allowed\` | 白名单扩展 |

预置白名单：\`ms-vscode.cpptools\`、\`ms-python.python\`、\`marus25.cortex-debug\`、\`ms-vscode.cmake-tools\`。

### 7.22 兼容路由（\`/api/\` 无 v1）

为兼容前端不同 URL 模式，以下模块的所有端点在 \`/api/\`（不含 \`/v1\`）前缀下也可访问：

- hardware / hardware_extended / pinout
- serial / serial_ws
- flash / flash_extended
- debug_config / debug_extended / debug_session
- build_status
- completion_context

例如：\`/api/hardware/status\`、\`/api/serial/ports\`、\`/api/flash/execute\` 等。

---

## 8. WebSocket 端点

| 路径 | 协议 | 说明 |
|------|------|------|
| \`/ws/{client_id}\` | JSON-RPC | 主通道：chat / ping / 频道订阅 |
| \`/ws/inline-ai\` | JSON | 内联 AI 补全（GhostText / Ctrl+K） |
| \`/ws/context\` | JSON | IDE 上下文同步（文件变更 → RAG 增量索引） |
| \`/ws/serial\` | JSON + Binary | 串口 WebSocket（兼容入口） |
| \`/ws/serial/{connection_id}\` | Binary | 串口双向二进制透传 |
| \`/ws/debug/{session_id}\` | JSON | 调试事件流 |
| \`/ws/dashboard\` | JSON | 仪表盘遥测推送（每 2 秒） |

### 8.1 主 WebSocket (\`/ws/{client_id}\`)

#### 消息格式

\`\`\`json
// 客户端 → 服务端
{"type": "ping"}
{"type": "chat", "messages": [{"role": "user", "content": "..."}]}

// 服务端 → 客户端
{"type": "pong"}
{"type": "chat_chunk", "content": "..."}
{"type": "chat_done", "content": "完整回复"}
{"type": "error", "message": "错误信息"}
\`\`\`

#### 频道订阅

\`\`\`json
// 订阅
{"method": "channel/subscribe", "params": {"channel": "agent/stream"}}

// 取消订阅
{"method": "channel/unsubscribe", "params": {"channel": "agent/stream"}}
\`\`\`

可用频道：

| 频道 | 用途 |
|------|------|
| \`dev/logs\` | 后端日志实时推送 |
| \`ide/context\` | IDE 文件变更通知 |
| \`agent/stream\` | AI Agent 生成流 |
| \`hardware/serial\` | 串口数据透传 |
| \`hardware/plot\` | 波形 / 图表数据 |
| \`debug/events\` | 调试事件（断点、异常等） |
| \`build/status\` | 编译状态变更 |

### 8.2 内联 AI (\`/ws/inline-ai\`)

\`\`\`json
// 请求
{"code": "void init_uart(", "cursor": 15, "intent": "complete", "file_uri": "main.c", "language": "c"}

// 响应（流式）
{"op": "ins", "text": "UART_HandleTypeDef *huart) {\\n"}
{"op": "ins", "text": "  // ..."}
{"op": "done"}
// 或错误
{"op": "error", "text": "LLM timeout"}
\`\`\`

### 8.3 IDE 上下文 (\`/ws/context\`)

支持的消息类型：

| type | 说明 |
|------|------|
| \`file-changes\` | 文件变更通知（新增 / 修改 / 删除） |
| \`context-query\` | 上下文语义查询 |
| \`textDocument/didChange\` | LSP 风格文件变更（触发增量 RAG） |
| \`textDocument/didOpen\` | 文件打开 |
| \`textDocument/didClose\` | 文件关闭 |
| \`workspace/didChangeWorkspaceFolders\` | 工作区变更 |
| \`ping\` | 心跳 |

### 8.4 调试 WebSocket (\`/ws/debug/{session_id}\`)

\`\`\`json
// 客户端发送 GDB 命令
{"command": "info breakpoints"}

// 服务端推送
{"type": "console", "content": "..."}
{"type": "halted", "data": {"pc": "0x08001234", "reason": "breakpoint"}}
{"type": "running"}
{"type": "swo", "data": "SWO trace data..."}
{"type": "pong"}
{"type": "error", "message": "..."}
\`\`\`

### 8.5 仪表盘 (\`/ws/dashboard\`)

\`\`\`json
// 服务端每 2 秒推送
{"type": "telemetry", "data": {"timestamp": "...", "cpu_percent": 15.2, "memory_used_mb": 512, ...}}

// 客户端
{"type": "ping"}
{"type": "subscribe"}
\`\`\`

### 8.6 心跳机制

- 服务端每 **1.5 秒** 发送 ping
- 客户端应回复 \`{"method": "heartbeat/pong"}\`
- 超时 **3 秒**无响应则断开连接并释放硬件资源

---

## 9. AI Agent 系统

### 9.1 Agent Loop 工作原理

Emcoder 的 AI 对话基于 **Agent Loop** 模式，类似自主决策循环：

\`\`\`
用户消息
   │
   ▼
┌─────────┐
│  Think   │ LLM 分析用户意图，决定下一步
└────┬────┘
     │
     ▼
┌─────────┐
│   Act    │ 选择并调用工具 (或直接文本回答)
└────┬────┘
     │
     ▼
┌─────────┐
│ Observe  │ 获取工具执行结果
└────┬────┘
     │
     ▼
┌─────────┐
│ Repeat?  │ 是否需要继续？(最多 20 轮)
└────┬────┘
     │
     ▼
最终回答 → 用户
\`\`\`

### 9.2 工具系统架构

工具按 **来源** 分为两大类，通过 \`ToolSource\` 枚举区分：

| 来源 | 说明 | 数量 |
|------|------|------|
| \`BUILTIN\` | 内置工具 — 本地执行，直接操作文件/硬件/工程 | 19 |
| \`LLM\` | LLM 提供商工具 — 委托远端 LLM 执行（搜索、代码执行等） | 8 |

工具定义位于 \`app/services/agent/tools/\` 包，按功能分模块：

\`\`\`
tools/
├── base.py              类型定义 (ToolDefinition, ToolParam, RiskLevel, ToolCategory, ToolSource)
├── registry.py          ToolRegistry 类 + tool_registry 单例
├── _helpers.py          共用工具函数
├── __init__.py          统一入口 + register_all_tools()
├── builtin/             内置工具 (10 个模块, 19 个工具)
│   ├── knowledge.py       知识检索 & 代码生成
│   ├── file_ops.py        文件读写编辑
│   ├── workspace.py       工作区扫描 & 搜索
│   ├── project.py         工程创建/构建/检测
│   ├── terminal.py        终端命令
│   ├── hardware.py        烧录 & 外设
│   ├── serial.py          串口监控 & 日志
│   ├── debug.py           硬件检测 & 调试控制
│   ├── emulation.py       QEMU 仿真控制
│   └── interaction.py     用户确认
└── llm/                 LLM 提供商工具 (4 个模块, 8 个工具)
    ├── openai.py          搜索 / 文件搜索 / 代码执行 / 图像生成
    ├── qwen.py            知识库检索 / 联网搜索
    ├── deepseek.py        联网搜索
    └── anthropic.py       电脑操作
\`\`\`

### 9.3 内置工具（19 个）

| 工具名 | 模块 | 类别 | 风险级别 | 说明 |
|--------|------|------|---------|------|
| \`search_knowledge\` | knowledge | KNOWLEDGE | LOW | 在 RAG 知识库中检索嵌入式开发知识 |
| \`generate_code\` | knowledge | CODE | LOW | 调用 LLM 生成嵌入式 C 代码 |
| \`read_file\` | file_ops | FILE | LOW | 读取工作区文件（沙箱 + 5MB 上限） |
| \`write_file\` | file_ops | FILE | MEDIUM | 创建或覆写文件（沙箱 + 10MB 上限） |
| \`edit_file\` | file_ops | FILE | MEDIUM | 查找替换修改文件部分内容 |
| \`scan_workspace\` | workspace | WORKSPACE | LOW | 扫描工作区目录结构（最多 200 个文件） |
| \`search_in_project\` | workspace | WORKSPACE | LOW | 在工程文件中搜索文本内容 |
| \`create_project\` | project | PROJECT | MEDIUM | 创建 STM32 / ESP32 工程 |
| \`build_project\` | project | PROJECT | MEDIUM | 编译构建工程（debug / release） |
| \`detect_platform\` | project | PROJECT | LOW | 根据上下文自动检测目标平台 |
| \`run_command\` | terminal | TERMINAL | **CRITICAL** | 执行终端命令（需用户确认） |
| \`flash_firmware\` | hardware | HARDWARE | **CRITICAL** | 烧录固件到硬件（需用户确认） |
| \`get_peripheral_info\` | hardware | HARDWARE | LOW | 查询外设配置信息 |
| \`serial_monitor\` | serial | HARDWARE | MEDIUM | 串口监控 — 连接 / 停止 / 查看状态 |
| \`get_serial_log\` | serial | HARDWARE | LOW | 获取经 Filter+Sampler 处理后的串口日志 |
| \`detect_hardware\` | debug | HARDWARE | LOW | 自动检测串口、调试探针、开发板类型 |
| \`debug_control\` | debug | HARDWARE | **CRITICAL** | OpenOCD 调试 — 启动/停止/暂停/单步/读寄存器/断点 |
| \`emulation_control\` | emulation | HARDWARE | MEDIUM | QEMU 仿真 — 启动/停止/获取输出 |
| \`request_confirmation\` | interaction | WORKSPACE | LOW | 向用户发起确认请求 |

### 9.4 LLM 提供商工具（8 个）

LLM 工具名统一加 **提供商前缀**（如 \`openai_\`、\`qwen_\`）以避免跨提供商命名冲突。这些工具通过 \`LLMService.call_llm_tool()\` 委托给对应提供商的 API 执行。

| 工具名 | 提供商 | 类别 | 风险级别 | 说明 |
|--------|--------|------|---------|------|
| \`openai_web_search\` | OpenAI | KNOWLEDGE | LOW | 使用 OpenAI Responses API 联网搜索 |
| \`openai_file_search\` | OpenAI | KNOWLEDGE | LOW | 在 OpenAI 向量存储中搜索文件内容 |
| \`openai_code_interpreter\` | OpenAI | CODE | MEDIUM | 在 OpenAI 隔离沙箱中执行 Python 代码 |
| \`openai_image_generation\` | OpenAI | CODE | LOW | 使用 DALL-E 生成图像 |
| \`qwen_knowledge_retrieve\` | Qwen | KNOWLEDGE | LOW | 从百炼知识库检索信息 |
| \`qwen_enable_search\` | Qwen | KNOWLEDGE | LOW | 启用通义千问的联网搜索 |
| \`deepseek_enable_search\` | DeepSeek | KNOWLEDGE | LOW | 启用 DeepSeek 模型的联网搜索 |
| \`anthropic_computer_use\` | Anthropic | TERMINAL | **CRITICAL** | 使用 Claude 控制鼠标键盘进行屏幕交互 |

#### 关键内置工具参数详情

**search_knowledge**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`query\` | str | 是 | — | 搜索关键词 |
| \`platform\` | str | 否 | 配置默认值 | 平台过滤 |
| \`top_k\` | int | 否 | \`3\` | 返回条数 |

**generate_code**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`requirement\` | str | 是 | — | 需求描述 |
| \`platform\` | str | 否 | 配置默认值 | 目标平台 |
| \`peripherals\` | str | 否 | — | 外设列表 |
| \`context\` | str | 否 | — | 额外上下文 |

**run_command**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`command\` | str | 是 | — | 要执行的命令 |
| \`working_dir\` | str | 否 | — | 工作目录 |
| \`timeout\` | int | 否 | \`60\` | 超时秒数（5 ~ 300） |

**flash_firmware**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`firmware_path\` | str | 是 | — | 固件文件路径 |
| \`target\` | str | 否 | 配置默认值 | 目标平台 |
| \`port\` | str | 否 | — | 串口 |
| \`interface\` | str | 否 | \`swd\` | 接口类型：\`swd\` / \`jtag\` / \`uart\` |

**serial_monitor**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`action\` | str | 是 | — | 操作类型：\`start\` / \`stop\` / \`status\` |
| \`port\` | str | 否 | — | 串口端口（start 时必填） |
| \`baudrate\` | int | 否 | \`115200\` | 波特率 |
| \`session_id\` | str | 否 | — | 会话 ID（stop 时必填） |

**get_serial_log**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`count\` | int | 否 | \`30\` | 返回日志条数（1 ~ 200） |
| \`errors_only\` | bool | 否 | \`false\` | 仅返回 error/critical 级别 |

**debug_control**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`action\` | str | 是 | — | 操作：\`start\` / \`stop\` / \`halt\` / \`resume\` / \`step\` / \`reset\` / \`read_registers\` / \`read_memory\` / \`set_breakpoint\` / \`remove_breakpoint\` / \`list_sessions\` / \`history\` |
| \`session_id\` | str | 否 | — | 调试会话 ID |
| \`interface_cfg\` | str | 否 | \`interface/stlink.cfg\` | OpenOCD 接口配置文件 |
| \`target_cfg\` | str | 否 | \`target/stm32f1x.cfg\` | OpenOCD 目标芯片配置 |
| \`address\` | str | 否 | — | 内存/断点地址（0x...） |
| \`size\` | int | 否 | \`256\` | 读取内存字节数 |

**emulation_control**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`action\` | str | 是 | — | 操作：\`start\` / \`stop\` / \`output\` / \`list_sessions\` |
| \`session_id\` | str | 否 | — | 仿真会话 ID |
| \`firmware\` | str | 否 | — | 固件 ELF 文件路径（start 需要） |
| \`machine\` | str | 否 | \`stm32f4-discovery\` | QEMU 机器类型 |

**search_in_project**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| \`query\` | str | 是 | — | 搜索关键词 |
| \`file_pattern\` | str | 否 | \`*.c,*.h\` | 文件名模式 |
| \`project_path\` | str | 否 | — | 工程路径 |
| \`max_results\` | int | 否 | \`20\` | 最大结果数 |

### 9.5 敏感操作拦截

以下操作会触发用户确认请求：

1. **风险级别 ≥ CRITICAL** 的工具调用（\`run_command\`、\`flash_firmware\`、\`debug_control\`、\`anthropic_computer_use\`）
2. **终端命令关键词匹配**：\`rm -rf\`、\`flash\`、\`sudo\`、\`mkfs\`、\`dd\`、\`format\`、\`reboot\`、\`shutdown\`、\`kill\`、\`chmod 777\`、\`curl | sh\`、\`wget | sh\`、\`erase\`
3. **所有烧录操作**

确认窗口 **300 秒**超时自动拒绝。

### 9.6 上下文管理

| 参数 | 值 |
|------|-----|
| 最大 Token 窗口 | 12,000 token |
| 历史保留 | 8,000 token |
| 自动摘要 | 超过 20 轮历史时，LLM 辅助压缩 |
| 会话 TTL | 4 小时 |
| 知识缓存 | LRU + TTL，减少重复 RAG 检索 |

### 9.7 错误恢复策略

Agent 执行工具失败时的自动恢复：

1. **重试**：指数退避重试
2. **降级**：减少参数、跳过非必要步骤
3. **LLM 重规划**：让 AI 重新决策
4. **放弃**：报告错误给用户

### 9.8 安全特性

- **速率限制**：Agent 调用 30 次/分钟，工具调用 100 次/分钟
- **并发限制**：最多 5 个并发 Agent（\`asyncio.Semaphore\`）
- **整体超时**：默认 300 秒
- **Schema 校验**：所有工具参数自动验证
- **敏感命令拦截**：\`SensitiveGuard\` 模块
- **审计日志**：环形缓冲，最大 10,000 条

### 9.9 Agent 子模块

| 模块 | 文件 | 职责 |
|------|------|------|
| 核心循环 | \`agent_loop.py\` | Think → Act → Observe 循环 |
| 工具系统 | \`tools/\` | 模块化工具包 — 类型、注册中心、19 内置 + 8 LLM 工具 |
| 敏感守卫 | \`sensitive_guard.py\` | 命令拦截 + 确认生成 |
| 上下文管理 | \`context_manager.py\` | Token 窗口 + 自动摘要 |
| 工作区管理 | \`workspace_manager.py\` | 路径注入 + 沙箱 |
| 知识缓存 | \`knowledge_cache.py\` | LRU + TTL 缓存 |
| 输出解析 | \`structured_output.py\` | System Prompt + 输出解析 |
| 状态推送 | \`status_reporter.py\` | SSE 事件推送 |
| 错误恢复 | \`error_recovery.py\` | 自动重试 + 降级 |

---

## 10. Skill 插件系统

### 10.1 概述

Skill 系统是 Emcoder 的**平台扩展层**，将平台特定的能力（如 STM32 工程创建、ESP32 烧录）封装为可插拔的 Skill 插件。

**架构**：\`SkillManager\`（发现 + 加载） → \`SkillMatcher\`（匹配） → \`BaseSkillHandler\`（执行）

**核心设计原则**：
- 零硬编码：Agent 工具层通过 Skill 动态获取平台信息
- 懒加载：启动时只读 \`meta.json\`，Handler 首次使用时才动态导入
- 可扩展：新增平台只需添加目录，无需改框架代码

### 10.2 目录结构

\`\`\`
app/skills/
├── __init__.py          # 导出 skill_manager, skill_matcher
├── base.py              # SkillMeta, SkillResult, CLIInfo, BaseSkillHandler, Skill
├── manager.py           # SkillManager (单例, 懒加载)
├── matcher.py           # SkillMatcher (关键词 + 语义匹配)
└── embedded/            # domain = "embedded"
    ├── stm32/           # platform = "stm32"
    │   ├── meta.json      # 元数据 (29 关键词, 4 CLI 工具)
    │   ├── skill.py       # SkillHandler 实现
    │   ├── prompt.tpl     # Jinja2 系统提示词模板
    │   └── resources/     # 芯片数据库、引脚映射等
    └── esp32/           # platform = "esp32"
        ├── meta.json      # 元数据 (31 关键词, 2 CLI 工具)
        ├── skill.py       # SkillHandler 实现
        └── prompt.tpl     # Jinja2 系统提示词模板
\`\`\`

### 10.3 Skill 数据模型

#### SkillMeta（元数据）

从 \`meta.json\` 加载：

| 字段 | 类型 | 说明 |
|------|------|------|
| \`skill_id\` | str | 唯一标识（如 \`"stm32"\`） |
| \`name\` | str | 显示名称 |
| \`description\` | str | 描述 |
| \`keywords\` | list[str] | 匹配关键词 |
| \`domain\` | str | 领域（如 \`"embedded"\`） |
| \`skill_type\` | str | 类型（如 \`"mcu"\`） |
| \`similarity_threshold\` | float | 语义匹配阈值（默认 0.7） |
| \`cli_tools\` | list[dict] | 所需外部 CLI 工具 |
| \`extra_parameters\` | dict | 额外参数定义 |
| \`default_config\` | dict | 默认配置值 |

#### SkillResult（执行结果）

| 字段 | 类型 | 说明 |
|------|------|------|
| \`success\` | bool | 是否成功 |
| \`data\` | Any | 结果数据 |
| \`error\` | Optional[str] | 错误信息 |

#### CLIInfo（外部工具信息）

| 字段 | 类型 | 说明 |
|------|------|------|
| \`name\` | str | 工具名 |
| \`available\` | bool | 是否可用 |
| \`path\` | Optional[str] | 路径 |
| \`version\` | Optional[str] | 版本 |
| \`download_url\` | str | 下载地址 |
| \`install_guide\` | str | 安装指南 |
| \`required\` | bool | 是否必须 |

### 10.4 BaseSkillHandler（接口）

所有 Skill 必须实现 \`BaseSkillHandler\` 抽象基类：

| 方法 | 必须实现 | 返回类型 | 说明 |
|------|---------|---------|------|
| \`detect_cli()\` | **是** | \`List[CLIInfo]\` | 检测平台所需的 CLI 工具 |
| \`create_project()\` | 否 | \`SkillResult\` | 创建工程 |
| \`identify_project()\` | 否 | \`float\` | 工程识别置信度（0.0 ~ 1.0） |
| \`get_project_context()\` | 否 | \`dict\` | 获取工程上下文 |
| \`build_project()\` | 否 | \`SkillResult\` | 构建工程 |
| \`deploy()\` | 否 | \`SkillResult\` | 部署 / 烧录 |
| \`get_peripheral_info()\` | 否 | \`Optional[dict]\` | 查询外设信息 |
| \`get_extra_tools()\` | 否 | \`list\` | 注册额外的 Agent 工具 |

**配置优先级**（高 → 低）：
1. 用户配置文件（\`~/.emcoder/config.json\`）
2. 环境变量（\`SKILL_<ID>_<KEY>\`）
3. \`meta.json\` 中的 \`default_config\`

### 10.5 SkillManager

单例模式，负责 Skill 发现与加载：

\`\`\`python
from app.components.skills import skill_manager

# 加载所有 Skill（读取 meta.json，不加载 handler）
skill_manager.load_all_skills()

# 获取指定 Skill
skill = skill_manager.get_skill("stm32")

# 获取所有可用平台
platforms = skill_manager.get_available_platforms()  # ["stm32", "esp32"]

# 按领域查询
embedded = skill_manager.get_skills_by_domain("embedded")

# 按类型查询
mcus = skill_manager.get_skills_by_type("mcu")
\`\`\`

### 10.6 SkillMatcher

负责将用户输入自动匹配到正确的 Skill：

\`\`\`python
from app.components.skills import skill_matcher

# 关键词匹配
results = skill_matcher.match("帮我配置 STM32F407 的 GPIO")
# → [MatchResult(skill=stm32_skill, score=0.85, match_type="keyword")]

# 平台检测
platform = await skill_matcher.detect_platform("这个 ESP32 项目...")
# → "esp32"

# 工程识别
skill_id = await skill_matcher.identify_project("/path/to/project")
# → "stm32" (基于目录特征)
\`\`\`

**匹配优先级**：
1. \`platform_hint\` — 显式指定平台
2. \`keyword\` — 关键词命中
3. \`semantic\` — 语义相似度（需启用 \`SKILL_ENABLE_SEMANTIC_MATCH\`）
4. \`project_fingerprint\` — 工程文件特征

### 10.7 内置 Skill：STM32

**Skill ID**: \`stm32\` | **关键词**: 29 个

默认配置：
| 参数 | 值 | 说明 |
|------|-----|------|
| \`default_mcu\` | \`STM32F103C8Tx\` | 默认芯片 |
| \`default_family\` | \`STM32F1\` | 默认系列 |
| \`default_core\` | \`cortex-m3\` | 默认内核 |
| \`flash_size_kb\` | \`64\` | Flash 大小 |
| \`ram_size_kb\` | \`20\` | RAM 大小 |
| \`system_clock_hz\` | \`72000000\` | 系统时钟 |
| \`hse_value_hz\` | \`8000000\` | HSE 频率 |

所需 CLI 工具：ARM GCC（必须）、STM32CubeMX、OpenOCD、st-flash

### 10.8 内置 Skill：ESP32

**Skill ID**: \`esp32\` | **关键词**: 31 个

默认配置：
| 参数 | 值 | 说明 |
|------|-----|------|
| \`target\` | \`esp32\` | 目标芯片 |
| \`flash_size\` | \`4MB\` | Flash 大小 |
| \`baud_rate\` | \`115200\` | 串口波特率 |
| \`led_gpio\` | \`2\` | LED GPIO |
| \`blink_period_ms\` | \`500\` | 闪烁周期 |
| \`freertos_hz\` | \`1000\` | FreeRTOS Tick 频率 |
| \`build_timeout\` | \`180\` | 编译超时秒数 |
| \`flash_timeout\` | \`60\` | 烧录超时秒数 |

所需 CLI 工具：\`idf.py\`（必须）、\`esptool.py\`

工程识别标记：\`sdkconfig\` (0.90)、\`sdkconfig.defaults\` (0.85)、\`main/CMakeLists.txt\` + \`idf_component_register\` (0.90)

### 10.9 添加自定义 Skill

1. 在 \`app/skills/\` 下创建目录：\`<domain>/<platform>/\`
2. 创建 \`meta.json\`（参考 STM32/ESP32 格式）
3. 创建 \`skill.py\`，导出 \`SkillHandler(BaseSkillHandler)\` 类
4. 可选：创建 \`prompt.tpl\` Jinja2 模板
5. 重启后端，\`SkillManager\` 自动发现

或通过 \`SKILL_EXTRA_SKILL_DIRS\` 配置额外搜索路径。

---

## 11. RAG 知识库

### 11.1 内置知识库

位于 \`data/knowledge_base/\` 目录：

\`\`\`
knowledge_base/
├── common/              通用嵌入式开发知识
│   └── best_practices.md
├── stm32/               STM32 平台专属
│   ├── gpio_guide.md
│   ├── timer_pwm_guide.md
│   └── uart_guide.md
└── esp32/               ESP32 平台专属 (待补充)
\`\`\`

### 11.2 添加自定义知识

#### 方式一：放置文件

将 \`.md\` / \`.txt\` / \`.json\` 文件放入 \`data/knowledge_base/\` 对应子目录。重启后端后自动加载。

#### 方式二：API 上传

\`\`\`powershell
# 单个文档
curl -X POST http://127.0.0.1:8000/api/v1/rag/add \`
  -H "Content-Type: application/json" \`
  -d '{"content": "STM32 DMA 使用指南...", "source": "custom", "platform": "stm32"}'

# 上传文件
curl -X POST http://127.0.0.1:8000/api/v1/rag/upload \`
  -F "file=@my_guide.md"

# 批量添加
curl -X POST http://127.0.0.1:8000/api/v1/rag/add-batch \`
  -H "Content-Type: application/json" \`
  -d '{"documents": [...]}'
\`\`\`

### 11.3 搜索知识

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/rag/search \`
  -H "Content-Type: application/json" \`
  -d '{"query": "STM32 I2C 多从机通信", "platform": "stm32", "top_k": 5}'
\`\`\`

### 11.4 索引管理

\`\`\`powershell
# 查看统计
curl http://127.0.0.1:8000/api/v1/rag/stats

# 保存索引到磁盘
curl -X POST http://127.0.0.1:8000/api/v1/rag/save

# 从磁盘加载索引
curl -X POST http://127.0.0.1:8000/api/v1/rag/load

# 清空索引（危险操作）
curl -X DELETE http://127.0.0.1:8000/api/v1/rag/clear
\`\`\`

### 11.5 增量 RAG

后端通过 WebSocket \`/ws/context\` 端点接收 IDE 的文件变更事件（\`textDocument/didChange\`），经 **500ms 防抖**后：
1. 对变更的 C 代码文件进行 **函数/结构体/宏级别切片**
2. 增量更新 FAISS 向量索引
3. 后续 Agent 调用 \`search_knowledge\` 时即可命中最新代码

### 11.6 文档来源类型

| 来源 | 说明 |
|------|------|
| \`datasheet\` | 芯片数据手册 |
| \`reference_manual\` | 参考手册 |
| \`application_note\` | 应用笔记 |
| \`example_code\` | 示例代码 |
| \`best_practice\` | 最佳实践 |
| \`faq\` | 常见问答 |

---

## 12. 代码引擎

### 12.1 代码融合引擎 (Fusion)

保护 CubeMX 生成的代码区域，安全合并 AI 生成的代码。

**识别并保护的区域**：
- \`/* USER CODE BEGIN xxx */\` 到 \`/* USER CODE END xxx */\` 之间的代码
- \`MX_\` 前缀的初始化函数
- \`SystemClock_Config\`、\`Error_Handler\` 等关键函数

**融合策略**：

| 策略 | 说明 |
|------|------|
| \`preserve_user\` | 优先保留用户代码 |
| \`merge_smart\` | 智能合并 |
| \`overwrite\` | 直接覆盖 |

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/code/fuse \`
  -H "Content-Type: application/json" \`
  -d '{"original_code": "...", "new_code": "...", "strategy": "preserve_user"}'
\`\`\`

### 12.2 静态分析引擎

**检查项**：
- 危险函数使用（\`strcpy\` → \`strncpy\`）
- 空指针解引用
- 未初始化变量
- 格式化字符串漏洞
- 整数溢出风险
- 内存泄漏检测
- 中断安全检查
- 硬件访问规范
- MISRA C 规则子集
- 圈复杂度 / 嵌套深度度量

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/static-analyze \`
  -H "Content-Type: application/json" \`
  -d '{"code": "void foo() { char *p = malloc(100); strcpy(p, input); }"}'
\`\`\`

### 12.3 约束检查引擎

**检测内容**：
- 引脚复用冲突（同一引脚被多个外设占用）
- 电气规格违规
- 资源限制（内存 / 外设 / DMA 通道不足）
- 外设互斥检测

支持的芯片规格数据库：STM32F103C8、STM32F407、ESP32（含完整引脚复用表）。

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/constraint-check \`
  -H "Content-Type: application/json" \`
  -d '{"code": "...", "chip": "STM32F407"}'
\`\`\`

### 12.4 日志分析引擎

**内置错误模式库**：

| 分类 | 模式 |
|------|------|
| ARM 异常 | HardFault, MemManage, BusFault, UsageFault |
| 内存问题 | Stack overflow, Heap corruption, 内存泄漏 |
| 通信错误 | UART overrun, SPI timeout, I2C NACK |
| 时序问题 | 看门狗超时, RTC 漂移 |
| 资源耗尽 | 任务栈溢出, 队列满 |
| ESP32 专用 | Guru Meditation, Brownout, Flash 加密失败 |

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/log-analyze \`
  -H "Content-Type: application/json" \`
  -d '{"logs": "Hard Fault at PC=0x08001234\\nStack: 0x20005678..."}'
\`\`\`

### 12.5 状态机分析引擎

从 C 代码中提取状态机并分析：
- 从 \`enum\` / \`#define\` 提取状态
- 从 \`switch-case\` / \`if-else\` 提取状态转换
- 死锁检测
- 不可达状态检测
- 状态覆盖分析

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/fsm-analyze \`
  -H "Content-Type: application/json" \`
  -d '{"code": "typedef enum { IDLE, RUNNING, ERROR } State_t; ..."}'
\`\`\`

### 12.6 AI 分析引擎

通用 LLM 诊断引擎，支持多种分析类型（\`AnalysisType\`）：
- 错误诊断
- 性能分析
- 内存分析

### 12.7 工程解析引擎

支持的工程格式：
- **STM32CubeMX**：\`.ioc\` + CubeMX 生成结构
- **Keil uVision**：\`.uvprojx\`
- **ESP-IDF**：\`CMakeLists.txt\` + \`sdkconfig\`

自动检测工程类型并解析：芯片型号、源文件、头文件路径、宏定义、构建系统。

### 12.8 完整引擎列表

| 引擎 | 模块 | 功能 |
|------|------|------|
| \`CodeFusionEngine\` | \`engines/fusion/\` | CubeMX 安全代码融合 |
| \`ConstraintEngine\` | \`engines/constraint/\` | 硬件约束检查 |
| \`StaticAnalyzerEngine\` | \`engines/static_analyzer/\` | C 代码静态分析 |
| \`LogAnalyzerEngine\` | \`engines/log_analyzer/\` | 日志根因分析 |
| \`HardwareFSMEngine\` | \`engines/hardware_fsm/\` | 状态机分析 |
| \`AnalysisEngine\` | \`engines/ai_analyzer/\` | LLM 通用分析 |
| \`ProjectParser\` | \`engines/project_parser/\` | 工程结构解析 |
| \`IncrementalRAG\` | \`engines/incremental_rag/\` | 实时增量索引 |

> 所有引擎通过 \`try/except\` 动态导入，不可用时优雅降级——不会影响主服务启动。

---

## 13. 硬件功能

### 13.1 串口通信

#### 通过 CLI

\`\`\`powershell
# 列出串口
python -m cli serial list

# 监控
python -m cli serial monitor COM4 --baud 115200

# 发送
python -m cli serial send COM4 "AT\\r\\n"
\`\`\`

#### 通过 API

\`\`\`powershell
# 列出串口
curl http://127.0.0.1:8000/api/v1/serial/ports

# 连接
curl -X POST http://127.0.0.1:8000/api/v1/serial/connect \`
  -H "Content-Type: application/json" \`
  -d '{"port": "COM4", "baudrate": 115200}'

# 发送数据
curl -X POST http://127.0.0.1:8000/api/v1/serial/send/SESSION_ID \`
  -H "Content-Type: application/json" \`
  -d '{"data": "AT\\r\\n"}'

# 读取数据
curl http://127.0.0.1:8000/api/v1/serial/read/SESSION_ID

# 断开
curl -X POST http://127.0.0.1:8000/api/v1/serial/disconnect/SESSION_ID
\`\`\`

#### 通过 WebSocket

连接 \`/ws/serial/{connection_id}\` 或 \`/api/v1/serial/tunnel/{session_id}\` 获得双向串口隧道。支持二进制透传、xterm.js 终端集成。

### 13.2 固件烧录

#### STM32 烧录

前提：安装 STM32CubeProgrammer 并配置 \`MCU_STM32_PROGRAMMER_PATH\`（或通过 Skill 系统自动检测）。

\`\`\`powershell
# CLI
python -m cli flash write firmware.bin --platform stm32

# API
curl -X POST http://127.0.0.1:8000/api/v1/flash/execute \`
  -H "Content-Type: application/json" \`
  -d '{"firmware_path": "firmware.bin", "platform": "stm32", "address": "0x08000000"}'
\`\`\`

#### ESP32 烧录

前提：安装 esptool（\`pip install esptool\`）。

\`\`\`powershell
# CLI
python -m cli flash write firmware.bin --platform esp32 --port COM4

# API
curl -X POST http://127.0.0.1:8000/api/v1/flash/execute \`
  -H "Content-Type: application/json" \`
  -d '{"firmware_path": "firmware.bin", "platform": "esp32", "port": "COM4"}'
\`\`\`

#### 烧录安全检查

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/flash/safety-check \`
  -H "Content-Type: application/json" \`
  -d '{"firmware_path": "firmware.bin", "platform": "stm32"}'
\`\`\`

### 13.3 OpenOCD 调试

\`\`\`powershell
# CLI 启动调试服务器
python -m cli debug start --interface interface/stlink.cfg --target target/stm32f4x.cfg

# API 启动
curl -X POST http://127.0.0.1:8000/api/v1/debug/start \`
  -H "Content-Type: application/json" \`
  -d '{"interface_cfg": "interface/stlink.cfg", "target_cfg": "target/stm32f4x.cfg"}'

# 读取寄存器
curl -X POST http://127.0.0.1:8000/api/v1/debug/registers

# 读取内存
curl -X POST http://127.0.0.1:8000/api/v1/debug/memory/read \`
  -H "Content-Type: application/json" \`
  -d '{"address": "0x20000000", "length": 256}'

# 执行 GDB 命令
curl -X POST http://127.0.0.1:8000/api/v1/debug/gdb \`
  -H "Content-Type: application/json" \`
  -d '{"command": "info breakpoints"}'

# 表达式求值
curl -X POST http://127.0.0.1:8000/api/v1/debug/evaluate \`
  -H "Content-Type: application/json" \`
  -d '{"expression": "*((uint32_t*)0x20000000)"}'

# 停止
curl -X POST http://127.0.0.1:8000/api/v1/debug/stop
\`\`\`

### 13.4 QEMU 仿真

\`\`\`powershell
# CLI
python -m cli simulate start firmware.elf --machine stm32f4-discovery --gdb-port 3333
\`\`\`

仿真时可捕获：
- UART stdout 输出
- 执行追踪 (exec)
- 内存读写追踪 (mem_read / mem_write)
- 中断追踪 (irq)

### 13.5 硬件信息查询

\`\`\`powershell
# 检测连接硬件
curl http://127.0.0.1:8000/api/v1/hardware/detect

# 工具链状态
curl http://127.0.0.1:8000/api/v1/hardware/toolchains

# 芯片引脚复用
curl http://127.0.0.1:8000/api/v1/hardware/pinout/STM32F407VGT6

# 引脚信息
curl "http://127.0.0.1:8000/api/v1/hardware/pin-info?chip=STM32F407&pin=PA0"

# 芯片详情
curl "http://127.0.0.1:8000/api/v1/hardware/chip-info?chip=STM32F407"

# 时钟树
curl http://127.0.0.1:8000/api/v1/hardware/clock-tree

# 外设地址映射
curl http://127.0.0.1:8000/api/v1/hardware/peripheral-map

# 引脚冲突检测
curl -X POST http://127.0.0.1:8000/api/v1/hardware/validate_pinout \`
  -H "Content-Type: application/json" \`
  -d '{"chip": "STM32F407", "pin_assignments": {"PA0": "UART4_TX", "PA1": "UART4_RX"}}'
\`\`\`

---

## 14. 数据捕获与管线

### 14.1 捕获层架构

所有硬件交互数据通过统一的捕获层采集：

\`\`\`
DataCapture (抽象基类)
├── SerialCapture      串口数据
├── FlashCapture       烧录输出
├── OpenOCDCapture     调试输出
└── QEMUCapture        仿真输出
\`\`\`

### 14.2 数据流转

\`\`\`
硬件 → DataCapture.emit() → CapturedData
  → AIDataFilter (过滤冗余)
  → SmartSampler (智能采样)
  → LLMContext (格式化为 AI Prompt)
  → Pipeline consumers (分析引擎 / 前端推送)
\`\`\`

### 14.3 数据类型（26 种）

| 类型 | 来源 |
|------|------|
| \`SERIAL_OUTPUT\` / \`SERIAL_INPUT\` | 串口 |
| \`GDB_OUTPUT\` / \`GDB_MI_OUTPUT\` | GDB |
| \`OPENOCD_LOG\` / \`OPENOCD_TELNET\` | OpenOCD |
| \`MEMORY_DUMP\` / \`REGISTER_DUMP\` | 调试 |
| \`TRACE_LOG\` / \`TRACE_INSTRUCTION\` / \`TRACE_MEMORY\` / \`TRACE_IRQ\` | 追踪 |
| \`PERIPHERAL_IO\` / \`GPIO_STATE\` / \`UART_OUTPUT\` | 外设 |
| \`QEMU_LOG\` / \`QEMU_MONITOR\` | QEMU |
| \`RENODE_LOG\` / \`RENODE_MONITOR\` | Renode |
| \`FLASH_PROGRESS\` / \`FLASH_RESULT\` | 烧录 |
| \`BUILD_LOG\` / \`RUNTIME_ERROR\` | 构建 / 运行时 |

严重级别：\`CRITICAL\` > \`ERROR\` > \`WARNING\` > \`INFO\` > \`DEBUG\` > \`TRACE\`

### 14.4 AI 数据过滤器 (AIDataFilter)

四种过滤动作：

| 动作 | 说明 |
|------|------|
| \`PASS\` | 直接通过 |
| \`COMPRESS\` | 压缩同类数据 |
| \`AGGREGATE\` | 聚合统计（每 100 条或每秒） |
| \`DROP\` | 丢弃无用数据 |

规则：错误/异常 **100% 保留**，正常重复数据聚合/丢弃。

### 14.5 智能采样器 (SmartSampler)

| 配置 | 默认值 |
|------|--------|
| 采样窗口 | 1000 ms |
| 窗口内最大样本 | 10 |
| 总最大样本 | 1000 |
| 错误权重 | 10.0 |
| 警告权重 | 5.0 |

策略：error/critical **无条件保留**；值变化高概率保留；重复内容递减概率。

### 14.6 Pipeline 管理器

- **Pipeline**：绑定一个 DataCapture + AIDataFilter + SmartSampler
- **PipelineManager**：管线注册/注销，全局启停
- 全局缓冲池：\`deque\`，默认 1000 条
- 统计：\`total_in\` / \`filtered_out\` / \`sampled_out\` / \`delivered\` / \`errors\`

\`\`\`python
# 获取最新数据
manager.get_recent(count=10)

# 获取错误数据
manager.get_errors(count=5)

# 获取统计
manager.get_all_stats()
\`\`\`

---

## 15. 安全机制

### 15.1 路径沙箱 (PathSandbox)

Agent 的文件操作被限制在安全范围内：

**阻止的路径**：
- Unix：\`/etc\`、\`/bin\`、\`/sbin\`、\`/usr/bin\`、\`/boot\`、\`/dev\`、\`/proc\`、\`/sys\`、\`/root\`、\`/lib\` ...
- Windows：\`C:\\Windows\`、\`C:\\Program Files\`、\`C:\\ProgramData\` ...

**阻止的文件**：\`.env\`、\`.ssh\`、\`id_rsa\`、\`authorized_keys\`、\`passwd\`、\`shadow\`、\`*.pem\`、\`*.key\`、\`*.crt\`、\`*.pfx\`

**大小限制**：读取 ≤ 5 MB，写入 ≤ 10 MB

### 15.2 终端命令安全

**白名单命令**（55+）：\`make\`、\`cmake\`、\`ninja\`、\`idf.py\`、\`arm-none-eabi-*\`、\`gcc\`、\`python\`、\`git\`、\`ls\`、\`cat\`、\`openocd\`、\`esptool\`、\`st-flash\`、\`JLinkExe\`、\`mkdir\`、\`cp\`、\`mv\`、\`echo\`、\`pwd\`、\`cd\`、\`head\`、\`tail\`、\`wc\`、\`sort\`、\`diff\` ...

**黑名单模式**（16 条）：\`rm -rf /\`、fork bomb、\`dd of=/dev/sd*\`、\`mkfs\`、\`format\`、\`curl|bash\`、\`wget|bash\`、\`eval\`、\`exec\`、命令替换（\`$()\`、反引号）、\`chmod 777\`、\`chown root\`、\`sudo\`、\`su\`、链式 rm ...

**注入检测**：拦截 \`;\`、\`|\`、\`&&\`、\`||\`、\`\\n\`、\`>\`、\`<\`

### 15.3 速率限制 (RateLimiter)

| 限制 | 上限 |
|------|------|
| Agent 调用 | 30 次 / 60 秒 |
| 工具调用 | 100 次 / 60 秒 |

基于滑动窗口算法。

### 15.4 审计日志 (AuditLog)

- 环形缓冲，最大 **10,000** 条
- 字段：\`timestamp\`、\`session_id\`、\`action\`、\`tool_name\`、\`args_summary\`、\`result\`、\`risk_level\`、\`detail\`
- 全局单例：\`audit_log\`

### 15.5 敏感操作确认

所有高风险操作必须用户确认。确认窗口 300 秒超时自动拒绝。

### 15.6 CubeMX 代码保护

代码融合时自动保护受保护区域，配置项：\`SECURITY_PROTECTED_REGIONS\`。

### 15.7 Fuse 保护

启用 \`SECURITY_ENABLE_FUSE_PROTECTION=true\` 防止意外修改芯片 fuse 位。

### 15.8 CORS 配置

默认允许源：\`http://localhost:*\`、\`http://127.0.0.1:*\`、\`vscode-webview://*\`

> **生产环境**务必修改 \`SECURITY_ALLOWED_ORIGINS\`，切勿使用 \`*\`。

### 15.9 输入净化

所有用户输入经过 \`sanitize_string()\` 处理：移除空字节、限制长度（默认 10,000 字符）、去除前后空白。

---

## 16. 编辑协议

### 16.1 核心原则

**"后端提议，前端应用"** — Agent 不直接写磁盘。所有文件修改先生成 \`EditProposal\`，由前端（VSCode 扩展 / TUI）展示差异后，用户审批方可应用。

### 16.2 编辑动作

| 动作 | 说明 |
|------|------|
| \`REPLACE\` | 替换指定行范围的内容 |
| \`INSERT\` | 在指定行后插入 |
| \`DELETE\` | 删除指定行范围 |
| \`CREATE_FILE\` | 创建新文件 |
| \`DELETE_FILE\` | 删除文件 |

### 16.3 提议状态

| 状态 | 说明 |
|------|------|
| \`PENDING\` | 等待审批 |
| \`ACCEPTED\` | 已接受 |
| \`REJECTED\` | 已拒绝 |
| \`AUTO_APPLIED\` | 自动应用（低风险） |
| \`EXPIRED\` | 已过期（300 秒） |

### 16.4 SSE 事件类型

| 类型 | 说明 |
|------|------|
| \`THINKING\` | Agent 思考过程 |
| \`TEXT\` | 文本输出 |
| \`TOOL_CALL\` | 工具调用 |
| \`TOOL_RESULT\` | 工具执行结果 |
| \`EDIT\` | 编辑提议（包含 diff） |
| \`FILE_CREATED\` | 文件创建提议 |
| \`CONFIRMATION\` | 确认请求 |
| \`ERROR\` | 错误 |
| \`DONE\` | 结束 |

### 16.5 API 交互流程

\`\`\`
1. Agent 执行 write_file/edit_file
   → 生成 EditProposal (status=PENDING)
   → SSE 推送 EDIT 事件到前端

2. 前端展示 diff 给用户

3. 用户决定：
   → POST /api/v1/agent/edit/apply   → 应用到磁盘
   → POST /api/v1/agent/edit/reject  → 丢弃

4. 300 秒无操作 → 自动过期
\`\`\`

### 16.6 diff 计算

\`compute_proposed_edits_from_content()\` 使用 \`difflib\` 进行行级 diff，自动计算 \`ProposedEdit\` 列表。

---

## 17. 测试

### 17.1 运行测试

\`\`\`powershell
cd backend

# 运行所有测试
python -m pytest

# 指定文件
python -m pytest tests/capture/test_serial.py

# 指定目录
python -m pytest tests/engines/

# 详细输出
python -m pytest -v

# 快速模式（遇到失败立即停止）
python -m pytest -x

# 精简输出
python -m pytest -q

# 生成覆盖率报告
python -m pytest --cov=app --cov-report=html
\`\`\`

### 17.2 测试目录结构

\`\`\`
tests/
├── conftest.py               全局 fixture
├── capture/                   捕获层测试
│   ├── test_base.py             基础模型
│   ├── test_serial.py           串口捕获
│   ├── test_flash.py            烧录捕获
│   ├── test_openocd_qemu.py     OpenOCD / QEMU
│   └── test_filter_sampler.py   过滤器 / 采样器
├── engines/                   引擎测试
│   ├── test_ai_analyzer.py      AI 分析器
│   ├── test_fsm.py              状态机
│   ├── test_log_analyzer.py     日志分析
│   └── test_static_analyzer.py  静态分析
├── pipeline/                  管线测试
│   └── test_pipeline.py
├── integration/               集成测试
│   └── test_integration.py
├── core/                      核心模块测试
├── security/                  安全测试
├── services/                  服务测试
├── test_cli/                  CLI 测试
└── test_tui/                  TUI 测试
\`\`\`

### 17.3 测试配置

\`\`\`ini
# pytest.ini
[pytest]
testpaths = tests
asyncio_mode = strict      # 异步测试需 @pytest.mark.asyncio
pythonpath = .
\`\`\`

根目录 \`conftest.py\` 确保 \`backend/\` 在 \`sys.path\` 最前，使 \`app.*\`、\`tui.*\`、\`cli.*\` 均可正常解析。

### 17.4 异步测试

使用 \`pytest-asyncio\`，异步测试函数需要标记：

\`\`\`python
import pytest

@pytest.mark.asyncio
async def test_agent_chat():
    ...
\`\`\`

---

## 18. 架构参考

### 18.1 整体架构图

\`\`\`
==========================================================
                    用户交互层
==========================================================
  CLI (Click)    TUI (Textual)    VSCode Extension
       |              |                   |
  AgentClient     AgentClient         REST / WS
  (aiohttp SSE)  (aiohttp SSE)          |
       |              |                   |
==========================================================
          FastAPI Sidecar Engine (v2.0)
==========================================================
  LifecycleManager (进程主控 + 信号处理 + 握手)
  WebSocketManager (事件总线 + 频道订阅 + 心跳)
  ----------------------------------------------------------
  API Routes (/api/v1/*)
    Agent | Chat | Code | Project | RAG
    Hardware | Serial | Flash | Debug
    Build | Terminal | System | Telemetry
    Session | Extensions | Workflow | Config
  ----------------------------------------------------------
  Services
    AgentLoop        — AI Agent 核心循环
      tools/         — 模块化工具包
        base.py      — 类型定义 (ToolDefinition, RiskLevel, ToolCategory, ToolSource)
        registry.py  — ToolRegistry 工具注册中心
        _helpers.py  — 共用工具函数
        builtin/     — 19 个内置工具 (10 个模块)
        llm/         — 8 个 LLM 提供商工具 (4 个模块)
      SensitiveGuard — 敏感操作守卫
      ContextManager — 对话上下文 (Token 窗口)
      WorkspaceManager — 工作区路径注入
      KnowledgeCache — 知识缓存 (LRU+TTL)
      StatusReporter — SSE 事件推送
      ErrorRecovery  — 错误自动恢复
    LLMService       — 多提供商 LLM 统一接口
    RAGService       — FAISS 向量检索
    ProjectService   — 工程管理
    CLIService       — 工具链调用
    FlashService     — 烧录管理
    SerialService    — 串口管理
    HardwareService  — 硬件检测
    TerminalService  — 安全命令执行
    ChatService      — 对话管理
    AICorrectionService — AI 代码修正
  ----------------------------------------------------------
  Skill 插件系统
    SkillManager     — 发现 + 懒加载
    SkillMatcher     — 匹配 (关键词 + 语义)
    STM32 Skill      — STM32 全栈能力
    ESP32 Skill      — ESP32 全栈能力
    (可扩展...)
  ----------------------------------------------------------
  Engines
    FusionEngine     — CubeMX 安全代码融合
    ConstraintEngine — 硬件约束检查
    StaticAnalyzer   — C 代码静态分析
    LogAnalyzer      — 日志根因分析
    HardwareFSM      — 状态机分析
    AIAnalyzer       — LLM 诊断引擎
    ProjectParser    — 工程结构解析
    IncrementalRAG   — 实时增量索引
  ----------------------------------------------------------
  Capture & Pipeline
    SerialCapture    — pyserial 串口
    FlashCapture     — st-flash/esptool
    OpenOCDCapture   — OpenOCD Telnet
    QEMUCapture      — QEMU 仿真
    AIDataFilter     — 数据过滤
    SmartSampler     — 智能采样
    PipelineManager  — 管线注册 + 全局缓冲
  ----------------------------------------------------------
  Core
    config.py        — Pydantic Settings 配置
    security.py      — 沙箱 + 命令过滤 + 速率限制
    bus.py           — WebSocket 频道管理
    lifecycle.py     — 状态机 + 子进程管理
    logging.py       — structlog 日志
    exceptions.py    — 统一异常体系
==========================================================
\`\`\`

### 18.2 数据流

1. **AI 对话**：用户消息 → AgentLoop → LLM 决策 → tools/registry → handler 执行 → 观察结果 → LLM 继续 → 最终回答
2. **知识检索**：Agent \`search_knowledge\` → KnowledgeCache → RAGService → FAISS 搜索 → 结果缓存
3. **硬件捕获**：DataCapture → CapturedData → AIDataFilter → SmartSampler → LLMContext → 分析引擎 → 诊断结果
4. **代码编辑**：Agent \`edit_file\`/\`write_file\` → EditProposal → SSE 推送 → 前端 Accept/Reject → 磁盘写入
5. **平台匹配**：用户消息 → SkillMatcher.match() → 关键词/语义/指纹 → 返回最佳 Skill → 加载 Handler

### 18.3 错误码体系

| 码段 | 分类 | 示例 |
|------|------|------|
| 1xxx | 通用 | SUCCESS, INVALID_PARAMETER, TIMEOUT |
| 2xxx | 工程 | NOT_FOUND, BUILD_FAILED, CLI_NOT_FOUND |
| 3xxx | 代码 | GENERATION_FAILED, PARSE_ERROR, FUSION_FAILED |
| 4xxx | 硬件 | NOT_CONNECTED, FLASH_FAILED, SERIAL_TIMEOUT |
| 5xxx | AI/LLM | API_ERROR, RATE_LIMITED, RAG_INDEX_ERROR |
| 6xxx | 验证 | CONSTRAINT_VIOLATION, PIN_CONFLICT, MISRA_VIOLATION |

### 18.4 API 响应格式

所有 API 返回统一格式：

\`\`\`json
{
  "code": 1000,
  "message": "success",
  "data": { ... },
  "request_id": "uuid",
  "timestamp": "2026-02-15T12:00:00Z"
}
\`\`\`

### 18.5 FastAPI 应用配置

| 项目 | 值 |
|------|-----|
| title | \`Emcoder Sidecar Engine\` |
| version | \`2.0.0\` |
| Swagger UI | \`/docs\` |
| ReDoc | \`/redoc\` |
| CORS | 全方法、全头部、credentials=true |

异常处理器：\`EmcoderException\` → JSON 错误响应、\`HTTPException\` 透传、通用 Exception → 500。

---

## 19. 故障排查

### 19.1 后端无法启动

**问题**：\`ModuleNotFoundError: No module named 'fastapi'\`

\`\`\`powershell
# 方案：安装依赖
pip install -r requirements.txt
\`\`\`

**问题**：\`Address already in use (端口被占用)\`

\`\`\`powershell
# 方案：自动分配端口
python run.py --port 0

# 或查找并终止占用进程
netstat -ano | findstr :8000
taskkill /PID <pid> /F
\`\`\`

### 19.2 CLI 连接后端失败

**问题**：\`Backend: Disconnected\`

\`\`\`
方案：
1. 确认后端已启动：curl http://127.0.0.1:8000/health
2. 使用 -b 指定正确地址：python -m cli -b http://127.0.0.1:8000 status
3. 检查防火墙是否阻止 8000 端口
4. 检查是否使用了不同端口启动后端
\`\`\`

### 19.3 LLM 调用失败

**问题**：\`LLM API Error\` / \`Rate Limited\` / \`Timeout\`

\`\`\`
方案：
1. 检查 .env 中的 API Key 是否填写正确
2. 检查网络连通性：curl https://dashscope.aliyuncs.com/compatible-mode/v1/models
3. 增加超时：LLM_TIMEOUT=300
4. 配置备选模型：LLM_FALLBACK_PROVIDER=deepseek
5. 本地部署：LLM_PROVIDER=ollama （无需 API Key）
6. 检查余额/配额是否耗尽
\`\`\`

### 19.4 RAG 搜索无结果

**问题**：知识库检索返回空

\`\`\`
方案：
1. 确认知识库文件存在：ls data/knowledge_base/
2. 检查索引状态：curl http://127.0.0.1:8000/api/v1/rag/stats
3. 首次使用需等待嵌入模型下载完成（~500MB）
4. 手动重载索引：curl -X POST http://127.0.0.1:8000/api/v1/rag/load
5. 查看日志判断嵌入模型是否正常加载
\`\`\`

### 19.5 串口无法打开

**问题**：\`Serial port permission denied\` / \`Port not found\`

\`\`\`
方案：
1. Windows：检查设备管理器中串口驱动是否正常安装
2. Linux：sudo usermod -aG dialout $USER 并重新登录
3. 确认无其他程序（如 Arduino IDE、PuTTY）占用该串口
4. 检查 USB 线缆连接
\`\`\`

### 19.6 烧录失败

**问题**：\`Flash failed\` / \`Programmer not found\`

\`\`\`
方案：
1. 安装对应烧录工具（STM32CubeProgrammer / esptool）
2. 在 .env 中配置工具路径（MCU_STM32_PROGRAMMER_PATH 等）
3. 检查调试器连接（ST-Link / USB）
4. 检查固件文件路径
5. 使用 Skill 检测工具链：curl http://127.0.0.1:8000/api/v1/hardware/toolchains
\`\`\`

### 19.7 embedding 模型下载慢

**问题**：\`sentence-transformers\` 模型下载超时

\`\`\`powershell
# 方案一：设置 Hugging Face 镜像
$env:HF_ENDPOINT = "https://hf-mirror.com"
python run.py

# 方案二：手动下载并放入缓存
# 下载 all-MiniLM-L6-v2 放入 ~/.cache/huggingface/

# 注意：下载失败时 RAG 会自动降级为哈希嵌入（精度降低但可用）
\`\`\`

### 19.8 TUI 显示异常

**问题**：TUI 界面乱码或布局错位

\`\`\`
方案：
1. 确认终端支持 UTF-8：chcp 65001
2. 使用 Windows Terminal 或其他现代终端
3. 确认 textual 版本 ≥ 0.85
4. 尝试调整终端窗口大小（建议 ≥ 120×30）
\`\`\`

### 19.9 Agent 超时

**问题**：\`Agent loop timeout\`

\`\`\`
方案：
1. 增加超时：AGENT_LOOP_TIMEOUT=600
2. 减少最大轮次：AGENT_MAX_ROUNDS=10
3. 简化请求（一次只做一件事）
4. 检查 LLM 响应速度（可能是 LLM 端慢）
\`\`\`

### 19.10 工程构建失败

**问题**：\`Build failed\` / \`Toolchain not found\`

\`\`\`
方案：
1. 检查工具链是否已安装：
   - STM32：arm-none-eabi-gcc --version
   - ESP32：idf.py --version
2. 检查 PATH 是否包含工具链路径
3. STM32：确认 CubeMX 已生成 Makefile
4. ESP32：确认已 source export.sh 设置 IDF 环境
5. 查看构建日志：curl http://127.0.0.1:8000/api/v1/logs/build/{project_id}
\`\`\`

---

## 20. 附录

### 20.1 文件结构速查

\`\`\`
EmcoderCLI/
└── backend/
    ├── run.py                  启动器
    ├── start_server.ps1        PowerShell 启动脚本
    ├── requirements.txt        Python 依赖
    ├── pytest.ini              测试配置
    ├── conftest.py             测试 fixture
    ├── .env                    环境配置（需自建）
    ├── app/
    │   ├── main.py             FastAPI 应用入口
    │   ├── core/
    │   │   ├── config.py       配置管理 (Pydantic Settings)
    │   │   ├── security.py     安全：沙箱/命令过滤/速率限制
    │   │   ├── bus.py          WebSocket 事件总线
    │   │   ├── lifecycle.py    生命周期管理
    │   │   ├── logging.py      日志
    │   │   ├── exceptions.py   异常定义
    │   │   └── utils.py        工具函数
    │   ├── api/
    │   │   ├── routes/         REST API 路由
    │   │   ├── ws_routes.py    WebSocket 路由
    │   │   └── compat.py       兼容路由 (/api/ 无 v1)
    │   ├── models/
    │   │   ├── schemas.py      API 数据模型
    │   │   └── edit_protocol.py  编辑协议模型
    │   ├── services/
    │   │   ├── agent/          Agent 系统
    │   │   │   ├── agent_loop.py       核心循环
    │   │   │   ├── sensitive_guard.py   敏感操作守卫
    │   │   │   ├── context_manager.py   上下文管理
    │   │   │   ├── workspace_manager.py 工作区管理
    │   │   │   ├── knowledge_cache.py   知识缓存
    │   │   │   ├── structured_output.py 输出解析
    │   │   │   ├── status_reporter.py   SSE 推送
    │   │   │   ├── error_recovery.py    错误恢复
    │   │   │   └── tools/              工具系统包
    │   │   │       ├── base.py           类型定义 (ToolDefinition, RiskLevel...)
    │   │   │       ├── registry.py       ToolRegistry + 单例
    │   │   │       ├── _helpers.py       共用工具函数
    │   │   │       ├── builtin/          内置工具 (10 模块, 19 工具)
    │   │   │       │   ├── knowledge.py    知识检索 & 代码生成
    │   │   │       │   ├── file_ops.py     读/写/编辑文件
    │   │   │       │   ├── workspace.py    扫描 & 搜索
    │   │   │       │   ├── project.py      创建/构建/检测
    │   │   │       │   ├── terminal.py     终端命令
    │   │   │       │   ├── hardware.py     烧录 & 外设
    │   │   │       │   ├── serial.py       串口监控 & 日志
    │   │   │       │   ├── debug.py        硬件检测 & 调试
    │   │   │       │   ├── emulation.py    QEMU 仿真
    │   │   │       │   └── interaction.py  用户确认
    │   │   │       └── llm/              LLM 提供商工具 (4 模块, 8 工具)
    │   │   │           ├── openai.py       搜索/文件/代码/图像
    │   │   │           ├── qwen.py         知识库/搜索
    │   │   │           ├── deepseek.py     搜索
    │   │   │           └── anthropic.py    电脑操作
    │   │   ├── llm/            LLM 调用
    │   │   ├── rag/            RAG 知识库
    │   │   ├── project/        工程管理
    │   │   ├── serial/         串口通信
    │   │   ├── flash/          烧录
    │   │   ├── hardware/       硬件管理
    │   │   ├── terminal/       终端命令
    │   │   ├── chat/           聊天
    │   │   ├── cli/            CLI 工具检测
    │   │   └── ai_correction/  AI 纠错
    │   ├── engines/
    │   │   ├── fusion/         代码融合
    │   │   ├── constraint/     约束检查
    │   │   ├── static_analyzer/ 静态分析
    │   │   ├── log_analyzer/   日志分析
    │   │   ├── hardware_fsm/   状态机分析
    │   │   ├── ai_analyzer/    AI 分析
    │   │   ├── project_parser/ 工程解析
    │   │   └── incremental_rag/ 增量 RAG
    │   ├── skills/
    │   │   ├── base.py         Skill 基类和模型
    │   │   ├── manager.py      SkillManager
    │   │   ├── matcher.py      SkillMatcher
    │   │   └── embedded/       内置 Skill (stm32, esp32)
    │   ├── capture/
    │   │   ├── base.py         捕获基类和数据模型
    │   │   ├── filter.py       AI 数据过滤器
    │   │   ├── sampler.py      智能采样器
    │   │   ├── serial/         串口捕获
    │   │   ├── flash/          烧录捕获
    │   │   ├── openocd/        调试捕获
    │   │   └── qemu/           仿真捕获
    │   └── pipeline/
    │       └── manager.py      管线管理器
    ├── cli/
    │   ├── __main__.py         CLI 入口
    │   └── main.py             Click 命令定义
    ├── tui/
    │   ├── app.py              Textual 主应用
    │   ├── widgets.py          UI 组件
    │   ├── client.py           SSE Agent 客户端
    │   ├── icons.py            ASCII 图标常量
    │   └── styles.py           TCSS 样式
    ├── data/
    │   ├── knowledge_base/     RAG 知识库文档
    │   ├── rag_index/          FAISS 向量索引
    │   └── workspace/          工程工作区
    ├── config/
    │   └── allowed_extensions.json  扩展白名单
    ├── tests/                  测试套件
    └── docs/                   文档
\`\`\`

### 20.2 环境变量速查表

| 前缀 | 配置组 | 示例 |
|------|--------|------|
| （无） | 服务核心 | \`HOST\`, \`PORT\`, \`DEBUG\`, \`LOG_LEVEL\` |
| \`LLM_\` | LLM 模型 | \`LLM_PROVIDER\`, \`LLM_API_KEY\`, \`LLM_MODEL_NAME\` |
| \`RAG_\` | 知识库 | \`RAG_VECTOR_STORE\`, \`RAG_DEFAULT_TOP_K\` |
| \`SKILL_\` | Skill 系统 | \`SKILL_ENABLE_SEMANTIC_MATCH\` |
| \`PROJECT_\` | 工程管理 | \`PROJECT_DEFAULT_PLATFORM\`, \`PROJECT_AUTO_BUILD\` |
| \`AGENT_\` | Agent 引擎 | \`AGENT_MAX_ROUNDS\`, \`AGENT_LOOP_TIMEOUT\` |
| \`SECURITY_\` | 安全 | \`SECURITY_REQUIRE_CONFIRMATION\` |
| \`MCU_\` | 工具链（弃用）| \`MCU_ARM_GCC_PATH\` |

### 20.3 常用 API 快速参考

\`\`\`powershell
# 健康检查
curl http://127.0.0.1:8000/health

# AI 聊天（非流式）
curl -X POST http://127.0.0.1:8000/api/v1/agent/chat \`
  -H "Content-Type: application/json" \`
  -d '{"message": "你好"}'

# 知识库搜索
curl -X POST http://127.0.0.1:8000/api/v1/rag/search \`
  -H "Content-Type: application/json" \`
  -d '{"query": "UART DMA", "top_k": 3}'

# 芯片信息
curl "http://127.0.0.1:8000/api/v1/hardware/chip-info?chip=STM32F407"

# 串口列表
curl http://127.0.0.1:8000/api/v1/serial/ports

# 工具列表
curl http://127.0.0.1:8000/api/v1/agent/tools
\`\`\`

### 20.4 版本历史

| 版本 | 日期 | 重大变更 |
|------|------|---------|
| v2.1.0 | 2026-02-20 | 工具系统模块化重构：拆分为 \`tools/\` 包（20 个文件），新增 ToolSource 枚举、LLM 提供商工具（8 个）、\`_helpers.py\` 共用函数，工具总数 19→27 |
| v2.0.0 | 2026-02 | Skill 插件系统、编辑协议、Agent 工具体系、TUI 重构 |
| v1.0.0 | — | 初始版本 |

---

*Emcoder CLI v2.1.0 — Embedded MCU Intelligent Development Sidecar Engine*
`,Br=`# Emcoder CLI v2.1 — User Manual (Step-by-Step Guide)

Embedded MCU Intelligent Development AI Agent System. Integrates AI Chat, Code Generation, Knowledge Retrieval, Serial Communication, Firmware Flashing, Hardware Debugging, and QEMU Simulation. Provides **CLI / TUI / REST API / WebSocket** four interaction modes.

> Last Updated: 2026-02-20

---

## Table of Contents

- [1. System Overview](#1-system-overview)
- [2. Installation and Environment Preparation](#2-installation-and-environment-preparation)
- [3. Configuration (Full Reference)](#3-configuration-full-reference)
- [4. Starting Backend Service](#4-starting-backend-service)
- [5. CLI Command Line Tool](#5-cli-command-line-tool)
- [6. TUI Terminal Interface](#6-tui-terminal-interface)
- [7. REST API Full Reference](#7-rest-api-full-reference)
- [8. WebSocket Endpoints](#8-websocket-endpoints)
- [9. AI Agent System](#9-ai-agent-system)
- [10. Skill Plugin System](#10-skill-plugin-system)
- [11. RAG Knowledge Base](#11-rag-knowledge-base)
- [12. Code Engine](#12-code-engine)
- [13. Hardware Functions](#13-hardware-functions)
- [14. Data Capture and Pipeline](#14-data-capture-and-pipeline)
- [15. Security Mechanisms](#15-security-mechanisms)
- [16. Edit Protocol](#16-edit-protocol)
- [17. Testing](#17-testing)
- [18. Architecture Reference](#18-architecture-reference)
- [19. Troubleshooting](#19-troubleshooting)
- [20. Appendix](#20-appendix)

---

## 1. System Overview

### 1.1 Positioning

Emcoder is an **AI Sidecar Service** for embedded MCU development. It runs as a backend engine and can be called by CLI, TUI, VSCode extensions, or any HTTP/WebSocket client.

### 1.2 Core Capabilities at a Glance

| Capability | Description |
|---|---|
| AI Chat | Multi-turn reasoning based on Agent Loop (Think → Act → Observe → Repeat), supporting 27 tool calls (19 built-in + 8 LLM providers) |
| Code Generation | Generate embedded C code complying with HAL/LL/ESP-IDF specifications |
| Knowledge Retrieval (RAG) | FAISS vector index + Incremental RAG, built-in STM32/ESP32 knowledge base |
| Skill Plugins | Extensible platform skill system, auto-discovery, lazy loading, keyword + semantic matching |
| Project Management | Create / Build / Parse CubeMX / ESP-IDF / Keil projects |
| Serial Communication | Port enumeration, monitoring, data sending/receiving, WebSocket passthrough |
| Firmware Flashing | Support STM32 (st-flash / STM32CubeProgrammer) and ESP32 (esptool) |
| Hardware Debugging | OpenOCD debug session, memory/register read/write, GDB commands |
| QEMU Simulation | Run firmware simulation without hardware, support execution/memory/interruption tracing |
| Static Analysis | MISRA C subset check, security audit, cyclomatic complexity measurement |
| Constraint Check | Pin conflict detection, electrical specification verification, resource limit check |
| Log Analysis | Embedded error pattern library + error chain tracing + root cause analysis |
| State Machine Analysis | Extract FSM from C code, detect deadlocks and unreachable states |
| Edit Protocol | Agent does not write directly to disk, generates EditProposal for frontend approval |
| Data Capture | Unified hardware data acquisition pipeline (filter + sample + AI context formatting) |
| Telemetry Monitoring | CPU/memory/build/crash reporting, WebSocket dashboard |

### 1.3 Supported MCU Platforms

| Platform | Chip Series | Skill ID |
|---|---|---|
| STM32 | F1, F4, F7, H7, L0, L4, G0, G4, U5 | \`stm32\` |
| ESP32 | ESP32, ESP32-S2, ESP32-S3, ESP32-C3, ESP32-C6, ESP32-H2 | \`esp32\` |

> The Skill system is extensible—adding a new platform only requires creating a new directory under \`app/skills/embedded/\`, no changes to the main framework needed.

### 1.4 Supported LLM Providers

| Provider | Default Model | API Compatible Protocol | Default Endpoint |
|---|---|---|---|
| Qwen (Tongyi Qianwen) | qwen-max | OpenAI Compatible | \`dashscope.aliyuncs.com/compatible-mode/v1\` |
| DeepSeek | deepseek-coder | OpenAI Compatible | \`api.deepseek.com/v1\` |
| OpenAI | gpt-4-turbo-preview | Native | \`api.openai.com/v1\` |
| Groq | llama2-70b-4096 | OpenAI Compatible | \`api.groq.com/openai/v1\` |
| Ollama (Local) | codellama | OpenAI Compatible | \`localhost:11434/v1\` |
| Anthropic | claude-3 | Native | — |

### 1.5 Three Interaction Modes

| Mode | Scenario | Start Command |
|---|---|---|
| CLI (Click) | Scripting, CI/CD, quick commands | \`python -m cli <command>\` |
| TUI (Textual) | Terminal interaction, headless environment | \`python -m cli tui\` |
| REST API + WebSocket | VSCode extension, Web frontend, third-party integration | \`python run.py\` |

---

## 2. Installation and Environment Preparation

### 2.1 System Requirements

| Item | Requirement |
|---|---|
| Python | 3.10 or higher |
| Operating System | Windows / macOS / Linux |
| Memory | Recommended 8 GB+ (RAG embedding model requires ~500 MB) |
| Disk | ~2 GB (including Python packages + model cache) |

### 2.2 Installation Steps

\`\`\`powershell
# 1. Clone repository
git clone <repo-url>
cd EmcoderCLI

# 2. Create virtual environment
python -m venv .venv

# Windows activate
.venv\\Scripts\\Activate.ps1

# Linux/macOS activate
# source .venv/bin/activate

# 3. Install dependencies
cd backend
pip install -r requirements.txt
\`\`\`

> **Tip**: On first run, the sentence-transformers embedding model (~500 MB) will download automatically.
> If download is slow, set Hugging Face mirror: \`$env:HF_ENDPOINT = "https://hf-mirror.com"\`

### 2.3 Core Dependencies at a Glance

| Category | Package |
|---|---|
| Web Framework | fastapi ≥0.104, uvicorn[standard] ≥0.24, pydantic ≥2.5, pydantic-settings ≥2.1, python-multipart, python-dotenv |
| LLM/AI | langchain ≥0.1, langchain-community, openai ≥1.3, httpx ≥0.25, tiktoken ≥0.5 |
| RAG Vector Retrieval | faiss-cpu ≥1.7.4, sentence-transformers ≥2.2.2, numpy ≥1.24 |
| C Code Parsing | pycparser ≥2.21 |
| Logging & Formatting | structlog ≥23.2, rich ≥13.7 |
| Async | aiofiles ≥23.2, anyio ≥4.0 |
| Utilities | tenacity ≥8.2, orjson ≥3.9, PyYAML ≥6.0.1, packaging ≥23.0 |
| Serial | pyserial ≥3.5 |
| CLI/TUI | click ≥8.1, textual ≥0.85, aiohttp ≥3.9 |
| System Monitoring | psutil ≥5.9 |
| Testing | pytest ≥7.4, pytest-asyncio ≥0.23, pytest-cov, black, ruff, mypy |

### 2.4 MCU Toolchain (Optional, install as needed)

Install external tools according to the target platform:

| Tool | Purpose | Download URL | Environment Variable |
|---|---|---|---|
| ARM GCC | STM32 Cross Compilation | developer.arm.com | \`MCU_ARM_GCC_PATH\` |
| STM32CubeMX | Project Generation | st.com | \`MCU_STM32CUBEMX_PATH\` |
| STM32CubeProgrammer | STM32 Flashing | st.com | \`MCU_STM32_PROGRAMMER_PATH\` |
| ESP-IDF | ESP32 Development Framework | docs.espressif.com | \`MCU_ESP_IDF_PATH\` |
| esptool | ESP32 Flashing | \`pip install esptool\` | \`MCU_ESPTOOL_PATH\` |
| OpenOCD | Debug Server | openocd.org | \`MCU_OPENOCD_PATH\` |
| QEMU (ARM) | Simulation | qemu.org | — |

> **Tip**: All tools are optional. Related functions will degrade gracefully if not installed. \`detect_cli()\` of the Skill system can automatically detect and report installation status.

---

## 3. Configuration (Full Reference)

### 3.1 Configuration File

Copy \`.env.example\` (if available) to \`.env\` and edit:

\`\`\`powershell
cd backend
copy .env.example .env   # or cp .env.example .env
\`\`\`

Configuration system is based on **Pydantic Settings**, supporting:
- Automatic loading of \`.env\` file
- Environment variable override (higher priority than \`.env\`)
- Nested separator \`__\` (e.g., \`LLM__TEMPERATURE=0.5\`)
- Automatic type validation

### 3.2 Full Configuration Items

#### 3.2.1 Service Core (Top-level Settings)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| \`APP_NAME\` | str | \`Emcoder\` | Application name |
| \`VERSION\` | str | \`0.1.0\` | Version number |
| \`DEBUG\` | bool | \`false\` | Debug mode |
| \`ENVIRONMENT\` | str | \`development\` | Running environment: \`development\` / \`testing\` / \`production\` |
| \`HOST\` | str | \`127.0.0.1\` | Listen address |
| \`PORT\` | int | \`8002\` | Listen port (range 1024-65535) |
| \`LOG_LEVEL\` | str | \`INFO\` | Log level: \`DEBUG\` / \`INFO\` / \`WARNING\` / \`ERROR\` / \`CRITICAL\` |
| \`LOG_FORMAT\` | str | \`text\` | Log format: \`text\` / \`json\` |
| \`LOG_FILE\` | str | None | Log file path (leave empty for console output only) |
| \`DATA_DIR\` | str | \`data\` | Data storage root directory |

#### 3.2.2 LLM Configuration (\`LLM_\` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| \`LLM_PROVIDER\` | str | \`qwen\` | Provider: \`openai\` / \`qwen\` / \`deepseek\` / \`anthropic\` / \`groq\` / \`ollama\` |
| \`LLM_API_KEY\` | str | None | API Key |
| \`LLM_API_BASE\` | str | Auto (per provider) | Custom API endpoint |
| \`LLM_MODEL_NAME\` | str | \`qwen-max\` | Main model |
| \`LLM_CODE_MODEL_NAME\` | str | Same as main model | Code generation specialized model |
| \`LLM_TEMPERATURE\` | float | \`0.7\` | Generation temperature (0.0 ~ 2.0) |
| \`LLM_MAX_TOKENS\` | int | \`4096\` | Max output tokens (100 ~ 32000) |
| \`LLM_TIMEOUT\` | int | \`180\` | Request timeout (seconds) |
| \`LLM_MAX_RETRIES\` | int | \`3\` | Failure retry count |
| \`LLM_FALLBACK_PROVIDER\` | str | None | Fallback provider |
| \`LLM_FALLBACK_MODEL\` | str | None | Fallback model |

**API Key Resolution Priority**:

\`\`\`
LLM_API_KEY > DASHSCOPE_API_KEY > OPENAI_API_KEY > DEEPSEEK_API_KEY
\`\`\`

**Provider Specific Configuration Examples**:

\`\`\`dotenv
# ── Qwen (Tongyi Qianwen) ──
DASHSCOPE_API_KEY=sk-xxx
LLM_PROVIDER=qwen
LLM_MODEL_NAME=qwen-plus

# ── DeepSeek ──
DEEPSEEK_API_KEY=sk-xxx
LLM_PROVIDER=deepseek
LLM_MODEL_NAME=deepseek-coder

# ── OpenAI ──
OPENAI_API_KEY=sk-xxx
LLM_PROVIDER=openai
LLM_MODEL_NAME=gpt-4-turbo-preview

# ── Groq ──
LLM_API_KEY=gsk_xxx
LLM_PROVIDER=groq
LLM_MODEL_NAME=llama2-70b-4096

# ── Ollama (Local, no API Key needed) ──
LLM_PROVIDER=ollama
LLM_MODEL_NAME=codellama
LLM_API_BASE=http://localhost:11434/v1

# ── Anthropic ──
LLM_API_KEY=sk-ant-xxx
LLM_PROVIDER=anthropic
LLM_MODEL_NAME=claude-3
\`\`\`

#### 3.2.3 RAG Knowledge Base (\`RAG_\` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| \`RAG_VECTOR_STORE\` | str | \`faiss\` | Vector storage engine: \`faiss\` / \`chroma\` |
| \`RAG_INDEX_PATH\` | str | \`data/rag_index\` | Index file path |
| \`RAG_EMBEDDING_MODEL\` | str | \`sentence-transformers/all-MiniLM-L6-v2\` | Embedding model |
| \`RAG_EMBEDDING_DIMENSION\` | int | \`384\` | Embedding vector dimension |
| \`RAG_DEFAULT_TOP_K\` | int | \`5\` | Default retrieval count |
| \`RAG_SIMILARITY_THRESHOLD\` | float | \`0.5\` | Similarity threshold (0.0 ~ 1.0) |
| \`RAG_KNOWLEDGE_BASE_PATH\` | str | \`data/knowledge_base\` | Knowledge base document directory |

#### 3.2.4 Skill System (\`SKILL_\` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| \`SKILL_EXTRA_SKILL_DIRS\` | list | \`[]\` | Extra Skill directories (JSON array format) |
| \`SKILL_USER_CONFIG_PATH\` | str | \`~/.emcoder/config.json\` | User Skill configuration override file |
| \`SKILL_ENABLE_SEMANTIC_MATCH\` | bool | \`false\` | Enable semantic matching (requires sentence-transformers) |

#### 3.2.5 Project Management (\`PROJECT_\` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| \`PROJECT_WORKSPACE_PATH\` | str | \`workspace\` | Project workspace root directory |
| \`PROJECT_TEMPLATE_PATH\` | str | \`data/templates\` | Project template directory |
| \`PROJECT_DEFAULT_PLATFORM\` | str | \`stm32\` | Default target platform |
| \`PROJECT_AUTO_BUILD\` | bool | \`false\` | Auto build after code generation |

#### 3.2.6 Agent Engine (\`AGENT_\` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| \`AGENT_MAX_ROUNDS\` | int | \`20\` | Max single chat loop rounds (1 ~ 100) |
| \`AGENT_MAX_CONSECUTIVE_ERRORS\` | int | \`3\` | Max consecutive errors before aborting (1 ~ 20) |
| \`AGENT_LOOP_TIMEOUT\` | int | \`300\` | Total timeout seconds (30 ~ 3600) |
| \`AGENT_MAX_CONCURRENT\` | int | \`5\` | Max concurrent Agents (1 ~ 50) |

#### 3.2.7 Security Configuration (\`SECURITY_\` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| \`SECURITY_ENABLE_FUSE_PROTECTION\` | bool | \`true\` | Protect chip fuse area |
| \`SECURITY_ENABLE_FLASH_LIMIT\` | bool | \`true\` | Limit flashing frequency |
| \`SECURITY_REQUIRE_CONFIRMATION\` | bool | \`true\` | Require user confirmation for high-risk operations |
| \`SECURITY_ENABLE_CODE_REVIEW\` | bool | \`true\` | Enable code security review |
| \`SECURITY_PROTECTED_REGIONS\` | list | \`["MX_", "SystemClock_Config", "Error_Handler"]\` | Protected code region prefixes |
| \`SECURITY_ALLOWED_ORIGINS\` | list | \`["http://localhost:*", "http://127.0.0.1:*", "vscode-webview://*"]\` | CORS whitelist |

#### 3.2.8 MCU Toolchain (\`MCU_\` prefix) — Deprecated

> **Note**: This configuration group is deprecated, platform toolchain paths have migrated to the Skill system. New code should use \`skill_manager.get_skill(platform).handler.detect_cli()\` to get tool information. Existing consumers can still use it until migration is complete.

| Environment Variable | Default Value | Description |
|---|---|---|
| \`MCU_STM32CUBEMX_PATH\` | None | STM32CubeMX path |
| \`MCU_STM32_PROGRAMMER_PATH\` | None | STM32CubeProgrammer CLI path |
| \`MCU_ARM_GCC_PATH\` | None | ARM GCC bin directory |
| \`MCU_ESP_IDF_PATH\` | None | ESP-IDF installation path |
| \`MCU_ESPTOOL_PATH\` | \`esptool.py\` | esptool path |
| \`MCU_OPENOCD_PATH\` | None | OpenOCD path |

### 3.3 Full \`.env\` Example

\`\`\`dotenv
# ─── Service Core ───
HOST=127.0.0.1
PORT=8000
DEBUG=false
ENVIRONMENT=development
LOG_LEVEL=INFO
LOG_FORMAT=text

# ─── LLM ───
LLM_PROVIDER=qwen
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LLM_MODEL_NAME=qwen-plus
LLM_TEMPERATURE=0.7
LLM_MAX_TOKENS=4096
LLM_TIMEOUT=180

# ─── RAG ───
RAG_VECTOR_STORE=faiss
RAG_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
RAG_DEFAULT_TOP_K=5

# ─── Skill ───
SKILL_ENABLE_SEMANTIC_MATCH=false

# ─── Project ───
PROJECT_DEFAULT_PLATFORM=stm32
PROJECT_AUTO_BUILD=false

# ─── Agent ───
AGENT_MAX_ROUNDS=20
AGENT_LOOP_TIMEOUT=300

# ─── Security ───
SECURITY_REQUIRE_CONFIRMATION=true
SECURITY_ENABLE_FUSE_PROTECTION=true
\`\`\`

---

## 4. Starting Backend Service

### 4.1 Method 1: Python Direct Start

\`\`\`powershell
cd backend
python run.py
\`\`\`

Defaults to \`http://127.0.0.1:8000\`. Terminal prints Banner:

\`\`\`
===========================================================
     EMCODER - Embedded MCU Intelligent Development Sidecar v2.0.0
===========================================================
 -> Starting Emcoder Sidecar Engine...
\`\`\`

#### All Startup Parameters

| Parameter | Type/Values | Default | Description |
|---|---|---|---|
| \`--mode\` | \`http\` / \`stdio\` / \`pipe\` | \`http\` | Startup mode |
| \`--host\` | str | \`127.0.0.1\` | Listen address |
| \`--port\` | int | \`8000\` | Listen port (\`0\` = auto assign) |
| \`--reload\` | flag | \`false\` | Hot reload (http dev mode only) |
| \`--workers\` | int | \`1\` | Worker processes (http only) |
| \`--log-level\` | \`debug\`/\`info\`/\`warning\`/\`error\` | \`info\` | Log level |
| \`--env\` | str | None | Specify \`.env\` file path |
| \`--workspace\` | str | None | Set VSCode workspace path |

#### Common Start Examples

\`\`\`powershell
# Specify port
python run.py --port 9000

# Auto assign free port
python run.py --port 0

# Dev hot reload mode
python run.py --reload

# Specify log level
python run.py --log-level debug

# Specify .env file
python run.py --env /path/to/.env

# Specify workspace
python run.py --workspace /path/to/project

# Sidecar mode (for VSCode extension)
python run.py --mode stdio
\`\`\`

#### Startup Mode Description

| Mode | Command | Behavior |
|---|---|---|
| **http** | \`python run.py\` | Standard dev mode, starts HTTP service, prints Banner, Swagger UI accessible via browser |
| **stdio** | \`python run.py --mode stdio\` | Pipe mode: logs to stderr, stdout reserved for IPC; fixed workers=1; used by VSCode Sidecar |
| **pipe** | \`python run.py --mode pipe\` | Named pipe mode: similar to stdio; fixed workers=1 |

### 4.2 Method 2: PowerShell Script Start

\`\`\`powershell
cd backend
.\\start_server.ps1
# Or specify mode and port
.\\start_server.ps1 http 9000
\`\`\`

The script automatically:
1. Checks \`DASHSCOPE_API_KEY\` env var, loads from \`.env\` if missing
2. Sets \`EMCODER_SIDECAR_MODE\` and \`EMCODER_PORT\` env vars
3. Finds Python by priority: \`D:\\Python312\` → \`D:\\Python311\` → \`python\` → \`python3\` → \`py\`
4. Checks if fastapi/uvicorn are installed, auto \`pip install -r requirements.txt\` if missing
5. Starts service

### 4.3 Verify Service Status

\`\`\`powershell
# Browser access API docs
start http://127.0.0.1:8000/docs       # Swagger UI
start http://127.0.0.1:8000/redoc      # ReDoc

# Health check
curl http://127.0.0.1:8000/health

# System status
curl http://127.0.0.1:8000/api/v1/system/status
\`\`\`

### 4.4 Handshake Magic Number (Sidecar Mode)

In stdio/pipe mode, backend prints a handshake JSON line to stdout upon readiness:

\`\`\`
EMCODER_READY:{"status":"ready","port":8000,"pid":1234,"mode":"stdio","version":"2.0.0","protocol":"jsonrpc-2.0"}
\`\`\`

VSCode extension confirms backend start by detecting \`EMCODER_READY:\` prefix.

### 4.5 Lifecycle Management

Backend uses \`LifecycleManager\` to manage process lifecycle:

| State | Meaning |
|---|---|
| \`created\` | Initialization complete |
| \`starting\` | Starting services |
| \`ready\` | All ready, accepting requests |
| \`stopping\` | Shutting down |
| \`stopped\` | Stopped |

Startup sequence: LifecycleManager.startup() → RAG Init → LLM Init → CLI Init → Project Init → mark_ready()

Shutdown: Execute all registered shutdown hooks (including RAG index saving) → Terminate child processes.

---

## 5. CLI Command Line Tool

### 5.1 Basic Usage

\`\`\`powershell
cd backend
python -m cli [OPTIONS] COMMAND [ARGS]
\`\`\`

> Defaults to launching TUI if no subcommand.

### 5.2 Global Options

| Option | Short | Default | Description |
|---|---|---|---|
| \`--backend\` | \`-b\` | \`http://127.0.0.1:8000\` | Backend service address |
| \`--verbose\` | \`-v\` | false | Verbose output |
| \`--help\` | | | Show help message |

### 5.3 Command Tree Overview

\`\`\`
emcoder
├── chat             AI Interactive Chat
├── tui              TUI Terminal Interface (Default)
├── serial           Serial Operations
│   ├── list           List available ports
│   ├── monitor        Monitor serial data
│   └── send           Send data
├── flash            Flashing Operations
│   ├── write          Write firmware
│   └── erase          Erase Flash
├── debug            Debug (OpenOCD)
│   └── start          Start debug server
├── simulate         Simulation (QEMU)
│   └── start          Start simulation
└── status           System Status
\`\`\`

### 5.4 chat — AI Chat

\`\`\`powershell
# Interactive mode (REPL)
python -m cli chat

# Single message mode
python -m cli chat -m "Help me write STM32F407 UART initialization code"
\`\`\`

| Parameter | Description |
|---|---|
| \`--message\` / \`-m\` | Optional. Execute directly with message, no interactive mode |

**Interactive Mode Operations**:
- Enter text then Enter → Chat with AI
- Enter \`/quit\` or \`/exit\` → Exit

**SSE Event Stream Handling**: CLI automatically handles these event types:

| Event Type | Display Behavior |
|---|---|
| \`token\` | Real-time stream output of AI response |
| \`thinking\` | Show thinking process |
| \`tool_call\` / \`tool_call_start\` | Show tool call info |
| \`tool_call_end\` | Show tool execution result |
| \`confirm_required\` | Interactive confirmation prompt |
| \`error\` | Show error message |
| \`done\` | End current turn |

### 5.5 tui — Terminal GUI

\`\`\`powershell
python -m cli tui
# Or run directly (defaults to TUI without subcommand)
python -m cli
\`\`\`

See [Section 6 TUI Terminal Interface](#6-tui-terminal-interface).

### 5.6 serial — Serial Operations

#### List Available Ports

\`\`\`powershell
python -m cli serial list
\`\`\`

Output Example:
\`\`\`
  COM4: USB Serial Device [USB\\VID_0483&PID_5740]
  COM3: Bluetooth Serial (COM3) [BTHENUM\\...]
\`\`\`

#### Monitor Serial

\`\`\`powershell
python -m cli serial monitor COM4
python -m cli serial monitor COM4 --baud 9600
python -m cli serial monitor COM4 --baud 115200 --encoding utf-8
\`\`\`

| Parameter | Default | Description |
|---|---|---|
| \`PORT\` (Positional) | Required | Serial port name (e.g. \`COM4\`, \`/dev/ttyUSB0\`) |
| \`--baud\` / \`-b\` | \`115200\` | Baud rate |
| \`--encoding\` / \`-e\` | \`utf-8\` | Character encoding |

Press \`Ctrl+C\` to stop monitoring.

#### Send Data

\`\`\`powershell
python -m cli serial send COM4 "AT\\r\\n"
python -m cli serial send COM4 "Hello" --baud 9600
\`\`\`

| Parameter | Default | Description |
|---|---|---|
| \`PORT\` (Positional) | Required | Serial port name |
| \`DATA\` (Positional) | Required | Content to send |
| \`--baud\` / \`-b\` | \`115200\` | Baud rate |

### 5.7 flash — Firmware Flashing

#### Write Firmware

\`\`\`powershell
# STM32 Flashing
python -m cli flash write firmware.bin
python -m cli flash write firmware.hex --platform stm32 --address 0x08000000

# ESP32 Flashing
python -m cli flash write firmware.bin --platform esp32 --port COM4 --address 0x10000
\`\`\`

| Parameter | Default | Description |
|---|---|---|
| \`FIRMWARE\` (Positional) | Required | Firmware file path |
| \`--platform\` / \`-p\` | \`stm32\` | Target platform: \`stm32\` / \`esp32\` |
| \`--port\` | None | Serial port (Required for ESP32) |
| \`--address\` / \`-a\` | Auto | Flashing address (STM32: \`0x08000000\`, ESP32: \`0x10000\`) |

#### Erase Flash

\`\`\`powershell
python -m cli flash erase
python -m cli flash erase --platform esp32 --port COM4
\`\`\`

### 5.8 debug — OpenOCD Debugging

\`\`\`powershell
python -m cli debug start
python -m cli debug start --interface interface/stlink.cfg --target target/stm32f4x.cfg
\`\`\`

| Parameter | Default | Description |
|---|---|---|
| \`--interface\` / \`-i\` | \`interface/stlink.cfg\` | OpenOCD interface config file |
| \`--target\` / \`-t\` | \`target/stm32f4x.cfg\` | OpenOCD target config file |

OpenOCD runs continuously after start, press \`Ctrl+C\` to stop.

### 5.9 simulate — QEMU Simulation

\`\`\`powershell
python -m cli simulate start firmware.elf
python -m cli simulate start firmware.elf --machine stm32f4-discovery --gdb-port 3333
\`\`\`

| Parameter | Default | Description |
|---|---|---|
| \`FIRMWARE\` (Positional) | Required | ELF firmware file |
| \`--machine\` / \`-m\` | \`stm32f4-discovery\` | QEMU machine type |
| \`--gdb-port\` | \`3333\` | GDB debug port |

### 5.10 status — System Status

\`\`\`powershell
python -m cli status
\`\`\`

Output Example:
\`\`\`
Backend: Connected (http://127.0.0.1:8000)
Serial Ports: 2 found
  COM4: USB Serial Device
  COM3: Bluetooth Serial
\`\`\`

---

## 6. TUI Terminal Interface

### 6.1 Launch

\`\`\`powershell
cd backend
python -m cli tui

# Specify backend address
python -m cli -b http://127.0.0.1:9000 tui
\`\`\`

### 6.2 Interface Layout

\`\`\`
+---------------------------------------------+
|  Emcoder CLI               Embedded AI Asst  |
+---------------------------------------------+
|  TOOLS: [+] Backend OK                       |
+----------+----------------------------------+
| Tool     | [System] 19:20:01                |
| Status   | Welcome to Emcoder CLI           |
|          | Type a message to start chatting.|
| Serial:--| Ctrl+Q quit  |  F1 help         |
| Flash: --|                                   |
| Debug: --| [You] 19:20:15                   |
| QEMU:  --|  Help me init UART               |
|          |                                   |
| Session: | [Emcoder] 19:20:18               |
|   --     |  Here is STM32F407 UART init...   |
|          |                                   |
+----------+----------------------------------+
|  > Type a message...            [Send]       |
+---------------------------------------------+
|  Ctrl+Q Quit | Ctrl+L Clear | F1 Help        |
+---------------------------------------------+
\`\`\`

**Components Description**:

| Component | Class Name | Description |
|---|---|---|
| Message Bubble | \`ChatMessageWidget\` | Single message, style by role |
| Message List | \`ChatView\` | Scrolling message container, auto-scroll to bottom |
| Input Box | \`ChatInput\` | Text input + Send button |
| Tool Bar | \`ToolStatusBar\` | Top tool status bar |
| Risk Dialog | \`RiskConfirmDialog\` | High-risk operation confirmation popup |

### 6.3 Shortcuts

| Shortcut | Function |
|---|---|
| \`Ctrl+Q\` | Quit application |
| \`Ctrl+L\` | Clear chat history |
| \`Ctrl+S\` | Toggle sidebar visibility |
| \`Ctrl+D\` | Toggle logs panel |
| \`F1\` | Show help info |
| \`Enter\` | Send message |

### 6.4 Chat Slash Commands

Enter commands starting with \`/\` in the input box:

| Command | Description |
|---|---|
| \`/help\` | Show available commands |
| \`/clear\` | Clear chat history |
| \`/status\` | Show backend connection status and session info |
| \`/connect\` | Reconnect to backend |
| \`/quit\` | Quit |

### 6.5 Message Roles and Styles

| Role Label | Icon | Description | Visual Feature |
|---|---|---|---|
| \`[You]\` | \`>\` | User message | Blue left border, right indent |
| \`[Emcoder]\` | \`<\` | AI response | Gray-blue left border, left indent |
| \`[System]\` | \`[*]\` | System message | Gray left border |
| \`[Tool]\` | \`/-\` | Tool call | Orange left border |

### 6.6 Sidebar Status Indicators

Sidebar displays real-time connection status of hardware tools:

| Status Item | ID | Description |
|---|---|---|
| Serial | \`status-serial\` | Serial connection status |
| Flash | \`status-flash\` | Flashing status |
| Debug | \`status-debug\` | Debugging status |
| QEMU | \`status-qemu\` | Simulation status |
| Session | \`session-info\` | Current session ID |

Tool Status Colors:

| Status | Color |
|---|---|
| connected | Green |
| disconnected | Red |
| running | Green |
| stopped | Gray |
| error | Red |
| flashing | Yellow |
| debugging | Cyan |
| simulating | Magenta |

### 6.7 Risk Confirmation Dialog

When AI Agent performs high-risk operations (e.g., flashing firmware, executing terminal commands), TUI pops up a confirmation dialog. Must click **Confirm** or **Cancel** to proceed.

### 6.8 TUI Client Connection

TUI uses \`AgentClient\` to communicate with backend Agent via SSE (Server-Sent Events):

| Configuration | Default Value |
|---|---|
| Backend Address | \`http://127.0.0.1:8000\` |
| Normal Request Timeout | 30 seconds |
| SSE Stream Timeout | 600 seconds |
| API Endpoint | \`POST /api/v1/agent/chat/stream\` |

Connection State: \`disconnected\` → \`connecting\` → \`connected\` / \`error\`

### 6.9 TUI Theme Palette

| Name | Hex Value | Purpose |
|---|---|---|
| bg_primary | \`#181b20\` | Main background |
| bg_secondary | \`#1e2228\` | Secondary background |
| bg_panel | \`#252a31\` | Panel |
| accent | \`#5b8def\` | Main accent (desaturated blue) |
| accent_dim | \`#3d5a80\` | Dim accent |
| text_primary | \`#d4d4d4\` | Primary text |
| text_secondary | \`#8b8b8b\` | Secondary text |
| success | \`#4caf7c\` | Soft green |
| warning | \`#d4a054\` | Soft orange |
| error | \`#cf6679\` | Soft red |
| border | \`#2e333a\` | Border |

> Design Style: Minimalist Business Tech, strictly NO emoji, pure ASCII icons.

---

## 7. REST API Full Reference

All API endpoints prefixed with \`/api/v1\`. Interactive docs: \`http://127.0.0.1:8000/docs\` (Swagger) or \`/redoc\` (ReDoc).

### 7.1 System and Health

| Method | Path | Description |
|---|---|---|
| GET | \`/health\` | Global health check (Top level) |
| GET | \`/\` | Root path info |
| GET | \`/api/v1/health\` | Comprehensive system health |
| GET | \`/api/v1/health/{component}\` | Single component health check |
| GET | \`/api/v1/system/status\` | System engine status |
| GET | \`/api/v1/system/bus/status\` | WebSocket event bus status |
| GET | \`/api/v1/system/update/check\` | Check for updates (Param: \`client_version\`) |
| GET | \`/api/v1/metrics\` | System metrics (CPU / Memory / Disk) |
| GET | \`/api/v1/metrics/prometheus\` | Prometheus format metrics |

### 7.2 Agent — AI Chat

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/agent/chat\` | Non-streaming chat |
| POST | \`/api/v1/agent/chat/stream\` | SSE Streaming chat |
| POST | \`/api/v1/agent/chat/stream/v2\` | SSE Streaming chat (v2) |
| POST | \`/api/v1/agent/confirm\` | Confirm / Reject sensitive operation |
| GET | \`/api/v1/agent/confirm/pending\` | List pending confirmations |
| GET | \`/api/v1/agent/tools\` | List available tools |
| POST | \`/api/v1/agent/workspace\` | Set workspace path |
| GET | \`/api/v1/agent/cache/stats\` | Knowledge cache stats |
| POST | \`/api/v1/agent/cache/clear\` | Clear knowledge cache |
| POST | \`/api/v1/agent/fix_terminal_error\` | Smart compilation error fix |
| WS | \`/api/v1/agent/code_completion\` | Code completion WebSocket |

#### Chat Request Body

\`\`\`json
{
  "message": "Help me write STM32 UART init",
  "session_id": "sess_xxxx",       // Optional, auto-generated if empty
  "workspace_path": "/path/to/dir", // Optional
  "platform": "stm32",             // Optional, read config default if empty
  "context": "Extra context info"   // Optional
}
\`\`\`

#### SSE Event Stream Format

\`\`\`
data: {"type": "session", "session_id": "sess_xxx"}

data: {"type": "thinking", "content": "Round 1 Reasoning — Analyzing user intent..."}

data: {"type": "tool_call", "tool": "search_knowledge", "args": {"query": "UART init"}}

data: {"type": "tool_call_end", "tool": "search_knowledge", "result": "..."}

data: {"type": "token", "content": "Here is"}

data: {"type": "text_done", "content": "Full response content..."}

data: {"type": "edit", "proposal": {"proposal_id": "xxx", "edits": [...]}}

data: {"type": "confirmation_required", "message": "About to execute flash_firmware..."}

data: {"type": "done"}
\`\`\`

### 7.3 Edit Protocol

| Method | Path | Description |
|---|---|---|
| GET | \`/api/v1/agent/edit/pending\` | Query pending edits |
| GET | \`/api/v1/agent/edit/{proposal_id}\` | Get edit details |
| POST | \`/api/v1/agent/edit/apply\` | Accept edit proposal |
| POST | \`/api/v1/agent/edit/reject\` | Reject edit proposal |

### 7.4 Session Management

| Method | Path | Description |
|---|---|---|
| GET | \`/api/v1/agent/sessions\` | List Agent sessions |
| GET | \`/api/v1/agent/sessions/{id}\` | Get session history |
| DELETE | \`/api/v1/agent/sessions/{id}\` | Delete session |
| GET | \`/api/v1/session/\` | List all sessions |
| POST | \`/api/v1/session/\` | Create new session |
| GET | \`/api/v1/session/{id}\` | Get session details |
| DELETE | \`/api/v1/session/{id}\` | Delete session |
| POST | \`/api/v1/session/{id}/restore\` | Restore deleted session |

### 7.5 Chat (Simple Mode)

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/chat/send\` | Send message (Non-Agent mode) |
| GET | \`/api/v1/chat/health\` | Chat service health |
| WS | \`/api/v1/chat/ws\` | Chat WebSocket |

### 7.6 Code Generation and Analysis

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/code/generate\` | AI Code Generation |
| POST | \`/api/v1/code/fuse\` | Code Fusion (Protect CubeMX areas) |
| POST | \`/api/v1/code/analyze\` | Code Structure Analysis |
| POST | \`/api/v1/code/patch\` | Generate / Apply Patches |
| POST | \`/api/v1/code/validate\` | Code Quality Validation |
| POST | \`/api/v1/code/format\` | Code Formatting |
| POST | \`/api/v1/completion\` | GhostText Inline Completion |

### 7.7 AI Intelligent Analysis

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/fusion\` | Code Fusion |
| POST | \`/api/v1/constraint-check\` | Hardware Constraint Check |
| POST | \`/api/v1/static-analyze\` | C Code Static Analysis |
| POST | \`/api/v1/log-analyze\` | Embedded Log Analysis |
| POST | \`/api/v1/fsm-analyze\` | State Machine Analysis |
| POST | \`/api/v1/smart-correct\` | Smart Correction |
| POST | \`/api/v1/explain\` | Code Explanation |
| POST | \`/api/v1/agent/analyze\` | AI Comprehensive Analysis |

### 7.8 Project Management

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/project/create\` | Create Project |
| GET | \`/api/v1/project/list\` | Project List |
| GET | \`/api/v1/project/{path}/info\` | Project Info |
| POST | \`/api/v1/project/{path}/build\` | Build Project |
| POST | \`/api/v1/project/{path}/config\` | Update Project Config |
| DELETE | \`/api/v1/project/{path}\` | Delete Project |
| GET | \`/api/v1/project/{path}/files\` | Project File List |
| GET | \`/api/v1/project/{path}/file\` | Read File Content |
| POST | \`/api/v1/project/{path}/file\` | Write File |
| DELETE | \`/api/v1/project/{path}/file\` | Delete File |
| POST | \`/api/v1/project/{path}/folder\` | Create Folder |
| POST | \`/api/v1/project/build\` | Unified Build Endpoint |
| GET | \`/api/v1/project/info\` | Project Info (GET) |
| POST | \`/api/v1/project/info\` | Project Info (POST) |
| POST | \`/api/v1/project/parse\` | Parse Project Structure |

### 7.9 RAG Knowledge Base

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/rag/search\` | Semantic Search |
| POST | \`/api/v1/rag/add\` | Add Single Document |
| POST | \`/api/v1/rag/add-batch\` | Batch Add |
| POST | \`/api/v1/rag/upload\` | Upload Document File |
| GET | \`/api/v1/rag/stats\` | Index Stats |
| POST | \`/api/v1/rag/save\` | Save Index to Disk |
| POST | \`/api/v1/rag/load\` | Load Index from Disk |
| DELETE | \`/api/v1/rag/clear\` | Clear Index |

#### Search Request Body

\`\`\`json
{
  "query": "STM32 UART DMA Send",
  "platform": "stm32",    // Optional, filter by platform
  "top_k": 5              // Return count
}
\`\`\`

### 7.10 Hardware

| Method | Path | Description |
|---|---|---|
| GET | \`/api/v1/hardware/status\` | Overall Hardware Status |
| GET | \`/api/v1/hardware/toolchains\` | Toolchain Installation Status |
| GET | \`/api/v1/hardware/detect\` | Detect Connected Hardware Devices |
| POST | \`/api/v1/hardware/reset/{port}\` | Reset Specified Port Device |
| GET | \`/api/v1/hardware/info/{port}\` | Device Detail Info |
| GET | \`/api/v1/hardware/chips\` | Supported Chips List |
| GET | \`/api/v1/hardware/chip-info\` | Chip Details (Param: \`chip\`) |
| GET | \`/api/v1/hardware/pin-info\` | Pin Mux Info (Param: \`chip\`, \`pin\`) |
| GET | \`/api/v1/hardware/register-info\` | Peripheral Register Info |
| GET | \`/api/v1/hardware/peripheral-map\` | Peripheral Address Map |
| GET | \`/api/v1/hardware/clock-tree\` | Clock Tree Config |
| GET | \`/api/v1/hardware/pinout/{chip_model}\` | Full Pin Mux Data |
| POST | \`/api/v1/hardware/validate_pinout\` | Pin Conflict Detection |

### 7.11 Serial

| Method | Path | Description |
|---|---|---|
| GET | \`/api/v1/serial/ports\` | List All Ports |
| POST | \`/api/v1/serial/connect\` | Connect Port |
| POST | \`/api/v1/serial/disconnect/{session_id}\` | Disconnect Session |
| POST | \`/api/v1/serial/disconnect\` | Disconnect Current |
| POST | \`/api/v1/serial/send/{session_id}\` | Send Data |
| POST | \`/api/v1/serial/send\` | Send Data (Default Session) |
| GET | \`/api/v1/serial/read/{session_id}\` | Read Data |
| WS | \`/api/v1/serial/tunnel/{session_id}\` | WebSocket Bidirectional Passthrough |
| GET | \`/api/v1/serial/ws/sessions\` | WS Session List |

#### Connection Request Body

\`\`\`json
{
  "port": "COM4",
  "baudrate": 115200,
  "databits": 8,
  "stopbits": 1,
  "parity": "none"
}
\`\`\`

### 7.12 Flashing

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/flash/\` | Flash Firmware |
| POST | \`/api/v1/flash/execute\` | Execute Flashing (Extended Interface) |
| GET | \`/api/v1/flash/progress/{task_id}\` | Flashing Progress Check |
| POST | \`/api/v1/flash/verify\` | Verify Firmware |
| POST | \`/api/v1/flash/erase\` | Erase Flash |
| GET | \`/api/v1/flash/detect-firmware\` | Detect Firmware File (GET) |
| POST | \`/api/v1/flash/detect-firmware\` | Detect Firmware File (POST) |
| POST | \`/api/v1/flash/safety-check\` | Safety Check |
| POST | \`/api/v1/flash/reset\` | Reset MCU |

### 7.13 Debugging

| Method | Path | Description |
|---|---|---|
| GET | \`/api/v1/debug/config\` | Generate Debug Config |
| GET | \`/api/v1/debug/supported_chips\` | Supported Debug Chips |
| GET | \`/api/v1/debug/probe\` | Detect Debug Probe |
| GET | \`/api/v1/debug/adapters\` | Debug Adapter List |
| GET | \`/api/v1/debug/probes\` | Scan All Probes |
| POST | \`/api/v1/debug/start\` | Start Debug Session |
| POST | \`/api/v1/debug/stop\` | Stop Debug Session |
| POST | \`/api/v1/debug/memory/read\` | Read Memory |
| POST | \`/api/v1/debug/memory/write\` | Write Memory |
| POST | \`/api/v1/debug/registers\` | Read Registers |
| POST | \`/api/v1/debug/peripheral/{name}\` | Read Peripheral Registers |
| POST | \`/api/v1/debug/evaluate\` | Evaluate GDB Expression |
| POST | \`/api/v1/debug/gdb\` | Raw GDB Command |

### 7.14 Build

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/build/run\` | Execute Build |
| GET | \`/api/v1/build/status\` | Build Status |
| GET | \`/api/v1/build/memory-usage\` | Firmware Memory Usage (GET) |
| POST | \`/api/v1/build/memory-usage\` | Firmware Memory Usage (POST) |

### 7.15 Terminal

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/terminal/execute\` | Execute Safe Terminal Command |
| GET | \`/api/v1/terminal/health\` | Terminal Service Status |

> Whitelisted Commands: \`make\`, \`cmake\`, \`ninja\`, \`idf.py\`, \`arm-none-eabi-*\`, \`gcc\`, \`python\`, \`git\`, \`echo\`, \`mkdir\`, \`cp\`, \`mv\`, \`ls\`, \`cat\`, \`head\`, \`tail\`, \`wc\`, \`sort\`, \`diff\`, \`pwd\`, \`cd\`, \`openocd\`, \`esptool\`, \`st-flash\`, \`JLinkExe\`, 55+ commands total.

### 7.16 Logging

| Method | Path | Description |
|---|---|---|
| GET | \`/api/v1/logs/\` | Get Logs (support by session / level / pagination) |
| GET | \`/api/v1/logs/serial/{session_id}\` | Serial Session Logs |
| GET | \`/api/v1/logs/build/{project_id}\` | Build Logs |
| DELETE | \`/api/v1/logs/\` | Clear All Logs |

### 7.17 Telemetry

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/telemetry/event\` | General Event Report |
| POST | \`/api/v1/telemetry/build\` | Build Result Report |
| POST | \`/api/v1/telemetry/crash\` | Crash Report |
| GET | \`/api/v1/telemetry/dashboard\` | Dashboard Data |
| GET | \`/api/v1/telemetry/builds/stats\` | Build Stats |
| GET | \`/api/v1/telemetry/features/usage\` | Feature Usage Ranking |
| GET | \`/api/v1/telemetry/crashes/recent\` | Recent Crashes List |

### 7.18 Config Hot Update

| Method | Path | Description |
|---|---|---|
| GET | \`/api/v1/config\` | Get Runtime Config |
| PATCH | \`/api/v1/config\` | Update Config at Runtime |
| GET | \`/api/v1/cache/stats\` | Cache Stats |
| POST | \`/api/v1/cache/clear\` | Clear Cache |

### 7.19 Workflow

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/workflow/execute\` | Execute Workflow |
| GET | \`/api/v1/workflow/status/{id}\` | Workflow Status |
| GET | \`/api/v1/workflow/templates\` | Workflow Template List |

### 7.20 Context Sync

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/context/update\` | Push IDE File Changes |
| POST | \`/api/v1/context/query\` | Context Semantic Search |

### 7.21 Extension Management

| Method | Path | Description |
|---|---|---|
| POST | \`/api/v1/extensions/query\` | Query Available Extensions |
| GET | \`/api/v1/extensions/allowed\` | Whitelisted Extensions |

Preset Whitelist: \`ms-vscode.cpptools\`, \`ms-python.python\`, \`marus25.cortex-debug\`, \`ms-vscode.cmake-tools\`.

### 7.22 Compatible Routes (\`/api/\` without v1)

For compatibility with frontend URL patterns, endpoints in following modules are also accessible under \`/api/\` (without \`/v1\`):

- hardware / hardware_extended / pinout
- serial / serial_ws
- flash / flash_extended
- debug_config / debug_extended / debug_session
- build_status
- completion_context

E.g.: \`/api/hardware/status\`, \`/api/serial/ports\`, \`/api/flash/execute\`, etc.

---

## 8. WebSocket Endpoints

| Path | Protocol | Description |
|---|---|---|
| \`/ws/{client_id}\` | JSON-RPC | Main Channel: chat / ping / channel subscription |
| \`/ws/inline-ai\` | JSON | Inline AI Completion (GhostText / Ctrl+K) |
| \`/ws/context\` | JSON | IDE Context Sync (File Change → Incremental RAG) |
| \`/ws/serial\` | JSON + Binary | Serial WebSocket (Compatible Entry) |
| \`/ws/serial/{connection_id}\` | Binary | Serial Bidirectional Binary Passthrough |
| \`/ws/debug/{session_id}\` | JSON | Debug Event Stream |
| \`/ws/dashboard\` | JSON | Dashboard Telemetry Push (Every 2s) |

### 8.1 Main WebSocket (\`/ws/{client_id}\`)

#### Message Format

\`\`\`json
// Client → Server
{"type": "ping"}
{"type": "chat", "messages": [{"role": "user", "content": "..."}]}

// Server → Client
{"type": "pong"}
{"type": "chat_chunk", "content": "..."}
{"type": "chat_done", "content": "Full Response"}
{"type": "error", "message": "Error Message"}
\`\`\`

#### Channel Subscription

\`\`\`json
// Subscribe
{"method": "channel/subscribe", "params": {"channel": "agent/stream"}}

// Unsubscribe
{"method": "channel/unsubscribe", "params": {"channel": "agent/stream"}}
\`\`\`

Available Channels:

| Channel | Purpose |
|---|---|
| \`dev/logs\` | Real-time Backend Logs |
| \`ide/context\` | IDE File Change Notification |
| \`agent/stream\` | AI Agent Generation Stream |
| \`hardware/serial\` | Serial Data Passthrough |
| \`hardware/plot\` | Waveform / Chart Data |
| \`debug/events\` | Debug Events (Breakpoint, Exception, etc.) |
| \`build/status\` | compilation Status Change |

### 8.2 Inline AI (\`/ws/inline-ai\`)

\`\`\`json
// Request
{"code": "void init_uart(", "cursor": 15, "intent": "complete", "file_uri": "main.c", "language": "c"}

// Response (Streaming)
{"op": "ins", "text": "UART_HandleTypeDef *huart) {\\n"}
{"op": "ins", "text": "  // ..."}
{"op": "done"}
// Or error
{"op": "error", "text": "LLM timeout"}
\`\`\`

### 8.3 IDE Context (\`/ws/context\`)

Supported Message Types:

| type | Description |
|---|---|
| \`file-changes\` | File Change Notification (Add / Modify / Delete) |
| \`context-query\` | Context Semantic Query |
| \`textDocument/didChange\` | LSP Style File Change (Triggers Incremental RAG) |
| \`textDocument/didOpen\` | File Open |
| \`textDocument/didClose\` | File Close |
| \`workspace/didChangeWorkspaceFolders\` | Workspace Change |
| \`ping\` | Heartbeat |

### 8.4 Debug WebSocket (\`/ws/debug/{session_id}\`)

\`\`\`json
// Client sends GDB command
{"command": "info breakpoints"}

// Server pushes
{"type": "console", "content": "..."}
{"type": "halted", "data": {"pc": "0x08001234", "reason": "breakpoint"}}
{"type": "running"}
{"type": "swo", "data": "SWO trace data..."}
{"type": "pong"}
{"type": "error", "message": "..."}
\`\`\`

### 8.5 Dashboard (\`/ws/dashboard\`)

\`\`\`json
// Server pushes every 2 seconds
{"type": "telemetry", "data": {"timestamp": "...", "cpu_percent": 15.2, "memory_used_mb": 512, ...}}

// Client
{"type": "ping"}
{"type": "subscribe"}
\`\`\`

### 8.6 Heartbeat Mechanism

- Server sends ping every **1.5 seconds**
- Client should reply \`{"method": "heartbeat/pong"}\`
- Connection closes and hardware resources released if no response for **3 seconds**

---

## 9. AI Agent System

### 9.1 Agent Loop Workflow

Emcoder's AI Chat is based on **Agent Loop** pattern, similar to autonomous decision cycle:

\`\`\`
User Message
   │
   ▼
┌─────────┐
│  Think   │ LLM analyzes intent, decides next step
└────┬────┘
     │
     ▼
┌─────────┐
│   Act    │ Choose and call tool (or answer directly)
└────┬────┘
     │
     ▼
┌─────────┐
│ Observe  │ Get tool execution result
└────┬────┘
     │
     ▼
┌─────────┐
│ Repeat?  │ Continue? (Max 20 rounds)
└────┬────┘
     │
     ▼
Final Answer → User
\`\`\`

### 9.2 Tool System Architecture

Tools are categorized by **source** into two major types, distinguished by \`ToolSource\` enum:

| Source | Description | Count |
|---|---|---|
| \`BUILTIN\` | Built-in tools — Execute locally, direct file/hardware/project operations | 19 |
| \`LLM\` | LLM Provider tools — Delegate to remote LLM execution (search, code execution, etc.) | 8 |

Tool definitions located in \`app/services/agent/tools/\` package, organized by function modules:

\`\`\`
tools/
├── base.py              Type definitions (ToolDefinition, ToolParam, RiskLevel, ToolCategory, ToolSource)
├── registry.py          ToolRegistry class + tool_registry singleton
├── _helpers.py          Shared tool functions
├── __init__.py          Unified entry + register_all_tools()
├── builtin/             Built-in tools (10 modules, 19 tools)
│   ├── knowledge.py       Knowledge retrieval & code generation
│   ├── file_ops.py        File read/write/edit
│   ├── workspace.py       Workspace scan & search
│   ├── project.py         Project create/build/detect
│   ├── terminal.py        Terminal commands
│   ├── hardware.py        Flash & peripherals
│   ├── serial.py          Serial monitor & logs
│   ├── debug.py           Hardware detect & debug control
│   ├── emulation.py       QEMU simulation control
│   └── interaction.py     User confirmation
└── llm/                 LLM Provider tools (4 modules, 8 tools)
    ├── openai.py          Search / File Search / Code Exec / Image Gen
    ├── qwen.py            Knowledge retrieve / Web search
    ├── deepseek.py        Web search
    └── anthropic.py       Computer use
\`\`\`

### 9.3 Built-in Tools (19)

| Tool Name | Module | Category | Risk Level | Description |
|---|---|---|---|---|
| \`search_knowledge\` | knowledge | KNOWLEDGE | LOW | Search embedded dev knowledge in RAG base |
| \`generate_code\` | knowledge | CODE | LOW | Call LLM to generate embedded C code |
| \`read_file\` | file_ops | FILE | LOW | Read workspace file (Sandbox + 5MB limit) |
| \`write_file\` | file_ops | FILE | MEDIUM | Create or overwrite file (Sandbox + 10MB limit) |
| \`edit_file\` | file_ops | FILE | MEDIUM | Find and replace/modify partial file content |
| \`scan_workspace\` | workspace | WORKSPACE | LOW | Scan workspace directory structure (Max 200 files) |
| \`search_in_project\` | workspace | WORKSPACE | LOW | Search text content in project files |
| \`create_project\` | project | PROJECT | MEDIUM | Create STM32 / ESP32 project |
| \`build_project\` | project | PROJECT | MEDIUM | Build project (debug / release) |
| \`detect_platform\` | project | PROJECT | LOW | Auto detect target platform from context |
| \`run_command\` | terminal | TERMINAL | **CRITICAL** | Execute terminal command (Confirm required) |
| \`flash_firmware\` | hardware | HARDWARE | **CRITICAL** | Flash firmware to hardware (Confirm required) |
| \`get_peripheral_info\` | hardware | HARDWARE | LOW | Query peripheral configuration info |
| \`serial_monitor\` | serial | HARDWARE | MEDIUM | Serial monitor — connect / stop / view status |
| \`get_serial_log\` | serial | HARDWARE | LOW | Get serial logs processed by Filter+Sampler |
| \`detect_hardware\` | debug | HARDWARE | LOW | Auto detect serial ports, debug probes, board types |
| \`debug_control\` | debug | HARDWARE | **CRITICAL** | OpenOCD debug — start/stop/halt/step/read registers/breakpoints |
| \`emulation_control\` | emulation | HARDWARE | MEDIUM | QEMU simulation — start/stop/get output |
| \`request_confirmation\` | interaction | WORKSPACE | LOW | Initiate confirmation request to user |

### 9.4 LLM Provider Tools (8)

LLM tool names are prefixed with **provider prefix** (e.g., \`openai_\`, \`qwen_\`) to avoid cross-provider naming conflicts. These tools are delegated to the corresponding provider's API via \`LLMService.call_llm_tool()\`.

| Tool Name | Provider | Category | Risk Level | Description |
|---|---|---|---|---|
| \`openai_web_search\` | OpenAI | KNOWLEDGE | LOW | Web search using OpenAI Responses API |
| \`openai_file_search\` | OpenAI | KNOWLEDGE | LOW | Search file content in OpenAI vector store |
| \`openai_code_interpreter\` | OpenAI | CODE | MEDIUM | Execute Python code in OpenAI isolated sandbox |
| \`openai_image_generation\` | OpenAI | CODE | LOW | Generate images using DALL-E |
| \`qwen_knowledge_retrieve\` | Qwen | KNOWLEDGE | LOW | Retrieve info from Bailian knowledge base |
| \`qwen_enable_search\` | Qwen | KNOWLEDGE | LOW | Enable Qwen web search |
| \`deepseek_enable_search\` | DeepSeek | KNOWLEDGE | LOW | Enable DeepSeek model web search |
| \`anthropic_computer_use\` | Anthropic | TERMINAL | **CRITICAL** | Use Claude to control mouse/keyboard for screen interaction |

#### Key Built-in Tool Parameter Details

**search_knowledge**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`query\` | str | Yes | — | Search keyword |
| \`platform\` | str | No | Config default | Platform filter |
| \`top_k\` | int | No | \`3\` | Return count |

**generate_code**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`requirement\` | str | Yes | — | Requirement description |
| \`platform\` | str | No | Config default | Target platform |
| \`peripherals\` | str | No | — | Peripheral list |
| \`context\` | str | No | — | Extra context |

**run_command**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`command\` | str | Yes | — | Command to execute |
| \`working_dir\` | str | No | — | Working directory |
| \`timeout\` | int | No | \`60\` | Timeout seconds (5 ~ 300) |

**flash_firmware**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`firmware_path\` | str | Yes | — | Firmware file path |
| \`target\` | str | No | Config default | Target platform |
| \`port\` | str | No | — | Serial port |
| \`interface\` | str | No | \`swd\` | Interface type: \`swd\` / \`jtag\` / \`uart\` |

**serial_monitor**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`action\` | str | Yes | — | Action type: \`start\` / \`stop\` / \`status\` |
| \`port\` | str | No | — | Serial port (required for start) |
| \`baudrate\` | int | No | \`115200\` | Baud rate |
| \`session_id\` | str | No | — | Session ID (required for stop) |

**get_serial_log**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`count\` | int | No | \`30\` | Log entry count (1 ~ 200) |
| \`errors_only\` | bool | No | \`false\` | Return only error/critical level |

**debug_control**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`action\` | str | Yes | — | Action: \`start\` / \`stop\` / \`halt\` / \`resume\` / \`step\` / \`reset\` / \`read_registers\` / \`read_memory\` / \`set_breakpoint\` / \`remove_breakpoint\` / \`list_sessions\` / \`history\` |
| \`session_id\` | str | No | — | Debug session ID |
| \`interface_cfg\` | str | No | \`interface/stlink.cfg\` | OpenOCD interface config file |
| \`target_cfg\` | str | No | \`target/stm32f1x.cfg\` | OpenOCD target chip config |
| \`address\` | str | No | — | Memory/breakpoint address (0x...) |
| \`size\` | int | No | \`256\` | Memory read bytes |

**emulation_control**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`action\` | str | Yes | — | Action: \`start\` / \`stop\` / \`output\` / \`list_sessions\` |
| \`session_id\` | str | No | — | Simulation session ID |
| \`firmware\` | str | No | — | Firmware ELF file path (required for start) |
| \`machine\` | str | No | \`stm32f4-discovery\` | QEMU machine type |

**search_in_project**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| \`query\` | str | Yes | — | Search keyword |
| \`file_pattern\` | str | No | \`*.c,*.h\` | File name pattern |
| \`project_path\` | str | No | — | Project path |
| \`max_results\` | int | No | \`20\` | Max results |

### 9.5 Sensitive Operation Interception

The following operations trigger user confirmation requests:

1. Tool calls with **Risk Level ≥ CRITICAL** (\`run_command\`, \`flash_firmware\`, \`debug_control\`, \`anthropic_computer_use\`)
2. **Terminal Command Keyword Matching**: \`rm -rf\`, \`flash\`, \`sudo\`, \`mkfs\`, \`dd\`, \`format\`, \`reboot\`, \`shutdown\`, \`kill\`, \`chmod 777\`, \`curl | sh\`, \`wget | sh\`, \`erase\`
3. **All Flashing Operations**

Confirmation window auto-rejects after **300 seconds** timeout.

### 9.6 Context Management

| Parameter | Value |
|---|---|
| Max Token Window | 12,000 tokens |
| History Retention | 8,000 tokens |
| Auto Summary | LLM assisted compression when history > 20 rounds |
| Session TTL | 4 Hours |
| Knowledge Cache | LRU + TTL, reduce repetitive RAG retrieval |

### 9.7 Error Recovery Strategy

Auto recovery when Agent tool execution fails:

1. **Retry**: Exponential backoff retry
2. **Degrade**: Reduce parameters, skip non-essential steps
3. **LLM Re-plan**: Let AI decide again
4. **Give Up**: Report error to user

### 9.8 Security Features

- **Rate Limit**: Agent call 30/min, Tool call 100/min
- **Concurrency Limit**: Max 5 concurrent Agents (\`asyncio.Semaphore\`)
- **Overall Timeout**: Default 300 seconds
- **Schema Validation**: Auto validation of all tool parameters
- **Sensitive Command Interception**: \`SensitiveGuard\` module
- **Audit Log**: Ring buffer, max 10,000 entries

### 9.9 Agent Sub-modules

| Module | File | Responsibility |
|---|---|---|
| Core Loop | \`agent_loop.py\` | Think → Act → Observe Loop |
| Tool System | \`tools/\` | Modular toolkit — types, registry, 19 built-in + 8 LLM tools |
| Sensitive Guard | \`sensitive_guard.py\` | Command Interception + Confirmation Generation |
| Context Manager | \`context_manager.py\` | Token Window + Auto Summary |
| Workspace Manager | \`workspace_manager.py\` | Path Injection + Sandbox |
| Knowledge Cache | \`knowledge_cache.py\` | LRU + TTL Cache |
| Output Parsing | \`structured_output.py\` | System Prompt + Output Parsing |
| Status Reporter | \`status_reporter.py\` | SSE Event Push |
| Error Recovery | \`error_recovery.py\` | Auto Retry + Degrade |

---

## 10. Skill Plugin System

### 10.1 Overview

Skill System is Emcoder's **Platform Extension Layer**, encapsulating platform-specific capabilities (e.g., STM32 project creation, ESP32 flashing) as pluggable Skill plugins.

**Architecture**: \`SkillManager\` (Discovery + Loading) → \`SkillMatcher\` (Matching) → \`BaseSkillHandler\` (Execution)

**Core Design Principles**:
- Zero Hardcoding: Agent tool layer gets platform info dynamically via Skill
- Lazy Loading: Only reads \`meta.json\` at startup, dynamically imports Handler on first use
- Extensible: Adding new platform only requires adding a directory, no framework code change

### 10.2 Directory Structure

\`\`\`
app/skills/
├── __init__.py          # Exports skill_manager, skill_matcher
├── base.py              # SkillMeta, SkillResult, CLIInfo, BaseSkillHandler, Skill
├── manager.py           # SkillManager (Singleton, Lazy Load)
├── matcher.py           # SkillMatcher (Keyword + Semantic Match)
└── embedded/            # domain = "embedded"
    ├── stm32/           # platform = "stm32"
    │   ├── meta.json      # Metadata (29 Keywords, 4 CLI Tools)
    │   ├── skill.py       # SkillHandler Implementation
    │   ├── prompt.tpl     # Jinja2 System Prompt Template
    │   └── resources/     # Chip DB, Pin Mappings, etc.
    └── esp32/           # platform = "esp32"
        ├── meta.json      # Metadata (31 Keywords, 2 CLI Tools)
        ├── skill.py       # SkillHandler Implementation
        └── prompt.tpl     # Jinja2 System Prompt Template
\`\`\`

### 10.3 Skill Data Model

#### SkillMeta (Metadata)

Loaded from \`meta.json\`:

| Field | Type | Description |
|---|---|---|
| \`skill_id\` | str | Unique ID (e.g. \`"stm32"\`) |
| \`name\` | str | Display Name |
| \`description\` | str | Description |
| \`keywords\` | list[str] | Matching Keywords |
| \`domain\` | str | Domain (e.g. \`"embedded"\`) |
| \`skill_type\` | str | Type (e.g. \`"mcu"\`) |
| \`similarity_threshold\` | float | Semantic match threshold (default 0.7) |
| \`cli_tools\` | list[dict] | Required external CLI tools |
| \`extra_parameters\` | dict | Extra parameters definition |
| \`default_config\` | dict | Default configuration values |

#### SkillResult (Execution Result)

| Field | Type | Description |
|---|---|---|
| \`success\` | bool | Success or not |
| \`data\` | Any | Result Data |
| \`error\` | Optional[str] | Error Message |

#### CLIInfo (External Tool Info)

| Field | Type | Description |
|---|---|---|
| \`name\` | str | Tool Name |
| \`available\` | bool | Available or not |
| \`path\` | Optional[str] | Path |
| \`version\` | Optional[str] | Version |
| \`download_url\` | str | Download URL |
| \`install_guide\` | str | Installation Guide |
| \`required\` | bool | Required or not |

### 10.4 BaseSkillHandler (Interface)

All Skills must implement \`BaseSkillHandler\` abstract base class:

| Method | Must Implement | Return Type | Description |
|---|---|---|---|
| \`detect_cli()\` | **Yes** | \`List[CLIInfo]\` | Detect required CLI tools for platform |
| \`create_project()\` | No | \`SkillResult\` | Create Project |
| \`identify_project()\` | No | \`float\` | Project ID confidence (0.0 ~ 1.0) |
| \`get_project_context()\` | No | \`dict\` | Get Project Context |
| \`build_project()\` | No | \`SkillResult\` | Build Project |
| \`deploy()\` | No | \`SkillResult\` | Deploy / Flash |
| \`get_peripheral_info()\` | No | \`Optional[dict]\` | Query Peripheral Info |
| \`get_extra_tools()\` | No | \`list\` | Register extra Agent tools |

**Configuration Priority** (High → Low):
1. User Config File (\`~/.emcoder/config.json\`)
2. Environment Variables (\`SKILL_<ID>_<KEY>\`)
3. \`default_config\` in \`meta.json\`

### 10.5 SkillManager

Singleton, responsible for Skill discovery and loading:

\`\`\`python
from app.skills import skill_manager

# Load all Skills (Reads meta.json, does not load handler)
skill_manager.load_all_skills()

# Get specific Skill
skill = skill_manager.get_skill("stm32")

# Get all available platforms
platforms = skill_manager.get_available_platforms()  # ["stm32", "esp32"]

# Query by domain
embedded = skill_manager.get_skills_by_domain("embedded")

# Query by type
mcus = skill_manager.get_skills_by_type("mcu")
\`\`\`

### 10.6 SkillMatcher

Responsible for automatically matching user input to the correct Skill:

\`\`\`python
from app.skills import skill_matcher

# Keyword Match
results = skill_matcher.match("Help me config STM32F407 GPIO")
# → [MatchResult(skill=stm32_skill, score=0.85, match_type="keyword")]

# Platform Detection
platform = await skill_matcher.detect_platform("This ESP32 project...")
# → "esp32"

# Project Identification
skill_id = await skill_matcher.identify_project("/path/to/project")
# → "stm32" (Based on dir features)
\`\`\`

**Match Priority**:
1. \`platform_hint\` — Explicitly specified platform
2. \`keyword\` — Keyword hit
3. \`semantic\` — Semantic similarity (Requires \`SKILL_ENABLE_SEMANTIC_MATCH\`)
4. \`project_fingerprint\` — Project file characteristics

### 10.7 Built-in Skill: STM32

**Skill ID**: \`stm32\` | **Keywords**: 29

Default Config:
| Parameter | Value | Description |
|---|---|---|
| \`default_mcu\` | \`STM32F103C8Tx\` | Default Chip |
| \`default_family\` | \`STM32F1\` | Default Family |
| \`default_core\` | \`cortex-m3\` | Default Core |
| \`flash_size_kb\` | \`64\` | Flash Size |
| \`ram_size_kb\` | \`20\` | RAM Size |
| \`system_clock_hz\` | \`72000000\` | System Clock |
| \`hse_value_hz\` | \`8000000\` | HSE Frequency |

Required CLI Tools: ARM GCC (Required), STM32CubeMX, OpenOCD, st-flash

### 10.8 Built-in Skill: ESP32

**Skill ID**: \`esp32\` | **Keywords**: 31

Default Config:
| Parameter | Value | Description |
|---|---|---|
| \`target\` | \`esp32\` | Target Chip |
| \`flash_size\` | \`4MB\` | Flash Size |
| \`baud_rate\` | \`115200\` | Serial Baud Rate |
| \`led_gpio\` | \`2\` | LED GPIO |
| \`blink_period_ms\` | \`500\` | Blink Period |
| \`freertos_hz\` | \`1000\` | FreeRTOS Tick Frequency |
| \`build_timeout\` | \`180\` | Build Timeout Seconds |
| \`flash_timeout\` | \`60\` | Flash Timeout Seconds |

Required CLI Tools: \`idf.py\` (Required), \`esptool.py\`

Project ID Markers: \`sdkconfig\` (0.90), \`sdkconfig.defaults\` (0.85), \`main/CMakeLists.txt\` + \`idf_component_register\` (0.90)

### 10.9 Adding Custom Skill

1. Create directory under \`app/skills/\`: \`<domain>/<platform>/\`
2. Create \`meta.json\` (Refer to STM32/ESP32 format)
3. Create \`skill.py\`, export \`SkillHandler(BaseSkillHandler)\` class
4. Optional: Create \`prompt.tpl\` Jinja2 template
5. Restart backend, \`SkillManager\` auto-discovers

Or configure extra search path via \`SKILL_EXTRA_SKILL_DIRS\`.

---

## 11. RAG Knowledge Base

### 11.1 Built-in Knowledge Base

Located in \`data/knowledge_base/\`:

\`\`\`
knowledge_base/
├── common/              General Embedded Dev Knowledge
│   └── best_practices.md
├── stm32/               STM32 Platform Specific
│   ├── gpio_guide.md
│   ├── timer_pwm_guide.md
│   └── uart_guide.md
└── esp32/               ESP32 Platform Specific (TBD)
\`\`\`

### 11.2 Adding Custom Knowledge

#### Method 1: Place Files

Put \`.md\` / \`.txt\` / \`.json\` files into \`data/knowledge_base/\` subdirectories. Auto-loads after backend restart.

#### Method 2: API Upload

\`\`\`powershell
# Single document
curl -X POST http://127.0.0.1:8000/api/v1/rag/add \`
  -H "Content-Type: application/json" \`
  -d '{"content": "STM32 DMA Guide...", "source": "custom", "platform": "stm32"}'

# Upload file
curl -X POST http://127.0.0.1:8000/api/v1/rag/upload \`
  -F "file=@my_guide.md"

# Batch add
curl -X POST http://127.0.0.1:8000/api/v1/rag/add-batch \`
  -H "Content-Type: application/json" \`
  -d '{"documents": [...]}'
\`\`\`

### 11.3 Search Knowledge

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/rag/search \`
  -H "Content-Type: application/json" \`
  -d '{"query": "STM32 I2C Multi-slave Comm", "platform": "stm32", "top_k": 5}'
\`\`\`

### 11.4 Index Management

\`\`\`powershell
# View Stats
curl http://127.0.0.1:8000/api/v1/rag/stats

# Save Index to Disk
curl -X POST http://127.0.0.1:8000/api/v1/rag/save

# Load Index from Disk
curl -X POST http://127.0.0.1:8000/api/v1/rag/load

# Clear Index (Danger)
curl -X DELETE http://127.0.0.1:8000/api/v1/rag/clear
\`\`\`

### 11.5 Incremental RAG

Backend receives IDE file change events (\`textDocument/didChange\`) via WebSocket \`/ws/context\`. After **500ms debounce**:
1. Slice changed C code files by **Function/Struct/Macro level**
2. Incrementally update FAISS vector index
3. Subsequent Agent calls to \`search_knowledge\` can hit latest code

### 11.6 Document Source Types

| Source | Description |
|---|---|
| \`datasheet\` | Chip Datasheet |
| \`reference_manual\` | Reference Manual |
| \`application_note\` | Application Note |
| \`example_code\` | Example Code |
| \`best_practice\` | Best Practice |
| \`faq\` | Frequently Asked Questions |

---

## 12. Code Engine

### 12.1 Code Fusion Engine (Fusion)

Protects CubeMX generated code areas, safely merges AI generated code.

**Identified and Protected Regions**:
- Code between \`/* USER CODE BEGIN xxx */\` and \`/* USER CODE END xxx */\`
- Initialization functions with \`MX_\` prefix
- Key functions like \`SystemClock_Config\`, \`Error_Handler\`

**Fusion Strategy**:

| Strategy | Description |
|---|---|
| \`preserve_user\` | Prefer preserving user code |
| \`merge_smart\` | Smart merge |
| \`overwrite\` | Direct overwrite |

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/code/fuse \`
  -H "Content-Type: application/json" \`
  -d '{"original_code": "...", "new_code": "...", "strategy": "preserve_user"}'
\`\`\`

### 12.2 Static Analysis Engine

**Checks**:
- Dangerous function usage (\`strcpy\` → \`strncpy\`)
- Null pointer dereference
- Uninitialized variables
- Format string vulnerabilities
- Integer overflow risks
- Memory leak detection
- Interrupt safety check
- Hardware access spec
- MISRA C rule subset
- Cyclomatic complexity / Nesting depth measurement

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/static-analyze \`
  -H "Content-Type: application/json" \`
  -d '{"code": "void foo() { char *p = malloc(100); strcpy(p, input); }"}'
\`\`\`

### 12.3 Constraint Check Engine

**Detection Content**:
- Pin mux conflict (Same pin used by multiple peripherals)
- Electrical spec violation
- Resource limits (Memory / Peripheral / DMA channels insufficient)
- Peripheral mutex detection

Supported Chip Spec DB: STM32F103C8, STM32F407, ESP32 (Full pin mux table).

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/constraint-check \`
  -H "Content-Type: application/json" \`
  -d '{"code": "...", "chip": "STM32F407"}'
\`\`\`

### 12.4 Log Analysis Engine

**Built-in Error Pattern Library**:

| Category | Pattern |
|---|---|
| ARM Exceptions | HardFault, MemManage, BusFault, UsageFault |
| Memory Issues | Stack overflow, Heap corruption, Memory leak |
| Comm Errors | UART overrun, SPI timeout, I2C NACK |
| Timing Issues | Watchdog timeout, RTC drift |
| Resource Exhaustion | Task stack overflow, Queue full |
| ESP32 Specific | Guru Meditation, Brownout, Flash Encryption Fail |

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/log-analyze \`
  -H "Content-Type: application/json" \`
  -d '{"logs": "Hard Fault at PC=0x08001234\\nStack: 0x20005678..."}'
\`\`\`

### 12.5 State Machine Analysis Engine

Extract state machine from C code and analyze:
- Extract states from \`enum\` / \`#define\`
- Extract transitions from \`switch-case\` / \`if-else\`
- Deadlock detection
- Unreachable state detection
- State coverage analysis

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/fsm-analyze \`
  -H "Content-Type: application/json" \`
  -d '{"code": "typedef enum { IDLE, RUNNING, ERROR } State_t; ..."}'
\`\`\`

### 12.6 AI Analysis Engine

General LLM Diagnostic Engine, supports multiple analysis types (\`AnalysisType\`):
- Error Diagnosis
- Performance Analysis
- Memory Analysis

### 12.7 Project Parsing Engine

Supported Project Formats:
- **STM32CubeMX**: \`.ioc\` + CubeMX structure
- **Keil uVision**: \`.uvprojx\`
- **ESP-IDF**: \`CMakeLists.txt\` + \`sdkconfig\`

Auto detects project type and parses: Chip model, source files, header paths, macros, build system.

### 12.8 Complete Engine List

| Engine | Module | Function |
|---|---|---|
| \`CodeFusionEngine\` | \`engines/fusion/\` | CubeMX Safe Code Fusion |
| \`ConstraintEngine\` | \`engines/constraint/\` | Hardware Constraint Check |
| \`StaticAnalyzerEngine\` | \`engines/static_analyzer/\` | C Code Static Analysis |
| \`LogAnalyzerEngine\` | \`engines/log_analyzer/\` | Log Root Cause Analysis |
| \`HardwareFSMEngine\` | \`engines/hardware_fsm/\` | State Machine Analysis |
| \`AnalysisEngine\` | \`engines/ai_analyzer/\` | LLM General Analysis |
| \`ProjectParser\` | \`engines/project_parser/\` | Project Structure Parsing |
| \`IncrementalRAG\` | \`engines/incremental_rag/\` | Real-time Incremental Index |

> All engines use \`try/except\` dynamic import, degrade gracefully if unavailable—will not block main service start.

---

## 13. Hardware Functions

### 13.1 Serial Communication

#### Via CLI

\`\`\`powershell
# List ports
python -m cli serial list

# Monitor
python -m cli serial monitor COM4 --baud 115200

# Send
python -m cli serial send COM4 "AT\\r\\n"
\`\`\`

#### Via API

\`\`\`powershell
# List ports
curl http://127.0.0.1:8000/api/v1/serial/ports

# Connect
curl -X POST http://127.0.0.1:8000/api/v1/serial/connect \`
  -H "Content-Type: application/json" \`
  -d '{"port": "COM4", "baudrate": 115200}'

# Send Data
curl -X POST http://127.0.0.1:8000/api/v1/serial/send/SESSION_ID \`
  -H "Content-Type: application/json" \`
  -d '{"data": "AT\\r\\n"}'

# Read Data
curl http://127.0.0.1:8000/api/v1/serial/read/SESSION_ID

# Disconnect
curl -X POST http://127.0.0.1:8000/api/v1/serial/disconnect/SESSION_ID
\`\`\`

#### Via WebSocket

Connect \`/ws/serial/{connection_id}\` or \`/api/v1/serial/tunnel/{session_id}\` for bidirectional serial tunnel. Supports binary passthrough, xterm.js integration.

### 13.2 Firmware Flashing

#### STM32 Flashing

Prerequisite: Install STM32CubeProgrammer and configure \`MCU_STM32_PROGRAMMER_PATH\` (or auto-detect via Skill).

\`\`\`powershell
# CLI
python -m cli flash write firmware.bin --platform stm32

# API
curl -X POST http://127.0.0.1:8000/api/v1/flash/execute \`
  -H "Content-Type: application/json" \`
  -d '{"firmware_path": "firmware.bin", "platform": "stm32", "address": "0x08000000"}'
\`\`\`

#### ESP32 Flashing

Prerequisite: Install esptool (\`pip install esptool\`).

\`\`\`powershell
# CLI
python -m cli flash write firmware.bin --platform esp32 --port COM4

# API
curl -X POST http://127.0.0.1:8000/api/v1/flash/execute \`
  -H "Content-Type: application/json" \`
  -d '{"firmware_path": "firmware.bin", "platform": "esp32", "port": "COM4"}'
\`\`\`

#### Flash Safety Check

\`\`\`powershell
curl -X POST http://127.0.0.1:8000/api/v1/flash/safety-check \`
  -H "Content-Type: application/json" \`
  -d '{"firmware_path": "firmware.bin", "platform": "stm32"}'
\`\`\`

### 13.3 OpenOCD Debugging

\`\`\`powershell
# CLI Start Debug Server
python -m cli debug start --interface interface/stlink.cfg --target target/stm32f4x.cfg

# API Start
curl -X POST http://127.0.0.1:8000/api/v1/debug/start \`
  -H "Content-Type: application/json" \`
  -d '{"interface_cfg": "interface/stlink.cfg", "target_cfg": "target/stm32f4x.cfg"}'

# Read Registers
curl -X POST http://127.0.0.1:8000/api/v1/debug/registers

# Read Memory
curl -X POST http://127.0.0.1:8000/api/v1/debug/memory/read \`
  -H "Content-Type: application/json" \`
  -d '{"address": "0x20000000", "length": 256}'

# Execute GDB Command
curl -X POST http://127.0.0.1:8000/api/v1/debug/gdb \`
  -H "Content-Type: application/json" \`
  -d '{"command": "info breakpoints"}'

# Evaluate Expression
curl -X POST http://127.0.0.1:8000/api/v1/debug/evaluate \`
  -H "Content-Type: application/json" \`
  -d '{"expression": "*((uint32_t*)0x20000000)"}'

# Stop
curl -X POST http://127.0.0.1:8000/api/v1/debug/stop
\`\`\`

### 13.4 QEMU Simulation

\`\`\`powershell
# CLI
python -m cli simulate start firmware.elf --machine stm32f4-discovery --gdb-port 3333
\`\`\`

Simulation Capture:
- UART stdout
- Execution trace (exec)
- Memory R/W trace (mem_read / mem_write)
- Interrupt trace (irq)

### 13.5 Hardware Info Query

\`\`\`powershell
# Detect Connected Hardware
curl http://127.0.0.1:8000/api/v1/hardware/detect

# Toolchain Status
curl http://127.0.0.1:8000/api/v1/hardware/toolchains

# Chip Pin Mux
curl http://127.0.0.1:8000/api/v1/hardware/pinout/STM32F407VGT6

# Pin Info
curl "http://127.0.0.1:8000/api/v1/hardware/pin-info?chip=STM32F407&pin=PA0"

# Chip Details
curl "http://127.0.0.1:8000/api/v1/hardware/chip-info?chip=STM32F407"

# Clock Tree
curl http://127.0.0.1:8000/api/v1/hardware/clock-tree

# Peripheral Map
curl http://127.0.0.1:8000/api/v1/hardware/peripheral-map

# Pin Conflict Detection
curl -X POST http://127.0.0.1:8000/api/v1/hardware/validate_pinout \`
  -H "Content-Type: application/json" \`
  -d '{"chip": "STM32F407", "pin_assignments": {"PA0": "UART4_TX", "PA1": "UART4_RX"}}'
\`\`\`

---

## 14. Data Capture and Pipeline

### 14.1 Capture Layer Architecture

All hardware interaction data collected via unified capture layer:

\`\`\`
DataCapture (Abstract Base Class)
├── SerialCapture      Serial Data
├── FlashCapture       Flash Output
├── OpenOCDCapture     Debug Output
└── QEMUCapture        Simulation Output
\`\`\`

### 14.2 Data Flow

\`\`\`
Hardware → DataCapture.emit() → CapturedData
  → AIDataFilter (Filter Redundancy)
  → SmartSampler (Smart Sampling)
  → LLMContext (Format as AI Prompt)
  → Pipeline consumers (Analysis Engine / Frontend Push)
\`\`\`

### 14.3 Data Types (26 Types)

| Type | Source |
|---|---|
| \`SERIAL_OUTPUT\` / \`SERIAL_INPUT\` | Serial |
| \`GDB_OUTPUT\` / \`GDB_MI_OUTPUT\` | GDB |
| \`OPENOCD_LOG\` / \`OPENOCD_TELNET\` | OpenOCD |
| \`MEMORY_DUMP\` / \`REGISTER_DUMP\` | Debug |
| \`TRACE_LOG\` / \`TRACE_INSTRUCTION\` / \`TRACE_MEMORY\` / \`TRACE_IRQ\` | Trace |
| \`PERIPHERAL_IO\` / \`GPIO_STATE\` / \`UART_OUTPUT\` | Peripheral |
| \`QEMU_LOG\` / \`QEMU_MONITOR\` | QEMU |
| \`RENODE_LOG\` / \`RENODE_MONITOR\` | Renode |
| \`FLASH_PROGRESS\` / \`FLASH_RESULT\` | Flash |
| \`BUILD_LOG\` / \`RUNTIME_ERROR\` | Build / Runtime |

Severity: \`CRITICAL\` > \`ERROR\` > \`WARNING\` > \`INFO\` > \`DEBUG\` > \`TRACE\`

### 14.4 AI Data Filter (AIDataFilter)

Four Filter Actions:

| Action | Description |
|---|---|
| \`PASS\` | Pass directly |
| \`COMPRESS\` | Compress similar data |
| \`AGGREGATE\` | Aggregate statistics (every 100 items or 1s) |
| \`DROP\` | Drop useless data |

Rule: Error/Exception **100% kept**, normal repetitive data aggregated/dropped.

### 14.5 Smart Sampler (SmartSampler)

| Config | Default |
|---|---|
| Sampling Window | 1000 ms |
| Max Samples per Window | 10 |
| Total Max Samples | 1000 |
| Error Weight | 10.0 |
| Warning Weight | 5.0 |

Strategy: error/critical **unconditionally kept**; value change high probability keep; repetition decreases probability.

### 14.6 Pipeline Manager

- **Pipeline**: Bind DataCapture + AIDataFilter + SmartSampler
- **PipelineManager**: Pipeline register/unregister, global start/stop
- Global buffer pool: \`deque\`, default 1000 items
- Stats: \`total_in\` / \`filtered_out\` / \`sampled_out\` / \`delivered\` / \`errors\`

\`\`\`python
# Get recent data
manager.get_recent(count=10)

# Get error data
manager.get_errors(count=5)

# Get stats
manager.get_all_stats()
\`\`\`

---

## 15. Security Mechanisms

### 15.1 Path Sandbox (PathSandbox)

Agent file operations restricted to safe scope:

**Blocked Paths**:
- Unix: \`/etc\`, \`/bin\`, \`/sbin\`, \`/usr/bin\`, \`/boot\`, \`/dev\`, \`/proc\`, \`/sys\`, \`/root\`, \`/lib\` ...
- Windows: \`C:\\Windows\`, \`C:\\Program Files\`, \`C:\\ProgramData\` ...

**Blocked Files**: \`.env\`, \`.ssh\`, \`id_rsa\`, \`authorized_keys\`, \`passwd\`, \`shadow\`, \`*.pem\`, \`*.key\`, \`*.crt\`, \`*.pfx\`

**Size Limit**: Read ≤ 5 MB, Write ≤ 10 MB

### 15.2 Terminal Command Security

**Whitelist Commands** (55+): \`make\`, \`cmake\`, \`ninja\`, \`idf.py\`, \`arm-none-eabi-*\`, \`gcc\`, \`python\`, \`git\`, \`ls\`, \`cat\`, \`openocd\`, \`esptool\`, \`st-flash\`, \`JLinkExe\`, \`mkdir\`, \`cp\`, \`mv\`, \`echo\`, \`pwd\`, \`cd\`, \`head\`, \`tail\`, \`wc\`, \`sort\`, \`diff\` ...

**Blacklist Patterns** (16 entries): \`rm -rf /\`, fork bomb, \`dd of=/dev/sd*\`, \`mkfs\`, \`format\`, \`curl|bash\`, \`wget|bash\`, \`eval\`, \`exec\`, command sub (\`$()\`, backticks), \`chmod 777\`, \`chown root\`, \`sudo\`, \`su\`, chained rm ...

**Injection Detection**: Intercept \`;\`, \`|\`, \`&&\`, \`||\`, \`\\n\`, \`>\`, \`<\`

### 15.3 Rate Limiter (RateLimiter)

| Limit | Ceiling |
|---|---|
| Agent Call | 30 / 60s |
| Tool Call | 100 / 60s |

Based on sliding window algorithm.

### 15.4 Audit Log (AuditLog)

- Ring buffer, max **10,000** entries
- Fields: \`timestamp\`, \`session_id\`, \`action\`, \`tool_name\`, \`args_summary\`, \`result\`, \`risk_level\`, \`detail\`
- Global Singleton: \`audit_log\`

### 15.5 Sensitive Operation Confirmation

All high-risk operations require user confirmation. Window times out in 300s.

### 15.6 CubeMX Code Protection

Auto protect regions during code fusion. Param: \`SECURITY_PROTECTED_REGIONS\`.

### 15.7 Fuse Protection

Enable \`SECURITY_ENABLE_FUSE_PROTECTION=true\` to prevent accidental chip fuse modification.

### 15.8 CORS Configuration

Default permitted origins: \`http://localhost:*\`, \`http://127.0.0.1:*\`, \`vscode-webview://*\`

> **Production**: Must modify \`SECURITY_ALLOWED_ORIGINS\`, do NOT use \`*\`.

### 15.9 Input Sanitization

All user input processed via \`sanitize_string()\`: remove null bytes, limit length (default 10,000 chars), trim whitespace.

---

## 16. Edit Protocol

### 16.1 Core Principle

**"Backend Proposes, Frontend Applies"** — Agent does not direct write to disk. All file mods generate \`EditProposal\`, accepted only after user approval via Frontend (VSCode Extension / TUI).

### 16.2 Edit Actions

| Action | Description |
|---|---|
| \`REPLACE\` | Replace content in line range |
| \`INSERT\` | Insert after line |
| \`DELETE\` | Delete line range |
| \`CREATE_FILE\` | Create new file |
| \`DELETE_FILE\` | Delete file |

### 16.3 Proposal Status

| Status | Description |
|---|---|
| \`PENDING\` | Pending Approval |
| \`ACCEPTED\` | Accepted |
| \`REJECTED\` | Rejected |
| \`AUTO_APPLIED\` | Auto Applied (Low risk) |
| \`EXPIRED\` | Expired (300s) |

### 16.4 SSE Event Types

| Type | Description |
|---|---|
| \`THINKING\` | Agent Thinking Process |
| \`TEXT\` | Text Output |
| \`TOOL_CALL\` | Tool Call |
| \`TOOL_RESULT\` | Tool Result |
| \`EDIT\` | Edit Proposal (contains diff) |
| \`FILE_CREATED\` | File Creation Proposal |
| \`CONFIRMATION\` | Confirmation Request |
| \`ERROR\` | Error |
| \`DONE\` | Done |

### 16.5 API Interaction Flow

\`\`\`
1. Agent executes write_file/edit_file
   → Generate EditProposal (status=PENDING)
   → SSE Push EDIT event to frontend

2. Frontend displays diff to user

3. User decision:
   → POST /api/v1/agent/edit/apply   → Apply to disk
   → POST /api/v1/agent/edit/reject  → Discard

4. 300s no action → Auto expire
\`\`\`

### 16.6 Diff Calculation

\`compute_proposed_edits_from_content()\` uses \`difflib\` for line-level diff, auto computes \`ProposedEdit\` list.

---

## 17. Testing

### 17.1 Running Tests

\`\`\`powershell
cd backend

# Run all tests
python -m pytest

# Specify file
python -m pytest tests/capture/test_serial.py

# Specify directory
python -m pytest tests/engines/

# Verbose
python -m pytest -v

# Fail fast
python -m pytest -x

# Quiet
python -m pytest -q

# Coverage report
python -m pytest --cov=app --cov-report=html
\`\`\`

### 17.2 Test Directory Structure

\`\`\`
tests/
├── conftest.py               Global fixture
├── capture/                   Capture layer tests
│   ├── test_base.py             Base model
│   ├── test_serial.py           Serial capture
│   ├── test_flash.py            Flash capture
│   ├── test_openocd_qemu.py     OpenOCD / QEMU
│   └── test_filter_sampler.py   Filter / Sampler
├── engines/                   Engine tests
│   ├── test_ai_analyzer.py      AI analyzer
│   ├── test_fsm.py              State Machine
│   ├── test_log_analyzer.py     Log analyzer
│   └── test_static_analyzer.py  Static analyzer
├── pipeline/                  Pipeline tests
│   └── test_pipeline.py
├── integration/               Integration tests
│   └── test_integration.py
├── core/                      Core module tests
├── security/                  Security tests
├── services/                  Service tests
├── test_cli/                  CLI tests
└── test_tui/                  TUI tests
\`\`\`

### 17.3 Test Configuration

\`\`\`ini
# pytest.ini
[pytest]
testpaths = tests
asyncio_mode = strict      # Async tests need @pytest.mark.asyncio
pythonpath = .
\`\`\`

Root \`conftest.py\` ensures \`backend/\` is first in \`sys.path\`, so \`app.*\`, \`tui.*\`, \`cli.*\` resolve correctly.

### 17.4 Async Tests

Use \`pytest-asyncio\`, mark async test functions:

\`\`\`python
import pytest

@pytest.mark.asyncio
async def test_agent_chat():
    ...
\`\`\`

---

## 18. Architecture Reference

### 18.1 Overall Architecture

\`\`\`
==========================================================
                    User Interaction Layer
==========================================================
  CLI (Click)    TUI (Textual)    VSCode Extension
       |              |                   |
  AgentClient     AgentClient         REST / WS
  (aiohttp SSE)  (aiohttp SSE)          |
       |              |                   |
==========================================================
          FastAPI Sidecar Engine (v2.1)
==========================================================
  LifecycleManager (Process Control + Signals + Handshake)
  WebSocketManager (Event Bus + Subscriptions + Heartbeat)
  ----------------------------------------------------------
  API Routes (/api/v1/*)
    Agent | Chat | Code | Project | RAG
    Hardware | Serial | Flash | Debug
    Build | Terminal | System | Telemetry
    Session | Extensions | Workflow | Config
  ----------------------------------------------------------
  Services
    AgentLoop        — AI Agent Core Loop
      tools/         — Modular toolkit
        base.py      — Type definitions (ToolDefinition, RiskLevel, ToolCategory, ToolSource)
        registry.py  — ToolRegistry tool registry center
        _helpers.py  — Shared tool functions
        builtin/     — 19 built-in tools (10 modules)
        llm/         — 8 LLM provider tools (4 modules)
      SensitiveGuard — Sensitive Operation Guard
      ContextManager — Chat Context (Token Window)
      WorkspaceManager — Workspace Path Injection
      KnowledgeCache — Knowledge Cache (LRU+TTL)
      StatusReporter — SSE Event Push
      ErrorRecovery  — Error Auto Recovery
    LLMService       — Multi-provider LLM Unified Interface
    RAGService       — FAISS Vector Retrieval
    ProjectService   — Project Management
    CLIService       — Toolchain Call
    FlashService     — Flashing Management
    SerialService    — Serial Management
    HardwareService  — Hardware Detection
    TerminalService  — Safe Command Execution
    ChatService      — Chat Management
    AICorrectionService — AI Code Correction
  ----------------------------------------------------------
  Skill Plugin System
    SkillManager     — Discovery + Lazy Loading
    SkillMatcher     — Matching (Keyword + Semantic)
    STM32 Skill      — STM32 Full Stack
    ESP32 Skill      — ESP32 Full Stack
    (Extensible...)
  ----------------------------------------------------------
  Engines
    FusionEngine     — CubeMX Safe Code Fusion
    ConstraintEngine — Hardware Constraint Check
    StaticAnalyzer   — C Code Static Analysis
    LogAnalyzer      — Log Root Cause Analysis
    HardwareFSM      — State Machine Analysis
    AIAnalyzer       — LLM Diagnostic Engine
    ProjectParser    — Project Structure Parsing
    IncrementalRAG   — Real-time Incremental Index
  ----------------------------------------------------------
  Capture & Pipeline
    SerialCapture    — pyserial Serial
    FlashCapture     — st-flash/esptool
    OpenOCDCapture   — OpenOCD Telnet
    QEMUCapture      — QEMU Simulation
    AIDataFilter     — Data Filtering
    SmartSampler     — Smart Sampling
    PipelineManager  — Pipeline Register + Global Buffer
  ----------------------------------------------------------
  Core
    config.py        — Pydantic Settings Config
    security.py      — Sandbox + Command Filter + Rate Limit
    bus.py           — WebSocket Channel Management
    lifecycle.py     — State Machine + Subprocess Management
    logging.py       — structlog Logging
    exceptions.py    — Unified Exception System
==========================================================
\`\`\`

### 18.2 Data Flow

1. **AI Chat**: User Message → AgentLoop → LLM Decision → ToolRegistry → Handler Execute → Observe Result → LLM Continue → Final Answer
2. **Knowledge Retrieval**: Agent \`search_knowledge\` → KnowledgeCache → RAGService → FAISS Search → Result Cache
3. **Hardware Capture**: DataCapture → CapturedData → AIDataFilter → SmartSampler → LLMContext → Analysis Engine → Diagnostic Result
4. **Code Edit**: Agent \`edit_file\`/\`write_file\` → EditProposal → SSE Push → Frontend Accept/Reject → Disk Write
5. **Platform Match**: User Message → SkillMatcher.match() → Keyword/Semantic/Fingerprint → Return Best Skill → Load Handler

### 18.3 Error Code System

| Series | Category | Example |
|---|---|---|
| 1xxx | General | SUCCESS, INVALID_PARAMETER, TIMEOUT |
| 2xxx | Project | NOT_FOUND, BUILD_FAILED, CLI_NOT_FOUND |
| 3xxx | Code | GENERATION_FAILED, PARSE_ERROR, FUSION_FAILED |
| 4xxx | Hardware | NOT_CONNECTED, FLASH_FAILED, SERIAL_TIMEOUT |
| 5xxx | AI/LLM | API_ERROR, RATE_LIMITED, RAG_INDEX_ERROR |
| 6xxx | Validation | CONSTRAINT_VIOLATION, PIN_CONFLICT, MISRA_VIOLATION |

### 18.4 API Response Format

Unified format for all API returns:

\`\`\`json
{
  "code": 1000,
  "message": "success",
  "data": { ... },
  "request_id": "uuid",
  "timestamp": "2026-02-15T12:00:00Z"
}
\`\`\`

### 18.5 FastAPI Application Configuration

| Item | Value |
|---|---|
| title | \`Emcoder Sidecar Engine\` |
| version | \`2.1.0\` |
| Swagger UI | \`/docs\` |
| ReDoc | \`/redoc\` |
| CORS | All methods, All headers, credentials=true |

Exception Handlers: \`EmcoderException\` → JSON error response, \`HTTPException\` passthrough, Generic Exception → 500.

---

## 19. Troubleshooting

### 19.1 Backend Startup Failure

**Issue**: \`ModuleNotFoundError: No module named 'fastapi'\`

\`\`\`powershell
# Solution: Install dependencies
pip install -r requirements.txt
\`\`\`

**Issue**: \`Address already in use\`

\`\`\`powershell
# Solution: Auto assign port
python run.py --port 0

# Or find and kill blocking process
netstat -ano | findstr :8000
taskkill /PID <pid> /F
\`\`\`

### 19.2 CLI Connection Failure

**Issue**: \`Backend: Disconnected\`

\`\`\`
Solution:
1. Confirm backend started: curl http://127.0.0.1:8000/health
2. Use -b to specify address: python -m cli -b http://127.0.0.1:8000 status
3. Check firewall blocking port 8000
4. Check if backend started on different port
\`\`\`

### 19.3 LLM Call Failure

**Issue**: \`LLM API Error\` / \`Rate Limited\` / \`Timeout\`

\`\`\`
Solution:
1. Check API Key in .env
2. Check network: curl https://dashscope.aliyuncs.com/compatible-mode/v1/models
3. Increase timeout: LLM_TIMEOUT=300
4. Configure fallback: LLM_FALLBACK_PROVIDER=deepseek
5. Local deployment: LLM_PROVIDER=ollama (No Key needed)
6. Check balance/quota
\`\`\`

### 19.4 RAG Search No Results

**Issue**: Knowledge retrieval returns empty

\`\`\`
Solution:
1. Confirm KB files exist: ls data/knowledge_base/
2. Check index status: curl http://127.0.0.1:8000/api/v1/rag/stats
3. Wait for embedding model download (~500MB) on first run
4. Manually reload index: curl -X POST http://127.0.0.1:8000/api/v1/rag/load
5. Check logs for embedding model loading errors
\`\`\`

### 19.5 Serial Open Failure

**Issue**: \`Serial port permission denied\` / \`Port not found\`

\`\`\`
Solution:
1. Windows: Check driver in Device Manager
2. Linux: sudo usermod -aG dialout $USER and re-login
3. Confirm port not used by other programs (Arduino IDE, PuTTY)
4. Check USB cable connection
\`\`\`

### 19.6 Flashing Failure

**Issue**: \`Flash failed\` / \`Programmer not found\`

\`\`\`
Solution:
1. Install flasher tool (STM32CubeProgrammer / esptool)
2. Config tool path in .env (MCU_STM32_PROGRAMMER_PATH etc.)
3. Check debugger connection (ST-Link / USB)
4. Check firmware path
5. Detect toolchain via Skill: curl http://127.0.0.1:8000/api/v1/hardware/toolchains
\`\`\`

### 19.7 Slow Embedding Model Download

**Issue**: \`sentence-transformers\` download timeout

\`\`\`powershell
# Solution 1: Set Hugging Face mirror
$env:HF_ENDPOINT = "https://hf-mirror.com"
python run.py

# Solution 2: Manual download to cache
# Download all-MiniLM-L6-v2 to ~/.cache/huggingface/

# Note: RAG auto degrades to Hash embedding if download fails (Lower accuracy but usable)
\`\`\`

### 19.8 TUI Display Glitch

**Issue**: Garbled text or misalignment

\`\`\`
Solution:
1. Ensure terminal supports UTF-8: chcp 65001
2. Use Windows Terminal or modern terminals
3. Ensure textual version ≥ 0.85
4. Adjust window size (Recommended ≥ 120×30)
\`\`\`

### 19.9 Agent Timeout

**Issue**: \`Agent loop timeout\`

\`\`\`
Solution:
1. Increase timeout: AGENT_LOOP_TIMEOUT=600
2. Reduce max rounds: AGENT_MAX_ROUNDS=10
3. Simplify request (One thing at a time)
4. Check LLM response speed
\`\`\`

### 19.10 Project Build Failure

**Issue**: \`Build failed\` / \`Toolchain not found\`

\`\`\`
Solution:
1. Check toolchain installation:
   - STM32: arm-none-eabi-gcc --version
   - ESP32: idf.py --version
2. Check if PATH includes toolchain bin
3. STM32: Confirm CubeMX generated Makefile
4. ESP32: Confirm source export.sh sets IDF environment
5. Check build log: curl http://127.0.0.1:8000/api/v1/logs/build/{project_id}
\`\`\`

---

## 20. Appendix

### 20.1 File Structure Quick Ref

\`\`\`
EmcoderCLI/
└── backend/
    ├── run.py                  Launcher
    ├── start_server.ps1        PowerShell Start Script
    ├── requirements.txt        Python Deps
    ├── pytest.ini              Test Config
    ├── conftest.py             Test Fixture
    ├── .env                    Env Config (User Created)
    ├── app/
    │   ├── main.py             FastAPI App Entry
    │   ├── core/
    │   │   ├── config.py       Config Mgmt (Pydantic Settings)
    │   │   ├── security.py     Security: Sandbox/Filter/RateLimit
    │   │   ├── bus.py          WebSocket Event Bus
    │   │   ├── lifecycle.py    Lifecycle Mgmt
    │   │   ├── logging.py      Logging
    │   │   ├── exceptions.py   Exceptions
    │   │   └── utils.py        Utils
    │   ├── api/
    │   │   ├── routes/         REST API Routes
    │   │   ├── ws_routes.py    WebSocket Routes
    │   │   └── compat.py       Compat Routes (/api/ no v1)
    │   ├── models/
    │   │   ├── schemas.py      API Data Models
    │   │   └── edit_protocol.py  Edit Protocol Models
    │   ├── services/
    │   │   ├── agent/          Agent System
    │   │   │   ├── agent_loop.py       Core Loop
    │   │   │   ├── sensitive_guard.py   Sensitive Operation Guard
    │   │   │   ├── context_manager.py   Context Management
    │   │   │   ├── workspace_manager.py Workspace Management
    │   │   │   ├── knowledge_cache.py   Knowledge Cache
    │   │   │   ├── structured_output.py Output Parsing
    │   │   │   ├── status_reporter.py   SSE Push
    │   │   │   ├── error_recovery.py    Error Recovery
    │   │   │   └── tools/              Tool System Package
    │   │   │       ├── base.py           Type definitions (ToolDefinition, RiskLevel...)
    │   │   │       ├── registry.py       ToolRegistry + singleton
    │   │   │       ├── _helpers.py       Shared tool functions
    │   │   │       ├── builtin/          Built-in tools (10 modules, 19 tools)
    │   │   │       │   ├── knowledge.py    Knowledge retrieval & code generation
    │   │   │       │   ├── file_ops.py     Read/Write/Edit files
    │   │   │       │   ├── workspace.py    Scan & Search
    │   │   │       │   ├── project.py      Create/Build/Detect
    │   │   │       │   ├── terminal.py     Terminal commands
    │   │   │       │   ├── hardware.py     Flash & Peripherals
    │   │   │       │   ├── serial.py       Serial monitor & logs
    │   │   │       │   ├── debug.py        Hardware detect & debug
    │   │   │       │   ├── emulation.py    QEMU simulation
    │   │   │       │   └── interaction.py  User confirmation
    │   │   │       └── llm/              LLM Provider tools (4 modules, 8 tools)
    │   │   │           ├── openai.py       Search/File/Code/Image
    │   │   │           ├── qwen.py         Knowledge base/Search
    │   │   │           ├── deepseek.py     Search
    │   │   │           └── anthropic.py    Computer use
    │   │   ├── llm/            LLM Call
    │   │   ├── rag/            RAG KB
    │   │   ├── project/        Project Mgmt
    │   │   ├── serial/         Serial Comm
    │   │   ├── flash/          Flashing
    │   │   ├── hardware/       Hardware Mgmt
    │   │   ├── terminal/       Terminal Cmd
    │   │   ├── chat/           Chat
    │   │   ├── cli/            CLI Tool Detection
    │   │   └── ai_correction/  AI Correction
    │   ├── engines/
    │   │   ├── fusion/         Code Fusion
    │   │   ├── constraint/     Constraint Check
    │   │   ├── static_analyzer/ Static Analysis
    │   │   ├── log_analyzer/   Log Analysis
    │   │   ├── hardware_fsm/   FSM Analysis
    │   │   ├── ai_analyzer/    AI Analysis
    │   │   ├── project_parser/ Project Parsing
    │   │   └── incremental_rag/ Incremental RAG
    │   ├── skills/
    │   │   ├── base.py         Skill Base & Models
    │   │   ├── manager.py      SkillManager
    │   │   ├── matcher.py      SkillMatcher
    │   │   └── embedded/       Built-in Skills (stm32, esp32)
    │   ├── capture/
    │   │   ├── base.py         Capture Base & Models
    │   │   ├── filter.py       AI Data Filter
    │   │   ├── sampler.py      Smart Sampler
    │   │   ├── serial/         Serial Capture
    │   │   ├── flash/          Flash Capture
    │   │   ├── openocd/        Debug Capture
    │   │   └── qemu/           Sim Capture
    │   └── pipeline/
    │       └── manager.py      Pipeline Manager
    ├── cli/
    │   ├── __main__.py         CLI Entry
    │   └── main.py             Click Commands
    ├── tui/
    │   ├── app.py              Textual Main App
    │   ├── widgets.py          UI Components
    │   ├── client.py           SSE Agent Client
    │   ├── icons.py            ASCII Icons
    │   └── styles.py           TCSS Styles
    ├── data/
    │   ├── knowledge_base/     RAG Documents
    │   ├── rag_index/          FAISS Index
    │   └── workspace/          Project Workspace
    ├── config/
    │   └── allowed_extensions.json  Extension Whitelist
    ├── tests/                  Test Suite
    └── docs/                   Documentation
\`\`\`

### 20.2 Environment Variable Quick Ref

| Prefix | Config Group | Example |
|---|---|---|
| (None) | Service Core | \`HOST\`, \`PORT\`, \`DEBUG\`, \`LOG_LEVEL\` |
| \`LLM_\` | LLM Model | \`LLM_PROVIDER\`, \`LLM_API_KEY\`, \`LLM_MODEL_NAME\` |
| \`RAG_\` | Knowledge Base | \`RAG_VECTOR_STORE\`, \`RAG_DEFAULT_TOP_K\` |
| \`SKILL_\` | Skill System | \`SKILL_ENABLE_SEMANTIC_MATCH\` |
| \`PROJECT_\` | Project Mgmt | \`PROJECT_DEFAULT_PLATFORM\`, \`PROJECT_AUTO_BUILD\` |
| \`AGENT_\` | Agent Engine | \`AGENT_MAX_ROUNDS\`, \`AGENT_LOOP_TIMEOUT\` |
| \`SECURITY_\` | Security | \`SECURITY_REQUIRE_CONFIRMATION\` |
| \`MCU_\` | Toolchain (Deprecated) | \`MCU_ARM_GCC_PATH\` |

### 20.3 Common API Quick Ref

\`\`\`powershell
# Health Check
curl http://127.0.0.1:8000/health

# AI Chat (Non-streaming)
curl -X POST http://127.0.0.1:8000/api/v1/agent/chat \`
  -H "Content-Type: application/json" \`
  -d '{"message": "Hello"}'

# KB Search
curl -X POST http://127.0.0.1:8000/api/v1/rag/search \`
  -H "Content-Type: application/json" \`
  -d '{"query": "UART DMA", "top_k": 3}'

# Chip Info
curl "http://127.0.0.1:8000/api/v1/hardware/chip-info?chip=STM32F407"

# Serial Ports
curl http://127.0.0.1:8000/api/v1/serial/ports

# Tool List
curl http://127.0.0.1:8000/api/v1/agent/tools
\`\`\`

### 20.4 Version History

| Version | Date | Major Changes |
|---|---|---|
| v2.1.0 | 2026-02-20 | Tool system modular refactoring: split into \`tools/\` package (20 files), added ToolSource enum, LLM provider tools (8), \`_helpers.py\` shared functions, total tools 19→27 |
| v2.0.0 | 2026-02 | Skill Plugin System, Edit Protocol, Agent Tool System, TUI Refactor |
| v1.0.0 | — | Initial Release |

---

*Emcoder CLI v2.1.0 — Embedded MCU Intelligent Development Sidecar Engine*
`,jr={class:"container"},Hr=["innerHTML"],qr=Gn({__name:"TutorialPage",setup(e){const n=Xn(),{t:u,locale:t}=Bn(),r=new P({html:!0,linkify:!0,typographer:!0}).use(z,{slugify:o=>o.trim().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\u4e00-\u9fa5\-]+/g,"")}),a=Vn(()=>{const o=t.value==="zh"?Gr:Br;return r.render(o)});return jn(()=>n.hash,o=>{o&&Qn(()=>{const i=document.querySelector(decodeURIComponent(o));i&&i.scrollIntoView({behavior:"smooth"})})},{immediate:!0}),(o,i)=>(zn(),Hn(Yn,null,{default:qn(()=>[Wn(Jn,{title:Ue(u)("pages.tutorial.title"),subtitle:Ue(u)("pages.tutorial.subtitle")},null,8,["title","subtitle"]),Ge("div",jr,[Ge("div",{class:Kn(o.$style.markdownBody),innerHTML:a.value},null,10,Hr)])]),_:1}))}}),zr="_markdownBody_ow2aq_1",Wr={markdownBody:zr},Kr={$style:Wr},Yr=$n(qr,[["__cssModules",Kr]]);export{Yr as default};
