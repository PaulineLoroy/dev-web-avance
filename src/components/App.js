import * as THREE from 'three'
const OrbitControls = require('three-orbit-controls')(THREE)
const { Stats } = require('three-stats') //eslint-disable-line
import debounce from 'lodash/debounce'


class App {
   constructor(scene) {
      // light store
      this._lights = []
      // objet store
      this._objects = []

      // installer une scene
      this.initScene()


   }

   initScene() {
      console.info('initScene')
      // create scene
      this._width = window.innerWidth
      this._height = window.innerHeight

      this._scene = new THREE.Scene()

      if(global.debug) {
         window.scene = this.scene
         window.THREE = THREE
      }

      // init camera
      this.initCamera()

      // init light
      this.initLight()

      // init renderer
      this.initRenderer()

      this.bind()

      // init controls
      if(global.debug) {
         this.initControls()
      }

      // init Stats
      if(global.debug) {
         this.initStats()
      }

      // init helpers
      if(global.debug) {
         this.addHelpers()
      }

      // render !!!
      this.render()
   }

   initCamera() {
      const fieldOfViex = 60
      const aspectRatio = this._width / this._height
      const nearPlane = 1
      const farPLane = 2000

      this._camera = new THREE.PerspectiveCamera(fieldOfViex, aspectRatio, nearPlane, farPLane)
      this._camera.position.x = 200;
      this._camera.position.y = 300;
      this._camera.position.z = 500;
      this._camera.lookAt(new THREE.Vector3(0, 0, 0))
   }

   initLight() {
      const ambientLight = new THREE.AmbientLight(0x999999, 1)

      this._scene.add(ambientLight)
      window.scene = this._scene
      window.THREE = THREE


      const spotLight = new THREE.SpotLight(0xffffff, .75)
      //this._scene.add(new THREE.SpotLightHelper(spotLight))
      
      spotLight.name = 'spot'
      spotLight.position.set(-300, 300, 300)
      spotLight.castShadow = true
      this._lights.push(spotLight)
      this._scene.add(spotLight)
   }
       
   bind(){
       window.addEventListener(
         'resize',
         debounce(this.onResize.bind(this), 500)
      )
   }

   onResize(){
      this._width = window.innerWidth
      this._height = window.innerHeight
      this._renderer.setSize(this._width, this._height)
      this._camera.aspect = this._width / this._height
      this._camera.updateProjectionMatrix()
   }

   initControls() {
      this._controls = new OrbitControls(this._camera, )
   }

   initStats() {
      this._stats = new Stats()
      this._stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+ custom
      document.body.appendChild(this._stats.dom)
   }

       
   initRenderer(){
      this._renderer = new THREE.WebGLRenderer({
         antialias: true
      })
      this._renderer.setSize(this._width, this._height)
      this._renderer.shadowMap.enabled = true
      document.body.appendChild(this._renderer.domElement, this._renderer.domElement)
   }

   render() {
      requestAnimationFrame(() => {
         this.render()
      })

      if(this._stats) {
         this._stats.begin()
      }

      this._objects.forEach((obj) => {
         obj.update()
      })

      this._renderer.render(this._scene, this._camera)

      if(this._stats) {
         this._stats.end()
      }
   }

   addHelpers() {
      // parcourir les lumière
      this._lights.forEach((light) => {
         // Ajouter un helper
         this.addHelper(light.shadow.camera)
      })
   }

   addHelper(camera) {
      const helper = new THREE.CameraHelper(camera)
      this._scene.add(helper)
   }

   add(obj) {
      this._objects.push(obj)
      this._scene.add(obj.mesh)
   }
}

export default App