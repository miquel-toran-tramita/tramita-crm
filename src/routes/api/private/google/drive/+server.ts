import { api } from '@/modules/shared/scripts/api'
import { google } from 'googleapis'
import { googleAuth } from '@/modules/shared/scripts/google'
import { Readable } from 'stream'

const auth = googleAuth
const drive = google.drive({ version: 'v3', auth })

export const GET = async ({ request }): Promise<Response> => {
  try {
    

    const res = await drive.files.list({
      q: `'${import.meta.env.GOOGLE_PARENT_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
    })



    return api.sendSuccessResponse()
  } catch (err) {
    return api.sendErrorResponse(err)
  }
}

export const POST = async ({ request }): Promise<Response> => {
  try {
    const { folderId, fileName, fileContent } = await request.json()

    if (!folderId || !fileName || !fileContent) {
      return api.sendErrorResponse({
        message: 'Se requiere folderId, fileName y fileContent'
      })
    }

    // Decodificar el contenido del archivo base64
    const buffer = Buffer.from(fileContent.split(',')[1], 'base64')
    const stream = Readable.from(buffer)

    // Crear el archivo en Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: 'application/pdf',
        parents: [folderId]
      },
      media: {
        mimeType: 'application/pdf',
        body: stream
      }
    })

    return api.sendSuccessResponse({
      fileId: response.data.id,
      message: 'Archivo subido exitosamente'
    })
  } catch (err) {
    return api.sendErrorResponse(err)
  }
}

export const DELETE = async ({ request }): Promise<Response> => {
  try {
    const { fileId } = await request.json()

    if (!fileId) {
      return api.sendErrorResponse({
        message: 'Se requiere el fileId'
      })
    }

    // Eliminar el archivo de Google Drive
    await drive.files.delete({
      fileId: fileId
    })

    return api.sendSuccessResponse({
      message: 'Archivo eliminado exitosamente'
    })
  } catch (err) {
    return api.sendErrorResponse(err)
  }
}
