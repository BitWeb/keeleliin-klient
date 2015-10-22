# Keeleliin kliendi käivitamine dockeris

* Loo kliendirakenduse confi jaoks dockeri konteineri väline kaust

	$ mkdir /keeleliin_klient_data

* Lae alla keeleliin-klient Dockerfile

* Loo dockeri Image fail

	$  docker build -t kl_klient .

* Käivita loodud image kl_klient

	$ docker run --name kl_klient -d --rm -p 3001:3001 -v /keeleliin_klient_data:/config --restart=no kl_klient


* Muuda /keeleliin_klient_data/config.js failis API_URL väärtust

* Uuenda konteinerit

	$ docker exec kl_klient /src/docker_update.sh

# Koodibaasi uuendamine

	$ docker exec kl_klient /src/docker_update.sh


