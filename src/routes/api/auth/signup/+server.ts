import { ROLES } from '@/modules/users/constants/roles'
import bcrypt from 'bcryptjs'
import { User, Agent, Lead } from '@/db/tables'
import { db } from '@/db/client'

export const GET = async ({ request, cookies }) => {
  const hashedPassword = await bcrypt.hash('0000', 10)

  await db.insert(User).values([
    {
      id: 'agent34hj532',
      password: hashedPassword,
      roles: [ROLES.ADMIN],
    },
    {
      id: 'agent34hj533',
      password: hashedPassword,
      roles: [ROLES.ADMIN],
    },
    {
      id: 'agent34hj534',
      password: hashedPassword,
      roles: [ROLES.ADMIN],
    },
    {
      id: 'agent34hj535',
      password: hashedPassword,
      roles: [ROLES.ADMIN],
    },
    {
      id: 'agent34hj536',
      password: hashedPassword,
      roles: [ROLES.ADMIN],
    },
  ])

  await db.insert(Agent).values([
    {
      id: 'agent34hj532',
      email: 'miquel@tramita.info',
      username: 'Miquel Toran',
      avatar: 'https://we56oabq17f58vme.public.blob.vercel-storage.com/avatar/miquel-oLeTmtXm5GRJP1dQFMY2cv17W2qH9g.png',
      userId: 'agent34hj532',
    },
    {
      id: 'agent34hj533',
      email: 'postventa@tramita.info',
      username: 'Yolanda Cortés',
      avatar:
        'https://we56oabq17f58vme.public.blob.vercel-storage.com/avatar/Captura%20de%20pantalla%202025-04-01%20160743-FrOCMABYGoQpFDUnGHsKXibaJmwLLO.png',
      userId: 'agent34hj533',
    },
    {
      id: 'agent34hj534',
      email: 'ysandra@tramita.info',
      username: 'Ysandra Díaz',
      avatar: 'https://we56oabq17f58vme.public.blob.vercel-storage.com/avatar/ysandra-dbQNFzbCKCJXLy0NoF1i2gj5iPj9Qi.png',
      userId: 'agent34hj534',
    },
    {
      id: 'agent34hj535',
      email: 'javier@tramita.info',
      username: 'Javier Jiménez',
      avatar: 'https://we56oabq17f58vme.public.blob.vercel-storage.com/avatar/javi-6JLG5oFIVWi481j6GoW6a2nxvR9njO.png',
      userId: 'agent34hj535',
    },
    {
      id: 'agent34hj536',
      email: 'carmelo@tramita.info',
      username: 'Carmelo Soriano',
      avatar: 'https://we56oabq17f58vme.public.blob.vercel-storage.com/avatar/carmelo-UzNK9u8LwkLo7MCgClZz4bievxtD6R.png',
      userId: 'agent34hj536',
    },
  ])

  await db.insert(Lead).values([
    {
      id: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      name: 'Carlos',
      surname: 'Gómez',
      email: 'carlos.gomez@example.com',
      phone: '612345678',
      timePreference: 'MTA',
      contactPreference: 'ETW',
      context: 'Interesado en propiedades cerca del mar',
      message: 'Quiero más información sobre el piso en la calle Marina.',
      buyer: true,
      seller: false,
    },
    {
      id: 'b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7',
      name: 'Lucía',
      surname: 'Martínez',
      email: 'lucia.martinez@example.com',
      phone: '622345679',
      timePreference: 'tardes',
      contactPreference: 'teléfono',
      context: '',
      message: 'Estoy vendiendo un piso y quiero tasación gratuita.',
      buyer: false,
      seller: true,
    },
    {
      id: 'c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8',
      name: 'Andrés',
      surname: '',
      email: 'andres@example.com',
      phone: '632345680',
      timePreference: 'MTA',
      contactPreference: 'ETW',
      context: '',
      message: 'Solo quiero que me llamen si es urgente.',
      buyer: false,
      seller: false,
    },
    {
      id: 'd4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9',
      name: 'Marta',
      surname: 'Sánchez',
      email: 'marta.sanchez@example.com',
      phone: '642345681',
      timePreference: 'fines de semana',
      contactPreference: 'WhatsApp',
      context: 'Busca inversión',
      message: 'Busco una oportunidad de inversión en Barcelona.',
      buyer: true,
      seller: true,
    },
    {
      id: 'e5f6g7h8-i9j0-1k2l-3m4n-o5p6q7r8s9t0',
      name: 'Javier',
      surname: 'Ruiz',
      email: 'javier.ruiz@example.com',
      phone: '652345682',
      timePreference: 'MTA',
      contactPreference: 'ETW',
      context: '',
      message: 'Gracias por el asesoramiento. Me lo pensaré.',
      buyer: true,
      seller: false,
    },
  ])

  return new Response('Rows ok')
}
