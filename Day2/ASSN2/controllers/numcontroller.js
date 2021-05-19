// Solution for question 3: a controller that takes two parameters and returns their sum
// localhost:5000/api/sum?num1=X&num2=Y where X and Y are numbers input by user

module.exports.sum = function(req, res){
	console.log(req.query);
	var num1 = 0;
	var num2 = 0;
    console.log("Sum of numbers " + num1+" " + num2 + ": ");
	if(req.query && req.query.num1){
		num1 = parseInt(req.query.num1);
	}
	if(req.query && req.query.num2){
		num2 = parseInt(req.query.num2);
	}
	const sumTotal = num1 + num2;
	res.status(200).json("Sum of numbers: " + sumTotal);
};
