let Host = {
    ip: process.env.NODE_ENV === 'development' ? 'http://localhost:3080' : 'https://postatime.ge/backend/site',
}
export default Host;