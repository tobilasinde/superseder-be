import { Response } from 'express'
import { ExpressValidator } from 'express-validator'

export type NODE_ENV = 'development' | 'production'
export type RouteType = 'create' | 'update' | 'reset_token'
export interface generateHashInterface {
	salt: string
	hash: string
}
export interface BodyInterface {
	[index: string]: any
}
export interface UserInterface extends Response.locals {
	iss: string
}
