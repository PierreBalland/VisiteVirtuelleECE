const container = document.body
const tooltip = document.querySelector('.tooltip')
let spriteActive = false

class Scene {   //pour creer plusieurs scenes

  constructor (image, camera) {
    this.image = image
    this.points = []
    this.sprites = []
    this.scene = null
    this.camera = camera
  }

  createScene (scene) {
    this.scene = scene    
    const geometry = new THREE.SphereGeometry(50, 28, 28) //radius rayon, nbr de segement
    const texture = new THREE.TextureLoader().load(this.image) //charge l'image
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.x = -1 //on place la camera a l'inverse pour voir le bon angle
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    })
    material.transparent = true
    this.sphere = new THREE.Mesh(geometry, material)
    this.scene.add(this.sphere)
    this.points.forEach(this.addTooltip.bind(this)) //recupere chaque point
  }

  addPoint (point) {  //se charge d'ajouter dans le tableau des point, un point 
    this.points.push(point)
  }

  addTooltip (point) {  //permet de creer des points d'interets
    let spriteMap = new THREE.TextureLoader().load('pointinteret.png')
    let spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap
    })
    let sprite = new THREE.Sprite(spriteMaterial)
    sprite.position.copy(point.position.clone().normalize().multiplyScalar(30))
    this.scene.add(sprite)//on ajoute la photo
    this.sprites.push(sprite)
    sprite.onClick = () => {
      this.supprimer()
      point.scene.createScene(scene)  //on passe en parametre la nouvelle scene 
      point.scene.transition()
    }
  }

  supprimer () {   //transition quand on quitte la scene
    TweenLite.to(this.sphere.material, 0.5, {  
      opacity: 10,    //
      onComplete: () => {
        this.scene.remove(this.sphere) //on supprime la sphere qu'on quitte 
      }
    })
    this.sprites.forEach((sprite) => {
      TweenLite.to(sprite.scale, 1, {    //opacite du point 
        x: 0,
        y: 0,
        z: 0,
        onComplete: () => {
          this.scene.remove(sprite)  //supprime les anciens points pour ne pas les ajouter a la nouvelle sphere 
        }
      }) 
    }) 
  }

  transition () {    //transition quand on rentre dans une nouvelle sphere, ou joue sur l'oppacite
    this.sphere.material.opacity = 0
    TweenLite.to(this.sphere.material, 1, {
      opacity: 2
    })
  }
}

const renderer = new THREE.WebGLRenderer()  //permet que la scene soit vu a l'ecran
renderer.setSize(window.innerWidth, window.innerHeight) //on lui defini une taille
container.appendChild(renderer.domElement)

function animate () {
  requestAnimationFrame(animate) //remet a jour les vus camera
  renderer.render(scene, camera)
}

function onClick (e) {  //permet de cliquer avec la souris
  let mouse = new THREE.Vector2(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1
  ) //rend les position du clique x y et z 
  rayCaster.setFromCamera(mouse, camera)
  let intersects = rayCaster.intersectObjects(scene.children)
  intersects.forEach(function (intersect) {   //si il y a une intersection, on rentre dans le point d'interet
    if (intersect.object.type === 'Sprite') {
      intersect.object.onClick()
      if (spriteActive) {
        tooltip.classList.remove('is-active')
        spriteActive = false
      }
    }
  })
}

function onResize () {   //peremet de redimensionner si on agrandi ou reduit la taille de la page
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}



const scene = new THREE.Scene() //cree une scene
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)  //angle de vision, ratio de capture, zone que verra la camera
const controls = new THREE.OrbitControls(camera)
controls.rotateSpeed = 0.3 //vitesse pour tourner l'image
controls.enableZoom = false
controls.enablePan = false
controls.enableZoom = false //refuse de zoomer
camera.position.set(40, 0, 0.1) //position de la camera 
controls.update() //on met a jour 

// Sphere
let s = new Scene('360.jpg', camera)  //chaque image va representer une scene 
let s2 = new Scene('3602.jpg', camera)
let s3 = new Scene('3603.jpg', camera)
let s4 = new Scene('3604.jpg', camera)
let s5 = new Scene('3605.jpg', camera)
let s6 = new Scene('3606.jpg', camera)
let s7 = new Scene('3607.jpg', camera)
let s8 = new Scene('3608.jpg', camera)
let s9 = new Scene('3609.jpg', camera)
let s10 = new Scene('3610.jpg', camera)
let s11 = new Scene('3611.jpg', camera)

s.addPoint({
  position: new THREE.Vector3(-49, -7.28, -1.22),  //positionnement des differents point d'interet
  scene: s2
})
s2.addPoint({
  position: new THREE.Vector3(-47, -16, -0.37),
  scene: s3
})
s2.addPoint({
  position: new THREE.Vector3(49, -0.48, 0.38),
  scene: s
})

s3.addPoint({
  position: new THREE.Vector3(-48, -8, 7.57),
  scene: s4

})
s3.addPoint({
  position: new THREE.Vector3(46, -4, -17),
  scene: s2

})
s4.addPoint({
  position: new THREE.Vector3(46, -17, 5.38),
  scene: s5
})
s4.addPoint({
  position: new THREE.Vector3(-41, 0.1, -27),
  scene: s3
})
s5.addPoint({
  position: new THREE.Vector3(33, -20, -31),
  scene: s6
})
s5.addPoint({
  position: new THREE.Vector3(-49, 0.21, -7.1),
  scene: s4
})
s6.addPoint({
  position: new THREE.Vector3(20, -19, 13.0000),
  scene: s7

})
s6.addPoint({
  position: new THREE.Vector3(-44, -5, -21),
  scene: s5

})
s7.addPoint({
  position: new THREE.Vector3(45, -20, 4.00),
  scene: s8
})
s7.addPoint({
  position: new THREE.Vector3(-36, -16, -29),
  scene: s6
})
s8.addPoint({
  position: new THREE.Vector3(40, -22, 18.00),
  scene: s9
})
s8.addPoint({
  position: new THREE.Vector3(-47, 2, -13),
  scene: s7
})
s9.addPoint({
  position: new THREE.Vector3(42, -17, -19),
  scene: s10

})
s9.addPoint({
  position: new THREE.Vector3(15, -14, 45),
  scene: s8

})
s10.addPoint({
  position: new THREE.Vector3(48, -9, 2),
  scene: s11
})
s10.addPoint({
  position: new THREE.Vector3(-49, -0.3, -1.6),
  scene: s9
})
s11.addPoint({
  position: new THREE.Vector3(40, -8, 29),
  scene: s10
})

s.createScene(scene)
animate()
const rayCaster = new THREE.Raycaster()
window.addEventListener('resize', onResize)  //redimenstionne 
container.addEventListener('click', onClick) //appelle onclick

