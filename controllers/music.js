const data = require('./../models/data.json')

const controllerMusic = 
{
    find: (req, res) =>{
        if(req.query.search){
                const query = req.query.search;
                const result = data.filter(song => song.title.toLowerCase().includes(query.toLowerCase()));
                if (result.length === 0) {
                    return res.status(404).json({ error: "No matching songs found." });
                }
                res.status(200).json({ result });
                console.log(result);
        }else{
        res.status(200).json({result: data })
        }
    },

create : (req,res)=>{
    console.log(req.body)
    res.status(201).json({message : "votre musique a été ajoutée",data : req.body})
},

    findById: (req, res) => {
        const id = req.params.id
        if(isNaN(id)){
            return res.status(400).json({error : "Don't use text for id"}) 
        }
        if(id > data.length){
            return res.status(404).json({error : "ID not found ..."}) 
        }

        return res.status(200).json({result : data[id-1]})
    },

    random: (req, res)=>{
        
    }
}

module.exports = controllerMusic