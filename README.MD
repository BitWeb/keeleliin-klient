# Projekti käivitamine dockeriga

* Loo config.js fail

$ cp app/config/config_dist.js app/config/config.js

* Muuda loodud config.js failis API_URL väärtus


*   RUN OPTIONS
*   -d                  Jooksuta taustal
*   --rm                Serveri sulgemisel kustuta konteiner
*   --restart=no
*   --restart=always
* Konteinerit taustal jookustamiseks eemalda --rm ja kasuta --restart=always ning lisa -d


* BUILD KLIENT

$ docker build -t kl_client .

* RUN KEELELIIN KLIENT

$ docker run --name kl_client -p 127.0.0.1:8080:3000 --rm --restart=no kl_client


