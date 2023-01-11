import log4js  from "log4js";


log4js.configure({
    appenders: {
        console: { type: "console"},
        fileWarn: { type: "file", filename: "warn.log"},

        consoleLog: { type: "logLevelFilter", appender: "console", level: "info" },
        fileLogWarn: { type: "logLevelFilter", appender: "fileWarn", level: "warn" }
    },
    categories: {
        default: { appenders: [ "consoleLog", "fileLogWarn" ], level: "all"}
    }
})


const logConsola = log4js.getLogger("consoleLog");
const logWarn = log4js.getLogger("fileWarn");



export { logConsola, logWarn };