import * as THREE from 'three'
const OrbitControls = require ('three-orbit-controls')(THREE)


/**
 * App manager
 *
 * @class App
 */
class App {
  /**
   * Creates an instance of App.
   *
   * @memberOf App
   */
  constructor() {
    // Initialiser une scène
    this.initScene()
  }

  /**
   * Scene init
   *
   * @returns {undefined}
   *
   * @memberOf App
   */
  initScene() {
    console.info('initScene')
    // Create scene
    this._width = window.innerWidth
    this._height = window.innerHeight
    this._scene = new THREE.Scene()
    window.scene = this._scene
    window.THREE = THREE

    // Init camera
    this.initCamera()


    // Init renderer
    this.initRenderer()


    //Init controls   
    this.initControls()
  

    // Render !!!
    this.render()
  }

  initCamera() {
    const fieldOfView = 60
    const aspectRatio = this._width / this._height
    const nearPlane = 1
    const farPlane = 2000

    this._camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    this._camera.position.x = 200;
    this._camera.position.y = 300;
    this._camera.position.z = 500;
    this._camera.lookAt(new THREE.Vector3(0, 0, 0))
  }


  initLight() {
  	//const light = new THREE.Spotlight(0xffffff, 1)
  	//const light = new THREE.Directionallight(0xffffff, 1)
  	const light = new THREE.Ambientlight(0xffffff, 1)
  	this._scene.add(light)
  }

  initControls(){
  	this._controls = new OrbitControls(this._camera, this._renderer.domElement)
  }

  initRenderer() {
    this._renderer = new THREE.WebGLRenderer()
    this._renderer.setSize(this._width, this._height)
    document.body.appendChild(this._renderer.domElement)
  }

  render() {
  	requestAnimationFrame(() => {this.render()})

    this._renderer.render(this._scene, this._camera)
    console.info('render')
  }

  add(mesh){
  	console.info('add to scene');
  	this._scene.add(mesh)
  }


}
export default App