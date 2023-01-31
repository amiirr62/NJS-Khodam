






module.exports = new class dashboardController  {
    
    async index(req,res,next){

       try {
        return res.render('dashboard/index')
        
       } catch (err) {
            next(err)
       }
    }
    
}


