'use client'

import { useRef, useMemo, forwardRef, useImperativeHandle, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const FRAGMENT_COUNT = 2000
const SPHERE_RADIUS = 2.5
const FRAGMENT_SIZE = 0.05

interface FragmentData {
  targetPosition: THREE.Vector3
  startPosition: THREE.Vector3
  currentPosition: THREE.Vector3
  baseRotation: THREE.Euler
  scale: number
  formationProgress: number
  delay: number
  velocity: THREE.Vector3
  floatOffset: number
  floatSpeed: number
}

function PaperFragmentsScene({ 
  isForming,
  scrollProgress = 0,
  onFormationComplete,
}: { 
  isForming: boolean
  scrollProgress: number
  onFormationComplete?: () => void
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const { camera, size } = useThree()
  
  // Mouse tracking
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const mouseSmoothRef = useRef(new THREE.Vector2(0, 0))
  
  // Estado
  const formationStartTime = useRef<number | null>(null)
  const formationComplete = useRef(false)

  // Gerar fragmentos - VÊM DE TRÁS DO USUÁRIO (Z positivo alto)
  const fragments = useMemo<FragmentData[]>(() => {
    const frags: FragmentData[] = []
    
    for (let i = 0; i < FRAGMENT_COUNT; i++) {
      // Fibonacci sphere para posição final
      const phi = Math.acos(1 - 2 * (i + 0.5) / FRAGMENT_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      
      const r = SPHERE_RADIUS * (0.9 + Math.random() * 0.2)
      const targetX = r * Math.sin(phi) * Math.cos(theta)
      const targetY = r * Math.sin(phi) * Math.sin(theta)
      const targetZ = r * Math.cos(phi)
      
      // POSIÇÃO INICIAL: ATRÁS DO USUÁRIO (Z muito positivo, além da câmera)
      // A câmera está em Z=10, então fragmentos começam em Z=15 a Z=40
      const startDepth = 20 + Math.random() * 30 // Entre Z=20 e Z=50 (atrás da câmera)
      const spreadX = (Math.random() - 0.5) * 30
      const spreadY = (Math.random() - 0.5) * 30
      
      // Delay: fragmentos mais distantes chegam um pouco depois
      const delay = Math.random() * 0.8

      frags.push({
        targetPosition: new THREE.Vector3(targetX, targetY, targetZ),
        startPosition: new THREE.Vector3(spreadX, spreadY, startDepth),
        currentPosition: new THREE.Vector3(spreadX, spreadY, startDepth),
        baseRotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        scale: 0.4 + Math.random() * 0.8,
        formationProgress: 0,
        delay,
        velocity: new THREE.Vector3(),
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.2 + Math.random() * 0.3,
      })
    }
    
    return frags
  }, [])

  // Cores
  const goldColor = useMemo(() => new THREE.Color('#b3a483'), [])
  const whiteColor = useMemo(() => new THREE.Color('#ffffff'), [])
  
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Mouse tracking global
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Iniciar formação
  useEffect(() => {
    if (isForming && formationStartTime.current === null) {
      formationStartTime.current = performance.now()
    }
  }, [isForming])

  // Setup inicial - fragmentos invisíveis
  useEffect(() => {
    if (!meshRef.current) return
    
    fragments.forEach((frag, i) => {
      dummy.position.copy(frag.startPosition)
      dummy.rotation.copy(frag.baseRotation)
      dummy.scale.setScalar(0.001)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [fragments, dummy])

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const cam = camera as THREE.PerspectiveCamera
    
    // ===== MOUSE SUAVIZADO =====
    mouseSmoothRef.current.x += (mouseRef.current.x - mouseSmoothRef.current.x) * 0.06
    mouseSmoothRef.current.y += (mouseRef.current.y - mouseSmoothRef.current.y) * 0.06

    // ===== FORMAÇÃO =====
    const formationDuration = 2000
    const elapsed = formationStartTime.current 
      ? performance.now() - formationStartTime.current 
      : 0
    
    let allComplete = true

    // ===== CÂMERA: ENTRADA GRADUAL NA ESFERA =====
    // scrollProgress 0 = câmera longe (Z=10)
    // scrollProgress 0.5 = câmera na superfície da esfera
    // scrollProgress 1 = câmera bem dentro da esfera (Z=-2)
    const baseZ = 10
    const targetCamZ = baseZ - scrollProgress * 15 // 10 → -5
    const baseFov = 50
    const targetFov = baseFov + scrollProgress * 60 // 50 → 110
    
    cam.position.z += (targetCamZ - cam.position.z) * 0.06
    cam.fov += (targetFov - cam.fov) * 0.06
    cam.updateProjectionMatrix()

    // ===== FRAGMENTOS =====
    fragments.forEach((frag, i) => {
      // Progresso da formação
      if (isForming && elapsed > frag.delay * 1000) {
        const fragElapsed = elapsed - frag.delay * 1000
        const progress = Math.min(fragElapsed / formationDuration, 1)
        frag.formationProgress = 1 - Math.pow(1 - progress, 3)
      }
      
      if (frag.formationProgress < 0.99) {
        allComplete = false
      }

      // Posição base
      const basePos = new THREE.Vector3().lerpVectors(
        frag.startPosition,
        frag.targetPosition,
        frag.formationProgress
      )

      // ===== FLUTUAÇÃO ORGÂNICA PARA A DIREITA=====
      const floatAmp = 0.06 * frag.formationProgress
      const floatX = Math.sin(time * frag.floatSpeed + frag.floatOffset) * floatAmp
      const floatY = Math.cos(time * frag.floatSpeed * 0.8 + frag.floatOffset) * floatAmp
      const floatZ = Math.sin(time * frag.floatSpeed * 0.5 + frag.floatOffset * 1.5) * floatAmp * 0.5

      // ===== HOVER DO MOUSE - AFETA TODA A ESFERA =====
      if (frag.formationProgress > 0.3) {
        // Converter mouse para direção 3D a partir da câmera
        const mouseDir = new THREE.Vector3(
          mouseSmoothRef.current.x * 0.5,
          mouseSmoothRef.current.y * 0.5,
          -1
        ).normalize()
        
        // Raio virtual que passa pelo centro da esfera
        const rayOrigin = cam.position.clone()
        const sphereCenter = new THREE.Vector3(0, 0, 0)
        
        // Calcular ponto mais próximo do raio ao fragmento
        const fragWorldPos = basePos.clone()
        const toFrag = fragWorldPos.clone().sub(rayOrigin)
        const projection = toFrag.dot(mouseDir)
        const closestPointOnRay = rayOrigin.clone().add(mouseDir.clone().multiplyScalar(projection))
        
        // Distância do fragmento ao raio do mouse
        const distToRay = fragWorldPos.distanceTo(closestPointOnRay)
        
        const attractionRadius = 2.5
        const attractionStrength = 0.08

        if (distToRay < attractionRadius && projection > 0) {
          const force = Math.pow(1 - distToRay / attractionRadius, 1.5) * attractionStrength
          // Atração em direção ao mouse (cria relevo/montanha)
          const toMouse = closestPointOnRay.clone().sub(fragWorldPos).normalize()
          frag.velocity.add(toMouse.multiplyScalar(force))
        }
      }

      // Spring de volta
      const toTarget = new THREE.Vector3().subVectors(frag.targetPosition, frag.currentPosition)
      frag.velocity.add(toTarget.multiplyScalar(0.02))
      frag.velocity.multiplyScalar(0.85)

      // Aplicar
      frag.currentPosition.copy(basePos)
      if (frag.formationProgress > 0.7) {
        frag.currentPosition.add(frag.velocity)
      }
      frag.currentPosition.x += floatX
      frag.currentPosition.y += floatY
      frag.currentPosition.z += floatZ

      dummy.position.copy(frag.currentPosition)
      dummy.rotation.x = frag.baseRotation.x + time * 0.1
      dummy.rotation.y = frag.baseRotation.y + time * 0.08
      dummy.rotation.z = frag.baseRotation.z + time * 0.03

      const scaleProgress = Math.pow(Math.min(frag.formationProgress * 1.5, 1), 0.6)
      dummy.scale.setScalar(frag.scale * FRAGMENT_SIZE * scaleProgress)

      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true

    // ===== COR DOS FRAGMENTOS =====
    // Transição acontece a partir de 40% do scroll (quando está "entrando")
    const colorStart = 0.4
    const colorProgress = scrollProgress > colorStart 
      ? Math.pow((scrollProgress - colorStart) / (1 - colorStart), 1.5)
      : 0
    
    const material = meshRef.current.material as THREE.MeshStandardMaterial
    material.color.lerpColors(goldColor, whiteColor, colorProgress)

    // Callback
    if (allComplete && !formationComplete.current && isForming) {
      formationComplete.current = true
      onFormationComplete?.()
    }
  })

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, FRAGMENT_COUNT]}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1.2]} />
      <meshStandardMaterial
        color={goldColor}
        side={THREE.DoubleSide}
        roughness={0.6}
        metalness={0.3}
      />
    </instancedMesh>
  )
}

// Ambiente com transição de cor
function Environment({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useThree()
  const startColor = useMemo(() => new THREE.Color('#f5f5f0'), [])
  const endColor = useMemo(() => new THREE.Color('#000000'), [])
  
  useFrame(() => {
    // Transição de cor a partir de 40% (quando entra na esfera)
    const colorStart = 0.4
    const progress = scrollProgress > colorStart 
      ? Math.pow((scrollProgress - colorStart) / (1 - colorStart), 1.2)
      : 0
    
    const bgColor = startColor.clone().lerp(endColor, progress)
    scene.background = bgColor
  })

  const ambientIntensity = 0.5 - scrollProgress * 0.2
  const directionalIntensity = 0.8 - scrollProgress * 0.3

  return (
    <>
      <ambientLight intensity={Math.max(0.2, ambientIntensity)} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={Math.max(0.2, directionalIntensity)} 
        color="#fffaf0"
      />
      <directionalLight 
        position={[-3, -2, 4]} 
        intensity={0.25} 
        color="#f0e6d3"
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={scrollProgress * 2}
        color="#ffffff"
        distance={6}
        decay={2}
      />
    </>
  )
}

export interface PaperSphereHandle {
  startFormation: () => void
  setScrollProgress: (progress: number) => void
}

export const PaperSphere = forwardRef<PaperSphereHandle>(function PaperSphere(_, ref) {
  const [isForming, setIsForming] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useImperativeHandle(ref, () => ({
    startFormation: () => setIsForming(true),
    setScrollProgress: (p: number) => setScrollProgress(Math.max(0, Math.min(1, p))),
  }))

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: '#f5f5f0' }}
      >
        <Environment scrollProgress={scrollProgress} />
        <PaperFragmentsScene 
          isForming={isForming}
          scrollProgress={scrollProgress}
          onFormationComplete={() => {}}
        />
      </Canvas>
    </div>
  )
})
