import imageCompression from 'browser-image-compression'
import equirectToCubemapFaces from 'equirect-cubemap-faces-js'

export const blobToImage = (blob: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()

    img.onload = () => {
      URL.revokeObjectURL(url) // liberar memoria
      resolve(img)
    }

    img.onerror = (err) => {
      URL.revokeObjectURL(url)
      reject(err)
    }

    img.src = url
  })
}

export const canvasToBlob = (canvas: HTMLCanvasElement, type = 'image/png', quality?: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('No se pudo generar el Blob'))
        }
      },
      type,
      quality
    )
  })
}

export const image360toCubeFaces = async (file: File): Promise<Blob[]> => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 2000,
    useWebWorker: true,
    alwaysKeepResolution: true,
    fileType: 'image/webp',
  }

  //const compressedFile = await imageCompression(file, options)

  // 2 - Convert it to Blob
  const blob = await blobToImage(file)

  // 3 - Convert blob into 6 canvas faces
  const cubeFaces = await equirectToCubemapFaces(blob)

  // 4 - Convert canvas to file  and push
  const blobs: Blob[] = []
  for (let i in cubeFaces) {
    const faceBlob = await canvasToBlob(cubeFaces[i])

    const faceFile = new File([faceBlob], 'tmp.webp', {
      type: faceBlob.type,
    })

    blobs.push(await imageCompression(faceFile, options))
  }

  return blobs
}

export const base64ToFile = (base64, filename = 'image.png', mime = 'image/webp') => {
  const byteString = atob(base64.split(',')[1]) // decodifica Base64
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new File([ab], filename, { type: mime })
}
