const axios = require('axios');
const User = require('./models/user.mode.js')
module.exports = async (ctx, next)=>{
    try { 
            const response = await axios.get('http://api.example.com/generateScore');
            if(response.statusCode === 200){
                await User.update({ created_at: { gte: new Date('2023-01-01'), lte: new Date('2022-01-01') }} , {$set: {score:response.data.score} })
            } else{
                console.error('Error updating users');
            }
          ctx.body = 'Scores generated';
    } catch (error) {
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
}