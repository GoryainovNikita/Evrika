const
    iconv = require('iconv-lite'),
    { exec } = require('child_process')

const findUser = (callback) => {
    exec('net user', { encoding: "buffer" },
        (error, stdout, stderr) => {
            if (error) {
                callback(stderr, null)
            } else {
                callback(null, iconv.decode(stdout, 'win1251'))
            }
        }
    );
}

const users = (callback) => (findUser((err, res) => {
    if (err) {
        console.log(`Error: ${err}`)
    }
    else {
        callback(res
            .slice(res.lastIndexOf('-') + 1)
            .match(/([A-Za-zА-Яа-я0-9_]+)/g)
        )
    }
}))

module.exports = users