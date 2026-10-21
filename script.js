const $ = (s) => document.querySelector(s);

// Đổi mật khẩu ở đây trước khi gửi cho Thu
const PASSWORD = "Thu1909205";

const intro = $("#intro");
const letterScreen = $("#letterScreen");
const finalScreen = $("#finalScreen");
const envelope = $("#envelope");
const lockForm = $("#lockForm");
const lockInput = $("#lockInput");
const lockMsg = $("#lockMsg");
const sealBtn = $("#sealBtn");
const lockPanel = $("#lockPanel");
const startBtn = $("#startBtn");
const typedText = $("#typedText");
const music = $("#music");
const musicDisc = $("#musicDisc");
const rereadBtn = $("#rereadBtn");
const tapHint = $("#tapHint");
const toThuBtn = $("#toThuBtn");

const message = `Thu à,

Anh đã nghĩ khá lâu về cách để nói với em những điều này.

Có những người bước vào cuộc đời mình rất nhẹ nhàng,
nhưng lại khiến mọi thứ trở nên khác đi.

Với anh, em là một người như thế.

Anh không hứa rằng mọi ngày sau này
đều sẽ hoàn hảo,
nhưng anh muốn những ngày bình thường ấy
có thêm một người để cùng cười,
cùng kể chuyện,
và cùng nhớ về nhau.

Cảm ơn Thu vì đã xuất hiện
trong thế giới của anh.

♡`;

function makeStars(){
  const box = $("#stars");
  for(let i=0;i<90;i++){
    const s=document.createElement("span");
    s.className="star";
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*100+"%";
    s.style.animationDelay=(Math.random()*4)+"s";
    s.style.animationDuration=(2+Math.random()*4)+"s";
    box.appendChild(s);
  }
}

function petal(){
  const p=document.createElement("span");
  p.className="petal";
  p.textContent=Math.random()>.45?"✦":"♡";
  p.style.left=Math.random()*100+"%";
  p.style.setProperty("--x",(Math.random()*240-120)+"px");
  p.style.fontSize=(9+Math.random()*12)+"px";
  p.style.animationDuration=(7+Math.random()*7)+"s";
  $("#petals").appendChild(p);
  setTimeout(()=>p.remove(),15000);
}

let petalTimer;

function startPetals(){
  if(petalTimer) return;
  petalTimer=setInterval(petal,650);
}

function syncDisc(){
  const on = !music.paused;
  musicDisc.classList.toggle("is-on", on);
  musicDisc.setAttribute("aria-pressed", on ? "true" : "false");
}

async function playMusic(){
  music.volume=.55;
  musicDisc.classList.add("show");
  try{
    await music.play();
  }catch(e){}
  syncDisc();
}

function showScreen(screen){
  [intro,letterScreen,finalScreen].forEach(x=>x.classList.remove("active"));
  screen.classList.add("active");
}

let typeTimer=null;
let finalTimer=null;

function typeLetter(){
  if(typeTimer) clearInterval(typeTimer);
  typeTimer=null;
  if(finalTimer) clearTimeout(finalTimer);
  typedText.replaceChildren();
  for(const char of message){
    if(char === "\n") typedText.insertAdjacentHTML("beforeend","<br>");
    else typedText.append(document.createTextNode(char));
  }
  toThuBtn.hidden = false;
  finalTimer=setTimeout(()=>showScreen(finalScreen),10000);
}

function revealLetter(){
  if(finalTimer) clearTimeout(finalTimer);
  if(typeTimer) clearInterval(typeTimer);
  typedText.replaceChildren();
  showScreen(letterScreen);
  envelope.classList.remove("open","reading");
  toThuBtn.hidden = true;
  tapHint.textContent="chạm vào phong thư";
  void envelope.offsetWidth;

  setTimeout(()=>{
    envelope.classList.add("open");
    tapHint.textContent="một chút yêu thương dành cho em...";
    releaseButterflies();
  },700);

  setTimeout(()=>{
    envelope.classList.add("reading");
    tapHint.textContent="kéo để đọc hết bức thư";
    typeLetter();
  },1800);
}

const flutter = $("#flutter");
const wingColors = [
  ["#f7b7c8","#e989a8"],
  ["#ffd0de","#f3a4bc"],
  ["#f8e2c4","#e7b7c8"],
  ["#fff1f5","#f0a8c0"],
  ["#f4c3d4","#d989a6"]
];

