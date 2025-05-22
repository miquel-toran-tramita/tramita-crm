import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { IBridge, IPoints, ITourScene } from '@/sync/interfaces/ITourScene'

export class TourVirtual {
  public tourScenes: ITourScene[] = []

  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private raycaster: THREE.Raycaster
  private controls: OrbitControls
  private mouse: THREE.Vector2
  private interactiveObjects: THREE.Object3D[] = []
  private buttonHandlers: Map<THREE.Object3D, IBridge> = new Map()
  private hoveredButtons = new Set<THREE.Object3D>()
  private hasMovedMouse: boolean = false
  private sphere: THREE.Mesh
  private HTMLContainer: HTMLElement

  public constructor(container: HTMLElement, tourScenes: ITourScene[]) {
    this.scene = new THREE.Scene()
    this.tourScenes = tourScenes
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(1, 0, 0)
    this.HTMLContainer = container

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.rotateSpeed = -0.3
    this.controls.enableZoom = false
    this.controls.enablePan = false

    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.addSphere()

    // Bindear animate() para mantener el contexto de this
    this.animate = this.animate.bind(this)
    this.animate()

    if (this.tourScenes[0]) this.updateRoom(this.tourScenes[0])
  }

  private hoverButtons() {
    if (this.hasMovedMouse) {
      this.raycaster.setFromCamera(this.mouse, this.camera)
      const intersects = this.raycaster.intersectObjects(this.interactiveObjects)

      // Resetea los botones no hovered
      this.interactiveObjects.forEach((obj) => {
        if (!intersects.find((i) => i.object === obj)) {
          if (this.hoveredButtons.has(obj)) {
            // Ya no está hovered → animar a escala 1
            gsap.to(obj.scale, { x: 1, y: 1, z: 1, duration: 0.3 })
            this.hoveredButtons.delete(obj)
          }
        }
      })

      // Hover actual
      if (intersects.length > 0) {
        const hovered = intersects[0].object
        if (!this.hoveredButtons.has(hovered)) {
          // Acaba de entrar en hover → animar a 1.2
          this.HTMLContainer.style.cursor = 'pointer'
          gsap.to(hovered.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 })
          this.hoveredButtons.add(hovered)
        }
      }
    }
  }

  private animate() {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)

    this.controls.update()
    this.hoverButtons()
  }

  private addSphere() {
    const texture = new THREE.TextureLoader().load('')
    texture.colorSpace = THREE.SRGBColorSpace
    const geometry = new THREE.SphereGeometry(100, 100, 100).scale(-1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const sphere = new THREE.Mesh(geometry, material)

    //Logo
    const logoGeometry = new THREE.PlaneGeometry(30, 30)
    const logoMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(`/assets/tour/logoround.png`),
      transparent: true,
    })

    const logo = new THREE.Mesh(logoGeometry, logoMaterial)
    logo.position.set(0, -95, 0)
    logo.lookAt(new THREE.Vector3(10, 0, -1))
    ////

    this.sphere = sphere
    this.sphere.add(logo)
    this.scene.add(sphere)
  }

  private updateAllBridges(tourScene: ITourScene) {
    if (!tourScene) return

    const MESHButtons = this.scene.children.filter((x: THREE.Mesh) => x.userData.type === 'btn-bridge')

    // Remove old ones
    for (let MESHButton of MESHButtons) this.removeButton(MESHButton)

    // Put the new ones
    for (let bridge of tourScene.bridges) {
      this.addButton(bridge)
    }
  }

  private animateCameraZoom(zoom: number, fov, duration): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(this.camera, {
        zoom,
        fov,
        duration,
        onUpdate: () => this.camera.updateProjectionMatrix(),
        onComplete: resolve,
      })
    })
  }

  private removeButton = (button: THREE.Mesh) => {
    // 1. Quitar del scene
    this.scene.remove(button)

    // 2. Quitar del array de interactivos
    this.interactiveObjects = this.interactiveObjects.filter((obj) => obj !== button)

    // 3. Quitar del mapa de handlers
    this.buttonHandlers.delete(button)

    // 4. Quitar del set de hover (si aplica)
    this.hoveredButtons.delete(button)

    // 5. Liberar memoria
    if (button.geometry) button.geometry.dispose()
    if ((button.material as any).map) (button.material as any).map.dispose()
    if (button.material) (button.material as any).dispose()
  }

  private getPoints = (event: MouseEvent): IPoints => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)

    const points: IPoints = { x: 0, y: 0, z: 0, normalFace: new THREE.Vector3(0, 0, 0) }

    if (intersects.length > 0) {
      const point = intersects[0].point
      points.normalFace = intersects[0].face?.normal.clone()

      // if (normal) point.add(normal.multiplyScalar(5))

      points.x = point.x
      points.y = point.y
      points.z = point.z
    }

    return points
  }

  private loadTextureAsync(url: string): Promise<THREE.Texture> {
    const loader = new THREE.TextureLoader()
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (err) => reject(err)
      )
    })
  }

  // PUBLIC FUNCTIONS
  public onClick = (event: MouseEvent) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)

    if (intersects.length > 0) {
      const obj = intersects[0].object
      const bridge: IBridge = this.buttonHandlers.get(obj)

      if (obj.userData?.type === 'btn-bridge') {
        const index: number = this.tourScenes.findIndex((sc: ITourScene) => sc.id === bridge.destiny)

        if (index === -1) console.error('Scene not found')
        this.updateRoom(this.tourScenes[index])

        const event = new CustomEvent('roomUpdated', { detail: index })

        document.dispatchEvent(event)
      }
    }
  }

  public onMouseMove = (event: MouseEvent) => {
    if (this.mouse) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      this.hasMovedMouse = true
    }

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)

    this.HTMLContainer.style.cursor = intersects.length > 1 ? 'pointer' : 'grab'
  }

  public onMouseDown = (event: MouseEvent) => {
    if (this.mouse) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)

    return intersects.length > 1
  }

  public onContextMenu = (event: MouseEvent) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)

    if (intersects.length > 0) {
      const obj = intersects[0].object
      const bridge: IBridge = this.buttonHandlers.get(obj)

      if (obj.userData?.type === 'btn-bridge') {
        this.removeButton(obj)
      }

      return bridge.id
    }

    return 0
  }

  public onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  public onMouseWheel = (event: WheelEvent) => {
    event.preventDefault()

    const fovDelta = event.deltaY * 0.05 // sensibilidad
    this.camera.fov = THREE.MathUtils.clamp(this.camera.fov + fovDelta, 30, 100)
    this.camera.updateProjectionMatrix()
  }

  public async updateRoom(tourScene?: ITourScene, generateScreenshot: boolean = false): Promise<string> {
    if (!tourScene) return ''

    await this.animateCameraZoom(1.1, 90, 0.3)

    const newTexture = await this.loadTextureAsync(tourScene.image)

    const mat = this.sphere.material as THREE.MeshBasicMaterial
    newTexture.colorSpace = THREE.SRGBColorSpace

    if (mat.map) mat.map.dispose()
    mat.map = newTexture
    mat.needsUpdate = true

    this.updateAllBridges(tourScene)

    this.HTMLContainer.style.cursor = 'grab'
    await this.animateCameraZoom(1, 90, 0.3)

    if (generateScreenshot) {
      return this.renderer.domElement.toDataURL('image/png')
    }

    return ''
  }

  public addButton(newBridge: IBridge, ev?: MouseEvent): IPoints {
    let points: IPoints = { x: 0, y: 0, z: 0 }

    if (ev) {
      points = this.getPoints(ev)
    } else {
      points.x = newBridge?.x || 0
      points.y = newBridge?.y || 0
      points.z = newBridge?.z || 0
      points.normalFace = new THREE.Vector3(newBridge?.normalFace.x, newBridge?.normalFace.y, newBridge?.normalFace.z)
    }

    const size = newBridge.type === 'Círculo' ? Math.abs(points.y) / 5 : 8 //Compensa la ilusion optica
    const geometry = new THREE.PlaneGeometry(size, size)
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(`/assets/tour/${newBridge.type}.png`),
      transparent: true,
      side: THREE.DoubleSide,
    })

    const button = new THREE.Mesh(geometry, material)
    const position = new THREE.Vector3(points.x, points.y, points.z)

    // Separación del botón respecto a la pared (1 = 1 unidad)
    const offset = points.normalFace.clone().multiplyScalar(6)
    position.add(offset)

    const cameraPosition = this.camera.position.clone()

    const compensateRotation = points.y < -20 ? 600 : points.y
    const lookAtTarget = new THREE.Vector3(cameraPosition.x, compensateRotation, cameraPosition.z)

    button.userData.type = 'btn-bridge'
    button.position.copy(position)
    button.lookAt(lookAtTarget)

    this.scene.add(button)

    this.interactiveObjects.push(button)

    this.buttonHandlers.set(button, { ...newBridge })

    return points
  }
}
