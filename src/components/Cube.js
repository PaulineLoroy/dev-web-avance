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
  }
/*
  *cube init
  *
  *@return {undefined}
  *
  *@memberOf cube
*/
  

  init(){
    const geometry = new THREE.BoxBufferGeometry( 50, 50, 50 );
    const material = new THREE.MeshBasicMaterial( {color: this._color} );
  

    this._mesh = new THREE.Mesh( geometry, material );
    console.info('init Cube', this._mesh),
        this._mesh.name = 'cube'
  }

  get mesh() {
    return this._mesh
  }

}
export default Cube