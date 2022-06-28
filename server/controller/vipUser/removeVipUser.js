var vipUserModel = require('../../model/vipUserModel');
setInterval(async() => {

    let now = (new Date()).getTime()/1000 ;
    let userData = await vipUserModel.find({endTime : {$lt : parseInt(now)}},{ _id: 1});
    if(userData.length){
        await Promise.all(userData.map(async(item)=>{
            vipUserModel.findOneAndDelete({_id:item._id}).then((data)=>{
                console.log(`user ${data} deleted`)
            })
        }))
    }
}
, 10000);