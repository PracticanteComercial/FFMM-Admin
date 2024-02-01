# React + Vite

## Para correr la aplicación 
Estando dentro la carpeta frontend:
```npm install```
```npm run dev```


## Docker
docker build -t ffmm-admin .

docker run -p 3003:3003 \ -e VITE_BACKEND_URL='http://localhost:3001' \ ffmm-admin  

