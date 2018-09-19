const con = require("./connect.js")
module.exports = {
    select: async (table, options, callback) => {
        sql = `SELECT * FROM ${table}`
        let keys = Object.keys(options)
        let values = Object.values(options)
        let where = false
        for(i = 0; i < keys.length; i++) {
            if(keys[i] === "all") continue
            if(keys[i] === "orderBy") continue
            if(!where) {
                sql += "WHERE"
                where = true
            }
            sql += ` ${keys[i]} = '${values[i]}'`
            if(keys[i + 1]) sql += ` AND`
        }
        
        if(options.orderBy) {
            sql += ` ORDER BY CONVERT(${options.orderBy}, SIGNED INTEGER) DESC`
        }
        console.log(sql)
        return con.query(sql, (err, rows, fields) => {
            if(err) throw err
            if(!rows[0]) return callback(undefined)
            options.all === true ? callback(rows) : callback(rows[0])
        })
    },

    update: async (table, set, where) => {
        sql = `UPDATE ${table} SET`

        let setKeys = Object.keys(set)
        let setValues = Object.values(set)
        let whereKeys = Object.keys(where)
        let whereValues = Object.values(where)

        for(i = 0; i < setKeys.length; i++) {
            sql += ` ${setKeys[i]} = '${setValues[i]}'`
            if(setKeys[i + 1]) sql += ','
        }

        sql += " WHERE"

        for(j = 0; j < whereKeys.length; j++) {
            sql += ` ${whereKeys[j]} = '${whereValues[j]}'`
            if(whereKeys[j + 1]) sql += ' AND'
        }

        return con.query(sql, (err, result) => {
            if(err) throw err
        })
    },

    insert: async (table, insert) => {
        sql = `INSERT INTO ${table} (`

        let insertKeys = Object.keys(insert)
        let insertValues = Object.values(insert)

        for(i = 0; i < insertKeys.length; i++) {
            sql += `${insertKeys[i]}`
            insertKeys[i + 1] ? sql += `, ` : sql += `) VALUES (`
        }

        for(j = 0; j < insertValues.length; j++) {
            sql += `'${insertValues[j]}'`
            insertValues[j + 1] ? sql += `, ` : sql += `)`
        }

        return con.query(sql, (err, result) => {
            if(err) throw err
        })
    },

    delete: async (table, where) => {
        sql = `DELETE FROM ${table} WHERE`

        let whereKeys = Object.keys(where)
        let whereValues = Object.values(where)

        for(i = 0; i < whereKeys.length; i++) {
            sql += ` ${whereKeys[i]} = '${whereValues[i]}'`
            if(whereKeys[i + 1]) sql += ` AND`
        }
        
        return con.query(sql, (err, result) => {
            if(err) throw err
        })
    }
}
