const User = require("../Models/UserModel");
const Group = require("../Models/GroupsModel");
const {get_positions} = require("../Util/api_util");
const positions_keys = ['symboltoken','symbolname','tradingsymbol','strikeprice','optiontype','expirydate','totalbuyvalue','totalsellvalue','netqty','netprice','ltp','pnl','realised','unrealised']



module.exports.AddTrdaesToGroup = async (req,res, next) => {
    const {groupid, name, Optiontrades} = req.body;
    console.log(groupid,name, Optiontrades);
    const group = await Group.findOne({groupid:groupid});
    if(group){
        group.trades.push(...Optiontrades);
        group.active = false;
        await group.save();
        res.json({status:true,message:"Updated the Group"});
        return;
    }
    const trades = Optiontrades;
    const valid = true;
    const active = false;
    Group.create({ groupid, name, trades,active,valid,}).then(()=> console.log("Created Group"));
    res.json({status:true,message:"New group created"})
  
  }



const extract_options_trade = (data)=>{
    let positions = [];
    for(option of data){
        if(option.instrumenttype){
         if(option.symbolname === 'NIFTY' && option.instrumenttype === 'OPTIDX'){
             let options = {};
             for(key of positions_keys){
                 options[key] = option[key]
             }
             positions.push(options)
         }
 
        }
     }

     return positions;

}


module.exports.fetchGroups = async (req, res, next)=>{
    console.log("Fecthing groups");
    if(req.query?.groupid){
        
        const groups = await Group.find({groupid:req.query.groupid});
        res.json(groups);
    }
    else{
        const groups = await Group.find();
        res.json(groups);
    }

}

module.exports.dbGroupSync = async (req, res, next)=>{

    const positions = await get_positions();
    const options_trade = extract_options_trade(positions.data);

    const groups = await Group.find({valid:true});
   
    for (group of groups){
        console.log(group.groupid);
            for (tradeindex in group.trades){
                const live_traded = options_trade.find((item)=> {
                    return item.symboltoken === group.trades[tradeindex].symboltoken;
                });
                console.log(live_traded)
                if(live_traded !== undefined){
                    group.trades[tradeindex] = live_traded;
                }
                else{
                    
                    if(group.trades[tradeindex].netqty !== '0'){
                        console.log(group.groupid,"invalid");
                        group.valid = false;
                        
                    }
                }
            }
            group.netpl = group.trades.reduce((acc, item)=> acc + parseFloat(item.pnl), 0);
            group.unrealisedpl = group.trades.filter((item)=> item.netqty !== '0').reduce((acc, item)=> acc + parseFloat(item.pnl), 0);
            group.realisedpl  = group.netpl - group.unrealisedpl ;
            group.save();
    }

    console.log(groups);
    
    res.json({status:true});

}

module.exports.createGroupAlert =  async (req, res, next)=>{
    let {groupid,alertType, threshold} = req.body;
    console.log(groupid,alertType, threshold);
    try{
        const searched = await Group.findOne({groupid:groupid});
        if(searched){
            if(alertType === "above"){
                searched.aboveAlert.push(threshold);
                searched.save();
                res.json({message:"Alert Added",status:true});
                return;
            }
            else if(alertType === "below"){
                searched.belowAlert.push(threshold);
                searched.save();
                res.json({message:"Alert Added",status:true});
                return;
            }
            else{
                res.json({message:"Alert type unknown ",status:false});
                return;

            }
        }
        else{
            res.json({message:"Group not found",status:false});
            return;
        }



    }
    catch(err){
        console.log(err)
        res.json({message:"No Alert Addedd",status:false});
    }
    res.json({groupid,alertType, threshold});
};

module.exports.deleteroupAlert =  async (req, res, next)=>{
    let {groupid,alertType, threshold} = req.body;
    console.log(groupid,alertType, threshold);
    try{
        const searched = await Group.findOne({groupid:groupid});
        if(searched){
            if(alertType === "above"){
                searched.aboveAlert = searched.aboveAlert.filter((thresholdData)=> thresholdData !== threshold);
                await searched.save();
                res.json({message:"Alert deleted",status:true});
                return;
            }
            else if(alertType === "below"){
                searched.belowAlert = searched.belowAlert.filter((thresholdData)=> thresholdData !== threshold);;
                searched.save();
                res.json({message:"Alert deleted",status:true});
                return;
            }
            else{
                res.json({message:"Alert type unknown ",status:false});
                return;

            }
        }
        else{
            res.json({message:"Group not found",status:false});
            return;
        }



    }
    catch(err){
        console.log(err)
        res.json({message:"No Alert Addedd",status:false});
    }
    res.json({groupid,alertType, threshold});
};


module.exports.deleteGroup = async (req, res, next)=>{
    const {groupid} = req.body;
    try{
        const searched = await Group.find({groupid:groupid});
        if(searched.length ==0){
            res.json({message:"Group not found",status:false});
            return;
        }
        console.log(searched);
        const deletedCount  = await Group.deleteOne({groupid:groupid});
        res.json({status:true,message:"deleted",...deletedCount});
    }
    catch(err){
        console.log(err)
        res.json({message:"Not deleted",status:false});
    }
    
    

}

module.exports.deleteTradeFromGroup = async (req, res, next)=>{
    const {groupid,tradeSymbolDel} = req.body;
    try{
        const searched = await Group.find({groupid:groupid});
        if(searched.length ==0){
            res.json({message:"Group not found",status:false});
            return;
        }
        console.log(searched);
        searched.trades = searched.trades.filter((trade) => trade.symboltoken !== tradeSymbolDel);
        await searched.save();
        res.json({status:true,message:"Trade removed from group"});
    }
    catch(err){
        console.log(err)
        res.json({message:"Trade Not deleted",status:false});
    }
    
    

}


module.exports.activateGroup = async (req, res, next)=>{
    const {groupid} = req.body;
    try{
        const searched = await Group.find({groupid:groupid});
        if(searched.length ==0){
            res.json({message:"Group not found",status:false});
            return;
        }
        searched.active = true;
        await searched.save();
        res.json({status:true,message:"Group activated"});
    }
    catch(err){
        console.log(err)
        res.json({message:"Group not activated",status:false});
    }
    
}

module.exports.deActivateGroup = async (req, res, next)=>{
    const {groupid} = req.body;
    try{
        const searched = await Group.find({groupid:groupid});
        if(searched.length ==0){
            res.json({message:"Group not found",status:false});
            return;
        }
        searched.active = false;
        await searched.save();
        res.json({status:true,message:"Group deactivated"});
        
    }
    catch(err){
        console.log(err)
        res.json({message:"Group Not deactivated",status:false});
    }
    
}