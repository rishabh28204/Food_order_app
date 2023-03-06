const mongoose=require('mongoose');
const dburl='mongodb+srv://Rishabh8393:Rishabh123@cluster0.ei7j2bn.mongodb.net/GoFoodData?retryWrites=true&w=majority'
mongoose.connect(dburl,{useNewUrlParser: true});
const conn=mongoose.connection;
conn.on('connected', async function() {
    console.log('database is connected successfully');
    let data= await conn.db.collection("fooData2").find({}).toArray();
    let catagory= await conn.db.collection("FoodCatagory").find({}).toArray();
    global.food_items=data;
    global.food_catagory=catagory;
    
    
    
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;