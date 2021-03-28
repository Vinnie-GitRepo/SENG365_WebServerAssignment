

exports.performAuthentication = async function(req, res, next) {
    const auth_token = req.header('X-Authorization');

    if (auth_token === null) {

    }
}