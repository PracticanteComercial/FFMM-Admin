# React + Vite

## Para correr la aplicación
```npm install```
```npm run dev```


## Docker
docker build -t ffmm-admin .
docker run -p 3003:3003 -e VITE_BACKEND_URL='http://localhost:3001' ffmm-admin
docker tag ffmm-admin 10.0.1.8:5000/ffmm-admin:1.0
docker push 10.0.1.8:5000/ffmm-admin:1.0

