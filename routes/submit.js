exports.savefile = function(req, res, next) {
	console.log("testing upload");
	upload(req, res, function(err){
		if(err) {
			res.json({error_code:1, err_desc:err});
			return;
		}
		res.json({error_code:0, err_desc:null});
	});
}