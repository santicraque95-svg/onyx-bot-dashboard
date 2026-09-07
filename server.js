require("dotenv").config();
const express=require("express"), path=require("path");
const app=express(), PORT=process.env.PORT||3000, CLIENT_ID=process.env.CLIENT_ID;
app.use(express.static(path.join(__dirname,"public")));
app.get("/api/config",(req,res)=>{
 if(!CLIENT_ID)return res.status(500).json({error:"CLIENT_ID não configurado"});
 const invite=`https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
 res.json({invite,commands:["/anunciar","/booster","/recrutamento","/recrutamento-staff","/tickets","/scrim","/tryout","/resultado","/match","/regras","/manutencao","/votacao","/info","/slowmode","/cargo","/nick","/socials","/site","/staff","/parceria"]});
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Onyx Dashboard: http://localhost:${PORT}`));