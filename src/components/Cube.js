import * as THREE from 'three'

console.info("Cube is ready!")


//@memeberOf Cube
class Cube {
  /**
   * Creates an instance of App.
   *
   * @memberOf App
   */
  constructor(color = 0x00FF00) {
    // Initialiser le cube
    this._color = color
    this.init()
//    console.info(global.debug);
  }
/*
  *cube init
  *
  *@return {undefined}
  *
  *@memberOf cube
*/
  

  init(){
    const geometry = new THREE.BoxGeometry( 50, 50, 50 );
    const material = new THREE.MeshLambertMaterial( {
        color: this._color, 
        shading: THREE.FlatShading
    });
  

    this._mesh = new THREE.Mesh( geometry, material );
    console.info('init Cube', this._mesh),
        this._mesh.name = 'cube'
    this._mesh.position.x = Math.random() * -150
    this._mesh.position.y = Math.random() * 650
    this._mesh.position.z = Math.random() * 350
  }

  get mesh() {
    return this._mesh
  }

  update(){
      this._mesh.rotation.x += 0.01
//      this._mesh.rotation.y -= 0.01
  }
}
export default Cube