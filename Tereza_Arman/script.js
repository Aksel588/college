let db = null;
let SQL = null;
let selectedCategory = "all";
let cart = JSON.parse(localStorage.getItem("styleHouseCart") || "[]");
let favorites = JSON.parse(localStorage.getItem("styleHouseFavorites") || "[]");
const $ = id => document.getElementById(id);
const productsContainer = $("products");
const searchInput = $("search");
const genderFilter = $("genderFilter");
const sortSelect = $("sort");
const sqlEditor = $("sqlQuery");
const sqlResults = $("sqlResults");
const sqlMessage = $("sqlMessage");
const sqlStatus = $("sqlStatus");
const runSqlBtn = $("runSqlBtn");
const productSeed = [{"id": 1, "name": "Կանացի վերնաշապիկ", "price": 12000, "category": "women", "gender": "women", "image": "https://i.pinimg.com/originals/4d/d8/45/4dd84582abfc54b8fa451c52e90ca772.png"}, {"id": 2, "name": "Կանացի տաբատ", "price": 15000, "category": "women", "gender": "women", "image": "https://img.kwcdn.com/product/fancy/cfd1675c-ccc1-4b3c-9533-d231b801c724.jpg?imageMogr2/thumbnail/800x9999%3E/quality/70/format/avif"}, {"id": 3, "name": "Կանացի բլուզ", "price": 8000, "category": "women", "gender": "women", "image": "https://i.pinimg.com/736x/de/4a/e9/de4ae9f43c0cd536f47359c5c1c8b844.jpg"}, {"id": 4, "name": "Երեկոյան զգեստ", "price": 28000, "category": "dresses", "gender": "women", "image": "https://i.pinimg.com/736x/c7/ca/e6/c7cae6d69b606a0c459b544477ef8c94.jpg"}, {"id": 5, "name": "Սև երեկոյան զգեստ", "price": 32000, "category": "dresses", "gender": "women", "image": "https://img.staticdj.com/a820a3dcf54710024f603ce27060767d_720x.jpg"}, {"id": 6, "name": "Կանացի բաճկոն", "price": 25000, "category": "jackets", "gender": "women", "image": "https://i.pinimg.com/736x/dc/64/ce/dc64cef29e927817f6521b2d9af3288b.jpg"}, {"id": 7, "name": "Կանացի սպորտային հագուստ", "price": 20000, "category": "sportswear", "gender": "women", "image": "https://i.pinimg.com/736x/ea/fa/58/eafa58faf61024f15a78c9557ffcde2c.jpg"}, {"id": 8, "name": "Կանացի սպորտային շապիկ", "price": 9000, "category": "sportswear", "gender": "women", "image": "https://i.pinimg.com/736x/db/bc/a9/dbbca913f98847367786b9c11e644331.jpg"}, {"id": 9, "name": "Կանացի սպորտային կոշիկ", "price": 18000, "category": "shoes", "gender": "women", "image": "https://i.pinimg.com/originals/50/98/da/5098da6207cdee3ff6d3c0bc6b196e5f.png"}, {"id": 10, "name": "Կանացի դասական կոշիկ", "price": 22000, "category": "shoes", "gender": "women", "image": "https://i.pinimg.com/736x/48/0a/85/480a85d8076945982e02a0de72fbb049.jpg"}, {"id": 11, "name": "Տղամարդու վերնաշապիկ", "price": 14000, "category": "men", "gender": "men", "image": "https://i.pinimg.com/736x/3d/f1/8b/3df18be99cda6fddaf847635815df873.jpg"}, {"id": 12, "name": "Տղամարդու ջինս", "price": 16000, "category": "men", "gender": "men", "image": "https://i.pinimg.com/736x/c3/e5/43/c3e543d91f4a97936d5631ef4f863141.jpg"}, {"id": 13, "name": "Տղամարդու բլուզ", "price": 8000, "category": "men", "gender": "men", "image": "https://i.pinimg.com/1200x/38/05/58/380558f87408d3f2f88f62fef21dbbe9.jpg"}, {"id": 14, "name": "Տղամարդու ջինս", "price": 17000, "category": "men", "gender": "men", "image": "https://i.pinimg.com/1200x/a3/1b/76/a31b76cbfc6624831e8c94ba074d55bc.jpg"}, {"id": 15, "name": "Տղամարդու բաճկոն", "price": 27000, "category": "jackets", "gender": "men", "image": "https://i.pinimg.com/1200x/0c/4d/9e/0c4d9ee0ad0636b2e4d8aafc52853215.jpg"}, {"id": 16, "name": "Տղամարդու սպորտային հագուստ", "price": 21000, "category": "sportswear", "gender": "men", "image": "https://i.pinimg.com/736x/c9/73/ad/c973ad7b9446e955193dfa13f0cb0863.jpg"}, {"id": 17, "name": "Տղամարդու սպորտային շապիկ", "price": 9000, "category": "sportswear", "gender": "men", "image": "https://i.pinimg.com/236x/1f/80/5c/1f805c546535ee7c5caec833ccfff657.jpg"}, {"id": 18, "name": "Տղամարդու սպորտային կոշիկ", "price": 19000, "category": "shoes", "gender": "men", "image": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80"}, {"id": 19, "name": "Տղամարդու դասական կոշիկ", "price": 24000, "category": "shoes", "gender": "men", "image": "https://i.pinimg.com/736x/51/10/ac/5110ac0eae12a2e555212ef80242545f.jpg"}, {"id": 20, "name": "Տղամարդու ձմեռային բաճկոն", "price": 30000, "category": "jackets", "gender": "men", "image": "https://i.pinimg.com/736x/2f/6a/16/2f6a166a3a6b37b3bea16c5472705b50.jpg"}];

function showToast(message) {
  const toast = $("toast"); toast.textContent = message; toast.style.display = "block";
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.style.display = "none", 2200);
}
function saveData() {
  localStorage.setItem("styleHouseCart", JSON.stringify(cart));
  localStorage.setItem("styleHouseFavorites", JSON.stringify(favorites));
}
function getProductsFromDb() {
  if (!db) return [];
  const result = db.exec("SELECT id, name, price, category, gender, image FROM products ORDER BY id");
  if (!result.length) return [];
  return result[0].values.map(row => ({id:Number(row[0]),name:row[1],price:Number(row[2]),category:row[3],gender:row[4],image:row[5]}));
}
function renderProducts() {
  const search = searchInput.value.trim().toLowerCase();
  let filtered = getProductsFromDb().filter(p => {
    const cat = selectedCategory === "all" || p.category === selectedCategory || (selectedCategory === "women" && p.gender === "women") || (selectedCategory === "men" && p.gender === "men");
    return cat && (genderFilter.value === "all" || p.gender === genderFilter.value) && p.name.toLowerCase().includes(search);
  });
  if (sortSelect.value === "low") filtered.sort((a,b) => a.price-b.price);
  if (sortSelect.value === "high") filtered.sort((a,b) => b.price-a.price);
  productsContainer.innerHTML = "";
  if (!filtered.length) { productsContainer.innerHTML = "<p>Ապրանք չի գտնվել։</p>"; return; }
  filtered.forEach(p => {
    const card = document.createElement("article"); card.className = "product-card";
    const image = document.createElement("div"); image.className = "product-image";
    const img = document.createElement("img"); img.src = p.image; img.alt = p.name; img.loading = "lazy"; img.onerror = () => img.style.display = "none"; image.appendChild(img);
    const name = document.createElement("h3"); name.textContent = p.name;
    const price = document.createElement("p"); price.className = "price"; price.textContent = p.price.toLocaleString("hy-AM") + " դրամ";
    const actions = document.createElement("div"); actions.className = "product-actions";
    const add = document.createElement("button"); add.textContent = "Ավելացնել զամբյուղ"; add.addEventListener("click", () => addToCart(p.id));
    const fav = document.createElement("button"); fav.className = "favorite-btn"; fav.textContent = favorites.includes(p.id) ? "♥" : "♡"; fav.setAttribute("aria-label","Սիրվածներ"); fav.addEventListener("click", () => toggleFavorite(p.id));
    actions.append(add,fav); card.append(image,name,price,actions); productsContainer.appendChild(card);
  });
}
function updateCounts() { $("cartCount").textContent = cart.reduce((s,x)=>s+x.quantity,0); $("favoritesCount").textContent = favorites.length; }
function addToCart(id) { const item=cart.find(x=>x.id===id); if(item)item.quantity++; else cart.push({id,quantity:1}); saveData(); updateCounts(); renderCart(); showToast("Ապրանքը ավելացվեց զամբյուղում։"); }
function removeFromCart(id) { cart=cart.filter(x=>x.id!==id); saveData(); updateCounts(); renderCart(); }
function renderCart() {
  const c=$("cartItems"); c.innerHTML=""; let total=0; const products=getProductsFromDb();
  cart.forEach(item=>{const p=products.find(x=>x.id===item.id); if(!p)return; total+=p.price*item.quantity; const d=document.createElement("div"); d.className="cart-item"; d.innerHTML=`<strong></strong><br>Քանակ՝ ${item.quantity}<br>Գին՝ ${(p.price*item.quantity).toLocaleString("hy-AM")} դրամ<br>`; d.querySelector("strong").textContent=p.name; const b=document.createElement("button"); b.textContent="Հեռացնել"; b.addEventListener("click",()=>removeFromCart(p.id)); d.appendChild(b); c.appendChild(d);});
  if(!cart.length)c.innerHTML="<p>Զամբյուղը դատարկ է։</p>"; $("cartTotal").textContent="Ընդհանուր՝ "+total.toLocaleString("hy-AM")+" դրամ";
}
function toggleFavorite(id) { favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id]; saveData(); updateCounts(); renderFavorites(); renderProducts(); showToast(favorites.includes(id)?"Ավելացվեց սիրվածներում։":"Հեռացվեց սիրվածներից։"); }
function renderFavorites() {
  const c=$("favoriteItems"); c.innerHTML=""; const products=getProductsFromDb();
  favorites.forEach(id=>{const p=products.find(x=>x.id===id);if(!p)return;const d=document.createElement("div");d.className="favorite-item";const strong=document.createElement("strong");strong.textContent=p.name;d.append(strong,document.createElement("br"));d.append(document.createTextNode(p.price.toLocaleString("hy-AM")+" դրամ"));const add=document.createElement("button");add.textContent="Զամբյուղ";add.addEventListener("click",()=>addToCart(p.id));const rem=document.createElement("button");rem.textContent="Հեռացնել";rem.addEventListener("click",()=>toggleFavorite(p.id));d.append(add,rem);c.appendChild(d);});
  if(!favorites.length)c.innerHTML="<p>Սիրված ապրանքներ չկան։</p>";
}
function openPanel(id){$(id).classList.add("open");$("overlay").classList.add("show");}
function closePanels(){$("cartPanel").classList.remove("open");$("favoritesPanel").classList.remove("open");$("overlay").classList.remove("show");}
function renderSqlTable(columns, rows) {
  if(!columns.length){sqlResults.innerHTML='<div class="sql-empty">Հրամանը հաջողությամբ կատարվեց։ Աղյուսակային արդյունք չկա։</div>';return;}
  if(!rows.length){sqlResults.innerHTML='<div class="sql-empty">Հարցումը կատարվեց, բայց տողեր չգտնվեցին։</div>';return;}
  const table=document.createElement("table"),thead=document.createElement("thead"),tr=document.createElement("tr");
  columns.forEach(c=>{const th=document.createElement("th");th.textContent=c;tr.appendChild(th);});thead.appendChild(tr);table.appendChild(thead);
  const tbody=document.createElement("tbody");rows.forEach(row=>{const tr=document.createElement("tr");row.forEach(v=>{const td=document.createElement("td");td.textContent=v===null?"NULL":String(v);tr.appendChild(td);});tbody.appendChild(tr);});table.appendChild(tbody);sqlResults.replaceChildren(table);
}
function runSql() {
  if(!db)return; const query=sqlEditor.value.trim(); if(!query){sqlMessage.textContent="Գրիր SQL հարցում։";sqlMessage.className="sql-message error";return;}
  try {const output=db.exec(query);if(!output.length){sqlResults.innerHTML='<div class="sql-empty">Հրամանը հաջողությամբ կատարվեց։ Աղյուսակային արդյունք չկա։</div>';sqlMessage.textContent="Հրամանը կատարվեց։";}else{renderSqlTable(output[0].columns,output[0].values);sqlMessage.textContent=`Հաջողվեց։ Տողերի քանակը՝ ${output[0].values.length}`;}sqlMessage.className="sql-message success"; if(/\b(insert|update|delete|replace|create|drop|alter)\b/i.test(query)){renderProducts();renderCart();renderFavorites();updateCounts();}}
  catch(e){sqlResults.innerHTML='<div class="sql-empty"></div>';sqlResults.firstChild.textContent="SQL սխալ․ "+e.message;sqlMessage.textContent="Հարցումը չկատարվեց։";sqlMessage.className="sql-message error";}
}
async function initDatabase() {
  try {
    if(typeof initSqlJs!=="function") throw new Error("SQLite գրադարանը չբեռնվեց։ Ստուգիր ինտերնետ կապը։");
    SQL=await initSqlJs({locateFile:file=>`https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`}); db=new SQL.Database();
    db.run(`CREATE TABLE products(id INTEGER PRIMARY KEY,name TEXT NOT NULL,price INTEGER NOT NULL,category TEXT NOT NULL,gender TEXT NOT NULL,image TEXT NOT NULL);`);
    const stmt=db.prepare("INSERT INTO products (id,name,price,category,gender,image) VALUES (?,?,?,?,?,?)");
    productSeed.forEach(p=>stmt.run([p.id,p.name,p.price,p.category,p.gender,p.image])); stmt.free();
    $("dbStatus").textContent="SQLite բազան պատրաստ է • 20 ապրանք";
    sqlStatus.textContent="Միացված է Style House-ի products աղյուսակին։";sqlStatus.classList.add("ready");runSqlBtn.disabled=false;
    renderProducts();renderCart();renderFavorites();updateCounts();runSql();
  } catch(e){$("dbStatus").textContent="SQLite բազայի սխալ";$("dbStatus").classList.add("error");sqlStatus.textContent="Չհաջողվեց բեռնել SQLite-ը։ Ստուգիր ինտերնետ կապը։";sqlStatus.classList.add("error");sqlMessage.textContent=e.message;sqlMessage.className="sql-message error";}
}

