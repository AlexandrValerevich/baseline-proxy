import { type Logger, createLogger, format, transports } from 'winston'

const logger: Logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) =>
            `${info.timestamp as string} [${info.level}]: ${info.message as string} ${
              (info.error as string) ?? info.errors ?? ''
            }`
        )
      )
    }),
    new transports.File({
      filename: 'logs/app.log',
      format: format.json()
    })
  ]
})

export { logger }
