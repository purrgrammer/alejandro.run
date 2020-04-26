/*
  Highlight.js 10.0.0 (51906fbb)
  License: BSD-3-Clause
  Copyright (c) 2006-2020, Ivan Sagalaev
*/
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).hljs=n()}(this,(function(){"use strict";function e(n){Object.freeze(n);var t="function"==typeof n;return Object.getOwnPropertyNames(n).forEach((function(r){!n.hasOwnProperty(r)||null===n[r]||"object"!=typeof n[r]&&"function"!=typeof n[r]||t&&("caller"===r||"callee"===r||"arguments"===r)||Object.isFrozen(n[r])||e(n[r])})),n}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(e){var n,t={},r=Array.prototype.slice.call(arguments,1);for(n in e)t[n]=e[n];return r.forEach((function(e){for(n in e)t[n]=e[n]})),t}function r(e){return e.nodeName.toLowerCase()}var a=Object.freeze({__proto__:null,escapeHTML:n,inherit:t,nodeStream:function(e){var n=[];return function e(t,a){for(var i=t.firstChild;i;i=i.nextSibling)3===i.nodeType?a+=i.nodeValue.length:1===i.nodeType&&(n.push({event:"start",offset:a,node:i}),a=e(i,a),r(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:i}));return a}(e,0),n},mergeStreams:function(e,t,a){var i=0,s="",o=[];function l(){return e.length&&t.length?e[0].offset!==t[0].offset?e[0].offset<t[0].offset?e:t:"start"===t[0].event?e:t:e.length?e:t}function c(e){s+="<"+r(e)+[].map.call(e.attributes,(function(e){return" "+e.nodeName+'="'+n(e.value).replace(/"/g,"&quot;")+'"'})).join("")+">"}function u(e){s+="</"+r(e)+">"}function d(e){("start"===e.event?c:u)(e.node)}for(;e.length||t.length;){var g=l();if(s+=n(a.substring(i,g[0].offset)),i=g[0].offset,g===e){o.reverse().forEach(u);do{d(g.splice(0,1)[0]),g=l()}while(g===e&&g.length&&g[0].offset===i);o.reverse().forEach(c)}else"start"===g[0].event?o.push(g[0].node):o.pop(),d(g.splice(0,1)[0])}return s+n(a.substr(i))}});const i="</span>",s=e=>!!e.kind;class o{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=n(e)}openNode(e){if(!s(e))return;let n=e.kind;e.sublanguage||(n=`${this.classPrefix}${n}`),this.span(n)}closeNode(e){s(e)&&(this.buffer+=i)}span(e){this.buffer+=`<span class="${e}">`}value(){return this.buffer}}class l{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let n={kind:e,children:[]};this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach(n=>this._walk(e,n)),e.closeNode(n)),e}static _collapse(e){e.children&&(e.children.every(e=>"string"==typeof e)?(e.text=e.children.join(""),delete e.children):e.children.forEach(e=>{"string"!=typeof e&&l._collapse(e)}))}}class c extends l{constructor(e){super(),this.options=e}addKeyword(e,n){""!==e&&(this.openNode(n),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,n){let t=e.root;t.kind=n,t.sublanguage=!0,this.add(t)}toHTML(){return new o(this,this.options).value()}finalize(){}}function u(e){return e&&e.source||e}const d="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",g={begin:"\\\\[\\s\\S]",relevance:0},h={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[g]},f={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[g]},p={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},m=function(e,n,r){var a=t({className:"comment",begin:e,end:n,contains:[]},r||{});return a.contains.push(p),a.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|XXX):",relevance:0}),a},b=m("//","$"),v=m("/\\*","\\*/"),x=m("#","$");var _=Object.freeze({__proto__:null,IDENT_RE:"[a-zA-Z]\\w*",UNDERSCORE_IDENT_RE:"[a-zA-Z_]\\w*",NUMBER_RE:"\\b\\d+(\\.\\d+)?",C_NUMBER_RE:d,BINARY_NUMBER_RE:"\\b(0b[01]+)",RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",BACKSLASH_ESCAPE:g,APOS_STRING_MODE:h,QUOTE_STRING_MODE:f,PHRASAL_WORDS_MODE:p,COMMENT:m,C_LINE_COMMENT_MODE:b,C_BLOCK_COMMENT_MODE:v,HASH_COMMENT_MODE:x,NUMBER_MODE:{className:"number",begin:"\\b\\d+(\\.\\d+)?",relevance:0},C_NUMBER_MODE:{className:"number",begin:d,relevance:0},BINARY_NUMBER_MODE:{className:"number",begin:"\\b(0b[01]+)",relevance:0},CSS_NUMBER_MODE:{className:"number",begin:"\\b\\d+(\\.\\d+)?(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},REGEXP_MODE:{begin:/(?=\/[^\/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[g,{begin:/\[/,end:/\]/,relevance:0,contains:[g]}]}]},TITLE_MODE:{className:"title",begin:"[a-zA-Z]\\w*",relevance:0},UNDERSCORE_TITLE_MODE:{className:"title",begin:"[a-zA-Z_]\\w*",relevance:0},METHOD_GUARD:{begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0}}),E="of and for in not or if then".split(" ");function R(e,n){return n?+n:(t=e,E.includes(t.toLowerCase())?0:1);var t}const N=n,w=t,{nodeStream:y,mergeStreams:O}=a;return function(n){var r=[],a={},i={},s=[],o=!0,l=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,d="Could not find the language '{}', did you forget to load/include a language module?",g={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0,__emitter:c};function h(e){return g.noHighlightRe.test(e)}function f(e,n,t,r){var a={code:n,language:e};T("before:highlight",a);var i=a.result?a.result:p(a.language,a.code,t,r);return i.code=a.code,T("after:highlight",i),i}function p(e,n,r,i){var s=n;function l(e,n){var t=v.case_insensitive?n[0].toLowerCase():n[0];return e.keywords.hasOwnProperty(t)&&e.keywords[t]}function c(){null!=_.subLanguage?function(){if(""!==k){var e="string"==typeof _.subLanguage;if(!e||a[_.subLanguage]){var n=e?p(_.subLanguage,k,!0,E[_.subLanguage]):m(k,_.subLanguage.length?_.subLanguage:void 0);_.relevance>0&&(T+=n.relevance),e&&(E[_.subLanguage]=n.top),w.addSublanguage(n.emitter,n.language)}else w.addText(k)}}():function(){var e,n,t,r;if(_.keywords){for(n=0,_.lexemesRe.lastIndex=0,t=_.lexemesRe.exec(k),r="";t;){r+=k.substring(n,t.index);var a=null;(e=l(_,t))?(w.addText(r),r="",T+=e[1],a=e[0],w.addKeyword(t[0],a)):r+=t[0],n=_.lexemesRe.lastIndex,t=_.lexemesRe.exec(k)}r+=k.substr(n),w.addText(r)}else w.addText(k)}(),k=""}function h(e){e.className&&w.openNode(e.className),_=Object.create(e,{parent:{value:_}})}var f={};function b(n,t){var a,i=t&&t[0];if(k+=n,null==i)return c(),0;if("begin"==f.type&&"end"==t.type&&f.index==t.index&&""===i){if(k+=s.slice(t.index,t.index+1),!o)throw(a=Error("0 width match regex")).languageName=e,a.badRule=f.rule,a;return 1}if(f=t,"begin"===t.type)return function(e){var n=e[0],t=e.rule;return t.__onBegin&&(t.__onBegin(e)||{}).ignoreMatch?function(e){return 0===_.matcher.regexIndex?(k+=e[0],1):(A=!0,0)}(n):(t&&t.endSameAsBegin&&(t.endRe=RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),t.skip?k+=n:(t.excludeBegin&&(k+=n),c(),t.returnBegin||t.excludeBegin||(k=n)),h(t),t.returnBegin?0:n.length)}(t);if("illegal"===t.type&&!r)throw(a=Error('Illegal lexeme "'+i+'" for mode "'+(_.className||"<unnamed>")+'"')).mode=_,a;if("end"===t.type){var l=function(e){var n=e[0],t=s.substr(e.index),r=function e(n,t){if(function(e,n){var t=e&&e.exec(n);return t&&0===t.index}(n.endRe,t)){for(;n.endsParent&&n.parent;)n=n.parent;return n}if(n.endsWithParent)return e(n.parent,t)}(_,t);if(r){var a=_;a.skip?k+=n:(a.returnEnd||a.excludeEnd||(k+=n),c(),a.excludeEnd&&(k=n));do{_.className&&w.closeNode(),_.skip||_.subLanguage||(T+=_.relevance),_=_.parent}while(_!==r.parent);return r.starts&&(r.endSameAsBegin&&(r.starts.endRe=r.endRe),h(r.starts)),a.returnEnd?0:n.length}}(t);if(null!=l)return l}return k+=i,i.length}var v=M(e);if(!v)throw console.error(d.replace("{}",e)),Error('Unknown language: "'+e+'"');!function(e){function n(n,t){return RegExp(u(n),"m"+(e.case_insensitive?"i":"")+(t?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=function(e){return RegExp(e.toString()+"|").exec("").length-1}(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);let e=this.regexes.map(e=>e[1]);this.matcherRe=n(function(e,n){for(var t=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,r=0,a="",i=0;i<e.length;i++){var s=r+=1,o=u(e[i]);for(i>0&&(a+="|"),a+="(";o.length>0;){var l=t.exec(o);if(null==l){a+=o;break}a+=o.substring(0,l.index),o=o.substring(l.index+l[0].length),"\\"==l[0][0]&&l[1]?a+="\\"+(+l[1]+s):(a+=l[0],"("==l[0]&&r++)}a+=")"}return a}(e),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;let n=this.matcherRe.exec(e);if(!n)return null;let t=n.findIndex((e,n)=>n>0&&null!=e),r=this.matchIndexes[t];return Object.assign(n,r)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];let n=new r;return this.rules.slice(e).forEach(([e,t])=>n.addRule(e,t)),n.compile(),this.multiRegexes[e]=n,n}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){let n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&(this.regexIndex=0)),t}}function i(e){let n=e.input[e.index-1],t=e.input[e.index+e[0].length];if("."===n||"."===t)return{ignoreMatch:!0}}if(e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");!function r(s,o){s.compiled||(s.compiled=!0,s.__onBegin=null,s.keywords=s.keywords||s.beginKeywords,s.keywords&&(s.keywords=function(e,n){var t={};return"string"==typeof e?r("keyword",e):Object.keys(e).forEach((function(n){r(n,e[n])})),t;function r(e,r){n&&(r=r.toLowerCase()),r.split(" ").forEach((function(n){var r=n.split("|");t[r[0]]=[e,R(r[0],r[1])]}))}}(s.keywords,e.case_insensitive)),s.lexemesRe=n(s.lexemes||/\w+/,!0),o&&(s.beginKeywords&&(s.begin="\\b("+s.beginKeywords.split(" ").join("|")+")(?=\\b|\\s)",s.__onBegin=i),s.begin||(s.begin=/\B|\b/),s.beginRe=n(s.begin),s.endSameAsBegin&&(s.end=s.begin),s.end||s.endsWithParent||(s.end=/\B|\b/),s.end&&(s.endRe=n(s.end)),s.terminator_end=u(s.end)||"",s.endsWithParent&&o.terminator_end&&(s.terminator_end+=(s.end?"|":"")+o.terminator_end)),s.illegal&&(s.illegalRe=n(s.illegal)),null==s.relevance&&(s.relevance=1),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map((function(e){return function(e){return e.variants&&!e.cached_variants&&(e.cached_variants=e.variants.map((function(n){return t(e,{variants:null},n)}))),e.cached_variants?e.cached_variants:function e(n){return!!n&&(n.endsWithParent||e(n.starts))}(e)?t(e,{starts:e.starts?t(e.starts):null}):Object.isFrozen(e)?t(e):e}("self"===e?s:e)}))),s.contains.forEach((function(e){r(e,s)})),s.starts&&r(s.starts,o),s.matcher=function(e){let n=new a;return e.contains.forEach(e=>n.addRule(e.begin,{rule:e,type:"begin"})),e.terminator_end&&n.addRule(e.terminator_end,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(s))}(e)}(v);var x,_=i||v,E={},w=new g.__emitter(g);!function(){for(var e=[],n=_;n!==v;n=n.parent)n.className&&e.unshift(n.className);e.forEach(e=>w.openNode(e))}();var y,O,k="",T=0,L=0;try{var A=!1;for(_.matcher.considerAll();A?A=!1:(_.matcher.lastIndex=L,_.matcher.considerAll()),y=_.matcher.exec(s);)O=b(s.substring(L,y.index),y),L=y.index+O;return b(s.substr(L)),w.closeAllNodes(),w.finalize(),x=w.toHTML(),{relevance:T,value:x,language:e,illegal:!1,emitter:w,top:_}}catch(n){if(n.message&&n.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:n.message,context:s.slice(L-100,L+100),mode:n.mode},sofar:x,relevance:0,value:N(s),emitter:w};if(o)return{relevance:0,value:N(s),emitter:w,language:e,top:_,errorRaised:n};throw n}}function m(e,n){n=n||g.languages||Object.keys(a);var t={relevance:0,emitter:new g.__emitter(g),value:N(e)},r=t;return n.filter(M).filter(k).forEach((function(n){var a=p(n,e,!1);a.language=n,a.relevance>r.relevance&&(r=a),a.relevance>t.relevance&&(r=t,t=a)})),r.language&&(t.second_best=r),t}function b(e){return g.tabReplace||g.useBR?e.replace(l,(function(e,n){return g.useBR&&"\n"===e?"<br>":g.tabReplace?n.replace(/\t/g,g.tabReplace):""})):e}function v(e){var n,t,r,a,s,o=function(e){var n,t=e.className+" ";if(t+=e.parentNode?e.parentNode.className:"",n=g.languageDetectRe.exec(t)){var r=M(n[1]);return r||(console.warn(d.replace("{}",n[1])),console.warn("Falling back to no-highlight mode for this block.",e)),r?n[1]:"no-highlight"}return t.split(/\s+/).find(e=>h(e)||M(e))}(e);h(o)||(T("before:highlightBlock",{block:e,language:o}),g.useBR?(n=document.createElement("div")).innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n"):n=e,s=n.textContent,r=o?f(o,s,!0):m(s),(t=y(n)).length&&((a=document.createElement("div")).innerHTML=r.value,r.value=O(t,y(a),s)),r.value=b(r.value),T("after:highlightBlock",{block:e,result:r}),e.innerHTML=r.value,e.className=function(e,n,t){var r=n?i[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),e.includes(r)||a.push(r),a.join(" ").trim()}(e.className,o,r.language),e.result={language:r.language,re:r.relevance},r.second_best&&(e.second_best={language:r.second_best.language,re:r.second_best.relevance}))}function x(){if(!x.called){x.called=!0;var e=document.querySelectorAll("pre code");r.forEach.call(e,v)}}var E={disableAutodetect:!0};function M(e){return e=(e||"").toLowerCase(),a[e]||a[i[e]]}function k(e){var n=M(e);return n&&!n.disableAutodetect}function T(e,n){var t=e;s.forEach((function(e){e[t]&&e[t](n)}))}Object.assign(n,{highlight:f,highlightAuto:m,fixMarkup:b,highlightBlock:v,configure:function(e){g=w(g,e)},initHighlighting:x,initHighlightingOnLoad:function(){window.addEventListener("DOMContentLoaded",x,!1)},registerLanguage:function(e,t){var r;try{r=t(n)}catch(n){if(console.error("Language definition for '{}' could not be registered.".replace("{}",e)),!o)throw n;console.error(n),r=E}r.name||(r.name=e),a[e]=r,r.rawDefinition=t.bind(null,n),r.aliases&&r.aliases.forEach((function(n){i[n]=e}))},listLanguages:function(){return Object.keys(a)},getLanguage:M,requireLanguage:function(e){var n=M(e);if(n)return n;throw Error("The '{}' language is required, but not loaded.".replace("{}",e))},autoDetection:k,inherit:w,addPlugin:function(e,n){s.push(e)}}),n.debugMode=function(){o=!1},n.safeMode=function(){o=!0},n.versionString="10.0.0";for(const n in _)"object"==typeof _[n]&&e(_[n]);return Object.assign(n,_),n}({})}));hljs.registerLanguage("clojure",function(){"use strict";return function(e){var t="def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord",n={"builtin-name":t+" cond apply if-not if-let if not not= = < > <= >= == + / * - rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy first rest cons cast coll last butlast sigs reify second ffirst fnext nfirst nnext meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"},r="[a-zA-Z_\\-!.?+*=<>&#'][a-zA-Z_\\-!.?+*=<>&#'0-9/;:]*",a={begin:r,relevance:0},s={className:"number",begin:"[-+]?\\d+(\\.\\d+)?",relevance:0},o=e.inherit(e.QUOTE_STRING_MODE,{illegal:null}),i=e.COMMENT(";","$",{relevance:0}),c={className:"literal",begin:/\b(true|false|nil)\b/},d={begin:"[\\[\\{]",end:"[\\]\\}]"},l={className:"comment",begin:"\\^"+r},m=e.COMMENT("\\^\\{","\\}"),u={className:"symbol",begin:"[:]{1,2}"+r},p={begin:"\\(",end:"\\)"},f={endsWithParent:!0,relevance:0},h={keywords:n,lexemes:r,className:"name",begin:r,starts:f},y=[p,o,l,m,i,u,d,s,c,a],g={beginKeywords:t,lexemes:r,end:'(\\[|\\#|\\d|"|:|\\{|\\)|\\(|$)',contains:[{className:"title",begin:r,relevance:0,excludeEnd:!0,endsParent:!0}].concat(y)};return p.contains=[e.COMMENT("comment",""),g,h,f],f.contains=y,d.contains=y,m.contains=[d],{name:"Clojure",aliases:["clj"],illegal:/\S/,contains:[p,o,l,m,i,u,d,s,c]}}}());hljs.registerLanguage("clojure-repl",function(){"use strict";return function(e){return{name:"Clojure REPL",contains:[{className:"meta",begin:/^([\w.-]+|\s*#_)?=>/,starts:{end:/$/,subLanguage:"clojure"}}]}}}());hljs.registerLanguage("lua",function(){"use strict";return function(e){var t={begin:"\\[=*\\[",end:"\\]=*\\]",contains:["self"]},a=[e.COMMENT("--(?!\\[=*\\[)","$"),e.COMMENT("--\\[=*\\[","\\]=*\\]",{contains:[t],relevance:10})];return{name:"Lua",lexemes:e.UNDERSCORE_IDENT_RE,keywords:{literal:"true false nil",keyword:"and break do else elseif end for goto if in local not or repeat return then until while",built_in:"_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"},contains:a.concat([{className:"function",beginKeywords:"function",end:"\\)",contains:[e.inherit(e.TITLE_MODE,{begin:"([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"}),{className:"params",begin:"\\(",endsWithParent:!0,contains:a}].concat(a)},e.C_NUMBER_MODE,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{className:"string",begin:"\\[=*\\[",end:"\\]=*\\]",contains:[t],relevance:5}])}}}());