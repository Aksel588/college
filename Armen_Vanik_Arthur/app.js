// Add one unit to the cart, but never more than the stock in the database
async function avelacnelzambyugh(apranqiid) {
    try {
        const apranq = await apranqistatsumbyid(apranqiid);
        const kay = zambyughipahots.stanalapranqnere().find((x) => x.id === apranq.id);
        const ayjm = kay ? kay.quantity : 0;
        if (apranq.stock <= 0) return cuygtsanucum("Ապրանքը վերջացել է");
        if (ayjm + 1 > apranq.stock) return cuygtsanucum("Պահեստում այլևս չկա");
        zambyughipahots.avelacnelapranq(apranq);
        cuygtsanucum("Ապրանքը ավելացվեց զամբյուղ");
    } catch (sxal) {
        cuygtsanucum(sxal.message);
    }
}

async function poxelsirats(apranqiid) {
    try {
        const apranq = await apranqistatsumbyid(apranqiid);
        siratsipahots.avelacnelqashil(apranq);
    } catch (sxal) {
        cuygtsanucum(sxal.message);
    }
}

function lrseliradardzutyunner(konteyneriid) {
 const konteyner = document.getElementById(konteyneriid);
 if (!konteyner) return;

 konteyner.addEventListener("click", async function (iradardzutyun) {
 const npatak = iradardzutyun.target;
 const qart = npatak.closest(".product-card");
 if (!qart) return;

 const apranqiid = Number(qart.dataset.id);

 if (npatak.classList.contains("fav-btn")) {
 await poxelsirats(apranqiid);
 npatak.classList.toggle("active");
 if (typeof nkarsiratsner === "function") nkarsiratsner();
 return;
 }
 if (npatak.classList.contains("btn-detail")) {
 batsellracucich(apranqiid);
 return;
 }
 if (npatak.classList.contains("btn-cart")) {
 await avelacnelzambyugh(apranqiid);
 return;
 }
 });
}


function nkartsncel(apranqner, konteyneriid) {
 const konteyner = document.getElementById(konteyneriid);
 if (!konteyner) return;

 konteyner.innerHTML = apranqner.map(apranq => {
 const siratse = siratsipahots.stugelsirats(apranq.id);
 const astgher = "⭐".repeat(Math.round(apranq.rating));
 const verjacel = apranq.stock <= 0;

 return `
 <article class="product-card" data-id="${apranq.id}">
 <img src="${apranq.image}" alt="${apranq.title}">
 <button class="fav-btn ${siratse ? 'active' : ''}">♥</button>
 <h3>${apranq.title}</h3>
 <p class="desc">${apranq.description}</p>
 <div class="rating">${astgher} ${apranq.rating}</div>
 <div class="price">$${apranq.price}</div>
 <div class="desc">${verjacel ? 'Վերջացել է' : 'Առկա է: ' + apranq.stock + ' հատ'}</div>
 <div class="card-btns">
 <button class="btn-detail">Մանրամասն</button>
 <button class="btn-cart" ${verjacel ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>Զամբյուղ</button>
 </div>
 </article>
 `;
 }).join("");

 lrseliradardzutyunner(konteyneriid);
}


async function batsellracucich(apranqiid) {
 const patuhan = document.getElementById("lracucich-patuhan");
 if (!patuhan) return;

 try {
 const apranq = await apranqistatsumbyid(apranqiid);
 const siratse = siratsipahots.stugelsirats(apranq.id);

 patuhan.innerHTML = `
 <div class="modal-content">
 <span class="close-modal" onclick="pakellracucich()">✖</span>
 <img src="${apranq.image}" class="modal-img">
 <h2>${apranq.title}</h2>
 <p style="color: #94a3b8; margin: 0.5rem 0;">${apranq.description}</p>
 <p><b>Բաժին:</b> ${apranq.category}</p>
 <p><b>Առկա է:</b> ${apranq.stock} հատ</p>
 <p><b>Վարկանիշ:</b> ⭐ ${apranq.rating}</p>
 <h3 style="color: #06b6d4; margin: 0.8rem 0;">$${apranq.price}</h3>
 <div style="display:flex; gap: 0.8rem; margin-top: 1rem;">
 <button class="btn-cart" style="flex:1; padding: 0.7rem; border:none; border-radius:6px; font-weight:bold; cursor:pointer;" onclick="avelacnelzambyugh(${apranq.id});">Զամբյուղ</button>
 <button class="fav-btn ${siratse ? 'active' : ''}" style="position:static; width:45px; height:45px;" onclick="poxelsirats(${apranq.id}).then(function(){ pakellracucich(); if (typeof nkarsiratsner === 'function') nkarsiratsner(); });">♥</button>
 </div>
 </div>
 `;
 patuhan.classList.remove("hidden");
 } catch (sxal) {
 cuygtsanucum(sxal.message);
 }
}


function pakellracucich() {
 const patuhan = document.getElementById("lracucich-patuhan");
 if (patuhan) patuhan.classList.add("hidden");
}

tharmatsneltverey();