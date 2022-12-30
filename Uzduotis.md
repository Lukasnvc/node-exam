# node-exam

Pateikimas vertinimui:
- Github repozitorija
- Duomenų bazės konfiguracija nurodoma .env.example kodo viduje (nurodoma, kad DB pasiekiama iš visų IP adresų).
Užduotis.
Sukurkite REST API, naudodami Node.js/Express.js, kuris grąžina informaciją apie vartotojus.
Įsivaizduokite, kad į jus kreipėsi įmonė, kuri turi savo REST API "endpoint" arba "route", kuris grąžina daug informacijos apie vartotojus (https://prnt.sc/1v663x5 ). Jie pastebėjo, kad dažnu atveju ši informacija yra perteklinė ir ne visada visa naudojama. Todėl buvo nuspręsta turėti savo vartotojų duomenų bazę (users_db, duomenų modelis: id, name, email, address) bei naudoti vartotojus, kurie grąžinami iš čia https://jsonplaceholder.typicode.com/users. Todėl atsirado poreikis sukurti naujus "endpoint" (arba "route"), kurie:
1. Kreipsis į https://jsonplaceholder.typicode.com/users ir užpildys users_db atitinkamus laukus. (id, name, email, address)
a. POST - /api/fill
i. Adresą naudoti kaip vientisą stringą
ii. Extra: Leisti užpildyti tik vieną kartą
iii. Extra: Adresą naudoti kaip atskirą collectioną
2. Sudarytoje duomenų bazėje users_db:
a. POST - /api/users - talpins vartotojus (name, email, address)
b. GET - /api/users - grąžins vartotojus (id, name, email, address)
c. GET - /api/users/names - masyvą su vartotojais, kurie bus objekte ir
jame bus matomas vartotojo id ir vardas. Pvz. {id: 1, name: „Leanner
Graham“}
d. GET - /api/users/emails - masyvą su vartotojais, kurie bus objekte ir
jame bus matomas vartotojo id, vardas ir email. Pvz. {id: 1, name:
„Leanner Graham“, email: "Sincere@april.biz"}
e. GET - /api/users/address - masyvą su vartotojais, kurie bus objekte ir jame bus matomas vartotojo id, vardas ir pilnas adresas (gatvė ir miestas kaip vienas string). Pvz {id: 1, name: „Leanner Graham“, address: „Kulas Light, Gwenborough“ }
i. Extra: Adresas matysis kaip objektas Pvz. {id: 1, name: „Leanner Graham“, address: {city: „Gwenborough“, street: „Kulas Light“}}
Svarbu:
Įkelti .env.example failą su .env failo prerekvizitais pvz: PORT=
URI=
