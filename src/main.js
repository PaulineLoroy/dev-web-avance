/**
 * Main JS entry file
 */
import App from 'App'
import Cube from 'Cube'

global.debug = true
console.info('Ready! 🚀')

/* eslint-disable no-new */
const app = new App()
const cube = new Cube()

console.info(cube.mesh);

//ajouter le cube à notre app
for(let i =0 ; i < 20; i++){
    app.add(new Cube());
}