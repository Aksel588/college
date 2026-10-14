STYLE HOUSE + SQL DATABASE CONSOLE

Ֆայլեր՝ index.html, style.css, script.js

Գործարկում՝ բացիր պանակը VS Code-ում և index.html-ը բացիր Chrome/Edge-ով։ SQLite-ի գրադարանը բեռնելու համար պետք է ինտերնետ։

SQL Console-ը էջի ներքևում է և աշխատում է նույն SQLite products աղյուսակով, որից կայքը ստանում է ապրանքների քարտերը։ Աղյուսակն ունի id, name, price, category, gender, image սյունակներ։

Օրինակ՝
SELECT * FROM products;
SELECT name, price FROM products WHERE price < 20000 ORDER BY price;
UPDATE products SET price = 10000 WHERE id = 1;

Նշում՝ սա browser-ի SQLite տվյալների բազա է․ տվյալները պահվում են ընթացիկ էջի հիշողության մեջ և չեն ուղարկվում արտաքին սերվեր։ SQL-ով փոխված ապրանքների տվյալները թարմացնում են նաև ապրանքների ցուցադրումը։