function butterflySVG(a, b){
  return `<svg viewBox="0 0 80 64" aria-hidden="true">
    <g class="wing left">
      <path d="M38 34C28 10 4 8 6 28C8 42 26 46 38 36Z" fill="${a}"/>
      <path d="M38 36C26 40 10 54 20 60C32 62 40 46 38 36Z" fill="${b}"/>
    </g>
    <g class="wing right">
      <path d="M42 34C52 10 76 8 74 28C72 42 54 46 42 36Z" fill="${a}"/>
      <path d="M42 36C54 40 70 54 60 60C48 62 40 46 42 36Z" fill="${b}"/>
    </g>
    <path d="M40 20c.6 8 .6 22 0 32" stroke="#5c2438" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="18" r="1.7" fill="#5c2438"/>
  </svg>`;
}

function releaseButterflies(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = envelope.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height * 0.42;
  for(let i=0;i<10;i++){
    const b = document.createElement("span");
    b.className = "butterfly";
    const [a, c] = wingColors[i % wingColors.length];
    b.innerHTML = butterflySVG(a, c);
    const angle = -Math.PI * (0.15 + Math.random() * 0.7);
    const dist = 180 + Math.random() * 220;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const sway = Math.random() * 70 - 35;
    const tilt = Math.random() * 36 - 18;
    b.style.left = originX + "px";
    b.style.top = originY + "px";
    const size = 62 + Math.random() * 30;
    b.style.width = size + "px";
    b.style.height = (size * 0.8) + "px";
    flutter.appendChild(b);
    b.animate([
      { opacity: 0, transform: "translate(0px, 16px) scale(0.35) rotate(-12deg)" },
      { opacity: 1, transform: `translate(${dx * 0.25 + sway}px, ${dy * 0.2}px) scale(1) rotate(10deg)`, offset: 0.18 },
      { opacity: 1, transform: `translate(${dx * 0.7 + sway}px, ${dy * 0.72}px) scale(1) rotate(${tilt}deg)`, offset: 0.62 },
      { opacity: 0, transform: `translate(${dx + sway}px, ${dy}px) scale(0.8) rotate(${tilt}deg)` }
    ], { duration: 3400, delay: i * 70, easing: "ease-out", fill: "forwards" });
    setTimeout(()=>b.remove(), 5200);
  }
}

function openLetter(){
  playMusic();
  startPetals();
  revealLetter();
}

sealBtn.addEventListener("click",()=>{
  sealBtn.classList.add("is-gone");
  sealBtn.setAttribute("aria-expanded","true");
  window.setTimeout(()=>{
    sealBtn.hidden = true;
    lockPanel.hidden = false;
    lockInput.focus();
  },220);
});

lockForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const typed = lockInput.value.trim();

  if(typed !== PASSWORD){
    lockMsg.textContent = "Đoán lại đi nè";
    lockForm.classList.remove("lock--shake");
    void lockForm.offsetWidth;
    lockForm.classList.add("lock--shake");
    lockInput.select();
    return;
  }

  lockMsg.textContent = "";
  startBtn.disabled = true;
  startBtn.lastChild.textContent = " Đang mở...";
  openLetter();
});

envelope.addEventListener("click",()=>{
  if(!envelope.classList.contains("open")){
    playMusic();
    revealLetter();
  }
});

rereadBtn.addEventListener("click",()=>{
  playMusic();
  revealLetter();
});

const surpriseBtn = $("#surpriseBtn");
const gift = $("#gift");
const giftBox = $("#giftBox");
const giftHint = $("#giftHint");
const giftReveal = $("#giftReveal");
const giftBack = $("#giftBack");

surpriseBtn.addEventListener("click",()=>{
  surpriseBtn.hidden = true;
  gift.hidden = false;
  gift.scrollIntoView({behavior:"smooth",block:"nearest"});
});

giftBox.addEventListener("click",()=>{
  if(giftBox.classList.contains("is-open")) return;
  giftBox.classList.add("is-open");
  giftBox.setAttribute("aria-expanded","true");
  giftHint.hidden = true;
  window.setTimeout(()=>{
    giftReveal.hidden = false;
    requestAnimationFrame(()=>giftReveal.classList.add("show"));
  },320);
});

function backToThu(){
  if(finalTimer) clearTimeout(finalTimer);
  giftReveal.classList.remove("show");
  giftReveal.hidden = true;
  showScreen(finalScreen);
}

