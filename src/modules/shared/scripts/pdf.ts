import { PUBLIC_TRAMITA_NODE } from '$env/static/public'

export const downloadBlob = (blob: Blob, pdfName: string = '') => {
  // Crear un elemento <a> para la descarga
  const a = document.createElement('a')
  a.href = window.URL.createObjectURL(blob)
  a.download = `${pdfName}.pdf`
  document.body.appendChild(a)

  // Simular un clic para descargar
  a.click()
  a.remove()
}

export const generatePDFbyURL = async (url: string, pdfName: string = '') => {
  const buffer = await fetch(`${PUBLIC_TRAMITA_NODE}/api/url-to-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: url,
    }),
  })

  const blob = await buffer.blob()

  downloadBlob(blob, pdfName)
}

export const generatePDFbyHTML = async (html: string, horizontal: boolean = false) => {
  const buffer = await fetch(`${PUBLIC_TRAMITA_NODE}/api/html-to-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html,
      horizontal,
    }),
  })

  const blob = await buffer.blob()

  return blob
}
