const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/")
    }
}

export { checkAuthenticated };