toThuBtn.addEventListener("click", backToThu);

giftBack.addEventListener("click",()=>{
  giftBox.classList.remove("is-open");
  giftBox.setAttribute("aria-expanded","false");
  giftHint.hidden = false;
  backToThu();
});

musicDisc.addEventListener("click",()=>{
  if(music.paused) playMusic();
  else{
    music.pause();
    syncDisc();
  }
});

makeStars();

/* ===== Falling photos + wishes ===== */
const fallBox = document.getElementById("fallingGallery");
const wishes = [
  "Nếu ai hỏi anh định chúc ai 20/10, thì câu trả lời chắc chắn là… người đang đọc tin nhắn này nè.",
  "Chúc em ngày 20/10 rực rỡ như filter Instagram và chill như nhạc Lofi tối muộn.",
  "Mong hôm nay có thật nhiều điều nhỏ bé khiến em mỉm cười",
  "chúc cô gái khiến anh mỉm cười mỗi khi nghĩ đến sẽ có thật nhiều niềm vui và hoa tươi nhé",
  "20/10 là ngày của phái đẹp, nhưng anh tin em xứng đáng có thêm 364 ngày còn lại cũng tỏa sáng như hôm nay",
  "Nếu mỗi người phụ nữ là một bông hoa, thì em chắc chắn là đóa hoa đặc biệt nhất trong lòng anh",
  "Không cần những thứ đắt tiền, chỉ cần em luôn vui và hạnh phúc – với anh đó đã là món quà lớn nhất.",
  "Anh không giỏi nói lời ngọt ngào, nhưng 20/10 này, anh chỉ muốn em biết rằng: Em thật đặc biệt!",
  "Không cần 20/10, mỗi ngày anh đều thấy em là lý do khiến thế giới đẹp hơn.",
  "Mong em có một ngày Phụ nữ thật đặc biệt, vì với anh, em đã đặc biệt từ lâu rồi. "
];

const photos = Array.from({length:19}, (_, i) => `images/thu${i + 1}.jpg`);

function createFallingItem(){
  const item=document.createElement("div");
  item.className="fall-item";
  const img=document.createElement("img");
  img.src=photos[Math.floor(Math.random()*photos.length)];
  img.alt="";
  img.onerror=()=>{img.remove();};
  const wish=document.createElement("div");
  wish.className="fall-wish";
  wish.textContent=wishes[Math.floor(Math.random()*wishes.length)];
  const spark=document.createElement("span");
  spark.className="fall-spark";
  item.append(img,wish,spark);
  item.addEventListener("click",(e)=>{
    e.stopPropagation();
    if(!img.isConnected) return;
    openPhoto(img.currentSrc || img.src, wish.textContent);
  });
  const cardW=window.innerWidth<600?82:112;
  const maxLeft=Math.max(8,window.innerWidth-cardW-12);
  item.style.left=Math.floor(Math.random()*maxLeft)+"px";
  item.style.setProperty("--x",(Math.random()*48-24)+"px");
  item.style.setProperty("--r",(Math.random()*34-17)+"deg");
  item.style.setProperty("--d",(5+Math.random()*5)+"s");
  fallBox.appendChild(item);
  setTimeout(()=>item.remove(),11000);
}

let rainTimer;
function startPhotoRain(){
  if(rainTimer)return;
  rainTimer=setInterval(createFallingItem,480);
  for(let i=0;i<10;i++) setTimeout(createFallingItem,i*220);
}
const photoZoom = document.getElementById("photoZoom");
const photoZoomImg = document.getElementById("photoZoomImg");
const photoZoomWish = document.getElementById("photoZoomWish");

function openPhoto(src, wish){
  photoZoomImg.src = src;
  photoZoomWish.textContent = wish || "";
  photoZoom.hidden = false;
  requestAnimationFrame(()=>photoZoom.classList.add("show"));
}

function closePhoto(){
  photoZoom.classList.remove("show");
  setTimeout(()=>{
    if(!photoZoom.classList.contains("show")) photoZoom.hidden = true;
  },360);
}

photoZoom.addEventListener("click",(e)=>{
  if(e.target === photoZoom || e.target.id === "photoZoomClose") closePhoto();
});
document.addEventListener("keydown",(e)=>{
  if(e.key === "Escape") closePhoto();
});

const oldStart = startPetals;
startPetals = function(){
  oldStart();
  startPhotoRain();
};
