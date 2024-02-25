#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../src'
import { createServer } from 'http'

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: { syscall: string; code: any }) => {
	if (error.syscall !== 'listen') {
		throw error
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
	var addr = server.address()
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
	console.log('Listening on ' + bind)
}

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3000'
// set('port', port)

/**
 * Create HTTP server.
 */

const server = createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
