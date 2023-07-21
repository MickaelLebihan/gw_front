# clonage des dépôts git

Créer un dossier, ainsi qu'un fichier **pull_git.sh** et y copier ce code  

	#!/bin/bash
	git clone https://github.com/MickaelLebihan/gw_front front

	cd front
	docker build -t front-image .
	cd ..


	git clone https://github.com/MickaelLebihan/gw_back api
	cd api
	docker build -t api-image .
	cd ..
	
dans un terminal le rendre exécutable avec la commande

		chmod +x pull_git.sh

exécuter le fichier pour lancer le clonage des dépôts git et la compilation des images dockers

    

# Docker-compose.yml
Créer un fichier **docker-compose.yml**

	version: '3'
	services:
	  api:
	    image: api
	    ports:
	      - "5000:5000"
	    environment:
	      ASPNETCORE_ENVIRONMENT: Production
	      ASPNETCORE_URLS: http://+:5000
	    networks:
	        - gw_network
	    depends_on:
	      - db
	  front:
	    image: front
	    ports:
	      - "80:80"
	    networks:
	        - gw_network
	  db:
	    image: mariadb
	    restart: always
	    environment:
	      MYSQL_DATABASE: gw_data
	      MYSQL_USER: root
	      MYSQL_PASSWORD: mypassword
	      MYSQL_ROOT_PASSWORD: myrootpassword
	    volumes:
	      - mydata:/var/lib/mysql
	    networks:
	      - gw_network

	volumes:
	  mydata:

	networks:
	    gw_network:

## téléchargement des dépendances et démarrage des images docker

lancer le téléchargement et le démarrage des images docker en lançant la commande

	docker compose up
