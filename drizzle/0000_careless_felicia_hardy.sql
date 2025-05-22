CREATE TABLE `Agent` (
	`id` text PRIMARY KEY NOT NULL,
	`avatar` text,
	`username` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '',
	`menuMinimalist` integer DEFAULT false,
	`menuMovil` blob DEFAULT '["Agenda","Seguimiento","Contactos"]',
	`darkMode` integer DEFAULT false,
	`userId` text,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Agent_username_unique` ON `Agent` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `Agent_email_unique` ON `Agent` (`email`);--> statement-breakpoint
CREATE TABLE `Contact` (
	`id` text PRIMARY KEY NOT NULL,
	`avatar` text,
	`name` text,
	`surname` text DEFAULT '',
	`email` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '',
	`dni` text DEFAULT '',
	`nation` text DEFAULT '',
	`birth` text DEFAULT '',
	`profesion` text DEFAULT '',
	`comments` text DEFAULT '',
	`buyer` integer DEFAULT false,
	`seller` integer DEFAULT false,
	`timePreference` text DEFAULT '',
	`contactPreference` text DEFAULT '',
	`importantInfo` text DEFAULT '',
	`agent` text,
	`contactWay` text,
	`userId` text,
	`process` blob,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`agent`) REFERENCES `Agent`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Contact_email_unique` ON `Contact` (`email`);--> statement-breakpoint
CREATE TABLE `Event` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text DEFAULT '',
	`description` text DEFAULT '',
	`status` text DEFAULT '',
	`type` text DEFAULT '',
	`repeater` text DEFAULT '',
	`duration` text DEFAULT '',
	`date` integer,
	`agentId` text,
	`propertyId` integer,
	`contactId` text,
	FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`contactId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `EventAgent` (
	`agentId` text,
	`eventId` text,
	PRIMARY KEY(`agentId`, `eventId`),
	FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Lead` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`surname` text DEFAULT '',
	`email` text,
	`phone` text,
	`timePreference` text DEFAULT '',
	`contactPreference` text DEFAULT '',
	`context` text DEFAULT '',
	`message` text,
	`buyer` integer,
	`seller` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Lead_email_unique` ON `Lead` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Lead_phone_unique` ON `Lead` (`phone`);--> statement-breakpoint
CREATE TABLE `Pactos` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`content` text,
	`contracts` blob DEFAULT '[]'
);
--> statement-breakpoint
CREATE TABLE `Property` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ref` text,
	`titulo` text,
	`descripcion` text,
	`accion` text,
	`tipo_ofer` text,
	`precioCompra` integer,
	`precioAlquiler` integer,
	`ciudad` text,
	`provincia` text,
	`zona` text,
	`cp` integer,
	`orientacion` text,
	`direccion` text,
	`latitud` integer,
	`altitud` integer,
	`tour` text,
	`tourScenes` blob,
	`metrosCons` integer,
	`metrosUtiles` integer,
	`metrosParcela` integer,
	`habitaciones` integer,
	`banyos` integer,
	`aseos` integer,
	`conservacion` text,
	`antiguedad` text,
	`planta` text,
	`numplanta` integer,
	`ascensor` integer,
	`garajedoble` integer,
	`nplazasparking` integer,
	`jardin` integer,
	`piscina_com` integer,
	`piscina_prop` integer,
	`terraza` integer,
	`metrosCocina` integer,
	`metrosComedor` integer,
	`metrosTerraza` integer,
	`numfotos` integer,
	`fotos` blob,
	`energiaLetra` text,
	`energiaValor` integer,
	`emisionesLetra` text,
	`emisionesValor` integer,
	`destacado` integer,
	`opcioncompra` integer,
	`aconsultar` integer,
	`distmar` integer,
	`gastos_com` integer,
	`comunidadincluida` integer,
	`habdobles` integer,
	`fechaact` text,
	`adaptadominus` integer,
	`airecentral` integer,
	`aire_con` integer,
	`bar` integer,
	`barbacoa` integer,
	`cajafuerte` integer,
	`keycalefa` integer,
	`keysuelo` integer,
	`calefacentral` integer,
	`calefaccion` integer,
	`descalcificador` integer,
	`despensa` integer,
	`diafano` integer,
	`electro` integer,
	`esquina` integer,
	`galeria` integer,
	`plaza_gara` integer,
	`gasciudad` integer,
	`gimnasio` integer,
	`habjuegos` integer,
	`tipomensual` text,
	`hidromasaje` integer,
	`jacuzzi` integer,
	`lavanderia` integer,
	`linea_tlf` integer,
	`luminoso` integer,
	`ibi` integer,
	`luz` integer,
	`muebles` integer,
	`ojobuey` integer,
	`parking` integer,
	`patio` integer,
	`preinstaacc` integer,
	`primera_line` integer,
	`puerta_blin` integer,
	`satelite` integer,
	`sauna` integer,
	`solarium` integer,
	`sotano` integer,
	`mirador` integer,
	`apartseparado` integer,
	`bombafriocalor` integer,
	`buhardilla` integer,
	`pergola` integer,
	`tv` integer,
	`terrazaacris` integer,
	`todoext` integer,
	`trastero` integer,
	`urbanizacion` integer,
	`vestuarios` integer,
	`video_port` integer,
	`vistasalmar` integer,
	`cocina_inde` integer,
	`keyelectricidad` integer,
	`keyfachada` integer,
	`keyagua` integer,
	`keyvista` integer,
	`keytecho` integer,
	`montana` integer,
	`rural` integer,
	`costa` integer,
	`vallado` integer,
	`autobuses` integer,
	`centros_comerciales` integer,
	`tranvia` integer,
	`zonas_infantiles` integer,
	`colegios` integer,
	`arboles` integer,
	`hospitales` integer,
	`tren` integer,
	`metro` integer,
	`estadoficha` integer,
	`exclu` integer,
	`keyagente` integer,
	`golf` integer,
	`chimenea` integer,
	`depoagua` integer,
	`alarma` integer,
	`alarmaincendio` integer,
	`alarmarobo` integer,
	`arma_empo` integer,
	`agente` text,
	`agenteEmail` text,
	`agenteTelf` text,
	`googleDriveFolders` blob DEFAULT '{}'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Property_ref_unique` ON `Property` (`ref`);--> statement-breakpoint
CREATE TABLE `PropertyContact` (
	`propertyId` integer NOT NULL,
	`contactId` text NOT NULL,
	`owner` integer,
	`buyer` integer,
	PRIMARY KEY(`propertyId`, `contactId`),
	FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `QRMetadata` (
	`qrCode` text NOT NULL,
	`createdAt` integer,
	`browser` text,
	`os` text,
	FOREIGN KEY (`qrCode`) REFERENCES `QRUrl`(`code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `QRUrl` (
	`code` text PRIMARY KEY NOT NULL,
	`title` text DEFAULT '',
	`destiny` text DEFAULT '',
	`qrImageURL` text DEFAULT '',
	`createdAt` integer
);
--> statement-breakpoint
CREATE TABLE `Session` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expiresAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `SessionContact` (
	`id` text PRIMARY KEY NOT NULL,
	`contactId` text NOT NULL,
	`expiresAt` integer,
	FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` text PRIMARY KEY NOT NULL,
	`password` text,
	`resetToken` text,
	`resetTokenExpiration` integer,
	`accountActivated` integer DEFAULT false,
	`roles` blob DEFAULT '[]'
);
