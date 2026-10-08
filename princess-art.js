/* Original curved line art. Closed .r paths remain independent coloring regions. */
(()=>{
'use strict';
const ink='#403748';
const configs={
 p_gown:{hair:'waves',dress:'ball',pose:'welcome',crown:'royal',theme:'pearls'},
 p_braid:{hair:'braid',dress:'panel',pose:'flower',crown:'tiara',theme:'ribbons'},
 p_mermaid:{hair:'waves',dress:'mermaid',pose:'welcome',crown:'shell',theme:'ocean'},
 p_flower:{hair:'bob',dress:'petal',pose:'flower',crown:'flowers',theme:'garden'},
 p_snow:{hair:'braid',dress:'panel',pose:'magic',crown:'tiara',theme:'snow',cape:true},
 p_fairy:{hair:'bun',dress:'petal',pose:'magic',crown:'flowers',theme:'fairy',wings:true},
 p_ballet:{hair:'bun',dress:'ballet',pose:'dance',crown:'tiara',theme:'ballet'},
 p_rainbow:{hair:'curls',dress:'ball',pose:'welcome',crown:'royal',theme:'rainbow'},
 p_starlight:{hair:'waves',dress:'panel',pose:'magic',crown:'tiara',theme:'stars'},
 p_adventure:{hair:'pony',dress:'adventure',pose:'hip',crown:'tiara',theme:'adventure',cape:true},
 p_spring:{hair:'curls',dress:'petal',pose:'flower',crown:'flowers',theme:'garden'},
 p_space:{hair:'bob',dress:'space',pose:'welcome',crown:'tiara',theme:'space'},
 p_japan:{hair:'bun',dress:'kimono',pose:'flower',crown:'flowers',theme:'blossom'},
 p_egypt:{hair:'bob',dress:'column',pose:'welcome',crown:'egypt',theme:'lotus'},
 p_thai:{hair:'bun',dress:'thai',pose:'hip',crown:'thai',theme:'lotus'},
 p_christmas:{hair:'curls',dress:'ball',pose:'flower',crown:'royal',theme:'winter'},
 p_ocean:{hair:'pony',dress:'panel',pose:'welcome',crown:'shell',theme:'ocean'},
 p_butterfly:{hair:'curls',dress:'petal',pose:'magic',crown:'flowers',theme:'butterfly',wings:true},
 p_warrior:{hair:'pony',dress:'adventure',pose:'hip',crown:'royal',theme:'warrior',cape:true},
 p_autumn:{hair:'waves',dress:'panel',pose:'flower',crown:'flowers',theme:'autumn'}
};
const region=(d,extra='')=>`<path class="r" d="${d}" ${extra}/>`;
const line=(d,width=2)=>`<path d="${d}" fill="none" stroke-width="${width}" pointer-events="none"/>`;
function star(x,y,size=12){return region(`M${x} ${y-size} Q${x+3} ${y-3} ${x+size} ${y} Q${x+3} ${y+3} ${x} ${y+size} Q${x-3} ${y+3} ${x-size} ${y} Q${x-3} ${y-3} ${x} ${y-size}Z`)}
function flower(x,y,s=13){return `<g transform="translate(${x} ${y}) scale(${s/15})">${region('M0 -8 C-15 -28 -27 -8 -13 0 C-32 9 -15 27 -4 13 C1 33 24 22 14 7 C36 1 21 -22 8 -12 C10 -34 -14 -29 0 -8Z')}${region('M-6 0 C-6 -8 6 -8 6 0 C6 8 -6 8 -6 0Z')}</g>`}
function leaf(x,y,flip=1){return `<g transform="translate(${x} ${y}) scale(${flip} 1)">${region('M0 0 C-8 -14 -4 -27 10 -33 C20 -15 16 -6 0 0Z')}${line('M0 0 Q10 -13 10 -26',1.5)}</g>`}
function butterfly(x,y){return `<g transform="translate(${x} ${y})">${region('M0 0 C-32 -34 -45 -2 -16 7 C-43 23 -13 41 0 11 C13 41 43 23 16 7 C45 -2 32 -34 0 0Z')}${line('M0 -5 L0 18 M0 -3 Q-6 -15 -10 -12 M0 -3 Q6 -15 10 -12')}</g>`}
function background(c){let art='';
 if(['garden','blossom','lotus','autumn','winter'].includes(c.theme)){art+=line('M25 372 Q83 364 116 372 M284 372 Q329 361 377 372');art+=flower(58,318,16)+line('M58 339 Q52 357 58 371')+leaf(57,358,-1)+leaf(61,365);art+=flower(344,339,13)+line('M344 356 L342 370');}
 if(c.theme==='rainbow'){art+=region('M32 161 C42 50 129 13 200 17 C279 13 357 65 368 161 L351 161 C335 64 272 36 200 35 C130 34 60 64 49 161Z');art+=region('M49 161 C60 64 130 34 200 35 C272 36 335 64 351 161 L335 161 C319 80 266 53 200 52 C138 51 79 78 66 161Z');}
 if(['stars','space','snow','fairy','butterfly'].includes(c.theme)){art+=star(56,88,15)+star(342,117,11)+star(323,280,13);}
 if(c.theme==='snow')art+=line('M58 270 V303 M42 278 L74 295 M42 295 L74 278 M329 49 V77 M317 56 L341 70 M317 70 L341 56',2.3);
 if(c.theme==='ocean'){art+=region('M59 108 C43 100 42 79 57 73 C77 66 84 96 66 106 C64 108 62 109 59 108Z')+region('M337 204 C324 197 325 181 337 177 C352 174 357 195 344 203Z')+line('M27 373 Q43 358 56 371 Q73 382 89 368 M303 373 Q319 357 334 372 Q350 382 373 364');}
 if(c.theme==='space')art+=region('M314 67 C314 40 353 40 353 67 C353 93 314 93 314 67Z')+region('M299 79 C310 59 365 44 369 51 C375 63 319 96 302 90 Q296 88 299 79Z');
 if(['butterfly','garden','blossom'].includes(c.theme))art+=butterfly(326,94);
 if(c.theme==='autumn')art+=leaf(62,115)+leaf(334,240,-1);
 return art;
}
function hairBack(type){const shapes={
 waves:'M151 113 C133 73 155 41 187 45 C228 25 270 60 257 111 C265 133 267 166 280 187 C293 212 267 238 247 223 C257 253 214 249 221 224 C196 244 170 222 174 203 C144 230 126 207 137 184 C119 163 139 142 151 113Z',
 curls:'M151 109 C129 76 143 48 168 48 C190 25 224 36 236 47 C269 44 277 79 253 111 C272 124 265 146 263 154 C287 170 273 193 259 194 C279 218 252 240 235 218 C219 239 195 223 194 208 C175 237 143 223 151 207 C124 213 117 184 138 172 C123 151 138 130 151 109Z',
 braid:'M150 119 C135 71 157 39 196 43 C236 34 266 69 255 113 C263 141 252 167 236 184 L218 150 L167 153 C160 181 144 164 150 119Z',
 bob:'M151 116 C132 82 149 43 191 42 C239 32 268 70 254 120 Q271 153 258 178 Q229 192 210 171 L175 167 Q143 188 132 171 Q141 153 151 116Z',
 bun:'M173 49 C152 39 165 12 186 20 C205 4 230 22 216 42 C249 41 265 69 256 114 L240 149 L160 150 C142 136 136 112 144 85 Q147 62 173 49Z',
 pony:'M236 69 C266 47 301 63 284 97 C278 112 264 115 272 138 C286 165 279 189 258 193 C279 215 254 234 235 217 C239 195 237 177 225 157Z M149 115 C133 81 149 45 185 43 C229 30 261 64 252 109 L239 156 L160 153Z'
 };return region(shapes[type]);}
function braid(){return region('M154 137 C131 156 129 175 144 184 C122 189 124 213 140 218 C122 229 128 249 143 252 C128 267 141 282 153 278 L165 267 C178 255 164 241 158 239 C177 223 164 207 156 205 C175 188 159 174 158 171 C174 155 167 142 154 137Z')+line('M145 166 Q165 171 148 183 M142 197 Q162 205 143 219 M142 233 Q162 242 146 253')+region('M146 272 Q133 264 126 276 Q139 290 149 280 Q162 290 174 278 Q166 263 153 271Z');}
function wings(){return region('M171 218 C150 141 105 137 85 161 C68 186 96 222 131 232 C88 220 79 258 102 276 C129 292 158 258 174 236Z')+region('M226 213 C251 145 292 133 313 156 C340 184 310 224 272 233 C312 220 325 255 300 276 C273 295 240 257 225 238Z')+line('M101 171 Q121 188 160 222 M111 257 Q134 245 159 235 M299 168 Q279 196 239 223 M290 255 Q265 245 240 235');}
function cape(){return region('M162 179 C133 193 126 227 113 262 C95 303 104 337 89 354 C123 369 150 340 170 348 L233 345 C258 368 284 355 303 345 C281 323 284 286 268 249 Q257 204 233 178Z')+line('M147 228 Q128 307 117 338 M257 231 Q275 301 279 337');}
function arms(pose){
 const left={
 welcome:'M169 184 C152 181 143 194 129 207 L110 219 C105 216 100 209 97 211 C93 214 102 224 99 226 C94 224 84 217 82 221 C81 224 93 231 98 233 C113 240 143 219 160 209 L178 197Z',
 flower:'M168 184 C151 185 143 201 137 217 C125 215 115 212 110 203 C109 197 102 195 101 198 C100 203 105 209 104 210 C93 206 90 210 93 214 C100 224 112 232 126 235 C147 243 158 224 173 199Z',
 magic:'M169 183 C151 181 141 199 130 215 Q116 228 104 223 C100 213 98 211 95 213 C92 216 99 228 95 227 C86 220 82 225 90 231 C111 250 142 228 159 211 L177 197Z',
 hip:'M166 184 C148 182 137 201 128 220 C124 231 135 241 148 242 L171 236 C175 229 164 226 155 226 L147 222 L174 197Z',
 dance:'M171 183 C142 173 131 144 134 124 C144 110 139 107 136 111 C131 113 132 104 128 105 C121 112 117 119 119 134 C119 166 139 192 161 202Z'
 }[pose];
 const right=pose==='magic'?'M228 183 C246 184 254 197 266 209 C275 216 282 207 285 198 C285 192 290 190 293 195 C295 202 292 210 291 213 C300 209 303 215 295 221 C279 237 262 232 251 220 L221 197Z':pose==='dance'?'M229 182 C253 171 267 142 264 123 C254 109 259 106 263 111 C269 112 267 105 271 105 C279 113 281 123 279 139 C277 168 258 191 239 202Z':pose==='hip'?'M228 183 C246 181 258 202 267 220 C272 231 257 241 245 241 L228 236 C223 229 234 226 242 227 L249 222 L221 197Z':'M229 184 C247 182 258 199 273 211 L289 222 C295 217 299 209 303 212 C307 215 299 226 302 227 C309 225 316 221 318 225 C320 230 307 235 301 236 C284 241 255 219 239 209 L221 197Z';
 return region(left)+region(right);
}
function legs(type){if(!['ballet','adventure','petal','space'].includes(type))return '';
 if(type==='ballet')return region('M180 278 C174 303 170 325 165 350 L155 370 C164 379 173 373 178 363 C188 336 195 312 197 283Z')+region('M201 282 C209 297 229 306 244 296 L267 274 C274 276 275 283 269 291 C247 321 226 334 211 320 L188 295Z')+region('M155 364 Q163 357 176 361 L178 367 Q166 386 152 375Z')+region('M261 275 Q264 269 271 272 Q285 282 271 296 L261 291Z')+line('M169 336 L180 344 M166 345 L177 335 M249 291 L256 301');
 return region('M179 287 Q179 323 171 351 L163 362 Q159 372 170 374 Q188 375 190 362 L199 291Z')+region('M202 291 L222 287 Q224 318 230 348 L240 360 Q249 372 235 374 Q219 375 215 363Z')+region('M161 364 Q169 357 188 359 L190 366 Q180 379 162 374Z')+region('M216 359 Q232 356 241 365 L243 373 Q223 377 215 367Z');}
function dress(c){const short=['ballet','petal','adventure','space'].includes(c.dress);let s='';
 if(c.dress==='mermaid'){
 s+=region('M170 194 Q198 216 231 194 Q229 228 219 248 Q209 273 228 301 C244 325 272 332 282 344 Q247 346 228 330 C216 356 197 373 175 365 Q192 338 198 317 C184 295 165 273 170 244Z');
 s+=region('M198 317 C166 317 133 342 132 367 Q165 369 186 351 Q197 333 198 317Z');
 s+=line('M177 239 Q194 250 218 241 M179 254 Q196 268 215 254 M187 275 Q202 287 220 277 M155 354 Q174 338 190 335 M229 333 Q250 338 269 339');
 s+=region('M169 188 C169 171 189 178 198 192 Q211 176 225 180 Q240 187 230 203 Q212 211 199 201 Q181 212 169 199Z');
 s+=line('M177 188 L188 199 M189 185 L194 197 M215 186 L205 198 M225 189 L215 202');return s;
 }
 const hems={ball:'M166 244 C159 275 118 308 94 347 C109 361 137 353 155 365 C179 375 186 367 201 369 C225 373 240 363 255 365 C278 364 292 357 303 347 C278 309 244 276 235 244Z',panel:'M167 244 C151 284 131 322 119 360 Q158 374 200 368 Q246 379 283 358 C264 314 248 277 233 244Z',petal:'M167 243 C146 260 128 280 119 303 Q144 317 160 309 Q177 328 200 314 Q224 328 243 309 Q265 317 283 302 C270 276 251 255 233 243Z',ballet:'M171 239 C143 249 121 264 113 278 Q139 288 157 285 Q183 300 204 289 Q229 300 246 284 Q274 288 289 278 C272 257 251 248 231 239Z',adventure:'M168 245 L234 245 Q248 270 261 302 Q242 315 223 307 Q200 319 180 306 Q157 314 140 302Z',space:'M166 242 L234 242 C250 259 258 282 261 307 Q201 323 140 306 C146 280 151 259 166 242Z',kimono:'M174 238 L227 238 C238 269 252 318 268 360 Q241 373 210 368 Q180 379 143 362 C155 320 169 279 174 238Z',column:'M170 245 L230 245 Q228 302 250 361 Q202 379 150 361 Q174 305 170 245Z',thai:'M172 239 L230 239 Q248 287 261 360 Q212 378 157 363 Q172 311 172 239Z'};
 s+=region(hems[c.dress]);
 if(['ball','panel'].includes(c.dress)){s+=region('M168 248 C156 274 137 298 121 320 Q165 313 199 263 Q240 314 280 321 C262 293 245 270 231 248Z');s+=line('M176 280 Q163 316 153 347 M189 294 Q184 328 181 357 M218 293 Q225 327 235 350 M235 279 Q248 313 262 341');}
 if(c.dress==='petal'){s+=line('M167 252 Q166 281 158 303 M185 256 Q191 286 198 308 M216 255 Q221 283 241 301');}
 if(c.dress==='ballet')s+=line('M172 247 L155 279 M187 249 L181 282 M210 249 L223 282 M230 247 L247 277');
 if(c.dress==='adventure')s+=region('M179 250 L220 250 L227 296 Q202 306 173 296Z')+line('M150 295 L162 262 M239 260 L251 296');
 if(c.dress==='kimono')s+=region('M187 254 Q175 298 163 359 L187 368 L211 265Z')+line('M221 275 Q234 318 245 355');
 if(c.dress==='thai')s+=region('M219 245 Q215 295 229 367 L247 364 Q233 302 236 254Z')+line('M178 274 Q205 283 221 276 M174 292 Q198 304 224 295 M170 312 Q198 326 224 315');
 if(c.dress==='column')s+=line('M185 259 Q190 310 175 353 M210 259 Q214 309 227 351');
 const bodice=c.dress==='kimono'?'M163 183 Q182 177 189 174 L201 188 L217 174 Q238 179 244 184 L266 235 Q250 246 230 236 L222 247 L178 247 L172 236 Q149 246 132 235Z':c.dress==='space'?'M166 180 Q201 172 236 180 L241 239 Q204 258 159 239Z':'M167 184 Q178 180 187 181 Q198 201 213 181 Q226 180 235 185 C235 204 226 224 232 244 Q202 258 168 244 C176 222 165 205 167 184Z';
 s+=region(bodice);
 if(c.dress==='kimono')s+=line('M189 181 L222 223 M212 183 L179 223 M155 198 L173 231 M244 198 L227 231');
 else s+=line('M178 198 Q197 214 224 197 M186 214 L181 239 M216 214 L220 239');
 s+=region('M167 238 Q200 247 232 238 L234 249 Q202 261 166 249Z');
 if(c.dress==='thai')s+=region('M162 183 Q173 177 184 181 L229 233 L217 246 L177 201Z');
 if(c.dress==='column')s+=region('M159 181 Q198 169 240 181 L232 208 Q200 223 168 206Z')+line('M171 186 Q199 208 230 186 M180 184 L177 197 M193 183 L193 204 M207 183 L210 204 M221 184 L226 197');
 if(c.dress==='space')s+=region('M182 210 Q201 203 220 210 L220 230 Q199 238 182 230Z')+star(202,220,7);
 return s;
}
function head(c){let s=region('M187 153 Q192 176 182 182 Q198 203 216 182 Q206 173 211 151Z');
 s+=region('M160 99 C157 116 160 140 172 155 Q183 168 198 169 Q220 170 235 151 C246 138 245 117 239 99 Q223 81 200 82 Q176 82 160 99Z');
 // Expressive eyes, eyelids, lashes, nose and smile are outlines, not oversized geometric facial parts.
 s+=`<g fill="${ink}" stroke-width="1.5"><path d="M173 124 Q181 115 190 124 Q184 137 176 131Z" fill="#fff"/><path d="M208 123 Q217 113 227 123 Q222 136 212 131Z" fill="#fff"/><path d="M177 123 C177 114 186 114 186 123 C186 136 177 136 177 123Z"/><path d="M213 122 C213 113 222 113 222 122 C222 135 213 135 213 122Z"/><path d="M179 119 Q181 115 183 120 Q182 124 179 122Z" fill="#fff" stroke="none"/><path d="M215 118 Q217 114 219 119 Q218 123 215 121Z" fill="#fff" stroke="none"/></g>`;
 s+=line('M171 122 L167 118 M173 125 L168 124 M226 120 L231 116 M227 124 L232 122 M174 110 Q181 106 189 110 M210 109 Q218 104 226 108 M199 128 Q195 138 201 137 M186 149 Q200 162 215 146 Q201 153 186 149Z',1.7);
 const fringe=c.hair==='bob'?'M145 105 C140 74 161 48 190 50 C224 38 255 65 252 104 L236 111 Q233 90 226 83 L226 105 Q218 108 212 104 L210 83 L204 106 Q189 108 184 103 L184 85 Q168 95 159 111Z':'M147 105 C134 78 156 45 190 48 C222 36 253 57 254 98 Q248 111 238 116 Q239 84 222 77 C209 102 190 102 180 93 Q171 107 156 113Z';
 s+=region(fringe)+line('M157 92 Q164 66 186 61 M195 65 Q219 48 241 79 M184 84 Q203 86 215 69',1.8);
 if(c.hair==='braid')s+=braid();
 if(c.hair==='waves'||c.hair==='curls')s+=line('M147 129 Q136 152 150 165 Q166 181 150 198 M251 135 Q263 157 249 173 Q235 190 254 208',1.8);
 if(c.hair==='pony')s+=region('M249 91 Q261 82 267 95 L261 103 Q253 105 249 98Z');
 return s;
}
function crown(type){let s='';
 if(type==='flowers')return flower(169,57,10)+flower(197,49,11)+flower(228,57,10)+leaf(156,67,-1)+leaf(242,71);
 if(type==='shell')return region('M172 66 Q166 47 178 41 Q185 32 194 39 Q202 24 211 39 Q226 32 230 44 Q241 51 231 67Z')+line('M179 48 L190 62 M197 42 L200 62 M218 44 L210 62');
 if(type==='thai')return region('M172 66 Q182 47 190 44 L199 18 Q212 45 218 47 L231 66 Q202 77 172 66Z')+region('M181 62 Q198 46 221 63 Q200 71 181 62Z')+region('M196 42 Q200 31 205 42 L201 49Z');
 if(type==='egypt')return region('M162 72 Q199 51 240 70 L238 82 Q199 65 162 83Z')+region('M194 62 Q187 43 196 36 Q206 37 202 48 L207 63Z');
 s+=region(type==='royal'?'M172 66 L166 41 Q180 46 184 54 L199 29 L214 54 Q221 44 233 42 L228 67 Q199 78 172 66Z':'M174 66 Q180 43 190 52 L200 38 L210 52 Q224 45 228 66 Q200 77 174 66Z');
 s+=region('M193 60 Q199 51 207 60 L200 68Z')+line('M179 63 Q190 66 193 64 M207 64 Q220 66 225 63',1.5);return s;
}
function embellish(c){let s='';
 if(c.pose==='flower')s+=line('M113 211 L98 180 M102 190 L88 175')+flower(99,171,14)+flower(119,181,10)+leaf(101,203,-1);
 if(c.pose==='magic')s+=line('M286 213 L319 157',3)+star(322,148,18);
 if(c.theme==='pearls')s+=line('M173 270 Q197 294 229 271 M136 333 Q166 357 198 342 M201 342 Q241 356 270 333',2);
 if(c.theme==='ribbons')s+=region('M185 244 Q177 230 167 239 Q172 252 186 252 Q199 263 206 247 Q200 234 188 243Z');
 if(c.theme==='stars')s+=star(201,301,22)+star(161,333,11)+star(246,334,12);
 if(c.theme==='snow')s+=line('M200 285 L200 323 M184 294 L216 314 M184 314 L216 294',2.3);
 if(c.theme==='rainbow')s+=region('M113 331 Q197 354 286 331 L296 346 Q207 381 101 346Z');
 if(c.theme==='butterfly')s+=butterfly(202,278);
 if(c.theme==='blossom')s+=flower(222,299,13)+flower(181,336,10);
 if(c.theme==='winter')s+=region('M127 319 Q200 340 273 319 L286 339 Q202 364 113 339Z')+flower(201,272,11);
 if(c.theme==='autumn')s+=leaf(201,323)+leaf(241,345,-1);
 if(c.theme==='garden')s+=flower(176,279,10)+flower(233,291,11);
 if(c.theme==='lotus')s+=region('M192 337 Q174 328 175 315 Q190 315 198 328 Q196 310 205 302 Q218 318 210 330 Q228 314 231 324 Q224 342 192 337Z');
 if(c.theme==='warrior')s+=region('M287 225 Q310 222 325 233 L321 283 Q306 302 287 285 L280 238Z')+star(303,254,10);
 if(c.theme==='adventure')s+=region('M270 251 Q283 236 296 250 L305 289 Q293 309 266 298Z')+line('M275 259 Q288 253 295 260 M271 279 L299 279');
 return s;
}
function make(id){const c=configs[id];if(!c)throw new Error('Unknown princess '+id);let art=background(c)+hairBack(c.hair);if(c.cape)art+=cape();if(c.wings)art+=wings();art+=legs(c.dress)+arms(c.pose)+dress(c)+head(c)+crown(c.crown)+embellish(c);
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="ภาพเจ้าหญิงสำหรับระบายสี"><g fill="#fff" stroke="${ink}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">${art}</g></svg>`;
}
window.PunPinPrincessArt={make,ids:Object.keys(configs)};
})();
