/**
 * Main JS entry file
 */
import App from 'App'
import Cube from 'Cube'

console.info('Ready! 🚀')

/* eslint-disable no-new */
const app = new App()
const cube = new Cube()

console.info(cube.mesh);

//ajouter le mesh à la scene

app.add(cube.mesh);