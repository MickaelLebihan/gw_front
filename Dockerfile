# Utilisez une image de base contenant Node.js
FROM node:16-alpine AS build

# Créez un répertoire de travail
WORKDIR /app

# Copiez le fichier de projet et restaurez les dépendances
COPY package*.json ./
RUN npm install

# Copiez le reste du code
COPY . .

# Construire l'application
RUN npm run build

# Utilisez une image de base contenant Nginx
FROM nginx:1.21.3-alpine AS runtime

# Supprimez le fichier par défaut de Nginx
RUN rm /usr/share/nginx/html/*

# Copiez les fichiers de publication
COPY --from=build /app/build /usr/share/nginx/html

# Copiez la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exposez le port 80
EXPOSE 80

# Démarrez Nginx
CMD ["nginx", "-g", "daemon off;"]