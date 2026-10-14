<!DOCTYPE html>
<html lang="hy">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>StyleHub | Հագուստի խանութ</title>
<style>
:root{--bg:#f5f6fa;--ink:#202332;--muted:#72788a;--accent:#3f63e9;--card:#fff;--line:#e4e7ef}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Arial,sans-serif}header{background:#171a25;color:white;padding:18px 6%;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap}.logo{font-size:27px;font-weight:800;letter-spacing:-1px}.logo span{color:#7790ff}header p{margin:0;color:#c5c9d6}.hero{padding:44px 6%;background:linear-gradient(115deg,#242a3c,#515d80);color:white}.hero h1{font-size:clamp(30px,4vw,48px);margin:0 0 12px}.hero p{color:#e2e5ef;line-height:1.6;margin:0}.wrap{padding:30px 6%;max-width:1500px;margin:auto}.title-row{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;margin-bottom:18px}.title-row h2{margin:0}.filters{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:22px}.field,select,textarea{width:100%;padding:12px;border:1px solid var(--line);border-radius:9px;background:white;color:var(--ink);font-size:14px}.btn{border:0;border-radius:9px;padding:12px 16px;background:var(--accent);color:white;font-weight:700;cursor:pointer}.btn:hover{filter:brightness(1.08)}.btn.gray{background:#60697d}.btn.red{background:#c43d4d}.products{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}.card{background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden;box-shadow:0 5px 20px #1a234008}.card img{display:block;width:100%;height:220px;object-fit:cover;background:#e8eaf1}.info{padding:16px}.info h3{margin:0 0 8px;font-size:19px}.meta{color:var(--muted);font-size:13px;line-height:1.8}.price{font-size:22px;font-weight:800;color:var(--accent);margin:12px 0}.badge{display:inline-block;font-size:12px;font-weight:700;border-radius:20px;padding:6px 10px;background:#e1f6e9;color:#197442}.badge.limited{background:#fff1cc;color:#895d00}.badge.out{background:#ffe3e5;color:#b12333}.delete{width:100%;margin-top:13px}.empty{padding:40px;text-align:center;color:var(--muted);grid-column:1/-1}.panel{margin-top:36px;padding:24px;background:white;border:1px solid var(--line);border-radius:14px}.panel h2{margin-top:0}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin:18px 0}.panel textarea{min-height:90px;resize:vertical}#notice{margin:12px 0;color:var(--accent);font-weight:700}.count{color:var(--muted);margin:0 0 15px}footer{text-align:center;padding:25px;background:#171a25;color:#c5c9d6;margin-top:40px}@media(max-width:600px){header,.hero,.wrap{padding-left:5%;padding-right:5%}}
</style>
</head>
<body>
<header><div class="logo">Style<span>Hub</span></div><p>Քո ոճը՝ մեր ընտրությամբ</p></header>
<section class="hero"><h1>Հագուստ՝ ամեն օրվա համար</h1><p>Դիտիր տեսականին, որոնիր ապրանքներ և ընտրիր քեզ համապատասխան ոճը։<br>Ապրանքների տվյալները բեռնվում են MySQL տվյալների բազայից PHP-ի միջոցով։</p></section>
<main class="wrap">
<div class="title-row"><h2>Ապրանքների կատալոգ</h2><button class="btn gray" onclick="loadProducts()">Թարմացնել</button></div>
<div class="filters">
<input class="field" id="search" placeholder="Որոնել ապրանքներ...">
<select id="category"><option value="">Բոլոր կատեգորիաները</option><option>Շապիկ</option><option>Հուդի</option><option>Բաճկոն</option><option>Զգեստ</option><option>Տաբատ</option></select>
<select id="size"><option value="">Բոլոր չափսերը</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option></select>
<select id="gender"><option value="">Բոլորի համար</option><option>Տղամարդու</option><option>Կանացի</option><option>Unisex</option></select>
<select id="stock"><option value="">Բոլոր կարգավիճակները</option><option value="available">Առկա է</option><option value="limited">Սահմանափակ քանակով</option><option value="out">Առկա չէ</option></select>
<input class="field" id="maxPrice" type="number" min="0" placeholder="Առավելագույն գին (դր.)">
<select id="sort"><option value="newest">Նոր ավելացվածներ</option><option value="price_asc">Գին՝ ցածրից բարձր</option><option value="price_desc">Գին՝ բարձրից ցածր</option><option value="name">Անվանում՝ Ա-Ֆ</option></select>
<button class="btn gray" onclick="resetFilters()">Մաքրել ֆիլտրերը</button>
</div>
<p class="count" id="count">Բեռնվում է...</p><div id="products" class="products"></div><div id="notice" role="status"></div>
<section class="panel"><h2>Ավելացնել նոր ապրանք</h2><p class="meta">Տվյալները կպահպանվեն MySQL-ի <b>products</b> աղյուսակում՝ PHP-ի միջոցով։</p>
<form id="productForm"><div class="form-grid">
<input class="field" name="name" placeholder="Ապրանքի անվանումը" required maxlength="150">
<select name="category" required><option value="">Կատեգորիա</option><option>Շապիկ</option><option>Հուդի</option><option>Բաճկոն</option><option>Զգեստ</option><option>Տաբատ</option><option>Կոշիկ</option><option>Աքսեսուար</option></select>
<select name="gender"><option>Unisex</option><option>Տղամարդու</option><option>Կանացի</option><option>Մանկական</option></select>
<select name="size"><option>XS</option><option>S</option><option selected>M</option><option>L</option><option>XL</option><option>XXL</option><option>Ստանդարտ</option></select>
<input class="field" name="color" placeholder="Գույն" value="Սև" required>
<input class="field" name="price" type="number" min="1" step="0.01" placeholder="Գինը (դր.)" required>
<input class="field" name="stock" type="number" min="0" step="1" placeholder="Քանակը պահեստում" required>
<input class="field" name="image_url" type="url" placeholder="Նկարի URL (պարտադիր չէ)">
</div><textarea name="description" placeholder="Նկարագրություն (պարտադիր չէ)"></textarea><br><br><button class="btn" type="submit">+ Ավելացնել ապրանքը</button></form></section>
</main><footer>© 2026 StyleHub — ուսումնական նախագիծ PHP + MySQL տեխնոլոգիաներով</footer>
<script>
const productsEl=document.getElementById('products');
const noticeEl=document.getElementById('notice');
let debounceTimer;
function showNotice(text,isError=false){noticeEl.textContent=text;noticeEl.style.color=isError?'#b12333':'#3f63e9';}
function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function stockInfo(n){n=Number(n);if(n===0)return {text:'Առկա չէ',cls:'out'};if(n<=3)return {text:'Սահմանափակ քանակով',cls:'limited'};return {text:'Առկա է',cls:''};}
async function loadProducts(){
 const params=new URLSearchParams({action:'list',search:document.getElementById('search').value,category:document.getElementById('category').value,size:document.getElementById('size').value,gender:document.getElementById('gender').value,stock:document.getElementById('stock').value,max_price:document.getElementById('maxPrice').value,sort:document.getElementById('sort').value});
 productsEl.innerHTML='<p class="empty">Բեռնվում է...</p>';
 try{const response=await fetch('api.php?'+params.toString());const data=await response.json();if(!response.ok||!data.success)throw new Error(data.message||'Տվյալները ստանալ չհաջողվեց։');
 document.getElementById('count').textContent='Գտնվել է '+data.products.length+' ապրանք';
 if(!data.products.length){productsEl.innerHTML='<p class="empty">Այս պայմաններով ապրանք չի գտնվել։</p>';return;}
 productsEl.innerHTML=data.products.map(p=>{const s=stockInfo(p.stock);const img=p.image_url||'https://placehold.co/600x400?text=StyleHub';return `<article class="card"><img src="${escapeHTML(img)}" alt="${escapeHTML(p.name)}" onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=StyleHub'"><div class="info"><h3>${escapeHTML(p.name)}</h3><div class="meta">Կատեգորիա՝ ${escapeHTML(p.category)}<br>Չափս՝ ${escapeHTML(p.size)}<br>Գույն՝ ${escapeHTML(p.color)}<br>Սեռ՝ ${escapeHTML(p.gender)}<br>Պահեստում՝ ${Number(p.stock)} հատ</div><div class="price">${Number(p.price).toLocaleString('hy-AM')} ֏</div><span class="badge ${s.cls}">${s.text}</span><p class="meta">${escapeHTML(p.description||'Նկարագրություն չկա։')}</p><button class="btn red delete" onclick="deleteProduct(${Number(p.id)})">Ջնջել ապրանքը</button></div></article>`;}).join('');
 }catch(e){productsEl.innerHTML='<p class="empty">Չհաջողվեց կապվել սերվերի հետ։ Ստուգիր՝ Apache/MySQL-ը միացված են, և կայքը բացել ես localhost-ով։</p>';showNotice(e.message,true);}
}
async function deleteProduct(id){if(!confirm('Ջնջե՞լ այս ապրանքը։'))return;try{const r=await fetch('api.php?action=delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})});const d=await r.json();if(!r.ok||!d.success)throw new Error(d.message||'Ջնջել չհաջողվեց։');showNotice(d.message);loadProducts();}catch(e){showNotice(e.message,true);}}
document.getElementById('productForm').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget;const obj=Object.fromEntries(new FormData(form).entries());obj.price=Number(obj.price);obj.stock=Number(obj.stock);try{const r=await fetch('api.php?action=add',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)});const d=await r.json();if(!r.ok||!d.success)throw new Error(d.message||'Ավելացնել չհաջողվեց։');form.reset();showNotice(d.message);loadProducts();}catch(err){showNotice(err.message,true);}});
['search','category','size','gender','stock','maxPrice','sort'].forEach(id=>document.getElementById(id).addEventListener(id==='search'||id==='maxPrice'?'input':'change',()=>{clearTimeout(debounceTimer);debounceTimer=setTimeout(loadProducts,200);}));
function resetFilters(){['search','category','size','gender','stock','maxPrice'].forEach(id=>document.getElementById(id).value='');document.getElementById('sort').value='newest';loadProducts();}
loadProducts();
</script>
</body></html>
