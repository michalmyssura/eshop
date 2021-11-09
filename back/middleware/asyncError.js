module.exports = functions => (req,res,next) =>
    Promise.resolve(functions(req,res,next)).catch(next);
