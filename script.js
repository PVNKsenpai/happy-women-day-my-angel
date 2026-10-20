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
const startBtn = $("#startBtn");
const typedText = $("#typedText");
const music = $("#music");
const musicPill = $("#musicPill");
const musicBtn = $("#musicBtn");
const rereadBtn = $("#rereadBtn");
const tapHint = $("#tapHint");

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

async function playMusic(){
  music.volume=.55;
  try{
    await music.play();
    musicPill.classList.add("show");
  }catch(e){}
}

function showScreen(screen){
  [intro,letterScreen,finalScreen].forEach(x=>x.classList.remove("active"));
  screen.classList.add("active");
}

let typeTimer=null;
let finalTimer=null;
let typeToken=0;

function typeLetter(){
  const token=++typeToken;
  if(typeTimer) clearInterval(typeTimer);
  if(finalTimer) clearTimeout(finalTimer);
  typedText.replaceChildren();
  let i=0;
  const paper=typedText.closest(".paper-inner");
  typeTimer=setInterval(()=>{
    if(token!==typeToken) return;
    const char=message[i++];
    if(char === "\n"){
      typedText.insertAdjacentHTML("beforeend","<br>");
    }else{
      typedText.append(document.createTextNode(char));
    }
    if(paper) paper.scrollTop=paper.scrollHeight;
    if(i>=message.length){
      clearInterval(typeTimer);
      typeTimer=null;
      finalTimer=setTimeout(()=>showScreen(finalScreen),12000);
    }
  },28);
}

function revealLetter(){
  if(finalTimer) clearTimeout(finalTimer);
  typeToken++;
  if(typeTimer) clearInterval(typeTimer);
  typedText.replaceChildren();
  showScreen(letterScreen);
  envelope.classList.remove("open","reading");
  tapHint.textContent="chạm vào phong thư";
  void envelope.offsetWidth;

  setTimeout(()=>{
    envelope.classList.add("open");
    tapHint.textContent="một chút yêu thương dành cho em...";
  },700);

  setTimeout(()=>{
    envelope.classList.add("reading");
    tapHint.textContent="kéo để đọc hết bức thư";
    typeLetter();
  },1800);
}

function openLetter(){
  playMusic();
  startPetals();
  revealLetter();
}

lockForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const typed = lockInput.value.trim();

  if(typed !== PASSWORD){
    lockMsg.textContent = "Sai mật khẩu rồi nè 😝";
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

lockInput.focus();

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

musicBtn.addEventListener("click",()=>{
  if(music.paused){
    music.play();
    musicBtn.querySelector("span").textContent="Nhạc đang phát";
  }else{
    music.pause();
    musicBtn.querySelector("span").textContent="Nhạc đã tạm dừng";
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
    openPhoto(img.currentSrc || img.src);
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

function openPhoto(src){
  photoZoomImg.src = src;
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
