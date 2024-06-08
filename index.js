import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Arreglo de nombres de usuarios
const usuarios = ["Loui", "Arturo", "Gaston", "Almendra"];

// Generar un número aleatorio del 1 al 4 una vez cuando el servidor se inicia
const numeroAleatorio = Math.floor(Math.random() * 4) + 1;

// Middleware para verificar si el usuario existe en el arreglo
function verificarUsuario(req, res, next) {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'public/assets/img/who.jpeg'));
    }
}

// Definir la carpeta "public" como carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo juego.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/juego.html'));
});

// Ruta para devolver el arreglo de nombres en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

// Ruta que utiliza el middleware para validar el usuario
app.get('/abracadabra/juego/:usuario', verificarUsuario, (req, res) => {
    res.send(`Bienvenido al juego, ${req.params.usuario}!`);
});

// Ruta para validar si el número coincide con el número aleatorio
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroUsuario = parseInt(req.params.n, 10);

    if (numeroUsuario === numeroAleatorio) {
        res.sendFile(path.join(__dirname, 'public/assets/img/conejito.jpg'));
    } else {
        res.sendFile(path.join(__dirname, 'public/assets/img/voldemort.jpg'));
    }
});

// Ruta genérica para manejar rutas no definidas
app.use((req, res) => {
    res.status(404).send('Esta página no existe...');
});

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
