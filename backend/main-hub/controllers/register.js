exports.controller = (req, res) => {
    if (req.method === 'GET') {
        res.end(JSON.stringify({'status': 'success', 'operation': 'GET on /login'}));
    }
};