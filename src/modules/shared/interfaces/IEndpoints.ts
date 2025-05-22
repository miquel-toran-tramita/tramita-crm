export type EndpointsCRM =
  | `/api/login`
  | `/api/logout`
  | `/api/test`
  | `/api/qr-public-redirect/${string}`
  | `/api/qr-public-redirect/url/${string}`
  | `/api/migrate-properties`
  | `/api/contacts/${string}` // [id]
  | `/api/private/agents/${string}` // [userId]
  | `/api/private/agents`
  | `/api/private/contacts/activateAccount`
  | `/api/private/contacts`
  | `/api/private/contacts${string}`
  | `/api/private/leads/${string}` // [leadId]
  | `/api/private/leads`
  | `/api/private/lead-to-contact`
  | `/api/private/properties`
  | `/api/private/propertyJoin`
  | `/api/private/propertyJoin/connectContact`
  | `/api/private/users/${string}` // [userId]
  | `/api/private/users`
  | `/api/private/users/isAccountActivated`
  | `/api/private/users/resetPassword`
  | `/api/private/users/sendResetPasswordEmail`
  | `/api/private/events`
  | `/api/private/qr-redirect`
  | `/api/private/blobs`
  | `/api/private/chromium/generatePDF`
  | `/api/private/qr-redirect/${string}`
  | `/api/private/pactos`
  | `/api/private/pactos/${string}`
  | `/api/private/google/drive`
  | `/api/private/google/drive/createFolderStructure`

export type EndpointsTramitaNode = `/api/get-portal-property-data`

export type Endpoints = EndpointsCRM | EndpointsTramitaNode
