# Projekti käivitamine dockeris

* Loo dockeri konteinerite välised kaustad

	$ cd /

	$ mkdir keeleliin_klient_data

* Lae alla keeleliin-server Dockerfile

* Loo dockeri Image fail

	$  docker build -t kl_klient .

* Käivita loodud image kl_server

	$ docker run --name kl_klient --rm -p 3001:3001 -v /keeleliin_klient_data:/config --restart=no kl_klient

* Muuda /keeleliin_klient_data/config.js failis API_URL väärtust

* Uuenda konteinerit

	$ docker exec <konteineri ID> /src/docker_update.sh

# Koodibaasi uuendamine

	$ docker exec <konteineri ID> /src/docker_update.sh

#   Dockeri run parameetreid

*   -d                  Jooksuta taustal
*   --rm                Serveri sulgemisel kustuta konteiner
*   --restart=no
*   --restart=always
* Konteinerit taustal jookustamiseks eemalda --rm ja kasuta --restart=always ning lisa -d


