# 🎓 College Engineering Projects Repository

Բարի գալուստ քոլեջի ուսանողական գործնական և կուրսային նախագծերի գլխավոր պահոց (Master Workspace):  
Այս պահոցը ներառում է տարբեր տեխնոլոգիաներով (Node.js/Express, React/Vite, Python/Flask, C# ASP.NET Core, PHP, SQLite/WASM) պատրաստված վեբ հավելվածներ, տվյալների բազաներ և ծրագրավորման գործնական աշխատանքներ։

---

## 📑 Բովանդակություն / Table of Contents
1. [Նախագծերի Ամփոփ Աղյուսակ (Projects Overview Table)](#-նախագծերի-ամփոփ-աղյուսակ-projects-overview-table)
2. [Տեխնոլոգիական Մատրից (Technology Matrix)](#-տեխնոլոգիական-մատրից-technology-matrix)
3. [Տվյալների Բազաների և Սխեմաների Աղյուսակ (Database Schemas Table)](#-տվյալների-բազաների-և-սխեմաների-աղյուսակ-database-schemas-table)
4. [Պանակների և Ֆայլերի Մանրամասն Նկարագրություն (Detailed Folder & File Breakdown)](#-պանակների-և-ֆայլերի-մանրամասն-նկարագրություն)
   - [1. college_website_Shop_Aksel](#1-college_website_shop_aksel)
   - [2. Armen_Vanik_Arthur](#2-armen_vanik_arthur)
   - [3. Asatur_Karlen](#3-asatur_karlen)
   - [4. atelier_shop_David](#4-atelier_shop_david)
   - [5. Autentication-master_Samvel_George_Slavik](#5-autentication-master_samvel_george_slavik)
   - [6. Booklibrary_Lika](#6-booklibrary_lika)
   - [7. cafewebsite_Ishxan](#7-cafewebsite_ishxan)
   - [8. DreamTrip_Flora](#8-dreamtrip_flora)
   - [9. Hasmik](#9-hasmik)
   - [10. praktika(inga, maria)](#10-praktikainga-maria)
   - [11. Tereza_Arman](#11-tereza_arman)
   - [12. avto-salon_Narek_HaykZaqaryan](#12-avto-salon_narek_haykzaqaryan)
   - [13. stylehub_Hayk](#13-stylehub_hayk)
   - [14. watch-market_Gurgen](#14-watch-market_gurgen)
5. [Գործարկման Ընդհանուր Ուղեցույց (Quick Start Guide)](#-գործարկման-ընդհանուր-ուղեցույց-quick-start-guide)

---

## 📊 Նախագծերի Ամփոփ Աղյուսակ (Projects Overview Table)

| 📁 Պանակ (Folder Link) | 👤 Հեղինակներ (Authors) | 🏷️ Նախագծի Անվանում (Project Name) | 🛠️ Տեխնոլոգիաներ (Tech Stack) | 🚀 Գլխավոր Մուտքային Ֆայլ (Main Entry) | 📝 Տվյալների Բազա (Database / SQL) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [college_website_Shop_Aksel](college_website_Shop_Aksel/) | Aksel | **Aura / Archive** (Nike x Zara Luxury E-Commerce) | React 19, Vite, Node.js, Express, MySQL | [server.js](college_website_Shop_Aksel/server/server.js) & [App.jsx](college_website_Shop_Aksel/client/src/App.jsx) | [database.sql](college_website_Shop_Aksel/database.sql) |
| [Armen_Vanik_Arthur](Armen_Vanik_Arthur/) | Armen, Vanik, Arthur | **TrendStore** (E-Commerce Catalog & Auth) | Node.js, Express, MySQL2, Vanilla JS, HTML/CSS | [index.js](Armen_Vanik_Arthur/index.js) & [index.html](Armen_Vanik_Arthur/index.html) | MySQL (`info`) |
| [Asatur_Karlen](Asatur_Karlen/) | Asatur, Karlen | **In-Browser SQLite Store & Query Console** | HTML5, CSS3, JavaScript, SQLite (sql.js WASM) | [New Text Document.txt](Asatur_Karlen/New%20Text%20Document.txt) | Embedded SQLite (`products`, `orders`) |
| [atelier_shop_David](atelier_shop_David/) | David | **Atelier Fashion Boutique & Orders System** | PHP, MySQL (PDO), JavaScript, CSS | [index.php](atelier_shop_David/index.php) & [api.php](atelier_shop_David/api.php) | [schema.sql](atelier_shop_David/schema.sql) |
| [Autentication-master_Samvel_George_Slavik](Autentication-master_Samvel_George_Slavik/) | Samvel, George, Slavik | **ASP.NET Core MVC Cookie Authentication** | C#, ASP.NET Core 9/10, Cookie Auth, Bootstrap | [Program.cs](Autentication-master_Samvel_George_Slavik/Autentication/Program.cs) | SQL Server / ADO.NET (`Users`) |
| [Booklibrary_Lika](Booklibrary_Lika/) | Lika | **BookNest** (Library & Reading Tracker) | Python, Flask, MySQL, Jinja2, CSS3 | [main.py](Booklibrary_Lika/main.py) | [booknest(1).sql](<Booklibrary_Lika/booknest.sql/booknest(1).sql>) |
| [cafewebsite_Ishxan](cafewebsite_Ishxan/) | Ishxan | **Cafe & Restaurant Menu Ordering** | Node.js, Express, MySQL2, HTML5, CSS3 | [server.js](cafewebsite_Ishxan/server.js) & [index.html](cafewebsite_Ishxan/index.html) | [database.sql](cafewebsite_Ishxan/database.sql) |
| [DreamTrip_Flora](DreamTrip_Flora/) | Flora | **DreamTrip** (Travel Agency Booking Portal) | Python, Flask, MySQL, Jinja2, CSS3 | [app.py](DreamTrip_Flora/app.py) | [travel.sql](DreamTrip_Flora/travel.sql) |
| [Hasmik](Hasmik/) | Hasmik | **LunaWear** (Fashion Apparel Platform) | Python, Flask, MySQL, Jinja2, CSS3 | [pyt.py](Hasmik/pyt.py) | [Untitled-3.sql](Hasmik/Untitled-3.sql) |
| [praktika(inga, maria)](<praktika(inga, maria)/>) | Inga, Maria | **PerfumeShop** (Web API & Fragrance Catalog) | C#, .NET 10 (ASP.NET Minimal API), MySQL | [Program.cs](<praktika(inga, maria)/PerfumeShop/Program.cs>) | [sql.txt](<praktika(inga, maria)/sql.txt>) |
| [Tereza_Arman](Tereza_Arman/) | Tereza, Arman | **Style House** (Boutique & SQLite Terminal) | HTML5, CSS3, JavaScript, SQLite (sql.js WASM) | [index.html](Tereza_Arman/index.html) | Embedded SQLite (`products`) |
| [avto-salon_Narek_HaykZaqaryan](avto-salon_Narek_HaykZaqaryan/) | Narek, Hayk Zaqaryan | **DRIVE** (Car Dealership & Inventory Management) | PHP (Native / PDO), MySQL, JavaScript, HTML5, CSS3 | [index.php](avto-salon_Narek_HaykZaqaryan/index.php) & [api.php](avto-salon_Narek_HaykZaqaryan/api.php) | [database.sql](avto-salon_Narek_HaykZaqaryan/database.sql) |
| [stylehub_Hayk](stylehub_Hayk/) | Hayk | **STYLEHUB** (Fashion Shop & Catalog Management) | PHP (Native / PDO), MySQL, JavaScript, HTML5, CSS3 | [index.php](stylehub_Hayk/index.php) & [api.php](stylehub_Hayk/api.php) | [database.sql](stylehub_Hayk/database.sql) |
| [watch-market_Gurgen](watch-market_Gurgen/) | Gurgen | **ԺԱՄԱՊԱՀ** (Watch Market & Trading Platform) | PHP (Native / PDO), MySQL, HTML5, CSS3 | [index.php](watch-market_Gurgen/index.php) | [database.sql](watch-market_Gurgen/database.sql) |

---

## 🛠️ Տեխնոլոգիական Մատրից (Technology Matrix)

| Նախագիծ (Project) | Ֆրոնտենդ (Frontend) | Բեքենդ (Backend) | Տվյալների Բազա (Database) | Հիմնական Հատկանիշներ (Key Features) |
| :--- | :--- | :--- | :--- | :--- |
| **college_website_Shop_Aksel** | React 19, Vite, Lucide | Node.js, Express | MySQL (`college_shop`) | Բազմաչափ ֆիլտրում, Ադմին պանել, Զամբյուղ, Պատվերներ, Կտրոններ, Կարծիքներ |
| **Armen_Vanik_Arthur** | HTML5, CSS3, Vanilla JS | Node.js, Express | MySQL (`info`) | Ապրանքացուցակ, Զամբյուղ, Հավանածներ (Favorites), Մուտք/Գրանցում |
| **Asatur_Karlen** | HTML5, CSS3, Vanilla JS | Բրաուզերային WASM | SQLite (`sql.js`) | Ինտերակտիվ SQL Console, Ապրանքների զամբյուղ, Տրանզակցիաներ |
| **atelier_shop_David** | HTML5, CSS3, JS | PHP (Native / PDO) | MySQL (`fashion_shop`) | REST API, Զամբյուղ (localStorage), Պատվերի գրանցում, Պահեստի թարմացում |
| **Autentication-master_Samvel_George_Slavik** | Razor Views, Bootstrap 5 | ASP.NET Core MVC | SQL Server | Cookie Authentication, Գրանցում, Մուտք, Գաղտնաբառերի հեշավորում |
| **Booklibrary_Lika** | HTML5, Jinja2, CSS3 | Python, Flask | MySQL (`booknest_db`) | Գրքերի ցուցակ, Կարդալու կարգավիճակներ, Օգտատերերի մուտք/գրանցում |
| **cafewebsite_Ishxan** | HTML5, CSS3, JS | Node.js, Express | MySQL (`cafewebsite`) | Սրճարանի մենյու, Օնլայն պատվերներ, Կատեգորիաների ֆիլտր |
| **DreamTrip_Flora** | HTML5, Jinja2, CSS3 | Python, Flask | MySQL (`dreamtrip`) | Տուրերի ամրագրում, Ուղղությունների դիտում, Պատվերների պատմություն |
| **Hasmik** | HTML5, Jinja2, CSS3 | Python, Flask | MySQL | Հագուստի կատալոգ, Ավտորիզացիա, Զամբյուղի համակարգ |
| **praktika(inga, maria)** | HTML5, CSS3, JS | C#, .NET 10 Minimal API | MySQL (`perfumery_db`) | Օծանելիքների կատալոգ, Ֆիլտրացիա ըստ բրենդի/կատեգորիայի |
| **Tereza_Arman** | HTML5, CSS3, JS | Բրաուզերային WASM | SQLite (`sql.js`) | Style House հագուստի խանութ, Ինտեգրված SQL կոնսոլ |
| **avto-salon_Narek_HaykZaqaryan** | HTML5, CSS3, JS | PHP (Native / PDO) | MySQL (`avto_salon`) | Ավտոսրահի մեքենաների կատալոգ, կարգավիճակներ, ավելացում և ջնջում |
| **stylehub_Hayk** | HTML5, CSS3, JS | PHP (Native / PDO) | MySQL (`stylehub`) | Հագուստի խանութ, որոնում, բազմաչափ ֆիլտրում (չափս, գույն, սեռ, գին) |
| **watch-market_Gurgen** | HTML5, CSS3 | PHP (Native / PDO) | MySQL (`watch_market`) | Ժամացույցների կատալոգ, բազմաչափ ֆիլտրում (բրենդ, տեսակ, սեռ, գին), գնման և վաճառքի հայտերի գրանցում |

---

## 🗄️ Տվյալների Բազաների և Սխեմաների Աղյուսակ (Database Schemas Table)

| Ֆայլ (Schema File Link) | Տվյալների Բազայի Անվանում (DB Name) | Հիմնական Աղյուսակներ (Main Tables) | Բովանդակություն և Տվյալներ (Contents) |
| :--- | :--- | :--- | :--- |
| [database.sql](college_website_Shop_Aksel/database.sql) | `college_shop` | `users`, `categories`, `products`, `orders`, `order_items`, `reviews`, `coupons`, `wishlist` | 32 իրական ապրանք, ադմին օգտատեր, զեղչի կտրոններ, կատեգորիաներ |
| [schema.sql](atelier_shop_David/schema.sql) | `fashion_shop` | `products`, `orders`, `order_items` | Նորաձևության ապրանքներ, գներ, պահեստային քանակներ, պատվերների մոդել |
| [cafewebsite.sql](cafewebsite_Ishxan/cafewebsite.sql) & [database.sql](cafewebsite_Ishxan/database.sql) | `cafewebsite` | `menu_items`, `orders`, `order_items` | Սրճարանի ուտեստներ, խմիչքներ, գներ, պատվերներ |
| [booknest(1).sql](<Booklibrary_Lika/booknest.sql/booknest(1).sql>) | `booknest_db` | `users`, `books`, `reading_list` | Գրականության ցանկ, հեղինակներ, ժանրեր, ընթերցանության կարգավիճակներ |
| [travel.sql](DreamTrip_Flora/travel.sql) | `dreamtrip` | `users`, `destinations`, `bookings` | Ճանապարհորդական փաթեթներ, գներ, օրերի քանակ, ամրագրումներ |
| [Untitled-3.sql](Hasmik/Untitled-3.sql) | `lunawear` / custom | `users`, `products`, `orders` | Հագուստի մոդելներ, նկարագրություններ, գներ |
| [sql.txt](<praktika(inga, maria)/sql.txt>) | `perfumery_db` | `categories`, `perfumes` | Օծանելիքների բրենդներ (Floral, Woody, Fresh, Oriental), գներ |
| [database.sql](avto-salon_Narek_HaykZaqaryan/database.sql) | `avto_salon` | `cars` | Մեքենաների մակնիշներ, մոդելներ, տարեթվեր, գներ, վազք, վառելիք, կարգավիճակ |
| [database.sql](stylehub_Hayk/database.sql) | `stylehub` | `products` | Հագուստի տեսականի, գներ, պահեստային քանակներ, չափսեր, գույներ |
| [database.sql](watch-market_Gurgen/database.sql) | `watch_market` | `products`, `buy_requests`, `sell_requests` | Ժամացույցների մոդելներ, գներ, տեսակներ, գնման հայտեր, վաճառքի առաջարկներ |

---

## 📂 Պանակների և Ֆայլերի Մանրամասն Նկարագրություն

---

### 1. [college_website_Shop_Aksel](college_website_Shop_Aksel/)

**Հեղինակ:** Aksel  
**Նախագծի Անվանում:** AURA / ARCHIVE — Բարձրակարգ Էլեկտրոնային Առևտրի Համակարգ (Nike x Zara Aesthetics)  
**Տեխնոլոգիաներ:** React 19, Vite, Node.js, Express, MySQL2, Lucide Icons, Vanilla CSS  
**Նկարագրություն:** Ամբողջական Full-Stack էլեկտրոնային խանութ՝ Nike-ի ինտերակտիվ արագությամբ և Zara-ի մինիմալիստական էդիտորիալ դիզայնով։ Ներառում է բազմաչափ ֆիլտրում (գույն, չափս, գին, կատեգորիա, թեգ), ադմին վահանակ CRUD գործողություններով, զամբյուղի դինամիկ առաջընթացի սանդղակ, զեղչի կտրոնների համակարգ և պատվերների պատմություն։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [README.md](college_website_Shop_Aksel/README.md) | Փաստաթուղթ | Նախագծի հիմնական ուղեցույցը հայերենով (տեղադրում, ֆունկցիաներ) |
| [TECH_EXPLANATION.md](college_website_Shop_Aksel/TECH_EXPLANATION.md) | Փաստաթուղթ | Ճարտարապետության, REST API-ների և տվյալների հոսքի մանրամասն նկարագրություն |
| [MYSQL_COMMANDS_PER_PAGE.md](college_website_Shop_Aksel/MYSQL_COMMANDS_PER_PAGE.md) | Փաստաթուղթ | Յուրաքանչյուր էջի և բաղադրիչի SQL հարցումների սպառիչ բացատրություն |
| [database.sql](college_website_Shop_Aksel/database.sql) | Տվյալների Բազա | MySQL ամբողջական սխեմա, 8 աղյուսակ, 32 ապրանք և նախնական տվյալներ |
| [server/server.js](college_website_Shop_Aksel/server/server.js) | Backend Entry | Express REST API բոլոր երթուղիներով (Auth, Products, Orders, Admin, Filters) |
| [server/db.js](college_website_Shop_Aksel/server/db.js) | Backend DB Pool | MySQL Connection Pool, ավտոմատ initDB() և seed տվյալների ներմուծում |
| [server/package.json](college_website_Shop_Aksel/server/package.json) | Կոնֆիգուրացիա | Սերվերի կախվածությունները (express, mysql2, cors, bcryptjs, jsonwebtoken) |
| [client/src/App.jsx](college_website_Shop_Aksel/client/src/App.jsx) | React Component | Գլխավոր կոմպոնենտ՝ վիճակների կառավարում, ֆիլտրերի և մոդալների ինտեգրում |
| [client/src/App.css](college_website_Shop_Aksel/client/src/App.css) | Ոճավորում | Zara x Nike էսթետիկա, մոնոքրոմ գունապնակ, տիպոգրաֆիկա (`Syne` + `Inter`) |
| [client/src/api.js](college_website_Shop_Aksel/client/src/api.js) | Frontend Service | Fetch API wrapper բոլոր HTTP հարցումների համար (GET, POST, PUT, DELETE) |
| [client/src/main.jsx](college_website_Shop_Aksel/client/src/main.jsx) | Frontend Entry | React հավելվածի մուտքային կետ |
| [client/src/components/Navbar.jsx](college_website_Shop_Aksel/client/src/components/Navbar.jsx) | React Component | Վերին նավիգացիա, տիկեր, որոնում, զամբյուղի հաշվիչ, ադմին մուտք |
| [client/src/components/Hero.jsx](college_website_Shop_Aksel/client/src/components/Hero.jsx) | React Component | Գլխավոր էդիտորիալ պաստառ (Campaign Editorial Banner) |
| [client/src/components/FilterBar.jsx](college_website_Shop_Aksel/client/src/components/FilterBar.jsx) | React Component | Բազմաչափ ֆիլտրման վահանակ (կատեգորիաներ, գներ, չափսեր, գույներ, թեգեր) |
| [client/src/components/ProductCard.jsx](college_website_Shop_Aksel/client/src/components/ProductCard.jsx) | React Component | Ապրանքի ինտերակտիվ քարտ՝ hover անիմացիա, արագ դիտում, wishlist կոճակ |
| [client/src/components/ProductModal.jsx](college_website_Shop_Aksel/client/src/components/ProductModal.jsx) | React Component | Ապրանքի մանրամասն մոդալ պատուհան (պատկերասրահ, չափսեր, կարծիքներ) |
| [client/src/components/CartDrawer.jsx](college_website_Shop_Aksel/client/src/components/CartDrawer.jsx) | React Component | Կողային սահող զամբյուղ, անվճար առաքման հաշվիչ, քանակի փոփոխություն |
| [client/src/components/CheckoutModal.jsx](college_website_Shop_Aksel/client/src/components/CheckoutModal.jsx) | React Component | Պատվերի ձևակերպման պատուհան, հասցե, կտրոնի կիրառում, սիմուլյացիա |
| [client/src/components/AuthModal.jsx](college_website_Shop_Aksel/client/src/components/AuthModal.jsx) | React Component | Մուտք և Գրանցում JWT նշաններով (Auth Modal) |
| [client/src/components/OrdersModal.jsx](college_website_Shop_Aksel/client/src/components/OrdersModal.jsx) | React Component | Օգտատիրոջ պատվերների պատմություն և անդորրագրերի դիտում |
| [client/src/components/WishlistModal.jsx](college_website_Shop_Aksel/client/src/components/WishlistModal.jsx) | React Component | Հավանած ապրանքների ցուցակ և արագ ավելացում զամբյուղ |
| [client/src/components/AdminModal.jsx](college_website_Shop_Aksel/client/src/components/AdminModal.jsx) | React Component | Ադմինիստրատիվ կառավարման վահանակ՝ ապրանքների CRUD, կարգավիճակներ |
| [client/src/components/Footer.jsx](college_website_Shop_Aksel/client/src/components/Footer.jsx) | React Component | Խանութի ստորին հատված, հղումներ, տեղեկատվություն |
| [client/vite.config.js](college_website_Shop_Aksel/client/vite.config.js) | Կոնֆիգուրացիա | Vite կոնֆիգուրացիա և զարգացման պորտ |

#### Գործարկում (Run Commands):
```bash
# 1. Տվյալների բազայի ներմուծում MySQL-ում
mysql -u root -p < college_website_Shop_Aksel/database.sql

# 2. Բեքենդի գործարկում
cd college_website_Shop_Aksel/server
npm install
npm start

# 3. Ֆրոնտենդի գործարկում
cd ../client
npm install
npm run dev
```

---

### 2. [Armen_Vanik_Arthur](Armen_Vanik_Arthur/)

**Հեղինակներ:** Armen, Vanik, Arthur  
**Նախագծի Անվանում:** TrendStore — Online Fashion & Shoes Multi-Page Store  
**Տեխնոլոգիաներ:** Node.js, Express, MySQL2, Vanilla JavaScript, HTML5, CSS3  
**Նկարագրություն:** Բազմաէջ առևտրային կայք՝ ապրանքների կատալոգով, զամբյուղով, հավանած ապրանքների բաժնով (Favorites) և ավտորիզացիայի համակարգով։ Կայքը միանում է MySQL տվյալների բազային Express API-ի միջոցով։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [index.html](Armen_Vanik_Arthur/index.html) | Frontend Page | Գլխավոր էջ՝ ակցիաներ, նորույթներ և նավիգացիա |
| [shop.html](Armen_Vanik_Arthur/shop.html) | Frontend Page | Խանութի կատալոգ՝ ապրանքների ֆիլտրում և ցուցադրում |
| [cart.html](Armen_Vanik_Arthur/cart.html) | Frontend Page | Գնումների զամբյուղ՝ քանակի փոփոխում և ընդհանուր գումար |
| [favorites.html](Armen_Vanik_Arthur/favorites.html) | Frontend Page | Սիրված/հավանած ապրանքների էջ (Wishlist) |
| [login.html](Armen_Vanik_Arthur/login.html) | Frontend Page | Օգտատիրոջ մուտքի և գրանցման էջ |
| [index.js](Armen_Vanik_Arthur/index.js) | Backend Server | Express REST API սերվեր, MySQL կապի pool, auth և products երթուղիներ |
| [api.js](Armen_Vanik_Arthur/api.js) | Client Script | Fetch հարցումների կառավարում, Bearer Token-ի ավտոմատ կցում |
| [app.js](Armen_Vanik_Arthur/app.js) | Client Script | Զամբյուղի և հավանածների իրադարձությունների մշակիչ |
| [store.js](Armen_Vanik_Arthur/store.js) | Client Script | Ապրանքների դինամիկ render, կատեգորիաների ֆիլտրում |
| [data.js](Armen_Vanik_Arthur/data.js) | Client Script | Ապրանքների նախնական տվյալների և օժանդակ ֆունկցիաների ֆայլ |
| [style.css](Armen_Vanik_Arthur/style.css) | Ոճավորում | Կայքի ընդհանուր դիզայն, քարտերի դասավորություն, պատասխանող (responsive) ոճեր |
| [package.json](Armen_Vanik_Arthur/package.json) | Կոնֆիգուրացիա | Node.js կախվածություններ (`express`, `mysql2`, `cors`, `dotenv`) |

#### Գործարկում (Run Commands):
```bash
cd Armen_Vanik_Arthur
npm install
node index.js
# Այնուհետև բացել index.html ֆայլը զննարկիչում կամ Live Server-ով
```

---

### 3. [Asatur_Karlen](Asatur_Karlen/)

**Հեղինակներ:** Asatur, Karlen  
**Նախագծի Անվանում:** Interactive In-Browser SQLite Shop & SQL Terminal  
**Տեխնոլոգիաներ:** HTML5, CSS3, JavaScript, SQLite (sql.js WebAssembly)  
**Նկարագրություն:** Ինքնատիպ կրթական և գործնական հավելված, որը բրաուզերում գործարկում է լիարժեք SQLite տվյալների բազա WebAssembly-ի միջոցով։ Հավելվածն ունի ապրանքների ցուցադրություն, զամբյուղ, տրանզակցիաներով պատվերների գրանցում և էջի ներքևում տեղադրված կենդանի SQL Query Console, որով կարելի է կատարել ցանկացած SQL հարցում (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) և անմիջապես տեսնել փոփոխությունները։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [New Text Document.txt](Asatur_Karlen/New%20Text%20Document.txt) | Standalone Web App | Ամբողջական HTML/CSS/JS կոդ՝ ներկառուցված `sql.js` գրադարանով, հայերեն ինտերֆեյսով և SQL տերմինալով |

#### Գործարկում (Run Commands):
- Ֆայլը կարելի է վերանվանել `index.html` կամ ուղղակի բացել Chrome / Edge զննարկիչով (պահանջվում է ինտերնետ կապ `sql.js` CDN գրադարանը բեռնելու համար)։

---

### 4. [atelier_shop_David](atelier_shop_David/)

**Հեղինակ:** David  
**Նախագծի Անվանում:** Atelier — Fashion Boutique & Order Management System  
**Տեխնոլոգիաներ:** PHP (Native / PDO), MySQL, HTML5, CSS3, JavaScript  
**Նկարագրություն:** Նորաձևության ստուդիայի և ատելիեի օնլայն խանութ։ Օգտատերերը կարող են դիտել նորաձև հագուստների հավաքածուն, ավելացնել ապրանքներ զամբյուղ (պահպանվում է `localStorage`-ում) և հաստատել պատվերը։ Հաստատված պատվերները PHP REST API-ի միջոցով գրանցվում են MySQL բազայում, և պահեստի մնացորդներն ավտոմատ նվազեցվում են։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [index.php](atelier_shop_David/index.php) | Frontend & PHP | Խանութի գլխավոր էջ՝ ատելիեի դիզայնով և ապրանքների կատալոգով |
| [api.php](atelier_shop_David/api.php) | Backend API | PHP REST API՝ ապրանքների ստացում, պատվերի գրանցում տրանզակցիայով |
| [config.php](atelier_shop_David/config.php) | Database Config | MySQL կապի պարամետրեր (host, dbname, user, password) PDO-ով |
| [schema.sql](atelier_shop_David/schema.sql) | Տվյալների Բազա | `fashion_shop` բազայի ստեղծում, `products`, `orders`, `order_items` աղյուսակներ |
| [assets/css/style.css](atelier_shop_David/assets/css/style.css) | Ոճավորում | Էլեգանտ ոճավորում, տպագրական տառատեսակներ և ադապտիվ դասավորություն |
| [assets/js/app.js](atelier_shop_David/assets/js/app.js) | Client Script | Զամբյուղի կառավարում, ապրանքների ընտրություն, API հարցումների կատարում |
| [README.txt](atelier_shop_David/README.txt) | Փաստաթուղթ | Կայքի տեղադրման և կարգավորման հայերեն ուղեցույց |

#### Գործարկում (Run Commands):
```bash
# 1. Ներմուծել schema.sql ֆայլը phpMyAdmin-ում կամ MySQL տերմինալում
mysql -u root -p < atelier_shop_David/schema.sql

# 2. Գործարկել տեղական PHP սերվեր
cd atelier_shop_David
php -S localhost:8000
# Այնուհետև բացել http://localhost:8000 զննարկիչում
```

---

### 5. [Autentication-master_Samvel_George_Slavik](Autentication-master_Samvel_George_Slavik/)

**Հեղինակներ:** Samvel, George, Slavik  
**Նախագծի Անվանում:** ASP.NET Core MVC Cookie Authentication System  
**Տեխնոլոգիաներ:** C#, .NET 9/10, ASP.NET Core MVC, Cookie Authentication, SQL Server, Bootstrap 5  
**Նկարագրություն:** Օգտատերերի նույնականացման և լիազորման պրոֆեսիոնալ համակարգ՝ կառուցված ASP.NET Core MVC ճարտարապետությամբ։ Իրականացված է գրանցում (Register), մուտք (Login), ելք (Logout), գաղտնաբառերի անվտանգ հեշավորում և Cookie-ների վրա հիմնված սեսիաների կառավարում։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [Autentication.slnx](Autentication-master_Samvel_George_Slavik/Autentication.slnx) | Solution File | Visual Studio նախագծի լուծման (solution) ֆայլ |
| [Autentication.csproj](Autentication-master_Samvel_George_Slavik/Autentication/Autentication.csproj) | .NET Project | C# նախագծի կարգավորումներ, TargetFramework և փաթեթներ |
| [Program.cs](Autentication-master_Samvel_George_Slavik/Autentication/Program.cs) | Backend Entry | Սերվիսների գրանցում, Cookie Authentication middleware-ի կարգավորում |
| [appsettings.json](Autentication-master_Samvel_George_Slavik/Autentication/appsettings.json) | Կոնֆիգուրացիա | Կապի տող (ConnectionStrings) և լոգավորման պարամետրեր |
| [Controllers/AccountController.cs](Autentication-master_Samvel_George_Slavik/Autentication/Controllers/AccountController.cs) | C# Controller | Մուտքի, գրանցման, ClaimsPrincipal-ի և Cookie նույնականացման տրամաբանություն |
| [Controllers/HomeController.cs](Autentication-master_Samvel_George_Slavik/Autentication/Controllers/HomeController.cs) | C# Controller | Գլխավոր էջի և Privacy էջի կարգավորիչ |
| [Models/Users.cs](Autentication-master_Samvel_George_Slavik/Autentication/Models/Users.cs) | C# Model | Օգտատիրոջ տվյալների մոդել (Username, Password, Email և այլն) |
| [Models/ErrorViewModel.cs](Autentication-master_Samvel_George_Slavik/Autentication/Models/ErrorViewModel.cs) | C# Model | Սխալների ցուցադրման օժանդակ մոդել |
| [Views/Account/Login.cshtml](Autentication-master_Samvel_George_Slavik/Autentication/Views/Account/Login.cshtml) | Razor View | Մուտքի ինտերֆեյս և վալիդացիա |
| [Views/Account/Register.cshtml](Autentication-master_Samvel_George_Slavik/Autentication/Views/Account/Register.cshtml) | Razor View | Գրանցման ինտերֆեյս |
| [Views/Home/Index.cshtml](Autentication-master_Samvel_George_Slavik/Autentication/Views/Home/Index.cshtml) | Razor View | Գլխավոր էջ (Dashboard) |
| [Views/Shared/_Layout.cshtml](Autentication-master_Samvel_George_Slavik/Autentication/Views/Shared/_Layout.cshtml) | Razor View | Հիմնական վեբ շաբլոն՝ Bootstrap նավիգացիայով |

#### Գործարկում (Run Commands):
```bash
cd Autentication-master_Samvel_George_Slavik/Autentication
dotnet restore
dotnet run
```

---

### 6. [Booklibrary_Lika](Booklibrary_Lika/)

**Հեղինակ:** Lika  
**Նախագծի Անվանում:** BookNest — Personal Library & Reading Progress Tracker  
**Տեխնոլոգիաներ:** Python, Flask, MySQL (mysql-connector-python), Werkzeug Security, Jinja2, CSS3  
**Նկարագրություն:** Գրադարանի և ընթերցանության կառավարման համակարգ։ Թույլ է տալիս գրանցվել, ավելացնել գրքեր անձնական ցանկում, նշել ընթերցանության կարգավիճակը («Want to Read», «Reading», «Finished»), որոնել գրքեր ըստ վերնագրի և հեղինակի։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [main.py](Booklibrary_Lika/main.py) | Python App | Flask հավելվածի բոլոր երթուղիները, ավտորիզացիայի դեկորատորներ, MySQL CRUD |
| [templates/index.html](Booklibrary_Lika/templates/index.html) | Jinja2 View | Գլխավոր էջ՝ գրքերի ցուցակ, կարգավիճակի փոփոխում, նոր գրքի ավելացում |
| [templates/login.html](Booklibrary_Lika/templates/login.html) | Jinja2 View | Մուտքի էջ |
| [templates/register.html](Booklibrary_Lika/templates/register.html) | Jinja2 View | Գրանցման էջ |
| [static/style.css](Booklibrary_Lika/static/style.css) | Ոճավորում | Հարմարավետ ընթերցասրահի դիզայն, կոճակներ, ֆորմաներ |
| [booknest.sql/booknest(1).sql](<Booklibrary_Lika/booknest.sql/booknest(1).sql>) | Տվյալների Բազա | `booknest_db` տվյալների բազայի արտահանում (սխեմա և գրքեր) |
| [booknest.sql/booknest(2).sql](<Booklibrary_Lika/booknest.sql/booknest(2).sql>) | Տվյալների Բազա | Տվյալների բազայի այլընտրանքային backup տարբերակ |
| [booknest.sql/booknest(3).sql](<Booklibrary_Lika/booknest.sql/booknest(3).sql>) | Տվյալների Բազա | Տվյալների բազայի թարմացված backup տարբերակ |

#### Գործարկում (Run Commands):
```bash
# 1. Բազայի ներմուծում
mysql -u root -p < "Booklibrary_Lika/booknest.sql/booknest(1).sql"

# 2. Flask հավելվածի մեկնարկ
cd Booklibrary_Lika
pip install flask mysql-connector-python werkzeug
python main.py
```

---

### 7. [cafewebsite_Ishxan](cafewebsite_Ishxan/)

**Հեղինակ:** Ishxan  
**Նախագծի Անվանում:** Cafe & Restaurant Menu & Order System  
**Տեխնոլոգիաներ:** Node.js, Express, MySQL2, HTML5, CSS3, JavaScript  
**Նկարագրություն:** Ժամանակակից սրճարանի վեբ-կայք՝ ինտերակտիվ մենյուով (սուրճ, աղանդեր, նախաճաշեր), գների հաշվիչով և օնլայն պատվերների ընդունման համակարգով։ Պատվերները պահպանվում են MySQL բազայի `orders` և `order_items` աղյուսակներում։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [index.html](cafewebsite_Ishxan/index.html) | Frontend Page | Սրճարանի ինտերֆեյս, մենյուի քարտեր, պատվերի զամբյուղի պատուհան |
| [server.js](cafewebsite_Ishxan/server.js) | Backend Server | Express REST API՝ `/api/status`, `/api/menu`, `/api/orders` երթուղիներով |
| [script.js](cafewebsite_Ishxan/script.js) | Client Script | Մենյուի բեռնում, զամբյուղում ավելացնելու և պատվեր ուղարկելու կոդ |
| [style.css](cafewebsite_Ishxan/style.css) | Ոճավորում | Սրճարանի ջերմ և գրավիչ գունային գամմա, անիմացիաներ |
| [database.sql](cafewebsite_Ishxan/database.sql) | Տվյալների Բազա | `cafewebsite` բազայի ամբողջական սխեմա (`menu_items`, `orders`, `order_items`) |
| [cafewebsite.sql](cafewebsite_Ishxan/cafewebsite.sql) | Տվյալների Բազա | Նախնական սրճարանային ապրանքների SQL dump |
| [package.json](cafewebsite_Ishxan/package.json) | Կոնֆիգուրացիա | Կախվածությունների ֆայլ (`express`, `mysql2`, `dotenv`) |

#### Գործարկում (Run Commands):
```bash
# 1. Բազայի ստեղծում
mysql -u root -p < cafewebsite_Ishxan/database.sql

# 2. Սերվերի գործարկում
cd cafewebsite_Ishxan
npm install
node server.js
```

---

### 8. [DreamTrip_Flora](DreamTrip_Flora/)

**Հեղինակ:** Flora  
**Նախագծի Անվանում:** DreamTrip — Tourism & Tour Booking Portal  
**Տեխնոլոգիաներ:** Python, Flask, MySQL, Jinja2 Templates, CSS3  
**Նկարագրություն:** Տուրիստական գործակալության վեբ հարթակ։ Օգտատերերը կարող են գրանցվել, ուսումնասիրել տարբեր երկրների և քաղաքների տուրիստական փաթեթները (տևողություն, արժեք, նկարագրություն, նկարներ), կատարել ամրագրումներ և անձնական էջում տեսնել իրենց բոլոր ակտիվ ամրագրումները։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [app.py](DreamTrip_Flora/app.py) | Python Backend | Flask հավելվածի ամբողջական լոգիկա, երթուղիներ, սեսիաներ, MySQL կապ |
| [travel.sql](DreamTrip_Flora/travel.sql) | Տվյալների Բազա | `dreamtrip` բազա՝ ուղղություններ (destinations), ամրագրումներ (bookings), օգտատերեր |
| [templates/base.html](DreamTrip_Flora/templates/base.html) | Jinja2 Layout | Կայքի հիմնական կմախք՝ նավիգացիոն մենյուով և ծանուցումների բլոկով |
| [templates/index.html](DreamTrip_Flora/templates/index.html) | Jinja2 View | Գլխավոր էջ՝ առաջարկվող տուրեր և ակցիաներ |
| [templates/destinations.html](DreamTrip_Flora/templates/destinations.html) | Jinja2 View | Բոլոր հասանելի ուղղությունների կատալոգ |
| [templates/destination_detail.html](DreamTrip_Flora/templates/destination_detail.html) | Jinja2 View | Կոնկրետ տուրի մանրամասն էջ և ամրագրման ֆորմա |
| [templates/bookings.html](DreamTrip_Flora/templates/bookings.html) | Jinja2 View | Օգտատիրոջ կողմից կատարված ամրագրումների ցանկ |
| [templates/login.html](DreamTrip_Flora/templates/login.html) | Jinja2 View | Մուտքի էջ |
| [templates/register.html](DreamTrip_Flora/templates/register.html) | Jinja2 View | Գրանցման էջ |
| [static/css/style.css](DreamTrip_Flora/static/css/style.css) | Ոճավորում | Ճամփորդական թեմատիկայով ժամանակակից UI ոճեր |

#### Գործարկում (Run Commands):
```bash
# 1. Բազայի ներմուծում
mysql -u root -p < DreamTrip_Flora/travel.sql

# 2. Flask սերվերի գործարկում
cd DreamTrip_Flora
pip install flask mysql-connector-python werkzeug
python app.py
```

---

### 9. [Hasmik](Hasmik/)

**Հեղինակ:** Hasmik  
**Նախագծի Անվանում:** LunaWear — Fashion Boutique Web App  
**Տեխնոլոգիաներ:** Python, Flask, MySQL, Jinja2, CSS3  
**Նկարագրություն:** Կանացի նորաձևության և հագուստի օնլայն հարթակ։ Իրականացված է Python Flask-ով և MySQL տվյալների բազայով, որտեղ հաճախորդները կարող են տեսնել հագուստի տեսականին, կատարել գնումներ և կառավարել իրենց հաշիվը։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [pyt.py](Hasmik/pyt.py) | Python Backend | Flask հավելվածի կոդ՝ երթուղիներով և MySQL կապով |
| [templates/index1.html](Hasmik/templates/index1.html) | Jinja2 View | Խանութի գլխավոր վիտրինա և ապրանքների ցուցադրում |
| [style/style1.css](Hasmik/style/style1.css) | Ոճավորում | Խանութի վիզուալ ձևավորում |
| [Untitled-3.sql](Hasmik/Untitled-3.sql) | Տվյալների Բազա | MySQL տվյալների բազայի սխեմա և ապրանքների տվյալներ |

#### Գործարկում (Run Commands):
```bash
# 1. Բազայի ներմուծում
mysql -u root -p < Hasmik/Untitled-3.sql

# 2. Գործարկում
cd Hasmik
python pyt.py
```

---

### 10. [praktika(inga, maria)](<praktika(inga, maria)/>)

**Հեղինակներ:** Inga, Maria  
**Նախագծի Անվանում:** PerfumeShop — Web API & Fragrance Catalog  
**Տեխնոլոգիաներ:** C#, .NET 10 (ASP.NET Core Minimal API), MySqlConnector, HTML5, CSS3, JavaScript  
**Նկարագրություն:** Պարֆյումերիայի խանութի գործնական նախագիծ՝ կառուցված .NET 10-ի Minimal API-ների և MySQL բազայի հիման վրա։ Սերվերը տրամադրում է `/api/perfumes` REST endpoint, որը միավորում է օծանելիքների և կատեգորիաների աղյուսակները (`JOIN`), իսկ `wwwroot/index.html`-ը ցուցադրում է բույրերը ըստ բրենդների (Floral, Woody, Fresh, Oriental):

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [PerfumeShop.csproj](<praktika(inga, maria)/PerfumeShop/PerfumeShop.csproj>) | .NET Project | C# նախագծի ֆայլ (`net10.0`, `MySqlConnector`) |
| [Program.cs](<praktika(inga, maria)/PerfumeShop/Program.cs>) | C# Backend | ASP.NET Core Minimal API, static files middleware, MySQL async query |
| [appsettings.json](<praktika(inga, maria)/PerfumeShop/appsettings.json>) | Կոնֆիգուրացիա | Կոնֆիգուրացիայի ֆայլ |
| [wwwroot/index.html](<praktika(inga, maria)/PerfumeShop/wwwroot/index.html>) | Frontend SPA | Օծանելիքների վիտրինա, դինամիկ fetch հարցումներ դեպի `/api/perfumes` |
| [sql.txt](<praktika(inga, maria)/sql.txt>) | Տվյալների Բազա | `perfumery_db` սխեմա, `categories` և `perfumes` աղյուսակներ, օրինակներ |

#### Գործարկում (Run Commands):
```bash
# 1. Բազայի ստեղծում
mysql -u root -p < "praktika(inga, maria)/sql.txt"

# 2. .NET հավելվածի գործարկում
cd "praktika(inga, maria)/PerfumeShop"
dotnet run
```

---

### 11. [Tereza_Arman](Tereza_Arman/)

**Հեղինակներ:** Tereza, Arman  
**Նախագծի Անվանում:** STYLE HOUSE — Fashion Boutique & In-Browser SQL Terminal  
**Տեխնոլոգիաներ:** HTML5, CSS3, JavaScript, SQLite (sql.js WebAssembly)  
**Նկարագրություն:** Հագուստի նորաձև սրահի ինտերակտիվ վեբ կայք։ Հատկանշական է նրանով, որ ապրանքների տվյալների բազան աշխատում է անմիջապես զննարկիչում SQLite-ի միջոցով։ Էջի ներքևում առկա է SQL Console, որտեղ կարելի է գրել կամայական SQL հրամաններ (`SELECT`, `UPDATE`, `INSERT`), և ապրանքների ցուցադրությունը տեղում կթարմանա։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [index.html](Tereza_Arman/index.html) | Frontend Page | Խանութի գլխավոր էջ, ապրանքների ցանց և ներկառուցված SQL տերմինալ |
| [script.js](Tereza_Arman/script.js) | Client Logic | `sql.js` ինիցիալիզացիա, SQLite բազայի ստեղծում, SQL հարցումների կատարում |
| [style.css](Tereza_Arman/style.css) | Ոճավորում | Ժամանակակից մուգ և լուսավոր թեմաներով ոճեր, քարտերի դիզայն |
| [README.txt](Tereza_Arman/README.txt) | Փաստաթուղթ | Գործարկման և SQL օրինակների հայերեն ձեռնարկ |

#### Գործարկում (Run Commands):
- Բացել `index.html` ֆայլը Google Chrome-ում կամ Microsoft Edge-ում (պահանջվում է ինտերնետ կապ `sql.js` CDN-ից ներբեռնելու համար)։

---

### 12. [avto-salon_Narek_HaykZaqaryan](avto-salon_Narek_HaykZaqaryan/)

**Հեղինակներ:** Narek, Hayk Zaqaryan  
**Նախագծի Անվանում:** DRIVE — Ավտոսրահի Համակարգ (Car Dealership & Inventory Management)  
**Տեխնոլոգիաներ:** PHP (Native / PDO), MySQL, JavaScript, HTML5, CSS3  
**Նկարագրություն:** Ավտոսրահի մեքենաների կառավարման և վաճառքի համակարգ։ Ներառում է մեքենաների կատալոգ (BMW, Mercedes, Toyota, Tesla և այլն), կարգավիճակների վերահսկում («Առկա է», «Ամրագրված է», «Վաճառված է»), նոր մեքենա ավելացնելու ինտերֆեյս և մեքենայի հեռացում REST API-ի միջոցով։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [index.php](avto-salon_Narek_HaykZaqaryan/index.php) | Frontend & Client | Ավտոսրահի ինտերֆեյս, քարտերի ցուցադրություն, մոդալներ և JavaScript fetch կանչեր |
| [api.php](avto-salon_Narek_HaykZaqaryan/api.php) | Backend REST API | Տվյալների ստացում (`list`), ավելացում (`add`), ջնջում (`delete`) |
| [db.php](avto-salon_Narek_HaykZaqaryan/db.php) | DB Connection | PDO կապ MySQL բազայի հետ (`avto_salon`) |
| [database.sql](avto-salon_Narek_HaykZaqaryan/database.sql) | Տվյալների Բազա | `cars` աղյուսակի ստեղծում և սկզբնական մեքենաների ներմուծում |
| [README.txt](avto-salon_Narek_HaykZaqaryan/README.txt) | Փաստաթուղթ | Գործարկման ուղեցույց (XAMPP / PHP) |

#### Գործարկում (Run Commands):
```bash
# 1. Բազայի ստեղծում
mysql -u root -p < "avto-salon_Narek_HaykZaqaryan/database.sql"

# 2. Գործարկում ներկառուցված PHP սերվերով
cd avto-salon_Narek_HaykZaqaryan
php -S localhost:8000
# Ապա բացել http://localhost:8000/index.php
```

---

### 13. [stylehub_Hayk](stylehub_Hayk/)

**Հեղինակ:** Hayk  
**Նախագծի Անվանում:** STYLEHUB — Հագուստի Խանութ և Կառավարման Համակարգ (Fashion Shop & Catalog Management)  
**Տեխնոլոգիաներ:** PHP (Native / PDO), MySQL, JavaScript, HTML5, CSS3  
**Նկարագրություն:** Հագուստի օնլայն խանութ և պահեստի կառավարում։ Հնարավորություն է տալիս որոնել ըստ անվանման/նկարագրության, ֆիլտրել ըստ կատեգորիաների (Հուդի, Շապիկ, Բաճկոն, Զգեստ, Տաբատ), չափսի (S, M, L), սեռի, գնային սահմանաչափի, առկայության (Available, Limited, Out of Stock) և տեսակավորել ըստ գնի։ Աջակցում է նոր ապրանքների ավելացում և հեռացում։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [index.php](stylehub_Hayk/index.php) | Frontend & Client | Խանութի վիտրինա, ֆիլտրման վահանակ, ապրանքների ավելացման ձևաթուղթ և JS հարցումներ |
| [api.php](stylehub_Hayk/api.php) | Backend REST API | Դինամիկ SQL որոնում, ֆիլտրեր, տեսակավորում, ավելացում և ջնջում |
| [config.php](stylehub_Hayk/config.php) | DB Connection | PDO կապ MySQL բազայի հետ (`stylehub`) |
| [database.sql](stylehub_Hayk/database.sql) | Տվյալների Բազա | `products` աղյուսակ՝ ինդեքսներով և նախնական տեսականիով |
| [README.txt](stylehub_Hayk/README.txt) | Փաստաթուղթ | Գործարկման ուղեցույց (XAMPP / PHP) |

#### Գործարկում (Run Commands):
```bash
# 1. Բազայի ստեղծում
mysql -u root -p < "stylehub_Hayk/database.sql"

# 2. Գործարկում ներկառուցված PHP սերվերով
cd stylehub_Hayk
php -S localhost:8000
# Ապա բացել http://localhost:8000/index.php
```

---

### 14. [watch-market_Gurgen](watch-market_Gurgen/)

**Հեղինակ:** Gurgen  
**Նախագծի Անվանում:** ԺԱՄԱՊԱՀ — Ժամացույցների Առք ու Վաճառք (Watch Market & Trading Platform)  
**Տեխնոլոգիաներ:** PHP (Native / PDO), MySQL, HTML5, CSS3  
**Նկարագրություն:** Դասական, մեխանիկական և խելացի ժամացույցների առք ու վաճառքի հարթակ։ Ներառում է ժամացույցների կատալոգ, որոնում և բազմաչափ ֆիլտրում (ըստ բրենդի, տեսակի՝ Մեխանիկական/Քվարցային/Խելացի, սեռի/ոճի, գնային սահմանաչափի), գների դասավորում, գնման օնլայն հայտի գրանցում (`buy.php`) և սեփական ժամացույցը վաճառելու հայտի ընդունում (`sell.php`)։ Բոլոր հայտերը պահպանվում են MySQL տվյալների բազայում։

#### Ֆայլերի Կառուցվածք (Files Table):
| Ֆայլի Հղում (File Link) | Տեսակ (Type) | Գործառույթ և Նկարագրություն (Description) |
| :--- | :--- | :--- |
| [index.php](watch-market_Gurgen/index.php) | Frontend & Client | Գլխավոր էջ, հերո բաժին, ժամացույցների կատալոգ, որոնում և ֆիլտրեր |
| [buy.php](watch-market_Gurgen/buy.php) | Order Request | Կոնկրետ ժամացույցի գնման հայտի լրացման և գրանցման էջ |
| [sell.php](watch-market_Gurgen/sell.php) | Sell Request | Օգտատիրոջ կողմից ժամացույց վաճառելու հայտի ներկայացման էջ |
| [config.php](watch-market_Gurgen/config.php) | DB Connection | PDO կապ MySQL բազայի հետ (`watch_market`) |
| [database.sql](watch-market_Gurgen/database.sql) | Տվյալների Բազա | `products`, `buy_requests`, `sell_requests` աղյուսակներ և սկզբնական տվյալներ |
| [README.txt](watch-market_Gurgen/README.txt) | Փաստաթուղթ | Տեղադրման և գործարկման ուղեցույց (XAMPP / MySQL) |
| [assets/style.css](watch-market_Gurgen/assets/style.css) | Stylesheet | Կայքի մոդեռն դիզայն և հարմարեցված ոճեր |

#### Գործարկում (Run Commands):
```bash
# 1. Բազայի ստեղծում
mysql -u root -p < "watch-market_Gurgen/database.sql"

# 2. Գործարկում ներկառուցված PHP սերվերով
cd watch-market_Gurgen
php -S localhost:8000
# Ապա բացել http://localhost:8000/index.php
```

---

## 🚀 Գործարկման Ընդհանուր Ուղեցույց (Quick Start Guide)

Այս ռեպոզիտորիայի նախագծերը բաժանվում են 5 հիմնական տեխնոլոգիական խմբի․

### 1. 🟢 Node.js & Express Նախագծեր
- [college_website_Shop_Aksel](college_website_Shop_Aksel/)
- [Armen_Vanik_Arthur](Armen_Vanik_Arthur/)
- [cafewebsite_Ishxan](cafewebsite_Ishxan/)

**Ինչպես աշխատեցնել:**
1. Բացել համապատասխան պանակը տերմինալում։
2. Տեղադրել փաթեթները՝ `npm install`։
3. Մեկնարկել սերվերը՝ `npm start` կամ `node server.js` / `node index.js`։

### 2. 🐍 Python & Flask Նախագծեր
- [Booklibrary_Lika](Booklibrary_Lika/)
- [DreamTrip_Flora](DreamTrip_Flora/)
- [Hasmik](Hasmik/)

**Ինչպես աշխատեցնել:**
1. Ապահովել Python 3-ի և pip-ի առկայությունը։
2. Տեղադրել անհրաժեշտ մոդուլները՝ `pip install flask mysql-connector-python werkzeug`։
3. Գործարկել՝ `python app.py` կամ `python main.py` / `python pyt.py`։

### 3. 🟣 C# & ASP.NET Core (.NET) Նախագծեր
- [Autentication-master_Samvel_George_Slavik](Autentication-master_Samvel_George_Slavik/)
- [praktika(inga, maria)](<praktika(inga, maria)/>)

**Ինչպես աշխատեցնել:**
1. Տեղադրել [.NET SDK](https://dotnet.microsoft.com/) (.NET 9 կամ 10)։
2. Անցնել նախագծի պանակ և գործարկել՝ `dotnet run`։

### 4. 🐘 PHP Նախագծեր
- [atelier_shop_David](atelier_shop_David/)
- [avto-salon_Narek_HaykZaqaryan](avto-salon_Narek_HaykZaqaryan/)
- [stylehub_Hayk](stylehub_Hayk/)
- [watch-market_Gurgen](watch-market_Gurgen/)

**Ինչպես աշխատեցնել:**
1. Բազան ներմուծել MySQL-ում (օրինակ՝ `schema.sql` կամ `database.sql` համապատասխան պանակից)։
2. Գործարկել XAMPP-ի Apache/MySQL կամ ներկառուցված PHP սերվերը տվյալ պանակում՝ `php -S localhost:8000`։

### 5. 🌐 Բրաուզերային SQLite (WASM) Նախագծեր
- [Asatur_Karlen](Asatur_Karlen/)
- [Tereza_Arman](Tereza_Arman/)

**Ինչպես աշխատեցնել:**
- Ուղղակիորեն բացել HTML ֆայլը զննարկիչում (Chrome, Edge, Firefox, Safari)՝ առանց որևէ լրացուցիչ սերվերի կարիքի։

---
*Պատրաստված է քոլեջի ուսանողական նախագծերի ամբողջական փաստաթղթավորման և հարմարավետ կողմնորոշման համար։*
