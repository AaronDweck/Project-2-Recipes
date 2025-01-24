export default function errorHandler(error, req, res, next) {
    console.log(error.name)
    console.log(error)
    if (error.name === 'TypeError') {
        res.redirect(`${res.locals.page}?error=TypeError`)
    } else if (error.name === 'ValidationError') {
        console.log('test')
        res.redirect(`${res.locals.page}?error=ValidationError`)
    }
    console.log('hello')
}