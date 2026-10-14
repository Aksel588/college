function stagtselpahots(banali) {
 let vichak = JSON.parse(localStorage.getItem(banali)) || [];

 return {
 stanalapranqnere: function () {
 return [...vichak];
 },
 avelacnelapranq: function (apranq) {
 const kay = vichak.find((tar) => tar.id === apranq.id);
 if (kay) {
 kay.quantity = (kay.quantity || 1) + 1;
 } else {
 vichak.push({ ...apranq, quantity: 1 });
 }
 this.pahal();
 },
 hacnelapranq: function (id) {
 vichak = vichak.filter((tar) => tar.id !== Number(id));
 this.pahal();
 },
 avelacnelqashil: function (apranq) {
 const tegh = vichak.findIndex((tar) => tar.id === apranq.id);
 if (tegh > -1) {
 vichak.splice(tegh, 1);
 } else {
 vichak.push(apranq);
 }
 this.pahal();
 },
 qanakpoxel: function (id, ppx) {
 const apranq = vichak.find((tar) => tar.id === Number(id));
 if (apranq) {
 apranq.quantity += ppx;
 if (apranq.quantity <= 0) {
 this.hacnelapranq(id);
 return;
 }
 }
 this.pahal();
 },
 stugelsirats: function (id) {
 return vichak.some((tar) => tar.id === Number(id));
 },
 pahal: function (norvichak) {
 if (norvichak !== undefined) vichak = norvichak;
 localStorage.setItem(banali, JSON.stringify(vichak));
 tharmatsneltverey();
 }
 };
}

const zambyughipahots = stagtselpahots("cart");
const siratsipahots = stagtselpahots("favorites");


function tharmatsneltverey() {
 const zambyughtiv = document.getElementById("zambyugh-qanak");
 const siratstiv = document.getElementById("sirats-qanak");
 if (zambyughtiv) {
 const qanak = zambyughipahots.stanalapranqnere().reduce((gumar, apranq) => gumar + apranq.quantity, 0);
 zambyughtiv.textContent = qanak;
 }
 if (siratstiv) siratstiv.textContent = siratsipahots.stanalapranqnere().length;
}


function cuygtsanucum(haghordagrutyun) {
 const tsanucum = document.getElementById("tsanucum");
 if (!tsanucum) return;
 tsanucum.textContent = haghordagrutyun;
 tsanucum.classList.add("show");
 setTimeout(() => tsanucum.classList.remove("show"), 2500);
}