document.querySelectorAll(".category-btn").forEach(b=>b.addEventListener("click",()=>{selectedCategory=b.dataset.category;document.querySelectorAll(".category-btn").forEach(x=>x.classList.toggle("active",x===b));renderProducts();}));
searchInput.addEventListener("input",renderProducts);genderFilter.addEventListener("change",renderProducts);sortSelect.addEventListener("change",renderProducts);
$("cartBtn").addEventListener("click",()=>{renderCart();openPanel("cartPanel");});$("favoritesBtn").addEventListener("click",()=>{renderFavorites();openPanel("favoritesPanel");});
$("closeCart").addEventListener("click",closePanels);$("closeFavorites").addEventListener("click",closePanels);$("overlay").addEventListener("click",closePanels);
$("checkoutBtn").addEventListener("click",()=>showToast(cart.length?"Պատվերի ձևակերպման սերվերը դեռ միացված չէ։":"Զամբյուղը դատարկ է։"));
runSqlBtn.addEventListener("click",runSql);sqlEditor.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter")runSql();});
document.querySelectorAll(".sql-example-btn[data-sql]").forEach(b=>b.addEventListener("click",()=>{sqlEditor.value=b.dataset.sql;runSql();}));
$("clearSqlBtn").addEventListener("click",()=>{sqlResults.innerHTML='<div class="sql-empty">Արդյունքը մաքրված է։</div>';sqlMessage.textContent="Արդյունքը մաքրված է։";sqlMessage.className="sql-message";});
$("resetSqlBtn").addEventListener("click",()=>{if(!db)return;db.close();db=new SQL.Database();db.run("CREATE TABLE products(id INTEGER PRIMARY KEY,name TEXT NOT NULL,price INTEGER NOT NULL,category TEXT NOT NULL,gender TEXT NOT NULL,image TEXT NOT NULL);");const stmt=db.prepare("INSERT INTO products (id,name,price,category,gender,image) VALUES (?,?,?,?,?,?)");productSeed.forEach(p=>stmt.run([p.id,p.name,p.price,p.category,p.gender,p.image]));stmt.free();sqlEditor.value="SELECT * FROM products;";renderProducts();runSql();sqlStatus.textContent="products աղյուսակը վերականգնվեց սկզբնական 20 ապրանքներով։";});
initDatabase();
